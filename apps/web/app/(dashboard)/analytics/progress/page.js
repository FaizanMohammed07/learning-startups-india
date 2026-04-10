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
    <div className="platform-page" style={{ padding: '2rem 2rem 4rem' }}>
      {/* Hero Section: "Am I on track?" */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          background: 'linear-gradient(135deg, #e92222 0%, #b91c1c 100%)', color: '#fff', borderRadius: '20px', padding: '1.5rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: '#fff', filter: 'blur(100px)', opacity: 0.08 }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '450px' }}>
           <h1 style={{ fontSize: '1.6rem', fontWeight: 950, letterSpacing: '-0.03em', margin: '0 0 6px' }}>
              Mastery Hero
           </h1>
           <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
              You have completed <span style={{ color: '#fff', fontWeight: 800 }}>65%</span> of your learning path. 12% ahead of your weekly goal.
           </p>
           <div style={{ display: 'flex', gap: '1rem', marginTop: '10px' }}>
              <div style={{ background: '#fff', color: 'var(--brand-red)', padding: '4px 12px', fontSize: '0.65rem', borderRadius: '20px', fontWeight: 950 }}>ON TRACK</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', opacity: 0.9, fontSize: '0.75rem', fontWeight: 950 }}>
                 <Icon name="zap" size={14} color="#fff" /> 8 Day Streak
              </div>
           </div>
        </div>

        <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
           <svg width="90" height="90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <motion.circle 
                cx="60" cy="60" r="54" fill="none" stroke="#fff" strokeWidth="10" 
                strokeDasharray="339.29"
                initial={{ strokeDashoffset: 339.29 }}
                animate={{ strokeDashoffset: 339.29 - (339.29 * 65) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
           </svg>
           <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem', fontWeight: 950 }}>65%</div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}
      >
        {/* Stats Grid */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
               <div style={{ width: 56, height: 56, borderRadius: '18px', background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={24} color={s.color} />
               </div>
               <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--slate-400)', marginBottom: '4px' }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--brand-black)' }}>{s.value}</div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Main Progress Breakdown */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 8' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2.5rem' }}>Subject-wise Progress</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {courses.map((course, i) => (
                   <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                         <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--brand-black)' }}>{course.name}</span>
                         <span style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-red)' }}>{course.progress}%</span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--slate-50)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${course.progress}%` }}
                           transition={{ duration: 1, delay: i * 0.1 }}
                           style={{ height: '100%', background: 'var(--brand-red)', borderRadius: '10px' }}
                         />
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 750, color: 'var(--slate-400)' }}>
                         <span>{course.completed} {course.type} Completed</span>
                         <span>{course.total - course.completed} Remaining</span>
                      </div>
                   </div>
                ))}
              </div>
           </div>
        </motion.div>

        {/* Sidebar: Activity & Tasks */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
           {/* Recent Activity */}
           <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2rem' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--red-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Icon name="recorded" size={18} color="var(--brand-red)" />
                    </div>
                    <div>
                       <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--brand-black)' }}>Adv. React Hooks</div>
                       <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800 }}>Last watched 2h ago</div>
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Icon name="checkCircle" size={18} color="#3b82f6" />
                    </div>
                    <div>
                       <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--brand-black)' }}>Valuation Quiz</div>
                       <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 800 }}>Completed with 92%</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Upcoming Tasks */}
           <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, #e92222 0%, #b91c1c 100%)', color: '#fff', boxShadow: '0 20px 40px rgba(233, 34, 34, 0.15)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#fff', marginBottom: '2rem' }}>Upcoming Missions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 {upcomingTasks.map((t) => (
                   <div key={t.id} style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                         <span style={{ fontSize: '0.65rem', fontWeight: 950, color: t.urgency === 'High' ? '#fff' : '#ffd700' }}>{t.urgency.toUpperCase()} PRIORITY</span>
                         <Icon name="clock" size={12} color="rgba(255,255,255,0.4)" />
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '4px' }}>{t.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Due {t.deadline}</div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
