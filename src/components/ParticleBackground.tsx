import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleWave = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 5000;
  
  // Set up grid parameters
  const sep = 0.5;
  const gridX = Math.sqrt(count);
  const gridZ = Math.sqrt(count);
  
  const [positions, initialPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    
    let i = 0;
    for (let ix = 0; ix < gridX; ix++) {
      for (let iz = 0; iz < gridZ; iz++) {
        // Center the grid around origin
        const x = (ix - gridX / 2) * sep;
        const z = (iz - gridZ / 2) * sep;
        const y = 0;
        
        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;
        
        initialPositions[i] = x;
        initialPositions[i + 1] = y;
        initialPositions[i + 2] = z;
        
        i += 3;
      }
    }
    return [positions, initialPositions];
  }, [count, gridX, gridZ]);

  // Animate the wave
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const positionsAttr = ref.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = initialPositions[i3];
      const z = initialPositions[i3 + 2];
      
      // Complex sine wave based on time, x, and z
      const y = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 1.5;
      
      positionsAttr.array[i3 + 1] = y;
    }
    
    positionsAttr.needsUpdate = true;
    
    // Very slow rotation of the whole mesh
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

export const ParticleBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Soft gradient overlay so the particles fade at the edges */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 80%)' }}></div>
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <fog attach="fog" args={['#0A0F1F', 10, 25]} />
        <ParticleWave />
      </Canvas>
    </div>
  );
};
