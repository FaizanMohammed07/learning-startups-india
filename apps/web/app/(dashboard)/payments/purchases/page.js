'use client';
import Icon from '@/components/Icon';

export default function PurchasesPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">My Purchases</h1>
          <p className="platform-page-subtitle">A central record of all your enrolled programs and learning assets.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--slate-900)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="creditCard" size={40} color="#fff" />
        </div>
        <h2>No purchases yet</h2>
        <p>Your premium courses and resources will appear here once you gain access to them.</p>
        <button className="btn-brand">
          Browse Library <Icon name="compass" size={16} />
        </button>
      </div>
    </div>
  );
}
