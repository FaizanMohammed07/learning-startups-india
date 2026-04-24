'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import '../styles/testimonials-slider.css';

export default function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      company: 'TechVenture AI',
      quote:
        'The incubation program transformed our startup journey completely. The mentorship, resources, and network provided were instrumental in helping us scale from a small team to a thriving business.',
      stats: { funding: '$2M', growth: '300%', users: '50K+' },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: '/images/testimonial-1.jpg',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Co-Founder',
      company: 'HealthTech Solutions',
      quote:
        'Mentorship and resources helped us scale from 0 to 10,000 users in just 8 months. The strategic guidance and investor connections were game-changing for our growth trajectory.',
      stats: { funding: '$1.5M', growth: '250%', users: '10K+' },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      image: '/images/testimonial-2.jpg',
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      role: 'Founder',
      company: 'FinTech Innovations',
      quote:
        'Best decision we made was joining this incredible ecosystem. The access to industry experts and the collaborative environment accelerated our product development significantly.',
      stats: { funding: '$3M', growth: '400%', users: '100K+' },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      image: '/images/testimonial-3.jpg',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'CEO',
      company: 'EduTech Platform',
      quote:
        'From idea to market leader in just 18 months. The structured program and continuous support helped us navigate challenges and achieve milestones we never thought possible.',
      stats: { funding: '$2.5M', growth: '350%', users: '75K+' },
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      image: '/images/testimonial-4.jpg',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = index => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slideVariants = {
    enter: direction => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: direction => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="testimonials-slider-section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="testimonials-slider-bg">
        <div className="slider-gradient-orb orb-1"></div>
        <div className="slider-gradient-orb orb-2"></div>
        <div className="slider-gradient-orb orb-3"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="testimonials-slider-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="testimonials-slider-label"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="label-text">Student Success Stories</span>
          </motion.div>

          <motion.h2
            className="testimonials-slider-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="part-gray">Hear From Our</span>{' '}
            <span className="testimonials-slider-highlight">Successful Founders</span>
          </motion.h2>

          <motion.p
            className="testimonials-slider-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real stories of transformation, growth, and success from our startup community
          </motion.p>
        </motion.div>

        {/* Slider Container */}
        <div className="testimonials-slider-container">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="testimonial-slide"
            >
              <div className="testimonial-slide-inner">
                {/* Left Side - Content */}
                <div className="testimonial-content-side">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Quote Icon */}
                    <div className="quote-icon-wrapper">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        opacity="0.2"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>

                    {/* Quote Text */}
                    <p className="testimonial-quote-text">"{testimonials[currentSlide].quote}"</p>

                    {/* Author Info */}
                    <div className="testimonial-author-info">
                      <div
                        className="author-avatar-large"
                        style={{ background: testimonials[currentSlide].gradient }}
                      >
                        <span>{testimonials[currentSlide].name.charAt(0)}</span>
                      </div>
                      <div className="author-details">
                        <h4 className="author-name-large">{testimonials[currentSlide].name}</h4>
                        <p className="author-role-large">{testimonials[currentSlide].role}</p>
                        <p className="author-company-large">{testimonials[currentSlide].company}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="testimonial-stats-row">
                      <div className="stat-box">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                          <div className="stat-value">
                            {testimonials[currentSlide].stats.funding}
                          </div>
                          <div className="stat-label">Funding Raised</div>
                        </div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-icon">📈</div>
                        <div className="stat-content">
                          <div className="stat-value">
                            {testimonials[currentSlide].stats.growth}
                          </div>
                          <div className="stat-label">Growth Rate</div>
                        </div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                          <div className="stat-value">{testimonials[currentSlide].stats.users}</div>
                          <div className="stat-label">Active Users</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Visual */}
                <div className="testimonial-visual-side">
                  <div className="testimonial-visual-wrapper">
                    {/* Gradient Background */}
                    <div
                      className="testimonial-gradient-bg"
                      style={{ background: testimonials[currentSlide].gradient }}
                    ></div>

                    {/* Decorative Elements */}
                    <div className="testimonial-decorative-circle circle-1"></div>
                    <div className="testimonial-decorative-circle circle-2"></div>
                    <div className="testimonial-decorative-circle circle-3"></div>

                    {/* Company Logo Placeholder */}
                    <div className="company-logo-placeholder">
                      <div
                        className="logo-circle"
                        style={{ background: testimonials[currentSlide].gradient }}
                      >
                        <span>{testimonials[currentSlide].company.charAt(0)}</span>
                      </div>
                      <div className="logo-text">{testimonials[currentSlide].company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className="testimonial-nav-btn testimonial-nav-prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="testimonial-nav-btn testimonial-nav-next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Progress Indicators */}
          <div className="testimonial-progress-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`progress-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div className="indicator-bar">
                  {index === currentSlide && isAutoPlaying && (
                    <motion.div
                      className="indicator-fill"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                      key={currentSlide}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Slide Counter */}
          <div className="testimonial-slide-counter">
            <span className="counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">{String(testimonials.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
