'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileEdit, UserCheck, Zap, TrendingUp } from 'lucide-react';
import '../styles/how-it-works.css';

export default function HowItWorksSection() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const activePercent =
    hoveredStep !== null ? `${(hoveredStep / (steps.length - 1)) * 100}%` : '0%';

  return (
    <section className="how-it-works-section iec-container">
      <div className="how-it-works-header">
        <h2>How It Works</h2>
        <p className="iec-text-muted">
          A simple, structured pathway from initial application to successful scaling.
        </p>
      </div>

      <div className="how-timeline-container">
        {/* Background overall progress line */}
        <div className="timeline-base-line"></div>

        {/* Active progress line (fills up based on hover) */}
        <div
          className="timeline-active-line"
          style={{
            width: isMobile ? '2px' : activePercent,
            height: isMobile ? activePercent : '2px',
          }}
        ></div>

        <div className="how-steps-wrapper">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`how-step-card ${hoveredStep === index ? 'hovered' : ''} ${hoveredStep !== null && hoveredStep >= index ? 'active-path' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="step-badge-wrapper">
                <div className="step-badge">{step.number}</div>
              </div>

              <div className="step-content-card">
                <div className="step-icon-wrapper">{step.icon}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
