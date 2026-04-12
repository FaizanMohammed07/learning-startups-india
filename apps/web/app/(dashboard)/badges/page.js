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
    <div className="platform-page badges-page">
      <header className="page-standard-header badges-header">
        <div>
          <h1 className="page-standard-title">Achievement Vault</h1>
          <p className="page-standard-subtitle">Decipher your milestones and unlock the builder odyssey.</p>
        </div>
        <div className="odyssey-stats">
            <div className="odyssey-label">Odyssey Progress</div>
            <div className="odyssey-value">16.7% Complete</div>
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

      <div className="unlocked-section">
          <div className="section-label">
            UNLOCKED ACHIEVEMENTS <span className="label-accent">GRID MODE</span>
          </div>
          <div className="badges-grid">
            {earnedBadges.map((badge) => (
              <FlippableBadge key={badge.id} badge={badge} />
            ))}
          </div>
      </div>

      {/* LOCKED SECTION: SCROLLABLE LOG */}
      <div className="milestone-container">
          <div className="milestone-label">
             <Icon name="lock" size={18} color="#94a3b8" /> BUILDER MILESTONE LOG <span className="milestone-pathway">SCROLLABLE PATHWAY</span>
          </div>
          
          <div className="milestone-log custom-scrollbar">
            {lockedBadges.map((badge, idx) => (
              <div key={idx} className="milestone-item">
                  <div className="milestone-icon-wrap">
                    <div className="milestone-icon-box">
                      <Icon name={badge.icon || 'lock'} size={24} color="#94a3b8" />
                    </div>
                  </div>
                  <div className="milestone-info">
                    <h4 className="milestone-title">{badge.title}</h4>
                    <p className="milestone-req">{badge.requirement}</p>
                  </div>
                  <div className="milestone-status-box">
                    <div className="milestone-status">
                      <Icon name="target" size={14} color="#94a3b8" /> 
                      <span>LOCKED</span>
                    </div>
                  </div>
              </div>
            ))}
          </div>
      </div>

      <style jsx global>{`
        .badges-page { padding: 3rem 4rem; background: #fff; min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .badges-header { margin-bottom: 3.5rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .page-standard-title { font-size: 3rem; font-weight: 950; color: #0f172a; margin: 0 0 0.5rem; letter-spacing: -0.05em; }
        .page-standard-subtitle { color: #64748b; font-size: 1.1rem; font-weight: 650; margin: 0; }
        
        .odyssey-stats { text-align: right; }
        .odyssey-label { font-size: 0.85rem; font-weight: 950; color: #ef4444; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px; }
        .odyssey-value { font-size: 2.25rem; font-weight: 950; color: #0f172a; letter-spacing: -0.02em; }
        
        .unlocked-section { margin-bottom: 7rem; }
        .section-label { font-size: 0.85rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.25em; margin-bottom: 3rem; display: flex; align-items: center; }
        .label-accent { margin-left: 16px; color: #ef4444; background: #fef2f2; padding: 4px 12px; border-radius: 8px; font-size: 0.65rem; }
        
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem; }

        .milestone-container { background: #fcfdfe; border-radius: 48px; padding: 4rem; border: 1.5px solid #f1f5f9; box-shadow: 0 4px 30px rgba(0,0,0,0.01); }
        .milestone-label { font-size: 0.85rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 3rem; display: flex; align-items: center; gap: 14px; }
        .milestone-pathway { margin-left: 16px; color: #cbd5e1; font-size: 0.7rem; }
        
        .milestone-log { max-height: 700px; overflow-y: auto; padding-right: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .milestone-item { background: #fff; border-radius: 32px; padding: 2rem 3rem; display: flex; align-items: center; gap: 3rem; border: 1.5px solid #f1f5f9; transition: all 0.3s ease; }
        .milestone-item:hover { border-color: rgba(239, 68, 68, 0.15); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.03); }
        
        .milestone-icon-wrap { position: relative; }
        .milestone-icon-box { width: 72px; height: 72px; border-radius: 24px; background: #f8fafc; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #f1f5f9; }
        
        .milestone-info { flex: 1; }
        .milestone-title { font-size: 1.25rem; font-weight: 950; color: #0f172a; margin: 0 0 8px; }
        .milestone-req { font-size: 0.95rem; color: #64748b; font-weight: 650; margin: 0; line-height: 1.6; }
        
        .milestone-status-box { flex-shrink: 0; }
        .milestone-status { padding: 12px 28px; border-radius: 18px; background: #f8fafc; border: 1.5px solid #e2e8f0; font-size: 0.8rem; font-weight: 950; color: #94a3b8; display: flex; align-items: center; gap: 10px; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }

        @media (max-width: 1060px) {
          .badges-page { padding: 6.5rem 1.25rem 4rem !important; }
          .badges-header { flex-direction: column; align-items: flex-start; gap: 2rem; }
          .page-standard-title { font-size: 2.25rem; }
          .odyssey-stats { text-align: left; }
          .odyssey-value { font-size: 1.75rem; }
          
          .unlocked-section { margin-bottom: 5rem; }
          .badges-grid { grid-template-columns: 1fr; gap: 2rem; }
          
          .milestone-container { padding: 2rem 1.25rem; border-radius: 36px; }
          .milestone-label { font-size: 0.7rem; margin-bottom: 1.5rem; }
          .milestone-log { padding-right: 0; max-height: none; gap: 1rem; overflow: visible; }
          .milestone-item { padding: 1.5rem; flex-direction: column; align-items: flex-start; gap: 1rem; border-radius: 24px; }
          .milestone-icon-box { width: 56px; height: 56px; border-radius: 18px; }
          .milestone-title { font-size: 1.1rem; }
          .milestone-req { font-size: 0.85rem; }
          .milestone-status-box { width: 100%; }
          .milestone-status { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
