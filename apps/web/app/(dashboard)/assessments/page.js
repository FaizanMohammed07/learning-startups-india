'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

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
  pending:   { bg:'rgba(235,35,39,0.05)', tc:'var(--brand-red)', label:'Pending' },
  overdue:   { bg:'rgba(235,35,39,0.1)',    tc:'var(--brand-red)',    label:'Overdue' },
  completed: { bg:'#f0fdf4',         tc:'#059669',             label:'Completed' },
};

export default function AssessmentsPage() {
  const [tab, setTab] = useState('pending');
  const filtered = tab==='pending'
    ? ASSESSMENTS.filter(a=>a.status!=='completed')
    : ASSESSMENTS.filter(a=>a.status==='completed');

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Quiz Hub</h1>
          <p className="platform-page-subtitle">Test your knowledge across all your enrolled startup tracks.</p>
        </div>
      </div>


      <div className="platform-tabs">
        <button className={`platform-tab ${tab==='pending'?'active':''}`} onClick={()=>setTab('pending')}>Upcoming</button>
        <button className={`platform-tab ${tab==='completed'?'active':''}`} onClick={()=>setTab('completed')}>Completed</button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
        {filtered.map((a,i) => {
          const st = STATUS_STYLE[a.status];
          return (
            <div key={a.id} className="platform-info-card glass-card" style={{ display:'grid', gridTemplateColumns:'50px 1fr auto', alignItems:'center', gap:'1.5rem', padding:'1.25rem 1.5rem', borderRadius: '24px' }}>
              <div className="icon-box-red" style={{ borderRadius: '16px', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)' }}>
                <Icon name={a.type==='Quiz'?'helpCircle':a.type==='Assignment'?'pencil':'fileText'} size={22} color="var(--brand-red)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:6, flexWrap:'wrap' }}>
                  <h3 style={{ fontWeight:950, color:'var(--brand-black)', margin:0, fontSize:'1.05rem' }}>{a.title}</h3>
                  <span className={`tag-pill ${TYPE_COLORS[a.type]}`} style={{ fontSize: '0.6rem' }}>{a.type}</span>
                  <span style={{ background:st.bg, color:st.tc, borderRadius:'8px', padding:'3px 10px', fontSize:'0.65rem', fontWeight:950, textTransform: 'uppercase' }}>{st.label}</span>
                </div>
                <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-500)', fontWeight:800 }}>{a.course}</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><Icon name="helpCircle" size={12} color="var(--slate-400)" />{a.questions} Qs</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><Icon name="clock" size={12} color="var(--slate-400)" />{a.duration}</span>
                  {a.status!=='completed' && <span style={{ fontSize:'0.75rem', color:a.status==='overdue'?'var(--brand-red)':'var(--brand-red)', fontWeight:900 }}>Due: {a.due}</span>}
                  {a.score!==null && <span style={{ fontSize:'0.75rem', color:'#059669', fontWeight:950 }}>Score: {a.score}/100 — {a.score>=a.pass?'PASSED':'FAILED'}</span>}
                </div>
              </div>
              <div>
                {a.status==='completed'
                  ? <button className="btn-brand-outline" style={{ fontSize:'0.75rem', padding: '10px 24px', borderRadius: '12px' }}>VIEW RESULTS</button>
                  : <button className="btn-brand" style={{ fontSize:'0.75rem', padding: '10px 28px', borderRadius: '12px', border: 'none' }}>
                      {a.status==='overdue' ? 'RESUME NOW' : 'START QUIZ'}
                    </button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
