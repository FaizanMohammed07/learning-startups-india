'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch('/api/v1/quizzes?type=quiz');
        const json = await res.json();
        if (json.success) setQuizzes(json.data);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 4px 15px rgba(0,0,0,0.02); transition:all .4s; }
        .dcard:hover { transform:translateY(-8px); box-shadow:0 25px 50px -12px rgba(0,0,0,0.1); border-color:rgba(122,31,43,0.15); }
        .premium-btn { background: #7A1F2B; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; }
        .premium-btn:hover { background: #922538; transform: scale(1.05); }
      `}} />

      <header style={{ marginBottom: '3.5rem' }}>
        <div style={{ width: 40, height: 4, background: '#C5975B', borderRadius: 2, marginBottom: '16px' }} />
        <h1 className="da da1" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Interactive Quizzes</h1>
        <p className="da da1" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Test your knowledge and earn founder points with quick evaluation sprints.</p>
      </header>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 280, background: '#fafafa', borderRadius: 24 }} className="animate-pulse" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {quizzes.map((quiz, idx) => (
            <div key={quiz._id} className={`da da${idx+2} dcard`} style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ background: 'rgba(122,31,43,0.08)', color: '#7A1F2B', padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {quiz.questions?.length || 0} Questions
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.3 }}>{quiz.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>{quiz.description?.slice(0, 100)}...</p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f8f8f8', paddingTop: '20px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C5975B' }}>{quiz.timeLimit || 0} MINS</span>
                <Link href={`/dashboard/assessments/quizzes/${quiz._id}`}>
                  <button className="premium-btn">START QUIZ</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

