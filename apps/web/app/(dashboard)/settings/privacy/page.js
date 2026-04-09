'use client';
import Icon from '@/components/Icon';

export default function PrivacyPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Privacy Control</h1>
          <p className="platform-page-subtitle">Manage your profile visibility and data sharing preferences.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--slate-900)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="shield" size={40} color="#fff" />
        </div>
        <h2 style={{ color: 'var(--brand-black)' }}>Secure as ever</h2>
        <p>Your data is encrypted and private. Adjust your public profile visibility here.</p>
        <button className="btn-brand">
          Profile Visibility: Private <Icon name="lock" size={16} />
        </button>
      </div>
    </div>
  );
}
