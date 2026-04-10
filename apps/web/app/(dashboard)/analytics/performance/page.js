'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export default function PerformanceAnalysisPage() {
  const scores = [65, 72, 68, 85, 82, 92, 88]; // Mock quiz scores over time
  
  const subjects = [
    { name: 'Data Structures', score: 92, status: 'Strong', color: '#10b981' },
    { name: 'System Design', score: 85, status: 'Strong', color: '#10b981' },
    { name: 'Unit Economics', score: 58, status: 'Needs Focus', color: '#e92222' },
    { name: 'Growth Marketing', score: 74, status: 'Average', color: '#f59e0b' },
  ];

  const assignments = [
    { id: 1, title: 'Seed Deck Draft', status: 'Graded', score: '95/100', date: 'Oct 8' },
    { id: 2, title: 'Cap Table Model', status: 'Submitted', score: 'Pending', date: 'Yesterday' },
    { id: 3, title: 'Legal Checklist', status: 'Pending', score: 'N/A', date: 'Due Oct 15' },
  ];

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
            Performance <span style={{ color: 'var(--brand-red)' }}>Analytics</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate-400)' }}>
            Deep dive into your quiz trends, subject mastery, and academic velocity.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}
      >
        {/* Quiz Scores Trend Chart */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 8' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>Quiz Scores Trend</h3>
                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--slate-50)', padding: '6px 16px', borderRadius: '12px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-red)' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--brand-black)' }}>YOUR PERFORMANCE</span>
                 </div>
              </div>

              <div style={{ position: 'relative', height: '260px', width: '100%', paddingLeft: '40px' }}>
                 {/* Y-axis labels */}
                 {[100, 80, 60, 40, 20].map((val) => (
                    <div key={val} style={{ position: 'absolute', left: 0, top: `${((100 - val) / 100) * 220}px`, display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                       <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--slate-300)', width: '30px', textAlign: 'right' }}>{val}</span>
                       <div style={{ flex: 1, height: '1px', background: 'var(--slate-50)' }} />
                    </div>
                 ))}

                 {/* Chart SVG */}
                 <svg style={{ position: 'absolute', top: 0, left: '40px', width: 'calc(100% - 40px)', height: '220px' }} viewBox="0 0 600 220" preserveAspectRatio="none">
                    <defs>
                       <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e92222" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#e92222" stopOpacity="0" />
                       </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <motion.path 
                       d={`M 0 ${220 - (scores[0] / 100) * 220} ${scores.map((s, i) => `L ${i * (600 / (scores.length - 1))} ${220 - (s / 100) * 220}`).join(' ')} L 600 220 L 0 220 Z`}
                       fill="url(#chartGrad)"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 1 }}
                    />
                    {/* Line */}
                    <motion.path 
                       d={`M ${scores.map((s, i) => `${i * (600 / (scores.length - 1))} ${220 - (s / 100) * 220}`).join(' L ')}`}
                       fill="none"
                       stroke="#e92222"
                       strokeWidth="3"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Data points */}
                    {scores.map((s, i) => (
                       <motion.circle 
                          key={i}
                          cx={i * (600 / (scores.length - 1))} 
                          cy={220 - (s / 100) * 220} 
                          r="6" 
                          fill="#fff" 
                          stroke="#e92222" 
                          strokeWidth="3"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 * i, duration: 0.3 }}
                       />
                    ))}
                 </svg>

                 {/* Score labels above dots */}
                 <div style={{ position: 'absolute', top: 0, left: '40px', width: 'calc(100% - 40px)', height: '220px', pointerEvents: 'none' }}>
                    {scores.map((s, i) => (
                       <div key={i} style={{ 
                          position: 'absolute', 
                          left: `${(i / (scores.length - 1)) * 100}%`, 
                          top: `${((100 - s) / 100) * 220 - 24}px`,
                          transform: 'translateX(-50%)',
                          fontSize: '0.7rem', fontWeight: 950, color: 'var(--brand-black)',
                          background: '#fff', padding: '2px 8px', borderRadius: '8px', border: '1px solid var(--slate-100)'
                       }}>
                          {s}%
                       </div>
                    ))}
                 </div>

                 {/* X-axis quiz labels */}
                 <div style={{ position: 'absolute', bottom: 0, left: '40px', width: 'calc(100% - 40px)', display: 'flex', justifyContent: 'space-between' }}>
                    {['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', 'Quiz 6', 'Quiz 7'].map((label, i) => (
                       <span key={i} style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--slate-400)', textAlign: 'center' }}>{label}</span>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Accuracy Gauge & Stats */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 4' }}>
           <div className="glass-card" style={{ padding: '2.5rem', height: '100%', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '140px', height: '140px', marginBottom: '1.5rem' }}>
                 <svg width="140" height="140" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--slate-50)" strokeWidth="10" />
                    <motion.circle 
                       cx="60" cy="60" r="54" fill="none" stroke="#10b981" strokeWidth="10" 
                       strokeDasharray="339.29"
                       initial={{ strokeDashoffset: 339.29 }}
                       animate={{ strokeDashoffset: 339.29 - (339.29 * 84) / 100 }}
                       transition={{ duration: 1.5 }}
                       strokeLinecap="round"
                       transform="rotate(-90 60 60)"
                    />
                 </svg>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.8rem', fontWeight: 950, color: 'var(--brand-black)' }}>84%</div>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)', margin: '0 0 8px' }}>Accuracy Rate</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700, margin: 0 }}>Correct vs Incorrect answers</p>
              
              <div style={{ marginTop: '2.5rem', width: '100%', display: 'flex', gap: '1rem' }}>
                 <div style={{ flex: 1, padding: '16px', borderRadius: '16px', background: 'var(--slate-50)' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', marginBottom: '4px' }}>ANSWERS</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)' }}>1,402</div>
                 </div>
                 <div style={{ flex: 1, padding: '16px', borderRadius: '16px', background: 'var(--slate-50)' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', marginBottom: '4px' }}>GLOBAL AVG</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)' }}>72%</div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Subject-wise Mastery */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 6' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2.5rem' }}>Subject Mastery</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {subjects.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                     <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={s.score > 70 ? 'zap' : 'clock'} size={20} color={s.color} />
                     </div>
                     <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--brand-black)' }}>{s.name}</span>
                           <span style={{ fontSize: '0.85rem', fontWeight: 950, color: s.color }}>{s.score}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--slate-50)', borderRadius: '10px', overflow: 'hidden' }}>
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${s.score}%` }}
                              transition={{ duration: 1 }}
                              style={{ height: '100%', background: s.color, borderRadius: '10px' }}
                           />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </motion.div>

        {/* Assignment Performance */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 6' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2rem' }}>Assignment Tracking</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                 {assignments.map((a) => (
                   <div key={a.id} style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--slate-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <Icon name="fileText" size={18} color="var(--slate-400)" />
                         </div>
                         <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--brand-black)' }}>{a.title}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800 }}>Updated {a.date}</div>
                         </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '1rem', fontWeight: 950, color: a.status === 'Graded' ? '#10b981' : 'var(--brand-black)' }}>{a.score}</div>
                         <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-300)', letterSpacing: '0.05em' }}>{a.status.toUpperCase()}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>


      </motion.div>
    </div>
  );
}
