import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KineticSculptureProps {
  position?: [number, number, number];
}

const cableGeom = new THREE.CylinderGeometry(0.015, 0.015, 10, 6);

export const KineticSculpture: React.FC<KineticSculptureProps> = React.memo(({ position = [0, 8, -5] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.12;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.4;
      ring1Ref.current.rotation.y = t * 0.22;
      ring1Ref.current.rotation.z = Math.cos(t * 0.2) * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * -0.3;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.45;
      ring2Ref.current.rotation.z = t * 0.12;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.cos(t * 0.5) * 0.5;
      ring3Ref.current.rotation.y = t * 0.35;
      ring3Ref.current.rotation.z = Math.sin(t * 0.3) * 0.25;
    }

    if (ring4Ref.current) {
      ring4Ref.current.rotation.x = t * 0.45;
      ring4Ref.current.rotation.y = Math.sin(t * 0.6) * 0.35;
      ring4Ref.current.rotation.z = t * -0.25;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} name="KineticSculpture">
      {/* Suspension Tension Cable */}
      <mesh position={[0, 5, 0]} geometry={cableGeom}>
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
      </mesh>

      {/* Outer Ring 1 (Radius 3.2m, 36 radial segments instead of 64) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.055, 12, 40]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 2 (Radius 2.4m) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.048, 12, 40]} />
        <meshStandardMaterial
          color="#f3e5ab"
          metalness={0.88}
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Ring 3 (Radius 1.7m) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.7, 0.042, 12, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Ring 4 (Radius 1.1m) */}
      <mesh ref={ring4Ref}>
        <torusGeometry args={[1.1, 0.038, 12, 32]} />
        <meshStandardMaterial
          color="#ffe299"
          metalness={0.9}
          roughness={0.22}
          emissive="#aa820a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing Crystalline Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffd27d"
          emissiveIntensity={1.8}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
});
