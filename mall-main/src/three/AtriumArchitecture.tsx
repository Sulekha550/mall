import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  createCityMallSignTexture,
  createLargeFormatTileTexture,
  createPlazaPaverTexture,
  createStoneCladdingTexture
} from '../utils/textureGenerators';

interface AtriumArchitectureProps {
  isNightMode?: boolean;
}

// -------------------------------------------------------------
// Shared Geometries for High-Performance Rendering & Memory
// -------------------------------------------------------------
// Structural Columns
const columnBaseGeom = new THREE.CylinderGeometry(0.72, 0.8, 0.7, 16);
const columnShaftL0Geom = new THREE.CylinderGeometry(0.55, 0.55, 5.0, 16);
const columnShaftL1Geom = new THREE.CylinderGeometry(0.52, 0.52, 5.2, 16);
const columnShaftL2Geom = new THREE.CylinderGeometry(0.48, 0.48, 6.0, 16);
const columnCapGeom = new THREE.CylinderGeometry(0.75, 0.58, 0.35, 16);
const columnBeamBracketGeom = new THREE.BoxGeometry(1.6, 0.35, 1.6);

// Floor Slabs & Finished Ceilings
const balconySlabL1Geom = new THREE.BoxGeometry(10, 0.6, 95);
const ceilingSoffitL1Geom = new THREE.BoxGeometry(9.8, 0.08, 94.8);
const railingGlassL1Geom = new THREE.BoxGeometry(0.06, 1.05, 95);
const handrailL1Geom = new THREE.BoxGeometry(0.12, 0.08, 95);
const ledStripL1Geom = new THREE.BoxGeometry(0.04, 0.03, 95);

const balconySlabL2Geom = new THREE.BoxGeometry(8, 0.6, 95);
const ceilingSoffitL2Geom = new THREE.BoxGeometry(7.8, 0.08, 94.8);
const railingGlassL2Geom = new THREE.BoxGeometry(0.06, 1.05, 95);
const handrailL2Geom = new THREE.BoxGeometry(0.12, 0.08, 95);

// Level 1 Concourse & Landing Bridge Geometries
const concourseBridgeL1Geom = new THREE.BoxGeometry(26, 0.6, 26);
const concourseFloorL1Geom = new THREE.PlaneGeometry(25.8, 25.8);
const concourseCeilingL1Geom = new THREE.BoxGeometry(25.8, 0.08, 25.8);
const balconyFloorL1Geom = new THREE.PlaneGeometry(9.6, 94.8);

// Level 2 Concourse & Food Court Geometries
const concourseSlabL2Geom = new THREE.BoxGeometry(26, 0.6, 44);
const concourseFloorL2Geom = new THREE.PlaneGeometry(25.8, 43.8);
const balconyFloorL2Geom = new THREE.PlaneGeometry(7.6, 94.8);

// Skylight Geometries
const archTrussGeom = new THREE.TorusGeometry(14, 0.16, 10, 24, Math.PI);
const skylightRidgeGeom = new THREE.CylinderGeometry(0.18, 0.18, 95, 12);
const skylightGlassGeom = new THREE.CylinderGeometry(14, 14, 95, 24, 1, true, 0, Math.PI);

// Entrance Landscaping & Architectural Geometries
const planterTier1Geom = new THREE.BoxGeometry(1.6, 0.6, 3.4);
const planterTier2Geom = new THREE.BoxGeometry(1.3, 0.4, 3.1);
const soilGeom = new THREE.BoxGeometry(1.2, 0.05, 3.0);
const hedgeGeom = new THREE.BoxGeometry(1.1, 0.8, 2.9);
const canopyStayRodGeom = new THREE.CylinderGeometry(0.035, 0.035, 4.2, 8);
const doorHandleGeom = new THREE.CylinderGeometry(0.025, 0.025, 1.6, 12);
const bollardGeom = new THREE.CylinderGeometry(0.15, 0.16, 0.85, 12);
const facadeVitrineGeom = new THREE.BoxGeometry(11, 4.4, 0.25);
const canopyPurlinGeom = new THREE.BoxGeometry(0.08, 0.12, 5.2);

