'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════ SVG ICONS ═══════ */
function LessonIcon({ type, size = 16, color = 'currentColor' }) {
  const p = {
    width: size,
    height: size,
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
  };
  switch (type) {
    case 'video':
      return (
        <svg {...p}>
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      );
    case 'reading':
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case 'assignment':
      return (
        <svg {...p}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 'quiz':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'live_session':
      return (
        <svg {...p}>
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}
const ChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ChevronLeft = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const LockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const MenuIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const ClockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ShieldIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TrophyIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
);
const FireIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1012 0c0-1.532-1.056-3.94-2-5-1.786 3-2 2-4 2z" />
  </svg>
);
const PlayIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const fmt = s => {
  const m = Math.floor(s / 60),
    sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
};

function getAllLessonsFlat(modules) {
  const r = [];
  (modules || []).forEach(mod => {
    if (mod.isUnlocked)
      (mod.lessons || []).forEach(l =>
        r.push({ ...l, moduleTitle: mod.title, moduleId: mod._id, moduleNumber: mod.moduleNumber })
      );
  });
  return r;
}

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
  const selectedModuleRef = useRef(null);
  const initialLoadDone = useRef(false);

  /* ── Time tracking ── */
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [completing, setCompleting] = useState(false);
  const timerRef = useRef(null);
  const timeSpentRef = useRef(0);

  /* ── Video tracking ── */
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoWatched, setVideoWatched] = useState(0);
  const watchedIntervalsRef = useRef([]);

  const loadDashboard = useCallback(
    async (isRefresh = false) => {
      if (!isRefresh) setLoading(true);
      const { data, error } = await apiGet(`/api/v1/learn/${courseId}`);
      if (error) {
        if (error.status === 401) router.push('/login');
        if (!isRefresh) setLoading(false);
        return;
      }
      setDashboard(data);
      if (data?.modules?.length && !selectedModuleRef.current) {
        const first = data.modules.find(m => m.isUnlocked);
        if (first) {
          setExpandedModules(prev => ({ ...prev, [first._id]: true }));
          selectedModuleRef.current = first._id;
          setSelectedModule(first._id);
        }
      }
      if (!isRefresh) setLoading(false);
      initialLoadDone.current = true;
    },
    [courseId, router]
  );

  useEffect(() => {
    loadDashboard(false);
  }, [loadDashboard]);
  useEffect(() => {
    if (activeLessonRef.current)
      activeLessonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeLesson]);

  /* ── Lesson timer: 90% of durationMinutes ── */
  useEffect(() => {
    if (lessonDetail && !lessonDetail.isCompleted) {
      const reqSec = (lessonDetail.durationMinutes || 0) * 60;
      setTimeSpent(0);
      timeSpentRef.current = 0;
      setIsTimerDone(reqSec <= 0);
      setCompleting(false);
      watchedIntervalsRef.current = [];
      setVideoWatched(0);

      timerRef.current = setInterval(() => {
        timeSpentRef.current += 1;
        setTimeSpent(timeSpentRef.current);
        if (reqSec > 0 && timeSpentRef.current >= Math.ceil(reqSec * 0.9)) setIsTimerDone(true);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      setTimeSpent(0);
      setIsTimerDone(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [lessonDetail]);

  /* ── Auto-complete for reading/resource when 90% time is reached ── */
  const toggleModule = modId => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
    selectedModuleRef.current = modId;
    setSelectedModule(modId);
  };

  const openLesson = useCallback(async (lessonId, lessonData) => {
    if (lessonData?.isLocked) return;
    setLessonLoading(true);
    setQuizResult(null);
    setCompleting(false);
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}/lesson/${lessonId}`);
    if (error) {
      if (error.status === 401) {
        router.push('/login');
        return;
      }
      if (error.message?.includes('previous lesson'))
        alert('Complete the previous lesson first to unlock this one.');
      else alert(error.message || 'Cannot access lesson');
      setLessonLoading(false);
      return;
    }
    setLessonDetail(data);
    setActiveLesson(lessonId);
    setLessonLoading(false);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [courseId, router]);

  const doAutoComplete = useCallback(async lessonId => {
    setCompleting(true);
    const { error } = await apiPost(`/api/v1/learn/${courseId}/lesson/${lessonId}/complete`, {
      timeSpentSeconds: timeSpentRef.current,
    });
    if (error) {
      setCompleting(false);
      return;
    }
    setLessonDetail(prev => (prev ? { ...prev, isCompleted: true } : prev));
    if (timerRef.current) clearInterval(timerRef.current);
    // Refresh dashboard then auto-open next lesson
    const { data } = await apiGet(`/api/v1/learn/${courseId}`);
    if (data) {
      setDashboard(data);
      const all = getAllLessonsFlat(data.modules);
      const idx = all.findIndex(l => l._id === lessonId);
      if (idx >= 0 && idx < all.length - 1 && !all[idx + 1].isLocked) {
        setTimeout(() => openLesson(all[idx + 1]._id, all[idx + 1]), 1200);
      }
    }
  }, [courseId, openLesson]);

  useEffect(() => {
    if (isTimerDone && lessonDetail && !lessonDetail.isCompleted && !completing) {
      const ct = lessonDetail.contentType;
      if (ct === 'reading' || ct === 'resource') {
        doAutoComplete(lessonDetail._id);
      }
    }
  }, [isTimerDone, lessonDetail, completing, doAutoComplete]);

  /* ── Video: track how much user watched, auto-complete at 90% ── */
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || !lessonDetail || lessonDetail.isCompleted) return;
    const v = videoRef.current;
    const dur = v.duration || 0;
    if (dur <= 0) return;

    // Track watched intervals (handles seeking)
    const ct = Math.floor(v.currentTime);
    const intervals = watchedIntervalsRef.current;
    if (!intervals.includes(ct)) intervals.push(ct);

    const uniqueSeconds = intervals.length;
    const pctWatched = (uniqueSeconds / Math.ceil(dur)) * 100;
    setVideoWatched(Math.min(Math.round(pctWatched), 100));

    // Auto-complete when 90% of video watched
    if (pctWatched >= 90 && !completing) {
      doAutoComplete(lessonDetail._id);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) setVideoDuration(Math.ceil(videoRef.current.duration));
  };

  const handleVideoEnded = () => {
    if (lessonDetail && !lessonDetail.isCompleted && !completing) doAutoComplete(lessonDetail._id);
  };

  const navigateLesson = dir => {
    if (!dashboard?.modules || !activeLesson) return;
    const all = getAllLessonsFlat(dashboard.modules);
    const idx = all.findIndex(l => l._id === activeLesson);
    if (idx < 0) return;
    const t = idx + dir;
    if (t < 0 || t >= all.length) return;
    if (all[t].isLocked) return;
    openLesson(all[t]._id, all[t]);
  };

  const openQuiz = async moduleId => {
    setQuizLoading(true);
    setQuizResult(null);
    setQuizAnswers({});
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}/module/${moduleId}/quiz`);
    if (error) {
      if (error.status === 401) {
        router.push('/login');
        return;
      }
      alert(error.message || 'Quiz not available');
      setQuizLoading(false);
      return;
    }
    setQuizData(data);
    setShowQuiz(moduleId);
    setQuizLoading(false);
  };

  const submitQuiz = async () => {
    if (!showQuiz || !quizData) return;
    setQuizLoading(true);
    const answers = quizData.questions.map((_, qi) => ({
      questionIndex: qi,
      selectedOption: quizAnswers[qi] ?? -1,
    }));
    const { data, error } = await apiPost(`/api/v1/learn/${courseId}/module/${showQuiz}/quiz`, {
      answers,
    });
    if (error) {
      if (error.status === 401) {
        router.push('/login');
        return;
      }
      alert(error.message);
      setQuizLoading(false);
      return;
    }
    setQuizResult(data);
    setQuizLoading(false);
    loadDashboard(true);
  };

  /* ═══════ SIDEBAR ═══════ */
  const renderSidebar = (modules, overallProgress, isPreStart = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #f0e8e0' }}>
        <Link
          href="/dashboard/my-courses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.75rem',
            color: '#7A1F2B',
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: 12,
          }}
        >
          <ChevronLeft size={14} color="#7A1F2B" /> My Courses
        </Link>
        <h2
          style={{
            fontSize: '0.95rem',
            fontWeight: 800,
            color: '#1a1a1a',
            lineHeight: 1.4,
            margin: '0 0 1rem',
          }}
        >
          {dashboard.course?.title}
        </h2>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Progress
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7A1F2B' }}>
              {overallProgress}%
            </span>
          </div>
          <div style={{ height: 6, background: '#f0e8e0', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #7A1F2B, #C5975B)',
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>
        {modules.map((mod, mi) => {
          const locked = !mod.isUnlocked;
          const expanded = !!expandedModules[mod._id];
          const done = (mod.lessons || []).filter(l => l.isCompleted).length;
          const total = (mod.lessons || []).length;
          const active = selectedModule === mod._id && !locked;
          const needsQuiz = mod.allLessonsComplete && mod.quiz && !mod.quizPassed;

          return (
            <div key={mod._id} style={{ borderBottom: '1px solid #f5f0eb' }}>
              <button
                onClick={() => !locked && toggleModule(mod._id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  background: active ? '#fdf8f3' : 'transparent',
                  border: 'none',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.45 : 1,
                  transition: 'background 0.2s',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: 2,
                    background: locked ? '#f0f0f0' : mod.progress === 100 ? '#ecfdf5' : '#fdf2f4',
                    color: locked ? '#ccc' : mod.progress === 100 ? '#059669' : '#7A1F2B',
                  }}
                >
                  {locked ? (
                    <LockIcon size={14} color="#ccc" />
                  ) : mod.progress === 100 ? (
                    <CheckIcon size={14} color="#059669" />
                  ) : (
                    mod.moduleNumber || mi + 1
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#aaa',
                      }}
                    >
                      Module {mod.moduleNumber || mi + 1}
                    </span>
                    {mod.weekNumber > 0 && (
                      <span style={{ fontSize: '0.6rem', color: '#ccc' }}>
                        Week {mod.weekNumber}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: locked ? '#bbb' : '#333',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {mod.title}
                  </p>
                  {locked && mi > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                      <ShieldIcon size={10} color="#d97706" />
                      <span style={{ fontSize: '0.58rem', color: '#d97706', fontWeight: 600 }}>
                        Pass previous quiz (75%) to unlock
                      </span>
                    </div>
                  )}
                  {needsQuiz && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        marginTop: 6,
                        background: '#fff7ed',
                        border: '1px solid #fed7aa',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      <LessonIcon type="quiz" size={10} color="#d97706" />
                      <span style={{ fontSize: '0.58rem', color: '#d97706', fontWeight: 700 }}>
                        Take quiz to unlock next
                      </span>
                    </div>
                  )}
                  {!locked && total > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                      <div
                        style={{
                          flex: 1,
                          height: 3,
                          background: '#f0e8e0',
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            background: mod.progress === 100 ? '#059669' : '#7A1F2B',
                            borderRadius: 999,
                            width: (mod.progress || 0) + '%',
                            transition: 'width 0.5s',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: '0.6rem',
                          color: '#999',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {done}/{total}
                      </span>
                    </div>
                  )}
                </div>
                {!locked && (
                  <span
                    style={{
                      marginTop: 4,
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={15} color="#aaa" />
                  </span>
                )}
              </button>

              <AnimatePresence>
                {expanded && !locked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingBottom: 8 }}>
                      {(mod.lessons || []).map(lesson => {
                        const isActive = activeLesson === lesson._id;
                        const isDone = lesson.isCompleted;
                        const isLocked = lesson.isLocked;
                        return (
                          <button
                            key={lesson._id}
                            ref={isActive ? activeLessonRef : null}
                            onClick={() =>
                              !isPreStart && !isLocked && openLesson(lesson._id, lesson)
                            }
                            disabled={isPreStart || isLocked}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              padding: '0.65rem 1.25rem 0.65rem 2.8rem',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              fontSize: '0.82rem',
                              background: isActive
                                ? 'linear-gradient(90deg, rgba(122,31,43,0.06), transparent)'
                                : 'transparent',
                              borderLeft: isActive ? '3px solid #7A1F2B' : '3px solid transparent',
                              border: 'none',
                              borderLeft: isActive ? '3px solid #7A1F2B' : '3px solid transparent',
                              cursor: isPreStart || isLocked ? 'not-allowed' : 'pointer',
                              opacity: isLocked ? 0.4 : 1,
                              transition: 'all 0.2s',
                            }}
                          >
                            <span
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: 1,
                                background: isDone
                                  ? '#059669'
                                  : isLocked
                                    ? '#f0f0f0'
                                    : 'transparent',
                                border: isDone
                                  ? 'none'
                                  : isLocked
                                    ? '2px solid #ddd'
                                    : isActive
                                      ? '2px solid #7A1F2B'
                                      : '2px solid #ddd',
                              }}
                            >
                              {isDone ? (
                                <CheckIcon size={12} color="#fff" />
                              ) : isLocked ? (
                                <LockIcon size={10} color="#ccc" />
                              ) : (
                                <LessonIcon
                                  type={lesson.contentType}
                                  size={10}
                                  color={isActive ? '#7A1F2B' : '#bbb'}
                                />
                              )}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p
                                style={{
                                  margin: 0,
                                  color: isLocked
                                    ? '#ccc'
                                    : isActive
                                      ? '#7A1F2B'
                                      : isDone
                                        ? '#999'
                                        : '#444',
                                  fontWeight: isActive ? 700 : 500,
                                  lineHeight: 1.4,
                                }}
                              >
                                {lesson.title}
                              </p>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  marginTop: 4,
                                  flexWrap: 'wrap',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.6rem',
                                    color: '#bbb',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                  }}
                                >
                                  <LessonIcon type={lesson.contentType} size={10} color="#ccc" />{' '}
                                  {(lesson.contentType || 'lesson').replace('_', ' ')}
                                </span>
                                {lesson.durationMinutes > 0 && (
                                  <span
                                    style={{
                                      fontSize: '0.6rem',
                                      color: '#ccc',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 2,
                                    }}
                                  >
                                    <ClockIcon size={9} color="#ccc" /> {lesson.durationMinutes}m
                                  </span>
                                )}
                                {isLocked && (
                                  <span
                                    style={{
                                      fontSize: '0.55rem',
                                      color: '#d97706',
                                      fontWeight: 600,
                                    }}
                                  >
                                    Complete previous first
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                      {/* Quiz button */}
                      {mod.quiz && !isPreStart && (
                        <button
                          onClick={() => (mod.allLessonsComplete ? openQuiz(mod._id) : null)}
                          disabled={!mod.allLessonsComplete}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.65rem 1.25rem 0.65rem 2.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            border: 'none',
                            background: 'transparent',
                            cursor: mod.allLessonsComplete ? 'pointer' : 'not-allowed',
                            opacity: mod.allLessonsComplete ? 1 : 0.4,
                          }}
                        >
                          <span
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: mod.quizPassed ? '#059669' : '#fff7ed',
                              border: mod.quizPassed ? 'none' : '2px solid #d97706',
                            }}
                          >
                            {mod.quizPassed ? (
                              <CheckIcon size={12} color="#fff" />
                            ) : (
                              <LessonIcon type="quiz" size={10} color="#d97706" />
                            )}
                          </span>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: mod.quizPassed ? '#059669' : '#d97706',
                              }}
                            >
                              {mod.quiz.title || 'Module Quiz'}
                            </p>
                            <p style={{ margin: '2px 0 0', fontSize: '0.6rem', color: '#bbb' }}>
                              {mod.quiz.questionCount} Qs ·{' '}
                              {mod.quizPassed
                                ? 'Passed'
                                : !mod.allLessonsComplete
                                  ? 'Complete all lessons'
                                  : '75% required'}
                            </p>
                            {mod.quizAttempt && !mod.quizPassed && (
                              <p
                                style={{
                                  margin: '2px 0 0',
                                  fontSize: '0.55rem',
                                  color: '#ef4444',
                                  fontWeight: 600,
                                }}
                              >
                                Last: {mod.quizAttempt.percentage}% — Need 75%
                              </p>
                            )}
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
  const renderModuleDetail = (mod, isPreStart = false) => {
    if (!mod) return null;
    const done = (mod.lessons || []).filter(l => l.isCompleted).length;
    const total = (mod.lessons || []).length;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 780, margin: '0 auto' }}
      >
        {/* Header card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7A1F2B, #922538)',
            borderRadius: 20,
            padding: '2rem 2.25rem',
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(197,151,91,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#C5975B',
                  background: 'rgba(255,255,255,0.12)',
                  padding: '4px 12px',
                  borderRadius: 8,
                }}
              >
                Module {mod.moduleNumber}
              </span>
              {mod.weekNumber > 0 && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '4px 10px',
                    borderRadius: 8,
                  }}
                >
                  Week {mod.weekNumber}
                </span>
              )}
            </div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#fff',
                margin: '0 0 8px',
                lineHeight: 1.3,
              }}
            >
              {mod.title}
            </h2>
            {mod.description && (
              <p
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {mod.description}
              </p>
            )}
            {!isPreStart && total > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: '#C5975B',
                      borderRadius: 999,
                      width: (mod.progress || 0) + '%',
                      transition: 'width 0.6s',
                    }}
                  />
                </div>
                <span
                  style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}
                >
                  {done}/{total}
                </span>
              </div>
            )}
          </div>
        </div>

        {mod.whatYouLearn?.length > 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #f0e8e0',
              borderRadius: 18,
              padding: '1.75rem',
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: '#1a1a1a',
                margin: '0 0 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>{' '}
              What You&apos;ll Learn
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mod.whatYouLearn.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckIcon size={16} color="#059669" />
                  <span style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mod.keyActivities?.length > 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #f0e8e0',
              borderRadius: 18,
              padding: '1.75rem',
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: '#1a1a1a',
                margin: '0 0 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: '#fdf2f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#7A1F2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>{' '}
              Key Activities
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mod.keyActivities.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: '#faf8f5',
                    borderRadius: 12,
                    padding: '0.75rem 1rem',
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: '#7A1F2B',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mod.deliverable && (
          <div
            style={{
              background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
              border: '1px solid #fde68a',
              borderRadius: 18,
              padding: '1.75rem',
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: '#92400e',
                margin: '0 0 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'rgba(217,119,6,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </span>{' '}
              Deliverable
            </h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#78350f', margin: 0 }}>
              {mod.deliverable}
            </p>
            {mod.deliverableDescription && (
              <p style={{ fontSize: '0.85rem', color: '#92400e', margin: '6px 0 0', opacity: 0.8 }}>
                {mod.deliverableDescription}
              </p>
            )}
          </div>
        )}

        {/* Lesson list */}
        {!isPreStart && total > 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #f0e8e0',
              borderRadius: 18,
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 4px' }}>
              Lessons
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#999', margin: '0 0 16px' }}>
              Complete each lesson in order — watch 90% of videos, spend 90% of required time
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(mod.lessons || []).map(lesson => {
                const isLk = lesson.isLocked;
                return (
                  <button
                    key={lesson._id}
                    onClick={() => !isLk && openLesson(lesson._id, lesson)}
                    disabled={isLk}
                    className="lesson-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '0.85rem 1rem',
                      borderRadius: 14,
                      background: isLk ? '#fafafa' : '#faf8f5',
                      border: '1px solid #f0e8e0',
                      cursor: isLk ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      width: '100%',
                      opacity: isLk ? 0.5 : 1,
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: lesson.isCompleted ? '#ecfdf5' : isLk ? '#f0f0f0' : '#fdf2f4',
                      }}
                    >
                      {lesson.isCompleted ? (
                        <CheckIcon size={15} color="#059669" />
                      ) : isLk ? (
                        <LockIcon size={14} color="#ccc" />
                      ) : (
                        <LessonIcon type={lesson.contentType} size={15} color="#7A1F2B" />
                      )}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: isLk ? '#bbb' : lesson.isCompleted ? '#999' : '#333',
                          margin: 0,
                        }}
                      >
                        {lesson.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: '#bbb',
                            textTransform: 'capitalize',
                          }}
                        >
                          {(lesson.contentType || 'lesson').replace('_', ' ')}
                        </span>
                        {lesson.durationMinutes > 0 && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              color: '#ccc',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <ClockIcon size={10} color="#ccc" /> {lesson.durationMinutes}m required
                          </span>
                        )}
                        {isLk && (
                          <span style={{ fontSize: '0.62rem', color: '#d97706', fontWeight: 600 }}>
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                    {!isLk && <ChevronRight size={16} color="#ccc" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  /* ═══════ CSS ═══════ */
  const pageStyles = `
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes timerPulse{0%,100%{box-shadow:0 0 0 0 rgba(122,31,43,0.3)}50%{box-shadow:0 0 0 8px rgba(122,31,43,0)}}
    @keyframes completeBounce{0%{transform:scale(0.8);opacity:0}50%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes glow{0%,100%{opacity:1}50%{opacity:0.6}}
    .learn-sidebar{scrollbar-width:thin;scrollbar-color:#e0d5c8 transparent}
    .learn-sidebar::-webkit-scrollbar{width:4px}
    .learn-sidebar::-webkit-scrollbar-thumb{background:#e0d5c8;border-radius:999px}
    .lesson-btn:hover:not(:disabled){background:#fdf8f3!important;border-color:#e0d5c8!important;transform:translateX(3px)}
    .quiz-opt:hover{border-color:#7A1F2B!important;background:#fdf8f3!important}
    .quiz-opt-selected{border-color:#7A1F2B!important;background:#fdf2f4!important}
    .nav-btn:hover:not(:disabled){background:#fdf2f4!important;border-color:#7A1F2B!important}
    @media(max-width:768px){.learn-main-grid{grid-template-columns:1fr!important}}
  `;

  /* ═══════ LOADING ═══════ */
  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#faf8f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter',system-ui,sans-serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 48, height: 48, margin: '0 auto 16px' }}>
            <div
              style={{
                width: 48,
                height: 48,
                border: '3px solid #f0e8e0',
                borderRadius: '50%',
                position: 'absolute',
              }}
            />
            <div
              style={{
                width: 48,
                height: 48,
                border: '3px solid transparent',
                borderTopColor: '#7A1F2B',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                position: 'absolute',
              }}
            />
          </div>
          <p style={{ color: '#888', fontSize: '0.88rem', fontWeight: 600 }}>
            Loading your course...
          </p>
        </div>
      </div>
    );

  if (!dashboard)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#faf8f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter',system-ui,sans-serif",
        }}
      >
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: '#fdf2f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="#7A1F2B"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p style={{ color: '#555', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px' }}>
            Unable to load course
          </p>
          <button
            onClick={loadDashboard}
            style={{
              padding: '0.6rem 1.5rem',
              background: '#7A1F2B',
              color: '#fff',
              borderRadius: 12,
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 12,
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  /* ═══════ NOT ENROLLED ═══════ */
  if (dashboard.state === 'not_enrolled')
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#faf8f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          fontFamily: "'Inter',system-ui,sans-serif",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#fff',
            border: '1px solid #f0e8e0',
            borderRadius: 24,
            padding: '3rem',
            maxWidth: 480,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: '#fdf2f4',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <LockIcon size={28} color="#7A1F2B" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1a1a1a', margin: '0 0 8px' }}>
            {dashboard.course?.title}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 24px' }}>
            Enroll to access the learning content.
          </p>
          <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1a1a1a', margin: '0 0 24px' }}>
            {dashboard.course?.priceInr ? `₹${dashboard.course.priceInr.toLocaleString()}` : 'Free'}
          </p>
          <a
            href={`/courses/${dashboard.course?.slug || courseId}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #7A1F2B, #922538)',
              color: '#fff',
              borderRadius: 14,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.9rem',
              boxShadow: '0 6px 20px rgba(122,31,43,0.25)',
            }}
          >
            View Course & Enroll <ArrowRight size={16} color="#fff" />
          </a>
        </motion.div>
      </div>
    );

  /* ═══════ PRE-START ═══════ */
  if (dashboard.state === 'pre_start') {
    const startDate = dashboard.course?.startDate ? new Date(dashboard.course.startDate) : null;
    const preMods = (dashboard.course?.modules || []).map((m, i) => ({
      ...m,
      isUnlocked: false,
      lessons: [],
      progress: 0,
      moduleNumber: m.moduleNumber || i + 1,
    }));
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#faf8f5',
          fontFamily: "'Inter',system-ui,sans-serif",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
        <aside
          className="learn-sidebar"
          style={{
            width: 320,
            background: '#fff',
            borderRight: '1px solid #f0e8e0',
            flexShrink: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s',
            boxShadow: '2px 0 12px rgba(0,0,0,0.02)',
          }}
        >
          {renderSidebar(preMods, 0, true)}
        </aside>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              background: '#fff',
              borderBottom: '1px solid #f0e8e0',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              position: 'sticky',
              top: 0,
              zIndex: 20,
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <MenuIcon size={20} color="#888" />
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#555' }}>
              Course Preview
            </span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'linear-gradient(135deg, #7A1F2B, #922538)',
                  borderRadius: 20,
                  padding: '2rem 2.25rem',
                  marginBottom: 24,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    width: 150,
                    height: 150,
                    background:
                      'radial-gradient(circle, rgba(197,151,91,0.25) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h1
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: '#fff',
                      margin: '0 0 8px',
                    }}
                  >
                    Welcome! You&apos;re Enrolled
                  </h1>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: '0.9rem',
                      margin: '0 0 20px',
                      lineHeight: 1.6,
                    }}
                  >
                    {dashboard.course?.preStartMessage || 'The course will begin shortly.'}
                  </p>
                  {startDate && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 14,
                        padding: '0.7rem 1.2rem',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="#C5975B"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <div>
                        <p
                          style={{
                            fontSize: '0.6rem',
                            color: 'rgba(255,255,255,0.5)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          Starts on
                        </p>
                        <p
                          style={{ color: '#fff', fontWeight: 800, fontSize: '0.88rem', margin: 0 }}
                        >
                          {startDate.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* How it works */}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f0e8e0',
                  borderRadius: 18,
                  padding: '1.75rem',
                  marginBottom: 24,
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#1a1a1a',
                    margin: '0 0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <ShieldIcon size={18} color="#7A1F2B" /> How This Course Works
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    {
                      t: 'Sequential Learning',
                      d: 'Complete each lesson in order',
                      ic: <ArrowRight size={14} color="#7A1F2B" />,
                    },
                    {
                      t: 'Watch 90% Video',
                      d: 'Must watch 90% of video duration',
                      ic: <PlayIcon size={14} color="#7A1F2B" />,
                    },
                    {
                      t: 'Time Required',
                      d: 'Spend 90% of required time on readings',
                      ic: <ClockIcon size={14} color="#7A1F2B" />,
                    },
                    {
                      t: 'Quiz Gate (75%)',
                      d: 'Score 75%+ on quiz to unlock next module',
                      ic: <LessonIcon type="quiz" size={14} color="#7A1F2B" />,
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#faf8f5',
                        borderRadius: 14,
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: '#fdf2f4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {r.ic}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#333',
                            margin: '0 0 3px',
                          }}
                        >
                          {r.t}
                        </p>
                        <p
                          style={{ fontSize: '0.72rem', color: '#999', margin: 0, lineHeight: 1.5 }}
                        >
                          {r.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    label: 'Modules',
                    value: dashboard.course?.totalModules || preMods.length,
                    color: '#7A1F2B',
                    bg: '#fdf2f4',
                  },
                  {
                    label: 'Duration',
                    value: `${dashboard.course?.durationWeeks || 0} wk`,
                    color: '#059669',
                    bg: '#ecfdf5',
                  },
                  {
                    label: 'Level',
                    value: dashboard.course?.difficultyLevel || 'Beginner',
                    color: '#d97706',
                    bg: '#fffbeb',
                  },
                  {
                    label: 'Language',
                    value: dashboard.course?.language || 'English',
                    color: '#7c3aed',
                    bg: '#f5f3ff',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      border: '1px solid #f0e8e0',
                      borderRadius: 16,
                      padding: '1.15rem',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: s.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', fontWeight: 900, color: s.color }}>
                        {typeof s.value === 'number' ? s.value : s.value.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#333',
                        margin: '0 0 2px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {s.value}
                    </p>
                    <p style={{ fontSize: '0.65rem', color: '#aaa', margin: 0, fontWeight: 600 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {dashboard.course?.description && (
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 18,
                    padding: '1.75rem',
                    marginBottom: 24,
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: '#1a1a1a',
                      margin: '0 0 12px',
                    }}
                  >
                    About This Course
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {dashboard.course.description}
                  </p>
                </div>
              )}
              <div style={{ textAlign: 'center', paddingTop: 8 }}>
                <Link
                  href="/dashboard/my-courses"
                  style={{
                    color: '#7A1F2B',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
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
  const currentModule =
    modules.find(m => m._id === selectedModule) || modules.find(m => m.isUnlocked) || modules[0];

  const allLessons = getAllLessonsFlat(modules);
  const curIdx = allLessons.findIndex(l => l._id === activeLesson);
  const hasPrev = curIdx > 0;
  const hasNext =
    curIdx >= 0 && curIdx < allLessons.length - 1 && !allLessons[curIdx + 1]?.isLocked;

  const reqSec = lessonDetail ? (lessonDetail.durationMinutes || 0) * 60 : 0;
  const timerPct = reqSec > 0 ? Math.min((timeSpent / Math.ceil(reqSec * 0.9)) * 100, 100) : 100;
  const isVideoLesson = lessonDetail?.contentType === 'video' || !!lessonDetail?.videoUrl;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#faf8f5',
        fontFamily: "'Inter',system-ui,sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 30 }}
        />
      )}

      <aside
        className="learn-sidebar"
        style={{
          width: 320,
          background: '#fff',
          borderRight: '1px solid #f0e8e0',
          flexShrink: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          boxShadow: '2px 0 12px rgba(0,0,0,0.02)',
          overflowY: 'auto',
        }}
      >
        {renderSidebar(modules, overallProgress)}
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #f0e8e0',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 8,
            }}
          >
            <MenuIcon size={20} color="#888" />
          </button>
          {lessonDetail ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: '#fdf2f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LessonIcon type={lessonDetail.contentType} size={14} color="#7A1F2B" />
              </span>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {lessonDetail.title}
              </span>

              {lessonDetail.isCompleted && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    background: '#ecfdf5',
                    color: '#059669',
                    padding: '4px 10px',
                    borderRadius: 999,
                    flexShrink: 0,
                  }}
                >
                  Completed
                </span>
              )}
            </div>
          ) : (
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#888' }}>
              {currentModule?.title || 'Select a lesson'}
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
          {lessonLoading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                gap: 16,
              }}
            >
              <div style={{ position: 'relative', width: 40, height: 40 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: '3px solid #f0e8e0',
                    borderRadius: '50%',
                    position: 'absolute',
                  }}
                />
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: '3px solid transparent',
                    borderTopColor: '#7A1F2B',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    position: 'absolute',
                  }}
                />
              </div>
              <p style={{ color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>
                Loading lesson...
              </p>
            </div>
          ) : lessonDetail ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ maxWidth: 860, margin: '0 auto' }}
            >
              {/* Video */}
              {lessonDetail.videoUrl ? (
                <div
                  style={{
                    borderRadius: 18,
                    overflow: 'hidden',
                    background: '#111',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    border: '1px solid #e5e0da',
                  }}
                >
                  <video
                    ref={videoRef}
                    src={lessonDetail.videoUrl}
                    controls
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onEnded={handleVideoEnded}
                    style={{ width: '100%', display: 'block' }}
                    controlsList="nodownload"
                  />
                </div>
              ) : lessonDetail.readingContent ? (
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 20,
                    padding: '2.5rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#7A1F2B',
                        background: '#fdf2f4',
                        padding: '3px 10px',
                        borderRadius: 6,
                        textTransform: 'capitalize',
                      }}
                    >
                      {(lessonDetail.contentType || 'reading').replace('_', ' ')}
                    </span>
                    {lessonDetail.durationMinutes > 0 && (
                      <span style={{ fontSize: '0.68rem', color: '#aaa' }}>
                        {lessonDetail.durationMinutes} min read
                      </span>
                    )}
                  </div>
                  <h2
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#1a1a1a',
                      margin: '0 0 24px',
                      lineHeight: 1.3,
                    }}
                  >
                    {lessonDetail.title}
                  </h2>
                  <div
                    style={{
                      color: '#555',
                      lineHeight: 1.8,
                      fontSize: '0.95rem',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {lessonDetail.readingContent}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 20,
                    padding: '3rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: '#f5f0eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <LessonIcon type="reading" size={28} color="#ccc" />
                  </div>
                  <p style={{ color: '#999', fontWeight: 600 }}>
                    No content available for this lesson yet.
                  </p>
                </div>
              )}

              {lessonDetail.attachments?.length ? (
                <div
                  style={{
                    marginTop: 20,
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 16,
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      marginBottom: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1a1a1a' }}>
                      Lesson Resources
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {lessonDetail.attachments.length} file
                      {lessonDetail.attachments.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {lessonDetail.attachments.map(attachment => (
                      <a
                        key={attachment.key || attachment.fileUrl}
                        href={attachment.downloadUrl || attachment.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 12,
                          alignItems: 'center',
                          padding: '12px 14px',
                          borderRadius: 12,
                          border: '1px solid #f1e6db',
                          background: '#fdfaf7',
                          textDecoration: 'none',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: '#1f2937',
                              fontSize: '0.88rem',
                              fontWeight: 700,
                              marginBottom: 4,
                            }}
                          >
                            {attachment.label || 'Download resource'}
                          </div>
                          <div style={{ color: '#7c6f64', fontSize: '0.75rem' }}>
                            {attachment.fileType || 'application/octet-stream'} •{' '}
                            {formatFileSize(attachment.size)}
                          </div>
                        </div>
                        <span style={{ color: '#7A1F2B', fontSize: '0.8rem', fontWeight: 800 }}>
                          Open
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Description */}
              {lessonDetail.description && (
                <div
                  style={{
                    marginTop: 20,
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 14,
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {lessonDetail.description}
                  </p>
                </div>
              )}

              {/* Completed badge */}
              {lessonDetail.isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    marginTop: 20,
                    background: '#ecfdf5',
                    border: '1px solid #bbf7d0',
                    borderRadius: 14,
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon size={18} color="#fff" />
                  </div>
                  <div>
                    <p
                      style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669', margin: 0 }}
                    >
                      Lesson Completed
                    </p>
                    <p style={{ fontSize: '0.72rem', color: '#065f46', margin: '2px 0 0' }}>
                      {lessonDetail.completedAt
                        ? `Completed ${new Date(lessonDetail.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                        : 'Great progress!'}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Nav buttons */}
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => navigateLesson(-1)}
                  disabled={!hasPrev}
                  className="nav-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.7rem 1.2rem',
                    background: '#fff',
                    border: '1px solid #f0e8e0',
                    borderRadius: 12,
                    color: hasPrev ? '#7A1F2B' : '#ccc',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: hasPrev ? 'pointer' : 'not-allowed',
                    opacity: hasPrev ? 1 : 0.5,
                    transition: 'all 0.2s',
                  }}
                >
                  <ChevronLeft size={14} color={hasPrev ? '#7A1F2B' : '#ccc'} /> Previous
                </button>

                <button
                  onClick={() => {
                    setLessonDetail(null);
                    setActiveLesson(null);
                  }}
                  style={{
                    padding: '0.7rem 1rem',
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Module Overview
                </button>

                <button
                  onClick={() => navigateLesson(1)}
                  disabled={!hasNext}
                  className="nav-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.7rem 1.2rem',
                    background:
                      hasNext && lessonDetail.isCompleted
                        ? 'linear-gradient(135deg, #7A1F2B, #922538)'
                        : '#fff',
                    border: hasNext && lessonDetail.isCompleted ? 'none' : '1px solid #f0e8e0',
                    borderRadius: 12,
                    color:
                      hasNext && lessonDetail.isCompleted ? '#fff' : hasNext ? '#7A1F2B' : '#ccc',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: hasNext ? 'pointer' : 'not-allowed',
                    opacity: hasNext ? 1 : 0.5,
                    transition: 'all 0.2s',
                    boxShadow:
                      hasNext && lessonDetail.isCompleted
                        ? '0 4px 14px rgba(122,31,43,0.2)'
                        : 'none',
                  }}
                >
                  Next Lesson{' '}
                  <ChevronRight
                    size={14}
                    color={
                      hasNext && lessonDetail.isCompleted ? '#fff' : hasNext ? '#7A1F2B' : '#ccc'
                    }
                  />
                </button>
              </div>
            </motion.div>
          ) : currentModule ? (
            renderModuleDetail(currentModule)
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: '#f5f0eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <LessonIcon type="reading" size={28} color="#ccc" />
              </div>
              <p style={{ color: '#555', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px' }}>
                Select a module to explore
              </p>
              <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
                Click on a module in the sidebar to see its details
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ═══════ QUIZ MODAL ═══════ */}
      <AnimatePresence>
        {showQuiz && quizData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowQuiz(null);
              setQuizData(null);
              setQuizResult(null);
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                border: '1px solid #f0e8e0',
                borderRadius: 24,
                padding: '2rem',
                maxWidth: 560,
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '0.65rem',
                      color: '#7A1F2B',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      margin: '0 0 4px',
                    }}
                  >
                    Module Quiz
                  </p>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1a1a1a', margin: 0 }}>
                    {quizData.title || 'Module Quiz'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowQuiz(null);
                    setQuizData(null);
                    setQuizResult(null);
                  }}
                  style={{
                    background: '#f5f0eb',
                    border: 'none',
                    padding: 8,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <XIcon size={18} color="#888" />
                </button>
              </div>

              {/* 75% banner */}
              <div
                style={{
                  background: '#fdf2f4',
                  border: '1px solid #fecdd3',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <ShieldIcon size={16} color="#7A1F2B" />
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7A1F2B', margin: 0 }}>
                    Score 75% or higher to pass
                  </p>
                  <p style={{ fontSize: '0.65rem', color: '#9a3040', margin: '2px 0 0' }}>
                    Pass to unlock the next module
                  </p>
                </div>
              </div>

              {quizResult ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      background: quizResult.passed ? '#ecfdf5' : '#fef2f2',
                      animation: 'completeBounce 0.5s ease',
                    }}
                  >
                    {quizResult.passed ? (
                      <TrophyIcon size={36} color="#059669" />
                    ) : (
                      <svg
                        width="36"
                        height="36"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: quizResult.passed ? '#059669' : '#ef4444',
                      margin: '0 0 8px',
                    }}
                  >
                    {quizResult.passed ? 'Excellent Work!' : 'Keep Trying!'}
                  </h3>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#333',
                      margin: '0 0 4px',
                    }}
                  >
                    Score: {quizResult.score}/{quizResult.totalQuestions}
                  </p>
                  <p style={{ color: '#888', margin: '0 0 8px' }}>
                    {quizResult.percentage}% (Required: 75%)
                  </p>
                  {quizResult.passed ? (
                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1px solid #bbf7d0',
                        borderRadius: 12,
                        padding: '0.75rem 1rem',
                        marginTop: 12,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <CheckIcon size={16} color="#059669" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>
                        Next module unlocked!
                      </span>
                    </div>
                  ) : (
                    <div style={{ marginTop: 12 }}>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: '#ef4444',
                          fontWeight: 600,
                          margin: '0 0 16px',
                        }}
                      >
                        Need{' '}
                        {Math.max(
                          0,
                          Math.ceil((quizResult.totalQuestions || 0) * 0.75) - quizResult.score
                        )}{' '}
                        more correct to pass
                      </p>
                      <button
                        onClick={() => {
                          setQuizResult(null);
                          setQuizAnswers({});
                        }}
                        style={{
                          padding: '0.75rem 2rem',
                          background: 'linear-gradient(135deg, #7A1F2B, #922538)',
                          color: '#fff',
                          borderRadius: 14,
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          boxShadow: '0 6px 20px rgba(122,31,43,0.2)',
                        }}
                      >
                        Retry Quiz
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 20,
                      fontSize: '0.75rem',
                      color: '#999',
                    }}
                  >
                    <span>{quizData.questions?.length || 0} questions</span>
                    <span style={{ color: '#ddd' }}>|</span>
                    <span>Passing: 75%</span>
                    {quizData.lastAttempt && (
                      <>
                        <span style={{ color: '#ddd' }}>|</span>
                        <span
                          style={{ color: quizData.lastAttempt.passed ? '#059669' : '#ef4444' }}
                        >
                          Last: {quizData.lastAttempt.percentage}%
                        </span>
                      </>
                    )}
                  </div>

                  {quizData.questions?.map((q, qi) => (
                    <div
                      key={qi}
                      style={{
                        marginBottom: 20,
                        padding: '1.25rem',
                        background: '#faf8f5',
                        borderRadius: 16,
                        border: '1px solid #f0e8e0',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          color: '#333',
                          fontSize: '0.9rem',
                          margin: '0 0 12px',
                        }}
                      >
                        <span style={{ color: '#7A1F2B', marginRight: 6 }}>Q{qi + 1}.</span>
                        {q.question}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {q.options?.map((opt, oi) => (
                          <button
                            key={oi}
                            className={`quiz-opt ${quizAnswers[qi] === oi ? 'quiz-opt-selected' : ''}`}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '0.7rem 1rem',
                              borderRadius: 12,
                              border:
                                quizAnswers[qi] === oi ? '2px solid #7A1F2B' : '2px solid #eee',
                              background: quizAnswers[qi] === oi ? '#fdf2f4' : '#fff',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.15s',
                              fontSize: '0.85rem',
                              color: '#444',
                            }}
                          >
                            <span
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                border:
                                  quizAnswers[qi] === oi ? '2px solid #7A1F2B' : '2px solid #ddd',
                                background: quizAnswers[qi] === oi ? '#7A1F2B' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {quizAnswers[qi] === oi && (
                                <div
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: '#fff',
                                  }}
                                />
                              )}
                            </span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={submitQuiz}
                    disabled={quizLoading}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: 'linear-gradient(135deg, #7A1F2B, #922538)',
                      color: '#fff',
                      borderRadius: 14,
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: quizLoading ? 'not-allowed' : 'pointer',
                      opacity: quizLoading ? 0.7 : 1,
                      boxShadow: '0 6px 20px rgba(122,31,43,0.2)',
                      marginTop: 8,
                    }}
                  >
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
