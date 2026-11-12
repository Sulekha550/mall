import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { EVENT_SCHEDULE } from '../data/mallConfig';

interface EventsSectionProps {
  onNext?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onNext }) => {
  return (
    <section
      id="section-events"
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Section Header */}
        <div
          className="glass-panel"
          style={{
            padding: '36px 36px',
            pointerEvents: 'auto',
            maxWidth: 780,
            marginBottom: 36
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12
            }}
          >
            <Calendar size={16} color="#d4af37" />
            <span
              className="font-grotesk"
              style={{
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              The Grand Amphitheater & Plaza
            </span>
          </div>

          <h2
            className="font-cinzel text-silver-gradient"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: 14
            }}
          >
            THERE’S ALWAYS SOMETHING HAPPENING
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              maxWidth: 600,
              margin: '0 auto'
            }}
          >
            Discover seasonal celebrations, special events and experiences worth sharing. From
            international kinetic art installations to private salon fashion previews.
          </p>
        </div>

        {/* 3 Curated Event Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            width: '100%',
            maxWidth: 1100,
            pointerEvents: 'auto',
            marginBottom: 32
          }}
        >
          {EVENT_SCHEDULE.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel"
              style={{
                padding: 0,
                overflow: 'hidden',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: 160, position: 'relative' }}>
                <img
                  src={evt.image}
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  className="font-grotesk"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    padding: '3px 10px',
                    borderRadius: 12,
                    background: 'rgba(8, 10, 14, 0.8)',
                    color: '#fef08a',
                    fontSize: '0.72rem',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  {evt.category}
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#d4af37',
                    fontSize: '0.75rem',
                    marginBottom: 6
                  }}
                >
                  <Calendar size={13} />
                  <span>{evt.date}</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <Clock size={13} />
                  <span>{evt.time}</span>
                </div>
                <h3
                  className="font-cinzel"
                  style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: 8, lineHeight: 1.25 }}
                >
                  {evt.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    marginBottom: 16,
                    flex: 1
                  }}
                >
                  {evt.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#64748b',
                    fontSize: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: 10
                  }}
                >
                  <MapPin size={13} color="#d4af37" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <button onClick={onNext} className="btn-secondary">
            <span>Explore Guest Services</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

