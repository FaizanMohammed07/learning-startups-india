'use client';

import { useState, useEffect } from 'react';

export default function PerformanceAnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/v1/analytics/performance');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Failed to fetch performance data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Quantifying Evaluative Data...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .dcard:hover { transform:translateY(-5px); box-shadow:0 20px 40px rgba(0,0,0,0.06); border-color:rgba(197,151,91,0.2); }
        .trend-point { width: 12px; height: 12px; background: #7A1F2B; border-radius: 50%; box-shadow: 0 0 10px rgba(122,31,43,0.3); }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; marginBottom: 20px; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Founder Benchmarks</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Statistical breakdown of your assessment accuracy and cognitive growth trajectory.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="da da2 dcard" style={{ padding: '2.5rem' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Average Accuracy</div>
           <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#7A1F2B' }}>{Math.round(data?.averageAccuracy)}%</div>
           <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '12px', fontWeight: 600 }}>ACROSS {data?.totalEvaluations} ASSESSMENTS</div>
        </div>
        <div className="da da3 dcard" style={{ padding: '2.5rem' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Peak Performance</div>
           <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#C5975B' }}>{Math.round(data?.bestPerformance)}%</div>
           <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '12px', fontWeight: 600 }}>HIGHEST RECORDED SCORE</div>
        </div>
      </div>

      <div className="da da4 dcard" style={{ padding: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '32px' }}>Improvement Trajectory</h3>
        
        {data?.history?.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '40px', padding: '0 20px' }}>
             {data.history.map((h, i) => (
               <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ 
                    height: `${h.accuracy}%`, width: '100%', background: 'rgba(122,31,43,0.05)', 
                    borderRadius: '8px 8px 0 0', position: 'relative', minHeight: '10px'
                  }}>
                    <div style={{ 
                      position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', 
                      fontSize: '0.7rem', fontWeight: 800, color: '#7A1F2B' 
                    }}>{Math.round(h.accuracy)}%</div>
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#999', marginTop: '12px' }}>
                    {new Date(h.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#ccc' }}>Insufficient evaluation data to generate trajectory.</div>
        )}
      </div>
    </div>
  );
}

