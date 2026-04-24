'use client';

import { useState, useEffect } from 'react';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch('/api/v1/results/all');
        const json = await res.json();
        if (json.success) setResults(json.data);
      } catch (err) {
        console.error('Failed to fetch results:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResults();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:20px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 2px 8px rgba(0,0,0,0.03); transition:all .3s; }
        .res-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 20px; padding: 20px; border-bottom: 1px solid #f8f8f8; align-items: center; transition: all 0.2s; }
        .res-row:hover { background: #fafafa; }
        .res-header { font-weight: 800; color: #999; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0; margin-bottom: 8px; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <h1 className="da da1" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.03em', marginBottom: '12px' }}>Evaluation History</h1>
        <p className="da da1" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>A comprehensive log of your academic performance and certification milestones.</p>
      </header>

      {isLoading ? (
        <div style={{ display: 'grid', gap: '16px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 80, background: '#fafafa', borderRadius: 16 }} className="animate-pulse" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="da da2 dcard" style={{ padding: '20px' }}>
          <div className="res-row res-header">
             <span>Assessment</span>
             <span>Type</span>
             <span>Score</span>
             <span>Status</span>
          </div>
          {results.map((res) => (
            <div key={res._id} className="res-row">
               <div>
                  <div style={{ fontWeight: 800, color: '#111' }}>{res.assessmentId?.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>{new Date(res.submittedAt).toLocaleDateString()}</div>
               </div>
               <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C5975B', textTransform: 'uppercase' }}>{res.assessmentId?.type}</div>
               <div style={{ fontWeight: 800, color: '#111' }}>
                  {res.score} / {res.totalPoints}
                  <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#666' }}>({Math.round((res.score / res.totalPoints) * 100)}%)</span>
               </div>
               <div>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, 
                    background: res.status === 'graded' ? '#ecfdf5' : '#fef3c7',
                    color: res.status === 'graded' ? '#059669' : '#d97706'
                  }}>
                    {res.status.toUpperCase()}
                  </span>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: '#bbb' }}>No results recorded yet. Start an assessment to see your progress.</p>
        </div>
      )}
    </div>
  );
}

