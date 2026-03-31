'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Inline SVG icon helpers ── */
function LessonIcon({ type, size = 16, color = 'currentColor' }) {
  const props = { width: size, height: size, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' };
  switch (type) {
    case 'video':
      return <svg {...props}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    case 'reading':
      return <svg {...props}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
    case 'assignment':
      return <svg {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
    case 'quiz':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case 'live_session':
      return <svg {...props}><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
  }
}

/* ── Small reusable SVGs ── */
const ChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
);
const ChevronLeft = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevronRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
);
const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
);
const LockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
);
const MenuIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
const XIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const ArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);

export default function CourseLearnPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonDetail, setLessonDetail] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuiz, setShowQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const videoRef = useRef(null);
  const activeLessonRef = useRef(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}`);
    if (error) {
      if (error.status === 401) router.push('/login');
      setLoading(false);
      return;
    }
    setDashboard(data);
    if (data?.modules?.length) {
      const firstUnlocked = data.modules.find(m => m.isUnlocked);
      if (firstUnlocked) {
        setExpandedModules(prev => ({ ...prev, [firstUnlocked._id]: true }));
        if (!selectedModule) setSelectedModule(firstUnlocked._id);
      }
    }
    setLoading(false);
  }, [courseId, router, selectedModule]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  useEffect(() => {
    if (activeLessonRef.current) activeLessonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeLesson]);

  const toggleModule = modId => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
    setSelectedModule(modId);
  };

  const openLesson = async lessonId => {
    setLessonLoading(true);
    setQuizResult(null);
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}/lesson/${lessonId}`);
    if (error) { alert(error.message || 'Cannot access lesson'); setLessonLoading(false); return; }
    setLessonDetail(data);
    setActiveLesson(lessonId);
    setLessonLoading(false);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const markComplete = async lessonId => {
    const { error } = await apiPost(`/api/v1/learn/${courseId}/lesson/${lessonId}/complete`);
    if (error) return;
    loadDashboard();
  };

  const openQuiz = async moduleId => {
    setQuizLoading(true);
    setQuizResult(null);
    setQuizAnswers({});
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}/module/${moduleId}/quiz`);
    if (error) { alert(error.message || 'Quiz not available'); setQuizLoading(false); return; }
    setQuizData(data);
    setShowQuiz(moduleId);
    setQuizLoading(false);
  };

  const submitQuiz = async () => {
    if (!showQuiz || !quizData) return;
    setQuizLoading(true);
    const answers = quizData.questions.map((_, qi) => quizAnswers[qi] ?? -1);
    const { data, error } = await apiPost(`/api/v1/learn/${courseId}/module/${showQuiz}/quiz`, { answers });
    if (error) { alert(error.message); setQuizLoading(false); return; }
    setQuizResult(data);
    setQuizLoading(false);
    loadDashboard();
  };

  /* ═══════ SIDEBAR CONTENT ═══════ */
  const SidebarContent = ({ modules, overallProgress, isPreStart = false }) => (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Header */}
      <div style={{ padding:'1.5rem 1.25rem', borderBottom:'1px solid #f0e8e0' }}>
        <Link href="/dashboard/my-courses" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'0.75rem', color:'#7A1F2B', fontWeight:600, textDecoration:'none', marginBottom:12, transition:'opacity 0.2s' }}>
          <ChevronLeft size={14} color="#7A1F2B" /> My Courses
        </Link>
        <h2 style={{ fontSize:'0.95rem', fontWeight:800, color:'#1a1a1a', lineHeight:1.4, margin:'0 0 1rem' }}>
          {dashboard.course?.title}
        </h2>
        <div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:'0.7rem', fontWeight:700, color:'#888', textTransform:'uppercase', letterSpacing:'0.05em' }}>Your Progress</span>
            <span style={{ fontSize:'0.8rem', fontWeight:800, color:'#7A1F2B' }}>{overallProgress}%</span>
          </div>
          <div style={{ height:6, background:'#f0e8e0', borderRadius:999, overflow:'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${overallProgress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height:'100%', background:'linear-gradient(90deg, #7A1F2B, #C5975B)', borderRadius:999 }} />
          </div>
        </div>
      </div>

      {/* Module list */}
      <div style={{ flex:1, overflowY:'auto', paddingBottom:24 }}>
        {modules.map((mod, modIndex) => {
          const isLocked = !mod.isUnlocked;
          const isExpanded = !!expandedModules[mod._id];
          const completedCount = (mod.lessons || []).filter(l => l.isCompleted).length;
          const totalCount = (mod.lessons || []).length;
          const isActive = selectedModule === mod._id && !isLocked;

          return (
            <div key={mod._id} style={{ borderBottom:'1px solid #f5f0eb' }}>
              <button onClick={() => !isLocked && toggleModule(mod._id)} style={{
                width:'100%', textAlign:'left', padding:'1rem 1.25rem', display:'flex', alignItems:'flex-start', gap:12,
                background: isActive ? '#fdf8f3' : 'transparent',
                border:'none', cursor: isLocked ? 'not-allowed' : 'pointer', opacity: isLocked ? 0.45 : 1,
                transition:'background 0.2s',
              }}>
                {/* Number circle */}
                <div style={{
                  width:32, height:32, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.72rem', fontWeight:800, flexShrink:0, marginTop:2,
                  background: isLocked ? '#f0f0f0' : mod.progress === 100 ? '#ecfdf5' : '#fdf2f4',
                  color: isLocked ? '#ccc' : mod.progress === 100 ? '#059669' : '#7A1F2B',
                }}>
                  {isLocked ? <LockIcon size={14} color="#ccc" /> : mod.progress === 100 ? <CheckIcon size={14} color="#059669" /> : (mod.moduleNumber || modIndex + 1)}
                </div>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', color:'#aaa' }}>
                      Module {mod.moduleNumber || modIndex + 1}
                    </span>
                    {mod.weekNumber > 0 && <span style={{ fontSize:'0.6rem', color:'#ccc' }}>Week {mod.weekNumber}</span>}
                    {mod.durationHours > 0 && <span style={{ fontSize:'0.6rem', color:'#ccc' }}>{mod.durationHours}h</span>}
                  </div>
                  <p style={{ fontSize:'0.82rem', fontWeight:700, color: isLocked ? '#bbb' : '#333', margin:0, lineHeight:1.4 }}>{mod.title}</p>
                  {!isLocked && totalCount > 0 && (
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                      <div style={{ flex:1, height:3, background:'#f0e8e0', borderRadius:999, overflow:'hidden' }}>
                        <div style={{ height:'100%', background: mod.progress === 100 ? '#059669' : '#7A1F2B', borderRadius:999, width: (mod.progress || 0) + '%', transition:'width 0.5s' }} />
                      </div>
                      <span style={{ fontSize:'0.6rem', color:'#999', fontWeight:700, flexShrink:0 }}>{completedCount}/{totalCount}</span>
                    </div>
                  )}
                </div>

                {!isLocked && (
                  <span style={{ marginTop:4, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.2s', flexShrink:0 }}>
                    <ChevronDown size={15} color="#aaa" />
                  </span>
                )}
              </button>

              {/* Lessons */}
              <AnimatePresence>
                {isExpanded && !isLocked && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
                    <div style={{ paddingBottom:8 }}>
                      {(mod.lessons || []).map(lesson => {
                        const isLessonActive = activeLesson === lesson._id;
                        const isCompleted = lesson.isCompleted;
                        return (
                          <button key={lesson._id} ref={isLessonActive ? activeLessonRef : null}
                            onClick={() => !isPreStart && openLesson(lesson._id)}
                            disabled={isPreStart}
                            style={{
                              width:'100%', textAlign:'left', padding:'0.65rem 1.25rem 0.65rem 2.8rem',
                              display:'flex', alignItems:'flex-start', gap:10, fontSize:'0.82rem',
                              background: isLessonActive ? 'linear-gradient(90deg, rgba(122,31,43,0.06), transparent)' : 'transparent',
                              borderLeft: isLessonActive ? '3px solid #7A1F2B' : '3px solid transparent',
                              border: 'none', borderLeft: isLessonActive ? '3px solid #7A1F2B' : '3px solid transparent',
                              cursor: isPreStart ? 'default' : 'pointer', transition:'all 0.2s',
                            }}>
                            <span style={{
                              width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                              flexShrink:0, marginTop:1,
                              background: isCompleted ? '#059669' : 'transparent',
                              border: isCompleted ? 'none' : isLessonActive ? '2px solid #7A1F2B' : '2px solid #ddd',
                            }}>
                              {isCompleted ? <CheckIcon size={12} color="#fff" /> : <LessonIcon type={lesson.contentType} size={10} color={isLessonActive ? '#7A1F2B' : '#bbb'} />}
                            </span>
                            <div style={{ flex:1, minWidth:0 }}>
                              <p style={{ margin:0, color: isLessonActive ? '#7A1F2B' : isCompleted ? '#999' : '#444', fontWeight: isLessonActive ? 700 : 500, lineHeight:1.4 }}>{lesson.title}</p>
                              {lesson.description && <p style={{ fontSize:'0.65rem', color:'#bbb', margin:'2px 0 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lesson.description}</p>}
                              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                                <span style={{ fontSize:'0.6rem', color:'#bbb', textTransform:'capitalize', display:'flex', alignItems:'center', gap:3 }}>
                                  <LessonIcon type={lesson.contentType} size={10} color="#ccc" />
                                  {(lesson.contentType || 'lesson').replace('_', ' ')}
                                </span>
                                {lesson.durationMinutes > 0 && <span style={{ fontSize:'0.6rem', color:'#ccc' }}>{lesson.durationMinutes} min</span>}
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      {/* Quiz */}
                      {mod.quiz && !isPreStart && (
                        <button onClick={() => openQuiz(mod._id)} style={{
                          width:'100%', textAlign:'left', padding:'0.65rem 1.25rem 0.65rem 2.8rem',
                          display:'flex', alignItems:'center', gap:10, border:'none', background:'transparent', cursor:'pointer',
                        }}>
                          <span style={{
                            width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                            background: mod.quizPassed ? '#059669' : '#fff7ed', border: mod.quizPassed ? 'none' : '2px solid #d97706',
                          }}>
                            {mod.quizPassed ? <CheckIcon size={12} color="#fff" /> : <LessonIcon type="quiz" size={10} color="#d97706" />}
                          </span>
                          <div style={{ flex:1 }}>
                            <p style={{ margin:0, fontSize:'0.82rem', fontWeight:600, color: mod.quizPassed ? '#059669' : '#d97706' }}>{mod.quiz.title || 'Module Quiz'}</p>
                            <p style={{ margin:'2px 0 0', fontSize:'0.6rem', color:'#bbb' }}>{mod.quiz.questionCount} questions · {mod.quizPassed ? 'Passed' : 'Not attempted'}</p>
                          </div>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ═══════ MODULE DETAIL PANEL ═══════ */
  const ModuleDetailPanel = ({ mod, isPreStart = false }) => {
    if (!mod) return null;
    const completedCount = (mod.lessons || []).filter(l => l.isCompleted).length;
    const totalCount = (mod.lessons || []).length;

    return (
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} style={{ maxWidth:780, margin:'0 auto' }}>
        {/* Module header */}
        <div style={{ background:'linear-gradient(135deg, #7A1F2B, #922538)', borderRadius:20, padding:'2rem 2.25rem', marginBottom:24, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, background:'radial-gradient(circle, rgba(197,151,91,0.2) 0%, transparent 70%)', filter:'blur(30px)' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:'0.68rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:'#C5975B', background:'rgba(255,255,255,0.12)', padding:'4px 12px', borderRadius:8 }}>
                Module {mod.moduleNumber}
              </span>
              {mod.weekNumber > 0 && <span style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.08)', padding:'4px 10px', borderRadius:8 }}>Week {mod.weekNumber}</span>}
              {mod.durationHours > 0 && <span style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.08)', padding:'4px 10px', borderRadius:8 }}>{mod.durationHours}h</span>}
            </div>
            <h2 style={{ fontSize:'1.5rem', fontWeight:900, color:'#fff', margin:'0 0 8px', lineHeight:1.3 }}>{mod.title}</h2>
            {mod.description && <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.9rem', lineHeight:1.7, margin:0 }}>{mod.description}</p>}
            {!isPreStart && totalCount > 0 && (
              <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:16 }}>
                <div style={{ flex:1, height:5, background:'rgba(255,255,255,0.15)', borderRadius:999, overflow:'hidden' }}>
                  <div style={{ height:'100%', background:'#C5975B', borderRadius:999, width: (mod.progress || 0) + '%', transition:'width 0.6s' }} />
                </div>
                <span style={{ fontSize:'0.78rem', fontWeight:700, color:'rgba(255,255,255,0.9)' }}>{completedCount}/{totalCount} lessons</span>
              </div>
            )}
          </div>
        </div>

        {/* What You'll Learn */}
        {mod.whatYouLearn?.length > 0 && (
          <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:18, padding:'1.75rem', marginBottom:16 }}>
            <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#1a1a1a', margin:'0 0 1rem', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:32, height:32, borderRadius:10, background:'#ecfdf5', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </span>
              What You&apos;ll Learn
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {mod.whatYouLearn.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <CheckIcon size={16} color="#059669" />
                  <span style={{ fontSize:'0.88rem', color:'#555', lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Activities */}
        {mod.keyActivities?.length > 0 && (
          <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:18, padding:'1.75rem', marginBottom:16 }}>
            <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#1a1a1a', margin:'0 0 1rem', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:32, height:32, borderRadius:10, background:'#fdf2f4', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" fill="none" stroke="#7A1F2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </span>
              Key Activities
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {mod.keyActivities.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, background:'#faf8f5', borderRadius:12, padding:'0.75rem 1rem' }}>
                  <span style={{ width:24, height:24, borderRadius:8, background:'#7A1F2B', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', fontWeight:800, flexShrink:0 }}>{i + 1}</span>
                  <span style={{ fontSize:'0.88rem', color:'#555', lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverable */}
        {mod.deliverable && (
          <div style={{ background:'linear-gradient(135deg, #fffbeb, #fef3c7)', border:'1px solid #fde68a', borderRadius:18, padding:'1.75rem', marginBottom:16 }}>
            <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#92400e', margin:'0 0 8px', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:32, height:32, borderRadius:10, background:'rgba(217,119,6,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </span>
              Deliverable
            </h3>
            <p style={{ fontSize:'0.9rem', fontWeight:700, color:'#78350f', margin:0 }}>{mod.deliverable}</p>
            {mod.deliverableDescription && <p style={{ fontSize:'0.85rem', color:'#92400e', margin:'6px 0 0', opacity:0.8 }}>{mod.deliverableDescription}</p>}
          </div>
        )}

        {/* Lessons */}
        {!isPreStart && totalCount > 0 && (
          <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:18, padding:'1.75rem' }}>
            <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#1a1a1a', margin:'0 0 1rem' }}>Lessons in this Module</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {(mod.lessons || []).map(lesson => (
                <button key={lesson._id} onClick={() => openLesson(lesson._id)} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'0.85rem 1rem', borderRadius:14,
                  background:'#faf8f5', border:'1px solid #f0e8e0', cursor:'pointer', transition:'all 0.2s', textAlign:'left', width:'100%',
                }}>
                  <span style={{
                    width:34, height:34, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                    background: lesson.isCompleted ? '#ecfdf5' : '#fdf2f4',
                  }}>
                    {lesson.isCompleted ? <CheckIcon size={15} color="#059669" /> : <LessonIcon type={lesson.contentType} size={15} color="#7A1F2B" />}
                  </span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:'0.88rem', fontWeight:600, color: lesson.isCompleted ? '#999' : '#333', margin:0 }}>{lesson.title}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:3 }}>
                      <span style={{ fontSize:'0.68rem', color:'#bbb', textTransform:'capitalize' }}>{(lesson.contentType || 'lesson').replace('_', ' ')}</span>
                      {lesson.durationMinutes > 0 && <span style={{ fontSize:'0.68rem', color:'#ccc' }}>{lesson.durationMinutes} min</span>}
                    </div>
                  </div>
                  <ChevronRight size={16} color="#ccc" />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  /* ═══════ CSS ═══════ */
  const pageStyles = `
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes shimmerBg { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }

    .learn-sidebar { scrollbar-width:thin; scrollbar-color:#e0d5c8 transparent; }
    .learn-sidebar::-webkit-scrollbar { width:4px; }
    .learn-sidebar::-webkit-scrollbar-track { background:transparent; }
    .learn-sidebar::-webkit-scrollbar-thumb { background:#e0d5c8; border-radius:999px; }

    .lesson-btn:hover { background:#fdf8f3 !important; border-color:#e0d5c8 !important; transform:translateX(3px); }
    .quiz-opt:hover { border-color:#7A1F2B !important; background:#fdf8f3 !important; }
    .quiz-opt-selected { border-color:#7A1F2B !important; background:#fdf2f4 !important; }

    @media (max-width:768px) {
      .learn-main-grid { grid-template-columns:1fr !important; }
    }
  `;

  /* ═══════ LOADING STATE ═══════ */
  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#faf8f5', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',system-ui,sans-serif" }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ position:'relative', width:48, height:48, margin:'0 auto 16px' }}>
            <div style={{ width:48, height:48, border:'3px solid #f0e8e0', borderRadius:'50%', position:'absolute' }} />
            <div style={{ width:48, height:48, border:'3px solid transparent', borderTopColor:'#7A1F2B', borderRadius:'50%', animation:'spin 0.8s linear infinite', position:'absolute' }} />
          </div>
          <p style={{ color:'#888', fontSize:'0.88rem', fontWeight:600 }}>Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div style={{ minHeight:'100vh', background:'#faf8f5', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',system-ui,sans-serif" }}>
        <div style={{ textAlign:'center', padding:'3rem' }}>
          <div style={{ width:64, height:64, borderRadius:18, background:'#fdf2f4', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <svg width="28" height="28" fill="none" stroke="#7A1F2B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          </div>
          <p style={{ color:'#555', fontSize:'1.1rem', fontWeight:700, margin:'0 0 8px' }}>Unable to load course</p>
          <button onClick={loadDashboard} style={{ padding:'0.6rem 1.5rem', background:'#7A1F2B', color:'#fff', borderRadius:12, border:'none', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', marginTop:12 }}>Try Again</button>
        </div>
      </div>
    );
  }

  /* ═══════ NOT ENROLLED ═══════ */
  if (dashboard.state === 'not_enrolled') {
    return (
      <div style={{ minHeight:'100vh', background:'#faf8f5', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'Inter',system-ui,sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:24, padding:'3rem', maxWidth:480, width:'100%', textAlign:'center', boxShadow:'0 8px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ width:64, height:64, background:'#fdf2f4', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
            <LockIcon size={28} color="#7A1F2B" />
          </div>
          <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', margin:'0 0 8px' }}>{dashboard.course?.title}</h1>
          <p style={{ color:'#888', fontSize:'0.9rem', margin:'0 0 24px' }}>You need to enroll in this course to access the content.</p>
          <p style={{ fontSize:'1.8rem', fontWeight:900, color:'#1a1a1a', margin:'0 0 24px' }}>
            {dashboard.course?.priceInr ? `₹${dashboard.course.priceInr.toLocaleString()}` : 'Free'}
          </p>
          <a href={`/courses/${dashboard.course?.slug || courseId}`} style={{
            display:'inline-flex', alignItems:'center', gap:8, padding:'0.85rem 2rem',
            background:'linear-gradient(135deg, #7A1F2B, #922538)', color:'#fff', borderRadius:14, fontWeight:700, textDecoration:'none',
            fontSize:'0.9rem', boxShadow:'0 6px 20px rgba(122,31,43,0.25)',
          }}>
            View Course & Enroll <ArrowRight size={16} color="#fff" />
          </a>
        </motion.div>
      </div>
    );
  }

  /* ═══════ PRE-START ═══════ */
  if (dashboard.state === 'pre_start') {
    const startDate = dashboard.course?.startDate ? new Date(dashboard.course.startDate) : null;
    const preStartModules = (dashboard.course?.modules || []).map((m, i) => ({ ...m, isUnlocked:false, lessons:[], progress:0, moduleNumber: m.moduleNumber || i + 1 }));

    return (
      <div style={{ display:'flex', minHeight:'100vh', background:'#faf8f5', fontFamily:"'Inter',system-ui,sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ display:'none', position:'fixed', inset:0, background:'rgba(0,0,0,0.3)', zIndex:30 }} className="md-overlay" />}

        {/* Sidebar */}
        <aside className="learn-sidebar" style={{
          width:320, background:'#fff', borderRight:'1px solid #f0e8e0', flexShrink:0, height:'100vh', display:'flex', flexDirection:'column',
          position: sidebarOpen ? 'relative' : 'relative', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition:'transform 0.3s', boxShadow:'2px 0 12px rgba(0,0,0,0.02)',
        }}>
          <SidebarContent modules={preStartModules} overallProgress={0} isPreStart />
        </aside>

        {/* Main */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
          {/* Top bar */}
          <div style={{ background:'#fff', borderBottom:'1px solid #f0e8e0', padding:'0.75rem 1.25rem', display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:20 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
              <MenuIcon size={20} color="#888" />
            </button>
            <span style={{ fontSize:'0.85rem', fontWeight:700, color:'#555' }}>Course Preview</span>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'2rem' }}>
            <div style={{ maxWidth:780, margin:'0 auto' }}>
              {/* Welcome banner */}
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                style={{ background:'linear-gradient(135deg, #7A1F2B, #922538)', borderRadius:20, padding:'2rem 2.25rem', marginBottom:24, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-30, right:-30, width:150, height:150, background:'radial-gradient(circle, rgba(197,151,91,0.25) 0%, transparent 70%)', filter:'blur(30px)' }} />
                <div style={{ position:'relative', zIndex:1 }}>
                  <h1 style={{ fontSize:'1.6rem', fontWeight:900, color:'#fff', margin:'0 0 8px' }}>Welcome! You&apos;re Enrolled</h1>
                  <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.9rem', margin:'0 0 20px', lineHeight:1.6 }}>
                    {dashboard.course?.preStartMessage || 'The course will begin shortly. Stay tuned!'}
                  </p>
                  {startDate && (
                    <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:14, padding:'0.7rem 1.2rem', backdropFilter:'blur(8px)' }}>
                      <svg width="18" height="18" fill="none" stroke="#C5975B" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      <div>
                        <p style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, margin:0 }}>Starts on</p>
                        <p style={{ color:'#fff', fontWeight:800, fontSize:'0.88rem', margin:0 }}>
                          {startDate.toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Stats */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:24 }}>
                {[
                  { label:'Modules', value: dashboard.course?.totalModules || preStartModules.length, color:'#7A1F2B', bg:'#fdf2f4' },
                  { label:'Duration', value: `${dashboard.course?.durationWeeks || 0} wk`, color:'#059669', bg:'#ecfdf5' },
                  { label:'Level', value: dashboard.course?.difficultyLevel || 'Beginner', color:'#d97706', bg:'#fffbeb' },
                  { label:'Language', value: dashboard.course?.language || 'English', color:'#7c3aed', bg:'#f5f3ff' },
                ].map((s, i) => (
                  <div key={i} style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:16, padding:'1.15rem', textAlign:'center' }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px' }}>
                      <span style={{ fontSize:'0.82rem', fontWeight:900, color:s.color }}>{typeof s.value === 'number' ? s.value : s.value.charAt(0).toUpperCase()}</span>
                    </div>
                    <p style={{ fontSize:'0.85rem', fontWeight:800, color:'#333', margin:'0 0 2px', textTransform:'capitalize' }}>{s.value}</p>
                    <p style={{ fontSize:'0.65rem', color:'#aaa', margin:0, fontWeight:600 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* About */}
              {dashboard.course?.description && (
                <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:18, padding:'1.75rem', marginBottom:24 }}>
                  <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#1a1a1a', margin:'0 0 12px' }}>About This Course</h3>
                  <p style={{ color:'#666', fontSize:'0.9rem', lineHeight:1.7, margin:0, whiteSpace:'pre-wrap' }}>{dashboard.course.description}</p>
                </div>
              )}

              <div style={{ textAlign:'center', paddingTop:8 }}>
                <Link href="/dashboard/my-courses" style={{ color:'#7A1F2B', fontWeight:700, fontSize:'0.88rem', textDecoration:'none' }}>
                  <ChevronLeft size={14} color="#7A1F2B" /> Back to My Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════ ACTIVE LEARNING ═══════ */
  const { modules = [], progress = {} } = dashboard;
  const overallProgress = progress.percentage || 0;
  const currentModule = modules.find(m => m._id === selectedModule) || modules.find(m => m.isUnlocked) || modules[0];

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#faf8f5', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      {/* Mobile overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.25)', zIndex:30, display:'block' }} />}

      {/* Sidebar */}
      <aside className="learn-sidebar" style={{
        width:320, background:'#fff', borderRight:'1px solid #f0e8e0', flexShrink:0, height:'100vh',
        display:'flex', flexDirection:'column', position:'sticky', top:0,
        boxShadow:'2px 0 12px rgba(0,0,0,0.02)',
        overflowY:'auto',
      }}>
        <SidebarContent modules={modules} overallProgress={overallProgress} />
      </aside>

      {/* Main content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Top bar */}
        <div style={{
          background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid #f0e8e0',
          padding:'0.75rem 1.5rem', display:'flex', alignItems:'center', gap:12,
          position:'sticky', top:0, zIndex:20,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:8 }}>
            <MenuIcon size={20} color="#888" />
          </button>
          {lessonDetail ? (
            <div style={{ display:'flex', alignItems:'center', gap:10, flex:1, minWidth:0 }}>
              <span style={{ width:28, height:28, borderRadius:8, background:'#fdf2f4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <LessonIcon type={lessonDetail.lesson?.contentType} size={14} color="#7A1F2B" />
              </span>
              <span style={{ fontSize:'0.88rem', fontWeight:700, color:'#333', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lessonDetail.lesson?.title}</span>
              {lessonDetail.isCompleted && (
                <span style={{ marginLeft:'auto', fontSize:'0.65rem', fontWeight:700, background:'#ecfdf5', color:'#059669', padding:'4px 10px', borderRadius:999, flexShrink:0 }}>Completed</span>
              )}
            </div>
          ) : (
            <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#888' }}>{currentModule?.title || 'Select a lesson'}</span>
          )}
        </div>

        {/* Content area */}
        <div style={{ flex:1, overflowY:'auto', padding:'2rem 2.5rem' }}>
          {lessonLoading ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh', gap:16 }}>
              <div style={{ position:'relative', width:40, height:40 }}>
                <div style={{ width:40, height:40, border:'3px solid #f0e8e0', borderRadius:'50%', position:'absolute' }} />
                <div style={{ width:40, height:40, border:'3px solid transparent', borderTopColor:'#7A1F2B', borderRadius:'50%', animation:'spin 0.8s linear infinite', position:'absolute' }} />
              </div>
              <p style={{ color:'#888', fontSize:'0.85rem', fontWeight:600 }}>Loading lesson...</p>
            </div>
          ) : lessonDetail ? (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ maxWidth:860, margin:'0 auto' }}>
              {/* Video player */}
              {lessonDetail.lesson?.videoUrl ? (
                <div style={{ borderRadius:18, overflow:'hidden', background:'#111', boxShadow:'0 12px 40px rgba(0,0,0,0.12)', border:'1px solid #e5e0da' }}>
                  <video ref={videoRef} src={lessonDetail.lesson.videoUrl} controls
                    onEnded={() => markComplete(lessonDetail.lesson._id)}
                    style={{ width:'100%', display:'block' }} controlsList="nodownload" />
                </div>
              ) : lessonDetail.lesson?.readingContent ? (
                <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:20, padding:'2.5rem', boxShadow:'0 4px 16px rgba(0,0,0,0.03)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:'0.68rem', fontWeight:700, color:'#7A1F2B', background:'#fdf2f4', padding:'3px 10px', borderRadius:6, textTransform:'capitalize' }}>
                      {(lessonDetail.lesson.contentType || 'reading').replace('_', ' ')}
                    </span>
                    {lessonDetail.lesson.durationMinutes > 0 && (
                      <span style={{ fontSize:'0.68rem', color:'#aaa' }}>{lessonDetail.lesson.durationMinutes} min read</span>
                    )}
                  </div>
                  <h2 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', margin:'0 0 24px', lineHeight:1.3 }}>{lessonDetail.lesson.title}</h2>
                  <div style={{ color:'#555', lineHeight:1.8, fontSize:'0.95rem', whiteSpace:'pre-wrap' }}>
                    {lessonDetail.lesson.readingContent}
                  </div>
                </div>
              ) : (
                <div style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:20, padding:'3rem', textAlign:'center' }}>
                  <div style={{ width:64, height:64, borderRadius:18, background:'#f5f0eb', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                    <LessonIcon type="reading" size={28} color="#ccc" />
                  </div>
                  <p style={{ color:'#999', fontWeight:600 }}>No content available for this lesson yet.</p>
                </div>
              )}

              {/* Lesson description */}
              {lessonDetail.lesson?.description && (
                <div style={{ marginTop:20, background:'#fff', border:'1px solid #f0e8e0', borderRadius:14, padding:'1.25rem 1.5rem' }}>
                  <p style={{ color:'#777', fontSize:'0.9rem', lineHeight:1.7, margin:0 }}>{lessonDetail.lesson.description}</p>
                </div>
              )}

              {/* Actions */}
              <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                {!lessonDetail.isCompleted ? (
                  <button onClick={() => { markComplete(lessonDetail.lesson._id); setLessonDetail({ ...lessonDetail, isCompleted:true }); }}
                    style={{
                      display:'flex', alignItems:'center', gap:8, padding:'0.75rem 1.5rem',
                      background:'linear-gradient(135deg, #059669, #10b981)', color:'#fff', borderRadius:14,
                      border:'none', fontWeight:700, fontSize:'0.88rem', cursor:'pointer',
                      boxShadow:'0 6px 20px rgba(5,150,105,0.25)', transition:'all 0.2s',
                    }}>
                    <CheckIcon size={16} color="#fff" /> Mark as Complete
                  </button>
                ) : (
                  <span style={{ display:'flex', alignItems:'center', gap:8, padding:'0.75rem 1.5rem', background:'#ecfdf5', color:'#059669', borderRadius:14, fontWeight:700, fontSize:'0.88rem', border:'1px solid #bbf7d0' }}>
                    <CheckIcon size={16} color="#059669" /> Completed
                  </span>
                )}
                <button onClick={() => { setLessonDetail(null); setActiveLesson(null); }}
                  style={{ padding:'0.75rem 1.2rem', background:'none', border:'none', color:'#7A1F2B', fontWeight:700, fontSize:'0.85rem', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                  <ChevronLeft size={14} color="#7A1F2B" /> Back to Module
                </button>
              </div>
            </motion.div>
          ) : currentModule ? (
            <ModuleDetailPanel mod={currentModule} />
          ) : (
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh' }}>
              <div style={{ width:64, height:64, borderRadius:18, background:'#f5f0eb', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                <LessonIcon type="reading" size={28} color="#ccc" />
              </div>
              <p style={{ color:'#555', fontSize:'1rem', fontWeight:700, margin:'0 0 4px' }}>Select a module to explore</p>
              <p style={{ color:'#aaa', fontSize:'0.85rem' }}>Click on a module in the sidebar to see its details</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ═══════ QUIZ MODAL ═══════ */}
      <AnimatePresence>
        {showQuiz && quizData && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => { setShowQuiz(null); setQuizData(null); setQuizResult(null); }}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:20 }}>
            <motion.div initial={{ opacity:0, scale:0.95, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95, y:20 }}
              onClick={e => e.stopPropagation()}
              style={{ background:'#fff', border:'1px solid #f0e8e0', borderRadius:24, padding:'2rem', maxWidth:560, width:'100%', maxHeight:'85vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.1)' }}>

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
                <div>
                  <p style={{ fontSize:'0.65rem', color:'#7A1F2B', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 4px' }}>Module Quiz</p>
                  <h2 style={{ fontSize:'1.15rem', fontWeight:900, color:'#1a1a1a', margin:0 }}>{quizData.title || 'Module Quiz'}</h2>
                </div>
                <button onClick={() => { setShowQuiz(null); setQuizData(null); setQuizResult(null); }}
                  style={{ background:'#f5f0eb', border:'none', padding:8, borderRadius:10, cursor:'pointer' }}>
                  <XIcon size={18} color="#888" />
                </button>
              </div>

              {quizResult ? (
                <div style={{ textAlign:'center', padding:'2rem 0' }}>
                  <div style={{
                    width:80, height:80, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                    margin:'0 auto 20px',
                    background: quizResult.passed ? '#ecfdf5' : '#fef2f2',
                  }}>
                    {quizResult.passed
                      ? <svg width="36" height="36" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <svg width="36" height="36" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    }
                  </div>
                  <h3 style={{ fontSize:'1.5rem', fontWeight:900, color: quizResult.passed ? '#059669' : '#ef4444', margin:'0 0 8px' }}>
                    {quizResult.passed ? 'Congratulations!' : 'Not Quite There'}
                  </h3>
                  <p style={{ fontSize:'1.1rem', fontWeight:700, color:'#333', margin:'0 0 4px' }}>Score: {quizResult.score}/{quizResult.totalQuestions}</p>
                  <p style={{ color:'#888', margin:'0 0 24px' }}>{quizResult.percentage}% (Passing: {quizData.passingScore || 70}%)</p>
                  {!quizResult.passed && (
                    <button onClick={() => { setQuizResult(null); setQuizAnswers({}); }}
                      style={{ padding:'0.75rem 2rem', background:'linear-gradient(135deg, #7A1F2B, #922538)', color:'#fff', borderRadius:14, border:'none', fontWeight:700, fontSize:'0.88rem', cursor:'pointer', boxShadow:'0 6px 20px rgba(122,31,43,0.2)' }}>
                      Retry Quiz
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20, fontSize:'0.75rem', color:'#999' }}>
                    <span>{quizData.questions?.length || 0} questions</span>
                    <span style={{ color:'#ddd' }}>|</span>
                    <span>Passing: {quizData.passingScore || 70}%</span>
                  </div>

                  {quizData.questions?.map((q, qi) => (
                    <div key={qi} style={{ marginBottom:20, padding:'1.25rem', background:'#faf8f5', borderRadius:16, border:'1px solid #f0e8e0' }}>
                      <p style={{ fontWeight:700, color:'#333', fontSize:'0.9rem', margin:'0 0 12px' }}>
                        <span style={{ color:'#7A1F2B', marginRight:6 }}>Q{qi + 1}.</span>
                        {q.question}
                      </p>
                      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                        {q.options?.map((opt, oi) => (
                          <button key={oi}
                            className={`quiz-opt ${quizAnswers[qi] === oi ? 'quiz-opt-selected' : ''}`}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            style={{
                              display:'flex', alignItems:'center', gap:10, padding:'0.7rem 1rem',
                              borderRadius:12, border: quizAnswers[qi] === oi ? '2px solid #7A1F2B' : '2px solid #eee',
                              background: quizAnswers[qi] === oi ? '#fdf2f4' : '#fff',
                              cursor:'pointer', textAlign:'left', transition:'all 0.15s', fontSize:'0.85rem', color:'#444',
                            }}>
                            <span style={{
                              width:22, height:22, borderRadius:'50%', border: quizAnswers[qi] === oi ? '2px solid #7A1F2B' : '2px solid #ddd',
                              background: quizAnswers[qi] === oi ? '#7A1F2B' : 'transparent',
                              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                            }}>
                              {quizAnswers[qi] === oi && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }} />}
                            </span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button onClick={submitQuiz} disabled={quizLoading}
                    style={{
                      width:'100%', padding:'0.85rem', background:'linear-gradient(135deg, #7A1F2B, #922538)',
                      color:'#fff', borderRadius:14, border:'none', fontWeight:700, fontSize:'0.9rem',
                      cursor: quizLoading ? 'not-allowed' : 'pointer', opacity: quizLoading ? 0.7 : 1,
                      boxShadow:'0 6px 20px rgba(122,31,43,0.2)', marginTop:8,
                    }}>
                    {quizLoading ? 'Submitting...' : 'Submit Quiz'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
