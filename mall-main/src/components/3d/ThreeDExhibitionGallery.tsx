import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Compass,
  ArrowUpRight,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ExhibitionItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  floor: string;
  route: string;
  image: string;
  tagline: string;
  accent: string;
}

const EXHIBITION_ITEMS: ExhibitionItem[] = [
  {
    id: 'inox',
    title: 'INOX Insignia Multiplex',
    brand: 'INOX Cinemas',
    category: 'Entertainment & Cinema',
    floor: 'Level 2 · Cinema Concourse',
    route: '/entertainment',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Laser projection, Dolby Atmos acoustics & bespoke butler dining.',
    accent: '#f43f5e'
  },
  {
    id: 'levis-fashion',
    title: 'Authentic Denim & Couture',
    brand: "Levi's Store · W for Woman",
    category: 'Fashion & Apparel',
    floor: 'Level 0 · Boulevard',
    route: '/shopping',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Iconic 501® heritage alongside contemporary women’s festive collections.',
    accent: '#f59e0b'
  },
  {
    id: 'puma-sports',
    title: 'High-Performance Sports Arena',
    brand: 'Puma & Adidas',
    category: 'Athletic & Sportswear',
    floor: 'Level 1 · Fashion Gallerie',
    route: '/shopping',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Ultraboost silhouettes, trackwear, and designer collaborative drops.',
    accent: '#facc15'
  },
  {
    id: 'tanishq-jewels',
    title: '22K Gold & Solitaire Diamond Vault',
    brand: 'Tanishq Jewellery',
    category: 'Jewellery & Accessories',
    floor: 'Level 0 · Grand Atrium',
    route: '/shopping',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Handcrafted bridal suites, certified solitaires, and polki treasures.',
    accent: '#eab308'
  },
  {
    id: 'bbq-dining',
    title: 'Live Table Grills & Global Buffet',
    brand: 'Barbeque Nation & Pizza Hut',
    category: 'Food & Dining',
    floor: 'Level 2 · Dining Terrace',
    route: '/dining',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Interactive live-grill skewer banquets and stone-fired artisan pizzas.',
    accent: '#fb7185'
  },
  {
    id: 'looks-salon',
    title: 'Couture Hair & Spa Sanctuary',
    brand: 'Looks Salon & Arjun Mehendi',
    category: 'Beauty & Wellness',
    floor: 'Level 1 · Wellness Suite',
    route: '/experiences',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Keratin rituals, Moroccan oil treatments & bridal mehendi artistry.',
    accent: '#f43f5e'
  },
  {
    id: 'spencer-retail',
    title: 'Epicure Supermarket & Gourmet Cellar',
    brand: "Spencer's Retail",
    category: 'Retail & Department Stores',
    floor: 'Ground Concourse · East Wing',
    route: '/shopping',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Imported artisanal cheeses, farm-fresh produce & pantry delicacies.',
    accent: '#e11d48'
  },
  {
    id: 'titan-horology',
    title: 'Master Complications & Chronographs',
    brand: 'Titan World',
    category: 'Luxury Timepieces',
    floor: 'Level 0 · Boulevard',
    route: '/shopping',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Ultra-slim Edge movements, automatic skeletons, and sapphire glass.',
    accent: '#f59e0b'
  }
];

interface ThreeDExhibitionGalleryProps {
  onOpenDirectory?: () => void;
  isEntranceActive?: boolean;
}

