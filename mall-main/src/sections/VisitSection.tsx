import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Send, Check } from 'lucide-react';
import { MALL_CONFIG } from '../data/mallConfig';

export const VisitSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setEmailInput('');
    }, 4000);
  };

  return (
    <section
      id="section-visit"
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
        {/* Left Column: Plan Your Arrival & Contact Details */}
        <div
          className="glass-panel-gold"
          style={{
            padding: '42px 38px',
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
              marginBottom: 10
            }}
          >
            Arrival & Guest Concierge
          </span>

          <h2
            className="font-cinzel text-gold-gradient"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '0.06em',
              marginBottom: 16
            }}
          >
            YOUR NEXT EXPERIENCE STARTS HERE
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1',
              marginBottom: 32
            }}
          >
            We invite you to experience City Mall in person. Seamlessly connected via direct highway
            arterials and transit hubs with underground VIP valet parking.
          </p>

          {/* Practical Info List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <MapPin size={20} color="#d4af37" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div className="font-grotesk" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  DESTINATION ADDRESS
                </div>
                <div style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 500 }}>
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
                  OPERATING HOURS
                </div>
                <div style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 500 }}>
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
                  VIP CONCIERGE DESK
                </div>
                <div style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 500 }}>
                  {MALL_CONFIG.contact.conciergePhone}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href={MALL_CONFIG.address.googleMapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Navigation size={15} />
              <span>Get Directions</span>
            </a>
            <a
              href={`mailto:${MALL_CONFIG.contact.generalEmail}`}
              className="btn-secondary"
            >
              <Mail size={15} />
              <span>Contact Concierge</span>
            </a>
          </div>
        </div>

        {/* Right Column: Private Member & Event Inquiry Card */}
        <div
          className="glass-panel"
          style={{
            padding: '36px 32px',
            pointerEvents: 'auto',
            maxWidth: 480
          }}
        >
          <div
            className="font-cinzel text-silver-gradient"
            style={{ fontSize: '1.4rem', marginBottom: 8 }}
          >
            CITY MALL PRIVILEGE CIRCLE
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 24 }}>
            Receive private invitations to seasonal fashion runways, masterclass wine tastings, and
            complimentary valet reservations.
          </p>

          {formSubmitted ? (
            <div
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: 12,
                padding: '20px',
                textAlign: 'center',
                color: '#fef08a'
              }}
            >
              <Check size={28} color="#d4af37" style={{ margin: '0 auto 8px' }} />
              <div className="font-cinzel" style={{ fontSize: '1.1rem', marginBottom: 4 }}>
                Invitation Confirmed
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Your private member welcome kit has been dispatched to your email.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label
                  className="font-grotesk"
                  style={{
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: 6
                  }}
                >
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="Lord / Lady / Guest"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label
                  className="font-grotesk"
                  style={{
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: 6
                  }}
                >
                  PREFFERED EMAIL
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="patron@domain.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
                <Send size={15} />
                <span>Join Privilege Circle</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

