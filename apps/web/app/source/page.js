'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import '@/styles/source-new.css';

export default function SourcePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles', count: 48 },
    { id: 'basics', label: 'Startup Basics', count: 12 },
    { id: 'ecosystem', label: 'Ecosystem Insights', count: 15 },
    { id: 'guides', label: 'Founder Guides', count: 10 },
    { id: 'learnings', label: 'Program Learnings', count: 8 },
    { id: 'resources', label: 'Resources', count: 11 }
  ];

  const articles = [
    {
      id: 5,
      title: 'Understanding the Startup Ecosystem: A Complete Guide',
      excerpt: 'Navigate the complex world of startups with our comprehensive guide.',
      category: 'ECOSYSTEM INSIGHTS',
      author: 'DR. PRIYA SHARMA',
      date: 'DEC 28, 2024',
      readTime: '12 MIN READ',
      views: '2.4K VIEWS',
      image: '/assets/images/source/ecosystem.png',
      highlightBadge: true
    },
    {
      id: 6,
      title: 'From Idea to Validation: Framework for First-Time Founders',
      excerpt: 'Learn the proven process to validate your startup idea effectively.',
      category: 'FOUNDER GUIDES',
      author: 'RAHUL VERMA',
      date: 'DEC 25, 2024',
      readTime: '10 MIN READ',
      views: '3.1K VIEWS',
      image: '/assets/images/source/validation.png',
      highlightBadge: false
    },
    {
      id: 1,
      title: 'Building Early Traction',
      excerpt: 'Navigating the initial growth phase requires more than just a product; it demands a strategic roadmap for early customer...',
      category: 'FOUNDER GUIDES',
      author: 'JOHNATHAN DOE',
      date: 'MAY 14, 2024',
      readTime: '8 MIN READ',
      views: '1.2K VIEWS',
      image: '/assets/images/source/traction.png',
      highlightBadge: true
    },
    {
      id: 2,
      title: 'Common Mistakes',
      excerpt: 'Identifying the pitfalls that derail most early-stage startups can be the difference between scaling up or shutting down prematurely.',
      category: 'RESOURCES',
      author: 'ELENA VANCE',
      date: 'MAY 12, 2024',
      readTime: '12 MIN READ',
      views: '3.4K VIEWS',
      image: '/assets/images/source/mistakes.png',
      highlightBadge: false
    },
    {
      id: 3,
      title: 'The Founder Mindset',
      excerpt: 'Resilience and adaptability are the core pillars of a successful leadership journey in the volatile world of high-tech ventures.',
      category: 'FOUNDER GUIDES',
      author: 'MARCUS STERLING',
      date: 'MAY 09, 2024',
      readTime: '6 MIN READ',
      views: '960 VIEWS',
      image: '/assets/images/source/mindset.png',
      highlightBadge: true
    },
    {
      id: 4,
      title: 'Startup Opportunities',
      excerpt: 'Analyzing the emerging markets and technological gaps that present the most significant potential for disruption in the coming...',
      category: 'RESOURCES',
      author: 'SARAH JENKINS',
      date: 'MAY 05, 2024',
      readTime: '10 MIN READ',
      views: '2.1K VIEWS',
      image: '/assets/images/source/opportunities.png',
      highlightBadge: false
    }
  ];

  return (
    <div className="source-page">
      {/* Hero Section */}
      <section className="source-hero">
        <div className="hero-gradient-bg"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Your Startup <br/>
              <span className="title-highlight">Knowledge Center</span>
            </h1>
            <p className="hero-description">
              Curated insights, practical guides, and ecosystem learnings for students, founders, and startups.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Header Section */}
        <header className="section-header-group">
          <motion.div 
            className="status-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot"></span>
            EDITORIAL INTELLIGENCE
          </motion.div>
          <motion.h1 
            className="section-title-large"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Latest Articles
          </motion.h1>
        </header>

        {/* Categories Bar */}
        <section className="category-section">
          <div className="categories-scroll">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
              >
                <span className="chip-label">
                  {cat.label} ({cat.count})
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <main className="articles-section">
          <div className="articles-grid">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                className="article-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
              >
                <div className="card-image-wrap">
                  <img src={article.image} alt={article.title} />
                  <div className="card-image-overlay"></div>
                  <span className={`category-badge-floating ${article.highlightBadge ? 'highlight' : ''}`}>
                    {article.category}
                  </span>
                </div>

                <div className="card-body">
                  <div className="card-meta-row">
                    <span>{article.author}</span>
                    <span className="meta-dot">•</span>
                    <span>{article.date}</span>
                    <span className="meta-dot">•</span>
                    <span>{article.views}</span>
                  </div>

                  <h3 className="card-content-title">{article.title}</h3>
                  <p className="card-excerpt-text">{article.excerpt}</p>

                  <div className="card-footer-flex">
                    <span className="read-time-bottom">{article.readTime}</span>
                    
                    <div className="interaction-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
