'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export default function SkillGraphPage() {
  const skillPoints = [
    { label: 'Problem Solving', score: 85 },
    { label: 'Concept Mastery', score: 92 },
    { label: 'Speed', score: 68 },
    { label: 'Accuracy', score: 88 },
    { label: 'Memory Retention', score: 75 },
  ];

  const subjects = [
    { name: 'Python Engineering', percentage: 80, level: 'Advanced' },
    { name: 'Database Management', percentage: 50, level: 'Intermediate' },
    { name: 'Startup Models', percentage: 85, level: 'Advanced' },
    { name: 'Financial Analysis', percentage: 40, level: 'Beginner' },
  ];

  const suggestedActions = [
    { id: 1, title: 'Speed Drill', desc: 'Attempt 3 quickfire quizzes to improve your response rate.', type: 'Quizzes' },
    { id: 2, title: 'Memory Refresher', desc: 'Revise Unit Economics concepts from last week.', type: 'Notes' },
  ];

  // Radar chart calculations
  const totalPoints = skillPoints.length;
  const radius = 120;
  const cx = 150;
  const cy = 150;
  
  const getPoint = (score, index) => {
    const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
    const r = (radius * score) / 100;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  const radarPath = skillPoints.map((s, i) => {
    const p = getPoint(s.score, i);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

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
      <header className="skills-header" style={{ marginBottom: '4rem', padding: '4rem 0 2rem' }}>
        <div>
          <h1 className="platform-page-title" style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-0.05em', color: '#0f172a' }}>
            Skill <span style={{ color: '#ef4444' }}>Graph</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#64748b', maxWidth: '600px' }}>
            Visual intelligence showing your cognitive strengths and learning velocity.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-grid"
      >
        {/* Radar Chart Section */}
        <motion.div variants={itemVariants} className="glass-card col-span-6 radar-card">
           <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', width: '100%', marginBottom: '3.5rem' }}>Visual Intelligence</h3>
              
              <div style={{ position: 'relative', width: '320px', height: '320px' }} className="radar-overflow">
                 <svg width="320" height="320" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
                    {/* Background circles/polygons */}
                    {[20, 40, 60, 80, 100].map((level) => (
                       <path 
                          key={level}
                          d={skillPoints.map((_, i) => {
                             const p = getPoint(level, i);
                             return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                          }).join(' ') + ' Z'}
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="1.5"
                       />
                    ))}
                    {/* Axes */}
                    {skillPoints.map((_, i) => {
                       const p = getPoint(100, i);
                       return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#f1f5f9" strokeWidth="1.5" />;
                    })}
                    {/* Data Path */}
                    <motion.path 
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       transition={{ duration: 2, ease: "easeOut" }}
                       d={radarPath}
                       fill="rgba(239, 68, 68, 0.1)"
                       stroke="#ef4444"
                       strokeWidth="4"
                    />
                    {/* Points */}
                    {skillPoints.map((s, i) => {
                       const p = getPoint(s.score, i);
                       return <circle key={i} cx={p.x} cy={p.y} r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />;
                    })}
                 </svg>

                 {/* Labels */}
                 {skillPoints.map((s, i) => {
                    const p = getPoint(135, i);
                    return (
                       <div key={i} style={{ 
                          position: 'absolute', top: p.y, left: p.x, transform: 'translate(-50%, -50%)',
                          fontSize: '0.75rem', fontWeight: 950, color: '#94a3b8', width: '90px', textAlign: 'center'
                       }}>
                          <span style={{ color: '#0f172a' }}>{s.label.toUpperCase()}</span>
                          <div style={{ color: '#ef4444' }}>{s.score}%</div>
                       </div>
                    );
                 })}
              </div>
           </div>
        </motion.div>

        {/* Skill Levels breakdown */}
        <motion.div variants={itemVariants} className="glass-card col-span-6 proficiency-card">
           <div style={{ padding: '3.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '3.5rem' }}>Proficiency Levels</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                 {subjects.map((s, i) => (
                    <div key={i}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                          <div>
                             <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a', display: 'block' }}>{s.name}</span>
                             <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.1em' }}>{s.level.toUpperCase()}</span>
                          </div>
                          <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#ef4444' }}>{s.percentage}%</span>
                       </div>
                       <div style={{ height: '10px', background: '#f8fafc', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #f1f5f9' }}>
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${s.percentage}%` }}
                             transition={{ duration: 1.5, ease: 'circOut' }}
                             style={{ height: '100%', background: '#ef4444', borderRadius: '12px', boxShadow: '0 0 15px rgba(239, 68, 68, 0.15)' }}
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Skill Growth & AI Suggestions */}
        <motion.div variants={itemVariants} className="glass-card col-span-12 shadow-xl predictor-card">
           <div style={{ padding: '4rem' }} className="flex-stack-mobile">
              <div style={{ flex: 1 }} className="mobile-center-text">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '20px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)' }}>
                       <Icon name="zap" size={28} color="#ef4444" />
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Growth Predictor</h3>
                 </div>
                 <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#64748b', lineHeight: 1.8, maxWidth: '600px' }}>
                    Based on your linear progress, you are scheduled to reach <span style={{ color: '#0f172a', fontWeight: 950 }}>Expert Proficiency</span> in Backend Systems by December 2026.
                 </p>
                 <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
                    <div style={{ textAlign: 'left' }}>
                       <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a' }}>+14%</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>WEEKLY GROWTH</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                       <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a' }}>Level 12</div>
                       <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>CURRENT RANK</div>
                    </div>
                 </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <h4 style={{ fontSize: '0.85rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>AI FOCUS SUGGESTIONS</h4>
                 {suggestedActions.map((a) => (
                    <div key={a.id} style={{ display: 'flex', gap: '2rem', padding: '2rem', background: '#f8fafc', borderRadius: '32px', border: '1.5px solid #f1f5f9', transition: 'all 0.3s ease' }} className="suggestion-item">
                       <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #f1f5f9', boxShadow: '0 6px 15px rgba(0,0,0,0.03)' }}>
                          <Icon name={a.type === 'Quizzes' ? 'zap' : 'fileText'} size={22} color="#ef4444" />
                       </div>
                       <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a' }}>{a.title}</div>
                          <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: '#64748b', fontWeight: 600, lineHeight: 1.5 }}>{a.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </motion.div>
      <style jsx global>{`
        .analytics-page { padding: 0 4rem 6rem; font-family: 'Poppins', sans-serif; }
        .analytics-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3.5rem; }
        .col-span-12 { grid-column: span 12; }
        .col-span-6 { grid-column: span 6; }
        
        @media (max-width: 1240px) {
          .analytics-page { padding: 8rem 1.5rem 6rem; }
          .analytics-grid { gap: 2.5rem; }
          .col-span-6 { grid-column: span 12; }
          .flex-stack-mobile { flex-direction: column !important; gap: 3rem !important; }
          .radar-overflow { width: 100% !important; display: flex; justify-content: center; overflow: hidden; }
          .skills-header { padding-top: 0 !important; margin-bottom: 3rem !important; }
          .radar-card div, .proficiency-card div, .predictor-card div { padding: 1.5rem !important; }
        }
        
        @media (max-width: 640px) {
          .analytics-page { padding-top: 7rem; }
          .platform-page-title { font-size: 2.25rem !important; }
          .mobile-center-text { text-align: center; }
          .mobile-center-text .flex { justify-content: center !important; }
          .mobile-center-text div { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
