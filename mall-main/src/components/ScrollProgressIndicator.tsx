import React from 'react';
import { SECTIONS_METADATA } from '../data/mallConfig';

interface ScrollProgressIndicatorProps {
  scrollProgress: number;
  activeSectionIndex: number;
  onNavigateToSection: (index: number) => void;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  scrollProgress,
  activeSectionIndex,
  onNavigateToSection
}) => {
  return (
    <aside
      style={{
        position: 'fixed',
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'none',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 16,
        pointerEvents: 'auto'
      }}
      className="scroll-indicator-aside"
    >
      {/* Current Active Section Badge */}
      <div
        className="glass-panel"
        style={{
          padding: '6px 14px',
          borderRadius: 20,
          border: '1px solid rgba(212, 175, 55, 0.35)',
          background: 'rgba(10, 12, 16, 0.85)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8
        }}
      >
        <span
          className="font-grotesk"
          style={{ fontSize: '0.7rem', color: '#d4af37', fontWeight: 700 }}
        >
          0{activeSectionIndex + 1}
        </span>
        <span
          style={{ width: 1, height: 10, background: 'rgba(255, 255, 255, 0.2)' }}
        />
        <span
          className="font-cinzel"
          style={{ fontSize: '0.72rem', color: '#f1f5f9', letterSpacing: '0.06em' }}
        >
          {SECTIONS_METADATA[activeSectionIndex]?.name}
        </span>
      </div>

      {/* Waypoint Dots with Continuous Track */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          position: 'relative',
          padding: '4px 0'
        }}
      >
        {/* Continuous Track Line */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            bottom: 6,
            width: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        >
          <div
            style={{
              width: '100%',
              height: `${Math.min(100, scrollProgress * 100)}%`,
              background: 'linear-gradient(180deg, #d4af37, #fef08a)',
              transition: 'height 0.1s linear'
            }}
          />
        </div>

        {/* Waypoint Dots */}
        {SECTIONS_METADATA.map((sec, idx) => {
          const isActive = activeSectionIndex === idx;
          const isPassed = scrollProgress >= idx / (SECTIONS_METADATA.length - 1);

          return (
            <button
              key={sec.id}
              onClick={() => onNavigateToSection(idx)}
              title={sec.name}
              style={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
                borderRadius: '50%',
                background: isActive
                  ? '#d4af37'
                  : isPassed
                  ? 'rgba(212, 175, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.25)',
                border: isActive
                  ? '2px solid #ffffff'
                  : '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                zIndex: 1,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 0 12px rgba(212, 175, 55, 0.8)' : 'none',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1.4)';
                  e.currentTarget.style.background = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = isPassed
                    ? 'rgba(212, 175, 55, 0.8)'
                    : 'rgba(255, 255, 255, 0.25)';
                }
              }}
            />
          );
        })}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .scroll-indicator-aside { display: flex !important; }
        }
      `}</style>
    </aside>
  );
};

