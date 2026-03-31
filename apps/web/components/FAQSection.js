'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: 'What is the Startups India Pre-Incubation Cohort (SINPC)?',
      answer: "The Startups India Pre-Incubation Cohort (SINPC) is a structured pre-incubation program for startups in India designed to support aspiring entrepreneurs and early-stage founders. The program helps participants validate startup ideas, build prototypes, and prepare for incubation and funding opportunities within the startup ecosystem in India."
    },
    {
      id: 2,
      question: 'Who can apply for the SINPC startup program?',
      answer: 'The SINPC startup mentorship program is open to students, innovators, entrepreneurs, and early-stage startup founders who have innovative business ideas and want to build scalable startups.'
    },
    {
      id: 3,
      question: '3. What are the benefits of joining the SINPC startup program?',
      answer: 'Participants in the Startups India Pre-Incubation Cohort receive: Expert startup mentorship, Business model development support, Guidance for startup funding and investor readiness, Market validation strategies, Access to the Indian startup ecosystem.'
    },
    {
      id: 4,
      question: 'How long is the Startups India Pre-Incubation Cohort program?',
      answer: 'The pre-incubation program duration is typically 8–12 weeks, where participants attend mentorship sessions, workshops, and startup development activities.'
    },
    {
      id: 5,
      question: 'Do I need a registered startup to join this startup incubation program?',
      answer: 'No. You can apply with just a startup idea or early-stage concept. Registration of a company is not mandatory to join the pre-incubation program in India.'
    },
    {
      id: 6,
      question: "Will participants receive mentorship during the program?",
      answer: "Yes. The program provides access to startup mentors, industry experts, and experienced founders who guide participants in product development, business strategy, and market validation."
    },
    {
      id: 7,
      question: 'Will I receive a certificate after completing the program?',
      answer: 'Yes. Participants who successfully complete the Startups India Pre-Incubation Cohort (SINPC) will receive a certificate of completion, recognizing their participation in the startup development program.'
    },
    {
      id: 8,
      question: 'What happens after completing the SINPC program?',
      answer: 'After completing the program, promising startups may get the opportunity to enter a startup incubation program or accelerator program, where they receive advanced mentorship, networking opportunities, and potential access to investors.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      {/* Background Elements */}
      <div className="faq-bg">
        <div className="faq-gradient faq-gradient-1"></div>
        <div className="faq-gradient faq-gradient-2"></div>
      </div>

      <div className="faq-container">
        {/* Header */}
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="faq-badge">FAQ</div>
          <h2 className="faq-title">
            Questions?<br />
            <span className="faq-highlight">We've Got Answers.</span>
          </h2>
        </motion.div>

        {/* FAQ Grid */}
        <div className="faq-grid">
          {/* Accordion Column */}
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="faq-question-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      {openIndex === index ? (
                        <path d="M5 12h14" />
                      ) : (
                        <>
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Side Info Card */}
          <motion.div
            className="faq-side-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="faq-card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M8 10h.01M12 10h.01M16 10h.01"/>
              </svg>
            </div>
            <h3 className="faq-card-title">Still have questions?</h3>
            <p className="faq-card-text">
              Our team is here to help you understand the program better and answer any specific questions you might have.
            </p>
            <div className="faq-card-features">
              <div className="faq-card-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Quick response time</span>
              </div>
              <div className="faq-card-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Personalized guidance</span>
              </div>
              <div className="faq-card-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>No commitment required</span>
              </div>
            </div>
            <button className="faq-card-cta">
              <span>Contact Our Team</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
