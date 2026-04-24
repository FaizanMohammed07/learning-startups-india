'use client';

import { useState, useEffect } from 'react';

export default function LearningTimePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/v1/analytics/learning-time');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Failed to fetch learning time data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Syncing Chronological Logs...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 4px 15px rgba(0,0,0,0.02); transition:all .4s; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div style={{ width: 40, height: 4, background: '#C5975B', borderRadius: 2, marginBottom: '16px' }} />
        <h1 className="da da1" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Temporal Analysis</h1>
        <p className="da da1" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Audit of the total chronological investment into your founder development.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="da da2 dcard" style={{ padding: '3rem', textAlign: 'center' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>Total Learning Investment</div>
           <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#7A1F2B' }}>{data?.totalHours} <span style={{ fontSize: '1.5rem' }}>HRS</span></div>
        </div>
      </div>

      <div className="da da3 dcard" style={{ padding: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '32px' }}>Weekly Engagement Cycle</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
           {data?.dailyBreakdown?.slice(-7).map((d, i) => (
             <div key={i} style={{ textAlign: 'center', padding: '20px', background: d.minutes > 0 ? 'rgba(122,31,43,0.03)' : '#fafafa', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#999', marginBottom: '8px' }}>{new Date(d.date).toLocaleDateString([], { weekday: 'short' })}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: d.minutes > 0 ? '#7A1F2B' : '#ccc' }}>{d.minutes}m</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

