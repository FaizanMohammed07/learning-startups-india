'use client';

import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function MyCoursesPage() {
  const { enrolledCourses, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', maxWidth: 1600, margin: '0 auto' }}>
        <div
          style={{
            height: 24,
            width: 160,
            background: '#e5e7eb',
            borderRadius: 8,
            marginBottom: '1.5rem',
          }}
          className="animate-pulse"
        />
        {[1, 2, 3].map(i => (
          <div
            key={i}
            style={{ height: 80, background: '#f3f4f6', borderRadius: 12, marginBottom: '1rem' }}
            className="animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rocket-float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-15px) rotate(5deg); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
        .course-card { animation: fadeInUp 0.4s ease-out both; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .course-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1); }
        .rocket-icon { animation: rocket-float 3s ease-in-out infinite; }
        .pulse-circle { position: absolute; border: 4px solid #3b82f6; border-radius: 50%; animation: pulse-ring 2s infinite; }
        .action-btn { transition: all 0.2s; }
        .action-btn:hover { transform: scale(1.02); filter: brightness(1.1); }
      `}} />

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>Enrolled Courses</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.05rem' }}>
          Continue your journey where you left off.
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '6rem 2rem', 
          background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
          borderRadius: '32px',
          border: '2px dashed #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse-circle" style={{ width: '100%', height: '100%' }} />
            <div className="rocket-icon" style={{ zIndex: 2 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.36 10.64A22.34 22.34 0 0 1 15 12z" />
                <path d="M9 12H4s.5-1 1-4c2 1 2 1 4 4Z" />
                <path d="M12 15v5s1 .5 4 1c-1-2-1-2-4-4Z" />
                <path d="M15 12c2.72.1 4.5 1 4.5 1l-3 3s-1-1.78-1.5-4Z" />
              </svg>
            </div>
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
            Ready for takeoff?
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
            You haven&apos;t enrolled in any courses yet. Your next big career move is just one click away!
          </p>
          
          <Link href="/dashboard/explore" style={{ textDecoration: 'none' }}>
            <button className="action-btn" style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
              color: '#fff', 
              padding: '1rem 2.5rem', 
              borderRadius: '16px', 
              border: 'none', 
              fontWeight: 800, 
              fontSize: '1rem', 
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(59,130,246,0.4)',
            }}>
              Discover Expert Courses →
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {enrolledCourses.map((e, index) => (
            <div key={e._id} className="course-card" style={{
              background: '#fff',
              borderRadius: '24px',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animationDelay: index * 0.05 + 's',
            }}>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>
                    {e.courseCategory || 'COURSE'}
                  </div>
                  {e.completed && (
                    <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 800 }}>
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                      COMPLETED
                    </div>
                  )}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 1.25rem',
                  lineHeight: 1.4,
                }}>
                  {e.courseTitle || 'Course'}
                </h3>
                
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Progress</span>
                    <span style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 800 }}>{e.progress || 0}%</span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#f3f4f6',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${e.progress || 0}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                      borderRadius: '10px',
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>

                  <Link href={`/learn/${e.courseId}`} style={{ textDecoration: 'none' }}>
                    <button className="action-btn" style={{
                      width: '100%',
                      background: '#111827',
                      color: '#fff',
                      border: 'none',
                      padding: '0.85rem',
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}>
                      {e.progress > 0 ? 'Continue Learning' : 'Start Course'}
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

