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
import Icon from '@/components/Icon';
import { navigationData } from '@/lib/navigation-data';



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

  // Handle window resize to automatically close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1060 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Removed fixed position as it causes "white screen" / jump issues in some browsers
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

  const isFullWidthPage = pathname?.startsWith('/learn') || 
                          pathname?.startsWith('/checkout') ||
                          (pathname?.startsWith('/courses/') && pathname.split('/').filter(Boolean).length === 2);

  return (
    <DashboardProvider authUser={user}>
      <div className={`dashboard-layout ${isFullWidthPage ? 'learning-mode' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        
        {/* Mobile Header - Visible only on mobile (< 1060px) */}
        {(true) && (
          <header className="mobile-nav-header interactive-glass sticky-header">

            <div className="mobile-nav-left">
              <Link href="/dashboard" className="mobile-brand-logo">
                <img src="/assets/images/logo.png" alt="Logo" className="mobile-logo-img" />
              </Link>
            </div>

            <div className="mobile-nav-right">
              <button 
                className="mobile-dots-toggle" 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
              >
                <Icon name="moreVertical" size={24} color="var(--brand-red)" stroke={2.5} />
              </button>
            </div>
          </header>
        )}

        {/* Mobile Menu Drawer Overlay - Enabled for all dashboard routes on mobile */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navigation</span>
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                <Icon name="x" size={24} color="#64748b" />
              </button>
            </div>
            
            <nav className="mobile-menu-nav custom-scrollbar">
              {navigationData.map((section, sectionIdx) => (
                <div key={section.id} className="mobile-nav-section">
                  <div className="mobile-section-label">{section.label}</div>
                  <div className="mobile-section-items">
                    {section.items.map((item, itemIdx) => (
                      <Link 
                        key={item.id} 
                        href={item.path} 
                        className={`mobile-nav-item ${pathname === item.path ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ '--stagger': itemIdx + (sectionIdx * 3) }}
                      >
                        <Icon name={item.icon} size={20} color="currentColor" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            
            <div className="mobile-menu-footer">
              <div className="mobile-user-profile">
                <div className="mobile-user-avatar">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="mobile-user-info">
                  <div className="mobile-user-name">{user?.name || 'User'}</div>
                  <div className="mobile-user-email">{user?.email || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Wrapper for scale-down effect */}
        <div className="dashboard-outer-wrapper">
          <div className="dashboard-inner-wrap">
             {/* Fixed Sidebar */}
            {!isFullWidthPage && <DashboardSidebar user={user} isPro={false} />}

            {/* Main Content Area */}
            <div className="dashboard-main">
              {/* Dynamic Content */}
              <div className="dashboard-content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
