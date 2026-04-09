'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardSidebar from '@/components/DashboardSidebar';
import { DashboardProvider } from '@/contexts/DashboardProvider';
import { getCurrentUser } from '@/lib/auth';
import '../../styles/design-system.css';
import '../../styles/dashboard-enterprise.css';
import '../../styles/premium-dashboard.css';
import '../../styles/dashboard-compact.css';
import '../../styles/navbar-fix.css';
import '../../styles/dashboard-navbar-fix.css';
import '../../styles/sidebar-responsive.css';
import '../../styles/dashboard-navbar-premium.css';
import '../../styles/dashboard-content-spacing.css';
import '../../styles/glass-dashboard.css';
import '../../styles/sidebar-accordion.css';
import '../../styles/platform-theme.css';


export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await getCurrentUser();
      if (error || !data?.user) {
        router.replace('/login');
        return;
      }
      setUser(data.user);
      setAuthLoading(false);
    }
    checkAuth();
  }, [router]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll to top on route change for seamless navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also scroll content area if it has its own overflow
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) mainContent.scrollTop = 0;
  }, [pathname]);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="spinner"
          style={{
            width: 40,
            height: 40,
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #e63946',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    );
  }

  const isFullWidthPage = pathname?.startsWith('/learn') || (pathname?.startsWith('/courses/') && pathname.split('/').filter(Boolean).length === 2);

  return (
    <DashboardProvider authUser={user}>
      <div className={`dashboard-layout ${isFullWidthPage ? 'learning-mode' : ''}`}>
        {/* Fixed Sidebar */}
        {!isFullWidthPage && <DashboardSidebar user={user} isPro={false} />}

        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Mobile Navigation Header */}
          {!isFullWidthPage && (
            <div className="mobile-nav-header">
              <div className="mobile-nav-left">
                <button className="hamburger-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                <h1 className="mobile-brand-name">StartupsIndia</h1>
              </div>
              <div className="mobile-nav-right">
                <div className="mobile-user-avatar">{user?.full_name?.[0] || 'U'}</div>
              </div>
            </div>
          )}

          {/* Mobile Menu Drawer */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mobile-menu-drawer" onClick={e => e.stopPropagation()}>
                <div className="mobile-menu-header-bar">
                  <h2 className="mobile-menu-title">StartupsIndia</h2>
                  <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <nav className="mobile-menu-nav" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingBottom: '2rem' }}>
                  {[
                    { label: 'CORE', items: [
                      { href: '/dashboard', label: 'Dashboard', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                      )},
                      { href: '/my-learning', label: 'My Learning', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                      )},
                    ]},
                    { label: 'COURSES', items: [
                      { href: '/courses', label: 'All Courses', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
                      )},
                      { href: '/enrolled-courses', label: 'Enrolled Courses', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                      )},
                      { href: '/wishlist', label: 'Wishlist', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      )},
                    ]},
                    { label: 'EXPERIENCE', items: [
                      { href: '/learn', label: 'Continue Learning', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                      )},
                      { href: '/live', label: 'Live Classes', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                      )},
                    ]},
                    { label: 'ANALYTICS', items: [
                      { href: '/analytics/progress', label: 'Progress Overview', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                      )},
                    ]},
                    { label: 'SETTINGS', items: [
                      { href: '/profile', label: 'Profile', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      )},
                      { href: '/settings', label: 'Settings', icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" /></svg>
                      )},
                    ]}
                  ].map((section, sidx) => (
                    <div key={sidx} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ padding: '0 1rem', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{section.label}</div>
                      {section.items.map((item, iidx) => (
                        <Link
                          key={iidx}
                          href={item.href}
                          className="mobile-menu-item"
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: '#fff', textDecoration: 'none' }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </nav>

                <div className="mobile-menu-footer">
                  <div className="mobile-menu-user">
                    <div className="mobile-menu-user-avatar">{user?.full_name?.[0] || 'U'}</div>
                    <div className="mobile-menu-user-info">
                      <div className="mobile-menu-user-name">{user?.full_name || 'User'}</div>
                      <div className="mobile-menu-user-email">{user?.email || ''}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Content */}
          <div className="dashboard-content">{children}</div>
        </div>
      </div>
    </DashboardProvider>
  );
}
