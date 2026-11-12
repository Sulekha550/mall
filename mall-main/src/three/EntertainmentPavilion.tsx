import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createCinemaMarqueeTexture } from '../utils/textureGenerators';

interface EntertainmentPavilionProps {
  isNightMode?: boolean;
}

const archRibGeom = new THREE.TorusGeometry(2.2, 0.05, 10, 24, Math.PI);

export const EntertainmentPavilion: React.FC<EntertainmentPavilionProps> = React.memo(({ isNightMode = false }) => {
  const marqueeTexture = useMemo(() => createCinemaMarqueeTexture(), []);
  const pulseGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulseGroupRef.current) {
      pulseGroupRef.current.children.forEach((child, idx) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'emissiveIntensity' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
            (isNightMode ? 1.6 : 0.8) + Math.sin(t * 2.0 + idx * 0.8) * 0.5;
        }
      });
    }
  });

  return (
    <group position={[13.5, 6.5, 0]} name="EntertainmentPavilion">
      {/* Upper Deck Cyber Inlay Floor */}
      <mesh position={[-1.5, 0.02, -64]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.5, 14]} />
        <meshStandardMaterial color="#060911" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Cyber Neon Floor Accent Strips */}
      {[-0.8, -2.6].map((xOffset, idx) => (
        <mesh
          key={`cinema-strip-${idx}`}
          position={[xOffset, 0.03, -64]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.08, 14]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={isNightMode ? 2.2 : 1.0}
          />
        </mesh>
      ))}

      {/* Curved Digital Video Wall Marquee (Z = -64) */}
      <mesh position={[0.2, 2.2, -64]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[11, 4.4]} />
        <meshStandardMaterial
          map={marqueeTexture}
          emissive="#ffffff"
          emissiveIntensity={isNightMode ? 0.6 : 0.25}
          roughness={0.25}
        />
      </mesh>

      {/* Portal Canopy Glowing Arch Ribs */}
      <group ref={pulseGroupRef} position={[-1.8, 0, -64]}>
        {[-4, -1.5, 1.5, 4].map((zOffset, idx) => (
          <mesh
            key={`cinema-arch-rib-${idx}`}
            position={[0, 2.2, zOffset]}
            rotation={[0, Math.PI / 2, 0]}
            geometry={archRibGeom}
          >
            <meshStandardMaterial
              color="#00f0ff"
              emissive={idx % 2 === 0 ? '#00f0ff' : '#ff007f'}
              emissiveIntensity={isNightMode ? 1.8 : 0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
});
