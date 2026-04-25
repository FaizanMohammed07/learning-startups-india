'use client';

import { useState, useEffect } from 'react';

export default function ProgressOverviewPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/v1/analytics/progress');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Failed to fetch progress data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Analysing Curriculum Progress...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .dcard:hover { transform:translateY(-5px); box-shadow:0 20px 40px rgba(0,0,0,0.06); border-color:rgba(197,151,91,0.2); }
        .progress-bar { height: 8px; background: #f3f4f6; border-radius: 10px; overflow: hidden; margin-top: 12px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #7A1F2B, #922538); transition: width 1.2s cubic-bezier(0.65, 0, 0.35, 1); }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; marginBottom: 20px; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Curriculum Velocity</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Real-time audit of your startup incubation trajectory and milestone completion.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="da da2 dcard" style={{ padding: '2.5rem', textAlign: 'center' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.1em' }}>Overall Completion</div>
           <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#7A1F2B', marginBottom: '8px' }}>{Math.round(data?.overallCompletion)}%</div>
           <div className="progress-bar">
             <div className="progress-fill" style={{ width: `${data?.overallCompletion}%` }} />
           </div>
        </div>
        <div className="da da3 dcard" style={{ padding: '2.5rem', textAlign: 'center' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.1em' }}>Milestones Cleared</div>
           <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111', marginBottom: '8px' }}>{data?.completedItems}</div>
           <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>OF {data?.totalItems} TOTAL LESSONS</div>
        </div>
      </div>

      <h2 className="da da4" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', marginBottom: '24px' }}>Course Breakdown</h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {data?.courseBreakdown.map((course, idx) => (
          <div key={idx} className={`da da${idx+5} dcard`} style={{ padding: '20px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: '#111', fontSize: '1.1rem' }}>{course.courseTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px', fontWeight: 600 }}>{course.completedCount} lessons completed</div>
               </div>
               <div style={{ textAlign: 'right', width: '120px' }}>
                  <div style={{ fontWeight: 900, color: '#C5975B' }}>{Math.round(course.percentage)}%</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.percentage}%`, background: '#C5975B' }} />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

