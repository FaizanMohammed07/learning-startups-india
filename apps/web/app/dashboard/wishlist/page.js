'use client';

import { useDashboard } from '@/contexts/DashboardProvider';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem 2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ height: '40px', width: '200px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '2rem' }} className="animate-pulse" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: '300px', background: '#f3f4f6', borderRadius: '20px' }} className="animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes paper-plane { 
          0% { transform: translate(-10%, 10%) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(110%, -110%) rotate(15deg); opacity: 0; }
        }
        .wishlist-card { animation: fadeInUp 0.4s ease-out both; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .wishlist-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -15px rgba(0,0,0,0.12); }
        .action-btn { transition: all 0.2s; }
        .action-btn:hover { transform: scale(1.03); filter: brightness(1.1); }
        .plane { position: absolute; opacity: 0; animation: paper-plane 4s infinite linear; pointer-events: none; }
      `}} />

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>Wishlist</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.05rem' }}>
          Your selected curriculum for professional excellence.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          background: '#fff',
          borderRadius: '32px',
          border: '1px solid #f3f4f6',
          boxShadow: '0 20px 50px -12px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Paper Planes background */}
          {[1,2,3].map(i => (
            <div key={i} className="plane" style={{ 
              top: 20 + (i*20) + '%', 
              left: 0, 
              animationDelay: i*1.3 + 's' 
            }}>
              <svg width="24" height="24" transform="rotate(90)" viewBox="0 0 24 24" fill="#6366f1">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          ))}

          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'float 3s ease-in-out infinite',
            position: 'relative',
            zIndex: 1
          }}>
            <svg width="48" height="48" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            Your wishlist is empty
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2.5rem', maxWidth: '450px', margin: '0 auto 2.5rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            Save courses you&apos;re interested in to your wishlist and they will appear here. Explore our <strong style={{ color: '#6366f1' }}>Expert Courses</strong> to find your next challenge.
          </p>
          
          <Link href="/dashboard/explore" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
            <button className="action-btn" style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '16px',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 12px 24px -6px rgba(79,70,229,0.4)'
            }}>
              Go to Expert Courses
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {wishlist.map((course, i) => (
            <div key={course._id} className="wishlist-card" style={{
              background: '#fff',
              borderRadius: '24px',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animationDelay: i * 0.05 + 's',
            }}>
              <div style={{ position: 'relative', height: '180px', flexShrink: 0 }}>
                {course.thumbnailUrl ? (
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '3rem', color: '#fff', fontWeight: 900, opacity: 0.8 }}>
                      {course.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  <button
                    onClick={() => toggleWishlist(course._id)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                    className="heart-btn"
                  >
                    <svg width="18" height="18" fill="#e11d48" stroke="#e11d48" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: '#111827',
                  color: '#fff',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  backdropFilter: 'blur(10px)'
                }}>
                  ₹{(course.priceInr || 0).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#3b82f6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>
                  {course.category || 'General'}
                </span>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.subtitle || course.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                  <Link href={`/courses/${course.slug || course._id}`} style={{ textDecoration: 'none', flex: 1 }}>
                    <button className="action-btn" style={{
                      width: '100%',
                      background: '#111827',
                      color: '#fff',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}>
                      View Course
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
