'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import Link from 'next/link';

// ── MOCK DATA ──
const QUIZZES = [
  { id: 'q1', title: 'React Hooks Mastery', category: 'Frontend', difficulty: 'Medium', questions: 12, time: 15, attempts: 240, progress: 65, description: 'Deep dive into useEffect, useMemo, and custom hooks architecture.' },
  { id: 'q2', title: 'Prompt Engineering Essentials', category: 'AI', difficulty: 'Easy', questions: 8, time: 10, attempts: 1500, description: 'Learn the fundamentals of zero-shot, few-shot, and chain-of-thought prompting.' },
  { id: 'q3', title: 'Startup Growth Hacking', category: 'Business', difficulty: 'Hard', questions: 20, time: 25, attempts: 85, progress: 0, description: 'Advanced strategies for rapid user acquisition and retention loops.' },
  { id: 'q4', title: 'Next.js App Router', category: 'Frontend', difficulty: 'Medium', questions: 10, time: 12, attempts: 420, description: 'Master server components, suspense boundaries, and parallel routing.' },
  { id: 'q5', title: 'Venture Capital 101', category: 'Business', difficulty: 'Easy', questions: 15, time: 20, attempts: 310, description: 'Understanding term sheets, valuations, and cap table basics.' },
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
      background: active ? '#F97316' : 'transparent',
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
        background: 'rgba(249, 115, 22, 0.1)', 
        color: '#F97316', 
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
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, color: '#F97316', marginBottom: '6px' }}>
          <span>PROGRESS</span>
          <span>{quiz.progress}%</span>
        </div>
        <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${quiz.progress}%` }} style={{ height: '100%', background: '#F97316' }} />
        </div>
      </div>
    )}

    <button 
      onClick={() => onStart(quiz)}
      style={{
        marginTop: quiz.progress === undefined ? 'auto' : '15px',
        padding: '12px',
        borderRadius: '10px',
        background: '#F97316',
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
      const matchDiff = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      return matchSearch && matchDiff;
    });
  }, [search, difficultyFilter]);

  if (view === 'attempt') {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{selectedQuiz.title}</h2>
            <p style={{ margin: '4px 0 0', color: '#6B7280', fontWeight: 600 }}>Question {currentQuestion + 1} / {quizQuestions.length}</p>
          </div>
          <div style={{ background: '#FFF7ED', color: '#F97316', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', border: '1px solid #FFEDD5' }}>
            14:52
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
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
            style={{ padding: '12px 32px', borderRadius: '10px', background: '#F97316', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'result') {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '24px', padding: '60px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#16A34A' }}>
             <Icon name="check" size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>Outstanding!</h2>
          <p style={{ color: '#6B7280', fontWeight: 500, marginBottom: '40px' }}>You successfully completed the React Hooks Mastery quiz.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F97316' }}>11/12</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Score</div>
            </div>
            <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F97316' }}>92%</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Precision</div>
            </div>
            <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '16px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F97316' }}>08:42</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Time</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={() => setView('attempt')} style={{ padding: '14px 30px', borderRadius: '12px', background: '#fff', border: '1px solid #E5E7EB', fontWeight: 700, cursor: 'pointer' }}>Retry Quiz</button>
            <button onClick={() => setView('list')} style={{ padding: '14px 30px', borderRadius: '12px', background: '#F97316', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Back to Hub</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem', background: '#F9FAFB', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
      
      {/* ── HEADER ── */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>Quizzes</h1>
          <p style={{ color: '#6B7280', fontWeight: 500, margin: '4px 0 0' }}>Practice and test your knowledge</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search quizzes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '12px 40px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '0.9rem', width: '280px', outline: 'none' }} 
            />
            <div style={{ position: 'absolute', left: '14px', top: '12px' }}><Icon name="search" size={16} color="#9CA3AF" /></div>
          </div>
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '0.9rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button style={{ padding: '12px 24px', borderRadius: '12px', background: '#F97316', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="plus" size={18} /> Create Quiz
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: '32px' }}>
        
        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarItem label="All Quizzes" icon="books" active={activeTab === 'All Quizzes'} onClick={() => setActiveTab('All Quizzes')} />
          <SidebarItem label="My Attempts" icon="recorded" active={activeTab === 'My Attempts'} onClick={() => setActiveTab('My Attempts')} />
          <SidebarItem label="Saved Quizzes" icon="target" active={activeTab === 'Saved Quizzes'} onClick={() => setActiveTab('Saved Quizzes')} />
          <SidebarItem label="Completed" icon="check" active={activeTab === 'Completed'} onClick={() => setActiveTab('Completed')} />
          
          <div style={{ marginTop: '30px', marginLeft: '16px', fontSize: '0.75rem', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: '10px' }}>CATEGORIES</div>
          {CATEGORIES.slice(1).map(cat => (
            <SidebarItem key={cat} label={cat} active={activeTab === cat} onClick={() => setActiveTab(cat)} />
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <AnimatePresence>
              {filteredQuizzes.map((quiz, idx) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  onStart={(q) => {
                    setSelectedQuiz(q);
                    setView('attempt');
                    setCurrentQuestion(0);
                  }} 
                />
              ))}
            </AnimatePresence>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Leaderboard */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="zap" size={18} color="#F97316" /> Top Performers
            </h4>
            <div style={{ display: 'grid', gap: '16px' }}>
              {LEADERBOARD.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: i === 0 ? '#FEF3C7' : '#F3F4F6', color: i === 0 ? '#D97706' : '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                      {p.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>{p.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>Level 24</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827' }}>{p.score} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 800 }}>Suggested for You</h4>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ padding: '12px', border: '1px solid #F3F4F6', borderRadius: '12px', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>Advanced Typography</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>12 Questions • 15 mins</div>
              </div>
              <div style={{ padding: '12px', border: '1px solid #F3F4F6', borderRadius: '12px', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>Market Research Pro</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>10 Questions • 12 mins</div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
