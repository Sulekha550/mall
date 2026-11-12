import React from 'react';
import { SceneLighting } from './SceneLighting';
import { AtriumArchitecture } from './AtriumArchitecture';
import { KineticSculpture } from './KineticSculpture';
import { GroundFloorShops } from './GroundFloorShops';
import { FirstFloorShops } from './FirstFloorShops';
import { SecondFloorFoodCourt } from './SecondFloorFoodCourt';
import { CinemaLobby } from './CinemaLobby';
import { EventsPlaza } from './EventsPlaza';
import { ShoppersAndAmbience } from './ShoppersAndAmbience';
import { InteractiveHotspots } from './InteractiveHotspots';
import { HotspotData } from '../types';

interface MallSceneProps {
  isNightMode: boolean;
  onSelectHotspot: (hotspot: HotspotData) => void;
}

export const MallScene: React.FC<MallSceneProps> = React.memo(({ isNightMode, onSelectHotspot }) => {
  return (
    <group name="MallSceneRoot">
      {/* Controlled Atmospheric Depth Fog */}
      <fogExp2
        attach="fog"
        args={[isNightMode ? '#080a0f' : '#eaf0f6', isNightMode ? 0.012 : 0.0055]}
      />

      {/* Dynamic Lighting System */}
      <SceneLighting isNightMode={isNightMode} />

      {/* Grand Architectural Framework with Shared Geometries */}
      <AtriumArchitecture isNightMode={isNightMode} />

      {/* The Central Kinetic Suspended Sculpture */}
      <KineticSculpture position={[0, 8, -5]} />

      {/* Ground Floor Shopping Promenade (3 distinct stores Left + 3 stores Right) */}
      <GroundFloorShops isNightMode={isNightMode} />

      {/* First Floor Retail Balcony Promenade (3 distinct stores Left + 3 stores Right) */}
      <FirstFloorShops isNightMode={isNightMode} />

      {/* Second Floor Food Court & Dining Concourse (4 restaurants + seating) */}
      <SecondFloorFoodCourt isNightMode={isNightMode} />

      {/* Second Floor Cinema & Entertainment Zone (City Cinemas) */}
      <CinemaLobby isNightMode={isNightMode} />

      {/* Events Plaza Centerpiece */}
      <EventsPlaza isNightMode={isNightMode} />

      {/* Realistic Stylized Shoppers, Ambient Benches & Wayfinding Totems */}
      <ShoppersAndAmbience isNightMode={isNightMode} />

      {/* Interactive 3D Hotspots */}
      <InteractiveHotspots onSelectHotspot={onSelectHotspot} />
    </group>
  );
});
