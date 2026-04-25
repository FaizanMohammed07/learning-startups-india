import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, ExternalLink } from 'lucide-react';
import '../styles/achievements.css';

const achievementsData = [
  {
    id: 'inspirex',
    label: 'Innovation Event',
    title: 'INSPIREX 2025',
    description:
      'Where Student Ideas Met Innovation at NMIMS Hyderabad. On November 11, 2025, the campus of NMIMS Hyderabad buzzed with entrepreneurial energy as the Entrepreneurship Cell hosted INSPIREX 2025.',
    year: '2025',
    category: 'Innovation Event',
    index: '01',
    image: '/assets/images/inspirex-new.jpg',
  },
  {
    id: 'hackathon',
    label: 'Hackathon',
    title: 'National Tech Hackathon',
    description:
      'A 48-hour intense coding and product development sprint where the brightest minds collaborate to solve pressing real-world challenges through technology.',
    year: '2024',
    category: 'Hackathon',
    index: '02',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'pitchfest',
    label: 'PitchFest',
    title: 'Annual Startup PitchFest',
    description:
      'Our flagship event designed to connect early-stage founders with angel investors, offering a stage to present business ideas and secure critical early funding.',
    year: '2025',
    category: 'Pitching',
    index: '03',
    image: '/assets/images/IDEAX PITCHFEST.JPG',
  },
  {
    id: 'awareness',
    label: 'Awareness Program',
    title: 'Entrepreneurship Awareness Campaign',
    description:
      'A nationwide initiative to inspire students and young professionals by educating them on the fundamentals of building a sustainable scalable business.',
    year: '2024',
    category: 'Program',
    index: '04',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'funding',
    label: 'Funding',
    title: 'Shark Tank Style Funding Rounds',
    description:
      'Provide startups with the rare opportunity to pitch directly to top-tier investors. Gain access to seed funding, comprehensive mentorship support, and unparalleled startup exposure to accelerate your growth.',
    year: '2024-25',
    category: 'Funding',
    index: '05',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'mentoring',
    label: 'Mentoring',
    title: '1-on-1 Expert Mentorship',
    description:
      'Exclusive sessions matching startup founders with seasoned industry veterans to provide tailored guidance, strategic advice, and operational insights.',
    year: '2024-25',
    category: 'Mentoring',
    index: '06',
    image: '/assets/images/mentoring image.jpg',
  },
];

export default function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % achievementsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + achievementsData.length) % achievementsData.length);
  };

  const activeItem = achievementsData[activeIndex];

  return (
    <section className="achievements-section overflow-hidden">
      <div className="iec-container relative z-10">
        <div className="achievements-header text-center mb-16">
          <motion.span 
            className="section-label-premium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 !text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Celebrating <span className="text-[#e53935]">Achievements</span> & Milestones
          </motion.h2>
          <motion.p 
            className="text-[#9ca3af] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A journey of excellence, recognition, and transformative impact in the startup ecosystem.
          </motion.p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image side */}
              <div className="lg:col-span-7">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#e53935]/20 blur-2xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-2xl aspect-[16/9]">
                    <motion.img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 flex gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                        <Calendar size={14} className="text-[#e53935]" />
                        <span className="text-sm font-bold text-white">{activeItem.year}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                        <Award size={14} className="text-[#e53935]" />
                        <span className="text-sm font-bold text-white">{activeItem.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="text-6xl font-black text-white/5 font-mono">{activeItem.index}</span>
                <h3 className="text-3xl font-bold text-white leading-tight">{activeItem.title}</h3>
                <p className="text-lg text-[#9ca3af] leading-relaxed">{activeItem.description}</p>
                
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-2 text-white font-bold group">
                    Explore Event 
                    <ExternalLink size={18} className="text-[#e53935] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center gap-6 mt-8">
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-[#e53935]/50 transition-colors bg-white/5"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-[#e53935]/50 transition-colors bg-white/5"
                    >
                      <ChevronRight size={20} className="text-white" />
                    </button>
                  </div>
                  
                  <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-[#e53935]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeIndex + 1) / achievementsData.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <span className="text-white/40 font-mono text-sm">
                    {activeIndex + 1} / {achievementsData.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
