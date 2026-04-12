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
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) mainContent.scrollTop = 0;
  }, [pathname]);

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #e5e7eb', borderTop: '4px solid #e63946', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const isFullWidthPage = pathname?.startsWith('/learn') || 
                          pathname?.startsWith('/checkout') ||
                          (pathname?.includes('/courses/') && pathname.split('/').filter(Boolean).length >= 2);

  return (
    <DashboardProvider authUser={user}>
      <div className={`dashboard-layout ${isFullWidthPage ? 'learning-mode' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        
        {/* SIDEBAR - Excluded on full-width pages like Course Explore and Learning Player */}
        {!isFullWidthPage && <DashboardSidebar user={user} isPro={false} />}

        {/* Mobile Header - Only show on standard dashboard pages */}
        {!isFullWidthPage && (
          <header className="mobile-nav-header interactive-glass sticky-header">
            <div className="mobile-nav-left">
              <Link href="/dashboard" className="mobile-brand-logo">
                <img src="/assets/images/logo.png" alt="Logo" className="mobile-logo-img" />
              </Link>
            </div>

            <div className="mobile-nav-right">
              <button className="mobile-dots-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                <Icon name="moreVertical" size={24} color="#1e293b" stroke={2.5} />
              </button>
            </div>
          </header>
        )}

        {/* Mobile Menu Drawer Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ height: '100%' }}>
            <DashboardSidebar 
              user={user} 
              isPro={false} 
              onClose={() => setIsMobileMenuOpen(false)} 
            />
          </div>
        </div>

        {/* Outer wrapper for transition logic */}
        <div className="dashboard-outer-wrapper">
          <div className="dashboard-inner-wrap">
            <div className="dashboard-main">
              <div className="dashboard-content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
