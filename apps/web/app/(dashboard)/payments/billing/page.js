'use client';
import Icon from '@/components/Icon';

export default function BillingPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Billing History</h1>
          <p className="platform-page-subtitle">Manage your invoices and track your payment records.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--orange-50)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="receipt" size={40} color="var(--brand-orange)" />
        </div>
        <h2>Clear as crystal</h2>
        <p>You haven't made any financial transactions yet. Your future receipts will be stored here.</p>
        <button className="btn-brand">
          Help & Support <Icon name="helpCircle" size={16} />
        </button>
      </div>
    </div>
  );
}
