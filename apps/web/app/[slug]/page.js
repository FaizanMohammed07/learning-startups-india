'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

/* ──── SKILLERY PREMIUM ICONS ──── */
const Icons = {
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  play: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  chevronDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
};

export default function CourseLandingPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedModule, setExpandedModule] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await apiGet(`/api/v1/courses?slug=${slug}`);
        const c = res.data?.[0];
        if (c) {
          setCourse(c);
          const modRes = await apiGet(`/api/v1/courses/${c._id}/modules`);
          setModules(modRes.data || []);
          
          // Check enrollment status if user logged in
          const enrollRes = await apiGet('/api/v1/enrollments');
          const isE = enrollRes.data?.some(e => (e.courseId?._id || e.courseId) === c._id);
          setEnrolled(isE);
        }
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const handleEnroll = async () => {
    if (!course) return;
    if (enrolled) {
      router.push(`/learn/${course._id}`);
      return;
    }
    setEnrolling(true);
    try {
      if ((course.priceInr || course.price) > 0) {
        router.push(`/checkout?courseId=${course._id}`);
      } else {
        await apiPost('/api/v1/enrollments', { courseId: course._id });
        setEnrolled(true);
        router.push(`/learn/${course._id}`);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner-red" style={{ width: '40px', height: '40px', border: '4px solid rgba(235,35,39,0.1)', borderTop: '4px solid var(--brand-red)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (!course) return (
    <div className="platform-page" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
       <h1 style={{ fontSize: '2.5rem', fontWeight: 950 }}>Course Not Found</h1>
       <p style={{ color: 'var(--slate-400)', marginBottom: '2rem' }}>We couldn't find the track you're looking for.</p>
       <Link href="/courses" className="btn-brand">Browse All Courses</Link>
    </div>
  );

  return (
    <div className="landing-layout" style={{ background: '#fff', color: '#111' }}>
      {/* ── HERO CONTENT ── */}
      <section className="landing-hero" style={{ padding: '4rem 0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="platform-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
          
          {/* LEFT: INFORMATION */}
          <div className="landing-hero-left">
             <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
               <span className="pill-tag-red" style={{ background: 'rgba(235,35,39,0.08)', color: 'var(--brand-red)', fontSize: '0.65rem', fontWeight: 950, padding: '4px 12px', borderRadius: '100px' }}>
                 MOST POPULAR
               </span>
               <span className="pill-tag-gold" style={{ background: 'rgba(197,151,91,0.08)', color: '#a67c45', fontSize: '0.65rem', fontWeight: 950, padding: '4px 12px', borderRadius: '100px' }}>
                 TOP RATED
               </span>
             </div>

             <h1 style={{ fontSize: '3rem', fontWeight: 950, lineHeight: '1.1', marginBottom: '1.5rem', color: '#000', letterSpacing: '-0.02em' }}>
               Master the Art of {course.title?.replace('Course', '')}: <span style={{ color: 'var(--brand-red)' }}>From Beginner to Advanced</span>
             </h1>

             <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '640px' }}>
               {course.description || "A comprehensive professional certification program designed for industry founders and next-generation architects."}
             </p>

             <div className="landing-hero-meta" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex' }}>{[...Array(5)].map((_,i)=><span key={i}>{Icons.star}</span>)}</div>
                  <span style={{ fontWeight: 950, fontSize: '0.9rem' }}>4.8 <span style={{ color: '#999', fontWeight: 500 }}>(8.5k students)</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '0.9rem', fontWeight: 800 }}>
                  {Icons.clock} {course.durationWeeks || 8}-12 weeks
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '0.9rem', fontWeight: 800 }}>
                   {Icons.globe} 100% Online
                </div>
             </div>
          </div>

          {/* RIGHT: STICKY CARD */}
          <div className="landing-hero-right" style={{ position: 'relative' }}>
             <aside className="sticky-enroll-card" style={{ 
               position: 'sticky', top: '100px', 
               background: '#fff', 
               borderRadius: '32px', 
               border: '1px solid #eee',
               boxShadow: '0 40px 80px rgba(0,0,0,0.05)',
               overflow: 'hidden'
             }}>
                <div className="card-media" style={{ height: '220px', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {course.thumbnailUrl ? (
                     <img src={course.thumbnailUrl} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                   ) : (
                     <div style={{ color: '#fff', fontSize: '3rem', fontWeight: 950 }}>{course.title?.charAt(0)}</div>
                   )}
                   <div style={{ position: 'absolute', width: '64px', height: '64px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <div style={{ color: 'var(--brand-red)', marginLeft: '4px' }}>{Icons.play}</div>
                   </div>
                </div>

                <div className="card-body" style={{ padding: '2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 950, color: '#000' }}>
                        { (course.priceInr || course.price) > 0 ? `\u20B9${(course.priceInr || course.price).toLocaleString()}` : "Free" }
                      </span>
                      {course.originalPriceInr && (
                        <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through', fontWeight: 500 }}>
                          \u20B9{course.originalPriceInr.toLocaleString()}
                        </span>
                      )}
                   </div>

                   <button 
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="btn-brand" 
                      style={{ 
                        width: '100%', 
                        height: '60px', 
                        fontSize: '1rem', 
                        fontWeight: 950, 
                        borderRadius: '16px',
                        marginBottom: '1rem',
                        boxShadow: '0 10px 20px rgba(235,35,39,0.2)'
                      }}
                    >
                      {enrolling ? 'PROCESSING...' : enrolled ? 'CONTINUE COURSE' : 'JOIN THE PROGRAM'}
                   </button>

                   <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>10-Day Money Back Guarantee</span>
                   </div>

                   <div className="what-you-get" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 950, marginBottom: '1rem', color: '#000' }}>THIS COURSE INCLUDES:</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                        {[
                          "Industry recognized certificate",
                          "12+ Weeks of live mentorship",
                          "On-the-job training modules",
                          "Access to exclusive founder community",
                          "Flexible learning schedule"
                        ].map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '0.85rem', color: '#444', fontWeight: 600 }}>
                             <span style={{ marginTop: '2px' }}>{Icons.check}</span> {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                   
                   <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--brand-red)', fontWeight: 950, fontSize: '0.8rem', cursor: 'pointer' }}>
                         HAVE A COUPON CODE?
                      </button>
                   </div>
                </div>
             </aside>
          </div>
        </div>
      </section>

      {/* ── COURSE CONTENT & SYLLABUS ── */}
      <section className="course-main-content" style={{ padding: '4rem 0' }}>
         <div className="platform-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
            
            <div className="content-left">
               {/* OVERVIEW */}
               <div style={{ marginBottom: '4rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '1.5rem' }}>Program Overview</h2>
                  <div style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                     {course.description || "Detailed program description will go here. This course covers everything from core fundamentals to high-level strategic implementation."}
                     <br /><br />
                     Our approach combines visual excellence with technical depth, ensuring every learner emerges as an expert in their field.
                  </div>
               </div>

               {/* SYLLABUS */}
               <div style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                     <h2 style={{ fontSize: '2rem', fontWeight: 950, margin: 0 }}>Course Syllabus</h2>
                     <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 700 }}>{modules.length} Modules • {course.totalLessons || 'Dynamic'} Lessons</span>
                  </div>

                  <div className="syllabus-grid" style={{ display: 'grid', gap: '1rem' }}>
                     {modules.map((m, idx) => (
                       <div key={m._id} className="accordion-item" style={{ border: '1px solid #eee', borderRadius: '20px', overflow: 'hidden' }}>
                          <button 
                             onClick={() => setExpandedModule(expandedModule === idx ? -1 : idx)}
                             style={{ 
                               width: '100%', 
                               padding: '1.5rem 2rem', 
                               background: expandedModule === idx ? '#fafafa' : '#fff',
                               border: 'none',
                               display: 'flex',
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               cursor: 'pointer',
                               transition: 'all 0.2s'
                             }}
                          >
                             <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <span style={{ color: 'var(--brand-red)', fontWeight: 950, minWidth: '24px' }}>0{idx+1}</span>
                                <div style={{ textAlign: 'left' }}>
                                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 950, color: '#000' }}>{m.title}</h4>
                                   <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>{m.topics?.length || 0} Lessons • {m.duration || '60m'}</p>
                                </div>
                             </div>
                             <div style={{ transform: expandedModule === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>{Icons.chevronDown}</div>
                          </button>
                          
                          <AnimatePresence>
                             {expandedModule === idx && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ opacity: 0, height: 0 }}
                                 style={{ overflow: 'hidden', background: '#fff', borderTop: '1px solid #f0f0f0' }}
                               >
                                  <div style={{ padding: '1.5rem 2rem 2rem 4rem' }}>
                                     {m.topics?.map((topic, tIdx) => (
                                       <div key={tIdx} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: tIdx < m.topics.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                                          <div style={{ marginTop: '2px', color: '#ccc' }}>{Icons.play}</div>
                                          <div style={{ flex: 1, fontSize: '0.9rem', color: '#444', fontWeight: 600 }}>{topic.title || topic}</div>
                                          <div style={{ fontSize: '0.8rem', color: '#999' }}>05:12</div>
                                       </div>
                                     ))}
                                  </div>
                               </motion.div>
                             )}
                          </AnimatePresence>
                       </div>
                     ))}
                  </div>
               </div>

               {/* STORIES FROM LEARNERS */}
               <div style={{ padding: '4rem 0', borderTop: '1px solid #f0f0f0' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '2.5rem' }}>Stories from StartupsIndia Learners</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                     {[
                       { name: "Anish Gupta", role: "SaaS Founder", text: "This program completely changed how I think about user experience. The mentorship was world-class." },
                       { name: "Sanya Roy", role: "Product Manager", text: "The hands-on projects allowed me to implement what I learned in real-time. Worth every penny." }
                     ].map((story, i) => (
                       <div key={i} className="story-card" style={{ padding: '2rem', background: '#fcfcfc', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                          <p style={{ fontStyle: 'italic', color: '#444', marginBottom: '1.5rem' }}>"{story.text}"</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                             <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 950 }}>{story.name[0]}</div>
                             <div>
                                <h5 style={{ margin: 0, fontWeight: 950 }}>{story.name}</h5>
                                <span style={{ fontSize: '0.75rem', color: '#999' }}>{story.role}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

            </div>

            {/* SPACER FOR STICKY RIGHT COLUMN */}
            <div className="content-right" />
         </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ background: '#f9f9f9', padding: '6rem 0' }}>
         <div className="platform-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '4rem' }}>Frequently Asked Questions</h2>
            <div className="faq-list" style={{ textAlign: 'left', display: 'grid', gap: '1.5rem' }}>
               {[
                 { q: "Who is this program for?", a: "This program is designed for aspiring founders, product managers, and advanced architects looking to scale their skills." },
                 { q: "Is the certificate valid globally?", a: "Yes, our certification is recognized by global startup networks and premier design firms." },
                 { q: "Can I access the content after completion?", a: "Absolutely. You get 100% lifetime access to all course materials and updates." }
               ].map((faq, i) => (
                 <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                    <h4 style={{ fontWeight: 950, marginBottom: '0.5rem' }}>{faq.q}</h4>
                    <p style={{ margin: 0, color: '#666', lineHeight: 1.5 }}>{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FOOTER SPACING */}
      <div style={{ height: '4rem' }} />
    </div>
  );
}
