'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardProvider';
import '@/styles/dashboard-professional.css';

import Icon from '@/components/Icon';

const STREAK_DAYS_OF_WEEK = [1, 2, 4, 6]; // Mon, Tue, Thu, Sat (mock data)

export default function DashboardPage() {
  const { user, isLoading } = useDashboard();
  const userName = user?.full_name || 'Jaswanth Reddy';
  const [viewDate, setViewDate] = useState(new Date());


  const today = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
  }, []);

  const calendarDays = useMemo(() => {
    const days = [];
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const lastDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
    
    // Day of week of the first day (0-6)
    const startingDay = firstDayOfMonth.getDay();
    
    // Add padding days from previous month
    const prevMonthLastDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ 
        dayNum: prevMonthLastDay - i, 
        isCurrentMonth: false, 
        isToday: false, 
        hasStreak: false,
        dayName: '' 
      });
    }

    // Add current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
      const isToday = d.toDateString() === today.toDateString();
      days.push({
        dayNum: i,
        isCurrentMonth: true,
        isToday,
        hasStreak: STREAK_DAYS_OF_WEEK.includes(d.getDay()),
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    // Add padding days for next month to complete the 6-row grid if needed
    const totalSlots = 42; // 6 rows * 7 days
    const nextMonthDays = totalSlots - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ 
        dayNum: i, 
        isCurrentMonth: false, 
        isToday: false, 
        hasStreak: false,
        dayName: '' 
      });
    }
    
    return days;
  }, [viewDate, today]);

  const monthYearLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const weeklyData = [
    { day: 'Mon', h: 2.5 }, { day: 'Tue', h: 4.0 }, { day: 'Wed', h: 1.5 },
    { day: 'Thu', h: 3.2 }, { day: 'Fri', h: 5.0 }, { day: 'Sat', h: 2.0 }, { day: 'Sun', h: 1.0 },
  ];

  const courseProgress = [
    { name: 'Seed Stage Preparation', val: 62, color: 'rgb(235, 35, 39)' },
    { name: 'Pitch Deck Workshop',    val: 38, color: '#3b82f6' },
    { name: 'Market Research 101',   val: 45, color: '#10b981' },
    { name: 'Startup Legalities',    val: 12, color: '#f59e0b' },
  ];

  if (isLoading) return <div className="prof-dashboard-container" style={{ opacity: 0.4 }} />;

  return (
    <div className="prof-dashboard-container">
      
      {/* ════════════════════════════════
          TOP ROW: Greeting + Branding
      ════════════════════════════════ */}
      <div className="dashboard-top-full">
        <header className="prof-dashboard-header" style={{ marginTop: 0 }}>
          <h1 style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>Good Morning, {userName}</h1>
          <p style={{ marginBottom: '1.5rem' }}>Strategic overview of your startup journey.</p>

          {/* ── INTEGRATED FULL-WIDTH NEWS RIBBON (AFTER SUBTITLE) ── */}
          <div className="live-ticker-card ticker--wide ticker-container">
            <div className="ticker-label-box" style={{ background: 'var(--brand-black)', flexShrink: 0, borderRadius: 0 }}>
              <Icon name="zap" size={10} color="var(--brand-red)" />
              <span style={{ fontSize: '0.55rem', fontWeight: 950 }}>LIVE NEWS</span>
            </div>
            <div className="ticker-track" style={{ flex: 1 }}>
              <div className="ticker-inner">
                <span className="ticker-item" style={{ fontSize: '0.65rem', fontWeight: 700 }}>DPIIT recognizes 1.41 Lakh+ startups across India</span>
                <span className="ticker-sep" style={{ color: 'var(--brand-red)', fontSize: '1rem' }}>•</span>
                <span className="ticker-item" style={{ fontSize: '0.65rem', fontWeight: 700 }}>Startup India Seed Fund: Rs 945 Cr disbursed to incubators</span>
                <span className="ticker-sep" style={{ color: 'var(--brand-red)', fontSize: '1rem' }}>•</span>
                <span className="ticker-item" style={{ fontSize: '0.65rem', fontWeight: 700 }}>GenAI &amp; DeepTech attract $2.1B in funding in 2025</span>
                <span className="ticker-sep" style={{ color: 'var(--brand-red)', fontSize: '1rem' }}>•</span>
                <span className="ticker-item" style={{ fontSize: '0.65rem', fontWeight: 700 }}>DPIIT recognizes 1.41 Lakh+ startups across India</span>
                <span className="ticker-sep" style={{ color: 'var(--brand-red)', fontSize: '1rem' }}>•</span>
              </div>
            </div>
          </div>
        </header>
      </div>


      {/* ════════════════════════════════
          MAIN GRID
      ════════════════════════════════ */}
      <main className="prof-dashboard-grid-master">

        {/* ── LEFT COLUMN ── */}
        <div className="prof-left-stack">

          {/* Stats Row */}
          <section className="prof-stats-grid">
            <Link href="/my-learning" className="stat-card-premium stat-card-lavender interactive-lift glass-card" style={{ border: 'none' }}>
              <div className="stat-header-p"><span className="stat-title-caps">Courses Enrolled</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="stat-icon-box"><Icon name="book" size={22} color="#1e293b" /></div>
                <span className="stat-val-huge">04</span>
              </div>
              <span className="stat-subtext-p">3 Active • 1 Milestone</span>
            </Link>
            <Link href="/completed-courses" className="stat-card-premium stat-card-slate interactive-lift glass-card" style={{ background: 'rgba(255,255,255,0.4)', color: '#1e293b', border: 'none' }}>
              <div className="stat-header-p"><span className="stat-title-caps" style={{ color: '#64748b' }}>Certificates</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="stat-icon-box" style={{ background: 'rgba(233, 34, 34, 0.1)' }}><Icon name="certificate" size={22} color="var(--brand-red)" /></div>
                <span className="stat-val-huge">100%</span>
              </div>
              <span className="stat-subtext-p" style={{ color: '#64748b' }}>ISO Verified & Shared</span>
            </Link>
            <Link href="/analytics/time" className="stat-card-premium stat-card-mint interactive-lift glass-card" style={{ border: 'none' }}>
              <div className="stat-header-p"><span className="stat-title-caps">Learning Hours</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="stat-icon-box"><Icon name="clock" size={22} color="#1e293b" /></div>
                <span className="stat-val-huge">15 hrs</span>
              </div>
              <span className="stat-subtext-p">Top 5% this month</span>
            </Link>
          </section>


          {/* Continue Learning Hero */}
          <section className="continue-learning-hero">
            <div className="hero-img-box">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Course thumbnail" />
              <div className="hero-play-overlay">
                <div className="play-icon-circle"><Icon name="play" size={28} color="#fff" /></div>
              </div>
            </div>
            <div className="hero-content">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#64748b' }}>Continue Learning</span>
                  <Link href="/my-learning" style={{ color: 'rgb(235, 35, 39)', fontSize: '0.78rem', fontWeight: 900, textDecoration: 'none' }}>View all →</Link>
                </div>
                <div style={{ display: 'inline-block', background: 'rgba(235,35,39,0.1)', color: 'rgb(235,35,39)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                  Next Session
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, margin: '0 0 8px 0' }}>
                  Seed Stage Preparation
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 1.25rem 0' }}>
                  Module 4: Financial Modeling &amp; Unit Economics
                </p>
              </div>
              <div className="hero-progress-row">
                <div className="course-prog-bar-base" style={{ height: '10px' }}>
                  <div className="course-prog-bar-fill" style={{ width: '62%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8' }}>62% complete</span>
                  <Link href="/my-learning">
                    <button style={{ background: 'rgb(235,35,39)', color: '#fff', padding: '11px 26px', borderRadius: '14px', fontSize: '0.88rem', fontWeight: 900, border: 'none', cursor: 'pointer' }}>
                      Resume Session
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Progress */}
          <section className="full-width-progress" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, marginBottom: '2rem', color: '#0f172a' }}>Learning Progress</h2>
            <div className="progress-grid-split">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="section-label-caps">Weekly Learning</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgb(235,35,39)' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b' }}>Actual Hours</span>
                  </div>
                </div>
                <div className="weekly-chart-area" style={{ height: '240px', paddingLeft: '2.5rem' }}>
                  <div className="chart-y-axis" style={{ top: 0, bottom: '24px', left: 0 }}>
                    {[8, 6, 4, 2, 0].map(v => <span key={v} className="axis-val">{v}</span>)}
                  </div>
                  <div className="chart-grid-lines" style={{ left: '2.5rem', top: 0, bottom: '24px', right: 0 }}>
                    {[0, 1, 2, 3, 4].map(i => <div key={i} className="grid-line" />)}
                  </div>
                  <div className="chart-bars-container" style={{ left: '2.5rem', top: 0, bottom: '24px', right: 0 }}>
                    {weeklyData.map((d, i) => (
                      <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }} className="chart-bar-group">
                        <div className="chart-tooltip" style={{ 
                          position: 'absolute', top: '-35px', background: 'var(--brand-black)', color: '#fff', 
                          padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 950,
                          opacity: 0, transition: 'all 0.2s ease', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 10
                         }}>
                          {d.h} hours
                        </div>
                        <div className="chart-bar-item" style={{
                          height: `${(d.h / 8) * 100}%`,
                          background: d.h > 3 ? 'rgb(235,35,39)' : 'rgba(235,35,39,0.25)',
                          width: '36px',
                          marginTop: 'auto',
                          borderRadius: '8px 8px 0 0',
                          cursor: 'pointer'
                        }} 
                        onMouseEnter={e => {
                          const tooltip = e.currentTarget.parentElement.querySelector('.chart-tooltip');
                          if (tooltip) tooltip.style.opacity = '1';
                          e.currentTarget.style.filter = 'brightness(1.1)';
                        }}
                        onMouseLeave={e => {
                          const tooltip = e.currentTarget.parentElement.querySelector('.chart-tooltip');
                          if (tooltip) tooltip.style.opacity = '0';
                          e.currentTarget.style.filter = '';
                        }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chart-x-axis" style={{ left: '2.5rem', right: 0, bottom: 0 }}>
                    {weeklyData.map((d, i) => <span key={i} className="x-label">{d.day}</span>)}
                  </div>
                </div>
              </div>
              <div>
                <span className="section-label-caps" style={{ display: 'block', marginBottom: '1.5rem' }}>Course Progress</span>
                <div className="course-progress-list" style={{ gap: '1.5rem' }}>
                  {courseProgress.map((cp, i) => (
                    <div key={i} className="course-progress-item" style={{ gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b' }}>{cp.name}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'rgb(235,35,39)' }}>{cp.val}%</span>
                      </div>
                      <div className="course-prog-bar-base" style={{ height: '12px' }}>
                        <div className="course-prog-bar-fill" style={{ width: `${cp.val}%`, background: `rgba(235,35,39,${0.5 + cp.val / 200})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FULL-WIDTH RECOMMENDATIONS ── */}
          <section className="prof-card" style={{ padding: '2.5rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Recommended Courses</h2>
              <div className="curated-badge">Curated for You</div>
            </div>
            <div className="reco-scroll-pane">
              {[
                { t: 'Series A Scaling',    d: 'Advanced funding strategies & scaling for global markets.',   img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600', tag: 'Advanced',     dur: '6h 30m' },
                { t: 'Product-Market Fit',  d: 'Align your product with real market needs using lean methodology.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600', tag: 'Intermediate',  dur: '4h 15m' },
                { t: 'Exit Strategies',     d: 'Acquisitions, IPOs, and secondary sales for long-term growth.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600', tag: 'Expert',       dur: '5h 45m' },
                { t: 'Legal Structuring',   d: 'Master the legal and compliance side of scaling your venture.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600', tag: 'Advanced',     dur: '3h 20m' },
                { t: 'Growth Hacking',      d: 'Data-driven frameworks for explosive and sustainable growth.',  img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600', tag: 'Intermediate',  dur: '5h 00m' },
              ].map((r, i) => (
                <div key={i} className="reco-card-compact">
                  <div className="reco-img-box" style={{ height: '170px' }}>
                    <img src={r.img} alt={r.t} />
                    <div className="reco-tag">{r.tag}</div>
                  </div>
                  <div className="reco-info">
                    <h4>{r.t}</h4>
                    <p>{r.d}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>⏱ {r.dur}</span>
                      <button className="reco-btn-minimal">
                        Explore <Icon name="chevronRight" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ANALYTICS OVERVIEW ROW ── */}
          <div className="analytics-overview-grid">
            {[
              { label: 'Leaderboard Rank', val: '#12', sub: 'Top 5% this month', icon: <Icon name="star" size={22} color="#f59e0b" />, bg: '#fffbeb', bc: '#fef3c7' },
              { label: 'Community Posts', val: '28', sub: '+4 this week', icon: <Icon name="messageCircle" size={22} color="var(--brand-red)" />, bg: '#fff1f2', bc: '#fecaca' },
              { label: 'Assessments Done', val: '7/10', sub: '3 remaining', icon: <Icon name="shield" size={22} color="#10b981" />, bg: '#f0fdf4', bc: '#d1fae5' },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, border: `1px solid ${s.bc}`, borderRadius: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.08em' }}>{s.label}</span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>{s.icon}</div>
                </div>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>{s.val}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{s.sub}</span>
              </div>
            ))}
          </div>

          {/* ── QUICK LINKS OVERVIEW ── */}
          <section className="prof-card quick-access-section">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Quick Access</h2>
            <div className="quick-access-grid">
              {[
                { label: 'My Courses',    icon: <Icon name="book" size={22} color="rgb(235,35,39)" />,    bg: '#fff1f2', href: '/my-learning' },
                { label: 'Analytics',     icon: <Icon name="barChart" size={22} color="var(--brand-red)" />,        bg: '#eff6ff', href: '/analytics/performance' },
                { label: 'Community',     icon: <Icon name="users" size={22} color="#7c3aed" />,           bg: '#f5f3ff', href: '/community/groups' },
                { label: 'Assessments',   icon: <Icon name="shield" size={22} color="#10b981" />,          bg: '#f0fdf4', href: '/assignments' },
                { label: 'Job Board',     icon: <Icon name="briefcase" size={22} color="#f59e0b" />,       bg: '#fffbeb', href: '/courses' },
                { label: 'Payments',      icon: <Icon name="trendUp" size={22} color="#06b6d4" />,        bg: '#ecfeff', href: '/payments/purchases' },
                { label: 'Global Network',icon: <Icon name="globe" size={22} color="#8b5cf6" />,           bg: '#f5f3ff', href: '/community/doubts' },
                { label: 'Leaderboard',   icon: <Icon name="star" size={22} color="#f59e0b" />,            bg: '#fffbeb', href: '/leaderboard' },
              ].map((l, i) => (
                <Link key={i} href={l.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: l.bg, borderRadius: 16, padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease', border: '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                    {l.icon}
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#1e293b', textAlign: 'center' }}>{l.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="prof-right-stack">

          {/* ── Active Hub (Calendar) ── */}
          <section className="prof-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            {/* Streak Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Icon name="target" size={28} color="var(--brand-red)" />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 950, color: 'var(--brand-red)', lineHeight: 1.2 }}>03 Days Streak</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', marginTop: '2px' }}>Best: 12 days</div>
              </div>
            </div>

            {/* Month Navigation Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b' }}>{monthYearLabel}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={prevMonth} className="cal-nav-btn-precise"><Icon name="chevronLeft" size={12} color="var(--brand-red)" /></button>
                <button onClick={nextMonth} className="cal-nav-btn-precise"><Icon name="chevronRight" size={12} color="var(--brand-red)" /></button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '6px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} style={{ fontSize: '0.6rem', fontWeight: 900, color: '#94a3b8', textAlign: 'center' }}>{d}</span>
              ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {calendarDays.map((day, idx) => (
                <div key={idx} style={{ 
                  aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900,
                  background: day.isToday ? 'var(--brand-red)' : day.hasStreak ? 'rgba(235, 35, 39, 0.08)' : 'transparent',
                  color: day.isToday ? '#fff' : day.hasStreak ? 'var(--brand-red)' : !day.isCurrentMonth ? '#d1d5db' : '#1e293b',
                  border: day.isToday ? 'none' : day.hasStreak ? '1px solid rgba(235, 35, 39, 0.15)' : 'none',
                  cursor: day.isCurrentMonth ? 'pointer' : 'default'
                }}>
                  {day.dayNum}
                </div>
              ))}
            </div>
          </section>

          {/* Today's Missions */}
          <section className="prof-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.25rem' }}>
              Today's Missions
            </h2>
            <div className="mission-stack">
              {[
                { t: 'Investor Deck Review', m: '04:30 PM • Lab',        c: '#eff6ff', i: <Icon name="play" size={17} color="var(--brand-red)" /> },
                { t: 'Compliance Matrix',    m: '11:00 PM • Portal',     c: '#fff1f2', i: <Icon name="clock" size={17} color="#f43f5e" /> },
                { t: 'Unit Economics 101',   m: 'Finished • AI Summary', c: '#f0fdf4', i: <Icon name="check" size={17} color="#22c55e" /> },
              ].map((m, i) => (
                <div key={i} className="mission-item-hub">
                  <div className="mission-icon-box" style={{ background: m.c }}>{m.i}</div>
                  <div className="mission-details">
                    <h4>{m.t}</h4>
                    <p>{m.m}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ACHIEVEMENTS ── */}
          <section className="prof-card glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="trophy" size={20} color="var(--brand-red)" /> Achievements
            </h2>
            <div className="achievement-highlight-box glass-card" style={{ background: 'rgba(233, 34, 34, 0.05)', border: '1px solid rgba(233, 34, 34, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
              <div className="highlight-icon" style={{ background: '#fff', width: 44, height: 44, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="award" size={22} color="var(--brand-red)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="small-label-caps" style={{ display: 'block', marginBottom: '2px' }}>Latest Milestone</span>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 900, color: '#1e293b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Entrepreneurial Fundamentals
                </h4>
              </div>
              <Link href="/completed-courses">
                <button className="btn-brand" style={{ fontSize: '0.65rem', padding: '8px 16px', background: 'var(--brand-black)', color: '#fff', borderRadius: '10px' }}>VIEW</button>
              </Link>
            </div>
            <span className="small-label-caps" style={{ display: 'block', margin: '1.5rem 0 1rem' }}>Earned Badges</span>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
              {[
                { n: 'Problem Solver', i: <Icon name="target" size={20} color="var(--brand-red)" />, bg: 'rgba(235,35,39,0.05)' },
                { n: 'Innovator',       i: <Icon name="zap" size={20} color="#7c3aed" />,          bg: 'rgba(124,58,237,0.05)' },
                { n: 'Fast Learner',   i: <Icon name="rocket" size={20} color="var(--brand-red)" />,   bg: 'rgba(235,35,39,0.05)' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.02)' }}>
                    {b.i}
                  </div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#1e293b', textAlign: 'center', lineHeight: 1.1 }}>{b.n}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Community Pulse ── */}
          <section className="prof-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '0f172a', margin: 0 }}>Community Pulse</h2>
              <Link href="/community/discussions" style={{ fontSize: '0.72rem', fontWeight: 900, color: 'rgb(235,35,39)', textDecoration: 'none' }}>See all →</Link>
            </div>
            {[
              { user: 'Priya M.', msg: 'Just closed our seed round!', time: '2m ago', avatar: <Icon name="award" size={14} />, bg: '#fff1f2', fc: 'rgb(235,35,39)' },
              { user: 'Arjun K.', msg: 'Posted notes on Unit Economics.', time: '15m ago', avatar: <Icon name="pencil" size={14} />, bg: '#eff6ff', fc: '#3b82f6' },
              { user: 'Sneha R.', msg: 'Anyone attending Startup Conclave?', time: '1h ago', avatar: <Icon name="users" size={14} />, bg: '#f0fdf4', fc: '#10b981' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 2 ? '1.25rem' : 0, paddingBottom: i < 2 ? '1.25rem' : 0, borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '12px', background: p.bg, border: `1px solid ${p.fc}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.fc, flexShrink: 0 }}>{p.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1e293b' }}>{p.user}</span>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>{p.time}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: 700 }}>{p.msg}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── Leaderboard Snapshot ── */}
          <section className="prof-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Leaderboard</h2>
              <Link href="/leaderboard" style={{ fontSize: '0.72rem', fontWeight: 900, color: 'rgb(235,35,39)', textDecoration: 'none' }}>Full Board →</Link>
            </div>
            {[
              { rank: 1,  name: 'Rahul Singh',    pts: 2840, isMe: false },
              { rank: 8,  name: 'Meera Patel',    pts: 2210, isMe: false },
              { rank: 12, name: userName.split(' ')[0] + ' R.', pts: 1975, isMe: true },
              { rank: 15, name: 'Dev Sharma',     pts: 1820, isMe: false },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 3 ? '0.75rem' : 0, background: r.isMe ? 'rgba(235,35,39,0.04)' : 'transparent', borderRadius: 12, padding: '8px 10px', border: r.isMe ? '1px solid rgba(235,35,39,0.12)' : '1px solid transparent' }}>
                <span style={{ width: 22, textAlign: 'center', fontSize: '0.75rem', fontWeight: 900, color: r.rank <= 3 ? '#f59e0b' : '#94a3b8' }}>#{r.rank}</span>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.isMe ? 'var(--brand-red)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 900, color: r.isMe ? '#fff' : '#64748b' }}>
                  {r.name[0]}
                </div>
                <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: r.isMe ? 900 : 700, color: r.isMe ? 'rgb(235,35,39)' : '#1e293b' }}>{r.name}{r.isMe ? ' (You)' : ''}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b' }}>{r.pts.toLocaleString()} pts</span>
              </div>
            ))}
          </section>

          {/* ── Upcoming Events ── */}
          <section className="prof-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Upcoming Events</h2>
              <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'rgb(235,35,39)' }}>View Calendar →</span>
            </div>
            {[
              { title: 'Startup Conclave 2025', date: 'Apr 12', type: 'Conference', bg: '#fff1f2', fc: 'rgb(235,35,39)' },
              { title: 'Pitch Perfect Bootcamp', date: 'Apr 18', type: 'Workshop',  bg: '#fffbeb', fc: '#f59e0b' },
              { title: 'Investor Connect Day',   date: 'Apr 25', type: 'Networking', bg: '#f0fdf4', fc: '#10b981' },
            ].map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < 2 ? '0.75rem' : 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: ev.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${ev.fc}20` }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: 900, color: ev.fc, textTransform: 'uppercase' }}>{ev.date.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: ev.fc, lineHeight: 1 }}>{ev.date.split(' ')[1]}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 900, color: '#1e293b', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</p>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8' }}>{ev.type}</span>
                </div>
              </div>
            ))}
          </section>

        </div>
      </main>



    </div>
  );
}
