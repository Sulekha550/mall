import React from 'react';
import { Sparkles, Car, Compass, Accessibility, ArrowUpRight, Scissors, ShoppingBag, Heart } from 'lucide-react';

export const EditorialServices: React.FC = () => {
  const services = [
    {
      icon: Scissors,
      number: '01',
      title: 'Looks Salon',
      subtitle: 'Master Stylists & Spa Sanctuary',
      badge: 'FIRST FLOOR · LEVEL 1',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    },
    {
      icon: Heart,
      number: '02',
      title: 'Arjun Mehendi Art',
      subtitle: 'Bridal Henna & Artisanal Patterns',
      badge: 'CENTRAL ATRIUM · LEVEL 0',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    },
    {
      icon: ShoppingBag,
      number: '03',
      title: "Spencer Retail Limited / Spencer's",
      subtitle: 'Gourmet Hypermarket & Deli',
      badge: 'ANCHOR CONCOURSE A-01',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    },
    {
      icon: Car,
      number: '04',
      title: 'Smart Parking & VIP Valet',
      subtitle: '350kW EV Superchargers & Valet',
      badge: 'B1 – B3 & VALET PORTICO',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    },
    {
      icon: Compass,
      number: '05',
      title: 'VIP Concierge & Hosts',
      subtitle: 'Personal Porters & Reservations',
      badge: 'LEVEL 1 ATRIUM',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    },
    {
      icon: Accessibility,
      number: '06',
      title: 'Universal Accessibility',
      subtitle: 'Barrier-Free Mobility & Quiet Suites',
      badge: 'ALL LEVELS',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'
    }
  ];

  return (
    <section
      id="editorial-services"
      style={{
        position: 'relative',
        padding: '60px 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header: Minimal Text, Maximum Luxury */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 40px' }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(112, 26, 117, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              color: '#854d0e',
              marginBottom: 14
            }}
          >
            <Sparkles size={14} color="#d4af37" />
            <span>VIP HOSPITALITY & GUEST SERVICES</span>
          </div>

          <h2
            className="ed-section-title"
            style={{
              color: '#1a1016',
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              marginBottom: 8
            }}
          >
            The Bespoke Services
          </h2>
          <p className="ed-section-subtitle" style={{ margin: '0 auto', color: '#6b5e68' }}>
            Personalized white-glove assistance and world-class amenities.
          </p>
        </div>

        {/* 6 Image-Rich Royal Visual Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 26,
            alignItems: 'stretch'
          }}
        >
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="royal-card ed-lift-target"
                style={{
                  borderRadius: 22,
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  background: '#fdfcf9',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 16px 40px rgba(212, 175, 55, 0.1)'
                }}
              >
                {/* Visual Image Viewport */}
                <div style={{ position: 'relative', height: 230, overflow: 'hidden' }}>
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="ed-img royal-zoom-effect"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="three-d-light-beam" />
                  <div className="three-d-rim-glow" />
                  <div className="ed-scrim-bottom" />

                  {/* Top Floating Badge Strip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 14,
                      right: 14,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 3
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.94)',
                        backdropFilter: 'blur(10px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <Icon size={12} color="#d4af37" />
                      <span>{srv.badge}</span>
                    </span>

                    <span
                      style={{
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        padding: '3px 9px',
                        borderRadius: 6,
                        color: '#fef08a',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        border: '1px solid rgba(212, 175, 55, 0.4)'
                      }}
                    >
                      {srv.number}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, zIndex: 2, color: '#ffffff' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        margin: 0,
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                      }}
                    >
                      {srv.title}
                    </h3>
                  </div>
                </div>

                {/* Sleek Minimalist Footer Strip */}
                <div
                  style={{
                    padding: '12px 18px',
                    background: '#faf6f0',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                    {srv.subtitle}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#854d0e'
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

