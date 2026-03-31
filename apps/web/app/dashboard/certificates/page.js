'use client';

import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function CertificatesPage() {
  const { certificates, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <div
          style={{
            height: 24,
            width: 180,
            background: '#e5e7eb',
            borderRadius: 8,
            marginBottom: '1.5rem',
          }}
          className="animate-pulse"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{ height: 160, background: '#f3f4f6', borderRadius: 12 }}
              className="animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        My Certificates
      </h1>

      {certificates.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            You haven&apos;t earned any certificates yet.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Complete a course to receive your certificate.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {certificates.map(cert => (
            <div
              key={cert._id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>🏆</span>
              </div>
              <h3 style={{ fontWeight: 600, marginBottom: 4 }}>
                {cert.courseTitle || 'Certificate'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: 12 }}>
                Issued {cert.createdAt ? new Date(cert.createdAt).toLocaleDateString() : ''}
              </p>
              {cert.certificateNumber && (
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontFamily: 'monospace',
                    marginBottom: 12,
                  }}
                >
                  #{cert.certificateNumber}
                </p>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  href={`/certificate?id=${cert._id}`}
                  style={{
                    fontSize: '0.8rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  View
                </Link>
                {cert.certificateNumber && (
                  <Link
                    href={`/verify/${cert.certificateNumber}`}
                    style={{
                      fontSize: '0.8rem',
                      color: '#10b981',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Verify
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
