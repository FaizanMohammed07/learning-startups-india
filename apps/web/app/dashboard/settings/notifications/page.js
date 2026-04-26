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

const NotificationRow = ({ icon, label, sublabel, enabled, onChange }) => (
  <div className="notification-row">
    <div className="row-left">
      <div className="icon-wrap">
         {icon ? <Icon name={icon} size={18} /> : <div style={{width: 18}} />}
      </div>
      <div>
        {sublabel && <div className="row-sublabel">{sublabel}</div>}
        <span className="row-label">{label}</span>
      </div>
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

export default function NotificationsSettingsPage() {
  const [prefs, setPrefs] = useState({ 
    learning: true, 
    assessments: true, 
    community: true, 
    payments: true,
    marketing: true
  });
  const [initialPrefs, setInitialPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPrefs() {
      try {
        const res = await fetch('/api/v1/settings/notifications');
        const json = await res.json();
        if (json.success) {
          setPrefs(json.data.notificationPrefs);
          setInitialPrefs(json.data.notificationPrefs);
        }
      } catch (err) {
        console.error('Failed to fetch prefs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrefs();
  }, []);

  const isDirty = initialPrefs && JSON.stringify(prefs) !== JSON.stringify(initialPrefs);

  const handleReset = () => setPrefs(initialPrefs);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/v1/settings/notifications/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });
      const json = await res.json();
      if (json.success) {
        setInitialPrefs(prefs);
        alert('Preferences Updated Successfully');
      }
    } catch (err) {
      alert('Failed to update preferences');
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

  const updateSetting = (key, val) => setPrefs(p => ({ ...p, [key]: val }));

  return (
    <div className="platform-page">
      
      {/* HEADER */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Notification Center</h1>
          <p className="platform-page-subtitle">Control how and when you receive tactical intelligence and platform updates.</p>
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

      <div className="settings-stack">
        
        {/* SECTION 1: EMAIL NOTIFICATIONS */}
        <section className="settings-card">
          <div className="card-header">
            <div className="header-icon-wrap"><Icon name="mail" size={20} color="#64748b" /></div>
            <h2 className="card-title">Email Notifications</h2>
          </div>

          <div className="notification-grid">
            <NotificationRow icon="moreHorizontal" label="Course updates" enabled={prefs.learning} onChange={(v) => updateSetting('learning', v)} />
            <NotificationRow icon="box" label="New programs" enabled={prefs.marketing} onChange={(v) => updateSetting('marketing', v)} />
            <NotificationRow icon="award" label="Assessment results" enabled={prefs.assessments} onChange={(v) => updateSetting('assessments', v)} />
            <NotificationRow icon="user" label="Community mentions" enabled={prefs.community} onChange={(v) => updateSetting('community', v)} />
            <NotificationRow icon="creditCard" label="Payment receipts" enabled={prefs.payments} onChange={(v) => updateSetting('payments', v)} />
          </div>
        </section>

        {/* SECTION 2: IN-APP & SMART REMINDERS */}
        <div className="settings-row-2col">
           <section className="settings-card half-card">
              <div className="card-header">
                <div className="header-icon-wrap"><Icon name="bell" size={20} color="#64748b" /></div>
                <h2 className="card-title">In-App Intelligence</h2>
              </div>
              <div className="inner-stack">
                 <NotificationRow icon="zap" sublabel="TREAT" label="Activity Alerts" enabled={prefs.community} onChange={(v) => updateSetting('community', v)} />
                 <NotificationRow icon="target" sublabel="GOAL" label="Learning Reminders" enabled={prefs.learning} onChange={(v) => updateSetting('learning', v)} />
              </div>
           </section>

           <section className="settings-card half-card">
              <div className="card-header">
                <div className="header-icon-wrap"><Icon name="calendar" size={20} color="#64748b" /></div>
                <h2 className="card-title">Smart Reminders</h2>
              </div>
              <div className="inner-stack">
                 <NotificationRow icon="mail" label="Daily progress summary" enabled={prefs.marketing} onChange={(v) => updateSetting('marketing', v)} />
                 <NotificationRow icon="clock" label="Streak alerts" enabled={prefs.learning} onChange={(v) => updateSetting('learning', v)} />
              </div>
           </section>
        </div>

      </div>

      <style jsx global>{`
        .platform-page { padding: 2rem 4rem 10rem; }
        .platform-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .platform-page-title { font-size: 2.5rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .platform-page-subtitle { color: #94a3b8; font-weight: 750; margin-top: 8px; }

        .settings-stack { display: flex; flex-direction: column; gap: 2rem; }
        .settings-row-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

        .settings-card { padding: 2.5rem; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .card-header { display: flex; alignItems: center; gap: 16px; margin-bottom: 2rem; }
        .header-icon-wrap { width: 44px; height: 44px; border-radius: 14px; background: #f8fafc; display: flex; align-items: center; justify-content: center; }
        .card-title { font-size: 1.2rem; fontWeight: 950; color: #0f172a; margin: 0; }

        .notification-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; }
        .notification-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1.5px solid #f8fafc; }
        .notification-row:last-child { border-bottom: none; }
        
        .row-left { display: flex; align-items: center; gap: 1.2rem; flex: 1; }
        .icon-wrap { width: 20px; display: flex; justifyContent: center; opacity: 0.3; }
        .row-sublabel { font-size: 0.65rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
        .row-label { font-size: 0.95rem; font-weight: 750; color: #1e293b; }

        .inner-stack { background: #f8fafc; border-radius: 24px; padding: 1.5rem; }

        .settings-btn-secondary { padding: 12px 24px; border-radius: 16px; background: #fff; border: 1.5px solid #f1f5f9; font-size: 0.9rem; font-weight: 800; color: #64748b; cursor: pointer; transition: 0.2s; }
        .settings-btn-secondary:hover { border-color: #7A1F2B; color: #7A1F2B; }
        .settings-btn-primary { padding: 12px 28px; border-radius: 16px; background: #0f172a; border: none; font-size: 0.9rem; font-weight: 950; color: #fff; cursor: pointer; transition: 0.2s; }
        .settings-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

        @media (max-width: 1060px) {
           .platform-page { padding: 2rem 1.5rem 8rem; }
           .notification-grid { grid-template-columns: 1fr; }
           .settings-row-2col { grid-template-columns: 1fr; }
           .platform-page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

