'use client';

import Link from 'next/link';
import { MAINTENANCE_MODE } from '@/config/maintenance';
import MaintenancePage from '../components/MaintenancePage';
import ScrollToTop from '@/components/ScrollToTop';
import NetworkHero from '@/components/NetworkHero';

import HowItWorksSection from '@/components/HowItWorksSection';
import EcosystemFeaturesSection from '@/components/EcosystemFeaturesSection';
import CollaborationFrameworkSection from '@/components/CollaborationFrameworkSection';
import ImpactSection from '@/components/ImpactSection';
import AchievementsSection from '@/components/AchievementsSection';
import TrainingSection from '@/components/TrainingSection';

import '../styles/iec-homepage.css';

export default function Home() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return (
    <>
      <NetworkHero />

      <HowItWorksSection />
      <EcosystemFeaturesSection />
      <AchievementsSection />
      <ImpactSection />
      <TrainingSection />

      <CollaborationFrameworkSection />
      <section className="iec-section iec-cta-section iec-bg-gray">
        <div className="iec-container">
          <h2>Ready to Scale Your Innovation?</h2>
          <p style={{ marginBottom: '2rem', color: '#555', fontSize: '1.2rem' }}>
            Join India&apos;s leading entrepreneurial ecosystem and transform your vision into
            reality.
          </p>
          <Link
            href="/signup"
            className="iec-btn iec-btn-primary"
            style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
          >
            Apply Now
          </Link>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
