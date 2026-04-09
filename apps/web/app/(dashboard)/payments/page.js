'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const PURCHASES = [
  { id:'p1', title:'Seed Stage Preparation',    date:'Jan 15, 2025', amount:2499, status:'active',   type:'Course', img:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80' },
  { id:'p2', title:'Pitch Deck Workshop',       date:'Feb 01, 2025', amount:1999, status:'active',   type:'Course', img:'https://images.unsplash.com/photo-1551434678-e076c223a692?w=80' },
  { id:'p3', title:'Market Research 101',       date:'Feb 20, 2025', amount:0,    status:'free',     type:'Course', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80' },
  { id:'p4', title:'Startup India Pro Plan',    date:'Mar 01, 2025', amount:4999, status:'active',   type:'Subscription', img:null },
  { id:'p5', title:'Entrepreneurial Fund.',     date:'Dec 05, 2024', amount:1499, status:'completed',type:'Course', img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80' },
];

const BILLING = [
  { date:'Apr 01, 2025', amount:4999, desc:'Pro Plan — Monthly',    id:'INV-2025-0042', status:'paid' },
  { date:'Mar 01, 2025', amount:4999, desc:'Pro Plan — Monthly',    id:'INV-2025-0031', status:'paid' },
  { date:'Feb 20, 2025', amount:1999, desc:'Pitch Deck Workshop',   id:'INV-2025-0024', status:'paid' },
  { date:'Feb 01, 2025', amount:1999, desc:'Pitch Deck Workshop',   id:'INV-2025-0018', status:'paid' },
  { date:'Jan 15, 2025', amount:2499, desc:'Seed Stage Preparation',id:'INV-2025-0009', status:'paid' },
];

export default function PaymentsPage() {
  const [tab, setTab] = useState('purchases');

  const totalSpent = PURCHASES.reduce((s,p)=>s+p.amount, 0);

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Payments</h1>
          <p className="platform-page-subtitle">Your purchases, subscriptions, and billing history.</p>
        </div>
        <button className="btn-ghost"><Icon name="download" size={15} color="var(--slate-600)" /> Export</button>
      </div>

      {/* Stats */}
      <div className="platform-stats-grid">
        {[
          { label:'Total Spent',    val:`₹${totalSpent.toLocaleString()}`, icon:'creditCard', bg:'var(--red-50)',    tc:'var(--brand-red)',    border:'var(--red-200)' },
          { label:'Active Courses', val:PURCHASES.filter(p=>p.status==='active'&&p.type==='Course').length,  icon:'book',       bg:'var(--orange-50)', tc:'var(--brand-orange)', border:'#fed7aa' },
          { label:'Subscription',   val:'Pro',   icon:'zap',       bg:'#f5f3ff',         tc:'#7c3aed',            border:'#ddd6fe' },
          { label:'Next Billing',   val:'May 1', icon:'calendar',  bg:'#eff6ff',          tc:'#2563eb',            border:'#bfdbfe' },
        ].map((s,i) => (
          <div key={i} className="platform-stat-card" style={{ background:s.bg, borderColor:s.border }}>
            <div className="platform-stat-label">
              {s.label}
              <div style={{ width:28, height:28, borderRadius:7, background:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={s.icon} size={15} color={s.tc} />
              </div>
            </div>
            <span className="platform-stat-value" style={{ color:s.tc }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Pro plan banner */}
      <div style={{ background:'linear-gradient(135deg, var(--brand-red), var(--brand-orange))', borderRadius:'var(--r-xl)', padding:'1.5rem 2rem', marginBottom:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'var(--shadow-red)' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:6 }}>
            <Icon name="zap" size={20} color="#fff" />
            <span style={{ fontWeight:900, color:'#fff', fontSize:'1.15rem' }}>Startup India Pro</span>
            <span style={{ background:'rgba(255,255,255,0.2)', color:'#fff', borderRadius:'var(--r-full)', padding:'2px 10px', fontSize:'0.65rem', fontWeight:900 }}>ACTIVE</span>
          </div>
          <p style={{ color:'rgba(255,255,255,0.8)', fontWeight:600, margin:0, fontSize:'0.88rem' }}>Next billing: May 01, 2025 · ₹4,999/month</p>
        </div>
        <button style={{ background:'rgba(255,255,255,0.15)', border:'1.5px solid rgba(255,255,255,0.4)', color:'#fff', padding:'10px 20px', borderRadius:'var(--r-md)', fontWeight:900, fontSize:'0.85rem', cursor:'pointer', fontFamily:'var(--font)' }}>
          Manage Plan
        </button>
      </div>

      <div className="platform-tabs">
        <button className={`platform-tab ${tab==='purchases'?'active':''}`} onClick={()=>setTab('purchases')}>My Purchases</button>
        <button className={`platform-tab ${tab==='billing'?'active':''}`} onClick={()=>setTab('billing')}>Billing History</button>
      </div>

      {/* Purchases */}
      {tab==='purchases' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {PURCHASES.map((p,i) => (
            <div key={p.id} className="platform-list-row" style={{ padding:'1rem 1.25rem' }}>
              <div style={{ width:48, height:48, borderRadius:'var(--r-sm)', overflow:'hidden', flexShrink:0 }}>
                {p.img
                  ? <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : <div style={{ width:'100%', height:'100%', background:'var(--grad-brand)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon name={p.type==='Subscription'?'zap':'book'} size={20} color="#fff" />
                    </div>
                }
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:3 }}>
                  <h3 style={{ fontWeight:900, color:'var(--slate-900)', margin:0, fontSize:'0.9rem' }}>{p.title}</h3>
                  <span className={`tag-pill ${p.type==='Subscription'?'tag-purple':p.status==='completed'?'tag-green':p.status==='free'?'tag-blue':'tag-orange'}`}>{p.type==='Subscription'?'Subscription':p.status==='free'?'Free':p.status==='completed'?'Completed':'Active'}</span>
                </div>
                <span style={{ fontSize:'0.72rem', color:'var(--slate-400)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                  <Icon name="calendar" size={11} color="var(--slate-400)" />{p.date}
                </span>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontWeight:900, color:'var(--slate-900)', fontSize:'0.95rem' }}>
                  {p.amount===0 ? 'FREE' : `₹${p.amount.toLocaleString()}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Billing */}
      {tab==='billing' && (
        <div className="platform-info-card" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 120px 140px 100px', gap:'1rem', padding:'0.75rem 1.5rem', background:'var(--slate-50)', borderBottom:'1px solid var(--slate-100)' }}>
            {['Description','Amount','Invoice ID','Status'].map(h=>(
              <span key={h} style={{ fontSize:'0.65rem', fontWeight:900, color:'var(--slate-400)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{h}</span>
            ))}
          </div>
          {BILLING.map((b,i) => (
            <div key={b.id} style={{ display:'grid', gridTemplateColumns:'1fr 120px 140px 100px', gap:'1rem', padding:'1rem 1.5rem', borderBottom: i<BILLING.length-1 ? '1px solid var(--slate-50)' : 'none', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700, color:'var(--slate-900)', fontSize:'0.88rem' }}>{b.desc}</div>
                <div style={{ fontSize:'0.7rem', color:'var(--slate-400)', fontWeight:600, display:'flex', alignItems:'center', gap:4, marginTop:2 }}><Icon name="calendar" size={10} color="var(--slate-400)" />{b.date}</div>
              </div>
              <div style={{ fontWeight:900, color:'var(--slate-900)' }}>₹{b.amount.toLocaleString()}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:600 }}>{b.id}</div>
              <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                <span style={{ background:'#f0fdf4', color:'#059669', borderRadius:'var(--r-full)', padding:'3px 10px', fontSize:'0.65rem', fontWeight:900 }}>Paid</span>
                <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brand-red)', display:'flex', alignItems:'center' }}>
                  <Icon name="download" size={14} color="var(--brand-red)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
