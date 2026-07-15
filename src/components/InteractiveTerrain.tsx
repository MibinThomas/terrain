import { useRef, useMemo, useState, useEffect } from 'react';
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

const SPACING = 0.024; // spacing between columns
const RADIUS_HOVER = 2.2; // radius of pointer interaction

// Spring parameters for anti-gravity float (softer for fluid buoyancy)
const STIFFNESS = 0.05;
const DAMPING = 0.85;

export default function InteractiveTerrain() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [points, setPoints] = useState<LogoPoint[]>([]);

  // Connect to global store
  const isHovered = useStore((state) => state.isHovered);
  const setHovered = useStore((state) => state.setHovered);

  // Raycast hover refs to avoid re-renders
  const hoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const activeHover = useRef<boolean>(false);

  // Mesh scale spring values
  const meshScale = useRef<number>(1.0);
  const meshScaleVelocity = useRef<number>(0);
  const smoothScroll = useRef<number>(0);

  // Load the logo image and parse pixels
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/brand/logo/Terrain Business Solutions-1.png';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 270; // Resolution of the logo scan
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        generateFallback();
        return;
      }

      ctx.drawImage(img, 0, 0, size, size);
      const imgData = ctx.getImageData(0, 0, size, size).data;
      const loadedPoints: LogoPoint[] = [];

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          const rVal = imgData[idx];
          const gVal = imgData[idx + 1];
          const bVal = imgData[idx + 2];
          const aVal = imgData[idx + 3];

          // Detect black/dark logo pixels on transparent or white background
          const isOpaque = aVal > 90;
          const isDark = (rVal + gVal + bVal) / 3 < 130;

          if (isOpaque && isDark) {
            // Translate coordinates to center of the scene
            const px = (x - size / 2) * SPACING;
            const pz = (y - size / 2) * SPACING;

            // Generate standard topographical surface profile
            const distFromCenter = Math.sqrt(px * px + pz * pz);
            let h = Math.sin(px * 1.8) * Math.cos(pz * 1.8) * 0.25;
            h += (1.0 - Math.min(1.0, distFromCenter / 3.5)) * 0.4; // Slightly domed center

            // Default base color: darker metallic slate blending into deep charcoal
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
      } else {
        generateFallback();
      }
    };

    img.onerror = () => {
      console.warn('Failed to load logo image. Using procedurally generated chevron fallback.');
      generateFallback();
    };

    function generateFallback() {
      const fallbackPoints: LogoPoint[] = [];
      const size = 32;
      const fallbackSpacing = 0.16;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const px = (c - size / 2) * fallbackSpacing;
          const pz = (r - size / 2) * fallbackSpacing;

          // Chevron formula: |px - pz| < 0.6 and px+pz > -1.2
          const onChevron = Math.abs(px - pz) < 0.5 && (px + pz) > -1.5 && (px + pz) < 2.0;
          // Dot formula
          const onDot = Math.sqrt(Math.pow(px + 1.1, 2) + Math.pow(pz - 1.1, 2)) < 0.45;

          if (onChevron || onDot) {
            const dist = Math.sqrt(px * px + pz * pz);
            const h = Math.sin(dist * 1.5) * 0.3 + 0.35;

            fallbackPoints.push({
              x: px,
              z: pz,
              h,
              r: onDot ? 0.12 : 0.04,
              g: onDot ? 0.12 : 0.04,
              b: onDot ? 0.15 : 0.05
            });
          }
        }
      }
      setPoints(fallbackPoints);
    }
  }, []);

  // Set up physics arrays matching the length of loaded logo points
  const physicsData = useMemo(() => {
    if (points.length === 0) return null;

    const count = points.length;
    const phys = {
      currX: new Float32Array(count),
      currY: new Float32Array(count),
      currZ: new Float32Array(count),

      velX: new Float32Array(count),
      velY: new Float32Array(count),
      velZ: new Float32Array(count),

      targetX: new Float32Array(count),
      targetY: new Float32Array(count),
      targetZ: new Float32Array(count),

      currColor: new Float32Array(count * 3),
      baseColor: new Float32Array(count * 3),
    };

    for (let i = 0; i < count; i++) {
      const p = points[i];
      phys.currX[i] = 0;
      phys.currY[i] = 0;
      phys.currZ[i] = 0;

      phys.baseColor[i * 3] = p.r;
      phys.baseColor[i * 3 + 1] = p.g;
      phys.baseColor[i * 3 + 2] = p.b;

      phys.currColor[i * 3] = p.r;
      phys.currColor[i * 3 + 1] = p.g;
      phys.currColor[i * 3 + 2] = p.b;
    }

    return phys;
  }, [points]);

  // Avoid GC overhead by creating reusable structures
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempRotation = useMemo(() => new THREE.Matrix4(), []);
  const tempEuler = useMemo(() => new THREE.Euler(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || !physicsData || points.length === 0) return;

    // Smoothly interpolate pointer coordinate to create a liquid wave ripple
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

    // Scale spring physics (scales up by 15% on hover)
    const targetScale = isHovered ? 1.15 : 1.0;
    const scaleForce = (targetScale - meshScale.current) * 0.12 - meshScaleVelocity.current * 0.72;
    meshScaleVelocity.current += scaleForce;
    meshScale.current += meshScaleVelocity.current;

    // Responsive scale & position factors based on canvas viewport width
    const canvasWidth = state.size.width;
    let responsiveScale = 1.0;
    let posXOffset = 3.4; // Shift logo to the right on desktop to separate from left-aligned text

    if (canvasWidth < 576) {
      responsiveScale = 1.01; // Mobile (30% increase from 0.78)
      posXOffset = 0;        // Centered
    } else if (canvasWidth < 992) {
      responsiveScale = 1.15; // Tablet
      posXOffset = 0;        // Centered
    }

    meshRef.current.scale.setScalar(meshScale.current * responsiveScale);

    // Simple, clean scroll parallax: slide down and fade out (desktop only)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    smoothScroll.current += (scrollY - smoothScroll.current) * 0.085;

    const scrollFactor = canvasWidth >= 992 ? smoothScroll.current : 0;

    // Apply translations (X shifts to the right on desktop, Y/Z glide down/back on scroll on desktop)
    meshRef.current.position.set(posXOffset, -scrollFactor * 0.0035, -scrollFactor * 0.0018);

    // Static Y orientation + scroll-linked vertical tilt
    meshRef.current.rotation.y = 0;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.06 + 0.45 + scrollFactor * 0.0012;

    // Fade out mesh material on scroll (desktop only) to clear the viewport for content cards below
    if (meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = Math.max(0.0, 1.0 - scrollFactor * 0.0018);
    }

    const count = points.length;
    const { currX, currY, currZ, velX, velY, velZ, targetX, targetY, targetZ, currColor } = physicsData;

    for (let i = 0; i < count; i++) {
      const p = points[i];

      // Fine-grained topographical height wave
      const dynamicWave = Math.sin(p.x * 2.0 + p.z * 2.0 + time * 1.8) * 0.05;
      const finalRestingY = p.h + dynamicWave;

      // Project local instance coordinate to world space
      tempPosition.set(p.x + currX[i], finalRestingY + currY[i], p.z + currZ[i]);
      tempPosition.applyMatrix4(meshRef.current.matrixWorld);

      const dist = tempPosition.distanceTo(smoothHoverPoint.current);

      // Calculate spring offset and color interpolation
      if (isHovered && activeHover.current && dist < RADIUS_HOVER) {
        // Floating factor: max strength at intersection center, falling off quadratically
        const factor = Math.pow((RADIUS_HOVER - dist) / RADIUS_HOVER, 2.2);

        // Anti-gravity push vector: float up on Y, push outwards on X/Z
        const pushDir = tempPosition.clone().sub(smoothHoverPoint.current);
        pushDir.y = 0;
        if (pushDir.lengthSq() > 0.001) {
          pushDir.normalize();
        }

        targetY[i] = factor * 1.4; // float upwards
        targetX[i] = pushDir.x * factor * 0.45; // push horizontally
        targetZ[i] = pushDir.z * factor * 0.45;

      } else {
        // Reset targets to resting layout
        targetX[i] = 0;
        targetY[i] = 0;
        targetZ[i] = 0;
      }

      // Shaded black colors for desktop/tablet, base metallic slate for mobile
      const distFromCenter = Math.sqrt(p.x * p.x + p.z * p.z);
      const isMobileViewport = state.size.width < 576;

      let targetR = p.r;
      let targetG = p.g;
      let targetB = p.b;

      if (!isMobileViewport) {
        // Desktop black shaded gradient (very deep black/onyx)
        const normDist = Math.min(1.0, distFromCenter / 2.8);
        targetR = 0.002 + (1.0 - normDist) * 0.008;
        targetG = 0.002 + (1.0 - normDist) * 0.008;
        targetB = 0.002 + (1.0 - normDist) * 0.01;
      }

      currColor[i * 3] += (targetR - currColor[i * 3]) * 0.08;
      currColor[i * 3 + 1] += (targetG - currColor[i * 3 + 1]) * 0.08;
      currColor[i * 3 + 2] += (targetB - currColor[i * 3 + 2]) * 0.08;

      // Update spring physics velocities
      const fx = (targetX[i] - currX[i]) * STIFFNESS - velX[i] * DAMPING;
      velX[i] += fx;
      currX[i] += velX[i];

      const fy = (targetY[i] - currY[i]) * STIFFNESS - velY[i] * DAMPING;
      velY[i] += fy;
      currY[i] += velY[i];

      const fz = (targetZ[i] - currZ[i]) * STIFFNESS - velZ[i] * DAMPING;
      velZ[i] += fz;
      currZ[i] += velZ[i];

      // Update Instance Transform Matrix
      tempPosition.set(p.x + currX[i], finalRestingY + currY[i], p.z + currZ[i]);
      tempMatrix.makeTranslation(tempPosition.x, tempPosition.y, tempPosition.z);

      // Rotate floating blocks to emphasize anti-gravity effect
      const currentFloat = Math.max(0, currY[i]);
      if (currentFloat > 0.05) {
        const rx = currY[i] * 0.3;
        const rz = currX[i] * 0.3;
        tempEuler.set(rx, 0, rz);
        tempRotation.makeRotationFromEuler(tempEuler);
        tempMatrix.multiply(tempRotation);
      }

      meshRef.current.setMatrixAt(i, tempMatrix);

      // Update Instance Color
      tempColor.setRGB(currColor[i * 3], currColor[i * 3 + 1], currColor[i * 3 + 2]);
      meshRef.current.setColorAt(i, tempColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  // Mouse Raycasting listeners
  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (e.point) {
      hoverPoint.current.copy(e.point);
      activeHover.current = true;
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    activeHover.current = true;
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    activeHover.current = false;
    hoverPoint.current.set(0, -999, 0);
  };

  if (points.length === 0) return null;

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
      {/* Tall rectangular columns for corporate cityscape relief */}
      <boxGeometry args={[0.017, 0.08, 0.017]} />
      <meshStandardMaterial
        roughness={0.08}
        metalness={0.96}
        envMapIntensity={0.25}
      />
    </instancedMesh>
  );
}
