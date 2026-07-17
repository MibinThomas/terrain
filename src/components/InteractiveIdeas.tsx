import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export default function InteractiveIdeas() {
  const activeSection = useStore((state) => state.activeSection);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const setHovered = useStore((state) => state.setHovered);

  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHoveredState] = useState(false);
  const visibility = useRef<number>(0);

  // Load astronauts.glb model from public directory
  const { scene } = useGLTF('/models/astronauts.glb');

  // Clone scene to avoid cache pollution and customize materials for a premium look
  const clonedScene = useMemo(() => {
    const s = scene.clone();
    s.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = false;
        node.receiveShadow = false;

        if (node.material) {
          const mat = node.material as THREE.MeshStandardMaterial;
          const matName = mat.name.toLowerCase();
          
          if (matName.includes('steklo') || matName.includes('glass')) {
            // Shiny dark gold visor representing vision and ideas
            mat.color = new THREE.Color('#d4af37');
            mat.metalness = 1.0;
            mat.roughness = 0.05;
            mat.envMapIntensity = 3.0; // Highly reflective
            mat.emissive = new THREE.Color('#2b2005');
            mat.emissiveIntensity = 0.35;
          } else if (matName.includes('skafandr') || matName.includes('suit')) {
            // High-end matte white tech suit fabric
            mat.metalness = 0.2;
            mat.roughness = 0.45;
            mat.envMapIntensity = 0.9;
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
    const isActive = activeSection === 'ideas';
    visibility.current += ((isActive ? 1 : 0) - visibility.current) * 0.08;

    const isVisible = visibility.current > 0.005;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    const time = state.clock.getElapsedTime();
    const currentProgress = scrollProgress.ideas;

    // 1. Auto-rotation + Scroll-driven 360-degree rotation
    const baseRotationY = currentProgress * Math.PI * 2 + time * 0.1;

    // 2. Cursor hover react: tilt towards pointer (Yaw & Pitch look-at)
    let extraYaw = 0;
    let extraPitch = 0;
    let scaleMultiplier = 1.0;

    if (hovered) {
      extraYaw = state.pointer.x * 0.4;   // clamp tilt
      extraPitch = -state.pointer.y * 0.3; // clamp tilt
      scaleMultiplier = 1.15; // 15% hover size swell
    }

    // 3. Floating sinus breathing wave
    const floatY = Math.sin(time * 1.4) * 0.15;

    // 4. Smooth lerping for rotation and position
    targetRotation.set(extraPitch, baseRotationY + extraYaw, 0);
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.08;

    groupRef.current.position.y += (floatY - groupRef.current.position.y) * 0.08;

    // Responsive scale: shrink model to fit smaller canvas on tablet/mobile
    const width = state.size.width;
    const height = state.size.height;
    let responsiveScale = 1.05; // Base scale for astronauts to fit viewport
    if (width < 390) {
      responsiveScale = 0.65;
    } else if (width < 600) {
      responsiveScale = 0.75;
    } else if (width < 1024) {
      responsiveScale = 0.9;
    }

    if (height < 600) {
      responsiveScale *= 0.8;
    }

    // Combine scale multipliers: base hover swell * responsive * active transition
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

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredState(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredState(false);
  };

  return (
    <group>
      {/* Lights locally placed to show off metallic highlights of the model */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} />
      <pointLight position={[-4, 3, 4]} intensity={0.3} />

      {/* Main Astronauts Model Group */}
      <group ref={groupRef}>
        {/* Render GLTF model cloned scene - base scaled to fit camera viewport */}
        <primitive object={clonedScene} scale={0.55} position={[0, -0.2, 0]} />

        {/* Invisible interaction bounding box to capture pointer hover */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// Pre-load the glb model asset to prevent mount freezes
useGLTF.preload('/models/astronauts.glb');
