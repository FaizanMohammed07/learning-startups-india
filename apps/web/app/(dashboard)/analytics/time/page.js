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
    <div className="platform-page" style={{ padding: '0 2rem 4rem' }}>
      <header className="platform-page-header" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="platform-page-title" style={{ fontSize: '2.5rem', fontWeight: 950, letterSpacing: '-0.04em' }}>
            Learning <span style={{ color: 'var(--brand-red)' }}>Time</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate-400)' }}>
            Behavior tracking and focus consistency throughout your journey.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}
      >
        {/* Weekly Focus Bar Chart */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 8' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>Weekly Study Velocity</h3>
                 <div style={{ padding: '6px 16px', borderRadius: '12px', background: 'var(--brand-red)', color: '#fff', fontSize: '0.75rem', fontWeight: 950 }}>
                    TOTAL: 38.7 hrs
                 </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '240px', gap: '3rem', paddingBottom: '2rem' }}>
                 {weeklyData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                       <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', flexDirection: 'column-reverse' }}>
                          <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                             transition={{ duration: 1, delay: i * 0.1 }}
                             style={{ 
                                background: d.day === 'Sat' || d.day === 'Sun' ? 'var(--brand-red)' : 'var(--brand-black)', 
                                borderRadius: '12px', width: '100%' 
                             }}
                          />
                          <div style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '0.7rem', fontWeight: 950, color: 'var(--slate-400)' }}>
                             {d.hours}h
                          </div>
                       </div>
                       <span style={{ fontSize: '0.8rem', fontWeight: 950, color: 'var(--slate-400)' }}>{d.day.toUpperCase()}</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Focus Stats & Peak Hour */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                 <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="zap" size={20} color="#fff" />
                 </div>
                 <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-black)' }}>Peak Focus Hour</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 950, color: 'var(--brand-red)' }}>09:00 PM - 11:00 PM</div>
                 </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 750, margin: 0, lineHeight: 1.6 }}>
                 This is when you complete your highest accuracy quizzes. Productivity is 24% higher during these hours.
              </p>
           </div>

           <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, #e92222 0%, #b91c1c 100%)', color: '#fff', boxShadow: '0 20px 40px rgba(233, 34, 34, 0.2)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#fff', marginBottom: '2rem' }}>Consistency Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>AVG SESSION</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 950 }}>1.8 hrs</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>DAYS ACTIVE</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 950 }}>24 / 30</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>STREAK</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-red)' }}>8 Days</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Time Distribution Doughnut (SVG based) */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 8' }} className="glass-card">
           <div style={{ padding: '2.5rem', display: 'flex', gap: '3rem', alignItems: 'center' }}>
              <div style={{ width: '240px', height: '240px', position: 'relative' }}>
                 <svg width="240" height="240" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--slate-50)" strokeWidth="15" />
                    {/* Simplified segmented circle for distribution */}
                    <motion.circle 
                       cx="50" cy="50" r="40" fill="none" stroke="#e92222" strokeWidth="15" 
                       strokeDasharray="251.32" strokeDashoffset="150" strokeLinecap="round" transform="rotate(-90 50 50)" 
                    />
                    <motion.circle 
                       cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="15" 
                       strokeDasharray="251.32" strokeDashoffset="210" strokeLinecap="round" transform="rotate(40 50 50)" 
                    />
                 </svg>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 950 }}>142</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--slate-400)', fontWeight: 950 }}>TOTAL HOURS</div>
                 </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <h3 style={{ fontSize: '1.2rem', fontWeight: 950, marginBottom: '0.5rem' }}>Time Distribution</h3>
                 {distribution.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: 12, height: 12, borderRadius: 4, background: d.color }} />
                          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--brand-black)' }}>{d.name}</span>
                       </div>
                       <span style={{ fontSize: '0.85rem', fontWeight: 950, color: 'var(--slate-400)' }}>{d.value}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Goal Tracking Goal */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 4' }}>
           <div className="glass-card" style={{ padding: '2.5rem', height: '100%', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                 <h3 style={{ fontSize: '1.2rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '0.5rem' }}>Daily Mission</h3>
                 <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', fontWeight: 700, margin: 0 }}>Target: 2 hrs / day focused study</p>
              </div>

              <div style={{ margin: '2rem 0' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--brand-red)' }}>PROGRESS: 82%</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--slate-400)' }}>1.64h / 2h</span>
                 </div>
                 <div style={{ height: '12px', background: 'var(--slate-50)', borderRadius: '20px', overflow: 'hidden' }}>
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '82%' }}
                       transition={{ duration: 1.5 }}
                       style={{ height: '100%', background: 'var(--brand-red)', borderRadius: '20px' }}
                    />
                 </div>
              </div>

              <div style={{ padding: '1.2rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '20px', textAlign: 'center' }}>
                 <p style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--brand-red)', margin: 0 }}>You are only 22 mins away from your goal!</p>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
