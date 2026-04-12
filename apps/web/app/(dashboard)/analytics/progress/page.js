'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export default function ProgressOverviewPage() {
  const stats = [
    { label: 'Total Hours Learned', value: '142.5h', icon: 'clock', color: '#6366f1' },
    { label: 'Courses Enrolled', value: '4', icon: 'bookOpen', color: '#e92222' },
    { label: 'Certificates Earned', value: '2', icon: 'award', color: '#10b981' },
  ];

  const courses = [
    { name: 'Full-Stack Startup Development', progress: 70, status: 'Active', completed: 42, total: 60, type: 'Modules' },
    { name: 'Backend & System Architecture', progress: 40, status: 'Active', completed: 12, total: 30, type: 'Chapters' },
    { name: 'Startup Fundamentals', progress: 85, status: 'Active', completed: 17, total: 20, type: 'Lessons' },
    { name: 'Growth Marketing', progress: 20, status: 'Active', completed: 4, total: 20, type: 'Modules' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Final Pitch Deck Draft', deadline: 'Tomorrow, 5 PM', urgency: 'High' },
    { id: 2, title: 'Unit Economics Quiz', deadline: 'Oct 15', urgency: 'Medium' },
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
      {/* Hero Section: "Am I on track?" */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', borderRadius: '32px', padding: '2.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem',
          position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: '#ef4444', filter: 'blur(150px)', opacity: 0.15, zIndex: 0 }} />
        
        <div className="progress-hero-content" style={{ position: 'relative', zIndex: 1 }}>
           <h1 style={{ fontSize: '2.25rem', fontWeight: 950, letterSpacing: '-0.04em', margin: '0 0 12px', color: '#fff' }}>
              Mastery <span style={{ color: '#ef4444' }}>Path</span>
           </h1>
           <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 2rem', maxWidth: '500px' }}>
              You have completed <span style={{ color: '#fff', fontWeight: 800 }}>65%</span> of your startup learning path. You're currently <span style={{ color: '#10b981' }}>12% ahead</span> of schedule.
           </p>
           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#ef4444', color: '#fff', padding: '8px 20px', fontSize: '0.75rem', borderRadius: '12px', fontWeight: 950, letterSpacing: '0.05em' }}>VALEDICTORIAN TRACK</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', padding: '8px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 950, border: '1px solid rgba(255,255,255,0.1)' }}>
                 <Icon name="zap" size={16} color="#ef4444" /> 8 DAY STREAK
              </div>
           </div>
        </div>

        <div className="hero-chart-wrap" style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
           <svg width="160" height="160" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle 
                cx="60" cy="60" r="54" fill="none" stroke="#ef4444" strokeWidth="8" 
                strokeDasharray="339.29"
                initial={{ strokeDashoffset: 339.29 }}
                animate={{ strokeDashoffset: 339.29 - (339.29 * 65) / 100 }}
                transition={{ duration: 2, ease: "circOut" }}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
           </svg>
           <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 950, color: '#fff', lineHeight: 1 }}>65%</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 950, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '4px' }}>Path</div>
           </div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-grid"
      >
        {/* Stats Grid */}
        <div className="col-span-12 stats-grid">
          {stats.map((s, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', display: 'flex', alignItems: 'center', gap: '2rem', border: '1.5px solid #f1f5f9' }}>
               <div style={{ width: 64, height: 64, borderRadius: '20px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={28} color={s.color} />
               </div>
               <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.05em' }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em' }}>{s.value}</div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Main Progress Breakdown */}
        <motion.div variants={itemVariants} className="glass-card col-span-8 main-card">
           <div style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em' }}>Subject Mastery Trends</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {courses.map((course, i) => (
                   <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                         <div>
                            <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a', display: 'block' }}>{course.name}</span>
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 650 }}>{course.completed} {course.type} Completed</span>
                         </div>
                         <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#ef4444' }}>{course.progress}%</span>
                      </div>
                      <div style={{ height: '12px', background: '#f8fafc', borderRadius: '20px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${course.progress}%` }}
                           transition={{ duration: 1.5, delay: i * 0.1, ease: 'circOut' }}
                           style={{ height: '100%', background: '#ef4444', borderRadius: '20px', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}
                         />
                      </div>
                   </div>
                ))}
              </div>
           </div>
        </motion.div>

        {/* Sidebar: Activity & Tasks */}
        <motion.div variants={itemVariants} className="col-span-4 sidebar-stack">
           {/* Recent Activity */}
           <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', border: '1.5px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', marginBottom: '2.5rem', letterSpacing: '-0.01em' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '16px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fee2e2' }}>
                       <Icon name="recorded" size={20} color="#ef4444" />
                    </div>
                    <div>
                       <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#0f172a' }}>Advanced React Components</div>
                       <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>Last active 2h ago</div>
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '16px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d1fae5' }}>
                       <Icon name="checkCircle" size={20} color="#10b981" />
                    </div>
                    <div>
                       <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#0f172a' }}>Unit Economics Quiz</div>
                       <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>Graded: 92% Proficiency</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Upcoming Tasks */}
           <div className="glass-card mission-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#fff', boxShadow: '0 25px 50px rgba(239, 68, 68, 0.25)', border: 'none' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#fff', marginBottom: '2.5rem', letterSpacing: '-0.01em' }}>Upcoming Missions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 {upcomingTasks.map((t) => (
                   <div key={t.id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.12)', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                         <span style={{ fontSize: '0.7rem', fontWeight: 950, color: t.urgency === 'High' ? '#fff' : '#ffd700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.urgency} Priority</span>
                         <Icon name="clock" size={14} color="rgba(255,255,255,0.6)" />
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 950, marginBottom: '4px' }}>{t.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Target: {t.deadline}</div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>
      <style jsx global>{`
        .analytics-page { padding: 3rem 4rem 6rem; font-family: 'Poppins', sans-serif; }
        .analytics-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3.5rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .col-span-12 { grid-column: span 12; }
        .col-span-8 { grid-column: span 8; }
        .col-span-4 { grid-column: span 4; }
        .sidebar-stack { display: flex; flex-direction: column; gap: 3.5rem; }
        
        @media (max-width: 1160px) {
          .analytics-page { padding: 8rem 1.5rem 6rem; }
          .analytics-grid { gap: 2.5rem; }
          .col-span-8, .col-span-4 { grid-column: span 12; }
          .stats-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .progress-hero-content { padding-right: 0; }
          .hero-chart-wrap { display: none; }
          .sidebar-stack { gap: 2.5rem; }
        }
        
        @media (max-width: 600px) {
          .analytics-page { padding-top: 7rem; }
          .progress-hero-content h1 { font-size: 1.75rem !important; }
          .progress-hero-content p { font-size: 0.95rem !important; }
        }
      `}</style>
    </div>
  );
}
