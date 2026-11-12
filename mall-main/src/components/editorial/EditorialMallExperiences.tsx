import React from 'react';
import { Sparkles, Eye, Compass, Box, Maximize2 } from 'lucide-react';

const FALLBACK_ATRIUM = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

export const EditorialMallExperiences: React.FC = () => {
  return (
    <section
      id="editorial-atrium"
      style={{
        position: 'relative',
        padding: '64px 24px 60px',
        maxWidth: 1380,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glow — Champagne White & Crystal Blue */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.16) 0%, rgba(254, 252, 232, 0.4) 60%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Editorial Header */}
        <div style={{ marginBottom: 44 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(250, 204, 21, 0.12) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#f43f5e'
            }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <span>01 · Contemporary Architecture & Installations</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 20
            }}
          >
            <div>
              <h2
                className="ed-section-title"
                style={{
                  color: '#0f172a',
                  marginBottom: 12
                }}
              >
                THE ARCHITECTURAL ATRIUM
              </h2>
              <p className="ed-section-subtitle" style={{ margin: 0 }}>
                A cathedral of natural light where sculptural cantilevered terraces, cascading glass facades,
                and kinetic luminous art redefine contemporary international retail destinations.
              </p>
            </div>

            {/* Editorial Spec Callout */}
            <div
              style={{
                display: 'flex',
                gap: 28,
                padding: '14px 22px',
                borderRadius: 16,
                background: '#ffffff',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#f43f5e', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Ceiling Span
                </div>
                <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0f172a' }}>
                  38.5 M
                </div>
              </div>
              <div style={{ width: 1, background: 'rgba(15, 23, 42, 0.1)' }} />
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#f43f5e', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Natural Light
                </div>
                <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0f172a' }}>
                  94.2 %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Large 16:9 Hero Feature Visual Composition */}
        <div
          className="ed-card ed-ratio-16-9"
          style={{
            marginBottom: 28,
            border: '1px solid rgba(250, 204, 21, 0.35)',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1), 0 0 40px rgba(250, 204, 21, 0.15)',
            background: '#ffffff'
          }}
        >
          <img
            src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
            alt="Futuristic International Mall Architecture & Skylight Atrium"
            className="ed-img"
            onError={(e) => { e.currentTarget.src = FALLBACK_ATRIUM; }}
          />
          <div className="ed-scrim-bottom" />

          {/* Floating Editorial Narrative Badge */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              display: 'flex',
              gap: 10,
              alignItems: 'center'
            }}
          >
            <span
              className="ed-pill"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(244, 63, 94, 0.5)',
                color: '#f43f5e',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                fontWeight: 700
              }}
            >
              <Box size={13} />
              Grand Central Oculus · Level 0–3
            </span>
            <span
              className="ed-pill"
              style={{
                background: 'rgba(254, 252, 232, 0.95)',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                color: '#854d0e',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                fontWeight: 700
              }}
            >
              Curated Architectural Edition
            </span>
          </div>

          {/* Bottom Narrative Strip */}
          <div
            style={{
              position: 'absolute',
              bottom: 28,
              left: 28,
              right: 28,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 16
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: '#facc15',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                  fontWeight: 700
                }}
              >
                Volumetric Mastery
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                Illuminated Tri-Level Spatial Horizon
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#f43f5e',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '8px 18px',
                borderRadius: 9999,
                border: '1px solid rgba(244, 63, 94, 0.4)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                fontWeight: 700
              }}
            >
              <span>Explore Spatial Acoustics</span>
              <Maximize2 size={14} color="#f43f5e" />
            </div>
          </div>
        </div>

        {/* 2. Asymmetric Twin Editorial Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            alignItems: 'stretch'
          }}
        >
          {/* Left Feature */}
          <div
            className="ed-card"
            style={{
              padding: 24,
              border: '1px solid rgba(244, 63, 94, 0.25)',
              background: '#ffffff',
              boxShadow: '0 12px 35px rgba(244, 63, 94, 0.06)'
            }}
          >
            <div className="ed-ratio-16-9" style={{ marginBottom: 18, overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Kinetic Light Sculpture and Modern Event Installations"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ATRIUM; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    color: '#f43f5e',
                    fontWeight: 700
                  }}
                >
                  Permanent Installation · Lumina Ring
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Eye size={14} color="#f43f5e" />
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#f43f5e', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                Spatial Art Program
              </span>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: '#0f172a',
                letterSpacing: '0.04em',
                marginBottom: 8,
                fontWeight: 800
              }}
            >
              The Suspended Kinetic Helios
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              Designed by international light architects, 420 motor-driven frosted glass rings gently oscillate
              to simulate celestial tides throughout the day, synchronised with natural sunlight angles.
            </p>
          </div>

          {/* Right Feature */}
          <div
            className="ed-card"
            style={{
              padding: 24,
              border: '1px solid rgba(250, 204, 21, 0.4)',
              background: '#ffffff',
              boxShadow: '0 12px 35px rgba(245, 158, 11, 0.06)'
            }}
          >
            <div className="ed-ratio-16-9" style={{ marginBottom: 18, overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Contemporary Luxury Shopping Pavilion Promenade"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ATRIUM; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(250, 204, 21, 0.45)',
                    color: '#b45309',
                    fontWeight: 700
                  }}
                >
                  Curvilinear Mezzanines · Level 1 & 2
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Compass size={14} color="#f59e0b" />
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#f59e0b', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                Circulation Architecture
              </span>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: '#0f172a',
                letterSpacing: '0.04em',
                marginBottom: 8,
                fontWeight: 800
              }}
            >
              Curvilinear Observation Bridges
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              Seamless glass balustrades frame panoramic vistas over luxury boutiques below, leading visitors
              through floating skywalks designed with organic marble pathways and micro-acoustic dampening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
