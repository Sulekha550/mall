import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import {
  Sparkles,
  MapPin,
  Clock,
  Car,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Check,
  Share2,
  ArrowRight,
  Navigation as NavIcon,
  Phone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import '../components/editorial/editorial.css';

interface VisitCuration {
  url: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  amenities: string[];
}

export const VisitPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFloor, setActiveFloor] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const visitCurations: VisitCuration[] = [
    {
      url: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1600&auto=format&fit=crop',
      title: 'Grand West Arrival Portal & Travertine Landscaped Plaza',
      category: 'WEST VIP ARRIVAL · GROUND LEVEL',
      tag: 'GRAND ENTRANCE',
      description: 'The monumental 42-meter travertine and acoustic glass portal welcomes guests with fountains, botanical parterres, and heated porte-cochère valet bays.',
      amenities: ['Heated Porte-Cochère', 'Acoustic Glass Air-Curtains', 'Limousine Drop-off']
    },
    {
      url: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=1200&auto=format&fit=crop',
      title: 'Concourse Grand Oculus & Sunlit Atrium Architecture',
      category: 'CENTRAL ATRIUM · TRIPLE-HEIGHT MEZZANINE',
      tag: 'INTERIORS',
      description: 'A 38.5-meter elliptical glass oculus illuminates the central rotunda, cascading natural daylight down across marble colonnades and floating walkways.',
      amenities: ['Daylight Harvesting', 'Italian Calacatta Marble', '38.5m Glass Oculus']
    },
    {
      url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1200&auto=format&fit=crop',
      title: 'Subterranean Multi-Level Valet Parking & EV Charging Lounge',
      category: 'LEVEL B1–B3 · 4,200 SPACES',
      tag: 'VALET & PARKING',
      description: 'Three climate-controlled subterranean tiers featuring automated license-plate recognition, 80 ultra-fast DC EV chargers, and a dedicated VIP Valet Lounge.',
      amenities: ['Automated Bay Guidance', '80 350kW DC Fast Chargers', 'White-Glove Valet Lounge']
    },
    {
      url: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=1200&auto=format&fit=crop',
      title: 'Sovereign Guest Services & VIP White-Glove Concierge Lounge',
      category: 'GRAND ROTUNDA · LEVEL 0 & 1',
      tag: 'CONCIERGE & FACILITIES',
      description: 'Multilingual guest directors offering hands-free shopping bag transfers, hotel luggage check-in, priority restaurant reservations, and personal styling guides.',
      amenities: ['Hands-Free Bag Transfer', 'VIP Travel Concierge', 'Multilingual Attendants']
    },
    {
      url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1200&auto=format&fit=crop',
      title: 'Panoramic Skybridge Concourse & High-Speed Glass Lifts',
      category: 'LEVEL 1–3 PROMENADE',
      tag: 'VISITOR JOURNEY',
      description: 'Seamless vertical mobility via 16 panoramic scenic glass elevators and suspension skybridges connecting the luxury fashion wing to the rooftop culinary terrace.',
      amenities: ['16 Scenic Glass Elevators', 'Direct Skybridge Access', 'Step-Free Accessibility']
    },
    {
      url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
      title: 'Family Lounge, Nursing Suites & Sensory Relaxation Atelier',
      category: 'FAMILY WING · LEVEL 1',
      tag: 'FAMILY AMENITIES',
      description: 'Sound-dampened nursery suites equipped with ergonomic feeding stations, organic sanitizers, private family restrooms, and interactive quiet zones.',
      amenities: ['Private Nursing Pods', 'Complimentary Strollers', 'Sensory Play Oasis']
    },
    {
      url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
      title: 'Hands-Free Shopping Lounge & Personal Styling Suites',
      category: 'VIP SANCTUARY · LEVEL 2',
      tag: 'SHOPPING PRIVILÈGE',
      description: 'Effortless luxury: all boutique purchases are automatically whisked to your vehicle trunk or suite while you enjoy fine dining and cinema.',
      amenities: ['Direct Trunk Delivery', 'Private Fitting Salons', 'Champagne Welcome']
    },
    {
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
      title: 'Starlit Water Mirror & Architectural Night Facade',
      category: 'EXTERIOR REFLECTION PLAZA',
      tag: 'EVENING ARCHITECTURE',
      description: 'At dusk, the kinetic facade illuminates with over 12,000 programmed warm-tungsten diodes, reflected across the central granite infinity pool.',
      amenities: ['12,000 LED Facade Matrix', 'Granite Infinity Mirror', 'Starlit Promenade Walk']
    }
  ];

  // Floor Directory Specs
  const floorLevels = [
    {
      level: 0,
      name: 'Ground Concourse · Level 0',
      tagline: 'Grand Entrance, Haute Horlogerie & Fashion Flagships',
      stores: 'Allen Solly, Levi’s, Woodland, Puma, Titan World, Spencer’s Gourmet',
      valet: 'West & East Porte-Cochère Valet Desks'
    },
    {
      level: 1,
      name: 'First Promenade · Level 1',
      tagline: 'Luxury Couture, Jewellery Colonnade & Beauty Ateliers',
      stores: 'Louis Philippe, Tanishq, Metro Shoes, W for Woman, Mufti, Looks Salon',
      valet: 'Skybridge Valet Key Collection'
    },
    {
      level: 2,
      name: 'Second Mezzanine · Level 2',
      tagline: 'INOX Insignia IMAX Cinemas & Michelin Gastronomie',
      stores: 'INOX 4K Laser IMAX, Barbeque Nation, Pind Balluchi, Cinnamon, Pizza Hut',
      valet: 'Cinema Priority Valet Pickup'
    },
    {
      level: 3,
      name: 'Third Starlit Terrace · Level 3',
      tagline: 'Skyline Dining Terraces & Sovereign Event Amphitheatre',
      stores: 'Rangrezza Banquet Hall, Subrasa, Al Fresco Rooftop Pavilions',
      valet: 'Helipad & VIP Express Lift Access'
    }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % visitCurations.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + visitCurations.length) % visitCurations.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visitCurations.length]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'City Mall Visitor Journey & Architectural Guide',
        text: 'Plan your visit: valet parking, concourse navigation, and VIP guest services at City Mall.',
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
        backgroundColor: 'rgba(253, 251, 247, 0.14)',
        color: '#1c1317',
        paddingTop: 80,
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Luminous Soft Lavender & Pastel Peach Ambient Orbs */}
      <div
        className="ed-ambient-orb-lavender"
        style={{ top: 0, left: '10%' }}
      />
      <div
        className="ed-ambient-orb-peach"
        style={{ top: '35%', right: '5%' }}
      />
      <div
        className="ed-ambient-orb-coral"
        style={{ top: '70%', left: '15%' }}
      />

      {/* =====================================================================
          1. CINEMATIC 3D ARCHITECTURAL ENTRANCE HERO
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
        <div className="ed-creative-watermark" style={{ top: 0, right: 0 }}>
          CONCOURSE
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div>
            <div
              className="ed-section-badge"
              style={{
                background: 'rgba(232, 226, 244, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#6b21a8',
                marginBottom: 10
              }}
            >
              <Compass size={14} color="#6b21a8" />
              <span>THE ARCHITECTURAL VISITOR JOURNEY · 2026</span>
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
              Arrival, Concourse & VIP Facilities
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              <span className="ed-feature-pill">
                <span className="ed-live-dot" />
                <span>4,200 VALET PARKING BAYS</span>
              </span>
              <span className="ed-feature-pill">
                <Zap size={12} color="#c5a059" />
                <span>80 ULTRA-FAST EV CHARGERS</span>
              </span>
              <span className="ed-feature-pill">
                <ShieldCheck size={12} color="#c5a059" />
                <span>HANDS-FREE SHOPPING BUTLER</span>
              </span>
              <span className="ed-feature-pill">
                <Clock size={12} color="#c5a059" />
                <span>OPEN DAILY 10:00 AM – 10:00 PM</span>
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
                background: copiedLink ? '#15803d' : 'rgba(232, 226, 244, 0.6)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: copiedLink ? '#ffffff' : '#6b21a8',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Copied Link' : 'Share Visitor Guide'}</span>
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
          {/* Dominant Hero Card: Grand West Arrival Portal */}
          <ThreeDTiltCard
            maxTilt={9}
            perspective={1200}
            scale={1.02}
            glare={true}
            glareMaxOpacity={0.25}
            style={{
              borderRadius: 26,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 24px 60px rgba(28, 19, 23, 0.08)',
              minHeight: 460
            }}
            onClick={() => setLightboxIndex(0)}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 460, overflow: 'hidden', cursor: 'pointer' }}>
              <img
                src={visitCurations[0].url}
                alt={visitCurations[0].title}
                className="royal-zoom-effect"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="three-d-light-beam" />
              <div className="three-d-rim-glow" />
              <div className="ed-scrim-bottom" />

              <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 4 }}>
                <span
                  style={{
                    background: 'rgba(253, 251, 247, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#6b21a8',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    fontWeight: 800
                  }}
                >
                  {visitCurations[0].tag}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 4 }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#c5a059', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {visitCurations[0].category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: '#ffffff', margin: '4px 0 0', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}>
                  {visitCurations[0].title}
                </h2>
              </div>
            </div>
          </ThreeDTiltCard>

          {/* Staggered Companion Panels: Interiors & Valet Parking */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {visitCurations.slice(1, 3).map((item, idx) => (
              <ThreeDTiltCard
                key={idx}
                maxTilt={10}
                perspective={1100}
                scale={1.02}
                glare={true}
                glareMaxOpacity={0.22}
                style={{
                  flex: 1,
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 16px 40px rgba(28, 19, 23, 0.06)',
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
                  <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3 }}>
                    <span
                      style={{
                        background: 'rgba(253, 251, 247, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: '#6b21a8',
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        border: '1px solid rgba(168, 85, 247, 0.28)'
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18, zIndex: 3 }}>
                    <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#c5a059', fontWeight: 700 }}>
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
          2. OVERLAPPING STACKED SECTION: ARCHITECTURAL FLOORPLAN JOURNEY
          ===================================================================== */}
      <section
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
                background: 'rgba(232, 226, 244, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#6b21a8',
                marginBottom: 8
              }}
            >
              <Layers size={13} color="#6b21a8" />
              <span>INTERACTIVE VERTICAL ELEVATION</span>
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
              Multi-Level Concourse Layout
            </h2>
          </div>
          {/* Level Switcher Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {floorLevels.map((lvl) => (
              <button
                key={lvl.level}
                onClick={() => setActiveFloor(lvl.level)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 9999,
                  background: activeFloor === lvl.level ? '#6b21a8' : 'rgba(232, 226, 244, 0.6)',
                  color: activeFloor === lvl.level ? '#ffffff' : '#4a343c',
                  border: activeFloor === lvl.level ? '1px solid #6b21a8' : '1px solid rgba(168, 85, 247, 0.25)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Level {lvl.level}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Floor Highlight Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 22,
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 16px 40px rgba(28, 19, 23, 0.06)',
            padding: '28px 32px',
            marginBottom: 36
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#c5a059', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800 }}>
                {floorLevels[activeFloor].name}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: '#1c1317', margin: '4px 0 8px' }}>
                {floorLevels[activeFloor].tagline}
              </h3>
              <p style={{ margin: 0, color: '#57534e', fontSize: '0.9rem' }}>
                <strong>Key Flagships:</strong> {floorLevels[activeFloor].stores}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(252, 234, 222, 0.6)', padding: '10px 18px', borderRadius: 14, border: '1px solid rgba(251, 146, 60, 0.25)' }}>
              <Car size={16} color="#c2410c" />
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#9a3412', fontWeight: 700 }}>
                {floorLevels[activeFloor].valet}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Item Architectural Facilities Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            alignItems: 'stretch'
          }}
        >
          {visitCurations.slice(3).map((item, idx) => (
            <div
              key={idx}
              className="ed-hover-expand"
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                boxShadow: '0 12px 35px rgba(28, 19, 23, 0.06)',
                cursor: 'pointer'
              }}
              onClick={() => setLightboxIndex(idx + 3)}
            >
              <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="three-d-light-beam" />
                <div className="three-d-rim-glow" />
                <div className="ed-scrim-bottom" />

                <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 3 }}>
                  <span
                    style={{
                      background: 'rgba(253, 251, 247, 0.94)',
                      backdropFilter: 'blur(8px)',
                      color: '#6b21a8',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
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

                <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, zIndex: 3 }}>
                  <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#c5a059', fontWeight: 700, letterSpacing: '0.12em' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.85)', margin: '2px 0 0' }}>
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Amenities Feature Tags */}
              <div style={{ padding: '16px 20px', background: 'linear-gradient(180deg, #ffffff 0%, #fdfbf7 100%)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {item.amenities.map((am, aIdx) => (
                    <span
                      key={aIdx}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 6,
                        background: 'rgba(232, 226, 244, 0.5)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#6b21a8',
                        fontWeight: 700
                      }}
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px dashed rgba(212, 175, 55, 0.25)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#78716c', fontFamily: 'var(--font-mono)' }}>
                    High-Res Architectural Visual
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#6b21a8', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span>Explore 4K</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. OVERLAPPING STACKED SECTION: FAST REEL CAROUSEL
          ===================================================================== */}
      <section
        className="ed-stacked-section ed-stacked-section-peach"
        style={{
          padding: '40px 24px 70px',
          maxWidth: 1440,
          margin: '-30px auto 0'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#c2410c', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>
              CONTINUOUS 3D SLIDER
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#1c1317', margin: '2px 0 0', fontWeight: 800 }}>
              Curated Architectural Journey Reel
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
                border: '1px solid rgba(251, 146, 60, 0.35)',
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
                border: '1px solid rgba(251, 146, 60, 0.35)',
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
          {visitCurations.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(28, 19, 23, 0.06)',
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
                  <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#c5a059', fontWeight: 700 }}>
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
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#c5a059', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                {visitCurations[lightboxIndex].category}
              </span>
              <div style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800 }}>
                {visitCurations[lightboxIndex].title}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#a8a29e', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {lightboxIndex + 1} / {visitCurations.length}
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
                  prev !== null ? (prev - 1 + visitCurations.length) % visitCurations.length : null
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
              src={visitCurations[lightboxIndex].url}
              alt={visitCurations[lightboxIndex].title}
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
                  prev !== null ? (prev + 1) % visitCurations.length : null
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
            {visitCurations.map((thumb, tIdx) => (
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
                      ? '2px solid #c5a059'
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

