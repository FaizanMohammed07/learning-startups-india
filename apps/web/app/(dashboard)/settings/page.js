'use client';
import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardProvider';

export default function SettingsPage() {
  const { user } = useDashboard();

  return (
    <div style={{ padding: '1.5rem 2.5rem', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.04em' }}>Account Settings</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 600, marginTop: '8px' }}>Manage your profile, security, and preferences.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            padding: '14px 24px', borderRadius: '16px', background: '#fff', border: '1px solid #e2e8f0',
            fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', cursor: 'pointer', transition: 'all 0.2s'
          }}>Reset</button>
          <button style={{ 
            padding: '14px 28px', borderRadius: '16px', background: '#eb2327', border: 'none',
            fontSize: '0.95rem', fontWeight: 900, color: '#fff', cursor: 'pointer', boxShadow: '0 6px 20px rgba(235,35,39,0.15)'
          }}>Save all changes</button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        
        {/* Row 1: Profile Information (Large) & Basic Information (Medium) */}
        <div style={{ gridColumn: 'span 8' }}>
          <section className="settings-card" style={{ padding: '1.8rem 2rem', borderRadius: '24px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Profile Information</h3>
            
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
               <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ 
                    width: 90, height: 90, borderRadius: '20px', 
                    background: 'linear-gradient(135deg, #7c0000 0%, #3e0000 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 950, color: '#fff'
                  }}>
                    {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'BS'}
                  </div>
                  <button style={{ 
                    position: 'absolute', bottom: '-4px', right: '-4px', 
                    width: 30, height: 30, borderRadius: '50%', background: '#fff',
                    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer'
                  }}>
                    <Icon name="pencil" size={14} color="#1e293b" />
                  </button>
               </div>
               
               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Full name</label>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                           <Icon name="user" size={16} />
                        </div>
                        <input 
                          type="text" 
                          defaultValue={user?.full_name || 'Beesu Siri'}
                          className="settings-input"
                          style={{ paddingLeft: '44px', height: '46px' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Headline</label>
                      <input 
                        defaultValue="Serial Entrepreneur & Innovation Architect"
                        className="settings-input"
                        style={{ height: '46px' }}
                      />
                    </div>
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Mission Statement</label>
                  <input 
                    defaultValue="Building bold ideas with clarity, momentum, and strong execution."
                    className="settings-input"
                    style={{ height: '46px' }}
                  />
               </div>
               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Bio</label>
                  <textarea 
                    defaultValue="Beesu Siri is focused on turning learning into visible progress through structured thinking, thinking, and disciplined execution."
                    rows={2}
                    className="settings-input"
                    style={{ resize: 'none', padding: '12px 16px', minHeight: 'unset' }}
                  />
                  <div style={{ textAlign: 'right', fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px', fontWeight: 600 }}>146/300</div>
               </div>
            </div>
          </section>
        </div>

        <div style={{ gridColumn: 'span 4' }}>
          <section className="settings-card" style={{ padding: '1.8rem 2rem', borderRadius: '24px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Basic Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                       <Icon name="mapPin" size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="Hyderabad, India"
                      className="settings-input"
                      style={{ paddingLeft: '44px', paddingRight: '44px', height: '46px' }}
                    />
                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                       <Icon name="moreHorizontal" size={16} />
                    </div>
                  </div>
               </div>

               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Timezone</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                       <Icon name="clock" size={16} />
                    </div>
                    <select 
                      className="settings-input"
                      style={{ paddingLeft: '44px', appearance: 'none', background: '#fff', height: '46px' }}
                    >
                      <option>IST (UTC+5:30)</option>
                    </select>
                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>
                       <Icon name="chevronDown" size={16} />
                    </div>
                  </div>
               </div>

               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Phone</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                       <Icon name="phone" size={16} />
                    </div>
                    <input 
                      type="text" 
                      defaultValue="+91 90000 00000"
                      className="settings-input"
                      style={{ paddingLeft: '44px', height: '46px' }}
                    />
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Row 2: Links */}
        <div style={{ gridColumn: 'span 12' }}>
          <section className="settings-card" style={{ padding: '1.8rem 2rem', borderRadius: '24px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem' }}>Links</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Add and manage your public links.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
               { [
                 { type: 'LinkedIn', url: 'https://linkedin.com/in/beesu-siri', icon: 'linkedin' },
                 { type: 'Website', url: 'https://beesusiri.com', icon: 'globe' }
               ].map((link, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ opacity: 0.3, cursor: 'grab', flexShrink: 0 }}>
                       <Icon name="grip" size={18} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: '220px', flexShrink: 0 }}>
                       <div className="settings-input" style={{ 
                         display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', height: '44px'
                       }}>
                          <div style={{ width: 24, height: 24, borderRadius: '6px', background: link.type === 'LinkedIn' ? '#0a66c2' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                             <Icon name={link.icon} size={14} color={link.type === 'LinkedIn' ? '#fff' : '#64748b'} />
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', flex: 1 }}>{link.type}</span>
                          <Icon name="chevronDown" size={14} color="#94a3b8" />
                       </div>
                    </div>
                    <input 
                      type="text" 
                      defaultValue={link.url}
                      className="settings-input"
                      style={{ flex: 1, height: '44px' }}
                    />
                    <button style={{ 
                      width: 44, height: 44, borderRadius: '10px', border: '1px solid #fee2e2', 
                      background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0
                    }}>
                       <Icon name="trash" size={18} color="#ef4444" />
                    </button>
                 </div>
               )) }
               
               <button style={{ 
                 width: 'fit-content', padding: '10px 24px', borderRadius: '12px', 
                 border: '1px solid #e2e8f0', background: 'transparent',
                 fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', 
                 display: 'flex', alignItems: 'center', gap: '8px',
                 marginTop: '0.5rem'
               }}>
                  <Icon name="plus" size={16} /> Add link
               </button>
            </div>
          </section>
        </div>

        {/* Row 3: Personal Signals & Account Security */}
        <div style={{ gridColumn: 'span 6' }}>
          <section className="settings-card" style={{ padding: '1.8rem 2rem', borderRadius: '24px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem' }}>Personal Signals</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '1.5rem' }}>Set words that define your vibe & strengths.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {[
                 { label: 'Focus word', value: 'Momentum', icon: 'target', bg: '#fff1f2', tc: '#e11d48' },
                 { label: 'Energy mode', value: 'Focused', icon: 'zap', bg: '#fff7ed', tc: '#f97316' },
                 { label: 'Ambition mode', value: 'Scale', icon: 'trendUp', bg: '#f1f5f9', tc: '#475569' },
                 { label: 'Collaboration status', value: 'Open to collaborations', icon: 'users', bg: '#ecfdf5', tc: '#059669' }
               ].map((signal, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: 44, height: 44, borderRadius: '12px', background: signal.bg, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                       <Icon name={signal.icon} size={20} color={signal.tc} />
                    </div>
                    <div style={{ flex: 1 }}>
                       <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{signal.label}</label>
                       <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            defaultValue={signal.value}
                            className="settings-input"
                            style={{ padding: '8px 40px 8px 12px', height: '42px' }}
                          />
                          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, cursor: 'pointer' }}>
                             <Icon name="x" size={14} />
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
               
               <button style={{ 
                 marginTop: '0.5rem', width: '100%', padding: '12px', borderRadius: '12px', 
                 border: '1px solid #f97316', background: 'transparent',
                 fontSize: '0.85rem', fontWeight: 800, color: '#f97316', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                 cursor: 'pointer'
               }}>
                  <Icon name="plus" size={16} /> Add your own word
               </button>
            </div>
          </section>
        </div>

        <div style={{ gridColumn: 'span 6' }}>
          <section className="settings-card" style={{ padding: '1.8rem 2rem', borderRadius: '24px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Account Security</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>Email</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                       <Icon name="mail" size={16} />
                    </div>
                    <input 
                      type="email" 
                      defaultValue={user?.email || 'siribeesu07@gmail.com'}
                      disabled
                      className="settings-input"
                      style={{ paddingLeft: '44px', paddingRight: '100px', background: '#f8fafc', color: '#94a3b8', height: '46px' }}
                    />
                    <div style={{ 
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      background: '#ecfdf5', color: '#059669', fontSize: '0.7rem', fontWeight: 900,
                      padding: '4px 10px', borderRadius: '8px'
                    }}>
                       Verified
                    </div>
                  </div>
               </div>

               <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: '10px' }}>Change Password</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                     {[
                       { placeholder: 'Current Password' },
                       { placeholder: 'New Password' },
                       { placeholder: 'Confirm New Password' }
                     ].map((pwd, pidx) => (
                       <div key={pidx} style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
                             <Icon name="lock" size={16} />
                          </div>
                          <input 
                            type="password" 
                            placeholder={pwd.placeholder}
                            className="settings-input"
                            style={{ paddingLeft: '38px', paddingRight: '38px', height: '46px' }}
                          />
                          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, cursor: 'pointer' }}>
                             <Icon name="eye" size={16} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <button style={{ 
                 width: '100%', padding: '14px', borderRadius: '12px', 
                 background: '#eb2327', border: 'none',
                 fontSize: '0.9rem', fontWeight: 900, color: '#fff', 
                 cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(235,35,39,0.15)'
               }}>
                  Save Password
               </button>
            </div>
          </section>
        </div>

      </div>

      <style jsx>{`
        .settings-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .settings-card:hover {
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.08);
        }
        .settings-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 0.9rem;
          font-weight: 650;
          color: #1e293b;
          background: #fff;
          outline: none;
          transition: all 0.2s ease;
        }
        .settings-input:focus {
          border-color: #eb2327;
          box-shadow: 0 0 0 4px rgba(235, 35, 39, 0.08);
        }
        .settings-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
