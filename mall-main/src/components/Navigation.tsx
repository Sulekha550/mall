import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Menu, X, Compass, MapPin } from 'lucide-react';
import { SECTIONS_METADATA, MALL_CONFIG } from '../data/mallConfig';
import { audioAmbiance } from '../utils/audioAmbiance';

interface NavigationProps {
  activeSectionIndex: number;
  onNavigateToSection: (index: number) => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSectionIndex,
  onNavigateToSection,
  isNightMode,
  onToggleNightMode
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const state = audioAmbiance.toggle();
    setIsAudioPlaying(state);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: isScrolled ? '12px 24px' : '20px 32px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? isNightMode
              ? 'rgba(8, 10, 14, 0.88)'
              : 'rgba(240, 244, 248, 0.88)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? isNightMode
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.08)'
            : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo & Wordmark */}
        <div
          onClick={() => onNavigateToSection(0)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37, #937119)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              color: '#0a0d12',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}
          >
            A
          </div>
          <div>
            <div
              className="font-cinzel text-gold-gradient"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                lineHeight: 1.1
              }}
            >
              {MALL_CONFIG.mallName}
            </div>
            <div
              className="font-grotesk"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: isNightMode ? '#94a3b8' : '#475569',
                textTransform: 'uppercase'
              }}
            >
              Architectural Mall Experience
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 4
          }}
          className="desktop-nav"
        >
          {SECTIONS_METADATA.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigateToSection(idx)}
                style={{
                  background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid transparent',
                  color: isActive ? '#f8fafc' : isNightMode ? '#94a3b8' : '#475569',
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = isNightMode ? '#94a3b8' : '#475569';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {sec.shortLabel.split(' ')[1]}
              </button>
            );
          })}
        </nav>

        {/* Interactive Utility Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleNightMode}
            title={isNightMode ? 'Switch to Day / Golden Hour' : 'Switch to Night Lighting'}
            className="glass-pill"
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isNightMode ? '#fde047' : '#0284c7'
            }}
          >
            {isNightMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Soundscape Audio Ambiance Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isAudioPlaying ? 'Mute Architectural Ambiance' : 'Play Ambient Soundscape'}
            className="glass-pill"
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isAudioPlaying ? '#d4af37' : isNightMode ? '#94a3b8' : '#475569'
            }}
          >
            {isAudioPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Directions / Plan Visit Shortcut */}
          <button
            onClick={() => onNavigateToSection(8)}
            className="btn-primary"
            style={{
              padding: '7px 16px',
              fontSize: '0.75rem',
              display: 'none'
            }}
            id="nav-directions-btn"
          >
            <MapPin size={14} />
            <span>Visit</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="glass-pill mobile-menu-btn"
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(8, 10, 14, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 28px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <span
              className="font-grotesk"
              style={{ fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.2em' }}
            >
              EXPLORE DESTINATIONS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SECTIONS_METADATA.map((sec, idx) => (
              <div
                key={sec.id}
                onClick={() => {
                  onNavigateToSection(idx);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: activeSectionIndex === idx ? '#d4af37' : '#f1f5f9'
                }}
              >
                <span
                  className="font-cinzel"
                  style={{ fontSize: '1.2rem', letterSpacing: '0.05em' }}
                >
                  {sec.name}
                </span>
                <span
                  className="font-grotesk"
                  style={{ fontSize: '0.8rem', color: '#64748b' }}
                >
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <button
              onClick={() => {
                handleAudioToggle();
              }}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isAudioPlaying ? 'Ambiance On' : 'Play Audio'}</span>
            </button>
            <button
              onClick={() => {
                onToggleNightMode();
              }}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              {isNightMode ? <Sun size={16} /> : <Moon size={16} />}
              <span>{isNightMode ? 'Day Mode' : 'Night Mode'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive nav visibility */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          #nav-directions-btn { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

