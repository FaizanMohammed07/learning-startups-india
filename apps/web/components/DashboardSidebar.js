'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from '@/lib/auth';

export default function DashboardSidebar({ user, isPro = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openSectionId, setOpenSectionId] = useState('courses');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = [
    {
      id: 'main-top',
      items: [
        { id: 'home', label: 'Home', path: '/', icon: 'home' },
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
      ],
    },
    {
      id: 'courses',
      label: 'Courses',
      isDropdown: true,
      items: [
        { id: 'explore', label: 'Expert Courses', path: '/dashboard/explore', icon: 'explore' },
        { id: 'my-courses', label: 'Enrolled Courses', path: '/dashboard/my-courses', icon: 'courses' },
        { 
          id: 'wishlist', 
          label: 'Wishlist', 
          path: '/dashboard/wishlist', 
          icon: 'wishlist',
          badge: (
            <span style={{ 
              marginLeft: 'auto', 
              fontSize: '10px', 
              background: '#ede9fe', 
              color: '#6d28d9', 
              padding: '2px 8px', 
              borderRadius: '6px',
              fontWeight: 800,
              border: '1px solid #ddd6fe'
            }}>NEW</span>
          )
        },
        { id: 'completed', label: 'Completed Courses', path: '/dashboard/completed-courses', icon: 'certificates' },
      ],
    },
    {
      id: 'learning-experience',
      label: 'Learning Experience',
      isDropdown: true,
      items: [
        { id: 'continue', label: 'Continue Learning', path: '/dashboard/learning/continue', icon: 'dashboard' },
        { id: 'live', label: 'Live Classes', path: '/dashboard/learning/live', icon: 'explore' },
        { id: 'recorded', label: 'Recorded Classes', path: '/dashboard/learning/recorded', icon: 'courses' },
        { id: 'notes', label: 'Notes / Bookmarks', path: '/dashboard/learning/notes', icon: 'wishlist' },
      ],
    },
    {
      id: 'assessments',
      label: 'Assessments',
      isDropdown: true,
      items: [
        { id: 'quizzes', label: 'Quizzes', path: '/dashboard/assessments/quizzes', icon: 'explore' },
        { id: 'assignments', label: 'Assignments', path: '/dashboard/assessments/assignments', icon: 'courses' },
        { id: 'exams', label: 'Exams', path: '/dashboard/assessments/exams', icon: 'award' },
        { id: 'results', label: 'Results', path: '/dashboard/assessments/results', icon: 'streak' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      isDropdown: true,
      items: [
        { id: 'progress-overview', label: 'Progress Overview', path: '/dashboard/analytics/progress', icon: 'dashboard' },
        { id: 'performance', label: 'Performance Analytics', path: '/dashboard/analytics/performance', icon: 'results' },
        { id: 'learning-time', label: 'Learning Time', path: '/dashboard/analytics/learning-time', icon: 'calendar' },
        { id: 'skill-graph', label: 'Skill Graph', path: '/dashboard/analytics/skills', icon: 'tracking' },
      ],
    },
    {
      id: 'achievements',
      label: 'Achievements',
      isDropdown: true,
      items: [
        { id: 'certificates', label: 'Certificates', path: '/dashboard/achievements/certificates', icon: 'award' },
        { id: 'badges', label: 'Badges', path: '/dashboard/achievements/badges', icon: 'streak' },
        { id: 'leaderboard', label: 'Leaderboard', path: '/dashboard/achievements/leaderboard', icon: 'stats' },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      isDropdown: true,
      items: [
        { id: 'discussions', label: 'Discussions', path: '/dashboard/community/discussions', icon: 'explore' },
        { id: 'groups', label: 'Groups', path: '/dashboard/community/groups', icon: 'courses' },
        { id: 'doubts', label: 'Doubts / Q&A', path: '/dashboard/community/doubts', icon: 'wishlist' },
      ],
    },
    {
      id: 'payments',
      label: 'Payments',
      isDropdown: true,
      items: [
        { id: 'purchases', label: 'My Purchases', path: '/dashboard/payments/purchases', icon: 'courses' },
        { id: 'billing', label: 'Billing History', path: '/dashboard/payments/billing', icon: 'stats' },
        { id: 'subscriptions', label: 'Subscriptions', path: '/dashboard/payments/subscriptions', icon: 'award' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      isDropdown: true,
      items: [
        { id: 'profile', label: 'Profile', path: '/dashboard/settings/profile', icon: 'profile' },
        { id: 'account', label: 'Account Settings', path: '/dashboard/settings/account', icon: 'settings' },
        { id: 'notifications', label: 'Notifications', path: '/dashboard/settings/notifications', icon: 'wishlist' },
        { id: 'privacy', label: 'Privacy', path: '/dashboard/settings/privacy', icon: 'tracking' },
      ],
    },
  ];

  const isActive = path => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  };

  const renderIcon = (icon, isOpen = false) => {
    const icons = {
      home: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      dashboard: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      courses: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      certificates: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      explore: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      wishlist: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      profile: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      chevron: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      ),
      award: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      streak: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      stats: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      calendar: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      tracking: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      results: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
      settings: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    };
    return icons[icon] || null;
  };

  return (
    <aside className="premium-sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="sidebar-logo">
          <img
            src="/assets/images/logo.png"
            alt="Startups India Logo"
            className="sidebar-logo-img"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigation.map(section => (
          <div key={section.id} className="nav-section">
            {section.label && (
              <div 
                className="nav-section-header" 
                onClick={() => section.isDropdown && setOpenSectionId(openSectionId === section.id ? null : section.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: section.isDropdown ? 'pointer' : 'default',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <span>{section.label}</span>
                {section.isDropdown && renderIcon('chevron', openSectionId === section.id)}
              </div>
            )}
            <div className={`nav-items ${section.isDropdown && openSectionId !== section.id ? 'collapsed' : ''}`} style={{
              overflow: 'hidden',
              maxHeight: section.isDropdown && openSectionId !== section.id ? '0' : '500px',
              transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {section.items.map(item => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  prefetch={true}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <span className="nav-item-icon">{renderIcon(item.icon)}</span>
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar-bottom">
        <div className="bottom-actions">
          <Link href="/dashboard/settings" className="bottom-action">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6" />
              <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24" />
              <path d="M1 12h6m6 0h6" />
              <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24" />
            </svg>
            <span>Account Settings</span>
          </Link>

          <button
            className="bottom-action"
            onClick={() => setShowLogoutModal(true)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>

          <Link href="/dashboard/contact" className="bottom-action">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Contact Support</span>
          </Link>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 16, padding: '36px 32px 28px',
              width: 380, maxWidth: '90vw', textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative',
              animation: 'logoutModalIn 0.25s ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: '#111' }}>
              Sign Out?
            </h3>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>
              Are you sure you want to sign out? You will need to log in again to access your dashboard.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 10,
                  border: '1.5px solid #e5e7eb', background: '#fff',
                  fontSize: 14, fontWeight: 600, color: '#374151',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background = '#f9fafb'; e.target.style.borderColor = '#d1d5db'; }}
                onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.borderColor = '#e5e7eb'; }}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.replace('/login');
                }}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 10,
                  border: 'none', background: 'linear-gradient(135deg, #7A1F2B, #9B3040)',
                  fontSize: 14, fontWeight: 600, color: '#fff',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(122,31,43,0.3)',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.9'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes logoutModalIn {
              from { opacity: 0; transform: scale(0.9) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}} />
        </div>
      )}
    </aside>
  );
}
