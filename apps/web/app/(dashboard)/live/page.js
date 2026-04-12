'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy data for Live page
const ALL_CLASSES = [
  { id:'l1', title:'Arrays in Python', host:'Rahul Mehta', subject:'Computer Science', time:'Today, 3:00 PM', duration:'90 min', status:'live', enrolled:234, img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600', isMyClass: true },
  { id:'l2', title:'Growth Hacking for Startups', host:'Priya Sharma', subject:'Marketing', time:'Today, 5:30 PM', duration:'60 min', status:'upcoming', enrolled:189, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', isMyClass: false },
  { id:'l3', title:'Legal Essentials for Founders', host:'Adv. Vikram S.', subject:'Legal', time:'Tomorrow, 11:00 AM', duration:'45 min', status:'upcoming', enrolled:142, img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600', isMyClass: true },
  { id:'l4', title:'Startup Finance 101', host:'CA Sneha Gupta', subject:'Finance', time:'Apr 14, 4:00 PM', duration:'75 min', status:'upcoming', enrolled:267, img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', isMyClass: false },
  { id:'l5', title:'React Basics', host:'Arjun Kapoor', subject:'Web Dev', time:'Yesterday, 2:00 PM', duration:'120 min', status:'completed', enrolled:301, img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600', isMyClass: true },
];

function LiveClassCard({ cls, layout = 'grid' }) {
  const router = useRouter();
  const isList = layout === 'list';
  const isLive = cls.status === 'live';
  const isCompleted = cls.status === 'completed';

  const handleAction = () => {
    if (isLive && !cls.isMyClass) {
      router.push(`/live-room/${cls.id}`);
    } else if (cls.isMyClass && isLive) {
      // User requested to remove action for now
      console.log('Join Again clicked - No action taken per request');
    } else if (isCompleted) {
      alert('View recording... available soon');
    } else {
      alert('Reminder set for ' + cls.title);
    }
  };

  return (
    <div className={`platform-card-v ${isList ? 'layout-list' : ''}`} style={{ 
      height: '100%', 
      margin: 0,
      display: 'flex',
      flexDirection: isList ? 'row' : 'column',
      minHeight: isList ? '200px' : 'auto',
      border: '1px solid var(--slate-100)',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
    }}>
      {/* Thumbnail */}
      <div style={{ 
        position: 'relative', 
        height: isList ? '220px' : '220px', 
        width: isList ? '280px' : '100%',
        overflow: 'hidden',
        flexShrink: 0,
        aspectRatio: isList ? 'auto' : '16/9'
      }}>
        <img src={cls.img} alt={cls.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px', zIndex: 6 }}>
          {isLive && (
            <span style={{ background:'var(--brand-red)', color:'#fff', borderRadius:'20px', padding:'4px 10px', fontSize:'0.7rem', fontWeight:800, display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 6px rgba(220,38,38,0.4)' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff', animation:'pulse 1.5s infinite' }} />
              LIVE
            </span>
          )}
          <span style={{ background:'rgba(0,0,0,0.6)', color:'#fff', backdropFilter:'blur(4px)', padding:'4px 10px', borderRadius:'12px', fontSize:'0.7rem', fontWeight:600 }}>
            {cls.subject}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', color: 'var(--brand-black)' }}>{cls.title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="user" size={14} color="var(--slate-400)" /> {cls.host}
          </span>
          <span style={{ fontSize: '0.8rem', color: isLive ? 'var(--brand-red)' : 'var(--slate-500)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="clock" size={14} color={isLive ? "var(--brand-red)" : "var(--slate-400)"} /> 
            {isLive ? 'Started' : cls.time} ({cls.duration})
          </span>
        </div>
        
        {/* Footer actions pinned to bottom */}
        <div style={{ marginTop: 'auto', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid var(--slate-100)' }}>
          {isLive ? (
            <button onClick={handleAction} style={{ background: 'var(--brand-red)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 10px rgba(224, 40, 46, 0.2)' }}>
              {cls.isMyClass ? 'JOIN AGAIN' : 'JOIN NOW'}
            </button>
          ) : isCompleted ? (
             <button onClick={() => alert('View recording...')} style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
              COMPLETED
            </button>
          ) : (
            <button onClick={handleAction} style={{ background: 'transparent', color: 'var(--brand-black)', border: '2px solid var(--slate-200)', padding: '8px 24px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {cls.isMyClass ? 'STARTS SOON' : 'SET REMINDER'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LiveClassesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all'); // all, live, upcoming, my_classes
  const [searchQuery, setSearchQuery] = useState('');
  const [joinCode, setJoinCode] = useState('');

  // Filtering logic
  const filteredClasses = ALL_CLASSES.filter(c => {
    // text search
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.host.toLowerCase().includes(searchQuery.toLowerCase()) && !c.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // tab filter
    if (filter === 'live') return c.status === 'live';
    if (filter === 'upcoming') return c.status === 'upcoming';
    if (filter === 'my_classes') return c.isMyClass;
    return c.status !== 'completed'; // 'all' hides completed by default, unless requested
  });

  const handleJoinByCode = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    router.push(`/live-room/${joinCode.trim()}`);
  };

  return (
    <div className="platform-page" style={{ padding: '2rem' }}>
      
      {/* Header & Join With Code */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-black)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Live Experience</h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '1rem' }}>Join interactive live sessions with Top Mentors & Founders.</p>
        </div>
        
        {/* Prioritized Join with Code Box */}
        <form onSubmit={handleJoinByCode} style={{ background: '#fff', padding: '1rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '350px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '8px' }}>Join with Code</label>
              <input 
                type="text" 
                placeholder="e.g. xyz-123-abc"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'var(--slate-50)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              />
            </div>
            <button 
              type="submit"
              style={{ marginTop: 'auto', background: 'var(--brand-black)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Join
            </button>
        </form>
      </div>

      {/* Filters & Search Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: '#fff', padding: '1rem', borderRadius: '16px', border: '1px solid var(--slate-100)' }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'live', 'upcoming', 'my_classes'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              style={{ 
                padding: '10px 20px', 
                borderRadius: '10px', 
                border: 'none', 
                background: filter === f ? 'var(--brand-red)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--slate-500)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: '0.2s',
                textTransform: 'capitalize'
              }}
            >
              {f === 'my_classes' ? 'My Classes' : f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="Search subject or teacher..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', border: '2px solid var(--slate-100)', padding: '10px 16px 10px 40px', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--brand-red)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--slate-100)'}
          />
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
            {/* simple search icon svg inline */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter + searchQuery}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="platform-grid"
          style={{ gap: '2rem' }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls, i) => (
              <motion.div key={cls.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <LiveClassCard cls={cls} layout="grid" />
              </motion.div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', background: 'var(--slate-50)', borderRadius: '16px', border: '1px dashed var(--slate-200)' }}>
               {filter === 'live' ? (
                  <>
                     <div style={{ width: 64, height: 64, margin: '0 auto', background: 'rgba(235,35,39,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--brand-red)', display: 'block' }}></span>
                     </div>
                     <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-black)', marginBottom: '0.5rem' }}>No live classes right now</h2>
                     <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem' }}>Check back later or view our upcoming sessions.</p>
                     <button onClick={() => setFilter('upcoming')} style={{ marginTop: '1.5rem', background: '#fff', border: '1px solid var(--slate-200)', color: 'var(--brand-black)', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>View Upcoming</button>
                  </>
               ) : (
                  <>
                     <div style={{ opacity: 0.4, marginBottom: '1rem' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                     </div>
                     <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-black)' }}>No classes found</h2>
                     <p style={{ color: 'var(--slate-500)' }}>Try adjusting your filters or search query.</p>
                  </>
               )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
