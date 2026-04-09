'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function LearnPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // Assessment State
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let res = await apiGet(`/api/v1/courses?slug=${slug}`);
        let c = res.data?.[0];
        if (!c) {
          res = await apiGet(`/api/v1/courses/${slug}`);
          c = res.data;
        }

        if (c) {
          setCourse(c);
          const modRes = await apiGet(`/api/v1/courses/${c._id}/modules`);
          setModules(modRes.data || []);
        }
      } catch (e) {
        console.error('Failed to fetch learning data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const activeModule = modules[activeModuleIdx];

  const handleLessonComplete = () => {
    if (!activeModule) return;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(activeModule._id);
    setCompletedLessons(newCompleted);

    // Auto-advance logic
    if (activeModuleIdx < modules.length - 1) {
      // If it's the end of a "week" (3 modules), show assessment
      if ((activeModuleIdx + 1) % 3 === 0) {
        setShowAssessment(true);
      } else {
        setActiveModuleIdx(activeModuleIdx + 1);
      }
    } else {
      setShowAssessment(true);
    }
  };

  const weeks = useMemo(() => {
    const w = [];
    const size = 3;
    for (let i = 0; i < modules.length; i += size) {
      w.push(modules.slice(i, i + size));
    }
    return w;
  }, [modules]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #E92222', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (!course) return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Course not found.</div>;

  return (
    <div className="learn-player-premium" style={{ 
      display: 'flex', 
      height: '100vh', 
      background: '#fff',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* ── SIDEBAR: LESSON NAVIGATION ── */}
      <aside style={{ 
        width: '380px', 
        borderRight: '1px solid #F1F5F9', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#fff',
        zIndex: 100,
        boxShadow: '10px 0 30px rgba(0,0,0,0.02)'
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '32px 28px', borderBottom: '1px solid #F8FAFC' }}>
          <button 
            onClick={() => router.push('/my-learning')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 16px', 
              borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              marginBottom: '24px', transition: 'all 0.2s', color: '#64748B'
            }}
            className="hover-lift"
          >
            <Icon name="chevron-right" size={14} style={{ transform: 'rotate(180deg)' }} /> BACK TO LEARNING
          </button>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{course.title}</h2>
          
          <div style={{ background: '#F1F5F9', height: '6px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${(completedLessons.size / modules.length) * 100}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #E92222, #FF4D4D)',
              boxShadow: '0 0 10px rgba(233, 34, 34, 0.3)'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8' }}>COURSE PROGRESS</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#E92222' }}>{Math.round((completedLessons.size / modules.length) * 100)}%</span>
          </div>
        </div>

        {/* Lesson List */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '24px 12px' }} className="custom-scrollbar">
          {weeks.map((weekModules, weekIdx) => {
            // Week 1 (idx 0) is always open. Subsequent weeks locked if previous week assessment not done.
            const isLocked = weekIdx > 0 && (completedLessons.size < weekIdx * 3);
            
            return (
              <div key={weekIdx} style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', 
                  padding: '12px 16px', opacity: isLocked ? 0.5 : 1
                }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '10px', 
                    background: isLocked ? '#F1F5F9' : '#FEF2F2', 
                    color: isLocked ? '#94A3B8' : '#E92222',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800
                  }}>
                    {weekIdx + 1}
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Week {weekIdx + 1}</h3>
                  {isLocked && <Icon name="lock" size={12} color="#94A3B8" style={{ marginLeft: 'auto' }} />}
                </div>

                <div style={{ marginLeft: '31px', paddingLeft: '20px', borderLeft: '2px solid #F1F5F9', marginTop: '4px', display: 'grid', gap: '4px' }}>
                  {weekModules.map((m, mIdx) => {
                    const globalIdx = weekIdx * 3 + mIdx;
                    const isActive = activeModuleIdx === globalIdx && !showAssessment;
                    const isCompleted = completedLessons.has(m._id);
                    
                    return (
                      <button 
                        key={m._id}
                        disabled={isLocked}
                        onClick={() => { setActiveModuleIdx(globalIdx); setShowAssessment(false); }}
                        style={{ 
                          textAlign: 'left', padding: '12px 16px', borderRadius: '14px',
                          background: isActive ? '#FEF2F2' : 'transparent',
                          border: 'none',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', gap: '12px',
                          transition: 'all 0.2s', width: '100%'
                        }}
                      >
                        <div style={{ 
                          width: '18px', height: '18px', borderRadius: '50%',
                          border: isCompleted ? 'none' : '2px solid #E2E8F0',
                          background: isCompleted ? '#22C55E' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isCompleted && <Icon name="check" size={10} color="#fff" />}
                        </div>
                        <span style={{ 
                          fontSize: '0.8rem', fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#E92222' : (isLocked ? '#94A3B8' : '#475569'),
                        }}>
                          {m.title}
                        </span>
                        {isActive && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#E92222', marginLeft: 'auto' }} />}
                      </button>
                    );
                  })}
                  
                  {/* Weekly Assessment Entry */}
                  <button
                    disabled={isLocked}
                    onClick={() => { 
                      const weekStarted = completedLessons.size >= weekIdx * 3;
                      if (weekStarted) setShowAssessment(true);
                    }}
                    style={{ 
                      textAlign: 'left', padding: '14px 16px', borderRadius: '14px',
                      background: showAssessment && Math.floor(activeModuleIdx / 3) === weekIdx ? '#F8FAFC' : 'transparent',
                      border: '1px dashed #E2E8F0',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      transition: 'all 0.2s', width: '100%', marginTop: '8px'
                    }}
                  >
                    <div style={{ color: '#E92222' }}><Icon name="info" size={14} /></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B' }}>Weekly Threesess</span>
                    {isLocked && <Icon name="lock" size={10} color="#94A3B8" style={{ marginLeft: 'auto' }} />}
                  </button>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '48px 64px' }} className="custom-scrollbar">
          {showAssessment ? (
            /* ── ASSESSMENT OVERLAY (THREESESS) ── */
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
              <div style={{ 
                padding: '50px', borderRadius: '32px', background: '#0F172A', color: '#fff',
                position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(233, 34, 34, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon name="info" size={32} color="#E92222" />
                  </div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>Weekly Threesess</h1>
                  <p style={{ color: '#94A3B8', fontWeight: 500, marginBottom: '48px' }}>Synchronization • Week {Math.floor(activeModuleIdx / 3) + 1}</p>
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '20px', marginBottom: '48px' }}>
                  {[1, 2, 3].map(q => (
                    <div key={q} style={{ padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <span style={{ color: '#E92222', fontWeight: 800 }}>0{q}</span>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>How does strategic domain targeting influence MVP scalability?</p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {['Iterative Growth Path', 'Fixed Domain Scaling', 'Strategic Resilience', 'Dynamic Resource Allocation'].map((opt, idx) => (
                          <button 
                            key={idx} 
                            style={{ 
                              padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                              borderRadius: '16px', textAlign: 'left', fontSize: '0.9rem', color: '#CBD5E1',
                              cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '12px'
                            }}
                          >
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <button 
                    onClick={() => { setShowAssessment(false); setActiveModuleIdx(prev => Math.min(modules.length - 1, prev + 1)); }}
                    style={{ background: '#E92222', color: '#fff', border: 'none', padding: '18px 48px', borderRadius: '16px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    SUBMIT & CONTINUE
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeModule ? (
            /* ── LESSON VIEW ── */
            <div style={{ maxWidth: '950px', margin: '0 auto', width: '100%', position: 'relative' }}>
              {/* Media Player */}
              <div style={{ 
                width: '100%', aspectRatio: '16/9', background: '#0F172A', 
                borderRadius: '28px', marginBottom: '48px', position: 'relative',
                overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
              }}>
                <img src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', background: '#fff', color: '#E92222', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <div style={{ transform: 'translateX(3px)' }}><Icon name="play" size={32} /></div>
                </div>
              </div>

              {/* Lesson Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E92222', background: '#FEF2F2', padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase' }}>Module {activeModuleIdx + 1}</span>
                  </div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{activeModule.title}</h1>
                </div>
                <button 
                  onClick={handleLessonComplete}
                  style={{ 
                    background: completedLessons.has(activeModule._id) ? '#22C55E' : '#0F172A',
                    color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '16px',
                    fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s'
                  }}
                >
                  {completedLessons.has(activeModule._id) ? <><Icon name="check" size={18} /> COMPLETED</> : 'MARK AS COMPLETE'}
                </button>
              </div>

              <div style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: activeModule.description || "In this session, we dive deep into the strategic architectural considerations for building durable startup foundations." }} />

              <div style={{ marginTop: '4rem', display: 'flex', gap: '32px', borderBottom: '1px solid #F1F5F9' }}>
                {['RESOURCES', 'TRANSCRIPT', 'NOTES'].map((tab, idx) => (
                  <button key={tab} style={{ padding: '0 0 16px', background: 'none', border: 'none', color: idx === 0 ? '#0F172A' : '#94A3B8', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', borderBottom: idx === 0 ? '2px solid #E92222' : '2px solid transparent' }}>{tab}</button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
               <p style={{ fontWeight: 600 }}>No modules found for this course.</p>
            </div>
          )}
        </div>

        {/* ── FOOTER CONTROLS ── */}
        <div style={{ 
          padding: '24px 64px', borderTop: '1px solid #F1F5F9', background: '#fff',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
           <button 
             disabled={activeModuleIdx === 0}
             onClick={() => { setActiveModuleIdx(prev => Math.max(0, prev - 1)); setShowAssessment(false); }}
             style={{ 
               background: 'none', border: 'none', color: activeModuleIdx === 0 ? '#CBD5E1' : '#1E293B', 
               fontWeight: 800, fontSize: '0.9rem', cursor: activeModuleIdx === 0 ? 'not-allowed' : 'pointer',
               display: 'flex', alignItems: 'center', gap: '10px'
             }}
           >
              <Icon name="chevron-right" size={16} style={{ transform: 'rotate(180deg)' }} /> PREVIOUS MODULE
           </button>

           <button 
             disabled={activeModuleIdx === modules.length - 1}
             onClick={() => { setActiveModuleIdx(prev => Math.min(modules.length - 1, prev + 1)); setShowAssessment(false); }}
             style={{ 
               background: activeModuleIdx === modules.length - 1 ? '#F1F5F9' : '#0F172A', 
               color: activeModuleIdx === modules.length - 1 ? '#94A3B8' : '#fff', 
               fontWeight: 800, fontSize: '0.9rem', cursor: activeModuleIdx === modules.length - 1 ? 'not-allowed' : 'pointer',
               display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '14px', border: 'none'
             }}
           >
              NEXT MODULE <Icon name="chevron-right" size={16} />
           </button>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; borderRadius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}
