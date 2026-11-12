import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MallCanvas } from '../three/MallCanvas';
import { CinematicHUD } from '../components/CinematicHUD';
import { CinematicOverlay } from '../components/CinematicOverlay';
import { LoadingScreen } from '../components/LoadingScreen';
import { Footer } from '../components/Footer';
import { useCinematicScroll } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { HotspotData } from '../types';
import {
  Compass,
  ShoppingBag,
  UtensilsCrossed,
  Film,
  Sparkles,
  Calendar,
  ArrowRight,
  Layers,
  ArrowUpRight,
  MapPin,
  Clock,
  Car,
  ChevronDown,
  CreditCard
} from 'lucide-react';
import { ThreeDTiltCard } from '../components/3d/ThreeDTiltCard';
import { ALL_MALL_BRANDS } from '../data/mallBrandsData';

const HERO_BRAND_IDS = [
  'brand-tanishq',
  'brand-levis',
  'brand-louis-philippe',
  'brand-allen-solly',
  'brand-puma',
  'brand-adidas',
  'brand-titan-world',
  'brand-inox-cinemas'
];

const SHOWCASE_BRAND_IDS = [
  'brand-tanishq',
  'brand-levis',
  'brand-louis-philippe',
  'brand-puma',
  'brand-adidas',
  'brand-titan-world'
];

// Track once-per-page-load preloader & top-to-bottom entrance
let hasCompletedPageLoadEntry = false;

