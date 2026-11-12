import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  FileText,
  Accessibility,
  Leaf,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import { MALL_CONFIG } from '../data/mallConfig';

interface FooterProps {
  onNavigateToSection?: (index: number) => void;
  isLight?: boolean;
}

interface LegalModalContent {
  title: string;
  badge: string;
  paragraphs: string[];
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, isLight = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [legalModal, setLegalModal] = useState<LegalModalContent | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string, sectionIdx?: number) => {
    if (location.pathname === '/' && typeof sectionIdx === 'number' && onNavigateToSection) {
      onNavigateToSection(sectionIdx);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'The Grand Atrium & Oculus', path: '/discover', sectionIdx: 1 },
    { label: 'Haute Couture & Brand Directory', path: '/shopping', sectionIdx: 2 },
    { label: 'Michelin Gastronomy & Dining', path: '/dining', sectionIdx: 4 },
    { label: 'Cinemas & VR Entertainment', path: '/entertainment', sectionIdx: 5 },
    { label: 'Cultural Galas & Runways', path: '/events', sectionIdx: 6 },
    { label: 'Concierge, Valet & Spa Privée', path: '/experiences', sectionIdx: 7 },
    { label: 'Sovereign 24K Gift Card', path: '/gift-card', sectionIdx: 8 }
  ];

  const guestServices = [
    { label: 'Privilege Gift Card & Experiences', action: () => handleNavClick('/gift-card') },
    { label: 'VIP Chauffeured Valet Portico (East & West)', action: () => handleNavClick('/experiences') },
    { label: 'Private Styling & Grooming Salons', action: () => handleNavClick('/experiences') },
    { label: 'Hands-Free Concierge Shopping Butler', action: () => handleNavClick('/experiences') },
    {
      label: 'Universal Accessibility & Priority Bays',
      action: () =>
        setLegalModal({
          title: 'Universal Accessibility Statement',
          badge: 'GUEST AMENITIES & INCLUSIVITY',
          paragraphs: [
            'City Mall is engineered to exceed global accessibility standards across all 3 architectural levels. Complimentary motorized concierge mobility chairs, step-free tactile paving, and tactile Braille wayfinding are available at all arrival porticos.',
            'All public passenger elevators feature wide-door automated access, multi-lingual voice guidance, and low-profile priority call panels. Hearing loop induction systems are operational throughout INOX Insignia VIP multiplex auditoriums and our Grand Atrium guest salons.',
            'Dedicated companion and family care suites with climate-controlled pediatric amenities are located on every concourse adjacent to our concierge desks.'
          ]
        })
    },
    {
      label: 'Helipad & High-Speed EV Superchargers',
      action: () =>
        setLegalModal({
          title: 'Aviation & High-Speed Charging Infrastructure',
          badge: 'ARRIVAL & VALET INFRASTRUCTURE',
          paragraphs: [
            'Our certified rooftop heliport welcomes charter transfers and VIP arrivals with direct private express elevator transit to our Level 3 Penthouse Privé.',
            'The subterranean arrival deck features 48 ultra-fast 350kW DC electric vehicle supercharging bays compatible with all standard luxury EV platforms, complete with valet plug-in service while you shop or dine.',
            'Advance reservations for helipad landing slots and private subterranean bay bookings can be coordinated 24/7 via our dedicated concierge communications line.'
          ]
        })
    }
  ]; 
  const openLegalModal = (type: 'privacy' | 'terms' | 'accessibility' | 'sustainability') => {
    switch (type) {
      case 'privacy':
        setLegalModal({
          title: 'Institutional Privacy & Data Governance',
          badge: 'SOVEREIGN PRIVACY CHARTER · 2026',
          paragraphs: [
            'City Mall Architectural Group maintains an uncompromising standard of guest confidentiality. We do not sell, rent, or monetize your personal booking, arrival, or transaction data under any circumstances.',
            'Information provided for VIP concierge consultations, private dining reservations, and privilege card enrollments is encrypted via quantum-resilient cryptographic protocols and stored strictly within secure on-premise partitions.',
            'Guests retain the sovereign right at all times to review, amend, or request the immediate expungement of their guest profile by contacting our Data Governance Officer at privacy@citymall.com.'
          ]
        });
        break;
      case 'terms':
        setLegalModal({
          title: 'Terms & Conditions of Entry & Service',
          badge: 'CONCIERGE POLICIES & CODE OF COURTESY',
          paragraphs: [
            'Admission to City Mall precincts, private lounges, and entertainment venues is subject to our published Code of Courtesy to ensure an elevated, secure, and harmonious atmosphere for all international visitors.',
            'Reservations for private dining salons, IMAX Insignia Director’s Boxes, and bespoke bridal henna ateliers must be confirmed with our concierge team in advance. Cancellation terms vary by masterhouse.',
            'Photography for non-commercial editorial memoirs is warmly permitted. Commercial broadcast, production filming, and drone operations require formal accredited permits issued by the City Mall Press & Communications Directorate.'
          ]
        });
        break;
      case 'accessibility':
        setLegalModal({
          title: 'Universal Accessibility Statement',
          badge: 'GUEST AMENITIES & INCLUSIVITY',
          paragraphs: [
            'City Mall is engineered to exceed global accessibility standards across all 3 architectural levels. Complimentary motorized concierge mobility chairs, step-free tactile paving, and tactile Braille wayfinding are available at all arrival porticos.',
            'All public passenger elevators feature wide-door automated access, multi-lingual voice guidance, and low-profile priority call panels. Hearing loop induction systems are operational throughout INOX Insignia VIP multiplex auditoriums and our Grand Atrium guest salons.',
            'Dedicated companion and family care suites with climate-controlled pediatric amenities are located on every concourse adjacent to our concierge desks.'
          ]
        });
        break;
      case 'sustainability':
        setLegalModal({
          title: 'Environmental Stewardship & Sustainability Charter',
          badge: 'LEED PLATINUM ACCREDITATION · 2026',
          paragraphs: [
            'City Mall operates as a LEED Platinum certified sustainable destination. Our crystalline atrium skylight captures passive solar luminescence, reducing interior lighting energy consumption by 42%.',
            '100% of our greywater is biologically recycled through subterranean bio-filtration reed beds to nourish our 2,400 indoor subtropical palm species and botanical gardens.',
            'Our tenant establishments follow zero single-use plastic mandates, with all packaging crafted from compostable unbleached fibers and organic bio-resins.'
          ]
        });
        break;
    }
  };

  return (
    <footer
      id="global-footer"
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #faf7f2 0%, #fdfcf9 35%, #faf5ee 100%)'
          : '#140c14',
        borderTop: isLight ? '1px solid rgba(212, 175, 55, 0.35)' : '1px solid rgba(212, 175, 55, 0.25)',
        position: 'relative',
        zIndex: 10,
        padding: '76px 32px 36px',
        color: isLight ? '#1c1317' : '#fecdd3',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Royal Gold Glow Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="mall-container" style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto' }}>
        {/* Top Tier: Brand, Navigation, Services, Communications */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40,
            marginBottom: 56
          }}
        >
          {/* Brand Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#854d0e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 14
              }}
            >
              <Sparkles size={12} color="#d4af37" />
              <span>METROPOLIS DESTINATION</span>
            </div>

            <div
              onClick={() => handleNavClick('/')}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginBottom: 6,
                color: '#1c1317',
                cursor: 'pointer'
              }}
            >
              {MALL_CONFIG.mallName}
            </div>

            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                textTransform: 'uppercase',
                marginBottom: 16,
                fontWeight: 700
              }}
            >
              {MALL_CONFIG.brandTagline}
            </p>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#574852', maxWidth: 320, margin: '0 0 18px' }}>
              An architectural masterwork uniting 27 global iconic houses, Michelin culinary salons,
              and holographic multiplex worlds across 3 luxury tiers.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#78716c' }}>
              <Clock size={14} color="#d4af37" />
              <span>Open Daily: 10:00 AM – 11:30 PM</span>
            </div>
          </div>

          {/* District & Page Navigation */}
          <div>
            <div
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                letterSpacing: '0.16em',
                marginBottom: 16,
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              SPATIAL DISTRICTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.path, link.sectionIdx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#334155',
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: '2px 0',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#854d0e';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#334155';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <ArrowRight size={12} color="#d4af37" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Concierge & Guest Services */}
          <div>
            <div
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                letterSpacing: '0.16em',
                marginBottom: 16,
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              GUEST SERVICES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {guestServices.map((service, sIdx) => (
                <button
                  key={sIdx}
                  onClick={service.action}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#334155',
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: '2px 0',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#854d0e';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#334155';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <Sparkles size={12} color="#d4af37" />
                  <span>{service.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Communications & Social */}
          <div>
            <div
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                color: '#854d0e',
                letterSpacing: '0.16em',
                marginBottom: 16,
                textTransform: 'uppercase',
                fontWeight: 800
              }}
            >
              COMMUNICATIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.86rem', marginBottom: 20 }}>
              <a
                href={`tel:${MALL_CONFIG.contact.conciergePhone.replace(/[^0-9+]/g, '')}`}
                style={{
                  color: '#334155',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
              >
                <Phone size={14} color="#d4af37" />
                <span>Concierge: {MALL_CONFIG.contact.conciergePhone}</span>
              </a>

              <a
                href={`mailto:${MALL_CONFIG.contact.generalEmail}`}
                style={{
                  color: '#334155',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
              >
                <Mail size={14} color="#d4af37" />
                <span>General: {MALL_CONFIG.contact.generalEmail}</span>
              </a>

              <a
                href={`mailto:${MALL_CONFIG.contact.pressEmail}`}
                style={{
                  color: '#334155',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
              >
                <FileText size={14} color="#d4af37" />
                <span>Press: {MALL_CONFIG.contact.pressEmail}</span>
              </a>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: Instagram, url: MALL_CONFIG.socialLinks.instagram, title: 'Instagram' },
                { icon: Facebook, url: MALL_CONFIG.socialLinks.facebook, title: 'Facebook' },
                { icon: Twitter, url: MALL_CONFIG.socialLinks.twitter, title: 'Twitter' },
                { icon: Youtube, url: MALL_CONFIG.socialLinks.youtube, title: 'YouTube' }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    title={item.title}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#854d0e',
                      background: '#ffffff',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      boxShadow: '0 4px 12px rgba(28, 19, 23, 0.06)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #d4af37, #b45309)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#854d0e';
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal Navigation & Smooth Back To Top */}
        <div
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            paddingTop: 28,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            fontSize: '0.78rem',
            color: '#6b5e68'
          }}
        >
          <div>
            © {new Date().getFullYear()} {MALL_CONFIG.mallName} Architectural Group. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
            <span
              onClick={() => openLegalModal('privacy')}
              style={{ cursor: 'pointer', transition: 'color 0.2s', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b5e68')}
            >
              Privacy Policy
            </span>
            <span
              onClick={() => openLegalModal('terms')}
              style={{ cursor: 'pointer', transition: 'color 0.2s', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b5e68')}
            >
              Terms & Conditions
            </span>
            <span
              onClick={() => openLegalModal('accessibility')}
              style={{ cursor: 'pointer', transition: 'color 0.2s', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b5e68')}
            >
              Accessibility Statement
            </span>
            <span
              onClick={() => openLegalModal('sustainability')}
              style={{ cursor: 'pointer', transition: 'color 0.2s', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#854d0e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b5e68')}
            >
              Sustainability Charter
            </span>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              padding: '8px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#854d0e',
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: 9999,
              background: '#ffffff',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.15)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #d4af37, #b45309)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#854d0e';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            <span>TOP OF JOURNEY</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Luxury Legal & Institutional Dialog Modal */}
      {legalModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(28, 19, 23, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24
          }}
          onClick={() => setLegalModal(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 24,
              maxWidth: 620,
              width: '100%',
              padding: '36px 32px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#854d0e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Close dialog"
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 9999,
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#854d0e',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                letterSpacing: '0.12em',
                marginBottom: 12
              }}
            >
              <Sparkles size={12} color="#d4af37" />
              <span>{legalModal.badge}</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 900,
                color: '#1c1317',
                margin: '0 0 16px',
                lineHeight: 1.2
              }}
            >
              {legalModal.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {legalModal.paragraphs.map((p, pIdx) => (
                <p key={pIdx} style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#475569', margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>

            <button
              onClick={() => setLegalModal(null)}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #d4af37, #b45309)',
                border: 'none',
                borderRadius: 9999,
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.25)'
              }}
            >
              I UNDERSTAND
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
