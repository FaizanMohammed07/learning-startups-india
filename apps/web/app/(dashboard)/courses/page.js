'use client';

import { useState, useEffect, useMemo } from 'react';
import { apiGet } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';

/* ──── Main Page ──── */
export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    apiGet('/api/v1/courses').then(res => {
      setCourses(res.data || []);
      setLoading(false);
    });
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const categories = useMemo(
    () => [...new Set(courses.map(c => c.category).filter(Boolean))],
    [courses]
  );

  const filtered = useMemo(() => {
    let result = courses.filter(c => {
      const matchSearch =
        !debouncedSearch ||
        c.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCat = !category || c.category === category;
      return matchSearch && matchCat;
    });

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.enrolledCount || 0) - (a.enrolledCount || 0));
        break;
      case 'price-low':
        result.sort((a, b) => (a.priceInr || a.price || 0) - (b.priceInr || b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.priceInr || b.price || 0) - (a.priceInr || a.price || 0));
        break;
      default: // newest
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [courses, debouncedSearch, category, sortBy]);

  return (
    <div className="platform-page">
      {/* ── HEADER SECTION ── */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Explore Hub</h1>
          <p className="platform-page-subtitle">Premium tracks designed for founders, architects, and product innovators.</p>
        </div>
        
        {/* TOP SEARCH BAR (Above Filters) */}
        <div className="flex-stack-mobile">
          <div className="platform-search-container responsive-search-wrap" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div className="platform-search-icon">
              <Icon name="search" size={16} color="var(--brand-red)" />
            </div>
            <input 
              type="text" 
              className="platform-search-input" 
              placeholder="Search by skill, industry or mentor..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: '#fff' }}
            />
          </div>
        </div>

      </header>

      {/* ── FILTER & SORT BAR ── */}
      <div className="platform-section-label flex-stack-mobile" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        <div className="platform-tabs scroll-tabs-mobile" style={{ background: '#f8fafc', margin: 0, padding: '6px', border: '1px solid #f0f0f0', borderRadius: '16px' }}>
          <button 
            className={`platform-tab ${!category ? 'active' : ''}`} 
            onClick={() => setCategory('')}
            style={{ 
              padding: '0 24px', height: '40px', borderRadius: '12px', 
              fontSize: '0.75rem', fontWeight: 950,
              color: !category ? '#fff' : 'var(--slate-600)',
              background: !category ? 'var(--brand-red)' : 'transparent',
              border: 'none', transition: 'all 0.2s'
            }}
          >
            All Programs
          </button>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`platform-tab ${category === cat ? 'active' : ''}`} 
              onClick={() => setCategory(cat)}
              style={{ 
                padding: '0 24px', height: '40px', borderRadius: '12px', 
                fontSize: '0.75rem', fontWeight: 950,
                color: category === cat ? '#fff' : 'var(--slate-600)',
                background: category === cat ? 'var(--brand-red)' : 'transparent',
                border: 'none', transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>


        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="filter-select-red"
            style={{ 
              padding: '0 36px 0 16px', height: '44px', borderRadius: '14px', 
              border: '2px solid #f1f5f9',
              fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-black)', 
              background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23eb2327\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center',
              appearance: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)', cursor: 'pointer', outline: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="newest">Latest Programs</option>
            <option value="popular">Most Trending</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <style jsx>{`
            .filter-select-red:focus {
              border-color: var(--brand-red) !important;
              box-shadow: 0 0 0 4px rgba(235, 35, 39, 0.1) !important;
            }
          `}</style>
        </div>
      </div>

      {/* ── GRID CONTENT ── */}
      {loading ? (
        <div className="platform-grid fluid-grid-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="platform-card-v glass-card animate-pulse" style={{ height: '320px', background: '#fff', opacity: 0.5 }} />
          ))}
        </div>

      ) : filtered.length === 0 ? (
        <div className="platform-empty" style={{ padding: '6rem 0' }}>
          <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Icon name="search" size={32} color="var(--slate-300)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '0.5rem', color: 'var(--brand-black)' }}>No results for "{search}"</h2>
          <p style={{ color: 'var(--slate-400)', fontWeight: 600 }}>Try adjusting your search terms or filters.</p>
          <button className="btn-brand" style={{ marginTop: '2rem' }} onClick={() => { setSearch(''); setCategory(''); }}>RESET EXPLORE</button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={category + debouncedSearch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="platform-grid fluid-grid-3"
          >

            {filtered.map((course, i) => (
              <motion.div key={course._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <SimpleCourseCard course={course} type="explore" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* FOOTER SPACING */}
      <div style={{ height: '4rem' }} />
    </div>
  );
}
