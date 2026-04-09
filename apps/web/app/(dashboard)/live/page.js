'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const LIVE_CLASSES = [
  { id:'l1', title:'Investor Pitch Masterclass', host:'Rahul Mehta', time:'Today, 3:00 PM', duration:'90 min', status:'live', enrolled:234, tag:'Fundraising', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600' },
  { id:'l2', title:'Growth Hacking for Startups', host:'Priya Sharma', time:'Today, 5:30 PM', duration:'60 min', status:'upcoming', enrolled:189, tag:'Growth', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600' },
  { id:'l3', title:'Legal Essentials for Founders', host:'Adv. Vikram S.', time:'Tomorrow, 11:00 AM', duration:'45 min', status:'upcoming', enrolled:142, tag:'Legal', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600' },
  { id:'l4', title:'Product-Market Fit Workshop', host:'Arjun Kapoor', time:'Apr 12, 2:00 PM', duration:'120 min', status:'upcoming', enrolled:301, tag:'Product', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600' },
  { id:'l5', title:'Startup Finance 101', host:'CA Sneha Gupta', time:'Apr 14, 4:00 PM', duration:'75 min', status:'upcoming', enrolled:267, tag:'Finance', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600' },
];

const TAG_COLORS = { Fundraising:'tag-red', Growth:'tag-red', Legal:'tag-red', Product:'tag-red', Finance:'tag-red', Strategy:'tag-red' };

function LiveClassCard({ cls, layout = 'grid' }) {
  const isList = layout === 'list';
  const isLive = cls.status === 'live';

  return (
    <div className={`platform-card-v ${isList ? 'layout-list' : ''}`} style={{ 
      height: '100%', 
      margin: 0,
      display: 'flex',
      flexDirection: isList ? 'row' : 'column',
      minHeight: isList ? '200px' : 'auto'
    }}>
      {/* Thumbnail */}
      <div className="platform-card-v__thumb" style={{ 
        position: 'relative', 
        height: isList ? '200px' : '180px', 
        width: isList ? '280px' : '100%',
        overflow: 'hidden',
        flexShrink: 0,
        aspectRatio: isList ? 'auto' : '16/9'
      }}>
        <img src={cls.img} alt={cls.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="play-btn-overlay">
            <div className="play-btn-circle">
                <Icon name={isLive ? 'live' : 'play'} size={24} color="#fff" fill={isLive ? 'none' : '#fff'} />
            </div>
        </div>
        <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px', zIndex: 6 }}>
          {isLive && (
            <span style={{ background:'var(--brand-red)', color:'#fff', borderRadius:'var(--r-full)', padding:'4px 10px', fontSize:'0.65rem', fontWeight:900, display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff', animation:'pulse 1.5s infinite' }} />
              LIVE
            </span>
          )}
          <span className="tag-pill tag-red" style={{ fontSize: '0.65rem' }}>{cls.tag}</span>
        </div>
      </div>

      {/* Body */}
      <div className="platform-card-v__body" style={{ padding: '1.25rem', flex: 1 }}>
        <h3 className="platform-card-v__title" style={{ fontSize: '1rem', fontWeight: 950, marginBottom: '8px', color: 'var(--brand-black)' }}>{cls.title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="user" size={12} color="var(--slate-400)" /> {cls.host}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--brand-black)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="clock" size={12} color="var(--brand-red)" /> {cls.time}
          </span>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="platform-card-v__footer" style={{ padding: '1.25rem', paddingTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
        {isLive ? (
          <button className="btn-brand" style={{ background: 'var(--brand-red)', padding: '8px 20px', fontSize: '0.75rem', fontWeight: 900 }}>JOIN NOW</button>
        ) : (
          <button className="btn-outline-red" style={{ padding: '8px 20px', fontSize: '0.75rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="calendar" size={14} /> REGISTER
          </button>
        )}
      </div>
    </div>
  );
}

export default function LiveClassesPage() {
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('grid');
  const filtered = filter==='all' ? LIVE_CLASSES : LIVE_CLASSES.filter(c=>c.status===filter);

  return (
    <div className="platform-page">
      {/* Header */}
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Live Sessions</h1>
          <p className="platform-page-subtitle">Real-time collaboration with founders and investors.</p>
        </div>
        <div style={{ display:'flex', gap:'0.75rem' }}>
          <button className="btn-ghost" style={{ background: '#fff', border: '1px solid var(--slate-100)', fontWeight: 900 }}>
            <Icon name="calendar" size={16} color="var(--brand-red)" /> My Schedule
          </button>
        </div>
      </div>

      {/* Stats row - 4 cards now */}
      <div className="platform-stats-grid" style={{ marginBottom: '2.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label:'Live Now', val:1, icon:'live', bg:'rgba(235,35,39,0.05)', tc:'var(--brand-red)' },
          { label:'This Week', val:3, icon:'calendar', bg:'rgba(235,35,39,0.05)', tc:'var(--brand-red)' },
          { label:'Registered', val:2, icon:'userPlus', bg:'rgba(16,185,129,0.05)', tc:'#059669' },
          { label:'Mentors Met', val:12, icon:'users', bg:'rgba(59,130,246,0.05)', tc:'#2563eb' },
        ].map((s,i) => (
          <div key={i} className="platform-stat-card" style={{ background:s.bg, padding: '1.5rem', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div className="platform-stat-label" style={{ color: s.tc, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="platform-stat-value" style={{ color: 'var(--brand-black)', fontSize: '1.75rem', margin: 0 }}>{s.val}</div>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <Icon name={s.icon} size={18} color={s.tc} />
                </div>
            </div>
          </div>
        ))}
      </div>

       {/* Tabs & Layout Toggle */}
      <div className="platform-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="platform-tabs" style={{ background: 'transparent', margin: 0, padding: 0 }}>
          {['all','live','upcoming'].map(f=>(
            <button 
              key={f} 
              className={`platform-tab ${filter===f?'active':''}`} 
              onClick={()=>setFilter(f)}
              style={{ padding: '0 20px', height: '40px' }}
            >
              {f==='all'?'All Sessions':f==='live'?'Live Now':'Upcoming'}
            </button>
          ))}
        </div>
        
        <div className="layout-toggle-group" style={{ display: 'flex', gap: '8px', background: 'var(--slate-50)', padding: '4px', borderRadius: '12px', border: '1px solid var(--slate-100)' }}>
          <button 
            className={`btn-icon-toggle ${layout === 'grid' ? 'active' : ''}`} 
            onClick={() => setLayout('grid')}
            style={{ 
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: layout === 'grid' ? '#fff' : 'transparent',
              boxShadow: layout === 'grid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'grid' ? 'var(--brand-black)' : 'var(--slate-400)',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="dashboard" size={14} color={layout === 'grid' ? 'var(--brand-red)' : 'var(--slate-400)'} /> GRID
          </button>
          <button 
            className={`btn-icon-toggle ${layout === 'list' ? 'active' : ''}`} 
            onClick={() => setLayout('list')}
            style={{ 
              padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: layout === 'list' ? '#fff' : 'transparent',
              boxShadow: layout === 'list' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 950,
              color: layout === 'list' ? 'var(--brand-black)' : 'var(--slate-400)',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="recorded" size={14} color={layout === 'list' ? 'var(--brand-red)' : 'var(--slate-400)'} /> LIST
          </button>
        </div>
      </div>

      {/* Grid / List View */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter + layout}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className={layout === 'grid' ? 'platform-grid' : 'platform-list-v'}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: layout === 'grid' ? 'repeat(3, 1fr)' : '1fr', 
            gap: '2rem',
            marginTop: '1.5rem'
          }}
        >
          {filtered.map((cls, i) => (
            <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <LiveClassCard cls={cls} layout={layout} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
         <div className="platform-empty">
            <Icon name="live" size={48} color="var(--brand-red)" />
            <h2>No sessions found</h2>
            <p>Try changing your filter or check back later for new sessions.</p>
         </div>
      )}

    </div>
  );
}
