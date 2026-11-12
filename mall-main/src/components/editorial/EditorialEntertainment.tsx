import React from 'react';
import { Film, Gamepad2, Sparkles, Smile, Crown, PartyPopper, Volume2 } from 'lucide-react';

const FALLBACK_ENTERTAINMENT = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';

export const EditorialEntertainment: React.FC = () => {
  return (
    <section
      id="editorial-entertainment"
      style={{
        position: 'relative',
        padding: '72px 24px 80px',
        maxWidth: 1400,
        margin: '0 auto',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Background Soft Glows — Fresh Turquoise & Mint */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.16) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: 52 }}>
          <div
            className="ed-section-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(250, 204, 21, 0.12) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#f43f5e'
            }}
          >
            <Sparkles size={14} color="#f43f5e" />
            <span>04 · The Entertainment Pavilion & Immersive Cinema Salon</span>
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
                  color: '#1c1317',
                  marginBottom: 12
                }}
              >
                CINEMATIC WORLDS & PLAY
              </h2>
              <p className="ed-section-subtitle" style={{ margin: 0 }}>
                An overlapping editorial composition showcasing state-of-the-art IMAX® laser projection,
                immersive next-gen e-sports arenas, whimsical play worlds, and VIP private salons.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#f43f5e',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                boxShadow: '0 4px 15px rgba(244, 63, 94, 0.1)',
                fontWeight: 700
              }}
            >
              LEVEL 2 ENTERTAINMENT WING
            </div>
          </div>
        </div>

        {/* =================================================================
            UPPER TIER: CINEMA & GAMING OVERLAPPING COMPOSITION
            ================================================================= */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: 42
          }}
        >
          {/* Item 1: INOX Cinemas Multiplex (Large 16:9 Master Landscape) */}
          <div
            className="ed-card ed-lift-target"
            style={{
              flex: '1 1 560px',
              maxWidth: 720,
              margin: '0 12px 28px',
              border: '1px solid rgba(20, 184, 166, 0.35)',
              background: '#ffffff',
              boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-16-9" style={{ overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="City Mall INOX Cinemas 3D Architectural Model"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ENTERTAINMENT; }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(13, 148, 136, 0.35)',
                    color: '#0f766e',
                    fontWeight: 700
                  }}
                >
                  <Film size={12} />
                  INOX CINEMAS · INSIGNIA VIP
                </span>
              </div>
            </div>

            <div style={{ padding: '26px 24px', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Volume2 size={13} color="#0f766e" />
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#0f766e', letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>
                  Dolby Atmos 64-Channel Spatial Audio & 4K Laser Multiplex
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 8, fontWeight: 800 }}>
                INOX Cinemas — Multiplex & VIP Insignia Suites
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Multi-screen blockbuster cinema halls featuring Insignia luxury recliner auditoriums,
                curated gourmet live kitchen service, crisp 4K Laser projection, and immersive Dolby Atmos surround sound.
              </p>
            </div>
          </div>

          {/* Item 2: Gaming & VR */}
          <div
            className="ed-card ed-lift-target"
            style={{
              flex: '1 1 380px',
              maxWidth: 480,
              margin: '0 12px 28px',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              background: '#ffffff',
              boxShadow: '0 18px 45px rgba(6, 182, 212, 0.1)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-4-5" style={{ overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Nexus VR Arena Next-Gen Gaming"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ENTERTAINMENT; }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(6, 182, 212, 0.35)',
                    color: '#0891b2',
                    fontWeight: 700
                  }}
                >
                  <Gamepad2 size={12} />
                  NEXUS VR ARENA
                </span>
              </div>
            </div>

            <div style={{ padding: '24px 22px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#0891b2', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                Zero-Latency Simulation
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 8, fontWeight: 800 }}>
                Quantum VR Dome & E-Sports
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Full-body haptic feedback suits and free-roam holographic multiplayer adventures engineered for thrill-seekers.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================================
            LOWER TIER: KIDS ENTERTAINMENT, LUXURY PRIVÉ, & CELEBRATIONS TRIO
            ================================================================= */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            justifyContent: 'center',
            position: 'relative',
            gap: 24
          }}
        >
          {/* Item 3: Kids Entertainment (Creative Play World) */}
          <div
            className="ed-card ed-tilt-card ed-tilt-left-1"
            style={{
              flex: '1 1 340px',
              maxWidth: 410,
              border: '1px solid rgba(13, 148, 136, 0.3)',
              background: '#ffffff',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-3-4" style={{ overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Children's Creative Art Play Area"
                className="ed-img"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E';
                }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(13, 148, 136, 0.35)',
                    color: '#0f766e',
                    fontWeight: 700
                  }}
                >
                  <Smile size={12} />
                  PETIT ATELIER
                </span>
              </div>
            </div>

            <div style={{ padding: '22px 20px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#0f766e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                Sensory & Architectural Play
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 8, fontWeight: 800 }}>
                The Wonder Forest
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Montessori-inspired wooden climbing sculptures, interactive kinetic sand, and safe nursery staff.
              </p>
            </div>
          </div>

          {/* Item 4: Luxury Experiences (VIP Penthouse Privé, overlapping with higher z-index) */}
          <div
            className="ed-card ed-tilt-card ed-tilt-right-1"
            style={{
              flex: '1 1 340px',
              maxWidth: 410,
              border: '1px solid rgba(168, 85, 247, 0.35)',
              background: '#ffffff',
              boxShadow: '0 22px 50px rgba(168, 85, 247, 0.12)',
              position: 'relative',
              zIndex: 4
            }}
          >
            <div className="ed-ratio-3-4" style={{ overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Luxury Penthouse VIP Salon"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ENTERTAINMENT; }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    color: '#7e22ce',
                    fontWeight: 700
                  }}
                >
                  <Crown size={12} />
                  PRIVÉ SUITES
                </span>
              </div>
            </div>

            <div style={{ padding: '22px 20px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#7e22ce', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                Private Members Privileges
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 8, fontWeight: 800 }}>
                Penthouse Champagne Salon
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Dedicated styling directors, private fitting suites, vintage Dom Pérignon service, and discreet subterranean exit.
              </p>
            </div>
          </div>

          {/* Item 5: Events & Celebrations (Live Performance) */}
          <div
            className="ed-card ed-tilt-card ed-tilt-left-1"
            style={{
              flex: '1 1 340px',
              maxWidth: 410,
              border: '1px solid rgba(244, 63, 94, 0.3)',
              background: '#ffffff',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div className="ed-ratio-3-4" style={{ overflow: 'hidden' }}>
              <img
                src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23f5f3ef"/%3E%3C/svg%3E'}
                alt="Grand Atrium Celebrations and Music"
                className="ed-img"
                onError={(e) => { e.currentTarget.src = FALLBACK_ENTERTAINMENT; }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className="ed-pill"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(244, 63, 94, 0.35)',
                    color: '#e11d48',
                    fontWeight: 700
                  }}
                >
                  <PartyPopper size={12} />
                  GRAND STAGE
                </span>
              </div>
            </div>

            <div style={{ padding: '22px 20px', background: '#ffffff' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#e11d48', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                Live Atrium Stages
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.25, marginBottom: 8, fontWeight: 800 }}>
                Celebrations & Acoustic Galas
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Curated weekends featuring international aerialists, classical chamber quartets, and immersive kinetic light shows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
