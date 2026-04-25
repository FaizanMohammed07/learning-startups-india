'use client';

import { useState, useEffect } from 'react';

export default function BillingHistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBilling() {
      try {
        const res = await fetch('/api/v1/payments/billing');
        const json = await res.json();
        if (json.success) setHistory(json.data);
      } catch (err) {
        console.error('Failed to fetch billing history:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBilling();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Opening Audit Logs...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>Billing Statements</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>Chronological history of all financial transactions and invoice generation.</p>
      </header>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Transaction ID</th>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ textAlign: 'right', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h._id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                <td style={{ padding: '20px 24px' }}>
                   <div style={{ fontWeight: 800, color: '#111', fontSize: '0.9rem' }}>{h.paymentIntentId || h.orderId || h._id}</div>
                   <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>{new Date(h.createdAt).toLocaleString()}</div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                   <span style={{ 
                     padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900,
                     background: h.status === 'succeeded' ? '#ecfdf5' : h.status === 'failed' ? '#fef2f2' : '#f8f8f8',
                     color: h.status === 'succeeded' ? '#059669' : h.status === 'failed' ? '#dc2626' : '#999'
                   }}>{h.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '20px 24px', fontWeight: 800, color: '#111' }}>{h.currency} {h.amount}</td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                   <button style={{ background: '#7A1F2B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}>DOWNLOAD</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

