import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createStoreSignTexture } from '../utils/textureGenerators';

interface GroundFloorShopsProps {
  isNightMode?: boolean;
}

// -------------------------------------------------------------
// Shared Geometries for Storefronts & Interiors
// -------------------------------------------------------------
const portalFrameGeom = new THREE.BoxGeometry(0.45, 4.2, 7.8);
const bulkheadGeom = new THREE.BoxGeometry(0.25, 0.9, 7.6);
const signPlaneGeom = new THREE.PlaneGeometry(5.2, 0.75);
const vitrineGlassGeom = new THREE.BoxGeometry(0.06, 3.1, 4.4);
const doorOpeningGlassGeom = new THREE.BoxGeometry(0.06, 3.1, 2.6);
const ceilingTrackGeom = new THREE.BoxGeometry(0.1, 0.08, 5.4);
const spotCanisterGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.14, 8);
const plinthGeom = new THREE.CylinderGeometry(0.42, 0.48, 0.45, 16);
const mannequinTorsoGeom = new THREE.ConeGeometry(0.26, 0.95, 12);
const mannequinHeadGeom = new THREE.SphereGeometry(0.13, 12, 12);
const tableGeom = new THREE.BoxGeometry(1.3, 0.75, 2.4);
const ottomanBenchGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.45, 16);
const clothingRailBarGeom = new THREE.CylinderGeometry(0.02, 0.02, 2.4, 8);
const clothingItemGeom = new THREE.BoxGeometry(0.35, 0.6, 0.12);
const storeFloorInsetGeom = new THREE.BoxGeometry(2.2, 0.02, 6.8);

