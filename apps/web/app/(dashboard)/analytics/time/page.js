'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export default function LearningTimePage() {
  const weeklyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 5.5 },
    { day: 'Sat', hours: 8.4 },
    { day: 'Sun', hours: 3.2 },
  ];

  const distribution = [
    { name: 'Live Sessions', value: 40, color: '#e92222' },
    { name: 'Recorded Videos', value: 35, color: '#3b82f6' },
    { name: 'Assessments', value: 15, color: '#10b981' },
    { name: 'Reading Notes', value: 10, color: '#f59e0b' },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="platform-page analytics-page">
      <header className="time-header" style={{ marginBottom: '4rem', padding: '4rem 0 2rem' }}>
        <div>
          <h1 className="platform-page-title" style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-0.05em', color: '#0f172a' }}>
            Learning <span style={{ color: '#ef4444' }}>Time</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748b', maxWidth: '600px' }}>
            Behavior tracking and focus consistency throughout your journey.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-grid"
      >
        {/* Weekly Focus Bar Chart */}
        <motion.div variants={itemVariants} className="glass-card col-span-8 velocity-card">
           <div style={{ padding: '3.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', margin: 0 }}>Weekly Study Velocity</h3>
                 <div style={{ padding: '10px 24px', borderRadius: '16px', background: '#ef4444', color: '#fff', fontSize: '0.85rem', fontWeight: 950, boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)' }}>
                    TOTAL: 38.7 hrs
                 </div>
              </div>

              <div className="velocity-chart-container" style={{ height: '300px' }}>
                 {weeklyData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                       <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', flexDirection: 'column-reverse' }}>
                          <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                             transition={{ duration: 1.2, delay: i * 0.1, ease: 'circOut' }}
                             style={{ 
                                background: d.day === 'Sat' || d.day === 'Sun' ? '#ef4444' : '#0f172a', 
                                borderRadius: '16px', width: '100%',
                                boxShadow: d.day === 'Sat' || d.day === 'Sun' ? '0 10px 20px rgba(239, 68, 68, 0.15)' : 'none'
                             }}
                          />
                          <div style={{ position: 'absolute', top: '-35px', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>
                             {d.hours}h
                          </div>
                       </div>
                       <span style={{ fontSize: '0.85rem', fontWeight: 950, color: '#94a3b8' }}>{d.day.toUpperCase()}</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Focus Stats & Peak Hour */}
        <motion.div variants={itemVariants} className="col-span-4 sidebar-stack">
           <div className="glass-card" style={{ padding: '3rem', borderRadius: '40px', border: '1.5px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                 <div style={{ width: 64, height: 64, borderRadius: '20px', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(239, 68, 68, 0.2)' }}>
                    <Icon name="zap" size={28} color="#fff" />
                 </div>
                 <div>
                    <div style={{ fontSize: '1rem', fontWeight: 950, color: '#94a3b8', marginBottom: '4px' }}>Peak Focus Hour</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 950, color: '#ef4444', letterSpacing: '-0.02em' }}>09:00 PM - 11:00 PM</div>
                 </div>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 650, margin: 0, lineHeight: 1.8 }}>
                 This is when you complete your highest accuracy quizzes. Productivity is <span style={{ color: '#0f172a', fontWeight: 950 }}>24% higher</span> during these hours.
              </p>
           </div>

           <div className="glass-card" style={{ padding: '3rem', borderRadius: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 950, color: '#fff', marginBottom: '2.5rem', letterSpacing: '-0.01em' }}>Consistency Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>AVG SESSION</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 950 }}>1.8 hrs</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>DAYS ACTIVE</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 950 }}>24 / 30</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1.5px solid rgba(239, 68, 68, 0.2)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.05em' }}>STREAK</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 950, color: '#ef4444' }}>8 Days</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Time Distribution Doughnut */}
        <motion.div variants={itemVariants} className="glass-card col-span-8 distribution-card">
           <div style={{ padding: '3.5rem' }} className="flex-stack-mobile">
              <div style={{ width: '280px', height: '280px', position: 'relative', flexShrink: 0, margin: '0 auto' }}>
                 <svg width="280" height="280" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f8fafc" strokeWidth="12" />
                    <motion.circle 
                       cx="50" cy="50" r="42" fill="none" stroke="#ef4444" strokeWidth="12" 
                       strokeDasharray="263.89" strokeDashoffset="158" strokeLinecap="round" transform="rotate(-90 50 50)" 
                    />
                    <motion.circle 
                       cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="12" 
                       strokeDasharray="263.89" strokeDashoffset="220" strokeLinecap="round" transform="rotate(40 50 50)" 
                    />
                 </svg>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 950, color: '#0f172a', lineHeight: 1 }}>142</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 950, marginTop: '8px' }}>TOTAL HOURS</div>
                 </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '1rem' }}>Time Distribution</h3>
                 {distribution.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #f8fafc' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: 14, height: 14, borderRadius: 5, background: d.color }} />
                          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{d.name}</span>
                       </div>
                       <span style={{ fontSize: '1rem', fontWeight: 950, color: '#64748b' }}>{d.value}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Goal Tracking */}
        <motion.div variants={itemVariants} className="col-span-4 goal-card">
           <div className="glass-card" style={{ padding: '3.5rem', height: '100%', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1.5px solid #f1f5f9' }}>
              <div>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '10px' }}>Daily Mission</h3>
                 <p style={{ fontSize: '1rem', color: '#64748b', fontWeight: 700, margin: 0 }}>Target: 2 hrs / day focused study</p>
              </div>

              <div style={{ margin: '3rem 0' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 950, color: '#ef4444' }}>PROGRESS: 82%</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 950, color: '#94a3b8' }}>1.64h / 2h</span>
                 </div>
                 <div style={{ height: '16px', background: '#f8fafc', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #f1f5f9' }}>
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '82%' }}
                       transition={{ duration: 2, ease: 'circOut' }}
                       style={{ height: '100%', background: '#ef4444', borderRadius: '20px', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}
                    />
                 </div>
              </div>

              <div style={{ padding: '1.75rem', background: '#fef2f2', border: '1.5px solid #fee2e2', borderRadius: '28px', textAlign: 'center' }}>
                 <p style={{ fontSize: '0.9rem', fontWeight: 900, color: '#ef4444', margin: 0 }}>You are only 22 mins away from your goal!</p>
              </div>
           </div>
        </motion.div>
      </motion.div>
      <style jsx global>{`
        .analytics-page { padding: 0 4rem 6rem; font-family: 'Poppins', sans-serif; }
        .analytics-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3.5rem; }
        .col-span-12 { grid-column: span 12; }
        .col-span-8 { grid-column: span 8; }
        .col-span-4 { grid-column: span 4; }
        .sidebar-stack { display: flex; flex-direction: column; gap: 3.5rem; }
        .velocity-chart-container { display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; padding-bottom: 2rem; overflow-x: auto; }
        .velocity-chart-container > div { min-width: 60px; }
        
        @media (max-width: 1240px) {
          .analytics-page { padding: 8rem 1.5rem 6rem; }
          .analytics-grid { gap: 2.5rem; }
          .col-span-8, .col-span-4 { grid-column: span 12; }
          .flex-stack-mobile { flex-direction: column !important; gap: 3rem !important; }
          .velocity-card div, .goal-card div { padding: 1.5rem !important; }
        }
        
        @media (max-width: 640px) {
          .analytics-page { padding-top: 7rem; }
          .time-header { padding-top: 0 !important; margin-bottom: 3rem !important; }
          .platform-page-title { font-size: 2.25rem !important; }
        }
      `}</style>
    </div>
  );
}
