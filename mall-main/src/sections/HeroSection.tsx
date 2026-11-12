import React from 'react';
import { ChevronDown, Compass, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onDiscover: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onDiscover }) => {
  return (
    <section
      id="section-hero"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '120px 24px 80px',
        textAlign: 'center',
        pointerEvents: 'none' // Allow canvas interaction outside text
      }}
    >
      <div
        style={{
          maxWidth: 920,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Subtle Top Badge */}
        <div
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            marginBottom: 20,
            border: '1px solid rgba(212, 175, 55, 0.35)',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <Sparkles size={14} color="#d4af37" />
          <span
            className="font-grotesk"
            style={{
              fontSize: '0.74rem',
              color: '#d4af37',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            A Contemporary Three-Level Experience
          </span>
        </div>

        {/* Prominent Architectural Title */}
        <h1
          className="font-cinzel text-gold-gradient"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '0.1em',
            marginBottom: 14,
            textShadow: '0 8px 32px rgba(0, 0, 0, 0.85)'
          }}
        >
          CITY MALL
        </h1>

        {/* Elegant Supporting Subtitle */}
        <p
          className="font-grotesk"
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.35rem)',
            color: '#fef08a',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 16,
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.9)'
          }}
        >
          SHOPPING · DINING · ENTERTAINMENT
        </p>

        {/* Architectural Overview Prose */}
        <p
          className="font-sans"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            color: '#cbd5e1',
            maxWidth: 620,
            lineHeight: 1.6,
            fontWeight: 300,
            marginBottom: 32,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)'
          }}
        >
          Discover premier global flagships, artisan dining terraces, and cutting-edge cinema within a luminous architectural destination.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onExplore} className="btn-primary">
            <Compass size={16} />
            <span>Explore the Mall</span>
          </button>
          <button onClick={onDiscover} className="btn-secondary">
            <span>Discover What's Inside</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator at Viewport Bottom */}
      <div
        onClick={onExplore}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          pointerEvents: 'auto',
          opacity: 0.85
        }}
        className="animate-bounce-slow"
      >
        <span
          className="font-grotesk"
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: '#cbd5e1',
            textTransform: 'uppercase'
          }}
        >
          Scroll To Journey
        </span>
        <ChevronDown size={18} color="#d4af37" />
      </div>
    </section>
  );
};

