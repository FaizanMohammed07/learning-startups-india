'use client';
import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardProvider';

const SIDEBAR_ITEMS = [
  { label: 'Account', icon: 'user' },
  { label: 'Security', icon: 'shield' },
  { label: 'Notifications', icon: 'bell' },
  { label: 'Privacy', icon: 'lock' }
];

export default function SettingsPage() {
  const { user } = useDashboard();
  const [activeSidebar, setActiveSidebar] = useState('Account');

  return (
    <div className="platform-page" style={{ padding: '0 2rem 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '4rem' }}>
        
        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ padding: '0 1rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.7rem', fontWeight: 950, color: 'var(--brand-red)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Settings Hub</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 600, marginTop: '4px' }}>Platform Preferences</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {SIDEBAR_ITEMS.map(item => (
                <div 
                  key={item.label}
                  onClick={() => setActiveSidebar(item.label)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px', borderRadius: '14px',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    background: activeSidebar === item.label ? 'var(--brand-red)' : 'transparent',
                    color: activeSidebar === item.label ? '#fff' : 'var(--slate-500)',
                    fontWeight: activeSidebar === item.label ? 900 : 750,
                    boxShadow: activeSidebar === item.label ? '0 8px 16px rgba(235,35,39,0.1)' : 'none',
                  }}
                >
                  <Icon name={item.icon} size={18} color={activeSidebar === item.label ? '#fff' : 'currentColor'} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', background: 'var(--brand-black)', color: '#fff' }}>
             <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.4, opacity: 0.8 }}>Need help with your account settings?</p>
             <button className="btn-brand" style={{ width: '100%', padding: '10px', fontSize: '0.7rem' }}>GET HELP</button>
          </div>
        </aside>

        {/* Content Area */}
        <main>
          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--brand-black)', margin: 0, letterSpacing: '-0.03em' }}>
              {activeSidebar} <span style={{ color: 'var(--brand-red)' }}>.</span>
            </h1>
          </header>

          <AnimatePresence mode="wait">
            <motion.div 
               key={activeSidebar}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
            >
              {activeSidebar === 'Account' && <AccountSettingsView user={user} />}
              {activeSidebar === 'Notifications' && <NotificationsView />}
              {activeSidebar === 'Privacy' && <PrivacyView />}
              {activeSidebar === 'Security' && <SecurityView user={user} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function AccountSettingsView({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Profile Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', fontWeight: 950 }}>
                {user?.full_name?.[0] || 'B'}
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                <Icon name="pencil" size={12} color="#fff" />
              </div>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 950 }}>{user?.full_name || 'Beesu Siri'}</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700 }}>{user?.email || 'beesu@startup-india.gov'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <InputGroup label="Display Name" value={user?.full_name || 'Beesu Siri'} />
             <InputGroup label="Headline" value="Serial Entrepreneur & Innovation Architect" />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
           <h4 style={{ fontSize: '0.8rem', fontWeight: 950, marginBottom: '1.5rem', color: 'var(--slate-400)' }}>BASIC INFORMATION</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <InputGroup label="Location" value="Hyderabad, India" />
              <InputGroup label="Timezone" value="(GMT+05:30) India Standard Time" />
              <InputGroup label="Phone" value="+91 98765 43210" />
           </div>
        </div>
      </div>

      {/* Personal Signals Grid */}
      <div>
        <h4 style={{ fontSize: '0.8rem', fontWeight: 950, marginBottom: '1.5rem', color: 'var(--slate-400)', letterSpacing: '0.05em' }}>PERSONAL SIGNALS</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[
            { label: 'Current Focus', value: 'Productivity', icon: 'zap' },
            { label: 'Energy Mode', value: 'High Performance', icon: 'barChart' },
            { label: 'Ambition Scale', value: 'Scaling Up', icon: 'trendUp' },
            { label: 'Collaboration', value: 'Open for Ventures', icon: 'users' }
          ].map(sig => (
            <div key={sig.label} className="glass-card hover-lift" style={{ padding: '1.5rem', borderRadius: '20px', background: '#fff' }}>
              <Icon name={sig.icon} size={16} color="var(--brand-red)" />
              <div style={{ fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', marginTop: '12px', textTransform: 'uppercase' }}>{sig.label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-black)', marginTop: '4px' }}>{sig.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Links & Social */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 950, marginBottom: '1.5rem', color: 'var(--slate-400)' }}>LINKS & WEB</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
             <InputGroup label="LinkedIn URL" value="linkedin.com/in/beesusiri" icon="link" />
             <InputGroup label="Personal Website" value="beesu.startup.io" icon="globe" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '1rem' }}>
           <button className="btn-brand" style={{ background: 'var(--slate-100)', color: 'var(--brand-black)', padding: '14px 30px' }}>CANCEL</button>
           <button className="btn-brand" style={{ padding: '14px 40px' }}>SAVE PROFILE</button>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <NotificationSection title="Email Notifications" toggles={[
          { label: 'New course announcements', desc: 'Get notified when new relevant courses land.', active: true },
          { label: 'Weekly learning reports', desc: 'A summary of your focused development hours.', active: true },
          { label: 'Direct mentor messages', desc: 'Important replies from your industry experts.', active: true }
        ]} />
        <NotificationSection title="In-App Activity" toggles={[
          { label: 'Achievement badges', desc: 'When you unlock new skill levels or streaks.', active: true },
          { label: 'Community replies', desc: 'Comments on your discussions or doubts.', active: false },
          { label: 'Smart Reminders', desc: 'AI-driven prompts based on your learning habits.', active: true }
        ]} />
      </div>
    </div>
  );
}

