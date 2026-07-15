import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useStore } from '../store/useStore';
import InteractiveTerrain from './InteractiveTerrain';
import InteractiveIdeas from './InteractiveIdeas';
import InteractiveTech from './InteractiveTech';
import InteractiveStrategy from './InteractiveStrategy';

export default function TerrainCanvas() {
  const currentPage = useStore((state) => state.currentPage);
  const setHovered = useStore((state) => state.setHovered);
  return (
    <div 
      className="canvas-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Environment Map for photorealistic metallic reflections */}
        <Environment preset="city" />

        {/* Light theme background color matching brand guideline #e6e7e8 */}
        <color attach="background" args={['#e6e7e8']} />
        
        {/* Soft atmospheric ambient light */}
        <ambientLight intensity={0.18} />
        
        {/* Main directional key light casting clean corporate shadows */}
        <directionalLight
          castShadow
          position={[6, 12, 4]}
          intensity={0.65}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0008}
          shadow-radius={10}
        />
        
        {/* Subtle secondary fill lights */}
        <pointLight position={[-6, 4, -4]} intensity={0.1} color="#ffffff" />
        <pointLight position={[0, 5, 8]} intensity={0.1} color="#a7a9ac" />
        
        <Center>
          <Suspense fallback={null}>
            {currentPage === 'home' && <InteractiveTerrain />}
            {currentPage === 'ideas' && <InteractiveIdeas />}
            {currentPage === 'technology' && <InteractiveTech />}
            {currentPage === 'strategy' && <InteractiveStrategy />}
          </Suspense>
        </Center>
        
        {/* Shadow Catcher Ground Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.06} />
        </mesh>
        
        {/* Orbit camera limits */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
