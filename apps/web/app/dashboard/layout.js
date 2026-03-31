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

  return (
    <DashboardProvider authUser={user}>
      <div className="dashboard-layout">
        {/* Fixed Sidebar */}
        <DashboardSidebar user={user} isPro={false} />

        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Mobile Navigation Header */}
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

                <nav className="mobile-menu-nav">
                  <Link
                    href="/dashboard"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
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
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/explore"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    <span>Explore Courses</span>
                  </Link>
                  <Link
                    href="/dashboard/my-courses"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span>My Courses</span>
                  </Link>
                  <Link
                    href="/dashboard/certificates"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
                    </svg>
                    <span>My Certificates</span>
                  </Link>
                  <Link
                    href="/dashboard/contact"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Contact</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={mobile - menu - item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
                    </svg>
                    <span>Settings</span>
                  </Link>
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
