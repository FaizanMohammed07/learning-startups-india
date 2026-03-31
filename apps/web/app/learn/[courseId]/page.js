'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Content-type icon helper ── */
function LessonIcon({ type, className = 'w-4 h-4' }) {
  switch (type) {
    case 'video':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'reading':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case 'assignment':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      );
    case 'quiz':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'live_session':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      );
  }
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

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}`);
    if (error) {
      if (error.status === 401) router.push('/login');
      setLoading(false);
      return;
    }
    setDashboard(data);
    // Auto-expand first unlocked module & select it
    if (data?.modules?.length) {
      const firstUnlocked = data.modules.find(m => m.isUnlocked);
      if (firstUnlocked) {
        setExpandedModules(prev => ({ ...prev, [firstUnlocked._id]: true }));
        if (!selectedModule) setSelectedModule(firstUnlocked._id);
      }
    }
    setLoading(false);
  }, [courseId, router, selectedModule]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Auto-scroll to active lesson
  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeLesson]);

  const toggleModule = modId => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
    setSelectedModule(modId);
  };

  const openLesson = async lessonId => {
    setLessonLoading(true);
    setQuizResult(null);
    const { data, error } = await apiGet(`/api/v1/learn/${courseId}/lesson/${lessonId}`);
    if (error) {
      alert(error.message || 'Cannot access lesson');
      setLessonLoading(false);
      return;
    }
    setLessonDetail(data);
    setActiveLesson(lessonId);
    setLessonLoading(false);
    // Close sidebar on mobile
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
    if (error) {
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
    const answers = quizData.questions.map((_, qi) => quizAnswers[qi] ?? -1);
    const { data, error } = await apiPost(`/api/v1/learn/${courseId}/module/${showQuiz}/quiz`, {
      answers,
    });
    if (error) {
      alert(error.message);
      setQuizLoading(false);
      return;
    }
    setQuizResult(data);
    setQuizLoading(false);
    loadDashboard();
  };

  /* ── Sidebar component (shared between pre_start and active) ── */
  const SidebarContent = ({ modules, overallProgress, isPreStart = false }) => (
    <>
      {/* Course title & progress header */}
      <div className="p-5 border-b border-slate-800/80">
        <Link
          href="/dashboard/my-courses"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          My Courses
        </Link>
        <h2 className="text-white font-bold text-sm leading-snug mb-4">
          {dashboard.course?.title}
        </h2>
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">Your Progress</span>
            <span className="font-bold text-emerald-400">{overallProgress}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Module accordion list */}
      <div className="flex-1 overflow-y-auto pb-6">
        {modules.map((mod, modIndex) => {
          const isLocked = !mod.isUnlocked;
          const isExpanded = !!expandedModules[mod._id];
          const completedCount = (mod.lessons || []).filter(l => l.isCompleted).length;
          const totalCount = (mod.lessons || []).length;

          return (
            <div key={mod._id} className="border-b border-slate-800/40">
              {/* Module header — clickable accordion */}
              <button
                onClick={() => !isLocked && toggleModule(mod._id)}
                className={`w-full text-left px-5 py-4 flex items-start gap-3 transition-colors group ${
                  isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-slate-800/30 cursor-pointer'
                } ${selectedModule === mod._id && !isLocked ? 'bg-slate-800/20' : ''}`}
              >
                {/* Module number circle */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isLocked
                      ? 'bg-slate-800 text-slate-600'
                      : mod.progress === 100
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-[#7A1F2B]/15 text-[#C5975B]'
                  }`}
                >
                  {isLocked ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ) : mod.progress === 100 ? (
                    '✓'
                  ) : (
                    mod.moduleNumber || modIndex + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Metadata badges */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Module {mod.moduleNumber || modIndex + 1}
                    </span>
                    {mod.weekNumber > 0 && (
                      <span className="text-[10px] text-slate-600">· Week {mod.weekNumber}</span>
                    )}
                    {mod.durationHours > 0 && (
                      <span className="text-[10px] text-slate-600">· {mod.durationHours}h</span>
                    )}
                  </div>
                  {/* Title */}
                  <p
                    className={`text-sm font-semibold leading-snug ${isLocked ? 'text-slate-600' : 'text-slate-200'}`}
                  >
                    {mod.title}
                  </p>
                  {/* Progress bar for module */}
                  {!isLocked && totalCount > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${mod.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Chevron */}
                {!isLocked && (
                  <svg
                    className={`w-4 h-4 text-slate-500 shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {/* Expanded lessons */}
              <AnimatePresence>
                {isExpanded && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2">
                      {(mod.lessons || []).map(lesson => {
                        const isActive = activeLesson === lesson._id;
                        const isCompleted = lesson.isCompleted;
                        return (
                          <button
                            key={lesson._id}
                            ref={isActive ? activeLessonRef : null}
                            onClick={() => !isPreStart && openLesson(lesson._id)}
                            disabled={isPreStart}
                            className={`w-full text-left pl-8 pr-5 py-2.5 flex items-start gap-3 text-sm transition-all group/lesson ${
                              isPreStart ? 'cursor-default' : 'cursor-pointer'
                            } ${
                              isActive
                                ? 'bg-[#7A1F2B]/10 border-l-2 border-[#7A1F2B]'
                                : 'border-l-2 border-transparent hover:bg-slate-800/30'
                            }`}
                          >
                            {/* Completion indicator */}
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isCompleted
                                  ? 'bg-emerald-500 text-white'
                                  : isActive
                                    ? 'border-2 border-[#7A1F2B] text-[#C5975B]'
                                    : 'border-2 border-slate-700 text-slate-600'
                              }`}
                            >
                              {isCompleted ? (
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <LessonIcon type={lesson.contentType} className="w-2.5 h-2.5" />
                              )}
                            </span>

                            <div className="flex-1 min-w-0">
                              <p
                                className={`leading-snug ${
                                  isActive
                                    ? 'text-[#e8c9a0] font-medium'
                                    : isCompleted
                                      ? 'text-slate-400'
                                      : 'text-slate-300 group-hover/lesson:text-white'
                                }`}
                              >
                                {lesson.title}
                              </p>
                              {lesson.description && (
                                <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                                  {lesson.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-600 capitalize flex items-center gap-1">
                                  <LessonIcon type={lesson.contentType} className="w-3 h-3" />
                                  {(lesson.contentType || 'lesson').replace('_', ' ')}
                                </span>
                                {lesson.durationMinutes > 0 && (
                                  <span className="text-[10px] text-slate-600">
                                    · {lesson.durationMinutes} min
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      {/* Module quiz button */}
                      {mod.quiz && !isPreStart && (
                        <button
                          onClick={() => openQuiz(mod._id)}
                          className={`w-full text-left pl-8 pr-5 py-2.5 flex items-center gap-3 text-sm transition-colors border-l-2 border-transparent hover:bg-slate-800/30 ${
                            mod.quizPassed ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              mod.quizPassed
                                ? 'bg-emerald-500 text-white'
                                : 'border-2 border-amber-500/50'
                            }`}
                          >
                            {mod.quizPassed ? (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01"
                                />
                              </svg>
                            )}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium">{mod.quiz.title || 'Module Quiz'}</p>
                            <p className="text-[10px] text-slate-600 mt-0.5">
                              {mod.quiz.questionCount} questions ·{' '}
                              {mod.quizPassed ? 'Passed' : 'Not attempted'}
                            </p>
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
    </>
  );

  /* ── Module detail panel (when no lesson is open) ── */
  const ModuleDetailPanel = ({ mod, isPreStart = false }) => {
    if (!mod) return null;
    const completedCount = (mod.lessons || []).filter(l => l.isCompleted).length;
    const totalCount = (mod.lessons || []).length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mx-auto space-y-6"
      >
        {/* Module header card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5975B] bg-[#7A1F2B]/10 px-2.5 py-1 rounded-md">
              Module {mod.moduleNumber}
            </span>
            {mod.weekNumber > 0 && (
              <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-md">
                Week {mod.weekNumber}
              </span>
            )}
            {mod.durationHours > 0 && (
              <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-md">
                {mod.durationHours}h
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{mod.title}</h2>
          {mod.description && <p className="text-slate-400 leading-relaxed">{mod.description}</p>}

          {/* Module progress */}
          {!isPreStart && totalCount > 0 && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${mod.progress || 0}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-400">
                {completedCount}/{totalCount} lessons
              </span>
            </div>
          )}
        </div>

        {/* What You'll Learn */}
        {mod.whatYouLearn?.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </span>
              What You&apos;ll Learn
            </h3>
            <div className="grid gap-3">
              {mod.whatYouLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Activities */}
        {mod.keyActivities?.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#7A1F2B]/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#C5975B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              Key Activities
            </h3>
            <div className="grid gap-3">
              {mod.keyActivities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-800/30 rounded-xl px-4 py-3"
                >
                  <span className="w-6 h-6 bg-[#7A1F2B]/15 rounded-md flex items-center justify-center text-[11px] font-bold text-[#C5975B] shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverable */}
        {mod.deliverable && (
          <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </span>
              Deliverable
            </h3>
            <p className="text-amber-200/80 font-semibold text-sm">{mod.deliverable}</p>
            {mod.deliverableDescription && (
              <p className="text-slate-400 text-sm mt-1">{mod.deliverableDescription}</p>
            )}
          </div>
        )}

        {/* Lessons list for this module */}
        {!isPreStart && totalCount > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-white mb-4">Lessons in this Module</h3>
            <div className="grid gap-2">
              {(mod.lessons || []).map((lesson, li) => (
                <button
                  key={lesson._id}
                  onClick={() => openLesson(lesson._id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-left group"
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      lesson.isCompleted
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {lesson.isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <LessonIcon type={lesson.contentType} />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${lesson.isCompleted ? 'text-slate-400' : 'text-slate-200 group-hover:text-white'}`}
                    >
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-600 capitalize">
                        {(lesson.contentType || 'lesson').replace('_', ' ')}
                      </span>
                      {lesson.durationMinutes > 0 && (
                        <span className="text-[11px] text-slate-600">
                          · {lesson.durationMinutes} min
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-800 rounded-full" />
            <div className="w-12 h-12 border-4 border-transparent border-t-[#7A1F2B] rounded-full animate-spin absolute inset-0" />
          </div>
          <p className="text-slate-400 text-sm font-medium">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-slate-400 text-lg font-medium">Unable to load course</p>
          <button
            onClick={loadDashboard}
            className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ── NOT ENROLLED ── */
  if (dashboard.state === 'not_enrolled') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-10 max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{dashboard.course?.title}</h1>
          <p className="text-slate-400 mb-6">
            You need to enroll in this course to access the content.
          </p>
          <p className="text-3xl font-extrabold text-white mb-6">
            {dashboard.course?.priceInr ? `₹${dashboard.course.priceInr.toLocaleString()}` : 'Free'}
          </p>
          <a
            href={`/courses/${dashboard.course?.slug || courseId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7A1F2B] hover:bg-[#5C1520] text-white rounded-xl font-semibold transition-colors"
          >
            View Course & Enroll
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    );
  }

  /* ── PRE-START — Full layout with sidebar & welcome banner ── */
  if (dashboard.state === 'pre_start') {
    const startDate = dashboard.course?.startDate ? new Date(dashboard.course.startDate) : null;
    const preStartModules = (dashboard.course?.modules || []).map((m, i) => ({
      ...m,
      isUnlocked: false,
      lessons: [],
      progress: 0,
      moduleNumber: m.moduleNumber || i + 1,
    }));

    return (
      <div className="flex min-h-screen bg-slate-950">
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:relative md:translate-x-0 z-40
          w-80 bg-slate-900 text-white border-r border-slate-800
          flex-shrink-0 transition-transform duration-300 h-screen flex flex-col
        `}
        >
          <SidebarContent modules={preStartModules} overallProgress={0} isPreStart />
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="text-sm font-semibold text-white">Course Preview</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Welcome banner */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#7A1F2B]/10 via-[#C5975B]/10 to-[#7A1F2B]/10 border border-[#7A1F2B]/20 rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7A1F2B]/15 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      Welcome! You&apos;re Enrolled
                    </h1>
                    <p className="text-slate-400 text-sm mb-4">
                      {dashboard.course?.preStartMessage ||
                        'The course will begin shortly. Stay tuned!'}
                    </p>
                    {startDate && (
                      <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5">
                        <svg
                          className="w-5 h-5 text-[#C5975B]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Starts on
                          </p>
                          <p className="text-white font-bold text-sm">
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
                </div>
              </motion.div>

              {/* Course overview stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: 'Modules',
                    value: dashboard.course?.totalModules || preStartModules.length,
                    icon: '📦',
                  },
                  {
                    label: 'Duration',
                    value: `${dashboard.course?.durationWeeks || 0} weeks`,
                    icon: '⏱️',
                  },
                  {
                    label: 'Level',
                    value: dashboard.course?.difficultyLevel || 'Beginner',
                    icon: '📊',
                  },
                  { label: 'Language', value: dashboard.course?.language || 'English', icon: '🌐' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center"
                  >
                    <div className="text-xl mb-1">{stat.icon}</div>
                    <p className="text-white font-bold text-sm capitalize">{stat.value}</p>
                    <p className="text-slate-500 text-[11px]">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Course description */}
              {dashboard.course?.description && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-3">About This Course</h3>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {dashboard.course.description}
                  </p>
                </div>
              )}

              <div className="text-center pt-2">
                <Link
                  href="/dashboard/my-courses"
                  className="text-[#C5975B] hover:text-[#e8d5b5] font-semibold transition-colors text-sm"
                >
                  ← Back to My Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── ACTIVE LEARNING ── */
  const { modules = [], progress = {} } = dashboard;
  const overallProgress = progress.percentage || 0;
  const currentModule =
    modules.find(m => m._id === selectedModule) || modules.find(m => m.isUnlocked) || modules[0];

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed md:relative md:translate-x-0 z-40
        w-80 bg-slate-900 text-white border-r border-slate-800
        flex-shrink-0 transition-transform duration-300 h-screen flex flex-col
      `}
      >
        <SidebarContent modules={modules} overallProgress={overallProgress} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center gap-3 shrink-0 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {lessonDetail ? (
            <>
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center shrink-0">
                  <LessonIcon
                    type={lessonDetail.lesson?.contentType}
                    className="w-3.5 h-3.5 text-slate-400"
                  />
                </span>
                <span className="text-sm font-semibold text-white truncate">
                  {lessonDetail.lesson?.title}
                </span>
              </div>
              {lessonDetail.isCompleted && (
                <span className="ml-auto text-[10px] font-bold bg-emerald-600/20 text-emerald-400 px-2.5 py-1 rounded-full shrink-0">
                  Completed
                </span>
              )}
            </>
          ) : (
            <span className="text-sm text-slate-400">
              {currentModule?.title || 'Select a lesson'}
            </span>
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {lessonLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="relative">
                <div className="w-10 h-10 border-4 border-slate-800 rounded-full" />
                <div className="w-10 h-10 border-4 border-transparent border-t-[#7A1F2B] rounded-full animate-spin absolute inset-0" />
              </div>
              <p className="text-slate-400 text-sm">Loading lesson...</p>
            </div>
          ) : lessonDetail ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Video */}
              {lessonDetail.lesson?.videoUrl ? (
                <div className="rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-slate-800">
                  <video
                    ref={videoRef}
                    src={lessonDetail.lesson.videoUrl}
                    controls
                    onEnded={() => markComplete(lessonDetail.lesson._id)}
                    className="w-full"
                    controlsList="nodownload"
                  />
                </div>
              ) : lessonDetail.lesson?.readingContent ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#C5975B] bg-[#7A1F2B]/10 px-2 py-0.5 rounded capitalize">
                      {(lessonDetail.lesson.contentType || 'reading').replace('_', ' ')}
                    </span>
                    {lessonDetail.lesson.durationMinutes > 0 && (
                      <span className="text-xs text-slate-500">
                        {lessonDetail.lesson.durationMinutes} min read
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-6">{lessonDetail.lesson.title}</h2>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {lessonDetail.lesson.readingContent}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-400 font-medium">
                    No content available for this lesson yet.
                  </p>
                </div>
              )}

              {/* Lesson info below content */}
              {lessonDetail.lesson?.description && (
                <div className="mt-5 bg-slate-900/50 border border-slate-800/50 rounded-xl p-5">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {lessonDetail.lesson.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                {!lessonDetail.isCompleted ? (
                  <button
                    onClick={() => {
                      markComplete(lessonDetail.lesson._id);
                      setLessonDetail({ ...lessonDetail, isCompleted: true });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mark as Complete
                  </button>
                ) : (
                  <span className="flex items-center gap-2 px-6 py-3 bg-emerald-900/30 text-emerald-400 rounded-xl font-semibold text-sm border border-emerald-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completed
                  </span>
                )}
                <button
                  onClick={() => {
                    setLessonDetail(null);
                    setActiveLesson(null);
                  }}
                  className="px-5 py-3 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  ← Back to Module
                </button>
              </div>
            </motion.div>
          ) : /* Default view: show current module details */
          currentModule ? (
            <ModuleDetailPanel mod={currentModule} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col items-center justify-center h-full"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-5">
                <svg
                  className="w-8 h-8 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-slate-400 text-base font-medium mb-1">
                Select a module to explore
              </p>
              <p className="text-slate-600 text-sm">
                Click on a module in the sidebar to see its details
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && quizData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowQuiz(null);
              setQuizData(null);
              setQuizResult(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-[#C5975B] font-bold uppercase tracking-wider mb-1">
                    Module Quiz
                  </p>
                  <h2 className="text-lg font-bold text-white">
                    {quizData.title || 'Module Quiz'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowQuiz(null);
                    setQuizData(null);
                    setQuizResult(null);
                  }}
                  className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {quizResult ? (
                <div className="text-center py-8">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                      quizResult.passed ? 'bg-emerald-500/15' : 'bg-red-500/15'
                    }`}
                  >
                    <span className="text-4xl">{quizResult.passed ? '🎉' : '😔'}</span>
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${quizResult.passed ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {quizResult.passed ? 'Congratulations!' : 'Not Quite There'}
                  </h3>
                  <p className="text-white text-lg mb-1">
                    Score: {quizResult.score}/{quizResult.totalQuestions}
                  </p>
                  <p className="text-slate-400 mb-6">
                    {quizResult.percentage}% (Passing: {quizData.passingScore || 70}%)
                  </p>
                  {!quizResult.passed && (
                    <button
                      onClick={() => {
                        setQuizResult(null);
                        setQuizAnswers({});
                      }}
                      className="px-8 py-3 bg-[#7A1F2B] hover:bg-[#5C1520] text-white rounded-xl font-semibold transition-colors"
                    >
                      Retry Quiz
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-5 text-xs text-slate-500">
                    <span>{quizData.questions?.length || 0} questions</span>
                    <span>·</span>
                    <span>Passing score: {quizData.passingScore || 70}%</span>
                  </div>
                  {quizData.questions?.map((q, qi) => (
                    <div
                      key={qi}
                      className="mb-5 p-5 bg-slate-950 rounded-xl border border-slate-800"
                    >
                      <p className="font-semibold text-white text-sm mb-3">
                        <span className="text-[#C5975B] mr-1.5">Q{qi + 1}.</span>
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options?.map((opt, oi) => (
                          <label
                            key={oi}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-sm ${
                              quizAnswers[qi] === oi
                                ? 'bg-[#7A1F2B]/15 text-[#e8c9a0] border border-[#7A1F2B]/30 shadow-sm'
                                : 'text-slate-300 hover:bg-slate-800/80 border border-transparent'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                quizAnswers[qi] === oi
                                  ? 'border-[#7A1F2B] bg-[#7A1F2B]'
                                  : 'border-slate-600'
                              }`}
                            >
                              {quizAnswers[qi] === oi && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={submitQuiz}
                    disabled={quizLoading}
                    className="w-full py-3.5 bg-[#7A1F2B] hover:bg-[#9B3544] text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#7A1F2B]/20"
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
