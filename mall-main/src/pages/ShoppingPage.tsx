import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { PremiumBrandDirectory } from '../components/editorial/PremiumBrandDirectory';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Share2,
  ArrowRight
} from 'lucide-react';
import '../components/editorial/editorial.css';

interface ShoppingPageProps {
  onOpenDirectory: () => void;
}

interface FashionCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const ShoppingPage: React.FC<ShoppingPageProps> = ({ onOpenDirectory }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const luxuryCurations: FashionCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1600&auto=format&fit=crop',
      title: 'Haute Couture Flagship Salon & Runway Avenue',
      category: 'DESIGNER DISTRICT · LEVEL 1',
      tag: 'FLAGSHIP'
    },
    {
      url: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1200&auto=format&fit=crop',
      title: 'International Ready-to-Wear Fashion Vitrine',
      category: 'ATELIER SUITES · LEVEL 1',
      tag: 'EDITORIAL'
    },
    {
      url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop',
      title: 'Swiss Timepieces & Chronometer Vault',
      category: 'HIGH HOROLOGY ARCADE',
      tag: 'TIMEPIECES'
    },
    {
      url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
      title: 'Bespoke Luxury Boutique & Sartorial Colonnade',
      category: 'LUXURY DISTRICT · LEVEL 0',
      tag: 'BOUTIQUE'
    },
    {
      url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop',
      title: 'Designer Silk & Evening Couture Atelier',
      category: 'COUTURE SALON · LEVEL 1',
      tag: 'COUTURE'
    },
    {
      url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop',
      title: 'Luxury Boulevard Window Vitrines & Displays',
      category: 'SHOPPING BOULEVARD',
      tag: 'DISPLAYS'
    },
    {
      url: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=1200&auto=format&fit=crop',
      title: 'High-Fashion Runway Editorial Campaign',
      category: 'RUNWAY EDITORIAL',
      tag: 'RUNWAY'
    },
    {
      url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
      title: 'Autumn Couture Collection & Milanese Pavilion',
      category: 'MILANESE PAVILION · LEVEL 1',
      tag: 'COLLECTION'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % luxuryCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + luxuryCurations.length) % luxuryCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, luxuryCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Shopping Colonnades & Brands Showcase',
        text: 'Discover 27 international luxury boutiques and haute couture flagships at City Mall.',
        url: window.location.href
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const distance = direction === 'left' ? -420 : 420;
    carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: '#1c1317',
        paddingTop: 80,
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* =====================================================================
          1. PRIMARY BRAND SHOWCASE & 27-HOUSE FLAGSHIP DIRECTORY (PRIORITY #1)
          ===================================================================== */}
      <section id="brands-showcase" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <PremiumBrandDirectory onOpenDirectory={onOpenDirectory} />
      </section>

      {/* =====================================================================
          2. CINEMATIC 3D HAUTE COUTURE EDITORIAL BANNER
          ===================================================================== */}
      <section
        id="shopping-colonnades"
        style={{
          position: 'relative',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        {/* Creative Background Watermark */}
        <div className="ed-creative-watermark" style={{ top: 0, right: 0 }}>
          HAUTE COUTURE
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div className="hp-hero-text-shield" style={{ position: 'relative', zIndex: 1 }}>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                marginBottom: 10
              }}
            >
              <Sparkles size={14} color="#854d0e" />
              <span>THE DESIGNER COLONNADES · 2026</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                color: '#1c1317',
                margin: 0,
                fontWeight: 800,
                lineHeight: 1.12
              }}
            >
              Haute Couture & Sovereign Boutiques
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onOpenDirectory}
              className="prem-cta-btn"
              style={{
                padding: '10px 22px',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <Compass size={15} />
              <span>Interactive Floor Directory</span>
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 18px',
                borderRadius: 9999,
                background: copiedLink ? '#15803d' : 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: copiedLink ? '#ffffff' : '#854d0e',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Editorial Haute Couture Runway & Lookbook Inset Spread — Tall Strip & Couture Arches */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 36,
            alignItems: 'center'
          }}
        >
          {/* Dominant Runway Tall Editorial Canvas (Clean Rectangular) */}
          <div
            className="ed-hover-expand"
            style={{
              cursor: 'pointer',
              height: 390,
              borderRadius: 12,
              background: '#ffffff',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 26px 65px rgba(28, 19, 23, 0.14)',
              overflow: 'hidden'
            }}
            onClick={() => setLightboxIndex(0)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src={luxuryCurations[0].url}
                alt={luxuryCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              {/* Couture Runway Season Stamp */}
              <div className="ed-fashion-season-stamp">
                SS/2026 COUTURE
              </div>

              <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 4 }}>
                <span
                  style={{
                    background: 'rgba(253, 252, 249, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#854d0e',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    padding: '5px 14px',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    fontWeight: 800
                  }}
                >
                  {luxuryCurations[0].tag}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28, zIndex: 4 }}>
                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {luxuryCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}>
                  {luxuryCurations[0].title}
                </h2>
              </div>
            </div>
          </div>

          {/* Staggered Dual Lookbook Monograph Insets (Clean Rectangular with Varied Proportions) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {luxuryCurations.slice(1, 3).map((item, idx) => {
              const insetHeight = idx === 0 ? 185 : 189;
              return (
                <div
                  key={idx}
                  className="ed-hover-expand"
                  style={{
                    height: insetHeight,
                    cursor: 'pointer',
                    borderRadius: 8,
                    background: '#ffffff',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                    overflow: 'hidden'
                  }}
                  onClick={() => setLightboxIndex(idx + 1)}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img
                      src={item.url}
                      alt={item.title}
                      className="royal-zoom-effect"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="three-d-rim-glow" />
                    <div className="ed-scrim-bottom" />
                    <div style={{ position: 'absolute', top: 16, left: 18, zIndex: 3 }}>
                      <span
                        style={{
                          background: 'rgba(253, 252, 249, 0.95)',
                          backdropFilter: 'blur(8px)',
                          color: '#854d0e',
                          padding: '4px 12px',
                          borderRadius: 4,
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          border: '1px solid rgba(212, 175, 55, 0.35)'
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20, zIndex: 3 }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', color: '#ffffff', margin: '2px 0 0', fontWeight: 800 }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS HAUTE COUTURE CAROUSEL
          ===================================================================== */}
      <section
        id="shopping-reel"
        style={{
          position: 'relative',
          background: 'transparent',
          padding: '40px 24px 70px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="hp-floor-copy-cushion" style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#854d0e', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
              CONTINUOUS 3D SLIDER
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#1c1317', margin: '2px 0 0', fontWeight: 800 }}>
              Haute Couture & Fine Jewellery Reel
            </h3>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => scrollCarousel('left')}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#1c1317',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#1c1317',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 16,
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {luxuryCurations.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(28, 19, 23, 0.08)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="royal-zoom-effect"
                />
                <div className="ed-scrim-bottom" />
                <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, zIndex: 2 }}>
                  <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                    {item.tag}
                  </span>
                  <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 700, margin: '2px 0 0' }}>
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. FULLSCREEN 4K LIGHTBOX MODAL
          ===================================================================== */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(12, 8, 10, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px'
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 1400,
              margin: '0 auto',
              zIndex: 10
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                {luxuryCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {luxuryCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {luxuryCurations.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Central Image & Navigation Arrows */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 1400,
              width: '100%',
              margin: '0 auto',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + luxuryCurations.length) % luxuryCurations.length : null
                )
              }
              style={{
                position: 'absolute',
                left: 12,
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              title="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={luxuryCurations[lightboxIndex].url}
              alt={luxuryCurations[lightboxIndex].title}
              style={{
                maxWidth: '90%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            />

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % luxuryCurations.length : null
                )
              }
              style={{
                position: 'absolute',
                right: 12,
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              title="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              maxWidth: 1200,
              margin: '0 auto',
              overflowX: 'auto',
              paddingTop: 12,
              zIndex: 10
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {luxuryCurations.map((thumb, tIdx) => (
              <button
                key={tIdx}
                onClick={() => setLightboxIndex(tIdx)}
                style={{
                  width: 60,
                  height: 48,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border:
                    lightboxIndex === tIdx
                      ? '2px solid #d4af37'
                      : '1px solid rgba(255, 255, 255, 0.25)',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: lightboxIndex === tIdx ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
              >
                <img
                  src={thumb.url}
                  alt={thumb.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global Luxury Footer */}
      <Footer onNavigateToSection={() => { }} isLight={true} />
    </div>
  );
};
