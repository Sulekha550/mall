import React from 'react';
import { X, Sparkles, MapPin, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { HotspotData } from '../types';

interface ExploreModalProps {
  hotspot: HotspotData | null;
  onClose: () => void;
  onPlanVisit?: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({ hotspot, onClose, onPlanVisit }) => {
  if (!hotspot) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
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
          maxWidth: 640,
          width: '100%',
          maxHeight: '88vh',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Sparkles size={16} color="#d4af37" />
          <span
            className="font-grotesk"
            style={{
              fontSize: '0.75rem',
              color: '#d4af37',
              letterSpacing: '0.18em',
              textTransform: 'uppercase'
            }}
          >
            {hotspot.category}
          </span>
        </div>

        <h2
          className="font-cinzel text-gold-gradient"
          style={{ fontSize: '1.8rem', lineHeight: 1.15, marginBottom: 16 }}
        >
          {hotspot.title}
        </h2>

        {hotspot.image && (
          <div
            style={{
              width: '100%',
              height: 240,
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: 20,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <img
              src={hotspot.image}
              alt={hotspot.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: 1.6,
            color: '#cbd5e1',
            marginBottom: 24
          }}
        >
          {hotspot.description}
        </p>

        {hotspot.details && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 24,
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <MapPin size={15} color="#d4af37" />
              <span className="font-grotesk" style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                Location: <strong>{hotspot.details.level}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {hotspot.details.highlights.map((h: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} color="#d4af37" />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px 20px' }}>
            Close
          </button>
          {onPlanVisit && (
            <button
              onClick={() => {
                onClose();
                onPlanVisit();
              }}
              className="btn-primary"
              style={{ padding: '8px 22px' }}
            >
              <span>Concierge Details</span>
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
