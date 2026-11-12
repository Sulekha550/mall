import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Compass,
  X,
  Maximize2,
  Share2,
  Check,
  Layers,
  Eye,
  ArrowRight
} from 'lucide-react';
import { ALL_MALL_BRANDS, MallBrand } from '../data/mallBrandsData';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import { Footer } from '../components/Footer';

interface BrandShowcasePageProps {
  onOpenDirectory?: () => void;
}

export const BrandShowcasePage: React.FC<BrandShowcasePageProps> = ({ onOpenDirectory }) => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();

  // Find target brand by ID, slug, or name match (resilient matching)
  const normalizedTarget = (brandId || '').toLowerCase().replace(/^brand-/, '');
  const currentBrandIndex = ALL_MALL_BRANDS.findIndex((b: MallBrand) => {
    const bId = b.id.toLowerCase().replace(/^brand-/, '');
    const bName = b.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTarget = normalizedTarget.replace(/[^a-z0-9]/g, '');
    return (
      bId === normalizedTarget ||
      bId.replace(/-/g, '') === cleanTarget ||
      bName.includes(cleanTarget) ||
      cleanTarget.includes(bId.replace(/-/g, ''))
    );
  });

  const brand: MallBrand =
    currentBrandIndex !== -1 ? ALL_MALL_BRANDS[currentBrandIndex] : ALL_MALL_BRANDS[0];

  // Previous and next brand in directory
  const prevBrand =
    ALL_MALL_BRANDS[(currentBrandIndex - 1 + ALL_MALL_BRANDS.length) % ALL_MALL_BRANDS.length];
  const nextBrand = ALL_MALL_BRANDS[(currentBrandIndex + 1) % ALL_MALL_BRANDS.length];

  // Related brands within the same department or specialized category
  const relatedBrands = ALL_MALL_BRANDS.filter(
    (b: MallBrand) =>
      b.id !== brand.id &&
      (b.department === brand.department ||
       b.categorySlug === brand.categorySlug ||
       b.category === brand.category)
  ).slice(0, 4);

  // Gallery items derived from 8 unique verified photos
  const gallery = brand.images.map((img: string, i: number) => {
    const tags = ['FLAGSHIP SUITE', 'COLLECTION', 'SIGNATURE LINE', 'INTERIOR', 'EDITORIAL', 'DETAIL', 'HERITAGE', 'LIMITED EDITION'];
    return {
      url: img,
      alt: `${brand.name} - ${brand.altText} (${i + 1})`,
      tag: tags[i % tags.length],
      caption: `${brand.name} · Curated Archival Monograph ${i + 1}`
    };
  });

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll to top on brand change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [brand.id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % gallery.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${brand.name} | City Mall Luxury Showcase`,
        text: brand.storyHighlight,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
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
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: '#1c1317',
        overflowX: 'hidden'
      }}
    >
      {/* =====================================================================
          1. TOP ROYAL NAVIGATION & BREADCRUMB
          ===================================================================== */}
      <header
        style={{
          position: 'sticky',
          top: 72,
          zIndex: 30,
          backgroundColor: 'rgba(250, 247, 242, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          padding: '12px 24px',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap'
          }}
        >
          {/* Back Button & Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => navigate('/shopping')}
              className="prem-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                borderRadius: 9999,
                fontWeight: 700
              }}
              title="Return to shopping brand directory"
            >
              <ArrowLeft size={14} />
              <span>Back to All Brands</span>
            </button>

            {/* Breadcrumb trail */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.78rem',
                color: '#78716c',
                fontFamily: 'var(--font-mono)'
              }}
              className="hidden md:flex"
            >
              <Link to="/" style={{ color: '#78716c', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to="/shopping" style={{ color: '#78716c', textDecoration: 'none' }}>Shopping</Link>
              <span>/</span>
              <span style={{ color: '#854d0e', fontWeight: 700 }}>{brand.name}</span>
            </div>
          </div>

          {/* Cycler: Previous Brand / Next Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => navigate(`/shopping/brand/${prevBrand.id}`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                fontSize: '0.76rem',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#57534e',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s'
              }}
              title={`Previous brand: ${prevBrand.name}`}
            >
              <ChevronLeft size={13} />
              <span className="hidden sm:inline">{prevBrand.name}</span>
            </button>

            <span style={{ fontSize: '0.74rem', color: '#a8a29e', fontFamily: 'var(--font-mono)' }}>
              {currentBrandIndex + 1} / {ALL_MALL_BRANDS.length}
            </span>

            <button
              onClick={() => navigate(`/shopping/brand/${nextBrand.id}`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                fontSize: '0.76rem',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#57534e',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s'
              }}
              title={`Next brand: ${nextBrand.name}`}
            >
              <span className="hidden sm:inline">{nextBrand.name}</span>
              <ChevronRight size={13} />
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: '0.76rem',
                borderRadius: 9999,
                background: copiedLink ? '#15803d' : 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: copiedLink ? '#ffffff' : '#854d0e',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s',
                fontWeight: 700
              }}
              title="Share brand showcase"
            >
              {copiedLink ? <Check size={13} /> : <Share2 size={13} />}
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Creative Brand Fast-Switcher Ribbon */}
        <div style={{ maxWidth: 1440, margin: '10px auto 0', padding: '0 4px' }}>
          <div className="ed-brand-ribbon-container">
            {ALL_MALL_BRANDS.map((b) => {
              const isActive = b.id === brand.id;
              return (
                <button
                  key={b.id}
                  onClick={() => navigate(`/shopping/brand/${b.id}`)}
                  className={`ed-brand-chip ${isActive ? 'active' : ''}`}
                  style={{ cursor: 'pointer', border: 'none', background: isActive ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.22), #ffffff)' : undefined }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: isActive ? '#d4af37' : 'rgba(212, 175, 55, 0.45)',
                      display: 'inline-block'
                    }}
                  />
                  <span>{b.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. CINEMATIC 3D HERO STAGE
          ===================================================================== */}
      <section
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
          {brand.name.toUpperCase()}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 36,
            alignItems: 'center'
          }}
        >
          {/* Left: Asymmetric Editorial Composition — Large Dominant Photo + Offset Supporting Rectangular Photos */}
          <div style={{ position: 'relative', padding: '16px 20px 24px 0' }}>
            {/* Primary Dominant Clean Rectangular Photograph */}
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
                boxShadow: '0 26px 65px rgba(28, 19, 23, 0.14)',
                position: 'relative',
                zIndex: 2
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 520,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setLightboxIndex(0)}
              >
                <img
                  src={brand.images[0]}
                  alt={brand.name}
                  className="royal-zoom-effect"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    display: 'block'
                  }}
                />
                <div className="three-d-light-beam" />
                <div className="three-d-rim-glow" />
                <div className="ed-scrim-bottom" />

                {/* Floating Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 22,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    zIndex: 4,
                    transform: 'translateZ(30px)'
                  }}
                >
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
                      textTransform: 'uppercase',
                      fontWeight: 800
                    }}
                  >
                    {brand.category}
                  </span>

                  <span
                    style={{
                      background: 'rgba(22, 101, 52, 0.92)',
                      color: '#ffffff',
                      padding: '5px 12px',
                      borderRadius: 4,
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#4ade80'
                      }}
                    />
                    OPEN TODAY
                  </span>
                </div>

                {/* Bottom Overlay Title & Subtext */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 26,
                    left: 26,
                    right: 26,
                    zIndex: 4,
                    transform: 'translateZ(25px)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#d4af37',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}
                  >
                    BOUTIQUE SHOWCASE · {brand.floor} · {brand.unit}
                  </span>
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                      color: '#ffffff',
                      margin: '4px 0 6px',
                      fontWeight: 800,
                      textShadow: '0 3px 15px rgba(0,0,0,0.85)',
                      lineHeight: 1.1
                    }}
                  >
                    {brand.name}
                  </h1>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#f5f5f4',
                      margin: 0,
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                    }}
                  >
                    {brand.storyHighlight}
                  </p>
                </div>

                {/* Click to Expand Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    right: 22,
                    zIndex: 4,
                    transform: 'translateZ(30px)'
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(28, 19, 23, 0.8)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      padding: '5px 12px',
                      borderRadius: 4,
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Maximize2 size={12} color="#d4af37" />
                    <span>8 Curated Photos</span>
                  </span>
                </div>
              </div>
            </ThreeDTiltCard>

            {/* Overlapping Medium Supporting Photograph 1 (Top-Right Rectangular Inset) */}
            {brand.images.length > 1 && (
              <div
                className="ed-hover-expand"
                style={{
                  position: 'absolute',
                  top: -18,
                  right: -14,
                  width: 170,
                  height: 125,
                  zIndex: 5,
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: '3px solid #ffffff',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.22)',
                  overflow: 'hidden'
                }}
                onClick={() => setLightboxIndex(1)}
                title="Click to view full detail"
              >
                <img
                  src={brand.images[1]}
                  alt={`${brand.name} craft detail`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    left: 8,
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(28, 19, 23, 0.85)',
                      color: '#d4af37',
                      fontSize: '0.58rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 3,
                      letterSpacing: '0.08em'
                    }}
                  >
                    DETAIL · 02
                  </span>
                </div>
              </div>
            )}

            {/* Overlapping Medium Supporting Photograph 2 (Bottom-Right Rectangular Inset) */}
            {brand.images.length > 2 && (
              <div
                className="ed-hover-expand"
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: 22,
                  width: 145,
                  height: 165,
                  zIndex: 5,
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: '3px solid #ffffff',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.22)',
                  overflow: 'hidden'
                }}
                onClick={() => setLightboxIndex(2)}
                title="Click to view full detail"
              >
                <img
                  src={brand.images[2]}
                  alt={`${brand.name} collection`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    left: 8,
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(28, 19, 23, 0.85)',
                      color: '#d4af37',
                      fontSize: '0.58rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 3,
                      letterSpacing: '0.08em'
                    }}
                  >
                    LOOKBOOK · 03
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Brand Meta Details, Highlights & 3D Spatial Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div
                className="ed-section-badge"
                style={{
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  color: '#854d0e',
                  marginBottom: 12
                }}
              >
                <Sparkles size={13} color="#854d0e" />
                <span>OFFICIAL STORE SHOWCASE</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                  color: '#1c1317',
                  margin: '0 0 10px',
                  fontWeight: 800,
                  lineHeight: 1.2
                }}
              >
                {brand.name}
              </h2>
              <p
                style={{
                  fontSize: '0.96rem',
                  color: '#57534e',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {brand.altText}
              </p>
            </div>

            {/* Bespoke Royal Stationery Meta Plaques with Asymmetric Contours */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 14
              }}
            >
              <div
                style={{
                  padding: '16px 18px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
                  borderRadius: '24px 8px 24px 8px',
                  border: '1px solid rgba(212, 175, 55, 0.42)',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#854d0e', marginBottom: 4 }}>
                  <MapPin size={14} />
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                    LOCATION
                  </span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1c1317' }}>
                  {brand.floor}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#78716c' }}>
                  {brand.unit}
                </div>
              </div>

              <div
                style={{
                  padding: '16px 18px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
                  borderRadius: '8px 24px 8px 24px',
                  border: '1px solid rgba(212, 175, 55, 0.42)',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#854d0e', marginBottom: 4 }}>
                  <Clock size={14} />
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                    STORE HOURS
                  </span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1c1317' }}>
                  {brand.timing}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#15803d', fontWeight: 700 }}>
                  Open All 7 Days
                </div>
              </div>

              <div
                style={{
                  padding: '16px 18px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
                  borderRadius: '24px 8px 24px 8px',
                  border: '1px solid rgba(212, 175, 55, 0.42)',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#854d0e', marginBottom: 4 }}>
                  <Phone size={14} />
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                    CONCIERGE DESK
                  </span>
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1c1317' }}>
                  +91 (0522) 8900-MALL
                </div>
                <div style={{ fontSize: '0.76rem', color: '#78716c' }}>
                  Direct Dial & Inquiries
                </div>
              </div>
            </div>

            {/* Signature Features List */}
            {brand.features && brand.features.length > 0 && (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: '20px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#854d0e',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    marginBottom: 10
                  }}
                >
                  SIGNATURE BOUTIQUE EXPERIENCES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {brand.features.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.28)',
                        color: '#44403c',
                        padding: '6px 14px',
                        borderRadius: 9999,
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action Row */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (onOpenDirectory) onOpenDirectory();
                }}
                className="prem-cta-btn"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.86rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontWeight: 800
                }}
              >
                <Compass size={16} />
                <span>Locate on Mall Map</span>
              </button>

              <button
                onClick={() => {
                  const galleryEl = document.getElementById('brand-visual-gallery');
                  if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '12px 22px',
                  fontSize: '0.86rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: 9999,
                  color: '#1c1317',
                  fontWeight: 700,
                  transition: 'all 0.2s'
                }}
              >
                <Layers size={16} color="#854d0e" />
                <span>Explore Full 8-Photo Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="ed-luxury-crest-divider">
        <span className="ed-crest-symbol">✦ · ARCHITECTURAL SPOTLIGHT · ✦</span>
      </div>

      {/* =====================================================================
          3. CATEGORY-TAILORED 3D SPOTLIGHT STRIP (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        style={{
          position: 'relative',
          background: 'transparent',
          padding: '28px 24px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div
          style={{
            background: 'rgba(255, 253, 249, 0.84)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 12px 35px rgba(212, 175, 55, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 18
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#b45309',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              CATEGORY SPOTLIGHT · {brand.category.toUpperCase()}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: '#1c1317',
                margin: '4px 0 0',
                fontWeight: 800
              }}
            >
              Curated 3D Visual Collection for {brand.name}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#78716c'
              }}
            >
              8 Verified High-Res Assets · 0 Duplicates
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#15803d'
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. 8-IMAGE 3D PERSPECTIVE VISUAL GALLERY (TRANSPARENT OVER VIDEO)
          ===================================================================== */}
      <section
        id="brand-visual-gallery"
        style={{
          position: 'relative',
          background: 'transparent',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          zIndex: 1
        }}
      >
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div className="hp-floor-copy-cushion" style={{ position: 'relative', zIndex: 1 }}>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                marginBottom: 10
              }}
            >
              <Eye size={13} color="#854d0e" />
              <span>3D EDITORIAL GALLERY</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                color: '#1c1317',
                fontWeight: 800,
                margin: 0
              }}
            >
              Dimensional Brand Visuals & Collections
            </h2>
          </div>

          <div style={{ fontSize: '0.84rem', color: '#78716c' }}>
            Click any panel to open interactive 4K zoom lightbox
          </div>
        </div>

        {/* Creative Mixed-Size Editorial Photography Spread — Pure Rectangular Scale & Staggering */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            alignItems: 'center'
          }}
        >
          {gallery.map((imgItem: { url: string; alt: string; tag: string; caption: string }, idx: number) => {
            // Intentionally varied heights and vertical staggering to create magazine-style visual rhythm
            const heights = [440, 270, 380, 240, 450, 300, 280, 350];
            const offsets = [-15, 30, -10, 35, -20, 25, 0, 30];
            const currentHeight = heights[idx % heights.length];
            const currentOffset = offsets[idx % offsets.length];

            return (
              <div
                key={idx}
                className="ed-hover-expand"
                style={{
                  height: currentHeight,
                  cursor: 'pointer',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  background: '#ffffff',
                  boxShadow: '0 14px 38px rgba(28, 19, 23, 0.08)',
                  transform: `translateY(${currentOffset}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
                onClick={() => setLightboxIndex(idx)}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img
                    src={imgItem.url}
                    alt={imgItem.alt}
                    className="royal-zoom-effect"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                  <div className="three-d-light-beam" />
                  <div className="three-d-rim-glow" />
                  <div className="ed-scrim-bottom" />

                  {/* Overlap Silhouette Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 3
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.94)',
                        backdropFilter: 'blur(10px)',
                        color: '#854d0e',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '5px 14px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                        fontWeight: 800,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      {imgItem.tag}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 18,
                      left: 18,
                      right: 18,
                      zIndex: 3
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#d4af37',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                      }}
                    >
                      COLLECTION ARCHIVE · 0{idx + 1}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        color: '#ffffff',
                        margin: '2px 0 0',
                        fontWeight: 800,
                        textShadow: '0 2px 8px rgba(0,0,0,0.85)'
                      }}
                    >
                      {imgItem.caption}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. HORIZONTAL 3D SWIPE CAROUSEL
          ===================================================================== */}
      <section
        style={{
          position: 'relative',
          padding: '40px 24px 60px',
          maxWidth: 1440,
          margin: '0 auto',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              CONTINUOUS 3D SLIDER
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                color: '#1c1317',
                margin: '2px 0 0',
                fontWeight: 800
              }}
            >
              Horizontal Collection Reel
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
                cursor: 'pointer',
                transition: 'all 0.2s'
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
                cursor: 'pointer',
                transition: 'all 0.2s'
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
          {gallery.map((item: { url: string; alt: string; tag: string; caption: string }, idx: number) => (
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
                  alt={item.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="royal-zoom-effect"
                />
                <div className="ed-scrim-bottom" />
                <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, zIndex: 2 }}>
                  <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#d4af37', fontWeight: 700 }}>
                    {item.tag}
                  </span>
                  <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 700, margin: '2px 0 0' }}>
                    {item.caption}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. EXPLORE OTHER BRANDS IN SAME CATEGORY
          ===================================================================== */}
      {relatedBrands.length > 0 && (
        <section
          style={{
            position: 'relative',
            padding: '40px 24px 70px',
            maxWidth: 1440,
            margin: '0 auto',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            zIndex: 1
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              SIMILAR LUXURY EXPERIENCES
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                color: '#1c1317',
                margin: '2px 0 0',
                fontWeight: 800
              }}
            >
              More Brands in {brand.department || brand.category}
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20
            }}
          >
            {relatedBrands.map((relBrand: MallBrand) => (
              <div
                key={relBrand.id}
                onClick={() => navigate(`/shopping/brand/${relBrand.id}`)}
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  boxShadow: '0 6px 20px rgba(28, 19, 23, 0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="ed-lift-target"
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={relBrand.images[0]}
                    alt={relBrand.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="royal-zoom-effect"
                  />
                  <div className="ed-scrim-bottom" />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span
                      style={{
                        background: 'rgba(253, 252, 249, 0.95)',
                        color: '#854d0e',
                        padding: '4px 10px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700
                      }}
                    >
                      {relBrand.unit}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#1c1317', margin: 0, fontWeight: 800 }}>
                      {relBrand.name}
                    </h4>
                    <span style={{ fontSize: '0.74rem', color: '#78716c' }}>
                      {relBrand.floor}
                    </span>
                  </div>
                  <ArrowRight size={16} color="#854d0e" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          7. FULLSCREEN 4K LIGHTBOX MODAL
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
                {brand.name} · OFFICIAL 4K ASSET
              </span>
              <div style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800 }}>
                {gallery[lightboxIndex].caption}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {gallery.length}
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
                  prev !== null ? (prev - 1 + gallery.length) % gallery.length : null
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
              src={gallery[lightboxIndex].url}
              alt={gallery[lightboxIndex].alt}
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
                  prev !== null ? (prev + 1) % gallery.length : null
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

          {/* Bottom Thumbnails Strip */}
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
            {gallery.map((thumb: { url: string; alt: string }, tIdx: number) => (
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
                  alt={thumb.alt}
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
