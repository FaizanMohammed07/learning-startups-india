'use client';

import React, { useEffect, useRef } from 'react';
import { Rocket, Users, Building2, GraduationCap, Link2, ArrowRight } from 'lucide-react';

const RoadmapCard = ({ title, icon }) => (
  <div className="impact-roadmap-card">
    <div className="impact-icon">
      {icon}
    </div>
    <h3 className="impact-card-title">{title}</h3>
  </div>
);

const EcosystemImpactRoadmap = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let rafId;
    let current = 0;
    let target = 0;
    let currentProgress = 0;
    let targetProgress = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const updateActiveCard = () => {
      const cards = document.querySelectorAll(".impact-roadmap-card");
      if (!cards.length) return;
      const center = window.innerWidth / 2;

      let closest = null;
      let minDist = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const dist = Math.abs(center - cardCenter);

        if (dist < minDist) {
          minDist = dist;
          closest = card;
        }
      });

      cards.forEach((c) => c.classList.remove("active"));
      if (closest) closest.classList.add("active");
    };

    const updateProgressLine = (progress) => {
      const line = document.querySelector(".progress-line");
      const bgGlow = document.querySelector('.impact-bg-glow');

      if (line) {
        line.style.width = `${progress * 100}%`;
      }
      
      if (bgGlow) {
        bgGlow.style.transform = `translate(-50%, -50%) translateX(${progress * 200}px)`;
      }
    };

    const update = () => {
      current = lerp(current, target, 0.08);
      currentProgress = lerp(currentProgress, targetProgress, 0.08);

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${current}px)`;
      }

      updateActiveCard();
      updateProgressLine(currentProgress);

      rafId = requestAnimationFrame(update);
    };

    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      targetProgress = progress;

      const maxScroll = Math.max(
        trackRef.current.scrollWidth - window.innerWidth + 100,
        0
      );
      target = Math.min(progress * maxScroll, maxScroll);
    };

    // Initial triggers
    handleScroll();
    rafId = requestAnimationFrame(update);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ecosystem-impact-section roadmap-section" id="impact-roadmap">
      <div className="roadmap-sticky">
        <div className="impact-noise-overlay" />
        <div className="impact-bg-glow" />

        <div className="container mx-auto px-4 impact-header-wrapper">
          <div className="impact-header">
            <span className="impact-overline">Ecosystem Impact</span>
            <h2 className="impact-heading">
              How We Help the <br />
              Ecosystem Grow
            </h2>
            <p className="impact-subtext">We act as a bridge between all key ecosystem players</p>
          </div>
        </div>

        <div className="roadmap-inner">
          <div className="roadmap-track" ref={trackRef}>
            <div className="progress-line"></div>
            
            <RoadmapCard title="Founders & Startups" icon={<Rocket />} />
            <ArrowRight size={20} className="impact-arrow" />

            <RoadmapCard title="Mentors & Experts" icon={<Users />} />
            <ArrowRight size={20} className="impact-arrow" />

            <RoadmapCard title="Incubators & Accelerators" icon={<Building2 />} />
            <ArrowRight size={20} className="impact-arrow" />

            <RoadmapCard title="Colleges & Institutions" icon={<GraduationCap />} />
            <ArrowRight size={20} className="impact-arrow" />

            <RoadmapCard title="Investors & Organizations" icon={<Link2 />} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemImpactRoadmap;