export const GroundFloorShops: React.FC<GroundFloorShopsProps> = React.memo(({ isNightMode = false }) => {
  // Brand signboards with customized styling
  const signVerve = useMemo(() => createStoreSignTexture('VERVE', 'Haute Couture & Fine Apparel', '#ffffff', '#c5a059', '#12151c'), []);
  const signSole = useMemo(() => createStoreSignTexture('SOLE & STEP', 'Footwear & Leather Atelier', '#ffffff', '#38bdf8', '#0c1219'), []);
  const signNexa = useMemo(() => createStoreSignTexture('NEXA DIGITAL', 'Smart Electronics & Spatial Tech', '#ffffff', '#4ade80', '#0a1014'), []);

  const signAura = useMemo(() => createStoreSignTexture('AURA STUDIO', 'Designer Living & Lighting', '#ffffff', '#f59e0b', '#181410'), []);
  const signLumina = useMemo(() => createStoreSignTexture('LUMINA BEAUTY', 'Luxury Cosmetics & Fragrance', '#ffffff', '#f472b6', '#180f14'), []);
  const signKinetix = useMemo(() => createStoreSignTexture('KINETIX SPORT', 'Athletic Performance & Gear', '#ffffff', '#fb923c', '#15100c'), []);

  const materials = useMemo(() => {
    return {
      glass: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.03,
        metalness: 0.1,
        transparent: true,
        opacity: 0.26
      }),
      darkCharcoal: new THREE.MeshStandardMaterial({ color: '#161920', roughness: 0.32, metalness: 0.82 }),
      champagneBronze: new THREE.MeshStandardMaterial({ color: '#c5a059', roughness: 0.26, metalness: 0.88 }),
      brushedSteel: new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.22, metalness: 0.9 }),
      warmOak: new THREE.MeshStandardMaterial({ color: '#8a6547', roughness: 0.62, metalness: 0.05 }),
      whiteCorian: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.18, metalness: 0.05 }),
      goldAccent: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.22, metalness: 0.9 }),
      storeCeiling: new THREE.MeshStandardMaterial({ color: '#141720', roughness: 0.55 }),
      spotlightWarm: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fef3c7', emissiveIntensity: 1.6 }),
      neonCyan: new THREE.MeshStandardMaterial({ color: '#38bdf8', emissive: '#38bdf8', emissiveIntensity: 1.5 }),
      neonOrange: new THREE.MeshStandardMaterial({ color: '#fb923c', emissive: '#fb923c', emissiveIntensity: 1.5 }),
      darkWoodFloor: new THREE.MeshStandardMaterial({ color: '#1c1511', roughness: 0.5, metalness: 0.08 }),
      concreteFloor: new THREE.MeshStandardMaterial({ color: '#272d37', roughness: 0.6, metalness: 0.1 })
    };
  }, []);

  return (
    <group name="GroundFloorShops">
      {/* ======================================================== */}
      {/* LEFT SIDE SHOPS (X = -13.5, Facing +X into corridor)      */}
      {/* ======================================================== */}
      <group position={[-13.5, 0, 0]}>
        {/* SHOP 1: VERVE APPAREL (Z = 6) */}
        <group position={[0, 0, 6]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.champagneBronze} />
          <mesh position={[0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.65, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signVerve} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[-1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.darkWoodFloor} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[-1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />
          <group position={[-0.8, 3.6, 0]}>
            <mesh geometry={ceilingTrackGeom} material={materials.darkCharcoal} />
            {[-1.8, -0.6, 0.6, 1.8].map((z, i) => (
              <mesh key={`verve-spot-${i}`} position={[0, -0.08, z]} geometry={spotCanisterGeom} material={materials.spotlightWarm} />
            ))}
          </group>

          {/* Interior: Mannequins on Gold Plinths */}
          <group position={[-0.9, 0, 2.0]}>
            <mesh position={[0, 0.22, 0]} geometry={plinthGeom} material={materials.goldAccent} />
            <mesh position={[0, 1.1, 0]} geometry={mannequinTorsoGeom} material={materials.whiteCorian} />
            <mesh position={[0, 1.62, 0]} geometry={mannequinHeadGeom} material={materials.goldAccent} />
          </group>
          <group position={[-0.9, 0, 0.6]}>
            <mesh position={[0, 0.22, 0]} geometry={plinthGeom} material={materials.goldAccent} />
            <mesh position={[0, 1.1, 0]} geometry={mannequinTorsoGeom} material={materials.whiteCorian} />
            <mesh position={[0, 1.62, 0]} geometry={mannequinHeadGeom} material={materials.goldAccent} />
          </group>

          {/* Clothing Display Rack with Hung Garments */}
          <group position={[-1.2, 0, -1.2]}>
            <mesh position={[0, 0.85, -1.2]}><cylinderGeometry args={[0.02, 0.02, 1.7, 8]} /><meshStandardMaterial color="#c5a059" metalness={0.85} roughness={0.25} /></mesh>
            <mesh position={[0, 0.85, 1.2]}><cylinderGeometry args={[0.02, 0.02, 1.7, 8]} /><meshStandardMaterial color="#c5a059" metalness={0.85} roughness={0.25} /></mesh>
            <mesh position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={clothingRailBarGeom} material={materials.goldAccent} />
            {[-0.8, -0.4, 0, 0.4, 0.8].map((cz, ci) => (
              <mesh key={`cloth-${ci}`} position={[0, 1.15, cz]} geometry={clothingItemGeom}>
                <meshStandardMaterial color={['#f8fafc', '#1e293b', '#b48a3c', '#991b1b', '#0f766e'][ci]} roughness={0.7} />
              </mesh>
            ))}
          </group>

          {/* Walnut Feature Display Back Wall */}
          <mesh position={[-1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#2c1e14" roughness={0.65} />
          </mesh>
        </group>

        {/* SHOP 2: SOLE & STEP (Z = -4) */}
        <group position={[0, 0, -4]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.65, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signSole} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[-1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.concreteFloor} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[-1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />

          {/* Interior: Floating Illuminated Shoe Shelves */}
          {[-1.0, 0, 1.0].map((yOff, yi) => (
            <group key={`shelf-row-${yi}`} position={[-1.7, 1.2 + yOff * 0.6, 0]}>
              <mesh>
                <boxGeometry args={[0.3, 0.04, 5.0]} />
                <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={0.6} />
              </mesh>
              {/* Shoes on Shelf */}
              {[-1.8, -0.9, 0, 0.9, 1.8].map((sz, si) => (
                <mesh key={`shoe-${yi}-${si}`} position={[0.08, 0.08, sz]}>
                  <boxGeometry args={[0.2, 0.08, 0.35]} />
                  <meshStandardMaterial color={['#f8fafc', '#18181b', '#d4af37', '#e11d48', '#2563eb'][(yi + si) % 5]} />
                </mesh>
              ))}
            </group>
          ))}

          {/* Center Fitting Ottoman Bench */}
          <group position={[-0.9, 0, 0]}>
            <mesh position={[0, 0.22, 0]} geometry={ottomanBenchGeom}>
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
          </group>

          {/* Dark Architectural Back Wall */}
          <mesh position={[-1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
        </group>

        {/* SHOP 3: NEXA DIGITAL (Z = -14) */}
        <group position={[0, 0, -14]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.brushedSteel} />
          <mesh position={[0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.65, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signNexa} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[-1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.concreteFloor} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[-1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />

          {/* Interior: Dual Modern Tech Demonstration Islands */}
          <group position={[-1.0, 0, 0.8]}>
            <mesh position={[0, 0.42, 0]} geometry={tableGeom} material={materials.warmOak} />
            {/* Glowing Touch Tablets & Devices */}
            {[-0.8, -0.25, 0.25, 0.8].map((zOff, i) => (
              <mesh key={`tech-dev-${i}`} position={[0, 0.82, zOff]}>
                <boxGeometry args={[0.32, 0.03, 0.22]} />
                <meshStandardMaterial color="#ffffff" emissive="#4ade80" emissiveIntensity={0.85} />
              </mesh>
            ))}
          </group>

          {/* Feature Tech Media Wall */}
          <mesh position={[-1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#020617" roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* RIGHT SIDE SHOPS (X = +13.5, Facing -X into corridor)     */}
      {/* ======================================================== */}
      <group position={[13.5, 0, 0]}>
        {/* SHOP 4: AURA STUDIO (Z = 6) */}
        <group position={[0, 0, 6]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.warmOak} />
          <mesh position={[-0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.65, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signAura} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.darkWoodFloor} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />

          {/* Interior: Designer Handbag & Accessory Stands */}
          <group position={[0.9, 0, 0.8]}>
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.9, 0.85, 2.8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.2} />
            </mesh>
            {[-0.9, 0, 0.9].map((zOff, i) => (
              <mesh key={`bag-${i}`} position={[0, 1.05, zOff]}>
                <boxGeometry args={[0.25, 0.32, 0.38]} />
                <meshStandardMaterial color="#b48a3c" metalness={0.85} roughness={0.22} />
              </mesh>
            ))}
          </group>

          {/* Fluted Timber Accent Back Wall */}
          <mesh position={[1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#3e271a" roughness={0.6} />
          </mesh>
        </group>

        {/* SHOP 5: LUMINA BEAUTY (Z = -4) */}
        <group position={[0, 0, -4]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.whiteCorian} />
          <mesh position={[-0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.65, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signLumina} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.whiteCorian} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />

          {/* Interior: Perfume & Cosmetics Vanity Bar */}
          <group position={[0.9, 0, 0.8]}>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.85, 1.0, 3.4]} />
              <meshStandardMaterial color="#fdf2f8" roughness={0.15} />
            </mesh>
            {/* Vanity Ring Mirror Light */}
            <mesh position={[0, 1.35, 0]}>
              <ringGeometry args={[0.35, 0.42, 24]} />
              <meshStandardMaterial color="#ffffff" emissive="#f472b6" emissiveIntensity={1.4} />
            </mesh>
            {/* Perfume Bottles */}
            {[-1.2, -0.6, 0.6, 1.2].map((zOff, i) => (
              <mesh key={`perfume-${i}`} position={[0, 1.15, zOff]}>
                <cylinderGeometry args={[0.08, 0.08, 0.25, 12]} />
                <meshStandardMaterial color="#f472b6" roughness={0.1} metalness={0.4} />
              </mesh>
            ))}
          </group>

          <mesh position={[1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#fce7f3" roughness={0.3} />
          </mesh>
        </group>

        {/* SHOP 6: KINETIX SPORT (Z = -14) */}
        <group position={[0, 0, -14]}>
          <mesh position={[0, 2.1, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.24, 3.65, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.65, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signKinetix} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.6, 1.3]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.6, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />

          {/* Store Interior Flooring Inset */}
          <mesh position={[1.0, 0.015, 0]} geometry={storeFloorInsetGeom} material={materials.concreteFloor} />

          {/* Store Interior Ceiling & Track Lights */}
          <mesh position={[1.0, 3.7, 0]} geometry={storeFloorInsetGeom} material={materials.storeCeiling} />

          {/* Interior: Athletic Mannequins & Sneaker Showcase Wall */}
          <group position={[0.9, 0, 1.2]}>
            <mesh position={[0, 0.22, 0]} geometry={plinthGeom} material={materials.darkCharcoal} />
            <mesh position={[0, 1.1, 0]} geometry={mannequinTorsoGeom} material={materials.darkCharcoal} />
            <mesh position={[0, 1.62, 0]} geometry={mannequinHeadGeom} material={materials.neonOrange} />
          </group>

          <mesh position={[1.9, 1.9, 0]}>
            <boxGeometry args={[0.2, 3.4, 6.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
});
