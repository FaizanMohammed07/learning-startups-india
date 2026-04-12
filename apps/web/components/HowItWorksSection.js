'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Rocket, FileEdit, UserCheck, Zap, TrendingUp } from 'lucide-react';
import '../styles/how-it-works.css';

const steps = [
  {
    number: '1',
    title: 'Apply',
    description: 'Submit your startup details for evaluation by our core team.',
    icon: <FileEdit size={24} />,
  },
  {
    number: '2',
    title: 'Get Selected',
    description: 'Pass the screening process to join our exclusive platform.',
    icon: <UserCheck size={24} />,
  },
  {
    number: '3',
    title: 'Build & Mentorship',
    description: 'Work directly with leading industry experts and refine your model.',
    icon: <Zap size={24} />,
  },
  {
    number: '4',
    title: 'Scale & Access Funding',
    description: 'Pitch to investors, secure funding, and scale your growth rapidly.',
    icon: <TrendingUp size={24} />,
  },
];

// Node positions as % of axis width (node centres)
const NODE_POSITIONS_PCT = [0, 33.333, 66.666, 100];

export default function HowItWorksSection() {
  const axisRef = useRef(null);
  const [rocketPct, setRocketPct] = useState(0);       // 0–100 %
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!axisRef.current || isMobile) return;
    const rect = axisRef.current.getBoundingClientRect();
    // cursor X relative to the left edge of the axis element itself
    const rawX = e.clientX - rect.left;
    // clamp to [0, rect.width] then convert to percentage
    const clamped = Math.max(0, Math.min(rawX, rect.width));
    const pct = (clamped / rect.width) * 100;

    setRocketPct(pct);

    // Snap active step to whichever node is closest
    const nearest = NODE_POSITIONS_PCT.reduce((best, pos, idx) =>
      Math.abs(pct - pos) < Math.abs(pct - NODE_POSITIONS_PCT[best]) ? idx : best
    , 0);
    setActiveStep(nearest);
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRocketPct(0);
    setActiveStep(0);
  }, []);

  // When hovering a card, snap the rocket to that step
  const handleCardHover = useCallback((idx) => {
    setActiveStep(idx);
    setRocketPct(NODE_POSITIONS_PCT[idx]);
  }, []);

  return (
    <section className="how-it-works-modern">
      <div className="iec-container">
        {/* Header */}
        <div className="roadmap-header">
          <span className="sub-tag">THE INSTITUTIONAL PATHWAY</span>
          <h2>A Strategic Trajectory for Founders</h2>
          <p>From visionary concept to global market leader, our structured roadmap ensures every milestone is an engine for growth.</p>
        </div>

        <div className="roadmap-container">
          {/* ── Axis: line + nodes + rocket ── */}
          <div
            className="roadmap-axis"
            ref={axisRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Faint base line */}
            <div className="roadmap-base-line" />

            {/* Glowing flame trail – grows with cursor */}
            <div
              className="roadmap-flame-trail"
              style={{ width: `${rocketPct}%` }}
            />

            {/* Rocket – absolutely positioned, perfectly on the line */}
            <div
              className={`rocket-pilot${isHovering ? ' visible' : ''}`}
              style={{ left: `${rocketPct}%` }}
            >
              <Rocket size={18} style={{ transform: 'rotate(90deg)' }} />
            </div>

            {/* Step nodes */}
            <div className="roadmap-nodes-wrapper">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`roadmap-node-item${activeStep >= idx ? ' active' : ''}${activeStep === idx ? ' current' : ''}`}
                  onMouseEnter={() => handleCardHover(idx)}
                >
                  <span className="node-number">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Cards ── */}
          <div className="roadmap-cards-grid">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className={`roadmap-step-card-glass${activeStep === idx ? ' focused' : ''}`}
                onMouseEnter={() => handleCardHover(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="step-card-icon">{step.icon}</div>
                <h4 className="step-card-title">{step.title}</h4>
                <p className="step-card-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
