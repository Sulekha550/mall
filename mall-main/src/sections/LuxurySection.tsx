import React, { useState } from 'react';
import { Gem, ArrowRight, ShieldCheck } from 'lucide-react';
import { LUXURY_COLLECTION } from '../data/mallConfig';

interface LuxurySectionProps {
  onNext?: () => void;
  onExploreHotspot?: (id: string) => void;
}

export const LuxurySection: React.FC<LuxurySectionProps> = ({ onNext }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section
      id="section-luxury"
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
        {/* Left Column: Narrative & Maison Showcase */}
        <div
          className="glass-panel-gold"
          style={{
            padding: '42px 38px',
            pointerEvents: 'auto',
            maxWidth: 560
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Gem size={16} color="#d4af37" />
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Level 2 · The Gilded Arcade
            </span>
          </div>

          <h2
            className="font-cinzel text-gold-gradient"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: 16
            }}
          >
            THE ART OF THE EXCEPTIONAL
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              marginBottom: 28
            }}
          >
            Explore distinctive collections, personal style and thoughtfully selected lifestyle
            experiences. Encased in Nero Marquina marble, our luxury vault hosts the most prestigious
            Swiss horology and haute joaillerie houses.
          </p>

          {/* Interactive Maison Selector Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {LUXURY_COLLECTION.map((item, idx) => {
              const isSelected = activeItem === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(idx)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 12,
                    background: isSelected
                      ? 'rgba(212, 175, 55, 0.15)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '1px solid rgba(212, 175, 55, 0.5)'
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
                        color: isSelected ? '#ffffff' : '#94a3b8',
                        fontWeight: 600
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="font-grotesk"
                      style={{ fontSize: '0.72rem', color: '#d4af37' }}
                    >
                      {item.category}
                    </div>
                  </div>
                  <ShieldCheck size={16} color={isSelected ? '#d4af37' : '#475569'} />
                </div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ padding: '8px 22px' }}>
            <span>To Gastronomy Garden</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Column: Visual Highlight Card */}
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            padding: 0,
            overflow: 'hidden',
            maxWidth: 440,
            border: '1px solid rgba(212, 175, 55, 0.25)'
          }}
        >
          <div style={{ height: 260, position: 'relative' }}>
            <img
              src={LUXURY_COLLECTION[activeItem].image}
              alt={LUXURY_COLLECTION[activeItem].name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, #0d0f12 100%)'
              }}
            />
          </div>
          <div style={{ padding: '24px' }}>
            <div
              className="font-grotesk"
              style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: 4 }}
            >
              {LUXURY_COLLECTION[activeItem].location}
            </div>
            <h3
              className="font-cinzel"
              style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: 10 }}
            >
              {LUXURY_COLLECTION[activeItem].name}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {LUXURY_COLLECTION[activeItem].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

