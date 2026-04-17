'use client';

/*
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/source-new.css';

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
      id: 1,
      title: 'Understanding the Startup Ecosystem: A Complete Guide',
      excerpt: 'Navigate the complex world of startups with our comprehensive guide.',
      category: 'Ecosystem Insights',
      author: 'Dr. Priya Sharma',
      date: 'Dec 28, 2024',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      views: '2.4K'
    },
    {
      id: 2,
      title: 'From Idea to Validation: Framework for First-Time Founders',
      excerpt: 'Learn the proven process to validate your startup idea effectively.',
      category: 'Founder Guides',
      author: 'Rahul Verma',
      date: 'Dec 25, 2024',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      views: '3.1K'
    },
    {
      id: 3,
      title: 'Building Early Traction: 5 Strategies That Work',
      excerpt: 'Practical tactics to gain your first 100 customers.',
      category: 'Founder Guides',
      author: 'Vikram Singh',
      date: 'Dec 20, 2024',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      views: '1.5K'
    },
    {
      id: 4,
      title: 'Common Mistakes First-Time Founders Make',
      excerpt: 'Learn from mistakes and save time on your startup journey.',
      category: 'Founder Guides',
      author: 'Meera Patel',
      date: 'Dec 18, 2024',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      views: '2.2K'
    },
    {
      id: 5,
      title: 'The Founder Mindset: Resilience and Execution',
      excerpt: 'Mental frameworks that separate successful founders.',
      category: 'Founder Guides',
      author: 'Kavita Joshi',
      date: 'Dec 8, 2024',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      views: '2.0K'
    },
    {
      id: 6,
      title: 'Startup Opportunities in 2025: Emerging Trends',
      excerpt: 'Explore promising sectors for new startups this year.',
      category: 'Resources',
      author: 'Sanjay Gupta',
      date: 'Dec 5, 2024',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
      views: '2.5K'
    }
  ];

  return (
    <div className="source-page">

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

      <section className="category-section">
        <div className="container">
          <div className="categories-scroll">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="chip-label">{cat.label}</span>
                <span className="chip-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="container">
          <h2 className="section-title">Latest Articles</h2>
          <div className="articles-grid">
            {articles.map((article) => (
              <motion.article
                key={article.id}
                className="article-card"
                whileHover={{ y: -8 }}
              >
                <div className="card-image">
                  <img src={article.image} alt={article.title} />
                  <div className="image-overlay">
                    <span className="category-badge">{article.category}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{article.title}</h3>
                  <p className="card-excerpt">{article.excerpt}</p>
                  <div className="card-meta">
                    <span className="author">{article.author}</span>
                    <span className="date">{article.date}</span>
                  </div>
                  <div className="card-footer">
                    <span className="read-time">{article.readTime} read</span>
                    <span className="views">{article.views} views</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
*/

export default function SourcePage() {
  return null;
}
