import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  UtensilsCrossed,
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

interface DiningCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const DiningPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const diningCurations: DiningCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1600&auto=format&fit=crop',
      title: 'Grand Culinary Salon & Michelin Tasting Promenade',
      category: 'GOURMET MEZZANINE · LEVEL 2',
      tag: 'MICHELIN'
    },
    {
      url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
      title: 'Bespoke Private Banquet Salon & Chandelier Dining',
      category: 'ROYAL BANQUET SUITE · LEVEL 2',
      tag: 'PRIVATE SUITE'
    },
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      title: 'Champagne Flutes & Grand Sommelier Wine Cellar',
      category: 'CAVE PRIVÉE · RESERVE VINTAGES',
      tag: 'SOMMELIER'
    },
    {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
      title: 'Artisanal Haute Gastronomie & Truffle Banquet',
      category: 'MEDITERRANEAN COLONNADE',
      tag: 'ARTISANAL'
    },
    {
      url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop',
      title: 'French Haute Patisserie & Gold Leaf Confections',
      category: 'PASTRY ATELIER · LEVEL 0',
      tag: 'PATISSERIE'
    },
    {
      url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1200&auto=format&fit=crop',
      title: 'Starlit Skyline Culinary Terrace & Gourmet Plating',
      category: 'ROOFTOP TERRACE · LEVEL 3',
      tag: 'AL FRESCO'
    },
    {
      url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
      title: 'Luxury Cafe & Viennese Confectionery Salon',
      category: 'VIENNESE CAFE · LEVEL 1',
      tag: 'CAFE'
    },
    {
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200&auto=format&fit=crop',
      title: 'Artisanal Brunch & Morning Creperie Atelier',
      category: 'MORNING BISTRO · LEVEL 0',
      tag: 'BRUNCH'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % diningCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + diningCurations.length) % diningCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, diningCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Haute Gastronomie & Fine Dining',
        text: 'Experience Michelin-starred dining, royal tandoori banquets, and rooftop terraces at City Mall.',
        url: window.location.href
      }).catch(() => {});
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
          1. CINEMATIC 3D HAUTE GASTRONOMIE HERO BANNER
          ===================================================================== */}
      <section
        id="dining-intro"
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
          GASTRONOMIE
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
              <span>THE EPICUREAN PROMENADE · 2026</span>
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
              Haute Gastronomie & Sovereign Banquets
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              <span className="ed-feature-pill">
                <span className="ed-live-dot" />
                <span>18 MICHELIN-INSPIRED GASTRONOMES</span>
              </span>
              <span className="ed-feature-pill">
                <Compass size={12} color="#d4af37" />
                <span>7 STARLIT ROOFTOP TERRACES</span>
              </span>
              <span className="ed-feature-pill">
                <Sparkles size={12} color="#d4af37" />
                <span>ARTISANAL CHARCOAL GRILLS</span>
              </span>
              <span className="ed-feature-pill">
                <Layers size={12} color="#d4af37" />
                <span>RESERVE SOMMELIER CELLARS</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
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
              <span>{copiedLink ? 'Copied Link' : 'Share Dining Guide'}</span>
            </button>
          </div>
        </div>

        {/* Haute Gastronomie Editorial Composition — Dominant Rectangular Hero + Staggered Companion Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 32,
            alignItems: 'center'
          }}
        >
          {/* Dominant Hero: Clean Rectangular Tasting Platter Photograph */}
          <ThreeDTiltCard
            maxTilt={6}
            perspective={1200}
            scale={1.01}
            glare={true}
            glareMaxOpacity={0.18}
            className="ed-hover-expand"
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 26px 65px rgba(28, 19, 23, 0.12)',
              minHeight: 480
            }}
            onClick={() => setLightboxIndex(0)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, overflow: 'hidden', cursor: 'pointer' }}>
              <img
                src={diningCurations[0].url}
                alt={diningCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 4, transform: 'translateZ(30px)' }}>
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
                  {diningCurations[0].tag}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28, zIndex: 4, transform: 'translateZ(25px)' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {diningCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
                  {diningCurations[0].title}
                </h2>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Staggered Dual Companion Culinary Panels (Clean Rectangles with Varied Proportions) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {diningCurations.slice(1, 3).map((item, idx) => (
              <ThreeDTiltCard
                key={idx}
                maxTilt={8}
                perspective={1100}
                scale={1.02}
                glare={true}
                glareMaxOpacity={0.2}
                className="ed-hover-expand"
                style={{
                  height: idx === 0 ? 230 : 250,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                  cursor: 'pointer'
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
                  <div style={{ position: 'absolute', top: 16, left: 18, zIndex: 3, transform: 'translateZ(20px)' }}>
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
                  <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20, zIndex: 3, transform: 'translateZ(20px)' }}>
                    <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', margin: '2px 0 0', fontWeight: 800 }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · THE ROYAL EPICUREAN MONOGRAPH · ✦</span>
      </div>

      {/* =====================================================================
          2. CHEF'S DEGUSTATION & CULINARY AMPHITHEATRE (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="dining-pillars"
        style={{
          position: 'relative',
          background: 'transparent',
          padding: '40px 24px 70px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 14 }}>
          <div className="hp-floor-copy-cushion" style={{ position: 'relative', zIndex: 1 }}>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(255, 250, 245, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                marginBottom: 8
              }}
            >
              <UtensilsCrossed size={13} color="#854d0e" />
              <span>THE SOMMELIER & CHEF'S DEGUSTATION JOURNEY</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                color: '#1c1317',
                fontWeight: 800,
                margin: 0
              }}
            >
              The 5-Course Omakase Progression
            </h2>
            <p style={{ margin: '6px 0 0', color: '#44403c', fontSize: '0.92rem', maxWidth: 640, fontWeight: 500 }}>
              An editorial progression of seasonal tasting plates, charcoal-smoked delicacies, and Grand Cru reserve vintages curated by master sommeliers.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '6px 14px 6px 8px',
              borderRadius: 9999,
              background: 'rgba(255, 250, 245, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <div className="ed-wine-seal" title="Grand Cru Reserve Cellar Certified">
              <span>98+ RP</span>
            </div>
            <span style={{ fontSize: '0.82rem', color: '#57534e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              5-Course Tasting Sequence
            </span>
          </div>
        </div>

        {/* 5-Course Progression in Clean Mixed-Scale Rectangular Photography with Stagger */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            alignItems: 'stretch'
          }}
        >
          {diningCurations.slice(3, 8).map((item, idx) => {
            const courseTitles = [
              'COURSE 01 · AMUSE-BOUCHE',
              'COURSE 02 · LE GRAND PLAT',
              'COURSE 03 · AL FRESCO SKYLINE',
              'COURSE 04 · SALON DE THÉ',
              'COURSE 05 · MORNING MATINÉE'
            ];
            const courseNotes = [
              'Shaved Perigord Black Truffles · Aged Balsamic Emulsion',
              '24K Gold Leaf Glazed Mille-Feuille · Bourbon Vanilla Crème',
              'Open-Flame Charcoal Ember Salmon · Citrus Reduction',
              'Single-Origin Viennese Roast · Artisanal Pralines',
              'Wild Honey Crepes · Fresh Wild Berries & Champagne Toast'
            ];
            const sommelierPairings = [
              'Pairing: Dom Pérignon Vintage 2013',
              'Pairing: Château d’Yquem Sauternes 2016',
              'Pairing: Meursault Premier Cru 2020',
              'Pairing: Rare Earl Grey Imperial Reserve',
              'Pairing: Bellini di Venezia & Rosé Spumante'
            ];
            const dishHeights = [340, 260, 310, 270, 320];
            const dishOffsets = [-12, 26, -8, 22, -10];
            const currentDishHeight = dishHeights[idx % dishHeights.length];
            const currentDishOffset = dishOffsets[idx % dishOffsets.length];

            return (
              <div
                key={idx}
                className="ed-hover-expand"
                onClick={() => setLightboxIndex(idx + 3)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transform: `translateY(${currentDishOffset}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
              >
                {/* Clean Natural Rectangular Dish Photography */}
                <div
                  style={{
                    position: 'relative',
                    height: currentDishHeight,
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid rgba(212, 175, 55, 0.38)',
                    boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                    background: '#ffffff'
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="royal-zoom-effect"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div className="three-d-light-beam" />
                  <div className="three-d-rim-glow" />
                  <div className="ed-scrim-bottom" />

                  {/* Top Bar with Course Badge & Sommelier Seal */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      right: 16,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 3
                    }}
                  >
                    <span className="ed-course-step-tag">
                      <Sparkles size={11} color="#854d0e" />
                      <span>{courseTitles[idx]}</span>
                    </span>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.95)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '3px 10px',
                        borderRadius: 4,
                        fontSize: '0.64rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20, zIndex: 3 }}>
                    <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700, letterSpacing: '0.12em' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', margin: '2px 0 0' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Degustation Sensory Notes Plaque */}
                <div
                  style={{
                    padding: '16px 20px 18px',
                    background: 'rgba(255, 253, 249, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: 8,
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 6px 16px rgba(212, 175, 55, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <UtensilsCrossed size={12} color="#d4af37" />
                    <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#854d0e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {courseNotes[idx]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px dashed rgba(212, 175, 55, 0.3)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#57534e', fontFamily: 'var(--font-mono)' }}>
                      🍷 {sommelierPairings[idx]}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#854d0e', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span>View 4K</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS CULINARY CAROUSEL (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="dining-lounge"
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
              Curated Epicurean Reel
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
          {diningCurations.slice(3).map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx + 3)}
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
                {diningCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {diningCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {diningCurations.length}
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
                  prev !== null ? (prev - 1 + diningCurations.length) % diningCurations.length : null
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
              src={diningCurations[lightboxIndex].url}
              alt={diningCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % diningCurations.length : null
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
            {diningCurations.map((thumb, tIdx) => (
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
      <Footer onNavigateToSection={() => {}} isLight={true} />
    </div>
  );
};
