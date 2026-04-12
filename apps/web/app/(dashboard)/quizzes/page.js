'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import Link from 'next/link';

// ── MOCK DATA ──
const QUIZZES = [
  { id: 'q1', title: 'React Hooks Mastery', category: 'Frontend', difficulty: 'Medium', questions: 12, time: 15, attempts: 240, progress: 65, status: 'Pending', description: 'Deep dive into useEffect, useMemo, and custom hooks architecture.' },
  { id: 'q2', title: 'Prompt Engineering Essentials', category: 'AI', difficulty: 'Easy', questions: 8, time: 10, attempts: 1500, status: 'Submitted', description: 'Learn the fundamentals of zero-shot, few-shot, and chain-of-thought prompting.' },
  { id: 'q3', title: 'Startup Growth Hacking', category: 'Business', difficulty: 'Hard', questions: 20, time: 25, attempts: 85, progress: 0, status: 'Pending', description: 'Advanced strategies for rapid user acquisition and retention loops.' },
  { id: 'q4', title: 'Next.js App Router', category: 'Frontend', difficulty: 'Medium', questions: 10, time: 12, attempts: 420, status: 'Graded', score: 90, description: 'Master server components, suspense boundaries, and parallel routing.' },
  { id: 'q5', title: 'Venture Capital 101', category: 'Business', difficulty: 'Easy', questions: 15, time: 20, attempts: 310, status: 'Late', description: 'Understanding term sheets, valuations, and cap table basics.' },
];

const LEADERBOARD = [
  { name: 'Alex Rivera', score: 980, avatar: 'A' },
  { name: 'Sarah Chen', score: 945, avatar: 'S' },
  { name: 'Marcus Bloom', score: 910, avatar: 'M' },
];

const CATEGORIES = ['All', 'Frontend', 'AI', 'Business', 'Marketing', 'Mobile'];

// ── COMPONENTS ──

const SidebarItem = ({ label, active, onClick, icon }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '12px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.9rem',
      fontWeight: active ? 600 : 500,
      background: active ? '#ef4444' : 'transparent',
      color: active ? '#fff' : '#6B7280',
      transition: 'all 0.2s ease'
    }}
  >
    {icon && <Icon name={icon} size={18} color={active ? '#fff' : '#9CA3AF'} />}
    {label}
  </div>
);

