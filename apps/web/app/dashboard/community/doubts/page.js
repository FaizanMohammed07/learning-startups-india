'use client';

import { useState, useEffect } from 'react';

export default function DoubtsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/v1/community/questions');
        const json = await res.json();
        if (json.success) setQuestions(json.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Analysing Active Inquiries...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .qcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); cursor:pointer; }
        .qcard:hover { transform: translateX(8px); border-color:rgba(122,31,43,0.1); box-shadow: 0 12px 40px rgba(0,0,0,0.04); }
        .btn-premium { background: #7A1F2B; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s; letter-spacing: 0.02em; }
        .btn-premium:hover { background: #922538; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(122,31,43,0.2); }
      `}} />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <div className="da da1 accent-bar" />
          <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Knowledge Base</h1>
          <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Peer-to-peer technical assistance and strategic resolution for complex hurdles.</p>
        </div>
        <button className="da da2 btn-premium">ASK A QUESTION</button>
      </header>

      <div style={{ display: 'grid', gap: '16px' }}>
        {questions.map((q, idx) => (
          <div key={q._id} className={`da da${idx+3} qcard`} style={{ padding: '24px 32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
             <div style={{ textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7A1F2B', lineHeight: 1 }}>{q.votes}</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>VOTES</div>
             </div>
             <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111', marginBottom: '10px', letterSpacing: '-0.01em' }}>{q.title}</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                   <div style={{ display: 'flex', gap: '8px' }}>
                     {q.tags?.map(t => <span key={t} style={{ fontSize: '0.7rem', color: '#C5975B', fontWeight: 800, background: 'rgba(197,151,91,0.06)', padding: '2px 8px', borderRadius: '4px' }}>#{t}</span>)}
                   </div>
                   <span style={{ fontSize: '0.8rem', color: '#aaa', fontWeight: 500 }}>Asked by <span style={{ color: '#666', fontWeight: 700 }}>{q.authorId?.fullName}</span></span>
                </div>
             </div>
             {q.acceptedAnswerId ? (
                <div style={{ background: '#ecfdf5', color: '#059669', padding: '8px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.02em' }}>
                   SOLVED
                </div>
             ) : (
                <div style={{ background: '#f3f4f6', color: '#9ca3af', padding: '8px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.02em' }}>
                   PENDING
                </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

