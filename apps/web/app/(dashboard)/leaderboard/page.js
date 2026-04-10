'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

const Sparkline = ({ color }) => (
  <svg width="40" height="20" viewBox="0 0 40 20" style={{ opacity: 0.6 }}>
    <path 
      d="M0 15 Q 10 5, 20 12 T 40 8" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function LeaderboardPage() {
  const [tab, setTab] = useState('monthly');

  const monthlyLeaders = [
    { rank: 1, name: 'Arjun Mehra', score: 2840, change: '+12%', avatar: 'A', momentum: 'High', color: '#fbbf24' },
    { rank: 2, name: 'Sanya Gupta', score: 2710, change: '+8%', avatar: 'S', momentum: 'Stable', color: '#94a3b8' },
    { rank: 3, name: 'Rahul Varma', score: 2650, change: '+15%', avatar: 'R', momentum: 'Fast', color: '#d97706' },
    { rank: 4, name: 'Priya Das', score: 2420, change: '+5%', avatar: 'P', style: 'default' },
    { rank: 5, name: 'Karan Singh', score: 2380, change: '-2%', avatar: 'K', style: 'default' },
  ];

  const allTimeLeaders = [
    { rank: 1, name: 'Sanya Gupta', score: 45200, avatar: 'S', color: '#fbbf24' },
    { rank: 2, name: 'Arjun Mehra', score: 42800, avatar: 'A', color: '#94a3b8' },
    { rank: 3, name: 'Vikram Rao', score: 41500, avatar: 'V', color: '#d97706' },
  ];

  const leaders = tab === 'monthly' ? monthlyLeaders : allTimeLeaders;

  return (
    <div className="platform-page" style={{ padding: '3rem 4rem', background: '#f8fafc' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>Global Leaderboard</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 600 }}>The arena of high-momentum builders and visionary founders.</p>
        </div>
        <div style={{ 
          background: '#fff', 
          padding: '6px', 
          borderRadius: '16px', 
          display: 'flex', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          {['monthly', 'allTime'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              style={{ 
                padding: '10px 24px', 
                borderRadius: '12px', 
                border: 'none', 
                background: tab === t ? '#ef4444' : 'transparent',
                color: tab === t ? '#fff' : '#64748b',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t === 'monthly' ? 'Monthly' : 'All-Time'}
            </button>
          ))}
        </div>
      </header>

      {/* Podium for Top 3 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '3rem', margin: '4rem 0 6rem' }}>
        {/* 2nd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            width: 100, height: 100, borderRadius: '32px', border: '4px solid #94a3b8', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, position: 'relative', margin: '0 auto 1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            transform: 'rotate(-5deg)'
          }}>
            {leaders[1]?.avatar}
            <div style={{ position: 'absolute', bottom: -12, background: '#94a3b8', color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 900 }}>2ND</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1e293b' }}>{leaders[1]?.name}</div>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', marginTop: '4px' }}>{leaders[1]?.score.toLocaleString()} pts</div>
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', position: 'relative', top: '-20px' }}
        >
          <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)' }}>
             <Icon name="award" size={40} color="#fbbf24" />
          </div>
          <div style={{ 
            width: 140, height: 140, borderRadius: '40px', border: '5px solid #fbbf24', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', fontWeight: 900, position: 'relative', margin: '0 auto 1.5rem',
            boxShadow: '0 30px 60px rgba(251, 191, 36, 0.2)',
            zIndex: 2
          }}>
            {leaders[0]?.avatar}
            <div style={{ position: 'absolute', bottom: -15, background: '#fbbf24', color: '#fff', padding: '6px 16px', borderRadius: 14, fontSize: '0.8rem', fontWeight: 900 }}>CHAMPION</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>{leaders[0]?.name}</div>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem', marginTop: '4px' }}>{leaders[0]?.score.toLocaleString()} pts</div>
          
          {/* Champion Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'rgba(251, 191, 36, 0.1)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 1 }} />
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            width: 100, height: 100, borderRadius: '32px', border: '4px solid #d97706', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, position: 'relative', margin: '0 auto 1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            transform: 'rotate(5deg)'
          }}>
            {leaders[2]?.avatar}
            <div style={{ position: 'absolute', bottom: -12, background: '#d97706', color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 900 }}>3RD</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1e293b' }}>{leaders[2]?.name}</div>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', marginTop: '4px' }}>{leaders[2]?.score.toLocaleString()} pts</div>
        </motion.div>
      </div>

      <div style={{ background: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rank</th>
              <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Founder</th>
              <th style={{ padding: '20px 32px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Momentum</th>
              <th style={{ padding: '20px 32px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((l, idx) => (
              <tr key={l.rank} style={{ borderBottom: '1px solid #f8fafc', transition: 'all 0.2s' }}>
                <td style={{ padding: '20px 32px' }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '10px', 
                    background: l.rank <= 3 ? (idx === 0 ? '#fef3c7' : '#f1f5f9') : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, color: l.rank <= 3 ? (idx === 0 ? '#d97706' : '#64748b') : '#cbd5e1'
                  }}>
                    #{l.rank}
                  </div>
                </td>
                <td style={{ padding: '20px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#0f172a' }}>{l.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1e293b' }}>{l.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Elite Builder</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '20px 32px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       <Sparkline color={idx < 3 ? '#ef4444' : '#94a3b8'} />
                    </div>
                </td>
                <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '1rem' }}>{l.score.toLocaleString()}</div>
                  {l.change && <div style={{ fontSize: '0.7rem', color: l.change.startsWith('+') ? '#10b981' : '#f43f5e', fontWeight: 800 }}>{l.change} vs last week</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SELF RANK STICKER */}
      {/* SELF RANK STICKER */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem 2.5rem', 
        background: 'rgba(239, 68, 68, 0.04)', 
        borderRadius: '32px', 
        border: '1px solid rgba(239, 68, 68, 0.1)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 20px 40px rgba(239, 68, 68, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: '18px', 
              background: '#ef4444', color: '#fff', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '1.25rem', fontWeight: 900 
            }}>J</div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>Your Current Rank</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 950, color: '#0f172a' }}>Rank #142</div>
            </div>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>You are in the <span style={{ color: '#ef4444', fontWeight: 800 }}>top 15%</span> of all builders this month!</div>
           <button 
             onClick={() => router.push('/analytics')}
             style={{ 
               background: '#ef4444', color: '#fff', border: 'none', 
               padding: '14px 32px', borderRadius: '16px', fontWeight: 800, 
               cursor: 'pointer', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)',
               transition: 'all 0.2s',
               display: 'flex',
               alignItems: 'center',
               gap: '8px'
             }}
           >
              VIEW DETAILED ANALYTICS <Icon name="chevronRight" size={16} color="#fff" />
           </button>
        </div>
      </div>
    </div>
  );
}
