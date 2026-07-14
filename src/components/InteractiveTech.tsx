import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

interface DesktopPoint {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
}

interface ScatterPoint {
  x: number;
  y: number;
  z: number;
  driftSpeed: number;
  driftOffset: number;
}

const STIFFNESS = 0.05;
const DAMPING = 0.86;

export default function InteractiveTech() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);

  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const morphFactor = useRef<number>(0.0); // 0.0 = scattered, 1.0 = 3D desktop shape

  // Generate 3D desktop computer shape coordinates procedurally
  const points = useMemo(() => {
    const list: DesktopPoint[] = [];
    
    // 1. Screen (360 points) - Cyan tech glass screen
    const screenWidth = 2.2;
    const screenHeight = 1.35;
    const screenYOffset = 0.35;
    for (let i = 0; i < 360; i++) {
      const isFrame = Math.random() > 0.65;
      let px = 0;
      let py = 0;
      let pz = 0;

      if (isFrame) {
        // Outline frame border
        const side = Math.floor(Math.random() * 4);
        const t = Math.random();
        if (side === 0) { // Top
          px = (t - 0.5) * screenWidth;
          py = screenYOffset + screenHeight / 2;
        } else if (side === 1) { // Bottom
          px = (t - 0.5) * screenWidth;
          py = screenYOffset - screenHeight / 2;
        } else if (side === 2) { // Left
          px = -screenWidth / 2;
          py = screenYOffset + (t - 0.5) * screenHeight;
        } else { // Right
          px = screenWidth / 2;
          py = screenYOffset + (t - 0.5) * screenHeight;
        }
      } else {
        // Panel face grid
        px = (Math.random() - 0.5) * (screenWidth - 0.08);
        py = screenYOffset + (Math.random() - 0.5) * (screenHeight - 0.08);
      }
      pz = (Math.random() - 0.5) * 0.06;

      // Color: Tech cyan/blue screen panel
      list.push({ x: px, y: py, z: pz, r: 0.08, g: 0.76, b: 0.98 });
    }

    // 2. Stand (70 points) - Charcoal screen stem
    for (let i = 0; i < 70; i++) {
      const px = (Math.random() - 0.5) * 0.16;
      const py = -0.32 - Math.random() * 0.38; // Y range: -0.32 to -0.7
      const pz = -0.08 + Math.random() * 0.16;
      
      // Color: Dark titanium stem
      list.push({ x: px, y: py, z: pz, r: 0.22, g: 0.22, b: 0.24 });
    }

    // 3. Base (100 points) - Solid monitor platform
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.38;
      const px = Math.cos(angle) * radius;
      const py = -0.7 + (Math.random() - 0.5) * 0.02;
      const pz = Math.sin(angle) * radius * 0.8 - 0.04;
      
      // Color: Dark charcoal base
      list.push({ x: px, y: py, z: pz, r: 0.16, g: 0.16, b: 0.18 });
    }

    // 4. Keyboard (200 points) - Slanted input board
    const kbWidth = 1.7;
    const kbDepth = 0.55;
    const kbCenterZ = 0.75;
    for (let i = 0; i < 200; i++) {
      const px = (Math.random() - 0.5) * kbWidth;
      const pz = kbCenterZ + (Math.random() - 0.5) * kbDepth;
      const py = -0.7 + (kbCenterZ - pz) * 0.12; // sloped key layout
      
      // Color: Silver-grey keycaps
      list.push({ x: px, y: py, z: pz, r: 0.6, g: 0.65, b: 0.7 });
    }

    return list;
  }, []);

  // Generate random drifting points for unhovered state
  const scatteredPoints = useMemo<ScatterPoint[]>(() => {
    return points.map(() => ({
      x: (Math.random() - 0.5) * 7.5,
      y: (Math.random() - 0.5) * 5.0,
      z: (Math.random() - 0.5) * 5.5,
      driftSpeed: 0.3 + Math.random() * 0.7,
      driftOffset: Math.random() * Math.PI * 2,
    }));
  }, [points]);

  // Set colors on mount
  useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();
    points.forEach((p, i) => {
      tempColor.setRGB(p.r, p.g, p.b);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [points]);

  // Physics arrays
  const physicsData = useMemo(() => {
    const count = points.length;
    return {
      currX: new Float32Array(count),
      currY: new Float32Array(count),
      currZ: new Float32Array(count),
      velX: new Float32Array(count),
      velY: new Float32Array(count),
      velZ: new Float32Array(count),
    };
  }, [points]);

  // Temporary math helpers
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0) return;

    // Detect mouse coordinates on the horizontal plane (Y=0) where the desktop sits
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2);
    const hoverTarget = new THREE.Vector3();
    
    if (isHovered && state.raycaster.ray.intersectPlane(plane, hoverTarget)) {
      smoothHoverPoint.current.lerp(hoverTarget, 0.12);
      morphFactor.current += (1.0 - morphFactor.current) * 0.055; // morph into desktop
    } else {
      smoothHoverPoint.current.lerp(new THREE.Vector3(0, -999, 0), 0.1);
      morphFactor.current += (0.0 - morphFactor.current) * 0.055; // scatter back
    }

    const time = state.clock.getElapsedTime();
    const count = points.length;
    const { currX, currY, currZ, velX, velY, velZ } = physicsData;

    // Center offset to push model right
    const canvasWidth = state.size.width;
    const posXOffset = canvasWidth < 576 ? 0 : 1.6;

    for (let i = 0; i < count; i++) {
      const p = points[i];
      const s = scatteredPoints[i];

      // Weightless drift vectors
      const driftX = Math.sin(time * s.driftSpeed + s.driftOffset) * 0.22;
      const driftY = Math.cos(time * s.driftSpeed + s.driftOffset) * 0.20;
      const driftZ = Math.sin(time * s.driftSpeed * 0.8 + s.driftOffset) * 0.22;

      const sx = s.x + driftX;
      const sy = s.y + driftY;
      const sz = s.z + driftZ;

      // Morph target coordinates
      let tx = THREE.MathUtils.lerp(sx, p.x, morphFactor.current);
      let ty = THREE.MathUtils.lerp(sy, p.y, morphFactor.current);
      let tz = THREE.MathUtils.lerp(sz, p.z, morphFactor.current);

      // Gravitational attraction wave pulling particles during morph
      if (morphFactor.current > 0.02 && morphFactor.current < 0.98) {
        const pullStrength = Math.sin(morphFactor.current * Math.PI) * 0.38;
        const localHover = smoothHoverPoint.current.y > -900
          ? smoothHoverPoint.current.clone().sub(new THREE.Vector3(posXOffset, 0, 0))
          : new THREE.Vector3(0, 0, 0);

        tx += (localHover.x - tx) * pullStrength;
        ty += (localHover.y - ty) * pullStrength;
        tz += (localHover.z - tz) * pullStrength;
      }

      // Ripple repulsion when fully assembled and hovered
      if (morphFactor.current >= 0.95 && smoothHoverPoint.current.y > -900) {
        const voxelPos = new THREE.Vector3(p.x + posXOffset, p.y, p.z);
        const dist = voxelPos.distanceTo(smoothHoverPoint.current);

        if (dist < 2.0) {
          const factor = Math.pow((2.0 - dist) / 2.0, 2.0);
          
          // Repulsive force: push away in 3D
          const pushDir = voxelPos.clone().sub(smoothHoverPoint.current).normalize();
          
          tx += pushDir.x * factor * 0.3;
          ty += pushDir.y * factor * 0.35;
          tz += pushDir.z * factor * 0.3;
        }
      }

      // Spring Euler integration
      const fx = (tx - currX[i]) * STIFFNESS - velX[i] * DAMPING;
      velX[i] += fx;
      currX[i] += velX[i];

      const fy = (ty - currY[i]) * STIFFNESS - velY[i] * DAMPING;
      velY[i] += fy;
      currY[i] += velY[i];

      const fz = (tz - currZ[i]) * STIFFNESS - velZ[i] * DAMPING;
      velZ[i] += fz;
      currZ[i] += velZ[i];

      // Dynamic color: blend colors during morph
      const baseR = THREE.MathUtils.lerp(0.04, p.r, morphFactor.current);
      const baseG = THREE.MathUtils.lerp(0.12, p.g, morphFactor.current);
      const baseB = THREE.MathUtils.lerp(0.2, p.b, morphFactor.current);

      // Glowing data highlights near cursor
      let glowR = 0;
      let glowG = 0;
      let glowB = 0;

      if (isHovered && smoothHoverPoint.current.y > -900) {
        tempPosition.set(currX[i] + posXOffset, currY[i], currZ[i]);
        const distToMouse = tempPosition.distanceTo(smoothHoverPoint.current);
        if (distToMouse < 1.0) {
          const glowFactor = Math.pow((1.0 - distToMouse) / 1.0, 2) * 0.5;
          glowR = glowFactor * 0.2;
          glowG = glowFactor * 0.7; // glowing cyan/greenish tech wave
          glowB = glowFactor * 0.9;
        }
      }

      tempColor.setRGB(baseR + glowR, baseG + glowG, baseB + glowB);
      meshRef.current.setColorAt(i, tempColor);

      // Apply matrix translation
      tempPosition.set(currX[i] + posXOffset, currY[i], currZ[i]);
      tempMatrix.makeTranslation(tempPosition.x, tempPosition.y, tempPosition.z);

      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null as any, null as any, points.length]}
      castShadow
      receiveShadow
    >
      {/* Voxel column matching page resolution */}
      <boxGeometry args={[0.018, 0.08, 0.018]} />
      <meshStandardMaterial
        roughness={0.12}
        metalness={0.96}
        envMapIntensity={0.25}
      />
    </instancedMesh>
  );
}
