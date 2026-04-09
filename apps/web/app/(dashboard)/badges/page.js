'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export default function BadgesPage() {
  const earnedBadges = [
    { title: 'Momentum Builder', desc: 'Maintained a 7-day learning streak', icon: 'zap', color: 'var(--brand-red)' },
    { title: 'Early Adopter', desc: 'Joined among the first 1000 builders', icon: 'star', color: 'var(--brand-orange)' },
    { title: 'MVP Master', desc: 'Completed the core product module', icon: 'monitor', color: '#8B5CF6' },
    { title: 'Certified Scout', desc: 'Successfully validated 5 market ideas', icon: 'search', color: '#10B981' },
  ];

  const lockedBadges = [
    { title: 'Seed Expert', desc: 'Secure fake seed funding in simulator', icon: 'award' },
    { title: 'Global Builder', desc: 'Connect with a mentor from another region', icon: 'globe' },
    { title: 'Elite Founder', desc: 'Rank in top 100 on Global Leaderboard', icon: 'shield' },
  ];

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Unlocked Badges</h1>
          <p className="platform-page-subtitle">Visual chronicles of your startup genesis and evolution milestones.</p>
        </div>
      </header>

      {/* Progress Odyssey Section */}
      <div className="glass-card" style={{ 
        padding: '3rem', 
        background: 'linear-gradient(135deg, rgba(235,35,39,0.02), rgba(0,0,0,0.02))', 
        borderRadius: '40px', 
        border: '1px solid rgba(235,35,39,0.1)', 
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 950, marginBottom: '0.5rem', color: 'var(--brand-black)' }}>Founder Odyssey</h2>
                    <p style={{ color: 'var(--slate-400)', fontWeight: 700, margin: 0 }}>4 / 24 Milestones achieved • <span style={{ color: 'var(--brand-red)' }}>Silver Rank</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)' }}>16.7%</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Completion</span>
                </div>
            </div>
            <div className="prog-bar-track" style={{ height: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '20px' }}>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '16.7%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="prog-bar-fill" 
                    style={{ background: 'var(--brand-red)', borderRadius: '20px', boxShadow: '0 0 15px rgba(235,35,39,0.3)' }}
                />
            </div>
        </div>
        {/* Decorative background flare */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(235,35,39,0.05)', filter: 'blur(80px)' }} />
      </div>

      <div className="platform-section-label" style={{ marginBottom: '2.5rem' }}>EPIC MILESTONES <span className="platform-section-count">ACTIVE</span></div>
      
      <div className="platform-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '5rem' }}>
        {earnedBadges.map((badge, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ 
                rotateY: 20, 
                rotateX: -10,
                scale: 1.05,
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card" 
            style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem', 
                perspective: '1000px',
                cursor: 'pointer',
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ 
              width: 90, height: 90, borderRadius: '24px', background: badge.color, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 2rem', 
              boxShadow: `0 15px 30px -5px ${badge.color}44`,
              transform: 'rotate(5deg)'
            }}>
              <Icon name={badge.icon} size={40} color="#fff" />
            </div>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)' }}>{badge.title}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: 1.5, fontWeight: 700 }}>{badge.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="platform-section-label" style={{ marginBottom: '2.5rem' }}>LOCKED POTENTIAL <span className="platform-section-count">20 REMAINING</span></div>
      
      <div className="platform-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
        {lockedBadges.map((badge, idx) => (
          <div key={idx} className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', opacity: 0.4, background: 'rgba(0,0,0,0.01)', borderStyle: 'dashed' }}>
            <div style={{ 
              width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 1.5rem'
            }}>
              <Icon name="lock" size={24} color="var(--slate-400)" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 950, color: 'var(--slate-400)' }}>{badge.title}</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-400)', lineHeight: 1.4, fontWeight: 700 }}>{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
