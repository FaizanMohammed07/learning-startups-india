'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function DoubtsPage() {
  const [filter, setFilter] = useState('all');
  const [showNewDoubt, setShowNewDoubt] = useState(false);

  const doubts = [
    { 
        id: 'TKT-824', 
        title: 'Seed Stage Equity Dilution Clarification', 
        status: 'Recently Solved', 
        category: 'Finance', 
        replier: 'Expert Raj', 
        time: 'Resolved 2h ago', 
        priority: 'High',
        avatar: 'ER'
    },
    { 
        id: 'TKT-912', 
        title: 'DPIIT Registration - Section 4.2 Error', 
        status: 'Ongoing', 
        category: 'Compliance', 
        replier: 'Tech Amit', 
        time: 'Active 45m', 
        priority: 'Urgent Attention',
        avatar: 'TA'
    },
    { 
        id: 'TKT-945', 
        title: 'Product-Market Fit Survey Methods', 
        status: 'Ongoing', 
        category: 'Strategy', 
        replier: 'Coach Sarah', 
        time: 'Active 2h ago', 
        priority: 'Normal',
        avatar: 'CS'
    },
  ];

  const filtered = doubts.filter(d => filter === 'all' || d.status.toLowerCase().includes(filter));

  return (
    <div className="flex bg-white overflow-hidden" style={{ height: 'calc(100vh - 4.5rem)', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── MAIN CONTENT (FULL WIDTH & FOCUSED) ── */}
      <main className="doubts-main-grid custom-scrollbar" style={{ width: '100%', overflowY: 'auto' }}>
        
        {/* COMPACT HEADER */}
        <header className="doubts-header-container">
          <div className="mobile-column-header">
            <h2 className="mobile-title">Expert Q&A Hub</h2>
            <div className="mobile-badge" style={{ background: '#fef2f2', color: '#ef4444', padding: '6px 14px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '5px' }}>
               2.4h Average Resolution
            </div>
          </div>
          
          <div className="mobile-header-actions">
            <div className="filter-group">
               <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
               <button onClick={() => setFilter('ongoing')} className={filter === 'ongoing' ? 'active' : ''}>Active</button>
               <button onClick={() => setFilter('solved')} className={filter === 'solved' ? 'active' : ''}>Solved</button>
            </div>

            <button 
                onClick={() => setShowNewDoubt(true)}
                className="new-ticket-btn"
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '950', fontSize: '0.8rem', boxShadow: '0 6px 12px rgba(239, 68, 68, 0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <Icon name="plus" size={14} color="#fff" stroke={3} /> <span className="hide-on-small">NEW TICKET</span>
            </button>
          </div>
        </header>


        {/* STATS STRIP */}
        <div className="doubts-stats-wrapper">
           <div className="doubts-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div className="doubt-stat-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                 <div className="doubt-stat-label" style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '0.05em' }}>ACTIVE QUEUE</div>
                 <div className="doubt-stat-value" style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: '4px 0' }}>12 Tickets</div>
                 <div className="doubt-stat-trend negative" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444' }}>-2 since yesterday</div>
              </div>
              <div className="doubt-stat-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                 <div className="doubt-stat-label" style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '0.05em' }}>EXPERTS LIVE</div>
                 <div className="doubt-stat-value" style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: '4px 0' }}>8 Online</div>
                 <div className="doubt-stat-trend positive" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981' }}>Instant response active</div>
              </div>
              <div className="doubt-stat-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                 <div className="doubt-stat-label" style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '0.05em' }}>TRUST SCORE</div>
                 <div className="doubt-stat-value" style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: '4px 0' }}>4.9/5.0</div>
                 <div className="doubt-stat-trend neutral" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8' }}>Based on 400+ reviews</div>
              </div>
           </div>
        </div>


        {/* TICKETS LIST */}
        <div className="tickets-list-container">
          <div className="tickets-list-wrapper">
            {filtered.map(t => (
              <div 
                key={t.id} 
                className="ticket-row"
              >
                <div className="ticket-icon-frame">
                  <Icon name={t.status === 'Recently Solved' ? 'checkCircle' : 'helpCircle'} size={28} color={t.status === 'Recently Solved' ? '#10b981' : '#ef4444'} stroke={2.5} />
                </div>

                <div className="ticket-item-content" style={{ flex: 1 }}>
                  <div className="ticket-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div className="ticket-title-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <span className="ticket-id" style={{ fontSize: '0.75rem', fontWeight: 900, background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#64748b' }}>{t.id}</span>
                       <h3 className="ticket-title" style={{ fontSize: '1rem', fontWeight: 850, color: '#0f172a', margin: 0 }}>{t.title}</h3>
                    </div>
                    <span className={`status-pill ${t.status === 'Recently Solved' ? 'solved' : 'ongoing'}`} style={{ fontSize: '0.65rem', fontWeight: 950, padding: '4px 10px', borderRadius: '8px', background: t.status === 'Recently Solved' ? '#ecfdf5' : '#fff1f2', color: t.status === 'Recently Solved' ? '#059669' : '#e11d48' }}>
                        {t.status}
                    </span>
                  </div>
                  
                  <div className="ticket-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div className="ticket-replier" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="replier-avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900 }}>{t.avatar}</div>
                        <span className="replier-name" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>{t.replier}</span>
                    </div>
                    <div className="ticket-category" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>• {t.category}</div>
                    <div className={`ticket-priority ${t.priority === 'Urgent Attention' ? 'urgent' : ''}`} style={{ fontSize: '0.75rem', fontWeight: 800, color: t.priority === 'Urgent Attention' ? '#ef4444' : '#64748b' }}>{t.priority}</div>
                    <span className="ticket-time" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>• {t.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <style jsx global>{`
        .mobile-column-header { display: flex; align-items: center; gap: 16px; }
        .mobile-title { font-size: 1.25rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.02em; }
        .doubts-header-container { padding: 24px 20px; display: flex; justify-content: space-between; align-items: center; }
        .doubts-stats-wrapper { padding: 0 20px 24px; }
        .tickets-list-container { padding: 0 20px 5rem; }
        .tickets-list-wrapper { display: flex; flex-direction: column; gap: 1.25rem; }
        .ticket-row { background: #fff; border-radius: 28px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.015); border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 24px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .ticket-icon-frame { width: 64px; height: 64px; border-radius: 22px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        
        @media (max-width: 768px) {
          .doubts-header-container { padding: 16px 20px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .mobile-column-header { display: flex; align-items: center; gap: 12px; }
          .mobile-header-actions { flex-direction: column; width: 100%; gap: 12px; }
          .filter-group { display: flex; background: #fff; padding: 4px; border-radius: 12px; border: 1px solid #e2e8f0; width: 100%; justify-content: space-between; }
          .filter-group button { flex: 1; padding: 8px 10px; border-radius: 8px; border: none; background: transparent; color: #64748b; font-size: 0.75rem; font-weight: 950; cursor: pointer; }
          .filter-group button.active { background: #ef4444; color: #fff; }
          .new-ticket-btn { width: 100% !important; justify-content: center !important; }
          .hide-on-small { display: none; }
          .doubts-stats-wrapper { padding: 0 20px 16px; }
          .tickets-list-container { padding: 0 20px 5rem !important; }
          .ticket-row { padding: 1.25rem !important; gap: 16px !important; flex-direction: column; align-items: flex-start !important; border-radius: 20px !important; }
          .ticket-icon-frame { width: 48px; height: 48px; border-radius: 16px; }
        }

        .ticket-row:hover {
            transform: translateY(-2px);
            border-color: #ef4444 !important;
            box-shadow: 0 12px 30px rgba(239, 68, 68, 0.08) !important;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
