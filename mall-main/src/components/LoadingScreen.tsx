import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LoadingScreenProps {
  onRevealStart?: () => void;
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onRevealStart,
  onLoaded
}) => {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState<number>(reducedMotion ? 100 : 1);
  const [isExiting, setIsExiting] = useState(false);

  const onRevealStartRef = useRef(onRevealStart);
  const onLoadedRef = useRef(onLoaded);
  onRevealStartRef.current = onRevealStart;
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    let rafId: number | null = null;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;

    if (reducedMotion) {
      setProgress(100);
      onRevealStartRef.current?.();
      holdTimer = setTimeout(() => {
        onLoadedRef.current();
      }, 120);

      return () => {
        if (holdTimer) clearTimeout(holdTimer);
      };
    }

    const duration = 2650; // ~2.65s smooth 1 -> 100 count
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(1, elapsed / duration);

      // Smooth luxury pacing curve: starts gracefully, glides steadily, settles softly at 100
      const easedRatio =
        rawRatio < 0.5
          ? 2 * rawRatio * rawRatio * 0.35 + rawRatio * 0.65
          : 1 - Math.pow(1 - rawRatio, 2) * 0.35 - (1 - rawRatio) * 0.65;

      const nextValue = Math.min(100, Math.max(1, Math.round(1 + easedRatio * 99)));
      setProgress(nextValue);

      if (rawRatio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Brief 180ms pause at 100 so counter & progress line align visibly before smooth reveal
        holdTimer = setTimeout(() => {
          setIsExiting(true);
          onRevealStartRef.current?.();
          exitTimer = setTimeout(() => {
            onLoadedRef.current();
          }, 560);
        }, 180);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (holdTimer) clearTimeout(holdTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [reducedMotion]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading City Mall: ${progress}%`}
      className="hp-preloader-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background:
          'linear-gradient(135deg, #fffaf6 0%, #fff1f2 34%, #fef8e7 68%, #fdf6ea 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(-14px)' : 'translateY(0)',
        transition:
          'opacity 560ms cubic-bezier(0.22, 1, 0.36, 1), transform 560ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Soft Champagne & Rose Ambient Light Layers */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          left: '16%',
          width: 440,
          height: 440,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(254, 240, 138, 0.42) 0%, rgba(255, 228, 230, 0.25) 55%, transparent 75%)',
          filter: 'blur(65px)',
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '14%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(251, 113, 133, 0.2) 0%, rgba(254, 249, 195, 0.32) 55%, transparent 75%)',
          filter: 'blur(75px)',
          pointerEvents: 'none'
        }}
      />

      {/* Subtle Moving Background Light Reflection */}
      {!reducedMotion && (
        <div aria-hidden="true" className="hp-preloader-light-sweep" />
      )}

      {/* Centered Luxury Counter & Progress Line */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
          maxWidth: 460,
          padding: '0 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Subtle Brand Eyebrow */}
        <div
          className="font-grotesk"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.32em',
            color: '#92400e',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: 14,
            opacity: 0.85
          }}
        >
          CITY MALL · METROPOLIS
        </div>

        {/* Large Continuous Numerical Counter (1 -> 100) */}
        <div
          className="font-cinzel"
          style={{
            fontSize: 'clamp(4.4rem, 11vw, 8.2rem)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '0.02em',
            fontVariantNumeric: 'tabular-nums',
            background:
              'linear-gradient(135deg, #1c1317 0%, #9f1239 42%, #b45309 74%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 26,
            userSelect: 'none'
          }}
        >
          {progress}
        </div>

        {/* Thin Synchronized Animated Progress Line */}
        <div
          style={{
            width: 'min(320px, 76vw)',
            height: 2,
            background: 'rgba(212, 175, 55, 0.22)',
            borderRadius: 9999,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(90deg, #f43f5e 0%, #f59e0b 55%, #d4af37 100%)',
              transform: `scaleX(${progress / 100})`,
              transformOrigin: 'left center',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Small Subtext */}
        <div
          className="font-grotesk"
          style={{
            marginTop: 18,
            fontSize: '0.72rem',
            letterSpacing: '0.26em',
            color: '#78350f',
            textTransform: 'uppercase',
            fontWeight: 600,
            opacity: 0.85
          }}
        >
          PREPARING YOUR EXPERIENCE
        </div>
      </div>
    </div>
  );
};
