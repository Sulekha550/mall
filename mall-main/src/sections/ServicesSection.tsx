import React from 'react';
import {
  Car,
  ShoppingBag,
  Accessibility,
  HeartHandshake,
  PackageCheck,
  Sparkles,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { CONCIERGE_SERVICES } from '../data/mallConfig';

interface ServicesSectionProps {
  onNext?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Car,
  ShoppingBag,
  Accessibility,
  HeartHandshake,
  PackageCheck,
  Sparkles
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNext }) => {
  return (
    <section
      id="section-services"
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
          alignItems: 'center'
        }}
      >
        {/* Header */}
        <div
          className="glass-panel"
          style={{
            padding: '36px 36px',
            pointerEvents: 'auto',
            maxWidth: 720,
            textAlign: 'center',
            marginBottom: 36
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
              marginBottom: 10
            }}
          >
            Bespoke Guest Hospitality
          </span>

          <h2
            className="font-cinzel text-silver-gradient"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: 14
            }}
          >
            EVERY VISIT, MADE EASIER
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1'
            }}
          >
            Find the information and services you need before you arrive. Our dedicated concierge team
            is on hand to ensure every detail of your journey is effortless.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            width: '100%',
            maxWidth: 1100,
            pointerEvents: 'auto',
            marginBottom: 32
          }}
        >
          {CONCIERGE_SERVICES.map((srv) => {
            const Icon = iconMap[srv.iconName] || Sparkles;
            return (
              <div
                key={srv.id}
                className="glass-panel"
                style={{
                  padding: '24px 26px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16
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
                  <h3
                    className="font-cinzel"
                    style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: 6 }}
                  >
                    {srv.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#94a3b8',
                      lineHeight: 1.5,
                      marginBottom: 8
                    }}
                  >
                    {srv.description}
                  </p>
                  <span
                    className="font-grotesk"
                    style={{ fontSize: '0.72rem', color: '#d4af37' }}
                  >
                    📍 {srv.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <button onClick={onNext} className="btn-primary" style={{ padding: '8px 24px' }}>
            <span>Plan Your Arrival</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
