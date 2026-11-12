import React from 'react';
import * as THREE from 'three';

interface DiningTerraceProps {
  isNightMode?: boolean;
}

export const DiningTerrace: React.FC<DiningTerraceProps> = React.memo(({ isNightMode = false }) => {
  return (
    <group position={[-13.5, 6.5, 0]} name="DiningTerrace">
      {/* Warm Natural Timber Decking */}
      <mesh position={[1.5, 0.02, -52]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 16]} />
        <meshStandardMaterial
          color={isNightMode ? '#3e271a' : '#8c5836'}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Living Vertical Greenery Wall Backdrop */}
      <mesh position={[-0.4, 2.2, -52]} castShadow>
        <boxGeometry args={[0.3, 4.4, 16]} />
        <meshStandardMaterial color="#1e3a24" roughness={0.8} />
      </mesh>

      {/* Botanical Foliage Clusters on Wall */}
      {[-57, -54, -51, -48].map((zPos, i) => (
        <group key={`foliage-cluster-${i}`} position={[-0.2, 2.3, zPos]}>
          <mesh>
            <sphereGeometry args={[0.75, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#2d5a37' : '#3f734b'} roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.6, 0.4]}>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial color="#22482c" roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Backlit Honey Onyx Café & Cocktail Bar Counter (at Z = -49) */}
      <group position={[1.5, 0, -49]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[1.2, 1.1, 4.2]} />
          <meshStandardMaterial
            color="#fde047"
            emissive="#ca8a04"
            emissiveIntensity={isNightMode ? 1.0 : 0.5}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 1.12, 0]}>
          <boxGeometry args={[1.35, 0.08, 4.4]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
        </mesh>
        {/* Bar Stools */}
        {[-1.4, 0, 1.4].map((zOffset, idx) => (
          <group key={`dining-stool-${idx}`} position={[0.9, 0, zOffset]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.8, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.82, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
              <meshStandardMaterial color="#1a1c22" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Modern Dining Tables (at Z = -53, -56) */}
      {[-53, -56].map((zPos, idx) => (
        <group key={`upper-table-${idx}`} position={[2.8, 0, zPos]}>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.06, 0.22, 0.75, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.77, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.05, 16]} />
            <meshStandardMaterial color="#4a2e1d" roughness={0.45} />
          </mesh>
          {[0, Math.PI].map((angle, cIdx) => (
            <group
              key={`upper-chair-${cIdx}`}
              position={[Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95]}
              rotation={[0, -angle + Math.PI / 2, 0]}
            >
              <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.02, 0.03, 0.5, 6]} />
                <meshStandardMaterial color="#1f2937" metalness={0.6} />
              </mesh>
              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.42, 0.05, 0.42]} />
                <meshStandardMaterial color="#d1d5db" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.76, -0.18]}>
                <boxGeometry args={[0.42, 0.45, 0.04]} />
                <meshStandardMaterial color="#d1d5db" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Overhead Timber Pergola with Warm Festoon Globe Lights */}
      <group position={[2, 3.8, -52]}>
        {[-6, -3, 0, 3, 6].map((zOffset, i) => (
          <mesh key={`pergola-top-beam-${i}`} position={[0, 0, zOffset]}>
            <boxGeometry args={[4.8, 0.12, 0.12]} />
            <meshStandardMaterial color="#3e271a" roughness={0.7} />
          </mesh>
        ))}

        {[-4.5, -1.5, 1.5, 4.5].map((zOffset, i) => (
          <group key={`upper-pendant-${i}`} position={[(i % 2 === 0 ? 0.8 : -0.8), 0, zOffset]}>
            <mesh position={[0, -1.05, 0]}>
              <sphereGeometry args={[0.14, 10, 10]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffaa44"
                emissiveIntensity={isNightMode ? 2.6 : 1.2}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Restaurant Header Marquee: LE CIEL BISTRO */}
      <mesh position={[-0.2, 3.6, -52]}>
        <planeGeometry args={[4.2, 0.6]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#fde047"
          emissiveIntensity={isNightMode ? 1.6 : 0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
});
