'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [purchasedCourses] = useState([
    { 
        id: 'C1', 
        title: 'Mastering Venture Capital & Fundraising', 
        instructor: 'Deepak S.', 
        progress: 65, 
        lessons: '12/18', 
        img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=200&auto=format&fit=crop',
        category: 'Finance',
        status: 'ACTIVE'
    },
    { 
        id: 'C2', 
        title: 'Zero to One: Building Scalable SaaS', 
        instructor: 'Alex K.', 
        progress: 30, 
        lessons: '4/14', 
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop',
        category: 'Product',
        status: 'ACTIVE'
    },
    { 
        id: 'C3', 
        title: 'Growth Hacking for Early Stage Startups', 
        instructor: 'Sarah J.', 
        progress: 100, 
        lessons: '10/10', 
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
        category: 'Marketing',
        status: 'COMPLETED'
    },
  ]);

  const filteredCourses = useMemo(() => {
    return purchasedCourses.filter(c => c.status === activeTab);
  }, [activeTab, purchasedCourses]);

  return (
    <div className="platform-page">
      
      {/* HEADER */}
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">My Purchases</h1>
          <p className="platform-page-subtitle">Your unlocked premium startup curriculum.</p>
        </div>
        <div style={{ display: 'flex', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            <button 
              onClick={() => setActiveTab('ACTIVE')}
              style={{ padding: '10px 22px', border: 'none', background: activeTab === 'ACTIVE' ? '#ef4444' : 'transparent', color: activeTab === 'ACTIVE' ? '#fff' : '#64748b', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer', transition: '0.2s' }}
            >
              ACTIVE
            </button>
            <button 
              onClick={() => setActiveTab('COMPLETED')}
              style={{ padding: '10px 22px', border: 'none', background: activeTab === 'COMPLETED' ? '#ef4444' : 'transparent', color: activeTab === 'COMPLETED' ? '#fff' : '#64748b', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer', transition: '0.2s' }}
            >
              COMPLETED
            </button>
        </div>
      </header>

      {/* PURCHASED COURSES GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
        {filteredCourses.map(course => (
          <div 
            key={course.id} 
            className="glass-card"
            style={{ 
                background: '#fff', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)', cursor: 'pointer', transition: '0.3s'
            }}
          >
            <div style={{ position: 'relative', height: '180px' }}>
                <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#ef4444', color: '#fff', padding: '6px 14px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 950 }}>
                    {course.category.toUpperCase()}
                </div>
                {course.progress === 100 && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(16, 185, 129, 0.1)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#10b981', color: '#fff', padding: '8px 20px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon name="checkCircle" size={16} /> COMPLETED
                        </div>
                    </div>
                )}
            </div>
            
            <div style={{ padding: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 950, color: '#0f172a', lineHeight: 1.4, height: '3rem', overflow: 'hidden' }}>{course.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 950 }}>{course.instructor.charAt(0)}</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>Instructor: {course.instructor}</span>
                </div>

                <div style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 950, color: '#94a3b8' }}>{course.lessons} LESSONS</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 950, color: '#ef4444' }}>{course.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${course.progress}%`, height: '100%', background: course.progress === 100 ? '#10b981' : '#ef4444', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                    </div>
                </div>

                <button style={{ 
                    width: '100%', marginTop: '24px', padding: '14px', borderRadius: '16px', border: 'none', 
                    background: course.progress === 100 ? '#f8fafc' : '#0f172a', 
                    color: course.progress === 100 ? '#64748b' : '#fff', 
                    fontSize: '0.8rem', fontWeight: 950, cursor: 'pointer',
                    transition: 'all 0.2s'
                }} className="hover-scale">
                    {course.progress === 100 ? 'DOWNLOAD CERTIFICATE' : 'CONTINUE LEARNING'}
                </button>
            </div>
          </div>
        ))}

        {/* UPSELL CARD */}
        <div style={{ background: 'rgba(239, 68, 68, 0.03)', borderRadius: '32px', border: '2.5px dashed rgba(239, 68, 68, 0.1)', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '22px', background: '#fff', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.1)' }}>
                <Icon name="plus" size={32} stroke={3} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 950, color: '#0f172a' }}>Expand Your Mind</h3>
            <p style={{ margin: '8px 0 24px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 750, lineHeight: 1.5 }}>Unlock 50+ premium startup courses with a single subscription.</p>
            <Link href="/courses" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '14px 32px', borderRadius: '16px', border: 'none', background: '#ef4444', color: '#fff', fontSize: '0.85rem', fontWeight: 950, cursor: 'pointer', boxShadow: '0 6px 15px rgba(239, 68, 68, 0.2)' }}>EXPLORE CATALOG</button>
            </Link>
        </div>
      </div>

      <style jsx global>{`
        .hover-scale { transition: all 0.2s; }
        .hover-scale:hover { transform: scale(0.98); opacity: 0.9; }
      `}</style>
    </div>
  );
}
