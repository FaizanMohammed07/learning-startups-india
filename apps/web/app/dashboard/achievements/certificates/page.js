'use client';

import { useState, useEffect } from 'react';

export default function CertificatesPage() {
  const [certs, setCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCerts() {
      try {
        const res = await fetch('/api/v1/achievements/certificates');
        const json = await res.json();
        if (json.success) setCerts(json.data);
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCerts();
  }, []);

  if (isLoading) return <div className="p-10 text-center">Retrieving Validated Credentials...</div>;

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .ccard { background:#fff; border-radius:12px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 4px 20px rgba(0,0,0,0.03); overflow:hidden; transition:all .3s; }
        .ccard:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
        .cert-header { background: #7A1F2B; padding: 20px; color: #C5975B; text-align: center; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <h1 className="da da1" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Credential Vault</h1>
        <p className="da da1" style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>A collection of your formal endorsements and startup incubation milestones.</p>
      </header>

      {certs.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {certs.map((cert, idx) => (
            <div key={cert._id} className={`da da${idx+2} ccard`}>
               <div className="cert-header">
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Official Certification</div>
               </div>
               <div style={{ padding: '32px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{cert.courseTitle}</h3>
                  <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '24px' }}>Issued on {new Date(cert.completionDate).toLocaleDateString()}</div>
                  
                  <div style={{ fontSize: '0.7rem', color: '#C5975B', fontWeight: 900, marginBottom: '4px' }}>VERIFICATION ID</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111', marginBottom: '32px', letterSpacing: '0.05em' }}>{cert.certificateNumber}</div>
                  
                  <button style={{ 
                    width: '100%', padding: '12px', borderRadius: '8px', background: 'transparent', 
                    border: '2px solid #7A1F2B', color: '#7A1F2B', fontWeight: 800, cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    DOWNLOAD PDF
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: '#bbb' }}>No certificates earned yet. Complete a course to unlock your first credential.</p>
        </div>
      )}
    </div>
  );
}

