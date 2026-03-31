'use client';

import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Before joining the StartupsIndia Pre-Incubation Program, I had an idea but no clarity. This program helped me validate my idea, understand real problems, and build a clear roadmap. The mentorship was very helpful, and now I feel confident about my startup direction",
      author: "Rohan M.",
      role: "Engineering Student",
      institution: "IIT Delhi",
      rating: 5
    },
    {
      id: 2,
      quote: "I have attended many startup workshops, but this program was different. It was practical and helped me understand the market, competitors, and target audience clearly. I gained real startup knowledge which I didn’t get in college.",
      author: "Priya S.",
      role: "MBA Candidate",
      institution: "Looking to launch in EdTech",
      rating: 5
    },
    {
      id: 3,
      quote: "This program helped me understand funding and government grants clearly. Earlier, I had no idea about these opportunities, but now I know how to prepare and apply. It opened a new direction for my startup journey.",
      author: "Arjun K.",
      role: "Final Year Student",
      institution: "BITS Pilani",
      rating: 5
    },
    {
      id: 4,
      quote: "This program helped me move from ideas to action. I gained confidence, structured my startup idea, and worked on my prototype. The pitching and Demo Day experience was very valuable.",
      author: "Sneha R.",
      role: "Product Designer",
      institution: "NID Ahmedabad",
      rating: 5
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Entrepreneurs Supported' },
    { number: '100+', label: 'Events & Workshops' },
    { number: '25+', label: 'Industry Mentors' }
  ];

  return (
    <section className="testimonials-section">
      {/* Background Elements */}
      <div className="testimonials-bg">
        <div className="bg-gradient bg-1"></div>
        <div className="bg-gradient bg-2"></div>
      </div>

      <div className="testimonials-container">
        {/* Header */}
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="testimonials-badge">TESTIMONIALS</div>
          <h2 className="testimonials-title">
            Join India's Most Supportive<br />
            <span className="testimonials-highlight">Startup Community</span>
          </h2>
        </motion.div>

        {/* 3 Column Layout: 2 for Testimonials (Pinterest) + 1 for Community */}
        <div className="testimonials-three-col">
          {/* Pinterest Masonry Grid - 2 Columns for Testimonials */}
          <div className="testimonials-masonry">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="card-decoration"></div>
                
                {/* Quote Icon */}
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>

                {/* Stars */}
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>

                <div className="testimonial-author">
                  <div className="author-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                    <div className="author-institution">{testimonial.institution}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Community Proof Card - 3rd Column */}
          <motion.div
            className="community-proof-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="card-decoration"></div>
            
            <div className="community-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>

            <h3 className="community-title">Our Community</h3>
            <p className="community-text">
              StartupsIndia has supported thousands of entrepreneurs through content, events, and community. Now we're bringing that expertise into a focused pre-incubation program.
            </p>

            <div className="community-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="cta-content">
            <h3>Be Part of SINPC Cohort #1</h3>
            <p>Join the Startups India Pre incubation Cohort</p>
          </div>
          <button className="cta-button">
            <span>Apply Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
