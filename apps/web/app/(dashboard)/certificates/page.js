'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificatesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiGet('/api/v1/enrollments');
        if (res.data) {
          setCourses(res.data);
          if (res.data.length > 0) {
            setSelectedCourse(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleOpenNewTab = () => {
    if (selectedCourse) {
      window.open(`/certificates/view/${selectedCourse._id}`, '_blank');
    }
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/certificates/view/' + selectedCourse?._id)}`;
    window.open(url, '_blank');
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #ef4444', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc', 
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* ── HEADER ── */}
      <header style={{ 
        padding: '1.5rem 2.5rem', 
        background: '#fff', 
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>My Certificates</h1>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: 0 }}>Showcase your achievements to the world</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
             Help Center
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT: SIDEBAR + PREVIEW ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR: COURSE LIST */}
        <aside style={{ 
          width: '260px', 
          background: '#fff', 
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem',
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', marginBottom: '1.25rem', letterSpacing: '0.1em' }}>SELECT ACHIEVEMENT</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
            {courses.map(course => (
              <button
                key={course._id}
                onClick={() => setSelectedCourse(course)}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: selectedCourse?._id === course._id ? '#ef4444' : '#f1f5f9',
                  background: selectedCourse?._id === course._id ? '#fef2f2' : '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <Icon name="certificate" size={20} color={selectedCourse?._id === course._id ? '#ef4444' : '#94a3b8'} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                   <div style={{ fontSize: '0.85rem', fontWeight: 700, color: selectedCourse?._id === course._id ? '#ef4444' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title || course.courseTitle}</div>
                   <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>Issued March 2026</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main style={{ 
          flex: 1, 
          padding: '2.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          overflowY: 'auto'
        }}>
          
          <AnimatePresence mode="wait">
            {selectedCourse && (
              <motion.div 
                key={selectedCourse._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                style={{ width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '3rem' }}
              >
                {/* Certificate High-Res Card */}
                <div style={{ 
                  aspectRatio: '1.414/1', // A4 Landscape ratio
                  width: '100%',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
                  position: 'relative',
                  padding: '4rem',
                  border: '20px solid #0f172a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                   {/* Decorative border */}
                   <div style={{ position: 'absolute', inset: '10px', border: '1px solid #ef444433', pointerEvents: 'none' }} />
                   
                   {/* Content */}
                   <img src="/assets/images/logo.png" alt="Logo" style={{ width: '120px', marginBottom: '2rem' }} />
                   <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Certificate of Excellence</h3>
                   
                   <p style={{ fontSize: '1.1rem', color: '#64748b', margin: '0 0 1rem' }}>This is to certify that</p>
                   <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem', fontFamily: 'serif' }}>Jaswanth Reddy</h2>
                   <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', lineHeight: 1.6 }}>Has successfully completed the comprehensive training program in</p>
                   <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', margin: '1rem 0 3rem' }}>{selectedCourse.title || selectedCourse.courseTitle}</h4>
                   
                   <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '3rem' }}>
                      <div style={{ textAlign: 'left' }}>
                         <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Startup India Team</div>
                         <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Authorized Signatory</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                         <div style={{ width: '80px', height: '80px', border: '2px solid #ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                            <Icon name="checkCircle" size={40} />
                         </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>March 10, 2026</div>
                         <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Completion Date</div>
                      </div>
                   </div>
                </div>

                {/* ACTION BAR */}
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '24px', 
                  padding: '1.25rem 2rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  width: '100%',
                  margin: '0 auto 2rem'
                }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                      onClick={() => router.push(`/learn/${selectedCourse.slug || selectedCourse._id}`)}
                      style={{ 
                        background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 28px', 
                        borderRadius: '16px', color: '#1e293b', fontWeight: 700, fontSize: '0.85rem', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                      }}
                    >
                      <Icon name="book" size={18} color="#ef4444" /> REVISIT COURSE
                    </button>
                    <button 
                      onClick={handleOpenNewTab}
                      style={{ 
                        background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 28px', 
                        borderRadius: '16px', color: '#1e293b', fontWeight: 700, fontSize: '0.85rem', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                      }}
                    >
                      <Icon name="externalLink" size={18} color="#ef4444" /> FULLSCREEN VIEW
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                      style={{ 
                        background: '#fff', border: '2.2px solid #ef4444', padding: '14px 32px', 
                        borderRadius: '16px', color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                      }}
                    >
                      <Icon name="download" size={18} color="#ef4444" /> DOWNLOAD
                    </button>
                    <button 
                      onClick={handleLinkedInShare}
                      style={{ 
                        background: '#ef4444', border: 'none', padding: '14px 32px', 
                        borderRadius: '16px', color: '#fff', fontWeight: 800, fontSize: '0.85rem', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                        boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      <Icon name="userPlus" size={18} color="#fff" /> LINKEDIN
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>

      </div>

      <style jsx>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
