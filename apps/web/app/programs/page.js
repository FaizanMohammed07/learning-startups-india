'use client';

import { Rocket } from 'lucide-react';
import '../../styles/programs.css';

export default function ProgramsPage() {
  return (
    <div className="programs-page">
      <div className="programs-container">
        <div className="coming-soon-box">
          <div className="icon">
            <Rocket size={48} color="#E53935" />
          </div>
          <h1>Coming Soon</h1>
          <p className="subtitle">Our Programs Are On The Way</p>
          <div className="divider"></div>
          <p className="description">
            The Council is finalizing a suite of strategic initiatives designed to 
            accelerate institutional innovation and founder success. Stay tuned for 
            formal announcements.
          </p>
          
          <div className="features">
            <span className="feature-tag">INCUBATION</span>
            <span className="feature-tag">PRE-SEED</span>
            <span className="feature-tag">SCALE-UP</span>
            <span className="feature-tag">MENTORSHIP</span>
          </div>

          <form className="notify-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Institutional Email" 
              className="notify-input"
              required 
            />
            <button type="submit" className="notify-btn">
              NOTIFY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
