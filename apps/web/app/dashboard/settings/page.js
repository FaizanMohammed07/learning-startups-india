'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsMainPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect to profile by default
    // router.push('/dashboard/settings/profile');
  }, [router]);

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div className="accent-bar" />
        <h1 className="platform-page-title">Settings</h1>
        <p className="platform-page-subtitle">Tactical configuration and identity management for your startup trajectory.</p>
      </header>

      <div className="summary-grid">
         {[
           { title: 'Personal Identity', desc: 'Manage your founder profile, mission statement, and social links.', path: '/dashboard/settings/profile', icon: '👤' },
           { title: 'Security & Account', desc: 'Update your access credentials and protect your intellectual property.', path: '/dashboard/settings/account', icon: '🔐' },
           { title: 'Notification Center', desc: 'Control how and when you receive tactical intelligence.', path: '/dashboard/settings/notifications', icon: '🔔' },
           { title: 'Privacy Vault', desc: 'Manage your data exposure and visibility across the network.', path: '/dashboard/settings/privacy', icon: '🛡️' },
         ].map(item => (
           <div key={item.path} className="summary-card" onClick={() => router.push(item.path)}>
              <div className="card-icon">{item.icon}</div>
              <div className="card-info">
                 <h3 className="card-title">{item.title}</h3>
                 <p className="card-desc">{item.desc}</p>
              </div>
           </div>
         ))}
      </div>

      <style jsx global>{`
        .platform-page { padding: 4rem; }
        .platform-page-header { margin-bottom: 4rem; }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; margin-bottom: 20px; }
        .platform-page-title { font-size: 2.8rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .platform-page-subtitle { color: #64748b; font-weight: 650; margin-top: 12px; font-size: 1.1rem; }

        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .summary-card { background: #fff; padding: 2.5rem; border-radius: 32px; border: 1.5px solid rgba(0,0,0,0.04); cursor: pointer; transition: 0.3s; display: flex; gap: 1.5rem; align-items: flex-start; }
        .summary-card:hover { border-color: #7A1F2B; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.04); }
        .card-icon { font-size: 2rem; }
        .card-title { font-size: 1.2rem; fontWeight: 950; color: #0f172a; margin-bottom: 8px; }
        .card-desc { font-size: 0.9rem; color: #64748b; font-weight: 650; line-height: 1.5; }

        @media (max-width: 768px) {
           .platform-page { padding: 2rem 1.5rem; }
           .summary-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

