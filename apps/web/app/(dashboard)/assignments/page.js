'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const ASSESSMENTS = [
  { id:'a1', title:'Startup Fundamentals Quiz',     course:'Entrepreneurial Fund.', type:'Quiz',       questions:20, duration:'30 min', due:'Apr 10', status:'pending',  score:null,  pass:60 },
  { id:'a2', title:'Pitch Deck Evaluation',         course:'Pitch Deck Workshop',  type:'Assignment',  questions:5,  duration:'60 min', due:'Apr 15', status:'pending',  score:null,  pass:70 },
  { id:'a3', title:'Market Research Exam',          course:'Market Research 101',  type:'Exam',        questions:35, duration:'45 min', due:'Apr 20', status:'pending',  score:null,  pass:65 },
  { id:'a4', title:'Legal Compliance Check',        course:'Startup Legalities',   type:'Quiz',        questions:15, duration:'20 min', due:'Apr 8',  status:'overdue',  score:null,  pass:60 },
  { id:'a5', title:'Entrepreneurship Basics Test',  course:'Entrepreneurial Fund.', type:'Exam',       questions:30, duration:'40 min', due:'Mar 20', status:'completed',score:88,    pass:60 },
  { id:'a6', title:'Lean Canvas Assignment',        course:'Lean Startup',         type:'Assignment',  questions:3,  duration:'90 min', due:'Mar 15', status:'completed',score:74,    pass:70 },
];

const STATUS_STYLE = {
  pending:   { bg:'rgba(245,158,11,0.05)', tc:'#d97706', label:'Pending' },
  overdue:   { bg:'rgba(233,34,34,0.05)',  tc:'var(--brand-red)', label:'Overdue' },
  completed: { bg:'rgba(16,185,129,0.05)', tc:'#059669', label:'Completed' },
};

export default function AssignmentsPage() {
  const filtered = ASSESSMENTS.filter(a => a.type === 'Assignment');

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Assignments</h1>
          <p className="platform-page-subtitle">Submit your projects and practical exercises here.</p>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        {filtered.map((a) => {
          const st = STATUS_STYLE[a.status];
          return (
            <div key={a.id} className="platform-info-card glass-card" style={{ display:'grid', gridTemplateColumns:'50px 1fr auto', alignItems:'center', gap:'1.5rem', padding:'1.5rem', borderRadius: '24px' }}>
              <div style={{ borderRadius: '16px', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,158,11,0.1)' }}>
                <Icon name="pencil" size={22} color="#f59e0b" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:6, flexWrap:'wrap' }}>
                  <h3 style={{ fontWeight:950, color:'var(--brand-black)', margin:0, fontSize:'1.1rem' }}>{a.title}</h3>
                  <span style={{ background:st.bg, color:st.tc, borderRadius:'8px', padding:'3px 10px', fontSize:'0.65rem', fontWeight:950, textTransform: 'uppercase' }}>{st.label}</span>
                </div>
                <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-500)', fontWeight:800 }}>{a.course}</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><Icon name="clock" size={12} color="var(--slate-400)" /> Estimated {a.duration}</span>
                  {a.status!=='completed' && <span style={{ fontSize:'0.75rem', color:a.status==='overdue'?'var(--brand-red)':'#f59e0b', fontWeight:900 }}>Deadline: {a.due}</span>}
                  {a.score!==null && <span style={{ fontSize:'0.75rem', color:'#059669', fontWeight:950 }}>Grade: {a.score}/100</span>}
                </div>
              </div>
              <div>
                <button className={a.status==='completed' ? 'btn-black' : 'btn-brand'} style={{ fontSize:'0.75rem', padding: '10px 24px' }}>
                  {a.status==='completed' ? 'View Submission' : 'Upload Solution'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
