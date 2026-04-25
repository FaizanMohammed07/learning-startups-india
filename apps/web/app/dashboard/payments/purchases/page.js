'use client';

import { useState, useEffect } from 'react';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch('/api/v1/payments/purchases');
        const json = await res.json();
        if (json.success) setPurchases(json.data);
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Syncing Transaction Records...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '8px' }}>My Assets</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>A repository of your institutional acquisitions and resources.</p>
      </header>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Asset Name</th>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Purchase Date</th>
              <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ textAlign: 'right', padding: '16px 24px', fontSize: '0.75rem', fontWeight: 800, color: '#999', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                <td style={{ padding: '20px 24px', fontWeight: 700, color: '#111' }}>{p.courseId?.title || 'System Subscription'}</td>
                <td style={{ padding: '20px 24px', color: '#666', fontSize: '0.9rem' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '20px 24px', fontWeight: 800, color: '#7A1F2B' }}>{p.currency} {p.amount}</td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                   <button style={{ background: 'transparent', border: 'none', color: '#7A1F2B', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}>VIEW DETAILS</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {purchases.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#ccc' }}>No purchases recorded yet.</div>
        )}
      </div>
    </div>
  );
}

