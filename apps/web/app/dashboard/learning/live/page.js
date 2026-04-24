'use client';

import { useState, useEffect } from 'react';

const Icons = {
  live: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  users: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function LiveClassesPage() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveClasses() {
      try {
        const res = await fetch('/api/v1/learning/live');
        const json = await res.json();
        if (json.success) setLiveClasses(json.data);
      } catch (err) {
        console.error('Failed to fetch live classes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLiveClasses();
  }, []);

  const joinClass = async (id) => {
    try {
      const res = await fetch(`/api/v1/learning/live/${id}/join`, { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        window.open(json.data.meetingLink, '_blank');
      }
    } catch (err) {
      alert('Failed to join session.');
    }
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseLive { 0% { box-shadow:0 0 0 0 rgba(220,38,38,0.4); } 70% { box-shadow:0 0 0 12px rgba(220,38,38,0); } 100% { box-shadow:0 0 0 0 rgba(220,38,38,0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 4px 15px rgba(0,0,0,0.02); transition:all .4s; }
        .dcard:hover { transform:translateY(-8px); box-shadow:0 25px 50px -12px rgba(0,0,0,0.1); border-color:rgba(122,31,43,0.15); }
        
        .ticker-header { background: linear-gradient(90deg, #7A1F2B, #922538); color:#fff; padding:12px 24px; border-radius:16px; margin-bottom:32px; display:flex; align-items:center; gap:12px; font-weight:800; font-size:0.75rem; letter-spacing:0.1em; }
        
        .premium-pill { background:rgba(122,31,43,0.08); color:#7A1F2B; padding:6px 14px; border-radius:20px; font-size:0.65rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; }
        .join-btn { background: #7A1F2B; color:white; border:none; padding:12px 24px; border-radius:14px; font-weight:800; font-size:0.85rem; cursor:pointer; transition:all 0.3s; box-shadow:0 6px 20px rgba(122,31,43,0.2); }
        .join-btn:hover { background: #922538; transform:scale(1.05); }
        .join-btn:disabled { background:#f3f4f6; color:#9ca3af; cursor:not-allowed; box-shadow:none; }
      `}} />

      <div className="da da1 ticker-header">
        <span style={{ display:'block', width:10, height:10, background:'#ef4444', borderRadius:'50%', animation:'pulseLive 2s infinite' }} />
        LIVE INCUBATION HUB
      </div>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.03em', marginBottom: '12px' }}>Interactive Masterclasses</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Join real-time sessions with the top 1% of founders and investors.</p>
      </header>

      {isLoading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', gap:'24px' }}>
           <div style={{ height:300, background:'#fafafa', borderRadius:24 }} className="animate-pulse" />
           <div style={{ height:300, background:'#fafafa', borderRadius:24 }} className="animate-pulse" />
        </div>
      ) : liveClasses.length > 0 ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', gap:'28px' }}>
          {liveClasses.map((cls, idx) => (
            <div key={cls._id} className={`da da${idx+2} dcard`} style={{ padding:'2.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }}>
                 <div>
                   <div className="premium-pill" style={{ marginBottom:'12px', display:'inline-block' }}>{cls.category || 'Masterclass'}</div>
                   <h3 style={{ fontSize:'1.5rem', fontWeight:900, color:'#111', lineHeight:1.2 }}>{cls.title}</h3>
                 </div>
                 <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:'0.9rem', fontWeight:800, color:'#111' }}>{new Date(cls.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div style={{ fontSize:'0.7rem', color:'#999', fontWeight:700 }}>{new Date(cls.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                 </div>
              </div>

              <p style={{ color:'#666', fontSize:'0.95rem', lineHeight:1.6, marginBottom:'32px' }}>{cls.description}</p>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'24px', borderTop:'1px solid #f8f8f8' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                   <Icons.users size={18} color="#C5975B" />
                   <span style={{ fontSize:'0.75rem', fontWeight:800, color:'#999' }}>{cls.attendees?.length || 0} FOUNDERS JOINED</span>
                </div>

                <button 
                  onClick={() => joinClass(cls._id)}
                  className="join-btn"
                  disabled={cls.status !== 'live'}
                >
                  {cls.status === 'live' ? 'JOIN SESSION' : 'SET REMINDER'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#fafafa', borderRadius: 24, padding: '5rem 2rem', textAlign: 'center', border: '2px dashed #eee' }}>
            <Icons.live size={40} color="#ddd" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#999', marginTop: '1rem' }}>No sessions currently broadcasting</h3>
            <p style={{ color: '#bbb', fontSize:'0.9rem' }}>Check the schedule for upcoming founder sprints.</p>
        </div>
      )}
    </div>
  );
}

