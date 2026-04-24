'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamDetailPage({ params }) {
  const [exam, setExam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/v1/exams/${params.id}`);
        const json = await res.json();
        if (json.success) setExam(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExam();
  }, [params.id]);

  const startExam = async () => {
    try {
      const res = await fetch(`/api/v1/exams/${params.id}/start`, { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        router.push(`/dashboard/assessments/quizzes/${params.id}/attempt?submissionId=${json.data._id}&type=exam`);
      }
    } catch (err) {
      alert('Failed to start session.');
    }
  };

  if (isLoading) return <div className="p-20 text-center">Validating Credentials...</div>;
  if (!exam) return <div className="p-20 text-center">Exam data not found.</div>;

  return (
    <div style={{ maxWidth: 850, margin: '0 auto', padding: '4rem 1.5rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: '32px', border: '1px solid #7A1F2B', padding: '5rem 4rem', boxShadow: '0 30px 60px rgba(122,31,43,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ background: 'rgba(122,31,43,0.1)', color: '#7A1F2B', padding: '8px 24px', borderRadius: '40px', display: 'inline-block', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '32px' }}>
            SECURE EVALUATION ENVIRONMENT
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#111', letterSpacing: '-0.05em', marginBottom: '16px' }}>{exam.title}</h1>
          <div style={{ width: '60px', height: '4px', background: '#C5975B', margin: '0 auto 32px' }} />
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6 }}>{exam.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '60px' }}>
          <div style={{ border: '1px solid #f0f0f0', padding: '32px', borderRadius: '24px' }}>
             <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '16px' }}>Instructions</h4>
             <ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#444', fontSize: '0.95rem', display: 'grid', gap: '12px' }}>
                <li style={{ display: 'flex', gap: '10px' }}><span>•</span> Total duration is exactly {exam.timeLimit} minutes.</li>
                <li style={{ display: 'flex', gap: '10px' }}><span>•</span> Passing score requirement: {exam.passingScore}%.</li>
                <li style={{ display: 'flex', gap: '10px' }}><span>•</span> Once started, the session cannot be paused.</li>
             </ul>
          </div>
          <div style={{ border: '1px solid #f0f0f0', padding: '32px', borderRadius: '24px' }}>
             <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '16px' }}>Assessment Profile</h4>
             <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <span style={{ fontWeight: 600, color: '#666' }}>Structure</span>
                   <span style={{ fontWeight: 800, color: '#111' }}>{exam.questions?.length} Questions</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <span style={{ fontWeight: 600, color: '#666' }}>Type</span>
                   <span style={{ fontWeight: 800, color: '#111' }}>Certification Exam</span>
                </div>
             </div>
          </div>
        </div>

        <button 
          onClick={startExam}
          style={{ 
            width: '100%', padding: '1.5rem', borderRadius: '16px', background: '#7A1F2B', color: '#fff', 
            border: 'none', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '0.05em',
            boxShadow: '0 10px 40px rgba(122,31,43,0.3)'
          }}
        >
          COMMENCE ASSESSMENT
        </button>
      </div>
    </div>
  );
}
