import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createCinemaMarqueeTexture, createMoviePosterTexture } from '../utils/textureGenerators';

interface CinemaLobbyProps {
  isNightMode?: boolean;
}

const posterFrameGeom = new THREE.BoxGeometry(0.08, 2.2, 1.5);
const posterPlaneGeom = new THREE.PlaneGeometry(1.4, 2.1);
const kioskGeom = new THREE.BoxGeometry(0.8, 1.2, 0.6);
const cinemaSeatRowGeom = new THREE.BoxGeometry(4.2, 0.45, 0.6);
const cinemaSeatBackGeom = new THREE.BoxGeometry(4.2, 0.6, 0.15);

export const CinemaLobby: React.FC<CinemaLobbyProps> = React.memo(({ isNightMode = false }) => {
  const cinemaMarqueeTex = useMemo(() => createCinemaMarqueeTexture(), []);

  // Original generic movie poster textures
  const posterCosmos = useMemo(() => createMoviePosterTexture('COSMOS', 'Sci-Fi Adventure', 'cosmos'), []);
  const posterVelocity = useMemo(() => createMoviePosterTexture('VELOCITY', 'Action Thriller', 'velocity'), []);
  const posterEchoes = useMemo(() => createMoviePosterTexture('ECHOES OF TIME', 'Mystery Drama', 'echoes'), []);
  const posterNeon = useMemo(() => createMoviePosterTexture('NEON HORIZON', 'Cyber Fantasy', 'neon'), []);

  const materials = useMemo(() => {
    return {
      darkCorridorFloor: new THREE.MeshStandardMaterial({
        color: '#080a10',
        roughness: 0.25,
        metalness: 0.4
      }),
      carpetRunner: new THREE.MeshStandardMaterial({
        color: '#881337',
        roughness: 0.85
      }),
      darkWall: new THREE.MeshStandardMaterial({ color: '#0d1117', roughness: 0.6 }),
      brass: new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.9, roughness: 0.2 }),
      redVelvet: new THREE.MeshStandardMaterial({ color: '#991b1b', roughness: 0.7 }),
      posterBacklit: new THREE.MeshStandardMaterial({ emissive: '#ffffff', emissiveIntensity: isNightMode ? 0.9 : 0.5 }),
      neonCyan: new THREE.MeshStandardMaterial({ color: '#00f0ff', emissive: '#00f0ff', emissiveIntensity: 1.5 }),
      neonGold: new THREE.MeshStandardMaterial({ color: '#d4af37', emissive: '#d4af37', emissiveIntensity: 1.2 }),
      screenGlow: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#60a5fa', emissiveIntensity: 1.4 })
    };
  }, [isNightMode]);

  return (
    <group position={[0, 11.5, -60]} name="CinemaLobby">
      {/* 1. Cinema Concourse Flooring & Red Carpet Runner */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.darkCorridorFloor}>
        <planeGeometry args={[24, 28]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.carpetRunner}>
        <planeGeometry args={[4.2, 28]} />
      </mesh>

      {/* 2. Grand Entrance Portal & Illuminated Marquee (Z = +8) */}
      <group position={[0, 0, 8]}>
        {/* Overhead Entrance Archway */}
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[14, 1.4, 1.2]} />
          <meshStandardMaterial color="#0b0e14" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Marquee Signboard */}
        <mesh position={[0, 4.2, 0.65]}>
          <planeGeometry args={[11, 2.2]} />
          <meshStandardMaterial map={cinemaMarqueeTex} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.95 : 0.5} />
        </mesh>
        {/* Brass Portal Columns */}
        <mesh position={[-6.2, 2.0, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.25, 0.25, 4.0, 16]} />
        </mesh>
        <mesh position={[6.2, 2.0, 0]} material={materials.brass}>
          <cylinderGeometry args={[0.25, 0.25, 4.0, 16]} />
        </mesh>
      </group>

      {/* 3. Concession & Popcorn Counter (Left side, X = -6.5) */}
      <group position={[-6.5, 0, 2]}>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.2, 1.1, 4.6]} />
          <meshStandardMaterial color="#1a1c23" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.12, 0]} material={materials.brass}>
          <boxGeometry args={[1.3, 0.06, 4.8]} />
        </mesh>
        {/* Popcorn Warmer Display Case */}
        <mesh position={[0, 1.45, -1.0]}>
          <boxGeometry args={[0.7, 0.6, 0.9]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 1.35, -1.0]}>
          <boxGeometry args={[0.5, 0.4, 0.7]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* 4. Automated Ticket Kiosks (Right side, X = +6.5) */}
      <group position={[6.5, 0, 2]}>
        {[-1.4, 0, 1.4].map((zOff, i) => (
          <group key={`kiosk-${i}`} position={[0, 0, zOff]}>
            <mesh position={[0, 0.6, 0]} geometry={kioskGeom} material={materials.darkWall} />
            {/* Glowing Touch Screen */}
            <mesh position={[-0.38, 0.85, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[0.4, 0.5]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. Backlit Movie Poster Gallery (Framed Along the Concourse Walls) */}
      {/* Left Wall Posters (X = -8.5, Z = -4, -8) */}
      <group position={[-8.5, 2.2, -4]} rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={posterFrameGeom} material={materials.brass} />
        <mesh position={[0, 0, 0.05]} geometry={posterPlaneGeom}>
          <meshStandardMaterial map={posterCosmos} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.7 : 0.35} />
        </mesh>
      </group>
      <group position={[-8.5, 2.2, -9]} rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={posterFrameGeom} material={materials.brass} />
        <mesh position={[0, 0, 0.05]} geometry={posterPlaneGeom}>
          <meshStandardMaterial map={posterVelocity} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.7 : 0.35} />
        </mesh>
      </group>

      {/* Right Wall Posters (X = +8.5, Z = -4, -8) */}
      <group position={[8.5, 2.2, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={posterFrameGeom} material={materials.brass} />
        <mesh position={[0, 0, 0.05]} geometry={posterPlaneGeom}>
          <meshStandardMaterial map={posterEchoes} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.7 : 0.35} />
        </mesh>
      </group>
      <group position={[8.5, 2.2, -9]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={posterFrameGeom} material={materials.brass} />
        <mesh position={[0, 0, 0.05]} geometry={posterPlaneGeom}>
          <meshStandardMaterial map={posterNeon} emissive="#ffffff" emissiveIntensity={isNightMode ? 0.7 : 0.35} />
        </mesh>
      </group>

      {/* 6. Auditorium 1 Entrance Portal & Seating Preview (Z = -14) */}
      <group position={[0, 0, -14]}>
        {/* Archway Portal Header */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[6.5, 0.8, 0.4]} />
          <meshStandardMaterial color="#080a0f" roughness={0.5} />
        </mesh>
        {/* Illuminated Portal Sign: AUDITORIUM 1 · IMAX LASER */}
        <mesh position={[0, 3.2, 0.22]}>
          <planeGeometry args={[4.8, 0.45]} />
          <meshStandardMaterial color="#ffffff" emissive="#d4af37" emissiveIntensity={1.2} />
        </mesh>

        {/* Tiered Cinema Seats inside Auditorium Preview (Z = -16 to -22) */}
        <group position={[0, 0, -5]}>
          {/* Row 1 */}
          <group position={[0, 0.25, -1.5]}>
            <mesh geometry={cinemaSeatRowGeom} material={materials.redVelvet} />
            <mesh position={[0, 0.35, -0.22]} geometry={cinemaSeatBackGeom} material={materials.redVelvet} />
          </group>
          {/* Row 2 (Stepped) */}
          <group position={[0, 0.65, -3.2]}>
            <mesh geometry={cinemaSeatRowGeom} material={materials.redVelvet} />
            <mesh position={[0, 0.35, -0.22]} geometry={cinemaSeatBackGeom} material={materials.redVelvet} />
          </group>
          {/* Glowing Cinema Screen at the far back (Z = -7.5) */}
          <mesh position={[0, 2.4, -7.5]}>
            <planeGeometry args={[7.2, 3.8]} />
            <meshStandardMaterial map={cinemaMarqueeTex} emissive="#ffffff" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
});

