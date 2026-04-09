'use client';

import { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardProvider';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOCK_COMPLETED = [
  { id:'d1', title:'Entrepreneurial Fundamentals', description:'Core principles of building a startup from scratch.', category:'Foundations', date:'Mar 2025', tag:'Foundations', img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', level:'Beginner', progress: 100 },
  { id:'d2', title:'Lean Startup Methodology',     description:'The classic framework for build-measure-learn iterations.', category:'Methodology', date:'Jan 2025', tag:'Methodology', img:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600', level:'Intermediate', progress: 100 },
  { id:'d3', title:'Digital Marketing Mastery',    description:'Advanced user acquisition through SEO and SEM.', category:'Marketing', date:'Dec 2024', tag:'Marketing', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', level:'Advanced', progress: 100 },
  { id:'d4', title:'Master of Strategy',           description:'Strategic planning and competitive advantage for startups.', category:'Strategy', date:'Feb 2026', tag:'Strategic', img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600', level:'Advanced', progress: 100 },
];

export default function CompletedCoursesPage() {
  const { enrolledCourses, isLoading, user } = useDashboard();
  const [previewCourse, setPreviewCourse] = useState(null);
  
  const completedFromContext = enrolledCourses?.filter(c => (c.progress || 0) === 100) || [];
  const completed = completedFromContext.length > 0 ? [...completedFromContext, ...MOCK_COMPLETED.slice(completedFromContext.length)] : MOCK_COMPLETED;

  if (isLoading) return <div className="platform-page">Loading...</div>;

  return (
    <div className="platform-page">
      
      {/* ── PREMIUM HEADER ── */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Completed Courses</h1>
          <p className="platform-page-subtitle">A collection of your mastered skills and verified certifications.</p>
        </div>
        <Link href="/courses" style={{ textDecoration: 'none' }}>
           <button className="btn-brand">NEW CHALLENGES</button>
        </Link>
      </header>

      {/* ── STATS HUB - CIRCULAR/DONUT STYLE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Courses Completed', val: completed.length, icon: 'checkCircle', color: 'var(--brand-red)' },
          { label: 'Learning Hours', val: '142h', icon: 'clock', color: 'var(--slate-400)' },
          { label: 'Average Grade', val: 'A+', icon: 'award', color: 'var(--slate-400)' },
          { label: 'Certificates', val: completed.length, icon: 'certificate', color: 'var(--slate-400)' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--slate-100)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon name={s.icon} size={20} color={s.color} />
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 950, color: 'var(--brand-black)' }}>{s.val}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── ACHIEVEMENTS GRID ── */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
         <h2 style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0 }}>Mastery Records</h2>
         <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      </div>

      {completed.length > 0 ? (
        <div className="platform-grid">
          {completed.map((c, i) => (
            <motion.div key={c.id || c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
               <SimpleCourseCard course={c} type="completed" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="platform-empty">
           <Icon name="award" size={48} color="var(--brand-red)" />
           <h2>No Completed Courses</h2>
           <p>Your journey to mastery has just begun. Complete your first course to see it here.</p>
           <Link href="/my-learning" className="btn-brand">Go to My Learning</Link>
        </div>
      )}

      {/* ── CERTIFICATE PREVIEW MODAL ── */}
      <AnimatePresence>
        {previewCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
              backdropFilter: 'blur(12px)'
            }}
            onClick={() => setPreviewCourse(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              style={{ 
                background: '#fff', width: '100%', maxWidth: '900px', borderRadius: '48px',
                overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                display: 'flex', flexDirection: 'column'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ height: '350px', background: 'var(--brand-black)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '3rem' }}>
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                 <div style={{ zIndex: 2 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'rgba(235,35,39,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(235,35,39,0.2)' }}>
                        <Icon name="certificate" size={48} color="var(--brand-red)" stroke={1.5} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Mastery of Innovation</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem' }}>Verified Professional Credential</p>
                 </div>
              </div>
              
              <div style={{ padding: '4rem', background: '#fff', color: 'var(--brand-black)' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>RECIPIENT</span>
                        <h3 style={{ fontSize: '2.2rem', fontWeight: 950, marginTop: '8px', marginBottom: '2.5rem' }}>{user?.full_name || 'Jaswanth Reddy'}</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>COURSE COMPLETED</span>
                                <span style={{ fontWeight: 950, fontSize: '1.1rem', marginTop: '4px', display: 'block' }}>{previewCourse.title}</span>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--slate-400)', textTransform: 'uppercase' }}>ISSUED DATE</span>
                                <span style={{ fontWeight: 950, fontSize: '1.1rem', marginTop: '4px', display: 'block' }}>{previewCourse.date || 'FEB 2026'}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center', padding: '2rem', background: 'var(--slate-50)', borderRadius: '32px', border: '1px solid var(--slate-100)' }}>
                        <button className="btn-brand" style={{ background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '18px' }}>
                            <Icon name="download" size={20} /> DOWNLOAD OFFICIAL PDF
                        </button>
                        <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '18px', border: '2px solid var(--brand-black)', color: 'var(--brand-black)' }}>
                            <Icon name="globe" size={20} /> ADD TO LINKEDIN PROFILE
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700 }}>
                            Verification ID: SI-XAM{Math.floor(1000 + Math.random() * 9000)}-{Date.now().toString(36).toUpperCase()}
                        </div>
                    </div>
                 </div>
              </div>

              <div style={{ padding: '1.5rem 4rem', background: 'var(--slate-50)', borderTop: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                   className="btn-ghost" 
                   onClick={() => setPreviewCourse(null)}
                   style={{ fontWeight: 950, color: 'var(--slate-500)', fontSize: '0.9rem' }}
                >
                    CLOSE VIEWER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .mastery-card-container:hover .glass-card {
            transform: translateY(-8px);
            border-color: var(--brand-red);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
            background: rgba(255,255,255,0.08);
        }
        .mastery-btn:hover {
            background: #fff !important;
            color: var(--brand-black) !important;
        }
      `}</style>
    </div>
  );
}