export const AtriumArchitecture: React.FC<AtriumArchitectureProps> = React.memo(({ isNightMode = false }) => {
  const cityMallSignTexture = useMemo(() => createCityMallSignTexture(), []);

  const tileFloorTexture = useMemo(() => {
    const tex = createLargeFormatTileTexture(isNightMode);
    tex.repeat.set(6, 18);
    return tex;
  }, [isNightMode]);

  const plazaPaverTexture = useMemo(() => {
    const tex = createPlazaPaverTexture(isNightMode);
    tex.repeat.set(6, 6);
    return tex;
  }, [isNightMode]);

  const stoneCladdingTexture = useMemo(() => {
    const tex = createStoneCladdingTexture(isNightMode);
    tex.repeat.set(4, 4);
    return tex;
  }, [isNightMode]);

  const materials = useMemo(() => {
    // Exterior stone paving: natural granite pavers with subtle joints
    const exteriorPavingMat = new THREE.MeshStandardMaterial({
      map: plazaPaverTexture,
      roughness: 0.58,
      metalness: 0.05
    });

    // Interior polished Calacatta marble floor with restrained reflections
    const interiorFloorMat = new THREE.MeshStandardMaterial({
      map: tileFloorTexture,
      roughness: 0.16,
      metalness: 0.08,
      envMapIntensity: 1.2
    });

    // Exterior facade: honed composite architectural stone panels
    const facadeMat = new THREE.MeshStandardMaterial({
      map: stoneCladdingTexture,
      roughness: 0.38,
      metalness: 0.06
    });

    // Dark architectural granite portal & mullions
    const darkGraniteMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? '#0c0f15' : '#1e2530',
      roughness: 0.32,
      metalness: 0.25
    });

    // Architectural off-white Corian / plaster
    const fasciaMat = new THREE.MeshStandardMaterial({
      color: '#f8fafc',
      roughness: 0.22,
      metalness: 0.04
    });

    // Fluted travertine marble columns
    const columnMat = new THREE.MeshStandardMaterial({
      color: '#f1f5f9',
      roughness: 0.26,
      metalness: 0.05
    });

    // Brushed Champagne Bronze (restrained architectural luxury)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: '#c5a059',
      roughness: 0.26,
      metalness: 0.88
    });

    // Dark charcoal architectural metal
    const charcoalMat = new THREE.MeshStandardMaterial({
      color: '#161a22',
      roughness: 0.32,
      metalness: 0.82
    });

    // Ultra-clear commercial architectural glass
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.03,
      metalness: 0.1,
      transparent: true,
      opacity: 0.25
    });

    // Under-rail LED Glow Strips
    const ledGlowMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? '#ffeaab' : '#ffffff',
      emissive: isNightMode ? '#d4af37' : '#fef08a',
      emissiveIntensity: isNightMode ? 1.5 : 0.8,
      roughness: 0.15
    });

    // Skylight Steel Trusses
    const steelTrussMat = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.4,
      metalness: 0.85
    });

    // Escalator metal treads & comb-plates
    const escalatorStepMat = new THREE.MeshStandardMaterial({
      color: '#475569',
      roughness: 0.28,
      metalness: 0.88
    });

    // Landscaped Planter Boxwoods & Soil
    const foliageMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? '#192e1e' : '#2d6a3b',
      roughness: 0.75,
      metalness: 0.04
    });

    const soilMat = new THREE.MeshStandardMaterial({
      color: '#1c1511',
      roughness: 0.95
    });

    const planterStoneMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? '#1e232e' : '#475569',
      roughness: 0.45,
      metalness: 0.12
    });

    return {
      exteriorPavingMat,
      interiorFloorMat,
      facadeMat,
      darkGraniteMat,
      fasciaMat,
      columnMat,
      bronzeMat,
      charcoalMat,
      glassMat,
      ledGlowMat,
      steelTrussMat,
      escalatorStepMat,
      foliageMat,
      soilMat,
      planterStoneMat
    };
  }, [isNightMode, tileFloorTexture, plazaPaverTexture, stoneCladdingTexture]);

  // Structural Column coordinates (8 bays along length)
  const columnPositions = useMemo(() => {
    const list: [number, number, number][] = [];
    const zCoords = [14, 4, -6, -16, -26, -36, -48, -60];
    zCoords.forEach((z) => {
      list.push([-14, 0, z]);
      list.push([14, 0, z]);
    });
    return list;
  }, []);

  // Landscaped Planter Coordinates on Arrival Plaza
  const planterPositions = useMemo<[number, number, number][]>(() => [
    [-6.4, 0, 25],
    [6.4, 0, 25],
    [-6.4, 0, 31],
    [6.4, 0, 31],
    [-6.4, 0, 37],
    [6.4, 0, 37]
  ], []);

  // Plaza Bollard Coordinates
  const bollardPositions = useMemo<[number, number, number][]>(() => [
    [-10, 0, 42], [-6, 0, 42], [-2, 0, 42], [2, 0, 42], [6, 0, 42], [10, 0, 42]
  ], []);

  return (
    <group name="AtriumArchitecture">
      {/* ======================================================== */}
      {/* 1. EXTERIOR APPROACH PLAZA (Z = +20 to +52)               */}
      {/* ======================================================== */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 36]}
        receiveShadow
        material={materials.exteriorPavingMat}
      >
        <planeGeometry args={[44, 32]} />
      </mesh>

      {/* Central Plaza Walkway Inlay with Granite Border Bands */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 36]}
        receiveShadow
      >
        <planeGeometry args={[9.6, 32]} />
        <meshStandardMaterial
          color={isNightMode ? '#1e2430' : '#d5dde6'}
          roughness={0.42}
        />
      </mesh>

      {/* Decorative Stainless Expansion Joints in Plaza */}
      {[-4.8, 4.8].map((x, i) => (
        <mesh key={`plaza-joint-${i}`} position={[x, 0.015, 36]}>
          <boxGeometry args={[0.08, 0.02, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Entrance Doorway Stone Threshold Slab (Z = 19.5 to 20.5) */}
      <mesh position={[0, 0.02, 20]} receiveShadow>
        <boxGeometry args={[11.6, 0.04, 1.2]} />
        <meshStandardMaterial color={isNightMode ? '#12151c' : '#1e293b'} roughness={0.25} metalness={0.4} />
      </mesh>

      {/* Arrival Plaza Bollards along Curb */}
      {bollardPositions.map((pos, idx) => (
        <group key={`bollard-${idx}`} position={pos}>
          <mesh position={[0, 0.42, 0]} geometry={bollardGeom} material={materials.charcoalMat} />
          {/* Illuminated LED Collar Ring */}
          <mesh position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.04, 12]} />
            <meshStandardMaterial color="#ffffff" emissive="#d4af37" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Arrival Plaza Tiered Planters with Lush Greenery */}
      {planterPositions.map((pos, idx) => (
        <group key={`planter-${idx}`} position={pos}>
          <mesh position={[0, 0.3, 0]} geometry={planterTier1Geom} material={materials.planterStoneMat} castShadow />
          <mesh position={[0, 0.65, 0]} geometry={planterTier2Geom} material={materials.bronzeMat} />
          <mesh position={[0, 0.85, 0]} geometry={soilGeom} material={materials.soilMat} />
          <mesh position={[0, 1.25, 0]} geometry={hedgeGeom} material={materials.foliageMat} castShadow />
        </group>
      ))}

      {/* ======================================================== */}
      {/* 2. REFINED ENTRANCE FACADE (Z = 20, Height = 18m)        */}
      {/* ======================================================== */}
      <group position={[0, 9, 20]} name="EntranceFacade">
        {/* Left Facade Wing (X = -13.5) with Architectural Vertical Fins */}
        <mesh position={[-13.5, 0, 0]} castShadow receiveShadow material={materials.facadeMat}>
          <boxGeometry args={[17, 18, 1.2]} />
        </mesh>
        {/* Right Facade Wing (X = +13.5) */}
        <mesh position={[13.5, 0, 0]} castShadow receiveShadow material={materials.facadeMat}>
          <boxGeometry args={[17, 18, 1.2]} />
        </mesh>

        {/* Facade Vertical Architectural Fins for Sun Shading & Depth */}
        {[-20, -18, -16, -14, -12, 12, 14, 16, 18, 20].map((x, i) => (
          <mesh key={`facade-fin-${i}`} position={[x, 1.5, 0.85]} material={materials.bronzeMat} castShadow>
            <boxGeometry args={[0.12, 14, 0.5]} />
          </mesh>
        ))}

        {/* Roof Parapet Cornice Cap */}
        <mesh position={[0, 9.1, 0.1]} material={materials.charcoalMat}>
          <boxGeometry args={[44.5, 0.35, 1.6]} />
        </mesh>

        {/* Grand 2-Story Portal Frame (Surrounding Entrance Opening) */}
        <group position={[0, -3.8, 0.2]}>
          {/* Left Portal Jamb */}
          <mesh position={[-5.6, 0, 0]} material={materials.darkGraniteMat} castShadow>
            <boxGeometry args={[0.8, 10.4, 1.4]} />
          </mesh>
          {/* Right Portal Jamb */}
          <mesh position={[5.6, 0, 0]} material={materials.darkGraniteMat} castShadow>
            <boxGeometry args={[0.8, 10.4, 1.4]} />
          </mesh>
          {/* Portal Transom Header Lintel */}
          <mesh position={[0, 5.2, 0]} material={materials.darkGraniteMat} castShadow>
            <boxGeometry args={[12.0, 0.8, 1.4]} />
          </mesh>
          {/* Inner Bronze Reveal Liners */}
          <mesh position={[-5.15, 0, 0.1]} material={materials.bronzeMat}>
            <boxGeometry args={[0.1, 10.2, 1.2]} />
          </mesh>
          <mesh position={[5.15, 0, 0.1]} material={materials.bronzeMat}>
            <boxGeometry args={[0.1, 10.2, 1.2]} />
          </mesh>
          <mesh position={[0, 4.75, 0.1]} material={materials.bronzeMat}>
            <boxGeometry args={[10.4, 0.1, 1.2]} />
          </mesh>
        </group>

        {/* Upper Spandrel Wall Above Portal (Y = 11.4 to 18) */}
        <mesh position={[0, 4.4, 0]} castShadow receiveShadow material={materials.facadeMat}>
          <boxGeometry args={[10.4, 9.2, 1.2]} />
        </mesh>

        {/* Facade Ground-Floor Luxury Showroom Glass Vitrines */}
        <mesh position={[-13.5, -4.5, 0.65]} geometry={facadeVitrineGeom} material={materials.glassMat} />
        <mesh position={[13.5, -4.5, 0.65]} geometry={facadeVitrineGeom} material={materials.glassMat} />

        {/* Vitrine Champagne Bronze Base Kickplate */}
        <mesh position={[-13.5, -6.8, 0.65]} material={materials.bronzeMat}>
          <boxGeometry args={[11, 0.2, 0.28]} />
        </mesh>
        <mesh position={[13.5, -6.8, 0.65]} material={materials.bronzeMat}>
          <boxGeometry args={[11, 0.2, 0.28]} />
        </mesh>

        {/* ======================================================== */}
        {/* REFINED ENTRANCE CANOPY (Directly above doors, Y = 4.8m) */}
        {/* ======================================================== */}
        <group position={[0, -4.0, 2.8]}>
          {/* Canopy Fascia Slab */}
          <mesh material={materials.bronzeMat} castShadow>
            <boxGeometry args={[12.8, 0.35, 5.6]} />
          </mesh>
          {/* Underside Ceiling Soffit */}
          <mesh position={[0, -0.18, 0]}>
            <boxGeometry args={[12.4, 0.02, 5.3]} />
            <meshStandardMaterial color="#1a1f29" roughness={0.4} />
          </mesh>
          {/* Structural Bronze Sub-Purlins */}
          {[-5.6, -2.8, 0, 2.8, 5.6].map((px, pi) => (
            <mesh key={`purlin-${pi}`} position={[px, -0.12, 0]} geometry={canopyPurlinGeom} material={materials.bronzeMat} />
          ))}
          {/* Recessed Warm LED Downlight Pots */}
          {[-4.5, -2.2, 0, 2.2, 4.5].map((x, idx) => (
            <mesh key={`canopy-pot-${idx}`} position={[x, -0.19, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" emissive="#fff4db" emissiveIntensity={1.8} />
            </mesh>
          ))}

          {/* Structural Steel Suspension Tie-Rods Connecting to Facade */}
          {[-5.4, -1.8, 1.8, 5.4].map((x, idx) => (
            <group key={`tie-rod-${idx}`} position={[x, 1.6, -0.6]} rotation={[-0.45, 0, 0]}>
              <mesh geometry={canopyStayRodGeom} material={materials.steelTrussMat} />
              {/* Clevis Bracket Anchors */}
              <mesh position={[0, 2.0, 0]}>
                <boxGeometry args={[0.12, 0.22, 0.16]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, -2.0, 0]}>
                <boxGeometry args={[0.12, 0.22, 0.16]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ======================================================== */}
        {/* PROMINENT "CITY MALL" BUILDING WORDMARK (Y = 6.8m)       */}
        {/* ======================================================== */}
        <group position={[0, -2.0, 0.65]}>
          {/* Architectural Bronze Backing Lintel */}
          <mesh material={materials.bronzeMat}>
            <boxGeometry args={[10.4, 2.5, 0.12]} />
          </mesh>
          {/* Beveled Signboard with High-Res Texture */}
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[10.0, 2.3]} />
            <meshStandardMaterial
              map={cityMallSignTexture}
              emissive="#ffffff"
              emissiveIntensity={isNightMode ? 0.95 : 0.45}
              roughness={0.15}
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. MULTI-LEAF COMMERCIAL GLASS ENTRANCE (Y = 0 to 4.8m)  */}
      {/* ======================================================== */}
      <group position={[0, 2.4, 20]} name="GlassEntranceDoors">
        {/* Overhead Transom Glass Panels (Y = 3.2 to 4.8m) */}
        <mesh position={[0, 1.4, 0]} material={materials.glassMat}>
          <boxGeometry args={[10.2, 1.4, 0.08]} />
        </mesh>
        <mesh position={[0, 0.7, 0]} material={materials.charcoalMat}>
          <boxGeometry args={[10.4, 0.1, 0.25]} />
        </mesh>

        {/* Automatic Sliding Door Operator Housing Casing */}
        <mesh position={[0, 0.82, 0.12]} material={materials.charcoalMat}>
          <boxGeometry args={[10.4, 0.22, 0.32]} />
        </mesh>
        {/* Motion Sensor Bar & Status LED */}
        <mesh position={[0, 0.76, 0.28]}>
          <boxGeometry args={[1.2, 0.06, 0.04]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={0.9} />
        </mesh>

        {/* Outer Fixed Sidelight Glass Panels */}
        {[-3.6, 3.6].map((xPos, idx) => (
          <group key={`sidelight-${idx}`} position={[xPos, -0.7, 0]}>
            <mesh material={materials.glassMat}>
              <boxGeometry args={[2.2, 3.0, 0.08]} />
            </mesh>
            <mesh position={[-1.1, 0, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[0.08, 3.0, 0.12]} />
            </mesh>
            <mesh position={[1.1, 0, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[0.08, 3.0, 0.12]} />
            </mesh>
            <mesh position={[0, 1.5, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[2.2, 0.08, 0.12]} />
            </mesh>
            <mesh position={[0, -1.48, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[2.2, 0.08, 0.12]} />
            </mesh>
          </group>
        ))}

        {/* Welcoming Automatic Sliding Leaves (Parted to X = ±1.8m for Smooth Camera Gliding) */}
        {[-1.8, 1.8].map((xPos, idx) => (
          <group key={`sliding-door-${idx}`} position={[xPos, -0.7, -0.06]}>
            <mesh material={materials.glassMat}>
              <boxGeometry args={[1.8, 3.0, 0.08]} />
            </mesh>
            <mesh position={[-0.9, 0, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[0.08, 3.0, 0.12]} />
            </mesh>
            <mesh position={[0.9, 0, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[0.08, 3.0, 0.12]} />
            </mesh>
            <mesh position={[0, 1.5, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[1.8, 0.08, 0.12]} />
            </mesh>
            <mesh position={[0, -1.48, 0]} material={materials.charcoalMat}>
              <boxGeometry args={[1.8, 0.08, 0.12]} />
            </mesh>
            {/* Vertical Pull Handles in Brushed Bronze */}
            <mesh position={[idx === 0 ? 0.75 : -0.75, 0, 0.08]} geometry={doorHandleGeom} material={materials.bronzeMat} />
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. INTERIOR MARBLE CONCOURSE FLOOR                       */}
      {/* ======================================================== */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -27.5]}
        receiveShadow
        material={materials.interiorFloorMat}
      >
        <planeGeometry args={[36, 95]} />
      </mesh>

      {/* ======================================================== */}
      {/* 5. 16 THREE-TIER STRUCTURAL COLUMNS                      */}
      {/* ======================================================== */}
      {columnPositions.map((pos, idx) => (
        <group key={`column-${idx}`} position={pos}>
          {/* Heavy Base Plinth Guard (Y = 0 to 0.7m) */}
          <mesh position={[0, 0.35, 0]} geometry={columnBaseGeom} material={materials.charcoalMat} />

          {/* Level 0 Shaft (Y = 0.7 to 5.6m) */}
          <mesh position={[0, 3.15, 0]} geometry={columnShaftL0Geom} castShadow material={materials.columnMat} />

          {/* Level 1 Beam Collar & Floor Bracket (Y = 6.0m) */}
          <mesh position={[0, 5.8, 0]} geometry={columnCapGeom} material={materials.bronzeMat} />
          <mesh position={[0, 6.0, 0]} geometry={columnBeamBracketGeom} material={materials.charcoalMat} />

          {/* Level 1 Shaft (Y = 6.2 to 11.2m) */}
          <mesh position={[0, 8.7, 0]} geometry={columnShaftL1Geom} castShadow material={materials.columnMat} />

          {/* Level 2 Beam Collar & Floor Bracket (Y = 11.5m) */}
          <mesh position={[0, 11.3, 0]} geometry={columnCapGeom} material={materials.bronzeMat} />
          <mesh position={[0, 11.5, 0]} geometry={columnBeamBracketGeom} material={materials.charcoalMat} />

          {/* Level 2 Shaft (Y = 11.7 to 17.5m) */}
          <mesh position={[0, 14.6, 0]} geometry={columnShaftL2Geom} castShadow material={materials.columnMat} />

          {/* Crown Capital supporting Roof Truss (Y = 17.8m) */}
          <mesh position={[0, 17.8, 0]} geometry={columnCapGeom} material={materials.bronzeMat} />
        </group>
      ))}

      {/* ======================================================== */}
      {/* 6. REALISTIC THREE-LEVEL BALCONY SLABS & FINISHED CEILINGS */}
      {/* ======================================================== */}
      {/* Level 1 Left Promenade (Y = 6.0) */}
      <group position={[-14, 6.0, -27.5]}>
        <mesh receiveShadow geometry={balconySlabL1Geom} material={materials.fasciaMat} />
        {/* Polished Marble Floor Inlay Surface */}
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={balconyFloorL1Geom} material={materials.interiorFloorMat} receiveShadow />
        {/* Finished Underside Ceiling Soffit with Linear Downlight Recesses */}
        <mesh position={[0, -0.32, 0]} geometry={ceilingSoffitL1Geom}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        {/* Tempered Glass Balustrades with Stainless Post Clamps */}
        <mesh position={[4.8, 0.65, 0]} geometry={railingGlassL1Geom} material={materials.glassMat} />
        <mesh position={[4.8, 1.18, 0]} geometry={handrailL1Geom} material={materials.bronzeMat} />
        <mesh position={[4.82, -0.32, 0]} geometry={ledStripL1Geom} material={materials.ledGlowMat} />
      </group>

      {/* Level 1 Right Promenade (Y = 6.0) */}
      <group position={[14, 6.0, -27.5]}>
        <mesh receiveShadow geometry={balconySlabL1Geom} material={materials.fasciaMat} />
        {/* Polished Marble Floor Inlay Surface */}
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={balconyFloorL1Geom} material={materials.interiorFloorMat} receiveShadow />
        <mesh position={[0, -0.32, 0]} geometry={ceilingSoffitL1Geom}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        <mesh position={[-4.8, 0.65, 0]} geometry={railingGlassL1Geom} material={materials.glassMat} />
        <mesh position={[-4.8, 1.18, 0]} geometry={handrailL1Geom} material={materials.bronzeMat} />
        <mesh position={[-4.82, -0.32, 0]} geometry={ledStripL1Geom} material={materials.ledGlowMat} />
      </group>

      {/* ======================================================== */}
      {/* LEVEL 1 CENTRAL CONCOURSE & ESCALATOR LANDING PLAZA      */}
      {/* (Spanning X = -13 to +13, Z = -19 to -45 at Y = 6.0m)    */}
      {/* ======================================================== */}
      <group position={[0, 6.0, -32]} name="Level1EscalatorLandingConcourse">
        <mesh receiveShadow geometry={concourseBridgeL1Geom} material={materials.fasciaMat} />
        {/* Continuous Polished Marble Floor Surface at Top of Escalator */}
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={concourseFloorL1Geom} material={materials.interiorFloorMat} receiveShadow />
        {/* Finished Underside Soffit with Recessed Downlights */}
        <mesh position={[0, -0.32, 0]} geometry={concourseCeilingL1Geom}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        {/* Downlights Array Washing Concourse Below */}
        {[-8, -4, 0, 4, 8].map((x, xi) => (
          [-10, 0, 10].map((z, zi) => (
            <mesh key={`l1-downlight-${xi}-${zi}`} position={[x, -0.33, z]}>
              <cylinderGeometry args={[0.2, 0.2, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" emissive="#fef3c7" emissiveIntensity={1.5} />
            </mesh>
          ))
        ))}
        {/* South Atrium Overlook Glass Balustrade (Z = +13) */}
        <mesh position={[0, 0.65, 12.9]} material={materials.glassMat}>
          <boxGeometry args={[18, 1.05, 0.06]} />
        </mesh>
        <mesh position={[0, 1.18, 12.9]} material={materials.bronzeMat}>
          <boxGeometry args={[18, 0.08, 0.12]} />
        </mesh>
        <mesh position={[0, 0.15, 12.9]} material={materials.ledGlowMat}>
          <boxGeometry args={[18, 0.03, 0.04]} />
        </mesh>
      </group>

      {/* Level 2 Upper Balcony Left (Y = 11.5) */}
      <group position={[-15, 11.5, -27.5]}>
        <mesh receiveShadow geometry={balconySlabL2Geom} material={materials.fasciaMat} />
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={balconyFloorL2Geom} material={materials.interiorFloorMat} receiveShadow />
        <mesh position={[0, -0.32, 0]} geometry={ceilingSoffitL2Geom}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        <mesh position={[3.8, 0.65, 0]} geometry={railingGlassL2Geom} material={materials.glassMat} />
        <mesh position={[3.8, 1.18, 0]} geometry={handrailL2Geom} material={materials.bronzeMat} />
      </group>

      {/* Level 2 Upper Balcony Right (Y = 11.5) */}
      <group position={[15, 11.5, -27.5]}>
        <mesh receiveShadow geometry={balconySlabL2Geom} material={materials.fasciaMat} />
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={balconyFloorL2Geom} material={materials.interiorFloorMat} receiveShadow />
        <mesh position={[0, -0.32, 0]} geometry={ceilingSoffitL2Geom}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        <mesh position={[-3.8, 0.65, 0]} geometry={railingGlassL2Geom} material={materials.glassMat} />
        <mesh position={[-3.8, 1.18, 0]} geometry={handrailL2Geom} material={materials.bronzeMat} />
      </group>

      {/* Level 2 Central Concourse & Food Court / Cinema Landing Slab (Y = 11.5, Z = -44) */}
      <group position={[0, 11.5, -44]} name="Level2CentralConcourse">
        <mesh receiveShadow geometry={concourseSlabL2Geom} material={materials.fasciaMat} />
        <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={concourseFloorL2Geom} material={materials.interiorFloorMat} receiveShadow />
      </group>

      {/* ======================================================== */}
      {/* 7. CONVINCING MULTI-TIER ESCALATORS                      */}
      {/* ======================================================== */}
      <group name="ConvincingEscalators">
        {/* Escalator 1: Ground Floor (Y=0) to Level 1 (Y=6.0) */}
        <group position={[-3.2, 3.0, -26]} rotation={[0.46, 0, 0]}>
          <mesh receiveShadow material={materials.charcoalMat}>
            <boxGeometry args={[2.2, 0.65, 13]} />
          </mesh>
          <mesh position={[0, 0.38, 0]} material={materials.escalatorStepMat}>
            <boxGeometry args={[1.7, 0.12, 12.8]} />
          </mesh>
          {/* Inner Safety Brush Skirt Panels */}
          <mesh position={[-0.86, 0.44, 0]}>
            <boxGeometry args={[0.04, 0.08, 12.8]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          <mesh position={[0.86, 0.44, 0]}>
            <boxGeometry args={[0.04, 0.08, 12.8]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          {/* Glass Balustrades & Neoprene Moving Handrails */}
          <mesh position={[-0.95, 0.88, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.05, 0.92, 13]} />
          </mesh>
          <mesh position={[-0.95, 1.34, 0]}>
            <boxGeometry args={[0.1, 0.06, 13]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
          {/* Under-Handrail Architectural Soft LED Glow */}
          <mesh position={[-0.95, 0.84, 0]} material={materials.ledGlowMat}>
            <boxGeometry args={[0.02, 0.03, 12.8]} />
          </mesh>
          <mesh position={[0.95, 0.88, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.05, 0.92, 13]} />
          </mesh>
          <mesh position={[0.95, 1.34, 0]}>
            <boxGeometry args={[0.1, 0.06, 13]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
          <mesh position={[0.95, 0.84, 0]} material={materials.ledGlowMat}>
            <boxGeometry args={[0.02, 0.03, 12.8]} />
          </mesh>
          {/* Stainless Landing Combplates at Ends */}
          <mesh position={[0, 0.44, 6.2]} material={materials.bronzeMat}>
            <boxGeometry args={[1.8, 0.02, 0.6]} />
          </mesh>
          <mesh position={[0, 0.44, -6.2]} material={materials.bronzeMat}>
            <boxGeometry args={[1.8, 0.02, 0.6]} />
          </mesh>
        </group>

        {/* Escalator 2: Level 1 (Y=6.0) to Level 2 (Y=11.5) */}
        <group position={[3.2, 8.75, -38]} rotation={[0.46, 0, 0]}>
          <mesh receiveShadow material={materials.charcoalMat}>
            <boxGeometry args={[2.2, 0.65, 13]} />
          </mesh>
          <mesh position={[0, 0.38, 0]} material={materials.escalatorStepMat}>
            <boxGeometry args={[1.7, 0.12, 12.8]} />
          </mesh>
          <mesh position={[-0.86, 0.44, 0]}>
            <boxGeometry args={[0.04, 0.08, 12.8]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          <mesh position={[0.86, 0.44, 0]}>
            <boxGeometry args={[0.04, 0.08, 12.8]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          <mesh position={[-0.95, 0.88, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.05, 0.92, 13]} />
          </mesh>
          <mesh position={[-0.95, 1.34, 0]}>
            <boxGeometry args={[0.1, 0.06, 13]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
          <mesh position={[-0.95, 0.84, 0]} material={materials.ledGlowMat}>
            <boxGeometry args={[0.02, 0.03, 12.8]} />
          </mesh>
          <mesh position={[0.95, 0.88, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.05, 0.92, 13]} />
          </mesh>
          <mesh position={[0.95, 1.34, 0]}>
            <boxGeometry args={[0.1, 0.06, 13]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
          <mesh position={[0.95, 0.84, 0]} material={materials.ledGlowMat}>
            <boxGeometry args={[0.02, 0.03, 12.8]} />
          </mesh>
          <mesh position={[0, 0.44, 6.2]} material={materials.bronzeMat}>
            <boxGeometry args={[1.8, 0.02, 0.6]} />
          </mesh>
          <mesh position={[0, 0.44, -6.2]} material={materials.bronzeMat}>
            <boxGeometry args={[1.8, 0.02, 0.6]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 8. CANTILEVERED SKYBRIDGE OVERLOOK (Level 2, Y = 11.5)   */}
      {/* ======================================================== */}
      <group position={[0, 11.5, -22]} name="PanoramicSkybridge">
        <mesh receiveShadow material={materials.fasciaMat}>
          <boxGeometry args={[22, 0.5, 4.0]} />
        </mesh>
        <mesh position={[0, 0.26, 0]} material={materials.interiorFloorMat}>
          <boxGeometry args={[8, 0.05, 3.8]} />
        </mesh>
        <mesh position={[0, 0.8, 1.95]} material={materials.glassMat}>
          <boxGeometry args={[22, 1.1, 0.06]} />
        </mesh>
        <mesh position={[0, 1.35, 1.95]} material={materials.bronzeMat}>
          <boxGeometry args={[22, 0.1, 0.12]} />
        </mesh>
        <mesh position={[0, 0.8, -1.95]} material={materials.glassMat}>
          <boxGeometry args={[22, 1.1, 0.06]} />
        </mesh>
        <mesh position={[0, 1.35, -1.95]} material={materials.bronzeMat}>
          <boxGeometry args={[22, 0.1, 0.12]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 9. DIAGRID VAULT SKYLIGHT OVERHEAD (Y = 18m)             */}
      {/* ======================================================== */}
      <group position={[0, 18, -25]} name="VaultSkylight">
        {[-40, -25, -10, 5, 20].map((zOffset) => (
          <mesh
            key={`arch-vault-${zOffset}`}
            position={[0, 0, zOffset]}
            geometry={archTrussGeom}
            material={materials.steelTrussMat}
          />
        ))}

        <mesh position={[0, 14.1, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={skylightRidgeGeom} material={materials.steelTrussMat} />
        <mesh position={[0, 0, 0]} geometry={skylightGlassGeom} material={materials.glassMat} />
      </group>
    </group>
  );
});
