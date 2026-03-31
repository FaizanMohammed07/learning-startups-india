'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import EcosystemHeroSection from '@/components/EcosystemCarouselSection';
import { MAINTENANCE_MODE } from '@/config/maintenance';

// Dynamic imports - below-fold sections load lazily for fast initial paint
const AboutUsIntroSection = dynamic(() => import('@/components/AboutUsIntroSection'));
const EcosystemSection = dynamic(() => import('@/components/EcosystemSection'));
const ValueStripSection = dynamic(() => import('@/components/ValueStripSection'));
const ProgramsSection = dynamic(() => import('../components/ProgramsSection'));
const ImpactSection = dynamic(() => import('@/components/ImpactSection'));
const SuccessSection = dynamic(() => import('@/components/SuccessSection'));
const DemoClassesSection = dynamic(() => import('@/components/DemoClassesSection'));
const TestimonialsSlider = dynamic(() => import('@/components/TestimonialsSlider'));
const ContactSection = dynamic(() => import('../components/ContactSection'));
const MaintenancePage = dynamic(() => import('../components/MaintenancePage'));
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'));

/* ==========================================
   PAGE-SPECIFIC CSS ONLY
   
   Global CSS (design-system, home-enterprise, footer)
   moved to layout.js for SSR - prevents FOUC!
   
   Only import section-specific styles here
   ========================================== */

// Section-Specific Styles (In order of page appearance)
import '../styles/ecosystem-carousel.css';
import '../styles/value-strip.css';
import '../styles/about-intro-section.css';
import '../styles/programs-dark.css';
import '../styles/impact-section.css';
import '../styles/success-section.css';
import '../styles/testimonials-slider.css';
import '../styles/demo-classes.css';
import '../styles/contact.css';

export default function Home() {
  // ⚠️ Show maintenance page if MAINTENANCE_MODE is enabled
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  // Normal homepage
  return (
    <div className="home-page">
      {/* Ecosystem Hero Section - Main Hero */}
      <EcosystemHeroSection />

      {/* About Us Intro Section - Trailblazers of Innovation */}
      <AboutUsIntroSection />

      {/* Ecosystem Section - Our Capabilities */}
      <EcosystemSection />

      {/* Collaboration Model Section - Our Model */}
      <ValueStripSection />

      {/* Programs Section - Dark Theme */}
      <ProgramsSection />

      {/* Impact Section - Our Impact */}
      <ImpactSection />

      {/* Success Section - Achievements Slider */}
      <SuccessSection />

      {/* Demo Classes Section - Free Demo Videos */}
      <DemoClassesSection />

      {/* Testimonials Slider Section - Student Stories */}
      <TestimonialsSlider />

      {/* Banner Section */}
      {/* <motion.section 
        className="banner-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container">
          <p className="banner-text">
            Learn to build AI agents in the Generative AI Software Engineering specialization. <Link href="/signup" className="banner-link">Enroll now!</Link>
          </p>
        </div>
      </motion.section> */}

      {/* Contact Section */}
      <ContactSection />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
