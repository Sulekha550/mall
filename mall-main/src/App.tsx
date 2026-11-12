import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PremiumNavbar } from './components/PremiumNavbar';
import { StoreDirectoryModal } from './components/StoreDirectoryModal';
import { PlanVisitModal } from './components/PlanVisitModal';
import { ExploreModal } from './components/ExploreModal';
import { ScrollToTop } from './components/ScrollToTop';
import { PersistentMallVideoBackground } from './components/HeroScrollVideoBackground';
import { useClickToLift } from './hooks/useClickToLift';
import { useReducedMotion } from './hooks/useReducedMotion';
import { HotspotData } from './types';

// Page-level components
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { DiningPage } from './pages/DiningPage';
import { EntertainmentPage } from './pages/EntertainmentPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { EventsPage } from './pages/EventsPage';
import { GiftCardPage } from './pages/GiftCardPage';
import { BrandShowcasePage } from './pages/BrandShowcasePage';
import { VisitPage } from './pages/VisitPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isNightMode, setIsNightMode] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [is3DTourOpen, setIs3DTourOpen] = useState(false);
  const hasNavigatedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    hasNavigatedRef.current = true;
    if (location.pathname !== '/') {
      setIs3DTourOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handle3DTourToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIs3DTourOpen(Boolean(customEvent.detail));
    };
    window.addEventListener('citymall:3d-tour-toggle', handle3DTourToggle);
    return () => window.removeEventListener('citymall:3d-tour-toggle', handle3DTourToggle);
  }, []);

  // Enable click-to-lift interactive image animation across all pages
  useClickToLift();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        color: '#1c1317',
        overflowX: 'clip'
      }}
    >
      {/* Single Persistent Scroll-Synchronized Full-Website Video Background */}
      <PersistentMallVideoBackground
        pathname={location.pathname}
        isNightMode={isNightMode}
        reducedMotion={reducedMotion}
        disabled={is3DTourOpen}
      />

      {/* Scroll window to top whenever route changes */}
      <ScrollToTop />

      {/* Global Persistent Premium Navbar */}
      <PremiumNavbar
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenVisit={() => setIsVisitOpen(true)}
        isNightMode={isNightMode}
        onToggleNightMode={() => setIsNightMode((prev) => !prev)}
      />

      {/* Independent Multi-Page Routing with Full-Screen Transition Above Video */}
      <div
        key={location.pathname}
        className={hasNavigatedRef.current && location.pathname !== '/' ? 'hp-route-transition' : undefined}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isNightMode={isNightMode}
                onToggleNightMode={() => setIsNightMode((prev) => !prev)}
                onOpenDirectory={() => setIsDirectoryOpen(true)}
                onOpenVisit={() => setIsVisitOpen(true)}
                onSelectHotspot={(hotspot) => setSelectedHotspot(hotspot)}
              />
            }
          />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route
            path="/shopping"
            element={<ShoppingPage onOpenDirectory={() => setIsDirectoryOpen(true)} />}
          />
          <Route
            path="/shopping/brand/:brandId"
            element={<BrandShowcasePage onOpenDirectory={() => setIsDirectoryOpen(true)} />}
          />
          <Route
            path="/brand/:brandId"
            element={<BrandShowcasePage onOpenDirectory={() => setIsDirectoryOpen(true)} />}
          />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gift-card" element={<GiftCardPage />} />
          <Route path="/giftcard" element={<GiftCardPage />} />
          <Route path="/visit" element={<VisitPage />} />
          {/* Fallback to Home for unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Interactive Spatial Store Directory Modal */}
      <StoreDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        onSelectStore={() => {
          setIsDirectoryOpen(false);
        }}
      />

      {/* Global Plan Arrival / Visit Directions Modal */}
      <PlanVisitModal
        isOpen={isVisitOpen}
        onClose={() => setIsVisitOpen(false)}
      />

      {/* Global 3D Hotspot Boutique Details Modal */}
      <ExploreModal
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
        onPlanVisit={() => {
          setSelectedHotspot(null);
          setIsVisitOpen(true);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
