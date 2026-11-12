import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createStoreSignTexture } from '../utils/textureGenerators';

interface FirstFloorShopsProps {
  isNightMode?: boolean;
}

const portalFrameGeom = new THREE.BoxGeometry(0.45, 4.0, 7.6);
const bulkheadGeom = new THREE.BoxGeometry(0.25, 0.85, 7.4);
const signPlaneGeom = new THREE.PlaneGeometry(5.0, 0.7);
const vitrineGlassGeom = new THREE.BoxGeometry(0.06, 3.0, 4.4);
const doorOpeningGlassGeom = new THREE.BoxGeometry(0.06, 3.0, 2.6);
const pedestalGeom = new THREE.BoxGeometry(0.65, 0.85, 0.65);
const ceilingTrackGeom = new THREE.BoxGeometry(0.1, 0.08, 5.2);
const floorInsetGeom = new THREE.BoxGeometry(2.0, 0.02, 6.6);

export const FirstFloorShops: React.FC<FirstFloorShopsProps> = React.memo(({ isNightMode = false }) => {
  // Store signs
  const signUrban = useMemo(() => createStoreSignTexture('URBAN THREADS', 'Contemporary Designer Apparel', '#ffffff', '#e2e8f0', '#111827'), []);
  const signVoyage = useMemo(() => createStoreSignTexture('VOYAGE LUGGAGE', 'Travel & Handcrafted Leather', '#ffffff', '#f59e0b', '#1c1917'), []);
  const signChrono = useMemo(() => createStoreSignTexture('CHRONO STUDIO', 'Master Horology & Eyewear', '#ffffff', '#d4af37', '#0f172a'), []);
  const signApex = useMemo(() => createStoreSignTexture('APEX AUDIO', 'High-Fidelity Sound & Acoustics', '#ffffff', '#38bdf8', '#0b1320'), []);
  const signAtelier = useMemo(() => createStoreSignTexture('ATELIER CRAFT', 'Artisanal Leather & Goods', '#ffffff', '#c5a059', '#1a1410'), []);

  const signHabitat = useMemo(() => createStoreSignTexture('HABITAT LIVING', 'Interior Decor & Lighting', '#ffffff', '#10b981', '#141e17'), []);
  const signPrism = useMemo(() => createStoreSignTexture('PRISM JEWELS', 'Fine Diamonds & Joaillerie', '#ffffff', '#c084fc', '#191124'), []);
  const signPlayworld = useMemo(() => createStoreSignTexture('PLAYWORLD KIDS', 'Creative Toys & Family Games', '#ffffff', '#38bdf8', '#0c1a24'), []);
  const signGalleria = useMemo(() => createStoreSignTexture('GALLERIA D’ARTE', 'Contemporary Art & Design', '#ffffff', '#fb923c', '#18120e'), []);
  const signZenith = useMemo(() => createStoreSignTexture('ZENITH OPTICS', 'Luxury Eyewear & Horology', '#ffffff', '#d4af37', '#0f1622'), []);

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
      warmOak: new THREE.MeshStandardMaterial({ color: '#8a6547', roughness: 0.62, metalness: 0.05 }),
      whiteCorian: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.18, metalness: 0.05 }),
      goldAccent: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.22, metalness: 0.9 }),
      storeCeiling: new THREE.MeshStandardMaterial({ color: '#141720', roughness: 0.55 }),
      spotlightWarm: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fef3c7', emissiveIntensity: 1.5 }),
      floorParquet: new THREE.MeshStandardMaterial({ color: '#382b20', roughness: 0.5, metalness: 0.05 }),
      floorTerrazzo: new THREE.MeshStandardMaterial({ color: '#1e2430', roughness: 0.4, metalness: 0.1 })
    };
  }, []);

  return (
    <group position={[0, 6.0, 0]} name="FirstFloorShops">
      {/* ======================================================== */}
      {/* LEFT SIDE SHOPS (X = -13.5, Facing +X into corridor)      */}
      {/* ======================================================== */}
      <group position={[-13.5, 0, 0]}>
        {/* SHOP 1L: URBAN THREADS (Z = 4) */}
        <group position={[0, 0, 4]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.5, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signUrban} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[-0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorParquet} />
          <mesh position={[-0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          <mesh position={[-0.8, 3.52, 0]} geometry={ceilingTrackGeom} material={materials.darkCharcoal} />
          {/* Boutique apparel fixture */}
          <group position={[-0.8, 0, 1.2]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.7, 0.8, 2.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.2} />
            </mesh>
            {[-0.8, 0, 0.8].map((gz, gi) => (
              <mesh key={`urban-garment-${gi}`} position={[0, 0.86, gz]}>
                <boxGeometry args={[0.35, 0.12, 0.45]} />
                <meshStandardMaterial color={['#1e293b', '#b48a3c', '#475569'][gi]} />
              </mesh>
            ))}
          </group>
          <mesh position={[-1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#1f2937" roughness={0.5} />
          </mesh>
        </group>

        {/* SHOP 2L: VOYAGE LUGGAGE (Z = -4) */}
        <group position={[0, 0, -4]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.champagneBronze} />
          <mesh position={[0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.5, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signVoyage} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[-0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorParquet} />
          <mesh position={[-0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          {[-0.8, 0.4, 1.6].map((zOff, i) => (
            <group key={`luggage-${i}`} position={[-0.8, 0, zOff]}>
              <mesh position={[0, 0.4, 0]} geometry={pedestalGeom} material={materials.warmOak} />
              <mesh position={[0, 1.05, 0]}>
                <boxGeometry args={[0.32, 0.48, 0.32]} />
                <meshStandardMaterial color={i === 1 ? '#d4af37' : '#1e293b'} roughness={0.4} metalness={0.25} />
              </mesh>
            </group>
          ))}
          <mesh position={[-1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#292524" roughness={0.5} />
          </mesh>
        </group>

        {/* SHOP 3L: CHRONO WATCHES (Z = -14) */}
        <group position={[0, 0, -14]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.5, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signChrono} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[-0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorTerrazzo} />
          <mesh position={[-0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          <group position={[-0.8, 0, 0.8]}>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.8, 1.0, 3.0]} />
              <meshStandardMaterial color="#0b0d12" roughness={0.15} metalness={0.4} />
            </mesh>
            {[-0.8, 0, 0.8].map((zOff, i) => (
              <mesh key={`watch-stand-${i}`} position={[0, 1.15, zOff]}>
                <cylinderGeometry args={[0.14, 0.14, 0.22, 16]} />
                <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
              </mesh>
            ))}
          </group>
          <mesh position={[-1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
        </group>

        {/* SHOP 4L: APEX AUDIO & ACOUSTICS (Z = -24, Flanking Escalator Landing) */}
        <group position={[0, 0, -24]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.5, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signApex} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[-0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorTerrazzo} />
          <mesh position={[-0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          {/* Speaker Towers Display */}
          {[-1.0, 0.0, 1.0].map((sz, si) => (
            <mesh key={`speaker-${si}`} position={[-0.8, 0.65, sz]}>
              <boxGeometry args={[0.35, 1.3, 0.35]} />
              <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.7} />
            </mesh>
          ))}
          <mesh position={[-1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#0a0f1d" roughness={0.4} />
          </mesh>
        </group>

        {/* SHOP 5L: ATELIER CRAFT (Z = -34, Flanking Escalator Arrival) */}
        <group position={[0, 0, -34]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.champagneBronze} />
          <mesh position={[0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[0.38, 3.5, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signAtelier} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[-0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[-0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorParquet} />
          <mesh position={[-0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          {/* Leather Handbag Showcase */}
          <group position={[-0.8, 0, 0.8]}>
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.8, 0.9, 2.6]} />
              <meshStandardMaterial color="#2d1c14" roughness={0.6} />
            </mesh>
            {[-0.8, 0, 0.8].map((bz, bi) => (
              <mesh key={`art-bag-${bi}`} position={[0, 1.05, bz]}>
                <boxGeometry args={[0.26, 0.32, 0.36]} />
                <meshStandardMaterial color={bi === 1 ? '#c5a059' : '#854d0e'} roughness={0.4} />
              </mesh>
            ))}
          </group>
          <mesh position={[-1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#24140c" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* RIGHT SIDE SHOPS (X = +13.5, Facing -X into corridor)     */}
      {/* ======================================================== */}
      <group position={[13.5, 0, 0]}>
        {/* SHOP 1R: HABITAT LIVING (Z = 4) */}
        <group position={[0, 0, 4]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.warmOak} />
          <mesh position={[-0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.5, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signHabitat} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorParquet} />
          <mesh position={[0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          <group position={[0.8, 0, 0.8]}>
            <mesh position={[0, 0.42, 0]}>
              <boxGeometry args={[0.7, 0.85, 2.8]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
            </mesh>
            {[-0.7, 0.7].map((zOff, i) => (
              <mesh key={`vase-${i}`} position={[0, 1.05, zOff]}>
                <cylinderGeometry args={[0.12, 0.16, 0.38, 12]} />
                <meshStandardMaterial color="#059669" roughness={0.3} />
              </mesh>
            ))}
          </group>
          <mesh position={[1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#1c1917" roughness={0.6} />
          </mesh>
        </group>

        {/* SHOP 2R: PRISM FINE JEWELS (Z = -4) */}
        <group position={[0, 0, -4]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.5, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signPrism} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorTerrazzo} />
          <mesh position={[0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          <group position={[0.8, 0, 0.8]}>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.8, 1.0, 3.0]} />
              <meshStandardMaterial color="#1a1024" roughness={0.2} metalness={0.4} />
            </mesh>
            {[-0.8, 0, 0.8].map((zOff, i) => (
              <mesh key={`gem-${i}`} position={[0, 1.15, zOff]}>
                <octahedronGeometry args={[0.15]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.06} />
              </mesh>
            ))}
          </group>
          <mesh position={[1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#2e1065" roughness={0.4} />
          </mesh>
        </group>

        {/* SHOP 3R: PLAYWORLD KIDS (Z = -14) */}
        <group position={[0, 0, -14]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.whiteCorian} />
          <mesh position={[-0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.5, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signPlayworld} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorParquet} />
          <mesh position={[0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          <group position={[0.8, 0, 0.8]}>
            {[-0.9, 0, 0.9].map((zOff, i) => (
              <mesh key={`toy-cube-${i}`} position={[0, 0.5, zOff]}>
                <boxGeometry args={[0.55, 0.65, 0.65]} />
                <meshStandardMaterial color={['#38bdf8', '#fbbf24', '#f87171'][i]} roughness={0.3} />
              </mesh>
            ))}
          </group>
          <mesh position={[1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#0c4a6e" roughness={0.5} />
          </mesh>
        </group>

        {/* SHOP 4R: GALLERIA D'ARTE (Z = -24, Flanking Escalator Landing) */}
        <group position={[0, 0, -24]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.5, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signGalleria} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorTerrazzo} />
          <mesh position={[0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          {/* Contemporary Sculptural Plinths */}
          {[-0.8, 0.8].map((pz, pi) => (
            <group key={`sculpture-${pi}`} position={[0.8, 0, pz]}>
              <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.28, 0.32, 0.9, 16]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} />
              </mesh>
              <mesh position={[0, 1.15, 0]}>
                <dodecahedronGeometry args={[0.22]} />
                <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}
          <mesh position={[1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#1a1410" roughness={0.5} />
          </mesh>
        </group>

        {/* SHOP 5R: ZENITH OPTICS (Z = -34, Flanking Escalator Arrival) */}
        <group position={[0, 0, -34]}>
          <mesh position={[0, 2.0, 0]} geometry={portalFrameGeom} material={materials.champagneBronze} />
          <mesh position={[-0.24, 3.5, 0]} geometry={bulkheadGeom} material={materials.darkCharcoal} />
          <mesh position={[-0.38, 3.5, 0]} rotation={[0, Math.PI, 0]} geometry={signPlaneGeom}>
            <meshStandardMaterial map={signZenith} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.45} />
          </mesh>
          <mesh position={[-0.2, 1.5, 1.2]} geometry={vitrineGlassGeom} material={materials.glass} />
          <mesh position={[0.4, 1.5, -2.2]} geometry={doorOpeningGlassGeom} material={materials.glass} />
          <mesh position={[0.9, 0.015, 0]} geometry={floorInsetGeom} material={materials.floorTerrazzo} />
          <mesh position={[0.9, 3.6, 0]} geometry={floorInsetGeom} material={materials.storeCeiling} />
          {/* Eyewear Vitrine Display */}
          <group position={[0.8, 0, 0.8]}>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.8, 1.0, 2.8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.4} />
            </mesh>
            {[-0.8, 0, 0.8].map((ez, ei) => (
              <mesh key={`eyewear-${ei}`} position={[0, 1.08, ez]}>
                <boxGeometry args={[0.2, 0.08, 0.4]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
              </mesh>
            ))}
          </group>
          <mesh position={[1.8, 2.0, 0]}>
            <boxGeometry args={[0.2, 3.2, 6.4]} />
            <meshStandardMaterial color="#0e1726" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
});
