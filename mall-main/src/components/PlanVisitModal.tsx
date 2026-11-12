import React from 'react';
import { X, MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { MALL_CONFIG } from '../data/mallConfig';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 160,
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-gold"
        style={{
          maxWidth: 620,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '36px 32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="glass-pill"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#cbd5e1'
          }}
        >
          <X size={18} />
        </button>

        <span
          className="font-grotesk"
          style={{
            fontSize: '0.75rem',
            color: '#d4af37',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 8
          }}
        >
          GUEST HOSPITALITY & CONCIERGE
        </span>

        <h2
          className="font-cinzel text-gold-gradient"
          style={{ fontSize: '1.8rem', lineHeight: 1.15, marginBottom: 16 }}
        >
          PLAN YOUR ARRIVAL
        </h2>

        <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#cbd5e1', marginBottom: 28 }}>
          City Mall is centrally situated in the Downtown Civic District, offering direct valet
          portico access, high-speed EV superchargers, and spacious multistory parking.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <MapPin size={20} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div className="font-grotesk" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                DESTINATION ADDRESS
              </div>
              <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 500 }}>
                {MALL_CONFIG.address.street}, {MALL_CONFIG.address.district}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                {MALL_CONFIG.address.city}, {MALL_CONFIG.address.postalCode}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Clock size={20} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div className="font-grotesk" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                HOURS OF ADMISSION
              </div>
              <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 500 }}>
                Mon – Fri: {MALL_CONFIG.hours.weekdays}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Sat – Sun: {MALL_CONFIG.hours.weekends}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Phone size={20} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div className="font-grotesk" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                VIP CONCIERGE & VALET
              </div>
              <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 500 }}>
                {MALL_CONFIG.contact.conciergePhone}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <a
            href={MALL_CONFIG.address.googleMapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '9px 24px' }}
          >
            <Navigation size={15} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};

