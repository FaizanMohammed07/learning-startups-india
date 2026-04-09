'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import SimpleCourseCard from '@/components/SimpleCourseCard';
import Footer from '@/components/Footer';

const Icons = {
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#EB2327' }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-60">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-60">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  play: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  chevronDown: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  arrowLeft: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#EB2327' }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const syllabusRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedModule, setExpandedModule] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const mentors = [
    { name: "Faizal M.", role: "Lead Instructor @ Startup India", bio: "Serial Entrepreneur and Product Strategist with 10+ years experience in scaling ventures from zero to one.", img: "/assets/images/placeholder-user.png" }
  ];

  const outcomes = [
    "Master core scaling workflows and frameworks", 
    "Access premium founder templates & kits", 
    "Industry-recognized startup certificate", 
    "Direct mentor feedback & strategy sessions"
  ];
  
  const targetAudienceData = ["Aspiring Founders", "Product Managers", "Startup Employees", "B-School Students"];

  const testimonials = [
    { name: "Sneha P.", role: "CEO @ FlowTech", text: "The strategy taught here is exactly what we needed to secure our seed round.", rating: 5 },
    { name: "Anish T.", role: "CTO @ Bloom", text: "Incredible depth. The modules are structured for real speed.", rating: 5 },
    { name: "Vivek K.", role: "Founder @ Nexa", text: "Replaced 6 months of trial and error with 2 weeks of focused learning.", rating: 5 }
  ];

  const faqs = [
    { q: "Do I need prior experience?", a: "No, this course is designed to take you from a basic idea to a launch-ready execution strategy." },
    { q: "Is there a certificate upon completion?", a: "Yes, you will receive a verified certificate from Startup India that you can share on LinkedIn." },
    { q: "How long do I have access to the course content?", a: "You get lifetime access to all current and future updates for this program." }
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let res = await apiGet(`/api/v1/courses?slug=${slug}`);
        let c = res.data?.[0];
        if (!c) { res = await apiGet(`/api/v1/courses/${slug}`); c = res.data; }
        
        if (c) {
          setCourse(c);
          const modRes = await apiGet(`/api/v1/courses/${c._id}/modules`);
          setModules(modRes.data || []);
          const enrollRes = await apiGet('/api/v1/enrollments');
          const isE = enrollRes.data?.some(e => (e.courseId?._id || e.courseId) === c._id);
          setEnrolled(isE);
          const coursesRes = await apiGet('/api/v1/courses');
          setRelatedCourses((coursesRes.data || []).filter(rc => rc._id !== c._id).slice(0, 3));
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, [slug]);

  const scrollToSyllabus = () => syllabusRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleEnroll = async () => {
    if (!course) return;
    if (enrolled) { router.push(`/learn/${course._id}`); return; }
    setEnrolling(true);
    try {
      if ((course.priceInr || course.price) > 0) { router.push(`/checkout?courseId=${course._id}`); }
      else { await apiPost('/api/v1/enrollments', { courseId: course._id }); setEnrolled(true); router.push(`/learn/${course._id}`); }
    } finally { setEnrolling(false); }
  };

  if (loading || !course) return null;

  return (
    <div className="course-detail-premium-wrap" style={{ background: '#FFFDFD', minHeight: '100vh', fontFamily: 'var(--font-primary)' }}>
      
      {/* ── SECTION 1: ELEGANT HERO ── */}
      <section style={{ 
        background: 'linear-gradient(180deg, #FAFBFF 0%, #FFFFFF 100%)', 
        padding: '0 0 120px',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}>
        <div className="platform-container" style={{ maxWidth: '1550px', margin: '0 auto', padding: '2rem 2rem 0' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
             <button onClick={() => router.back()} className="hover-lift" style={{ 
               display: 'flex', alignItems: 'center', gap: '8px', 
               background: '#fff', border: '1px solid #FFE4E4', padding: '10px 18px',
               borderRadius: '14px', fontSize: '0.8rem', fontWeight: 900, cursor: 'pointer',
               color: '#EB2327', boxShadow: 'var(--shadow-sm)'
             }}>
               {Icons.arrowLeft} BACK TO CATALOG
             </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '5rem', alignItems: 'start' }}>
            <div className="hero-info" style={{ paddingTop: '2rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                  <span style={{ background: '#EB2327', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 950, letterSpacing: '0.05em' }}>
                    REPO: MASTERY
                  </span>
                  <nav style={{ display: 'flex', gap: '8px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: '#EB2327' }}>StartupsIndia Repository</span>
                  </nav>
               </div>
               <h1 className="text-enterprise" style={{ fontSize: '4.2rem', color: 'var(--brand-black)', marginBottom: '2rem', maxWidth: '950px', lineHeight: 1.1, letterSpacing: '-0.04em', fontWeight: 950 }}>
                   {course.title || "Master the Art of Innovation"}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--slate-600)', fontWeight: 600, lineHeight: 1.6, marginBottom: '3rem', maxWidth: '850px' }}>
                   {course.description || "Learn how to write effective prompts for ChatGPT, Midjourney, Claude, and more. Ideal for marketers, designers, and curious learners."}
                </p>

                <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_,i)=><span key={i}>{Icons.star}</span>)}</div>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-black)' }}>4.9 <span style={{ color: 'var(--slate-400)', fontWeight: 600 }}>(3,200+ reviews)</span></span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-black)', fontSize: '0.9rem', fontWeight: 800 }}>
                      <div style={{ color: '#EB2327' }}>{Icons.user}</div> 5,747 members
                   </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF1F1', padding: '10px 18px', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 800, color: '#EB2327' }}>
                      <span style={{ opacity: 0.8 }}>{Icons.check}</span> No prior experience needed
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF1F1', padding: '10px 18px', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 800, color: '#EB2327' }}>
                      <span style={{ opacity: 0.8 }}>{Icons.clock}</span> 4 weeks - Self-paced
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF1F1', padding: '10px 18px', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 800, color: '#EB2327' }}>
                      <span style={{ opacity: 0.8 }}>{Icons.shield}</span> Certificate upon completion
                   </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                   <button onClick={() => {/* wishlist logic */}} className="hover-lift" style={{ 
                      padding: '14px 28px', borderRadius: '14px', background: '#fff', border: '1px solid #FFE4E4', 
                      display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 900, color: 'var(--brand-black)', boxShadow: 'var(--shadow-sm)'
                   }}>
                      <span style={{ color: '#EB2327' }}>{Icons.heart}</span> Add to Wishlist
                   </button>
                </div>
            </div>

            {/* OVERLAPPING FLOATING CARD */}
             <aside className="glassy-card" style={{ 
                position: 'sticky', top: '40px', overflow: 'hidden', padding: 0, 
                marginTop: '-345px', boxShadow: '0 40px 80px rgba(235, 35, 39, 0.15)', border: '1px solid #fff',
                zIndex: 100
             }}>
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.5 }}
                   style={{ position: 'relative', height: '280px', background: '#000', overflow: 'hidden' }}
                 >
                   <img src={course.thumbnailUrl || course.img || "/assets/images/course-placeholder.png"} alt={course.title || "Course thumbnail"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   
                   {/* Dark Red / Black Cinematic Overlay */}
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(139,0,0,0.3) 100%)', zIndex: 1 }} />
 
                   <motion.div 
                     whileHover={{ scale: 1.1 }}
                     style={{ 
                       position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                       width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center', 
                       cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', zIndex: 10
                     }}
                   >
                     <div style={{ color: '#EB2327', marginLeft: '4px' }}>{Icons.play}</div>
                     <motion.div 
                       animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                       transition={{ repeat: Infinity, duration: 2.5 }}
                       style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #fff' }}
                     />
                   </motion.div>
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)', color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>
                      PREVIEW THIS COURSE
                   </div>
                 </motion.div>
 
                <div style={{ padding: '2.5rem', background: '#fff' }}>
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <span style={{ fontSize: '2.8rem', fontWeight: 950, color: 'var(--brand-black)' }}>\u20B9{(course.priceInr || 4900).toLocaleString().replace(/,000$/, '')}99</span>
                        <span style={{ color: 'var(--slate-400)', textDecoration: 'line-through', fontWeight: 700, fontSize: '1.1rem' }}>\u20B99,999</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#EB2327', fontWeight: 800, marginTop: '5px' }}>One-time payment • Promo ends in 12:02</p>
                    </div>
 
                   <div style={{ display: 'grid', gap: '12px', marginBottom: '2.5rem' }}>
                      <button onClick={handleEnroll} className="hover-lift" style={{ height: '64px', borderRadius: '16px', background: '#EB2327', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 950, boxShadow: '0 10px 20px rgba(235, 35, 39, 0.2)' }}>
                         ADD TO CART
                      </button>
                      <button onClick={handleEnroll} className="btn-brand-outline" style={{ height: '64px', borderRadius: '16px', fontSize: '1rem', fontWeight: 950, border: '2px solid #EB2327', color: '#EB2327' }}>
                         ENROLL NOW
                      </button>
                   </div>
 
                   <div style={{ display: 'grid', gap: '20px' }}>
                     <p style={{ fontSize: '0.95rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '5px' }}>What You&apos;ll Get:</p>
                     {[
                       "Lifetime access to 12 video lessons",
                       "Prompt templates & real-world use cases",
                       "Peer learning group access",
                       "Mini projects + certificate"
                     ].map((text, i) => (
                       <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--slate-600)', fontWeight: 650 }}>
                          <span style={{ color: '#EB2327', marginTop: '4px' }}>{Icons.check}</span> {text}
                       </div>
                     ))}
                   </div>
 
                   <div style={{ marginTop: '3rem', pt: '2rem' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 950, marginBottom: '12px', color: 'var(--brand-black)' }}>Use Coupon</p>
                      <div style={{ background: '#FFF1F1', borderRadius: '16px', padding: '6px', display: 'flex', border: '1px solid #FFE4E4' }}>
                         <input placeholder="Enter code" style={{ background: 'transparent', border: 'none', padding: '10px 15px', flex: 1, outline: 'none', fontWeight: 700, fontSize: '0.85rem' }} />
                         <button style={{ background: '#EB2327', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '12px', fontWeight: 950, fontSize: '0.85rem', cursor: 'pointer' }}>Redeem</button>
                      </div>
                   </div>
                </div>
             </aside>
          </div>
        </div>
      </section>

      <div className="platform-container" style={{ maxWidth: '1550px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: '5rem' }}>
         
         <div className="main-course-content">
            
            {/* ── COURSE OVERVIEW ── */}
            <h2 className="text-enterprise" style={{ fontSize: '2.4rem', marginBottom: '2.5rem', color: 'var(--brand-black)', fontWeight: 950, letterSpacing: '-0.02em', marginTop: 0 }}>Course Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
               <div>
                  <h4 style={{ fontWeight: 950, marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--brand-black)' }}>What You&apos;ll Learn:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
                     {outcomes.map((item, i) => (
                       <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.98rem', fontWeight: 650, color: 'var(--slate-600)', lineHeight: 1.5 }}>
                          <span style={{ color: '#EB2327', marginTop: '4px' }}>{Icons.check}</span> {item}
                       </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 style={{ fontWeight: 950, marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--brand-black)' }}>Who This Course is For:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
                     {targetAudienceData.map((item, i) => (
                       <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start', fontSize: '0.98rem', fontWeight: 650, color: 'var(--slate-600)', lineHeight: 1.5 }}>
                          <span style={{ color: '#EB2327', marginTop: '4px' }}>{Icons.check}</span> {item}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* ── SYLLABUS SECTION ── */}
            <div ref={syllabusRef} style={{ marginBottom: '6rem' }}>
               <h2 className="text-enterprise" style={{ fontSize: '2.4rem', marginBottom: '0.75rem', color: 'var(--brand-black)', fontWeight: 950, marginTop: 0 }}>Course Syllabus</h2>
               <p style={{ color: 'var(--slate-400)', fontWeight: 750, marginBottom: '3rem' }}>{modules.length} Modules • {modules.length * 5} Lessons • 18 hours of premium content</p>
               
               <div style={{ display: 'grid', gap: '10px' }}>
                  {modules.map((m, idx) => {
                     const mockLessons = [
                        { title: "Foundational Frameworks & Mental Models", duration: "12:45" },
                        { title: "Core Workflows for Launch Execution", duration: "18:20" },
                        { title: "Scaling from 0 to 1: Real-world Strategy", duration: "15:10" },
                        { title: "Advanced Founder Playbooks & Templates", duration: "24:30" },
                        { title: "Final Program Assessment & Takeaways", duration: "08:15" }
                     ];
                     const displayLessons = (m.topics && m.topics.length > 0) ? m.topics : mockLessons;

                     return (
                      <div key={m._id} style={{ border: '1px solid #E2E8F0', borderRadius: '20px', background: '#fff', overflow: 'hidden', transition: 'all 0.3s' }}>
                         <button 
                           onClick={() => setExpandedModule(expandedModule === idx ? -1 : idx)}
                           style={{ width: '100%', padding: '1.8rem 2.22rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                         >
                           <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 950, color: '#EB2327' }}>
                                 0{idx+1}
                              </div>
                              <div>
                                 <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--brand-black)', fontWeight: 900 }}>{m.title}</h4>
                                 <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-400)' }}>{displayLessons.length} Lessons • 1h 22m</span>
                              </div>
                           </div>
                           <div style={{ transform: expandedModule === idx ? 'rotate(180deg)' : 'none', transition: '0.3s', color: 'var(--slate-300)' }}>{Icons.chevronDown}</div>
                         </button>
                         <AnimatePresence>
                            {expandedModule === idx && (
                               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                  <div style={{ padding: '0 2.22rem 2.22rem', display: 'grid', gap: '8px' }}>
                                     {displayLessons.map((topic, ti) => (
                                        <div key={ti} className="hover-lift" style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                                           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                              <div style={{ color: '#EB2327', opacity: 0.8 }}>{Icons.play}</div>
                                              <span style={{ fontSize: '0.92rem', fontWeight: 750, color: 'var(--slate-700)' }}>{topic.title || topic}</span>
                                           </div>
                                           <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                              <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 800 }}>{topic.duration || "15:00"}</span>
                                              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #E2E8F0' }} />
                                           </div>
                                        </div>
                                     ))}
                                  </div>
                               </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                     );
                  })}
               </div>
            </div>

            {/* ── SUCCESS INSIGHTS ── */}
            <div style={{ marginBottom: '6rem' }}>
               <h2 className="text-enterprise" style={{ fontSize: '2.4rem', marginBottom: '2.5rem', color: 'var(--brand-black)', fontWeight: 950, marginTop: 0 }}>Success Insights</h2>
               <div style={{ padding: '3.5rem', background: '#F8FAFC', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
                  <p style={{ fontSize: '1.2rem', color: 'var(--slate-600)', lineHeight: 1.65, fontWeight: 600 }}>This course is specifically calibrated for rapid implementation. To get the most out of your experience, we recommend following the frameworks in sequence and engaging with the peer ecosystem in our dedicated Discord labs.</p>
               </div>
            </div>

         </div>

         <div className="side-extras">
            <div style={{ position: 'sticky', top: '100px' }}>
                <h2 className="text-enterprise" style={{ fontSize: '2.4rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '2.5rem', marginTop: 0 }}>Program Director</h2>
                {mentors.map((mentor, i)=>(
                  <div key={i} className="glassy-card" style={{ padding: '2.5rem', borderRadius: '28px', border: '1px solid #E2E8F0', background: '#fff', marginBottom: '25px', boxShadow: 'var(--shadow-sm)' }}>
                     <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: '#FFF1F1', overflow: 'hidden', flexShrink: 0 }}>
                           <img src={mentor.img} alt={mentor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0 }}>{mentor.name}</h4>
                            <p style={{ color: '#EB2327', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, marginTop: '4px' }}>{mentor.role}</p>
                        </div>
                     </div>
                     <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.65, fontWeight: 650, marginBottom: '2rem' }}>{mentor.bio}</p>
                     
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
                        <div style={{ textAlign: 'center' }}>
                           <p style={{ fontSize: '1.2rem', fontWeight: 950, margin: 0, color: 'var(--brand-black)' }}>4.9</p>
                           <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--slate-400)', margin: 0, textTransform: 'uppercase' }}>Rating</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                           <p style={{ fontSize: '1.2rem', fontWeight: 950, margin: 0, color: 'var(--brand-black)' }}>12k+</p>
                           <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--slate-400)', margin: 0, textTransform: 'uppercase' }}>Learners</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                           <p style={{ fontSize: '1.2rem', fontWeight: 950, margin: 0, color: 'var(--brand-black)' }}>12</p>
                           <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--slate-400)', margin: 0, textTransform: 'uppercase' }}>Courses</p>
                        </div>
                     </div>
                  </div>
                ))}

                <div className="glassy-card" style={{ padding: '1.8rem', borderRadius: '24px', border: '1px solid #FFE4E4', background: '#FFF1F1' }}>
                   <p style={{ fontSize: '0.95rem', fontWeight: 950, color: 'var(--brand-black)', marginBottom: '8px' }}>Need assistance?</p>
                   <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.5 }}>Our learning consultants are ready to help you unlock the best path for your career.</p>
                   <button style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#fff', border: '1px solid #FFE4E4', fontSize: '0.85rem', fontWeight: 950, color: 'var(--brand-black)', cursor: 'pointer' }} className="hover-lift">Talk to Consultant</button>
                </div>
            </div>
         </div>
      </div>

      {/* ── TESTIMONIALS SECTION (CINEMATIC DARK) ── */}
      <section style={{ background: '#0F172A', padding: '10rem 0', marginTop: '6rem' }}>
         <div className="platform-container" style={{ maxWidth: '1550px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
               <h2 className="text-enterprise" style={{ fontSize: '3.2rem', marginBottom: '1rem', color: '#fff' }}>Stories from StartupsIndia Learners</h2>
               <p style={{ color: '#FF4D4D', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Join thousands of founders who have transformed their ideas into ventures.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
               {testimonials.map((t, i)=>(
                 <div key={i} className="hover-lift" style={{ padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '2.5rem' }}>{[...Array(t.rating)].map((_,ri)=><span key={ri} style={{ color: '#FFD700' }}>{Icons.star}</span>)}</div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', lineHeight: 1.6 }}>&quot;{t.text}&quot;</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                       <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #FF3D42 0%, #C41217 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 950, fontSize: '1.2rem' }}>{t.name.charAt(0)}</div>
                       <div>
                          <h5 style={{ margin: 0, fontWeight: 950, color: '#fff', fontSize: '1.1rem' }}>{t.name}</h5>
                          <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#FF4D4D', textTransform: 'uppercase' }}>{t.role}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── RECOMMENDED ── */}
      <section style={{ padding: '8rem 0', background: '#F8FAFC' }}>
         <div className="platform-container" style={{ maxWidth: '1550px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 className="text-enterprise" style={{ fontSize: '2.5rem', marginBottom: '3.5rem', color: 'var(--brand-black)', fontWeight: 950 }}>Expand Your Expertise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
               {relatedCourses.map(rc => (
                 <SimpleCourseCard key={rc._id} course={rc} type="explore" />
               ))}
            </div>
         </div>
      </section>

      {/* ── FAQ Section ── */}
      <section style={{ padding: '8rem 0', background: '#fff' }}>
         <div className="platform-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 className="text-enterprise" style={{ fontSize: '2.4rem', textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
               {faqs.map((f, i)=>(
                 <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: '20px', overflow: 'hidden' }}>
                    <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ width: '100%', padding: '2rem', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                       <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>{f.q}</span>
                       <div style={{ transform: expandedFaq === i ? 'rotate(180deg)' : 'none', transition: '0.3s', color: 'var(--text-light)' }}>{Icons.chevronDown}</div>
                    </button>
                    <AnimatePresence>
                       {expandedFaq === i && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '0 2rem 2.22rem', color: 'var(--text-secondary)', fontWeight: 600, lineHeight: 1.7 }}>{f.a}</div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── CONCLUDING CTA ── */}
      <section style={{ padding: '8rem 0', background: '#fff' }}>
         <div className="platform-container" style={{ maxWidth: '1550px', margin: '0 auto', padding: '0 2rem' }}>
            <div className="animate-shimmer" style={{ 
               background: 'linear-gradient(135deg, #FF3D42 0%, #0F172A 100%)', 
               borderRadius: '44px', padding: '6rem', position: 'relative', overflow: 'hidden',
               display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center',
               boxShadow: '0 40px 100px rgba(235, 35, 39, 0.2)'
            }}>
               <div style={{ position: 'relative', zIndex: 10, color: '#fff' }}>
                  <h2 className="text-enterprise" style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem' }}>Ready to Grow with StartupsIndia?</h2>
                  <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', marginBottom: '3.5rem', fontWeight: 600, maxWidth: '500px' }}>Join 100,000+ founders learning top skills, personalizing learning paths, and scaling ventures.</p>
                  <button onClick={handleEnroll} style={{ background: '#fff', color: '#C41217', border: 'none', padding: '22px 60px', borderRadius: '18px', fontSize: '1.1rem', fontWeight: 950 }} className="hover-lift">GET STARTED NOW</button>
               </div>
               <div className="glassy-card" style={{ height: '350px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '30px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }} />
               </div>
            </div>
         </div>
      </section>

      <Footer />

      <style jsx global>{`
        .course-detail-premium-wrap .footer-wrapper { background: #fff !important; }
        .course-detail-premium-wrap .footer-main { background: #fff !important; }
        .course-detail-premium-wrap .footer-bottom { background: #F8FAFC !important; }
      `}</style>
    </div>
  );
}
