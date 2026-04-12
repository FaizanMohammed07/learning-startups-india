'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

const TabButton = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`community-tab-btn ${active ? 'active' : ''}`}
  >
    <Icon name={icon} size={20} color={active ? '#ef4444' : '#64748b'} stroke={2.5} />
    <span className="tab-label">{label}</span>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="active-indicator"
      />
    )}
  </button>
);

const FeedItem = ({ author, time, content, likes, comments, tags }) => (
  <div className="feed-item-card">
    <div className="feed-header">
      <div className="author-info">
        <div className="author-avatar">
          {author[0]}
        </div>
        <div className="author-meta">
          <div className="author-name">{author}</div>
          <div className="post-time">{time}</div>
        </div>
      </div>
      <button className="more-btn">
        <Icon name="moreHorizontal" size={20} color="#94a3b8" />
      </button>
    </div>
    
    <p className="post-content">
      {content}
    </p>
    
    <div className="tags-container">
      {tags.map((tag, i) => (
        <span key={i} className="tag-pill">
          #{tag}
        </span>
      ))}
    </div>

    <div className="action-bar">
      <button className="action-btn">
        <Icon name="heart" size={20} /> <span>{likes}</span>
      </button>
      <button className="action-btn">
        <Icon name="messageSquare" size={20} /> <span>{comments}</span>
      </button>
      <button className="action-btn-bookmark">
        <Icon name="bookmark" size={20} />
      </button>
    </div>
  </div>
);

