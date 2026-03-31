'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function MyCoursesPage() {
  const { enrolledCourses, isLoading } = useDashboard();
  const [activeTab, setActiveTab] = useState('all');

  const totalEnrolled = enrolledCourses?.length || 0;
  const inProgressCourses = enrolledCourses?.filter(c => !c.completed && (c.progress || 0) < 100) || [];
  const completedCourses = enrolledCourses?.filter(c => c.completed || (c.progress || 0) >= 100) || [];
  
  const totalInProgress = inProgressCourses.length;
  const totalCompleted = completedCourses.length;

  let displayCourses = enrolledCourses || [];
  if (activeTab === 'in-progress') displayCourses = inProgressCourses;
  if (activeTab === 'completed') displayCourses = completedCourses;

  if (isLoading) {
    return (
      <div style={{ padding: '2.5rem', maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>        
        <div style={{ height: 40, width: 250, background: '#e5e7eb', borderRadius: 8, marginBottom: '1rem' }} className="animate-pulse" />
        <div style={{ height: 20, width: 400, background: '#f3f4f6', borderRadius: 8, marginBottom: '2.5rem' }} className="animate-pulse" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 350, background: '#f3f4f6', borderRadius: 16 }} className="animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem', maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .course-card {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .tab-btn:hover { background: #e5e7eb; }
        .course-card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .course-card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .play-btn { transition: all 0.2s; }
        .play-btn:hover { background: #2563eb !important; transform: scale(1.02); }
        @media (max-width: 768px) {
           .header-container { flex-direction: column; }
           .stats-container { width: 100%; justify-content: space-between; }
           .tab-container { flex-direction: column; }
        }
      `}} />

      {/* Header Section */}
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0', letterSpacing: '-0.025em' }}>My Learning Journey</h1>
          <p style={{ fontSize: '1.05rem', color: '#6b7280', margin: 0 }}>Continue your progress and master new skills at your own pace</p>
        </div>
        
        <div className="stats-container" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ padding: '0.875rem 1.25rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{totalEnrolled}</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enrolled</span>
          </div>
          <div style={{ padding: '0.875rem 1.25rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{totalInProgress}</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Progress</span>
          </div>
          <div style={{ padding: '0.875rem 1.25rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{totalCompleted}</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-container" style={{ display: 'flex', gap: '0.5rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '16px', marginBottom: '2.5rem', border: '1px solid #f3f4f6' }}>
        <button 
          onClick={() => setActiveTab('all')} 
          className={activeTab !== 'all' ? 'tab-btn' : ''}
          style={{ flex: 1, padding: '0.875rem', background: activeTab === 'all' ? '#1f2937' : 'transparent', color: activeTab === 'all' ? '#fff' : '#4b5563', borderRadius: '12px', border: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab === 'all' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          All Courses
          <span style={{ background: activeTab === 'all' ? 'rgba(255,255,255,0.2)' : '#e5e7eb', color: activeTab === 'all' ? '#fff' : '#4b5563', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.25rem', fontWeight: 700 }}>{totalEnrolled}</span>
        </button>

        <button 
          onClick={() => setActiveTab('in-progress')} 
          className={activeTab !== 'in-progress' ? 'tab-btn' : ''}
          style={{ flex: 1, padding: '0.875rem', background: activeTab === 'in-progress' ? '#fff' : 'transparent', color: activeTab === 'in-progress' ? '#dc2626' : '#4b5563', borderRadius: '12px', border: activeTab === 'in-progress' ? '1px solid #fca5a5' : '1px solid transparent', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab === 'in-progress' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          In Progress
          <span style={{ background: activeTab === 'in-progress' ? '#fee2e2' : '#e5e7eb', color: activeTab === 'in-progress' ? '#b91c1c' : '#4b5563', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.25rem', fontWeight: 700 }}>{totalInProgress}</span>
        </button>

        <button 
          onClick={() => setActiveTab('completed')} 
          className={activeTab !== 'completed' ? 'tab-btn' : ''}
          style={{ flex: 1, padding: '0.875rem', background: activeTab === 'completed' ? '#fff' : 'transparent', color: activeTab === 'completed' ? '#16a34a' : '#4b5563', borderRadius: '12px', border: activeTab === 'completed' ? '1px solid #86efac' : '1px solid transparent', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab === 'completed' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Completed
          <span style={{ background: activeTab === 'completed' ? '#dcfce3' : '#e5e7eb', color: activeTab === 'completed' ? '#15803d' : '#4b5563', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.25rem', fontWeight: 700 }}>{totalCompleted}</span>
        </button>
      </div>

      {/* Courses Grid */}
      {displayCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#f9fafb', borderRadius: '24px', border: '1px dashed #e5e7eb' }}>
          <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>No courses found</h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
            {activeTab === 'all' 
              ? "You haven't enrolled in any courses yet. Start your learning journey today!" 
              : `You don't have any ${activeTab} courses at the moment.`}
          </p>
          <Link
            href="/dashboard/explore"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
          >
            Explore Courses
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}> 
          {displayCourses.map((course, index) => {
            const progress = course.progress || 0;
            const isCompleted = course.completed || progress >= 100;
            const lastAccessed = course.lastAccessedDate 
              ? new Date(course.lastAccessedDate).toLocaleDateString() 
              : course.createdAt 
                ? new Date(course.createdAt).toLocaleDateString()
                : 'Recently';

            return (
              <div 
                key={course._id} 
                className="course-card course-card-hover"
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  border: '1px solid #f3f4f6',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Circular Progress Badge Top Right */}
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '48px', height: '48px', borderRadius: '50%', background: isCompleted ? '#dcfce3' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${isCompleted ? '#86efac' : '#e5e7eb'}`, color: isCompleted ? '#16a34a' : '#4b5563', fontSize: '0.85rem', fontWeight: 800 }}>
                  {isCompleted ? (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    `${progress}%`
                  )}
                </div>

                {/* Category Tag */}
                <div style={{ alignSelf: 'flex-start', background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                  {course.category || 'PROGRAMMING'}
                </div>

                {/* Title and Description */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem', lineHeight: 1.3, paddingRight: '3rem' }}>
                  {course.courseTitle || 'Course Title'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 1.5rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                  {course.description || 'Learn the fundamentals and advanced concepts to master this subject.'}
                </p>

                {/* Course Meta Info */}
                <div style={{ display: 'flex', gap: '1.25rem', color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {course.duration || '10 hours'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    {course.lessonsCount || '24'} lessons
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    {course.level || 'Beginner'}
                  </div>
                </div>

                {/* Linear Progress Bar */}
                <div style={{ marginTop: 'auto', marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                     <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isCompleted ? '#16a34a' : '#4b5563' }}>
                        {isCompleted ? 'Completed' : `${progress}% complete`}
                     </span>
                   </div>
                   <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
                     <div style={{ height: '100%', width: `${progress}%`, background: isCompleted ? '#16a34a' : '#3b82f6', borderRadius: '999px', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                   </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
                  <Link href={`/learn/${course.courseId}`} style={{ textDecoration: 'none' }}>
                    <button className="play-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: isCompleted ? '#10b981' : '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                      {isCompleted ? (
                        <>
                           <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                           Review Course
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Continue Learning
                        </>
                      )}
                    </button>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Last accessed {lastAccessed}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
