import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ShoppersAndAmbienceProps {
  isNightMode?: boolean;
}

// ---------------------------------------------------------------------
// Shared Geometries for Stylized Architectural Scale Figures
// Clean, low-poly minimalist silhouettes matching high-end arch-viz standards.
// Zero per-frame allocations, efficient instanced/shared rendering.
// ---------------------------------------------------------------------
// Standing Figure Geometries
const headGeom = new THREE.SphereGeometry(0.12, 10, 10);
const neckGeom = new THREE.CylinderGeometry(0.045, 0.05, 0.08, 8);
const torsoGeom = new THREE.CylinderGeometry(0.18, 0.14, 0.65, 8);
const hipsGeom = new THREE.CylinderGeometry(0.14, 0.13, 0.2, 8);
const legGeom = new THREE.CylinderGeometry(0.065, 0.05, 0.85, 8);
const armGeom = new THREE.CylinderGeometry(0.045, 0.04, 0.6, 8);
const shoppingBagGeom = new THREE.BoxGeometry(0.14, 0.28, 0.24);

// Seated Figure Geometries (for Food Court Dining)
const seatedThighGeom = new THREE.CylinderGeometry(0.065, 0.055, 0.42, 8);
const seatedShinGeom = new THREE.CylinderGeometry(0.055, 0.05, 0.45, 8);

// Concourse Wayfinding Totem Geometries
const totemBaseGeom = new THREE.BoxGeometry(0.9, 0.08, 0.5);
const totemPillarGeom = new THREE.BoxGeometry(0.75, 2.1, 0.18);
const totemScreenGeom = new THREE.PlaneGeometry(0.62, 1.35);

// Concourse Luxury Bench with Integrated Planter
const benchPlinthGeom = new THREE.BoxGeometry(3.6, 0.42, 1.1);
const benchWoodTopGeom = new THREE.BoxGeometry(2.2, 0.06, 0.9);
const benchPlanterSoilGeom = new THREE.BoxGeometry(1.0, 0.04, 0.9);
const benchFoliageGeom = new THREE.BoxGeometry(0.9, 0.65, 0.8);

