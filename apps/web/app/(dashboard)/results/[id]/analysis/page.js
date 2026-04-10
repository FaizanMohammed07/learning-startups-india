'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_ANALYSIS = {
  id: 'r1',
  title: 'Entrepreneurship Basics Test',
  description: 'Comprehensive evaluation of core startup concepts, market validation, and fundraising basics.',
  date: 'Mar 20, 2025',
  metrics: {
    score: 88,
    totalQuestions: 25,
    correct: 22,
    wrong: 2,
    skipped: 1,
    timeSpent: '42m 12s',
    accuracy: '88%'
  },
  questions: [
    {
      id: 1,
      text: "What is the primary indicator of Product-Market Fit according to the lean startup methodology?",
      options: [
        "High initial social media engagement",
        "At least 40% of users saying they would be 'very disappointed' if they could no longer use the product",
        "Securing a Tier-1 Venture Capital term sheet",
        "Achieving positive unit economics on day one"
      ],
      selected: 1, // Index of selected option
      correct: 1,
      explanation: "Product-Market Fit is best measured by user retention and sentiment. Sean Ellis's 40% rule is a widely accepted benchmark for quantifying PMF."
    },
    {
      id: 2,
      text: "In a Cap Table, what does 'Fully Diluted' typically include?",
      options: [
        "Only common stock issued to founders",
        "Common stock and preferred stock only",
        "All issued shares plus all potential shares from options, warrants, and convertible debt",
        "Only shares held by investors"
      ],
      selected: 2,
      correct: 2,
      explanation: "A fully diluted cap table accounts for every share that could potentially be issued, ensuring everyone knows their actual ownership stake."
    },
    {
      id: 3,
      text: "Which of these is NOT a characteristic of a 'Vitamin' product?",
      options: [
        "It addresses a critical, immediate pain point",
        "Users can live without it in the short term",
        "Usage is often driven by positive reinforcement rather than pain relief",
        "Harder to sell during an economic downturn"
      ],
      selected: 2,
      correct: 0,
      explanation: "A product that addresses an immediate pain point is a 'Painkiller'. Vitamins are 'nice to-haves' that improve life but aren't strictly essential for survival."
    },
    {
       id: 4,
       text: "What does CAC stand for in unit economics?",
       options: [
         "Capital Allocation Cost",
         "Customer Acquisition Cost",
         "Consumer Analytics Center",
         "Commercial Asset Capacity"
       ],
       selected: 1,
       correct: 1,
       explanation: "CAC is the total cost of sales and marketing efforts that are needed to acquire a customer."
    }
  ]
};

