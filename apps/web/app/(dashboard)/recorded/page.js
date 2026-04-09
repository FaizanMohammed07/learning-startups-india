'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const RECORDED = [
  { id: 'r1', title: 'Investor Pitch Masterclass — Full Recording', host: 'Rahul Mehta', date: 'Apr 6, 2025', duration: '1h 32m', views: 1284, tag: 'Fundraising', watched: false, progress: 0, img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600' },
  { id: 'r2', title: 'Growth Hacking Deep Dive', host: 'Priya Sharma', date: 'Apr 3, 2025', duration: '58m', views: 934, tag: 'Growth', watched: false, progress: 35, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600' },
  { id: 'r3', title: 'Legal Essentials for Founders', host: 'Adv. Vikram S.', date: 'Mar 28, 2025', duration: '44m', views: 612, tag: 'Legal', watched: true, progress: 100, img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600' },
  { id: 'r4', title: 'Startup Finance Fundamentals', host: 'CA Sneha G.', date: 'Mar 20, 2025', duration: '1h 10m', views: 1103, tag: 'Finance', watched: false, progress: 70, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600' },
  { id: 'r5', title: 'Product-Market Fit Webinar', host: 'Arjun Kapoor', date: 'Mar 15, 2025', duration: '1h 55m', views: 2201, tag: 'Product', watched: true, progress: 100, img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600' },
  { id: 'r6', title: 'Building a Lean Team', host: 'Divya Kumar', date: 'Mar 10, 2025', duration: '38m', views: 478, tag: 'Strategy', watched: false, progress: 0, img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600' },
];

function RecordedCard({ cls, layout = 'grid' }) {
  const isList = layout === 'list';
  const isWatched = cls.watched;

  return (
    <div className={`platform-card-v glass-card ${isList ? 'layout-list' : ''}`} style={{
      height: '100%',
      margin: 0,
      display: 'flex',
      flexDirection: isList ? 'row' : 'column',
      minHeight: isList ? '200px' : 'auto',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      background: '#fff'
    }}>
      {/* Thumbnail */}
      <div className="platform-card-v__thumb" style={{
        position: 'relative',
        height: isList ? '200px' : '200px',
        width: isList ? '320px' : '100%',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img src={cls.img} alt={cls.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="play-btn-overlay" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="play-btn-circle" style={{ width: '56px', height: '56px', background: 'var(--brand-red)' }}>
            <Icon name="play" size={24} color="#fff" fill="#fff" />
          </div>
        </div>
        <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 6 }}>
          <span className="tag-pill tag-red" style={{ fontSize: '0.6rem', border: 'none' }}>{cls.tag}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.85)', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: '0.65rem', fontWeight: 950 }}>{cls.duration}</div>
      </div>

      {/* Body */}
      <div className="platform-card-v__body" style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="platform-card-v__title" style={{ fontSize: '1rem', fontWeight: 950, marginBottom: '8px', color: 'var(--brand-black)', lineHeight: 1.3 }}>{cls.title}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="user" size={12} color="var(--slate-400)" />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 800 }}>{cls.host}</span>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--slate-50)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="eye" size={12} color="var(--slate-300)" /> {cls.views.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="calendar" size={12} color="var(--slate-300)" /> {cls.date}
          </span>
        </div>

        {cls.progress > 0 && !isWatched && (
          <div style={{ marginTop: '15px' }}>
            <div className="prog-bar-track" style={{ height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <div className="prog-bar-fill" style={{ width: `${cls.progress}%`, height: '100%', background: 'var(--brand-red)' }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.25rem' }}>
          <button className={isWatched ? 'btn-black' : 'btn-brand'} style={{ padding: '8px 20px', fontSize: '0.7rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
            <Icon name={isWatched ? 'refresh' : 'play'} size={14} />
            {isWatched ? 'REWATCH' : cls.progress > 0 ? 'CONTINUE' : 'WATCH NOW'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecordedSessionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('grid');

  const filtered = useMemo(() => {
    return RECORDED.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.host.toLowerCase().includes(q);
      const matchFilter = filter === 'all' || (filter === 'watched' && r.watched) || (filter === 'unwatched' && !r.watched);
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Recorded Sessions</h1>
          <p className="platform-page-subtitle">Catch up on curated startup masterclasses.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="platform-search-container" style={{ width: '450px' }}>
            <div className="platform-search-icon">
              <Icon name="search" size={18} color="var(--brand-red)" />
            </div>
            <input
              type="text"
              className="platform-search-input"
              placeholder="Search masterclasses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: '#fff' }}
            />
          </div>
        </div>
      </header>

      {/* Stats row - using consistent style */}
      <div className="platform-stats-grid" style={{ marginBottom: '2.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Library', val: RECORDED.length, icon: 'video', bg: 'rgba(235,35,39,0.05)', tc: 'var(--brand-red)' },
          { label: 'Watched', val: RECORDED.filter(r => r.watched).length, icon: 'checkCircle', bg: 'rgba(16,185,129,0.05)', tc: '#059669' },
          { label: 'In Progress', val: RECORDED.filter(r => r.progress > 0 && !r.watched).length, icon: 'clock', bg: 'rgba(245,158,11,0.05)', tc: '#f59e0b' },
          { label: 'Hours Saved', val: '12h', icon: 'trendUp', bg: 'rgba(59,130,246,0.05)', tc: '#2563eb' },
        ].map((s, i) => (
          <div key={i} className="platform-stat-card" style={{ background: s.bg, padding: '1.5rem' }}>
            <div className="platform-stat-label" style={{ color: s.tc, fontWeight: 800 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <div className="platform-stat-value" style={{ color: 'var(--brand-black)', fontSize: '1.75rem', margin: 0 }}>{s.val}</div>
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <Icon name={s.icon} size={18} color={s.tc} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Layout Toggle */}
      <div className="platform-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="platform-tabs" style={{ background: 'transparent', margin: 0, padding: 0 }}>
          {['all', 'watched', 'unwatched'].map(f => (
            <button
              key={f}
              className={`platform-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              style={{ padding: '0 20px', height: '40px' }}
            >
              {f === 'all' ? 'All' : f === 'watched' ? 'Watched' : 'Unwatched'}
            </button>
          ))}
        </div>

        <div className="layout-toggle-group" style={{ display: 'flex', gap: '8px', background: 'var(--slate-50)', padding: '4px', borderRadius: '12px', border: '1px solid var(--slate-100)' }}>
          <button
            className={`btn-icon-toggle ${layout === 'grid' ? 'active' : ''}`}
            onClick={() => setLayout('grid')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: layout === 'grid' ? '#fff' : 'transparent',
              boxShadow: layout === 'grid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'grid' ? 'var(--brand-black)' : 'var(--slate-400)',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="dashboard" size={14} color={layout === 'grid' ? 'var(--brand-red)' : 'var(--slate-400)'} /> GRID
          </button>
          <button
            className={`btn-icon-toggle ${layout === 'list' ? 'active' : ''}`}
            onClick={() => setLayout('list')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: layout === 'list' ? '#fff' : 'transparent',
              boxShadow: layout === 'list' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'list' ? 'var(--brand-black)' : 'var(--slate-400)',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="recorded" size={14} color={layout === 'list' ? 'var(--brand-red)' : 'var(--slate-400)'} /> LIST
          </button>
        </div>
      </div>

      {/* Grid / List View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + layout + search}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className={layout === 'grid' ? 'platform-grid' : 'platform-list-v'}
          style={{
            display: 'grid',
            gridTemplateColumns: layout === 'grid' ? 'repeat(3, 1fr)' : '1fr',
            gap: '2rem',
            marginTop: '1.5rem'
          }}
        >
          {filtered.map((cls, i) => (
            <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <RecordedCard cls={cls} layout={layout} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="platform-empty">
          <Icon name="recorded" size={48} color="var(--brand-red)" />
          <h2>No recordings found</h2>
          <p>Try matching your search or filters to discover available content.</p>
        </div>
      )}

    </div>
  );
}
