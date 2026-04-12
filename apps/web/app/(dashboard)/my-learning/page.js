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
      <header className="platform-page-header flex-stack-mobile">
        <div>
          <h1 className="platform-page-title">My Learning</h1>
          <p className="platform-page-subtitle">Track your progress and continue where you left off.</p>
        </div>
        <div className="learning-header-actions flex-stack-mobile">
             <div className="platform-search-container responsive-search-wrap">
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
             <Link href="/courses" className="btn-brand learning-explore-btn">
                <Icon name="plus" size={14} /> Explore New
             </Link>
        </div>
      </header>


      {/* Modern Filter + Layout Toggle */}
      <div className="learning-filter-row">
        <div className="platform-tabs">
          {['all','ongoing','completed'].map(f=>(
            <button 
                key={f} 
                className={`platform-tab ${filter===f?'active':''}`} 
                onClick={()=>setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="layout-toggle-group glass-card">
          <button 
            className={`btn-icon-toggle ${layout === 'grid' ? 'active' : ''}`} 
            onClick={() => setLayout('grid')}
          >
            <Icon name="dashboard" size={14} /> GRID
          </button>
          <button 
            className={`btn-icon-toggle ${layout === 'list' ? 'active' : ''}`} 
            onClick={() => setLayout('list')}
          >
            <Icon name="recorded" size={14} /> LIST
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
            className={layout === 'grid' ? 'platform-grid fluid-grid-3' : 'platform-list-v'}
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
