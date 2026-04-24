'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RecordedClassesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/v1/courses');
        const json = await res.json();
        if (json.success) setCourses(json.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        
        .course-card { background:#fff; border-radius:28px; overflow:hidden; border:1px solid rgba(0,0,0,0.05); transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); cursor:pointer; position:relative; }
        .course-card:hover { transform:translateY(-8px); box-shadow:0 30px 60px -12px rgba(0,0,0,0.12); border-color:rgba(197,151,91,0.3); }
        
        .thumb-wrapper { aspect-ratio: 16/10; position:relative; overflow:hidden; background:#f8f8f8; }
        .course-card:hover .thumb-img { transform: scale(1.08); }
        .thumb-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .badge-premium { position:absolute; top:20px; left:20px; background:rgba(122,31,43,0.9); color:white; padding:6px 14px; border-radius:10px; font-size:0.65rem; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; z-index:2; backdrop-filter:blur(8px); border: 1px solid rgba(255,255,255,0.1); }
        .meta-badge { background:rgba(197,151,91,0.06); color:#C5975B; padding:6px 12px; border-radius:8px; font-size:0.7rem; font-weight:800; letter-spacing:0.02em; text-transform: uppercase; }
        
        .accent-bar { width:40px; height:4px; background:#C5975B; border-radius:2px; margin-bottom:20px; }
        .course-card::after { content:''; position:absolute; bottom:0; left:0; width:100%; height:4px; background:#7A1F2B; transform: scaleX(0); transition: transform 0.4s; transform-origin: left; }
        .course-card:hover::after { transform: scaleX(1); }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Knowledge Vault</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Accelerate your venture with high-fidelity, on-demand curriculum from the world's most successful startups.</p>
      </header>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ height: 320, background: '#fafafa', borderRadius: 28 }} className="animate-pulse" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' }}>
          {courses.map((course, idx) => (
            <Link key={course._id} href={`/learn/${course._id}`} style={{ textDecoration: 'none' }}>
              <div className={`da da${idx+2} course-card`}>
                <div className="thumb-wrapper">
                  <div className="badge-premium">{course.level || 'Foundational'}</div>
                  {course.thumbnailUrl ? (
                    <img src={course.thumbnailUrl} alt={course.title} className="thumb-img" />
                  ) : (
                    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg, #7A1F2B, #3d0e16)' }}>
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                         <circle cx="12" cy="12" r="10" />
                         <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="rgba(255,255,255,0.2)" />
                       </svg>
                    </div>
                  )}
                </div>
                
                <div style={{ padding:'28px' }}>
                   <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
                      <span className="meta-badge">{course.category || 'Incubation'}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#aaa', alignSelf: 'center' }}>•</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{course.totalModules || 0} Modules</span>
                   </div>
                   <h3 style={{ fontSize:'1.4rem', fontWeight:900, color:'#111', lineHeight:1.3, marginBottom:'16px', letterSpacing: '-0.02em' }}>{course.title}</h3>
                   <div style={{ fontSize:'0.85rem', color:'#999', fontWeight:600, display:'flex', alignItems:'center', gap:'8px' }}>
                      <span style={{ color: '#7A1F2B' }}>Founder Track</span>
                      <span style={{ color:'#C5975B', opacity: 0.5 }}>●</span>
                      <span>Level {course.levelRank || 1}</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

