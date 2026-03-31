'use client';

import { motion } from 'framer-motion';

export default function CTAStripSection() {
  return (
    <section className="cta-strip-section">
      <div className="cta-strip-container">
        <motion.div
          className="cta-strip-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-strip-left">
            <div className="cta-strip-badge">LIMITED SEATS</div>
            <h3 className="cta-strip-title">
              Ready to Turn Your Idea Into Reality?
            </h3>
            <p className="cta-strip-text">
              Join 1,000+ student founders who transformed their startups with our proven framework. Applications close soon.
            </p>
          </div>

          <div className="cta-strip-right">
            <div className="cta-strip-stats">
              <div className="stat-item">
                <div className="stat-number">7 Days</div>
                <div className="stat-label">Left to Apply</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">50</div>
                <div className="stat-label">Seats Available</div>
              </div>
            </div>
            
            <div className="cta-strip-actions">
              <button className="cta-strip-primary">
                <span>Apply Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="cta-strip-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
