'use client';

import Icon from '@/components/Icon';

export default function GroupsPage() {
  const groups = [
    { name: 'FinTech Founders Hub', members: 1240, active: 42, color: 'var(--brand-red)', tag: 'Finance' },
    { name: 'SaaS Builder Cohort', members: 850, active: 28, color: 'var(--brand-orange)', tag: 'Software' },
    { name: 'HealthTech Pioneers', members: 630, active: 15, color: '#10B981', tag: 'Medical' },
    { name: 'DeepTech Research', members: 420, active: 10, color: '#8B5CF6', tag: 'AI/ML' },
  ];

  return (
    <div className="platform-page">
      <div className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Learning Groups</h1>
          <p className="platform-page-subtitle">Join cohorts of like-minded founders and learn together</p>
        </div>
        <button className="btn-brand">
          <Icon name="plus" size={16} /> Create Group
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="platform-info-card" style={{ background: 'var(--brand-black)', color: '#fff', padding: '2rem' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '1.3rem', fontWeight: 900, color: 'var(--brand-orange)' }}>Community Pulse</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, lineHeight: 1.5 }}>You are currently contributing to <span style={{ color: '#fff' }}>3 elite communities</span>. Your collaborative score has increased by <span style={{ color: 'var(--brand-red)' }}>+15%</span> this week.</p>
        </div>
        <div className="platform-info-card" style={{ background: 'var(--red-50)', borderColor: 'var(--red-200)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(233,34,34,0.1)' }}>
            <Icon name="users" size={28} color="var(--brand-red)" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>2,450</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)' }}>Total active builders online</div>
          </div>
        </div>
      </div>

      <div className="platform-section-label">RECOMMENDED GROUPS <span className="platform-section-count">4</span></div>
      <div className="platform-grid">
        {groups.map((g, idx) => (
          <div key={idx} className="platform-card-v hover-lift">
            <div style={{ height: '120px', background: `linear-gradient(135deg, ${g.color} 0%, var(--brand-black) 100%)`, position: 'relative' }}>
               <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                  <span className="tag-pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>{g.tag}</span>
               </div>
            </div>
            <div className="platform-card-v__body" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1.1rem', fontWeight: 900 }}>{g.name}</h3>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Members</span>
                    <span style={{ fontSize: '1rem', fontWeight: 900 }}>{g.members.toLocaleString()}</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase' }}>Active Now</span>
                    <span style={{ fontSize: '1rem', fontWeight: 900 }}>{g.active} Founders</span>
                 </div>
              </div>
            </div>
            <div className="platform-card-v__footer" style={{ background: 'var(--slate-50)', padding: '1rem 1.5rem' }}>
               <button className="btn-brand" style={{ width: '100%', justifyContent: 'center' }}>Request to Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
