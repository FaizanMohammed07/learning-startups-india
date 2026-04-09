'use client';
import Icon from '@/components/Icon';
import { motion } from 'framer-motion';

const METRICS = [
  { label: 'Avg Quiz Score', value: '88%', trend: '+4%', icon: 'helpCircle', color: '#10b981' },
  { label: 'Assessment Completion', value: '92%', trend: '+2%', icon: 'checkCircle', color: '#3b82f6' },
  { label: 'Percentile Rank', value: 'Top 5%', trend: 'Steady', icon: 'award', color: 'var(--brand-red)' },
  { label: 'Project Quality', value: 'A+', trend: 'N/A', icon: 'zap', color: '#f59e0b' },
];

export default function PerformancePage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Performance Analytics</h1>
          <p className="platform-page-subtitle">Measuring your academic and practical excellence throughout the program.</p>
        </div>
      </header>

      <div className="platform-stats-grid" style={{ marginBottom: '2.5rem' }}>
        {METRICS.map((m, i) => (
          <div key={i} className="platform-stat-card glass-card" style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'var(--brand-black)', color: '#fff' }}>
             <div className="platform-stat-label" style={{ fontWeight: 950, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {m.label}
                <Icon name={m.icon} size={16} color="var(--brand-red)" />
             </div>
             <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <span className="platform-stat-value" style={{ color: '#fff', fontSize: '2rem', fontWeight: 950 }}>{m.value}</span>
                {m.trend !== 'N/A' && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-red)', fontWeight: 950, marginBottom: '8px', background: 'rgba(235,35,39,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
                    {m.trend}
                  </span>
                )}
             </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
          {/* Detailed Score Timeline */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)' }}>
             <h3 style={{ fontSize: '1.25rem', fontWeight: 950, marginBottom: '2rem', color: 'var(--brand-black)' }}>Assessment Velocity</h3>
             <div className="performance-timeline" style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px dashed rgba(0,0,0,0.05)' }}>
                {[
                    { title: 'Market Research Quiz', score: 92, date: '2 days ago', icon: 'check' },
                    { title: 'Unit Economics Exam', score: 88, date: '1 week ago', icon: 'zap' },
                    { title: 'Pitch Deck Review', score: 95, date: 'Mar 24', icon: 'star' },
                    { title: 'Legal Foundations', score: 76, date: 'Mar 15', icon: 'fileText' },
                ].map((item, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: '1.5rem', paddingLeft: '25px' }}>
                        <div style={{ position: 'absolute', left: '-31px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Icon name={item.icon} size={8} color="#fff" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: 'var(--brand-black)' }}>{item.title}</h4>
                                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 700 }}>{item.date}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 950, color: item.score > 90 ? '#10b981' : 'var(--brand-black)' }}>{item.score}%</span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px' }}>
             <h3 style={{ fontSize: '1.15rem', fontWeight: 950, marginBottom: '2rem', color: 'var(--brand-black)' }}>Domain Consistency</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                    { name: 'Fundamentals', score: 94 },
                    { name: 'Market Mastery', score: 82 },
                    { name: 'Financial Literacy', score: 76 },
                    { name: 'Legal Frameworks', score: 88 }
                ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--slate-500)', width: '100px' }}>{s.name}</span>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${s.score}%` }}
                              style={{ height: '100%', background: 'var(--brand-red)', borderRadius: '10px' }}
                            />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 950, color: 'var(--brand-black)' }}>{s.score}%</span>
                    </div>
                ))}
             </div>
             
             <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '20px', border: '1px solid var(--slate-100)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Icon name="award" size={16} color="var(--brand-red)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--brand-black)' }}>Global Percentile: Top 4.2%</span>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 700, margin: 0 }}>You are outperforming 95.8% of students in the current cohort.</p>
             </div>
          </div>
      </div>
    </div>
  );
}
