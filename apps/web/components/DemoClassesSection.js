'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Rocket, BarChart3, IndianRupee, GraduationCap } from 'lucide-react';
const VideoPlayerModal = dynamic(() => import('./VideoPlayerModal'), { ssr: false });

export default function DemoClassesSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const demoClasses = [
    {
      id: 1,
      title: 'Why Pre incubation is important',
      instructor: 'Ravi Tilekar',
      videoUrl: 'https://10ihs6meu0bf1qny.public.blob.vercel-storage.com/demo-1.mp4',
      thumbnail: '/thumbnails/demo-1.jpg',
      topics: ['Clarity', 'Mindset', 'Entrepreneurship'],
      views: '12.5K',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: Rocket,
    },
    {
      id: 2,
      title: 'Market Research & Validation',
      instructor: 'Vishwaraj Saude',
      videoUrl: 'https://10ihs6meu0bf1qny.public.blob.vercel-storage.com/demo-2.mp4',
      thumbnail: '/thumbnails/demo-2.jpg',
      topics: ['Idea Validation', 'Audience', 'Market'],
      views: '15.2K',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: BarChart3,
    },
    {
      id: 3,
      title: 'Business Model',
      instructor: 'Avinash Tilekar',
      videoUrl: 'https://10ihs6meu0bf1qny.public.blob.vercel-storage.com/demo-3.mp4',
      thumbnail: '/thumbnails/demo-3.jpg',
      topics: ['Structure roadmap', 'business plan'],
      views: '18.7K',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: IndianRupee,
    },
    // {
    //   id: 3,
    //   title: 'Market & Go To Market Strategy',
    //   instructor: 'Vishwaraj Saude',
    //   // duration: '50 min',

    //   videoUrl: '/videos/demo-3.mp4', // Replace with your video file
    //   thumbnail: '/thumbnails/demo-3.jpg', // Replace with your thumbnail
    //   topics: ['understanding Market', 'Market strategy', 'Revenue stream'],
    //   views: '18.7K',
    //   gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    //   icon: '💰',
    // },
    // {
    //   id: 3,
    //   title: 'Finance & Legal Foundation',
    //   instructor: 'Bharat Bhushan Rallapalli',
    //   // duration: '50 min',

    //   videoUrl: '/videos/demo-3.mp4', // Replace with your video file
    //   thumbnail: '/thumbnails/demo-3.jpg', // Replace with your thumbnail
    //   topics: ['Legal Structure', 'IPR protection', 'financial planning'],
    //   views: '18.7K',
    //   gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    //   icon: '💰',
    // },
    // {
    //   id: 3,
    //   title: 'Idea Pitching',
    //   instructor: 'Bharat Bhushan Rallapalli',
    //   // duration: '50 min',

    //   videoUrl: '/videos/demo-3.mp4', // Replace with your video file
    //   thumbnail: '/thumbnails/demo-3.jpg', // Replace with your thumbnail
    //   topics: ['Preparing Pitch Deck', 'Understanding Investors', 'Storytelling'],
    //   views: '18.7K',
    //   gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    //   icon: '💰',
    // },
  ];

  const handleOpenVideo = demo => {
    setActiveVideo(demo);
    setIsModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
  };

  return (
    <section className="demo-classes-section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="demo-bg-grid"></div>
      <div className="demo-bg-gradient"></div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="demo-classes-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="demo-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="badge-icon"></span>
            <span className="badge-text">Free Demo Classes</span>
          </motion.div>

          <motion.h2
            className="demo-classes-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Experience Our <span className="demo-highlight">World-Class</span> Training
          </motion.h2>

          <motion.p
            className="demo-classes-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Watch free demo sessions from our expert instructors and discover the quality of our
            programs
          </motion.p>
        </motion.div>

        {/* Demo Classes Grid */}
        <div className="demo-classes-grid">
          {demoClasses.map((demo, index) => (
            <motion.div
              key={demo.id}
              className="demo-class-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="demo-card-inner">
                {/* Video Preview */}
                <div className="demo-video-preview" onClick={() => handleOpenVideo(demo)}>
                  {/* Thumbnail Image */}
                  <img src={demo.thumbnail} alt={demo.title} className="demo-thumbnail-image" />
                  <div className="demo-thumbnail-overlay"></div>

                  {/* Play Overlay */}
                  <motion.div
                    className="demo-play-overlay"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="demo-play-button">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Level Badge */}
                  {/* <div className="demo-level-badge" style={{ borderColor: demo.gradient.split(',')[0].split('(')[1] }}>
                    {demo.level}
                  </div> */}

                  {/* Duration Badge */}
                  {/* <div className="demo-duration-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{demo.duration}</span>
                  </div> */}
                </div>

                {/* Content */}
                <div className="demo-card-content">
                  <h3 className="demo-class-title">{demo.title}</h3>

                  <div className="demo-instructor-info">
                    <div className="instructor-avatar" style={{ background: demo.gradient }}>
                      <span>{demo.instructor.charAt(0)}</span>
                    </div>
                    <div className="instructor-details">
                      <p className="instructor-name">{demo.instructor}</p>
                      <p className="instructor-role">Expert Instructor</p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="demo-topics">
                    {demo.topics.map((topic, idx) => (
                      <span key={idx} className="demo-topic-tag">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="demo-card-footer">
                    <div className="demo-views">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>{demo.views} views</span>
                    </div>

                    <button className="demo-watch-btn" onClick={() => handleOpenVideo(demo)}>
                      Watch Demo
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={handleCloseVideo}
        videoData={
          activeVideo
            ? {
                ...activeVideo,
                tags: activeVideo.topics,
              }
            : null
        }
      />
    </section>
  );
}
