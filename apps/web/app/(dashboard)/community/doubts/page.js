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
      <main style={{ flex: 1, background: '#f8fafc', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }} className="custom-scrollbar">
        
        {/* COMPACT HEADER */}
        <header style={{ background: '#f8fafc', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Expert Q&A Hub</h2>
            <div style={{ background: '#fef2f2', color: '#ef4444', padding: '6px 14px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '5px' }}>
               2.4h Average Resolution
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', background: '#fff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: filter === 'all' ? '#ef4444' : 'transparent', color: filter === 'all' ? '#fff' : '#64748b', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer' }}>All</button>
               <button onClick={() => setFilter('ongoing')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: filter === 'ongoing' ? '#ef4444' : 'transparent', color: filter === 'ongoing' ? '#fff' : '#64748b', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer' }}>Active</button>
               <button onClick={() => setFilter('solved')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: filter === 'solved' ? '#ef4444' : 'transparent', color: filter === 'solved' ? '#fff' : '#64748b', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer' }}>Solved</button>
            </div>

            <button 
                onClick={() => setShowNewDoubt(true)}
                style={{ 
                background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', 
                fontWeight: 950, fontSize: '0.8rem', boxShadow: '0 6px 12px rgba(239, 68, 68, 0.15)', 
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                }} 
            >
                <Icon name="plus" size={14} color="#fff" stroke={3} /> NEW TICKET
            </button>
          </div>
        </header>

        {/* STATS STRIP */}
        <div style={{ padding: '2rem 2.5rem 1.5rem' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                 <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>ACTIVE QUEUE</div>
                 <div style={{ fontSize: '1.6rem', fontWeight: 950, color: '#0f172a' }}>12 Tickets</div>
                 <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 800, marginTop: '4px' }}>-2 since yesterday</div>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                 <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>EXPERTS LIVE</div>
                 <div style={{ fontSize: '1.6rem', fontWeight: 950, color: '#0f172a' }}>8 Online</div>
                 <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800, marginTop: '4px' }}>Instant response active</div>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                 <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>TRUST SCORE</div>
                 <div style={{ fontSize: '1.6rem', fontWeight: 950, color: '#0f172a' }}>4.9/5.0</div>
                 <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800, marginTop: '4px' }}>Based on 400+ reviews</div>
              </div>
           </div>
        </div>

        {/* TICKETS LIST */}
        <div style={{ padding: '0 2.5rem 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filtered.map(t => (
              <div 
                key={t.id} 
                className="ticket-row"
                style={{ 
                    background: '#fff', borderRadius: '28px', padding: '2rem', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.015)', border: '1px solid #f1f5f9',
                    display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{ 
                    width: '64px', height: '64px', borderRadius: '22px', 
                    background: t.status === 'Recently Solved' ? '#f0fdf4' : '#fef2f2', 
                    color: t.status === 'Recently Solved' ? '#10b981' : '#ef4444', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    flexShrink: 0 
                }}>
                  <Icon name={t.status === 'Recently Solved' ? 'checkCircle' : 'helpCircle'} size={28} color={t.status === 'Recently Solved' ? '#10b981' : '#ef4444'} stroke={2.5} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#cbd5e1', letterSpacing: '0.1em' }}>{t.id}</span>
                       <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a', margin: 0 }}>{t.title}</h3>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, color: t.status === 'Recently Solved' ? '#10b981' : '#ef4444', background: t.status === 'Recently Solved' ? '#f0fdf4' : '#fef2f2', padding: '6px 16px', borderRadius: '100px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        {t.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 950 }}>{t.avatar}</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 850, color: '#475569' }}>{t.replier}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 750, color: '#94a3b8' }}>• {t.category}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: t.priority === 'Urgent Attention' ? '#ef4444' : '#64748b', marginLeft: 'auto' }}>{t.priority}</div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1' }}>• {t.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
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
