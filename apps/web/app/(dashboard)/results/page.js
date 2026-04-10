'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';

const RESULTS = [
  { id: 'r1', title: 'Entrepreneurship Basics Test', date: 'Mar 20, 2025', score: 88, total: 100, status: 'Passed', course: 'Entrepreneurial Fund.', badge: 'Vanguard', type: 'Exams' },
  { id: 'r2', title: 'Lean Canvas Assignment', date: 'Mar 15, 2025', score: 74, total: 100, status: 'Passed', course: 'Lean Startup', badge: 'Strategist', type: 'Assessments' },
  { id: 'r3', title: 'Market Validation Quiz', date: 'Mar 10, 2025', score: 92, total: 100, status: 'Passed', course: 'Growth Hacking', badge: 'Analyst', type: 'Quizzes' },
  { id: 'r4', title: 'Advanced React Quiz', date: 'Mar 05, 2025', score: 85, total: 100, status: 'Passed', course: 'Frontend Mastery', badge: 'Expert', type: 'Quizzes' },
];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState('Quizzes');

  const filteredResults = useMemo(() => {
    return RESULTS.filter(r => r.type === activeTab);
  }, [activeTab]);

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Performance Analytics</h1>
          <p className="platform-page-subtitle">Detailed evaluation reports and certification history.</p>
        </div>
      </div>

      <div className="platform-stats-grid" style={{ marginBottom: '3rem' }}>
        {[
          { label: 'Average Score', val: '84.6%', color: 'var(--brand-red)' },
          { label: 'Assessments Taken', val: '12', color: 'var(--brand-black)' },
          { label: 'Global Rank', val: '#42', color: '#059669' },
        ].map((s, i) => (
          <div key={i} className="platform-stat-card glass-card" style={{ padding: '2rem', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="platform-stat-label" style={{ fontWeight: 950, color: 'var(--slate-500)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
            <span className="platform-stat-value" style={{ color: s.color, fontSize: '2.5rem', fontWeight: 950 }}>{s.val}</span>
          </div>
        ))}
      </div>

      <div className="platform-tabs" style={{ marginBottom: '2.5rem', display: 'flex', gap: '10px' }}>
        {['Quizzes', 'Assessments', 'Exams'].map(tab => (
          <button 
            key={tab}
            className={`platform-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: activeTab === tab ? 'var(--brand-red)' : '#fff',
              color: activeTab === tab ? '#fff' : 'var(--slate-500)',
              border: 'none',
              fontWeight: 950,
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
        {filteredResults.length > 0 ? filteredResults.map(r => (
          <div key={r.id} className="glass-card" style={{ 
            padding: '2.5rem', 
            borderRadius: '40px', 
            border: '1px solid rgba(255,255,255,0.6)', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'var(--brand-red)', opacity: 0.03, borderRadius: '0 0 0 100%', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.65rem', padding: '6px 14px', borderRadius: '10px', fontWeight: 950 }}>{r.status.toUpperCase()}</span>
                <span style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--brand-red)', fontSize: '0.65rem', padding: '6px 14px', borderRadius: '10px', fontWeight: 950 }}>{r.badge.toUpperCase()}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 850 }}>{r.date}</span>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="12" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--brand-red)" strokeWidth="12" 
                    strokeDasharray={`${r.score * 2.76} 276`} 
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)' }}>
                  {r.score}%
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{r.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', fontWeight: 800, margin: 0 }}>{r.course}</p>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '25px' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '4px' }}>Percentile</div>
                  <div style={{ fontSize: '1rem', fontWeight: 950, color: 'var(--brand-black)' }}>Top 5%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '4px' }}>Time used</div>
                  <div style={{ fontSize: '1rem', fontWeight: 950, color: 'var(--brand-black)' }}>42m 12s</div>
                </div>
              </div>
              <Link href={`/results/${r.id}/analysis`} style={{ textDecoration: 'none' }}>
                <button className="btn-brand" style={{ padding: '14px 32px', fontSize: '0.8rem', borderRadius: '16px', border: 'none' }}>
                  ANALYZE REPORT
                </button>
              </Link>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
            <p style={{ color: 'var(--slate-400)', fontWeight: 800 }}>No results found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

