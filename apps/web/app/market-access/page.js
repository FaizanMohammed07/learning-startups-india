'use client';

import { motion } from 'framer-motion';
import '../../styles/market-access.css';

export default function MarketAccessPage() {
  // Market opportunity cards data
  const marketCards = [
    { label: "Industry Partners", value: "150+", icon: "🤝", delay: 0 },
    { label: "Market Pilots", value: "80+", icon: "🚀", delay: 1.5 },
    { label: "Success Rate", value: "92%", icon: "📈", delay: 3 },
    { label: "Active Markets", value: "25+", icon: "🌍", delay: 4.5 },
    { label: "Customer Connects", value: "500+", icon: "👥", delay: 6 },
  ];

  return (
    <>
      <div className="market-access-page">
        
        {/* Hero Section - Dark Greenish Premium */}
        <section className="market-hero">
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
                From Idea Validation to <br/>
                <span className="hero-highlight">Real-World Market Exposure</span>
              </motion.h1>
              
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Market Access is the bridge connecting startup ideas with real customers, industries, and markets. 
                We help startups test, validate, and enter the market through structured support, curated exposure, 
                and meaningful partnerships.
              </motion.p>
              
              <motion.div 
                className="hero-features"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="hero-feature">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h3>Structured Process</h3>
                    <p>5-step guided approach</p>
                  </div>
                </div>
                <div className="hero-feature">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h3>Industry Partners</h3>
                    <p>Connect with real markets</p>
                  </div>
                </div>
                <div className="hero-feature">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="20" x2="12" y2="10"/>
                      <line x1="18" y1="20" x2="18" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="16"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h3>Validation & Feedback</h3>
                    <p>Real-world insights</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Market Opportunity Cards */}
            <div className="market-cards-container">
              {marketCards.map((card, index) => (
                <motion.div
                  key={index}
                  className={`market-card market-card-${index + 1}`}
                  initial={{ opacity: 0, x: -50, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [-50, 0, 0, 50],
                    y: [50, 0, -30, -80],
                    scale: [0.9, 1, 1, 0.95]
                  }}
                  transition={{
                    duration: 4,
                    delay: card.delay,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <div className="market-card-icon">{card.icon}</div>
                  <div className="market-card-value">{card.value}</div>
                  <div className="market-card-label">{card.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Market Access - Dark */}
        <section className="what-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="section-header">
                <div className="section-label">Understanding Market Access</div>
                <h2 className="section-title">What is Market Access?</h2>
                <p className="section-description">
                  Market Access is the bridge between startup ideas/products and real customers, industries, and markets.
                </p>
              </div>

              <div className="problems-grid">
                <div className="problem-card">
                  <div className="problem-icon">❌</div>
                  <h3>Early Customers</h3>
                  <p>Many startups struggle to find their first customers</p>
                </div>
                <div className="problem-card">
                  <div className="problem-icon">❌</div>
                  <h3>Market Feedback</h3>
                  <p>Real market feedback is hard to obtain</p>
                </div>
                <div className="problem-card">
                  <div className="problem-icon">❌</div>
                  <h3>Industry Exposure</h3>
                  <p>Getting in front of the right industry partners</p>
                </div>
                <div className="problem-card">
                  <div className="problem-icon">❌</div>
                  <h3>Validation Opportunities</h3>
                  <p>Pilot and validation opportunities are limited</p>
                </div>
              </div>

              <div className="solution-box">
                <h3>Our Solution</h3>
                <p>
                  At Startups India, Market Access helps startups test, validate, and enter the real market in a <strong>structured way</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why It Matters - Light */}
        <section className="why-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="section-header">
                <div className="section-label">Value Proposition</div>
                <h2 className="section-title">Why Market Access is Important</h2>
                <p className="section-description">
                  Market Access strengthens your platform and ecosystem
                </p>
              </div>

              <div className="why-grid">
                <div className="why-card">
                  <div className="why-icon">✅</div>
                  <h3>Helping Startups Succeed</h3>
                  <ul>
                    <li>Startups get real-world validation</li>
                    <li>Founders understand customer needs</li>
                    <li>Products improve based on feedback</li>
                    <li>Reduced risk of failure</li>
                  </ul>
                </div>

                <div className="why-card">
                  <div className="why-icon">✅</div>
                  <h3>Increasing Ecosystem Value</h3>
                  <ul>
                    <li>Attracts serious founders and startups</li>
                    <li>Builds credibility with investors & partners</li>
                    <li>Shows real outcomes, not just learning</li>
                    <li>Differentiates from "only training" platforms</li>
                  </ul>
                </div>

                <div className="why-card">
                  <div className="why-icon">✅</div>
                  <h3>Supporting Innovation</h3>
                  <ul>
                    <li>Industry problems meet startup solutions</li>
                    <li>Encourages applied innovation</li>
                    <li>Creates win-win collaboration</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Dark */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Process Overview</div>
              <h2 className="section-title">How Market Access Works</h2>
              <p className="section-description">
                A structured 5-step process to connect startups with real markets
              </p>
            </div>

            <div className="important-note">
              <div className="note-icon">⚡</div>
              <div className="note-content">
                <strong>Important:</strong> Market Access is facilitated, not guaranteed. 
                Startups India acts as a connector and enabler, not a sales or funding platform.
              </div>
            </div>

            <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h3>Startup Identification</h3>
                    <p>
                      Market Access opportunities are provided to startups in incubation, advanced programs, 
                      and high-potential early-stage ventures.
                    </p>
                    <div className="step-list">
                      <div className="step-item">Problem relevance</div>
                      <div className="step-item">Product readiness</div>
                      <div className="step-item">Market potential</div>
                    </div>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h3>Market Readiness Support</h3>
                    <p>
                      Before market exposure, startups receive guidance to ensure they are market-ready, not just idea-ready.
                    </p>
                    <div className="step-list">
                      <div className="step-item">Target customer definition</div>
                      <div className="step-item">Value proposition clarity</div>
                      <div className="step-item">Pitch and product positioning</div>
                      <div className="step-item">Use-case alignment</div>
                    </div>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h3>Industry & Partner Mapping</h3>
                    <p>
                      We identify relevant industry partners, corporate entities, institutions, and community networks.
                    </p>
                    <div className="step-list">
                      <div className="step-item">Industry sector matching</div>
                      <div className="step-item">Solution relevance</div>
                      <div className="step-item">Pilot or feedback potential</div>
                    </div>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h3>Curated Market Exposure</h3>
                    <p>
                      Startups get controlled exposure through managed channels and curated events.
                    </p>
                    <div className="step-list">
                      <div className="step-item">Demo days</div>
                      <div className="step-item">Pilot discussions</div>
                      <div className="step-item">Industry showcases</div>
                      <div className="step-item">Closed-door ecosystem sessions</div>
                    </div>
                    <div className="step-note">
                      📌 All exposure is curated and managed by Startups India
                    </div>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">05</div>
                  <div className="step-content">
                    <h3>Feedback & Learning</h3>
                    <p>
                      Startups receive valuable insights to refine their products and strategies.
                    </p>
                    <div className="step-list">
                      <div className="step-item">Market feedback</div>
                      <div className="step-item">Use-case insights</div>
                      <div className="step-item">Product feature refinement</div>
                      <div className="step-item">Go-to-market strategy</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Who Benefits - Light */}
        <section className="benefits-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="section-header">
                <div className="section-label">Stakeholder Value</div>
                <h2 className="section-title">Who Benefits from Market Access?</h2>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🚀</div>
                  <h3>For Startups</h3>
                  <ul>
                    <li>Early customer insights</li>
                    <li>Product validation</li>
                    <li>Industry exposure</li>
                    <li>Stronger investor readiness</li>
                  </ul>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">🏢</div>
                  <h3>For Industry & Partners</h3>
                  <ul>
                    <li>Access to innovative solutions</li>
                    <li>Early engagement with startups</li>
                    <li>Opportunity to explore pilots</li>
                  </ul>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">🌟</div>
                  <h3>For Startups India</h3>
                  <ul>
                    <li>Strong ecosystem credibility</li>
                    <li>Measurable impact</li>
                    <li>Long-term partnerships</li>
                    <li>Sustainable ecosystem growth</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer - Dark */}
        <section className="disclaimer-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="disclaimer-box">
                <div className="disclaimer-header">
                  <div className="disclaimer-icon">⚠️</div>
                  <h2>Important Disclaimer</h2>
                </div>

                <div className="disclaimer-items">
                  <div className="disclaimer-item">
                    <div className="disclaimer-bullet">•</div>
                    <p>
                      Market Access <strong>does not guarantee</strong> customers, revenue, or investments
                    </p>
                  </div>
                  <div className="disclaimer-item">
                    <div className="disclaimer-bullet">•</div>
                    <p>
                      Startups India <strong>does not act</strong> as a sales agent or broker
                    </p>
                  </div>
                  <div className="disclaimer-item">
                    <div className="disclaimer-bullet">•</div>
                    <p>
                      All engagements are <strong>exploratory and learning-driven</strong>
                    </p>
                  </div>
                </div>

                <div className="disclaimer-footer">
                  This ensures transparency, trust, and compliance.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
