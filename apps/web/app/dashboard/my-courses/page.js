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
            height: 32,
            width: 240,
            background: '#e5e7eb',
            borderRadius: 8,
            marginBottom: '2rem',
          }}
          className="animate-pulse"
        />
        {[1, 2].map(i => (
          <div
            key={i}
            style={{
              height: 100,
              background: '#f3f4f6',
              borderRadius: 20,
              marginBottom: '1rem',
            }}
            className="animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="my-courses-container">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .my-courses-container { padding: 2rem; maxWidth: 1280px; margin: 0 auto; }
        @media (max-width: 768px) {
          .my-courses-container { padding: 1.25rem 1rem; }
          .my-courses-container h1 { font-size: 1.5rem !important; margin-bottom: 1.5rem !important; }
          .course-item-card { padding: 1rem !important; gap: 0.75rem !important; }
          .course-item-info { min-width: 100% !important; }
          .course-item-progress { min-width: 100% !important; align-items: flex-start !important; }
          .course-item-action { display: none !important; }
        }
      `,
        }}
      />
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          marginBottom: '2rem',
          color: '#111827',
          letterSpacing: '-0.025em',
        }}
      >
        My Courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: '#fff',
            borderRadius: '24px',
            border: '2px dashed #e5e7eb',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <svg
              width="64"
              height="64"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Your learning journey starts here
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Explore our curriculum and enroll in your first course to begin.
          </p>
          <Link
            href="/dashboard/explore"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#111827',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {enrolledCourses.map(e => {
            const isCompleted = e.status === 'completed' || e.completed;
            return (
              <Link
                key={e._id}
                href={`/learn/${e.courseId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="course-item-card"
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '1.5rem',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#111827';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div className="course-item-info" style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: isCompleted ? '#10b981' : '#6366f1',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: '#111827',
                        marginBottom: 4,
                      }}
                    >
                      {e.courseTitle || 'Course'}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      Joined on{' '}
                      {e.createdAt
                        ? new Date(e.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>

                  <div
                    className="course-item-progress"
                    style={{
                      minWidth: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: 200 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '0.4rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        <span style={{ color: '#111827' }}>Progress</span>
                        <span style={{ color: isCompleted ? '#10b981' : '#6b7280' }}>
                          {isCompleted ? '100%' : `${e.progress || 0}%`}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 10,
                          background: '#f3f4f6',
                          borderRadius: 5,
                          overflow: 'hidden',
                          border: '1px solid #f3f4f6',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: isCompleted ? '100%' : `${e.progress || 0}%`,
                            background: isCompleted
                              ? 'linear-gradient(90deg, #10b981, #34d399)'
                              : 'linear-gradient(90deg, #111827, #4b5563)',
                            borderRadius: 5,
                            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="course-item-action" style={{ marginLeft: '1rem' }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
