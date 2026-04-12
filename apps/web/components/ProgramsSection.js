'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProgramsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const programs = [
    {
      title: 'Pre-Incubation',
      duration: '1 Month',
      description:
        'Transform your idea into a viable business concept with structured guidance and validation',
      features: ['Idea Validation', 'Market Research', 'Business Model', 'Prototype Development'],
      icon: '💡',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      badge: 'Foundation',
    },
    {
      title: 'Incubation',
      duration: '3 Months',
      description:
        'Build and launch your startup with comprehensive support, mentorship, and resources',
      features: ['Mentorship', 'Workspace', 'Legal Support', 'Funding Access'],
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      badge: 'Most Popular',
    },
    {
      title: 'Accelerator',
      duration: '3 Months',
      description:
        'Fast-track your growth with intensive training, investor connections, and scaling strategies',
      features: ['Growth Strategy', 'Investor Network', 'Market Expansion', 'Team Building'],
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      badge: 'Advanced',
    },
    {
      title: 'Master Classes',
      duration: '4 Days',
      description:
        'Learn from industry experts through specialized workshops and training sessions',
      features: ['Expert Sessions', 'Skill Development', 'Networking', 'Certifications'],
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      badge: 'Flexible',
    },
  ];

  return (
    <section className="programs-dark-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="programs-dark-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="programs-dark-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering Startups at Every Stage with{' '}
            <span className="title-highlight-red">Tailored Programs</span> Designed for Success
          </motion.h2>

          <motion.p
            className="programs-dark-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Whether you're just starting out or ready to scale, our comprehensive programs provide
            the mentorship, resources, and network you need to transform your vision into reality
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <div className="programs-dark-grid">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="program-dark-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -10, scale: 1.025, boxShadow: '0 8px 32px rgba(99,102,241,0.13)' }}
              style={{
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
                background: '#18181b',
                padding: '24px', /* Reduced for mobile comfort */
                margin: 0,
                minWidth: 0,
                width: '100%',
                maxWidth: 'none', /* Removed hardcoded 370 */
                outline: hoveredIndex === index ? '2px solid #6366f1' : 'none',
                outlineOffset: 0,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                transition: 'box-shadow 0.22s cubic-bezier(.4,0,.2,1), transform 0.18s',
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div
                className="program-dark-inner"
                style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}
              >
                {/* Badge */}
                <div className="program-badge-top">{program.badge}</div>

                {/* Icon with Gradient */}
                <div className="program-icon-box" style={{ background: program.gradient }}>
                  <span className="program-icon-emoji">{program.icon}</span>
                  <div className="program-icon-glow" style={{ background: program.gradient }}></div>
                </div>

                {/* Content */}
                <div className="program-content-dark">
                  <div
                    className="program-header-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <h3
                      className="program-title-dark"
                      style={{
                        fontSize: 21,
                        fontWeight: 700,
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {program.title}
                    </h3>
                    <span
                      className="program-duration"
                      style={{ fontSize: 14, color: '#a1a1aa', fontWeight: 600 }}
                    >
                      {program.duration}
                    </span>
                  </div>
                  <p
                    className="program-description-dark"
                    style={{
                      fontSize: 15,
                      color: '#d4d4d8',
                      margin: 0,
                      fontWeight: 500,
                      marginBottom: 10,
                    }}
                  >
                    {program.description}
                  </p>
                  {/* Features List */}
                  <ul
                    className="program-features-list"
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                    }}
                  >
                    {program.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="program-feature-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          fontSize: 14,
                          color: '#a1a1aa',
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* CTA Link */}
                  <Link
                    href="/signup"
                    className="program-cta-link"
                    style={{
                      marginTop: 16,
                      background: hoveredIndex === index ? '#6366f1' : '#27272a',
                      color: hoveredIndex === index ? '#fff' : '#6366f1',
                      borderRadius: 8,
                      padding: '8px 18px',
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: 'none',
                      transition: 'background 0.18s, color 0.18s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span>Explore Program</span>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      animate={{ x: hoveredIndex === index ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
