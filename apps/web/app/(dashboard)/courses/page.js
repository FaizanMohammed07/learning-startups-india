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
            style={{ 
              padding: '0 16px', height: '44px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)',
              fontSize: '0.75rem', fontWeight: 850, color: 'var(--brand-black)', background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)', cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
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
