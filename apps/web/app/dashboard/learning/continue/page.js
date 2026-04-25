'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/* ──── Icons (Matching DashboardPage.js) ──── */
const Icons = {
  rocket: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  play: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  target: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  clock: props => (
    <svg width={props.size || 20} height={props.size || 20} fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export default function ContinueLearningPage() {
  const [continueData, setContinueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContinueData() {
      try {
        const res = await fetch('/api/v1/learning/continue-learning');
        const json = await res.json();
        if (json.success) setContinueData(json.data);
      } catch (err) {
        console.error('Failed to fetch continue learning data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContinueData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ height: 160, background: '#fafafa', borderRadius: 24, marginBottom: 24 }} className="animate-pulse" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
           <div style={{ height: 300, background: '#fafafa', borderRadius: 20 }} className="animate-pulse" />
           <div style={{ height: 300, background: '#fafafa', borderRadius: 20 }} className="animate-pulse" />
        </div>
      </div>
    );
  }

  const current = continueData?.current;
  const next = continueData?.next;

  return (
    <div style={{ 
      maxWidth: 1600, 
      margin: '0 auto', 
      padding: '2.5rem 3.5rem 5rem',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#111'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glowPulse { 0% { box-shadow:0 0 0 0 rgba(122,31,43,0.5); } 70% { box-shadow:0 0 0 18px rgba(122,31,43,0); } 100% { box-shadow:0 0 0 0 rgba(122,31,43,0); } }
        @keyframes redPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        .dcard { background:#fff; border-radius:20px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 2px 8px rgba(0,0,0,0.03); transition:all .3s cubic-bezier(.4,0,.2,1); }
        .dcard:hover { box-shadow:0 14px 35px -10px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:rgba(197,151,91,0.25); }
        
        .ai-banner { background: linear-gradient(135deg, #7A1F2B 0%, #922538 30%, #5c1520 70%, #3d0e16 100%); border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden; color: #fff; margin-bottom: 24px; }
        .ai-banner::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 28px 28px; }
        
        .premium-btn { background: #C5975B; color: #fff; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(197,151,91,0.3); }
        .premium-btn:hover { background: #d4a76a; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(197,151,91,0.4); }
      `}} />

      {/* ═══════ AI STATUS BANNER ═══════ */}
      <div className="da da1 ai-banner">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981', animation: 'glowPulse 2s infinite' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C5975B', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Founder Velocity Tracking</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Continue Your Incubation</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', fontWeight: 500 }}>Pick up exactly where you left off. Your next breakthrough is just one lesson away.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* CURRENT LESSON CARD */}
        <div className="da da2 dcard" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(122,31,43,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.play size={20} color="#7A1F2B" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Active Milestone</span>
          </div>

          {current ? (
            <>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.3 }}>{current.videoId?.title || 'Untitled Lesson'}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>Founder level: {current.completed ? 'Advanced' : 'Core'}. Continue to increase your Pitch Readiness Score.</p>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#111' }}>
                  <span>{Math.round((current.watchedSeconds / (current.videoId?.durationSeconds || 300)) * 100)}% COMPLETE</span>
                  <span style={{ color: '#C5975B' }}>{Math.floor(current.watchedSeconds / 60)}m WATCHED</span>
                </div>
                <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#7A1F2B', width: `${Math.min(100, (current.watchedSeconds / (current.videoId?.durationSeconds || 300)) * 100)}%`, transition: 'width 1s' }} />
                </div>
              </div>

              <Link href={`/learn/${current.videoId?.courseId}`}>
                <button className="premium-btn" style={{ width: '100%' }}>Resume Now</button>
              </Link>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>No active milestones found in your trajectory.</p>
              <Link href="/dashboard/explore" style={{ color: '#C5975B', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>Initialize Curriculum &rarr;</Link>
            </div>
          )}
        </div>

        {/* UP NEXT CARD */}
        <div className="da da3 dcard" style={{ padding: '2rem', background: '#fafafa', borderStyle: 'dashed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(197,151,91,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.rocket size={20} color="#C5975B" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next Phase</span>
          </div>

          {next ? (
            <>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#888', marginBottom: '12px' }}>{next.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6, marginBottom: '24px' }}>This content is currently locked. Complete your active milestone to unlock the next series of startup insights.</p>
              <button disabled style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: 'transparent', color: '#ccc', fontWeight: 700, cursor: 'not-allowed' }}>Unlocks Automatically</button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Icons.target size={40} color="#eee" />
              <p style={{ color: '#ccc', marginTop: '12px' }}>Curriculum synchronized.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

