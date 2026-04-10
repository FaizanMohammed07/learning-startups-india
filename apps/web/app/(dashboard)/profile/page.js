'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function ProfilePage() {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete all lectures', done: false },
    { id: 2, text: 'Complete my current course roadmap', done: false },
  ]);

  return (
    <div className="platform-page" style={{ padding: '0 2rem 3rem', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── TOP SECTION: FULL WIDTH BANNER WITH OVERLAY ── */}
      <div style={{ position: 'relative', paddingTop: '2.5rem', marginBottom: '2.5rem' }}>
        
        {/* Full-Width Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ef4444 0%, #be123c 100%)', 
          borderRadius: '24px', 
          padding: '3rem 3.5rem', 
          position: 'relative',
          overflow: 'hidden',
          minHeight: '300px',
          boxShadow: '0 12px 40px rgba(239, 68, 68, 0.25)',
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Subtle decorative path */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}>
             <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none">
                <path d="M50 250C150 200 200 100 350 150C500 200 600 50 750 100" stroke="#fff" strokeWidth="2.5" strokeDasharray="10 10" />
                <circle cx="750" cy="100" r="4" fill="#fff" />
             </svg>
          </div>
          
          <div style={{ position: 'absolute', top: '40px', left: '60%', opacity: 0.15, transform: 'rotate(-10deg)' }}>
             <Icon name="rocket" size={72} color="#fff" />
          </div>

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1, width: 'calc(100% - 450px)' }}>
             <div style={{ position: 'relative', flexShrink: 0 }}>
                <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="72" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
                  <circle cx="80" cy="80" r="72" fill="transparent" stroke="#fff" strokeWidth="5" 
                    strokeDasharray="452" strokeDashoffset={452 * (1 - 0.78)} strokeLinecap="round" />
                </svg>
                <div style={{ 
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: '130px', height: '130px', borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#000',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff' }}>BS</span>
                </div>
                <div style={{ 
                  position: 'absolute', bottom: '12px', right: '12px', 
                  background: '#fff', width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}>
                  <Icon name="rocket" size={16} color="#ef4444" />
                </div>
                <div style={{ 
                  position: 'absolute', top: '12px', right: '-10px', 
                  background: '#fff', padding: '4px 12px', borderRadius: '20px',
                  fontSize: '0.8rem', fontWeight: 700, color: '#ef4444',
                }}>
                  78%
                </div>
             </div>

             <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff' }}>Beesu Siri</h1>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', maxWidth: '500px', lineHeight: 1.5, marginBottom: '24px' }}>
                   Building bold ideas with clarity, momentum, and strong execution.
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  {[
                    { label: 'Student', bg: 'rgba(255,255,255,0.18)', tc: '#fff', border: 'rgba(255,255,255,0.2)', icon: 'book' },
                    { label: 'Focused', bg: 'rgba(255,255,255,0.12)', tc: '#fff', border: 'rgba(255,255,255,0.15)', icon: 'target' },
                    { label: 'Open to collaborations', bg: '#FDBA74', tc: '#7C2D12', border: 'transparent', icon: 'zap' }
                  ].map(tag => (
                     <span key={tag.label} style={{ 
                       background: tag.bg, color: tag.tc, padding: '10px 18px', borderRadius: '40px', 
                       fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                       border: `1px solid ${tag.border}`, flexShrink: 0
                     }}>
                       <Icon name={tag.icon} size={15} color={tag.tc} />
                       {tag.label}
                     </span>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Momentum Dashboard Overlay */}
        <div style={{ 
          position: 'absolute', right: '20px', top: '4.5rem', width: '370px',
          background: '#fff', borderRadius: '35px', border: '1px solid #f1f5f9', 
          padding: '2.2rem 2.2rem 3.8rem', height: 'fit-content', boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <span className="section-label-caps" style={{ color: '#94a3b8' }}>MOMENTUM DASHBOARD</span>
            <div style={{ opacity: 0.2 }}><Icon name="moreHorizontal" /></div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
               <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155' }}>Profile strength</span>
               <span style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a' }}>78%</span>
            </div>
            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
               <div style={{ width: '78%', height: '100%', background: '#ffabb2', borderRadius: '5px' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ background: '#fff1f2', padding: '1.2rem', borderRadius: '24px', border: '1px solid #fee2e2' }}>
               <span style={{ fontSize: '0.6rem', fontWeight: 950, color: '#eb2327', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>CURRENT ENERGY</span>
               <div style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>Focused</div>
               <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>In deep execution mode.</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
               <span style={{ fontSize: '0.6rem', fontWeight: 950, color: '#64748b', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>AMBITION MODE</span>
               <div style={{ fontSize: '1.15rem', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>Scale</div>
               <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>Building for next.</p>
            </div>
          </div>
          {/* MINIMALIST FOCUS WORD CARD (STRICT SPEC) */}
          <div style={{ 
            background: 'linear-gradient(135deg, #FBE4D8 0%, #F9E0D2 40%, #F7D9C6 100%)', 
            padding: '20px', 
            borderRadius: '16px', 
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            width: '300px',
            marginTop: '1.2rem',
            textAlign: 'left'
          }}>
            {/* Top Label */}
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#F97316', 
              letterSpacing: '0.5px', 
              textTransform: 'uppercase' 
            }}>
              FOCUS WORD
            </div>

            {/* Main Title */}
            <h4 style={{ 
              fontSize: '22px', 
              fontWeight: 700, 
              color: '#1F2937', 
              margin: '8px 0 0'
            }}>
              Momentum
            </h4>

            {/* Subtext */}
            <div style={{ 
              fontSize: '14px', 
              lineHeight: 1.4, 
              color: '#6B7280', 
              marginTop: '4px' 
            }}>
              <div>for the week.</div>
              <div>Keep it visible.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT SECTION (SPLIT LAYOUT) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 370px', gap: '2.5rem', alignItems: 'start', marginBottom: '2.5rem' }}>
        <div style={{ padding: '2.5rem 3rem', borderRadius: '35px', background: '#fff', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '15px', color: '#64748b' }}>
                   <Icon name="user" size={24} />
                </div>
                <h3 style={{ margin: 0 }}>About</h3>
              </div>
              <Link href="/dashboard">
                <button style={{ 
                  background: '#eb2327', color: '#fff', border: 'none', padding: '14px 28px', 
                  borderRadius: '16px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 6px 20px rgba(235,35,39,0.15)'
                }}>
                   <Icon name="rocket" size={18} />
                   Go to Dashboard
                </button>
              </Link>
            </div>
            <p style={{ fontSize: '15px', color: '#475569', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
              Beesu Siri is focused on tuning learning into visible progress through structured action, startup thinking, and disciplined execution.
            </p>
        </div>
        <div style={{ width: '370px' }} /> {/* Spacer for dashboard above */}
      </div>

      {/* ── STATS GRID (FULL WIDTH) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
         {[
           { label: 'COURSES', val: '0', sub: 'Programs currently enrolled', color: '#fef3c7', tc: '#92400e' },
           { label: 'CERTIFICATES', val: '7', sub: 'Proof of completed milestones', color: '#ffeff1', tc: '#eb2327' },
           { label: 'GOALS', val: '1/2', sub: 'Weekly goals completed', color: '#fef3c7', tc: '#92400e' },
           { label: 'LINKS', val: '2', sub: 'Public profile and contact links', color: '#fef3c7', tc: '#92400e' },
         ].map((stat, i) => (
           <div key={i} style={{ padding: '2rem', borderRadius: '32px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ 
                background: stat.color, color: stat.tc, padding: '6px 16px', borderRadius: '24px', 
                fontSize: '0.8rem', fontWeight: 950, letterSpacing: '0.05em', width: 'fit-content'
              }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 950, color: '#0f172a', margin: '20px 0 10px', letterSpacing: '-0.04em' }}>{stat.val}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 650, color: '#64748b', lineHeight: 1.4 }}>{stat.sub}</div>
           </div>
         ))}
      </div>

      {/* ── GROWTH BOARD & TIMELINE (FULL WIDTH 2-COL) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '2.5rem' }}>
        
        {/* Personal Growth Board */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '35px', 
          padding: '2.8rem', 
          border: '1px solid #f1f5f9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eb2327', marginBottom: '10px' }}>
                <Icon name="target" size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.12em' }}>GOALS</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Personal Growth Board</h2>
              <p style={{ margin: '10px 0 0', fontSize: '0.95rem', fontWeight: 600, color: '#64748b', opacity: 0.8 }}>Set weekly goals. Take action. Track your wins.</p>
            </div>
            <div style={{ 
              background: '#ecfdf5', padding: '10px 18px', borderRadius: '30px', 
              color: '#10b981', fontSize: '0.85rem', fontWeight: 950, 
              display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #d1fae5'
            }}>
               <Icon name="checkCircle" size={14} color="#10b981" /> 0 completed
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginBottom: '2.5rem' }}>
             <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', 
                  width: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                   <Icon name="plus" size={16} color="#64748b" />
                </div>
                <input 
                  type="text" 
                  placeholder="Add a weekly goal" 
                  style={{ 
                    width: '100%', padding: '18px 20px 18px 58px', border: '1px solid #e2e8f0', 
                    borderRadius: '20px', fontSize: '1rem', fontWeight: 600, color: '#1e293b',
                    background: '#f8fafc', outline: 'none', transition: 'all 0.2s'
                  }} 
                />
             </div>
             <button style={{ 
               background: '#eb2327', color: '#fff', border: 'none', padding: '0 30px', 
               borderRadius: '20px', fontWeight: 950, fontSize: '1rem', cursor: 'pointer',
               boxShadow: '0 8px 20px rgba(235,35,39,0.15)', display: 'flex', alignItems: 'center', gap: '10px'
             }}>
                <Icon name="plus" size={20} />
                Add
             </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
             {goals.map(goal => (
               <div key={goal.id} style={{ 
                 padding: '1.4rem 1.8rem', borderRadius: '24px', background: '#f8fafc', 
                 display: 'flex', alignItems: 'center', gap: '18px', border: '1px solid #f1f5f9',
                 transition: 'transform 0.2s'
               }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #e2e8f0', background: '#fff' }} />
                  <span style={{ flex: 1, fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>{goal.text}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                     <button style={{ padding: '10px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer' }}><Icon name="pencil" size={16} color="#94a3b8" /></button>
                     <button style={{ padding: '10px', borderRadius: '12px', background: '#fff', border: '1px solid #fee2e2', cursor: 'pointer' }}><Icon name="trash" size={16} color="#ef4444" /></button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Momentum Timeline */}
        <div style={{ 
          background: '#fff', 
          borderRadius: '35px', 
          padding: '2.8rem', 
          border: '1px solid #f1f5f9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f97316', marginBottom: '10px' }}>
                <Icon name="trophy" size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.12em' }}>WINS</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Momentum Timeline</h2>
              <p style={{ margin: '10px 0 0', fontSize: '0.95rem', fontWeight: 600, color: '#64748b', opacity: 0.8 }}>Capture wins. Build momentum. Stay inspired.</p>
            </div>
            <div style={{ 
              background: '#fffbeb', padding: '10px 18px', borderRadius: '30px', 
              color: '#b45309', fontSize: '0.85rem', fontWeight: 950, 
              display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #fef3c7'
            }}>
               <Icon name="star" size={14} color="#f59e0b" fill="#f59e0b" /> 1 win tracked
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginBottom: '2.5rem' }}>
             <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', 
                  width: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                   <Icon name="plus" size={16} color="#64748b" />
                </div>
                <input 
                  type="text" 
                  placeholder="Add a win, breakthrough, or milestone" 
                  style={{ 
                    width: '100%', padding: '18px 20px 18px 58px', border: '1px solid #e2e8f0', 
                    borderRadius: '20px', fontSize: '1rem', fontWeight: 600, color: '#1e293b',
                    background: '#f8fafc', outline: 'none'
                  }} 
                />
             </div>
             <button style={{ 
               background: '#f97316', color: '#fff', border: 'none', padding: '0 30px', 
               borderRadius: '20px', fontWeight: 950, fontSize: '1rem', cursor: 'pointer',
               boxShadow: '0 8px 20px rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', gap: '10px'
             }}>
                <Icon name="plus" size={20} />
                Add
             </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', position: 'relative', paddingLeft: '38px' }}>
             {/* Timeline Line (Industrial Dashed) */}
             <div style={{ 
               position: 'absolute', 
               left: '12px', 
               top: '10px', 
               bottom: '10px', 
               width: '2px', 
               borderLeft: '2px dashed #e2e8f0' 
             }} />
             
             <div style={{ position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '-33px', top: '22px', 
                  width: 14, height: 14, borderRadius: '50%', 
                  background: '#f97316', border: '3.5px solid #fff', 
                  boxShadow: '0 0 0 1px #e2e8f0', zIndex: 2 
                }} />
                
                <div style={{ 
                  padding: '1.5rem 1.8rem', borderRadius: '24px', background: '#f8fafc', 
                  display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #f1f5f9' 
                }}>
                    <div style={{ flex: 1 }}>
                       <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4 }}>
                          Joined the platform and started building my momentum profile.
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', color: '#94a3b8' }}>
                          <Icon name="calendar" size={14} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 750 }}>6 Apr 2026</span>
                       </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                       <button style={{ padding: '8px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer' }}><Icon name="pencil" size={16} color="#94a3b8" /></button>
                       <button style={{ padding: '8px', borderRadius: '10px', background: '#fff', border: '1px solid #fee2e2', cursor: 'pointer' }}><Icon name="trash" size={16} color="#ef4444" /></button>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
