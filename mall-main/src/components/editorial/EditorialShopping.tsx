import React from 'react';
import { Sparkles, ArrowUpRight, Tag, Bookmark, Compass } from 'lucide-react';

const FALLBACK_FASHION = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

export const EditorialShopping: React.FC = () => {
  return (
    <div
      id="editorial-shopping"
      style={{
        position: 'relative',
        padding: '24px 0 60px',
        width: '100%',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.18) 0%, rgba(251, 113, 133, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Editorial Section Header */}
        <div style={{ marginBottom: 52 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(250, 204, 21, 0.12) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#f43f5e'
            }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <span>02 · Fashion Colonnade & Haute Couture Lookbook</span>
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
                  color: '#1c1317',
                  marginBottom: 12
                }}
              >
                THE EDITORIAL EDIT
              </h2>
              <p className="ed-section-subtitle" style={{ margin: 0 }}>
                A staggered, layered fashion monograph featuring premier global fashion houses,
                haute joaillerie salons, and bespoke artisanal ateliers across sunlit marble avenues.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#f43f5e',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.12)',
                fontWeight: 700
              }}
            >
              SPRING / SUMMER ATELIER ISSUE
            </div>
          </div>
        </div>

        {/* =================================================================
            PRIMARY LAYER: ASYMMETRICAL EDITORIAL FASHION SPREAD
            ================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
            alignItems: 'stretch',
            position: 'relative',
            paddingTop: 24,
            marginBottom: 36
          }}
        >
          {/* Main Hero: Louis Philippe Sartorial Haute Atelier */}
          <div
            className="royal-card ed-lift-target"
            style={{
              position: 'relative',
              borderRadius: 22,
              border: '1px solid rgba(212, 175, 55, 0.45)',
              background: '#fdfcf9',
              minHeight: 450,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(212, 175, 55, 0.12)'
            }}
          >
            {/* Top Floating Badge Strip */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 16,
                right: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
              }}
            >
              <span
                style={{
                  background: 'rgba(253, 252, 249, 0.92)',
                  backdropFilter: 'blur(12px)',
                  color: '#854d0e',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  padding: '5px 14px',
                  borderRadius: 9999,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
                }}
              >
                <Tag size={12} color="#d4af37" /> LOUIS PHILIPPE · HAUTE SARTORIAL
              </span>
              <span
                style={{
                  background: 'rgba(253, 252, 249, 0.88)',
                  backdropFilter: 'blur(12px)',
                  padding: '5px 12px',
                  borderRadius: 9999,
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#b45309',
                  fontWeight: 700,
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                LEVEL 1 · NO. 102
              </span>
            </div>

            {/* Immersive Photo Frame with Ken Burns effect */}
            <div style={{ position: 'relative', flex: 1, minHeight: 340, overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Louis Philippe Luxury Menswear Sartorial Tailoring"
                className="ed-img royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = FALLBACK_FASHION; }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <button
                className="ed-explore-btn"
                style={{ bottom: 16, right: 16 }}
                title="Explore Louis Philippe Collection"
                aria-label="Explore Collection"
              >
                <ArrowUpRight size={20} />
              </button>
            </div>

            {/* Sleek Minimal Bottom Strip */}
            <div
              style={{
                padding: '12px 20px',
                background: 'rgba(253, 252, 249, 0.98)',
                borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#1a1016', margin: 0, fontWeight: 800 }}>
                  Louis Philippe Sartorial Atelier
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#854d0e',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                BESPOKE SUITING
              </span>
            </div>
          </div>

          {/* Stacked Complementary Dual Vignettes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Vignette 1: Levi's 501® & Youth Denim */}
            <div
              className="royal-card ed-lift-target"
              style={{
                position: 'relative',
                borderRadius: 22,
                border: '1px solid rgba(212, 175, 55, 0.45)',
                background: '#fdfcf9',
                flex: 1,
                minHeight: 215,
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(212, 175, 55, 0.1)'
              }}
            >
              <div style={{ width: '48%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                  alt="Levi's Store & Flying Machine Fashion Model Denim Lifestyle"
                  className="ed-img royal-zoom-effect"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FASHION; }}
                />
                <div className="three-d-light-beam" />
                <div className="three-d-rim-glow" />
              </div>

              <div
                style={{
                  width: '52%',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span
                    style={{
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: '#854d0e',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: 10
                    }}
                  >
                    <Bookmark size={11} color="#d4af37" /> LEVI'S & FLYING MACHINE
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.14rem', color: '#1a1016', margin: '0 0 6px', fontWeight: 800 }}>
                    Levi's 501® Denim Heritage
                  </h4>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#b45309', fontWeight: 700 }}>
                    LEVEL 0 · NO. 114
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#854d0e', textTransform: 'uppercase', fontWeight: 700 }}>
                    URBAN CASUALS
                  </span>
                  <button
                    className="ed-explore-btn"
                    style={{ width: 34, height: 34, position: 'static' }}
                    title="Explore Levi's & Denim"
                    aria-label="Explore Collection"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Vignette 2: Puma & Adidas Athletics */}
            <div
              className="royal-card ed-lift-target"
              style={{
                position: 'relative',
                borderRadius: 22,
                border: '1px solid rgba(212, 175, 55, 0.45)',
                background: '#fdfcf9',
                flex: 1,
                minHeight: 215,
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(212, 175, 55, 0.1)'
              }}
            >
              <div style={{ width: '48%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                  alt="Puma & Adidas Athletic Model High-Performance Sportswear"
                  className="ed-img royal-zoom-effect"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FASHION; }}
                />
                <div className="three-d-light-beam" />
                <div className="three-d-rim-glow" />
              </div>

              <div
                style={{
                  width: '52%',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span
                    style={{
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: '#854d0e',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: 10
                    }}
                  >
                    <Compass size={11} color="#d4af37" /> PUMA & ADIDAS · ACTIVE
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.14rem', color: '#1a1016', margin: '0 0 6px', fontWeight: 800 }}>
                    Puma & Adidas High-Performance
                  </h4>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#b45309', fontWeight: 700 }}>
                    LEVEL 0 · BOULEVARD
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#854d0e', textTransform: 'uppercase', fontWeight: 700 }}>
                    STREETWEAR & RUNNING
                  </span>
                  <button
                    className="ed-explore-btn"
                    style={{ width: 34, height: 34, position: 'static' }}
                    title="Explore Sportswear"
                    aria-label="Explore Collection"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            SECONDARY LAYER: OVERLAPPING ARTISANAL FOOTWEAR & PARFUMERIE (LOWER DUO)
            ================================================================= */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: 16
          }}
        >
          {/* Card 4: Artisan Footwear (Woodland Store & Metro Shoes) */}
          <div
            className="ed-shopping-card ed-lift-target royal-card"
            style={{
              flex: '1 1 480px',
              maxWidth: 580,
              margin: '0 14px 24px',
              padding: '18px 22px',
              borderRadius: 22,
              border: '1px solid rgba(212, 175, 55, 0.45)',
              background: '#fdfcf9',
              boxShadow: '0 16px 40px rgba(212, 175, 55, 0.1)',
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div style={{ width: 140, height: 140, flexShrink: 0, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Woodland & Metro Shoes Designer Footwear"
                className="ed-img royal-zoom-effect"
                onError={(e) => { e.currentTarget.src = FALLBACK_FASHION; }}
              />
              <button
                className="ed-explore-btn"
                style={{ width: 36, height: 36, bottom: 8, right: 8 }}
                title="Explore Footwear"
                aria-label="Explore Footwear"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div>
              <span className="ed-overlap-badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#854d0e', marginBottom: 8, border: '1px solid rgba(212, 175, 55, 0.35)', fontWeight: 700 }}>
                WOODLAND & METRO SHOES
              </span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#1c1317', marginBottom: 4, fontWeight: 800 }}>
                Woodland, Metro Shoes & Skechers
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                Rugged outdoor adventure boots, festive designer collections & Memory Foam sneakers.
              </p>
            </div>
          </div>

          {/* Card 5: Fine Jewellery & Watches (Tanishq & Titan World) */}
          <div
            className="ed-shopping-card ed-lift-target royal-card"
            style={{
              flex: '1 1 480px',
              maxWidth: 580,
              margin: '0 14px 24px',
              padding: '18px 22px',
              borderRadius: 22,
              border: '1px solid rgba(212, 175, 55, 0.45)',
              background: '#fdfcf9',
              boxShadow: '0 16px 40px rgba(212, 175, 55, 0.1)',
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              position: 'relative',
              zIndex: 3
            }}
          >
            <div style={{ width: 140, height: 140, flexShrink: 0, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Tanishq Fine Jewellery & Titan World"
                className="ed-img royal-zoom-effect"
                onError={(e) => { e.currentTarget.src = FALLBACK_FASHION; }}
              />
              <button
                className="ed-explore-btn"
                style={{ width: 36, height: 36, bottom: 8, right: 8 }}
                title="Explore Tanishq & Titan"
                aria-label="Explore Fine Jewellery & Watches"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div>
              <span className="ed-overlap-badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#854d0e', marginBottom: 8, border: '1px solid rgba(212, 175, 55, 0.35)', fontWeight: 700 }}>
                TANISHQ & TITAN WORLD
              </span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#1c1317', marginBottom: 4, fontWeight: 800 }}>
                Tanishq 22K Gold & Titan Horology
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                Certified gold & diamond bridal suites paired with Titan horological complications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
