import React from 'react';
import { Sparkles, Instagram, Camera, Heart, ArrowUpRight } from 'lucide-react';

const FALLBACK_LIFESTYLE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

export const EditorialLifestyleGallery: React.FC = () => {
  return (
    <section
      id="editorial-gallery"
      style={{
        position: 'relative',
        padding: '72px 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glows — Rose Pink & Fresh Turquoise */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '-6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.16) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: 52 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'rgba(236, 72, 153, 0.08)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              color: '#be185d'
            }}
          >
            <Sparkles size={14} color="#be185d" />
            <span>06 · The Social Chronicle & Asymmetric Floating Gallery</span>
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
                  marginBottom: 12
                }}
              >
                THE SOCIAL CHRONICLE
              </h2>
              <p className="ed-section-subtitle" style={{ margin: 0 }}>
                An artistic, floating collage of cosmopolitan lifestyle moments, architectural perspectives,
                and spontaneous elegance shared by our global guests.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#be185d',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.08)',
                fontWeight: 700
              }}
            >
              #CITYMALLOFFICIAL
            </div>
          </div>
        </div>

        {/* =================================================================
            ASYMMETRIC FLOATING GALLERY WITH CENTRAL STATEMENT CARD
            ================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 24,
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Top-Left Floating Image: Tall Portrait (2:3) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloat 6s ease-in-out infinite',
              border: '1px solid rgba(244, 114, 182, 0.35)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-2-3">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Luxury Fashion Lookbook on Promenade"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#be185d', fontWeight: 700 }}>
                  <Heart size={11} fill="#be185d" color="#be185d" /> @claire.couture
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right Floating Image: Square (1:1) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloatSlow 7s ease-in-out infinite',
              animationDelay: '1.2s',
              border: '1px solid rgba(234, 88, 12, 0.3)',
              position: 'relative',
              zIndex: 3
            }}
          >
            <div className="ed-ratio-1-1">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Runway Backstage Details"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#ea580c', fontWeight: 700 }}>
                  <Camera size={11} /> #RunwayDiaries
                </span>
              </div>
            </div>
          </div>

          {/* Top-Far-Right Floating Image: Portrait (3:4) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloat 5.5s ease-in-out infinite',
              animationDelay: '0.6s',
              border: '1px solid rgba(251, 113, 133, 0.35)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-3-4">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Haute Joaillerie & Luxury Shopping Experience"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#f43f5e', fontWeight: 700 }}>
                  <Heart size={11} fill="#f43f5e" color="#f43f5e" /> @valerie_vogue
                </span>
              </div>
            </div>
          </div>

          {/* =============================================================
              CENTERPIECE STATEMENT CARD: THE EDITORIAL SOCIAL HUB
              ============================================================= */}
          <div
            className="ed-social-center"
            style={{
              gridColumn: 'span 12',
              margin: '12px 0',
              background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
              border: '1.5px solid rgba(236, 72, 153, 0.35)',
              boxShadow: '0 24px 60px rgba(236, 72, 153, 0.15)'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 18px',
                borderRadius: 9999,
                background: 'rgba(236, 72, 153, 0.1)',
                color: '#be185d',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 16
              }}
            >
              <Instagram size={14} />
              JOIN OUR CURATED COMMUNITY
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: '#0f172a',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
                marginBottom: 12,
                fontWeight: 800
              }}
            >
              Tag @CityMallOfficial to be Featured
            </h3>

            <p
              style={{
                fontSize: '1rem',
                color: '#475569',
                maxWidth: 680,
                margin: '0 auto 24px',
                lineHeight: 1.6
              }}
            >
              Share your moments across our grand atriums, tasting salons, and haute couture avenue.
              Selected monthly patron photographs are published in our seasonal printed Lookbook.
            </p>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #be185d 0%, #e11d48 50%, #ea580c 100%)',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                boxShadow: '0 12px 30px rgba(225, 29, 72, 0.35)',
                textDecoration: 'none',
                transition: 'all 0.35s ease'
              }}
            >
              <Instagram size={18} />
              <span>Follow @CityMallOfficial</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Bottom-Left Floating Image: Landscape (4:3) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloatSlow 6.5s ease-in-out infinite',
              animationDelay: '0.8s',
              border: '1px solid rgba(13, 148, 136, 0.3)',
              position: 'relative',
              zIndex: 3
            }}
          >
            <div className="ed-ratio-4-5">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Cosmopolitan City Mall Architecture"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#0f766e', fontWeight: 700 }}>
                  <Heart size={11} fill="#0f766e" color="#0f766e" /> @arch.perspectives
                </span>
              </div>
            </div>
          </div>

          {/* Bottom-Center Floating Image: Square (1:1) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloat 6.2s ease-in-out infinite',
              animationDelay: '1.8s',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-1-1">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Artisanal Café Twilight Conversation"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#f59e0b', fontWeight: 700 }}>
                  <Camera size={11} /> #EspressoCourtyard
                </span>
              </div>
            </div>
          </div>

          {/* Bottom-Right Floating Image: Tall Portrait (3:4) */}
          <div
            className="ed-card ed-social-float-img"
            style={{
              gridColumn: 'span 4',
              animation: 'edFloatSlow 7.2s ease-in-out infinite',
              animationDelay: '0.3s',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              position: 'relative',
              zIndex: 3
            }}
          >
            <div className="ed-ratio-3-4">
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Evening Cocktail & High Fashion Look"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_LIFESTYLE; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span className="ed-pill" style={{ background: 'rgba(255,255,255,0.95)', color: '#f43f5e', fontWeight: 700 }}>
                  <Heart size={11} fill="#f43f5e" color="#f43f5e" /> @atelier.night
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
