import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FASHION_CATEGORIES } from '../data/mallConfig';

interface FashionSectionProps {
  onSelectCategory?: (category: string) => void;
  onNext?: () => void;
}

export const FashionSection: React.FC<FashionSectionProps> = ({ onSelectCategory, onNext }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section
      id="section-fashion"
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
          gap: 40,
          alignItems: 'center'
        }}
      >
        {/* Left Column: Heading and Category Selection Tabs */}
        <div
          className="glass-panel"
          style={{
            padding: '40px 36px',
            pointerEvents: 'auto',
            maxWidth: 540
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sparkles size={16} color="#d4af37" />
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Level 1 · The Fashion Colonnade
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
            DEFINE YOUR STYLE
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              marginBottom: 28
            }}
          >
            Discover fashion, footwear and everyday essentials for every occasion. Stroll down our
            sunlit promenade featuring iconic international couture houses and emerging atelier
            talents.
          </p>

          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {FASHION_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    if (onSelectCategory) onSelectCategory(cat.id);
                  }}
                  className="glass-pill"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: isSelected ? '#0d0f12' : '#f1f5f9',
                    background: isSelected
                      ? 'linear-gradient(135deg, #d4af37, #fef08a)'
                      : 'rgba(255, 255, 255, 0.06)',
                    borderColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                    cursor: 'pointer'
                  }}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={onNext} className="btn-primary" style={{ padding: '8px 22px' }}>
              <span>To Haute Luxury</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Campaign Feature Card */}
        <div
          className="glass-panel-gold"
          style={{
            pointerEvents: 'auto',
            overflow: 'hidden',
            padding: 0,
            maxWidth: 460
          }}
        >
          <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
            <img
              src={FASHION_CATEGORIES[selectedIdx].image}
              alt={FASHION_CATEGORIES[selectedIdx].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 40%, rgba(13, 16, 21, 0.95) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 20,
                right: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}
            >
              <div>
                <span
                  className="font-grotesk"
                  style={{ fontSize: '0.72rem', color: '#d4af37', letterSpacing: '0.15em' }}
                >
                  CURATED SALON
                </span>
                <h3
                  className="font-cinzel"
                  style={{ fontSize: '1.4rem', color: '#ffffff', lineHeight: 1.1 }}
                >
                  {FASHION_CATEGORIES[selectedIdx].title}
                </h3>
              </div>
              <span
                className="font-grotesk"
                style={{
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: 12,
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: '#fef08a',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}
              >
                {FASHION_CATEGORIES[selectedIdx].count}
              </span>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Immerse yourself in seasonal trunk shows, bespoke tailoring suites, and private styling
              consultations reserved exclusively for our patrons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

