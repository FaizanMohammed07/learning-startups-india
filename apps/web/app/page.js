'use client';

import { MAINTENANCE_MODE } from '@/config/maintenance';
import MaintenancePage from '../components/MaintenancePage';
import ScrollToTop from '@/components/ScrollToTop';
import NetworkHero from '@/components/NetworkHero';

import HowItWorksSection from '@/components/HowItWorksSection';
import EcosystemFeaturesSection from '@/components/EcosystemFeaturesSection';
import CollaborationFrameworkSection from '@/components/CollaborationFrameworkSection';
import FoundersTestimonialsSection from '@/components/FoundersTestimonialsSection';
import ApplyDarkSection from '@/components/ApplyDarkSection';
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
      <FoundersTestimonialsSection />
      <ApplyDarkSection />
      <ScrollToTop />
    </>
  );
}
