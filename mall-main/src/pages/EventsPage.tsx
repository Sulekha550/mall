import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  Calendar,
  Eye,
  Compass,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Share2,
  ArrowRight
} from 'lucide-react';
import '../components/editorial/editorial.css';

interface EventCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const EventsPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const eventCurations: EventCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
      title: 'International Fashion Week & Autumn Couture Gala',
      category: 'GRAND ATRIUM RUNWAY · LIVE 2026',
      tag: 'FASHION WEEK'
    },
    {
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
      title: 'Grand Rotunda Symphony & Starlit Chandelier Soirée',
      category: 'CENTRAL ATRIUM · EVENING GALA',
      tag: 'SYMPHONY'
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      title: 'Lumina Sculptura: Kinetic Interactive Light Festival',
      category: 'ATRIUM PAVILION · DIGITAL ART',
      tag: 'KINETIC ART'
    },
    {
      url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
      title: 'Metropolis Music Festival & Laser Dome Experience',
      category: 'CENTRAL DOME · MUSIC GALA',
      tag: 'MUSIC FESTIVAL'
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
      title: 'Haute Horlogerie & Luxury Brand Vernissage',
      category: 'JEWELLERY ROTUNDA',
      tag: 'VERNISSAGE'
    },
    {
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop',
      title: 'Symphony Philharmonic Concert in Grand Atrium',
      category: 'ACOUSTIC HALL · LEVEL 0',
      tag: 'PHILHARMONIC'
    },
    {
      url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
      title: 'Classical Chamber Gala & Velvet Premiere',
      category: 'CONCERT ROTUNDA · LEVEL 1',
      tag: 'CHAMBER GALA'
    },
    {
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
      title: 'Red Carpet International Cinema Premiere at INOX',
      category: 'INOX MULTIPLEX · LEVEL 2',
      tag: 'PREMIERE'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % eventCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + eventCurations.length) % eventCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, eventCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Events, Runway Shows & Galas',
        text: 'Join international fashion weeks, kinetic art festivals, and grand gala soirees at City Mall.',
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
        backgroundColor: 'rgba(250, 247, 242, 0.14)',
        color: '#1c1317',
        paddingTop: 80,
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Luminous Modern Colorful Luxury Ambient Lighting */}
      <div className="ed-ambient-orb-peach" style={{ top: 0, left: '10%' }} />
      <div className="ed-ambient-orb-lavender" style={{ top: '35%', right: '5%' }} />
      <div className="ed-ambient-orb-coral" style={{ top: '70%', left: '12%' }} />

      {/* =====================================================================
          1. CINEMATIC 3D INTERNATIONAL EVENTS HERO BANNER
          ===================================================================== */}
      <section
        id="events-intro"
        style={{
          position: 'relative',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                marginBottom: 10
              }}
            >
              <Calendar size={14} color="#854d0e" />
              <span>THE CULTURAL CALENDAR · 2026</span>
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
              Runway Galas, Art Vernissages & Premieres
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
              <span>{copiedLink ? 'Copied Link' : 'Share Cultural Calendar'}</span>
            </button>
          </div>
        </div>

        {/* 3D Asymmetrical Lead Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 28,
            alignItems: 'stretch'
          }}
        >
          {/* Dominant Hero Card with 3D Tilt */}
          <ThreeDTiltCard
            maxTilt={9}
            perspective={1200}
            scale={1.02}
            glare={true}
            glareMaxOpacity={0.28}
            style={{
              borderRadius: 26,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 24px 60px rgba(28, 19, 23, 0.12)',
              minHeight: 460
            }}
            onClick={() => setLightboxIndex(0)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 460, overflow: 'hidden', cursor: 'pointer' }}>
              <img
                src={eventCurations[0].url}
                alt={eventCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 4, transform: 'translateZ(30px)' }}>
                <span
                  style={{
                    background: 'rgba(253, 252, 249, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#854d0e',
                    border: '1px solid rgba(212, 175, 55, 0.45)',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    fontWeight: 800
                  }}
                >
                  {eventCurations[0].tag}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 4, transform: 'translateZ(25px)' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {eventCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
                  {eventCurations[0].title}
                </h2>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Staggered Dual Event Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {eventCurations.slice(1, 3).map((item, idx) => (
              <ThreeDTiltCard
                key={idx}
                maxTilt={10}
                perspective={1100}
                scale={1.02}
                glare={true}
                glareMaxOpacity={0.24}
                style={{
                  flex: 1,
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.38)',
                  boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxIndex(idx + 1)}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220, overflow: 'hidden' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="royal-zoom-effect"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="three-d-rim-glow" />
                  <div className="ed-scrim-bottom" />
                  <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, transform: 'translateZ(20px)' }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.92)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        border: '1px solid rgba(212, 175, 55, 0.35)'
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18, zIndex: 3, transform: 'translateZ(20px)' }}>
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
        <span className="ed-crest-symbol">✦ · THE CULTURAL & RUNWAY MONOGRAPH · ✦</span>
      </div>

      {/* =====================================================================
          2. ASYMMETRICAL 3D BIENNALE EXHIBITION GALLERY (OVERLAPPING STACKED SECTION)
          ===================================================================== */}
      <section
        id="events-calendar"
        className="ed-stacked-section ed-stacked-section-lavender"
        style={{
          padding: '50px 24px 60px',
          maxWidth: 1440,
          margin: '-36px auto 0'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                marginBottom: 8
              }}
            >
              <Eye size={13} color="#854d0e" />
              <span>THE GALA ARCHIVE</span>
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
              Runway Presentations, Concertos & Grand Soirées
            </h2>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#78716c', fontFamily: 'var(--font-mono)' }}>
            8 Verified Cultural Assets
          </span>
        </div>

        {/* Biennale Gala Galleries with Sculptural Stages & Cameo Silhouettes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 34,
            alignItems: 'stretch'
          }}
        >
          {eventCurations.slice(3).map((item, idx) => {
            const exhibitionPlacards = [
              { hall: 'Central Rotunda · Dome Amphitheatre', medium: '120-Piece Philharmonic & Starlit Projection', lighting: '3200K Tungsten Warm' },
              { hall: 'Haute Horlogerie Arcade · Level 1', medium: 'Precision Timepiece Vernissage & Gold Displays', lighting: '4000K Neutral Pure' },
              { hall: 'Concert Pavilion · Mezzanine', medium: 'Chamber String Quartet & Red Carpet Première', lighting: '2700K Candlelight Ambience' },
              { hall: 'INOX Insignia Grand Tier · Level 2', medium: 'Red Carpet International Cinema Première', lighting: 'Cinema Xenon Laser' },
              { hall: 'Grand Atrium Runway · Level 0', medium: 'Haute Couture Runway & Autumn Gala Collection', lighting: '5600K Daylight Flood' }
            ];
            const meta = exhibitionPlacards[idx % exhibitionPlacards.length];
            const eventHeights = [280, 340, 310, 360, 330];
            const currentHeight = eventHeights[idx % eventHeights.length];

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
                  transform: idx % 2 === 1 ? 'translateY(22px)' : 'translateY(-10px)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
              >
                {/* Clean Natural Rectangular Gala Window */}
                <div
                  style={{
                    position: 'relative',
                    height: currentHeight,
                    borderRadius: 8,
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                    background: '#ffffff',
                    overflow: 'hidden'
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

                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                        fontWeight: 800
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18, zIndex: 3 }}>
                    <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700, letterSpacing: '0.12em' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', margin: '2px 0 0' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Museum Exhibition Placard with Asymmetric Contours */}
                <div
                  style={{
                    padding: '16px 20px 18px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
                    borderRadius: '18px 6px 18px 6px',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 8px 20px rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#854d0e', fontWeight: 700 }}>
                      HALL: {meta.hall}
                    </span>
                    <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#78716c' }}>
                      {meta.lighting}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px dashed rgba(212, 175, 55, 0.25)' }}>
                    <span style={{ fontSize: '0.7rem', color: '#57534e', fontFamily: 'var(--font-mono)' }}>
                      {meta.medium}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#854d0e', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span>Placard</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div id="events-gala" className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · CONTINUOUS RUNWAY & EVENT REEL · ✦</span>
      </div>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS EVENTS CAROUSEL (OVERLAPPING STACKED SECTION)
          ===================================================================== */}
      <section
        id="events-showcase"
        className="ed-stacked-section ed-stacked-section-peach"
        style={{
          padding: '40px 24px 70px',
          maxWidth: 1440,
          margin: '-30px auto 0'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#854d0e', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
              CONTINUOUS 3D SLIDER
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#1c1317', margin: '2px 0 0', fontWeight: 800 }}>
              Curated Events & Galas Reel
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
          {eventCurations.map((item, idx) => (
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
                {eventCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {eventCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {eventCurations.length}
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
                  prev !== null ? (prev - 1 + eventCurations.length) % eventCurations.length : null
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
              src={eventCurations[lightboxIndex].url}
              alt={eventCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % eventCurations.length : null
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
            {eventCurations.map((thumb, tIdx) => (
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
