import React, { useState } from 'react';
import { UtensilsCrossed, Star, ArrowRight } from 'lucide-react';
import { DINING_HIGHLIGHTS } from '../data/mallConfig';

interface DiningSectionProps {
  onNext?: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onNext }) => {
  const [activeDining, setActiveDining] = useState(0);

  return (
    <section
      id="section-dining"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 32px', 
        pointerEvents: 'none'
      }}
    >
      <div
        className="mall-container"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          alignItems: 'center'
        }}
      >
        {/* Left Column: Narrative & Dining List */}
        <div
          className="glass-panel"
          style={{
            padding: '40px 36px',
            pointerEvents: 'auto',
            maxWidth: 560
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <UtensilsCrossed size={16} color="#d4af37" />
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Level 3 & 4 · Gastronomy Sky Terrace
            </span>
          </div>

          <h2
            className="font-cinzel text-silver-gradient"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: 16
            }}
          >
            COME HUNGRY. LEAVE HAPPY.
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              marginBottom: 28
            }}
          >
            From relaxed coffee breaks to memorable meals, find a place for every mood. Over 35
            curated culinary destinations, authentic omakase bars, and rooftop lounges surrounded by
            living biophilic greenery.
          </p>

          {/* Dining Venue Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {DINING_HIGHLIGHTS.map((item, idx) => {
              const isSelected = activeDining === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveDining(idx)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 12,
                    background: isSelected
                      ? 'rgba(212, 175, 55, 0.16)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected
                      ? '1px solid rgba(212, 175, 55, 0.45)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    <div
                      className="font-cinzel"
                      style={{
                        fontSize: '1.05rem',
                        color: isSelected ? '#ffffff' : '#cbd5e1',
                        fontWeight: 600
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.cuisine}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} color="#d4af37" fill="#d4af37" />
                    <span
                      className="font-grotesk"
                      style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 600 }}
                    >
                      {item.rating}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ padding: '8px 22px' }}>
            <span>To Entertainment World</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Column: Culinary Card */}
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            padding: 0,
            overflow: 'hidden',
            maxWidth: 440
          }}
        >
          <div style={{ height: 260, position: 'relative' }}>
            <img
              src={DINING_HIGHLIGHTS[activeDining].image}
              alt={DINING_HIGHLIGHTS[activeDining].name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, #0d0f12 100%)'
              }}
            />
            <span
              className="font-grotesk"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '4px 10px',
                borderRadius: 20,
                background: 'rgba(0, 0, 0, 0.65)',
                color: '#fef08a',
                fontSize: '0.78rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {DINING_HIGHLIGHTS[activeDining].priceRange}
            </span>
          </div>
          <div style={{ padding: '24px' }}>
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: 6
              }}
            >
              {DINING_HIGHLIGHTS[activeDining].level}
            </span>
            <h3
              className="font-cinzel"
              style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: 10 }}
            >
              {DINING_HIGHLIGHTS[activeDining].name}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {DINING_HIGHLIGHTS[activeDining].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

