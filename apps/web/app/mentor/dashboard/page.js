'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { apiGet } from '@/lib/api';
import Link from 'next/link';

export default function MentorDashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mentorProfile, setMentorProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const userRes = await getCurrentUser();
      if (userRes.data?.user) {
        setUser(userRes.data.user);
      }
      const profileRes = await apiGet('/api/v1/profiles/mentors');
      if (profileRes.data) {
        const profiles = Array.isArray(profileRes.data) ? profileRes.data : [];
        const myProfile = profiles.find(
          p => p.userId === userRes.data?.user?._id || p.email === userRes.data?.user?.email
        );
        setMentorProfile(myProfile || null);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          Please log in to access mentor dashboard.
        </p>
        <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Mentor Dashboard
        </h1>

        {/* Profile Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              {(user.fullName || user.email || '?')[0].toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontWeight: 600 }}>{user.fullName || 'Mentor'}</h2>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{user.email}</p>
            </div>
          </div>

          {mentorProfile ? (
            <div
              style={{
                background: '#f0fdf4',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginTop: 8,
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 500 }}>
                {mentorProfile.status === 'approved'
                  ? '? Your mentor profile is approved and visible to students.'
                  : mentorProfile.status === 'pending'
                    ? '? Your application is under review.'
                    : `Status: ${mentorProfile.status}`}
              </p>
            </div>
          ) : (
            <div
              style={{
                background: '#eff6ff',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginTop: 8,
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#1e40af' }}>
                You haven&apos;t applied as a mentor yet.
              </p>
              <Link
                href="/mentors"
                style={{
                  fontSize: '0.85rem',
                  color: '#3b82f6',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Apply Now ?
              </Link>
            </div>
          )}
        </div>

        {/* Mentor features */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          <FeatureCard icon="??" title="My Sessions" desc="View and manage mentoring sessions" />
          <FeatureCard icon="??" title="My Mentees" desc="Track your mentees' progress" />
          <FeatureCard icon="??" title="Analytics" desc="View your mentoring impact" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: '1.25rem',
        border: '1px solid #e5e7eb',
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{icon}</div>
      <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>{desc}</p>
    </div>
  );
}
