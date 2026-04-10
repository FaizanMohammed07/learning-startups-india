'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Rocket, 
  TrendingUp, 
  GraduationCap, 
  Network, 
  Target, 
  BookOpen, 
  Lightbulb, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Star,
  BriefcaseBusiness
} from 'lucide-react';
import MentorRegistrationModal from '@/components/MentorRegistrationModal';
import ExploreMentorsModal from '@/components/ExploreMentorsModal';
import ScrollToTop from '@/components/ScrollToTop';
import '../../styles/mentors-final.css';
import '../../styles/mentors-sections.css';
import '../../styles/modal.css';

export default function MentorsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [mentors, setMentors] = useState([]);
  const loading = false;

  const defaultMentors = [
    {
      id: 1,
      full_name: 'Bharat Bhushan Rallapalli',
      current_role: '(Retd) IB Office GoI and FOUNDER & MANAGING DIRECTOR',
      company: 'PRAGMA EDUCATION',
      expertise: ['Startup Mentor', 'Life Skills Coach', 'Political Strategist'],
      experience: '8+ years',
      previous_companies: ['Microsoft', 'Amazon'],
      profile_image: '/assets/images/Bhushan-pragma.jpg',
      rating: 4.9,
      total_mentees: 120,
      total_sessions: 450,
    },
    {
      id: 2,
      full_name: 'Raghunatha Chary',
      current_role: 'FOUNDER | MENTOR | AUTHOR',
      company: 'RevFirst Systems',
      expertise: ['Startup Mentor', 'Revenue Strategy', 'GTM Design'],
      experience: '10+ years',
      previous_companies: ['Teleperformance Global Services Ltd'],
      profile_image: '/assets/images/Raghunatha-Chary.jpg',
      rating: 4.9,
      total_mentees: 95,
      total_sessions: 380,
    },
    {
      id: 3,
      full_name: 'Dr.Venugopal Gandham',
      current_role: 'GLOBAL IT DIRECTOR',
      company: 'Teleperformance Global Services Ltd',
      expertise: ['Cyber Security Expert', 'AI Driven Expert', 'Team Management'],
      experience: '10+ years',
      previous_companies: ['Adobe', 'Figma'],
      profile_image: '/assets/images/Dr.Venugopal Gandham.jpg',
      rating: 4.9,
      total_mentees: 110,
      total_sessions: 420,
    },
    {
      id: 4,
      full_name: 'Raghu Vasishth',
      current_role: 'ADVOCATE',
      company: 'Supreme Court of India',
      expertise: ['Criminal Law', 'Labor Law', 'Legal Aid'],
      experience: '14+ years',
      previous_companies: ['Oracle', 'Series A Founder'],
      profile_image: '/assets/images/raghu-vasishth.jpg',
      rating: 4.9,
      total_mentees: 85,
      total_sessions: 340,
    },
    {
      id: 5,
      full_name: 'Meera Patel',
      current_role: 'Engineering & CTO Advisor',
      company: 'Netflix',
      expertise: ['System Architecture', 'Team Building', 'Technical Leadership'],
      experience: '16+ years',
      previous_companies: ['Uber', 'CTO at Series B'],
      profile_image: 'https://randomuser.me/api/portraits/women/5.jpg',
      rating: 4.9,
      total_mentees: 100,
      total_sessions: 400,
    },
  ];

  const displayMentors = mentors.length > 0 ? mentors : defaultMentors;

  // Mentor expertise cards data
  const mentorCards = [
    {
      name: 'Dr. Priya S.',
      expertise: 'AI/ML Expert',
      company: 'Google',
      gender: 'female',
      delay: 0,
    },
    { name: 'Rahul K.', expertise: 'Growth Hacking', company: 'Meta', gender: 'male', delay: 1.5 },
    {
      name: 'Anita D.',
      expertise: 'Product Strategy',
      company: 'Apple',
      gender: 'female',
      delay: 3,
    },
    {
      name: 'Vikram S.',
      expertise: 'Enterprise Sales',
      company: 'Salesforce',
      gender: 'male',
      delay: 4.5,
    },
    {
      name: 'Meera P.',
      expertise: 'Tech Leadership',
      company: 'Netflix',
      gender: 'female',
      delay: 6,
    },
    {
      name: 'Arjun M.',
      expertise: 'Fundraising Pro',
      company: 'Sequoia',
      gender: 'male',
      delay: 7.5,
    },
  ];

  return (
    <div className="mentors-page">
      {/* Hero Section */}
      <section className="mentors-hero">
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
            {/* <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Expert Mentorship
            </motion.div> */}

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Building a Strong <span className="title-highlight">Mentor Network</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At Startups India, mentors are a vital part of our startup ecosystem. They bring
              industry experience, strategic insight, and practical knowledge that strengthen
              founders, innovators, and startup programs.
            </motion.p>

            <motion.div
              className="hero-cta-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="hero-cta-primary">
                Find Your Mentor
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
                Become a Mentor
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </button>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Expert Mentors</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Mentees Guided</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2000+</div>
                <div className="stat-label">Sessions Delivered</div>
              </div>
            </motion.div>
          </div>

          {/* Floating Mentor Cards */}
          <div className="mentor-cards-container">
            {mentorCards.map((card, index) => (
              <motion.div
                key={index}
                className={`mentor-card mentor-card-${index + 1}`}
                initial={{ opacity: 0, x: -50, y: 50 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [-50, 0, 0, 50],
                  y: [50, 0, -30, -80],
                }}
                transition={{
                  duration: 4,
                  delay: card.delay,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                <div className="mentor-card-avatar">
                  {card.gender === 'female' ? (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div className="mentor-card-content">
                  <div className="mentor-card-name">{card.name}</div>
                  <div className="mentor-card-expertise">{card.expertise}</div>
                  <div className="mentor-card-company">@ {card.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role of Mentors Section */}
      <section className="role-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Role of Mentors in Our Ecosystem</h2>
            <p className="section-subtitle-center">
              Mentors associated with Startups India contribute meaningfully to our startup
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
                <div className="role-icon">
                  <Target size={22} color="#E53935" />
                </div>
                <h3>Support Founders</h3>
                <p>Guide founders through curated programs and initiatives</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">
                  <BookOpen size={22} color="#E53935" />
                </div>
                <h3>Share Expertise</h3>
                <p>Contribute during workshops and events</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">
                  <Rocket size={22} color="#E53935" />
                </div>
                <h3>Strengthen Innovation</h3>
                <p>Support pre-incubation and incubation initiatives</p>
              </motion.div>

              <motion.div
                className="role-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="role-icon">
                  <Lightbulb size={22} color="#E53935" />
                </div>
                <h3>Ecosystem Advisors</h3>
                <p>Act as role models and strategic advisors</p>
              </motion.div>
            </div>

            {/* <div className="role-note">
              <p>Mentors are engaged only through our official programs and activities, ensuring structured and meaningful involvement.</p>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Mentor Onboarding Process */}
      <section className="onboarding-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Mentor Onboarding Process</h2>
            <p className="section-subtitle-center">
              Join our verified mentor network in three simple steps
            </p>

            <div className="onboarding-steps">
              <div className="onboarding-step">
                <div className="step-number-badge">1</div>
                <div className="step-content">
                  <h3>Mentor Registration</h3>
                  <p>
                    Professionals interested in joining our ecosystem can apply by filling out the
                    mentor registration form.
                  </p>
                  <ul className="step-list">
                    <li>Full name & contact details</li>
                    <li>Professional background</li>
                    <li>Area of expertise & years of experience</li>
                    <li>LinkedIn / professional profile</li>
                  </ul>
                  <button className="step-action-btn" onClick={() => setShowModal(true)}>
                    Apply to Become a Mentor
                  </button>
                </div>
              </div>

              <div className="onboarding-step">
                <div className="step-number-badge">2</div>
                <div className="step-content">
                  <h3>Internal Review & Approval</h3>
                  <p>
                    Each mentor application is carefully reviewed by the Startups India team to
                    ensure alignment with our ecosystem goals.
                  </p>
                  <ul className="step-list">
                    <li>Relevant experience evaluation</li>
                    <li>Domain knowledge assessment</li>
                    <li>Ecosystem contribution potential</li>
                  </ul>
                  <p className="step-note">
                    Only approved mentors are onboarded into our ecosystem.
                  </p>
                </div>
              </div>

              <div className="onboarding-step">
                <div className="step-number-badge">3</div>
                <div className="step-content">
                  <h3>Profile Creation & Listing</h3>
                  <p>
                    Once approved, mentors are onboarded as official ecosystem mentors and featured
                    on our platform.
                  </p>
                  <ul className="step-list">
                    <li>Verified mentor profile created</li>
                    <li>Featured on website & ecosystem materials</li>
                    <li>Showcased to strengthen network diversity</li>
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
            <div className="note-icon">
              <ShieldCheck size={24} color="#E53935" />
            </div>
            <h3>Important Note on Interaction</h3>
            <div className="note-content">
              <p>
                <strong>
                  Mentors do not directly interact with founders or participants through the
                  website.
                </strong>
              </p>
              <ul>
                <li>No direct messaging, booking, or live interaction features are provided</li>
                <li>
                  All mentor engagement happens through Startups India–managed programs, events, and
                  initiatives
                </li>
              </ul>
              <div className="note-benefits">
                <span>✓ Quality control</span>
                <span>✓ Structured mentorship</span>
                <span>✓ Respect for mentors' time</span>
                <span>✓ Aligned ecosystem outcomes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="mentors-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Expert Mentors</h2>
            <p className="section-subtitle">Industry leaders ready to guide your startup journey</p>
          </div>

          {loading ? (
            <div className="loading-state">Loading mentors...</div>
          ) : (
            <>
              <div className="mentors-grid-elite">
                {/* Show 4 Mentor Cards */}
                {displayMentors.slice(0, 4).map((mentor, index) => (
                  <motion.div
                    key={mentor.id}
                    className="mentor-card-elite"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="card-glow"></div>
                    <div className="card-header-elite">
                      <div className="mentor-avatar-elite">
                        <img src={mentor.profile_image} alt={mentor.full_name} />
                        <div className="avatar-ring"></div>
                      </div>
                      <div className="rating-badge-elite">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {mentor.rating}
                      </div>
                    </div>

                    <div className="card-body-elite">
                      <h3 className="mentor-name-elite">{mentor.full_name}</h3>
                      <p className="mentor-role-elite">{mentor.current_role}</p>
                      <div className="company-badge-elite">{mentor.company}</div>

                      <div className="expertise-tags-elite">
                        {mentor.expertise.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="tag-elite">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mentor-meta-elite">
                        <div className="languages-elite">
                          <span className="language-tag">English</span>
                          <span className="language-tag">Hindi</span>
                          <span className="language-tag">Telugu</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Explore Mentors Button */}
              {/* <motion.div
              className="explore-mentors-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button 
                className="explore-mentors-btn"
                onClick={() => setShowExploreModal(true)}
              >
                <div className="btn-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="btn-content">
                  <span className="btn-title">Explore All Mentors</span>
                  <span className="btn-subtitle">View our complete mentor network</span>
                </div>
                <svg className="btn-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </motion.div> */}

              {/* Second Row - CTA Card Centered */}
              <div className="cta-row">
                {/* CTA Card */}
                <motion.div
                  className="cta-card-elite"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => setShowModal(true)}
                >
                  <div className="cta-glow"></div>

                  <div className="cta-content-left">
                    <div className="cta-icon-elite">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                    </div>
                    <h3 className="cta-title-elite">Become a Mentor</h3>
                    <p className="cta-desc-elite">
                      Share your expertise and shape the future of startups
                    </p>
                    <div className="cta-benefits-elite">
                      <span>Flexible Schedule</span>
                      <span>Ecosystem Recognition</span>
                      <span>Impact Innovation</span>
                    </div>
                  </div>

                  <div className="cta-content-right">
                    <button className="cta-btn-elite">
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

      {/* Who Can Apply Section */}
      <section className="who-can-apply-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Who Can Apply as a Mentor?</h2>
            <p className="section-subtitle-center">
              If you have knowledge to share and want to contribute to the ecosystem, we welcome you
            </p>

            <div className="apply-grid">
              <div className="apply-card">
                <div className="apply-icon">
                  <Users size={22} color="#E5E7EB" />
                </div>
                <h4>Entrepreneurs & Startup Founders</h4>
              </div>
              <div className="apply-card">
                <div className="apply-icon">
                  <Network size={22} color="#E5E7EB" />
                </div>
                <h4>Industry Professionals</h4>
              </div>
              <div className="apply-card">
                <div className="apply-icon">
                  <BriefcaseBusiness size={22} color="#E5E7EB" />
                </div>
                <h4>Corporate Leaders</h4>
              </div>
              <div className="apply-card">
                <div className="apply-icon">
                  <GraduationCap size={22} color="#E5E7EB" />
                </div>
                <h4>Subject Matter Experts</h4>
              </div>
              <div className="apply-card">
                <div className="apply-icon">
                  <TrendingUp size={22} color="#E5E7EB" />
                </div>
                <h4>Advisors with Relevant Experience</h4>
              </div>
            </div>

            <div className="commitment-box">
              <h3>Our Commitment to Mentors</h3>
              <div className="commitment-items">
                <div className="commitment-item">
                  <span className="commitment-icon">
                    <CheckCircle2 size={18} color="#E53935" />
                  </span>
                  <span>Professional onboarding and recognition</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">
                    <CheckCircle2 size={18} color="#E53935" />
                  </span>
                  <span>Clear role definition</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">
                    <CheckCircle2 size={18} color="#E53935" />
                  </span>
                  <span>Structured engagement opportunities</span>
                </div>
                <div className="commitment-item">
                  <span className="commitment-icon">
                    <CheckCircle2 size={18} color="#E53935" />
                  </span>
                  <span>Long-term association within the ecosystem</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-center">Don't Just Take Our Word for it!</h2>
            <p className="section-subtitle-center">Hear what the community is saying about us</p>

            <div className="testimonials-grid">
              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <svg
                  className="quote-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="testimonial-text">
                  "I spent great time talking with Meenakshi! We talked a lot about UX writing and
                  she gave me feedback about my portfolio. I gained valuable insights into the user
                  research process and received some..."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Alfiana Velasco"
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">Alfiana Velasco</h4>
                    <p className="author-role">BA Hons, University of Barcelona</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <svg
                  className="quote-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="testimonial-text">
                  "I had a fantastic conversation with Alex! I learned a lot about the user
                  experience design process and received some constructive feedback on my portfolio.
                  Can't wait to..."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Musele Saria"
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">Musele Saria</h4>
                    <p className="author-role">BSc(Hons), University of Montreal</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <svg
                  className="quote-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="testimonial-text">
                  "I had an amazing conversation with Alex! I gained valuable insights into the UX
                  Design process and received constructive feedback on my portfolio..."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Chutoe Saris"
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">Chutoe Saris</h4>
                    <p className="author-role">Br(pt), University of Ottawa</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <svg
                  className="quote-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="testimonial-text">
                  "Just had a super fun chat with Meenakshi! Learned a ton about the UX design
                  process and got really constructive feedback on my portfolio."
                </p>
                <div className="testimonial-author">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Sarah Johnson"
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">Sarah Johnson</h4>
                    <p className="author-role">MSc Design, Stanford University</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && <MentorRegistrationModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* Explore Mentors Modal */}
      <AnimatePresence>
        {showExploreModal && <ExploreMentorsModal onClose={() => setShowExploreModal(false)} />}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
