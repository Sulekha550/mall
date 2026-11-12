import React, { useState } from 'react';
import { X, Compass, ChevronRight, MapPin, Search, Tag } from 'lucide-react';
import { STORE_DIRECTORY } from '../data/cameraWaypoints';

interface StoreDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStore: (progress: number) => void;
}

export const StoreDirectoryModal: React.FC<StoreDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectStore
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = [
    'All',
    'Fashion & Apparel',
    'Footwear',
    'Jewellery & Accessories',
    'Food & Dining',
    'Entertainment & Cinema',
    'Beauty & Services',
    'Retail & Department Store'
  ];

  const filteredItems = STORE_DIRECTORY.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.floor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10020,
        background: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-gold"
        style={{
          maxWidth: 960,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '36px 32px',
          background: 'rgba(22, 12, 18, 0.96)',
          border: '1px solid rgba(251, 113, 133, 0.35)',
          borderRadius: 20,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 63, 94, 0.18)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: 20
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Compass size={18} color="#fb7185" />
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#facc15',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                OFFICIAL MALL BRAND & STORE DIRECTORY
              </span>
            </div>
            <h2
              style={{
                fontSize: '1.9rem',
                lineHeight: 1.1,
                fontFamily: 'var(--font-display)',
                color: '#ffffff',
                fontWeight: 800
              }}
            >
              EXPLORE OUR BRANDS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="glass-pill"
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(251, 113, 133, 0.25)',
              borderRadius: '50%'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(251, 113, 133, 0.35)',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 16
            }}
          >
            <Search size={18} color="#fb7185" />
            <input
              type="text"
              placeholder="Search by brand name, category, or floor (e.g. Levi's, Puma, KFC, Tanishq, Shoes)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-sans)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fda4af',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 6
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    border: active
                      ? '1px solid #facc15'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    background: active
                      ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.7) 0%, rgba(250, 204, 21, 0.7) 100%)'
                      : 'rgba(255, 255, 255, 0.04)',
                    color: active ? '#ffffff' : '#fbcfe8',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    fontWeight: active ? 700 : 500
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '48px 24px',
                textAlign: 'center',
                color: '#94a3b8'
              }}
            >
              <Tag size={32} color="#fb7185" style={{ marginBottom: 12, opacity: 0.6 }} />
              <div style={{ fontSize: '1rem', color: '#f1f5f9', fontWeight: 600 }}>
                No brands found matching "{searchTerm}"
              </div>
              <div style={{ fontSize: '0.84rem', marginTop: 4 }}>
                Try searching for another brand or select a different category.
              </div>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectStore(item.progress);
                  onClose();
                }}
                className="glass-panel"
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid rgba(251, 113, 133, 0.16)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 14
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.6)';
                  e.currentTarget.style.background = 'rgba(244, 63, 94, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(251, 113, 133, 0.16)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Image thumbnail */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(251, 113, 133, 0.3)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Text Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#facc15',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: 3,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <MapPin size={12} />
                    <span>{item.floor}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: '1.08rem',
                      color: '#ffffff',
                      marginBottom: 4,
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: '#fecdd3',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      margin: 0
                    }}
                  >
                    {item.tagline}
                  </p>
                </div>

                <ChevronRight size={18} color="#fb7185" style={{ flexShrink: 0 }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
