'use client';

import { useState, useEffect } from 'react';

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({ profileVisibility: 'public', activityVisibility: 'public' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/v1/settings/privacy');
        const json = await res.json();
        if (json.success) setSettings(json.data.privacySettings);
      } catch (err) {
        console.error('Failed to fetch privacy settings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updatePrivacy = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      await fetch('/api/v1/settings/privacy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      alert('Failed to sync privacy settings');
    }
  };

  if (isLoading) return <div className="p-10 text-center">Opening Privacy Vault...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .privacy-card { background: #fff; padding: 32px; borderRadius: 24px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s; }
        .privacy-card:hover { border-color: rgba(197,151,91,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .option-btn { padding: 12px 24px; border-radius: 12px; fontWeight: 800; cursor: pointer; border: none; transition: all 0.3s; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
      `}} />

      <header style={{ marginBottom: '3rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Privacy & Visibility</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500 }}>Control your cognitive footprint and data exposure across the network.</p>
      </header>

      <div style={{ display: 'grid', gap: '24px' }}>
         <div className="privacy-card">
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '12px' }}>Profile Visibility</h4>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>Determine who can view your founder bio, verified certificates, and professional social links.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
               {['public', 'private'].map(v => (
                 <button 
                   key={v}
                   onClick={() => updatePrivacy('profileVisibility', v)}
                   className="option-btn"
                   style={{ 
                     background: settings.profileVisibility === v ? '#7A1F2B' : '#f3f4f6',
                     color: settings.profileVisibility === v ? '#fff' : '#9ca3af',
                     boxShadow: settings.profileVisibility === v ? '0 8px 20px rgba(122,31,43,0.2)' : 'none'
                   }}
                 >{v}</button>
               ))}
            </div>
         </div>

         <div className="privacy-card">
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '12px' }}>Activity Visibility</h4>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>Control the visibility of your leaderboard rankings, cluster interactions, and public cognitive insights.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
               {['public', 'private'].map(v => (
                 <button 
                   key={v}
                   onClick={() => updatePrivacy('activityVisibility', v)}
                   className="option-btn"
                   style={{ 
                     background: settings.activityVisibility === v ? '#7A1F2B' : '#f3f4f6',
                     color: settings.activityVisibility === v ? '#fff' : '#9ca3af',
                     boxShadow: settings.activityVisibility === v ? '0 8px 20px rgba(122,31,43,0.2)' : 'none'
                   }}
                 >{v}</button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

