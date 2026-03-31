'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { apiPatch } from '@/lib/api';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCurrentUser().then(res => {
      if (res.data?.user) {
        setUser(res.data.user);
        setFullName(res.data.user.fullName || '');
      }
    });
  }, []);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const body = { fullName };
    if (currentPassword && newPassword) {
      body.currentPassword = currentPassword;
      body.newPassword = newPassword;
    }
    const res = await apiPatch('/api/v1/users/me', body);
    if (res.error) {
      setMsg(res.error.message);
    } else {
      setMsg('Profile updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    }
    setSaving(false);
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Account Settings
      </h1>

      <form
        onSubmit={handleSaveProfile}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <label
            style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}
          >
            Email
          </label>
          <input
            disabled
            value={user?.email || ''}
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              background: '#f9fafb',
              color: '#6b7280',
            }}
          />
        </div>
        <div>
          <label
            style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}
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
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.5rem 0' }} />
        <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>Change Password (optional)</p>
        <div>
          <label
            style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}
          >
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />
        </div>
        <div>
          <label
            style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}
          >
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
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
            style={{ fontSize: '0.85rem', color: msg.includes('success') ? '#10b981' : '#ef4444' }}
          >
            {msg}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.7rem 1.5rem',
            background: '#1f2937',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
            alignSelf: 'flex-start',
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
