import React from 'react';
import { Layers, Store, UtensilsCrossed } from 'lucide-react';
import { MALL_CONFIG } from '../data/mallConfig';

interface ArchitectureSectionProps {
  onNext: () => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onNext }) => {
  const stats = [
    {
      icon: Layers,
      value: `${MALL_CONFIG.totalLevels} Tiers`,
      label: 'Curated Architectural Levels',
      desc: 'Cascading balconies linked by glowing bridges & escalators.'
    },
    {
      icon: Store,
      value: `${MALL_CONFIG.totalStores}+`,
      label: 'World-Class Boutiques',
      desc: 'From iconic couture flagships to niche artisan studios.'
    },
    {
      icon: UtensilsCrossed,
      value: `${MALL_CONFIG.totalDining}+`,
      label: 'Gastronomy Destinations',
      desc: 'Michelin-starred tasting rooms & biophilic sky gardens.'
    }
  ];

  return (
    <section
      id="section-architecture"
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
        {/* Left Column: Heading & Narrative */}
        <div
          className="glass-panel"
          style={{
            padding: '40px 36px',
            pointerEvents: 'auto',
            maxWidth: 580
          }}
        >
          <span
            className="font-grotesk"
            style={{
              fontSize: '0.75rem',
              color: '#d4af37',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12
            }}
          >
            The Grand Atrium
          </span>

          <h2
            className="font-cinzel text-silver-gradient"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.15,
              letterSpacing: '0.05em',
              marginBottom: 18
            }}
          >
            ONE DESTINATION. ENDLESS POSSIBILITIES.
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: '#cbd5e1',
              marginBottom: 28
            }}
          >
            Explore thoughtfully designed spaces where shopping, dining and entertainment come
            together under our breathtaking diagrid skylight.
          </p>

          <button onClick={onNext} className="btn-secondary" style={{ padding: '8px 20px' }}>
            <span>Explore Districts</span>
          </button>
        </div>

        {/* Right Column: 3 Architectural Statistics Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            pointerEvents: 'auto',
            maxWidth: 440
          }}
        >
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 18,
                  borderLeft: '3px solid #d4af37'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} color="#d4af37" />
                </div>
                <div>
                  <div
                    className="font-cinzel text-gold-gradient"
                    style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.1 }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-grotesk"
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#f8fafc',
                      marginBottom: 4
                    }}
                  >
                    {s.label}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

