import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Compass, MapPin, ChevronDown } from 'lucide-react';
import { CINEMATIC_CHECKPOINTS } from '../data/cameraWaypoints';
import { CameraWaypoint } from '../types';
import { audioAmbiance } from '../utils/audioAmbiance';

interface CinematicHUDProps {
  scrollProgress: number;
  activeCheckpoint: CameraWaypoint;
  onJumpToProgress: (progress: number) => void;
  onOpenDirectory: () => void; 
  onOpenVisit: () => void;
  isNightMode: boolean; 
  onToggleNightMode: () => void;
  hideTopHeader?: boolean;      
  hideBottomScrubber?: boolean;
  isEntranceActive?: boolean;
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  scrollProgress,
  activeCheckpoint,
  onJumpToProgress,
  onOpenDirectory,
  onOpenVisit,
  isNightMode,
  onToggleNightMode,
  hideTopHeader = false,
  hideBottomScrubber = false,
  isEntranceActive = false
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioToggle = () => {
    const playing = audioAmbiance.toggle();
    setIsAudioPlaying(playing);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. TOP MINIMAL NAVIGATION BAR */}
      {/* ======================================================== */}
      {!hideTopHeader && (
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 40,
            padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(8, 10, 14, 0.75) 0%, transparent 100%)'
        }}
      >
        {/* Left: Brand Monogram & Name */}
        <div
          onClick={() => onJumpToProgress(0)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            pointerEvents: 'auto',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 30%, #f59e0b 70%, #facc15 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0d090d',
              fontWeight: 800,
              fontSize: '1.05rem',
              boxShadow: '0 4px 15px rgba(244, 63, 94, 0.45)'
            }}
          >
            CM
          </div>
          <div>
            <div
              className="font-cinzel text-silver-gradient"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                lineHeight: 1.1
              }}
            >
              CITY MALL
            </div>
            <div
              className="font-grotesk"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                color: '#facc15',
                textTransform: 'uppercase'
              }}
            >
              Shopping • Dining • Entertainment
            </div>
          </div>
        </div>

        {/* Center: Real-time Location Indicator Pill */}
        <div
          className="glass-panel"
          style={{
            padding: '6px 16px',
            borderRadius: 9999,
            display: 'none',
            alignItems: 'center',
            gap: 8,
            border: '1px solid rgba(244, 63, 94, 0.35)',
            pointerEvents: 'auto'
          }}
          id="location-badge"
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f43f5e' }} />
          <span
            className="font-grotesk"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: '#f8fafc',
              textTransform: 'uppercase'
            }}
          >
            {activeCheckpoint.locationLabel}
          </span>
        </div>

        {/* Right: Controls & Directory Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
          {/* Store Directory Button */}
          <button
            onClick={onOpenDirectory}
            className="btn-secondary"
            style={{
              padding: '7px 16px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Compass size={15} color="#d4af37" />
            <span>Store Directory</span>
          </button>

          {/* Soundscape Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isAudioPlaying ? 'Mute Ambiance' : 'Play Ambient Soundscape'}
            className="glass-pill"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isAudioPlaying ? '#d4af37' : '#94a3b8'
            }}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleNightMode}
            title={isNightMode ? 'Switch to Golden Hour Day' : 'Switch to Night Lighting'}
            className="glass-pill"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isNightMode ? '#fde047' : '#0284c7'
            }}
          >
            {isNightMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Plan Visit Button */}
          <button
            onClick={onOpenVisit}
            className="btn-primary"
            style={{
              padding: '7px 16px',
              fontSize: '0.75rem',
              display: 'none'
            }}
            id="plan-visit-btn"
          >
            <MapPin size={14} />
            <span>Visit</span>
          </button>
        </div>
      </header>
      )}

      {/* ======================================================== */}
      {/* 2. BOTTOM JOURNEY PROGRESS TIMELINE SCRUBBER */}
      {/* ======================================================== */}
      {!hideBottomScrubber && (
      <footer
        className={isEntranceActive ? 'hp-anim-hud' : undefined}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 40,
          padding: '16px 32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
          background: 'linear-gradient(0deg, rgba(8, 10, 14, 0.85) 0%, transparent 100%)'
        }}
      >
        {/* "Scroll to Explore" indicator at beginning */}
        {scrollProgress < 0.08 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#d4af37',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              opacity: 0.9,
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
            onClick={() => onJumpToProgress(0.18)}
          >
            <span>Scroll or Drag Timeline to Journey</span>
            <ChevronDown size={14} />
          </div>
        )}

        {/* Checkpoint Pills & Progress Bar */}
        <div
          style={{
            maxWidth: 820,
            width: '100%',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}
        >
          {/* Continuous Progress Track */}
          <div
            style={{
              width: '100%',
              height: 3,
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 3,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickedProgress = (e.clientX - rect.left) / rect.width;
              onJumpToProgress(Math.max(0, Math.min(1, clickedProgress)));
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, scrollProgress * 100)}%`,
                background: 'linear-gradient(90deg, #f43f5e 0%, #fb7185 30%, #f59e0b 70%, #facc15 100%)',
                borderRadius: 3,
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          {/* Checkpoint Markers */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              userSelect: 'none'
            }}
          >
            {CINEMATIC_CHECKPOINTS.map((cp) => {
              const isActive = activeCheckpoint.id === cp.id;
              const midProgress = (cp.progressStart + cp.progressEnd) / 2;
              return (
                <button
                  key={cp.id}
                  onClick={() => onJumpToProgress(midProgress)}
                  title={cp.name}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#fef08a' : '#64748b',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    padding: '2px 4px',
                    fontWeight: isActive ? 700 : 400
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? '#fef08a' : '#64748b')
                  }
                >
                  <span className="checkpoint-label">{cp.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>
      )}

      <style>{`
        @media (min-width: 900px) {
          #location-badge { display: flex !important; }
          #plan-visit-btn { display: inline-flex !important; }
        }
        @media (max-width: 640px) {
          .checkpoint-label { display: none; }
        }
      `}</style>
    </>
  );
};

