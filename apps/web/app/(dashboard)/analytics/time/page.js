'use client';
import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const WEEKLY_DATA = [
  { day: 'Mon', hours: 4.5 },
  { day: 'Tue', hours: 6.2 },
  { day: 'Wed', hours: 3.8 },
  { day: 'Thu', hours: 7.1 },
  { day: 'Fri', hours: 5.5 },
  { day: 'Sat', hours: 8.4 },
  { day: 'Sun', hours: 2.1 },
];

export default function TimeAnalyticsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const monthYearLabel = useMemo(() => {
    return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [currentDate]);

  // Simulate data change on month shift
  const heatmapData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      hours: Math.random() * (currentDate.getMonth() % 2 === 0 ? 8 : 4) // Vary density by month
    }));
  }, [currentDate]);

  const totalHours = useMemo(() => 
    heatmapData.reduce((acc, d) => acc + d.hours, 0).toFixed(1)
  , [heatmapData]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  return (
    <div className="platform-page" style={{ padding: '0 2rem 4rem' }}>
      <header className="platform-page-header" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="platform-page-title" style={{ fontSize: '2.5rem', fontWeight: 950, letterSpacing: '-0.04em' }}>
            Learning <span style={{ color: 'var(--brand-red)' }}>Velocity</span>
          </h1>
          <p className="platform-page-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--slate-400)' }}>
            Tracking your focused development time over {monthYearLabel}.
          </p>
        </div>
      </header>

      <div className="platform-stats-grid" style={{ marginBottom: '3rem', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="platform-stat-card glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <div className="platform-stat-label" style={{ fontWeight: 950, color: 'var(--slate-400)', fontSize: '0.75rem', marginBottom: '10px' }}>TOTAL FOCUSED TIME</div>
          <span className="platform-stat-value" style={{ color: 'var(--brand-red)', fontSize: '2.2rem', fontWeight: 950 }}>{totalHours} hrs</span>
        </div>
        <div className="platform-stat-card glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <div className="platform-stat-label" style={{ fontWeight: 950, color: 'var(--slate-400)', fontSize: '0.75rem', marginBottom: '10px' }}>DAILY AVERAGE</div>
          <span className="platform-stat-value" style={{ fontSize: '2.2rem', fontWeight: 950 }}>{(totalHours/30).toFixed(1)} hrs</span>
        </div>
        <div className="platform-stat-card glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <div className="platform-stat-label" style={{ fontWeight: 950, color: 'var(--slate-400)', fontSize: '0.75rem', marginBottom: '10px' }}>PRODUCTIVITY PEAK</div>
          <span className="platform-stat-value" style={{ fontSize: '2.2rem', fontWeight: 950 }}>{currentDate.getMonth() % 2 === 0 ? 'Saturday' : 'Tuesday'}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Main Heatmap */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '40px', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>Consistency Map</h3>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--slate-400)', fontWeight: 900 }}>LESS</span>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[0.05, 0.3, 0.7, 1].map(op => (
                        <div key={op} style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--brand-red)', opacity: op }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--slate-400)', fontWeight: 900 }}>MORE</span>
                  </div>
                </div>

                {/* Date Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--slate-50)', padding: '16px 24px', borderRadius: '20px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)' }}>{monthYearLabel}</span>
                   </div>
                   <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={handlePrevMonth}
                        style={{ background: '#fff', border: 'none', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                      >
                         <Icon name="chevronLeft" size={16} color="var(--brand-red)" />
                      </button>
                      <button 
                        onClick={handleNextMonth}
                        style={{ background: '#fff', border: 'none', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                      >
                         <Icon name="chevronRight" size={16} color="var(--brand-red)" />
                      </button>
                   </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                    <div key={d} style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-300)', textAlign: 'center', marginBottom: '8px', letterSpacing: '0.05em' }}>{d}</div>
                ))}
                
                {Array.from({ length: (currentDate.getDay() + 6) % 7 }).map((_, i) => <div key={`empty-${i}`} />)}
                
                <AnimatePresence mode="popLayout">
                  {heatmapData.map((d, i) => {
                      const opacity = d.hours > 6 ? 1 : d.hours > 3 ? 0.7 : d.hours > 1 ? 0.3 : 0.05;
                      
                      return (
                          <motion.div 
                              key={`${monthYearLabel}-${i}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.01 }}
                              style={{ 
                                  aspectRatio: '1/1', 
                                  background: 'var(--brand-red)',
                                  opacity: opacity,
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  position: 'relative'
                              }}
                              onMouseEnter={e => {
                                 const tooltip = e.currentTarget.querySelector('.heatmap-tooltip');
                                 if (tooltip) tooltip.style.opacity = '1';
                                 e.currentTarget.style.transform = 'scale(1.2) rotate(4deg)';
                                 e.currentTarget.style.zIndex = '10';
                              }}
                              onMouseLeave={e => {
                                 const tooltip = e.currentTarget.querySelector('.heatmap-tooltip');
                                 if (tooltip) tooltip.style.opacity = '0';
                                 e.currentTarget.style.transform = '';
                                 e.currentTarget.style.zIndex = '';
                              }}
                          >
                              <div className="heatmap-tooltip" style={{ 
                                  position: 'absolute', bottom: '140%', left: '50%', transform: 'translateX(-50%)', 
                                  opacity: 0, pointerEvents: 'none', background: 'var(--brand-black)', color: '#fff', 
                                  padding: '8px 14px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 900,
                                  whiteSpace: 'nowrap', zIndex: 100, transition: 'all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                                  boxShadow: '0 12px 24px rgba(0,0,0,0.25)' 
                              }}>
                                 <div style={{ color: 'var(--brand-red)', marginBottom: '2px' }}>{monthYearLabel.split(' ')[0]} {d.day}</div>
                                 <div style={{ opacity: 0.8 }}>{d.hours.toFixed(1)} Focused Hours</div>
                              </div>
                          </motion.div>
                      );
                  })}
                </AnimatePresence>
              </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'var(--brand-black)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--brand-red)', filter: 'blur(80px)', opacity: 0.2 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 950, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>MONTHLY MILESTONES</h4>
                    <span style={{ fontSize: '0.7rem', color: '#fff', background: 'var(--brand-red)', padding: '4px 10px', borderRadius: '20px', fontWeight: 950 }}>STREAK: 8</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 900, marginBottom: '4px' }}>KNOWLEDGE MODULES</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 950 }}>12 / 16</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 900, marginBottom: '4px' }}>PRACTICAL ASSESSMENTS</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 950 }}>08 / 10</span>
                    </div>
                  </div>
              </div>

              <div className="glass-card hover-lift" style={{ padding: '2rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: 56, height: 56, borderRadius: '18px', background: 'rgba(235,35,39,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="zap" size={24} color="var(--brand-red)" />
                      </div>
                      <div>
                          <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)' }}>Focus Peak</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 750 }}>{currentDate.getMonth() % 2 === 0 ? 'SAT • 09:00 AM' : 'WED • 08:00 PM'}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
