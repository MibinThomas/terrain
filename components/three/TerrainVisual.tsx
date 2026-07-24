"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Create topography using sine waves
    float elevation = sin(pos.x * 2.0 + uTime * 0.5) * 0.1 
                    + cos(pos.y * 2.0 + uTime * 0.3) * 0.1;
    
    // Pointer interaction
    float dist = distance(uv, uMouse);
    float pointerEffect = smoothstep(0.3, 0.0, dist) * 0.15;
    
    pos.z += elevation + pointerEffect;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Generate contour lines
    float lines = fract(vElevation * 40.0);
    float contour = smoothstep(0.05, 0.0, lines) + smoothstep(0.95, 1.0, lines);
    
    // Grid pattern
    vec2 grid = fract(vUv * 40.0);
    float gridLines = smoothstep(0.05, 0.0, grid.x) + smoothstep(0.95, 1.0, grid.x) +
                      smoothstep(0.05, 0.0, grid.y) + smoothstep(0.95, 1.0, grid.y);
    
    float intensity = max(contour, gridLines * 0.2);
    
    vec3 finalColor = mix(vec3(0.035, 0.035, 0.035), uColor, intensity * 0.6);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function TerrainPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor: { value: new THREE.Color("#F1F2F3") }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate mouse position
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(
          (state.pointer.x * 0.5) + 0.5,
          (state.pointer.y * 0.5) + 0.5
        ),
        0.1
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.5; // Tilt the plane
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]}>
      <planeGeometry args={[4, 4, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent={true}
      />
    </mesh>
  );
}

export default function TerrainVisual() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0.5, 2], fov: 45 }}>
        <fog attach="fog" args={["#090909", 1, 3]} />
        <TerrainPlane />
      </Canvas>
    </div>
  );
}
