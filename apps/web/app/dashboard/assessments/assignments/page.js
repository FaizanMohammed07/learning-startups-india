'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await fetch('/api/v1/assignments?type=assignment');
        const json = await res.json();
        if (json.success) setAssignments(json.data);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssignments();
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
        <h1 className="da da1" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Critical Assignments</h1>
        <p className="da da1" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Apply your learning to real-world scenarios and receive personalized founder feedback.</p>
      </header>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 280, background: '#fafafa', borderRadius: 24 }} className="animate-pulse" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {assignments.map((assignment, idx) => (
            <div key={assignment._id} className={`da da${idx+2} dcard`} style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ background: 'rgba(197,151,91,0.1)', color: '#C5975B', padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>
                   Phase 1
                </span>
                {assignment.deadline && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444' }}>
                    DUE: {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.3 }}>{assignment.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>{assignment.description?.slice(0, 100)}...</p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid #f8f8f8', paddingTop: '20px' }}>
                <Link href={`/dashboard/assessments/assignments/${assignment._id}`}>
                  <button className="premium-btn">SUBMIT WORK</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

