import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createEventWallTexture } from '../utils/textureGenerators';

interface EventsPlazaProps {
  isNightMode?: boolean;
}

export const EventsPlaza: React.FC<EventsPlazaProps> = React.memo(({ isNightMode = false }) => {
  const eventTexture = useMemo(() => createEventWallTexture(), []);

  return (
    <group position={[0, 0, -62]} name="EventsPlaza">
      {/* 1. Concentric Stepped Stone Event Amphitheater */}
      <group position={[0, 0.05, 0]}>
        {/* Outer Ring Step */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[7.5, 9.5, 36]} />
          <meshStandardMaterial
            color={isNightMode ? '#151821' : '#cbd5e1'}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Step Light Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[7.4, 7.5, 36]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={isNightMode ? 1.8 : 0.8}
          />
        </mesh>

        {/* Middle Ring Step */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
          <ringGeometry args={[5.0, 7.2, 36]} />
          <meshStandardMaterial
            color={isNightMode ? '#1e2430' : '#e2e8f0'}
            roughness={0.25}
          />
        </mesh>

        {/* Central Performance Stage Circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.35, 0]}>
          <circleGeometry args={[4.8, 36]} />
          <meshStandardMaterial
            color={isNightMode ? '#11141c' : '#f8fafc'}
            roughness={0.15}
            metalness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      {/* 2. Twin Towering LED Media Monoliths */}
      {/* Left Media Tower */}
      <group position={[-7.5, 5, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 10, 2.5]} />
          <meshStandardMaterial color="#0b0d10" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.26, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.3, 9.6]} />
          <meshStandardMaterial
            map={eventTexture}
            emissive="#ffffff"
            emissiveIntensity={isNightMode ? 0.6 : 0.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Media Tower */}
      <group position={[7.5, 5, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 10, 2.5]} />
          <meshStandardMaterial color="#0b0d10" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.26, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.3, 9.6]} />
          <meshStandardMaterial
            map={eventTexture}
            emissive="#ffffff"
            emissiveIntensity={isNightMode ? 0.6 : 0.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 3. Services & Concierge Lounge Pavilion (Positioned at West side) */}
      <group position={[-12, 0, 4]}>
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[4.5, 3.6, 5]} />
          <meshStandardMaterial color="#0f141c" roughness={0.4} />
        </mesh>
        <mesh position={[1.5, 0.55, 0]}>
          <boxGeometry args={[0.9, 1.1, 2.6]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[1.96, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 0.4]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#d4af37"
            emissiveIntensity={isNightMode ? 1.5 : 0.8}
          />
        </mesh>
      </group>

      {/* 4. Glass Grand Portal / Exit Facade at Z = -8 */}
      <group position={[0, 8, -8]}>
        <mesh>
          <boxGeometry args={[26, 16, 0.8]} />
          <meshStandardMaterial color="#0f131a" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.45]}>
          <planeGeometry args={[24, 15]} />
          <meshStandardMaterial
            color="#93c5fd"
            transparent
            opacity={0.3}
            roughness={0.05}
          />
        </mesh>
        <mesh position={[0, 0, -1.2]}>
          <planeGeometry args={[36, 22]} />
          <meshBasicMaterial color={isNightMode ? '#070b14' : '#1e293b'} />
        </mesh>
      </group>
    </group>
  );
});
