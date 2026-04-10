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
  )
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
        
        // Comprehensive mock data for ANY slug to ensure high-fidelity previews (c1, c2, c3, etc.)
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
        // Fallback for demo purposes if API fails
        setCourse({title: `Course: ${slug.toUpperCase()}`, priceInr: 4900});
        setModules([{title:"Intro"}, {title:"Advanced"}]);
      } finally { setLoading(false); }
    }
    fetchData();
  }, [slug]);

  if (loading || !course) return null;

  return (
    <div className="course-detail-view" style={{ background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
      
      {/* ── HERO SECTION (Unified PREMIUM RED theme for all courses) ── */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ef4444 0%, #be123c 100%)',
        padding: '0 0 4rem',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem 0.5rem' }}>
          <nav style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            <span>/</span>
            <Link href="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>Courses</Link>
            <span>/</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{course.title}</span>
          </nav>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '4rem' }}>
          <main>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ 
                fontSize: '3rem', fontWeight: 700, 
                color: '#fff', 
                lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.02em' 
              }}>
                {course.title}
              </h1>
              <p style={{ 
                fontSize: '1.15rem', 
                color: 'rgba(255,255,255,0.9)', 
                lineHeight: 1.6, marginBottom: '2rem' 
              }}>
                {course.description}
              </p>

              <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 800, color: '#fff' }}>4.9</span>
                  <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <span key={i}>{Icons.star}</span>)}</div>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>(3,248+ reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>
                  <div style={{ color: '#fff' }}>{Icons.user}</div> 5,847 Students
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>
                  <div style={{ color: '#fff' }}>{Icons.check}</div> No prior experience needed
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>
                  <div style={{ color: '#fff' }}>{Icons.clock}</div> 4 weeks — Self-paced
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>
                  <div style={{ color: '#fff' }}>{Icons.shield}</div> Certificate upon completion
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setInWishlist(!inWishlist)}
                style={{ 
                  marginTop: '3rem', padding: '12px 28px', borderRadius: '12px', 
                  background: '#fff', 
                  border: inWishlist ? '1px solid #ffcccc' : '1px solid #e5e7eb',
                  fontSize: '0.95rem', fontWeight: 700, 
                  color: '#ef4444', 
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <div style={{ color: '#ef4444' }}>
                  {inWishlist ? Icons.heartFilled : Icons.heart}
                </div>
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </div>
          </main>

          {/* SIDEBAR (Sticky OVERLAPPING CARD) */}
          <aside style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', right: '0', width: '380px', display: 'grid', gap: '2rem', zIndex: 10 }}>
              {/* Promotion Card */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', background: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '200px', background: '#111827', position: 'relative' }}>
                   <img src={course.thumbnailUrl || "/assets/images/course-placeholder.png"} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                      {Icons.play}
                   </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827' }}>\u20B9{(course.priceInr || 4900).toLocaleString()}</span>
                    <span style={{ fontSize: '1.2rem', color: '#9ca3af', textDecoration: 'line-through' }}>\u20B99,999</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '1.5rem' }}>One-time payment</p>
                  
                  <p style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600, marginBottom: '1.5rem' }}>Promo ends soon in 12:02!</p>
                  
                  <div style={{ display: 'grid', gap: '10px', marginBottom: '2.5rem' }}>
                    <button onClick={() => router.push(`/learn/${course._id}`)} style={{ padding: '14px', borderRadius: '10px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>Enroll Now</button>
                    <button style={{ padding: '14px', borderRadius: '10px', background: '#fff', color: '#4b5563', border: '1px solid #e5e7eb', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>Send Message</button>
                  </div>

                  <div style={{ display: 'grid', gap: '15px' }}>
                    <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>What You&apos;ll Get:</h5>
                    {[
                      "Lifetime access to 12 video lessons",
                      "Prompt templates & real-world use cases",
                      "Peer learning group access",
                      "Mini projects + certificate"
                    ].map((text, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#4b5563', fontWeight: 500 }}>
                        <span style={{ color: '#ef4444', marginTop: '4px' }}>{Icons.check}</span> {text}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '2.5rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Use Coupon</p>
                    <div style={{ display: 'flex', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                      <input placeholder="Enter Coupon" style={{ border: 'none', padding: '12px', flex: 1, outline: 'none', fontSize: '0.85rem' }} />
                      <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0 15px', fontSize: '0.85rem', fontWeight: 700 }}>Redeem</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor Card */}
              <div style={{ border: '1px solid #f1f5f9', borderRadius: '16px', background: '#f9fafb', padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                     <img src="/assets/images/placeholder-user.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Faizal M.</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Founder @ StartupIndia • Strategy Consultant</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                   <span>{Icons.user} 15 Courses</span>
                   <span>{Icons.star} 10,482 Reviews</span>
                </div>
                <button style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#fff', border: '1px solid #e5e7eb', fontSize: '0.8rem', fontWeight: 700, color: '#4b5563', cursor: 'pointer' }}>View Instructor Profile</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 0', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '4rem' }}>
        <main>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827', marginBottom: '2.5rem' }}>Course Overview</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>What You&apos;ll Learn:</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                  {[
                    "Craft precise prompts for various AI tools",
                    "Use prompt patterns to generate better outputs",
                    "Apply AI in writing, design, and coding",
                    "Avoid common prompt mistakes",
                    "Automate workflows using prompt chaining"
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.5 }}>
                      <span style={{ color: '#ef4444', marginTop: '4px' }}>{Icons.check}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>Who This Course is For:</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                  {[
                    "Beginners in AI trends",
                    "Content creators & marketers",
                    "Designers exploring AI journey",
                    "Developers building prompt-based apps",
                    "Anyone curious about using AI effectively"
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.5 }}>
                      <span style={{ color: '#ef4444', marginTop: '4px' }}>{Icons.check}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SYLLABUS */}
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Course Syllabus</h2>
            <div style={{ display: 'flex', gap: '15px', color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, marginBottom: '2.5rem' }}>
              <span>• 48 Topics</span>
              <span>• 12 Lessons</span>
              <span>• 4 Parts</span>
            </div>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '5rem' }}>
              {modules.map((m, i) => (
                <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: expandedModule === i ? '#f9fafb' : '#fff' }} onClick={() => setExpandedModule(expandedModule === i ? -1 : i)}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>Week {i+1}: {m.title}</h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#6b7280' }}>Learn the fundamentals of {m.title.toLowerCase()} in startups.</p>
                    </div>
                    <div style={{ transform: expandedModule === i ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>{Icons.chevronDown}</div>
                  </div>
                  {expandedModule === i && (
                    <div style={{ padding: '0 2rem 1.5rem', background: '#f9fafb' }}>
                      {[1, 2, 3].map(item => (
                        <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ color: '#ef4444' }}>{Icons.play}</div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#374151' }}>Lesson {item}: {m.title} Mastery Part {item}</span>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>12:45m</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
        <aside />
      </div>

      <div className="full-width-sections" style={{ borderTop: '1px solid #f1f5f9', marginTop: '4rem', background: '#fff' }}>
        <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Stories from StartupsIndia Learners</h2>
            <p style={{ color: '#6b7280', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>Thousands are growing their skills, switching careers, and achieving more. Here&apos;s what they&apos;re saying.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { name: "Sasha P.", role: "Founder @ Nexa", text: "Exactly what I needed to understand how to communicate with AI effectively." },
              { name: "Amith S.", role: "CEO @ FlowTech", text: "A solid foundation for anyone who wants to get serious with AI tools." },
              { name: "Fuad M.", role: "CTO @ Bloom", text: "I didn't realize how much better my AI results could be until I took this course." }
            ].map((t, i) => (
              <div key={i} style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>{[...Array(5)].map((_,ri)=><span key={ri}>{Icons.star}</span>)}</div>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827', lineHeight: 1.6, marginBottom: '2rem' }}>&quot;{t.text}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9' }} />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{t.name}</h5>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '6rem 2rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '3rem', textAlign: 'center' }}>Expand Your Expertise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {relatedCourses.map(rc => (
                <div key={rc._id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                    <div style={{ height: '160px', background: '#f1f5f9' }}>
                        <img src={rc.thumbnailUrl || rc.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>FUNDAMENTALS</span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 12px' }}>{rc.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                            {Icons.star} 4.9 <span style={{ color: '#9ca3af', fontWeight: 500 }}>(124 reviews)</span>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '8rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '4rem' }}>Everything you need to know before starting your learning journey.</p>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                "Do I need any prior experience to take this course?",
                "Is there a certificate after completion?",
                "How long do I have access to the course?",
                "Can I get a refund if I'm not satisfied?",
                "Can I interact with other learners?"
              ].map((q, i) => (
                <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                   <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                     <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>{q}</span>
                     <div style={{ transform: expandedFaq === i ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>{Icons.chevronDown}</div>
                   </div>
                   {expandedFaq === i && (
                     <AnimatePresence>
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>
                             Yes, you get full lifetime access to all course materials and our private founder community.
                          </div>
                        </motion.div>
                     </AnimatePresence>
                   )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <style jsx global>{`
        body { background: #fff !important; }
      `}</style>
    </div>
  );
}
