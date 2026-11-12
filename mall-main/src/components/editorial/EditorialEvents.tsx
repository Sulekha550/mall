import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Ticket
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  categoryBadgeColor: string;
  categoryBadgeBg: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  status: string;
  priceTag: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'concert-symphony',
    title: 'Acoustic Symphony Under the Stars',
    category: 'LIVE CONCERT',
    categoryBadgeColor: '#f43f5e',
    categoryBadgeBg: 'rgba(244, 63, 94, 0.1)',
    date: 'NOV 18 – 20, 2026',
    time: '08:00 PM – 10:30 PM',
    venue: 'Central Atrium Amphitheatre',
    description: 'An international 45-piece philharmonic orchestra performing cinematic masterpieces and classical scores beneath the glass rotunda.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'SELLING FAST',
    priceTag: 'MEMBERS PRIORITY'
  },
  {
    id: 'fashion-couture',
    title: 'Autumn/Winter Haute Couture Runway',
    category: 'FASHION SHOW',
    categoryBadgeColor: '#f59e0b',
    categoryBadgeBg: 'rgba(245, 158, 11, 0.12)',
    date: 'NOV 24 – 27, 2026',
    time: '07:30 PM CET',
    venue: 'Grand Marble Promenade · Level 1',
    description: 'Exclusive global designer runway showcase featuring debut seasonal collections from leading Parisian and Milanese fashion houses.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'INVITATION ONLY',
    priceTag: 'VIP FRONT-ROW'
  },
  {
    id: 'food-carnival',
    title: 'World Gastronomy & Artisanal Wine Fair',
    category: 'FOOD FESTIVAL',
    categoryBadgeColor: '#ea580c',
    categoryBadgeBg: 'rgba(234, 88, 12, 0.08)',
    date: 'DEC 04 – 07, 2026',
    time: '12:00 PM – 11:00 PM',
    venue: 'Skyline Mezzanine Terrace',
    description: 'Masterclass tastings with Michelin-starred guest chefs, rare vintage wine pairings, and artisanal European street food stalls.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'REGISTRATION OPEN',
    priceTag: 'TASTING PASS'
  },
  {
    id: 'live-odyssey',
    title: 'Cirque de Lumière: Aerial Odyssey',
    category: 'LIVE ENTERTAINMENT',
    categoryBadgeColor: '#0f766e',
    categoryBadgeBg: 'rgba(15, 118, 110, 0.08)',
    date: 'DEC 12 – 15, 2026',
    time: '06:30 PM & 09:00 PM',
    venue: 'The Grand Rotunda Stage',
    description: 'Breathtaking high-wire aerial silks acrobatics synchronized with ambient kinetic lighting sculptures and live vocalists.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'LIMITED SEATING',
    priceTag: 'FREE FOR GUESTS'
  },
  {
    id: 'kids-wonderland',
    title: 'The Enchanted Toy Kingdom Spectacular',
    category: 'KIDS & FAMILY',
    categoryBadgeColor: '#e11d48',
    categoryBadgeBg: 'rgba(225, 29, 72, 0.08)',
    date: 'DEC 19 – 23, 2026',
    time: '11:00 AM – 06:00 PM',
    venue: 'Level 2 Play Pavilion',
    description: 'Immersive interactive storybook installations, live theatrical puppet shows, and hands-on kinetic toy design workshops for children.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'FAMILY PASSES',
    priceTag: 'RESERVE ENTRY'
  },
  {
    id: 'art-biennale',
    title: 'International Contemporary Art Biennale',
    category: 'LIFESTYLE & ART',
    categoryBadgeColor: '#facc15',
    categoryBadgeBg: 'rgba(251, 113, 133, 0.08)',
    date: 'JAN 08 – 15, 2027',
    time: '10:00 AM – 10:00 PM',
    venue: 'Sky Bridge Gallery · East Wing',
    description: 'Eight monumental kinetic light and glass sculptures created by pioneering international artists, with curated audio guide tours.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E',
    status: 'EXHIBITION OPEN',
    priceTag: 'ALL AGES'
  }
];

const CATEGORIES = ['ALL EVENTS', 'LIVE CONCERTS', 'FASHION SHOW', 'FOOD FESTIVAL', 'LIVE ENTERTAINMENT', 'KIDS & FAMILY'];

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

