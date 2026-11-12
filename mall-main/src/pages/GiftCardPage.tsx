import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  CreditCard,
  Gift,
  Eye,
  Compass,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Share2,
  ArrowRight,
  ShieldCheck,
  Crown
} from 'lucide-react';
import '../components/editorial/editorial.css';

interface GiftCardCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
}

export const GiftCardPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'sovereign' | 'obsidian' | 'imperial'>('sovereign');
  const [cardHolder, setCardHolder] = useState<string>('VICTORIA STERLING');
  const carouselRef = useRef<HTMLDivElement>(null);

  const giftingCurations: GiftCardCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1600&auto=format&fit=crop',
      title: 'The Sovereign 24K Gold & Obsidian Privilege Card',
      category: 'THE MASTER PRIVILEGE · GLOBAL REDEMPTION',
      tag: 'SOVEREIGN'
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop',
      title: 'Embossed Gold Foil & Handcrafted Velvet Presentation Box',
      category: 'BESPOKE GIFT PACKAGING',
      tag: 'PRESENTATION'
    },
    {
      url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1200&auto=format&fit=crop',
      title: 'Fine Diamond Jewellery & Haute Horlogerie Privileges',
      category: 'JEWELLERY ARCADE · LEVEL 1',
      tag: 'HIGH JEWELLERY'
    },
    {
      url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1200&auto=format&fit=crop',
      title: 'Festive Celebration Privilege & Velvet Ribbons',
      category: 'SEASONAL RECEPTION',
      tag: 'CELEBRATION'
    },
    {
      url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop',
      title: 'Michelin Epicurean Dining & Private Champagne Toast',
      category: 'CULINARY REDEMPTION',
      tag: 'GASTRONOMIE'
    },
    {
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop',
      title: 'Gold Celebration Confetti & VIP Member Access',
      category: 'PRIVILEGE PASS · ALL TIERS',
      tag: 'MEMBER PASS'
    },
    {
      url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      title: 'Personal Concierge Hands-Free Shopping Privilege',
      category: 'WHITE GLOVE VALET & SERVICE',
      tag: 'CONCIERGE'
    },
    {
      url: 'https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=1200&auto=format&fit=crop',
      title: 'Gold Jewellery & Imperial Privilege Presentation',
      category: 'EXCLUSIVE COUTURE PRIVILEGE',
      tag: 'IMPERIAL'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % giftingCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + giftingCurations.length) % giftingCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, giftingCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Privilege Gift Card & Sovereign Membership',
        text: 'Give the gift of unlimited luxury, fine dining, and VIP cinema at City Mall.',
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
          1. CINEMATIC 3D SOVEREIGN PRIVILEGE HERO BANNER
          ===================================================================== */}
      <section
        id="gift-card-collection"
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
              <Crown size={14} color="#854d0e" />
              <span>THE SOVEREIGN PRIVILEGE · 2026</span>
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
              The City Mall Sovereign Gift Card
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
              <span>{copiedLink ? 'Copied Link' : 'Share Gifting Card'}</span>
            </button>
          </div>
        </div>

        {/* 3D Interactive Metallic Sovereign Card & Unboxing Suite */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 32,
            alignItems: 'center'
          }}
        >
          {/* Interactive 3D Metallic Card Canvas */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Dynamic Card Face with Sheen & Tilt */}
            <div
              className="ed-metal-gold-card-3d"
              style={{
                background:
                  selectedTier === 'sovereign'
                    ? 'linear-gradient(135deg, #fef08a 0%, #d4af37 35%, #92400e 70%, #fef08a 100%)'
                    : selectedTier === 'obsidian'
                    ? 'linear-gradient(135deg, #27272a 0%, #09090b 45%, #18181b 80%, #3f3f46 100%)'
                    : 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 40%, #475569 75%, #e2e8f0 100%)',
                color: selectedTier === 'obsidian' ? '#fef08a' : '#1c1317',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setLightboxIndex(0)}
            >
              <div className="ed-metal-sheen" />

              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                    CITY MALL
                  </div>
                  <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', opacity: 0.85 }}>
                    METROPOLIS PRIVILEGE
                  </div>
                </div>

                {/* Microchip Simulation */}
                <div
                  style={{
                    width: 48,
                    height: 38,
                    borderRadius: 6,
                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                    border: '1px solid rgba(0,0,0,0.25)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6)',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'absolute', inset: 4, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 2 }} />
                </div>
              </div>

              {/* Card Number / Monogram */}
              <div style={{ zIndex: 2, margin: '20px 0 12px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '0.24em', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  4820 · 9012 · 7741 · 2026
                </div>
              </div>

              {/* Card Footer: Holder Monogram + Tier Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                <div>
                  <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', opacity: 0.75 }}>
                    CARDHOLDER
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {cardHolder || 'ESTEEMED PATRON'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', opacity: 0.75 }}>
                    STATUS TIER
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {selectedTier === 'sovereign' ? '✦ 24K SOVEREIGN' : selectedTier === 'obsidian' ? '✦ OBSIDIAN PRIVÉ' : '✦ IMPERIAL PLATINUM'}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Customization Controls */}
            <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Tier Switcher Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { id: 'sovereign', label: '24K Sovereign', color: '#d4af37' },
                  { id: 'obsidian', label: 'Obsidian Privé', color: '#27272a' },
                  { id: 'imperial', label: 'Platinum', color: '#94a3b8' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: selectedTier === tier.id ? '#ffffff' : 'rgba(212, 175, 55, 0.08)',
                      border: selectedTier === tier.id ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.25)',
                      color: '#1c1317',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Monogram Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(212, 175, 55, 0.35)' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#854d0e', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  CUSTOM MONOGRAM:
                </span>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase().slice(0, 24))}
                  placeholder="ENTER PATRON NAME"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: '#1c1317'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Velvet Presentation Box & Privileges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {giftingCurations.slice(1, 3).map((item, idx) => (
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
          2. ASYMMETRICAL 3D GIFTING MOSAIC GALLERY (OVERLAPPING STACKED SECTION)
          ===================================================================== */}
      <section
        id="gift-card-experiences"
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
              <span>THE SOVEREIGN PRIVILEGE ARCHIVE</span>
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
              Couture Gifts, Diamonds & Penthouse Suites
            </h2>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#78716c', fontFamily: 'var(--font-mono)' }}>
            8 Verified Gifting Assets
          </span>
        </div>

        {/* Sculptural Sovereign Gift Silhouettes with Cathedral Arches, Cameo Ovals & Panoramic Capsules */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 34,
            alignItems: 'center'
          }}
        >
          {giftingCurations.slice(3).map((item, idx) => {
            const giftHeights = [380, 270, 340, 290, 360];
            const giftOffsets = [-15, 26, -10, 30, -18];
            const currentHeight = giftHeights[idx % giftHeights.length];
            const currentOffset = giftOffsets[idx % giftOffsets.length];

            return (
              <ThreeDTiltCard
                key={idx}
                maxTilt={8}
                perspective={1100}
                scale={1.02}
                glare={true}
                glareMaxOpacity={0.18}
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

      <div id="gift-card-enquiry" className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · PRIVILEGE SUITES & REEL · ✦</span>
      </div>

      {/* =====================================================================
          3. HORIZONTAL 3D CONTINUOUS GIFTING CAROUSEL (OVERLAPPING STACKED SECTION)
          ===================================================================== */}
      <section
        id="gift-card-privileges"
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
              Curated Sovereign Privilege Reel
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
          {giftingCurations.map((item, idx) => (
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
                {giftingCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {giftingCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {giftingCurations.length}
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
                  prev !== null ? (prev - 1 + giftingCurations.length) % giftingCurations.length : null
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
              src={giftingCurations[lightboxIndex].url}
              alt={giftingCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % giftingCurations.length : null
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
            {giftingCurations.map((thumb, tIdx) => (
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
