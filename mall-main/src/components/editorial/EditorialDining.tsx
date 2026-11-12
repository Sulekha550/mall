import React from 'react';
import { Sparkles, Wine, GlassWater, ArrowUpRight } from 'lucide-react';

const FALLBACK_DINING = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

interface DiningBrand {
  id: string;
  name: string;
  subname: string;
  category: string;
  accentColor: string;
  image: string;
  cuisine: string;
  tagline: string;
  specialty: string;
}

const DINING_BRANDS: DiningBrand[] = [
  {
    id: 'pizza-hut',
    name: 'PIZZA HUT',
    subname: 'PAN PIZZAS · PASTAS · SIDES',
    category: 'ITALIAN CASUAL DINING',
    accentColor: '#e11d48',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    cuisine: 'Signature Pan Pizzas & Cheesy Stuffed Crusts',
    tagline: 'Freshly baked piping hot pan pizzas loaded with 100% mozzarella, seasoned garlic breads, and creamy pastas.',
    specialty: 'Cheesy Stuffed Crust Margherita & Supreme Pan Pizza'
  },
  {
    id: 'kfc',
    name: 'KFC',
    subname: 'CRISPY CHICKEN · BURGERS · ROLLS',
    category: 'GLOBAL FRIED CHICKEN',
    accentColor: '#ea580c',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    cuisine: 'World-Famous 11 Secret Herbs & Spices',
    tagline: "Colonel Sanders' legendary golden crispy fried chicken buckets, spicy zinger burgers, and crunch dips.",
    specialty: 'Hot & Crispy Chicken Bucket & Classic Zinger'
  },
  {
    id: 'barbeque-nation',
    name: 'BARBEQUE NATION (NEARBY)',
    subname: 'LIVE CHARCOAL GRILL & BUFFET',
    category: 'INTERACTIVE BARBEQUE',
    accentColor: '#f59e0b',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    cuisine: 'Unlimited Skewers & Lavish Buffet',
    tagline: 'Interactive embedded tableside charcoal grill with endless marinated kebabs, biryanis, and kulfi counters.',
    specialty: 'Crispy Corn, Cajun Spiced Potatoes & Live Kebabs'
  },
  {
    id: 'botanica-cafe',
    name: 'BOTANICA CAFÉ',
    subname: 'SPECIALTY ROASTS & VIENNOISERIE',
    category: 'ARTISAN ROASTERY',
    accentColor: '#f43f5e',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    cuisine: 'Single-Origin Coffee & Pastries',
    tagline: 'Pour-overs, nitro cold brews, and fresh buttery croissants beneath skylit indoor ficus trees.',
    specialty: 'Arabica Cold Brew & Almond Croissant'
  }
];

export const EditorialDining: React.FC = () => {
  return (
    <section
      id="editorial-dining"
      style={{
        position: 'relative',
        padding: '72px 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: 44 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#e11d48'
            }}
          >
            <Sparkles size={14} color="#e11d48" />
            <span>03 · The Gastronomy Atelier & Culinary Salon</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 20
            }}
          >
            <div>
              <h2
                className="ed-section-title"
                style={{
                  color: '#0f172a',
                  marginBottom: 12,
                  letterSpacing: '0.02em'
                }}
              >
                GOURMET OFFERINGS
              </h2>
              <p className="ed-section-subtitle" style={{ margin: 0 }}>
                Explore international culinary flagships, artisanal bistros, and panoramic skyline lounges
                crafted for discerning palates.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#ea580c',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid rgba(234, 88, 12, 0.3)',
                boxShadow: '0 4px 15px rgba(234, 88, 12, 0.08)',
                fontWeight: 700
              }}
            >
              LEVEL 3 & 4 SKY MEZZANINE
            </div>
          </div>
        </div>

        {/* =================================================================
            CONSISTENT, FIXED-DIMENSION DINING GRID
            All 4 cards have exactly the same size, height, width, and alignment.
            Only the hovered card lifts smoothly (-12px) with subtle shadow.
            ================================================================= */}
        <div className="ed-dining-fixed-grid">
          {DINING_BRANDS.map((brand) => (
            <div key={brand.id} className="ed-dining-fixed-card">
              {/* Brand Logo Header with Consistent Alignment */}
              <div
                style={{
                  padding: '16px 16px 12px',
                  textAlign: 'center',
                  background: '#ffffff',
                  borderBottom: '1px solid rgba(15, 23, 42, 0.05)'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: 9999,
                    background: '#ffffff',
                    color: '#0f172a',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.94rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
                    border: '1px solid rgba(15, 23, 42, 0.1)'
                  }}
                >
                  {brand.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    color: '#64748b',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    marginTop: 4,
                    textTransform: 'uppercase'
                  }}
                >
                  {brand.subname}
                </div>
              </div>

              {/* Exact-Dimension 4:5 Image Frame with Gentle Inner Zoom on Hover */}
              <div className="ed-dining-fixed-img-frame">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="ed-dining-fixed-img"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_DINING;
                  }}
                />
              </div>

              {/* Card Body Underneath with Equal Fixed Height & Proportions */}
              <div
                style={{
                  padding: '20px 18px',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}
              >
                <div
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: brand.accentColor,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: 4
                  }}
                >
                  {brand.cuisine}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.18rem',
                    color: '#0f172a',
                    letterSpacing: '0.02em',
                    lineHeight: 1.25,
                    marginBottom: 6,
                    fontWeight: 800
                  }}
                >
                  {brand.specialty}
                </h3>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: '#475569',
                    lineHeight: 1.5,
                    margin: '0 0 16px 0',
                    flexGrow: 1
                  }}
                >
                  {brand.tagline}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(15, 23, 42, 0.06)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#64748b',
                      fontWeight: 600
                    }}
                  >
                    LEVEL 3 TERRACE
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: brand.accentColor
                    }}
                  >
                    VIEW MENU <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Skyline Terrace Lounge Card */}
        <div
          className="ed-card"
          style={{
            marginTop: 24,
            border: '1px solid rgba(244, 63, 94, 0.25)',
            background: '#ffffff',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              flex: '1 1 480px',
              minHeight: 240,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
              alt="Panoramic Skyline Dining Lounge"
              className="ed-img"
              style={{ minHeight: 240 }}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_DINING;
              }}
            />
            <div style={{ position: 'absolute', top: 18, left: 18 }}>
              <span
                className="ed-pill"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(225, 29, 72, 0.3)',
                  color: '#e11d48',
                  fontWeight: 700
                }}
              >
                <Wine size={13} />
                LEVEL 4 · THE OBSERVATORY SKYLINE
              </span>
            </div>
          </div>

          <div style={{ flex: '1 1 440px', padding: '30px 28px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <GlassWater size={15} color="#e11d48" />
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#e11d48', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>
                Botanical Mixology & Raw Bar
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 10, fontWeight: 800 }}>
              The Observatory Terrace & Sunset Bar
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
              Craft botanical infusions, open raw bar with Brittany oysters, and live sunset jazz sessions
              overlooking the metropolitan skyline.
            </p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase' }}>HOURS</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>12:00 PM – 01:00 AM</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase' }}>RESERVATIONS</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e11d48' }}>Priority VIP Booking Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
