import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { MallScene } from './MallScene';
import { CameraRig } from './CameraRig';
import { HotspotData } from '../types';

interface MallCanvasProps {
  progressRef: React.MutableRefObject<number>;
  isNightMode: boolean;
  reducedMotion: boolean;
  onSelectHotspot: (hotspot: HotspotData) => void;
  isEntranceActive?: boolean;
}

export const MallCanvas: React.FC<MallCanvasProps> = React.memo(({
  progressRef,
  isNightMode,
  reducedMotion,
  onSelectHotspot,
  isEntranceActive = false
}) => {
  // Determine hardware capability and mobile environment once
  const { isMobile, dprRange } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { isMobile: false, dprRange: [1, 1.25] as [number, number] };
    }
    const mobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    // Desktop: capped to 1.35 to prevent 4K/Retina GPU overload; Mobile: capped to 1.15
    const maxDpr = mobile ? 1.15 : Math.min(window.devicePixelRatio || 1, 1.35);
    return {
      isMobile: mobile,
      dprRange: [1, maxDpr] as [number, number]
    };
  }, []);

  return (
    <div
      className={isEntranceActive ? 'hp-anim-hero-canvas' : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto',
        background: isNightMode ? '#080a0e' : '#edf2f7'
      }}
    >
      <Canvas
        camera={{ position: [0, 4.2, 34], fov: 54, near: 0.1, far: 180 }}
        dpr={dprRange}
        shadows={!isMobile} // Disable expensive shadow map pass on mobile
        gl={{
          antialias: !isMobile, // Disable MSAA on mobile for massive fill-rate boost
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isNightMode ? 1.05 : 1.22
        }}
      >
        <Suspense fallback={null}>
          <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
          <MallScene isNightMode={isNightMode} onSelectHotspot={onSelectHotspot} />
        </Suspense>
      </Canvas>
    </div>
  );
});
