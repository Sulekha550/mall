import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  Film,
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

interface EntertainmentCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const EntertainmentPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const entertainmentCurations: EntertainmentCuration[] = [
    {
      url: '/images/entertainment/dolby-atmos-multiplex.jpg',
      title: 'INOX Insignia VIP Multiplex Curved Silver Screen',
      category: '4K LASER IMAX® PROJECTION · LEVEL 2',
      tag: 'IMAX® LASER'
    },
    {
      url: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1200&auto=format&fit=crop',
      title: 'Insignia Motorized Heated Leather Recliner Suites',
      category: 'VIP BUTLER SERVICE & GOURMET MENU',
      tag: 'RECLINERS'
    },
    {
      url: '/images/entertainment/vr-holographic-arena.jpg',
      title: 'Quantum VR Holographic 3D Cyber Arena',
      category: '600M² HOLOGRAPHIC DOME',
      tag: 'HOLOGRAPHIC VR'
    },
    {
      url: '/images/entertainment/vip-cinema-lounge.jpg',
      title: 'Director’s Private Screening Salon & Premiere Lounge',
      category: '28-SEAT PRIVATE BOX · VIP BAR',
      tag: 'DIRECTOR’S BOX'
    },
    {
      url: '/images/entertainment/wonder-forest-atrium.jpg',
      title: 'The Wonder Forest Luminous Kinetic Tree Canopy & Atrium',
      category: 'FAMILY SENSORY PLAY LABYRINTH',
      tag: 'WONDER FOREST'
    },
    {
      url: '/images/entertainment/esports-simulators.jpg',
      title: 'Hyperverse Tactical Cyber Arena & Racing Simulators',
      category: 'IMMERSIVE E-SPORTS PODS',
      tag: 'CYBER ARENA'
    },
    {
      url: '/images/entertainment/neon-arcade-bowling.jpg',
      title: 'Nexus Boutique Neon Bowling & Gaming Lounge',
      category: 'METROPOLIS GAMING ARCADE',
      tag: 'NEXUS ARENA'
    },
    {
      url: '/images/entertainment/vr-holographic-arena.jpg',
      title: 'Holographic Free-Roam Matrix & Cyber Spatial Dome',
      category: '600M² FREE-ROAM HOLOGRAPHIC ARENA',
      tag: 'FREE-ROAM VR'
    },
    {
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
      title: 'Grand Tier Multiplex Auditorium & 128-Channel Dolby Atmos',
      category: '12 MULTIPLEX HALLS · LEVEL 2',
      tag: 'DOLBY ATMOS'
    },
    {
      url: '/images/entertainment/cosmic-dome.jpg',
      title: 'Cosmic Celestial 3D Visual Experience & Laser Dome',
      category: '3D IMMERSIVE DOME',
      tag: 'COSMIC ARENA'
    },
    {
      url: '/images/entertainment/neon-cyber-gallery.jpg',
      title: 'Lumina Neon Cyber Gallery & Interactive Light Tunnel',
      category: 'INTERACTIVE NEON CORRIDOR',
      tag: 'CYBER GALLERY'
    },
    {
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      title: 'Metropolis Celebration Pavilion & Gala Lighting',
      category: 'GRAND ATRIUM STAGE',
      tag: 'CELEBRATION'
    },
    {
      url: '/images/entertainment/esports-simulators.jpg',
      title: 'Quantum Cyber Simulation & Tactical E-Sports Grid',
      category: 'E-SPORTS ZONE',
      tag: 'CYBER GRID'
    },
    {
      url: '/images/entertainment/neon-arcade-bowling.jpg',
      title: 'Neon Velocity Bowling & Arcade Lounge',
      category: 'BOUTIQUE LANES',
      tag: 'VELOCITY'
    },
    {
      url: '/images/entertainment/cosmic-dome.jpg',
      title: '3D Holographic Spatial Oculus Projection',
      category: 'HOLOGRAM VAULT',
      tag: 'OCULUS 3D'
    },
    {
      url: '/images/entertainment/neon-cyber-gallery.jpg',
      title: 'Prismatic Laser Spectrum & Light Corridor',
      category: 'SONIC GALLERY',
      tag: 'PRISMATIC'
    },
    {
      url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop',
      title: 'FutureTech VR Experience Center',
      category: 'INTERACTIVE LAB',
      tag: 'FUTURE TECH'
    },
    {
      url: '/images/entertainment/vip-cinema-lounge.jpg',
      title: 'Sovereign Premiere Lounge & Champagne Bar',
      category: 'VIP CLUB',
      tag: 'PREMIERE'
    },
    {
      url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
      title: 'Grand Panoramic Laser Projection Hall',
      category: 'AUDITORIUM PRIME',
      tag: 'PANORAMIC'
    },
    {
      url: 'https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=1200&auto=format&fit=crop',
      title: 'Dolby Vision Gala Premiere Theatre',
      category: 'THEATRE 1',
      tag: 'DOLBY CINEMA'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % entertainmentCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + entertainmentCurations.length) % entertainmentCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, entertainmentCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Cinematic Grandeur & Holographic Worlds',
        text: 'Experience 4K Laser IMAX®, Insignia VIP recliners, and Quantum VR at City Mall.',
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
          1. CINEMATIC 3D ENTERTAINMENT HERO BANNER
          ===================================================================== */}
      <section
        id="entertainment-cinema"
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
          CINEMA & VR
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
              <Film size={14} color="#854d0e" />
              <span>THE ENTERTAINMENT MONOGRAPH · 2026</span>
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
              Cinematic Grandeur & Holographic Worlds
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              <span className="ed-feature-pill">
                <span className="ed-live-dot" />
                <span>4K LASER IMAX® PROJECTION</span>
              </span>
              <span className="ed-feature-pill">
                <Compass size={12} color="#d4af37" />
                <span>600M² HOLOGRAPHIC VR DOME</span>
              </span>
              <span className="ed-feature-pill">
                <Sparkles size={12} color="#d4af37" />
                <span>VIP BUTLER SERVICE & RECLINERS</span>
              </span>
              <span className="ed-feature-pill">
                <Film size={12} color="#d4af37" />
                <span>128-CHANNEL DOLBY ATMOS</span>
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
              <span>{copiedLink ? 'Copied Link' : 'Share Attractions'}</span>
            </button>
          </div>
        </div>

        {/* Modern Asymmetrical Bento Showcase (Compact Height so e.mp4 Background Video Shines Through) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
            alignItems: 'stretch'
          }}
        >
          {/* Left Primary Bento Feature: INOX Insignia Multiplex */}
          <ThreeDTiltCard
            maxTilt={6}
            perspective={1200}
            scale={1.015}
            glare={true}
            glareMaxOpacity={0.2}
            className="ed-hover-expand"
            onClick={() => setLightboxIndex(0)}
            style={{
              height: 400,
              borderRadius: 20,
              overflow: 'hidden',
              background: '#120b10',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 22px 55px rgba(18, 10, 16, 0.22)',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src={entertainmentCurations[0].url}
                alt={entertainmentCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              {/* Top Telemetry Bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 18,
                  right: 18,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 4
                }}
              >
                <span
                  style={{
                    background: 'rgba(12, 8, 10, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: '#d4af37',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                    padding: '5px 14px',
                    borderRadius: 9999,
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span className="ed-live-dot" />
                  <span>4K LASER IMAX® · DOLBY ATMOS</span>
                </span>

                {/* Soundwave Visualizer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 2.5,
                    height: 18,
                    background: 'rgba(12, 8, 10, 0.72)',
                    padding: '3px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(212, 175, 55, 0.35)'
                  }}
                >
                  {[12, 17, 7, 15, 10, 18, 13, 8, 16].map((h, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        width: 2,
                        height: `${h}px`,
                        background: bIdx % 2 === 0 ? '#d4af37' : '#38bdf8',
                        borderRadius: 1
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Feature Caption */}
              <div style={{ position: 'absolute', bottom: 20, left: 22, right: 22, zIndex: 4, transform: 'translateZ(24px)' }}>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800 }}>
                  {entertainmentCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
                  {entertainmentCurations[0].title}
                </h2>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Right Bento Cluster: 1 Wide Top Card + 2 Side-by-Side Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Top Wide Card: VIP Recliners */}
            <ThreeDTiltCard
              maxTilt={7}
              perspective={1100}
              scale={1.02}
              glare={true}
              glareMaxOpacity={0.2}
              className="ed-hover-expand"
              onClick={() => setLightboxIndex(1)}
              style={{
                height: 192,
                borderRadius: 16,
                overflow: 'hidden',
                background: '#120b10',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 14px 36px rgba(18, 10, 16, 0.16)',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={entertainmentCurations[1].url}
                  alt={entertainmentCurations[1].title}
                  className="royal-zoom-effect"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="three-d-rim-glow" />
                <div className="ed-scrim-bottom" />
                <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 3 }}>
                  <span
                    style={{
                      background: 'rgba(253, 252, 249, 0.94)',
                      color: '#854d0e',
                      padding: '3px 10px',
                      borderRadius: 9999,
                      fontSize: '0.64rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      border: '1px solid rgba(212, 175, 55, 0.35)'
                    }}
                  >
                    {entertainmentCurations[1].tag}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, zIndex: 3 }}>
                  <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                    {entertainmentCurations[1].category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', color: '#ffffff', margin: '2px 0 0', fontWeight: 800 }}>
                    {entertainmentCurations[1].title}
                  </h3>
                </div>
              </div>
            </ThreeDTiltCard>

            {/* Bottom Dual Mini Cards: VR Arena & Premiere Lounge */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {entertainmentCurations.slice(2, 4).map((item, idx) => (
                <ThreeDTiltCard
                  key={idx}
                  maxTilt={8}
                  perspective={1000}
                  scale={1.02}
                  glare={true}
                  glareMaxOpacity={0.2}
                  className="ed-hover-expand"
                  onClick={() => setLightboxIndex(idx + 2)}
                  style={{
                    height: 192,
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#120b10',
                    border: '1px solid rgba(212, 175, 55, 0.38)',
                    boxShadow: '0 14px 34px rgba(18, 10, 16, 0.16)',
                    cursor: 'pointer'
                  }}
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
                    <div style={{ position: 'absolute', top: 10, left: 12, zIndex: 3 }}>
                      <span
                        style={{
                          background: 'rgba(253, 252, 249, 0.94)',
                          color: '#854d0e',
                          padding: '3px 9px',
                          borderRadius: 9999,
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          border: '1px solid rgba(212, 175, 55, 0.35)'
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, zIndex: 3 }}>
                      <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700, display: 'block' }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.94rem', color: '#ffffff', margin: '2px 0 0', fontWeight: 800, lineHeight: 1.25 }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </ThreeDTiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · VISIONARY ATTRACTIONS & MULTIPLEX · ✦</span>
      </div>

      {/* =====================================================================
          2. ASYMMETRICAL 3D ENTERTAINMENT MOSAIC GALLERY (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="entertainment-pillars"
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
              <span>VISIONARY ATTRACTIONS & MULTIPLEX</span>
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
              Curved Laser Silver Screens & Neon Cyber Domes
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
            8 Verified Cinema & VR Visuals
          </span>
        </div>

        {/* Clean Mixed-Scale Rectangular Entertainment Photography Spread with Stagger */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 34,
            alignItems: 'center'
          }}
        >
          {entertainmentCurations.slice(4, 12).map((item, idx) => {
            const entHeights = [380, 260, 330, 280, 360, 250, 310, 290];
            const entOffsets = [-16, 28, -10, 32, -18, 24, 0, 28];
            const currentHeight = entHeights[idx % entHeights.length];
            const currentOffset = entOffsets[idx % entOffsets.length];

            return (
              <ThreeDTiltCard
                key={idx}
                maxTilt={8}
                perspective={1100}
                scale={1.02}
                glare={true}
                glareMaxOpacity={0.2}
                className="ed-hover-expand"
                style={{
                  height: currentHeight,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  boxShadow: '0 16px 40px rgba(28, 19, 23, 0.08)',
                  cursor: 'pointer',
                  transform: `translateY(${currentOffset}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
                onClick={() => setLightboxIndex(idx + 4)}
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

                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3, transform: 'translateZ(20px)' }}>
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

                  <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, zIndex: 3, transform: 'translateZ(20px)' }}>
                    <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', marginTop: 2 }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </ThreeDTiltCard>
            );
          })}
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · CONTINUOUS 3D VR & CINEMA REEL · ✦</span>
      </div>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS ENTERTAINMENT CAROUSEL (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="entertainment-editorial"
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
              Curated Multiplex & VR Reel
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
          {entertainmentCurations.slice(12, 20).map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx + 12)}
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
                {entertainmentCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {entertainmentCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {entertainmentCurations.length}
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
                  prev !== null ? (prev - 1 + entertainmentCurations.length) % entertainmentCurations.length : null
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
              src={entertainmentCurations[lightboxIndex].url}
              alt={entertainmentCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % entertainmentCurations.length : null
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
            {entertainmentCurations.map((thumb, tIdx) => (
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
