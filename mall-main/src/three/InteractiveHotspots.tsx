import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HOTSPOTS } from '../data/mallConfig';
import { HotspotData } from '../types';

interface InteractiveHotspotsProps {
  onSelectHotspot: (hotspot: HotspotData) => void;
}

// Shared geometries to reduce allocations & draw overhead
const ringGeom = new THREE.RingGeometry(0.35, 0.45, 24);
const coreGeom = new THREE.OctahedronGeometry(0.2, 0);

const SingleHotspot: React.FC<{
  hotspot: HotspotData;
  onSelect: (hotspot: HotspotData) => void;
}> = React.memo(({ hotspot, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.5;
      const targetScale = hovered ? 1.3 : 1.0 + Math.sin(t * 3) * 0.08;
      ringRef.current.scale.set(targetScale, targetScale, targetScale);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 2;
    }
  });

  return (
    <group
      position={hotspot.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(hotspot);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Outer Rotating Glowing Ring */}
      <mesh ref={ringRef} geometry={ringGeom}>
        <meshBasicMaterial
          color={hovered ? '#ffffff' : '#d4af37'}
          transparent
          opacity={hovered ? 0.95 : 0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pulsing Core Gem */}
      <mesh ref={coreRef} geometry={coreGeom}>
        <meshStandardMaterial
          color="#ffffff"
          emissive={hovered ? '#ffffff' : '#d4af37'}
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
});

export const InteractiveHotspots: React.FC<InteractiveHotspotsProps> = React.memo(({ onSelectHotspot }) => {
  return (
    <group name="InteractiveHotspots">
      {HOTSPOTS.map((h) => (
        <SingleHotspot key={h.id} hotspot={h} onSelect={onSelectHotspot} />
      ))}
    </group>
  );
});
