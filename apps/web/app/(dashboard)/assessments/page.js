'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const ASSESSMENTS = [
  { id:'a1', title:'Startup Fundamentals Quiz',     course:'Entrepreneurial Fund.', type:'Quiz',       questions:20, duration:'30 min', due:'Apr 10', status:'pending',  score:null,  pass:60 },
  { id:'a2', title:'Pitch Deck Evaluation',         course:'Pitch Deck Workshop',  type:'Assignment',  questions:5,  duration:'60 min', due:'Apr 15', status:'pending',  score:null,  pass:70 },
  { id:'a3', title:'Market Research Exam',          course:'Market Research 101',  type:'Exam',        questions:35, duration:'45 min', due:'Apr 20', status:'pending',  score:null,  pass:65 },
  { id:'a4', title:'Legal Compliance Check',        course:'Startup Legalities',   type:'Quiz',        questions:15, duration:'20 min', due:'Apr 8',  status:'overdue',  score:null,  pass:60 },
  { id:'a5', title:'Entrepreneurship Basics Test',  course:'Entrepreneurial Fund.', type:'Exam',       questions:30, duration:'40 min', due:'Mar 20', status:'completed',score:88,    pass:60 },
  { id:'a6', title:'Lean Canvas Assignment',        course:'Lean Startup',         type:'Assignment',  questions:3,  duration:'90 min', due:'Mar 15', status:'completed',score:74,    pass:70 },
];

