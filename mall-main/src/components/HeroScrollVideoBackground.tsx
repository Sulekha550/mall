import React, { useCallback, useEffect, useRef, useState } from 'react';

interface PersistentMallVideoBackgroundProps {
  pathname?: string;
  isNightMode: boolean;
  reducedMotion: boolean;
  disabled?: boolean;
}

const HERO_VIDEO_SRC = '/videos/mall.mp4';

const ROUTE_VIDEO_MAP: ReadonlyArray<{ prefix: string; src: string }> = [
  { prefix: '/dining', src: '/videos/food.mp4' },
  { prefix: '/entertainment', src: '/videos/e.mp4' },
  { prefix: '/shopping', src: '/videos/b.mp4' },
  { prefix: '/brand', src: '/videos/b.mp4' }
];

function resolveVideoSrc(pathname?: string): string {
  const normalizedPath = pathname?.toLowerCase() ?? '';
  const match = ROUTE_VIDEO_MAP.find(
    ({ prefix }) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)
  );
  return match?.src ?? HERO_VIDEO_SRC;
}

/**
 * Single persistent fixed-viewport H.264 HTML5 video background across the website.
 * Maps specific routes (such as `/dining` and `/entertainment`) to dedicated MP4 loops
 * and defaults to `/videos/mall.mp4` elsewhere.
 * Plays smoothly with autoPlay, muted, loop, playsInline, and preload="auto",
 * handles autoplay fallback safely, avoids playback-interrupting re-renders,
 * and shows the fallback image only if playback genuinely fails.
 */
export const PersistentMallVideoBackground: React.FC<PersistentMallVideoBackgroundProps> = ({
  pathname,
  isNightMode,
  reducedMotion,
  disabled = false
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fallbackArmedRef = useRef(false);
  const [failedVideoSrc, setFailedVideoSrc] = useState<string | null>(null);

  const videoSrc = resolveVideoSrc(pathname);
  const hasVideoError = failedVideoSrc === videoSrc;

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasVideoError || reducedMotion || disabled) return;

    // Ensure DOM muted attributes are synchronized before play() to satisfy strict autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (!video.paused) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (fallbackArmedRef.current) return;
        fallbackArmedRef.current = true;

        const resumeOnInteraction = () => {
          fallbackArmedRef.current = false;
          const v = videoRef.current;
          if (!v || reducedMotion || disabled) return;
          v.defaultMuted = true;
          v.muted = true;
          v.play().catch(() => { });
        };

        window.addEventListener('pointerdown', resumeOnInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', resumeOnInteraction, { once: true, passive: true });
        window.addEventListener('keydown', resumeOnInteraction, { once: true, passive: true });
      });
    }
  }, [hasVideoError, reducedMotion, disabled]);

  useEffect(() => {
    fallbackArmedRef.current = false;
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (reducedMotion || disabled) {
      if (!video.paused) {
        video.pause();
      }
      return;
    }

    // Explicitly trigger load when videoSrc changes across route transitions
    if (video.readyState === 0) {
      video.load();
    }
    attemptPlay();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [attemptPlay, reducedMotion, disabled, videoSrc]);

  const handleLoadedMetadata = useCallback(() => {
    attemptPlay();
  }, [attemptPlay]);

  const handleLoadedData = useCallback(() => {
    attemptPlay();
  }, [attemptPlay]);

  const handleCanPlay = useCallback(() => {
    attemptPlay();
  }, [attemptPlay]);

  return (
    <div
      aria-hidden="true"
      className="hp-hero-video-stage"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: isNightMode ? '#140c14' : '#fff5f7',
        opacity: disabled ? 0 : 1,
        transform: 'translateZ(0)',
        willChange: 'transform',
        transition: 'opacity 350ms ease'
      }}
    >
      {/* Fallback architectural photograph shown ONLY when video playback genuinely fails */}
      {hasVideoError && (
        <img
          src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1600&auto=format&fit=crop"
          alt="City Mall Multi-Level Atrium"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* Single persistent H.264 MP4 background video */}
      {!hasVideoError && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          aria-hidden="true"
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlay}
          onError={() => setFailedVideoSrc(videoSrc)}
          className="hp-hero-bg-video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'contrast(1.06) saturate(1.05) brightness(0.99)',
            backfaceVisibility: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}

      {/* Minimal edge vignette (keeps video full brightness, sharp & clear) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: isNightMode
            ? 'linear-gradient(96deg, rgba(14, 8, 14, 0.14) 0%, rgba(14, 8, 14, 0) 44%)'
            : 'none',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export const HeroScrollVideoBackground = PersistentMallVideoBackground;
