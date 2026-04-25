'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch('/api/v1/exams?type=exam');
        const json = await res.json();
        if (json.success) setExams(json.data);
      } catch (err) {
        console.error('Failed to fetch exams:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExams();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 4px 15px rgba(0,0,0,0.02); transition:all .4s; }
        .dcard:hover { transform:translateY(-8px); box-shadow:0 25px 50px -12px rgba(0,0,0,0.1); border-color:rgba(122,31,43,0.15); }
        .exam-btn { background: linear-gradient(135deg, #7A1F2B, #9B3040); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; width: 100%; letter-spacing: 0.1em; }
        .exam-btn:hover { opacity: 0.9; transform: scale(1.02); }
      `}} />

      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <h1 className="da da1" style={{ fontSize: '3rem', fontWeight: 900, color: '#111', letterSpacing: '-0.05em', marginBottom: '12px' }}>Final Certification Exams</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '700px', margin: '0 auto' }}>Strict evaluation protocols to validate your readiness for the global startup ecosystem.</p>
      </header>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
          {[1, 2].map(i => (
            <div key={i} style={{ height: 350, background: '#fafafa', borderRadius: 24 }} className="animate-pulse" />
          ))}
        </div>
      ) : exams.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
          {exams.map((exam, idx) => (
            <div key={exam._id} className={`da da${idx+2} dcard`} style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#7A1F2B' }} />
              
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#C5975B', letterSpacing: '0.2em', textTransform: 'uppercase' }}>High Stakes Evaluation</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111', marginTop: '16px', marginBottom: '8px' }}>{exam.title}</h3>
                <p style={{ fontSize: '1rem', color: '#666' }}>{exam.courseId?.title || 'Advanced Founder Track'}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#f8f8f8', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Duration</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#111' }}>{exam.timeLimit || 0}m</div>
                </div>
                <div style={{ background: '#f8f8f8', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Questions</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#111' }}>{exam.questions?.length || 0}</div>
                </div>
              </div>

              <Link href={`/dashboard/assessments/exams/${exam._id}`}>
                <button className="exam-btn">START SECURE SESSION</button>
              </Link>
              
              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: '#aaa', fontWeight: 600 }}>
                 Note: Tab switching will be monitored and may void the attempt.
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0', background: '#fafafa', borderRadius: 24, border: '2px dashed #eee' }}>
            <p style={{ color: '#bbb', fontWeight: 600 }}>No exams currently scheduled for your phase.</p>
        </div>
      )}
    </div>
  );
}