export const EditorialEvents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL EVENTS');
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const filteredEvents = selectedCategory === 'ALL EVENTS'
    ? EVENTS_DATA
    : EVENTS_DATA.filter((item) => item.category === selectedCategory);

  const scrollPrev = () => {
    if (carouselTrackRef.current) {
      const cardWidth = carouselTrackRef.current.clientWidth / 3;
      carouselTrackRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollNext = () => {
    if (carouselTrackRef.current) {
      const cardWidth = carouselTrackRef.current.clientWidth / 3;
      carouselTrackRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="editorial-events"
      style={{
        position: 'relative',
        padding: '72px 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glow Accents */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* =================================================================
            HEADER SECTION: BADGE, HEADING & CIRCULAR CAROUSEL ARROWS
            ================================================================= */}
        <div style={{ marginBottom: 36 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(250, 204, 21, 0.12) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#f43f5e'
            }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <span>05 · Curated Cultural Calendar & World-Class Happenings</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 24
            }}
          >
            <div style={{ maxWidth: 760 }}>
              <h2
                className="ed-section-title"
                style={{
                  color: '#0f172a',
                  marginBottom: 12,
                  letterSpacing: '0.02em'
                }}
              >
                EVENTS & EXPERIENCES
              </h2>
              <p
                className="ed-section-subtitle"
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#475569'
                }}
              >
                Immerse yourself in spectacular international concerts, haute couture fashion reveals,
                culinary wine carnivals, and bespoke family entertainment staged across City Mall.
              </p>
            </div>

            {/* Circular Carousel Navigation Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}
            >
              <button
                onClick={scrollPrev}
                aria-label="Previous Events"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(15, 23, 42, 0.12)',
                  background: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f172a';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#0f172a';
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(15, 23, 42, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.06)';
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={scrollNext}
                aria-label="Next Events"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(15, 23, 42, 0.12)',
                  background: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f172a';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#0f172a';
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(15, 23, 42, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.06)';
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 26,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 6
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: isSelected ? '1.5px solid #0f172a' : '1px solid rgba(15, 23, 42, 0.1)',
                    background: isSelected ? '#0f172a' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#475569',
                    boxShadow: isSelected ? '0 4px 14px rgba(15, 23, 42, 0.18)' : '0 2px 6px rgba(15, 23, 42, 0.03)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            HORIZONTAL CAROUSEL TRACK (3 CARDS VISIBLE ON DESKTOP)
            ================================================================= */}
        <div
          ref={carouselTrackRef}
          style={{
            display: 'flex',
            gap: 28,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: 16,
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="ed-card ed-lift-target ed-event-carousel-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 20,
                background: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden',
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease'
              }}
            >
              {/* Event Rectangular Image Container with Zoom on Hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  background: '#e2e8f0'
                }}
              >
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="ed-img"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Floating Top Category Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    zIndex: 2
                  }}
                >
                  <span
                    className="ed-pill"
                    style={{
                      background: 'rgba(255, 255, 255, 0.96)',
                      border: `1px solid ${evt.categoryBadgeColor}40`,
                      color: evt.categoryBadgeColor,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    {evt.category}
                  </span>
                </div>

                {/* Status Pill on Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      background: 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    {evt.status}
                  </span>
                </div>
              </div>

              {/* Event Content Underneath */}
              <div
                style={{
                  padding: '24px 22px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  background: '#ffffff'
                }}
              >
                {/* Date & Time Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: evt.categoryBadgeColor,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Calendar size={13} />
                    {evt.date}
                  </span>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={13} />
                    {evt.time}
                  </span>
                </div>

                {/* Event Title Underneath Image */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: '#0f172a',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                    marginBottom: 10,
                    fontWeight: 800
                  }}
                >
                  {evt.title}
                </h3>

                {/* Venue Location Indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.78rem',
                    color: '#64748b',
                    marginBottom: 12,
                    fontWeight: 500
                  }}
                >
                  <MapPin size={14} color="#94a3b8" />
                  <span>{evt.venue}</span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#475569',
                    lineHeight: 1.55,
                    margin: '0 0 18px 0',
                    flexGrow: 1
                  }}
                >
                  {evt.description}
                </p>

                {/* Action CTA Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid rgba(15, 23, 42, 0.06)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: evt.categoryBadgeColor,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {evt.priceTag}
                  </span>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'transparent',
                      border: 'none',
                      color: '#0f172a',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'gap 0.25s ease, color 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = evt.categoryBadgeColor;
                      e.currentTarget.style.gap = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#0f172a';
                      e.currentTarget.style.gap = '6px';
                    }}
                  >
                    <span>EXPLORE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
