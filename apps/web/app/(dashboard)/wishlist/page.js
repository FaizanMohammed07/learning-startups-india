'use client';

import { useDashboard } from '@/contexts/DashboardProvider';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo } from 'react';

export default function WishlistPage() {
  const { courses, wishlist, isLoading } = useDashboard();
  
  const wishlistedItems = useMemo(() => {
    if (!wishlist || !courses) return [];
    return courses.filter(c => wishlist.has(c.id || c._id));
  }, [wishlist, courses]);

  if (isLoading) return <div className="platform-page">Loading...</div>;

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">My Wishlist</h1>
          <p className="platform-page-subtitle">Your curated list of future learning milestones.</p>
        </div>
      </header>

      {wishlistedItems.length > 0 ? (
        <div className="platform-grid">
          {wishlistedItems.map((c, i) => (
            <motion.div key={c.id || c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <SimpleCourseCard course={c} type="wishlist" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="platform-empty" style={{ paddingTop: '100px' }}>
           <motion.div
             animate={{ 
               y: [0, -15, 0],
               rotate: [0, 5, 0, -5, 0]
             }}
             transition={{ 
               duration: 4, 
               repeat: Infinity,
               ease: "easeInOut"
             }}
             style={{ 
               marginBottom: '2rem',
               position: 'relative',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
             }}
           >
             {/* Glowing Pulse Background */}
             <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ 
                    position: 'absolute', 
                    width: '120px', 
                    height: '120px', 
                    background: 'var(--brand-red)', 
                    borderRadius: '50%', 
                    filter: 'blur(40px)',
                    zIndex: -1
                }}
             />
             <Icon name="rocket" size={80} color="var(--brand-red)" />
           </motion.div>
           <h2 style={{ fontSize: '2rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '0.75rem' }}>Your journey starts here.</h2>
           <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 0 2rem', lineHeight: 1.6 }}>Dream big and curate your roadmap. Add tracks to your wishlist to see them here.</p>
           <Link href="/courses" style={{ textDecoration: 'none' }}>
             <button className="btn-brand" style={{ padding: '14px 32px' }}>EXPLORE OPPORTUNITIES</button>
           </Link>
        </div>
      )}
    </div>
  );
}
