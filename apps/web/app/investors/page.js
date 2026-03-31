'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvestorRegistrationModal from '@/components/InvestorRegistrationModal';
import ScrollToTop from '@/components/ScrollToTop';
import '../../styles/investors.css';
import '../../styles/modal.css';

export default function InvestorsPage() {
  const [showModal, setShowModal] = useState(false);
  const [investors, setInvestors] = useState([]);
  const loading = false;

  const displayInvestors = investors.slice(0, 4);

  // Investment data cards with irregular shapes
  const investmentCards = [
    { type: 'square', label: 'Avg Deal Size', value: '₹2.5Cr', icon: '💰', delay: 0 },
    { type: 'rectangle', label: 'Total Funding', value: '₹100Cr+', icon: '📈', delay: 1.5 },
    { type: 'square', label: 'Success Rate', value: '85%', icon: '🎯', delay: 3 },
    { type: 'rectangle', label: 'Active Deals', value: '45+', icon: '🤝', delay: 4.5 },
    { type: 'square', label: 'ROI Average', value: '3.2x', icon: '💎', delay: 6 },
  ];

  return (
    <div className="investors-page">
      {/* Hero Section */}
      <section className="investors-hero">
        {/* Animated Background */}
        <div className="hero-animated-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* Floating Grid Pattern with Stars */}
        <div className="hero-grid-pattern"></div>

        <div className="container">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Strengthening the Startup Ecosystem Through{' '}
              <span className="title-highlight">Investors</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Startups India, investors play an important role in supporting innovation, startup
              growth, and entrepreneurial ambition. Our investor network brings together angel
              investors, venture capitalists, and ecosystem partners who contribute through
              structured programs and curated opportunities.
            </motion.p>

            <motion.div
              className="hero-cta-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="hero-cta-primary">
                Explore Investors
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <button className="hero-cta-secondary" onClick={() => setShowModal(true)}>
                Become an Investor
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Active Investors</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">₹100Cr+</div>
                <div className="stat-label">Capital Deployed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Startups Funded</div>
              </div>
            </motion.div>
          </div>

          {/* Floating Investment Data Cards */}
          <div className="investment-cards-container">
            {investmentCards.map((card, index) => (
              <motion.div
                key={index}
                className={`investment-card investment-card-${card.type} investment-card-${index + 1}`}
                initial={{ opacity: 0, x: -50, y: 50, rotate: -5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [-50, 0, 0, 50],
                  y: [50, 0, -30, -80],
                  rotate: [-5, 0, 2, 5],
                }}
                transition={{
                  duration: 4,
                  delay: card.delay,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                <div className="investment-card-icon">{card.icon}</div>
                <div className="investment-card-value">{card.value}</div>
                <div className="investment-card-label">{card.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role of Investors Section */}
      <section className="role-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Role of Investors in Our Ecosystem</h2>
            <p className="section-subtitle-center">
              Investors associated with Startups India contribute meaningfully to our startup
              community
            </p>

            <div className="role-grid">
              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">💰</div>
                <h3>Support Innovation</h3>
                <p>Fund early-stage innovation and promising startups</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">🎤</div>
                <h3>Pitch Sessions</h3>
                <p>Participate in curated pitch sessions and demo days</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">🤝</div>
                <h3>Ecosystem Programs</h3>
                <p>Engage through ecosystem programs and events</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">📊</div>
                <h3>Strategic Insights</h3>
                <p>Contribute strategic insights and market perspectives</p>
              </motion.div>
            </div>

            <div className="role-note">
              <p>
                Investor participation is program-led and invitation-based, ensuring quality and
                alignment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investor Onboarding Process */}
      <section className="onboarding-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Investor Onboarding Process</h2>
            <p className="section-subtitle-center">
              Join our verified investor network in three simple steps
            </p>

            <div className="onboarding-steps">
              <div className="onboarding-step">
                <div className="step-number-badge">1</div>
                <div className="step-content">
                  <h3>Investor Registration</h3>
                  <p>
                    Interested investors can apply to join our ecosystem by completing the investor
                    registration form.
                  </p>
                  <ul className="step-list">
                    <li>Full name / organization name</li>
                    <li>Investor type (Angel / VC / Fund / Individual)</li>
                    <li>Investment focus areas</li>
                    <li>Preferred startup stages</li>
                  </ul>
                  <button className="step-action-btn" onClick={() => setShowModal(true)}>
                    Apply as an Investor
                  </button>
                </div>
              </div>

              <div className="onboarding-step">
                <div className="step-number-badge">2</div>
                <div className="step-content">
                  <h3>Internal Review & Approval</h3>
                  <p>
                    All investor applications are reviewed by the Startups India team to ensure
                    ecosystem alignment and credibility.
                  </p>
                  <ul className="step-list">
                    <li>Investment background verification</li>
                    <li>Alignment with ecosystem goals</li>
                    <li>Potential to support early-stage ventures</li>
                  </ul>
                  <p className="step-note">Only verified investors are onboarded.</p>
                </div>
              </div>

              <div className="onboarding-step">
                <div className="step-number-badge">3</div>
                <div className="step-content">
                  <h3>Investor Profile Listing</h3>
                  <p>
                    Once approved, investors are onboarded as official ecosystem investors and
                    featured on our platform.
                  </p>
                  <ul className="step-list">
                    <li>Verified investor profile created</li>
                    <li>Featured on website & ecosystem materials</li>
                    <li>Highlighted ecosystem association</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Note Section */}
      <section className="important-note-section">
        <div className="container">
          <motion.div
            className="note-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="note-icon">🔐</div>
            <h3>Important Note on Interaction & Investments</h3>
            <div className="note-content">
              <p>
                <strong>
                  Investors do not directly interact with startups through the website.
                </strong>
              </p>
              <ul>
                <li>No direct messaging, deal flow, or pitch uploads via the platform</li>
                <li>No funding guarantees or commitments</li>
                <li>
                  All investor engagement occurs only through Startups India–managed programs, demo
                  days, and curated events
                </li>
              </ul>
              <div className="note-benefits">
                <span>✓ Compliance & transparency</span>
                <span>✓ Structured interactions</span>
                <span>✓ Quality control</span>
                <span>✓ Professional engagement</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investors Grid */}
      <section className="investors-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Verified Investors</h2>
            <p className="section-subtitle">
              Ecosystem partners supporting the next generation of startups
            </p>
          </div>

          {loading ? (
            <div className="loading-state">Loading investors...</div>
          ) : (
            <>
              <div className="investors-grid">
                {displayInvestors.map((investor, index) => (
                  <motion.div
                    key={investor.id}
                    className="investor-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="card-header">
                      <div
                        className="investor-avatar-icon"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '3px solid #ffffff',
                          boxShadow:
                            '0 4px 12px rgba(220, 38, 38, 0.15), 0 0 0 1px rgba(220, 38, 38, 0.1)',
                          margin: '0 auto',
                        }}
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="investor-type-badge">{investor.investor_type}</div>
                    </div>

                    <div className="card-body">
                      <h3 className="investor-name">{investor.full_name}</h3>
                      {investor.organization_name && (
                        <p className="investor-org">{investor.organization_name}</p>
                      )}
                      <div className="location-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {investor.location}
                      </div>

                      <div className="focus-tags">
                        {investor.investment_focus?.slice(0, 3).map((focus, idx) => (
                          <span key={idx} className="tag">
                            {focus}
                          </span>
                        ))}
                      </div>

                      <div className="investor-meta">
                        <div className="meta-info">
                          <span className="meta-label">Ticket Size:</span>
                          <span className="meta-value">{investor.ticket_size}</span>
                        </div>
                        <div className="meta-info">
                          <span className="meta-label">Portfolio:</span>
                          <span className="meta-value">{investor.portfolio_count} startups</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="cta-row">
                <motion.div
                  className="cta-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => setShowModal(true)}
                >
                  <div className="cta-glow"></div>

                  <div className="cta-content-left">
                    <div className="cta-icon">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <h3 className="cta-title">Become an Investor</h3>
                    <p className="cta-desc">
                      Join our investor network and support the next generation of startups
                    </p>
                    <div className="cta-benefits">
                      <span>Curated startup exposure</span>
                      <span>Verified onboarding</span>
                      <span>Ecosystem partnership</span>
                    </div>
                  </div>

                  <div className="cta-content-right">
                    <button className="cta-btn">
                      Register Now
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="who-can-join-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Who Can Join as an Investor?</h2>
            <p className="section-subtitle-center">
              If you support innovation and early-stage entrepreneurship, we welcome you
            </p>

            <div className="join-grid">
              <div className="join-card">
                <div className="join-icon">👼</div>
                <h4>Angel Investors</h4>
              </div>
              <div className="join-card">
                <div className="join-icon">🏦</div>
                <h4>Venture Capital Firms</h4>
              </div>
              <div className="join-card">
                <div className="join-icon">🏢</div>
                <h4>Corporate Investment Arms</h4>
              </div>
              <div className="join-card">
                <div className="join-icon">👨‍👩‍👧‍👦</div>
                <h4>Family Offices</h4>
              </div>
              <div className="join-card">
                <div className="join-icon">🤝</div>
                <h4>Strategic Ecosystem Partners</h4>
              </div>
            </div>

            <div className="commitment-box">
              <h3>Our Commitment to Investors</h3>
              <div className="commitment-items">
                <div className="commitment-item">
                  <span className="commitment-icon">✓</span>
                  <span>Verified onboarding process</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">✓</span>
                  <span>Curated startup exposure through programs</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">✓</span>
                  <span>Professional and compliant ecosystem engagement</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">✓</span>
                  <span>Long-term ecosystem partnership</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && <InvestorRegistrationModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
