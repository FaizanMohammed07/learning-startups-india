'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiGet } from '@/lib/api';
import Icon from '@/components/Icon';

export default function CertificateViewPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiGet(`/api/v1/enrollments`);
        const found = res.data?.find(c => c._id === id || c.id === id);
        if (found) {
          setCourse(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #f3f3f3', borderTop: '4px solid #ef4444', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (!course) return <div style={{ padding: '2rem', textAlign: 'center' }}>Certificate not found.</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        aspectRatio: '1.414/1', 
        width: '100%',
        maxWidth: '1100px',
        background: '#fff',
        borderRadius: '0',
        boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
        position: 'relative',
        padding: '5rem',
        border: '24px solid #0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
         <div style={{ position: 'absolute', inset: '10px', border: '1px solid #ef444433', pointerEvents: 'none' }} />
         
         <img src="/assets/images/logo.png" alt="Logo" style={{ width: '150px', marginBottom: '2.5rem' }} />
         <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '2rem' }}>Certificate of Excellence</h3>
         
         <p style={{ fontSize: '1.25rem', color: '#64748b', margin: '0 0 1.5rem' }}>This is to certify that</p>
         <h2 style={{ fontSize: '4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1.5rem', fontFamily: 'serif' }}>Jaswanth Reddy</h2>
         <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', lineHeight: 1.6 }}>Has successfully completed the comprehensive training program in</p>
         <h4 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ef4444', margin: '1.5rem 0 4rem' }}>{course.title || course.courseTitle}</h4>
         
         <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '4rem' }}>
            <div style={{ textAlign: 'left' }}>
               <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>Startup India Team</div>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Authorized Signatory</div>
            </div>
            <div style={{ textAlign: 'center' }}>
               <div style={{ width: '100px', height: '100px', border: '3px solid #ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <Icon name="checkCircle" size={50} />
               </div>
            </div>
            <div style={{ textAlign: 'right' }}>
               <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>March 10, 2026</div>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Completion Date</div>
            </div>
         </div>

         {/* Print Button - only visible on screen */}
         <button 
           onClick={() => window.print()}
           style={{ 
             position: 'absolute', top: '-60px', right: 0,
             background: '#ef4444', color: '#fff', border: 'none', 
             padding: '12px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer',
             boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)'
           }}
           className="no-print"
         >
           Print Certificate
         </button>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; padding: 0 !important; }
          div { box-shadow: none !important; border-width: 12px !important; }
        }
      `}</style>
    </div>
  );
}
