import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

// Point data structure representing 3D strategic details
interface Point3D {
  ringIndex: number;
  radius: number;
  baseAngle: number;
  phase: number;
  isCore: boolean;
  isCheckpoint: boolean;
  r: number;
  g: number;
  b: number;
}

const STIFFNESS = 0.06;
const DAMPING = 0.85;
const RADIUS_HOVER = 2.4;

export default function InteractiveStrategy() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);
  const setHovered = useStore((state) => state.setHovered);
  const activeSection = useStore((state) => state.activeSection);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const hoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const activeHover = useRef<boolean>(false);
  const visibility = useRef<number>(0);

  // 1. Central strategic objective & 3D radar-ring generation
  const points = useMemo(() => {
    const list: Point3D[] = [];
    const coreCount = 10;
    
    // Core objective particles cluster at the center (Layer 1)
    for (let i = 0; i < coreCount; i++) {
      const angle = (i / coreCount) * Math.PI * 2;
      const radius = 0.08 + Math.random() * 0.06;
      list.push({
        ringIndex: -1,
        radius: radius,
        baseAngle: angle,
        phase: Math.random() * Math.PI * 2,
        isCore: true,
        isCheckpoint: false,
        r: 0.95,
        g: 0.15,
        b: 0.08, // Bright orange/red
      });
    }

    // Concentric layers with count definition (Layer 2)
    const strategicLayers = [
      { radius: 0.55, count: 16 },
      { radius: 1.05, count: 26 },
      { radius: 1.55, count: 38 },
      { radius: 2.05, count: 52 },
    ];

    // Statically distributed strategic nodes / checkpoints
    const checkpointIndices = new Set<string>();
    checkpointIndices.add('0-4');
    checkpointIndices.add('0-12');
    checkpointIndices.add('1-8');
    checkpointIndices.add('1-18');
    checkpointIndices.add('2-15');
    checkpointIndices.add('3-30');

    strategicLayers.forEach((layer, ringIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const baseAngle = (i / layer.count) * Math.PI * 2;
        const key = `${ringIdx}-${i}`;
        const isCheckpoint = checkpointIndices.has(key);

        let r = 0.15;
        let g = 0.15;
        let b = 0.18; // Steel-grey directional markers

        if (isCheckpoint) {
          r = 0.75;
          g = 0.12;
          b = 0.06; // Strategic checkpoints (muted orange)
        } else if (ringIdx === 3) {
          r = 0.03;
          g = 0.03;
          b = 0.035; // Graphite outer markers
        }

        list.push({
          ringIndex: ringIdx,
          radius: layer.radius,
          baseAngle: baseAngle,
          phase: Math.random() * Math.PI * 2,
          isCore: false,
          isCheckpoint: isCheckpoint,
          r,
          g,
          b,
        });
      }
    });

    return list;
  }, []);

  // Set initial colors on mount
  useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();
    points.forEach((p, i) => {
      tempColor.setRGB(p.r, p.g, p.b);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [points]);

  // 2. Ring orientation: Stored orientation/rotation quaternions for each ring to create a 3D tactical radar shape
  const ringOrientations = useMemo(() => {
    const eulers = [
      new THREE.Euler(0, 0, 0),
      new THREE.Euler(Math.PI / 3.5, 0, 0),
      new THREE.Euler(0, 0, Math.PI / 3),
      new THREE.Euler(Math.PI / 4, Math.PI / 5, Math.PI / 6),
    ];
    return eulers.map((euler) => new THREE.Quaternion().setFromEuler(euler));
  }, []);

  const activeOrientations = useMemo(() => [
    new THREE.Quaternion(),
    new THREE.Quaternion(),
    new THREE.Quaternion(),
    new THREE.Quaternion()
  ], []);

  // 3. Spring restoration physics arrays
  const physicsData = useMemo(() => {
    const count = points.length;
    return {
      currOffset: new Float32Array(count),
      velOffset: new Float32Array(count),
      targetOffset: new Float32Array(count),
      currHeight: new Float32Array(count),
      velHeight: new Float32Array(count),
      targetHeight: new Float32Array(count),
    };
  }, [points]);

  // 4. Performance optimisations: Reusable math helpers to prevent garbage collection overhead
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempDir = useMemo(() => new THREE.Vector3(), []);
  const tempDirToPointer = useMemo(() => new THREE.Vector3(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const pointerQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const localForwardAxis = useMemo(() => new THREE.Vector3(1, 0, 0), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0) return;

    // Smooth visibility transition
    const isActive = activeSection === 'strategy';
    visibility.current += ((isActive ? 1 : 0) - visibility.current) * 0.08;

    const isVisible = visibility.current > 0.005;
    meshRef.current.visible = isVisible;
    if (!isVisible) return;

    // Interpolate orientations based on scroll progress of Strategy section
    const currentProgress = scrollProgress.strategy;
    const alignFactor = Math.max(0, Math.min(1, (currentProgress - 0.2) / 0.6));
    const identityQuat = new THREE.Quaternion();

    for (let r = 0; r < 4; r++) {
      activeOrientations[r].copy(identityQuat).slerp(ringOrientations[r], alignFactor);
    }

    // Responsive horizontal positioning offset (only applied to the parent instancedMesh)
    const canvasWidth = state.size.width;
    const posXOffset = canvasWidth < 992 ? 0 : 3.4;
    meshRef.current.position.set(posXOffset, 0, 0);

    // Smooth pointer coordinate tracking
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
    const { currOffset, velOffset, targetOffset, currHeight, velHeight, targetHeight } = physicsData;

    for (let i = 0; i < count; i++) {
      const p = points[i];

      let localX = 0;
      let localY = 0;
      let localZ = 0;

      if (p.isCore) {
        // Central strategic objective: subtle pulse and vertical floating cluster
        const corePulse = 1 + Math.sin(time * 1.8) * 0.12;
        localX = Math.cos(p.baseAngle) * p.radius * corePulse;
        localY = Math.sin(time * 1.5 + p.phase) * 0.03;
        localZ = Math.sin(p.baseAngle) * p.radius * corePulse;

        // Facing outwards relative to center
        tempDir.set(Math.cos(p.baseAngle), 0, Math.sin(p.baseAngle)).normalize();
        tempQuaternion.setFromUnitVectors(localForwardAxis, tempDir);
      } else {
        const ringIdx = p.ringIndex;
        const direction = ringIdx % 2 === 0 ? 1 : -1;

        // Controlled rotation of each ring
        const animatedAngle = p.baseAngle + time * (0.045 + ringIdx * 0.012) * direction;

        const baseX = Math.cos(animatedAngle) * p.radius;
        const baseZ = Math.sin(animatedAngle) * p.radius;

        // 5. Strategic convergence movement: periodically shifting slightly toward the core
        const convergence = (Math.sin(time * 0.7 + p.phase) * 0.5 + 0.5) * 0.08;
        const centreDirX = -baseX / p.radius;
        const centreDirZ = -baseZ / p.radius;

        // Base coordinates before rotation and hover offsets
        let rawX = baseX + centreDirX * convergence;
        let rawY = currHeight[i];
        let rawZ = baseZ + centreDirZ * convergence;

        // Add radial offset push from hover
        const radialScale = 1 + currOffset[i] / p.radius;
        rawX *= radialScale;
        rawZ *= radialScale;

        // Apply pre-calculated 3D ring orientation (scroll-interpolated)
        tempPosition.set(rawX, rawY, rawZ);
        tempPosition.applyQuaternion(activeOrientations[ringIdx]);

        localX = tempPosition.x;
        localY = tempPosition.y;
        localZ = tempPosition.z;

        // 6. Directional marker alignment: Compute tangent movement direction vector along the ring
        const tangentX = -Math.sin(animatedAngle) * direction;
        const tangentZ = Math.cos(animatedAngle) * direction;
        tempDir.set(tangentX, 0, tangentZ).applyQuaternion(activeOrientations[ringIdx]).normalize();

        // Calculate alignment orientation quaternion
        tempQuaternion.setFromUnitVectors(localForwardAxis, tempDir);
      }

      // Check distance in world coordinates for pointer interaction
      tempPosition.set(localX, localY, localZ);
      const worldX = localX + posXOffset;
      const worldPos = tempPosition.clone().setX(worldX);
      const distance = worldPos.distanceTo(smoothHoverPoint.current);
      const influence = Math.pow(Math.max(0, RADIUS_HOVER - distance) / RADIUS_HOVER, 2.0);

      // 7. Pointer-responsive decision effect: rotate towards cursor, rise checkpoints, and ripple outward
      if (isHovered && activeHover.current && distance < RADIUS_HOVER && !p.isCore) {
        // Set targets for spring physics
        targetOffset[i] = influence * 0.32;
        targetHeight[i] = p.isCheckpoint ? influence * 0.35 : 0; // Checkpoints rise perpendicularly

        // Calculate rotation quaternion facing pointer
        const toPointerX = smoothHoverPoint.current.x - worldX;
        const toPointerY = smoothHoverPoint.current.y - localY;
        const toPointerZ = smoothHoverPoint.current.z - localZ;
        tempDirToPointer.set(toPointerX, toPointerY, toPointerZ).normalize();
        
        pointerQuaternion.setFromUnitVectors(localForwardAxis, tempDirToPointer);

        // Interpolate orientation towards pointer
        tempQuaternion.slerp(pointerQuaternion, influence * 0.25);
      } else {
        targetOffset[i] = 0;
        targetHeight[i] = 0;
      }

      // Spring physics updates
      const fOffset = (targetOffset[i] - currOffset[i]) * STIFFNESS - velOffset[i] * DAMPING;
      velOffset[i] += fOffset;
      currOffset[i] += velOffset[i];

      const fHeight = (targetHeight[i] - currHeight[i]) * STIFFNESS - velHeight[i] * DAMPING;
      velHeight[i] += fHeight;
      currHeight[i] += velHeight[i];

      // Dynamic color palette setup
      let r = p.r;
      let g = p.g;
      let b = p.b;

      if (p.isCheckpoint) {
        // Checkpoints glow pulsing wave
        const wave = Math.sin(time * 2.5 + p.baseAngle * 2.0) * 0.5 + 0.5;
        r += wave * 0.15;
        g += wave * 0.08;
      } else if (!p.isCore) {
        // Pointer proximity highlight ripple
        if (isHovered && activeHover.current && distance < RADIUS_HOVER) {
          const glowFactor = influence * 0.12;
          r += glowFactor;
          g += glowFactor * 0.6;
          b += glowFactor * 0.2;
        }
      }

      tempColor.setRGB(r, g, b);
      meshRef.current.setColorAt(i, tempColor);

      // Final matrix composite for rendering
      tempPosition.set(localX, localY, localZ);
      tempMatrix.compose(
        tempPosition,
        tempQuaternion,
        new THREE.Vector3(1, 1, 1)
      );

      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Scale and opacity transitions
    const currentScale = 0.85 + 0.15 * visibility.current;
    meshRef.current.scale.setScalar(currentScale);
    if (meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = visibility.current;
    }
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
      {/* Strategic wedges aligning with movement direction */}
      <boxGeometry args={[0.09, 0.022, 0.018]} />
      <meshStandardMaterial
        roughness={0.1}
        metalness={0.96}
        envMapIntensity={0.3}
      />
    </instancedMesh>
  );
}
