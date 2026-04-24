'use client';

import { useState, useEffect } from 'react';

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const res = await fetch('/api/v1/community/discussions');
        const json = await res.json();
        if (json.success) setDiscussions(json.data);
      } catch (err) {
        console.error('Failed to fetch discussions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDiscussions();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Connecting to Global Feed...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .pcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); cursor:pointer; overflow: hidden; }
        .pcard:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color:rgba(197,151,91,0.2); }
        .tag { background: rgba(122,31,43,0.04); color: #7A1F2B; padding: 6px 14px; border-radius: 10px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .btn-premium { background: #7A1F2B; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s; letter-spacing: 0.02em; }
        .btn-premium:hover { background: #922538; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(122,31,43,0.2); }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
      `}} />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <div className="da da1 accent-bar" />
          <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Founder Circle</h1>
          <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>High-signal strategic discourse for the global incubator network.</p>
        </div>
        <button className="da da2 btn-premium">+ START THREAD</button>
      </header>

      <div style={{ display: 'grid', gap: '20px' }}>
        {discussions.map((d, i) => (
          <div key={d._id} className="da pcard" style={{ padding: '24px', animationDelay: `${i * 100}ms` }}>
             <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, background: '#f8f8f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#999' }}>
                   {d.authorId?.fullName[0]}
                </div>
                <div>
                   <div style={{ fontWeight: 800, color: '#111', fontSize: '0.95rem' }}>{d.authorId?.fullName}</div>
                   <div style={{ fontSize: '0.75rem', color: '#999' }}>{new Date(d.createdAt).toLocaleDateString()}</div>
                </div>
                {d.isPinned && <div style={{ marginLeft: 'auto', background: 'rgba(197,151,91,0.1)', color: '#C5975B', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900 }}>PINNED</div>}
             </div>
             
             <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#111', marginBottom: '12px', lineHeight: 1.3 }}>{d.title}</h3>
             <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.content}</p>
             
             <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {d.tags?.map(t => <span key={t} className="tag">{t}</span>)}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

