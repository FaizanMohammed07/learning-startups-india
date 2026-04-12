'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

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

const NotificationRow = ({ icon, label, sublabel, enabled, onChange }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9',
    gap: '1rem'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1 }}>
      <div style={{ width: '20px', display: 'flex', justifyContent: 'center', opacity: 0.3 }}>
         {icon ? <Icon name={icon} size={18} /> : <div style={{width: 18}} />}
      </div>
      <div>
        {sublabel && (
          <div style={{ fontSize: '0.65rem', fontWeight: 850, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
            {sublabel}
          </div>
        )}
        <span style={{ fontSize: '0.92rem', fontWeight: 650, color: '#1e293b', lineHeight: 1.4 }}>{label}</span>
      </div>
    </div>
    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

export default function NotificationsPage() {
  const initialValues = {
    courseUpdates: true,
    newPrograms: true,
    mentorMessages: true,
    collabRequests: false,
    weeklyReport: true,
    inAppMessages: true,
    inAppMentions: true,
    activityAlerts: true,
    goalReminders: false,
    dailyLearningMkt: true,
    weeklyGoalMkt: true,
    streakMkt: true,
    dailyLearningSys: true,
    weeklyGoalSys: true,
    streakSys: true,
  };

  const [settings, setSettings] = useState(initialValues);

  const updateSetting = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  const isDirty = JSON.stringify(settings) !== JSON.stringify(initialValues);

  const handleReset = () => setSettings(initialValues);

  return (
    <div className="settings-container">
      
      {/* Header Bar */}
      <div className="settings-header">
        <div className="header-text">
          <h1 className="header-title-main">Notifications</h1>
          <p className="header-subtitle-main">Manage your email preferences, in-app alerts, and reminders.</p>
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
              <button className="settings-btn-primary" onClick={() => alert('Settings Saved!')}>Save all changes</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1200px' }}>
        
        {/* Email Notifications */}
        <section className="settings-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icon name="mail" size={20} color="#64748b" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>Email Notifications</h2>
          </div>

          <div className="settings-2col-grid" style={{ gap: '0 3rem' }}>
            <NotificationRow icon="moreHorizontal" label="Course updates" enabled={settings.courseUpdates} onChange={(v) => updateSetting('courseUpdates', v)} />
            <NotificationRow icon="box" label="New programs" enabled={settings.newPrograms} onChange={(v) => updateSetting('newPrograms', v)} />
            <NotificationRow icon="archive" label="System updates" enabled={settings.newPrograms} onChange={(v) => updateSetting('newPrograms', v)} />
            <NotificationRow icon="user" label="Mentor messages" enabled={settings.mentorMessages} onChange={(v) => updateSetting('mentorMessages', v)} />
            <NotificationRow icon="mail" label="Collaboration requests" enabled={settings.collabRequests} onChange={(v) => updateSetting('collabRequests', v)} />
            <NotificationRow icon="award" label="Weekly progress report" enabled={settings.weeklyReport} onChange={(v) => updateSetting('weeklyReport', v)} />
          </div>
        </section>

        {/* In-App Notifications */}
        <section className="settings-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icon name="bell" size={20} color="#64748b" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>In-App Notifications</h2>
          </div>

          <div className="settings-2col-grid">
            {/* Learning Column */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '1.2rem' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#64748b', marginBottom: '1.2rem' }}>Learning</h3>
               <NotificationRow icon="box" sublabel="LEARNING" label="Messages" enabled={settings.inAppMessages} onChange={(v) => updateSetting('inAppMessages', v)} />
               <NotificationRow icon="mention" label="Mentions" enabled={settings.inAppMentions} onChange={(v) => updateSetting('inAppMentions', v)} />
            </div>
            
            {/* Social Column */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '1.2rem' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#64748b', marginBottom: '1.2rem' }}>Social</h3>
               <NotificationRow icon="zap" sublabel="SYSTEM" label="Activity alerts" enabled={settings.activityAlerts} onChange={(v) => updateSetting('activityAlerts', v)} />
               <NotificationRow icon="archive" label="Goal reminders" enabled={settings.goalReminders} onChange={(v) => updateSetting('goalReminders', v)} />
            </div>
          </div>
        </section>

        {/* Smart Reminders */}
        <section className="settings-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Icon name="calendar" size={20} color="#64748b" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>Smart Reminders</h2>
          </div>

          <div className="settings-2col-grid">
            {/* Marketing Column */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '1.2rem' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#64748b', marginBottom: '1.2rem' }}>Marketing</h3>
               <NotificationRow icon="mail" label="Daily learning reminder" enabled={settings.dailyLearningMkt} onChange={(v) => updateSetting('dailyLearningMkt', v)} />
               <NotificationRow icon="calendar" label="Weekly goal check" enabled={settings.weeklyGoalMkt} onChange={(v) => updateSetting('weeklyGoalMkt', v)} />
               <NotificationRow icon="target" label="Streak alert" enabled={settings.streakMkt} onChange={(v) => updateSetting('streakMkt', v)} />
            </div>
            
            {/* System Column */}
            <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '1.2rem' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#64748b', marginBottom: '1.2rem' }}>System</h3>
               <NotificationRow icon="bell" label="Daily learning reminder" enabled={settings.dailyLearningSys} onChange={(v) => updateSetting('dailyLearningSys', v)} />
               <NotificationRow icon="clock" label="Weekly goal check" enabled={settings.weeklyGoalSys} onChange={(v) => updateSetting('weeklyGoalSys', v)} />
               <NotificationRow icon="check" label="Streak alert" enabled={settings.streakSys} onChange={(v) => updateSetting('streakSys', v)} />
            </div>
          </div>
        </section>

      </div>

      <style jsx>{`
        .settings-card {
          padding: 1.8rem 2rem;
          border-radius: 32px;
          background: #fff;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .header-title-main { fontSize: 2.8rem; fontWeight: 950; color: #0f172a; margin: 0; letterSpacing: -0.04em; }
        .header-subtitle-main { fontSize: 1.1rem; color: #64748b; fontWeight: 600; marginTop: 8px; }
        .settings-btn-secondary { padding: 14px 24px; borderRadius: 16px; background: #fff; border: 1px solid #e2e8f0; fontSize: 0.95rem; fontWeight: 800; color: #1e293b; cursor: pointer; transition: all 0.2s; }
        .settings-btn-primary { padding: 14px 28px; borderRadius: 16px; background: #eb2327; border: none; fontSize: 0.95rem; fontWeight: 900; color: #fff; cursor: pointer; boxShadow: 0 4px 12px rgba(235,35,39,0.2); }
        .header-actions { display: flex; gap: 1rem; }

        @media (max-width: 1060px) {
           .settings-2col-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
           .header-title-main { font-size: 1.8rem; }
           .header-subtitle-main { font-size: 0.95rem; }
           .header-actions { flex-direction: column; width: 100%; gap: 10px; }
           .settings-btn-secondary, .settings-btn-primary { width: 100%; }
        }
      `}</style>
    </div>
  );
}
