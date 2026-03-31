'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from '@/lib/auth';

export default function DashboardSidebar({ user, isPro = false }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { id: 'courses', label: 'My Courses', path: '/dashboard/my-courses', icon: 'courses' },
        {
          id: 'certificates',
          label: 'My Certificates',
          path: '/dashboard/certificates',
          icon: 'certificates',
        },
      ],
    },
    {
      id: 'learn',
      label: 'Learn',
      items: [{ id: 'explore', label: 'Explore all', path: '/dashboard/explore', icon: 'explore' }],
    },
  ];

  const isActive = path => pathname === path;

  const renderIcon = icon => {
    const icons = {
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
    };
    return icons[icon] || null;
  };

  return (
    <aside className="premium-sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="sidebar-logo">
          <img
            src="/assets/images/logo.png"
            alt="Startups India Logo"
            className="sidebar-logo-img"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigation.map(section => (
          <div key={section.id} className="nav-section">
            {section.label && <div className="nav-section-label">{section.label}</div>}
            <div className="nav-items">
              {section.items.map(item => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  prefetch={true}
                >
                  <span className="nav-item-icon">{renderIcon(item.icon)}</span>
                  <span className="nav-item-label">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar-bottom">
        <div className="bottom-actions">
          <Link href="/dashboard/settings" className="bottom-action">
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
            onClick={async e => {
              e.preventDefault();
              e.stopPropagation();
              await signOut();
              window.location.replace('/login');
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

          <Link href="/dashboard/contact" className="bottom-action">
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
    </aside>
  );
}
