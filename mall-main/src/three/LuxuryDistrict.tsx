import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createLuxuryWatchTexture } from '../utils/textureGenerators';

interface LuxuryDistrictProps {
  isNightMode?: boolean;
}

export const LuxuryDistrict: React.FC<LuxuryDistrictProps> = React.memo(({ isNightMode = false }) => {
  const watchTexture = useMemo(() => createLuxuryWatchTexture(), []);
  const watchMeshRef = useRef<THREE.Group>(null);
  const gemMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (watchMeshRef.current) {
      watchMeshRef.current.rotation.y += delta * 0.45;
    }
    if (gemMeshRef.current) {
      gemMeshRef.current.rotation.y += delta * 0.35;
      gemMeshRef.current.rotation.x += delta * 0.18;
    }
  });

  return (
    <group position={[13.5, 0, 0]} name="LuxuryDistrict">
      {/* Dark Nero Marquina Inlay Floor */}
      <mesh position={[-1.5, 0.02, -26]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.5, 16]} />
        <meshStandardMaterial
          color="#0b0d10"
          roughness={0.12}
          metalness={0.25}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Fluted Smoked-Oak Wall Backdrop */}
      <mesh position={[0.5, 2.2, -26]} castShadow>
        <boxGeometry args={[0.4, 4.4, 15]} />
        <meshStandardMaterial color="#14110e" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Gold Trim Trim Lines on Wall */}
      <mesh position={[0.28, 4.1, -26]}>
        <boxGeometry args={[0.06, 0.08, 15]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.28, 0.2, -26]}>
        <boxGeometry args={[0.06, 0.08, 15]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Store Header Marquee Sign: KRONOS GENÈVE */}
      <mesh position={[0.26, 3.6, -26]}>
        <planeGeometry args={[4.8, 0.6]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffd27d"
          emissiveIntensity={isNightMode ? 1.8 : 0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Large Framed Horlogerie Graphic Art Panel */}
      <mesh position={[0.28, 2.0, -28.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial
          map={watchTexture}
          emissive="#ffd27d"
          emissiveIntensity={0.22}
          roughness={0.3}
        />
      </mesh>

      {/* Vitrine 1: Freestanding Master Watch Vitrine (at Z = -24.5) */}
      <group position={[-1.6, 0, -24.5]}>
        {/* Champagne Gold Plinth */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.85, 1.2, 0.85]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Velvet Presentation Cushion */}
        <mesh position={[0, 1.22, 0]}>
          <boxGeometry args={[0.7, 0.04, 0.7]} />
          <meshStandardMaterial color="#0b0d10" roughness={0.85} />
        </mesh>

        {/* Floating Rotating Swiss Master Watch */}
        <group ref={watchMeshRef} position={[0, 1.45, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.06, 20]} />
            <meshStandardMaterial color="#d4af37" metalness={0.96} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0.032, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.005, 20]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 4, 0, 0]}>
            <boxGeometry args={[0.14, 0.02, 0.22]} />
            <meshStandardMaterial color="#2c1a0e" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, -0.24]} rotation={[-Math.PI / 4, 0, 0]}>
            <boxGeometry args={[0.14, 0.02, 0.22]} />
            <meshStandardMaterial color="#2c1a0e" roughness={0.7} />
          </mesh>
        </group>

        {/* Clear Glass Protective Cube */}
        <mesh position={[0, 1.58, 0]}>
          <boxGeometry args={[0.84, 0.7, 0.84]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.32}
            roughness={0.04}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Vitrine 2: High Jewellery Floating Gem Showcase (at Z = -27.5) */}
      <group position={[-1.6, 0, -27.5]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.85, 1.2, 0.85]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.3} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.21, 0]}>
          <boxGeometry args={[0.87, 0.04, 0.87]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Floating Rotating Diamond Gemstone */}
        <mesh ref={gemMeshRef} position={[0, 1.48, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.08}
            metalness={0.2}
            emissive="#bbf7d0"
            emissiveIntensity={0.4}
          />
        </mesh>

        <mesh position={[0, 1.58, 0]}>
          <boxGeometry args={[0.84, 0.7, 0.84]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.32}
            roughness={0.04}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
});
