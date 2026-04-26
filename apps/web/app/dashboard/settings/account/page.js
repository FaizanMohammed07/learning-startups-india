'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccountSettingsPage() {
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/v1/settings/profile');
        const json = await res.json();
        if (json.success) setUser(json.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) return alert('Please fill all fields');
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert('New passwords do not match');
    }
    
    setIsSaving(true);
    try {
      const res = await fetch('/api/v1/settings/account/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      const json = await res.json();
      if (json.success) {
        alert('Password updated successfully');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert(json.message || 'Failed to update password');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #ef4444', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style jsx>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
    </div>
  );

  return (
    <div className="platform-page">
      
      {/* HEADER */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Account Security</h1>
          <p className="platform-page-subtitle">Manage your access credentials and high-security session parameters.</p>
        </div>
      </header>

      <div className="settings-grid">
        
        {/* ROW 1: ACCOUNT SECURITY */}
        <div className="settings-col-12">
          <section className="settings-card">
            <h3 className="section-title">Security Configuration</h3>
            
            <div className="security-grid">
               <div className="input-group">
                  <label>Email Address</label>
                  <div className="input-with-badge">
                    <div className="left-icon"><Icon name="mail" size={16} /></div>
                    <input 
                      type="email" 
                      value={user?.email || ''}
                      disabled
                      className="settings-input disabled-input"
                    />
                    <div className="verified-badge">Verified</div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px', fontWeight: 650 }}>This email is used for all security-related communications.</p>
               </div>

               <div className="password-update-box">
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="password-fields-grid">
                        <div className="input-group" style={{ marginBottom: 0 }}>
                          <label>Current Password</label>
                          <div className="password-input-wrap">
                            <Icon name="lock" size={16} className="pass-icon" />
                            <input 
                              type="password" 
                              placeholder="••••••••" 
                              className="settings-input" 
                              value={passwords.currentPassword}
                              onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                          <label>New Password</label>
                          <div className="password-input-wrap">
                            <Icon name="lock" size={16} className="pass-icon" />
                            <input 
                              type="password" 
                              placeholder="••••••••" 
                              className="settings-input" 
                              value={passwords.newPassword}
                              onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                          <label>Confirm New</label>
                          <div className="password-input-wrap">
                            <Icon name="lock" size={16} className="pass-icon" />
                            <input 
                              type="password" 
                              placeholder="••••••••" 
                              className="settings-input" 
                              value={passwords.confirmPassword}
                              onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                            />
                          </div>
                        </div>
                    </div>
                    <button type="submit" className="btn-save-primary" disabled={isSaving} style={{ marginTop: '24px' }}>
                       {isSaving ? 'Updating...' : 'Update Securely'}
                    </button>
                  </form>
               </div>
            </div>
          </section>
        </div>

        {/* ROW 2: DANGER ZONE */}
        <div className="settings-col-12">
          <section className="settings-card danger-card">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                <div>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 950, color: '#ef4444', marginBottom: '8px' }}>Danger Zone</h3>
                   <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 650, margin: 0 }}>Deactivating your account will immediately revoke all access and pause subscriptions. This action cannot be undone.</p>
                </div>
                <button className="btn-danger-outline">DEACTIVATE ACCOUNT</button>
             </div>
          </section>
        </div>

      </div>

      <style jsx global>{`
        .platform-page { padding: 2rem 4rem 10rem; }
        .platform-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .platform-page-title { font-size: 2.5rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .platform-page-subtitle { color: #94a3b8; font-weight: 750; margin-top: 8px; }

        .settings-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; }
        .settings-col-12 { grid-column: span 12; }

        .settings-card { padding: 3rem; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .danger-card { border: 2px solid rgba(239, 68, 68, 0.1); background: rgba(239, 68, 68, 0.01); }
        .section-title { font-size: 1.15rem; font-weight: 950; color: #0f172a; margin-bottom: 2.5rem; }

        .security-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; }
        
        .input-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.5rem; }
        .input-group label { font-size: 0.7rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }

        .input-with-badge { position: relative; }
        .input-with-badge .left-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .input-with-badge .settings-input { padding-left: 44px; padding-right: 100px; }
        .verified-badge { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: #ecfdf5; color: #10b981; font-size: 0.65rem; font-weight: 950; padding: 5px 12px; border-radius: 10px; }

        .settings-input { width: 100%; height: 54px; padding: 0 18px; border-radius: 18px; border: 1.5px solid #f1f5f9; background: #fcfcfc; font-size: 0.95rem; font-weight: 700; color: #0f172a; transition: all 0.2s; }
        .disabled-input { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }

        .password-fields-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }
        .password-input-wrap { position: relative; }
        .password-input-wrap .pass-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .password-input-wrap .settings-input { padding-left: 44px; }

        .btn-save-primary { padding: 16px 32px; border-radius: 18px; background: #0f172a; border: none; font-size: 0.9rem; font-weight: 950; color: #fff; cursor: pointer; transition: 0.2s; }
        .btn-save-primary:hover { transform: translateY(-1px); opacity: 0.9; }

        .btn-danger-outline { padding: 14px 28px; border-radius: 16px; background: transparent; border: 2px solid #ef4444; color: #ef4444; font-size: 0.85rem; font-weight: 950; cursor: pointer; transition: 0.2s; }
        .btn-danger-outline:hover { background: #ef4444; color: #fff; }

        @media (max-width: 1060px) {
           .platform-page { padding: 2rem 1.5rem 8rem; }
           .security-grid { grid-template-columns: 1fr; gap: 2rem; }
           .password-fields-grid { grid-template-columns: 1fr; gap: 1rem; }
           .platform-page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
