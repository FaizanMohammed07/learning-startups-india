'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { signOut } from '@/lib/auth';
import Icon from '@/components/Icon';
import '@/styles/sidebar-accordion.css';

import { navigationData } from '@/lib/navigation-data';

export default function DashboardSidebar({ user, isPro = false, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState('core');

  const isActive = useCallback(path => {
    if (path === '/dashboard') return pathname === '/dashboard';
    if (path === '/') return pathname === '/';
    if (path === '/settings') return pathname === '/settings';
    return pathname === path || pathname.startsWith(path + '/');
  }, [pathname]);

  useEffect(() => {
    const activeSection = navigationData.find(section => 
      section.items.some(item => isActive(item.path))
    );
    if (activeSection) {
      setExpandedSection(activeSection.id);
    }
  }, [pathname, isActive]);

  const toggleSection = id => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderIcon = icon => (
    <div className="icon-frame">
      <Icon name={icon} size={20} color="currentColor" stroke={1.8} />
    </div>
  );

  return (
    <aside className={`premium-sidebar light-theme ${onClose ? 'mobile-drawer' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="sidebar-logo" onClick={() => onClose && onClose()}>
          <img
            src="/assets/images/logo.png"
            alt="Startups India"
            className="sidebar-logo-img"
          />
        </Link>
        
        {onClose && (
          <button className="sidebar-close-btn" onClick={onClose}>
            <Icon name="x" size={24} color="#1e293b" />
          </button>
        )}
      </div>

      {/* Navigation - scrollable middle section */}
      <nav className="sidebar-nav sidebar-nav-scrollable custom-scrollbar">
        {navigationData.map(section => (
          <div key={section.id} className="nav-section-container">
            <button
              className={`nav-section-header ${expandedSection === section.id ? 'expanded' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.label}</span>
              <svg 
                className={`toggle-chevron ${expandedSection === section.id ? 'expanded' : ''}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div 
              className="nav-items-wrapper"
              style={{
                maxHeight: expandedSection === section.id ? `${section.items.length * 60}px` : '0px'
              }}
            >
              {section.items.map(item => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`nav-item-row ${active ? 'active' : ''}`}
                    onClick={() => onClose && onClose()}
                  >
                    <div className="nav-item-left">
                      <div className="icon-frame">
                        {renderIcon(item.icon)}
                      </div>
                      <span className="nav-item-label">{item.label}</span>
                    </div>
                    {item.badge && <span className="badge-pill">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Sidebar Footer */}
      <div className="sidebar-bottom">
        <div className="nav-section-container">
          <button className="nav-item-row logout-nav-item" onClick={handleLogout} style={{ cursor: 'pointer', background: 'transparent', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <div className="nav-item-left">
              <div className="icon-frame">
                <Icon name="logOut" size={20} color="currentColor" />
              </div>
              <span className="nav-item-label">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