const TYPE_COLORS = { Quiz:'tag-red', Assignment:'tag-red', Exam:'tag-red' };
const STATUS_STYLE = {
  pending:   { bg:'rgba(239, 68, 68, 0.05)', tc:'#ef4444', label:'Pending' },
  overdue:   { bg:'rgba(239, 68, 68, 0.1)',    tc:'#ef4444',    label:'Overdue' },
  completed: { bg:'#f0fdf4',         tc:'#059669',             label:'Completed' },
};

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  
  const filtered = useMemo(() => {
    if (activeTab === 'completed') return ASSESSMENTS.filter(a => a.status === 'completed');
    if (activeTab === 'pending') return ASSESSMENTS.filter(a => a.status !== 'completed');
    if (activeTab === 'late') return ASSESSMENTS.filter(a => a.status === 'overdue');
    if (activeTab === 'submitted') return ASSESSMENTS.filter(a => a.status === 'completed'); // Mock: assuming submitted means completed for now
    return ASSESSMENTS;
  }, [activeTab]);

  const tabs = [
    { id: 'pending', label: 'Pending', icon: 'clock' },
    { id: 'submitted', label: 'Submitted', icon: 'fileText' },
    { id: 'completed', label: 'Graded', icon: 'award' },
    { id: 'late', label: 'Late', icon: 'target' }
  ];

  return (
    <div className="platform-page assessment-hub-page">
      <header className="platform-page-header assessment-header">
        <div className="header-text-group">
          <h1 className="platform-page-title">
            Assessment <span className="red-glow">Engine</span>
          </h1>
          <p className="platform-page-subtitle">Standardized testing and project evaluations for the elite track.</p>
        </div>
      </header>

      <div className="assessment-hub-layout">
        <aside className="assessment-nav custom-scrollbar">
          <div className="nav-stack">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon name={tab.icon} size={18} color={activeTab === tab.id ? '#fff' : '#64748b'} stroke={2.5} />
                <span className="nav-label">{tab.label}</span>
                {activeTab === tab.id && <motion.div layoutId="activeInd" className="nav-accent" />}
              </div>
            ))}
          </div>
        </aside>

        <main className="assessment-main-content">
          <div className="platform-grid fluid-grid-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((a, i) => {
                const st = STATUS_STYLE[a.status] || STATUS_STYLE.pending;
                return (
                  <motion.div 
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="assessment-card-v glass-card"
                  >
                    <div className="card-top">
                      <div className="badge-row">
                        <span className="type-tag">{a.type}</span>
                        <div className="status-pill-v2" style={{ background: st.bg, color: st.tc }}>
                           <div className="status-dot" style={{ background: st.tc }} />
                           {st.label}
                        </div>
                      </div>
                      <div className="card-glyph-box">
                        <Icon name={a.type==='Quiz'?'helpCircle':a.type==='Assignment'?'pencil':'fileText'} size={24} color="#ef4444" stroke={2.5} />
                      </div>
                    </div>

                    <div className="card-content">
                      <h3 className="assessment-headline">{a.title}</h3>
                      <p className="assessment-course-name">{a.course}</p>
                      
                      <div className="assessment-metrics">
                        <div className="metric-pill">
                          <Icon name="helpCircle" size={14} color="#94a3b8" />
                          <span>{a.questions} {a.type==='Assignment'?'Files':'Questions'}</span>
                        </div>
                        <div className="metric-pill">
                          <Icon name="clock" size={14} color="#94a3b8" />
                          <span>{a.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer-v2">
                      <div className="deadline-box">
                         {a.score !== null ? (
                           <div className="score-result">
                              <span className="score-label">PROFICIENCY</span>
                              <span className="score-val">{a.score}%</span>
                           </div>
                         ) : (
                           <div className="due-result">
                              <span className="due-label">DEADLINE</span>
                              <span className="due-val">{a.due}</span>
                           </div>
                         )}
                      </div>
                      <button className={`action-btn-main ${a.status === 'completed' ? 'secondary' : 'primary'}`}>
                        {a.status === 'completed' ? 'VIEW RESULTS' : 'START NOW'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .assessment-hub-page { padding: 4rem 4rem 10rem; background: #fff; min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .assessment-header { margin-bottom: 5rem; }
        .red-glow { color: #ef4444; }
        
        .assessment-hub-layout { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; }
        
        .nav-stack { display: flex; flex-direction: column; gap: 8px; position: sticky; top: 2rem; }
        .nav-item { display: flex; align-items: center; gap: 14px; padding: 16px 24px; border-radius: 20px; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; color: #64748b; font-weight: 850; font-size: 0.95rem; }
        .nav-item:hover { background: #f8fafc; color: #0f172a; }
        .nav-item.active { background: #ef4444; color: #fff; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2); }
        .nav-accent { position: absolute; right: 12px; width: 6px; height: 6px; border-radius: 50%; background: #fff; }
        
        .assessment-card-v { background: #fff; border-radius: 44px; padding: 2.5rem; border: 1.5px solid #f1f5f9; height: 100%; display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .assessment-card-v:hover { transform: translateY(-10px); border-color: #ef4444; box-shadow: 0 30px 60px rgba(239, 68, 68, 0.08); }
        
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .badge-row { display: flex; flex-direction: column; gap: 10px; }
        .type-tag { font-size: 0.65rem; font-weight: 950; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; }
        .status-pill-v2 { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 12px; font-size: 0.7rem; font-weight: 950; width: fit-content; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }
        .card-glyph-box { width: 64px; height: 64px; border-radius: 20px; background: #fef2f2; display: flex; align-items: center; justify-content: center; border: 1.5px solid #f1f5f9; }
        
        .card-content { flex: 1; margin-bottom: 2.5rem; }
        .assessment-headline { font-size: 1.4rem; font-weight: 950; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.02em; }
        .assessment-course-name { font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 1.5rem; }
        .assessment-metrics { display: flex; gap: 1.5rem; }
        .metric-pill { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 850; color: #94a3b8; }
        
        .card-footer-v2 { padding-top: 2rem; border-top: 1.5px solid #f8fafc; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; }
        .deadline-box { display: flex; flex-direction: column; }
        .due-label, .score-label { font-size: 0.65rem; font-weight: 950; color: #94a3b8; letter-spacing: 0.1em; }
        .due-val { font-size: 0.95rem; font-weight: 950; color: #ef4444; }
        .score-val { font-size: 1.25rem; font-weight: 950; color: #10b981; }
        
        .action-btn-main { padding: 14px 28px; border-radius: 18px; border: none; font-size: 0.85rem; font-weight: 950; cursor: pointer; transition: all 0.3s; }
        .action-btn-main.primary { background: #0f172a; color: #fff; }
        .action-btn-main.primary:hover { background: #ef4444; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25); }
        .action-btn-main.secondary { background: #f8fafc; color: #0f172a; border: 1.5px solid #f1f5f9; }
        .action-btn-main.secondary:hover { background: #fef2f2; color: #ef4444; border-color: #fef2f2; }

        @media (max-width: 1100px) {
          .assessment-hub-page { padding: 0 1.5rem 8rem; }
          .assessment-header { padding-top: 5rem; }
          .assessment-hub-layout { grid-template-columns: 1fr; gap: 3rem; }
          .assessment-nav { position: sticky; top: 0; z-index: 100; background: #fff; padding: 1rem 0; margin: 0 -1.5rem; overflow-x: auto; }
          .nav-stack { flex-direction: row; padding: 0 1.5rem; gap: 10px; position: static; }
          .nav-item { padding: 12px 20px; white-space: nowrap; border-radius: 14px; }
          .nav-accent { display: none; }
        }

        @media (max-width: 600px) {
          .platform-page-title { font-size: 2.5rem; }
          .assessment-card-v { padding: 2rem; border-radius: 36px; }
          .assessment-headline { font-size: 1.15rem; }
          .card-footer-v2 { flex-direction: column; align-items: flex-start; }
          .action-btn-main { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}