const QuizCard = ({ quiz, onStart }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
    style={{
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      transition: '0.3s ease'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ 
        background: 'rgba(239, 68, 68, 0.1)', 
        color: '#ef4444', 
        fontSize: '0.7rem', 
        fontWeight: 700, 
        padding: '4px 10px', 
        borderRadius: '20px',
        textTransform: 'uppercase'
      }}>
        {quiz.category}
      </span>
      <span style={{ 
        fontSize: '0.75rem', 
        fontWeight: 600, 
        color: quiz.difficulty === 'Hard' ? '#EF4444' : quiz.difficulty === 'Medium' ? '#F59E0B' : '#10B981'
      }}>
        {quiz.difficulty}
      </span>
    </div>

    <div>
      <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{quiz.title}</h3>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5 }}>{quiz.description}</p>
    </div>

    <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
        <Icon name="book" size={14} /> {quiz.questions} Qs
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
        <Icon name="recorded" size={14} /> {quiz.time} mins
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
        <Icon name="user" size={14} /> {quiz.attempts}
      </div>
    </div>

    {quiz.progress !== undefined && (
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', marginBottom: '6px' }}>
          <span>PROGRESS</span>
          <span>{quiz.progress}%</span>
        </div>
        <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${quiz.progress}%` }} style={{ height: '100%', background: '#ef4444' }} />
        </div>
      </div>
    )}

    <button 
      onClick={() => onStart(quiz)}
      style={{
        marginTop: quiz.progress === undefined ? 'auto' : '15px',
        padding: '12px',
        borderRadius: '10px',
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        fontWeight: 700,
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: '0.2s'
      }}
    >
      {quiz.progress ? 'Continue Quiz' : 'Start Quiz'}
    </button>
  </motion.div>
);

export default function QuizzesPage() {
  const [view, setView] = useState('list'); // list | attempt | result
  const [activeTab, setActiveTab] = useState('All Quizzes');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // ── MOCK QUIZ DATA ──
  const quizQuestions = [
    { q: "What is the primary purpose of useMemo in React?", a: ["To handle side effects", "To memoize expensive calculations", "To manage global state", "To trigger re-renders"], correct: 1 },
    { q: "Which hook should be used for interacting with browser APIs directly?", a: ["useLayoutEffect", "useInteraction", "useBrowser", "useDOM"], correct: 0 },
    { q: "What does the second argument in useEffect do?", a: ["Defines dependencies", "Sets the timer", "Returns a cleanup function", "Toggles the component"], correct: 0 }
  ];

  const filteredQuizzes = useMemo(() => {
    return QUIZZES.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
      if (activeTab === 'Pending') return matchSearch && q.status === 'Pending';
      if (activeTab === 'Submitted') return matchSearch && q.status === 'Submitted';
      if (activeTab === 'Graded') return matchSearch && q.status === 'Graded';
      if (activeTab === 'Late Submissions') return matchSearch && q.status === 'Late';
      return matchSearch;
    });
  }, [search, activeTab]);

  if (view === 'attempt') {
    return (
      <div className="quiz-attempt-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{selectedQuiz.title}</h2>
            <p style={{ margin: '4px 0 0', color: '#6B7280', fontWeight: 600 }}>Question {currentQuestion + 1} / {quizQuestions.length}</p>
          </div>
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', border: '1px solid #fee2e2' }}>
            14:52
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', border: '1px solid #E5E7EB', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', background: '#fff' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '30px', color: '#111827', lineHeight: 1.4 }}>
            {quizQuestions[currentQuestion].q}
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {quizQuestions[currentQuestion].a.map((ans, idx) => (
              <button 
                key={idx}
                style={{
                  padding: '18px 24px',
                  borderRadius: '12px',
                  border: '1.5px solid #E5E7EB',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#374151',
                  cursor: 'pointer',
                  transition: '0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
                onMouseOver={(e) => e.target.style.background = '#F9FAFB'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #E5E7EB', flexShrink: 0 }} />
                {ans}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            style={{ padding: '12px 24px', borderRadius: '10px', background: '#fff', border: '1px solid #E5E7EB', fontWeight: 700, cursor: 'pointer', opacity: currentQuestion === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <button 
            onClick={() => {
              if (currentQuestion < quizQuestions.length - 1) setCurrentQuestion(prev => prev + 1);
              else setView('result');
            }}
            style={{ padding: '12px 32px', borderRadius: '10px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'result') {
    return (
      <div className="quiz-attempt-container" style={{ textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', border: '1px solid #E5E7EB', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', background: '#fff' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(233,34,34,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--brand-red)' }}>
             <Icon name="check" size={40} />
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 950, marginBottom: '10px', color: 'var(--brand-black)' }}>Outstanding!</h2>
          <p style={{ color: '#6B7280', fontWeight: 600, marginBottom: '40px' }}>You successfully completed the quiz session.</p>
          
          <div className="quiz-result-stats">
            <div style={{ padding: '30px 20px', background: 'var(--slate-50)', borderRadius: '24px', border: '1px solid var(--slate-100)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--brand-red)', marginBottom: 4 }}>11/12</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Score</div>
            </div>
            <div style={{ padding: '30px 20px', background: 'var(--slate-50)', borderRadius: '24px', border: '1px solid var(--slate-100)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--brand-red)', marginBottom: 4 }}>92%</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Precision</div>
            </div>
            <div style={{ padding: '30px 20px', background: 'var(--slate-50)', borderRadius: '24px', border: '1px solid var(--slate-100)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 950, color: 'var(--brand-red)', marginBottom: 4 }}>08:42</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Time</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={() => setView('attempt')} className="btn-brand-outline" style={{ padding: '16px 40px', borderRadius: '16px', fontSize: '0.85rem' }}>TRY AGAIN</button>
            <button onClick={() => setView('list')} className="btn-brand-primary" style={{ padding: '16px 40px', borderRadius: '16px', fontSize: '0.85rem' }}>BACK TO HUB</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-page">
      
      {/* ── HEADER ── */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Quizzes</h1>
          <p className="platform-page-subtitle">Practice and test your knowledge</p>
        </div>
      </header>

      <div className="quiz-hub-layout">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="quiz-sidebar">
          <SidebarItem label="All Quizzes" icon="books" active={activeTab === 'All Quizzes'} onClick={() => setActiveTab('All Quizzes')} />
          <SidebarItem label="Pending" icon="clock" active={activeTab === 'Pending'} onClick={() => setActiveTab('Pending')} />
          <SidebarItem label="Submitted" icon="fileText" active={activeTab === 'Submitted'} onClick={() => setActiveTab('Submitted')} />
          <SidebarItem label="Graded" icon="award" active={activeTab === 'Graded'} onClick={() => setActiveTab('Graded')} />
          <SidebarItem label="Late Submissions" icon="target" active={activeTab === 'Late Submissions'} onClick={() => setActiveTab('Late Submissions')} />
        </aside>

        <main className="quiz-main-content">
          <div className="platform-grid">
            <AnimatePresence>
              {filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz, idx) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  onStart={(q) => {
                    setSelectedQuiz(q);
                    setView('attempt');
                    setCurrentQuestion(0);
                  }} 
                />
              )) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '32px', border: '2px dashed #F3F4F6' }}>
                  <Icon name="pencil" size={48} color="#E5E7EB" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#374151' }}>No quizzes found</h3>
                  <p style={{ color: '#9CA3AF' }}>Check back later for new knowledge checks.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
      <style jsx global>{`
        .quiz-hub-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; }
        .quiz-attempt-container { max-width: 800px; margin: 40px auto; padding: 0 20px; }
        .quiz-result-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        
        @media (max-width: 1060px) {
          .quiz-hub-layout { grid-template-columns: 1fr; gap: 24px; }
          .quiz-sidebar { display: flex; flex-direction: row !important; overflow-x: auto; padding-bottom: 10px; gap: 12px !important; }
          .quiz-sidebar > div { white-space: nowrap; flex-shrink: 0; }
        }
        
        @media (max-width: 768px) {
          .quiz-attempt-container { margin: 20px auto; }
          .quiz-result-stats { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </div>
  );
}
