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
    <div className="modern-learn-player custom-scrollbar">
      
      {/* ── TOP HEADER: BACK BUTTON & COURSETITLE ── */}
      <header className="learn-header">
        <div className="learn-header-main">
          <button 
            onClick={() => router.back()}
            className="learn-back-btn"
          >
            <Icon name="chevronLeft" size={16} color="#ef4444" /> BACK TO LEARNING
          </button>
          <h1 className="learn-course-title">{course.title}</h1>
          <div className="learn-meta-row">
             <span className="learn-meta-item"><Icon name="user" size={14} /> Beginner</span>
             <span className="learn-meta-item"><Icon name="book" size={14} /> {modules.length} Lessons</span>
             <span className="learn-meta-item"><Icon name="clock" size={14} /> 3h 45min</span>
          </div>
        </div>
        <div className="learn-header-actions">
           <button className="learn-action-btn secondary">
             <Icon name="bookmark" size={16} /> Save
           </button>
           <button className="learn-action-btn primary">
             <Icon name="rocket" size={16} color="#fff" /> Share
           </button>
        </div>
      </header>

      {/* ── MAIN GRID LAYOUT ── */}
      <div className="learn-main-container">
        
        {/* LEFT COLUMN: PLAYER & CONTENT */}
        <section className="learn-video-column">
          {/* Video Area */}
          <div className="learn-video-wrapper">
            <img src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"} alt="Thumbnail" className="learn-video-thumb" />
            <div className="learn-play-btn">
              <Icon name="play" size={32} />
            </div>
            
            {/* Custom Controls Mock */}
            <div className="learn-video-controls">
                <Icon name="play" size={20} color="#fff" />
                <div className="learn-progress-bar">
                   <div style={{ width: (activeModuleIdx / modules.length * 100) + '%', height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                </div>
                <span className="learn-video-time">{(activeModuleIdx + 1) * 3}:00 / {modules.length * 3}:00</span>
                <Icon name="settings" size={18} color="#fff" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="learn-tabs-row">
            {['Summary', 'Files', 'Resources', 'Q&A'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`learn-tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {activeTab === 'Summary' && (
                <div className="learn-tab-content">
                  <h3 className="learn-content-title">Lesson Recap</h3>
                  <p className="learn-content-desc">
                    {activeModule?.description || "In this lesson, we explored the fundamental building blocks of this program. We learned that components are independent and reusable bits of code. They serve the same purpose as functions but work in isolation and return output data."}
                  </p>

                  <h3 className="learn-content-title">Key Concepts</h3>
                  <div className="learn-concepts-grid">
                    {[
                      { title: 'Foundational Knowledge', desc: 'Understanding the core principles of the domain.' },
                      { title: 'Strategic Planning', desc: 'How to map out your architecture effectively.' },
                      { title: 'Resource Efficiency', desc: 'Optimizing inputs for maximum scalability.' },
                      { title: 'Performance Metrics', desc: 'Tracking success via key performance indicators.' }
                    ].map((item, i) => (
                      <div key={i} className="concept-card">
                        <div className="concept-icon">
                          <Icon name="check" size={10} color="#ef4444" />
                        </div>
                        <div>
                          <div className="concept-title">{item.title}</div>
                          <div className="concept-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab !== 'Summary' && (
                <div className="learn-empty-tab">
                   No {activeTab.toLowerCase()} attached to this lesson yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* RIGHT COLUMN: PROGRESS & CONTENT */}
        <aside className="learn-sidebar">
          {/* Study Progress Card */}
          <div className="learn-progress-card">
            <div className="learn-progress-circle">
               <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="6" 
                    strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * progress) / 100}
                    strokeLinecap="round" transform="rotate(-90 40 40)"
                  />
               </svg>
               <span className="learn-progress-percent">{progress}%</span>
            </div>
            <div>
              <div className="learn-progress-title">Study Progress</div>
              <div className="learn-progress-subtitle">Track your learning milestones and where you left off.</div>
            </div>
          </div>

          {/* Module List (Days Structure) */}
          <div className="learn-schedule-card">
            <div className="learn-schedule-header">Day Schedule</div>
            <div className="learn-schedule-list custom-scrollbar">
              {days.map((day, dIdx) => (
                <div key={dIdx} className="learn-schedule-day">
                   <button 
                     onClick={() => toggleWeek(dIdx)}
                     className="learn-day-toggle"
                   >
                     <span className="learn-day-title">{day.title}</span>
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
                               className={`learn-lesson-btn ${isActive ? 'active' : ''}`}
                             >
                               <div className={`lesson-status-icon ${isCompleted ? 'completed' : (isActive ? 'active' : '')}`}>
                                 {isCompleted ? <Icon name="check" size={12} color="#fff" /> : actualIdx + 1}
                               </div>
                               <div style={{ flex: 1 }}>
                                 <div className={`lesson-title ${isActive ? 'active' : ''}`}>{m.title}</div>
                                 <div className="lesson-subtitle">
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
      <footer className="learn-footer">
         <button 
           disabled={activeModuleIdx === 0}
           onClick={() => {
             const prevIdx = activeModuleIdx - 1;
             setActiveModuleIdx(prevIdx);
             const dIdx = days.findIndex(d => prevIdx >= d.startIdx && prevIdx < d.startIdx + d.items.length);
             if (dIdx !== -1) {
               const newExpanded = new Set(expandedWeeks);
               newExpanded.add(dIdx);
               setExpandedWeeks(newExpanded);
             }
           }}
           className="learn-nav-btn"
         >
           <Icon name="chevronLeft" size={16} /> PREVIOUS
         </button>
         <button 
           onClick={handleLessonComplete}
           className="learn-complete-btn"
         >
           COMPLETE & NEXT
         </button>
      </footer>

      <style jsx global>{`
        .modern-learn-player { min-height: 100vh; background: #f8fafc; font-family: 'Poppins', sans-serif; padding: 2.5rem 2rem; overflow-x: hidden; }
        .learn-header { max-width: 1400px; margin: 0 auto 2.5rem; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; }
        .learn-back-btn { background: none; border: none; padding: 0; display: flex; align-items: center; gap: 8px; fontSize: 0.85rem; fontWeight: 800; color: #ef4444; cursor: pointer; transition: all 0.25s; margin-bottom: 8px; }
        .learn-back-btn:hover { transform: translateX(-4px); }
        .learn-course-title { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; }
        .learn-meta-row { display: flex; align-items: center; gap: 20px; font-size: 0.85rem; color: #64748b; font-weight: 500; margin-top: 8px; }
        .learn-meta-item { display: flex; align-items: center; gap: 6px; }
        .learn-header-actions { display: flex; gap: 12px; }
        .learn-action-btn { border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; transition: all 0.2s; padding: 10px 20px; }
        .learn-action-btn.secondary { background: #fff; border: 1px solid #e2e8f0; color: #475569; }
        .learn-action-btn.primary { background: #ef4444; border: none; color: #fff; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2); }
        
        .learn-main-container { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 380px; gap: 2.5rem; }
        .learn-video-wrapper { width: 100%; aspect-ratio: 16/9; background: #0f172a; border-radius: 24px; position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); margin-bottom: 2rem; }
        .learn-video-thumb { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .learn-play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; border-radius: 50%; background: #fff; color: #ef4444; display: flex; align-items: center; justify-content: center; cursor: pointer; boxShadow: 0 10px 30px rgba(0,0,0,0.3); }
        .learn-video-controls { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); display: flex; align-items: center; gap: 20px; }
        .learn-progress-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; position: relative; }
        .learn-video-time { color: #fff; font-size: 0.75rem; font-weight: 600; min-width: 80px; }

        .learn-tabs-row { display: flex; gap: 32px; border-bottom: 1px solid #e2e8f0; margin-bottom: 2rem; }
        .learn-tab-btn { padding: 12px 0; background: none; border: none; color: #94a3b8; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; }
        .learn-tab-btn.active { color: #0f172a; border-bottom: 2px solid #ef4444; }
        .learn-content-title { fontSize: 1.25rem; fontWeight: 800; color: #0f172a; margin-bottom: 16px; margin-top: 0; }
        .learn-content-desc { color: #475569; lineHeight: 1.8; fontSize: 0.95rem; marginBottom: 2.5rem; }
        .learn-concepts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .concept-card { padding: 24px; border-radius: 20px; background: #fff; border: 1px solid #e2e8f0; display: flex; gap: 16px; }
        .concept-icon { width: 20px; height: 20px; border-radius: 50%; background: #fef2f2; border: 1px solid #ef4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .concept-title { fontSize: 0.9rem; fontWeight: 700; color: #1e293b; marginBottom: 4px; }
        .concept-desc { fontSize: 0.8rem; color: #64748b; lineHeight: 1.5; }
        .learn-empty-tab { padding: 40px; background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; textAlign: center; color: #94a3b8; }

        .learn-progress-card { padding: 24px; background: #fff; borderRadius: 24px; border: 1px solid #e2e8f0; marginBottom: 2rem; display: flex; alignItems: center; gap: 20px; }
        .learn-progress-circle { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
        .learn-progress-percent { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); fontSize: 0.9rem; fontWeight: 800; color: #0f172a; }
        .learn-progress-title { fontSize: 0.95rem; fontWeight: 800; color: #0f172a; marginBottom: 4px; }
        .learn-progress-subtitle { fontSize: 0.8rem; color: #64748b; lineHeight: 1.4; }

        .learn-schedule-card { background: #fff; borderRadius: 24px; border: 1px solid #e2e8f0; overflow: hidden; }
        .learn-schedule-header { padding: 24px; border-bottom: 1px solid #f1f5f9; fontSize: 1rem; fontWeight: 800; color: #0f172a; }
        .learn-schedule-list { max-height: 600px; overflow-y: auto; }
        .learn-day-toggle { width: 100%; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: none; cursor: pointer; }
        .learn-day-title { fontSize: 0.9rem; fontWeight: 800; color: #1e293b; }
        .learn-lesson-btn { width: 100%; display: flex; align-items: center; gap: 16px; padding: 16px 24px; background: transparent; border: none; borderBottom: 1px solid #f1f5f9; textAlign: left; cursor: pointer; transition: all 0.2s; }
        .learn-lesson-btn.active { background: #fef2f2; }
        .lesson-status-icon { width: 28px; height: 28px; border-radius: 50%; background: #f8fafc; color: #94a3b8; display: flex; align-items: center; justify-content: center; fontSize: 0.75rem; fontWeight: 800; flexShrink: 0; }
        .lesson-status-icon.active { background: #ef4444; color: #fff; }
        .lesson-status-icon.completed { background: #22c55e; color: #fff; }
        .lesson-title { fontSize: 0.8rem; fontWeight: 800; color: #1e293b; marginBottom: 2px; }
        .lesson-title.active { color: #ef4444; }
        .lesson-subtitle { fontSize: 0.7rem; color: #94a3b8; fontWeight: 500; }

        .learn-footer { max-width: 1400px; margin: 3rem auto 0; padding: 1.5rem 0; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; position: sticky; bottom: 0; background: #f8fafc; z-index: 10; }
        .learn-nav-btn { background: none; border: none; color: #475569; fontWeight: 700; cursor: pointer; display: flex; alignItems: center; gap: 8px; font-family: inherit; }
        .learn-nav-btn:disabled { color: #cbd5e1; cursor: not-allowed; }
        .learn-complete-btn { background: #0f172a; color: #fff; border: none; padding: 14px 32px; border-radius: 16px; fontWeight: 800; cursor: pointer; boxShadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.2s; }
        .learn-complete-btn:hover { transform: translateY(-2px); background: #1e293b; }
        .learn-complete-btn:active { transform: translateY(0); }

        @media (max-width: 1060px) {
          .modern-learn-player { padding: 1.5rem 20px 8rem; }
          .learn-header { flex-direction: column; align-items: flex-start; margin-bottom: 1.5rem; }
          .learn-header-actions { width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
          .learn-main-container { grid-template-columns: 1fr; gap: 2rem; }
          .learn-footer { position: fixed; bottom: 0; left: 0; right: 0; padding: 1rem 20px; background: rgba(248, 250, 252, 0.95); backdrop-filter: blur(10px); margin-top: 0; box-shadow: 0 -10px 30px rgba(0,0,0,0.05); }
          .learn-course-title { font-size: 1.4rem; }
          .learn-video-wrapper { border-radius: 16px; }
          .learn-concepts-grid { grid-template-columns: 1fr; }
          .learn-sidebar { order: 2; }
          .learn-video-column { order: 1; }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
