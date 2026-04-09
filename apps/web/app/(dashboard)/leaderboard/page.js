'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function LeaderboardPage() {
  const [tab, setTab] = useState('monthly');

  const monthlyLeaders = [
    { rank: 1, name: 'Arjun Mehra', score: 2840, change: '+12%', avatar: 'A' },
    { rank: 2, name: 'Sanya Gupta', score: 2710, change: '+8%', avatar: 'S' },
    { rank: 3, name: 'Rahul Varma', score: 2650, change: '+15%', avatar: 'R' },
    { rank: 4, name: 'Priya Das', score: 2420, change: '+5%', avatar: 'P' },
    { rank: 5, name: 'Karan Singh', score: 2380, change: '-2%', avatar: 'K' },
  ];

  const allTimeLeaders = [
    { rank: 1, name: 'Sanya Gupta', score: 45200, avatar: 'S' },
    { rank: 2, name: 'Arjun Mehra', score: 42800, avatar: 'A' },
    { rank: 3, name: 'Vikram Rao', score: 41500, avatar: 'V' },
  ];

  const leaders = tab === 'monthly' ? monthlyLeaders : allTimeLeaders;

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Global Leaderboard</h1>
          <p className="platform-page-subtitle">The arena of high-momentum builders</p>
        </div>
        <div className="platform-tabs" style={{ border: 'none' }}>
          <button 
            className={`platform-tab ${tab === 'monthly' ? 'active' : ''}`}
            onClick={() => setTab('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`platform-tab ${tab === 'allTime' ? 'active' : ''}`}
            onClick={() => setTab('allTime')}
          >
            All-Time
          </button>
        </div>
      </div>

      {/* Podium for Top 3 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', margin: '3rem 0', paddingBottom: '2rem' }}>
        {/* 2nd Place */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: '50%', border: '4px solid #E2E8F0', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, position: 'relative', margin: '0 auto 1rem'
          }}>
            {leaders[1]?.avatar}
            <div style={{ position: 'absolute', bottom: -10, background: '#94A3B8', color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 900 }}>2ND</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>{leaders[1]?.name}</div>
          <div style={{ color: 'var(--brand-red)', fontWeight: 800, fontSize: '0.8rem' }}>{leaders[1]?.score} pts</div>
        </div>

        {/* 1st Place */}
        <div style={{ textAlign: 'center', transform: 'scale(1.2)' }}>
          <Icon name="crown" size={24} color="#FBBF24" style={{ marginBottom: 8 }} />
          <div style={{ 
            width: 100, height: 100, borderRadius: '50%', border: '4px solid #FBBF24', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, position: 'relative', margin: '0 auto 1rem',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
          }}>
            {leaders[0]?.avatar}
            <div style={{ position: 'absolute', bottom: -10, background: '#FBBF24', color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 900 }}>1ST</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>{leaders[0]?.name}</div>
          <div style={{ color: 'var(--brand-red)', fontWeight: 800, fontSize: '0.8rem' }}>{leaders[0]?.score} pts</div>
        </div>

        {/* 3rd Place */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: '50%', border: '4px solid #CD7F32', 
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, position: 'relative', margin: '0 auto 1rem'
          }}>
            {leaders[2]?.avatar}
            <div style={{ position: 'absolute', bottom: -10, background: '#CD7F32', color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 900 }}>3RD</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>{leaders[2]?.name}</div>
          <div style={{ color: 'var(--brand-red)', fontWeight: 800, fontSize: '0.8rem' }}>{leaders[2]?.score} pts</div>
        </div>
      </div>

      <div className="platform-info-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--slate-100)' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Rank</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Builder</th>
              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Score</th>
              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((l) => (
              <tr key={l.rank} className="hover-bg-red" style={{ borderBottom: '1px solid var(--slate-50)', transition: 'all 0.2s' }}>
                <td style={{ padding: '16px 24px', fontWeight: 900, color: l.rank <= 3 ? 'var(--brand-red)' : 'var(--slate-400)' }}>#{l.rank}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>{l.avatar}</div>
                    <span style={{ fontWeight: 700 }}>{l.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 900 }}>{l.score.toLocaleString()}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  {l.change && <span style={{ color: l.change.startsWith('+') ? '#059669' : '#DC2626', fontWeight: 800, fontSize: '0.8rem' }}>{l.change}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--grad-brand)', borderRadius: 'var(--r-lg)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 900, opacity: 0.8, textTransform: 'uppercase' }}>Your Current Standing</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>Rank #142</div>
        </div>
        <button className="btn-brand" style={{ background: '#fff', color: 'var(--brand-red)' }}>
          Review Performance
        </button>
      </div>
    </div>
  );
}
