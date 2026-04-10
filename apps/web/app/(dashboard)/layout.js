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

  const isFullWidthPage = pathname?.startsWith('/learn') || 
                          pathname?.startsWith('/checkout') ||
                          (pathname?.startsWith('/courses/') && pathname.split('/').filter(Boolean).length === 2);

  return (
    <DashboardProvider authUser={user}>
      <div className={`dashboard-layout ${isFullWidthPage ? 'learning-mode' : ''}`}>
        {/* Fixed Sidebar */}
        {!isFullWidthPage && <DashboardSidebar user={user} isPro={false} />}

        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Dynamic Content */}
          <div className="dashboard-content">{children}</div>
        </div>
      </div>
    </DashboardProvider>
  );
}
