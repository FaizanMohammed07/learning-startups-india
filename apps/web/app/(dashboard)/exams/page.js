'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const ASSESSMENTS = [
  { id:'a3', title:'Market Research Exam',          course:'Market Research 101',  type:'Exam',        questions:35, duration:'45 min', due:'Apr 20', status:'pending',  score:null,  pass:65 },
  { id:'a5', title:'Entrepreneurship Basics Test',  course:'Entrepreneurial Fund.', type:'Exam',       questions:30, duration:'40 min', due:'Mar 20', status:'completed',score:88,    pass:60 },
];

const STATUS_STYLE = {
  pending:   { bg:'rgba(235,35,39,0.05)', tc:'var(--brand-red)', label:'Scheduled' },
  completed: { bg:'rgba(16,185,129,0.05)', tc:'#059669', label:'Completed' },
};

export default function ExamsPage() {
  const [tab, setTab] = useState('pending');
  const filtered = tab==='pending'
    ? ASSESSMENTS.filter(a=>a.status!=='completed')
    : ASSESSMENTS.filter(a=>a.status==='completed');

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Exams</h1>
          <p className="platform-page-subtitle">Certification tests and formal evaluations.</p>
        </div>
      </div>

      <div className="platform-tabs" style={{ marginBottom: '2.5rem' }}>
        <button className={`platform-tab ${tab==='pending'?'active':''}`} onClick={()=>setTab('pending')}>Upcoming Exams</button>
        <button className={`platform-tab ${tab==='completed'?'active':''}`} onClick={()=>setTab('completed')}>Passed / History</button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
        {filtered.map((a) => {
          const st = STATUS_STYLE[a.status];
          return (
            <div key={a.id} className="platform-info-card glass-card" style={{ display:'grid', gridTemplateColumns:'50px 1fr auto', alignItems:'center', gap:'1.5rem', padding:'1.25rem 1.5rem', borderRadius: '24px' }}>
              <div className="icon-box-red" style={{ borderRadius: '16px', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)' }}>
                <Icon name="fileText" size={22} color="var(--brand-red)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:6, flexWrap:'wrap' }}>
                  <h3 style={{ fontWeight:950, color:'var(--brand-black)', margin:0, fontSize:'1.05rem' }}>{a.title}</h3>
                  <span style={{ background:st.bg, color:st.tc, borderRadius:'8px', padding:'3px 10px', fontSize:'0.65rem', fontWeight:950, textTransform: 'uppercase' }}>{st.label}</span>
                </div>
                <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-500)', fontWeight:800 }}>{a.course}</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><Icon name="helpCircle" size={12} color="var(--slate-400)" />{a.questions} Qs</span>
                  <span style={{ fontSize:'0.75rem', color:'var(--slate-400)', fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><Icon name="clock" size={12} color="var(--slate-400)" />{a.duration}</span>
                  {a.score!==null && <span style={{ fontSize:'0.75rem', color:'#059669', fontWeight:950 }}>Score: {a.score}% — PASSED</span>}
                </div>
              </div>
              <div>
                {a.status==='completed'
                  ? <button className="btn-brand-outline" style={{ fontSize:'0.75rem', padding: '10px 24px', borderRadius: '12px' }}>REVIEW PAPER</button>
                  : <button className="btn-brand" style={{ fontSize:'0.75rem', padding: '10px 28px', borderRadius: '12px', border: 'none' }}>ENTER EXAM HALL</button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
