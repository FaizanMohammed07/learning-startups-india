import { Play } from 'lucide-react';
import '../styles/training.css';

const trainingData = [
  {
    id: 1,
    title: 'Why Pre-incubation is Important',
    description:
      'Understand the significance of pre-incubation and how it sets the foundation for startup success.',
    instructorName: 'Ravi Tilekar',
    instructorRole: 'Expert Instructor',
    instructorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    tags: ['Clarity', 'Mindset', 'Entrepreneurship'],
    views: '12.5K Views',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Idea Validation',
    description:
      'Learn systematic approaches to validate your startup idea before investing significant resources.',
    instructorName: 'Vishwaraj Saude',
    instructorRole: 'Expert Instructor',
    instructorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    tags: ['Idea Validation', 'Audience', 'Market'],
    views: '15.2K Views',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Business Model',
    description:
      'Structure your roadmap with a solid business plan that attracts investors and guides growth.',
    instructorName: 'Avinash Tilekar',
    instructorRole: 'Expert Instructor',
    instructorAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    tags: ['Structure', 'Roadmap', 'Business Plan'],
    views: '18.7K Views',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export default function TrainingSection() {
  return (
    <section className="training-section">
      <div className="training-container">
        <div className="training-header">
          <span className="training-badge">FREE DEMO CLASSES</span>
          <h2>
            Experience Our <span className="highlight-red">World-Class</span> Training
          </h2>
          <p className="training-subtext">
            Get a sneak peek into our startup incubation curriculum designed by industry experts.
          </p>
        </div>

        <div className="training-grid">
          {trainingData.map(course => (
            <div key={course.id} className="training-card">
              {/* Top - Video Thumbnail */}
              <div className="training-thumbnail-container">
                <img src={course.image} alt={course.title} className="training-thumbnail" />
                <div className="training-overlay"></div>
                <div className="play-button">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="training-content">
                <div className="training-tags">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="training-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="training-title">{course.title}</h3>
                <p className="training-desc">{course.description}</p>

                {/* Instructor */}
                <div className="training-instructor">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    className="instructor-avatar"
                  />
                  <div className="instructor-info">
                    <div className="instructor-name">{course.instructorName}</div>
                    <div className="instructor-role">{course.instructorRole}</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="training-footer">
                <span className="training-views">{course.views}</span>
                <button className="training-cta">Watch Demo</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