export default function AnalysisPage() {
  const params = useParams();
  const [activeFilter, setActiveFilter] = useState('all'); // all, correct, wrong, skipped

  const filteredQuestions = MOCK_ANALYSIS.questions.filter(q => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'correct') return q.selected === q.correct;
    if (activeFilter === 'wrong') return q.selected !== q.correct && q.selected !== null;
    if (activeFilter === 'skipped') return q.selected === null;
    return true;
  });

  return (
    <div className="platform-page">
      {/* HEADER */}
      <div className="platform-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
             <Link href="/results" style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }} className="hover-red-border">
                <Icon name="chevronLeft" size={18} />
             </Link>
             <span style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--brand-red)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Performance Analysis</span>
          </div>
          <h1 className="platform-page-title" style={{ marginBottom: '10px' }}>{MOCK_ANALYSIS.title}</h1>
          <p className="platform-page-subtitle">{MOCK_ANALYSIS.description}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--slate-400)' }}>Completed on {MOCK_ANALYSIS.date}</span>
        </div>
      </div>

      {/* SCORECARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
         <div className="glass-card" style={{ padding: '2.5rem', background: '#fef2f2', border: '1px solid #fee2e2', color: '#0f172a' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#ef4444', letterSpacing: '0.1em', marginBottom: '1rem' }}>OVERALL ACCURACY</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
               <span style={{ fontSize: '3.5rem', fontWeight: 950 }}>{MOCK_ANALYSIS.metrics.score}</span>
               <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94a3b8' }}>/ 100</span>
            </div>
            <div style={{ marginTop: '1.5rem', height: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ width: `${MOCK_ANALYSIS.metrics.score}%`, height: '100%', background: 'var(--brand-red)', borderRadius: '4px' }} />
            </div>
         </div>
         
         {[
           { label: 'Correct', val: MOCK_ANALYSIS.metrics.correct, color: '#10b981', icon: 'check' },
           { label: 'Incorrect', val: MOCK_ANALYSIS.metrics.wrong, color: '#ef4444', icon: 'x' },
           { label: 'Time Spent', val: MOCK_ANALYSIS.metrics.timeSpent, color: '#6366f1', icon: 'clock' }
         ].map((m, i) => (
           <div key={i} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                 <Icon name={m.icon} size={14} color={m.color} />
                 <span style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-500)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{m.label}</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 950, color: 'var(--brand-black)' }}>{m.val}</div>
           </div>
         ))}
      </div>

      {/* FILTER TABS */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '30px' }}>
         {['all', 'correct', 'wrong', 'skipped'].map(f => (
           <button 
             key={f} 
             onClick={() => setActiveFilter(f)}
             style={{ 
               paddingBottom: '15px', 
               border: 'none', 
               background: 'transparent',
               color: activeFilter === f ? 'var(--brand-black)' : 'var(--slate-400)',
               fontWeight: 950,
               fontSize: '0.75rem',
               textTransform: 'uppercase',
               letterSpacing: '0.05em',
               cursor: 'pointer',
               position: 'relative'
             }}
           >
             {f} Questions
             {activeFilter === f && <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '3px', background: 'var(--brand-red)', borderRadius: '2px' }} />}
           </button>
         ))}
      </div>

      {/* QUESTIONS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px' }}>
         {filteredQuestions.map((q, idx) => (
            <div key={q.id} className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--slate-400)' }}>QUESTION {idx + 1} OF {MOCK_ANALYSIS.metrics.totalQuestions}</span>
                  {q.selected === q.correct ? (
                    <span style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', padding: '6px 12px', borderRadius: '100px' }}>
                       <Icon name="check" size={12} /> CORRECT
                    </span>
                  ) : (
                    <span style={{ color: '#ef4444', fontSize: '0.65rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '5px', background: '#fef2f2', padding: '6px 12px', borderRadius: '100px' }}>
                       <Icon name="x" size={12} /> INCORRECT
                    </span>
                  )}
               </div>
               
               <h3 style={{ fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)', lineHeight: 1.5, marginBottom: '2rem' }}>{q.text}</h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                  {q.options.map((opt, i) => {
                     let status = 'normal';
                     if (i === q.correct) status = 'correct';
                     if (i === q.selected && i !== q.correct) status = 'wrong';
                     
                     return (
                        <div key={i} style={{ 
                           padding: '1.25rem 1.5rem', 
                           borderRadius: '16px', 
                           border: '1.5px solid',
                           borderColor: status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#f1f5f9'),
                           background: status === 'correct' ? '#f0fdf4' : (status === 'wrong' ? '#fef2f2' : '#fff'),
                           display: 'flex',
                           alignItems: 'center',
                           gap: '12px'
                        }}>
                           <div style={{ 
                             width: '24px', height: '24px', borderRadius: '50%', border: '2px solid', 
                             borderColor: status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#e2e8f0'),
                             display: 'flex', alignItems: 'center', justifyContent: 'center',
                             fontSize: '0.7rem', fontWeight: 950,
                             background: status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : 'transparent'),
                             color: status !== 'normal' ? '#fff' : '#64748b'
                           }}>
                              {String.fromCharCode(65 + i)}
                           </div>
                           <span style={{ fontSize: '0.9rem', fontWeight: 750, color: status === 'normal' ? 'var(--slate-600)' : 'var(--brand-black)' }}>{opt}</span>
                        </div>
                     )
                  })}
               </div>

               <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <Icon name="info" size={14} color="var(--brand-red)" />
                     <span style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--brand-black)', textTransform: 'uppercase' }}>Learning Insight</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6, fontWeight: 750 }}>{q.explanation}</p>
               </div>
            </div>
         ))}
      </div>

      <style jsx global>{`
        .hover-red-border:hover { border-color: var(--brand-red) !important; color: var(--brand-red) !important; }
      `}</style>
    </div>
  );
}