const GroupCard = ({ title, members, icon, category }) => (
  <div className="group-card">
    <div className="group-card-icon">
      <Icon name={icon} size={32} color="#ef4444" stroke={2.5} />
    </div>
    <div className="group-card-category">{category}</div>
    <h3 className="group-card-title">{title}</h3>
    <div className="group-card-members">{members} members</div>
    <button className="group-join-btn">
      JOIN TRIBE
    </button>
  </div>
);

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="platform-page community-hub-page">
      <header className="hub-page-header">
        <div className="hub-header-main">
          <div className="hub-header-text">
            <h1 className="platform-page-title">
              Founder <span className="red-accent">Ecosystem</span>
            </h1>
            <p className="platform-page-subtitle">
              Unite with pioneers, solve high-stakes challenges, and scale together.
            </p>
          </div>
          <button className="create-momentum-btn">
            <Icon name="plus" size={20} color="#fff" stroke={3} />
            <span>START DISCUSSION</span>
          </button>
        </div>

        <div className="hub-nav-system">
          <TabButton active={activeTab === 'feed'} label="Discussion Feed" icon="messageSquare" onClick={() => setActiveTab('feed')} />
          <TabButton active={activeTab === 'groups'} label="Builder Groups" icon="userPlus" onClick={() => setActiveTab('groups')} />
          <TabButton active={activeTab === 'qa'} label="Doubts & Q&A" icon="helpCircle" onClick={() => setActiveTab('qa')} />
        </div>
      </header>

      <div className="hub-content-stage">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="feed"
              className="feed-grid-layout"
            >
              <div className="feed-posts-column">
                  <FeedItem 
                    author="Faizan Mohammed" 
                    time="2 hours ago" 
                    content="Thinking about pivoting my supply chain model for the Tier-2 market. Has anyone successfully implemented a localized warehouse strategy without major upfront capex?"
                    likes={42} comments={12} tags={['Pivot', 'Logistics', 'Scale']}
                  />
                  <FeedItem 
                    author="Sarah Jenkins" 
                    time="5 hours ago" 
                    content="Just finished the Series A Pilot course. The marketing loop chapter is a complete game changer for B2B SaaS builders! Highly recommend."
                    likes={89} comments={5} tags={['CourseReview', 'Marketing', 'SaaS']}
                  />
              </div>
              
              <aside className="feed-discovery-aside">
                  <div className="discovery-card">
                      <h4 className="discovery-label">
                        <Icon name="trendUp" size={18} color="#ef4444" stroke={3} /> TRENDING TOPICS
                      </h4>
                      <div className="trending-list">
                        {['#VentureFuel', '#BuilderOdyssey', '#PitchDeck2026', '#GlobalScaling'].map((topic, i) => (
                          <div key={i} className="trending-topic-item">
                             <span className="topic-text">{topic}</span>
                             <Icon name="chevronRight" size={14} color="#ef4444" stroke={3} />
                          </div>
                        ))}
                      </div>
                  </div>
              </aside>
            </motion.div>
          )}

          {activeTab === 'groups' && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key="groups"
              className="tribes-directory-grid"
            >
              <GroupCard title="Founders Circle" members="1,240" icon="shield" category="Leadership" />
              <GroupCard title="Design Guild" members="850" icon="pencil" category="UX/UI" />
              <GroupCard title="Growth Hackers" members="3,100" icon="trendUp" category="Marketing" />
              <GroupCard title="Code Pioneers" members="920" icon="box" category="Tech" />
            </motion.div>
          )}

          {activeTab === 'qa' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="qa-redirect-fallback"
            >
               <div className="fallback-card">
                  <Icon name="helpCircle" size={64} color="#ef4444" stroke={2.5} />
                  <h2 className="fallback-title">Looking for Expert Help?</h2>
                  <p className="fallback-text">
                      Head over to our dedicated Expert Doubts center to get your startup questions answered by verified mentors.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/community/doubts'}
                    className="fallback-btn"
                  >
                      GO TO DOUBTS HUB
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .community-hub-page { padding: 4rem 4rem 10rem; font-family: 'Poppins', sans-serif; background: #fff; min-height: 100vh; }
        .hub-page-header { margin-bottom: 5rem; }
        .hub-header-main { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem; }
        .platform-page-title { font-size: 3rem; font-weight: 950; letter-spacing: -0.05em; color: #0f172a; margin: 0; }
        .red-accent { color: #ef4444; }
        .platform-page-subtitle { font-size: 1.2rem; font-weight: 600; color: #64748b; margin-top: 0.5rem; max-width: 600px; }
        
        .create-momentum-btn { background: #ef4444; border: none; padding: 18px 36px; border-radius: 20px; color: #fff; font-weight: 950; font-size: 0.95rem; box-shadow: 0 15px 35px rgba(239, 68, 68, 0.25); cursor: pointer; display: flex; align-items: center; gap: 14px; transition: all 0.3s; }
        .create-momentum-btn:hover { background: #0f172a; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        
        .hub-nav-system { margin-top: 3.5rem; display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; -webkit-overflow-scrolling: touch; }
        .community-tab-btn { padding: 14px 28px; border-radius: 20px; border: 1.5px solid #f1f5f9; background: #fff; color: #64748b; font-weight: 850; font-size: 0.95rem; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.25s; position: relative; white-space: nowrap; }
        .community-tab-btn.active { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .active-indicator { position: absolute; bottom: -1px; left: 24px; right: 24px; height: 3px; background: #ef4444; border-radius: 10px; }
        
        .feed-grid-layout { display: grid; grid-template-columns: 1fr 380px; gap: 4rem; max-width: 1400px; margin: 0 auto; }
        .feed-posts-column { display: flex; flex-direction: column; gap: 2rem; }
        
        .feed-item-card { background: #fff; border-radius: 40px; padding: 3rem; border: 1.5px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.015); transition: all 0.3s; }
        .feed-item-card:hover { border-color: rgba(239, 68, 68, 0.15); transform: translateY(-3px); }
        .feed-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        
        .author-info { display: flex; gap: 20px; align-items: center; }
        .author-avatar { width: 56px; height: 56px; border-radius: 18px; background: #fef2f2; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 950; color: #ef4444; border: 1.5px solid #f1f5f9; }
        .author-name { font-weight: 950; color: #0f172a; font-size: 1.1rem; }
        .post-time { font-size: 0.8rem; color: #94a3b8; font-weight: 750; margin-top: 2px; }
        .more-btn { background: transparent; border: none; cursor: pointer; padding: 8px; border-radius: 12px; transition: background 0.2s; }
        .more-btn:hover { background: #f8fafc; }
        
        .post-content { color: #334155; line-height: 1.8; font-size: 1.1rem; margin: 2rem 0; font-weight: 650; }
        .tags-container { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 2rem; }
        .tag-pill { padding: 10px 20px; background: #f8fafc; border-radius: 12px; font-size: 0.85rem; color: #64748b; font-weight: 900; border: 1.5px solid #f1f5f9; }
        
        .action-bar { display: flex; gap: 3rem; padding-top: 2.5rem; border-top: 1.5px solid #f8fafc; margin-top: 1rem; }
        .action-btn { display: flex; align-items: center; gap: 12px; background: transparent; border: none; cursor: pointer; color: #94a3b8; font-weight: 950; font-size: 1rem; transition: all 0.2s; }
        .action-btn:hover { color: #ef4444; }
        .action-btn-bookmark { margin-left: auto; background: transparent; border: none; cursor: pointer; color: #94a3b8; transition: transform 0.2s; display: flex; align-items: center; justify-content: center; }
        .action-btn-bookmark:hover { transform: scale(1.1); color: #ef4444; }
        
        .feed-discovery-aside { display: flex; flex-direction: column; gap: 2rem; }
        .discovery-card { background: #fff; border-radius: 40px; padding: 3rem; border: 1.5px solid #f1f5f9; }
        .discovery-label { font-weight: 950; margin-bottom: 2.5rem; color: #0f172a; display: flex; align-items: center; gap: 14px; font-size: 0.85rem; letter-spacing: 0.15em; }
        .trending-topic-item { padding: 20px 0; border-bottom: 1.5px solid #f8fafc; font-weight: 950; color: #64748b; font-size: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.25s; }
        .trending-topic-item:last-child { border-bottom: none; }
        .trending-topic-item:hover { color: #ef4444; transform: translateX(8px); }
        
        .tribes-directory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto; }
        .group-card { background: #fff; border-radius: 44px; padding: 3.5rem 2.5rem; border: 1.5px solid #f1f5f9; text-align: center; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .group-card-icon { width: 84px; height: 84px; border-radius: 28px; background: #fef2f2; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem; box-shadow: 0 15px 30px rgba(239, 68, 68, 0.08); }
        .group-card-category { font-size: 0.75rem; font-weight: 950; color: #ef4444; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px; }
        .group-card-title { font-size: 1.5rem; font-weight: 950; color: #0f172a; margin-bottom: 12px; }
        .group-card-members { font-size: 0.95rem; color: #64748b; font-weight: 800; }
        .group-join-btn { margin-top: 3rem; width: 100%; padding: 18px; border-radius: 20px; background: #0f172a; border: none; color: #fff; font-weight: 950; font-size: 0.95rem; cursor: pointer; transition: all 0.3s; }
        .group-card:hover { transform: translateY(-12px); border-color: #ef4444; box-shadow: 0 40px 80px rgba(239, 68, 68, 0.08); }
        .group-card:hover .group-join-btn { background: #ef4444; box-shadow: 0 15px 30px rgba(239, 68, 68, 0.2); }

        .qa-redirect-fallback { text-align: center; padding: 8rem 2rem; background: #f8fafc; border-radius: 48px; border: 2px dashed #e2e8f0; }
        .fallback-card { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .fallback-title { fontSize: 2.25rem; fontWeight: 950; color: #0f172a; marginTop: 2.5rem; letter-spacing: -0.02em; }
        .fallback-text { fontSize: 1.15rem; color: #64748b; fontWeight: 650; margin: 1.5rem 0 3rem; line-height: 1.6; }
        .fallback-btn { background: #0f172a; color: #fff; border: none; padding: 20px 48px; border-radius: 24px; font-weight: 950; cursor: pointer; transition: all 0.3s; font-size: 1rem; }
        .fallback-btn:hover { background: #ef4444; transform: translateY(-4px); box-shadow: 0 15px 35px rgba(239, 68, 68, 0.25); }

        @media (max-width: 1200px) {
          .community-hub-page { padding: 0 1.5rem 8rem; }
          .hub-page-header { padding: 4rem 0 3rem; }
          .feed-grid-layout { grid-template-columns: 1fr; gap: 4rem; }
          .feed-discovery-aside { order: -1; }
          .discovery-card { padding: 2rem; border-radius: 32px; }
          .feed-item-card { padding: 2.25rem; border-radius: 32px; }
        }

        @media (max-width: 600px) {
          .create-momentum-btn { width: 62px; height: 62px; padding: 0; border-radius: 50%; position: fixed; bottom: 2.5rem; right: 1.5rem; z-index: 100; justify-content: center; box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4); }
          .create-momentum-btn span { display: none; }
          .platform-page-title { font-size: 2.4rem; }
          .action-bar { gap: 1.5rem; justify-content: space-between; }
          .action-btn span { font-size: 0.85rem; }
          .tribes-directory-grid { grid-template-columns: 1fr; }
          .author-avatar { width: 48px; height: 48px; font-size: 1.2rem; }
          .post-content { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
