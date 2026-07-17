import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export default function InteractiveTech() {
  const activeSection = useStore((state) => state.activeSection);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const visibility = useRef<number>(0);

  // Load tech.glb model from public directory
  const { scene } = useGLTF('/models/tech.glb');

  // Clone scene to avoid cache pollution and customize materials
  const clonedScene = useMemo(() => {
    const s = scene.clone();
    s.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = false;
        node.receiveShadow = false;

        if (node.material) {
          const mat = node.material as THREE.MeshStandardMaterial;
          mat.metalness = 0.88;
          mat.roughness = 0.18;
          mat.envMapIntensity = 1.0;

          // Emissive glowing highlights representing data flow & network infrastructure
          const name = node.name.toLowerCase();
          const matName = mat.name.toLowerCase();
          
          if (name.includes('object_2') || matName.includes('blinn1')) {
            mat.emissive = new THREE.Color('#3b82f6'); // Glowing blue
            mat.emissiveIntensity = 2.0;
          } else if (name.includes('object_7') || matName.includes('phong1')) {
            mat.emissive = new THREE.Color('#10b981'); // Glowing green/cyan data flow
            mat.emissiveIntensity = 1.6;
          } else if (matName.includes('blinn2') || matName.includes('blinn3')) {
            mat.emissive = new THREE.Color('#f59e0b'); // Glowing orange status lights
            mat.emissiveIntensity = 1.2;
          } else {
            // Dark elegant metal housing for other parts
            mat.color = new THREE.Color('#1e2022');
          }
        }
      }
    });
    return s;
  }, [scene]);

  // Pre-allocate tracking vectors and orientations to prevent GC overhead
  const targetRotation = useMemo(() => new THREE.Euler(), []);
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth visibility transition based on active state
    const isActive = activeSection === 'technology';
    visibility.current += ((isActive ? 1 : 0) - visibility.current) * 0.08;

    const isVisible = visibility.current > 0.005;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    const time = state.clock.getElapsedTime();
    const currentProgress = scrollProgress.technology;

    // 1. Auto-rotation + Scroll-driven 360-degree rotation
    const baseRotationY = currentProgress * Math.PI * 2 + time * 0.12;

    // 2. Cursor hover react: tilt towards pointer (Yaw & Pitch look-at)
    let extraYaw = 0;
    let extraPitch = 0;
    let scaleMultiplier = 1.0;

    if (hovered) {
      extraYaw = state.pointer.x * 0.45;  // clamp tilt ~25 degrees
      extraPitch = -state.pointer.y * 0.35; // clamp tilt ~20 degrees
      scaleMultiplier = 1.15; // 15% hover size swell
    }

    // 3. Floating sinus breathing wave
    const floatY = Math.sin(time * 1.5) * 0.16;

    // 4. Smooth lerping
    targetRotation.set(extraPitch, baseRotationY + extraYaw, 0);
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.08;

    groupRef.current.position.y += (floatY - groupRef.current.position.y) * 0.08;

    // Responsive scale: shrink model to fit smaller canvas on tablet/mobile
    const width = state.size.width;
    const height = state.size.height;
    let responsiveScale = 1.0;
    if (width < 390) {
      responsiveScale = 0.64;
    } else if (width < 600) {
      responsiveScale = 0.74;
    } else if (width < 1024) {
      responsiveScale = 0.88;
    }

    if (height < 600) {
      responsiveScale *= 0.82;
    }


    const finalScale = scaleMultiplier * responsiveScale * (0.85 + 0.15 * visibility.current);
    targetScale.setScalar(finalScale);
    groupRef.current.scale.lerp(targetScale, 0.08);

    // Apply visibility opacity to all child mesh materials for clean fading
    clonedScene.traverse((node) => {
      if (node instanceof THREE.Mesh && node.material) {
        const mat = node.material as THREE.MeshStandardMaterial;
        mat.transparent = true;
        mat.opacity = visibility.current;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Lights locally placed to show off metallic highlights of the model */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.4} />

      {/* Render GLTF tech model cloned scene - scaled down to 0.28 to fit camera viewport */}
      <primitive object={clonedScene} scale={0.28} />



      {/* Invisible interaction bounding box to capture pointer hover */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4.5, 4.5, 4.5]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Pre-load the glb model asset to prevent mount freezes
useGLTF.preload('/models/tech.glb');
