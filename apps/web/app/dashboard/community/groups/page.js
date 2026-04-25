'use client';

import { useState, useEffect } from 'react';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch('/api/v1/community/groups');
        const json = await res.json();
        if (json.success) setGroups(json.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroups();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Opening Global Directories...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .gcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); cursor:pointer; overflow: hidden; }
        .gcard:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); border-color:rgba(197,151,91,0.25); }
        .join-btn { padding: 12px 24px; border-radius: 12px; background: transparent; border: 2px solid #7A1F2B; color: #7A1F2B; fontWeight: 800; cursor: pointer; transition: all 0.3s; }
        .join-btn:hover { background: #7A1F2B; color: #fff; box-shadow: 0 8px 20px rgba(122,31,43,0.2); }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Incubator Clusters</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Specialized cohorts and domain-specific think tanks for high-growth ventures.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
        {groups.map((g, idx) => (
          <div key={g._id} className={`da da${idx+2} gcard`} style={{ display: 'flex', flexDirection: 'column' }}>
             <div style={{ height: '140px', background: 'linear-gradient(135deg, #7A1F2B, #4d141b)' }} />
             <div style={{ padding: '32px', marginTop: '-70px' }}>
                <div style={{ width: 90, height: 90, background: '#fff', borderRadius: '24px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 900, color: '#7A1F2B', border: '1px solid #f0f0f0' }}>
                   {g.name[0]}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111', marginBottom: '12px', letterSpacing: '-0.02em' }}>{g.name}</h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, marginBottom: '32px', height: '4.8em', overflow: 'hidden' }}>{g.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #f8f8f8' }}>
                   <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#C5975B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{g.privacy} CLUSTER</span>
                   <button className="join-btn">JOIN SESSION</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

