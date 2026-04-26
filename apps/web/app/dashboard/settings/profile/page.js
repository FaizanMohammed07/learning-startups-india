'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState({ 
    fullName: '', 
    headline: '', 
    missionStatement: '', 
    bio: '', 
    location: '', 
    phone: '', 
    timezone: 'IST (UTC+5:30)',
    socialLinks: { linkedin: '', twitter: '', github: '', website: '' } 
  });
  const [initialProfile, setInitialProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/v1/settings/profile');
        const json = await res.json();
        if (json.success) {
          const data = json.data;
          const formatted = {
            fullName: data.fullName || '',
            headline: data.headline || '',
            missionStatement: data.missionStatement || '',
            bio: data.bio || '',
            location: data.location || '',
            phone: data.phone || '',
            timezone: data.timezone || 'IST (UTC+5:30)',
            socialLinks: {
              linkedin: data.socialLinks?.linkedin || '',
              twitter: data.socialLinks?.twitter || '',
              github: data.socialLinks?.github || '',
              website: data.socialLinks?.website || ''
            }
          };
          setProfile(formatted);
          setInitialProfile(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const isDirty = initialProfile && JSON.stringify(profile) !== JSON.stringify(initialProfile);

  const handleReset = () => setProfile(initialProfile);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/v1/settings/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const json = await res.json();
      if (json.success) {
        setInitialProfile(profile);
        alert('Profile Updated Successfully');
      }
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
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
          <h1 className="platform-page-title">Personal Identity</h1>
          <p className="platform-page-subtitle">Manage your professional presence across the global founder network.</p>
        </div>
        <AnimatePresence>
          {isDirty && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <button className="settings-btn-secondary" onClick={handleReset}>Reset</button>
              <button className="settings-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save all changes'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN GRID */}
      <div className="settings-grid">
        
        {/* ROW 1: CORE PROFILE */}
        <div className="settings-col-8">
          <section className="settings-card">
            <h3 className="section-title">Profile Information</h3>
            
            <div className="profile-hero-row">
               <div className="avatar-upload-wrap">
                  <div className="avatar-preview">
                    {profile.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'BS'}
                  </div>
                  <button className="avatar-edit-btn">
                    <Icon name="pencil" size={14} color="#1e293b" />
                  </button>
               </div>
               
               <div className="profile-core-inputs">
                  <div className="profile-inputs-grid">
                    <div className="input-group">
                      <label>Full name</label>
                      <div className="input-with-icon">
                        <Icon name="user" size={16} />
                        <input 
                          type="text" 
                          value={profile.fullName}
                          onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                          className="settings-input"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Headline</label>
                      <input 
                        value={profile.headline}
                        onChange={(e) => setProfile({...profile, headline: e.target.value})}
                        className="settings-input"
                        placeholder="Founder @ Startup"
                      />
                    </div>
                  </div>
               </div>
            </div>

            <div className="profile-extended-inputs">
               <div className="input-group">
                  <label>Mission Statement</label>
                  <input 
                    value={profile.missionStatement}
                    onChange={(e) => setProfile({...profile, missionStatement: e.target.value})}
                    className="settings-input"
                    placeholder="Your core objective..."
                  />
               </div>
               <div className="input-group">
                  <label>Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                    className="settings-input bio-textarea"
                  />
                  <div className="char-count">{profile.bio.length}/300</div>
               </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR: BASIC INFO */}
        <div className="settings-col-4">
          <section className="settings-card">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="basic-info-stack">
               <div className="input-group">
                  <label>Location</label>
                  <div className="input-with-icon-right">
                    <div className="left-icon"><Icon name="mapPin" size={16} /></div>
                    <input 
                      type="text" 
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="settings-input"
                      placeholder="City, Country"
                    />
                  </div>
               </div>

               <div className="input-group">
                  <label>Timezone</label>
                  <div className="input-with-icon-right">
                    <div className="left-icon"><Icon name="clock" size={16} /></div>
                    <select 
                      className="settings-input custom-select"
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                    >
                      <option>IST (UTC+5:30)</option>
                      <option>EST (UTC-5:00)</option>
                      <option>GMT (UTC+0:00)</option>
                    </select>
                  </div>
               </div>

               <div className="input-group">
                  <label>Phone</label>
                  <div className="input-with-icon">
                    <Icon name="phone" size={16} />
                    <input 
                      type="text" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="settings-input"
                    />
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* ROW 2: LINKS */}
        <div className="settings-col-12">
          <section className="settings-card">
            <div className="section-header-wrap">
              <h3 className="section-title">Links</h3>
              <p className="section-subtitle">Add and manage your public professional links.</p>
            </div>
            
            <div className="links-manager-list">
               {[
                 { type: 'LinkedIn', key: 'linkedin', icon: 'linkedin' },
                 { type: 'Twitter', key: 'twitter', icon: 'twitter' },
                 { type: 'Github', key: 'github', icon: 'github' },
                 { type: 'Website', key: 'website', icon: 'globe' }
               ].map((link) => (
                 <div key={link.key} className="links-row">
                    <div className="link-type-selector">
                       <div className="settings-input dropdown-mock">
                          <div className={`platform-icon bg-slate`}>
                             <Icon name={link.icon} size={14} color="#64748b" />
                          </div>
                          <span className="platform-name">{link.type}</span>
                       </div>
                    </div>
                    <input 
                      type="text" 
                      value={profile.socialLinks[link.key]} 
                      onChange={(e) => setProfile({
                        ...profile, 
                        socialLinks: { ...profile.socialLinks, [link.key]: e.target.value }
                      })}
                      className="settings-input flex-1" 
                      placeholder={`Enter ${link.type} URL`}
                    />
                 </div>
               ))}
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
        .settings-col-8 { grid-column: span 8; }
        .settings-col-4 { grid-column: span 4; }
        .settings-col-12 { grid-column: span 12; }

        .settings-card { padding: 2.5rem; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .section-title { font-size: 1.15rem; font-weight: 950; color: #0f172a; margin-bottom: 2rem; }
        .section-subtitle { font-size: 0.85rem; color: #64748b; font-weight: 650; margin-bottom: 1.5rem; }

        .profile-hero-row { display: flex; gap: 2.5rem; margin-bottom: 2.5rem; align-items: flex-start; }
        .avatar-upload-wrap { position: relative; flex-shrink: 0; }
        .avatar-preview { width: 100px; height: 100px; border-radius: 32px; background: linear-gradient(135deg, #ef4444, #7A1F2B); display: flex; align-items: center; justify-content: center; font-size: 2.25rem; font-weight: 950; color: #fff; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2); }
        .avatar-edit-btn { position: absolute; bottom: -8px; right: -8px; width: 36px; height: 36px; border-radius: 12px; background: #fff; border: 1.5px solid #f1f5f9; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08); cursor: pointer; transition: 0.2s; }
        .avatar-edit-btn:hover { border-color: #ef4444; }

        .profile-core-inputs { flex: 1; }
        .profile-inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .input-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.5rem; }
        .input-group label { font-size: 0.7rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }

        .input-with-icon { position: relative; }
        .input-with-icon :global(svg) { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .input-with-icon .settings-input { padding-left: 44px; }
        
        .input-with-icon-right { position: relative; display: flex; align-items: center; }
        .input-with-icon-right .left-icon { position: absolute; left: 16px; opacity: 0.4; pointer-events: none; }
        .input-with-icon-right .settings-input { padding-left: 44px; }

        .settings-input { width: 100%; height: 54px; padding: 0 18px; border-radius: 18px; border: 1.5px solid #f1f5f9; background: #fcfcfc; font-size: 0.95rem; font-weight: 700; color: #0f172a; transition: all 0.2s; }
        .settings-input:focus { border-color: #ef4444; background: #fff; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.05); outline: none; }
        .bio-textarea { height: auto; padding: 16px 18px; resize: none; }
        .char-count { text-align: right; font-size: 0.65rem; color: #94a3b8; font-weight: 750; margin-top: 4px; }

        .basic-info-stack { display: flex; flex-direction: column; gap: 0.5rem; }
        .custom-select { appearance: none; cursor: pointer; }

        .links-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .link-type-selector { width: 220px; }
        .dropdown-mock { display: flex; align-items: center; gap: 12px; }
        .platform-icon { width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .bg-slate { background: #f1f5f9; }
        .platform-name { flex: 1; font-weight: 800; font-size: 0.85rem; color: #475569; }

        .settings-btn-secondary { padding: 12px 24px; border-radius: 16px; background: #fff; border: 1.5px solid #f1f5f9; font-size: 0.9rem; font-weight: 800; color: #64748b; cursor: pointer; transition: 0.2s; }
        .settings-btn-secondary:hover { border-color: #ef4444; color: #ef4444; }
        .settings-btn-primary { padding: 12px 28px; border-radius: 16px; background: #0f172a; border: none; font-size: 0.9rem; font-weight: 950; color: #fff; cursor: pointer; transition: 0.2s; }
        .settings-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

        @media (max-width: 1060px) {
           .platform-page { padding: 2rem 1.5rem 8rem; }
           .settings-grid { grid-template-columns: 1fr; }
           .settings-col-8, .settings-col-4, .settings-col-12 { grid-column: span 1; }
           .profile-hero-row { flex-direction: column; align-items: center; text-align: center; }
           .profile-inputs-grid { grid-template-columns: 1fr; }
           .platform-page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

