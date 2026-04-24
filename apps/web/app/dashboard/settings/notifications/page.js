'use client';

import { useState, useEffect } from 'react';

export default function NotificationsSettingsPage() {
  const [prefs, setPrefs] = useState({ learning: true, assessments: true, community: true, payments: true });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPrefs() {
      try {
        const res = await fetch('/api/v1/settings/notifications');
        const json = await res.json();
        if (json.success) setPrefs(json.data.notificationPrefs);
      } catch (err) {
        console.error('Failed to fetch prefs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrefs();
  }, []);

  const togglePref = async (key) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    try {
      await fetch('/api/v1/settings/notifications/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      alert('Failed to sync preference');
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading Preferences...</div>;

  const categories = [
    { key: 'learning', label: 'Learning Updates', desc: 'New modules, course completions, and curriculum drops.' },
    { key: 'assessments', label: 'Evaluation Results', desc: 'Scores, grading reports, and leaderboard shifts.' },
    { key: 'community', label: 'Community Activity', desc: 'Direct mentions, cluster replies, and trending think tanks.' },
    { key: 'payments', label: 'Financial Alerts', desc: 'Subscription renewals, purchase receipts, and billing history.' }
  ];

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .setting-card { background: #fff; border-radius: 24px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s; }
        .setting-card:hover { border-color: rgba(197,151,91,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
      `}} />

      <header style={{ marginBottom: '3rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Notification Center</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500 }}>Control how and when you receive tactical intelligence and platform updates.</p>
      </header>

      <div className="setting-card">
        {categories.map((cat, i) => (
          <div key={cat.key} style={{ padding: '32px', borderBottom: i === categories.length - 1 ? 'none' : '1px solid #f8f8f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '4px' }}>{cat.label}</h4>
                <p style={{ fontSize: '0.95rem', color: '#666', maxWidth: '400px', lineHeight: 1.5 }}>{cat.desc}</p>
             </div>
             <div 
               onClick={() => togglePref(cat.key)}
               style={{ 
                 width: '60px', height: '32px', borderRadius: '20px', 
                 background: prefs[cat.key] ? '#7A1F2B' : '#e5e7eb', 
                 position: 'relative', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
               }}
             >
                <div style={{ 
                   width: '24px', height: '24px', background: '#fff', borderRadius: '50%', 
                   position: 'absolute', top: '4px', left: prefs[cat.key] ? '32px' : '4px',
                   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                   boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }} />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

