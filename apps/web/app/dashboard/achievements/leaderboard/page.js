'use client';

import { useState, useEffect } from 'react';

export default function LeaderboardPage() {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/v1/achievements/leaderboard');
        const json = await res.json();
        if (json.success) setRanking(json.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Calculating Global Standings...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideLeft { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        .row-da { animation: slideLeft .5s cubic-bezier(0.16,1,0.3,1) both; }
        .l-table { width: 100%; border-collapse: separate; border-spacing: 0 12px; }
        .l-row { background: #fff; border-radius: 12px; transition: all 0.2s; cursor: default; }
        .l-row:hover { transform: scale(1.01); box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .l-td { padding: 20px; vertical-align: middle; }
        .l-rank { font-weight: 900; font-size: 1.2rem; color: #7A1F2B; width: 60px; text-align: center; }
        .top-three { display: flex; justify-content: center; gap: 40px; margin-bottom: 60px; align-items: flex-end; }
      `}} />

      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Founder Leaderboard</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>The top performing innovators across the global startup ecosystem.</p>
      </header>

      {/* Top 3 Visual */}
      <div className="top-three">
         {ranking.slice(0, 3).map((user, i) => (
           <div key={user._id} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: i === 0 ? 120 : 90, height: i === 0 ? 120 : 90, 
                borderRadius: '50%', background: '#f0f0f0', margin: '0 auto 16px',
                border: '4px solid', borderColor: i === 0 ? '#C5975B' : i === 1 ? '#C0C0C0' : '#CD7F32',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
              }}>
                {user.fullName[0]}
              </div>
              <div style={{ fontWeight: 800, color: '#111' }}>{user.fullName}</div>
              <div style={{ fontSize: '0.8rem', color: '#7A1F2B', fontWeight: 900 }}>{Math.round(user.score)} PTS</div>
           </div>
         ))}
      </div>

      <table className="l-table">
        <tbody>
          {ranking.map((user, idx) => (
            <tr key={user._id} className="l-row row-da" style={{ animationDelay: `${idx * 50}ms` }}>
              <td className="l-td l-rank">{idx + 1}</td>
              <td className="l-td">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#999' }}>
                       {user.fullName[0]}
                    </div>
                    <div style={{ fontWeight: 800, color: '#111' }}>{user.fullName}</div>
                 </div>
              </td>
              <td className="l-td" style={{ textAlign: 'right' }}>
                 <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#999', marginBottom: '4px' }}>CERTIFICATES</div>
                 <div style={{ fontWeight: 800, color: '#111' }}>{user.certCount}</div>
              </td>
              <td className="l-td" style={{ textAlign: 'right', width: '150px' }}>
                 <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C5975B', marginBottom: '4px' }}>AGGREGATE SCORE</div>
                 <div style={{ fontWeight: 900, color: '#7A1F2B' }}>{Math.round(user.score)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

