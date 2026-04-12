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
    <div className="platform-page analytics-page">
      <header className="performance-header">
        <div className="header-main-text">
          <h1 className="platform-page-title">
            Performance <span className="red-glow-alt">Analytics</span>
          </h1>
          <p className="platform-page-subtitle">
            Deep dive into your quiz trends, subject mastery, and project velocity.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-grid"
      >
        {/* Quiz Scores Trend Chart */}
        <motion.div variants={itemVariants} className="glass-card col-span-8 trend-card">
           <div style={{ padding: '3.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', margin: 0 }}>Quiz Scores Trend</h3>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '10px 20px', borderRadius: '14px', border: '1.5px solid #f1f5f9' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#0f172a' }}>YOUR PERFORMANCE</span>
                 </div>
              </div>

              <div style={{ position: 'relative', height: '300px', width: '100%', paddingLeft: '40px' }} className="chart-overflow-container">
                 {/* Y-axis labels */}
                 {[100, 80, 60, 40, 20].map((val) => (
                    <div key={val} style={{ position: 'absolute', left: 0, top: `${((100 - val) / 100) * 260}px`, display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                       <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', width: '30px', textAlign: 'right' }}>{val}</span>
                       <div style={{ flex: 1, height: '1.5px', background: '#f8fafc' }} />
                    </div>
                 ))}

                 {/* Chart SVG */}
                 <div className="svg-wrapper" style={{ position: 'absolute', top: 0, left: '40px', width: 'calc(100% - 40px)', height: '260px' }}>
                   <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 600 260" preserveAspectRatio="none">
                      <defs>
                         <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                         </linearGradient>
                      </defs>
                      <motion.path 
                         d={`M 0 ${260 - (scores[0] / 100) * 260} ${scores.map((s, i) => `L ${i * (600 / (scores.length - 1))} ${260 - (s / 100) * 260}`).join(' ')} L 600 260 L 0 260 Z`}
                         fill="url(#chartGrad)"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1 }}
                      />
                      <motion.path 
                         d={`M ${scores.map((s, i) => `${i * (600 / (scores.length - 1))} ${260 - (s / 100) * 260}`).join(' L ')}`}
                         fill="none"
                         stroke="#ef4444"
                         strokeWidth="4"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         initial={{ pathLength: 0 }}
                         animate={{ pathLength: 1 }}
                         transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      {scores.map((s, i) => (
                         <motion.circle 
                            key={i}
                            cx={i * (600 / (scores.length - 1))} 
                            cy={260 - (s / 100) * 260} 
                            r="7" 
                            fill="#fff" 
                            stroke="#ef4444" 
                            strokeWidth="3.5"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 * i, duration: 0.3 }}
                         />
                      ))}
                   </svg>
                 </div>

                 {/* X-axis quiz labels */}
                 <div style={{ position: 'absolute', bottom: 0, left: '40px', width: 'calc(100% - 40px)', display: 'flex', justifyContent: 'space-between' }}>
                    {['Q 1', 'Q 2', 'Q 3', 'Q 4', 'Q 5', 'Q 6', 'Q 7'].map((label, i) => (
                       <span key={i} style={{ fontSize: '0.75rem', fontWeight: 850, color: '#94a3b8', textAlign: 'center' }}>{label}</span>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Accuracy Gauge & Stats side by side on desktop, stack on mobile */}
        <motion.div variants={itemVariants} className="col-span-4 accuracy-card">
           <div className="glass-card" style={{ padding: '3.5rem', height: '100%', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '1.5px solid #f1f5f9' }}>
              <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '2.5rem' }}>
                 <svg width="180" height="180" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#f8fafc" strokeWidth="12" />
                    <motion.circle 
                       cx="60" cy="60" r="54" fill="none" stroke="#10b981" strokeWidth="12" 
                       strokeDasharray="339.29"
                       initial={{ strokeDashoffset: 339.29 }}
                       animate={{ strokeDashoffset: 339.29 - (339.29 * 84) / 100 }}
                       transition={{ duration: 1.5, ease: "circOut" }}
                       strokeLinecap="round"
                       transform="rotate(-90 60 60)"
                    />
                 </svg>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5rem', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>84%</div>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', margin: '0 0 10px' }}>Accuracy Rate</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 700, margin: 0 }}>Correct vs Incorrect answers</p>
              
              <div style={{ marginTop: '3rem', width: '100%', display: 'flex', gap: '1.5rem' }}>
                 <div style={{ flex: 1, padding: '20px', borderRadius: '24px', background: '#f8fafc', border: '1.5px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#94a3b8', marginBottom: '6px' }}>ANSWERS</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a' }}>1,402</div>
                 </div>
                 <div style={{ flex: 1, padding: '20px', borderRadius: '24px', background: '#f8fafc', border: '1.5px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#94a3b8', marginBottom: '6px' }}>AVG</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a' }}>72%</div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Subject-wise Mastery */}
        <motion.div variants={itemVariants} className="glass-card col-span-6 mastery-card">
           <div style={{ padding: '3.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '3.5rem' }}>Subject Mastery Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {subjects.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                     <div style={{ width: 56, height: 56, borderRadius: '18px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.color}20` }}>
                        <Icon name={s.score > 70 ? 'zap' : 'clock'} size={24} color={s.color} />
                     </div>
                     <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                           <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a' }}>{s.name}</span>
                           <span style={{ fontSize: '1rem', fontWeight: 950, color: s.color }}>{s.score}%</span>
                        </div>
                        <div style={{ height: '10px', background: '#f8fafc', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                           <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${s.score}%` }}
                               transition={{ duration: 1.5, ease: 'circOut' }}
                               style={{ height: '100%', background: s.color, borderRadius: '12px' }}
                           />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </motion.div>

        {/* Assignment Performance */}
        <motion.div variants={itemVariants} className="glass-card col-span-6 assignment-card">
           <div style={{ padding: '3.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '3rem' }}>Project Tracking</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 {assignments.map((a) => (
                   <div key={a.id} style={{ padding: '1.75rem', borderRadius: '28px', background: '#f8fafc', border: '1.5px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                         <div style={{ width: 52, height: 52, borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                            <Icon name="fileText" size={24} color="#94a3b8" />
                         </div>
                         <div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 950, color: '#0f172a' }}>{a.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Recorded {a.date}</div>
                         </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '1.25rem', fontWeight: 950, color: a.status === 'Graded' ? '#10b981' : '#0f172a' }}>{a.score}</div>
                         <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.08em' }}>{a.status.toUpperCase()}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>


      </motion.div>
      <style jsx global>{`
        .analytics-page { padding: 4rem 4rem 10rem; font-family: 'Poppins', sans-serif; background: #fff; }
        .performance-header { margin-bottom: 5rem; }
        .platform-page-title { font-size: 3.5rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.05em; }
        .red-glow-alt { color: #ef4444; }
        .platform-page-subtitle { font-size: 1.25rem; font-weight: 600; color: #64748b; margin-top: 0.5rem; max-width: 600px; }
        
        .analytics-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3.5rem; }
        .col-span-12 { grid-column: span 12; }
        .col-span-8 { grid-column: span 8; }
        .col-span-6 { grid-column: span 6; }
        .col-span-4 { grid-column: span 4; }

        .glass-card { background: #fff; border-radius: 44px; border: 1.5px solid #f1f5f9; box-shadow: 0 15px 45px rgba(0,0,0,0.015); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .glass-card:hover { transform: translateY(-8px); border-color: #ef4444; box-shadow: 0 30px 60px rgba(239, 68, 68, 0.08); }
        
        @media (max-width: 1240px) {
          .analytics-page { padding: 0 1.5rem 8rem; }
          .performance-header { padding-top: 8rem; margin-bottom: 4rem; }
          .platform-page-title { font-size: 2.75rem; }
          .analytics-grid { gap: 2.5rem; }
          .col-span-8, .col-span-4, .col-span-6 { grid-column: span 12; }
          .chart-overflow-container { overflow-x: auto; padding-bottom: 2rem; }
          .svg-wrapper { min-width: 600px; }
        }
        
        @media (max-width: 640px) {
          .performance-header { padding-top: 7rem; }
          .platform-page-title { font-size: 2.25rem; }
          .platform-page-subtitle { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
