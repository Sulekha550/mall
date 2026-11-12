import React from 'react';
import { CameraWaypoint } from '../types';
import { Sparkles, ArrowRight, Compass, Eye, ChevronRight } from 'lucide-react';

interface CinematicOverlayProps {
  activeCheckpoint: CameraWaypoint;
  checkpointWeight: number; // 0 (hidden) to 1 (fully visible)
  onPrimaryCta: (checkpointId: string) => void;
  onSecondaryCta?: (checkpointId: string) => void;
  isEntranceActive?: boolean;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  activeCheckpoint,
  checkpointWeight,
  onPrimaryCta,
  onSecondaryCta,
  isEntranceActive = false
}) => {
  const isRightAligned = activeCheckpoint.panelAlignment === 'right';
  const isLeftAligned = activeCheckpoint.panelAlignment === 'left';
  const isCenterAligned = activeCheckpoint.panelAlignment === 'center';

  // Smoothly calculate opacity and subtle translateY from checkpointWeight
  const opacity = Math.min(1, Math.max(0, (checkpointWeight - 0.15) / 0.7));
  const translateY = (1 - opacity) * 20;

  if (opacity < 0.05) return null; 

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 35,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCenterAligned
          ? 'center'
          : isRightAligned
          ? 'flex-end'    
          : 'flex-start',
        padding: '80px 48px',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
      }}
      className="cinematic-overlay-container"
    >
      {/* Floating Cinematic Information Panel with High Contrast & Readability */}
      <div
        className={`cinematic-info-panel glass-panel ${isEntranceActive ? 'hp-anim-card-panel' : ''}`}
        style={{
          pointerEvents: 'auto',
          maxWidth: isCenterAligned ? 640 : 460,
          width: '100%',
          padding: '32px 34px',
          background: 'rgba(255, 253, 250, 0.96)', // 96% ivory/white opacity to fully insulate text
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 22,
          border: '1px solid rgba(244, 63, 94, 0.22)',
          boxShadow: '0 24px 60px rgba(30, 19, 24, 0.14), 0 8px 24px rgba(244, 63, 94, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          textAlign: isCenterAligned ? 'center' : 'left',
          position: 'relative',
          zIndex: 36
        }}
      >
        {/* Category & Floor Indicator Badge */}
        <div
          className={isEntranceActive ? 'hp-anim-card-badge' : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.45) 0%, rgba(255, 228, 230, 0.6) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            marginBottom: 16
          }}
        >
          <Sparkles size={13} color="#9f1239" />
          <span
            className="font-grotesk"
            style={{
              fontSize: '0.74rem',
              color: '#2a1a24', // Dark purple / charcoal text
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            {activeCheckpoint.floorLabel} · {activeCheckpoint.category}
          </span>
        </div>

        {/* Display Title - Deep Charcoal / Dark Purple for Maximum Readability */}
        <h1
          className={`font-cinzel ${isEntranceActive ? 'hp-anim-title' : ''}`}
          style={{
            fontSize: isCenterAligned
              ? 'clamp(2.2rem, 4.5vw, 3.8rem)'
              : 'clamp(1.75rem, 3.2vw, 2.5rem)',
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            fontWeight: 800,
            color: '#1a1016', // High-contrast deep charcoal / dark purple
            marginBottom: 8
          }}
        >
          {activeCheckpoint.title}
        </h1>

        {/* Subtitle - Rich Amber / Warm Tone */}
        <div
          className={`font-grotesk ${isEntranceActive ? 'hp-anim-subtitle' : ''}`}
          style={{
            fontSize: '0.84rem',
            letterSpacing: '0.12em',
            color: '#92400e', // Warm amber / deep golden rose
            fontWeight: 700,
            marginBottom: 16,
            textTransform: 'uppercase'
          }}
        >
          {activeCheckpoint.subtitle}
        </div>

        {/* Description - Dark Grey (#4B4655) with Comfortable Spacing */}
        <p
          className={isEntranceActive ? 'hp-anim-desc' : undefined}
          style={{
            fontSize: '1rem', // 16px font size
            fontWeight: 500,
            lineHeight: 1.65,
            color: '#4B4655', // Exactly requested dark grey
            marginBottom: 24,
            maxWidth: isCenterAligned ? 620 : 480,
            margin: isCenterAligned ? '0 auto 24px' : '0 0 24px'
          }}
        >
          {activeCheckpoint.description}
        </p>

        {/* Feature Pills with Subtle Lavender/Pink Background & High Contrast */}
        {activeCheckpoint.features && (
          <div
            className={isEntranceActive ? 'hp-anim-features' : undefined}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: isCenterAligned ? 'center' : 'flex-start',
              marginBottom: 26
            }}
          >
            {activeCheckpoint.features.map((feat, i) => (
              <span
                key={i}
                className="glass-pill"
                style={{
                  fontSize: '0.78rem',
                  padding: '6px 14px',
                  color: '#2a1a24', // Dark purple / charcoal text
                  background: 'linear-gradient(135deg, rgba(253, 242, 248, 0.95) 0%, rgba(245, 243, 255, 0.95) 100%)', // Subtle lavender / pink background
                  border: '1px solid rgba(244, 63, 94, 0.28)', // Visible refined border
                  boxShadow: '0 2px 8px rgba(30, 19, 24, 0.04)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.04em'
                }}
              >
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: isCenterAligned ? 'center' : 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          {activeCheckpoint.primaryCtaText && (
            <button
              onClick={() => onPrimaryCta(activeCheckpoint.id)}
              className={`btn-primary ${isEntranceActive ? 'hp-anim-btn-primary' : ''}`}
              style={{
                color: '#0d090d',
                boxShadow: '0 10px 25px rgba(244, 63, 94, 0.35)'
              }}
            >
              <span>{activeCheckpoint.primaryCtaText}</span>
              <ArrowRight size={14} />
            </button>
          )}

          {activeCheckpoint.secondaryCtaText && onSecondaryCta && (
            <button
              onClick={() => onSecondaryCta(activeCheckpoint.id)}
              className={`btn-secondary ${isEntranceActive ? 'hp-anim-btn-secondary' : ''}`}
              style={{
                background: '#ffffff',
                color: '#1e1318',
                border: '1.5px solid rgba(244, 63, 94, 0.45)',
                boxShadow: '0 4px 14px rgba(30, 19, 24, 0.06)'
              }}
            >
              <Compass size={14} color="#f43f5e" />
              <span>{activeCheckpoint.secondaryCtaText}</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cinematic-overlay-container {
            padding: 84px 16px 28px !important;
            align-items: flex-end !important;
            justifyContent: center !important;
          }
          .cinematic-overlay-container .cinematic-info-panel {
            max-width: 100% !important;
            padding: 24px 20px !important;
            max-height: 52vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

