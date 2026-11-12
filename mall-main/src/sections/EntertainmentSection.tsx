import React, { useState } from 'react';
import { Film, ArrowRight, Gamepad2 } from 'lucide-react';
import { ENTERTAINMENT_EXPERIENCES } from '../data/mallConfig';

interface EntertainmentSectionProps {
  onNext?: () => void;
}

export const EntertainmentSection: React.FC<EntertainmentSectionProps> = ({ onNext }) => {
  const [activeExp, setActiveExp] = useState(0);

  return (
    <section
      id="section-entertainment"
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
        {/* Left Column: Heading & Venues */}
        <div
          className="glass-panel"
          style={{
            padding: '40px 36px',
            pointerEvents: 'auto',
            maxWidth: 560
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Film size={16} color="#00f0ff" />
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#00f0ff',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Level 3 & 4 · Entertainment Pavilion
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
            MAKE ROOM FOR FUN
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              marginBottom: 28
            }}
          >
            Catch a movie, spend time with friends and discover something new. Featuring our
            flagship IMAX Laser auditorium, full-scale virtual reality arena, and boutique luxury
            bowling lounges.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {ENTERTAINMENT_EXPERIENCES.map((exp, idx) => {
              const isSelected = activeExp === idx;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExp(idx)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 12,
                    background: isSelected
                      ? 'rgba(0, 240, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected
                      ? '1px solid rgba(0, 240, 255, 0.45)'
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
                      {exp.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{exp.type}</div>
                  </div>
                  <Gamepad2 size={16} color={isSelected ? '#00f0ff' : '#475569'} />
                </div>
              );
            })}
          </div>

          <button onClick={onNext} className="btn-primary" style={{ padding: '8px 22px' }}>
            <span>To Events Plaza</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Column: Visual Entertainment Card */}
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            padding: 0,
            overflow: 'hidden',
            maxWidth: 440,
            border: '1px solid rgba(0, 240, 255, 0.25)'
          }}
        >
          <div style={{ height: 260, position: 'relative' }}>
            <img
              src={ENTERTAINMENT_EXPERIENCES[activeExp].image}
              alt={ENTERTAINMENT_EXPERIENCES[activeExp].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, #060911 100%)'
              }}
            />
          </div>
          <div style={{ padding: '24px' }}>
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#00f0ff',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: 6
              }}
            >
              {ENTERTAINMENT_EXPERIENCES[activeExp].type}
            </span>
            <h3
              className="font-cinzel"
              style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: 10 }}
            >
              {ENTERTAINMENT_EXPERIENCES[activeExp].title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {ENTERTAINMENT_EXPERIENCES[activeExp].details}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

