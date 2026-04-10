'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function BillingPage() {
  const [transactions, setTransactions] = useState([
    { id: 'INV-2024-001', date: 'Oct 12, 2024', item: 'Startup India Pro - Annual Plan', amount: '₹9,999', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-2024-002', date: 'Sept 12, 2024', item: 'Module: Advanced Fundraising Strategy', amount: '₹2,499', status: 'Paid', method: 'UPI' },
    { id: 'INV-2024-003', date: 'Aug 05, 2024', item: 'Startup India Pro - Monthly Plan', amount: '₹999', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-2024-004', date: 'July 15, 2024', item: 'Pitch Deck Review Service', amount: '₹1,500', status: 'Paid', method: 'MasterCard •••• 1111' },
    { id: 'INV-2024-005', date: 'June 20, 2024', item: 'Legal & Compliance Kit', amount: '₹3,200', status: 'Paid', method: 'UPI' },
    { id: 'INV-2024-006', date: 'May 10, 2024', item: 'Startup India Pro - Monthly Plan', amount: '₹999', status: 'Paid', method: 'Visa •••• 4242' },
  ]);

  const upcomingPayments = [
    { id: 'UP-2024-001', date: 'Nov 12, 2024', item: 'Startup India Pro - Monthly Renewal', amount: '₹999', method: 'Visa •••• 4242' },
    { id: 'UP-2024-002', date: 'Dec 01, 2024', item: 'Domain Maintenance Service', amount: '₹850', method: 'Auto-Pay UPI' },
  ];

  return (
    <div className="flex bg-white overflow-hidden justify-center" style={{ height: 'calc(100vh - 4.5rem)', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── MAIN CONTENT ── */}
      <main style={{ width: '100%', maxWidth: '1200px', background: '#f8fafc', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }} className="custom-scrollbar">
        
        {/* HEADER */}
        <header style={{ padding: '2.5rem 4rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Purchase and Billing History</h2>
            <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 750 }}>Review your investment in your startup journey.</p>
          </div>
          <button style={{ background: '#fff', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 950, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-red-border">
            <Icon name="download" size={14} /> EXPORT ALL
          </button>
        </header>

        {/* SUMMARY CARDS */}
        <div style={{ padding: '0 4rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: '#fef2f2', padding: '1.75rem', borderRadius: '28px', border: '1px solid #fee2e2', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.05)' }}>
               <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#ef4444', letterSpacing: '0.1em', marginBottom: '10px' }}>TOTAL INVESTED</div>
               <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a' }}>₹19,196</div>
               <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ background: '#ef4444', height: '6px', width: '40px', borderRadius: '3px' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ef4444', opacity: 0.8 }}>6 lifetime transactions</span>
               </div>
            </div>
            <div style={{ background: '#fff', padding: '1.75rem', borderRadius: '28px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
               <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '10px' }}>LAST PAYMENT</div>
               <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a' }}>₹9,999</div>
               <div style={{ marginTop: '12px', fontSize: '0.7rem', color: '#10b981', fontWeight: 900 }}>Successfully paid on Oct 12</div>
            </div>
            <div style={{ background: '#fef2f2', padding: '1.75rem', borderRadius: '28px', border: '1px solid #fee2e2' }}>
               <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#ef4444', letterSpacing: '0.1em', marginBottom: '10px' }}>PAYMENT METHOD</div>
               <div style={{ fontSize: '1.2rem', fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="creditCard" size={20} color="#ef4444" /> Visa •••• 4242
               </div>
               <button style={{ marginTop: '14px', background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.7rem', fontWeight: 950, padding: 0, cursor: 'pointer', textDecoration: 'underline' }}>EDIT METHOD</button>
            </div>
          </div>
        </div>

        {/* UPCOMING PAYMENTS */}
        <div style={{ padding: '0 4rem', marginBottom: '3rem' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: 950, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="clock" size={18} color="#ef4444" /> Upcoming Payments
           </h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
              {upcomingPayments.map(p => (
                <div key={p.id} className="glass-card" style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>{p.item}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800, marginTop: '4px' }}>Due on {p.date} • {p.method}</div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 950, color: '#ef4444' }}>{p.amount}</div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div style={{ padding: '0 4rem 5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 950, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="list" size={18} color="#ef4444" /> Past History
           </h3>
          <div style={{ background: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
               <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f1f5f9' }}>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>INVOICE ID</th>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>DATE</th>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>PLAN/ITEM</th>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>AMOUNT</th>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>STATUS</th>
                     <th style={{ padding: '1.25rem 2rem', fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em', textAlign: 'right' }}>ACTION</th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.map((t, i) => (
                    <tr key={t.id} style={{ borderBottom: i === transactions.length - 1 ? 'none' : '1px solid #f8fafc' }} className="table-row">
                       <td style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', fontWeight: 900, color: '#ef4444' }}>{t.id}</td>
                       <td style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', fontWeight: 750, color: '#64748b' }}>{t.date}</td>
                       <td style={{ padding: '1.5rem 2rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>{t.item}</div>
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800, marginTop: '4px' }}>{t.method}</div>
                       </td>
                       <td style={{ padding: '1.5rem 2rem', fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>{t.amount}</td>
                       <td style={{ padding: '1.5rem 2rem' }}>
                          <span style={{ background: '#f0fdf4', color: '#10b981', padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 950 }}>{t.status}</span>
                       </td>
                       <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                          <button style={{ background: 'transparent', border: '1.5px solid #f1f5f9', padding: '8px', borderRadius: '10px', color: '#94a3b8', cursor: 'pointer' }} className="hover-red-bg">
                             <Icon name="fileText" size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>

          {/* NEED HELP SECTION */}
          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem', borderRadius: '28px', background: '#fff', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '18px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="lifeBuoy" size={28} />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 950, color: '#0f172a' }}>Billing Questions?</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800 }}>Our finance team is available 24/7 to resolve discrepancies.</p>
                </div>
            </div>
            <button style={{ padding: '12px 24px', borderRadius: '14px', border: 'none', background: '#0f172a', color: '#fff', fontSize: '0.8rem', fontWeight: 950, cursor: 'pointer' }}>CONTACT SUPPORT</button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .table-row:hover { background: #fdfdfd; }
        .hover-red-border:hover { border-color: #ef4444 !important; color: #ef4444 !important; }
        .hover-red-bg:hover { background: #fef2f2 !important; border-color: #fef2f2 !important; color: #ef4444 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
