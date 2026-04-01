'use client';

import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function MyCoursesPage() {
  const { enrolledCourses, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
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
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            You haven&apos;t enrolled in any courses yet.
          </p>
          <Link
            href="/dashboard/explore"
            style={{ color: '#3b82f6', fontWeight: 500, textDecoration: 'none' }}
          >
            Browse available courses →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {enrolledCourses.map(e => (
            <Link
              key={e._id}
              href={`/learn/${e.courseId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.25rem',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{e.courseTitle || 'Course'}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Enrolled {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      width: 120,
                      height: 8,
                      background: '#f3f4f6',
                      borderRadius: 4,
                      overflow: 'hidden',
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${e.progress || 0}%`,
                        background: e.completed ? '#10b981' : '#3b82f6',
                        borderRadius: 4,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: e.completed ? '#10b981' : '#6b7280',
                      fontWeight: 600,
                    }}
                  >
                    {e.completed ? 'Completed' : `${e.progress || 0}% complete`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
