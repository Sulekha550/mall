import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createStoreSignTexture } from '../utils/textureGenerators';

interface SecondFloorFoodCourtProps {
  isNightMode?: boolean;
}

// Shared geometries for food court
const counterGeom = new THREE.BoxGeometry(1.4, 1.1, 4.6);
const counterTopGeom = new THREE.BoxGeometry(1.5, 0.08, 4.8);
const menuBoardGeom = new THREE.BoxGeometry(0.1, 1.0, 4.2);
const diningTableRoundGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 16);
const diningTableLegGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.75, 8);
const diningTableBaseGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.03, 12);
const chairSeatGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 12);
const chairBackGeom = new THREE.BoxGeometry(0.04, 0.35, 0.35);
const planterDividerGeom = new THREE.BoxGeometry(0.6, 0.8, 3.2);
const planterBushGeom = new THREE.BoxGeometry(0.5, 0.5, 3.0);

export const SecondFloorFoodCourt: React.FC<SecondFloorFoodCourtProps> = React.memo(({ isNightMode = false }) => {
  // Restaurant signs
  const signMasala = useMemo(() => createStoreSignTexture('MASALA CRAFT', 'Tandoor & Indian Kitchen', '#ffffff', '#f59e0b', '#24140a'), []);
  const signBean = useMemo(() => createStoreSignTexture('THE BEAN', 'Artisan Coffee Roasters', '#ffffff', '#d4af37', '#1a140f'), []);
  const signStacks = useMemo(() => createStoreSignTexture('STACKS BURGERS', 'Gourmet Grill & Shakes', '#ffffff', '#ef4444', '#180c0c'), []);
  const signDulce = useMemo(() => createStoreSignTexture('DULCE', 'Gelato & Artisan Patisserie', '#ffffff', '#38bdf8', '#0c1a24'), []);

  const materials = useMemo(() => {
    return {
      deckFloor: new THREE.MeshStandardMaterial({
        color: isNightMode ? '#2a1a12' : '#7c4d32',
        roughness: 0.65,
        metalness: 0.05
      }),
      copper: new THREE.MeshStandardMaterial({ color: '#b45309', roughness: 0.35, metalness: 0.8 }),
      oakWood: new THREE.MeshStandardMaterial({ color: '#8a6547', roughness: 0.6, metalness: 0.05 }),
      blackMetal: new THREE.MeshStandardMaterial({ color: '#181b22', roughness: 0.4, metalness: 0.7 }),
      marbleWhite: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.15, metalness: 0.1 }),
      brass: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.25, metalness: 0.88 }),
      chairWood: new THREE.MeshStandardMaterial({ color: '#451a03', roughness: 0.5 }),
      planterStone: new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.5 }),
      greenery: new THREE.MeshStandardMaterial({ color: '#2e6b3b', roughness: 0.8 }),
      glass: new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.32, roughness: 0.05 }),
      warmLight: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fef08a', emissiveIntensity: 1.2 })
    };
  }, [isNightMode]);

  // Dining table positions across the central food court plaza
  const tables = useMemo(() => [
    [-3.0, -32], [0, -32], [3.0, -32],
    [-4.5, -36], [-1.5, -36], [1.5, -36], [4.5, -36],
    [-3.0, -40], [0, -40], [3.0, -40]
  ], []);

  return (
    <group position={[0, 11.5, 0]} name="SecondFloorFoodCourt">
      {/* 1. Dining Deck Floor Inlay (Z = -24 to -48) */}
      <mesh position={[0, 0.01, -36]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.deckFloor}>
        <planeGeometry args={[26, 26]} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. RESTAURANT STOREFRONTS (4 Distinct Food Outlets)       */}
      {/* ======================================================== */}
      {/* LEFT SIDE RESTAURANTS (X = -13.5) */}
      <group position={[-13.5, 0, 0]}>
        {/* OUTLET 1: MASALA CRAFT (Z = -28) */}
        <group position={[0, 0, -28]}>
          {/* Copper Overhead Canopy */}
          <mesh position={[0.5, 3.5, 0]} material={materials.copper}>
            <boxGeometry args={[1.6, 0.35, 6.2]} />
          </mesh>
          {/* Backlit Signage */}
          <mesh position={[1.35, 3.5, 0]}>
            <planeGeometry args={[4.6, 0.85]} />
            <meshStandardMaterial map={signMasala} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.9 : 0.45} />
          </mesh>
          {/* Service Counter with Warming Trays */}
          <group position={[0.8, 0, 0]}>
            <mesh position={[0, 0.55, 0]} geometry={counterGeom} material={materials.copper} />
            <mesh position={[0, 1.12, 0]} geometry={counterTopGeom} material={materials.marbleWhite} />
            {/* Warming Chafing Dishes */}
            {[-1.2, 0, 1.2].map((zOff, i) => (
              <mesh key={`tray-${i}`} position={[0, 1.2, zOff]}>
                <boxGeometry args={[0.5, 0.12, 0.7]} />
                <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        </group>

        {/* OUTLET 2: THE BEAN ROASTERY (Z = -42) */}
        <group position={[0, 0, -42]}>
          {/* Natural Slatted Timber Canopy */}
          <mesh position={[0.5, 3.5, 0]} material={materials.oakWood}>
            <boxGeometry args={[1.6, 0.35, 6.2]} />
          </mesh>
          {/* Backlit Signage */}
          <mesh position={[1.35, 3.5, 0]}>
            <planeGeometry args={[4.6, 0.85]} />
            <meshStandardMaterial map={signBean} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.9 : 0.45} />
          </mesh>
          {/* Espresso Bar Counter */}
          <group position={[0.8, 0, 0]}>
            <mesh position={[0, 0.55, 0]} geometry={counterGeom} material={materials.oakWood} />
            <mesh position={[0, 1.12, 0]} geometry={counterTopGeom} material={materials.marbleWhite} />
            {/* Espresso Machine & Pastry Bell Cloche */}
            <mesh position={[0, 1.35, -0.8]}>
              <boxGeometry args={[0.6, 0.4, 0.8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh position={[0, 1.25, 0.8]}>
              <cylinderGeometry args={[0.22, 0.22, 0.2, 12]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
            </mesh>
          </group>
        </group>
      </group>

      {/* RIGHT SIDE RESTAURANTS (X = +13.5) */}
      <group position={[13.5, 0, 0]}>
        {/* OUTLET 3: STACKS BURGERS (Z = -28) */}
        <group position={[0, 0, -28]}>
          {/* Industrial Matte Black Canopy */}
          <mesh position={[-0.5, 3.5, 0]} material={materials.blackMetal}>
            <boxGeometry args={[1.6, 0.35, 6.2]} />
          </mesh>
          {/* Backlit Signage */}
          <mesh position={[-1.35, 3.5, 0]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[4.6, 0.85]} />
            <meshStandardMaterial map={signStacks} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.9 : 0.45} />
          </mesh>
          {/* Order Counter */}
          <group position={[-0.8, 0, 0]}>
            <mesh position={[0, 0.55, 0]} geometry={counterGeom} material={materials.blackMetal} />
            <mesh position={[0, 1.12, 0]} geometry={counterTopGeom} material={materials.marbleWhite} />
            {/* Digital Order Screens */}
            {[-1.0, 1.0].map((zOff, i) => (
              <mesh key={`screen-${i}`} position={[0, 1.3, zOff]}>
                <boxGeometry args={[0.08, 0.35, 0.45]} />
                <meshStandardMaterial color="#0f172a" emissive="#ef4444" emissiveIntensity={0.6} />
              </mesh>
            ))}
          </group>
        </group>

        {/* OUTLET 4: DULCE PATISSERIE & GELATO (Z = -42) */}
        <group position={[0, 0, -42]}>
          {/* Marble & Brass Overhead Canopy */}
          <mesh position={[-0.5, 3.5, 0]} material={materials.marbleWhite}>
            <boxGeometry args={[1.6, 0.35, 6.2]} />
          </mesh>
          {/* Backlit Signage */}
          <mesh position={[-1.35, 3.5, 0]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[4.6, 0.85]} />
            <meshStandardMaterial map={signDulce} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.9 : 0.45} />
          </mesh>
          {/* Glass Gelato Display Counter */}
          <group position={[-0.8, 0, 0]}>
            <mesh position={[0, 0.55, 0]} geometry={counterGeom} material={materials.marbleWhite} />
            <mesh position={[0, 1.12, 0]} geometry={counterTopGeom} material={materials.brass} />
            {/* Clear Glass Gelato Showcase Case */}
            <mesh position={[0, 1.35, 0]}>
              <boxGeometry args={[1.1, 0.45, 3.6]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.35} roughness={0.05} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. SHARED FOOD COURT SEATING AREA                        */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Balcony High-Top Counter overlooking the Central Atrium Rotunda */}
        <group position={[0, 0, -24.5]}>
          <mesh position={[0, 1.05, 0]} material={materials.oakWood} castShadow>
            <boxGeometry args={[14, 0.08, 0.55]} />
          </mesh>
          <mesh position={[0, 0.52, 0]} material={materials.blackMetal}>
            <boxGeometry args={[13.8, 0.98, 0.06]} />
          </mesh>
          {/* Stools along the Balcony Edge */}
          {[-5, -3, -1, 1, 3, 5].map((x) => (
            <group key={`balcony-stool-${x}`} position={[x, 0, 0.5]}>
              <mesh position={[0, 0.38, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.75, 8]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
              <mesh position={[0, 0.76, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.06, 12]} />
                <meshStandardMaterial color="#451a03" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Dining Tables & Chairs */}
        {tables.map(([x, z], idx) => (
          <group key={`food-table-${idx}`} position={[x, 0, z]}>
            {/* Round Table */}
            <mesh position={[0, 0.02, 0]} geometry={diningTableBaseGeom} material={materials.brass} />
            <mesh position={[0, 0.38, 0]} geometry={diningTableLegGeom} material={materials.brass} />
            <mesh position={[0, 0.76, 0]} geometry={diningTableRoundGeom} material={materials.marbleWhite} />

            {/* 4 Surrounding Chairs */}
            {[
              [0, 0.55, 0],
              [0, -0.55, Math.PI],
              [0.55, 0, -Math.PI / 2],
              [-0.55, 0, Math.PI / 2]
            ].map(([cx, cz, rotY], cIdx) => (
              <group key={`chair-${cIdx}`} position={[cx, 0, cz]} rotation={[0, rotY, 0]}>
                <mesh position={[0, 0.22, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.44, 6]} />
                  <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                <mesh position={[0, 0.45, 0]} geometry={chairSeatGeom} material={materials.chairWood} />
                <mesh position={[0, 0.65, 0.16]} geometry={chairBackGeom} material={materials.chairWood} />
              </group>
            ))}

            {/* Overhead Warm Pendant Lamp */}
            <mesh position={[0, 3.4, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 1.4, 6]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0, 2.65, 0]}>
              <coneGeometry args={[0.22, 0.22, 12, 1, true]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 2.62, 0]} geometry={diningTableRoundGeom} material={materials.warmLight} />
          </group>
        ))}

        {/* Planter Dividers with Greenery separating dining zones */}
        {[-30, -36, -42].map((zPos, idx) => (
          <group key={`divider-left-${idx}`} position={[-6.8, 0, zPos]}>
            <mesh position={[0, 0.4, 0]} geometry={planterDividerGeom} material={materials.planterStone} />
            <mesh position={[0, 0.9, 0]} geometry={planterBushGeom} material={materials.greenery} />
          </group>
        ))}
        {[-30, -36, -42].map((zPos, idx) => (
          <group key={`divider-right-${idx}`} position={[6.8, 0, zPos]}>
            <mesh position={[0, 0.4, 0]} geometry={planterDividerGeom} material={materials.planterStone} />
            <mesh position={[0, 0.9, 0]} geometry={planterBushGeom} material={materials.greenery} />
          </group>
        ))}

        {/* Waste & Tray Return Station */}
        <group position={[-5.8, 0, -46]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.0, 1.2, 1.6]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
});

