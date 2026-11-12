import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneLightingProps {
  isNightMode: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({ isNightMode }) => {
  const { size } = useThree();
  const isMobile = size.width < 768;

  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const prevNightModeRef = useRef<boolean>(isNightMode);
  const transitionActiveRef = useRef<boolean>(false);

  // Trigger transition only when isNightMode changes
  if (prevNightModeRef.current !== isNightMode) {
    prevNightModeRef.current = isNightMode;
    transitionActiveRef.current = true;
  }

  useFrame((_, delta) => {
    if (!transitionActiveRef.current) return;

    if (dirLightRef.current && ambientLightRef.current) {
      const targetSun = isNightMode ? 0.35 : 1.85;
      const targetAmb = isNightMode ? 0.45 : 1.25;

      dirLightRef.current.intensity = THREE.MathUtils.damp(
        dirLightRef.current.intensity,
        targetSun,
        4.5,
        delta
      );
      ambientLightRef.current.intensity = THREE.MathUtils.damp(
        ambientLightRef.current.intensity,
        targetAmb,
        4.5,
        delta
      );

      // Stop updating when converged to save CPU
      if (
        Math.abs(dirLightRef.current.intensity - targetSun) < 0.01 &&
        Math.abs(ambientLightRef.current.intensity - targetAmb) < 0.01
      ) {
        dirLightRef.current.intensity = targetSun;
        ambientLightRef.current.intensity = targetAmb;
        transitionActiveRef.current = false;
      }
    }
  });

  return (
    <group name="SceneLighting">
      {/* Ambient fill */}
      <ambientLight
        ref={ambientLightRef}
        intensity={isNightMode ? 0.45 : 1.25}
        color={isNightMode ? '#1e2433' : '#f8fafd'}
      />

      {/* Main directional skylight sun / moon - positioned to illuminate both exterior facade and interior atrium */}
      <directionalLight
        ref={dirLightRef}
        position={[14, 28, 38]}
        intensity={isNightMode ? 0.35 : 1.85}
        color={isNightMode ? '#8aa4d6' : '#fffaf0'}
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={2}
        shadow-camera-far={85}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0004}
      />

      {/* Secondary fill light */}
      <directionalLight
        position={[-14, 22, 15]}
        intensity={isNightMode ? 0.25 : 0.65}
        color={isNightMode ? '#51457a' : '#f0f5fa'}
      />

      {/* Entrance Canopy Welcome Light */}
      <pointLight
        position={[0, 4.0, 22]}
        intensity={isNightMode ? 1.6 : 0.9}
        distance={14}
        decay={2}
        color="#fff4e0"
      />

      {/* Central Atrium Warm Key */}
      <pointLight
        position={[0, 9, -5]}
        intensity={isNightMode ? 2.0 : 1.0}
        distance={18}
        decay={2}
        color="#fff5ea"
      />

      {/* Ground Floor Fashion & Luxury Promenades */}
      <pointLight
        position={[-10, 5, -16]}
        intensity={isNightMode ? 1.8 : 0.8}
        distance={15}
        decay={2}
        color="#fff1d6"
      />

      <pointLight
        position={[10, 5, -26]}
        intensity={isNightMode ? 1.8 : 0.85}
        distance={15}
        decay={2}
        color="#fff2de"
      />

      {/* Level 2 Food Court & Cinema Concourse (desktop only to save mobile fragment passes) */}
      {!isMobile && (
        <>
          <pointLight
            position={[-4, 14.5, -38]}
            intensity={isNightMode ? 1.8 : 0.9}
            distance={18}
            decay={2}
            color="#ffecd1"
          />

          <pointLight
            position={[0, 14.5, -62]}
            intensity={isNightMode ? 2.0 : 1.0}
            distance={18}
            decay={2}
            color="#dbeafe"
          />
        </>
      )}
    </group>
  );
};
