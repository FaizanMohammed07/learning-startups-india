'use client';
import Icon from '@/components/Icon';

export default function NotificationsPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Notification Settings</h1>
          <p className="platform-page-subtitle">Stay updated on your courses, achievements, and community buzz.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--orange-50)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="bell" size={40} color="var(--brand-orange)" />
        </div>
        <h2>Notifications are quiet</h2>
        <p>You haven't customized your alerts yet. We'll set them up for you as you join your first cohort!</p>
        <button className="btn-brand">
          Enable Browser Push <Icon name="zap" size={16} />
        </button>
      </div>
    </div>
  );
}
