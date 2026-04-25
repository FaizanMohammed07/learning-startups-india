import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    image: '/assets/images/Demo-class.jpg',
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeItem = achievementsData[activeIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prev => (prev + 1) % achievementsData.length);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prev => (prev - 1 + achievementsData.length) % achievementsData.length);
  };

  const handleTabClick = index => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
  };

  // Reset transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // match with CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isTransitioning]);

  return (
    <section className="achievements-section">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>
            Celebrating <span className="highlight-red">Achievements</span> & Milestones
          </h2>
          <p className="achievements-subtext">
            A journey of excellence, recognition, and transformative impact in the startup ecosystem
          </p>
        </div>

        <div className="achievements-card-wrapper">
          <div className="achievements-main-card">
            <div
              className={`achievements-content-transition ${isTransitioning ? 'transitioning' : ''}`}
            >
              <div className="achievements-card-left">
                <div className="achievements-image-container">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="achievements-image"
                  />
                  <div className="achievements-badges">
                    <span className="badge-year">{activeItem.year}</span>
                    <span className="badge-category">{activeItem.category}</span>
                  </div>
                </div>
              </div>
              <div className="achievements-card-right">
                <div className="achievements-index">{activeItem.index}</div>
                <h3 className="achievements-card-title">{activeItem.title}</h3>
                <p className="achievements-card-desc">{activeItem.description}</p>
                <button className="achievements-cta">Read More</button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="achievements-controls">
              <div className="achievements-progress">
                <span>0{activeIndex + 1}</span>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${((activeIndex + 1) / achievementsData.length) * 100}%` }}
                  ></div>
                </div>
                <span>0{achievementsData.length}</span>
              </div>
              <div className="achievements-arrows">
                <button className="arrow-btn" onClick={handlePrev} aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button className="arrow-btn" onClick={handleNext} aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav Tabs */}
        <div className="achievements-tabs">
          {achievementsData.map((item, index) => (
            <button
              key={item.id}
              className={`achievements-tab ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
