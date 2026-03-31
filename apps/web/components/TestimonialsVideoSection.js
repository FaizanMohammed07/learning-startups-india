'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function TestimonialsVideoSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      company: 'TechVenture AI',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-1.jpg',
      quote: 'The incubation program transformed our startup journey completely',
      stats: { funding: '$2M', growth: '300%' },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Co-Founder',
      company: 'HealthTech Solutions',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-2.jpg',
      quote: 'Mentorship and resources helped us scale from 0 to 10,000 users',
      stats: { funding: '$1.5M', growth: '250%' },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      role: 'Founder',
      company: 'FinTech Innovations',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-3.jpg',
      quote: 'Best decision we made was joining this incredible ecosystem',
      stats: { funding: '$3M', growth: '400%' },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'CEO',
      company: 'EduTech Platform',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-4.jpg',
      quote: 'From idea to market leader in just 18 months',
      stats: { funding: '$2.5M', growth: '350%' },
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Founder',
      company: 'AgriTech Ventures',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-5.jpg',
      quote: 'The network and guidance were invaluable for our growth',
      stats: { funding: '$1.8M', growth: '280%' },
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
      id: 6,
      name: 'Ananya Iyer',
      role: 'Co-Founder',
      company: 'SaaS Startup',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/testimonial-6.jpg',
      quote: 'Accelerated our product development and market entry',
      stats: { funding: '$2.2M', growth: '320%' },
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <section className="testimonials-video-section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="testimonials-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="testimonials-video-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="testimonials-video-label"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Student Success Stories
          </motion.div>
          
          <motion.h2 
            className="testimonials-video-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hear From Our <span className="testimonials-highlight">Successful Founders</span>
          </motion.h2>
          
          <motion.p 
            className="testimonials-video-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real stories of transformation, growth, and success from our startup community
          </motion.p>
        </motion.div>

        {/* Video Grid */}
        <div className="testimonials-video-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-video-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="testimonial-video-wrapper">
                {/* Video Thumbnail */}
                <div 
                  className="video-thumbnail"
                  onClick={() => setActiveVideo(testimonial.id)}
                >
                  <div 
                    className="thumbnail-gradient"
                    style={{ background: testimonial.gradient }}
                  ></div>
                  <div className="thumbnail-placeholder">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  {/* Play Button */}
                  <motion.div 
                    className="play-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </motion.div>

                  {/* Stats Badge */}
                  <div className="video-stats-badge">
                    <div className="stat-item">
                      <span className="stat-icon">💰</span>
                      <span className="stat-text">{testimonial.stats.funding}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">📈</span>
                      <span className="stat-text">{testimonial.stats.growth}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="testimonial-video-content">
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ background: testimonial.gradient }}>
                      <span>{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                      <p className="author-company">{testimonial.company}</p>
                    </div>
                  </div>

                  <p className="testimonial-quote">"{testimonial.quote}"</p>

                  <button 
                    className="watch-video-btn"
                    onClick={() => setActiveVideo(testimonial.id)}
                  >
                    <span>Watch Story</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div 
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveVideo(null)}
        >
          <motion.div 
            className="video-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="video-iframe-wrapper">
              <iframe
                src={testimonials.find(t => t.id === activeVideo)?.videoUrl}
                title="Testimonial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
