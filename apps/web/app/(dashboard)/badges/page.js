'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

const FlippableBadge = ({ badge }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ 
        perspective: '1000px', 
        cursor: 'pointer',
        height: '340px'
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative', 
          transformStyle: 'preserve-3d' 
        }}
      >
        {/* Front Side */}
        <div style={{ 
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: '#fff', borderRadius: '32px', padding: '2.5rem 1.5rem', textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ 
            width: '90px', height: '90px', borderRadius: '24px', background: badge.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
            boxShadow: `0 15px 30px ${badge.color}33`,
            transform: 'rotate(-5deg)'
          }}>
            <Icon name={badge.icon} size={40} color="#fff" />
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: badge.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{badge.rarity}</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{badge.title}</h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Click to view details</p>
        </div>

        {/* Back Side */}
        <div style={{ 
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: '#0f172a', borderRadius: '32px', padding: '2.5rem 1.5rem', textAlign: 'center',
          transform: 'rotateY(180deg)', color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem', color: badge.color }}>{badge.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
            {badge.desc}
          </p>
          <div style={{ marginTop: '2rem', fontSize: '0.7rem', fontWeight: 800, opacity: 0.5, textTransform: 'uppercase' }}>
            Earned March 10, 2026
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function BadgesPage() {
  const earnedBadges = [
    { id: 'b1', title: 'Momentum Builder', desc: 'Maintained a 7-day learning streak by completing at least one lesson every single day without interruption.', icon: 'zap', color: '#ef4444', rarity: 'Epic' },
    { id: 'b2', title: 'Web Collaborative', desc: 'Successfully authored a high-fidelity startup platform with Web, bridging the gap between design and interactive code.', icon: 'globe', color: '#f59e0b', rarity: 'Rare' },
    { id: 'b3', title: 'MVP Master', desc: 'Successfully built and launched a Minimum Viable Product that passed the initial market validation test.', icon: 'monitor', color: '#8B5CF6', rarity: 'Legendary' },
    { id: 'b4', title: 'Certified Scout', desc: 'Conducted 5 deep-dive market research sessions and validated the core problem-solution fit for your startup.', icon: 'search', color: '#10B981', rarity: 'Common' },
  ];

  const lockedBadges = [
    { title: 'Featured Architect', requirement: 'Composed & Instructed: Already featured in the global gallery for structural excellence and platform modeling.', icon: 'award' },
    { title: 'Seed Expert', requirement: 'Secure simulated seed funding from the virtual investor panel after pitch deck submission.', icon: 'box' },
    { title: 'Global Builder', requirement: 'Connect with an international mentor from the mentor network and attend a one-on-one strategy call.', icon: 'globe' },
    { title: 'Elite Founder', requirement: 'Reach the Top 100 ranking on the Global Leaderboard by accumulating builder points through courses.', icon: 'shield' },
    { title: 'Series A Pilot', requirement: 'Scale your simulated startup user base to 10,000 active users through effective marketing loops.', icon: 'rocket' },
  ];

  return (
    <div className="platform-page" style={{ padding: '3rem 4rem', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '0.5rem' }}>Achievement Vault</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 600 }}>Decipher your milestones and unlock the builder odyssey.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Odyssey Progress</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>16.7% Complete</div>
        </div>
      </header>

      {/* Progress Bar Container */}
      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '16.7%' }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '100%', background: '#ef4444', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
          />
      </div>

      <div style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2.5rem' }}>
            UNLOCKED ACHIEVEMENTS <span style={{ marginLeft: '12px', color: '#ef4444' }}>GRID MODE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {earnedBadges.map((badge) => (
              <FlippableBadge key={badge.id} badge={badge} />
            ))}
          </div>
      </div>

      {/* LOCKED SECTION: SCROLLABLE LOG */}
      <div style={{ 
        background: '#fff', 
        borderRadius: '40px', 
        padding: '3rem', 
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 50px rgba(0,0,0,0.02)'
      }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <Icon name="lock" size={18} /> BUILDER MILESTONE LOG <span style={{ marginLeft: '12px', color: '#64748b' }}>SCROLLABLE PATHWAY</span>
          </div>
          
          <div style={{ 
            maxHeight: '500px', 
            overflowY: 'auto', 
            paddingRight: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }} className="milestone-log">
            {lockedBadges.map((badge, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: '#f8fafc', 
                  borderRadius: '24px', 
                  padding: '1.75rem 2.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '2.5rem',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.2s',
                  cursor: 'default'
                }}
              >
                 <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 16px rgba(0,0,0,0.03)' }}>
                    <Icon name={badge.icon || 'lock'} size={24} color="#cbd5e1" />
                 </div>
                 <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{badge.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{badge.requirement}</p>
                 </div>
                 <div style={{ 
                   padding: '10px 20px', 
                   borderRadius: '12px', 
                   background: '#fff', 
                   border: '1px solid #e2e8f0', 
                   fontSize: '0.7rem', 
                   fontWeight: 900, 
                   color: '#94a3b8',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}>
                    <Icon name="target" size={14} color="#cbd5e1" /> LOCKED
                 </div>
              </div>
            ))}
          </div>
      </div>

      <style jsx global>{`
        .milestone-log::-webkit-scrollbar { width: 4px; }
        .milestone-log::-webkit-scrollbar-track { background: transparent; }
        .milestone-log::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .milestone-log::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

    </div>
  );
}
