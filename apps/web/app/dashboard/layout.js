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
import '../../styles/dashboard-responsive-v2.css';

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
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => {
      document.body.classList.remove('sidebar-open');
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
        <DashboardSidebar 
          user={user} 
          isPro={false} 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Mobile Navigation Header */}
          <div className="mobile-nav-header">
            <div className="mobile-nav-left">
              <button 
                className="hamburger-menu-btn" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <Link href="/dashboard" className="mobile-nav-brand">
                <img 
                  src="/assets/images/logo.png" 
                  alt="Logo" 
                  className="mobile-nav-logo"
                />
              </Link>
            </div>
          </div>

          {/* Dynamic Content */}
          <div 
            className="dashboard-content" 
            style={{ 
              paddingLeft: 'max(1rem, env(safe-area-inset-left))', 
              paddingRight: 'max(1rem, env(safe-area-inset-right))' 
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
