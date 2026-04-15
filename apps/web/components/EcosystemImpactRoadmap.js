'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Users, Building2, BarChart3, Link2 } from 'lucide-react';

/**
 * EcosystemImpactRoadmap Component
 *
 * A scroll-driven interactive roadmap using a cubic bezier SVG path.
 * Features a rocket that follows the path and rotates based on the tangent.
 */
const EcosystemImpactRoadmap = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const rocketRef = useRef(null);
  const fillPathRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [activeMileStone, setActiveMilestone] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [points, setPoints] = useState([]);

  const pathLength = useRef(0);

  // Milestones Data
  const milestones = [
    {
      id: 0,
      label: 'Aspiring Founders & Startups',
      icon: <Rocket size={20} />,
      pos: 0,
      align: 'above',
    },
    {
      id: 1,
      label: 'Mentors & Industry Experts',
      icon: <Users size={20} />,
      pos: 0.25,
      align: 'below',
    },
    {
      id: 2,
      label: 'Incubators & Accelerators',
      icon: <Building2 size={20} />,
      pos: 0.5,
      align: 'above',
    },
    {
      id: 3,
      label: 'Colleges & Institutions',
      icon: <BarChart3 size={20} />,
      pos: 0.75,
      align: 'below',
    },
    {
      id: 4,
      label: 'Investors & Organizations',
      icon: <Link2 size={20} />,
      pos: 1.0,
      align: 'above',
      isDestination: true,
    },
  ];

  // Precompute path points for smooth animation
  useEffect(() => {
    setMounted(true);

    const computePoints = () => {
      if (!pathRef.current) return;

      const length = pathRef.current.getTotalLength();
      pathLength.current = length;

      const samples = 200;
      const pts = [];
      for (let i = 0; i <= samples; i++) {
        const pt = pathRef.current.getPointAtLength((i / samples) * length);
        const nextPt = pathRef.current.getPointAtLength(
          Math.min(((i + 1) / samples) * length, length)
        );
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

        pts.push({
          x: (pt.x / 1440) * 100,
          y: (pt.y / 600) * 100,
          angle,
        });
      }
      setPoints(pts);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Re-compute points on resize to ensure SVG metrics are fresh
      computePoints();
    };

    // Small delay to ensure SVG DOM is fully ready
    const timer = setTimeout(computePoints, 100);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Scroll logic
  useEffect(() => {
    if (!mounted || isMobile) return;

    let rafId;
    const handleScroll = () => {
      if (!containerRef.current || !rocketRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let rawProgress = scrolled / scrollHeight;
      rawProgress = Math.min(Math.max(rawProgress, 0), 1);

      rafId = requestAnimationFrame(() => {
        updateRocket(rawProgress);
      });
    };

    const updateRocket = p => {
      setProgress(p);

      // Update Milestone activation
      const milestoneIndex = milestones.findIndex(m => Math.abs(p - m.pos) < 0.05);
      if (milestoneIndex !== -1) {
        setActiveMilestone(milestoneIndex);
      }

      // Update Rocket position
      if (points.length > 0) {
        const idx = Math.floor(p * (points.length - 1));
        const currentPt = points[idx];

        if (currentPt) {
          rocketRef.current.style.left = `${currentPt.x}%`;
          rocketRef.current.style.top = `${currentPt.y}%`;
          rocketRef.current.style.transform = `translate(-50%, -50%) rotate(${currentPt.angle}deg)`;

          if (fillPathRef.current) {
            const dashLength = pathLength.current * p;
            fillPathRef.current.style.strokeDasharray = `${dashLength} ${pathLength.current}`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // SVG Path Data - Centered symmetric S-curve
  // Starts at (60, 360), curves through middle at (720, 220), ends at (1380, 360)
  const pathD = 'M 60 360 C 260 360 460 220 720 220 C 980 220 1180 360 1380 360';

  return (
    <section className="ecosystem-roadmap-section" id="impact-roadmap">
      <div className="roadmap-noise-overlay" />
      <div className="roadmap-bg-glow" />

      <div className="container mx-auto px-4">
        <div className="roadmap-header">
          <span className="roadmap-overline">Ecosystem Impact</span>
          <h2 className="roadmap-heading">
            How We Help the <br />
            Ecosystem Grow
          </h2>
          <p className="roadmap-subtext">We act as a bridge between all key ecosystem players</p>
        </div>

        {!mounted || isMobile ? (
          <div className="mobile-roadmap-stack">
            <div className="mobile-connection-line" />
            {milestones.map(m => (
              <div key={m.id} className="mobile-roadmap-item">
                <div className="mobile-roadmap-card">
                  <div className="card-icon-box" style={{ background: '#E53935', color: '#FFF' }}>
                    {m.icon}
                  </div>
                  <span className="card-label" style={{ color: '#FFF', fontWeight: 600 }}>
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
            <div className="roadmap-bottom-callout visible" style={{ marginTop: '20px' }}>
              <p className="callout-text">
                By connecting these stakeholders, we ensure founders don't just learn—but{' '}
                <span className="highlight-text">progress</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="roadmap-sticky-outer" ref={containerRef}>
            <div className="roadmap-sticky-inner">
              <div className="roadmap-visual-container">
                <svg viewBox="0 0 1440 600" className="roadmap-svg-layer">
                  {/* Road Base */}
                  <path ref={pathRef} d={pathD} className="roadmap-path-base" />
                  {/* Dashed Center Lane */}
                  <path d={pathD} className="roadmap-path-dash" />
                  {/* Progress Fill Trail */}
                  <path
                    ref={fillPathRef}
                    d={pathD}
                    className="roadmap-path-fill"
                    style={{ strokeDasharray: `0 10000` }}
                  />
                </svg>

                {/* Milestones Nodes */}
                {points.length > 0 &&
                  milestones.map((m, idx) => {
                    const ptIdx = Math.floor(m.pos * (points.length - 1));
                    const pt = points[ptIdx];
                    const isActive = progress >= m.pos - 0.05;
                    const isCurrent = activeMileStone === idx;

                    return (
                      <div
                        key={m.id}
                        className="node-wrapper"
                        style={{
                          position: 'absolute',
                          left: `${pt.x}%`,
                          top: `${pt.y}%`,
                          zIndex: 10,
                        }}
                      >
                        <div className={`roadmap-node-dot ${isActive ? 'active' : ''}`} />

                        <div
                          className={`milestone-card ${m.align} ${isActive ? 'active' : ''} ${isCurrent ? 'pulse' : ''} ${m.isDestination ? 'destination' : ''}`}
                        >
                          <div className="roadmap-connector-line" />
                          <div className="card-icon-box">{m.icon}</div>
                          <span className="card-label">{m.label}</span>
                        </div>
                      </div>
                    );
                  })}

                {/* Rocket Element */}
                <div
                  className="roadmap-rocket-wrapper"
                  ref={rocketRef}
                  style={{ position: 'absolute' }}
                >
                  <Rocket size={18} fill="currentColor" />

                  {/* Tiny exhaust pulse */}
                  <div
                    className="roadmap-exhaust-circle"
                    style={{
                      width: '30px',
                      height: '30px',
                      left: '-20px',
                      top: '7px',
                      borderRadius: '40% 60% 60% 40% / 50%',
                    }}
                  />
                </div>
              </div>

              {/* Final Callout */}
              <div className={`roadmap-bottom-callout ${progress > 0.95 ? 'visible' : ''}`}>
                <p className="callout-text">
                  By connecting these stakeholders, we ensure founders don't just learn—but{' '}
                  <span className="highlight-text">progress</span>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EcosystemImpactRoadmap;
