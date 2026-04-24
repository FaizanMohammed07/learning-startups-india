'use client';

import { useState, useEffect } from 'react';

export default function SkillGraphPage() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch('/api/v1/analytics/skills');
        const json = await res.json();
        if (json.success) setSkills(json.data);
      } catch (err) {
        console.error('Failed to fetch skills data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSkills();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Mapping Cognitive Proficiencies...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); }
        .dcard:hover { transform:translateY(-5px); box-shadow:0 20px 40px rgba(0,0,0,0.06); border-color:rgba(197,151,91,0.2); }
        .skill-ring { width: 100px; height: 100px; border-radius: 50%; border: 8px solid #f3f4f6; display: flex; alignItems: center; justifyContent: center; position: relative; margin: 0 auto 20px; }
        .skill-progress { position: absolute; top: -8px; left: -8px; width: 100px; height: 100px; border-radius: 50%; border: 8px solid transparent; border-top-color: #7A1F2B; transform: rotate(-45deg); }
        .accent-bar { width: 40px; height: 4px; background: #C5975B; border-radius: 2px; marginBottom: 20px; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Skill Mastery Graph</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Dynamic visualization of your core competencies and mastery levels across global startup domains.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {skills.map((s, idx) => (
          <div key={idx} className={`da da${idx+2} dcard`} style={{ padding: '3rem', textAlign: 'center' }}>
             <div className="skill-ring">
                <div className="skill-progress" style={{ transform: `rotate(${(s.level * 3.6) - 45}deg)`, borderTopColor: s.level > 70 ? '#10b981' : '#7A1F2B' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111' }}>{Math.round(s.level)}%</span>
             </div>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{s.skill}</h3>
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C5975B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.level > 80 ? 'Mastery' : s.level > 50 ? 'Proficient' : 'Developing'}
             </div>
             <div style={{ marginTop: '16px', fontSize: '0.75rem', color: '#999', fontWeight: 600 }}>
                {s.strength} EVALUATIONS LOGGED
             </div>
          </div>
        ))}
      </div>

      <div className="da da6 dcard" style={{ marginTop: '48px', padding: '3rem', background: 'linear-gradient(135deg, #7A1F2B, #3d0e16)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Incubation Readiness Score</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Your current aggregate competency across all assessed startup modules.</p>
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#C5975B' }}>
            {Math.round(skills.reduce((acc, curr) => acc + curr.level, 0) / (skills.length || 1))}
          </div>
        </div>
      </div>
    </div>
  );
}