export const ShoppersAndAmbience: React.FC<ShoppersAndAmbienceProps> = React.memo(({ isNightMode = false }) => {
  // Architectural Palette for Human Scale Figures
  const figureMaterials = useMemo(() => {
    return [
      // Charcoal tailored suit / jacket
      new THREE.MeshStandardMaterial({ color: '#1e2430', roughness: 0.65 }),
      // Cream / off-white contemporary attire
      new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.6 }),
      // Slate navy
      new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.65 }),
      // Camel / warm sand coat
      new THREE.MeshStandardMaterial({ color: '#9a7b56', roughness: 0.7 }),
      // Forest deep green
      new THREE.MeshStandardMaterial({ color: '#1e382b', roughness: 0.7 }),
      // Subtle terracotta
      new THREE.MeshStandardMaterial({ color: '#88432a', roughness: 0.7 })
    ];
  }, []);

  const sharedMats = useMemo(() => {
    return {
      totemBody: new THREE.MeshStandardMaterial({ color: '#0d1117', metalness: 0.8, roughness: 0.25 }),
      totemScreen: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#38bdf8',
        emissiveIntensity: isNightMode ? 0.9 : 0.45
      }),
      benchStone: new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.45, metalness: 0.1 }),
      benchWood: new THREE.MeshStandardMaterial({ color: '#7c4d32', roughness: 0.6, metalness: 0.05 }),
      benchGreenery: new THREE.MeshStandardMaterial({
        color: isNightMode ? '#1e3825' : '#2d6a3b',
        roughness: 0.8
      }),
      shoppingBagGold: new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.8, roughness: 0.25 }),
      shoppingBagDark: new THREE.MeshStandardMaterial({ color: '#161922', roughness: 0.5 })
    };
  }, [isNightMode]);

  // Standing Shopper Definition
  const renderStandingFigure = (
    pos: [number, number, number],
    rotY: number,
    matIdx: number,
    hasBag: boolean = false,
    key: string
  ) => {
    const mat = figureMaterials[matIdx % figureMaterials.length];
    return (
      <group key={key} position={pos} rotation={[0, rotY, 0]}>
        {/* Head & Neck */}
        <mesh position={[0, 1.68, 0]} geometry={headGeom} material={mat} />
        <mesh position={[0, 1.54, 0]} geometry={neckGeom} material={mat} />

        {/* Torso & Hips */}
        <mesh position={[0, 1.22, 0]} geometry={torsoGeom} material={mat} castShadow />
        <mesh position={[0, 0.85, 0]} geometry={hipsGeom} material={mat} />

        {/* Left & Right Legs */}
        <mesh position={[-0.1, 0.44, 0.03]} geometry={legGeom} material={mat} />
        <mesh position={[0.1, 0.44, -0.03]} geometry={legGeom} material={mat} />

        {/* Left & Right Arms */}
        <mesh position={[-0.24, 1.15, 0]} geometry={armGeom} material={mat} />
        <mesh position={[0.24, 1.15, 0]} geometry={armGeom} material={mat} />

        {/* Optional Shopping Bag in Hand */}
        {hasBag && (
          <mesh
            position={[0.28, 0.65, 0.05]}
            geometry={shoppingBagGeom}
            material={matIdx % 2 === 0 ? sharedMats.shoppingBagGold : sharedMats.shoppingBagDark}
          />
        )}
      </group>
    );
  };

  // Seated Figure Definition for Food Court Chairs
  const renderSeatedFigure = (
    pos: [number, number, number],
    rotY: number,
    matIdx: number,
    key: string
  ) => {
    const mat = figureMaterials[matIdx % figureMaterials.length];
    return (
      <group key={key} position={pos} rotation={[0, rotY, 0]}>
        {/* Head & Neck */}
        <mesh position={[0, 1.26, 0]} geometry={headGeom} material={mat} />
        <mesh position={[0, 1.12, 0]} geometry={neckGeom} material={mat} />

        {/* Seated Torso */}
        <mesh position={[0, 0.82, 0]} geometry={torsoGeom} material={mat} />

        {/* Horizontal Thighs */}
        <mesh
          position={[0, 0.48, 0.2]}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={seatedThighGeom}
          material={mat}
        />

        {/* Vertical Shins */}
        <mesh position={[-0.09, 0.22, 0.38]} geometry={seatedShinGeom} material={mat} />
        <mesh position={[0.09, 0.22, 0.38]} geometry={seatedShinGeom} material={mat} />

        {/* Relaxed Arms Resting on Table */}
        <mesh
          position={[-0.2, 0.72, 0.15]}
          rotation={[0.35, 0, 0]}
          geometry={armGeom}
          material={mat}
        />
        <mesh
          position={[0.2, 0.72, 0.15]}
          rotation={[0.35, 0, 0]}
          geometry={armGeom}
          material={mat}
        />
      </group>
    );
  };

  return (
    <group name="ShoppersAndAmbience">
      {/* ======================================================== */}
      {/* 1. ARRIVAL PLAZA SHOPPERS (Z = 24 to 32)                  */}
      {/* ======================================================== */}
      {renderStandingFigure([2.4, 0, 26], -Math.PI / 6, 0, true, 'shopper-plaza-1')}
      {renderStandingFigure([-2.8, 0, 30], Math.PI / 4, 1, false, 'shopper-plaza-2')}

      {/* ======================================================== */}
      {/* 2. GROUND FLOOR PROMENADE SHOPPERS (Z = 8 to -12)         */}
      {/* ======================================================== */}
      {/* Strolling along central concourse */}
      {renderStandingFigure([-1.6, 0, 6], 0.1, 2, true, 'shopper-gf-1')}
      {renderStandingFigure([1.8, 0, -2], -0.2, 3, true, 'shopper-gf-2')}

      {/* Browsing Verve Apparel vitrine */}
      {renderStandingFigure([-9.8, 0, 6.2], Math.PI / 2, 4, false, 'shopper-gf-3')}

      {/* Browsing Aura Studio accessories vitrine */}
      {renderStandingFigure([9.8, 0, 6.2], -Math.PI / 2, 1, true, 'shopper-gf-4')}

      {/* Viewing Nexa Digital Tech showroom */}
      {renderStandingFigure([-9.8, 0, -14], Math.PI / 2, 0, false, 'shopper-gf-5')}

      {/* ======================================================== */}
      {/* 3. GROUND FLOOR CONCOURSE BENCHES & DIRECTORY TOTEMS      */}
      {/* ======================================================== */}
      {/* Digital Wayfinding Totem near Entrance (Z = 12) */}
      <group position={[4.5, 0, 12]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh position={[0, 0.04, 0]} geometry={totemBaseGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.1, 0]} geometry={totemPillarGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.3, 0.095]} geometry={totemScreenGeom} material={sharedMats.totemScreen} />
      </group>

      {/* Digital Wayfinding Totem near Escalators (Z = -18) */}
      <group position={[-4.5, 0, -18]} rotation={[0, Math.PI / 4, 0]}>
        <mesh position={[0, 0.04, 0]} geometry={totemBaseGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.1, 0]} geometry={totemPillarGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.3, 0.095]} geometry={totemScreenGeom} material={sharedMats.totemScreen} />
      </group>

      {/* Architectural Concourse Bench with Planter (Z = -2) */}
      <group position={[0, 0, -2]}>
        <mesh position={[0, 0.21, 0]} geometry={benchPlinthGeom} material={sharedMats.benchStone} castShadow />
        <mesh position={[-0.6, 0.44, 0]} geometry={benchWoodTopGeom} material={sharedMats.benchWood} />
        <mesh position={[1.2, 0.43, 0]} geometry={benchPlanterSoilGeom} material={sharedMats.benchStone} />
        <mesh position={[1.2, 0.75, 0]} geometry={benchFoliageGeom} material={sharedMats.benchGreenery} />
      </group>

      {/* ======================================================== */}
      {/* 4. FIRST FLOOR GALLERIA SHOPPERS (Y = 6.0, Z = 2 to -34)  */}
      {/* ======================================================== */}
      {/* Browsing Chrono Watches showcase */}
      {renderStandingFigure([-9.8, 6.0, -14], Math.PI / 2, 2, false, 'shopper-l1-1')}

      {/* Browsing Prism Jewels display */}
      {renderStandingFigure([9.8, 6.0, -4], -Math.PI / 2, 3, true, 'shopper-l1-2')}

      {/* Standing at Balcony Railing looking down at Atrium */}
      {renderStandingFigure([-8.2, 6.0, 0], Math.PI / 2, 0, false, 'shopper-l1-3')}

      {/* Level 1 Escalator Landing Concourse Shoppers */}
      {renderStandingFigure([-1.2, 6.0, -32], -Math.PI / 4, 1, true, 'shopper-l1-landing-1')}
      {renderStandingFigure([2.0, 6.0, -30], Math.PI / 3, 2, false, 'shopper-l1-landing-2')}
      {renderStandingFigure([-9.8, 6.0, -24], Math.PI / 2, 4, true, 'shopper-l1-apex')}
      {renderStandingFigure([9.8, 6.0, -24], -Math.PI / 2, 0, false, 'shopper-l1-galleria')}

      {/* Digital Wayfinding Totem on Level 1 Concourse (Z = -22) */}
      <group position={[0, 6.0, -22]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.04, 0]} geometry={totemBaseGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.1, 0]} geometry={totemPillarGeom} material={sharedMats.totemBody} />
        <mesh position={[0, 1.3, 0.095]} geometry={totemScreenGeom} material={sharedMats.totemScreen} />
      </group>

      {/* ======================================================== */}
      {/* 5. SECOND FLOOR FOOD COURT GUESTS (Y = 11.5, Z = -32 to -36)*/}
      {/* ======================================================== */}
      {/* Seated Guests enjoying coffee & meals at tables */}
      {renderSeatedFigure([-3.0, 11.5, -31.6], 0, 1, 'guest-fc-1')}
      {renderSeatedFigure([-3.0, 11.5, -32.4], Math.PI, 2, 'guest-fc-2')}
      {renderSeatedFigure([3.0, 11.5, -31.6], 0, 4, 'guest-fc-3')}
      {renderSeatedFigure([3.0, 11.5, -32.4], Math.PI, 0, 'guest-fc-4')}

      {/* Guest ordering at The Bean Roastery counter */}
      {renderStandingFigure([-11.8, 11.5, -42], Math.PI / 2, 3, false, 'guest-fc-ordering')}

      {/* ======================================================== */}
      {/* 6. SECOND FLOOR CINEMA LOBBY PATRONS (Y = 11.5, Z = -56) */}
      {/* ======================================================== */}
      {/* Patron at Automated Ticket Kiosk */}
      {renderStandingFigure([5.6, 11.5, -58], Math.PI / 2, 0, false, 'cinema-patron-1')}

      {/* Patron viewing Cinema Movie Posters */}
      {renderStandingFigure([-7.2, 11.5, -64], -Math.PI / 2, 1, false, 'cinema-patron-2')}
    </group>
  );
});

