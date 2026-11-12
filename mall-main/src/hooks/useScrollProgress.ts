import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getInterpolatedCinematicCamera } from '../data/cameraWaypoints';
import { CameraWaypoint } from '../types';

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll(scrollContainerRef: React.RefObject<HTMLElement>) {
  // Direct ref for R3F 3D Camera - updated 60-120fps with ZERO React re-renders
  const progressRef = useRef<number>(0);

  // Throttled UI state for HTML Overlay and HUD
  const [uiState, setUiState] = useState<{
    scrollProgress: number;
    activeCheckpoint: CameraWaypoint;
    checkpointWeight: number;
  }>(() => {
    const initial = getInterpolatedCinematicCamera(0, false);
    return {
      scrollProgress: 0,
      activeCheckpoint: initial.activeCheckpoint,
      checkpointWeight: initial.checkpointWeight
    };
  });

  const lastDispatchedProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35, // Smooth responsive tracking
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;

        // Schedule throttled UI update on next animation frame
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            const currentP = progressRef.current;
            const diff = Math.abs(currentP - lastDispatchedProgressRef.current);

            // Update UI only when progress moved noticeably or crossed checkpoint boundary
            if (diff > 0.005) {
              lastDispatchedProgressRef.current = currentP;
              const { activeCheckpoint, checkpointWeight } = getInterpolatedCinematicCamera(
                currentP,
                window.innerWidth < 768
              );
              setUiState({
                scrollProgress: currentP,
                activeCheckpoint,
                checkpointWeight
              });
            }
          });
        }
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollContainerRef]);

  // Programmatic jump to target progress
  const jumpToProgress = useCallback(
    (targetProgress: number) => {
      if (!scrollContainerRef.current) return;
      const maxScroll = scrollContainerRef.current.offsetHeight - window.innerHeight;
      const targetScrollY = Math.max(0, Math.min(maxScroll, targetProgress * maxScroll));
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    },
    [scrollContainerRef]
  );

  return { progressRef, uiState, jumpToProgress };
}
