'use client';

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
  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Final Assessments</h1>
          <p className="platform-page-subtitle">Certification tests and formal evaluations.</p>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        {ASSESSMENTS.map((a) => {
          const st = STATUS_STYLE[a.status];
          return (
            <div key={a.id} className="platform-info-card glass-card" style={{ display:'grid', gridTemplateColumns:'60px 1fr auto', alignItems:'center', gap:'2rem', padding:'1.5rem 2rem', borderRadius: '24px' }}>
              <div style={{ borderRadius: '16px', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)' }}>
                <Icon name="fileText" size={28} color="var(--brand-red)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:8, flexWrap:'wrap' }}>
                  <h3 style={{ fontWeight:950, color:'var(--brand-black)', margin:0, fontSize:'1.1rem' }}>{a.title}</h3>
                  <span style={{ background:st.bg, color:st.tc, borderRadius:'8px', padding:'4px 14px', fontSize:'0.65rem', fontWeight:950, textTransform: 'uppercase' }}>{st.label}</span>
                </div>
                <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ fontSize:'0.8rem', color:'var(--slate-500)', fontWeight:850 }}>{a.course}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:'var(--slate-400)', fontSize:'0.75rem', fontWeight:800 }}>
                    <Icon name="helpCircle" size={12} />
                    {a.questions} Questions
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:'var(--slate-400)', fontSize:'0.75rem', fontWeight:800 }}>
                    <Icon name="clock" size={12} />
                    {a.duration} Limit
                  </div>
                  {a.score!==null && (
                    <div style={{ display:'flex', alignItems:'center', gap:6, color:'#059669', fontSize:'0.8rem', fontWeight:950 }}>
                      <Icon name="checkCircle" size={14} />
                      Result: {a.score}%
                    </div>
                  )}
                </div>
              </div>
              <div>
                {a.status==='completed' ? (
                  <button style={{ padding: '12px 24px', fontSize: '0.8rem', background: 'var(--brand-black)', color: '#fff', borderRadius: '12px', fontWeight: 950, border: 'none' }}>REVIEW PAPER</button>
                ) : (
                  <button style={{ padding: '12px 28px', fontSize: '0.8rem', background: 'var(--brand-black)', color: '#fff', borderRadius: '12px', fontWeight: 950, border: 'none' }}>ENTER EXAM HALL</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
