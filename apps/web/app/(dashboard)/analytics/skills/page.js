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
    <div className="platform-page" style={{ padding: '0 2rem 4rem' }}>
      <header className="platform-page-header" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="platform-page-title" style={{ fontSize: '2.5rem', fontWeight: 950, letterSpacing: '-0.04em' }}>
            Skill <span style={{ color: 'var(--brand-red)' }}>Graph</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate-400)' }}>
            Visual intelligence showing your cognitive strengths and weaknesses.
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}
      >
        {/* Radar Chart Section */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 6' }} className="glass-card">
           <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', width: '100%', marginBottom: '2.5rem' }}>Visual Intelligence</h3>
              
              <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                 <svg width="300" height="300" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
                    {/* Background circles/polygons */}
                    {[20, 40, 60, 80, 100].map((level) => (
                       <path 
                          key={level}
                          d={skillPoints.map((_, i) => {
                             const p = getPoint(level, i);
                             return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                          }).join(' ') + ' Z'}
                          fill="none"
                          stroke="var(--slate-100)"
                          strokeWidth="1"
                       />
                    ))}
                    {/* Axes */}
                    {skillPoints.map((_, i) => {
                       const p = getPoint(100, i);
                       return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--slate-50)" strokeWidth="1" />;
                    })}
                    {/* Data Path */}
                    <motion.path 
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       d={radarPath}
                       fill="rgba(235,35,39,0.15)"
                       stroke="var(--brand-red)"
                       strokeWidth="3"
                    />
                    {/* Points */}
                    {skillPoints.map((s, i) => {
                       const p = getPoint(s.score, i);
                       return <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--brand-red)" />;
                    })}
                 </svg>

                 {/* Labels */}
                 {skillPoints.map((s, i) => {
                    const p = getPoint(125, i);
                    return (
                       <div key={i} style={{ 
                          position: 'absolute', top: p.y, left: p.x, transform: 'translate(-50%, -50%)',
                          fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', width: '80px', textAlign: 'center'
                       }}>
                          {s.label.toUpperCase()}
                          <div style={{ color: 'var(--brand-black)' }}>{s.score}%</div>
                       </div>
                    );
                 })}
              </div>
           </div>
        </motion.div>

        {/* Skill Levels breakdown */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 6' }} className="glass-card">
           <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2.5rem' }}>Proficiency Levels</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                 {subjects.map((s, i) => (
                    <div key={i}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-end' }}>
                          <div>
                             <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--brand-black)', display: 'block' }}>{s.name}</span>
                             <span style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-300)', letterSpacing: '0.05em' }}>{s.level.toUpperCase()}</span>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-red)' }}>{s.percentage}%</span>
                       </div>
                       <div style={{ height: '6px', background: 'var(--slate-50)', borderRadius: '10px', overflow: 'hidden' }}>
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${s.percentage}%` }}
                             transition={{ duration: 1 }}
                             style={{ height: '100%', background: 'var(--brand-red)', borderRadius: '10px' }}
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Skill Growth & AI Suggestions */}
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 12' }} className="glass-card shadow-lg">
           <div style={{ padding: '3rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--brand-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Icon name="zap" size={20} color="var(--brand-red)" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>Growth Predictor</h3>
                 </div>
                 <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--slate-500)', lineHeight: 1.6 }}>
                    Based on your linear progress, you are scheduled to reach **Expert Proficiency** in Backend Systems by **December 2026**.
                 </p>
                 <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '1.4rem', fontWeight: 950, color: 'var(--brand-black)' }}>+14%</div>
                       <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--slate-400)' }}>WEEKLY GROWTH</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                       <div style={{ fontSize: '1.4rem', fontWeight: 950, color: 'var(--brand-black)' }}>Level 12</div>
                       <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--slate-400)' }}>CURRENT RANK</div>
                    </div>
                 </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <h4 style={{ fontSize: '0.8rem', fontWeight: 950, color: 'var(--slate-400)', letterSpacing: '0.1em' }}>FOCUS SUGGESTIONS</h4>
                 {suggestedActions.map((a) => (
                    <div key={a.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '24px', border: '1px solid var(--slate-100)' }}>
                       <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name={a.type === 'Quizzes' ? 'zap' : 'fileText'} size={18} color="var(--brand-red)" />
                       </div>
                       <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 950, color: 'var(--brand-black)' }}>{a.title}</div>
                          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 600 }}>{a.desc}</p>
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
