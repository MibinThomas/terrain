import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface DesktopPoint {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  part:
    | 'head'
    | 'eyes'
    | 'torso'
    | 'arms'
    | 'hands'
    | 'legs'
    | 'laptop'
    | 'chair'
    | 'other';
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
  const { size } = useThree();
  const posXOffset = size.width < 992 ? 0 : 3.4;

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isHovered = useStore((state) => state.isHovered);
  const setHovered = useStore((state) => state.setHovered);
  const activeSection = useStore((state) => state.activeSection);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const smoothHoverPoint = useRef<THREE.Vector3>(new THREE.Vector3(0, -999, 0));
  const morphFactor = useRef<number>(0.0); // 0.0 = scattered sphere, 1.0 = 3D vector character
  const visibility = useRef<number>(0);

  const headYaw = useRef<number>(0);
  const headPitch = useRef<number>(0);

  // GLB Model States
  const [loadedScene, setLoadedScene] = useState<THREE.Group | null>(null);

  // 1. Required GLB file path: Load model asynchronously to prevent Suspense 404 block
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/models/man-working-laptop.glb',
      (gltf) => {
        setLoadedScene(gltf.scene);
      },
      undefined,
      (err) => {
        console.warn('Failed to load GLB from /models/man-working-laptop.glb, falling back to procedural character.', err);
      }
    );
  }, []);

  // 3. Model sampling logic & cartoon character point generation
  const points = useMemo<DesktopPoint[]>(() => {
    if (loadedScene) {
      const list: DesktopPoint[] = [];
      const meshes: THREE.Mesh[] = [];

      loadedScene.updateMatrixWorld(true);
      loadedScene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          meshes.push(node);
        }
      });

      if (meshes.length > 0) {
        // Calculate model bounding box and center/scale
        const boundingBox = new THREE.Box3().setFromObject(loadedScene);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        // Normalize scale to height of 2.8 units
        const targetHeight = 2.8;
        const scaleFactor = targetHeight / Math.max(0.1, size.y);

        // Target count based on screen width
        const isMobile = window.innerWidth < 768;
        const maxParticles = isMobile ? 900 : 1800;
        
        // Sum total vertices to distribute budget proportionally
        const totalVertices = meshes.reduce((acc, m) => acc + (m.geometry.getAttribute('position')?.count || 0), 0);

        meshes.forEach((mesh) => {
          const geometry = mesh.geometry;
          const positionAttr = geometry.getAttribute('position');
          if (!positionAttr) return;

          const vertexCount = positionAttr.count;
          const meshBudget = Math.max(15, Math.floor((vertexCount / Math.max(1, totalVertices)) * maxParticles));
          const step = Math.max(1, Math.floor(vertexCount / meshBudget));

          const name = mesh.name.toLowerCase();
          
          // Identify bone/mesh names or fall back to local height coordinates
          let basePart: DesktopPoint['part'] = 'other';
          if (name.includes('head') || name.includes('face') || name.includes('skull')) {
            basePart = 'head';
          } else if (name.includes('eye') || name.includes('pupil')) {
            basePart = 'eyes';
          } else if (name.includes('torso') || name.includes('shirt') || name.includes('body')) {
            basePart = 'torso';
          } else if (name.includes('arm') || name.includes('shoulder')) {
            basePart = 'arms';
          } else if (name.includes('hand') || name.includes('finger')) {
            basePart = 'hands';
          } else if (name.includes('leg') || name.includes('foot') || name.includes('pant')) {
            basePart = 'legs';
          } else if (name.includes('laptop') || name.includes('screen') || name.includes('keyboard')) {
            basePart = 'laptop';
          } else if (name.includes('chair') || name.includes('seat')) {
            basePart = 'chair';
          }

          // Fallback palette colors
          let r = 0.5, g = 0.5, b = 0.5;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.color) {
              r = mat.color.r;
              g = mat.color.g;
              b = mat.color.b;
            }
          }

          for (let i = 0; i < vertexCount && list.length < maxParticles; i += step) {
            const vertex = new THREE.Vector3(
              positionAttr.getX(i),
              positionAttr.getY(i),
              positionAttr.getZ(i)
            );
            vertex.applyMatrix4(mesh.matrixWorld);

            // Center and scale relative to origin
            const x = (vertex.x - center.x) * scaleFactor;
            const y = (vertex.y - center.y) * scaleFactor;
            const z = (vertex.z - center.z) * scaleFactor;

            // Height-based classification fallback if names are generic
            let part = basePart;
            if (part === 'other') {
              if (y > 0.8) {
                part = 'head';
              } else if (y > 0.1 && y <= 0.8) {
                part = 'torso';
              } else if (y <= 0.1 && y > -0.6) {
                if (x < -0.2) {
                  part = 'laptop';
                } else {
                  part = 'legs';
                }
              } else {
                part = 'chair';
              }
            }

            list.push({ x, y, z, r, g, b, part });
          }
        });

        return list;
      }
    }

    // Graceful procedural seated character fallback (Layer 1 fallback)
    const list: DesktopPoint[] = [];

    // Torso (Shirt/hoodie)
    for (let i = 0; i < 160; i++) {
      const px = 0.5 + (Math.random() - 0.5) * 0.35;
      const py = -0.4 + (Math.random() - 0.5) * 0.5;
      const pz = 0.35 + (Math.random() - 0.5) * 0.4;
      list.push({ x: px, y: py, z: pz, r: 0.08, g: 0.25, b: 0.52, part: 'torso' });
    }

    // Neck
    for (let i = 0; i < 12; i++) {
      const px = 0.55 + (Math.random() - 0.5) * 0.08;
      const py = -0.07 + (Math.random() - 0.5) * 0.1;
      const pz = 0.35 + (Math.random() - 0.5) * 0.08;
      list.push({ x: px, y: py, z: pz, r: 0.78, g: 0.52, b: 0.38, part: 'head' });
    }

    // Face - front half of the head
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.22;
      const px = 0.55 - Math.abs(Math.cos(angle)) * radius * 0.9;
      const py = 0.22 + Math.sin(angle) * radius * 1.1;
      const pz = 0.35 + (Math.random() - 0.5) * 0.38;
      list.push({ x: px, y: py, z: pz, r: 0.78, g: 0.52, b: 0.38, part: 'head' });
    }

    // Head skull
    for (let i = 0; i < 120; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const radius = 0.2 + Math.random() * 0.04;
      const px = 0.55 + radius * Math.sin(phi) * Math.cos(theta);
      const py = 0.22 + radius * Math.cos(phi) * 1.05;
      const pz = 0.35 + radius * Math.sin(phi) * Math.sin(theta);
      list.push({ x: px, y: py, z: pz, r: 0.78, g: 0.52, b: 0.38, part: 'head' });
    }

    // Hair
    for (let i = 0; i < 45; i++) {
      const angle = (Math.random() - 0.5) * Math.PI;
      const radius = 0.23 + Math.random() * 0.03;
      const px = 0.55 + Math.cos(angle) * radius;
      const py = 0.25 + Math.sin(Math.abs(angle)) * radius * 1.1;
      const pz = 0.35 + (Math.random() - 0.5) * 0.44;
      list.push({ x: px, y: py, z: pz, r: 0.04, g: 0.035, b: 0.03, part: 'head' });
    }

    // Eyes
    for (let i = 0; i < 28; i++) {
      const px = 0.36 + (Math.random() - 0.5) * 0.04;
      const py = 0.23 + (Math.random() - 0.5) * 0.04;
      const pz = 0.34 + (Math.random() - 0.5) * 0.18;
      list.push({ x: px, y: py, z: pz, r: 0.05, g: 0.55, b: 0.85, part: 'eyes' });
    }

    // Arms
    for (let i = 0; i < 155; i++) {
      const t = Math.random();
      let px, py, pz;
      if (t < 0.5) {
        const u = t * 2;
        px = THREE.MathUtils.lerp(0.6, 0.3, u);
        py = THREE.MathUtils.lerp(-0.2, -0.4, u);
        pz = THREE.MathUtils.lerp(0.15, 0.45, u);
      } else {
        const u = (t - 0.5) * 2;
        px = THREE.MathUtils.lerp(0.3, 0.0, u);
        py = THREE.MathUtils.lerp(-0.4, -0.3, u);
        pz = THREE.MathUtils.lerp(0.18, 0.48, u);
      }
      px += (Math.random() - 0.5) * 0.08;
      py += (Math.random() - 0.5) * 0.08;
      pz += (Math.random() - 0.5) * 0.08;
      list.push({ x: px, y: py, z: pz, r: 0.08, g: 0.25, b: 0.52, part: 'arms' });
    }

    // Hands
    for (let i = 0; i < 32; i++) {
      const px = 0.0 + (Math.random() - 0.5) * 0.06;
      const py = -0.3 + (Math.random() - 0.5) * 0.06;
      const pz = 0.36 + (Math.random() - 0.5) * 0.22;
      list.push({ x: px, y: py, z: pz, r: 0.78, g: 0.52, b: 0.38, part: 'hands' });
    }

    // Laptop Base
    const baseW = 0.45;
    const baseD = 0.45;
    for (let i = 0; i < 110; i++) {
      const px = -0.15 + (Math.random() - 0.5) * baseW;
      const pz = 0.37 + (Math.random() - 0.5) * baseD;
      const py = -0.31 + (Math.random() - 0.5) * 0.015;
      list.push({ x: px, y: py, z: pz, r: 0.35, g: 0.39, b: 0.45, part: 'laptop' });
    }

    // Laptop Screen
    const scrW = 0.45;
    const scrH = 0.38;
    for (let i = 0; i < 130; i++) {
      const tY = Math.random();
      const tZ = Math.random() - 0.5;
      const py = -0.31 + tY * scrH;
      const pz = 0.37 + tZ * scrW;
      const px = -0.35 - tY * 0.08;
      list.push({ x: px, y: py, z: pz, r: 0.05, g: 0.55, b: 0.85, part: 'laptop' });
    }

    // Chair
    for (let i = 0; i < 55; i++) {
      const t = Math.random();
      let px = 0.85;
      let py = -0.7 + t * 0.6;
      let pz = 0.35 + (Math.random() - 0.5) * 0.38;
      list.push({ x: px, y: py, z: pz, r: 0.18, g: 0.18, b: 0.20, part: 'chair' });
    }

    // Legs fallback
    for (let i = 0; i < 80; i++) {
      const px = 0.45 + (Math.random() - 0.5) * 0.3;
      const py = -0.75 + (Math.random() - 0.5) * 0.2;
      const pz = 0.35 + (Math.random() - 0.5) * 0.3;
      list.push({ x: px, y: py, z: pz, r: 0.07, g: 0.08, b: 0.11, part: 'legs' });
    }

    return list;
  }, [loadedScene]);

  // 4. Spherical scatter logic
  const scatteredPoints = useMemo<ScatterPoint[]>(() => {
    const sphereRadius = 3.4;

    return points.map(() => {
      const theta = Math.random() * Math.PI * 2;
      const cosPhi = Math.random() * 2 - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      const radius = sphereRadius * Math.cbrt(Math.random());

      return {
        x: radius * sinPhi * Math.cos(theta),
        y: radius * cosPhi,
        z: radius * sinPhi * Math.sin(theta),
        driftSpeed: 0.3 + Math.random() * 0.7,
        driftOffset: Math.random() * Math.PI * 2,
      };
    });
  }, [points]);

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

  // Physics integration variables
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

  // Initialize particles at their scattered positions to avoid origin explosion
  useEffect(() => {
    const { currX, currY, currZ } = physicsData;
    const count = points.length;
    for (let i = 0; i < count; i++) {
      const s = scatteredPoints[i];
      if (s) {
        currX[i] = s.x;
        currY[i] = s.y;
        currZ[i] = s.z;
      }
    }
  }, [points, scatteredPoints, physicsData]);

  // Dynamically calculate head pivot based on actual vertices
  const headPivot = useMemo(() => {
    let sumX = 0, sumY = 0, sumZ = 0, count = 0;
    points.forEach((p) => {
      if (p.part === 'head' || p.part === 'eyes') {
        sumX += p.x;
        sumY += p.y;
        sumZ += p.z;
        count++;
      }
    });
    if (count > 0) {
      return new THREE.Vector3(sumX / count, sumY / count, sumZ / count);
    }
    return new THREE.Vector3(0.55, 0.05, 0.35); // Fallback
  }, [points]);

  // Performance optimisations: Reusable vectors to prevent GC overhead
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || points.length === 0) return;

    // Smooth visibility transition
    const isActive = activeSection === 'technology';
    visibility.current += ((isActive ? 1 : 0) - visibility.current) * 0.08;

    const isVisible = visibility.current > 0.005;
    meshRef.current.visible = isVisible;
    if (!isVisible) return;

    // Morph factor: driven directly by horizontal scroll progress of Technology section
    const currentProgress = scrollProgress.technology;
    // Morph between 0.2 and 0.8 scroll progress
    const targetMorph = Math.max(0, Math.min(1, (currentProgress - 0.2) / 0.6));
    morphFactor.current += (targetMorph - morphFactor.current) * 0.05;

    // Handle mouse leaving tracking boundary
    if (!isHovered) {
      smoothHoverPoint.current.lerp(new THREE.Vector3(0, -999, 0), 0.1);
    }

    const time = state.clock.getElapsedTime();
    const count = points.length;
    const { currX, currY, currZ, velX, velY, velZ } = physicsData;

    // Responsive placement offsets
    const canvasWidth = state.size.width;
    const responsiveScale = canvasWidth < 576 ? 0.82 : 1;

    // Scattered-sphere rotation & drift
    const sphereRotation = time * 0.055;
    const cosRot = Math.cos(sphereRotation);
    const sinRot = Math.sin(sphereRotation);

    // 6. Head and eye tracking look-at angles (pointer.x and y)
    let targetYaw = 0;
    let targetPitch = 0;

    if (isHovered) {
      targetYaw = state.pointer.x * 0.35; // clamped ~20 deg
      targetPitch = state.pointer.y * 0.2;  // clamped ~11 deg
    }

    headYaw.current += (targetYaw - headYaw.current) * 0.08;
    headPitch.current += (targetPitch - headPitch.current) * 0.08;

    // Blend tracking strength only as morph completes (morph > 0.75)
    const trackingStrength = Math.max(0, (morphFactor.current - 0.75) / 0.25);
    const activeYaw = headYaw.current * trackingStrength;
    const activePitch = headPitch.current * trackingStrength;

    const cosY = Math.cos(activeYaw);
    const sinY = Math.sin(activeYaw);
    const cosP = Math.cos(activePitch);
    const sinP = Math.sin(activePitch);

    for (let i = 0; i < count; i++) {
      const p = points[i];
      const s = scatteredPoints[i] || { x: 0, y: 0, z: 0, driftSpeed: 1, driftOffset: 0 };

      // Drifting motion
      const driftX = Math.sin(time * s.driftSpeed + s.driftOffset) * 0.14;
      const driftY = Math.cos(time * s.driftSpeed + s.driftOffset) * 0.14;
      const driftZ = Math.sin(time * s.driftSpeed * 0.8 + s.driftOffset) * 0.14;

      const sx = s.x + driftX;
      const sy = s.y + driftY;
      const sz = s.z + driftZ;

      const rotatedX = sx * cosRot - sz * sinRot;
      const rotatedZ = sx * sinRot + sz * cosRot;

      // Assembled model coords
      let ax = p.x;
      let ay = p.y;
      let az = p.z;

      // 6. Head and eye tracking coordinate transformations
      if (p.part === 'head' || p.part === 'eyes') {
        const px = ax - headPivot.x;
        const py = ay - headPivot.y;
        const pz = az - headPivot.z;

        // Yaw rotation
        const rx = px * cosY - pz * sinY;
        const rz = px * sinY + pz * cosY;

        // Pitch rotation
        const rrx = rx * cosP - py * sinP;
        const rry = rx * sinP + py * cosP;

        ax = rrx + headPivot.x;
        ay = rry + headPivot.y;
        az = rz + headPivot.z;
      } else if (p.part === 'torso') {
        // Torso neck/shoulder subtle alignment rotation
        const px = ax - headPivot.x;
        const rx = px * Math.cos(activeYaw * 0.3) - (az - headPivot.z) * Math.sin(activeYaw * 0.3);
        const rz = px * Math.sin(activeYaw * 0.3) + (az - headPivot.z) * Math.cos(activeYaw * 0.3);
        ax = rx + headPivot.x;
        az = rz + headPivot.z;

        // Torso subtle breathing animation
        const breathing = Math.sin(time * 1.2) * 0.008 * morphFactor.current;
        ay += breathing;
      }

      // 5. Morphing logic
      let tx = THREE.MathUtils.lerp(rotatedX, ax, morphFactor.current);
      let ty = THREE.MathUtils.lerp(sy, ay, morphFactor.current);
      let tz = THREE.MathUtils.lerp(rotatedZ, az, morphFactor.current);

      // Apply responsive scaling
      tx *= responsiveScale;
      ty *= responsiveScale;
      tz *= responsiveScale;

      // Spring physics integration
      const fx = (tx - currX[i]) * STIFFNESS - velX[i] * DAMPING;
      velX[i] += fx;
      currX[i] += velX[i];

      const fy = (ty - currY[i]) * STIFFNESS - velY[i] * DAMPING;
      velY[i] += fy;
      currY[i] += velY[i];

      const fz = (tz - currZ[i]) * STIFFNESS - velZ[i] * DAMPING;
      velZ[i] += fz;
      currZ[i] += velZ[i];

      // Blend color palette
      const baseR = THREE.MathUtils.lerp(0.04, p.r, morphFactor.current);
      const baseG = THREE.MathUtils.lerp(0.12, p.g, morphFactor.current);
      const baseB = THREE.MathUtils.lerp(0.2, p.b, morphFactor.current);

      // Laptop screen glowing pulse
      let screenPulseGlow = 0;
      if (p.part === 'laptop' && p.r < 0.1 && p.g > 0.5) {
        screenPulseGlow = Math.sin(time * 1.5) * 0.1 * morphFactor.current;
      }

      tempColor.setRGB(baseR, baseG + screenPulseGlow, baseB + screenPulseGlow);
      meshRef.current.setColorAt(i, tempColor);

      // Update translation matrix
      tempPosition.set(currX[i], currY[i], currZ[i]);
      tempMatrix.makeTranslation(tempPosition.x, tempPosition.y, tempPosition.z);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Scale and opacity transitions
    const currentScale = responsiveScale * (0.85 + 0.15 * visibility.current);
    meshRef.current.scale.setScalar(currentScale);
    if (meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = visibility.current;
    }
  });

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (e.point) {
      smoothHoverPoint.current.copy(e.point);
    }
  };

  return (
    <group position={[posXOffset, 0, 0]}>
      {/* 8. Dynamic canvas lighting recommendation */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={0.7} castShadow />
      <pointLight position={[-2, 1, 3]} intensity={0.35} />

      <instancedMesh
        ref={meshRef}
        args={[null as any, null as any, points.length]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.022, 7, 7]} />
        <meshStandardMaterial
          roughness={0.42}
          metalness={0.18}
          envMapIntensity={0.35}
        />
      </instancedMesh>

      {/* 7. Invisible larger interaction mesh to prevent bounds flicker */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[3.8, 16, 16]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
