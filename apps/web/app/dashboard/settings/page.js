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
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        
        .accent-bar { width:40px; height:4px; background:#C5975B; border-radius:2px; margin-bottom:20px; }
        .pcard { background:#fff; border-radius:28px; border:1px solid rgba(0,0,0,0.05); padding:3rem; box-shadow:0 4px 20px rgba(0,0,0,0.02); }
        
        .form-label { display:block; font-size:0.75rem; font-weight:800; color:#999; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
        .form-input { width:100%; padding:1rem 1.25rem; border-radius:14px; border:1px solid #eee; background:#fafafa; font-size:0.95rem; font-weight:600; color:#333; transition:all 0.2s; outline:none; }
        .form-input:focus { border-color:#C5975B; background:#fff; box-shadow:0 0 0 4px rgba(197,151,91,0.1); }
        .form-input:disabled { background:#f5f5f5; color:#aaa; cursor:not-allowed; }
        
        .btn-save { background:#7A1F2B; color:#fff; border:none; padding:1.1rem 2.5rem; border-radius:14px; font-weight:900; font-size:0.9rem; letter-spacing:0.05em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; box-shadow:0 6px 20px rgba(122,31,43,0.25); }
        .btn-save:hover { background:#922538; transform:translateY(-2px); box-shadow:0 10px 25px rgba(122,31,43,0.3); }
        .btn-save:disabled { background:#eee; color:#aaa; cursor:not-allowed; transform:none; box-shadow:none; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Account Settings</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Manage your founder profile and secure your intellectual property trajectory.</p>
      </header>

      <div className="da da2 pcard" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="form-label">Proprietary Email</label>
              <input disabled value={user?.email || ''} className="form-input" />
            </div>
            <div>
              <label className="form-label">Full Name</label>
              <input 
                value={fullName} 
                onChange={e => setFullName(e.target.value)} 
                className="form-input"
                placeholder="Founder Name"
              />
            </div>
          </div>

          <div style={{ height: '1px', background: '#f0f0f0', width: '100%' }} />
          
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#111', marginBottom: '2rem', letterSpacing: '-0.01em' }}>Security Configuration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label className="form-label">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={e => setCurrentPassword(e.target.value)} 
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {msg && (
            <div style={{ 
              padding: '1rem 1.5rem', 
              borderRadius: '12px', 
              fontSize: '0.85rem', 
              fontWeight: 700,
              background: msg.includes('success') ? '#ecfdf5' : '#fdf2f4',
              color: msg.includes('success') ? '#059669' : '#7A1F2B',
              border: `1px solid ${msg.includes('success') ? 'rgba(5,150,105,0.1)' : 'rgba(122,31,43,0.1)'}`
            }}>
              {msg}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '1rem' }}>
            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Updating Matrix...' : 'Commit Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

