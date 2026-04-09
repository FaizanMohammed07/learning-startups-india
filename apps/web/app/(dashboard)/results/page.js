'use client';

import Icon from '@/components/Icon';

const RESULTS = [
  { id: 'r1', title: 'Entrepreneurship Basics Test', date: 'Mar 20, 2025', score: 88, total: 100, status: 'Passed', course: 'Entrepreneurial Fund.', badge: 'Vanguard' },
  { id: 'r2', title: 'Lean Canvas Assignment', date: 'Mar 15, 2025', score: 74, total: 100, status: 'Passed', course: 'Lean Startup', badge: 'Strategist' },
  { id: 'r3', title: 'Market Validation Quiz', date: 'Mar 10, 2025', score: 92, total: 100, status: 'Passed', course: 'Growth Hacking', badge: 'Analyst' },
];

export default function ResultsPage() {
  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Results & Analysis</h1>
          <p className="platform-page-subtitle">Track your performance and view detailed analytics of your scores.</p>
        </div>
      </div>

      <div className="platform-stats-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="platform-stat-card glass-card" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="platform-stat-label" style={{ fontWeight: 850 }}>Average Score</div>
            <span className="platform-stat-value" style={{ color: 'var(--brand-red)' }}>84.6%</span>
        </div>
        <div className="platform-stat-card glass-card" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="platform-stat-label" style={{ fontWeight: 850 }}>Assessments Taken</div>
            <span className="platform-stat-value" style={{ color: 'var(--brand-black)' }}>12</span>
        </div>
        <div className="platform-stat-card glass-card" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="platform-stat-label" style={{ fontWeight: 850 }}>Global Rank</div>
            <span className="platform-stat-value" style={{ color: '#059669' }}>#42</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
        {RESULTS.map(r => (
          <div key={r.id} className="glass-card" style={{ 
            padding: '2.5rem', 
            borderRadius: '40px', 
            border: '1px solid rgba(255,255,255,0.4)', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--brand-red)', opacity: 0.02, borderRadius: '0 0 0 100%', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="tag-pill" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', fontSize: '0.65rem', padding: '6px 14px', borderRadius: '10px', fontWeight: 950, letterSpacing: '0.05em' }}>
                        {r.status.toUpperCase()}
                    </div>
                    <div className="tag-pill" style={{ background: 'rgba(233,34,34,0.05)', color: 'var(--brand-red)', fontSize: '0.65rem', padding: '6px 14px', borderRadius: '10px', fontWeight: 950, letterSpacing: '0.05em' }}>
                        {r.badge.toUpperCase()}
                    </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 800 }}>{r.date}</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                    <svg width="90" height="90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--brand-red)" strokeWidth="8" 
                            strokeDasharray={`${r.score * 2.83} 283`} 
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)' }}>
                        {r.score}%
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '0.4rem', lineHeight: 1.25 }}>{r.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 800, margin: 0 }}>{r.course}</p>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '2px' }}>Rank</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-black)' }}>Top 5%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '2px' }}>Time</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-black)' }}>45m</div>
                    </div>
                </div>
                <button className="btn-brand" style={{ padding: '12px 28px', fontSize: '0.8rem', borderRadius: '14px' }}>
                    VIEW DETAILS
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
