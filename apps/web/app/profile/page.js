'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { apiPatch } from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCurrentUser().then(res => {
      if (res.data?.user) {
        setUser(res.data.user);
        setFullName(res.data.user.fullName || '');
      }
      setLoading(false);
    });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const res = await apiPatch('/api/v1/users/me', { fullName });
    if (res.error) {
      setMsg(res.error.message);
    } else {
      setMsg('Profile updated!');
      setUser(prev => ({ ...prev, fullName }));
      setEditing(false);
    }
    setSaving(false);
  }

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
          Please log in to view your profile.
        </p>
        <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>My Profile</h1>

        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              {(user.fullName || user.email || '?')[0].toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontWeight: 600 }}>{user.fullName || 'User'}</h2>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{user.email}</p>
              {user.role && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    background: '#eff6ff',
                    color: '#3b82f6',
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontWeight: 500,
                  }}
                >
                  {user.role}
                </span>
              )}
            </div>
          </div>

          {editing ? (
            <form
              onSubmit={handleSave}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                  }}
                />
              </div>
              {msg && (
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: msg.includes('updated') ? '#10b981' : '#ef4444',
                  }}
                >
                  {msg}
                </p>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#1f2937',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'none',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: '0.5rem 1rem',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            style={{
              padding: '0.6rem 1rem',
              background: '#1f2937',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            style={{
              padding: '0.6rem 1rem',
              background: '#f3f4f6',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: '#1f2937',
            }}
          >
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
