'use client';

import { useState, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardProvider';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ANDROID_COURSES = [
  { id:'a1', title:'Android UI with Jetpack Compose', description:'Build modern Android interfaces with Google\'s latest declarative toolkit.', category:'Mobile', date:'Mar 2025', tag:'Android', img:'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600', level:'Intermediate', progress: 45, enrolled: true },
  { id:'a2', title:'Kotlin Coroutines & Flow', description:'Master asynchronous programming in Kotlin for robust Android apps.', category:'Kotlin', date:'Feb 2025', tag:'Advanced', img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600', level:'Advanced', progress: 10, enrolled: true },
];

export default function MyLearningPage() {
  const { enrolledCourses, isLoading } = useDashboard();
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('grid');
  const [search, setSearch] = useState('');
  
  const allEnrolled = useMemo(() => {
    return [...(enrolledCourses || []), ...ANDROID_COURSES];
  }, [enrolledCourses]);

  const filtered = useMemo(() => {
    let base = allEnrolled;
    if (filter === 'ongoing') base = allEnrolled.filter(c => (c.progress || 0) < 100);
    if (filter === 'completed') base = allEnrolled.filter(c => (c.progress || 0) === 100);
    
    if (search) {
      const q = search.toLowerCase();
      base = base.filter(c => 
        c.title?.toLowerCase().includes(q) || 
        c.description?.toLowerCase().includes(q)
      );
    }
    return base;
  }, [allEnrolled, filter, search]);

  if (isLoading) return <div className="platform-page">Loading...</div>;

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">My Learning</h1>
          <p className="platform-page-subtitle">Track your progress and continue where you left off.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
             <div className="platform-search-container" style={{ width: '320px' }}>
                <div className="platform-search-icon">
                  <Icon name="search" size={16} color="var(--brand-red)" />
                </div>
                <input 
                  type="text" 
                  className="platform-search-input" 
                  placeholder="Search my courses..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <Link href="/courses" className="btn-brand" style={{ textDecoration: 'none', height: '44px', display: 'flex', alignItems: 'center' }}>
                <Icon name="plus" size={16} /> Explore New
             </Link>
        </div>
      </header>

      {/* Modern Filter + Layout Toggle */}
      <div className="platform-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="platform-tabs" style={{ background: 'transparent', margin: 0, padding: 0 }}>
          {['all','ongoing','completed'].map(f=>(
            <button 
                key={f} 
                className={`platform-tab ${filter===f?'active':''}`} 
                onClick={()=>setFilter(f)}
                style={{ padding: '0 20px', height: '40px' }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="layout-toggle-group glass-card" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
          <button 
            className={`btn-icon-toggle ${layout === 'grid' ? 'active' : ''}`} 
            onClick={() => setLayout('grid')}
            style={{ 
              padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: layout === 'grid' ? '#fff' : 'transparent',
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'grid' ? 'var(--brand-red)' : 'var(--slate-400)',
              boxShadow: layout === 'grid' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Icon name="dashboard" size={14} color={layout === 'grid' ? 'var(--brand-red)' : 'var(--slate-400)'} /> GRID
          </button>
          <button 
            className={`btn-icon-toggle \${layout === 'list' ? 'active' : ''}`} 
            onClick={() => setLayout('list')}
            style={{ 
              padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: layout === 'list' ? '#fff' : 'transparent',
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'list' ? 'var(--brand-red)' : 'var(--slate-400)',
              boxShadow: layout === 'list' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Icon name="recorded" size={14} color={layout === 'list' ? 'var(--brand-red)' : 'var(--slate-400)'} /> LIST
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter + layout}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={layout === 'grid' ? 'platform-grid' : 'platform-list-v'}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: layout === 'grid' ? 'repeat(3, 1fr)' : '1fr', 
              gap: '1.5rem' 
            }}
          >
            {filtered.map((c, i) => (
              <motion.div key={c.id || c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <SimpleCourseCard course={c} type={c.progress === 100 ? "completed" : "enrolled"} layout={layout} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="platform-empty">
           <Icon name="books" size={48} color="var(--brand-red)" />
           <h2>No courses found</h2>
           <p>Start your journey by exploring our available courses.</p>
           <Link href="/courses" className="btn-brand">Go to Explore Hub</Link>
        </div>
      )}
    </div>
  );
}
