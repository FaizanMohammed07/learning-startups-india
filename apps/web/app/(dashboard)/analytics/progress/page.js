'use client';
import Icon from '@/components/Icon';
import { motion } from 'framer-motion';

const MILESTONES = [
  { id: 1, title: 'Seed Phase', status: 'completed', date: 'Mar 1', desc: 'Successfully completed core fundamentals and orientation.' },
  { id: 2, title: 'Growth Engine', status: 'active', date: 'Apr 15', desc: 'Implementing market research and lean canvas strategies.' },
  { id: 3, title: 'Scaling Strategy', status: 'upcoming', date: 'May 10', desc: 'Advanced financial modeling and operations management.' },
  { id: 4, title: 'The Pitch', status: 'upcoming', date: 'Jun 1', desc: 'Final presentation to venture partners and certification.' },
];

export default function ProgressPage() {
  return (
    <div className="platform-page" style={{ background: '#f8fafc' }}>
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Progress Overview</h1>
          <p className="platform-page-subtitle">Visualizing your journey from early ideation to market-ready founder.</p>
        </div>
      </header>
      
      <div style={{ position: 'relative', padding: '4rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Snaking Path Graphic (SVG) */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
             <svg width="300" height="800" viewBox="0 0 300 800" fill="none" preserveAspectRatio="none">
                <path d="M150 0 C150 100, 50 150, 50 250 S150 400, 150 500 S250 650, 250 800" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="12 12" />
                <path d="M150 0 C150 100, 50 150, 50 250" stroke="var(--brand-red)" strokeWidth="6" strokeLinecap="round" />
             </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', position: 'relative', zIndex: 1 }}>
            {MILESTONES.map((m, i) => {
              const isEven = i % 2 === 0;
              const isOdd = !isEven;
              
              return (
                <div key={m.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  position: 'relative'
                }}>
                   {/* Date Label (Floating) */}
                   <div style={{ 
                     position: 'absolute', top: '-30px', 
                     fontSize: '0.75rem', fontWeight: 950, color: 'var(--slate-400)',
                     background: '#fff', padding: '4px 12px', borderRadius: '20px', border: '1px solid #edf2f7'
                   }}>
                      {m.date}
                   </div>

                   {/* Milestone Card (Alternating) */}
                   <div style={{ 
                     display: 'flex', 
                     flexDirection: isEven ? 'row' : 'row-reverse',
                     alignItems: 'center',
                     gap: '3rem',
                     width: '100%'
                   }}>
                      {/* Card Content */}
                      <div className="glass-card hover-lift" style={{ 
                        flex: 1, 
                        textAlign: isEven ? 'right' : 'left',
                        padding: '2rem', 
                        borderRadius: '24px', 
                        background: '#fff', 
                        border: '1px solid #edf2f7',
                        maxWidth: '400px'
                      }}>
                         <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: m.status === 'upcoming' ? 'var(--slate-400)' : 'var(--brand-black)', margin: 0 }}>{m.title}</h3>
                         <p style={{ color: 'var(--slate-500)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 700, margin: '8px 0 0' }}>{m.desc}</p>
                         
                         {m.status === 'active' && (
                            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: isEven ? 'flex-end' : 'flex-start' }}>
                               <span style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--brand-red)', marginBottom: '6px' }}>65% COMPLETE</span>
                               <div style={{ height: '6px', width: '120px', background: 'var(--slate-100)', borderRadius: '10px', overflow: 'hidden' }}>
                                   <div style={{ width: '65%', height: '100%', background: 'var(--brand-red)', borderRadius: '10px' }} />
                               </div>
                            </div>
                         )}
                      </div>

                      {/* Path Node */}
                      <div style={{ 
                         width: '64px', height: '64px', borderRadius: '24px', 
                         background: m.status === 'completed' ? 'var(--brand-red)' : m.status === 'active' ? 'var(--brand-black)' : '#fff',
                         border: m.status === 'upcoming' ? '2px solid #e2e8f0' : 'none',
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         zIndex: 2,
                         boxShadow: m.status !== 'upcoming' ? '0 12px 24px rgba(235,35,39,0.2)' : 'none',
                         transform: `rotate(${isEven ? '5deg' : '-5deg'})`
                      }}>
                         <Icon name={m.status === 'completed' ? 'check' : m.status === 'active' ? 'zap' : 'clock'} size={24} color={m.status === 'upcoming' ? 'var(--slate-300)' : '#fff'} />
                      </div>

                      {/* Empty space for balance */}
                      <div style={{ flex: 1 }} />
                   </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}
