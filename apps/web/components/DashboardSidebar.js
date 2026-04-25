'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from '@/lib/auth';

export default function DashboardSidebar({ user, isPro = false, isOpen = false, onClose = () => {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ courses: true });

  const toggleSection = sectionId => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const navigation = [
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
      ],
    },
    {
      id: 'courses',
      label: 'Courses',
      isCollapsible: true,
      items: [
        { id: 'explore', label: 'Explore Courses', path: '/dashboard/explore', icon: 'explore' },
        {
          id: 'enrolled',
          label: 'Enrolled Courses',
          path: '/dashboard/my-courses',
          icon: 'courses',
        },
        { id: 'wishlist', label: 'Wishlist', path: '/dashboard/wishlist', icon: 'wishlist' },
        {
          id: 'completed',
          label: 'Completed Courses',
          path: '/dashboard/completed',
          icon: 'completed',
        },
      ],
    },
    {
      id: 'personal',
      items: [
        {
          id: 'certificates',
          label: 'My Certificates',
          path: '/dashboard/certificates',
          icon: 'certificates',
        },
        { id: 'profile', label: 'My Profile', path: '/profile', icon: 'profile' },
      ],
    },
    {
      id: 'support',
      label: 'Support & Account',
      items: [
        { id: 'settings', label: 'Account Settings', path: '/dashboard/settings', icon: 'settings' },
        { id: 'contact', label: 'Contact Support', path: '/dashboard/contact', icon: 'contact' },
        { id: 'logout', label: 'Logout', path: '/logout', icon: 'logout', isAction: true },
      ],
    },
  ];

  const isActive = path => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname === path || pathname.startsWith(path + '/');
  };

  const renderIcon = icon => {
    const icons = {
      home: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      dashboard: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      courses: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      certificates: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      explore: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      profile: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      wishlist: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      completed: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      settings: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      logout: (
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
      ),
      contact: (
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
      ),
    };
    return icons[icon] || null;
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1050,
          display: isOpen ? 'block' : 'none',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      <aside className={`premium-sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Logo and Branding */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="sidebar-logo" onClick={onClose}>
          <img
            src="/assets/images/logo.png"
            alt="Startups India Logo"
            className="sidebar-logo-img"
            style={{ height: '32px', width: 'auto' }}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigation.map(section => (
          <div key={section.id} className="nav-section">
            {section.label && (
              <div
                className={`nav-section-header ${section.isCollapsible ? 'collapsible' : ''}`}
                onClick={() => section.isCollapsible && toggleSection(section.id)}
              >
                <div className="nav-section-label">{section.label}</div>
                {section.isCollapsible && (
                  <span
                    className={`chevron-icon ${expandedSections[section.id] ? 'expanded' : ''}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                )}
              </div>
            )}
            <div
              className={`nav-items-container ${section.isCollapsible && !expandedSections[section.id] ? 'collapsed' : ''}`}
            >
              <div className="nav-items">
                {section.items.map(item => (
                  item.isAction ? (
                    <button
                      key={item.id}
                      className="nav-item action-button-nav"
                      onClick={() => {
                        if (item.id === 'logout') {
                          onClose();
                          setShowLogoutModal(true);
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: 'calc(100% - 24px)',
                        textAlign: 'left',
                        fontFamily: 'inherit'
                      }}
                    >
                      <span className="nav-item-icon">{renderIcon(item.icon)}</span>
                      <span className="nav-item-label">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                      prefetch={true}
                      onClick={onClose}
                    >
                      <span className="nav-item-icon">{renderIcon(item.icon)}</span>
                      <span className="nav-item-label">{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>

      {/* Keep desktop bottom sidebar - but hidden on mobile to avoid double buttons */}
      <div className="sidebar-bottom desktop-only">
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 1060px) {
            .desktop-only { display: none !important; }
          }
        `}} />

        <div className="bottom-actions">
          <Link href="/dashboard/settings" className="bottom-action" onClick={onClose}>
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
            onClick={() => {
              onClose();
              setShowLogoutModal(true);
            }}
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

          <Link href="/dashboard/contact" className="bottom-action" onClick={onClose}>
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
    </>
  );
}
