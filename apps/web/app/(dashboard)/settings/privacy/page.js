'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

import '@/styles/settings-responsive.css';

const Toggle = ({ enabled, onChange }) => (
  <button 
    onClick={() => onChange(!enabled)}
    style={{
      width: '42px',
      height: '22px',
      borderRadius: '11px',
      background: enabled ? '#eb2327' : '#e2e8f0',
      position: 'relative',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      padding: '0 3px',
      flexShrink: 0
    }}
  >
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: '#fff',
      transform: enabled ? 'translateX(20px)' : 'translateX(0)',
      transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }} />
  </button>
);

const RadioOption = ({ active, label, icon, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '12px 16px',
      borderRadius: '12px',
      background: active ? '#f8fafc' : 'transparent',
      border: active ? '1px solid #e2e8f0' : '1px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '4px'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ opacity: 0.5 }}>
        <Icon name={icon} size={18} />
      </div>
      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: active ? '#0f172a' : '#64748b' }}>{label}</span>
    </div>
    <div style={{ 
      width: 20, height: 20, borderRadius: '50%', 
      border: active ? '6px solid #0f172a' : '2px solid #e2e8f0',
      transition: 'all 0.2s ease'
    }} />
  </button>
);

const PrivacyRow = ({ icon, label, enabled, onChange }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
    gap: '1rem'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ opacity: 0.3 }}>
        <Icon name={icon} size={18} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: 650, color: '#1e293b' }}>{label}</span>
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

const INITIAL_VISIBILITY = 'public';
const INITIAL_SETTINGS = {
  msgAnyone: true,
  msgConnections: true,
  msgNoOne: false,
  showBio: true,
  showStats: true,
  showGoals: true,
  showLinks: true,
  showLocation: true,
  analytics: true,
  recommendations: true,
  usageConsent: true,
};

export default function PrivacyPage() {
  const [visibility, setVisibility] = useState(INITIAL_VISIBILITY);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const updateSetting = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  const isDirty = visibility !== INITIAL_VISIBILITY || JSON.stringify(settings) !== JSON.stringify(INITIAL_SETTINGS);

  const handleReset = () => {
    setVisibility(INITIAL_VISIBILITY);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <div className="settings-container privacy-view">
      
      {/* Header Bar */}
      <div className="payments-hero-header">
        <div className="header-text">
          <h1 className="header-title-main">Privacy Control</h1>
          <p className="header-subtitle-main">Manage your data sharing, visibility, and platform tracking preferences.</p>
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
              <button className="settings-btn-primary" onClick={() => alert('Changes Saved!')}>Save Changes</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="settings-grid">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <section className="settings-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <Icon name="user" size={20} color="#0f172a" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Profile Visibility</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>Choose who can view your profile.</p>
            
            <div>
              <RadioOption label="Public (anyone can see)" icon="globe" active={visibility === 'public'} onClick={() => setVisibility('public')} />
              <RadioOption label="Platform users only" icon="users" active={visibility === 'users'} onClick={() => setVisibility('users')} />
              <RadioOption label="Private" icon="lock" active={visibility === 'private'} onClick={() => setVisibility('private')} />
            </div>
          </section>

          <section className="settings-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <Icon name="users" size={20} color="#0f172a" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Collaboration Settings</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>Who can message you:</p>
            
            <PrivacyRow label="Anyone" enabled={settings.msgAnyone} onChange={v => updateSetting('msgAnyone', v)} />
            <PrivacyRow label="Only connections" enabled={settings.msgConnections} onChange={v => updateSetting('msgConnections', v)} />
            <PrivacyRow label="No one" enabled={settings.msgNoOne} onChange={v => updateSetting('msgNoOne', v)} />
          </section>

          <section className="settings-card">
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <Icon name="settings" size={20} color="#0f172a" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Account Control</h2>
             </div>
             
             <div className="settings-2col-grid" style={{ gap: '1.5rem' }}>
                <button style={{ 
                  padding: '1.5rem', borderRadius: '18px', border: '1px solid #f1f5f9', background: '#fff',
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                   <Icon name="download" size={24} color="#eb2327" />
                   <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b' }}>Download data</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Request a copy of your data</div>
                   </div>
                </button>
                <button style={{ 
                  padding: '1.5rem', borderRadius: '18px', border: '1px solid #fee2e2', background: '#fff',
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                   <Icon name="trash" size={24} color="#eb2327" />
                   <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#eb2327' }}>Delete account</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Permanently delete your account</div>
                   </div>
                </button>
             </div>
          </section>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <section className="settings-card">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>What Others Can See</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>Select what personal information is visible on your profile.</p>
            
            <PrivacyRow icon="heart" label="Show bio" enabled={settings.showBio} onChange={v => updateSetting('showBio', v)} />
            <PrivacyRow icon="barChart" label="Show stats" enabled={settings.showStats} onChange={v => updateSetting('showStats', v)} />
            <PrivacyRow icon="target" label="Show goals" enabled={settings.showGoals} onChange={v => updateSetting('showGoals', v)} />
            <PrivacyRow icon="link" label="Show links" enabled={settings.showLinks} onChange={v => updateSetting('showLinks', v)} />
            <PrivacyRow icon="mapPin" label="Show location" enabled={settings.showLocation} onChange={v => updateSetting('showLocation', v)} />
          </section>

          <section className="settings-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <Icon name="rocket" size={20} color="#0f172a" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Data & Tracking</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>Manage your data and tracking preferences.</p>
            
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '0.8rem 1.2rem' }}>
              <PrivacyRow icon="checkCircle" label="Allow analytics tracking" enabled={settings.analytics} onChange={v => updateSetting('analytics', v)} />
              <PrivacyRow icon="check" label="Personalized recommendations" enabled={settings.recommendations} onChange={v => updateSetting('recommendations', v)} />
              <PrivacyRow icon="check" label="Data usage consent" enabled={settings.usageConsent} onChange={v => updateSetting('usageConsent', v)} />
            </div>
          </section>

        </div>

      </div>

      <style jsx>{`
        .privacy-view { padding: 1.5rem 3rem 10rem !important; }
        .settings-card {
          padding: 1.8rem 2rem;
          border-radius: 32px;
          background: #fff;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .payments-hero-header { display: flex; justify-content: space-between; align-items: flex-end; padding: 1.5rem 0 2rem; margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; }
        .header-title-main { font-size: 2.8rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .header-subtitle-main { font-size: 1.1rem; color: #64748b; font-weight: 600; marginTop: 8px; }
        .settings-btn-secondary { padding: 14px 24px; borderRadius: 16px; background: #fff; border: 1px solid #e2e8f0; fontSize: 0.95rem; fontWeight: 800; color: #1e293b; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
        .settings-btn-secondary:hover { border-color: #ef4444; color: #ef4444; }
        .settings-btn-primary { padding: 14px 28px; borderRadius: 16px; background: #eb2327; border: none; fontSize: 0.95rem; fontWeight: 900; color: #fff; cursor: pointer; boxShadow: 0 4px 12px rgba(235,35,39,0.2); }
        .header-actions { display: flex; gap: 1rem; }

        @media (max-width: 1060px) {
           .privacy-view { padding: 6.5rem 1.25rem 8rem !important; }
           .payments-hero-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding-top: 1rem; border-bottom: none; }
           .header-title-main { font-size: 2.25rem; }
           .header-actions { width: 100%; flex-direction: column; }
           .header-actions button { width: 100%; justify-content: center; padding: 16px; border-radius: 20px; }
        }
      `}</style>
    </div>
  );
}
