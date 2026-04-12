'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { signOut } from '@/lib/auth';
import Icon from '@/components/Icon';
import '@/styles/sidebar-accordion.css';

import { navigationData } from '@/lib/navigation-data';


export default function DashboardSidebar({ user, isPro = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['core']);

  const isActive = useCallback(path => {
    if (path === '/dashboard') return pathname === '/dashboard';
    if (path === '/') return pathname === '/';
    // Strict match for base /settings so we don't highlight it when on /settings/notifications
    if (path === '/settings') return pathname === '/settings';
    return pathname === path || pathname.startsWith(path + '/');
  }, [pathname]);

  // Auto-expand section based on current path
  useEffect(() => {
    navigationData.forEach(section => {
      const isChildActive = section.items.some(item => isActive(item.path));
      if (isChildActive && !expandedSections.includes(section.id)) {
        setExpandedSections(prev => [...prev, section.id]);
      }
    });
  }, [expandedSections, isActive]);

  const toggleSection = id => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const renderIcon = icon => (
    <div className="icon-frame">
      <Icon name={icon} size={20} color="currentColor" stroke={1.8} />
    </div>
  );

  return (
    <aside className="premium-sidebar light-theme">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="sidebar-logo">
          <img
            src="/assets/images/logo.png"
            alt="Startups India"
            className="sidebar-logo-img"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigationData.map(section => (
          <div key={section.id} className="nav-section-container">
            <button
              className={`nav-section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.label}</span>
              <svg 
                className={`toggle-chevron ${expandedSections.includes(section.id) ? 'expanded' : ''}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            
            <div 
              className="nav-items-wrapper"
              style={{
                maxHeight: expandedSections.includes(section.id) ? `${section.items.length * 60}px` : '0px'
              }}
            >
              {section.items.map(item => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`nav-item-row ${active ? 'active' : ''}`}
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

      {/* Logout buttons removed as requested by previous UI cleanup */}
      {showLogoutModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 16, padding: '36px 32px 28px',
              width: 380, maxWidth: '90vw', textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(235, 35, 39, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eb2327" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: '#111' }}>Sign Out?</h3>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7280' }}>Are you sure you want to sign out?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff' }}
              >
                Cancel
              </button>
              <button 
                onClick={async () => { await signOut(); window.location.replace('/login'); }}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#eb2327', color: '#fff' }}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
