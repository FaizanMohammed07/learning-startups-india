'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';

export default function LeaderboardPage() {
  const [tab, setTab] = useState('monthly');
  const router = useRouter();

  const monthlyLeaders = [
    { rank: 1, name: 'Arjun Mehra', score: 2840, avatar: 'A' },
    { rank: 2, name: 'Sanya Gupta', score: 2710, avatar: 'S' },
    { rank: 3, name: 'Rahul Varma', score: 2650, avatar: 'R' },
    { rank: 4, name: 'Priya Das', score: 2420, avatar: 'P' },
    { rank: 5, name: 'Karan Singh', score: 2380, avatar: 'K' },
    { rank: 6, name: 'Ananya Iyer', score: 2200, avatar: 'A' },
    { rank: 7, name: 'Vivek Joshi', score: 2150, avatar: 'V' },
  ];

  const allTimeLeaders = [
    { rank: 1, name: 'Sanya Gupta', score: 45200, avatar: 'S' },
    { rank: 2, name: 'Arjun Mehra', score: 42800, avatar: 'A' },
    { rank: 3, name: 'Vikram Rao', score: 41500, avatar: 'V' },
    { rank: 4, name: 'Rahul Varma', score: 38200, avatar: 'R' },
    { rank: 5, name: 'Priya Das', score: 35600, avatar: 'P' },
  ];

  const leaders = tab === 'monthly' ? monthlyLeaders : allTimeLeaders;

  return (
    <div className="platform-page leaderboard-page">
      <header className="leaderboard-header">
        <div className="header-content">
          <h1 className="platform-page-title">
            Founder <span className="red-glow-main">Leaderboard</span>
          </h1>
          <p className="platform-page-subtitle">Celebrating the highest velocity builders in the ecosystem.</p>
        </div>

        <div className="tab-container">
          {['monthly', 'allTime'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={`velocity-tab ${tab === t ? 'active' : ''}`}
            >
              {t === 'monthly' ? 'Monthly Sprint' : 'Hall of Fame'}
            </button>
          ))}
        </div>
      </header>

      {/* Podium for Top 3 */}
      <div className="podium-section">
        <div className="podium-grid">
            {/* 2nd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="podium-slot second"
            >
              <div className="podium-tier tier-silver">
                  <div className="avatar-frame">
                    <div className="avatar-main">{leaders[1]?.avatar}</div>
                    <div className="rank-tag silver">#2</div>
                  </div>
                  <div className="podium-details">
                    <div className="podium-name">{leaders[1]?.name}</div>
                    <div className="podium-pts">{leaders[1]?.score.toLocaleString()} PTS</div>
                  </div>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              initial={{ opacity: 0, y: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="podium-slot first"
            >
              <div className="champion-ring">
                <div className="podium-tier tier-gold">
                    <div className="crown-icon">
                       <Icon name="award" size={44} color="#fbbf24" stroke={2.5} />
                    </div>
                    <div className="avatar-frame gold-frame">
                      <div className="avatar-main champion-avatar">{leaders[0]?.avatar}</div>
                      <div className="rank-tag gold">CHAMPION</div>
                    </div>
                    <div className="podium-details">
                      <div className="podium-name highlight">{leaders[0]?.name}</div>
                      <div className="podium-pts highlight">{leaders[0]?.score.toLocaleString()} PTS</div>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="podium-slot third"
            >
              <div className="podium-tier tier-bronze">
                  <div className="avatar-frame">
                    <div className="avatar-main">{leaders[2]?.avatar}</div>
                    <div className="rank-tag bronze">#3</div>
                  </div>
                  <div className="podium-details">
                    <div className="podium-name">{leaders[2]?.name}</div>
                    <div className="podium-pts">{leaders[2]?.score.toLocaleString()} PTS</div>
                  </div>
              </div>
            </motion.div>
        </div>
      </div>

      <div className="leaderboard-body">
        <div className="table-container-glass glass-card">
           <table className="leader-table">
             <thead>
               <tr>
                 <th>RANKING</th>
                 <th>BUILDER PROFILE</th>
                 <th className="pts-th">SCORE</th>
               </tr>
             </thead>
             <tbody>
               {leaders.slice(3).map((l, idx) => (
                 <tr key={l.rank} className="table-row-v2">
                   <td className="rank-cell">
                     <span className="rank-pill">#{l.rank}</span>
                   </td>
                   <td className="profile-cell">
                     <div className="builder-info">
                       <div className="builder-avatar">{l.avatar}</div>
                       <div className="builder-meta">
                         <div className="builder-name">{l.name}</div>
                         <div className="builder-status">Active Builder</div>
                       </div>
                     </div>
                   </td>
                   <td className="pts-cell">
                     <div className="score-badge">{l.score.toLocaleString()}</div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* User Status Sticky */}
        <div className="user-ranking-sticky">
           <div className="glass-card status-card">
              <div className="user-profile-summary">
                 <div className="user-large-avatar">J</div>
                 <div className="user-text-summary">
                    <span className="summary-label">YOUR GLOBAL STANDING</span>
                    <h2 className="summary-rank-val">Rank #142</h2>
                 </div>
              </div>
              <div className="user-action-area">
                 <p className="summary-quote">
                    You're in the elite <span className="red-highlight">top 15%</span>. Finalize your current sprint to break into top 100.
                 </p>
                 <button 
                   onClick={() => router.push('/analytics/performance')}
                   className="performance-link-btn"
                 >
                    DASHBOARD ANALYTICS <Icon name="chevronRight" size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <style jsx global>{`
        .leaderboard-page { padding: 4rem 4rem 10rem; background: #fff; font-family: 'Poppins', sans-serif; }
        .leaderboard-header { margin-bottom: 6rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .red-glow-main { color: #ef4444; }
        
        .velocity-tab { padding: 14px 32px; border-radius: 20px; border: none; background: transparent; color: #64748b; font-size: 0.95rem; font-weight: 850; cursor: pointer; transition: all 0.3s; }
        .velocity-tab.active { background: #ef4444; color: #fff; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2); }
        
        .podium-section { margin-bottom: 8rem; }
        .podium-grid { display: flex; justify-content: center; align-items: flex-end; gap: 4rem; max-width: 1200px; margin: 0 auto; }
        .podium-slot { flex: 1; max-width: 320px; text-align: center; }
        
        .avatar-frame { position: relative; display: inline-block; margin-bottom: 3rem; }
        .avatar-main { width: 140px; height: 140px; border-radius: 48px; background: #fff; border: 4px solid #f1f5f9; display: flex; alignItems: center; justifyContent: center; fontSize: 3rem; fontWeight: 950; color: #0f172a; box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        
        .gold-frame .avatar-main { width: 200px; height: 200px; border-radius: 64px; border-color: #fbbf24; border-width: 8px; font-size: 4.5rem; }
        .tier-silver .avatar-main { border-color: #cbd5e1; }
        .tier-bronze .avatar-main { border-color: #d97706; }
        
        .rank-tag { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); padding: 10px 24px; border-radius: 16px; font-size: 0.9rem; font-weight: 950; white-space: nowrap; box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .rank-tag.gold { background: #fbbf24; color: #0f172a; font-size: 1.1rem; bottom: -25px; padding: 14px 36px; box-shadow: 0 20px 40px rgba(251, 191, 36, 0.3); }
        .rank-tag.silver { background: #0f172a; color: #fff; }
        .rank-tag.bronze { background: #0f172a; color: #fff; }
        
        .podium-name { font-size: 1.4rem; font-weight: 950; color: #1e293b; margin-top: 2rem; }
        .podium-pts { font-size: 1.15rem; font-weight: 900; color: #64748b; margin-top: 8px; }
        .podium-name.highlight { font-size: 2.25rem; color: #0f172a; letter-spacing: -0.02em; }
        .podium-pts.highlight { color: #ef4444; font-size: 1.5rem; }
        
        .crown-icon { margin-bottom: -15px; filter: drop-shadow(0 15px 25px rgba(251, 191, 36, 0.4)); }
        
        .table-container-glass { border-radius: 48px; border: 1.5px solid #f1f5f9; overflow: hidden; background: #fff; }
        .leader-table { width: 100%; border-collapse: collapse; }
        .leader-table th { padding: 2.5rem 3.5rem; text-align: left; background: #f8fafc; font-size: 0.8rem; font-weight: 950; color: #94a3b8; letter-spacing: 0.15em; border-bottom: 2px solid #f1f5f9; }
        .leader-table td { padding: 2.5rem 3.5rem; border-bottom: 1.5px solid #f8fafc; }
        
        .rank-pill { padding: 10px 18px; background: #f8fafc; border-radius: 12px; font-weight: 950; color: #94a3b8; font-size: 0.9rem; }
        .builder-info { display: flex; align-items: center; gap: 2rem; }
        .builder-avatar { width: 60px; height: 60px; border-radius: 18px; background: #f1f5f9; border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 1.4rem; }
        .builder-name { font-size: 1.25rem; font-weight: 950; color: #0f172a; }
        .builder-status { font-size: 0.85rem; font-weight: 700; color: #94a3b8; margin-top: 4px; }
        
        .pts-cell { text-align: right; }
        .pts-th { text-align: right !important; }
        .score-badge { font-size: 1.5rem; font-weight: 950; color: #0f172a; }
        
        .status-card { padding: 4rem; background: #fef2f2; border: 1.5px solid rgba(239, 68, 68, 0.1); border-radius: 60px; display: flex; justify-content: space-between; align-items: center; margin-top: 6rem; }
        .user-large-avatar { width: 110px; height: 110px; border-radius: 40px; background: #ef4444; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; font-weight: 950; box-shadow: 0 20px 45px rgba(239, 68, 68, 0.3); }
        .summary-label { font-size: 0.85rem; font-weight: 950; color: #ef4444; letter-spacing: 0.15em; display: block; margin-bottom: 12px; }
        .summary-rank-val { font-size: 4rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.05em; }
        
        .user-action-area { text-align: right; max-width: 550px; }
        .summary-quote { font-size: 1.4rem; font-weight: 700; color: #64748b; line-height: 1.6; margin-bottom: 3rem; }
        .red-highlight { color: #0f172a; font-weight: 950; text-decoration: underline; text-decoration-color: #ef4444; text-decoration-thickness: 4px; }
        
        .performance-link-btn { background: #0f172a; color: #fff; padding: 22px 48px; border-radius: 24px; font-weight: 950; font-size: 1.05rem; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 14px; transition: all 0.3s; }
        .performance-link-btn:hover { background: #ef4444; transform: translateY(-5px); box-shadow: 0 25px 50px rgba(239, 68, 68, 0.25); }

        @media (max-width: 1240px) {
          .leaderboard-page { padding: 0 1.5rem 8rem; }
          .leaderboard-header { padding-top: 8rem; flex-direction: column; align-items: flex-start; gap: 3rem; }
          .podium-grid { flex-direction: column; align-items: center; gap: 6rem; padding-top: 4rem; }
          .podium-slot { width: 100%; max-width: 450px; }
          .podium-slot.first { order: 1; }
          .podium-slot.second { order: 2; }
          .podium-slot.third { order: 3; }
          .gold-frame .avatar-main { width: 160px; height: 160px; font-size: 3.5rem; }
          .podium-name.highlight { font-size: 1.75rem; }
          .summary-rank-val { font-size: 3rem; }
          .status-card { flex-direction: column; text-align: center; gap: 4rem; padding: 3rem 2rem; }
          .user-profile-summary { flex-direction: column; }
          .user-action-area { text-align: center; }
          .performance-link-btn { width: 100%; justify-content: center; }
          .leader-table th, .leader-table td { padding: 1.5rem 1rem; }
          .builder-info { gap: 1rem; }
          .builder-name { font-size: 1.05rem; }
          .score-badge { font-size: 1.15rem; }
        }
      `}</style>
    </div>
  );
}
