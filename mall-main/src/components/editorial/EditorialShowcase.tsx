import React, { useEffect, useRef } from 'react';
import './editorial.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EditorialNav } from './EditorialNav';
import { EditorialMallExperiences } from './EditorialMallExperiences';
import { EditorialShopping } from './EditorialShopping';
import { EditorialDining } from './EditorialDining';
import { EditorialEntertainment } from './EditorialEntertainment';
import { EditorialEvents } from './EditorialEvents';
import { EditorialLifestyleGallery } from './EditorialLifestyleGallery';
import { EditorialServices } from './EditorialServices';
import { Footer } from '../Footer';

gsap.registerPlugin(ScrollTrigger);

interface EditorialShowcaseProps {
  onReturnToTour: () => void;
  onNavigateToSection?: (index: number) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({
  onReturnToTour,
  onNavigateToSection = () => {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // EFFECT 1: CLICK-TO-LIFT IMAGE ANIMATION (INTERACTIVE ACCORDION LIFT)
  // =========================================================================
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Don't trigger image lift if clicking interactive controls, links, or subnav
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.ed-subnav') ||
        target.closest('input')
      ) {
        return;
      }

      // Find the card or image target
      const card = target.closest('.ed-card, .ed-lift-target') as HTMLElement | null;

      if (card) {
        const isAlreadyLifted = card.classList.contains('is-lifted');

        // Reset any other lifted cards across the section smoothly
        root.querySelectorAll('.is-lifted').forEach((el) => {
          if (el !== card) {
            el.classList.remove('is-lifted');
          }
        });

        // Toggle the clicked card
        if (isAlreadyLifted) {
          card.classList.remove('is-lifted');
        } else {
          card.classList.add('is-lifted');
        }
      } else {
        // Clicked on background: return all cards smoothly to baseline
        root.querySelectorAll('.is-lifted').forEach((el) => {
          el.classList.remove('is-lifted');
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        root.querySelectorAll('.is-lifted').forEach((el) => {
          el.classList.remove('is-lifted');
        });
      }
    };

    root.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      root.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // =========================================================================
  // EFFECT 2: FULL-SCREEN SECTION TAKEOVER / OVERLAY SCROLL
  // Clean, 100% bright, solid slide override with ZERO black/dark dimming
  // =========================================================================
  useEffect(() => {
    // Pure clean slide takeover: each slide stays 100% bright with no dark bleed
  }, []);

  return (
    <div
      id="editorial-monograph-root"
      ref={containerRef}
      className="editorial-root"
    >
      {/* Editorial Sticky Subnav Scrubber — Pinned smoothly under navbar */}
      <EditorialNav onReturnToTour={onReturnToTour} />

      {/* =================================================================
          FULL-SCREEN SECTION TAKEOVER PANELS (MIN-HEIGHT 100VH EACH)
          ================================================================= */}

      {/* Slide 01: Atrium Architecture & Spatial Installations */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 11,
          background: 'linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)'
        }}
      >
        <EditorialMallExperiences />
      </div>

      {/* Slide 02: Fashion Colonnade & Haute Couture Lookbook */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 12,
          background: 'linear-gradient(180deg, #f0f9ff 0%, #faf5ff 50%, #f5f3ff 100%)'
        }}
      >
        <EditorialShopping />
      </div>

      {/* Slide 03: The Gastronomy Atelier & Culinary Salon */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 13,
          background: 'linear-gradient(180deg, #f5f3ff 0%, #fff7ed 50%, #fff1f2 100%)'
        }}
      >
        <EditorialDining />
      </div>

      {/* Slide 04: The Entertainment Pavilion & Immersive Cinema Salon */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 14,
          background: 'linear-gradient(180deg, #fff1f2 0%, #f0fdfa 50%, #ecfeff 100%)'
        }}
      >
        <EditorialEntertainment />
      </div>

      {/* Slide 05: Curated Cultural Calendar & Runway Evenings */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 15,
          background: 'linear-gradient(180deg, #ecfeff 0%, #f5f3ff 50%, #ede9fe 100%)'
        }}
      >
        <EditorialEvents />
      </div>

      {/* Slide 06: The Lifestyle Lookbook & Asymmetric Floating Gallery */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 16,
          background: 'linear-gradient(180deg, #ede9fe 0%, #fdf2f8 50%, #fff7ed 100%)'
        }}
      >
        <EditorialLifestyleGallery />
      </div>

      {/* Slide 07: Curated Guest Services & VIP Amenities */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 17,
          background: 'linear-gradient(180deg, #fff7ed 0%, #f8fafc 100%)'
        }}
      >
        <EditorialServices />
      </div>

      {/* Slide 08: Preserved City Mall Footer in Light Theme */}
      <div
        className="ed-slide-deck-item"
        style={{
          zIndex: 18,
          background: '#f8fafc'
        }}
      >
        <Footer onNavigateToSection={onNavigateToSection} isLight={true} />
      </div>
    </div>
  );
};
