import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  Crown,
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

interface ExperienceCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const ExperiencesPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const experienceCurations: ExperienceCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop',
      title: 'Luxury Wellness Bath & Private Hydrotherapy Suite',
      category: 'WEST VIP ARRIVAL · LEVEL 0',
      tag: 'WELLNESS'
    },
    {
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop',
      title: 'Aesthetic Beauty Pavilion & Master Facial Spa',
      category: 'BEAUTY PAVILION · LEVEL 1',
      tag: 'AESTHETICS'
    },
    {
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
      title: 'Holistic Massage Therapy & Relaxation Suite',
      category: 'SPA SUITES · LEVEL 2',
      tag: 'MASSAGE'
    },
    {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
      title: 'Master Hairstyling & Aesthetic Salon Spa',
      category: 'HAUTE SALON · LEVEL 1',
      tag: 'HAIRSTYLING'
    },
    {
      url: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?q=80&w=1200&auto=format&fit=crop',
      title: 'Haute Coiffure & Bespoke Bridal Henna Atelier',
      category: 'BRIDAL COUTURE SUITE · LEVEL 1',
      tag: 'BRIDAL ATELIER'
    },
    {
      url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop',
      title: 'Personal Styling Director & Cosmetic Atelier',
      category: 'VIP STYLING SALON · LEVEL 1',
      tag: 'COSMETICS'
    },
    {
      url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop',
      title: 'Aromatherapy Sanctuary & Evening Relaxation',
      category: 'SANCTUARY PRIVÉE · LEVEL 2',
      tag: 'AROMATHERAPY'
    },
    {
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
      title: 'Penthouse Zen Lounge & Meditation Sanctuary',
      category: 'PENTHOUSE PRIVÉ · LEVEL 3',
      tag: 'ZEN LOUNGE'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % experienceCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + experienceCurations.length) % experienceCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, experienceCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Bespoke Privé & Concierge Experiences',
        text: 'Explore white-glove valet, penthouse champagne lounges, and bridal couture styling at City Mall.',
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
          1. CINEMATIC 3D PRIVÉ EXPERIENCES HERO BANNER
          ===================================================================== */}
      <section
        id="experiences-concierge"
        style={{
          position: 'relative',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
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
              <Crown size={14} color="#854d0e" />
              <span>THE WHITE-GLOVE PRIVÉ · 2026</span>
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
              VIP Concierge, Salons & Privé Suites
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
              <span>{copiedLink ? 'Copied Link' : 'Share Privé Guide'}</span>
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
                src={experienceCurations[0].url}
                alt={experienceCurations[0].title}
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
                  {experienceCurations[0].tag}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 4, transform: 'translateZ(25px)' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#d4af37', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {experienceCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
                  {experienceCurations[0].title}
                </h2>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Staggered Dual Privé Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {experienceCurations.slice(1, 3).map((item, idx) => (
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

      {/* =====================================================================
          2. ASYMMETRICAL 3D PRIVÉ MOSAIC GALLERY (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="experiences-gallery"
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
              <span>THE EXCLUSIVE SERVICES ARCHIVE</span>
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
              Master Hair Salons, Bridal Henna & VIP Porticos
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
            8 Verified White-Glove Curations
          </span>
        </div>

        {/* Sculptural Wellness Sanctuaries with Cathedral Arches, Cameo Ovals & Diagonal Silhouettes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 34,
            alignItems: 'stretch'
          }}
        >
          {experienceCurations.slice(3).map((item, idx) => {
            const sanctuaryAromas = [
              'HERBAL INFUSION: Bergamot, Sandalwood & Wild Sage',
              'WELLNESS RITUAL: Moroccan Rosewater & 24K Gold Facial',
              'SPA ATELIER: Himalayan Pink Salt & Warm Basalt Stones',
              'HYDRO PRIVÉE: Thermal Mineral Springs & Lavender Steam',
              'ZEN MEDITATION: Tibetan Singing Bowls & Cedarwood'
            ];
            const expHeights = [360, 310, 340, 320, 300];
            const currentHeight = expHeights[idx % expHeights.length];

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
                {/* Clean Natural Rectangular Image Window */}
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

                  {/* Arched Roman Header Badge */}
                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '5px 14px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.12em',
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
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', margin: '2px 0 0' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Travertine Marble Royal Plaque with Asymmetric Corners */}
                <div
                  style={{
                    padding: '16px 20px 18px',
                    background: 'rgba(255, 253, 249, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '18px 6px 18px 6px',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: '0 8px 20px rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Sparkles size={12} color="#d4af37" />
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#854d0e', fontWeight: 700, letterSpacing: '0.06em' }}>
                      {sanctuaryAromas[idx % sanctuaryAromas.length]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px dashed rgba(212, 175, 55, 0.3)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#57534e', fontFamily: 'var(--font-mono)' }}>
                      Private Suite Concierge Reserved
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#854d0e', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span>Explore 4K</span>
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
          3. HORIZONTAL 3D CONTINUOUS PRIVÉ CAROUSEL (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="experiences-vip"
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
              Curated Privé & VIP Suite Reel
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
          {experienceCurations.map((item, idx) => (
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
                {experienceCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {experienceCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {experienceCurations.length}
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
                  prev !== null ? (prev - 1 + experienceCurations.length) % experienceCurations.length : null
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
              src={experienceCurations[lightboxIndex].url}
              alt={experienceCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % experienceCurations.length : null
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
            {experienceCurations.map((thumb, tIdx) => (
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
