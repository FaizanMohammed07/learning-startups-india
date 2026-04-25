'use client';

import { useState, useEffect } from 'react';

export default function BadgesPage() {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await fetch('/api/v1/achievements/badges');
        const json = await res.json();
        if (json.success) setBadges(json.data);
      } catch (err) {
        console.error('Failed to fetch badges:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBadges();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Syncing Achievement Milestones...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        .b-da { animation: popIn .5s cubic-bezier(0.16,1,0.3,1) both; }
        .bcard { background:#fff; border-radius:24px; padding:32px; text-align:center; border:1px solid rgba(0,0,0,0.05); transition:all .3s; }
        .badge-icon { width: 80px; height: 80px; background: rgba(197,151,91,0.1); border-radius: 50%; display: flex; alignItems: center; justifyContent: center; margin: 0 auto 20px; font-size: 2rem; color: #C5975B; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <h1 className="b-da" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Skill Badges</h1>
        <p className="b-da" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Unlock digital recognition for your technical and strategic breakthroughs.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
        {badges.map((b, i) => (
          <div key={i} className="b-da bcard" style={{ animationDelay: `${i * 100}ms` }}>
             <div className="badge-icon">
                {b.icon === 'award' ? '🏆' : b.icon === 'star' ? '⭐' : b.icon === 'flame' ? '🔥' : '🏅'}
             </div>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{b.name}</h3>
             <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>{b.description}</p>
             <div style={{ marginTop: '20px', fontSize: '0.7rem', fontWeight: 900, color: '#7A1F2B', textTransform: 'uppercase' }}>
                EARNED {new Date(b.earnedAt).toLocaleDateString()}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

