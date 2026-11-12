import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface EditorialNavProps {
  onReturnToTour: () => void;
}

export const EditorialNav: React.FC<EditorialNavProps> = ({ onReturnToTour }) => {
  const [activeTab, setActiveTab] = useState('atrium');

  const navItems = [
    { id: 'editorial-atrium', label: '01 Atrium' },
    { id: 'editorial-shopping', label: '02 Fashion' },
    { id: 'editorial-dining', label: '03 Gastronomy' },
    { id: 'editorial-entertainment', label: '04 Cinema & VR' },
    { id: 'editorial-events', label: '05 Calendar' },
    { id: 'editorial-gallery', label: '06 Lifestyle' },
    { id: 'editorial-services', label: '07 Concierge' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveTab(navItems[i].id.replace('editorial-', ''));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id.replace('editorial-', ''));
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="ed-subnav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            color: '#0f172a',
            letterSpacing: '0.12em',
            fontWeight: 800
          }}
        >
          <Sparkles size={14} color="#f43f5e" />
          <span>EDITORIAL MONOGRAPH</span>
        </div>
      </div>

      {/* Chapters Scrubber */}
      <div className="ed-subnav-items">
        {navItems.map((item) => {
          const isActive = activeTab === item.id.replace('editorial-', '');
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`ed-subnav-btn ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Return to 3D Tour CTA */}
      <button
        onClick={onReturnToTour}
        className="glass-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 16px',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)',
          color: '#f43f5e',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          background: 'rgba(244, 63, 94, 0.08)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontWeight: 600
        }}
        title="Return to the Interactive 3D Mall Tour"
      >
        <ArrowUp size={13} />
        <span>3D Tour</span>
      </button>
    </div>
  );
};
