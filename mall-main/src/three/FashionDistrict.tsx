import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createFashionEditorialTexture } from '../utils/textureGenerators';

interface FashionDistrictProps {
  isNightMode?: boolean;
}

export const FashionDistrict: React.FC<FashionDistrictProps> = React.memo(({ isNightMode = false }) => {
  const textureAura = useMemo(() => createFashionEditorialTexture('AURA', 'Haute Couture · Paris'), []);

  return (
    <group position={[-13.5, 0, 0]} name="FashionDistrict">
      {/* Ground Floor Runway Inlay Strip */}
      <mesh position={[1.5, 0.02, -14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 16]} />
        <meshStandardMaterial
          color={isNightMode ? '#1e1c18' : '#e2d5c3'}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Flagship Storefront: AURA ATELIER (Z = -14) */}
      <group position={[0, 0, -14]}>
        {/* Storefront Bronze Frame */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[0.5, 4.2, 7.5]} />
          <meshStandardMaterial color="#1f1811" roughness={0.3} metalness={0.75} />
        </mesh>

        {/* Store Header Marquee */}
        <mesh position={[0.26, 3.8, 0]}>
          <boxGeometry args={[0.2, 0.8, 7.2]} />
          <meshStandardMaterial color="#0d0f12" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Backlit Store Sign: AURA ATELIER */}
        <mesh position={[0.38, 3.8, 0]}>
          <planeGeometry args={[4.8, 0.5]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#d4af37"
            emissiveIntensity={isNightMode ? 2.0 : 1.0}
            roughness={0.15}
          />
        </mesh>

        {/* Floor-to-Ceiling Clear Glass Vitrine */}
        <mesh position={[0.2, 1.8, 0]}>
          <boxGeometry args={[0.1, 3.2, 7.0]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.32}
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>

        {/* Inside Vitrine: High-Res Editorial Campaign Display */}
        <mesh position={[-0.4, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[6.2, 3.0]} />
          <meshStandardMaterial
            map={textureAura}
            emissive="#ffffff"
            emissiveIntensity={isNightMode ? 0.4 : 0.18}
            roughness={0.25}
          />
        </mesh>

        {/* Sculptural Mannequin Display Plinth */}
        <group position={[1.4, 0, 0.6]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.5, 0.55, 0.7, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.2} />
          </mesh>

          {/* Abstract Haute Couture Torso */}
          <group position={[0, 1.35, 0]}>
            <mesh>
              <coneGeometry args={[0.35, 1.0, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
});
