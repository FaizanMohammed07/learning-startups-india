'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const impactStats = [
    {
      number: '500',
      suffix: '+',
      label: 'Startups Incubated',
      description: 'Innovative ventures transforming industries',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0.1
    },
    {
      number: '110',
      suffix: 'Cr+',
      prefix: '₹',
      label: 'Funding Raised',
      description: 'Capital secured through our network',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 0.2
    },
    {
      number: '100',
      suffix: '+',
      label: 'Programs',
      description: 'Comprehensive training initiatives',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 0.3
    },
    {
      number: '100',
      suffix: '+',
      label: 'Value Partners',
      description: 'Strategic collaborations worldwide',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      delay: 0.4
    },
    {
      number: '1,000',
      suffix: '+',
      label: 'Events',
      description: 'Networking and learning opportunities',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      delay: 0.5
    },
    {
      number: '110',
      suffix: '+',
      label: 'Corporate Engagements',
      description: 'Industry partnerships and collaborations',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      delay: 0.6
    },
    {
      number: '100',
      suffix: '+',
      label: 'International Connects',
      description: 'Global network and partnerships',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      delay: 0.7
    },
    {
      number: '200',
      suffix: '+',
      label: 'Mentors',
      description: 'Expert guidance from industry leaders',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      delay: 0.8
    }
  ];

  // Animated counter hook
  const useCounter = (end, duration = 2000, shouldStart) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
  };

  return (
    <section className="impact-section" ref={sectionRef}>
      {/* Decorative Background Elements */}
      <div className="impact-bg-decoration">
        <div className="impact-grid-lines"></div>
        <div className="impact-floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="impact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="impact-label"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Impact
          </motion.div>
          
          <motion.h2 
            className="impact-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Impact on The <span className="impact-highlight">Innovation Ecosystem</span>
          </motion.h2>
          
          <motion.p 
            className="impact-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Driving transformation across the startup landscape with measurable results and lasting partnerships
          </motion.p>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="impact-stats-grid">
          {impactStats.map((stat, index) => (
            <ImpactCard 
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              useCounter={useCounter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for impact card
function ImpactCard({ stat, index, isInView, hoveredIndex, setHoveredIndex, useCounter }) {
  const numericValue = parseFloat(stat.number.replace(/,/g, ''));
  const animatedCount = useCounter(numericValue, 2000, isInView);
  
  const formatNumber = (num) => {
    if (stat.suffix === 'B') {
      return num.toFixed(2);
    }
    return num.toLocaleString();
  };

  return (
    <motion.div
      className="impact-stat-card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: stat.delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      <div className="impact-card-inner">
        {/* Icon with Gradient */}
        <div className="impact-icon-wrapper">
          <div className="impact-icon-box" style={{ background: stat.gradient }}>
            {stat.icon}
            <div className="impact-icon-glow" style={{ background: stat.gradient }}></div>
          </div>
        </div>

        {/* Number */}
        <div className="impact-number-wrapper">
          <span className="impact-number">
            {stat.prefix}
            {formatNumber(animatedCount)}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="impact-label-text">{stat.label}</h3>

        {/* Description */}
        <p className="impact-description-text">{stat.description}</p>

        {/* Decorative Line */}
        <motion.div 
          className="impact-card-line"
          animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}
