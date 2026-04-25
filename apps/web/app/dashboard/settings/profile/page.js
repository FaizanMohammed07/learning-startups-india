'use client';

import { useState, useEffect } from 'react';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState({ fullName: '', bio: '', socialLinks: { linkedin: '', twitter: '' } });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/v1/settings/profile');
        const json = await res.json();
        if (json.success) setProfile(json.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/v1/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const json = await res.json();
      if (json.success) alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading Profile Data...</div>;

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
      `}} />

      <header style={{ marginBottom: '3rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Personal Identity</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500 }}>Manage your professional presence across the global founder network.</p>
      </header>

      <form onSubmit={handleSave} style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', display: 'grid', gap: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
           <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid #7A1F2B' }}>
              {profile.fullName[0]}
           </div>
           <button type="button" style={{ background: 'transparent', border: '2px solid #eee', padding: '10px 20px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>CHANGE AVATAR</button>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
           <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
           <input 
             className="form-input"
             value={profile.fullName} 
             onChange={e => setProfile({ ...profile, fullName: e.target.value })}
           />
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
           <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bio / Founder Mission</label>
           <textarea 
             className="form-input"
             value={profile.bio || ''} 
             onChange={e => setProfile({ ...profile, bio: e.target.value })}
             rows={4}
             style={{ resize: 'none' }} 
           />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
           <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LinkedIn URL</label>
              <input 
                className="form-input"
                value={profile.socialLinks?.linkedin || ''} 
                onChange={e => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
              />
           </div>
           <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Twitter URL</label>
              <input 
                className="form-input"
                value={profile.socialLinks?.twitter || ''} 
                onChange={e => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
              />
           </div>
        </div>

        <div style={{ marginTop: '20px' }}>
           <button 
             type="submit" 
             className="premium-btn"
             disabled={isSaving}
           >
             {isSaving ? 'PERSISTING CHANGES...' : 'SAVE PROFILE'}
           </button>
        </div>
      </form>
    </div>
  );
}

