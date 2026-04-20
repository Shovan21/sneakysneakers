import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

// Scroll-reveal hook
const useScrollReveal = () => {
  useEffect(() => {
    const run = () => {
      const cards = document.querySelectorAll('.product-card:not(.visible)');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('visible'), i * 55);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
      );
      cards.forEach((c) => observer.observe(c));
      return () => observer.disconnect();
    };
    const cleanup = run();
    return cleanup;
  });
};

const MARQUEE_ITEMS = [
  'New Arrivals', 'Authenticated Pairs', 'Free Returns', 'Premium Brands',
  'Exclusive Drops', 'Limited Editions', 'Fast Shipping', 'Secure Payments',
  'New Arrivals', 'Authenticated Pairs', 'Free Returns', 'Premium Brands',
  'Exclusive Drops', 'Limited Editions', 'Fast Shipping', 'Secure Payments',
];

const PRICE_RANGES = [
  { label: 'All Prices',   min: 0,    max: Infinity },
  { label: '₹0 – ₹2,000', min: 0,    max: 2000 },
  { label: '₹2,000 – ₹4,000', min: 2000, max: 4000 },
  { label: '₹4,000+',     min: 4000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Featured',        value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Name: A – Z',     value: 'name_asc' },
  { label: 'Name: Z – A',     value: 'name_desc' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(0);   // index into PRICE_RANGES
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  useScrollReveal();

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Apply filters
  const { min, max } = PRICE_RANGES[priceRange];
  let filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.price >= min && p.price < max);

  // Apply sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price_asc')  return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'name_asc')   return a.name.localeCompare(b.name);
    if (sort === 'name_desc')  return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-eyebrow">New Arrivals · Spring 2025</p>
            <h1 className="hero-title">
              Step Into<br />
              <span style={{ color: 'var(--accent-gold)' }}>Excellence.</span>
            </h1>
            <p className="hero-subtitle">
              Curated footwear for those who don't follow trends — they set them.
              Authentic pairs, exclusive drops, unmatched quality.
            </p>
            <div className="hero-cta-group">
              <a href="#collection" className="btn btn-primary">
                Shop Collection <ArrowRight size={16} />
              </a>
              <a href="#collection" className="btn btn-outline-light">
                View All Drops
              </a>
            </div>
          </div>
          <div style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/hero-sneaker.png"
              alt="Premium Luxury Sneaker"
              style={{
                width: '420px',
                maxWidth: '42vw',
                filter: 'drop-shadow(0 30px 60px rgba(201,168,76,0.35)) drop-shadow(0 0 80px rgba(0,0,0,0.6))',
                animation: 'heroFloat 4s ease-in-out infinite',
                transform: 'rotate(-8deg)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="marquee-band">
        <div className="marquee-inner">
          {MARQUEE_ITEMS.map((item, i) => (
            <span className="marquee-item" key={i}>
              {item}<span className="dot"> ✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Collection ── */}
      <div className="app-container" style={{ paddingTop: '56px', paddingBottom: '80px' }} id="collection">

        {/* Section Header */}
        <div className="section-header" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <p className="label-tag" style={{ color: 'var(--accent-gold)', marginBottom: '6px' }}>The Collection</p>
            <h2 className="section-title">Featured Kicks</h2>
          </div>

          {/* Sort + Filter toggle */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Sort dropdown */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ArrowUpDown size={14} style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  paddingLeft: '32px',
                  paddingRight: '16px',
                  paddingTop: '9px',
                  paddingBottom: '9px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(f => !f)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 16px',
                border: '1px solid',
                borderColor: showFilters ? 'var(--accent-gold)' : 'var(--border-color)',
                borderRadius: '999px',
                background: showFilters ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                color: showFilters ? '#1a1a1a' : 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.25s ease',
              }}
            >
              <SlidersHorizontal size={13} /> Filters
            </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '28px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            animation: 'fadeInUp 0.25s ease-out both',
          }}>
            {/* Category filter */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Category
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      border: '1px solid',
                      borderColor: category === cat ? 'var(--accent-gold)' : 'var(--border-color)',
                      background: category === cat ? 'var(--accent-gold)' : 'transparent',
                      color: category === cat ? '#1a1a1a' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                  >{cat}</button>
                ))}
              </div>
            </div>

            {/* Price range filter */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Price Range
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => setPriceRange(i)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      border: '1px solid',
                      borderColor: priceRange === i ? 'var(--accent-gold)' : 'var(--border-color)',
                      background: priceRange === i ? 'var(--accent-gold)' : 'transparent',
                      color: priceRange === i ? '#1a1a1a' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                  >{range.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Showing {filtered.length} of {products.length} styles
          {category !== 'All' && ` · ${category}`}
          {priceRange !== 0 && ` · ${PRICE_RANGES[priceRange].label}`}
          {sort !== 'default' && ` · ${SORT_OPTIONS.find(o => o.value === sort)?.label}`}
        </p>

        {loading ? (
          <div className="loading-dots">Loading collection…</div>
        ) : filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">👟</div>
            <h3>No styles match your filters</h3>
            <p>Try adjusting your category or price range.</p>
            <button
              onClick={() => { setCategory('All'); setPriceRange(0); setSort('default'); }}
              className="btn btn-dark"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
