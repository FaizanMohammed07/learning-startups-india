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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FFB800' }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  play: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  chevronDown: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  arrowLeft: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#ef4444' }}>
      <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  heartFilled: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [expandedModule, setExpandedModule] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let res = await apiGet(`/api/v1/courses?slug=${slug}`);
        let c = res.data?.[0];
        if (!c) { res = await apiGet(`/api/v1/courses/${slug}`); c = res.data; }
        
        const generateMock = (s) => {
          const titles = {
            c1: "Entrepreneurship Fundamentals: Starting Your Venture",
            c2: "Master the Art of Prompt Engineering — Unlock the Power of AI",
            c3: "Advanced Startup Scaling & Growth Hacking"
          };
          const descs = {
            c1: "Master the essential building blocks of launching a successful startup, from ideation to initial traction.",
            c2: "Learn how to write effective prompts for ChatGPT, Midjourney, Claude, and more. Ideal for marketers, designers, and curious founders.",
            c3: "Go beyond the basics and learn the high-speed execution tactics used by the world's fastest-growing venture-backed startups."
          };
          return {
            _id: s,
            slug: s,
            title: titles[s] || `Course: ${s.toUpperCase()} Mastery Program`,
            description: descs[s] || "Deep dive into industrial-grade expertise and strategic execution frameworks for modern market leaders.",
            priceInr: 4900,
            thumbnailUrl: "/assets/images/course-placeholder.png"
          };
        };

        if (slug.startsWith('c') || !c) {
          const mockData = generateMock(slug);
          setCourse(mockData);
          setModules([
            { _id: 'm1', title: slug === 'c2' ? "Introduction to Prompt Engineering" : "Foundational Strategy & Market Fit" },
            { _id: 'm2', title: slug === 'c2' ? "Prompting for Productivity & Creativity" : "Execution Frameworks & MVP" },
            { _id: 'm3', title: slug === 'c2' ? "Advanced Prompting Techniques" : "Acquisition & User Growth" },
            { _id: 'm4', title: slug === 'c2' ? "Real-World Projects & Final Task" : "Scale Operations & Final Pitch" }
          ]);
        } else if (c) {
          setCourse(c);
          const modRes = await apiGet(`/api/v1/courses/${c._id}/modules`);
          setModules(modRes.data || []);
          const enrollRes = await apiGet('/api/v1/enrollments');
          const isE = enrollRes.data?.some(e => (e.courseId?._id || e.courseId) === c._id);
          setEnrolled(isE);
        }

        const coursesRes = await apiGet('/api/v1/courses');
        setRelatedCourses((coursesRes.data || []).filter(rc => rc.slug !== slug).slice(0, 3));
        
      } catch (e) {
        console.error(e);
        setCourse({title: `Course: ${slug.toUpperCase()}`, priceInr: 4900});
        setModules([{title:"Intro"}, {title:"Advanced"}]);
      } finally { setLoading(false); }
    }
    fetchData();
  }, [slug]);

  if (loading || !course) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #ef4444', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <div className="course-detail-view" style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── HERO SECTION ── */}
      <div className="detail-hero">
        <div className="detail-hero-inner">
          <header className="detail-header-nav">
            <button 
              onClick={() => router.back()}
              className="detail-back-btn"
            >
              <div style={{ transform: 'rotate(180deg)', display: 'flex' }}>{Icons.play}</div> BACK TO EXPLORE
            </button>
          </header>

          <div className="detail-hero-grid">
            <main className="detail-hero-content">
              <h1 className="detail-course-title">
                {course.title}
              </h1>
              <p className="detail-course-desc">
                {course.description}
              </p>

              <div className="detail-meta-row">
                <div className="detail-rating">
                  <span style={{ fontWeight: 800 }}>4.9</span>
                  <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <span key={i}>{Icons.star}</span>)}</div>
                  <span className="review-count">(3,248+ reviews)</span>
                </div>
                <div className="detail-students">
                  <div style={{ color: '#fff' }}>{Icons.user}</div> 5,847 Students
                </div>
              </div>

              <div className="detail-features-row">
                <div className="feature-pill">
                  <div style={{ color: '#fff' }}>{Icons.check}</div> No prior experience
                </div>
                <div className="feature-pill">
                  <div style={{ color: '#fff' }}>{Icons.clock}</div> 4 weeks — Self-paced
                </div>
                <div className="feature-pill">
                  <div style={{ color: '#fff' }}>{Icons.shield}</div> Certificate
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setInWishlist(!inWishlist)}
                className={`wishlist-toggle-btn ${inWishlist ? 'active' : ''}`}
              >
                <div style={{ color: '#ef4444' }}>
                  {inWishlist ? Icons.heartFilled : Icons.heart}
                </div>
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </main>

            {/* SIDEBAR */}
            <aside className="detail-sidebar">
              <div className="sidebar-sticky-content">
                <div className="promo-card">
                  <div className="video-preview">
                     <img src={course.thumbnailUrl || "/assets/images/course-placeholder.png"} className="video-thumb" alt="Course Thumbnail" />
                     <div className="video-play-icon">
                        {Icons.play}
                     </div>
                  </div>
                  <div className="promo-details">
                    <div className="price-row">
                      <span className="current-price">\u20B9{(course.priceInr || 4900).toLocaleString()}</span>
                      <span className="old-price">\u20B99,999</span>
                    </div>
                    <p className="payment-type">One-time payment</p>
                    <p className="timer-text">Promo ends soon in 12:02!</p>
                    
                    <div className="action-buttons">
                      <button onClick={() => router.push(`/checkout?courseId=${course._id}`)} className="btn-primary-detail">Enroll Now</button>
                      <button className="btn-secondary-detail">Send Message</button>
                    </div>

                    <div className="highlights-list">
                      <h5 className="highlights-title">What You&apos;ll Get:</h5>
                      {[
                        "Lifetime access to 12 lessons",
                        "Prompt templates & use cases",
                        "Founder learning group",
                        "Mini projects + certificate"
                      ].map((text, i) => (
                        <div key={i} className="highlight-item">
                          <span style={{ color: '#ef4444' }}>{Icons.check}</span> {text}
                        </div>
                      ))}
                    </div>

                    <div className="coupon-section">
                      <p className="coupon-title">Use Coupon</p>
                      <div className="coupon-input-group">
                        <input placeholder="Enter Coupon" className="coupon-input" />
                        <button className="coupon-btn">Redeem</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="instructor-card">
                  <div className="inst-header">
                    <div className="inst-avatar">
                       <img src="/assets/images/placeholder-user.png" className="inst-img" alt="Instructor Avatar" />
                    </div>
                    <div>
                      <h4 className="inst-name">Faizal M.</h4>
                      <p className="inst-role">Founder @ StartupIndia</p>
                    </div>
                  </div>
                  <div className="inst-stats">
                     <span>{Icons.user} 15 Courses</span>
                     <span>{Icons.star} 10,482 Reviews</span>
                  </div>
                  <button className="inst-profile-btn">View Instructor Profile</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="detail-main-content">
        <div className="detail-content-inner">
          <main className="main-info">
            <h2 className="section-title">Course Overview</h2>
            <div className="overview-grid">
              <div className="overview-col">
                <h3 className="col-title">What You&apos;ll Learn:</h3>
                <ul className="overview-list">
                  {[
                    "Craft precise prompts for AI tools",
                    "Use prompt patterns for better outputs",
                    "Apply AI in writing, design, and coding",
                    "Avoid common prompt mistakes",
                    "Automate workflows via chaining"
                  ].map((item, i) => (
                    <li key={i} className="overview-item">
                      <span className="item-check">{Icons.check}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overview-col">
                <h3 className="col-title">Who This Course is For:</h3>
                <ul className="overview-list">
                  {[
                    "Beginners in AI trends",
                    "Content creators & marketers",
                    "Designers exploring AI journey",
                    "Developers building AI apps",
                    "Curious about AI effectiveness"
                  ].map((item, i) => (
                    <li key={i} className="overview-item">
                      <span className="item-check">{Icons.check}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="section-title">Course Syllabus</h2>
            <div className="syllabus-meta">
              <span>• 48 Topics</span>
              <span>• 12 Lessons</span>
              <span>• 4 Parts</span>
            </div>

            <div className="syllabus-accordion">
              {modules.map((m, i) => (
                <div key={i} className={`syllabus-module ${expandedModule === i ? 'expanded' : ''}`}>
                  <div className="module-header" onClick={() => setExpandedModule(expandedModule === i ? -1 : i)}>
                    <div>
                      <h4 className="module-title">Week {i+1}: {m.title}</h4>
                      <p className="module-subtitle">Foundations of {m.title.toLowerCase()}.</p>
                    </div>
                    <div className="expand-icon">{Icons.chevronDown}</div>
                  </div>
                  <AnimatePresence>
                    {expandedModule === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="module-content">
                        {[1, 2, 3].map(item => (
                          <div key={item} className="lesson-row">
                            <div className="lesson-left">
                              <div className="lesson-play-icon">{Icons.play}</div>
                              <span className="lesson-name">Lesson {item}: {m.title} Mastery Part {item}</span>
                            </div>
                            <span className="lesson-duration">12:45m</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .course-detail-view { background: #fff !important; overflow-x: hidden; }
        .detail-hero { background: linear-gradient(135deg, #ef4444 0%, #be123c 100%); padding-bottom: 3rem; color: #fff; position: relative; }
        .detail-hero-inner { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        .detail-header-nav { padding: 1.5rem 0 0.5rem; }
        .detail-back-btn { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); padding: 10px 18px; borderRadius: 14px; fontSize: 0.85rem; fontWeight: 800; color: #fff; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); backdropFilter: blur(10px); }
        .detail-back-btn:hover { background: rgba(255,255,255,0.25); transform: translateX(-4px); }
        
        .detail-hero-grid { display: grid; grid-template-columns: 1fr 400px; gap: 4rem; padding: 2rem 0 4rem; position: relative; }
        .detail-course-title { font-size: 3rem; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .detail-course-desc { font-size: 1.15rem; color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 2rem; }
        .detail-meta-row { display: flex; gap: 2.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .detail-rating { display: flex; align-items: center; gap: 6px; }
        .review-count { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
        .detail-students { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); font-size: 0.9rem; font-weight: 500; }
        .detail-features-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .feature-pill { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #fff; font-weight: 500; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 99px; }
        .wishlist-toggle-btn { padding: 12px 28px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; font-size: 0.95rem; font-weight: 700; color: #ef4444; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 10px; }

        .detail-sidebar { position: relative; height: 100%; }
        .sidebar-sticky-content { position: sticky; top: 100px; display: grid; gap: 2rem; z-index: 10; width: 100%; }
        .promo-card { border: 1px solid #e5e7eb; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.1); color: #000; }
        .video-preview { height: 200px; background: #111827; position: relative; }
        .video-thumb { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
        .video-play-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 48px; height: 48px; borderRadius: 50%; background: #fff; display: flex; alignItems: center; justifyContent: center; color: #ef4444; }
        .promo-details { padding: 2rem; }
        .price-row { display: flex; alignItems: baseline; gap: 8px; margin-bottom: 4px; }
        .current-price { fontSize: 2.2rem; fontWeight: 800; color: #111827; }
        .old-price { fontSize: 1.2rem; color: #9ca3af; text-decoration: line-through; }
        .payment-type { fontSize: 0.8rem; color: #6b7280; margin-bottom: 1.5rem; }
        .timer-text { fontSize: 0.85rem; color: #ef4444; fontWeight: 600; margin-bottom: 1.5rem; }
        .action-buttons { display: grid; gap: 10px; margin-bottom: 2.5rem; }
        .btn-primary-detail { padding: 14px; border-radius: 12px; background: #ef4444; color: #fff; border: none; fontSize: 0.95rem; fontWeight: 800; cursor: pointer; transition: 0.2s; }
        .btn-primary-detail:hover { background: #dc2626; transform: translateY(-2px); }
        .btn-secondary-detail { padding: 14px; border-radius: 12px; background: #fff; color: #4b5563; border: 1px solid #e5e7eb; fontSize: 0.95rem; fontWeight: 700; cursor: pointer; }

        .highlights-list { display: grid; gap: 15px; }
        .highlights-title { margin: 0; fontSize: 0.9rem; fontWeight: 800; color: #111827; }
        .highlight-item { display: flex; gap: 10px; fontSize: 0.85rem; color: #4b5563; fontWeight: 500; }
        .coupon-section { marginTop: 2.5rem; }
        .coupon-title { fontSize: 0.85rem; fontWeight: 800; color: #111827; margin-bottom: 12px; }
        .coupon-input-group { display: flex; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; width: 100%; }
        .coupon-input { border: none; padding: 12px; flex: 1; min-width: 0; outline: none; fontSize: 0.85rem; }
        .coupon-btn { background: #ef4444; color: #fff; border: none; padding: 0 16px; fontSize: 0.85rem; fontWeight: 700; cursor: pointer; }

        .instructor-card { border: 1px solid #f1f5f9; border-radius: 16px; background: #f9fafb; padding: 1.5rem; color: #000; }
        .inst-header { display: flex; gap: 12px; alignItems: center; margin-bottom: 1.25rem; }
        .inst-avatar { width: 44px; height: 44px; border-radius: 10px; background: #fff; overflow: hidden; }
        .inst-img { width: 100%; height: 100%; object-fit: cover; }
        .inst-name { margin: 0; fontSize: 0.95rem; fontWeight: 700; color: #111827; }
        .inst-role { margin: 0; fontSize: 0.7rem; color: #6b7280; line-height: 1.3; }
        .inst-stats { display: flex; gap: 15px; color: #6b7280; fontSize: 0.75rem; fontWeight: 500; margin-bottom: 1.25rem; }
        .inst-profile-btn { width: 100%; padding: 10px; borderRadius: 8px; background: #fff; border: 1px solid #e5e7eb; fontSize: 0.8rem; fontWeight: 700; color: #4b5563; cursor: pointer; }

        .detail-main-content { max-width: 1400px; margin: 0 auto; padding: 4rem 20px; }
        .detail-content-inner { display: grid; grid-template-columns: 1fr 400px; gap: 4rem; }
        .section-title { font-size: 1.8rem; font-weight: 800; color: #111827; margin-bottom: 2.5rem; }
        .overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 4rem; }
        .col-title { font-size: 1.1rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; }
        .overview-list { list-style: none; padding: 0; display: grid; gap: 16px; }
        .overview-item { display: flex; gap: 12px; font-size: 0.95rem; color: #4b5563; line-height: 1.5; }
        .item-check { color: #ef4444; flex-shrink: 0; }
        .syllabus-meta { display: flex; gap: 15px; color: #6b7280; font-size: 0.85rem; font-weight: 600; margin-bottom: 2.5rem; }
        .syllabus-accordion { display: grid; gap: 12px; }
        .syllabus-module { border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: all 0.2s; }
        .module-header { padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: #fff; }
        .syllabus-module.expanded { border-color: #ef4444; }
        .module-title { margin: 0; font-size: 1.05rem; font-weight: 800; color: #111827; }
        .module-subtitle { margin: 4px 0 0; font-size: 0.85rem; color: #6b7280; }
        .module-content { padding: 0 2rem 1.5rem; background: #fafafa; }
        .lesson-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-top: 1px solid #f1f5f9; }
        .lesson-left { display: flex; gap: 12px; align-items: center; }
        .lesson-play-icon { color: #ef4444; opacity: 0.8; }
        .lesson-name { font-size: 0.9rem; font-weight: 500; color: #374151; }
        .lesson-duration { font-size: 0.85rem; color: #9ca3af; font-weight: 600; }

        @media (max-width: 1060px) {
          .detail-hero-grid { grid-template-columns: 1fr; gap: 2rem; }
          .detail-content-inner { grid-template-columns: 1fr; }
          .detail-sidebar { order: -1; }
          .detail-course-title { font-size: 2rem; }
          .overview-grid { grid-template-columns: 1fr; gap: 2rem; }
          .syllabus-meta { flex-wrap: wrap; }
          .module-header { padding: 1.25rem 1.5rem; }
          .module-content { padding: 0 1.5rem 1.25rem; }
          .detail-main-content { padding: 2rem 20px; }
          .promo-card { margin-top: -3rem; }
          .wishlist-toggle-btn { width: 100%; justify-content: center; }
        }
        
        @media (max-width: 480px) {
           .detail-course-title { font-size: 1.75rem; }
           .detail-meta-row { gap: 1rem; }
           .current-price { font-size: 1.75rem; }
           .coupon-btn { padding: 0 10px; font-size: 0.75rem; }
        }
      `}</style>
    </div>
  );
}
