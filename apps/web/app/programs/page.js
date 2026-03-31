'use client';

import '../../styles/programs.css';

export default function ProgramsPage() {
  return (
    <div className="programs-page">
      <div className="programs-container">
        <div className="coming-soon-box">
          <div className="icon">🚀</div>
          <h1>Coming Soon</h1>
          <p className="subtitle">Our Programs Are On The Way</p>
          <div className="divider"></div>
          <p className="description">
            We're crafting exceptional startup programs designed to transform ideas into successful ventures. 
            Stay tuned for world-class incubation, mentorship, and growth opportunities.
          </p>
          <div className="features">
            <span className="feature-tag">Pre-Incubation</span>
            <span className="feature-tag">Incubation</span>
            <span className="feature-tag">Growth Programs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
