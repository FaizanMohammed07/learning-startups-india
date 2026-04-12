'use client';

import { useState, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardProvider';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function EnrolledCoursesPage() {
  const { enrolledCourses, isLoading } = useDashboard();
  const [search, setSearch] = useState('');
  const [layout, setLayout] = useState('grid');
  
  const active = useMemo(() => {
    const list = enrolledCourses?.filter(c => (c.progress || 0) < 100) || [];
    if (!search) return list;
    return list.filter(c => 
      c.title?.toLowerCase().includes(search.toLowerCase()) || 
      c.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrolledCourses, search]);

  if (isLoading) return <div className="platform-page">Loading...</div>;

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Enrolled Courses</h1>
          <p className="platform-page-subtitle">Pick up right where you left off.</p>
        </div>
        
        <div className="learning-header-actions">
          <div className="platform-search-container">
            <div className="platform-search-icon">
              <Icon name="search" size={18} />
            </div>
            <input 
              type="text" 
              className="platform-search-input" 
              placeholder="Search enrolled..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/courses" className="btn-brand learning-explore-btn">
             <Icon name="plus" size={16} /> Explore More
          </Link>
        </div>
      </header>

      {/* Grid View Selection */}
      <div className="learning-filter-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="play" size={16} color="var(--brand-red)" />
          Active Courses
          <span className="platform-section-count">{active.length}</span>
        </div>
        
        <div className="layout-toggle-group">
          <button 
            className={`btn-icon-toggle ${layout === 'grid' ? 'active' : ''}`} 
            onClick={() => setLayout('grid')}
          >
            <Icon name="dashboard" size={14} /> Grid
          </button>
          <button 
            className={`btn-icon-toggle ${layout === 'list' ? 'active' : ''}`} 
            onClick={() => setLayout('list')}
          >
            <Icon name="recorded" size={14} /> List
          </button>
        </div>
      </div>

      {active.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div 
            key={layout + search}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={layout === 'grid' ? 'platform-grid grid-responsive-3' : 'platform-list-v'}
          >
            {active.map((c, i) => (
              <motion.div key={c.id || c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <SimpleCourseCard course={c} type="enrolled" layout={layout} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="platform-empty">
           <Icon name="books" size={48} color="var(--brand-red)" />
           <h2>No courses found</h2>
           <p>{search ? `We couldn't find any courses matching "${search}".` : "Start your journey by enrolling in a course from our Explore Hub."}</p>
           <Link href="/courses" className="btn-brand">Go to Explore Hub</Link>
        </div>
      )}
    </div>
  );
}
