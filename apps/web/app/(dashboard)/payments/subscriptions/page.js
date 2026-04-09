'use client';
import Icon from '@/components/Icon';

export default function SubscriptionsPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Active Subscriptions</h1>
          <p className="platform-page-subtitle">Control your premium access and renewal settings from one place.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--red-50)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="refresh" size={40} color="var(--brand-red)" />
        </div>
        <h2>No active sub</h2>
        <p>You are currently on the free-tier plan. Upgrade to unlock the full potential of Startup India.</p>
        <button className="btn-brand">
          Upgrade Pro <Icon name="zap" size={16} />
        </button>
      </div>
    </div>
  );
}
