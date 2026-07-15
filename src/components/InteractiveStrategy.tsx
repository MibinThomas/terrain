import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

interface Point3D {
  x: number;
  z: number;
  radius: number;
  baseAngle: number;
  r: number;
  g: number;
  b: number;
}

const STIFFNESS = 0.05;
const DAMPING = 0.85;
const RADIUS_HOVER = 2.4;

export default function InteractiveStrategy() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);
  const setHovered = useStore((state) => state.setHovered);

  const hoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const activeHover = useRef<boolean>(false);

  // Generate concentric target circles
  const points = useMemo(() => {
    const list: Point3D[] = [];
    const rings = [
      { radius: 0.35, count: 12 },
      { radius: 0.75, count: 20 },
      { radius: 1.15, count: 28 },
      { radius: 1.55, count: 36 },
      { radius: 1.95, count: 44 }
    ];

    rings.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const baseAngle = (i / ring.count) * Math.PI * 2;
        const px = Math.cos(baseAngle) * ring.radius;
        const pz = Math.sin(baseAngle) * ring.radius;

        // Corporate executive slate-black/blue with target orange accent
        const isOuterRing = ringIdx === rings.length - 1;
        const isInnerRing = ringIdx === 0;

        let r = 0.08;
        let g = 0.08;
        let b = 0.08;

        if (isInnerRing) {
          // Sharp focus red/orange target core
          r = 0.95;
          g = 0.15;
          b = 0.15;
        } else if (isOuterRing) {
          // Dark titanium graphite
          r = 0.03;
          g = 0.03;
          b = 0.03;
        } else {
          // Deep steel grey
          r = 0.15;
          g = 0.15;
          b = 0.18;
        }

        list.push({ x: px, z: pz, radius: ring.radius, baseAngle, r, g, b });
      }
    });

    return list;
  }, []);

  // Set instance colors on mount
  useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();
    points.forEach((p, i) => {
      tempColor.setRGB(p.r, p.g, p.b);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [points]);

  // Spring physics storage for pointer rotation angles
  const physicsData = useMemo(() => {
    const count = points.length;
    return {
      currAngle: new Float32Array(count),
      velAngle: new Float32Array(count),
      targetAngle: new Float32Array(count),
      currHeight: new Float32Array(count),
      velHeight: new Float32Array(count),
      targetHeight: new Float32Array(count),
    };
  }, [points]);

  // Temporary math helpers
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempRotation = useMemo(() => new THREE.Matrix4(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0) return;

    // Align to layout section positioning
    const canvasWidth = state.size.width;
    const posXOffset = canvasWidth < 992 ? 0 : 3.4;
    meshRef.current.position.set(posXOffset, 0, 0);

    // Smoothly interpolate pointer coordinate for wave ripples
    if (activeHover.current) {
      if (smoothHoverPoint.current.y < -900) {
        smoothHoverPoint.current.copy(hoverPoint.current);
      } else {
        smoothHoverPoint.current.lerp(hoverPoint.current, 0.14);
      }
    } else {
      smoothHoverPoint.current.lerp(new THREE.Vector3(0, -999, 0), 0.12);
    }

    const time = state.clock.getElapsedTime();
    const count = points.length;
    const { currAngle, velAngle, targetAngle, currHeight, velHeight, targetHeight } = physicsData;

    const baseRotX = Math.PI / 3.4; // perspective tilt
    const baseRotY = Math.PI / 15;

    for (let i = 0; i < count; i++) {
      const p = points[i];

      // Base concentric rotation: alternate directions for strategic gears effect
      const dir = i % 2 === 0 ? 1 : -1;
      const defaultAngle = p.baseAngle + time * 0.08 * dir;

      // Calculate world coordinates for accurate distance calculations
      tempPosition.set(
        Math.cos(defaultAngle) * p.radius,
        currHeight[i],
        Math.sin(defaultAngle) * p.radius
      );

      // Apply static tilt transforms
      tempEuler.set(baseRotX, baseRotY, 0);
      tempRotation.makeRotationFromEuler(tempEuler);
      tempPosition.applyMatrix4(tempRotation);

      const worldPos = tempPosition.clone().applyMatrix4(meshRef.current.matrixWorld);
      const dist = worldPos.distanceTo(smoothHoverPoint.current);

      if (isHovered && activeHover.current && dist < RADIUS_HOVER) {
        // 1. Calculate angle to point directly at the cursor in X-Z space
        const diffX = smoothHoverPoint.current.x - worldPos.x;
        const diffZ = smoothHoverPoint.current.z - worldPos.z;
        
        // Pivot angle facing the pointer
        targetAngle[i] = Math.atan2(diffZ, diffX);
        
        // 2. Lift up along the Y-axis when hovered
        const factor = Math.pow((RADIUS_HOVER - dist) / RADIUS_HOVER, 2.0);
        targetHeight[i] = factor * 0.45;
      } else {
        // Point outward along the radius of the circle
        targetAngle[i] = defaultAngle;
        targetHeight[i] = 0;
      }

      // Spring Euler integration for rotation angle
      // Prevent angle wrapping discontinuity issues (atan2 jumps between -pi and +pi)
      let diff = targetAngle[i] - currAngle[i];
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      const fAngle = diff * STIFFNESS - velAngle[i] * DAMPING;
      velAngle[i] += fAngle;
      currAngle[i] += velAngle[i];

      // Spring Euler integration for height
      const fHeight = (targetHeight[i] - currHeight[i]) * STIFFNESS - velHeight[i] * DAMPING;
      velHeight[i] += fHeight;
      currHeight[i] += velHeight[i];

      // Assemble final composited matrix
      tempPosition.set(
        Math.cos(defaultAngle) * p.radius,
        currHeight[i],
        Math.sin(defaultAngle) * p.radius
      );

      // Combine perspective tilt with the dynamic rotation angle
      tempEuler.set(baseRotX, baseRotY, currAngle[i]);
      tempRotation.makeRotationFromEuler(tempEuler);

      tempMatrix.compose(
        tempPosition,
        new THREE.Quaternion().setFromRotationMatrix(tempRotation),
        new THREE.Vector3(1, 1, 1)
      );

      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => {
    setHovered(false);
    activeHover.current = false;
    hoverPoint.current.set(0, -999, 0);
  };
  
  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (e.point) {
      hoverPoint.current.copy(e.point);
      activeHover.current = true;
    }
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[null as any, null as any, points.length]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerMove={handlePointerMove}
      castShadow
      receiveShadow
    >
      {/* Dynamic arrow-like wedges pointing to target */}
      <boxGeometry args={[0.07, 0.02, 0.016]} />
      <meshStandardMaterial
        roughness={0.1}
        metalness={0.96}
        envMapIntensity={0.3}
      />
    </instancedMesh>
  );
}