export const ThreeDExhibitionGallery: React.FC<ThreeDExhibitionGalleryProps> = ({
  onOpenDirectory,
  isEntranceActive = false
}) => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = EXHIBITION_ITEMS.length;
  const angleStep = 360 / total;
  // Radius calculation for smooth cylindrical curvature
  const radius = 580;

  // Sync active index based on rotation angle
  useEffect(() => {
    const normalizedAngle = ((-rotation % 360) + 360) % 360;
    const index = Math.round(normalizedAngle / angleStep) % total;
    setActiveIndex(index);
  }, [rotation, angleStep, total]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || isDragging) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setRotation((prev) => prev - angleStep);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isDragging, angleStep]);

  const handlePrev = useCallback(() => {
    setRotation((prev) => prev + angleStep);
  }, [angleStep]);

  const handleNext = useCallback(() => {
    setRotation((prev) => prev - angleStep);
  }, [angleStep]);

  const handleSelectIndex = useCallback(
    (index: number) => {
      setRotation(-index * angleStep);
    },
    [angleStep]
  );

  // Mouse / Touch Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(dragStartRotation.current + deltaX * 0.35);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest card
    setRotation((prev) => Math.round(prev / angleStep) * angleStep);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartRotation.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    setRotation(dragStartRotation.current + deltaX * 0.35);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setRotation((prev) => Math.round(prev / angleStep) * angleStep);
  };

  const currentItem = EXHIBITION_ITEMS[activeIndex];

  return (
    <section
      id="spatial-3d-gallery"
      style={{
        position: 'relative',
        padding: '110px 24px 120px',
        maxWidth: 1480,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(254, 240, 138, 0.15) 0%, rgba(255, 245, 247, 0.9) 60%, #fff5f7 100%)',
        borderTop: '1px solid rgba(244, 63, 94, 0.22)',
        borderBottom: '1px solid rgba(244, 63, 94, 0.18)'
      }}
    >
      {/* Ambient 3D Stage Atmospheric Glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 820,
          height: 380,
          background: 'radial-gradient(ellipse, rgba(251, 113, 133, 0.18) 0%, rgba(250, 204, 21, 0.15) 45%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Typography */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 50px' }}>
          <div
            className={`glass-pill ${isEntranceActive ? 'hp-anim-gallery-pill' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 20px',
              borderRadius: 9999,
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#f43f5e',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              background: 'linear-gradient(135deg, rgba(255, 241, 242, 0.95), rgba(254, 249, 195, 0.95))',
              marginBottom: 16,
              fontWeight: 700,
              boxShadow: '0 4px 18px rgba(244, 63, 94, 0.12)'
            }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <span>INTERACTIVE 3D SPATIAL EXHIBITION · CITY MALL</span>
          </div>

          <h2
            className={isEntranceActive ? 'hp-anim-gallery-title' : undefined}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)',
              color: '#0f172a',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: 14,
              lineHeight: 1.12
            }}
          >
            The Flagship Experience in{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 35%, #f59e0b 70%, #facc15 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Virtual 3D Space.
            </span>
          </h2>

          <p
            className={isEntranceActive ? 'hp-anim-gallery-desc' : undefined}
            style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.65,
              maxWidth: 680,
              margin: '0 auto 24px'
            }}
          >
            Rotate and navigate through our eight luxury architectural pavilions. Drag horizontally or
            interact with the orbital controls to inspect each destination in full 3D perspective.
          </p>

          {/* Interactive Hint */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: '#f59e0b',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <Compass size={14} />
            <span>Drag cursor to spin in 3D · Click card to spotlight</span>
          </div>
        </div>

        {/* 3D Cylindrical Perspective Carousel Stage */}
        <div
          className={isEntranceActive ? 'hp-anim-gallery-stage' : undefined}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            height: 520,
            perspective: '1200px',
            WebkitPerspective: '1200px',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 30
          }}
        >
          {/* Virtual 3D Rotating Ring */}
          <div
            style={{
              position: 'relative',
              width: 320,
              height: 440,
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {EXHIBITION_ITEMS.map((item, idx) => {
              const itemAngle = idx * angleStep;
              const isCurrent = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCurrent) {
                      handleSelectIndex(idx);
                    } else {
                      navigate(item.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 320,
                    height: 440,
                    borderRadius: 22,
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    cursor: isCurrent ? 'pointer' : 'pointer',
                    boxShadow: isCurrent
                      ? '0 30px 80px rgba(244, 63, 94, 0.28), 0 10px 30px rgba(250, 204, 21, 0.25)'
                      : '0 15px 40px rgba(15, 23, 42, 0.12)',
                    transition: 'box-shadow 0.4s ease, filter 0.4s ease, border-color 0.4s ease',
                    filter: isCurrent ? 'none' : 'brightness(0.85) contrast(0.95)',
                    border: isCurrent
                      ? '2px solid rgba(250, 204, 21, 0.85)'
                      : '1px solid rgba(244, 63, 94, 0.25)',
                    background: '#ffffff',
                    overflow: 'hidden'
                  }}
                >
                  {/* Photo Frame */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transform: isCurrent ? 'scale(1.06)' : 'scale(1.0)',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Gradient Dark Scrim for Crisp Text */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, transparent 45%, rgba(15, 23, 42, 0.88) 100%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Top Floating Badge in 3D */}
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
                      <span
                        style={{
                          padding: '5px 12px',
                          borderRadius: 9999,
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(10px)',
                          color: '#facc15',
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(250, 204, 21, 0.4)'
                        }}
                      >
                        {item.brand}
                      </span>

                      {isCurrent && (
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f43f5e, #facc15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 4px 15px rgba(244, 63, 94, 0.4)'
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </div>
                      )}
                    </div>

                    {/* Bottom Editorial Content */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px 20px',
                        zIndex: 3,
                        color: '#ffffff'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#facc15',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          marginBottom: 4
                        }}
                      >
                        {item.floor}
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.3rem',
                          fontWeight: 800,
                          color: '#ffffff',
                          lineHeight: 1.2,
                          marginBottom: 6,
                          letterSpacing: '0.02em'
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: '#e2e8f0',
                          lineHeight: 1.45,
                          margin: 0,
                          opacity: isCurrent ? 1 : 0.75,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.tagline}
                      </p>
                    </div>

                    {/* 3D Glass Specular Sheen for Active Card */}
                    {isCurrent && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, transparent 60%)',
                          pointerEvents: 'none',
                          mixBlendMode: 'overlay'
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orbit Controls & Quick Details Footer */}
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24
          }}
        >
          {/* Active Highlight Banner */}
          <div
            style={{
              padding: '16px 28px',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              boxShadow: '0 10px 30px rgba(244, 63, 94, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              width: '100%',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#f43f5e',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                SPATIAL SPOTLIGHT [{activeIndex + 1} / {total}]
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0f172a'
                }}
              >
                {currentItem.title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                type="button"
                onClick={() => {
                  navigate(currentItem.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="prem-cta-btn"
                style={{
                  padding: '10px 22px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Visit {currentItem.category}</span>
                <ArrowUpRight size={14} />
              </button>

              {onOpenDirectory && (
                <button
                  type="button"
                  onClick={onOpenDirectory}
                  className="prem-cta-secondary"
                  style={{
                    padding: '10px 18px',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Directory
                </button>
              )}
            </div>
          </div>

          {/* Controls: Prev / Pause-Play / Next & Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              type="button"
              onClick={handlePrev}
              title="Previous Destination in 3D"
              aria-label="Previous Destination"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#f43f5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.borderColor = '#f43f5e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.3)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Orbit Pagination Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {EXHIBITION_ITEMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectIndex(i)}
                  title={`View Destination ${i + 1}`}
                  aria-label={`Destination ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    height: 8,
                    borderRadius: 9999,
                    background:
                      i === activeIndex
                        ? 'linear-gradient(90deg, #f43f5e, #facc15)'
                        : 'rgba(244, 63, 94, 0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              title={isAutoPlaying ? 'Pause 3D Orbit' : 'Resume 3D Orbit'}
              aria-label={isAutoPlaying ? 'Pause 3D Orbit' : 'Resume 3D Orbit'}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid rgba(250, 204, 21, 0.5)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(250, 204, 21, 0.12)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isAutoPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>

            <button
              type="button"
              onClick={handleNext}
              title="Next Destination in 3D"
              aria-label="Next Destination"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#f43f5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.borderColor = '#f43f5e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.3)';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
