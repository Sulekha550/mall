import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  X,
  Compass,
  Film,
  ShoppingBag,
  Gem,
  Footprints,
  Scissors,
  Store,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  LayoutGrid,
  Eye,
  LucideIcon
} from 'lucide-react';
import { ThreeDTiltCard } from '../3d/ThreeDTiltCard';

import { ALL_MALL_BRANDS, MallBrand } from '../../data/mallBrandsData';

export { ALL_MALL_BRANDS };
export type { MallBrand };

interface CategoryMeta {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number;
}

interface PremiumBrandDirectoryProps {
  onOpenDirectory?: () => void;
}

export const PremiumBrandDirectory: React.FC<PremiumBrandDirectoryProps> = ({ onOpenDirectory }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track active image index for each brand card
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});

  // Mode D: Fullscreen Expandable Brand Experience modal state
  const [lightboxBrand, setLightboxBrand] = useState<MallBrand | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);

  // Modern presentation style:
  // 'wall' = A. Luxury Brand Wall (Multi-Brand Grid, 3-4 per row on desktop)
  // 'editorial' = B. Editorial Brand Galleries (Asymmetrical paired monograph spreads)
  // 'horizontal' = C. Horizontal Brand Collections (Smooth category scrolling reels)
  const [presentationMode, setPresentationMode] = useState<'wall' | 'editorial' | 'horizontal'>('wall');

  const categories: CategoryMeta[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Houses', icon: Compass, count: ALL_MALL_BRANDS.length },
      { id: 'fashion', label: 'Fashion & Haute Couture', icon: ShoppingBag, count: 6 },
      { id: 'dining', label: 'Dining & Gastronomy', icon: UtensilsCrossed, count: 9 },
      { id: 'footwear', label: 'Footwear & Outdoor', icon: Footprints, count: 4 },
      { id: 'jewellery', label: 'Jewellery & Horology', icon: Gem, count: 2 },
      { id: 'sports', label: 'Activewear & Sports', icon: ShoppingBag, count: 2 },
      { id: 'beauty', label: 'Wellness & Beauty', icon: Scissors, count: 2 },
      { id: 'entertainment', label: 'Entertainment & Leisure', icon: Film, count: 1 },
      { id: 'retail', label: 'Retail & Hypermarket', icon: Store, count: 1 }
    ];
  }, []);

  const filteredBrands = useMemo(() => {
    return ALL_MALL_BRANDS.filter((brand) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        brand.categorySlug === selectedCategory ||
        brand.department.toLowerCase().includes(selectedCategory) ||
        (selectedCategory === 'fashion' && brand.department === 'Fashion & Haute Couture') ||
        (selectedCategory === 'dining' && brand.department === 'Dining & Gastronomy') ||
        (selectedCategory === 'footwear' && brand.department === 'Footwear & Outdoor') ||
        (selectedCategory === 'jewellery' && brand.department === 'Jewellery & Horology') ||
        (selectedCategory === 'sports' && brand.department === 'Activewear & Sports') ||
        (selectedCategory === 'beauty' && brand.department === 'Wellness & Beauty') ||
        (selectedCategory === 'entertainment' && brand.department === 'Entertainment & Leisure') ||
        (selectedCategory === 'retail' && brand.department === 'Retail & Lifestyle');
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        brand.name.toLowerCase().includes(q) ||
        brand.category.toLowerCase().includes(q) ||
        brand.department.toLowerCase().includes(q) ||
        brand.floor.toLowerCase().includes(q) ||
        brand.unit.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const groupedCategories = useMemo(() => {
    const list: { category: string; icon: LucideIcon; brands: MallBrand[] }[] = [];
    const catMap = new Map<string, MallBrand[]>();
    filteredBrands.forEach((b) => {
      if (!catMap.has(b.category)) {
        catMap.set(b.category, []);
      }
      catMap.get(b.category)!.push(b);
    });

    catMap.forEach((brands, category) => {
      const meta = categories.find((c) => c.label === category);
      list.push({
        category,
        icon: meta ? meta.icon : ShoppingBag,
        brands
      });
    });
    return list;
  }, [filteredBrands, categories]);

  const handleSelectImage = (brandId: string, index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageMap((prev) => ({ ...prev, [brandId]: index }));
  };

  const openLightbox = (brand: MallBrand, index: number = 0) => {
    setLightboxBrand(brand);
    setLightboxImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxBrand(null);
  };

  const nextLightboxImage = () => {
    if (!lightboxBrand) return;
    setLightboxImageIndex((prev) => (prev + 1) % lightboxBrand.images.length);
  };

  const prevLightboxImage = () => {
    if (!lightboxBrand) return;
    setLightboxImageIndex((prev) => (prev - 1 + lightboxBrand.images.length) % lightboxBrand.images.length);
  };

  // Navigate to previous or next brand while inside Mode D (Expandable Brand Experience)
  const currentBrandIdx = lightboxBrand
    ? ALL_MALL_BRANDS.findIndex((b) => b.id === lightboxBrand.id)
    : -1;

  const navigateBrand = (direction: 'prev' | 'next') => {
    if (currentBrandIdx === -1) return;
    const total = ALL_MALL_BRANDS.length;
    const newIdx = direction === 'next' ? (currentBrandIdx + 1) % total : (currentBrandIdx - 1 + total) % total;
    setLightboxBrand(ALL_MALL_BRANDS[newIdx]);
    setLightboxImageIndex(0);
  };

  return (
    <section
      id="brands-directory-inner"
      style={{
        position: 'relative',
        padding: '32px clamp(14px, 2vw, 28px) 72px',
        maxWidth: 1440,
        width: '100%',
        margin: '0 auto',
        background: 'transparent',
        overflowX: 'clip',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, width: '100%', minWidth: 0 }}>
        {/* =====================================================================
            TOP LUXURY BRAND EMBLEM RIBBON (ALL 27 BRANDS CONTINUOUS TICKER)
            ===================================================================== */}
        <div
          style={{
            marginBottom: 36,
            padding: '10px 16px',
            background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.08) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(212, 175, 55, 0.08) 100%)',
            borderTop: '1px solid rgba(212, 175, 55, 0.3)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 14,
            overflowX: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            scrollbarWidth: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, paddingRight: 12, borderRight: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <Sparkles size={14} color="#d4af37" />
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#854d0e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              OFFICIAL HOUSES:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {ALL_MALL_BRANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setSearchQuery(b.name);
                  const el = document.getElementById(`brand-card-${b.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                style={{
                  background: searchQuery.toLowerCase() === b.name.toLowerCase() ? 'linear-gradient(135deg, #d4af37, #b45309)' : 'rgba(255, 255, 255, 0.85)',
                  color: searchQuery.toLowerCase() === b.name.toLowerCase() ? '#ffffff' : '#4a343c',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '5px 12px',
                  borderRadius: 9999,
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                title={`Filter to ${b.name}`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header: Minimal Text, Maximum Elegance */}
        <div className="hp-hero-text-shield" style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto 36px', position: 'relative', zIndex: 1 }}>
          <div
            className="ed-section-badge royal-gold-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(112, 26, 117, 0.1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              color: '#854d0e',
              boxShadow: '0 4px 16px rgba(212, 175, 55, 0.2)',
              marginBottom: 16
            }}
          >
            <Sparkles size={14} color="#d4af37" />
            <span>ROYAL BRAND MONOGRAPH · 27 ICONIC HOUSES · 189 VISUALS</span>
          </div>

          <h2
            className="ed-section-title"
            style={{
              color: '#1a1016',
              fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
              letterSpacing: '0.03em',
              lineHeight: 1.12,
              marginBottom: 10
            }}
          >
            The Master Brand Showcase
          </h2>

          <p
            className="ed-section-subtitle"
            style={{
              color: '#574852',
              fontSize: '1.02rem',
              lineHeight: 1.5,
              margin: '0 auto'
            }}
          >
            Immerse yourself in our curated collection of 27 world-class flagships, dining houses, and cinema salons across three luxury tiers.
          </p>
        </div>

        {/* Live Search & Filter Controls */}
        <div style={{ marginBottom: 34 }}>
          {/* Centered Luxury Search Input */}
          <div
            style={{
              maxWidth: 620,
              margin: '0 auto 20px',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                borderRadius: 9999,
                padding: '11px 22px',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.12), 0 0 20px rgba(112, 26, 117, 0.05)'
              }}
            >
              <Search size={18} color="#d4af37" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search all 27 brands (e.g. Levi's, Tanishq, Puma, KFC, Pind Balluchi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.92rem',
                  color: '#1c1317',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#854d0e',
                    cursor: 'pointer'
                  }}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9999,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    border: active
                      ? '1px solid #d4af37'
                      : '1px solid rgba(212, 175, 55, 0.28)',
                    background: active
                      ? 'linear-gradient(135deg, #d4af37 0%, #f59e0b 50%, #b45309 100%)'
                      : '#ffffff',
                    color: active ? '#ffffff' : '#4a343c',
                    cursor: 'pointer',
                    boxShadow: active
                      ? '0 6px 20px rgba(212, 175, 55, 0.35)'
                      : '0 2px 8px rgba(212, 175, 55, 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontWeight: active ? 700 : 500,
                    userSelect: 'none'
                  }}
                >
                  <Icon size={14} color={active ? '#ffffff' : '#b45309'} />
                  <span>{cat.label}</span>
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: 9999,
                      fontSize: '0.68rem',
                      background: active ? 'rgba(0, 0, 0, 0.22)' : 'rgba(212, 175, 55, 0.15)',
                      color: active ? '#ffffff' : '#854d0e',
                      fontWeight: 700
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Results Info & 2026 Modern Presentation Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
            color: '#6b5e68',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          <div>
            Displaying <strong style={{ color: '#1a1016' }}>{filteredBrands.length}</strong> Official Brands · 189 Unique High-Resolution Visuals
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            {/* 3 Presentation Modes: Luxury Brand Wall (Default), Editorial Galleries, Horizontal Collections */}
            <div
              style={{
                display: 'inline-flex',
                background: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: 9999,
                padding: 3,
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}
            >
              <button
                type="button"
                onClick={() => setPresentationMode('wall')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 9999,
                  border: 'none',
                  background: presentationMode === 'wall' ? 'linear-gradient(135deg, #d4af37, #b45309)' : 'transparent',
                  color: presentationMode === 'wall' ? '#ffffff' : '#6b5e68',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Luxury Brand Wall (Maximum Brands Visible)"
              >
                <LayoutGrid size={13} />
                <span>Luxury Brand Wall</span>
              </button>

              <button
                type="button"
                onClick={() => setPresentationMode('editorial')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 9999,
                  border: 'none',
                  background: presentationMode === 'editorial' ? 'linear-gradient(135deg, #d4af37, #b45309)' : 'transparent',
                  color: presentationMode === 'editorial' ? '#ffffff' : '#6b5e68',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Editorial Brand Galleries"
              >
                <Layers size={13} />
                <span>Editorial Galleries</span>
              </button>

              <button
                type="button"
                onClick={() => setPresentationMode('horizontal')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 9999,
                  border: 'none',
                  background: presentationMode === 'horizontal' ? 'linear-gradient(135deg, #d4af37, #b45309)' : 'transparent',
                  color: presentationMode === 'horizontal' ? '#ffffff' : '#6b5e68',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="Horizontal Collections (Category Reels)"
              >
                <Film size={13} />
                <span>Horizontal Reels</span>
              </button>
            </div>

            {onOpenDirectory && (
              <button
                type="button"
                onClick={onOpenDirectory}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b45309',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                <span>3D Spatial Map</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* =====================================================================
            A. LUXURY BRAND WALL (PRIMARY VIEW MODE: MAXIMUM BRANDS PER SCREEN)
            ===================================================================== */}
        {presentationMode === 'wall' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
              gap: 18,
              width: '100%'
            }}
          >
            {filteredBrands.map((brand) => {
              const activeIdx = activeImageMap[brand.id] || 0;
              const currentImg = brand.images[activeIdx] || brand.images[0];
              const totalImgs = brand.images.length;

              return (
                <div
                  key={brand.id}
                  id={`brand-card-${brand.id}`}
                  className="royal-card ed-lift-target"
                  style={{
                    borderRadius: 16,
                    border: '1px solid rgba(212, 175, 55, 0.42)',
                    background: 'rgba(253, 252, 249, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 12px 28px rgba(212, 175, 55, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* Top Bar with Minimal Badges */}
                  <div
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(250, 246, 240, 0.85)',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: '#854d0e',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          padding: '2px 8px',
                          borderRadius: 9999,
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700
                        }}
                      >
                        {brand.unit}
                      </span>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#574852',
                          fontWeight: 600
                        }}
                      >
                        {brand.floor.split('·')[0].trim()}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#16a34a',
                        fontWeight: 700
                      }}
                    >
                      <Clock size={10} color="#16a34a" />
                      <span>{brand.timing}</span>
                    </div>
                  </div>

                  {/* Compact Main Hero Photograph (Height: 170px) */}
                  <div
                    style={{
                      position: 'relative',
                      height: 170,
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => openLightbox(brand, activeIdx)}
                    title={`Click to open full ${brand.name} collection`}
                  >
                    <img
                      src={currentImg}
                      alt={`${brand.name} showcase`}
                      className="ed-img royal-zoom-effect"
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div className="three-d-light-beam" />
                    <div className="three-d-rim-glow" />
                    <div className="ed-scrim-bottom" />

                    {/* Top Right Quick Expand Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(brand, activeIdx);
                      }}
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 3,
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Expand Brand Experience"
                      aria-label="Expand Brand Experience"
                    >
                      <Maximize2 size={13} color="#fef08a" />
                    </button>

                    {/* Top Left Category Tag */}
                    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 3 }}>
                      <span
                        style={{
                          background: 'rgba(253, 252, 249, 0.94)',
                          backdropFilter: 'blur(8px)',
                          color: '#854d0e',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          padding: '4px 12px',
                          borderRadius: 9999,
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {brand.category}
                      </span>
                    </div>

                    {/* Bottom Floating Title */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 16,
                        right: 16,
                        zIndex: 3,
                        color: '#ffffff'
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          margin: 0,
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  {/* Supporting Multi-Photo Thumbnail Strip (5 photos) */}
                  <div
                    style={{
                      padding: '10px 12px 12px',
                      background: 'rgba(250, 246, 240, 0.82)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      flex: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 8,
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#854d0e',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}
                      >
                        <span>GALLERY ({activeIdx + 1}/{totalImgs})</span>
                        <span style={{ color: '#b45309' }}>HOVER / CLICK TO SWAP</span>
                      </div>

                      {/* 5 Thumbnails Strip */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(5, 1fr)',
                          gap: 6
                        }}
                      >
                        {brand.images.slice(0, 5).map((img, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectImage(brand.id, i)}
                            onMouseEnter={() => handleSelectImage(brand.id, i)}
                            style={{
                              position: 'relative',
                              height: 36,
                              borderRadius: 6,
                              overflow: 'hidden',
                              border: i === activeIdx ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.25)',
                              cursor: 'pointer',
                              transform: i === activeIdx ? 'scale(1.05)' : 'scale(1)',
                              boxShadow: i === activeIdx ? '0 2px 8px rgba(212, 175, 55, 0.35)' : 'none',
                              transition: 'all 0.2s ease'
                            }}
                            title={`Photo ${i + 1} of ${brand.name}`}
                          >
                            <img
                              src={img}
                              alt=""
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                opacity: i === activeIdx ? 1 : 0.72
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 10,
                        borderTop: '1px solid rgba(212, 175, 55, 0.2)'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(brand, activeIdx)}
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(180, 83, 9, 0.12) 100%)',
                          border: '1px solid rgba(212, 175, 55, 0.45)',
                          color: '#854d0e',
                          padding: '6px 14px',
                          borderRadius: 6,
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(180, 83, 9, 0.12) 100%)';
                          e.currentTarget.style.color = '#854d0e';
                        }}
                      >
                        <Eye size={12} />
                        <span>EXPAND EXPERIENCE ({totalImgs})</span>
                      </button>

                      {onOpenDirectory && (
                        <button
                          type="button"
                          onClick={onOpenDirectory}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#b45309',
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <MapPin size={11} />
                          <span>LOCATE</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            B. EDITORIAL BRAND GALLERIES (ASYMMETRICAL PAIRED MONOGRAPH SPREADS)
            ===================================================================== */}
        {presentationMode === 'editorial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filteredBrands.map((brand, idx) => {
              const activeIdx = activeImageMap[brand.id] || 0;
              const currentImg = brand.images[activeIdx] || brand.images[0];
              const totalImgs = brand.images.length;

              return (
                <div
                  key={brand.id}
                  id={`brand-card-${brand.id}`}
                  className="royal-card ed-lift-target"
                  style={{
                    width: '100%',
                    borderRadius: 24,
                    border: '1px solid rgba(212, 175, 55, 0.45)',
                    background: '#fdfcf9',
                    overflow: 'hidden',
                    boxShadow: '0 18px 45px rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <div className="brand-split-grid" style={{ minHeight: 280 }}>
                    {/* Left Side: 58% Cinematic Main Photograph */}
                    <div
                      style={{
                        position: 'relative',
                        minHeight: 280,
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => openLightbox(brand, activeIdx)}
                      title="Click to expand high-resolution photograph"
                    >
                      <img
                        src={currentImg}
                        alt={`${brand.name} lead photograph`}
                        className="ed-img royal-zoom-effect"
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div className="three-d-light-beam" />
                      <div className="three-d-rim-glow" />
                      <div className="ed-scrim-bottom" />

                      {/* Top-Left Floating Luxury Category Pill */}
                      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                        <span
                          style={{
                            background: 'rgba(253, 252, 249, 0.94)',
                            backdropFilter: 'blur(12px)',
                            color: '#854d0e',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            padding: '6px 16px',
                            borderRadius: 9999,
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {brand.category}
                        </span>
                      </div>

                      {/* Top-Right Quick Expand Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(brand, activeIdx);
                        }}
                        style={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 3,
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: 'rgba(0, 0, 0, 0.65)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(212, 175, 55, 0.4)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Expand Lightbox"
                        aria-label="Expand Lightbox"
                      >
                        <Maximize2 size={15} />
                      </button>

                      {/* Bottom Floating Title Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 18,
                          left: 20,
                          right: 20,
                          zIndex: 3,
                          color: '#ffffff'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: '#fef08a',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {brand.floor} · {brand.unit}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
                            margin: '4px 0 0',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)'
                          }}
                        >
                          {brand.name}
                        </h3>
                      </div>
                    </div>

                    {/* Right Side: 44% Details Panel & Multi-Photo Gallery Grid */}
                    <div
                      style={{
                        padding: '18px 20px',
                        background: 'rgba(250, 246, 240, 0.88)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minWidth: 0,
                        borderLeft: '1px solid rgba(212, 175, 55, 0.25)'
                      }}
                    >
                      {/* Top Meta Details */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 14,
                            flexWrap: 'wrap',
                            gap: 8
                          }}
                        >
                          <span
                            style={{
                              padding: '4px 12px',
                              borderRadius: 6,
                              background: 'rgba(212, 175, 55, 0.15)',
                              color: '#854d0e',
                              fontSize: '0.74rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              border: '1px solid rgba(212, 175, 55, 0.35)'
                            }}
                          >
                            {brand.unit}
                          </span>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: '0.74rem',
                              fontFamily: 'var(--font-mono)',
                              color: '#16a34a',
                              fontWeight: 700,
                              background: 'rgba(22, 163, 74, 0.1)',
                              padding: '4px 10px',
                              borderRadius: 9999,
                              border: '1px solid rgba(22, 163, 74, 0.25)'
                            }}
                          >
                            <Clock size={12} color="#16a34a" />
                            <span>{brand.timing}</span>
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            color: '#854d0e',
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            fontWeight: 700,
                            marginBottom: 10
                          }}
                        >
                          CURATED MONOGRAPH · {totalImgs} PHOTOGRAPHS
                        </div>

                        {/* Interactive Multi-Photo Gallery Grid: Clean 4x2 Fit Inside Container */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                            gap: 8,
                            marginBottom: 14
                          }}
                        >
                          {brand.images.map((img, i) => (
                            <div
                              key={i}
                              onClick={() => handleSelectImage(brand.id, i)}
                              style={{
                                position: 'relative',
                                height: 58,
                                borderRadius: 8,
                                overflow: 'hidden',
                                border: i === activeIdx ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.3)',
                                cursor: 'pointer',
                                transform: i === activeIdx ? 'scale(1.03)' : 'scale(1)',
                                boxShadow: i === activeIdx ? '0 4px 12px rgba(212, 175, 55, 0.45)' : 'none',
                                transition: 'all 0.25s ease'
                              }}
                              title={`View photo ${i + 1} of ${brand.name}`}
                            >
                              <img
                                src={img}
                                alt={`${brand.name} preview ${i + 1}`}
                                loading="lazy"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block',
                                  opacity: i === activeIdx ? 1 : 0.75,
                                  transition: 'opacity 0.2s ease'
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Strip */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: 14,
                          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                          flexWrap: 'wrap',
                          gap: 10
                        }}
                      >
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/shopping/brand/${brand.id}`)}
                            style={{
                              background: 'linear-gradient(135deg, #d4af37 0%, #b45309 100%)',
                              border: 'none',
                              color: '#ffffff',
                              padding: '8px 16px',
                              borderRadius: 8,
                              fontSize: '0.76rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 800,
                              letterSpacing: '0.06em',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
                              transition: 'all 0.2s ease'
                            }}
                            title={`Open dedicated 3D showcase for ${brand.name}`}
                          >
                            <Eye size={13} />
                            <span>3D SHOWCASE</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openLightbox(brand, activeIdx)}
                            style={{
                              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(180, 83, 9, 0.12) 100%)',
                              border: '1px solid rgba(212, 175, 55, 0.45)',
                              color: '#854d0e',
                              padding: '8px 14px',
                              borderRadius: 8,
                              fontSize: '0.76rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Maximize2 size={13} />
                            <span>4K MONOGRAPH</span>
                          </button>
                        </div>

                        {onOpenDirectory && (
                          <button
                            type="button"
                            onClick={onOpenDirectory}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#b45309',
                              fontSize: '0.76rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              textTransform: 'uppercase'
                            }}
                          >
                            <MapPin size={13} />
                            <span>Locate on 3D Map</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            C. HORIZONTAL BRAND COLLECTIONS (CATEGORY-BY-CATEGORY REELS)
            ===================================================================== */}
        {presentationMode === 'horizontal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {groupedCategories.map((group) => {
              const IconComp = group.icon;
              return (
                <div key={group.category}>
                  {/* Category Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.2)', border: '1px solid rgba(212, 175, 55, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#854d0e' }}>
                      <IconComp size={16} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#1a1016', margin: 0, fontWeight: 800 }}>
                      {group.category}
                    </h3>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#b45309', background: 'rgba(212, 175, 55, 0.15)', padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>
                      {group.brands.length} HOUSES
                    </span>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div className="cinematic-horizontal-reel">
                    {group.brands.map((brand) => {
                      const activeIdx = activeImageMap[brand.id] || 0;
                      const currentImg = brand.images[activeIdx] || brand.images[0];
                      return (
                        <div
                          key={brand.id}
                          className="cinematic-snap-item royal-card ed-lift-target"
                          style={{
                            width: 280,
                            borderRadius: 16,
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            background: 'rgba(253, 252, 249, 0.88)',
                            backdropFilter: 'blur(10px)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div
                            style={{ position: 'relative', height: 170, overflow: 'hidden', cursor: 'pointer' }}
                            onClick={() => openLightbox(brand, activeIdx)}
                          >
                            <img
                              src={currentImg}
                              alt={brand.name}
                              className="ed-img royal-zoom-effect"
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="three-d-light-beam" />
                            <div className="three-d-rim-glow" />
                            <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, color: '#ffffff' }}>
                              <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#fef08a', fontWeight: 700 }}>
                                {brand.floor} · {brand.unit}
                              </span>
                              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '2px 0 0', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                {brand.name}
                              </h4>
                            </div>
                          </div>

                          {/* Mini Thumbnail Row */}
                          <div style={{ padding: '8px 12px', background: '#faf6f0', display: 'flex', gap: 6 }}>
                            {brand.images.slice(0, 4).map((img, i) => (
                              <div
                                key={i}
                                onClick={() => handleSelectImage(brand.id, i)}
                                style={{
                                  flex: 1,
                                  height: 40,
                                  borderRadius: 6,
                                  overflow: 'hidden',
                                  border: i === activeIdx ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.25)',
                                  cursor: 'pointer'
                                }}
                              >
                                <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            ))}
                          </div>

                          <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#b45309', fontWeight: 700 }}>{brand.unit}</span>
                            <button
                              type="button"
                              onClick={() => openLightbox(brand, activeIdx)}
                              style={{
                                background: 'linear-gradient(135deg, #d4af37, #b45309)',
                                border: 'none',
                                color: '#ffffff',
                                padding: '5px 12px',
                                borderRadius: 6,
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Expand ({brand.images.length})
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================================
          D. EXPANDABLE BRAND EXPERIENCE (DEDICATED FULLSCREEN IMMERSIVE MODAL)
          ===================================================================== */}
      {lightboxBrand && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10050,
            background: 'rgba(12, 8, 14, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px clamp(16px, 3vw, 40px)',
            overflowY: 'auto'
          }}
          onClick={closeLightbox}
        >
          {/* Top Bar with Brand Info, Next/Previous Brand Cycling & Close */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 1400,
              margin: '0 auto 16px',
              color: '#ffffff',
              flexWrap: 'wrap',
              gap: 16
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#fde047',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                >
                  {lightboxBrand.category} · {lightboxBrand.floor} · {lightboxBrand.unit}
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#86efac',
                    background: 'rgba(22, 163, 74, 0.2)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    border: '1px solid rgba(22, 163, 74, 0.4)'
                  }}
                >
                  {lightboxBrand.timing}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  margin: 0,
                  color: '#ffffff'
                }}
              >
                {lightboxBrand.name}
              </h2>
            </div>

            {/* Middle: Brand Tour Cycler */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={() => navigateBrand('prev')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 55, 0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                title="Go to previous brand"
              >
                <ChevronLeft size={14} />
                <span>Previous Brand</span>
              </button>

              <span
                style={{
                  padding: '5px 12px',
                  borderRadius: 9999,
                  background: 'rgba(212, 175, 55, 0.18)',
                  color: '#fef08a',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  border: '1px solid rgba(212, 175, 55, 0.45)'
                }}
              >
                Brand {currentBrandIdx + 1} of {ALL_MALL_BRANDS.length}
              </span>

              <button
                type="button"
                onClick={() => navigateBrand('next')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 55, 0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                title="Go to next brand"
              >
                <span>Next Brand</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Right: Dedicated 3D Showcase & Close buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  closeLightbox();
                  navigate(`/shopping/brand/${lightboxBrand.id}`);
                }}
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #b45309)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: 9999,
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)'
                }}
                title="Open dedicated full 3D showcase page"
              >
                <Eye size={13} />
                <span>ENTER 3D SHOWCASE</span>
                <ArrowRight size={13} />
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 55, 0.85)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                title="Close & Return to Showcase"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Center Main Stage Image with Arrow Navigation */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 1300,
              margin: '10px auto',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prevLightboxImage}
              style={{
                position: 'absolute',
                left: 10,
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              title="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={lightboxBrand.images[lightboxImageIndex]}
              alt={`${lightboxBrand.name} photo ${lightboxImageIndex + 1}`}
              style={{
                maxHeight: '62vh',
                maxWidth: '92%',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.3)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            />

            <button
              type="button"
              onClick={nextLightboxImage}
              style={{
                position: 'absolute',
                right: 10,
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              title="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Complete 7-Photo Mosaic Thumbnail Strip */}
          <div
            style={{
              width: '100%',
              maxWidth: 900,
              margin: '12px auto 0',
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              overflowX: 'auto',
              padding: '6px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxBrand.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxImageIndex(i)}
                style={{
                  flex: '0 0 90px',
                  height: 60,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: i === lightboxImageIndex ? '2px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transform: i === lightboxImageIndex ? 'scale(1.08)' : 'scale(1)',
                  opacity: i === lightboxImageIndex ? 1 : 0.65,
                  transition: 'all 0.2s ease',
                  boxShadow: i === lightboxImageIndex ? '0 0 15px rgba(212, 175, 55, 0.5)' : 'none'
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
