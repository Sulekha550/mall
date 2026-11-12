import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './navbar.css';
import {
  Search,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Compass,
  UtensilsCrossed,
  Film,
  Calendar,
  Layers,
  ArrowRight,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Clock,
  Navigation as NavIcon,
  CreditCard,
  LucideIcon
} from 'lucide-react';
import { audioAmbiance } from '../utils/audioAmbiance';

interface PremiumNavbarProps {
  onJumpToProgress?: (progress: number) => void;
  onOpenDirectory: () => void;
  onOpenVisit: () => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  scrollProgress?: number;
}

interface SubMenuItem {
  title: string;
  desc: string;
  target?: string | number;
  action?: () => void;
  icon: LucideIcon;
}

interface NavMenuItem {
  id: string;
  label: string;
  path: string;
  target: string | number;
  subItems: SubMenuItem[];
}

export const PremiumNavbar: React.FC<PremiumNavbarProps> = ({
  onJumpToProgress,
  onOpenDirectory,
  onOpenVisit,
  isNightMode,
  onToggleNightMode,
  scrollProgress = 0
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [dismissedDropdownId, setDismissedDropdownId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Premium entrance animation coordination (Homepage initial load after 1-100 preloader)
  const isHomePage = location.pathname === '/';
  const [isWaitingForPreloader, setIsWaitingForPreloader] = useState(() => isHomePage);
  const [isEntranceActive, setIsEntranceActive] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsWaitingForPreloader(false);
      return;
    }

    if (hasAnimatedRef.current) {
      setIsWaitingForPreloader(false);
      return;
    }

    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerNavbarEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      setIsWaitingForPreloader(false);
      setIsEntranceActive(true);

      // Settle completely after sequence concludes
      settleTimer = setTimeout(() => {
        setIsEntranceActive(false);
      }, 1900);
    };

    window.addEventListener('citymall:preloader-reveal', triggerNavbarEntrance);

    // Safety fallback in case preloader was bypassed
    const fallbackTimer = setTimeout(() => {
      triggerNavbarEntrance();
    }, 3600);

    return () => {
      window.removeEventListener('citymall:preloader-reveal', triggerNavbarEntrance);
      clearTimeout(fallbackTimer);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close drawers and popovers when route changes
  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
    setIsLocationOpen(false);
  }, [location.pathname]);

  // Dismiss popovers when clicking outside the navbar
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.prem-navbar') && !target.closest('.prem-mobile-drawer')) {
        setIsSearchOpen(false);
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleAudioToggle = () => {
    const playing = audioAmbiance.toggle();
    setIsAudioPlaying(playing);
  };

  const isItemActive = (menuId: string, menuPath: string) => {
    if (menuId === 'brands') {
      return (
        location.pathname.startsWith('/shopping/brand') ||
        location.pathname.startsWith('/brand') ||
        (location.pathname === '/shopping' && location.hash === '#brands-showcase')
      );
    }
    if (menuId === 'shopping') {
      return location.pathname === '/shopping' && location.hash !== '#brands-showcase';
    }
    if (menuPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname === menuPath || location.pathname.startsWith(menuPath + '/');
  };

  // Helper to navigate between routes or jump to 3D progress smoothly
  const navigateTo = (target: string | number, menuId?: string) => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
    setIsLocationOpen(false);
    if (menuId) setDismissedDropdownId(menuId);
    (document.activeElement as HTMLElement | null)?.blur?.();

    if (typeof target === 'number') {
      if (location.pathname === '/') {
        if (onJumpToProgress) {
          onJumpToProgress(target);
        }
        window.dispatchEvent(new CustomEvent('citymall:jump-progress', { detail: target }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(`/?progress=${target}`);
      }
      return;
    }

    if (typeof target === 'string') {
      if (target.startsWith('/')) {
        const [rawPath, hash] = target.split('#');
        const path = rawPath || '/';
        if (path === '/' && hash) {
          window.dispatchEvent(new CustomEvent('citymall:exit-3d-tour'));
        }
        if (location.pathname === path) {
          if (hash) {
            // Update URL hash too if different, and scroll immediately
            if (location.hash !== `#${hash}`) {
              navigate(target);
            }
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) {
                const stackIdx = el.getAttribute('data-stack-index');
                const top =
                  stackIdx !== null
                    ? Number(stackIdx) * window.innerHeight
                    : el.getBoundingClientRect().top + window.scrollY - 85;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }, 60);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          // Navigating to a different path — ScrollToTop handles hash anchor scrolling after mount
          navigate(target);
        }
      } else {
        const el = document.getElementById(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  const navMenuItems: NavMenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      target: '/',
      subItems: [
        {
          title: 'Arrival Plaza & Facade',
          desc: 'Travertine glass facade and landscaped plaza',
          target: 0.0,
          icon: Compass
        },
        {
          title: 'Grand Glass Portal',
          desc: 'Concourse entrance and acoustic glass doors',
          target: 0.16,
          icon: Layers
        },
        {
          title: 'Flagship Brands Wing',
          desc: 'Jump directly to City Mall flagship brands showcase',
          target: '/#section-shopping',
          icon: Sparkles
        },
        {
          title: 'Panoramic Overlook',
          desc: 'Tri-level architectural skybridge perspective',
          target: 0.96,
          icon: Sparkles
        }
      ]
    },
    {
      id: 'brands',
      label: 'Brands',
      path: '/shopping#brands-showcase',
      target: '/shopping#brands-showcase',
      subItems: [
        {
          title: 'All 27 Mall Brands Showcase',
          desc: 'Explore every flagship store, dining house & salon',
          target: '/shopping#brands-showcase',
          icon: Sparkles
        },
        {
          title: 'Tanishq Jewellery & Titan World',
          desc: '22K fine gold, diamonds & Swiss horology flagships',
          target: '/shopping/brand/tanishq',
          icon: Sparkles
        },
        {
          title: "Levi's, Louis Philippe & Allen Solly",
          desc: 'Signature denim, bespoke tailoring & luxury apparel',
          target: '/shopping/brand/levis',
          icon: Layers
        },
        {
          title: 'Puma, Adidas & Skechers',
          desc: 'Performance athletics, sneakers & activewear houses',
          target: '/shopping/brand/puma',
          icon: Compass
        },
        {
          title: 'Barbeque Nation, Pizza Hut & KFC',
          desc: 'Level 2 culinary flagships & live grill destinations',
          target: '/shopping/brand/barbeque-nation',
          icon: UtensilsCrossed
        },
        {
          title: 'INOX Cinemas & Looks Salon',
          desc: 'VIP IMAX® multiplex & luxury beauty atelier',
          target: '/shopping/brand/inox-cinemas',
          icon: Film
        }
      ]
    },
    {
      id: 'discover',
      label: 'Discover',
      path: '/discover',
      target: '/discover',
      subItems: [
        {
          title: 'The Architectural Oculus',
          desc: 'Sunlit oculus with 38.5m glass ceiling span',
          target: '/discover#discover-oculus',
          icon: Sparkles
        },
        {
          title: 'Architectural Design Pillars',
          desc: 'Travertine colonnades, kinetic art & sustainability',
          target: '/discover#discover-pillars',
          icon: Layers
        },
        {
          title: 'Suspended Kinetic Art',
          desc: 'The Lumina Helios 420-ring light sculpture',
          target: '/discover#discover-kinetic',
          icon: Compass
        },
        {
          title: '3D Atrium Concourse',
          desc: 'Interactive 3D view of the central rotunda',
          target: 0.38,
          icon: NavIcon
        }
      ]
    },
    {
      id: 'shopping',
      label: 'Shopping',
      path: '/shopping',
      target: '/shopping',
      subItems: [
        {
          title: 'All 27 Stores & Brand Directory',
          desc: 'Tanishq, Levi\'s, Puma, Adidas, Woodland & more',
          target: '/shopping#brands-showcase',
          icon: Sparkles
        },
        {
          title: 'Fashion Colonnade Lookbook',
          desc: 'Editorial fashion campaigns & couture showcases',
          target: '/shopping#shopping-colonnades',
          icon: Layers
        },
        {
          title: 'Ground Floor Flagships',
          desc: 'Verve Apparel, Sole & Step, Lumina Beauty',
          target: 0.28,
          icon: Compass
        },
        {
          title: 'Level 1 Designer District',
          desc: 'Haute Horlogerie & High Jewellery salons',
          target: 0.54,
          icon: Layers
        },
        {
          title: 'Browse Store Directory',
          desc: 'Search all 180+ international boutiques',
          action: () => {
            setIsMobileOpen(false);
            setIsSearchOpen(false);
            setIsLocationOpen(false);
            onOpenDirectory();
          },
          icon: Search
        }
      ]
    },
    {
      id: 'dining',
      label: 'Dining',
      path: '/dining',
      target: '/dining',
      subItems: [
        {
          title: 'Gastronomy Atelier & Salon',
          desc: 'Michelin-starred tasting rooms & European cafes',
          target: '/dining#dining-intro',
          icon: UtensilsCrossed
        },
        {
          title: 'Fine-Dining Culinary Pillars',
          desc: 'Artisanal roastery, patisserie & signature grills',
          target: '/dining#dining-pillars',
          icon: Sparkles
        },
        {
          title: 'Level 2 Food Court',
          desc: 'Masala Craft, Roastery, Stacks Burgers, Patisserie',
          target: 0.76,
          icon: UtensilsCrossed
        },
        {
          title: 'Aetheria Sky Lounge & Bar',
          desc: 'Twilight rooftop mixology and sunset views',
          target: '/dining#dining-lounge',
          icon: Sparkles
        }
      ]
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      path: '/entertainment',
      target: '/entertainment',
      subItems: [
        {
          title: 'INOX Multiplex & Cinema Halls',
          desc: 'Premier cinema experience with luxury recliner seating',
          target: '/entertainment#entertainment-cinema',
          icon: Film
        },
        {
          title: 'Entertainment Pillars & VR',
          desc: 'Quantum VR arena & interactive play realms',
          target: '/entertainment#entertainment-pillars',
          icon: Sparkles
        },
        {
          title: 'City Cinemas VIP Laser IMAX®',
          desc: 'Dual 4K Laser IMAX® & luxury recliner suites',
          target: 0.88,
          icon: Film
        },
        {
          title: 'The Wonder Forest & Family Play',
          desc: 'Sensory creative discovery space for children',
          target: '/entertainment#entertainment-editorial',
          icon: Layers
        }
      ]
    },
    {
      id: 'experiences',
      label: 'Experiences',
      path: '/experiences',
      target: '/experiences',
      subItems: [
        {
          title: 'VIP Concierge, Valet & Styling',
          desc: 'Chauffeured arrival & hands-free shopping',
          target: '/experiences#experiences-concierge',
          icon: Compass
        },
        {
          title: 'Lifestyle Visual Monograph',
          desc: 'Asymmetric fashion-magazine photo compositions',
          target: '/experiences#experiences-gallery',
          icon: Sparkles
        },
        {
          title: 'Private Skybridge VIP Lounge',
          desc: 'Reserved patron sanctuary with panoramic views',
          target: '/experiences#experiences-vip',
          icon: Layers
        },
        {
          title: '3D Panoramic Walkthrough',
          desc: 'Explore the full mall from top skybridge',
          target: 0.96,
          icon: NavIcon
        }
      ]
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events',
      target: '/events',
      subItems: [
        {
          title: 'Curated Cultural Calendar',
          desc: 'Upcoming runway reveals, concerts & galas',
          target: '/events#events-intro',
          icon: Calendar
        },
        {  
          title: 'International Fashion Week',
          desc: '360° runway showcase on Nov 20–24',
          target: '/events#events-calendar',
          icon: Sparkles
        },
        {
          title: 'Glasshouse Chamber Strings',
          desc: 'Symphonic acoustic night on Dec 04',
          target: '/events#events-showcase',
          icon: Film
        },
        {
          title: 'Cultural Manifesto & Highlights',
          desc: 'Grand oculus evening galas and ceremonies',
          target: '/events#events-gala',
          icon: Sparkles
        }
      ]
    },
    {
      id: 'gift-card',
      label: 'Gift Card',
      path: '/gift-card',
      target: '/gift-card',
      subItems: [
        {
          title: 'Privilege Gift Card Collection',
          desc: 'Brushed titanium & instant digital luxury pass',
          target: '/gift-card#gift-card-collection',
          icon: CreditCard
        },
        {
          title: 'Special Curated Experiences',
          desc: 'Couture shopping, Michelin dining & VIP cinema',
          target: '/gift-card#gift-card-experiences',
          icon: Sparkles
        },
        {
          title: 'Exclusive Cardholder Privileges',
          desc: 'Private lounge access, valet & personal stylist',
          target: '/gift-card#gift-card-privileges',
          icon: Layers
        },
        {
          title: 'Corporate Bulk Gifting Enquiry',
          desc: 'Bespoke co-branding & executive presentation',
          target: '/gift-card#gift-card-enquiry',
          icon: Layers
        }
      ]
    }
  ];

  // Quick search suggestions featuring user brands with direct links to their dedicated 3D showcases
  const searchQuickLinks = [
    { name: 'INOX Cinemas (Multiplex / Cinema Halls)', category: 'Entertainment & Cinema', target: '/shopping/brand/inox-cinemas' },
    { name: "Levi's Store", category: 'Fashion & Apparel', target: '/shopping/brand/levis' },
    { name: 'Louis Philippe', category: 'Fashion & Apparel', target: '/shopping/brand/louis-philippe' },
    { name: 'Allen Solly', category: 'Fashion & Apparel', target: '/shopping/brand/allen-solly' },
    { name: 'Puma', category: 'Sportswear & Footwear', target: '/shopping/brand/puma' },
    { name: 'Adidas', category: 'Athletic Wear & Footwear', target: '/shopping/brand/adidas' },
    { name: 'Tanishq Jewellery', category: 'Fine Jewellery & Diamonds', target: '/shopping/brand/tanishq' },
    { name: 'Woodland Store', category: 'Footwear & Outdoor Gear', target: '/shopping/brand/woodland' },
    { name: 'Metro Shoes', category: 'Footwear & Leather', target: '/shopping/brand/metro-shoes' },
    { name: 'Skechers', category: 'Footwear & Walking Shoes', target: '/shopping/brand/skechers' },
    { name: 'Titan World', category: 'Watches & Accessories', target: '/shopping/brand/titan-world' },
    { name: 'W for Woman', category: 'Contemporary Ethnic Wear', target: '/shopping/brand/w-for-woman' },
    { name: 'Flying Machine', category: 'Youth Denim & Casuals', target: '/shopping/brand/flying-machine' },
    { name: 'Red Chief', category: 'Genuine Leather Footwear', target: '/shopping/brand/red-chief' },
    { name: 'Mufti', category: 'Metropolitan Alternative Casuals', target: '/shopping/brand/mufti' },
    { name: "Spencer Retail Limited / Spencer's", category: 'Department Store & Hypermarket', target: '/shopping/brand/spencers' },
    { name: 'Pizza Hut', category: 'Food & Dining', target: '/shopping/brand/pizza-hut' },
    { name: 'KFC', category: 'Food & Dining', target: '/shopping/brand/kfc' },
    { name: 'Barbeque Nation (nearby)', category: 'Food & Dining', target: '/shopping/brand/barbeque-nation' },
    { name: 'Pind Balluchi', category: 'Food & Dining', target: '/shopping/brand/pind-balluchi' },
    { name: 'The Mirch Masala Restaurant', category: 'Food & Dining', target: '/shopping/brand/mirch-masala' },
    { name: 'Cinnamon Restaurant', category: 'Food & Dining', target: '/shopping/brand/cinnamon-restaurant' },
    { name: 'Subrasa Orion Mall', category: 'Food & Dining', target: '/shopping/brand/subrasa-orion' },
    { name: 'Rangrezza Restaurant & Banquet Hall', category: 'Food & Dining', target: '/shopping/brand/rangrezza' },
    { name: 'Dosa Plaza', category: 'Food & Dining', target: '/shopping/brand/dosa-plaza' },
    { name: 'Looks Salon', category: 'Beauty, Personal Care & Services', target: '/shopping/brand/looks-salon' },
    { name: 'Arjun Mehendi Art', category: 'Beauty, Personal Care & Services', target: '/shopping/brand/arjun-mehendi-art' },
    { name: 'City Mall Privilege Gift Card', category: 'Luxury Gift Card', target: '/gift-card#gift-card-collection' }
  ];

  const filteredLinks = searchQuery.trim()
    ? searchQuickLinks.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchQuickLinks;

  return (
    <>
      <header
        className={`prem-navbar ${isScrolled ? 'scrolled' : ''} ${
          isWaitingForPreloader ? 'hp-navbar-waiting' : isEntranceActive ? 'hp-entrance-navbar' : ''
        }`}
      >
        <div className="prem-navbar-inner">
          {/* ======================================================== */}
          {/* LEFT: BRAND MONOGRAM & LOGO PRESENTATION */}
          {/* ======================================================== */}
          <Link
            to="/"
            className={`prem-brand ${isEntranceActive ? 'hp-navbar-brand-enter' : ''}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="prem-logo-monogram">CM</div>
            <div>
              <div className="prem-brand-name">CITY MALL</div>
              <div className="prem-brand-tagline">Metropolis · International Destination</div>
            </div>
          </Link>

          {/* ======================================================== */}
          {/* CENTER: DESKTOP NAVIGATION LINKS WITH DROPDOWNS */}
          {/* ======================================================== */}
          <nav className="prem-nav-center" aria-label="Main Navigation">
            {navMenuItems.map((menu, idx) => {
              const active = isItemActive(menu.id, menu.path);
              const isDismissed = dismissedDropdownId === menu.id;
              return (
                <div
                  key={menu.id}
                  className={`prem-nav-item ${isDismissed ? 'prem-dropdown-dismissed' : ''} ${isEntranceActive ? 'hp-navbar-item-enter' : ''}`}
                  onMouseLeave={() => {
                    if (dismissedDropdownId === menu.id) {
                      setDismissedDropdownId(null);
                    }
                  }}
                  style={
                    isEntranceActive
                      ? ({ '--hp-nav-delay': `${190 + idx * 60}ms` } as React.CSSProperties)
                      : undefined
                  }
                >
                  <Link
                    to={menu.path}
                    className={`prem-nav-link ${active ? 'active' : ''}`}
                    onClick={(e) => {
                      if (menu.path.includes('#')) {
                        e.preventDefault();
                        navigateTo(menu.path, menu.id);
                      } else {
                        setDismissedDropdownId(menu.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown size={13} className="prem-caret" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="prem-dropdown">
                    {menu.subItems.map((sub, subIdx) => {
                      const Icon = sub.icon;

                      if (sub.action) {
                        return (
                          <button
                            key={subIdx}
                            type="button"
                            className="prem-dropdown-item"
                            onClick={() => {
                              setDismissedDropdownId(menu.id);
                              sub.action!();
                            }}
                          >
                            <div className="prem-dropdown-icon">
                              <Icon size={16} />
                            </div>
                            <div className="prem-dropdown-text">
                              <div className="prem-dropdown-title">{sub.title}</div>
                              <div className="prem-dropdown-desc">{sub.desc}</div>
                            </div>
                          </button>
                        );
                      }

                      return (
                        <button
                          key={subIdx}
                          type="button"
                          className="prem-dropdown-item"
                          onClick={() => {
                            if (sub.target !== undefined) {
                              navigateTo(sub.target, menu.id);
                            }
                          }}
                        >
                          <div className="prem-dropdown-icon">
                            <Icon size={16} />
                          </div>
                          <div className="prem-dropdown-text">
                            <div className="prem-dropdown-title">{sub.title}</div>
                            <div className="prem-dropdown-desc">{sub.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* ======================================================== */}
          {/* RIGHT: CONTROLS, SEARCH, LOCATION, VISIT, MOBILE */}
          {/* ======================================================== */}
          <div className={`prem-nav-right ${isEntranceActive ? 'hp-navbar-right-enter' : ''}`}>
            {/* Search Icon & Popover Toggle */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className={`prem-icon-btn ${isSearchOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen((prev) => !prev);
                  setIsLocationOpen(false);
                }}
                title="Search Stores, Dining & Experiences"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Interactive Search Popover */}
              {isSearchOpen && (
                <div
                  className="prem-popover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Search size={15} color="#fb7185" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search boutiques, dining, cinema..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(251, 113, 133, 0.35)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        color: '#ffffff',
                        fontSize: '0.84rem',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)'
                      }}
                    />
                  </div>

                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#fda4af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Quick Destinations
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {filteredLinks.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => navigateTo(item.target)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.03)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.2s ease',
                          border: 'none',
                          width: '100%',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                      >
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f8fafc' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#facc15' }}>{item.category}</div>
                        </div>
                        <ArrowRight size={13} color="#fda4af" />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      onOpenDirectory();
                    }}
                    style={{
                      marginTop: 12,
                      width: '100%',
                      padding: '8px',
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(250, 204, 21, 0.15) 100%)',
                      border: '1px solid rgba(251, 113, 133, 0.4)',
                      color: '#facc15',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <Compass size={14} />
                    <span>Open Full 180+ Store Directory</span>
                  </button>
                </div>
              )}
            </div>

            {/* Location Icon & Popover Toggle */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className={`prem-icon-btn ${isLocationOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLocationOpen((prev) => !prev);
                  setIsSearchOpen(false);
                }}
                title="Mall Location & Floor Plan Guide"
                aria-label="Location"
              >
                <MapPin size={17} />
              </button>

              {/* Location Details Popover */}
              {isLocationOpen && (
                <div
                  className="prem-popover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <MapPin size={16} color="#fb7185" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                      City Mall Metropolis
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#fecdd3', lineHeight: 1.45, marginBottom: 12 }}>
                    100 City Mall Boulevard, Central Commercial Hub, Metropolis MC-10024.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#fef08a', marginBottom: 16 }}>
                    <Clock size={13} color="#facc15" />
                    <span>Today: 10:00 AM – 10:00 PM</span>
                  </div>

                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#fb7185', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Jump Directly To Destination
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <Link
                      to="/shopping"
                      onClick={() => setIsLocationOpen(false)}
                      className="glass-pill"
                      style={{ padding: '6px', fontSize: '0.72rem', color: '#ffe4e6', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block' }}
                    >
                      Shopping Colonnade
                    </Link>
                    <Link
                      to="/dining"
                      onClick={() => setIsLocationOpen(false)}
                      className="glass-pill"
                      style={{ padding: '6px', fontSize: '0.72rem', color: '#ffe4e6', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block' }}
                    >
                      Dining Atelier
                    </Link>
                    <Link
                      to="/entertainment"
                      onClick={() => setIsLocationOpen(false)}
                      className="glass-pill"
                      style={{ padding: '6px', fontSize: '0.72rem', color: '#ffe4e6', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block' }}
                    >
                      Cinema & VR
                    </Link>
                    <Link
                      to="/events"
                      onClick={() => setIsLocationOpen(false)}
                      className="glass-pill"
                      style={{ padding: '6px', fontSize: '0.72rem', color: '#ffe4e6', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block' }}
                    >
                      Events Calendar
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Soundscape Audio Toggle */}
            <button
              type="button"
              onClick={handleAudioToggle}
              title={isAudioPlaying ? 'Mute Ambient Music' : 'Play Ambient Soundscape'}
              className="prem-icon-btn"
              aria-label="Toggle Sound"
            >
              {isAudioPlaying ? <Volume2 size={17} color="#fb7185" /> : <VolumeX size={17} />}
            </button>

            {/* Day / Night Mode Toggle */}
            <button
              type="button"
              onClick={onToggleNightMode}
              title={isNightMode ? 'Switch to Golden Hour Day' : 'Switch to Night Lighting'}
              className="prem-icon-btn"
              aria-label="Toggle Night Mode"
            >
              {isNightMode ? <Sun size={17} color="#facc15" /> : <Moon size={17} color="#fb7185" />}
            </button>

            {/* Contact / Visit Us Button */}
            <button
              type="button"
              onClick={onOpenVisit}
              className="prem-cta-btn"
              title="Plan Your Visit to City Mall"
            >
              <Calendar size={15} />
              <span>Visit Us</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="prem-hamburger"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileOpen((prev) => !prev);
              }}
              title="Toggle Mobile Navigation"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MOBILE RESPONSIVE SLIDE-DOWN DRAWER */}
      {/* ======================================================== */}
      {isMobileOpen && (
        <div
          className="prem-mobile-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {navMenuItems.map((item) => {
              const active = isItemActive(item.id, item.path);
              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <button
                    type="button"
                    className={`prem-mobile-link ${active ? 'active' : ''}`}
                    onClick={() => navigateTo(item.target)}
                    style={{
                      background: 'none',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} color="#fb7185" />
                  </button>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 8, marginBottom: 4 }}>
                    {item.subItems.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => {
                          if (sub.action) sub.action();
                          else if (sub.target !== undefined) navigateTo(sub.target);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(251, 113, 133, 0.25)',
                          borderRadius: 6,
                          color: '#fda4af',
                          fontSize: '0.74rem',
                          textAlign: 'left',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenDirectory();
              }}
              className="glass-pill"
              style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: '#facc15',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                border: '1px solid rgba(251, 113, 133, 0.35)',
                background: 'rgba(244, 63, 94, 0.12)'
              }}
            >
              <Compass size={15} />
              <span>Store Directory</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenVisit();
              }}
              className="prem-cta-btn"
              style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: '0.78rem'
              }}
            >
              <Calendar size={15} />
              <span>Plan Visit</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
