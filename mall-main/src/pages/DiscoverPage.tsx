import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import {
  Sparkles,
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
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import '../components/editorial/editorial.css';

interface GalleryPhoto {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const DiscoverPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const architecturalCurations: GalleryPhoto[] = [
    {
      url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=1600&auto=format&fit=crop',
      title: 'The Grand Oculus & Modern Galleria Atrium',
      category: 'CENTRAL ATRIUM · 38.5M CLEAR SPAN',
      tag: 'MASTERWORK'
    },
    {
      url: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=1200&auto=format&fit=crop',
      title: 'Curved Glass Dome & Natural Solar Skylight',
      category: 'PROMENADE · LEVELS 0-3',
      tag: 'ARCHITECTURAL'
    },
    {
      url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
      title: 'Lumina Helios Kinetic Chandelier & Evening Light Sculpture',
      category: 'CENTRAL ROTUNDA · 420 KINETIC RINGS',
      tag: 'LIGHT ART'
    },
    {
      url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
      title: 'Modern Grand Lobby & Architectural Promenade',
      category: 'WEST PALM COURT · LEVEL 0',
      tag: 'GRAND LOBBY'
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      title: 'Futuristic Glass Facade & Sky Pavilion',
      category: 'NORTH GALLERIA · GLASS TOWER',
      tag: 'SKY PAVILION'
    },
    {
      url: 'https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=1200&auto=format&fit=crop',
      title: 'Tiered Balustrades & Marble Colonnade',
      category: 'EAST MEZZANINE COURT',
      tag: 'BALUSTRADES'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      title: 'Panoramic Glass Elevators & Upper Sky Walkway',
      category: 'LEVEL 3 MEZZANINE',
      tag: 'PERSPECTIVE'
    },
    {
      url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop',
      title: 'Grand Illuminated Atrium & Light Court',
      category: 'SOUTH ROTUNDA · 3D CANOPY',
      tag: 'ILLUMINATION'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % architecturalCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + architecturalCurations.length) % architecturalCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, architecturalCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Architecture & Discovery Monograph',
        text: 'Explore the futuristic 3D architectural masterworks of City Mall.',
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
          1. CINEMATIC 3D ARCHITECTURAL HERO BANNER
          ===================================================================== */}
      <section
        id="discover-oculus"
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
          ARCHITECTURE
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
              <span>ARCHITECTURAL MONOGRAPH · 2026</span>
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
              The Architecture of Light & Grandeur
            </h1>
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
              <span>{copiedLink ? 'Copied Link' : 'Share Monograph'}</span>
            </button>
          </div>
        </div>

        {/* Original Architectural Composition: Oculus Circular Portal & Diagrid Elevation Stack */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 36,
            alignItems: 'center'
          }}
        >
          {/* Left: Dominant Oversized Architectural Photograph (Clean Rectangular) */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div
              className="ed-hover-expand"
              onClick={() => setLightboxIndex(0)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                height: 490,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 24px 60px rgba(28, 19, 23, 0.12)'
              }}
            >
              <img
                src={architecturalCurations[0].url}
                alt={architecturalCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              {/* Spatial Coordinates Compass Ring */}
              <div style={{ position: 'absolute', top: 22, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', zIndex: 4 }}>
                <span className="ed-feature-pill" style={{ background: 'rgba(28, 19, 23, 0.8)', color: '#fef08a', borderColor: '#d4af37', borderRadius: 4 }}>
                  <Compass size={12} color="#d4af37" />
                  <span>OCULUS AXIS · 38.5M SPAN</span>
                </span>
                <span className="ed-feature-pill" style={{ background: 'rgba(28, 19, 23, 0.8)', color: '#ffffff', borderRadius: 4 }}>
                  <span>ELEV 0-4</span>
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 26, left: 26, right: 26, zIndex: 4 }}>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800 }}>
                  {architecturalCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
                  {architecturalCurations[0].title}
                </h2>
              </div>
            </div>
          </div>

          {/* Right: Structural Diagrid Elevation Stack with Technical Monograph Placards */}
          <div
            className="ed-diagrid-blueprint"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              padding: '24px',
              borderRadius: 26,
              border: '1px solid rgba(212, 175, 55, 0.35)',
              background: 'rgba(255, 255, 255, 0.88)',
              boxShadow: '0 16px 45px rgba(212, 175, 55, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(212, 175, 55, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={14} color="#854d0e" />
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#854d0e', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  STRUCTURAL ELEVATION CANOPY
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#a8a29e' }}>
                LEVELS 0 · 1 · 2
              </span>
            </div>

            {architecturalCurations.slice(1, 3).map((item, idx) => (
              <div
                key={idx}
                className="ed-cantilever-card"
                style={{ cursor: 'pointer', minHeight: 200 }}
                onClick={() => setLightboxIndex(idx + 1)}
              >
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="royal-zoom-effect"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="three-d-rim-glow" />
                  <div className="ed-scrim-bottom" />
                  <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 3 }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        border: '1px solid rgba(212, 175, 55, 0.35)'
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, zIndex: 3 }}>
                    <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', margin: '2px 0 0', fontWeight: 800 }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · THE ARCHITECTURAL MONOGRAPH · ✦</span>
      </div>

      {/* =====================================================================
          2. ASYMMETRICAL 3D ARCHITECTURAL MOSAIC GALLERY (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="discover-pillars"
        style={{
          position: 'relative',
          background: 'transparent',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
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
              <Eye size={13} color="#854d0e" />
              <span>MASTER ARCHITECTURAL COLLECTION</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
                color: '#1c1317',
                fontWeight: 800,
                margin: 0
              }}
            >
              Spatial Perspectives & Biophilic Atriums
            </h2>
          </div>
          <span
            style={{
              fontSize: '0.82rem',
              color: '#57534e',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 9999,
              background: 'rgba(255, 250, 245, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            8 Curated High-Resolution Visuals
          </span>
        </div>

        {/* Architectural Monograph Exhibition — Mixed-Scale Rectangular Photography with Intentional Stagger */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 34,
            alignItems: 'center'
          }}
        >
          {architecturalCurations.slice(3).map((item, idx) => {
            const archHeights = [440, 280, 370, 300, 410];
            const archOffsets = [-15, 28, -8, 32, -18];
            const currentArchHeight = archHeights[idx % archHeights.length];
            const currentArchOffset = archOffsets[idx % archOffsets.length];

            return (
              <div
                key={idx}
                className="ed-hover-expand"
                style={{
                  height: currentArchHeight,
                  cursor: 'pointer',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  background: '#ffffff',
                  boxShadow: '0 16px 42px rgba(28, 19, 23, 0.09)',
                  transform: `translateY(${currentArchOffset}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
                onClick={() => setLightboxIndex(idx + 3)}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
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

                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.95)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '4px 12px',
                        borderRadius: 4,
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                        fontWeight: 800
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, zIndex: 3 }}>
                    <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', marginTop: 2 }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · CONTINUOUS 3D SLIDER REEL · ✦</span>
      </div>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS ARCHITECTURAL CAROUSEL (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="discover-kinetic"
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
              Curated Architectural Reel
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
          {architecturalCurations.map((item, idx) => (
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
                {architecturalCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {architecturalCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {architecturalCurations.length}
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
                  prev !== null ? (prev - 1 + architecturalCurations.length) % architecturalCurations.length : null
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
              src={architecturalCurations[lightboxIndex].url}
              alt={architecturalCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % architecturalCurations.length : null
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
            {architecturalCurations.map((thumb, tIdx) => (
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
