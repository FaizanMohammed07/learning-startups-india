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
  const [activeTab, setActiveTab] = useState('Summary');
  const [expandedWeeks, setExpandedWeeks] = useState(new Set([0])); 

  // Assessment State
  const [showAssessment, setShowAssessment] = useState(false);

  // Load persistence
  useEffect(() => {
    const savedIdx = localStorage.getItem(`progress_${slug}`);
    if (savedIdx !== null) {
      const idx = parseInt(savedIdx, 10);
      setActiveModuleIdx(idx);
      setExpandedWeeks(new Set([Math.floor(idx / 3)]));
    }
    
    const savedCompleted = localStorage.getItem(`completed_${slug}`);
    if (savedCompleted) {
      setCompletedLessons(new Set(JSON.parse(savedCompleted)));
    }
  }, [slug]);

  // Save persistence
  useEffect(() => {
    if (course) {
      localStorage.setItem(`progress_${slug}`, activeModuleIdx.toString());
    }
  }, [activeModuleIdx, slug, course]);

  useEffect(() => {
    if (course) {
      localStorage.setItem(`completed_${slug}`, JSON.stringify(Array.from(completedLessons)));
    }
  }, [completedLessons, slug, course]);

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
      if ((activeModuleIdx + 1) % 3 === 0) {
        setShowAssessment(true);
      } else {
        const nextIdx = activeModuleIdx + 1;
        setActiveModuleIdx(nextIdx);
        // Expand the next week if needed
        const nextWeekIdx = Math.floor(nextIdx / 3);
        const newExpanded = new Set(expandedWeeks);
        newExpanded.add(nextWeekIdx);
        setExpandedWeeks(newExpanded);
      }
    } else {
      setShowAssessment(true);
    }
  };

  const progress = Math.round((completedLessons.size / modules.length) * 100) || 0;

  // Group modules into 7 days (mocking a 1-week course structure)
  const days = useMemo(() => {
    if (!modules.length) return [];
    const result = [];
    const modulesPerDay = Math.ceil(modules.length / 7);
    for (let i = 0; i < 7; i++) {
        const dayModules = modules.slice(i * modulesPerDay, (i + 1) * modulesPerDay);
        if (dayModules.length > 0) {
            result.push({
                title: `Day ${i + 1}`,
                items: dayModules,
                startIdx: i * modulesPerDay
            });
        }
    }
    return result;
  }, [modules]);

  const toggleWeek = (dayIdx) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(dayIdx)) {
      newExpanded.delete(dayIdx);
    } else {
      newExpanded.add(dayIdx);
    }
    setExpandedWeeks(newExpanded);
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #ef4444', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (!course) return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Course not found.</div>;

  return (
    <div className="modern-learn-player" style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      fontFamily: 'Poppins, sans-serif',
      padding: '2rem 4rem'
    }}>
      
      {/* ── TOP HEADER: BACK BUTTON & COURSETITLE ── */}
      <header style={{ maxWidth: '1400px', margin: '0 auto 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => router.back()}
            style={{ 
              background: 'none', border: 'none', padding: 0, 
              display: 'flex', alignItems: 'center', gap: '8px', 
              fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', 
              cursor: 'pointer', transition: 'all 0.25s', marginBottom: '8px'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateX(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <Icon name="chevronLeft" size={16} color="#ef4444" /> BACK TO LEARNING
          </button>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{course.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="user" size={14} /> Beginner</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="book" size={14} /> {modules.length} Lessons</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="clock" size={14} /> 3h 45min</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
             <Icon name="bookmark" size={16} /> Save
           </button>
           <button style={{ background: '#ef4444', border: 'none', padding: '10px 22px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#fff', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}>
             <Icon name="rocket" size={16} color="#fff" /> Share
           </button>
        </div>
      </header>

      {/* ── MAIN GRID LAYOUT ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem' }}>
        
        {/* LEFT COLUMN: PLAYER & CONTENT */}
        <section>
          {/* Video Area */}
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#0f172a', 
            borderRadius: '24px', position: 'relative', overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', marginBottom: '2rem'
          }}>
            <img src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', background: '#fff', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <Icon name="play" size={32} />
            </div>
            
            {/* Custom Controls Mock */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Icon name="play" size={20} color="#fff" />
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                   <div style={{ width: (activeModuleIdx / modules.length * 100) + '%', height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                </div>
                <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>{(activeModuleIdx + 1) * 3}:00 / {modules.length * 3}:00</span>
                <Icon name="settings" size={18} color="#fff" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
            {['Summary', 'Files', 'Resources', 'Q&A'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '12px 0', background: 'none', border: 'none', 
                  color: activeTab === tab ? '#0f172a' : '#94a3b8', 
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid #ef4444' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {activeTab === 'Summary' && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Lesson Recap</h3>
                  <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                    {activeModule?.description || "In this lesson, we explored the fundamental building blocks of this program. We learned that components are independent and reusable bits of code. They serve the same purpose as functions but work in isolation and return output data."}
                  </p>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Key Concepts</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {[
                      { title: 'Foundational Knowledge', desc: 'Understanding the core principles of the domain.' },
                      { title: 'Strategic Planning', desc: 'How to map out your architecture effectively.' },
                      { title: 'Resource Efficiency', desc: 'Optimizing inputs for maximum scalability.' },
                      { title: 'Performance Metrics', desc: 'Tracking success via key performance indicators.' }
                    ].map((item, i) => (
                      <div key={i} style={{ padding: '24px', borderRadius: '20px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fef2f2', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon name="check" size={10} color="#ef4444" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{item.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab !== 'Summary' && (
                <div style={{ padding: '40px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#94a3b8' }}>
                   No {activeTab.toLowerCase()} attached to this lesson yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* RIGHT COLUMN: PROGRESS & CONTENT */}
        <aside>
          {/* Study Progress Card */}
          <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
               <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="6" 
                    strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * progress) / 100}
                    strokeLinecap="round" transform="rotate(-90 40 40)"
                  />
               </svg>
               <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{progress}%</span>
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Study Progress</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>Track your learning milestones and where you left off.</div>
            </div>
          </div>

          {/* Module List (Days Structure) */}
          <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Day Schedule</div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }} className="custom-scrollbar">
              {days.map((day, dIdx) => (
                <div key={dIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                   <button 
                     onClick={() => toggleWeek(dIdx)}
                     style={{ 
                       width: '100%', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', 
                       alignItems: 'center', background: '#f8fafc', border: 'none', cursor: 'pointer' 
                     }}
                   >
                     <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>{day.title}</span>
                     <Icon name={expandedWeeks.has(dIdx) ? "chevronUp" : "chevronDown"} size={14} color="#64748b" />
                   </button>
                   
                   <AnimatePresence>
                     {expandedWeeks.has(dIdx) && (
                       <motion.div 
                         initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                         style={{ overflow: 'hidden' }}
                       >
                         {day.items.map((m, i) => {
                           const actualIdx = day.startIdx + i;
                           const isActive = activeModuleIdx === actualIdx;
                           const isCompleted = completedLessons.has(m._id);
                           return (
                             <button 
                               key={m._id} 
                               onClick={() => setActiveModuleIdx(actualIdx)}
                               style={{ 
                                 width: '100%', display: 'flex', alignItems: 'center', gap: '16px', 
                                 padding: '16px 24px', background: isActive ? '#fef2f2' : 'transparent',
                                 border: 'none', borderBottom: i === day.items.length - 1 ? 'none' : '1px solid #f1f5f9', textAlign: 'left',
                                 cursor: 'pointer', transition: 'all 0.2s',
                               }}
                             >
                               <div style={{ 
                                 width: '28px', height: '28px', borderRadius: '50%', 
                                 background: isCompleted ? '#22c55e' : (isActive ? '#ef4444' : '#f8fafc'), 
                                 color: isCompleted || isActive ? '#fff' : '#94a3b8',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                                 fontSize: '0.75rem', fontWeight: 800, flexShrink: 0
                               }}>
                                 {isCompleted ? <Icon name="check" size={12} color="#fff" /> : actualIdx + 1}
                               </div>
                               <div style={{ flex: 1 }}>
                                 <div style={{ fontSize: '0.8rem', fontWeight: isActive ? 800 : 800, color: isActive ? '#ef4444' : '#1e293b', marginBottom: '2px' }}>{m.title}</div>
                                 <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                                    {isActive ? "Currently Playing" : "Session class"}
                                 </div>
                               </div>
                               {isCompleted && (
                                 <div style={{ color: '#22c55e' }}>
                                    <Icon name="checkCircle" size={16} />
                                 </div>
                               )}
                             </button>
                           );
                         })}
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>

      {/* ── FOOTER ACTIONS ── */}
      <footer style={{ 
        maxWidth: '1400px', margin: '3rem auto 0', padding: '1.5rem 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
         <button 
           disabled={activeModuleIdx === 0}
           onClick={() => {
             const prevIdx = activeModuleIdx - 1;
             setActiveModuleIdx(prevIdx);
             // Find which day this index belongs to
             const dIdx = days.findIndex(d => prevIdx >= d.startIdx && prevIdx < d.startIdx + d.items.length);
             if (dIdx !== -1) {
               const newExpanded = new Set(expandedWeeks);
               newExpanded.add(dIdx);
               setExpandedWeeks(newExpanded);
             }
           }}
           style={{ background: 'none', border: 'none', color: activeModuleIdx === 0 ? '#cbd5e1' : '#475569', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
         >
           <Icon name="chevronLeft" size={16} /> PREVIOUS
         </button>
         <button 
           onClick={handleLessonComplete}
           style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
         >
           COMPLETE & NEXT
         </button>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

    </div>
  );
}
