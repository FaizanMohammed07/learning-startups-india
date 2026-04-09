'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function SimpleCourseCard({ course, type = 'explore', layout = 'grid' }) {
  const { wishlist, toggleWishlist } = useDashboard();
  const wishlisted = wishlist?.has(course._id || course.id);
  const isList = layout === 'list';
  
  const isEnrolled = type === 'enrolled';
  const isCompleted = type === 'completed';
  const isWishlist = type === 'wishlist';

  return (
    <div className={`platform-card-v glass-card ${isList ? 'layout-list' : ''}`} style={{ 
      height: '100%', 
      margin: 0,
      display: 'flex',
      flexDirection: isList ? 'row' : 'column',
      minHeight: isList ? '180px' : 'auto',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.05)',
      background: '#fff'
    }}>
      {/* Thumbnail */}
      <div className="platform-card-v__thumb" style={{ 
        position: 'relative', 
        height: isList ? '180px' : '150px', 
        width: isList ? '260px' : '100%',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        {course.thumbnailUrl || course.img ? (
          <>
            <img 
              src={course.thumbnailUrl || course.img} 
              alt={course.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Thematic Red Overlay */}
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(139,0,0,0.3) 100%)',
              mixBlendMode: 'multiply', opacity: 0.8, zIndex: 1
            }} />
          </>
        ) : (
          <div className="thumb-placeholder" style={{ background: 'var(--slate-100)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 950, color: 'var(--slate-300)' }}>
            {course.title?.charAt(0)}
          </div>
        )}
        
        {/* Category Badge on Image */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 5 }}>
          <div style={{ 
             fontSize: '0.55rem', fontWeight: 950, color: '#fff', 
             background: 'var(--brand-red)', padding: '4px 10px', 
             borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em',
             boxShadow: '0 4px 12px rgba(235,35,39,0.3)'
          }}>
            {course.category || course.tag || 'STARTUP'}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          {isCompleted && (
            <span className="tag-pill" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--brand-red)', border: 'none', fontSize: '0.55rem', fontWeight: 950 }}>COMPLETED</span>
          )}
        </div>

        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(course._id || course.id); }}
          className="wishlist-btn-hover"
          style={{ 
            position: 'absolute', top: '15px', right: '15px', 
            background: wishlisted ? 'var(--brand-red)' : 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(15px)', 
            border: wishlisted ? 'none' : '1px solid rgba(255,255,255,0.4)', 
            borderRadius: '14px', 
            width: '40px', height: '40px', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', zIndex: 10,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: wishlisted ? '0 10px 20px rgba(235,35,39,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Icon 
            name="heart" 
            size={20} 
            color={wishlisted ? '#fff' : '#fff'} 
            fill={wishlisted ? '#fff' : 'none'}
            stroke={wishlisted ? 0 : 2}
          />
        </button>
      </div>
      
      {/* Body */}
      <div className="platform-card-v__body" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="platform-card-v__title" style={{ fontSize: '0.85rem', fontWeight: 950, marginBottom: '6px', color: 'var(--brand-black)', lineHeight: 1.3 }}>
          {course.title?.replace(/\sCourse$/gi, '')}
        </h3>
        
        <p className="platform-card-v__desc" style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: 400, lineHeight: '1.4', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description || course.module}
        </p>


        {isEnrolled && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 950, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Momentum</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'var(--brand-red)' }}>{course.progress || 0}%</span>
            </div>
            <div className="prog-bar-track" style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <div 
                className="prog-bar-fill" 
                style={{ 
                  width: `${course.progress || 0}%`, 
                  height: '100%', 
                  background: 'var(--brand-red)',
                  boxShadow: '0 0 10px rgba(233,34,34,0.2)'
                }} 
              />
            </div>
          </div>
        )}

        {/* Footer */}
              {/* Price and Enrollment Button */}
              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '1rem', 
                display: 'flex', 
                flexDirection: 'column',
                gap: '12px'
              }}>
                {isCompleted ? (
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                       <Link 
                         href={`/courses/${course.slug || course._id || course.id}`} 
                         className="btn-brand-outline" 
                         style={{ padding: '10px', fontSize: '0.65rem', borderRadius: '10px', textDecoration: 'none' }}
                       >
                         PREVIEW
                       </Link>
                       <button 
                         className="btn-brand-primary" 
                         style={{ padding: '10px', fontSize: '0.65rem', borderRadius: '10px' }}
                       >
                         <Icon name="award" size={14} color="#fff" /> CERTIFICATE
                       </button>
                    </div>
                 ) : (
                    <Link 
                      href={`/courses/${course.slug || course._id || course.id}`} 
                      className="btn-brand-primary" 
                      style={{ 
                        padding: '12px 20px', 
                        width: '100%',
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        borderRadius: '12px'
                      }}
                    >
                      {isEnrolled ? 'CONTINUE LEARNING' : 'EXPLORE PROGRAM'}
                      <Icon name="chevron-right" size={14} color="#fff" style={{ marginLeft: 'auto' }} />
                    </Link>
                 )}
              </div>
      </div>
    </div>
  );
}
