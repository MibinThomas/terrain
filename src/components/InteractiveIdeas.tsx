import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

interface LogoPoint {
  x: number;
  z: number;
  h: number;
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

const SPACING = 0.024; // exact spacing matching home page logo cityscape
const STIFFNESS = 0.024; // lowered for slower, smoother movements
const DAMPING = 0.90; // increased for fluid weight and less bounce

export default function InteractiveIdeas() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);

  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const morphFactor = useRef<number>(0.0); // 0.0 = scattered ideas, 1.0 = structured logo

  const [points, setPoints] = useState<LogoPoint[]>([]);
  const [isAssembled, setIsAssembled] = useState(false);
  const hasFirstActivated = useRef(false);

  // Listen for the first major interaction and subsequent click toggles
  useEffect(() => {
    const handleGlobalClick = () => {
      if (!hasFirstActivated.current) {
        setIsAssembled(true);
        hasFirstActivated.current = true;
      } else {
        setIsAssembled((prev) => !prev);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (isHovered && !hasFirstActivated.current) {
      setIsAssembled(true);
      hasFirstActivated.current = true;
    }
  }, [isHovered]);

  // 1. Scan the logo image to get structured target coordinates matching home page logo
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/brand/logo/Terrain Business Solutions-1.png';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 270; // exact home page scan resolution
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, size, size);
      const imgData = ctx.getImageData(0, 0, size, size).data;
      const loadedPoints: LogoPoint[] = [];

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          const rColor = imgData[idx];
          const gColor = imgData[idx + 1];
          const bColor = imgData[idx + 2];
          const alpha = imgData[idx + 3];

          // Detect dark logo pixels on transparent/white background
          const isOpaque = alpha > 90;
          const isDark = (rColor + gColor + bColor) / 3 < 130;

          if (isOpaque && isDark) {
            const px = (x - size / 2) * SPACING;
            const pz = (y - size / 2) * SPACING;
            const distFromCenter = Math.sqrt(px * px + pz * pz);

            // Standard logo heights
            let h = Math.sin(px * 1.8) * Math.cos(pz * 1.8) * 0.25;
            h += (1.0 - Math.min(1.0, distFromCenter / 3.5)) * 0.4;

            // Default base color: dark metallic slate
            const normDist = Math.min(1.0, distFromCenter / 2.8);
            const r = 0.025 + (1.0 - normDist) * 0.07;
            const g = 0.025 + (1.0 - normDist) * 0.07;
            const b = 0.025 + (1.0 - normDist) * 0.09;

            loadedPoints.push({ x: px, z: pz, h, r, g, b });
          }
        }
      }

      if (loadedPoints.length > 0) {
        setPoints(loadedPoints);
      }
    };
  }, []);

  // 2. Generate corresponding scattered points (drifting client ideas in a spherical cloud)
  const scatteredPoints = useMemo<ScatterPoint[]>(() => {
    if (points.length === 0) return [];
    const sphereRadius = 3.5;
    return points.map(() => {
      const theta = Math.random() * Math.PI * 2;
      const cosPhi = Math.random() * 2 - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      const radius = sphereRadius * Math.cbrt(Math.random());

      return {
        x: radius * sinPhi * Math.cos(theta),
        y: radius * cosPhi,
        z: radius * sinPhi * Math.sin(theta),
        driftSpeed: 0.35 + Math.random() * 0.65,
        driftOffset: Math.random() * Math.PI * 2,
      };
    });
  }, [points]);

  // 3. Set instance colors on mount
  useEffect(() => {
    if (!meshRef.current || points.length === 0) return;
    const tempColor = new THREE.Color();
    points.forEach((p, i) => {
      tempColor.setRGB(p.r, p.g, p.b);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [points]);

  // 4. Spring physics storage
  const physicsData = useMemo(() => {
    const count = points.length || 1;
    return {
      currX: new Float32Array(count),
      currY: new Float32Array(count),
      currZ: new Float32Array(count),
      velX: new Float32Array(count),
      velY: new Float32Array(count),
      velZ: new Float32Array(count),
    };
  }, [points]);

  // Math helpers
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0 || scatteredPoints.length === 0) return;

    // Detect mouse coordinates on the horizontal plane (Y=0) where the logo sits
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.25);
    const hoverTarget = new THREE.Vector3();

    // Morph factor: lerp towards 1.0 (assembled logo) once isAssembled is true
    const targetMorph = isAssembled ? 1.0 : 0.0;
    morphFactor.current += (targetMorph - morphFactor.current) * 0.022; // smooth, slow assembly speed

    // Detect mouse coordinates on the horizontal plane (Y=0) where the logo sits
    if (isHovered && state.raycaster.ray.intersectPlane(plane, hoverTarget)) {
      smoothHoverPoint.current.lerp(hoverTarget, 0.12);
    } else {
      smoothHoverPoint.current.lerp(new THREE.Vector3(0, -999, 0), 0.1);
    }

    const time = state.clock.getElapsedTime();
    const count = points.length;
    const { currX, currY, currZ, velX, velY, velZ } = physicsData;

    // Align to layout section positioning
    const canvasWidth = state.size.width;
    const posXOffset = canvasWidth < 992 ? 0 : 3.4;

    // Slow rotation of the sphere before it morphs
    const sphereRotation = time * 0.06;
    const cosRot = Math.cos(sphereRotation);
    const sinRot = Math.sin(sphereRotation);

    for (let i = 0; i < count; i++) {
      const p = points[i];
      const s = scatteredPoints[i];

      // Slow sinus drifting movement for scattered unorganized ideas (drift amount capped to 0.18)
      const driftX = Math.sin(time * s.driftSpeed + s.driftOffset) * 0.18;
      const driftY = Math.cos(time * s.driftSpeed + s.driftOffset) * 0.18;
      const driftZ = Math.sin(time * s.driftSpeed * 0.75 + s.driftOffset) * 0.18;

      const sx = s.x + driftX;
      const sy = s.y + driftY;
      const sz = s.z + driftZ;

      // Rotate the scattered coordinates around Y-axis
      const rotatedX = sx * cosRot - sz * sinRot;
      const rotatedZ = sx * sinRot + sz * cosRot;

      // Structured resting coordinates (the logo shape)
      const lx = p.x;
      const ly = p.h;
      const lz = p.z;

      // Blend between scattered (slowly rotating) and structured positions
      let tx = THREE.MathUtils.lerp(rotatedX, lx, morphFactor.current);
      let ty = THREE.MathUtils.lerp(sy, ly, morphFactor.current);
      let tz = THREE.MathUtils.lerp(rotatedZ, lz, morphFactor.current);

      // 1. Gravitational attraction wave: pull particles toward cursor/center during transition phase
      if (morphFactor.current > 0.02 && morphFactor.current < 0.98) {
        const pullStrength = Math.sin(morphFactor.current * Math.PI) * 0.45;
        const localHover = smoothHoverPoint.current.y > -900
          ? smoothHoverPoint.current.clone().sub(new THREE.Vector3(posXOffset, 0, 0))
          : new THREE.Vector3(0, 0, 0);

        tx += (localHover.x - tx) * pullStrength;
        ty += (localHover.y - ty) * pullStrength;
        tz += (localHover.z - tz) * pullStrength;
      }

      // 2. Post-Assembly Hover State: apply a subtle repulsive force pushing particles in 3D
      if (morphFactor.current >= 0.95 && smoothHoverPoint.current.y > -900) {
        const voxelPos = new THREE.Vector3(lx + posXOffset, ly, lz);
        const dist = voxelPos.distanceTo(smoothHoverPoint.current);

        if (dist < 2.2) {
          const factor = Math.pow((2.2 - dist) / 2.2, 2.0);

          // Repulsive force: push away in 3D (X, Y, and Z)
          const pushDir = voxelPos.clone().sub(smoothHoverPoint.current).normalize();

          // Make them separate and float before snapping back into place
          tx += pushDir.x * factor * 0.35;
          ty += pushDir.y * factor * 0.45;
          tz += pushDir.z * factor * 0.35;
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

      // 3. Shaded black color scheme for desktop, slate-grey for mobile (blended based on morph)
      const distFromCenter = Math.sqrt(lx * lx + lz * lz);
      const isMobileViewport = state.size.width < 576;

      let targetR = p.r;
      let targetG = p.g;
      let targetB = p.b;

      if (!isMobileViewport) {
        // Desktop black shaded onyx gradient matching home page
        const normDist = Math.min(1.0, distFromCenter / 2.8);
        targetR = 0.002 + (1.0 - normDist) * 0.008;
        targetG = 0.002 + (1.0 - normDist) * 0.008;
        targetB = 0.002 + (1.0 - normDist) * 0.01;
      }

      // Blend from a glowing orange/blue scattered theme to the dark onyx logo theme
      const baseR = THREE.MathUtils.lerp(0.04, targetR, morphFactor.current);
      const baseG = THREE.MathUtils.lerp(0.12, targetG, morphFactor.current);
      const baseB = THREE.MathUtils.lerp(0.2, targetB, morphFactor.current);

      // Dynamic golden/orange glow highlight if particles are close to mouse
      let glowR = 0;
      let glowG = 0;
      let glowB = 0;

      if (isHovered && smoothHoverPoint.current.y > -900) {
        tempPosition.set(currX[i] + posXOffset, currY[i], currZ[i]);
        const distToMouse = tempPosition.distanceTo(smoothHoverPoint.current);
        if (distToMouse < 1.0) {
          const glowFactor = Math.pow((1.0 - distToMouse) / 1.0, 2) * 0.45;
          glowR = glowFactor * 0.9;
          glowG = glowFactor * 0.55;
          glowB = glowFactor * 0.1;
        }
      }

      tempColor.setRGB(baseR + glowR, baseG + glowG, baseB + glowB);
      meshRef.current.setColorAt(i, tempColor);

      // Apply matrix transform
      tempPosition.set(currX[i] + posXOffset, currY[i], currZ[i]);
      tempMatrix.makeTranslation(tempPosition.x, tempPosition.y, tempPosition.z);

      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (points.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[null as any, null as any, points.length]}
      castShadow
      receiveShadow
    >
      {/* Spherical voxel matching page logo */}
      <sphereGeometry args={[0.016, 6, 6]} />
      <meshStandardMaterial
        roughness={0.08}
        metalness={0.96}
        envMapIntensity={0.25}
      />
    </instancedMesh>
  );
}
