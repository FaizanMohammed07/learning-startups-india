'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import { MAINTENANCE_MODE } from '@/config/maintenance';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // ⚠️ MAINTENANCE MODE - Hide navbar and footer completely
  if (MAINTENANCE_MODE) {
    return <>{children}</>;
  }
  
  const authPages = ['/login', '/signup', '/signin'];
  const isAuthPage = authPages.includes(pathname);

  // Pages that SHOULD have Header/Footer (Marketing/Landing pages)
  const websitePages = [
    '/', '/about', '/team', '/events', '/mentors', '/investors', 
    '/market-access', '/programs', '/source', '/verify', '/cookies', 
    '/privacy', '/refund', '/terms', '/contact-us', '/help', '/faqs'
  ];
  const isWebsitePage = websitePages.includes(pathname);
  
  // Also check if it's a dynamic route that is definitely NOT a dashboard one
  // For now, let's stick to the previous logic but add the new catch-all.
  
  const dashboardPaths = [
    '/dashboard', '/my-learning', '/leaderboard', '/analytics', '/community', 
    '/assessments', '/quizzes', '/assignments', '/certificates', '/badges', '/settings', 
    '/profile', '/wishlist', '/completed-courses', '/enrolled-courses', '/live', 
    '/recorded', '/notes', '/payments', '/results', '/exams', '/contact', '/courses'
  ];
  const isDashboardPage = dashboardPaths.some(path => pathname === path || pathname?.startsWith(path + '/'));
  
  const isLearnPage = pathname?.startsWith('/learn');
  const isCheckoutPage = pathname?.startsWith('/checkout');
  const isMentorDashboard = pathname?.startsWith('/mentor/dashboard');
  const isAdminPage = pathname?.startsWith('/admin');

  // Learn, Checkout, Admin, Auth should always hide root layout
  const isExcluded = isAuthPage || isLearnPage || isCheckoutPage || isMentorDashboard || isAdminPage;

  // HIDE HEADDER/FOOTER IF:
  // 1. It's a dashboard page OR excluded system page
  // 2. AND it's NOT a dynamic root-level course page (website landing page)
  const isDynamicRootPage = pathname?.split('/').length === 2 && !isDashboardPage && !isExcluded && !isWebsitePage;
  
  const shouldHide = (isDashboardPage || isExcluded || !isWebsitePage) && !isDynamicRootPage;
  
  if (shouldHide && pathname !== '/') {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
