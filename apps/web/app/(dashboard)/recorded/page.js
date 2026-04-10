'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const RECORDED = [
  { id: 'r1', title: 'Investor Pitch Masterclass — Full Recording', host: 'Rahul Mehta', date: 'Apr 6, 2025', duration: '1h 32m', views: 1284, tag: 'Fundraising', watched: false, progress: 0, img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600', timestamp: 1712361600000 },
  { id: 'r2', title: 'Growth Hacking Deep Dive', host: 'Priya Sharma', date: 'Apr 3, 2025', duration: '58m', views: 934, tag: 'Growth', watched: false, progress: 35, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', timestamp: 1712102400000 },
  { id: 'r3', title: 'Legal Essentials for Founders', host: 'Adv. Vikram S.', date: 'Mar 28, 2025', duration: '44m', views: 612, tag: 'Legal', watched: true, progress: 100, img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600', timestamp: 1711584000000 },
  { id: 'r4', title: 'Startup Finance Fundamentals', host: 'CA Sneha G.', date: 'Mar 20, 2025', duration: '1h 10m', views: 2103, tag: 'Finance', watched: false, progress: 70, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', timestamp: 1710892800000 },
  { id: 'r5', title: 'Product-Market Fit Webinar', host: 'Arjun Kapoor', date: 'Mar 15, 2025', duration: '1h 55m', views: 2201, tag: 'Product', watched: true, progress: 100, img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600', timestamp: 1710460800000 },
  { id: 'r6', title: 'Building a Lean Team', host: 'Divya Kumar', date: 'Mar 10, 2025', duration: '38m', views: 478, tag: 'Strategy', watched: false, progress: 0, img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', timestamp: 1710028800000 },
];

const SUBJECTS = ['All Subjects', ...Array.from(new Set(RECORDED.map(r => r.tag)))];
const INSTRUCTORS = ['All Instructors', ...Array.from(new Set(RECORDED.map(r => r.host)))];

function RecordedCard({ cls, layout = 'grid' }) {
  const router = useRouter();
  const isList = layout === 'list';
  const isWatched = cls.watched;

  const handleWatch = () => {
    router.push(`/recorded/${cls.id}`);
  };

  return (
    <div className={`platform-card-v glass-card ${isList ? 'layout-list' : ''}`} style={{
      height: '100%',
      margin: 0,
      display: 'flex',
      flexDirection: isList ? 'row' : 'column',
      minHeight: isList ? '200px' : 'auto',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      background: '#fff',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }} onClick={handleWatch}
       onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'; }}
       onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Thumbnail */}
      <div className="platform-card-v__thumb" style={{
        position: 'relative',
        height: isList ? '200px' : '200px',
        width: isList ? '320px' : '100%',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img src={cls.img} alt={cls.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="play-btn-overlay" style={{ background: 'rgba(0,0,0,0.3)', transition: 'opacity 0.2s' }}>
          <div className="play-btn-circle" style={{ width: '56px', height: '56px', background: 'var(--brand-red)' }}>
            <Icon name="play" size={24} color="#fff" fill="#fff" />
          </div>
        </div>
        <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 6 }}>
          <span style={{ background:'rgba(0,0,0,0.7)', color:'#fff', backdropFilter:'blur(4px)', padding:'4px 10px', borderRadius:'6px', fontSize:'0.7rem', fontWeight:600 }}>{cls.tag}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.85)', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: '0.65rem', fontWeight: 950 }}>{cls.duration}</div>
      </div>

      {/* Body */}
      <div className="platform-card-v__body" style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="platform-card-v__title" style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '8px', color: 'var(--brand-black)', lineHeight: 1.3 }}>{cls.title}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="user" size={12} color="var(--slate-400)" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)', fontWeight: 700 }}>{cls.host}</span>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--slate-50)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="play" size={12} color="var(--slate-300)" /> {cls.views.toLocaleString()} views
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="calendar" size={12} color="var(--slate-300)" /> {cls.date}
          </span>
        </div>

        {cls.progress > 0 && !isWatched && (
          <div style={{ marginTop: '15px' }}>
             <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--brand-red)', marginBottom: '4px', textTransform: 'uppercase' }}>{cls.progress}% Watched</div>
            <div className="prog-bar-track" style={{ height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
               
              <div className="prog-bar-fill" style={{ width: `${cls.progress}%`, height: '100%', background: 'var(--brand-red)' }} />
            </div>
          </div>
        )}
        {isWatched && (
           <div style={{ marginTop: '15px' }}>
               <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Fully Watched
               </div>
               <div className="prog-bar-track" style={{ height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden', marginTop: '4px' }}>
                 <div className="prog-bar-fill" style={{ width: `100%`, height: '100%', background: '#10b981' }} />
               </div>
           </div>
        )}
      </div>
    </div>
  );
}

export default function RecordedSessionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'watched', 'unwatched'
  const [layout, setLayout] = useState('grid');
  
  // Advanced Filters
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [instructorFilter, setInstructorFilter] = useState('All Instructors');
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent', 'popular'

  const filtered = useMemo(() => {
    let result = RECORDED.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.host.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q);
      const matchFilter = filter === 'all' || (filter === 'watched' && r.watched) || (filter === 'unwatched' && !r.watched);
      const matchSubject = subjectFilter === 'All Subjects' || r.tag === subjectFilter;
      const matchInstructor = instructorFilter === 'All Instructors' || r.host === instructorFilter;
      
      return matchSearch && matchFilter && matchSubject && matchInstructor;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortOrder === 'recent') return b.timestamp - a.timestamp;
      if (sortOrder === 'popular') return b.views - a.views;
      return 0;
    });

    return result;
  }, [search, filter, subjectFilter, instructorFilter, sortOrder]);

  return (
    <div className="platform-page" style={{ paddingBottom: '4rem' }}>
      <header className="platform-page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="platform-page-title">Course Library</h1>
          <p className="platform-page-subtitle">Access hundreds of masterclasses, workshops, and recorded sessions.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="platform-search-container" style={{ width: '450px' }}>
            <div className="platform-search-icon">
              <Icon name="search" size={18} color="var(--brand-red)" />
            </div>
            <input
              type="text"
              className="platform-search-input"
              placeholder="Search by topic, instructor, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: '#fff', fontSize: '0.95rem' }}
            />
          </div>
        </div>
      </header>

      {/* Advanced Filters Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
          {/* Subject Filter */}
          <select 
            value={subjectFilter} 
            onChange={(e) => setSubjectFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--slate-200)', background: '#fff', fontSize: '0.9rem', fontWeight: 600, color: 'var(--brand-black)', outline: 'none', cursor: 'pointer' }}
          >
             {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Instructor Filter */}
          <select 
            value={instructorFilter} 
            onChange={(e) => setInstructorFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--slate-200)', background: '#fff', fontSize: '0.9rem', fontWeight: 600, color: 'var(--brand-black)', outline: 'none', cursor: 'pointer' }}
          >
             {INSTRUCTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Sort Order */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Sort By</span>
             <select 
               value={sortOrder} 
               onChange={(e) => setSortOrder(e.target.value)}
               style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--slate-200)', background: '#fff', fontSize: '0.9rem', fontWeight: 600, color: 'var(--brand-black)', outline: 'none', cursor: 'pointer' }}
             >
                <option value="recent">Recently Added</option>
                <option value="popular">Most Watched</option>
             </select>
          </div>
      </div>

      {/* Basic Tabs & Layout Toggle */}
      <div className="platform-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="platform-tabs" style={{ background: 'transparent', margin: 0, padding: 0 }}>
          {['all', 'unwatched', 'watched'].map(f => (
            <button
               key={f}
               onClick={() => setFilter(f)}
               style={{ 
                  padding: '10px 24px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: filter === f ? 'var(--brand-red)' : 'transparent',
                  color: filter === f ? '#fff' : 'var(--slate-500)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: '0.2s',
                  textTransform: 'capitalize'
               }}
            >
              {f === 'all' ? 'All Classes' : f === 'watched' ? 'Completed' : 'In Progress / New'}
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
          key={filter + layout + search + subjectFilter + instructorFilter + sortOrder}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
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
            <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <RecordedCard cls={cls} layout={layout} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '16px', border: '1px dashed var(--slate-200)' }}>
           <div style={{ width: 64, height: 64, margin: '0 auto', background: 'rgba(0,0,0,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Icon name="search" size={24} color="var(--slate-400)" />
           </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-black)', marginBottom: '0.5rem' }}>No recordings found</h2>
          <p style={{ color: 'var(--slate-500)' }}>Try adjusting your filters, instructor selection, or search query.</p>
          <button onClick={() => { setSearch(''); setSubjectFilter('All Subjects'); setInstructorFilter('All Instructors'); setFilter('all'); }} style={{ marginTop: '1.5rem', background: 'var(--brand-red)', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Clear Filters</button>
        </div>
      )}

    </div>
  );
}
