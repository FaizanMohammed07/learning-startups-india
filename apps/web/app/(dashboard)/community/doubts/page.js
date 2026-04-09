'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function DoubtsPage() {
  const [filter, setFilter] = useState('active');

  const doubts = [
    { id: 'TKT-824', title: 'Clarification on Seed Stage Equity Dilution', status: 'Resolved', category: 'Finance', replier: 'Expert Raj', time: 'Last active 1h ago' },
    { id: 'TKT-912', title: 'DPIIT Registration - Section 4.2 Error', status: 'Active', category: 'Compliance', replier: 'Technician Amit', time: 'Expected resolution: 4h' },
    { id: 'TKT-945', title: 'Product-Market Fit Survey Methodologies', status: 'Active', category: 'Strategy', replier: 'Coach Sarah', time: 'Assigned to expert' },
  ];

  const filtered = doubts.filter(d => filter === 'all' || d.status.toLowerCase() === filter);

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Expert Doubts / Q&A</h1>
          <p className="platform-page-subtitle">Personalized technical and business support for your startup</p>
        </div>
        <button className="btn-brand">
          <Icon name="plus" size={16} /> New Doubt Ticket
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="platform-stat-card" style={{ background: 'var(--slate-900)', color: '#fff' }}>
          <div className="platform-stat-label" style={{ color: 'rgba(255,255,255,0.4)' }}>AVG RESPONSE TIME <Icon name="clock" size={14} color="var(--brand-orange)" /></div>
          <div className="platform-stat-value" style={{ color: 'var(--brand-orange)' }}>2.4h</div>
          <div className="platform-stat-sub">High priority tracking active</div>
        </div>
        <div className="platform-stat-card" style={{ background: 'var(--red-50)' }}>
          <div className="platform-stat-label">TOTAL TICKETS <Icon name="alertCircle" size={14} color="var(--brand-red)" /></div>
          <div className="platform-stat-value" style={{ color: 'var(--brand-red)' }}>12</div>
          <div className="platform-stat-sub">10 Resolved milestone</div>
        </div>
        <div className="platform-stat-card" style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}>
          <div className="platform-stat-label">EXPERT RATING <Icon name="star" size={14} color="#FBBF24" /></div>
          <div className="platform-stat-value" style={{ color: '#FBBF24' }}>4.9/5</div>
          <div className="platform-stat-sub">Based on user feedback</div>
        </div>
      </div>

      <div className="platform-tabs">
        <button className={`platform-tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active Tickets</button>
        <button className={`platform-tab ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>Resolved</button>
        <button className={`platform-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Full Archive</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(d => (
          <div key={d.id} className="platform-info-card hover-lift" style={{ borderLeft: `4px solid ${d.status === 'Resolved' ? '#059669' : 'var(--brand-orange)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--slate-400)', marginBottom: '4px' }}>{d.id} • {d.category}</div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>{d.title}</h3>
                <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 600 }}>Assigned to: <span style={{ color: 'var(--slate-900)' }}>{d.replier}</span></p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="tag-pill" style={{ 
                  background: d.status === 'Resolved' ? '#f0fdf4' : 'var(--orange-50)', 
                  color: d.status === 'Resolved' ? '#059669' : 'var(--brand-orange)',
                  padding: '6px 14px', marginBottom: '10px'
                }}>
                  {d.status}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontWeight: 700 }}>{d.time}</div>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--slate-50)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
               <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>View Conversation →</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--slate-50)', border: '1px solid var(--slate-100)', borderRadius: 'var(--r-xl)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
         <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 900 }}>Can't find what you're looking for?</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--slate-400)', fontWeight: 600 }}>Explore our knowledge base for instant answers to common startup hurdles.</p>
         </div>
         <button className="btn-outline-red">Search Wiki</button>
      </div>
    </div>
  );
}
