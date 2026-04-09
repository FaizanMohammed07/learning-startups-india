'use client';
import Icon from '@/components/Icon';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Strategy', level: 85, icon: 'target', color: '#e63946' },
  { name: 'Marketing', level: 65, icon: 'compass', color: '#10b981' },
  { name: 'Finance', level: 45, icon: 'creditCard', color: '#f59e0b' },
  { name: 'Pitching', level: 90, icon: 'zap', color: '#7c3aed' },
  { name: 'Technical', level: 30, icon: 'recorded', color: '#3b82f6' },
  { name: 'Legal', level: 55, icon: 'fileText', color: '#64748b' },
];

export default function SkillsPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Skill Architecture</h1>
          <p className="platform-page-subtitle">Mapping your entrepreneurial profile across core domains.</p>
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
        {/* Radar Visualization Area */}
        <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '40px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>Domain Distribution</h3>
              <div style={{ background: 'var(--brand-red)', color: '#fff', padding: '6px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 950 }}>PROFILE IQ: 84</div>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 1.2fr', gap: '2rem', alignItems: 'center' }}>
              {/* Radar Chart Component Side */}
              <div style={{ position: 'relative', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <svg width="250" height="250" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                   <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                   <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                   
                   {SKILLS.map((s, i) => {
                     const angle = (i * 360) / SKILLS.length;
                     const radian = (angle * Math.PI) / 180;
                     const radius = (s.level / 100) * 45;
                     const x = 50 + radius * Math.cos(radian);
                     const y = 50 + radius * Math.sin(radian);
                     return (
                       <g key={i}>
                         <line x1="50" y1="50" x2={50 + 45 * Math.cos(radian)} y2={50 + 45 * Math.sin(radian)} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                         <motion.circle initial={{ r: 0 }} animate={{ r: 3 }} cx={x} cy={y} fill={s.color} />
                       </g>
                     );
                   })}

                   <motion.path 
                     initial={{ pathLength: 0, opacity: 0 }}
                     animate={{ pathLength: 1, opacity: 0.25 }}
                     transition={{ duration: 1.5 }}
                     d={SKILLS.map((s, i) => {
                       const angle = (i * 360) / SKILLS.length;
                       const radian = (angle * Math.PI) / 180;
                       const radius = (s.level / 100) * 45;
                       const x = 50 + radius * Math.cos(radian);
                       const y = 50 + radius * Math.sin(radian);
                       return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                     }).join(' ') + ' Z'}
                     fill="var(--brand-red)"
                     stroke="var(--brand-red)"
                     strokeWidth="1"
                   />
                 </svg>
                 <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 950, color: 'var(--brand-black)' }}>MVP</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Ready</span>
                 </div>
              </div>

              {/* Progress Bars side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 {SKILLS.map((s, i) => (
                   <div key={i}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <Icon name={s.icon} size={14} color={s.color} />
                         <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--brand-black)' }}>{s.name}</span>
                       </div>
                       <span style={{ fontSize: '0.8rem', fontWeight: 950, color: s.color }}>{s.level}%</span>
                     </div>
                     <div style={{ height: '5px', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', overflow: 'hidden' }}>
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${s.level}%` }}
                         transition={{ duration: 1 }}
                         style={{ height: '100%', background: s.color, borderRadius: '10px' }}
                       />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Action Panel Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem 2rem', borderRadius: '32px', background: 'var(--brand-black)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <Icon name="award" size={20} color="var(--brand-red)" />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Top Strength</h4>
                    <h2 style={{ fontSize: '2rem', fontWeight: 950, margin: '8px 0', letterSpacing: '-0.02em' }}>Strategist</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 700 }}>
                        Your tactical depth in unit economics and market entry is unmatched.
                    </p>
                </div>
                <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}><Icon name="target" size={120} color="#fff" /></div>
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-black)' }}>RECOMMENDED FOCUS</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', background: 'var(--slate-50)', padding: '12px', borderRadius: '16px' }}>
                   <div style={{ width: 44, height: 44, borderRadius: '14px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      <Icon name="recorded" size={18} color="#3b82f6" />
                   </div>
                   <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 950, color: 'var(--brand-black)', display: 'block' }}>Technical Systems</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 850 }}>Domain gap detected</span>
                   </div>
                </div>
                <button style={{ width: '100%', padding: '14px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 950, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(235,35,39,0.15)' }}>START TRAINING</button>
            </div>
        </div>
      </div>
    </div>
  );
}
