'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';
import '../styles/header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Programs', href: '/programs' },
    { label: 'Events', href: '/events' },
    { label: 'Mentors', href: '/mentors' },
    { label: 'Investors', href: '/investors' },
    { label: 'Market Access', href: '/market-access' },
  ];

  useEffect(() => {
    async function checkAuth() {
      const { data } = await getCurrentUser();
      if (data?.user) {
        setUser(data.user);
      }
    }
    checkAuth();
  }, []);

  // 🧱 4. SCROLL LOCK (CRITICAL FOR PRODUCTION)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Prevent scroll bleed on mobile
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // 🧱 8. KEYBOARD SUPPORT (PRODUCTION LEVEL)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* 🧱 2. NAVBAR (CLEAN + ALIGNED) */}
      <motion.div
        className="main-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="container">
          <Link href="/" className="header-logo">
            <img
              src="/assets/images/logo.png"
              alt="Startups India Logo"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="logo-fallback">
              <span className="logo-startups">Startups</span>
              <span className="logo-india">India</span>
            </div>
          </Link>

          <div className="header-search">
            <input type="text" placeholder="What do you want to learn?" className="search-input" />
            <button className="search-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <div className="header-actions">
            {user ? (
              <Link href="/dashboard">
                <button className="btn-header btn-signin">Dashboard</button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button className="btn-header btn-signin">Sign in</button>
                </Link>
                <Link href="/signup">
                  <button className="btn-header btn-signup">Apply Now</button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu Toggle - PRODUCTION GRADE */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </motion.div>

      {/* Navigation Menu Bar - Desktop */}
      <motion.nav
        className="header-navbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="container">
          <div className="navbar-menu">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="navbar-item-header"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={item.href} className={`navbar-link ${pathname === item.href ? 'active' : ''}`}>
                  {item.label}
                  {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && openDropdown === item.label && (
                  <div className="header-dropdown">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <Link
                        key={idx}
                        href={dropdownItem.href}
                        className={`header-dropdown-link ${pathname === dropdownItem.href ? 'active' : ''}`}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* 🧱 3. DRAWER (ANIMATION + SAFE AREA) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* 🧱 5. BACKDROP (CLICK OUTSIDE CLOSE) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-drawer-backdrop"
              onClick={closeMobileMenu}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-drawer"
            >
              <div className="mobile-drawer-content">
                <div className="mobile-drawer-header">
                  <div className="mobile-logo">
                    <span className="logo-startups">Startups</span>
                    <span className="logo-india">India</span>
                  </div>
                  {/* 🧱 7. CLOSE BUTTON (ACCESSIBLE) */}
                  <button
                    className="mobile-drawer-close"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* 🧱 6. MENU CONTENT (PERFECT ALIGNMENT) */}
                <nav className="mobile-drawer-nav">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`mobile-drawer-link ${pathname === item.href ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </Link>
                  ))}
                </nav>

                <div className="mobile-drawer-actions">
                  {user ? (
                    <Link href="/dashboard" onClick={closeMobileMenu}>
                      <button className="mobile-btn mobile-btn-primary">Dashboard</button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" onClick={closeMobileMenu}>
                        <button className="mobile-btn mobile-btn-secondary">Sign in</button>
                      </Link>
                      <Link href="/signup" onClick={closeMobileMenu}>
                        <button className="mobile-btn mobile-btn-primary">Apply Now</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
