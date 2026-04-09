'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { motion } from 'framer-motion';

const CERTS = [
  { id:'ce1', title:'Entrepreneurial Fundamentals',  course:'Entrepreneurial Fund.', date:'Mar 15, 2025', grade:'A+', score:94, id_num:'SI-2025-0142' },
  { id:'ce2', title:'Lean Startup Methodology',      course:'Lean Startup',          date:'Jan 28, 2025', grade:'A',  score:88, id_num:'SI-2025-0089' },
  { id:'ce3', title:'Digital Marketing Essentials',  course:'Digital Marketing',     date:'Dec 10, 2024', grade:'B+', score:76, id_num:'SI-2024-0341' },
];

export default function CertificatesPage() {
  const [showShare, setShowShare] = useState(null);

  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Credential Hub</h1>
          <p className="platform-page-subtitle">Your officially verified startup certifications and achievements.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {CERTS.map((cert) => (
          <div key={cert.id} className="glass-card" style={{ 
            padding: '1.5rem', 
            borderRadius: '24px', 
            background: '#fff', 
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            {/* Certificate Preview Placeholder */}
            <div style={{ 
              height: '220px', 
              background: 'var(--brand-black)', 
              borderRadius: '16px', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '16px 16px' }} />
               <Icon name="certificate" size={60} color="var(--brand-red)" />
               <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                  <Icon name="verified" size={20} color="var(--brand-red)" />
               </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 950, color: 'var(--brand-black)', margin: '0 0 4px', lineHeight: 1.3 }}>{cert.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700, margin: 0 }}>Certificate ID: {cert.id_num}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setShowShare(cert.id)}
                style={{ flex: 1, padding: '12px', background: 'var(--brand-black)', color: '#fff', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 950, border: 'none', cursor: 'pointer' }}
              >
                REVIEW
              </button>
              <button 
                style={{ flex: 1, padding: '12px', background: 'var(--slate-50)', color: 'var(--brand-black)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 950, border: '1px solid var(--slate-100)', cursor: 'pointer' }}
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LinkedIn Share Modal / Prompt */}
      {showShare && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card" 
            style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', background: '#fff', borderRadius: '32px', textAlign: 'center' }}
          >
            <div style={{ width: 60, height: 60, borderRadius: '16px', background: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '0.75rem' }}>Share on LinkedIn</h2>
            <p style={{ color: 'var(--slate-500)', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 600 }}>Showcase your accomplishment to your professional network and boost your visibility.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => setShowShare(null)}
                  style={{ padding: '14px', background: '#0a66c2', color: '#fff', borderRadius: '14px', border: 'none', fontWeight: 950, cursor: 'pointer' }}
                >
                  Post to Profile
                </button>
                <button 
                  onClick={() => setShowShare(null)}
                  style={{ padding: '14px', background: 'transparent', color: 'var(--slate-400)', borderRadius: '14px', border: 'none', fontWeight: 950, cursor: 'pointer' }}
                >
                  Not now
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