interface HomePageProps {
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onOpenDirectory: () => void;
  onOpenVisit: () => void;
  onSelectHotspot: (hotspot: HotspotData) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isNightMode,
  onToggleNightMode,
  onOpenDirectory,
  onOpenVisit,
  onSelectHotspot
}) => {
  const [isLoading, setIsLoading] = useState(() => !hasCompletedPageLoadEntry);
  const [entrancePhase, setEntrancePhase] = useState<'waiting' | 'entering' | 'settled'>(() =>
    hasCompletedPageLoadEntry ? 'settled' : 'waiting'
  );
  const entranceWaiting = entrancePhase === 'waiting';
  const entranceActive = entrancePhase === 'entering';
  const entranceComplete = entrancePhase === 'settled';
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [show3DTour, setShow3DTour] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleRevealStart = useCallback(() => {
    hasCompletedPageLoadEntry = true;
    setEntrancePhase('entering');
    window.dispatchEvent(new CustomEvent('citymall:preloader-reveal'));

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      setEntrancePhase('settled');
      window.dispatchEvent(new CustomEvent('citymall:homepage-entrance-end'));
    }, 1580);
  }, []);

  const handlePreloaderLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('citymall:3d-tour-toggle', { detail: show3DTour }));
    return () => {
      window.dispatchEvent(new CustomEvent('citymall:3d-tour-toggle', { detail: false }));
    };
  }, [show3DTour]);

  useEffect(() => {
    const handleExit3DTour = () => setShow3DTour(false);
    window.addEventListener('citymall:exit-3d-tour', handleExit3DTour);
    return () => window.removeEventListener('citymall:exit-3d-tour', handleExit3DTour);
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (heroParallaxRafRef.current) cancelAnimationFrame(heroParallaxRafRef.current);
    };
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const heroParallaxRafRef = useRef<number | null>(null);
  const stackRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeFloor, setActiveFloor] = useState(0);
  const reducedMotion = useReducedMotion();
  const { progressRef, uiState, jumpToProgress } = useCinematicScroll(scrollContainerRef);

  const heroFeaturedBrands = HERO_BRAND_IDS.map((id) => ALL_MALL_BRANDS.find((b) => b.id === id)).filter(
    (b): b is NonNullable<typeof b> => Boolean(b)
  );

  const floorShowcaseBrands = SHOWCASE_BRAND_IDS.map((id) => ALL_MALL_BRANDS.find((b) => b.id === id)).filter(
    (b): b is NonNullable<typeof b> => Boolean(b)
  );

  const floorNavItems = [
    { id: 'section-arrival', label: '01 · Arrival' },
    { id: 'section-shopping', label: '02 · Brands' },
    { id: 'section-discover', label: '03 · Discover' },
    { id: 'section-dining', label: '04 · Dining' },
    { id: 'section-entertainment', label: '05 · Cinema' },
    { id: 'section-experiences', label: '06 · Family' },
    { id: 'section-events', label: '07 · Events' },
    { id: 'section-visit', label: '08 · Visit' }
  ];

  const scrollToFloor = useCallback((idx: number) => {
    const vh = window.innerHeight || 1;
    window.scrollTo({
      top: idx * vh,
      behavior: 'smooth'
    });
  }, []);

  // Full Section Override Stacking Depth & Active Floor Tracking
  useEffect(() => {
    if (show3DTour) return;
    let rafId: number | null = null;

    const updateStackDepth = () => {
      rafId = null;
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY;

      if (heroGridRef.current && !reducedMotion) {
        const clamped = Math.min(500, Math.max(0, scrollY));
        heroGridRef.current.style.setProperty('--hero-scroll-y', clamped.toFixed(1));
      }

      const currentIdx = Math.min(
        floorNavItems.length - 1,
        Math.max(0, Math.round(scrollY / vh))
      );
      setActiveFloor((prev) => (prev !== currentIdx ? currentIdx : prev));

      if (!reducedMotion) {
        stackRefs.current.forEach((sectionEl, idx) => {
          if (!sectionEl) return;
          const startY = idx * vh;
          const cover = Math.min(1, Math.max(0, (scrollY - startY) / vh));
          sectionEl.style.setProperty('--cover-progress', cover.toFixed(3));
        });
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateStackDepth);
    };

    updateStackDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, show3DTour, floorNavItems.length]);

  // Smooth 60 FPS cursor depth parallax across hero background layers, text & images
  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (heroParallaxRafRef.current) cancelAnimationFrame(heroParallaxRafRef.current);
      heroParallaxRafRef.current = requestAnimationFrame(() => {
        const hx = nx.toFixed(3);
        const hy = ny.toFixed(3);
        if (stackRefs.current[0]) {
          stackRefs.current[0].style.setProperty('--hx', hx);
          stackRefs.current[0].style.setProperty('--hy', hy);
        }
        if (heroGridRef.current) {
          heroGridRef.current.style.setProperty('--hx', hx);
          heroGridRef.current.style.setProperty('--hy', hy);
        }
      });
    },
    [reducedMotion]
  );

  const handleHeroMouseLeave = useCallback(() => {
    if (heroParallaxRafRef.current) cancelAnimationFrame(heroParallaxRafRef.current);
    if (stackRefs.current[0]) {
      stackRefs.current[0].style.setProperty('--hx', '0');
      stackRefs.current[0].style.setProperty('--hy', '0');
    }
    if (heroGridRef.current) {
      heroGridRef.current.style.setProperty('--hx', '0');
      heroGridRef.current.style.setProperty('--hy', '0');
    }
  }, []);

  // IntersectionObserver for gentle, one-shot scroll reveal on homepage sections
  useEffect(() => {
    const targets = document.querySelectorAll('.hp-scroll-reveal');
    if (targets.length === 0) return;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('hp-scroll-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hp-scroll-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion, show3DTour]);

  // Curated pearl & champagne particles distributed cleanly in open background air (8–18s)
  const ambientParticles = [
    { top: '12%', left: '5%', size: 3.5, dur: '11s', delay: '0s', min: 0.16, max: 0.44, pearl: true },
    { top: '10%', left: '34%', size: 4, dur: '14s', delay: '1.4s', min: 0.18, max: 0.46, pearl: false },
    { top: '14%', left: '49%', size: 5, dur: '16s', delay: '0.6s', min: 0.2, max: 0.5, pearl: false },
    { top: '86%', left: '7%', size: 4, dur: '13s', delay: '2.1s', min: 0.16, max: 0.42, pearl: true },
    { top: '90%', left: '28%', size: 3, dur: '17s', delay: '0.9s', min: 0.16, max: 0.4, pearl: false },
    { top: '84%', left: '45%', size: 4.5, dur: '12s', delay: '1.7s', min: 0.2, max: 0.48, pearl: true },
    { top: '15%', left: '72%', size: 4, dur: '15s', delay: '1.1s', min: 0.2, max: 0.5, pearl: false },
    { top: '20%', left: '91%', size: 3.5, dur: '9.5s', delay: '0.4s', min: 0.18, max: 0.46, pearl: true },
    { top: '52%', left: '94%', size: 5, dur: '18s', delay: '2.4s', min: 0.18, max: 0.48, pearl: false },
    { top: '76%', left: '89%', size: 4, dur: '13.5s', delay: '1.3s', min: 0.18, max: 0.44, pearl: true },
    { top: '11%', left: '61%', size: 3, dur: '8.5s', delay: '2.6s', min: 0.16, max: 0.42, pearl: false },
    { top: '44%', left: '47%', size: 4, dur: '15.5s', delay: '0.8s', min: 0.15, max: 0.38, pearl: true }
  ];

  // Jump to specific progress if passed in URL query e.g. /?progress=0.54
  useEffect(() => {
    const p = searchParams.get('progress');
    if (p !== null) {
      const val = parseFloat(p);
      if (!isNaN(val)) {
        setShow3DTour(true);
        setTimeout(() => {
          jumpToProgress(val);
        }, 150);
      }
    }
  }, [searchParams, jumpToProgress]);

  // Listen for direct 3D tour checkpoint jumps dispatched from the navbar
  useEffect(() => {
    const handleJumpEvent = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        setShow3DTour(true);
        jumpToProgress(customEvent.detail);
      }
    };
    window.addEventListener('citymall:jump-progress', handleJumpEvent);
    return () => window.removeEventListener('citymall:jump-progress', handleJumpEvent);
  }, [jumpToProgress]);

  // Primary checkpoint action
  const handlePrimaryCta = useCallback(
    (checkpointId: string) => {
      switch (checkpointId) {
        case 'exterior':
          jumpToProgress(0.16);
          break;
        case 'entrance':
          jumpToProgress(0.28);
          break;
        case 'ground':
          navigate('/shopping');
          break;
        case 'atrium':
          navigate('/discover');
          break;
        case 'firstfloor':
          navigate('/shopping');
          break;
        case 'escalator':
          jumpToProgress(0.76);
          break;
        case 'foodcourt':
          navigate('/dining');
          break;
        case 'cinema':
          navigate('/entertainment');
          break;
        case 'panoramic':
          onOpenVisit();
          break;
        default:
          jumpToProgress(Math.min(1, progressRef.current + 0.12));
          break;
      }
    },
    [jumpToProgress, progressRef, navigate, onOpenVisit]
  );

  // Secondary checkpoint action
  const handleSecondaryCta = useCallback(
    (checkpointId: string) => {
      if (checkpointId === 'exterior' || checkpointId === 'panoramic') {
        onOpenDirectory();
      } else if (checkpointId === 'luxury') {
        navigate('/shopping');
      } else {
        onOpenDirectory();
      }
    },
    [onOpenDirectory, navigate]
  );

  // Sections 2–7: Stacked Full-Screen Mall Floors (Brands & Flagships prioritized first)
  const mallFloors = [
    {
      id: 'section-shopping',
      stackIndex: 1,
      floorLabel: 'LEVELS 0 & 1 · FLAGSHIP BRANDS & COLONNADE',
      title: '27 Flagship Brands',
      subtitle: 'International Couture, Fine Jewellery, Sportswear & Dining Houses',
      description:
        "Discover City Mall's curated roster of signature brands — explore Tanishq, Levi's, Louis Philippe, Allen Solly, Puma, Adidas, Titan World, Skechers, INOX, and Barbeque Nation.",
      highlights: ['Tanishq & Titan World', "Levi's & Louis Philippe", 'Puma, Adidas & Skechers'],
      route: '/shopping#brands-showcase',
      ctaText: 'Explore All 27 Brands',
      secondaryDirectory: true,
      accent: '#d97706',
      bgLight: 'linear-gradient(135deg, rgba(255, 245, 247, 0.14) 0%, rgba(255, 250, 244, 0.12) 52%, rgba(253, 242, 248, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(25, 14, 22, 0.24) 0%, rgba(32, 18, 26, 0.22) 100%)',
      reverse: false,
      mainImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'Designer Couture Salon & Glass Storefronts',
      insetImage: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'SEASONAL RUNWAY',
      insetTitle: 'Ready-to-Wear Avenues',
      accentImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'BOUTIQUE FACADE',
      accentTitle: 'Flagship Display Gallery',
      variantClass: 'hp-stage-variant-boutique'
    },
    {
      id: 'section-discover',
      stackIndex: 2,
      floorLabel: 'FLOOR 00 · ARCHITECTURAL DISCOVERY',
      title: 'Discover the Mall',
      subtitle: 'Sunlit 38.5m Glass Oculus & Marble Avenues',
      description:
        'Step beneath our soaring curved skylight atrium featuring the Lumina Helios kinetic chandelier, travertine colonnades, and sunlit skybridges.',
      highlights: ['38.5m Glass Oculus', 'Kinetic Art Atrium', 'Panoramic Skybridges'],
      route: '/discover',
      ctaText: 'Explore Architecture',
      accent: '#e11d48',
      bgLight: 'linear-gradient(135deg, rgba(253, 252, 249, 0.14) 0%, rgba(254, 246, 236, 0.12) 52%, rgba(255, 242, 244, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(23, 14, 21, 0.24) 0%, rgba(30, 19, 27, 0.22) 100%)',
      reverse: true,
      mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'Central Rotunda & Curved Glass Balconies',
      insetImage: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'SOLAR SKYLIGHT',
      insetTitle: 'Natural Daylight Concourse',
      accentImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'INDOOR GREENERY',
      accentTitle: 'Botanical Atrium Oasis',
      variantClass: ''
    },
    {
      id: 'section-dining',
      stackIndex: 3,
      floorLabel: 'LEVEL 2 · GASTRONOMIE TERRACE',
      title: 'Dining & Culinary',
      subtitle: '35+ Fine Dining Salons, Patisseries & Rooftop Lounges',
      description:
        'Savor artisanal global cuisine at Barbeque Nation, Cinnamon, Pizza Hut, KFC, and our twilight skybridge mixology lounges.',
      highlights: ['Barbeque Nation Live Grill', 'French Haute Patisserie', 'Rooftop Sky Lounge'],
      route: '/dining',
      ctaText: 'Explore Dining Salons',
      accent: '#ea580c',
      bgLight: 'linear-gradient(135deg, rgba(255, 250, 243, 0.14) 0%, rgba(255, 242, 228, 0.12) 52%, rgba(255, 245, 247, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(26, 16, 20, 0.24) 0%, rgba(33, 20, 23, 0.22) 100%)',
      reverse: true,
      mainImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'Chandelier Banquet Salon & Tasting Promenade',
      insetImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'ARTISAN ATELIER',
      insetTitle: 'Gourmet Patisserie',
      accentImage: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'SUNLIT CAFE',
      accentTitle: 'Skybridge Coffee Lounge',
      variantClass: 'hp-stage-variant-dining'
    },
    {
      id: 'section-entertainment',
      stackIndex: 4,
      floorLabel: 'LEVEL 2 · CINEMA & GAMING WING',
      title: 'Entertainment',
      subtitle: 'INOX Insignia 4K Laser IMAX® & Quantum VR',
      description:
        'Experience dual 4K laser projection, 128-channel Dolby Atmos acoustics, heated Italian leather recliners, and interactive gaming realms.',
      highlights: ['INOX Insignia VIP Suites', '4K Laser IMAX®', 'Quantum VR Arena'],
      route: '/entertainment',
      ctaText: 'Discover Cinema & VR',
      accent: '#be123c',
      bgLight: 'linear-gradient(135deg, rgba(250, 247, 255, 0.14) 0%, rgba(255, 243, 246, 0.12) 52%, rgba(254, 249, 238, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(21, 14, 28, 0.24) 0%, rgba(29, 17, 34, 0.22) 100%)',
      reverse: false,
      mainImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'INOX Insignia VIP Multiplex Auditorium',
      insetImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'VIP LOUNGE',
      insetTitle: 'Premiere Champagne Bar',
      accentImage: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'DIGITAL REALM',
      accentTitle: 'Quantum VR Arena',
      variantClass: 'hp-stage-variant-cinema'
    },
    {
      id: 'section-experiences',
      stackIndex: 5,
      floorLabel: 'VIP SANCTUARY · FAMILY & LIFESTYLE',
      title: 'Family & Experiences',
      subtitle: 'Wonder Forest, Looks Salon & White-Glove Concierge',
      description:
        'Dedicated family relaxation lounges, sensory kids discovery spaces, Looks Salon grooming rituals, and hands-free trunk bag delivery.',
      highlights: ['Wonder Forest Kids Zone', 'Looks Salon & Spa', 'Hands-Free Shopping Butler'],
      route: '/experiences',
      ctaText: 'Explore VIP Services',
      accent: '#9333ea',
      bgLight: 'linear-gradient(135deg, rgba(255, 249, 251, 0.14) 0%, rgba(245, 243, 255, 0.12) 52%, rgba(254, 249, 235, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(22, 15, 29, 0.24) 0%, rgba(29, 20, 36, 0.22) 100%)',
      reverse: true,
      mainImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'Effortless Family Shopping & Lifestyle Promenades',
      insetImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'BEAUTY SANCTUARY',
      insetTitle: 'Looks Salon & Wellness',
      accentImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'BOTANICAL LOUNGE',
      accentTitle: 'Indoor Garden Retreat',
      variantClass: 'hp-stage-variant-garden'
    },
    {
      id: 'section-events',
      stackIndex: 6,
      floorLabel: 'GRAND ROTUNDA · SEASONAL CALENDAR',
      title: 'Events & Galas',
      subtitle: 'International Fashion Weeks & Live Atrium Symphonies',
      description:
        'Experience 360-degree couture runway reveals, chamber string evenings beneath the Oculus, and curated seasonal art exhibitions.',
      highlights: ['360° Couture Runways', 'Chamber Symphony Nights', 'Lumina Light Festival'],
      route: '/events',
      ctaText: 'View Events Calendar',
      accent: '#db2777',
      bgLight: 'linear-gradient(135deg, rgba(255, 245, 245, 0.14) 0%, rgba(255, 248, 235, 0.12) 54%, rgba(253, 244, 255, 0.14) 100%)',
      bgDark: 'linear-gradient(135deg, rgba(28, 14, 24, 0.24) 0%, rgba(36, 19, 30, 0.22) 100%)',
      reverse: false,
      mainImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop',
      mainCaption: 'Grand Atrium Celebrations & Runway Galas',
      insetImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
      insetTag: 'CULTURAL SALON',
      insetTitle: 'Autumn Couture Showcase',
      accentImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
      accentTag: 'LIGHT FESTIVAL',
      accentTitle: 'Interactive Atrium Arts',
      variantClass: 'hp-stage-variant-events'
    }
  ];

  return (
    <div
      className={`hp-anim-bg ${entranceWaiting ? 'hp-entrance-waiting' : ''} ${entranceActive ? 'hp-entrance-active' : ''
        } ${entranceComplete ? 'hp-entrance-complete' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: '#1c1317',
        overflowX: 'clip'
      }}
    >
      {/* 1. Existing Full-Screen Luxury 1-100 Preloader (UNMODIFIED) */}
      {isLoading && (
        <LoadingScreen
          onRevealStart={handleRevealStart}
          onLoaded={handlePreloaderLoaded}
        />
      )}

      {/* 2. Interactive 3D Spatial Walkthrough Mode OR 8 Full-Screen Stacked Mall Floors */}
      {show3DTour ? (
        <>
          {/* Return to Luxury Overview Toggle */}
          <button
            onClick={() => {
              setShow3DTour(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="glass-pill"
            style={{
              position: 'fixed',
              top: 86,
              right: 28,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#9f1239',
              fontWeight: 700,
              fontSize: '0.8rem',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer'
            }}
          >
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to Luxury Overview</span>
          </button>

          {/* Fixed Fullscreen Real-Time 3D WebGL Canvas */}
          <MallCanvas
            progressRef={progressRef}
            isNightMode={isNightMode}
            reducedMotion={reducedMotion}
            onSelectHotspot={onSelectHotspot}
            isEntranceActive={entranceActive}
          />

          {/* Cinematic Minimal Navigation HUD & Journey Scrubber */}
          <CinematicHUD
            scrollProgress={uiState.scrollProgress}
            activeCheckpoint={uiState.activeCheckpoint}
            onJumpToProgress={jumpToProgress}
            onOpenDirectory={onOpenDirectory}
            onOpenVisit={onOpenVisit}
            isNightMode={isNightMode}
            onToggleNightMode={onToggleNightMode}
            hideTopHeader={true}
            hideBottomScrubber={uiState.scrollProgress > 0.98}
            isEntranceActive={entranceActive}
          />

          {/* Contextual Floating Cinematic Card (only in 3D Tour) */}
          {uiState.scrollProgress < 0.98 && (
            <CinematicOverlay
              activeCheckpoint={uiState.activeCheckpoint}
              checkpointWeight={uiState.checkpointWeight}
              onPrimaryCta={handlePrimaryCta}
              onSecondaryCta={handleSecondaryCta}
              isEntranceActive={entranceActive}
            />
          )}

          {/* Virtual Native Scroll Height Driver for 3D Camera Tour */}
          <div
            ref={scrollContainerRef}
            style={{
              height: '700vh',
              width: '100%',
              pointerEvents: 'none',
              visibility: 'hidden'
            }}
          />
        </>
      ) : (
        <div className="hp-stack-container">
          {/* =================================================================
              SECTION 1 — GRAND ARRIVAL (100vh Sticky Layer, zIndex 10)
              ================================================================= */}
          <section
            id="section-arrival"
            data-stack-index="0"
            ref={(el) => {
              stackRefs.current[0] = el;
            }}
            className="hp-stack-section"
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            style={{
              zIndex: 10,
              background: 'transparent'
            }}
          >
            {/* Transparent Atmospheric Particle Layer Above Persistent Fixed Video */}
            <div aria-hidden="true" className="hp-hero-bg-layer" style={{ background: 'transparent' }}>
              {/* Pearl & Champagne Atmospheric Particles (8–18s) */}
              {!reducedMotion && (
                <div className="hp-bg-layer-particles hp-hero-deco-layer">
                  {ambientParticles.map((p, idx) => (
                    <span
                      key={idx}
                      className={`hp-ambient-particle ${p.pearl ? 'hp-ambient-particle-pearl' : ''}`}
                      style={
                        {
                          top: p.top,
                          left: p.left,
                          width: p.size,
                          height: p.size,
                          '--p-duration': p.dur,
                          '--p-delay': p.delay,
                          '--p-opacity-min': p.min,
                          '--p-opacity-max': p.max
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="hp-stack-cover-scrim" aria-hidden="true" />
            <div className="hp-stack-inner">
              <div
                style={{
                  position: 'relative',
                  padding: '80px 56px 24px 36px',
                  maxWidth: 1440,
                  width: '100%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >

                {/* Two-Column Luxury Editorial Layout */}
                <div
                  ref={heroGridRef}
                  className="hp-luxury-hero-grid"
                  style={{ width: '100%', position: 'relative', zIndex: 1 }}
                >
                  {/* Left Column: Editorial Mall Typography, Shopping Highlights & Actions */}
                  <div className={`hp-parallax-left hp-hero-text-shield ${isNightMode ? 'hp-hero-text-shield-dark' : ''}`}>
                    {/* Top Pill Badge */}
                    <div
                      className={`glass-pill ${entranceComplete ? 'hp-live-badge-float' : 'hp-hero-badge'}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 16px',
                        borderRadius: 9999,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: isNightMode ? '#fde047' : '#9f1239',
                        border: isNightMode
                          ? '1px solid rgba(250, 204, 21, 0.48)'
                          : '1px solid rgba(244, 63, 94, 0.28)',
                        background: isNightMode
                          ? 'rgba(20, 12, 18, 0.88)'
                          : 'linear-gradient(135deg, rgba(255, 241, 242, 0.96), rgba(254, 249, 195, 0.94), rgba(243, 232, 255, 0.92))',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        marginBottom: 12,
                        fontWeight: 700,
                        boxShadow: '0 6px 20px rgba(244, 63, 94, 0.12)'
                      }}
                    >
                      <Sparkles size={13} color={isNightMode ? '#fde047' : '#e11d48'} />
                      <span>INTERNATIONAL SHOPPING & LIFESTYLE DESTINATION</span>
                    </div>

                    {/* Large Editorial Display Heading (300–700ms Letter-Group Stagger + Shimmer) */}
                    <h1
                      className={`font-cinzel ${entranceComplete ? 'hp-live-text-float' : ''}`}
                      style={{
                        position: 'relative',
                        fontSize: 'clamp(2.5rem, 4.6vw, 4.4rem)',
                        fontWeight: 800,
                        lineHeight: 1.02,
                        letterSpacing: '0.04em',
                        marginBottom: 8,
                        filter: isNightMode
                          ? 'drop-shadow(0 3px 14px rgba(0, 0, 0, 0.78))'
                          : 'drop-shadow(0 2px 12px rgba(255, 250, 245, 0.95)) drop-shadow(0 1px 2px rgba(159, 18, 57, 0.22))',
                        ...({ '--text-float-delay': '0.2s' } as React.CSSProperties)
                      }}
                    >
                      <span
                        className="hp-heading-shimmer hp-hero-heading-group"
                        style={{ '--hg-delay': '300ms' } as React.CSSProperties}
                      >
                        CITY
                      </span>{' '}
                      <span
                        className="hp-heading-shimmer hp-hero-heading-group"
                        style={{ '--hg-delay': '370ms' } as React.CSSProperties}
                      >
                        MALL
                      </span>
                      <span
                        aria-hidden="true"
                        className="hp-heading-highlight-line"
                        style={{ position: 'absolute', bottom: -4, left: 0, display: 'block' }}
                      />
                    </h1>

                    {/* Subheading */}
                    <div
                      className={`font-grotesk ${entranceComplete ? 'hp-live-text-float' : 'hp-hero-subtitle'}`}
                      style={{
                        fontSize: 'clamp(0.76rem, 1.15vw, 0.92rem)',
                        letterSpacing: '0.16em',
                        color: isNightMode ? '#fda4af' : '#9a3412',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        marginBottom: 10,
                        textShadow: isNightMode
                          ? '0 2px 10px rgba(0, 0, 0, 0.85)'
                          : '0 1px 10px rgba(255, 252, 248, 0.98), 0 0 18px rgba(255, 250, 245, 0.9)',
                        ...({ '--text-float-delay': '0.8s' } as React.CSSProperties)
                      }}
                    >
                      180+ Luxury Boutiques · Fine Dining · VIP IMAX® · Family Lifestyle
                    </div>

                    {/* Short, Refined Editorial Line */}
                    <p
                      className={entranceComplete ? 'hp-live-text-float' : 'hp-hero-desc'}
                      style={{
                        fontSize: '0.96rem',
                        color: isNightMode ? '#f1f5f9' : '#1e293b',
                        fontWeight: 500,
                        lineHeight: 1.55,
                        maxWidth: 530,
                        marginBottom: 16,
                        textShadow: isNightMode
                          ? '0 2px 10px rgba(0, 0, 0, 0.85)'
                          : '0 1px 8px rgba(255, 255, 255, 0.98), 0 0 16px rgba(255, 250, 245, 0.92)',
                        ...({ '--text-float-delay': '1.4s' } as React.CSSProperties)
                      }}
                    >
                      Explore three sunlit levels of international fashion avenues, curved glass
                      atrium promenades, rooftop dining salons, and premier cinema experiences.
                    </p>

                    {/* Shopping & Lifestyle Highlights */}
                    <div
                      className={!entranceComplete ? 'hp-hero-pills' : undefined}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginBottom: 18
                      }}
                    >
                      <span
                        className={`glass-pill ${entranceComplete ? 'hp-live-pill-float' : ''}`}
                        style={{
                          fontSize: '0.72rem',
                          padding: '5px 12px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          background: isNightMode ? 'rgba(20, 12, 18, 0.84)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(244, 63, 94, 0.28)',
                          boxShadow: '0 4px 14px rgba(28, 19, 23, 0.08)',
                          ...({ '--pill-float-delay': '0s' } as React.CSSProperties)
                        }}
                      >
                        🛍️ 180+ Global Boutiques
                      </span>
                      <span
                        className={`glass-pill ${entranceComplete ? 'hp-live-pill-float' : ''}`}
                        style={{
                          fontSize: '0.72rem',
                          padding: '5px 12px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          background: isNightMode ? 'rgba(20, 12, 18, 0.84)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(245, 158, 11, 0.32)',
                          boxShadow: '0 4px 14px rgba(28, 19, 23, 0.08)',
                          ...({ '--pill-float-delay': '0.5s' } as React.CSSProperties)
                        }}
                      >
                        🏛️ 3-Level Glass Atrium
                      </span>
                      <span
                        className={`glass-pill ${entranceComplete ? 'hp-live-pill-float' : ''}`}
                        style={{
                          fontSize: '0.72rem',
                          padding: '5px 12px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          background: isNightMode ? 'rgba(20, 12, 18, 0.84)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(168, 85, 247, 0.28)',
                          boxShadow: '0 4px 14px rgba(28, 19, 23, 0.08)',
                          ...({ '--pill-float-delay': '1.0s' } as React.CSSProperties)
                        }}
                      >
                        🍽️ 35+ Dining Salons
                      </span>
                      <span
                        className={`glass-pill ${entranceComplete ? 'hp-live-pill-float' : ''}`}
                        style={{
                          fontSize: '0.72rem',
                          padding: '5px 12px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          background: isNightMode ? 'rgba(20, 12, 18, 0.84)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(251, 146, 60, 0.34)',
                          boxShadow: '0 4px 14px rgba(28, 19, 23, 0.08)',
                          ...({ '--pill-float-delay': '1.5s' } as React.CSSProperties)
                        }}
                      >
                        🎬 INOX VIP IMAX®
                      </span>
                    </div>

                    {/* Premium CTA Buttons */}
                    <div
                      className={!entranceComplete ? 'hp-hero-buttons' : undefined}
                      style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}
                    >
                      <button
                        onClick={() => {
                          navigate('/shopping#brands-showcase');
                        }}
                        className="btn-primary hp-btn-luxury hp-cta-shine"
                        style={{
                          padding: '10px 18px',
                          fontSize: '0.84rem',
                          boxShadow: '0 12px 30px rgba(244, 63, 94, 0.32)'
                        }}
                      >
                        <ShoppingBag size={15} />
                        <span>Explore All 27 Brands</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={onOpenDirectory}
                        className="btn-secondary hp-btn-luxury hp-btn-shine-hover"
                        style={{
                          padding: '10px 16px',
                          fontSize: '0.84rem',
                          background: isNightMode ? 'rgba(22, 12, 20, 0.86)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          border: '1.5px solid rgba(212, 175, 55, 0.5)',
                          boxShadow: '0 8px 22px rgba(212, 175, 55, 0.14)'
                        }}
                      >
                        <Sparkles size={14} color="#d4af37" />
                        <span>Store Directory</span>
                      </button>

                      <button
                        onClick={() => {
                          setShow3DTour(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn-secondary hp-btn-luxury hp-btn-shine-hover"
                        style={{
                          padding: '10px 16px',
                          fontSize: '0.84rem',
                          background: isNightMode ? 'rgba(22, 12, 20, 0.86)' : 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          color: isNightMode ? '#f8fafc' : '#1e1318',
                          border: '1.5px solid rgba(212, 175, 55, 0.5)',
                          boxShadow: '0 8px 22px rgba(212, 175, 55, 0.14)'
                        }}
                      >
                        <Compass size={15} color="#d4af37" />
                        <span>3D Tour</span>
                      </button>
                    </div>

                    {/* Priority Flagship Brands Quick-Access Strip */}
                    <div
                      style={{
                        marginTop: 14,
                        padding: '10px 12px',
                        borderRadius: 14,
                        background: isNightMode ? 'rgba(20, 12, 18, 0.82)' : 'rgba(255, 252, 248, 0.9)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(212, 175, 55, 0.34)',
                        boxShadow: '0 10px 28px rgba(28, 19, 23, 0.08)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                          marginBottom: 8
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: isNightMode ? '#fde047' : '#854d0e'
                          }}
                        >
                          ✦ FEATURED MALL BRANDS · CLICK TO EXPLORE
                        </span>
                        <button
                          type="button"
                          onClick={() => navigate('/shopping#brands-showcase')}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: isNightMode ? '#fda4af' : '#e11d48',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <span>All {ALL_MALL_BRANDS.length} Brands</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {heroFeaturedBrands.map((brand) => (
                          <button
                            key={brand.id}
                            type="button"
                            onClick={() => navigate(`/shopping/brand/${brand.id}`)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '5px 11px',
                              borderRadius: 9999,
                              fontSize: '0.73rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: isNightMode ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                              color: isNightMode ? '#f8fafc' : '#1e1318',
                              border: `1px solid ${brand.accentColor}45`,
                              boxShadow: '0 2px 6px rgba(28, 19, 23, 0.05)',
                              transition: 'transform 0.18s ease, box-shadow 0.18s ease'
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: brand.accentColor,
                                flexShrink: 0
                              }}
                            />
                            <span>{brand.name.replace(' Store', '').replace(' (nearby)', '')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Artistic Asymmetrical 3D Luxury Mall Image Composition */}
                  <div className="hp-parallax-right">
                    <div className="hp-asym-gallery">
                      {/* Floating Architectural Champagne Reflections & Depth Accents (1000–1500ms) */}
                      {!reducedMotion && (
                        <div
                          aria-hidden="true"
                          className="hp-hero-deco-layer"
                          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
                        >
                          <div
                            className="hp-hero-deco-float"
                            style={{
                              position: 'absolute',
                              top: -18,
                              right: -14,
                              width: 170,
                              height: 170,
                              borderRadius: 28,
                              border: '1px solid rgba(250, 204, 21, 0.34)',
                              background:
                                'linear-gradient(135deg, rgba(254, 240, 138, 0.18) 0%, rgba(255, 228, 230, 0.08) 100%)',
                              boxShadow: '0 12px 32px rgba(250, 204, 21, 0.12)',
                              '--deco-delay': '0s'
                            } as React.CSSProperties}
                          />
                          <div
                            className="hp-hero-deco-float"
                            style={{
                              position: 'absolute',
                              top: '28%',
                              left: '4%',
                              width: 96,
                              height: 96,
                              borderRadius: '50%',
                              background:
                                'radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(251, 113, 133, 0.14) 55%, transparent 100%)',
                              filter: 'blur(14px)',
                              '--deco-delay': '1.6s'
                            } as React.CSSProperties}
                          />
                        </div>
                      )}

                      {/* LAYER 1: Dominant Large Multi-Level Luxury Shopping Mall Atrium */}
                      <div className={`hp-asym-main ${entranceComplete ? 'hp-hero-float-stage' : 'hp-hero-main-image'}`}>
                        <ThreeDTiltCard
                          maxTilt={5.5}
                          perspective={1200}
                          scale={1.012}
                          speed={520}
                          glare={true}
                          glareMaxOpacity={0.24}
                          depthShadow={false}
                          onClick={() => navigate('/discover')}
                          style={{ borderRadius: 26 }}
                        >
                          <div
                            className="hp-hero-glass-frame"
                            style={{
                              width: '100%',
                              borderRadius: 26,
                              position: 'relative'
                            }}
                          >
                            <div aria-hidden="true" className="hp-hero-glass-rim" />
                            <div aria-hidden="true" className="hp-hero-light-sweep" />

                            <div style={{ position: 'relative', width: '100%', height: 445, overflow: 'hidden', transformStyle: 'preserve-3d' }}>
                              <div className="hp-hero-main-scale" style={{ width: '100%', height: '100%' }}>
                                <img
                                  src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1600&auto=format&fit=crop"
                                  alt="City Mall Multi-Level Glass Atrium, Storefronts & Shopping Avenues"
                                  className={entranceComplete ? 'hp-hero-img-drift' : undefined}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                  }}
                                />
                              </div>

                              {/* Bright Architectural Depth Scrim */}
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background:
                                    'linear-gradient(180deg, rgba(15, 23, 42, 0.14) 0%, transparent 42%, rgba(28, 19, 23, 0.82) 100%)',
                                  pointerEvents: 'none'
                                }}
                              />

                              {/* Elevated Top Floating Tag */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 18,
                                  left: 18,
                                  right: 18,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: 8,
                                  flexWrap: 'wrap',
                                  zIndex: 2,
                                  transform: 'translateZ(26px)'
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.67rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: '#1c1317',
                                    background: 'rgba(255, 250, 245, 0.92)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '6px 14px',
                                    borderRadius: 9999,
                                    letterSpacing: '0.12em',
                                    fontWeight: 700,
                                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)'
                                  }}
                                >
                                  ✦ GRAND MALL ATRIUM · LEVELS 0–2
                                </span>

                                <span
                                  style={{
                                    fontSize: '0.67rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: '#fef08a',
                                    background: 'rgba(28, 19, 23, 0.78)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '6px 14px',
                                    borderRadius: 9999,
                                    letterSpacing: '0.12em',
                                    fontWeight: 700,
                                    border: '1px solid rgba(254, 240, 138, 0.35)'
                                  }}
                                >
                                  OPEN TODAY · 10 AM – 10 PM
                                </span>
                              </div>

                              {/* Elevated Bottom Editorial Caption */}
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: 52,
                                  left: 24,
                                  right: 24,
                                  zIndex: 2,
                                  transform: 'translateZ(22px)'
                                }}
                              >
                                <div
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.4rem',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)'
                                  }}
                                >
                                  Sunlit Grand Galleria & Fashion Avenues
                                </div>
                              </div>
                            </div>
                          </div>
                        </ThreeDTiltCard>
                      </div>

                      {/* LAYER 2: Medium Overlapping Luxury Fashion Boutique Image */}
                      <div
                        className={`hp-asym-boutique ${entranceComplete ? 'hp-thumb-float' : 'hp-hero-vignette-1'}`}
                        style={{ '--thumb-float-delay': '0.3s' } as React.CSSProperties}
                      >
                        <ThreeDTiltCard
                          maxTilt={7}
                          perspective={950}
                          scale={1.025}
                          speed={480}
                          glare={true}
                          glareMaxOpacity={0.22}
                          depthShadow={false}
                          onClick={() => navigate('/shopping')}
                          style={{ borderRadius: 20 }}
                        >
                          <div className="hp-thumb-card" style={{ background: '#fffaf6' }}>
                            <div aria-hidden="true" className="hp-hero-light-sweep" />
                            <div style={{ height: 208, position: 'relative', overflow: 'hidden' }}>
                              <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
                                alt="Haute Couture Fashion Boutique Storefront"
                                className="hp-hero-sec-scale"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'linear-gradient(180deg, transparent 36%, rgba(28, 19, 23, 0.86) 100%)'
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: 12,
                                  left: 12,
                                  right: 12
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.62rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: '#fef08a',
                                    letterSpacing: '0.14em',
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.75)'
                                  }}
                                >
                                  01 · HAUTE COUTURE
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.96rem',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                                  }}
                                >
                                  Luxury Fashion Colonnade
                                </div>
                              </div>
                            </div>
                          </div>
                        </ThreeDTiltCard>
                      </div>

                      {/* LAYER 3: Smaller Overlapping Fine Dining & Lifestyle Image */}
                      <div
                        className={`hp-asym-dining ${entranceComplete ? 'hp-thumb-float' : 'hp-hero-vignette-2'}`}
                        style={{ '--thumb-float-delay': '1.1s' } as React.CSSProperties}
                      >
                        <ThreeDTiltCard
                          maxTilt={7}
                          perspective={950}
                          scale={1.025}
                          speed={480}
                          glare={true}
                          glareMaxOpacity={0.22}
                          depthShadow={false}
                          onClick={() => navigate('/dining')}
                          style={{ borderRadius: 20 }}
                        >
                          <div className="hp-thumb-card" style={{ background: '#fffaf6' }}>
                            <div aria-hidden="true" className="hp-hero-light-sweep" />
                            <div style={{ height: 156, position: 'relative', overflow: 'hidden' }}>
                              <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
                                alt="Luxury Mall Dining Terrace & Culinary Salon"
                                className="hp-hero-sec-scale"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'linear-gradient(180deg, transparent 34%, rgba(28, 19, 23, 0.88) 100%)'
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: 10,
                                  left: 12,
                                  right: 12
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.6rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: '#fda4af',
                                    letterSpacing: '0.14em',
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.75)'
                                  }}
                                >
                                  02 · CULINARY & LIFESTYLE
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.9rem',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                                  }}
                                >
                                  Gastronomie Terraces
                                </div>
                              </div>
                            </div>
                          </div>
                        </ThreeDTiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Scroll Down Cue at Bottom of Section 1 */}
            <button
              type="button"
              onClick={() => scrollToFloor(1)}
              aria-label="Scroll to Discover the Mall"
              className="hp-scroll-cue-float"
              style={{
                position: 'absolute',
                bottom: 18,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 15,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 9999,
                background: isNightMode ? 'rgba(20, 12, 18, 0.88)' : 'rgba(255, 250, 245, 0.94)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(212, 175, 55, 0.42)',
                boxShadow: '0 8px 22px rgba(28, 19, 23, 0.14)',
                color: isNightMode ? '#fde047' : '#92400e',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.64rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Scroll Through 8 Floors</span>
              <ChevronDown size={13} />
            </button>
          </section>

          {/* =================================================================
              SECTIONS 2–7 — STACKED FULL-SCREEN MALL FLOORS (zIndex 20–70)
              ================================================================= */}
          {mallFloors.map((floor) => {
            const zIndex = (floor.stackIndex + 1) * 10;
            const EditorialBlock = (
              <div className={`hp-floor-copy-cushion ${isNightMode ? 'hp-floor-copy-cushion-dark' : ''}`}>
                <div
                  className="glass-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 16px',
                    borderRadius: 9999,
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.16em',
                    color: isNightMode ? '#fde047' : floor.accent,
                    border: `1px solid ${floor.accent}35`,
                    background: isNightMode ? 'rgba(20, 12, 18, 0.86)' : 'rgba(255, 255, 255, 0.94)',
                    marginBottom: 16,
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={13} color={isNightMode ? '#fde047' : floor.accent} />
                  <span>{floor.floorLabel}</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                    color: isNightMode ? '#ffffff' : '#1c1317',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '0.03em',
                    marginBottom: 12,
                    textShadow: isNightMode
                      ? '0 2px 12px rgba(0, 0, 0, 0.8)'
                      : '0 1px 12px rgba(255, 250, 245, 0.95)'
                  }}
                >
                  {floor.title}
                </h2>

                <div
                  className="font-grotesk"
                  style={{
                    fontSize: 'clamp(0.84rem, 1.3vw, 1rem)',
                    letterSpacing: '0.14em',
                    color: isNightMode ? '#fb7185' : floor.accent,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: 16,
                    textShadow: isNightMode
                      ? '0 1px 10px rgba(0, 0, 0, 0.85)'
                      : '0 1px 10px rgba(255, 252, 248, 0.95)'
                  }}
                >
                  {floor.subtitle}
                </div>

                <p
                  style={{
                    fontSize: '1.02rem',
                    color: isNightMode ? '#f1f5f9' : '#334155',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    maxWidth: 520,
                    marginBottom: 22,
                    textShadow: isNightMode
                      ? '0 1px 10px rgba(0, 0, 0, 0.85)'
                      : '0 1px 8px rgba(255, 255, 255, 0.96)'
                  }}
                >
                  {floor.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {floor.highlights.map((item) => (
                    <span
                      key={item}
                      className="glass-pill"
                      style={{
                        fontSize: '0.74rem',
                        padding: '6px 14px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: isNightMode ? '#f8fafc' : '#1e1318',
                        background: isNightMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.94)',
                        border: `1px solid ${floor.accent}30`
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(floor.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-primary hp-btn-luxury hp-cta-shine"
                    style={{ boxShadow: '0 10px 26px rgba(244, 63, 94, 0.28)' }}
                  >
                    <span>{floor.ctaText}</span>
                    <ArrowRight size={15} />
                  </button>

                  {floor.secondaryDirectory && (
                    <button
                      type="button"
                      onClick={onOpenDirectory}
                      className="btn-secondary hp-btn-luxury"
                      style={{
                        background: isNightMode ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                        color: isNightMode ? '#f8fafc' : '#1e1318',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)'
                      }}
                    >
                      <ShoppingBag size={15} color="#d97706" />
                      <span>Store Directory</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => scrollToFloor(floor.stackIndex + 1)}
                    className="btn-secondary hp-btn-luxury"
                    style={{
                      padding: '10px 16px',
                      background: isNightMode ? 'rgba(22, 12, 20, 0.84)' : 'rgba(255, 255, 255, 0.90)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: isNightMode ? '#fde047' : '#78350f',
                      border: '1px solid rgba(212, 175, 55, 0.42)'
                    }}
                  >
                    <span>Next Floor</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            );

            const VisualBlock =
              floor.id === 'section-shopping' ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
                    gap: 14,
                    width: '100%'
                  }}
                >
                  {floorShowcaseBrands.map((brand) => (
                    <ThreeDTiltCard
                      key={brand.id}
                      maxTilt={8}
                      perspective={950}
                      scale={1.03}
                      glare={true}
                      glareMaxOpacity={0.18}
                      onClick={() => navigate(`/shopping/brand/${brand.id}`)}
                      style={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: isNightMode ? 'rgba(22, 14, 22, 0.92)' : 'rgba(255, 253, 249, 0.94)',
                        border: '1px solid rgba(212, 175, 55, 0.38)',
                        boxShadow: '0 14px 32px rgba(28, 19, 23, 0.14)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ position: 'relative', height: 108, overflow: 'hidden' }}>
                        <img
                          src={brand.images[0]}
                          alt={brand.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 35%, rgba(16, 10, 15, 0.78) 100%)'
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            fontSize: '0.58rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 9999,
                            background: 'rgba(255, 252, 248, 0.94)',
                            color: '#854d0e',
                            border: '1px solid rgba(212, 175, 55, 0.4)'
                          }}
                        >
                          {brand.floor.split('·')[0].trim()}
                        </span>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'var(--font-mono)',
                            color: brand.accentColor,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          {brand.category}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: isNightMode ? '#ffffff' : '#1c1317',
                            marginTop: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4
                          }}
                        >
                          <span>{brand.name}</span>
                          <ArrowUpRight size={14} color="#d97706" />
                        </div>
                      </div>
                    </ThreeDTiltCard>
                  ))}
                </div>
              ) : (
                <div className={`hp-floor-photo-stage ${floor.variantClass}`}>
                <div
                  onClick={() => {
                    navigate(floor.route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hp-floor-photo-main"
                  style={{
                    marginLeft: floor.reverse ? '0' : 'auto',
                    background: '#1c1317'
                  }}
                >
                  <img src={floor.mainImage} alt={floor.title} />
                  <div aria-hidden="true" className="hp-hero-light-sweep" />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(28, 19, 23, 0.08) 0%, transparent 48%, rgba(28, 19, 23, 0.55) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div className="hp-floor-hover-label">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em'
                      }}
                    >
                      {floor.mainCaption}
                    </span>
                    <ArrowUpRight size={16} color={floor.accent} />
                  </div>
                </div>

                <div
                  onClick={() => {
                    navigate(floor.route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`hp-floor-photo-inset ${floor.reverse ? '' : 'hp-inset-left'}`}
                  style={{ background: '#1c1317' }}
                >
                  <img src={floor.insetImage} alt={floor.insetTitle} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 35%, rgba(28, 19, 23, 0.8) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        color: '#fef08a',
                        fontWeight: 700
                      }}
                    >
                      {floor.insetTag}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        color: '#ffffff',
                        fontWeight: 700
                      }}
                    >
                      {floor.insetTitle}
                    </div>
                  </div>
                </div>

                {/* Overlapping Third Supporting Rectangular Detail Card */}
                <div
                  onClick={() => {
                    navigate(floor.route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hp-floor-photo-accent"
                  style={{ background: '#1c1317' }}
                >
                  <img src={floor.accentImage} alt={floor.accentTitle} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 32%, rgba(28, 19, 23, 0.82) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.54rem',
                        letterSpacing: '0.14em',
                        color: '#fda4af',
                        fontWeight: 700
                      }}
                    >
                      {floor.accentTag}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.82rem',
                        color: '#ffffff',
                        fontWeight: 700
                      }}
                    >
                      {floor.accentTitle}
                    </div>
                  </div>
                </div>
              </div>
              );

            return (
              <section
                key={floor.id}
                id={floor.id}
                data-stack-index={floor.stackIndex}
                ref={(el) => {
                  stackRefs.current[floor.stackIndex] = el;
                }}
                className="hp-stack-section"
                style={{
                  zIndex,
                  background: 'transparent'
                }}
              >
                <div className="hp-stack-inner">
                  <div
                    className={`hp-floor-split ${floor.reverse ? 'hp-floor-split-reverse' : ''
                      }`}
                  >
                    {floor.reverse ? (
                      <>
                        {VisualBlock}
                        {EditorialBlock}
                      </>
                    ) : (
                      <>
                        {EditorialBlock}
                        {VisualBlock}
                      </>
                    )}
                  </div>
                </div>
              </section>
            );
          })}

          {/* =================================================================
              SECTION 8 — PLAN YOUR VISIT & ARCHITECTURAL FINALE (zIndex 80)
              ================================================================= */}
          <section
            id="section-visit"
            data-stack-index="7"
            ref={(el) => {
              stackRefs.current[7] = el;
            }}
            className="hp-stack-section"
            style={{
              zIndex: 80,
              background: 'transparent'
            }}
          >
            <div className="hp-stack-inner" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <div
                className="hp-floor-split"
                style={{ flex: 1, paddingBottom: 16 }}
              >
                <div className={`hp-floor-copy-cushion ${isNightMode ? 'hp-floor-copy-cushion-dark' : ''}`}>
                  <div
                    className="glass-pill"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 16px',
                      borderRadius: 9999,
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.16em',
                      color: isNightMode ? '#fde047' : '#9f1239',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                      background: isNightMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.94)',
                      marginBottom: 16,
                      fontWeight: 700
                    }}
                  >
                    <MapPin size={13} color={isNightMode ? '#fde047' : '#e11d48'} />
                    <span>FLOOR 08 · ARRIVAL & CONCIERGE</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)',
                      color: isNightMode ? '#ffffff' : '#1c1317',
                      fontWeight: 800,
                      lineHeight: 1.08,
                      marginBottom: 14
                    }}
                  >
                    Plan Your Visit
                  </h2>

                  <p
                    style={{
                      fontSize: '1.02rem',
                      color: isNightMode ? '#cbd5e1' : '#475569',
                      lineHeight: 1.65,
                      maxWidth: 520,
                      marginBottom: 24
                    }}
                  >
                    100 City Mall Boulevard, Central Commercial Hub, Metropolis MC-10024. Arrive
                    effortlessly via West & East Porte-Cochère valet desks.
                  </p>

                  {/* Essential Visitor Info Cards */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                      gap: 12,
                      marginBottom: 26
                    }}
                  >
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        background: isNightMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.92)',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Clock size={14} color="#d97706" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: '#92400e', letterSpacing: '0.1em' }}>
                          OPENING HOURS
                        </span>
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isNightMode ? '#ffffff' : '#1c1317' }}>
                        10:00 AM – 10:00 PM Daily
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: 14,
                        background: isNightMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.92)',
                        border: '1px solid rgba(244, 63, 94, 0.25)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Car size={14} color="#e11d48" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: '#9f1239', letterSpacing: '0.1em' }}>
                          VALET & EV PARKING
                        </span>
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isNightMode ? '#ffffff' : '#1c1317' }}>
                        4,200 Bays · 80 DC Chargers
                      </div>
                    </div>
                  </div>

                  {/* Final CTAs */}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={onOpenVisit}
                      className="btn-primary hp-btn-luxury hp-cta-shine"
                    >
                      <Calendar size={15} />
                      <span>Plan Arrival & Valet</span>
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/visit');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn-secondary hp-btn-luxury"
                      style={{
                        background: isNightMode ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                        color: isNightMode ? '#f8fafc' : '#1e1318',
                        border: '1.5px solid rgba(212, 175, 55, 0.45)'
                      }}
                    >
                      <span>Visitor Guide</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/gift-card');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn-secondary hp-btn-luxury"
                      style={{
                        background: isNightMode ? 'rgba(22, 12, 20, 0.88)' : 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        color: isNightMode ? '#fde047' : '#1e1318',
                        border: '1.5px solid rgba(244, 63, 94, 0.38)'
                      }}
                    >
                      <CreditCard size={15} color="#f43f5e" />
                      <span>Privilege Gift Card</span>
                    </button>
                  </div>
                </div>

                {/* Right Asymmetrical Panorama & Luxury Gifting Composition */}
                <div className="hp-floor-photo-stage hp-stage-variant-panorama" style={{ minHeight: 420 }}>
                  <div
                    onClick={() => {
                      navigate('/visit');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hp-floor-photo-main"
                    style={{ background: '#1c1317' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=1400&auto=format&fit=crop"
                      alt="City Mall Grand Arrival Concourse"
                    />
                    <div aria-hidden="true" className="hp-hero-light-sweep" />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, transparent 42%, rgba(28, 19, 23, 0.72) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    <div className="hp-floor-hover-label">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em'
                        }}
                      >
                        100 City Mall Boulevard · West & East Porte-Cochère
                      </span>
                      <ArrowUpRight size={16} color="#e11d48" />
                    </div>
                  </div>

                  {/* Medium Gift Card Showcase Tile */}
                  <div
                    onClick={() => {
                      navigate('/gift-card');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hp-floor-photo-inset"
                    style={{ background: '#1c1317' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
                      alt="City Mall Privilege Gift Card Presentation"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 32%, rgba(28, 19, 23, 0.82) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.58rem',
                          letterSpacing: '0.14em',
                          color: '#fef08a',
                          fontWeight: 700
                        }}
                      >
                        BESPOKE GIFTING
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          color: '#ffffff',
                          fontWeight: 700
                        }}
                      >
                        Privilege Gift Card
                      </div>
                    </div>
                  </div>

                  {/* Small Supporting Sunlit Promenade Vignette */}
                  <div
                    onClick={() => {
                      navigate('/discover');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hp-floor-photo-accent"
                    style={{ background: '#1c1317' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
                      alt="Panoramic Mall Interior Concourse"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 32%, rgba(28, 19, 23, 0.82) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.54rem',
                          letterSpacing: '0.14em',
                          color: '#fda4af',
                          fontWeight: 700
                        }}
                      >
                        PANORAMA
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.82rem',
                          color: '#ffffff',
                          fontWeight: 700
                        }}
                      >
                        Grand Concourse
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Luxury Footer Bar at Bottom of Final Section */}
              <div
                style={{
                  width: '100%',
                  borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                  padding: '14px 40px',
                  background: isNightMode ? 'rgba(16, 10, 15, 0.75)' : 'rgba(255, 252, 248, 0.85)',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div
                  style={{
                    maxWidth: 1440,
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: isNightMode ? '#cbd5e1' : '#64748b'
                  }}
                >
                  <span>© 2026 CITY MALL METROPOLIS · INTERNATIONAL LUXURY DESTINATION</span>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => scrollToFloor(0)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                      Back to Top ↑
                    </button>
                    <button type="button" onClick={onOpenDirectory} style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 700, cursor: 'pointer', font: 'inherit' }}>
                      180+ Stores
                    </button>
                    <button type="button" onClick={() => { setShow3DTour(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: '#d97706', fontWeight: 700, cursor: 'pointer', font: 'inherit' }}>
                      3D Walkthrough
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Floating Right-Edge Floor Navigator Rail (in Stacked Homepage Mode) */}
      {!show3DTour && (
        <nav className="hp-floor-rail" aria-label="Mall Floor Navigation">
          {floorNavItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToFloor(idx)}
              className={`hp-floor-dot-btn ${activeFloor === idx ? 'active' : ''}`}
              aria-label={`Jump to ${item.label}`}
              title={item.label}
            >
              <span className="hp-floor-dot-label">{item.label}</span>
              <span className="hp-floor-dot-pip" />
            </button>
          ))}
        </nav>
      )}

      {/* Full Footer only in 3D Tour mode */}
      {show3DTour && <Footer isLight={true} />}
    </div>
  );
};

