'use client';
import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardProvider';

import '@/styles/settings-responsive.css';

export default function SettingsPage() {
  const { user } = useDashboard();

  const initialProfile = {
    fullName: user?.full_name || 'Beesu Siri',
    headline: "Serial Entrepreneur & Innovation Architect",
    mission: "Building bold ideas with clarity, momentum, and strong execution.",
    bio: "Beesu Siri is focused on turning learning into visible progress through structured thinking, thinking, and disciplined execution.",
    location: "Hyderabad, India",
    phone: "+91 90000 00000"
  };

  const [profile, setProfile] = useState(initialProfile);

  const isDirty = JSON.stringify(profile) !== JSON.stringify(initialProfile);

  const handleReset = () => setProfile(initialProfile);

  return (
    <div className="settings-container account-view">
      {/* Header Bar */}
      <div className="payments-hero-header">
        <div className="header-text">
          <h1 className="header-title-main">Account Settings</h1>
          <p className="header-subtitle-main">Manage your profile, security, and preferences.</p>
        </div>
        <AnimatePresence>
          {isDirty && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="header-actions"
            >
              <button className="settings-btn-secondary" onClick={handleReset}>Reset</button>
              <button className="settings-btn-primary" onClick={() => alert('Profile Updated!')}>Save all changes</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Grid Layout */}
      <div className="settings-grid">
        
        {/* Row 1: Profile Information */}
        <div className="settings-col-8">
          <section className="settings-card profile-card-hero">
            <h3 className="section-title">Profile Information</h3>
            
            <div className="profile-hero-row">
               <div className="avatar-upload-wrap">
                  <div className="avatar-preview">
                    {profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'BS'}
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
                      />
                    </div>
                  </div>
               </div>
            </div>

            <div className="profile-extended-inputs">
               <div className="input-group">
                  <label>Mission Statement</label>
                  <input 
                    value={profile.mission}
                    onChange={(e) => setProfile({...profile, mission: e.target.value})}
                    className="settings-input"
                  />
               </div>
               <div className="input-group">
                  <label>Bio</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={2}
                    className="settings-input bio-textarea"
                  />
                  <div className="char-count">{profile.bio.length}/300</div>
               </div>
            </div>
          </section>
        </div>

        <div className="settings-col-4">
          <section className="settings-card info-card">
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
                    />
                    <div className="right-icon"><Icon name="moreHorizontal" size={16} /></div>
                  </div>
               </div>

               <div className="input-group">
                  <label>Timezone</label>
                  <div className="input-with-icon-right">
                    <div className="left-icon"><Icon name="clock" size={16} /></div>
                    <select className="settings-input custom-select">
                      <option>IST (UTC+5:30)</option>
                    </select>
                    <div className="right-icon pointer-none"><Icon name="chevronDown" size={16} /></div>
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

        {/* Row 2: Links */}
        <div className="settings-col-12">
          <section className="settings-card">
            <div className="section-header-wrap">
              <h3 className="section-title">Links</h3>
              <p className="section-subtitle">Add and manage your public professional links.</p>
            </div>
            
            <div className="links-manager-list">
               { [
                 { type: 'LinkedIn', url: 'https://linkedin.com/in/beesu-siri', icon: 'linkedin' },
                 { type: 'Website', url: 'https://beesusiri.com', icon: 'globe' }
               ].map((link, idx) => (
                 <div key={idx} className="links-row">
                    <div className="grip-handle"><Icon name="grip" size={18} /></div>
                    <div className="link-type-selector">
                       <div className="settings-input dropdown-mock">
                          <div className={`platform-icon ${link.type === 'LinkedIn' ? 'bg-linkedin' : 'bg-slate'}`}>
                             <Icon name={link.icon} size={14} color={link.type === 'LinkedIn' ? '#fff' : '#64748b'} />
                          </div>
                          <span className="platform-name">{link.type}</span>
                          <Icon name="chevronDown" size={14} color="#94a3b8" />
                       </div>
                    </div>
                    <input type="text" defaultValue={link.url} className="settings-input flex-1" />
                    <button className="btn-delete-link">
                       <Icon name="trash" size={18} color="#ef4444" />
                    </button>
                 </div>
               )) }
               
               <button className="btn-add-link">
                  <Icon name="plus" size={16} /> Add link
               </button>
            </div>
          </section>
        </div>

        {/* Row 3: Account Security */}
        <div className="settings-col-12">
          <section className="settings-card">
            <h3 className="section-title">Account Security</h3>
            
            <div className="security-grid">
               <div className="input-group">
                  <label>Email</label>
                  <div className="input-with-badge">
                    <div className="left-icon"><Icon name="mail" size={16} /></div>
                    <input 
                      type="email" 
                      defaultValue={user?.email || 'siribeesu07@gmail.com'}
                      disabled
                      className="settings-input disabled-input"
                    />
                    <div className="verified-badge">Verified</div>
                  </div>
               </div>

               <div className="password-update-box">
                  <label className="mb-2 block">Change Password</label>
                  <div className="password-fields-grid">
                      <div className="password-input-wrap">
                        <Icon name="lock" size={16} className="pass-icon" />
                        <input type="password" placeholder="Current Password" className="settings-input" />
                      </div>
                      <div className="password-input-wrap">
                        <Icon name="lock" size={16} className="pass-icon" />
                        <input type="password" placeholder="New Password" className="settings-input" />
                        <Icon name="eye" size={16} className="eye-icon" />
                      </div>
                      <button className="btn-save-primary">Update Securely</button>
                  </div>
               </div>
            </div>
          </section>
        </div>

      </div>

      <style jsx>{`
        .account-view { padding: 1.5rem 3rem 10rem !important; }
        .payments-hero-header { display: flex; justify-content: space-between; align-items: flex-end; padding: 1.5rem 0 2rem; margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; }
        .header-title-main { font-size: 2.8rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .header-subtitle-main { font-size: 1.1rem; color: #64748b; font-weight: 600; marginTop: 8px; }
        
        .settings-btn-secondary { padding: 14px 24px; border-radius: 16px; background: #fff; border: 1px solid #e2e8f0; font-size: 0.95rem; font-weight: 800; color: #1e293b; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
        .settings-btn-secondary:hover { border-color: #ef4444; color: #ef4444; }
        .settings-btn-primary { padding: 14px 28px; border-radius: 16px; background: #eb2327; border: none; font-size: 0.95rem; font-weight: 900; color: #fff; cursor: pointer; box-shadow: 0 4px 12px rgba(235,35,39,0.2); }
        .header-actions { display: flex; gap: 1rem; }
        
        .settings-card { padding: 2rem; border-radius: 32px; background: #fff; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .section-title { font-size: 1.15rem; font-weight: 950; color: #0f172a; margin-bottom: 1.5rem; }
        .section-subtitle { font-size: 0.85rem; color: #64748b; font-weight: 650; margin-bottom: 1.5rem; }

        .profile-hero-row { display: flex; gap: 2.5rem; margin-bottom: 2rem; align-items: flex-start; }
        .avatar-upload-wrap { position: relative; flex-shrink: 0; }
        .avatar-preview { width: 100px; height: 100px; border-radius: 24px; background: linear-gradient(135deg, #ef4444, #991b1b); display: flex; align-items: center; justify-content: center; font-size: 2.25rem; font-weight: 950; color: #fff; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2); }
        .avatar-edit-btn { position: absolute; bottom: -6px; right: -6px; width: 34px; height: 34px; border-radius: 50%; background: #fff; border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1); cursor: pointer; }
        
        .profile-core-inputs { flex: 1; }
        .profile-inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .input-group { display: flex; flexDirection: column; gap: 8px; margin-bottom: 1.25rem; }
        .input-group label { font-size: 0.75rem; font-weight: 850; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .input-with-icon { position: relative; }
        .input-with-icon :global(svg) { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .input-with-icon .settings-input { padding-left: 44px; }
        
        .input-with-icon-right { position: relative; display: flex; align-items: center; }
        .input-with-icon-right .left-icon { position: absolute; left: 16px; opacity: 0.4; pointer-events: none; }
        .input-with-icon-right .right-icon { position: absolute; right: 16px; opacity: 0.4; }
        .input-with-icon-right .settings-input { padding-left: 44px; padding-right: 44px; }

        .settings-input { width: 100%; height: 48px; padding: 0 16px; border-radius: 14px; border: 1.5px solid #f1f5f9; background: #fff; font-size: 0.95rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }
        .settings-input:focus { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08); outline: none; }
        .bio-textarea { height: auto; padding: 12px 16px; resize: none; }
        .char-count { text-align: right; font-size: 0.65rem; color: #94a3b8; font-weight: 700; margin-top: 4px; }

        .basic-info-stack { display: flex; flex-direction: column; gap: 0.5rem; }
        .custom-select { appearance: none; cursor: pointer; }

        .links-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .grip-handle { opacity: 0.25; cursor: grab; }
        .link-type-selector { width: 220px; }
        .dropdown-mock { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .platform-icon { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bg-linkedin { background: #0a66c2; }
        .bg-slate { background: #f1f5f9; }
        .platform-name { flex: 1; font-weight: 800; }

        .btn-delete-link { width: 44px; height: 44px; border-radius: 12px; border: 1.5px solid #fee2e2; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .btn-delete-link:hover { background: #fef2f2; }
        .btn-add-link { display: flex; align-items: center; gap: 10px; padding: 12px 24px; border-radius: 14px; border: 1.5px solid #f1f5f9; background: transparent; font-weight: 800; font-size: 0.85rem; color: #475569; cursor: pointer; transition: all 0.2s; }
        .btn-add-link:hover { border-color: #ef4444; color: #ef4444; }

        .security-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem; }
        .input-with-badge { position: relative; }
        .input-with-badge .left-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .input-with-badge .settings-input { padding-left: 44px; }
        .verified-badge { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #ecfdf4; color: #16a34a; font-size: 0.7rem; font-weight: 950; padding: 4px 10px; border-radius: 8px; }
        .disabled-input { background: #f8fafc; color: #94a3b8; }

        .password-fields-grid { display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: flex-end; }
        .password-input-wrap { position: relative; }
        .password-input-wrap .pass-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
        .password-input-wrap .eye-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); opacity: 0.4; cursor: pointer; }
        .password-input-wrap .settings-input { padding: 0 38px; }
        .btn-save-primary { height: 48px; padding: 0 24px; border-radius: 14px; background: #0f172a; color: #fff; font-weight: 900; font-size: 0.9rem; border: none; cursor: pointer; transition: all 0.2s; }

        @media (max-width: 1060px) {
           .account-view { padding: 6.5rem 1.25rem 8rem !important; }
           .payments-hero-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding-top: 1rem; border-bottom: none; }
           .header-title-main { font-size: 2.25rem; }
           .header-actions { width: 100%; flex-direction: column; }
           .header-actions button { width: 100%; justify-content: center; padding: 16px; border-radius: 20px; }

           .profile-hero-row { flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; }
           .profile-inputs-grid { grid-template-columns: 1fr; width: 100%; }
           .security-grid { grid-template-columns: 1fr; gap: 2rem; }
           .password-fields-grid { grid-template-columns: 1fr; }
           .btn-save-primary { width: 100%; }
        }
      `}</style>
    </div>
  );
}
