'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';
import '../styles/header.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'About Us', href: '/about' },
        { label: 'Team', href: '/team' },
      ],
    },
    {
      label: 'Our Programs',
      href: '/programs',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Pre-Incubation', href: '/programs/pre-incubation' },
        { label: 'Incubation', href: '/programs/incubation' },
        { label: 'Growth Programs', href: '/programs/growth' },
      ],
    },
    { label: 'Events', href: '/events' },
    { label: 'Mentors', href: '/mentors' },
    { label: 'Investors', href: '/investors' },
    { label: 'Market Access', href: '/market-access' },
    { label: 'Source', href: '/source' },
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (pathname?.startsWith('/learn')) return null;

  return (
    <header className="site-header">
      {/* Main Header */}
      <motion.div
        className="main-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="container">
          <a href="https://startupsindia.in/" className="header-logo">
            <img
              src="/assets/images/logo.png"
              alt="Startups India Logo"
              className="logo-image"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="logo-fallback">
              <span className="logo-startups">Startups</span>
              <span className="logo-india">India</span>
              <span className="logo-icon">✈️</span>
            </div>
          </a>

          <div className="header-search">
            <input type="text" placeholder="What do you want to learn?" className="search-input" />
            <button className="search-button" aria-label="Search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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
                  <button className="btn-header btn-signup">Sign Up</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
              <motion.div
                key={index}
                className="navbar-item-header"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + index * 0.03, ease: 'easeOut' }}
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`navbar-link ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && openDropdown === item.label && (
                  <motion.div
                    className="header-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <Link
                        key={idx}
                        href={dropdownItem.href}
                        className={`header-dropdown-link ${pathname === dropdownItem.href ? 'active' : ''}`}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <span className="logo-startups">Startups</span>
            <span className="logo-india">India</span>
          </div>
          <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-content">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.hasDropdown && item.dropdownItems ? (
                <div className="mobile-menu-dropdown-wrapper">
                  <div
                    className={`mobile-menu-link ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: openDropdown === item.label ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                  {openDropdown === item.label && (
                    <div className="mobile-dropdown-items">
                      {item.dropdownItems.map((dropdownItem, idx) => (
                        <Link
                          key={idx}
                          href={dropdownItem.href}
                          className={`mobile-dropdown-link ${pathname === dropdownItem.href ? 'active' : ''}`}
                          onClick={closeMobileMenu}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`mobile-menu-link ${pathname === item.href ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              )}
            </div>
          ))}
          <div className="mobile-menu-actions">
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
                  <button className="mobile-btn mobile-btn-primary">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
