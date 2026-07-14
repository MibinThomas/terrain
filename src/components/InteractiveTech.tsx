import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

interface Point3D {
  x: number;
  z: number;
  r: number;
  g: number;
  b: number;
}

const STIFFNESS = 0.06;
const DAMPING = 0.82;
const RADIUS_HOVER = 2.0;
const GRID_SIZE = 26; // 26x26 grid = 676 voxels
const SPACING = 0.09;

export default function InteractiveTech() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);
  const setHovered = useStore((state) => state.setHovered);

  const hoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const activeHover = useRef<boolean>(false);

  // Generate microprocessor grid coordinates
  const points = useMemo(() => {
    const list: Point3D[] = [];
    const half = (GRID_SIZE - 1) / 2;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const px = (c - half) * SPACING;
        const pz = (r - half) * SPACING;

        // Skip outer corners to give it a rounded circuit board appearance
        const distFromCenter = Math.sqrt(px * px + pz * pz);
        if (distFromCenter > half * SPACING * 1.3) continue;

        // Define colors representing circuits (gold tracks vs dark silicon base)
        const isCenterTrack = Math.abs(px) < 0.1 || Math.abs(pz) < 0.1;
        const isOuterRing = Math.abs(distFromCenter - 0.8) < 0.15;
        
        let red = 0.05;
        let green = 0.05;
        let blue = 0.05;

        if (isCenterTrack) {
          // Glowing Gold/Copper traces
          red = 0.95;
          green = 0.6;
          blue = 0.1;
        } else if (isOuterRing) {
          // Metallic Tech Blue accent
          red = 0.1;
          green = 0.35;
          blue = 0.9;
        } else {
          // Silicon grey/black base
          red = 0.12;
          green = 0.12;
          blue = 0.12;
        }

        list.push({ x: px, z: pz, r: red, g: green, b: blue });
      }
    }
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

  // Spring physics storage
  const physicsData = useMemo(() => {
    const count = points.length;
    return {
      currY: new Float32Array(count),
      velY: new Float32Array(count),
      targetY: new Float32Array(count),
    };
  }, [points]);

  // Temporary math helpers
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempRotation = useMemo(() => new THREE.Matrix4(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0) return;

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
    const { currY, velY, targetY } = physicsData;

    // Perspective tilted angle for the CPU board
    const rotX = Math.PI / 3.8;
    const rotY = Math.PI / 10;
    const rotZ = time * 0.04; // slow continuous revolve

    for (let i = 0; i < count; i++) {
      const p = points[i];

      // Base microprocessor surface wave (breathing data flow)
      const dataWave = Math.sin(p.x * 2.5 + p.z * 2.5 + time * 2.0) * 0.02;

      // Project grid point into world space for hover test
      tempPosition.set(p.x, dataWave + currY[i], p.z);
      
      // Apply perspective transforms
      tempEuler.set(rotX, rotY, rotZ);
      tempRotation.makeRotationFromEuler(tempEuler);
      tempPosition.applyMatrix4(tempRotation);

      // Align to layout section positioning
      const canvasWidth = state.size.width;
      const posXOffset = canvasWidth < 576 ? 0 : 1.6;
      tempPosition.x += posXOffset;

      const worldPos = tempPosition.clone().applyMatrix4(meshRef.current.matrixWorld);
      const dist = worldPos.distanceTo(smoothHoverPoint.current);

      if (isHovered && activeHover.current && dist < RADIUS_HOVER) {
        const factor = Math.pow((RADIUS_HOVER - dist) / RADIUS_HOVER, 2.0);
        // Hover lifts elements up along Y axis (normal of the board plane)
        targetY[i] = factor * 0.6; 
      } else {
        targetY[i] = 0;
      }

      // Spring physics
      const fy = (targetY[i] - currY[i]) * STIFFNESS - velY[i] * DAMPING;
      velY[i] += fy;
      currY[i] += velY[i];

      // Assemble final instanced matrix
      tempPosition.set(p.x, dataWave + currY[i], p.z);
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
      {/* Rectangular block voxels simulating microchip transistors */}
      <boxGeometry args={[0.038, 0.05, 0.038]} />
      <meshStandardMaterial
        roughness={0.15}
        metalness={0.94}
        envMapIntensity={0.3}
      />
    </instancedMesh>
  );
}
