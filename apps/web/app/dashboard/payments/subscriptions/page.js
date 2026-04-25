'use client';

import { useState, useEffect } from 'react';

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch('/api/v1/payments/subscriptions');
        const json = await res.json();
        if (json.success) setSubs(json.data);
      } catch (err) {
        console.error('Failed to fetch subscriptions:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSubs();
  }, []);

  const cancelSub = async (id) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;
    try {
      const res = await fetch(`/api/v1/payments/subscriptions/${id}/cancel`, { method: 'PATCH' });
      const json = await res.json();
      if (json.success) {
        setSubs(subs.map(s => s._id === id ? { ...s, status: 'cancelled' } : s));
      }
    } catch (err) {
      alert('Failed to cancel subscription.');
    }
  };

  if (isLoading) return <div className="p-10 text-center">Verifying Active Entitlements...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Managed Subscriptions</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Overview of your recurring plans and service entitlements.</p>
      </header>

      {subs.length > 0 ? (
        <div style={{ display: 'grid', gap: '24px' }}>
          {subs.map((s) => (
            <div key={s._id} style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#C5975B', textTransform: 'uppercase', marginBottom: '8px' }}>{s.planId.replace('-', ' ')}</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111', marginBottom: '12px' }}>Professional Incubation</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>
                    Validity: {new Date(s.startDate).toLocaleDateString()} — {new Date(s.endDate).toLocaleDateString()}
                  </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ 
                      padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 900,
                      background: s.status === 'active' ? 'rgba(16,185,129,0.1)' : '#f8f8f8',
                      color: s.status === 'active' ? '#10b981' : '#999'
                    }}>{s.status.toUpperCase()}</span>
                  </div>
                  {s.status === 'active' && (
                    <button 
                      onClick={() => cancelSub(s._id)}
                      style={{ background: 'transparent', border: 'none', color: '#7A1F2B', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}
                    >CANCEL RENEWAL</button>
                  )}
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#fcfcfc', border: '2px dashed #eee', borderRadius: '24px', padding: '5rem', textAlign: 'center' }}>
           <h3 style={{ color: '#111', fontWeight: 800, marginBottom: '12px' }}>No Active Subscriptions</h3>
           <p style={{ color: '#999', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 32px' }}>Elevate your founder journey with premium tools and exclusive cluster access.</p>
           <button style={{ background: '#7A1F2B', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>EXPLORE PLANS</button>
        </div>
      )}
    </div>
  );
}

