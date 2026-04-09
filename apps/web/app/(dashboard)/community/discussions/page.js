'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const DISCUSSIONS = [
  { id:'d1', title:'How did you validate your first startup idea?', author:'Priya M.', initials:'PM', time:'2h ago',  replies:14, upvotes:32, tags:['Strategy','Ideation'], pinned:true },
  { id:'d2', title:'Best resources for building a pitch deck in 2025?', author:'Arjun K.', initials:'AK', time:'5h ago',  replies:9,  upvotes:21, tags:['Pitching'],           pinned:false },
  { id:'d3', title:'How much equity should a co-founder get?', author:'Sneha R.', initials:'SR', time:'1d ago',  replies:22, upvotes:48, tags:['Legal','Equity'],      pinned:false },
  { id:'d4', title:'Thoughts on the Startup India DPIIT recognition process?', author:'Rohit P.', initials:'RP', time:'2d ago',  replies:7,  upvotes:15, tags:['DPIIT','Policy'],    pinned:false },
  { id:'d5', title:'Recommended CA firms for early-stage startups?', author:'Divya V.', initials:'DV', time:'3d ago',  replies:11, upvotes:27, tags:['Finance','Legal'],    pinned:false },
];

const TAG_COLORS = { Strategy:'tag-red', Ideation:'tag-orange', Pitching:'tag-blue', Legal:'tag-gold', Equity:'tag-purple', DPIIT:'tag-green', Policy:'tag-green', Finance:'tag-green' };

const avatarColors = ['#E92222','#F26722','#7c3aed','#2563eb','#059669'];

export default function DiscussionsPage() {
  const [search, setSearch] = useState('');

  const shown = DISCUSSIONS.filter(d => {
    const q = search.toLowerCase();
    return !q || d.title.toLowerCase().includes(q) || d.author.toLowerCase().includes(q);
  });

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Discussions</h1>
          <p className="platform-page-subtitle">Connect, share knowledge, and grow together.</p>
        </div>
        <button className="btn-brand">
          <Icon name="plus" size={15} color="#fff" /> New Discussion
        </button>
      </div>

      <div className="platform-stats-grid">
        {[
          { label:'Threads',       val:DISCUSSIONS.length, icon:'message',    bg:'var(--red-50)',    tc:'var(--brand-red)',    border:'var(--red-200)' },
          { label:'Active Members', val:128,               icon:'users',      bg:'var(--orange-50)', tc:'var(--brand-orange)', border:'#fed7aa' },
          { label:'Your Posts',     val:3,                 icon:'pencil',     bg:'#eff6ff',          tc:'#2563eb',            border:'#bfdbfe' },
          { label:'Upvotes Received',val:19,              icon:'badge',      bg:'#f0fdf4',          tc:'#059669',            border:'#86efac' },
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

      {/* Search */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:'#fff', border:'1.5px solid var(--slate-200)', borderRadius:'var(--r-md)', padding:'0 1rem', marginBottom:'1.5rem' }}>
        <Icon name="search" size={16} color="var(--slate-400)" />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search discussions..." style={{ flex:1, border:'none', outline:'none', fontFamily:'var(--font)', fontSize:'0.9rem', color:'var(--slate-900)', padding:'0.85rem 0', background:'transparent' }} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
        {shown.map((d,i) => (
          <div key={d.id} className="platform-info-card hover-bg-red" style={{ borderLeft: d.pinned ? '3px solid var(--brand-red)' : '1px solid var(--slate-100)', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:avatarColors[i%5], display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#fff', fontSize:'0.75rem', fontWeight:900 }}>{d.initials}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', marginBottom:5, flexWrap:'wrap' }}>
                  {d.pinned && (
                    <span style={{ background:'var(--red-50)', color:'var(--brand-red)', borderRadius:'var(--r-full)', padding:'1px 8px', fontSize:'0.6rem', fontWeight:900 }}>
                      Pinned
                    </span>
                  )}
                  {d.tags.map(t => <span key={t} className={`tag-pill ${TAG_COLORS[t]||'tag-blue'}`}>{t}</span>)}
                </div>
                <h3 className="hover-brand-red" style={{ fontWeight:900, color:'var(--slate-900)', margin:'0 0 5px 0', fontSize:'0.97rem', transition: 'all 0.2s' }}>{d.title}</h3>
                <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.72rem', color:'var(--slate-400)', fontWeight:600 }}>{d.author}</span>
                  <span style={{ fontSize:'0.72rem', color:'var(--slate-400)', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}>
                    <Icon name="clock" size={11} color="var(--slate-400)" />{d.time}
                  </span>
                  <span style={{ fontSize:'0.72rem', color:'var(--slate-400)', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}>
                    <Icon name="message" size={11} color="var(--slate-400)" />{d.replies} replies
                  </span>
                  <span style={{ fontSize:'0.72rem', color:'var(--brand-red)', fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>
                    <Icon name="trendUp" size={11} color="var(--brand-red)" />{d.upvotes} upvotes
                  </span>
                </div>
              </div>
              <button className="btn-ghost" style={{ fontSize:'0.78rem', flexShrink:0, padding:'8px 14px' }}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
