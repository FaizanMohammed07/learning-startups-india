'use client';

import { useState } from 'react';

export default function AccountSettingsPage() {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
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

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .form-input { padding: 16px; border-radius: 14px; border: 2px solid #f3f4f6; font-size: 1rem; font-weight: 500; outline: none; transition: all 0.3s; }
        .form-input:focus { border-color: #C5975B; box-shadow: 0 0 0 4px rgba(197,151,91,0.1); }
        .premium-btn { background: #7A1F2B; color: #fff; border: none; padding: 16px 32px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s; letter-spacing: 0.02em; }
        .premium-btn:hover { background: #922538; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(122,31,43,0.25); }
        .premium-btn:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; transform: none; box-shadow: none; }
        .danger-btn { background: transparent; border: 2px solid #dc2626; color: #dc2626; padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
        .danger-btn:hover { background: #fee2e2; transform: scale(1.02); }
      `}} />

      <header style={{ marginBottom: '3rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Security & Account</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500 }}>Manage your access credentials and high-security session parameters.</p>
      </header>

      <div style={{ display: 'grid', gap: '32px' }}>
        <form onSubmit={handlePasswordUpdate} style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', display: 'grid', gap: '24px' }}>
           <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '8px' }}>Change Password</h3>
           
           <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Password</label>
              <input 
                className="form-input"
                type="password"
                value={passwords.currentPassword} 
                onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
              />
           </div>

           <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Password</label>
              <input 
                className="form-input"
                type="password"
                value={passwords.newPassword} 
                onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
           </div>

           <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirm New Password</label>
              <input 
                className="form-input"
                type="password"
                value={passwords.confirmPassword} 
                onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              />
           </div>

           <button 
             type="submit" 
             className="premium-btn"
             disabled={isSaving}
             style={{ width: 'fit-content' }}
           >
             {isSaving ? 'UPDATING...' : 'UPDATE PASSWORD'}
           </button>
        </form>

        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid rgba(220,38,38,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#dc2626', marginBottom: '4px' }}>Danger Zone</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Deactivating your account will immediately revoke all access and pause subscriptions.</p>
           </div>
           <button className="danger-btn">DEACTIVATE</button>
        </div>
      </div>
    </div>
  );
}
