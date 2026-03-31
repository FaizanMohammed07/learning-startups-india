'use client';

import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Apply in 5 Minutes',
      description: 'Submit a simple application with your startup idea. No lengthy forms, no business plan required — just your passion and vision.',
      detail: 'Rolling applications. Selected candidates notified within 7 days.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      duration: '5 min'
    },
    {
      number: '02',
      title: 'Learn, Build, Validate',
      subtitle: '4 Weeks',
      description: 'Join your cohort for live workshops, hands-on assignments, and weekly mentor sessions. Complete 2 modules per week, build your MVP, test with real customers, and refine your pitch.',
      detail: 'Hybrid format: Online sessions + optional in-person workshops.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
      duration: '4 weeks'
    },
    {
      number: '03',
      title: 'Pitch & Win on Demo Day',
      description: 'Present your startup to a panel of investors, industry experts, and successful founders. Top teams unlock seed funding up to ₹5 Lakhs + incubation support.',
      detail: 'All participants receive completion certificates & investor introductions.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      duration: 'Demo Day'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-bg-gradient"></div>
      
      <div className="how-it-works-container">
        {/* Header */}
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="how-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>How It Works</span>
          </div>

          <h2 className="how-title">
            From Application to Demo Day —<br />
            <span className="how-highlight">Here's Your Journey</span>
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-wrapper"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <motion.div
                    className="connector-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  />
                  <div className="connector-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Step Card */}
              <motion.div
                className="step-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-card-glow"></div>

                {/* Step Number Badge */}
                <div className="step-number-badge">
                  <span>{step.number}</span>
                </div>

                {/* Icon */}
                <div className="step-icon-wrapper">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-duration">{step.duration}</div>
                </div>

                {/* Content */}
                <div className="step-content">
                  {step.subtitle && (
                    <div className="step-subtitle">{step.subtitle}</div>
                  )}
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  
                  <div className="step-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{step.detail}</span>
                  </div>
                </div>

                {/* Background Number */}
                <div className="step-bg-number">{step.number}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  );
}