function PrivacyView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 950, marginBottom: '2rem' }}>Profile Visibility</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <PrivacyRadio label="Public" desc="Anyone on the web can see your profile and certificates." active={false} />
           <PrivacyRadio label="Platform Users Only" desc="Only logged-in startups can view your progress." active={true} />
           <PrivacyRadio label="Private" desc="Hide your profile from everyone except yourself." active={false} />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 950, marginBottom: '2rem' }}>What Others Can See</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <ToggleRow label="Show Enrolled Courses" desc="Allow users to see what skills you are building." active={true} />
           <ToggleRow label="Show Mastery Badges" desc="Display your verified expertise on your profile." active={true} />
           <ToggleRow label="Show Streak Status" desc="Reveal your daily consistency metrics." active={false} />
        </div>
      </div>
    </div>
  );
}

function SecurityView({ user }) {
  return (
    <div className="glass-card" style={{ padding: '3rem', borderRadius: '32px' }}>
      <div style={{ maxWidth: '450px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 950, marginBottom: '2rem' }}>Account Credentials</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <InputGroup label="Login Email" value={user?.email || 'beesu@startup-india.gov'} disabled />
           <InputGroup label="Current Password" type="password" value="********" />
           <InputGroup label="New Password" type="password" placeholder="Enter new password" />
           <button className="btn-brand" style={{ background: 'var(--brand-black)', marginTop: '1rem' }}>UPDATE SECURITY</button>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function InputGroup({ label, value, type = 'text', icon, placeholder, disabled }) {
  return (
    <div style={{ width: '100%' }}>
      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 950, color: 'var(--slate-400)', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}><Icon name={icon} size={14} /></div>}
        <input 
          type={type} 
          defaultValue={value} 
          placeholder={placeholder}
          disabled={disabled}
          style={{ 
            width: '100%', padding: `14px 20px \${icon ? '14px 45px' : ''}`, borderRadius: '14px', border: '1px solid #f1f5f9',
            background: disabled ? '#f8fafc' : '#fff', fontWeight: 850, fontSize: '0.9rem', color: 'var(--brand-black)', outline: 'none'
          }} 
        />
      </div>
    </div>
  );
}

function NotificationSection({ title, toggles }) {
  return (
    <div>
      <h4 style={{ fontSize: '0.9rem', fontWeight: 950, color: 'var(--brand-red)', marginBottom: '1.5rem' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {toggles.map(t => <ToggleRow key={t.label} {...t} />)}
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, active }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: '0.95rem', fontWeight: 850, color: 'var(--brand-black)' }}>{label}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 600, marginTop: '2px' }}>{desc}</div>
      </div>
      <div 
        onClick={() => setIsOn(!isOn)}
        style={{ 
          width: '44px', height: '24px', borderRadius: '12px', background: isOn ? 'var(--brand-red)' : '#e2e8f0',
          position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease'
        }}
      >
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: isOn ? '23px' : '3px', transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)' }} />
      </div>
    </div>
  );
}

function PrivacyRadio({ label, desc, active }) {
  return (
    <div style={{ 
      display: 'flex', gap: '1.5rem', padding: '1.5rem', borderRadius: '20px', border: active ? '2px solid var(--brand-red)' : '1px solid #f1f5f9',
      background: active ? 'rgba(235,35,39,0.02)' : 'transparent', cursor: 'pointer'
    }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid \${active ? 'var(--brand-red)' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand-red)' }} />}
      </div>
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 950, color: 'var(--brand-black)' }}>{label}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: 700, marginTop: '2px' }}>{desc}</div>
      </div>
    </div>
  );
}

