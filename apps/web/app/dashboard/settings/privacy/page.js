'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const Toggle = ({ enabled, onChange }) => (
  <button 
    onClick={() => onChange(!enabled)}
    style={{
      width: '42px',
      height: '22px',
      borderRadius: '11px',
      background: enabled ? '#7A1F2B' : '#e2e8f0',
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
    className="radio-option-btn"
    style={{
      background: active ? '#f8fafc' : 'transparent',
      border: active ? '1.5px solid #0f172a' : '1.5px solid #f1f5f9',
    }}
  >
    <div className="radio-left">
      <div className="radio-icon-wrap">
        <Icon name={icon} size={18} />
      </div>
      <span className="radio-label" style={{ color: active ? '#0f172a' : '#64748b' }}>{label}</span>
    </div>
    <div className="radio-outer-circle" style={{ borderColor: active ? '#0f172a' : '#e2e8f0' }}>
       {active && <div className="radio-inner-circle" />}
    </div>
  </button>
);

const PrivacyRow = ({ icon, label, enabled, onChange }) => (
  <div className="privacy-row">
    <div className="row-left">
      <div className="row-icon-wrap">
        <Icon name={icon} size={18} />
      </div>
      <span className="row-label">{label}</span>
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({ 
    profileVisibility: 'public', 
    activityVisibility: 'public',
    showBio: true,
    showStats: true,
    showGoals: true
  });
  const [initialSettings, setInitialSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/v1/settings/privacy');
        const json = await res.json();
        if (json.success) {
          setSettings(json.data.privacySettings);
          setInitialSettings(json.data.privacySettings);
        }
      } catch (err) {
        console.error('Failed to fetch privacy settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const isDirty = initialSettings && JSON.stringify(settings) !== JSON.stringify(initialSettings);

  const handleReset = () => setSettings(initialSettings);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/v1/settings/privacy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const json = await res.json();
      if (json.success) {
        setInitialSettings(settings);
        alert('Privacy Settings Saved');
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, val) => setSettings(s => ({ ...s, [key]: val }));

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
          <h1 className="platform-page-title">Privacy Control</h1>
          <p className="platform-page-subtitle">Manage your data sharing, visibility, and platform tracking preferences.</p>
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
                {saving ? 'Save Changes' : 'Save Changes'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="settings-grid">
        
        {/* LEFT COLUMN */}
        <div className="settings-stack-col">
          <section className="settings-card">
            <div className="card-mini-header">
              <Icon name="user" size={20} color="#0f172a" />
              <h2 className="mini-card-title">Profile Visibility</h2>
            </div>
            <p className="mini-card-subtitle">Choose who can view your profile.</p>
            
            <div className="radio-group">
              <RadioOption label="Public (anyone can see)" icon="globe" active={settings.profileVisibility === 'public'} onClick={() => updateSetting('profileVisibility', 'public')} />
              <RadioOption label="Platform users only" icon="users" active={settings.profileVisibility === 'users'} onClick={() => updateSetting('profileVisibility', 'users')} />
              <RadioOption label="Private" icon="lock" active={settings.profileVisibility === 'private'} onClick={() => updateSetting('profileVisibility', 'private')} />
            </div>
          </section>

          <section className="settings-card">
             <div className="card-mini-header">
                <Icon name="settings" size={20} color="#0f172a" />
                <h2 className="mini-card-title">Account Control</h2>
             </div>
             
             <div className="action-buttons-grid">
                <button className="action-tile">
                   <Icon name="download" size={24} color="#7A1F2B" />
                   <div className="action-tile-content">
                      <div className="action-tile-title">Download data</div>
                      <div className="action-tile-desc">Request a copy of your data</div>
                   </div>
                </button>
                <button className="action-tile danger-tile">
                   <Icon name="trash" size={24} color="#7A1F2B" />
                   <div className="action-tile-content">
                      <div className="action-tile-title">Delete account</div>
                      <div className="action-tile-desc">Permanently remove records</div>
                   </div>
                </button>
             </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="settings-stack-col">
          <section className="settings-card">
            <h2 className="mini-card-title" style={{ marginBottom: '8px' }}>What Others Can See</h2>
            <p className="mini-card-subtitle" style={{ marginBottom: '2rem' }}>Select what personal information is visible on your profile.</p>
            
            <div className="privacy-rows-stack">
              <PrivacyRow icon="heart" label="Show bio" enabled={settings.showBio} onChange={v => updateSetting('showBio', v)} />
              <PrivacyRow icon="barChart" label="Show stats" enabled={settings.showStats} onChange={v => updateSetting('showStats', v)} />
              <PrivacyRow icon="target" label="Show goals" enabled={settings.showGoals} onChange={v => updateSetting('showGoals', v)} />
            </div>
          </section>

          <section className="settings-card">
            <div className="card-mini-header">
              <Icon name="rocket" size={20} color="#0f172a" />
              <h2 className="mini-card-title">Data & Tracking</h2>
            </div>
            <p className="mini-card-subtitle">Manage your analytical tracking preferences.</p>
            
            <div className="inner-control-box">
              <PrivacyRow icon="checkCircle" label="Allow analytics tracking" enabled={true} onChange={() => {}} />
              <PrivacyRow icon="check" label="Personalized recommendations" enabled={true} onChange={() => {}} />
            </div>
          </section>
        </div>

      </div>

      <style jsx global>{`
        .platform-page { padding: 2rem 4rem 10rem; }
        .platform-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .platform-page-title { font-size: 2.5rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .platform-page-subtitle { color: #94a3b8; font-weight: 750; margin-top: 8px; }

        .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .settings-stack-col { display: flex; flex-direction: column; gap: 2rem; }

        .settings-card { padding: 2.5rem; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .card-mini-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .mini-card-title { font-size: 1.15rem; font-weight: 950; color: #0f172a; margin: 0; }
        .mini-card-subtitle { font-size: 0.85rem; color: #94a3b8; font-weight: 750; margin-bottom: 1.5rem; }

        .radio-group { display: flex; flex-direction: column; gap: 10px; }
        .radio-option-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-radius: 18px; cursor: pointer; transition: 0.2s; }
        .radio-left { display: flex; align-items: center; gap: 14px; }
        .radio-icon-wrap { opacity: 0.4; }
        .radio-label { font-size: 0.95rem; font-weight: 750; }
        .radio-outer-circle { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; }
        .radio-inner-circle { width: 10px; height: 10px; border-radius: 50%; background: #0f172a; }

        .privacy-rows-stack { display: flex; flex-direction: column; }
        .privacy-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1.5px solid #f8fafc; }
        .privacy-row:last-child { border-bottom: none; }
        .row-left { display: flex; align-items: center; gap: 14px; }
        .row-icon-wrap { opacity: 0.3; }
        .row-label { font-size: 0.95rem; font-weight: 750; color: #1e293b; }

        .inner-control-box { background: #f8fafc; border-radius: 24px; padding: 1.2rem 1.8rem; margin-top: 1rem; }

        .action-buttons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .action-tile { padding: 1.5rem; border-radius: 24px; border: 1.5px solid #f1f5f9; background: #fff; text-align: left; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; gap: 12px; }
        .action-tile:hover { border-color: #7A1F2B; transform: translateY(-2px); }
        .action-tile-title { font-weight: 850; font-size: 0.95rem; color: #0f172a; }
        .action-tile-desc { font-size: 0.75rem; color: #94a3b8; font-weight: 650; }
        .danger-tile { border-color: rgba(122, 31, 43, 0.05); }

        .settings-btn-secondary { padding: 12px 24px; border-radius: 16px; background: #fff; border: 1.5px solid #f1f5f9; font-size: 0.9rem; font-weight: 800; color: #64748b; cursor: pointer; transition: 0.2s; }
        .settings-btn-secondary:hover { border-color: #7A1F2B; color: #7A1F2B; }
        .settings-btn-primary { padding: 12px 28px; border-radius: 16px; background: #0f172a; border: none; font-size: 0.9rem; font-weight: 950; color: #fff; cursor: pointer; transition: 0.2s; }
        .settings-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

        @media (max-width: 1060px) {
           .platform-page { padding: 2rem 1.5rem 8rem; }
           .settings-grid { grid-template-columns: 1fr; }
           .action-buttons-grid { grid-template-columns: 1fr; }
           .platform-page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

