'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function ProfilePage() {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete all lectures', done: false },
    { id: 2, text: 'Complete my current course roadmap', done: false },
  ]);

  const [wins, setWins] = useState([
    { id: 1, text: 'Joined the platform and started building my profile.', date: '6 Apr 2026' }
  ]);

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  return (
    <div className="platform-page" style={{ padding: '0 1.5rem 2rem', background: '#f8fafc' }}>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 1fr) 420px', 
        gap: '1.5rem', 
        marginBottom: '2rem'
      }}>
        {/* Main Banner */}
        <div style={{ 
          background: '#fff1f2', 
          borderRadius: '24px', 
          padding: '1rem 1.5rem', 
          color: 'var(--brand-black)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '130px',
          maxWidth: '850px',
          border: '1px solid rgba(225, 29, 72, 0.1)'
        }}>
          {/* Subtle Paper Rocket Trail Illustration (SVG) */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
             <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none">
                <path d="M50 250C150 200 200 100 350 150C500 200 600 50 750 100" stroke="var(--brand-red)" strokeWidth="2" strokeDasharray="8 8" />
             </svg>
          </div>

          <div style={{ position: 'absolute', top: '20px', right: '30px', opacity: 0.1, transform: 'rotate(15deg)' }}>
             <Icon name="rocket" size={32} color="var(--brand-red)" />
          </div>
          
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
             {/* Scaled Down Progress Ring Avatar Unit */}
             <div style={{ position: 'relative', flexShrink: 0 }}>
                <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="45" cy="45" r="40" fill="transparent" stroke="rgba(225, 29, 72, 0.05)" strokeWidth="5" />
                  <circle cx="45" cy="45" r="40" fill="transparent" stroke="var(--brand-red)" strokeWidth="5" 
                    strokeDasharray="251" strokeDashoffset={251 * (1 - 0.78)} strokeLinecap="round" />
                </svg>
                
                <div style={{ 
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: '70px', height: '70px', borderRadius: '50%',
                  background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 950, color: '#fff'
                }}>
                  BS
                </div>
                
                {/* Quadrant Badge */}
                <div style={{ 
                  position: 'absolute', top: '-2px', right: '-2px', 
                  background: '#fff', padding: '2px 6px', borderRadius: '20px',
                  fontSize: '0.55rem', fontWeight: 950, color: '#e11d48',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  zIndex: 2,
                  border: '1px solid rgba(225, 29, 72, 0.1)'
                }}>
                  78%
                </div>
             </div>

             <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 950, margin: '0 0 2px', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--brand-black)' }}>Beesu Siri</h1>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-500)', maxWidth: '400px', lineHeight: 1.4, marginBottom: '12px' }}>
                   Building bold ideas with clarity, momentum, and strong execution.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                   {[
                     { label: 'Student', icon: 'book' },
                     { label: 'Focused', icon: 'zap' },
                     { label: 'Collaborator', icon: 'users' }
                   ].map(tag => (
                      <span key={tag.label} style={{ 
                        background: '#fff', padding: '6px 12px', borderRadius: '40px', 
                        fontSize: '0.7rem', fontWeight: 750, display: 'flex', alignItems: 'center', gap: '6px',
                        border: '1px solid rgba(0,0,0,0.05)', color: 'var(--slate-600)'
                      }}>
                        <Icon name={tag.icon} size={14} color="var(--brand-red)" />
                        {tag.label}
                      </span>
                   ))}
                </div>
             </div>
          </div>
        </div>

         {/* Momentum Dashboard Sidebar */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ padding: '2rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 950, letterSpacing: '0.05em', color: 'var(--brand-black)' }}>MOMENTUM DASHBOARD</h3>
                  <div style={{ background: '#ecfdf5', padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 950, color: '#059669' }}>ACTIVE</div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2.5rem' }}>
                  <div style={{ width: 65, height: 65, borderRadius: '50%', background: 'var(--slate-50)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Icon name="zap" size={28} color="#e11d48" fill="#e11d48" />
                  </div>
                  <div>
                     <div style={{ fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)' }}>Level 12</div>
                     <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)', marginTop: '4px' }}>Profile Strength: High</div>
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#fff1f2', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(225,29,72,0.1)' }}>
                     <span style={{ fontSize: '0.6rem', fontWeight: 950, color: '#e11d48', display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>CURRENT ENERGY</span>
                     <div style={{ fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)' }}>Focused</div>
                     <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '6px 0 0', fontWeight: 650, lineHeight: 1.3 }}>You're in deep execution mode.</p>
                  </div>
                  <div style={{ background: 'var(--slate-50)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                     <span style={{ fontSize: '0.6rem', fontWeight: 950, color: 'var(--slate-400)', display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>AMBITION MODE</span>
                     <div style={{ fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)' }}>Scale</div>
                     <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '6px 0 0', fontWeight: 650, lineHeight: 1.3 }}>You're building for what's next.</p>
                  </div>
               </div>

               <div style={{ background: '#fff7ed', padding: '2rem', borderRadius: '28px', border: '1px solid #ffedd5', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                     <div style={{ padding: '8px', background: 'rgba(249,115,22,0.1)', borderRadius: '12px' }}>
                        <Icon name="target" size={20} color="#f97316" />
                     </div>
                     <span style={{ fontSize: '0.7rem', fontWeight: 950, color: '#f97316', letterSpacing: '0.1em' }}>FOCUS WORD</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 950, color: 'var(--brand-black)', position: 'relative', zIndex: 1 }}>Momentum</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: '8px 0 0', fontWeight: 700, position: 'relative', zIndex: 1 }}>for the week. Keep it visible.</p>
                  
                  <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }}>
                     <Icon name="target" size={120} color="#f97316" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <div style={{ padding: '1.5rem 2rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'var(--slate-50)', borderRadius: '10px' }}>
               <Icon name="fileText" size={16} color="var(--slate-400)" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 950, color: 'var(--brand-black)' }}>About</h3>
          </div>
          <Link href="/dashboard">
            <button className="btn-brand" style={{ background: '#e11d48', padding: '10px 20px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
               Go to Dashboard
            </button>
          </Link>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', fontWeight: 650, lineHeight: 1.5, margin: 0, opacity: 0.9 }}>
          Beesu Siri is focused on tuning learning into visible progress through structured action, startup thinking, and disciplined execution.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
         {[
           { label: 'COURSES', val: '0', sub: 'Enrolled', color: '#ffedd5', tc: '#f97316', icon: 'book' },
           { label: 'CERTIFICATES', val: '7', sub: 'Completed', color: '#ffeff1', tc: '#e11d48', icon: 'award' },
           { label: 'GOALS', val: '1/2', sub: 'This Week', color: '#ffedd5', tc: '#f97316', icon: 'target' },
           { label: 'LINKS', val: '2', sub: 'Public Links', color: '#ffedd5', tc: '#f97316', icon: 'link' },
         ].map((stat, i) => (
           <div key={i} style={{ padding: '1.5rem', borderRadius: '24px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.2 }}>
                 <Icon name={stat.icon} size={24} color={stat.tc} />
              </div>
              <span style={{ 
                background: stat.color, color: stat.tc, padding: '4px 10px', borderRadius: '24px', 
                fontSize: '0.65rem', fontWeight: 950, letterSpacing: '0.05em' 
              }}>
                {stat.label}
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--brand-black)', margin: '12px 0 4px', letterSpacing: '-0.02em' }}>{stat.val}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-400)' }}>{stat.sub}</div>
           </div>
         ))}
      </div>

      {/* ── GROWTH BOARD & TIMELINE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2.5rem' }}>
         {/* Personal Growth Board */}
         <div style={{ padding: '2.5rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e11d48', marginBottom: '6px' }}>
                    <Icon name="target" size={14} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.1em' }}>GOALS</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0, letterSpacing: '-0.02em' }}>Personal Growth Board</h3>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', fontWeight: 650, color: 'var(--slate-400)' }}>Set weekly goals. Take action. Track your wins.</p>
               </div>
               <div style={{ background: '#ecfdf5', padding: '6px 14px', borderRadius: '24px', color: '#059669', fontSize: '0.7rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> 0 completed
               </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
               <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Icon name="plus" size={16} color="var(--slate-300)" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Add a weekly goal" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #f1f5f9', background: 'var(--slate-50)', fontSize: '0.9rem', fontWeight: 600 }} />
                  </div>
                  <button className="btn-brand" style={{ background: '#e11d48', padding: '0 28px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 900 }}>+ Add</button>
               </div>

               {goals.map(goal => (
                 <div key={goal.id} style={{ padding: '1.5rem', borderRadius: '20px', background: 'var(--slate-50)', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid #e2e8f0', background: '#fff', flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 650, color: 'var(--brand-black)' }}>{goal.text}</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                       <button style={{ padding: '8px', background: '#fff', borderRadius: '10px', border: '1px solid #f1f5f9', cursor: 'pointer' }}><Icon name="pencil" size={16} color="var(--slate-400)" /></button>
                       <button style={{ padding: '8px', background: '#fff', borderRadius: '10px', border: '1px solid #f1f5f9', cursor: 'pointer' }}><Icon name="trash" size={16} color="#e11d48" /></button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Momentum Timeline */}
         <div style={{ padding: '2.5rem', borderRadius: '32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '6px' }}>
                    <Icon name="trophy" size={14} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.1em' }}>WINS</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0, letterSpacing: '-0.02em' }}>Momentum Timeline</h3>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', fontWeight: 650, color: 'var(--slate-400)' }}>Capture wins. Build momentum. Stay inspired.</p>
               </div>
               <div style={{ background: '#fffbeb', padding: '6px 14px', borderRadius: '24px', color: '#b45309', fontSize: '0.7rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="star" size={14} color="#b45309" fill="#b45309" /> 1 win tracked
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
               <div style={{ display: 'flex', gap: '16px', marginBottom: '1rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Icon name="plus" size={16} color="var(--slate-300)" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Add a win, breakthrough, or milestone" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #f1f5f9', background: 'var(--slate-50)', fontSize: '0.9rem', fontWeight: 600 }} />
                  </div>
                  <button className="btn-brand" style={{ background: '#f59e0b', padding: '0 28px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 900 }}>+ Add</button>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                  {/* Dashed Connector Line */}
                  <div style={{ 
                     position: 'absolute', left: '11px', top: '30px', bottom: '10px', 
                     width: '2px', borderLeft: '2px dashed #e2e8f0', zIndex: 0 
                  }} />

                  {wins.map(win => (
                    <div key={win.id} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
                       <div style={{ 
                          width: 24, height: 24, borderRadius: '50%', background: '#f97316', 
                          border: '4px solid #fff', boxShadow: '0 0 0 1px #e2e8f0', flexShrink: 0,
                          marginTop: '20px'
                       }} />
                       <div style={{ flex: 1, padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ flex: 1 }}>
                             <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--brand-black)' }}>{win.text}</div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: 'var(--slate-400)' }}>
                                <Icon name="calendar" size={14} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 750 }}>{win.date}</span>
                             </div>
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                             <button style={{ padding: '8px', background: '#fff', borderRadius: '10px', border: '1px solid #f1f5f9', cursor: 'pointer' }}><Icon name="pencil" size={16} color="var(--slate-400)" /></button>
                             <button style={{ padding: '8px', background: '#fff', borderRadius: '10px', border: '1px solid #f1f5f9', cursor: 'pointer' }}><Icon name="trash" size={16} color="#e11d48" /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

