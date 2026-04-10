'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

const TabButton = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      borderRadius: '16px',
      border: 'none',
      background: active ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
      color: active ? '#ef4444' : '#64748b',
      fontWeight: 800,
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
    }}
  >
    <Icon name={icon} size={18} color={active ? '#ef4444' : '#64748b'} />
    {label}
    {active && (
      <motion.div
        layoutId="activeTab"
        style={{
          position: 'absolute',
          bottom: -2,
          left: '20%',
          right: '20%',
          height: 3,
          background: '#ef4444',
          borderRadius: '10px',
        }}
      />
    )}
  </button>
);

const FeedItem = ({ author, time, content, likes, comments, tags }) => (
  <div style={{
    background: '#fff',
    borderRadius: '24px',
    padding: '2rem',
    marginBottom: '1.5rem',
    border: '1px solid #f1f5f9',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
    transition: 'transform 0.2s',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, color: '#ef4444' }}>
          {author[0]}
        </div>
        <div>
          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{author}</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{time}</div>
        </div>
      </div>
      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <Icon name="moreHorizontal" size={18} color="#94a3b8" />
      </button>
    </div>
    
    <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: 500 }}>
      {content}
    </p>

    <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
      {tags.map((tag, i) => (
        <span key={i} style={{ padding: '6px 12px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>
          #{tag}
        </span>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '24px', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
        <Icon name="heart" size={18} color="#94a3b8" /> {likes}
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>
        <Icon name="message" size={18} color="#94a3b8" /> {comments}
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', marginLeft: 'auto' }}>
        <Icon name="bookmark" size={18} color="#94a3b8" />
      </button>
    </div>
  </div>
);

const GroupCard = ({ title, members, icon, category }) => (
  <div style={{
    background: '#fff',
    borderRadius: '28px',
    padding: '2rem',
    border: '1px solid #f1f5f9',
    boxShadow: '0 15px 35px rgba(0,0,0,0.03)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }} className="group-card-hover">
    <div style={{ 
      width: 64, height: 64, borderRadius: '20px', 
      background: 'rgba(239, 68, 68, 0.05)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 1.5rem'
    }}>
      <Icon name={icon} size={28} color="#ef4444" />
    </div>
    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{category}</div>
    <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{title}</h3>
    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{members} active builders</div>
    <button style={{ 
      marginTop: '2rem', width: '100%', padding: '12px', 
      borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0',
      color: '#0f172a', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer'
    }}>
      JOIN GROUP
    </button>
  </div>
);

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="platform-page" style={{ padding: '3rem 4rem', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '0.5rem' }}>Community Hub</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 600 }}>Unite with pioneers, solve challenges, and scale together.</p>
          </div>
          <button style={{ 
            background: '#ef4444', border: 'none', padding: '14px 28px', 
            borderRadius: '16px', color: '#fff', fontWeight: 800, fontSize: '0.9rem',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.25)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <Icon name="plus" size={18} color="#fff" /> START DISCUSSION
          </button>
        </div>

        <div style={{ 
          display: 'flex', gap: '10px', padding: '6px', 
          background: '#fff', borderRadius: '22px', border: '1px solid #e2e8f0',
          width: 'fit-content', boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
        }}>
          <TabButton active={activeTab === 'feed'} label="Discussion Feed" icon="message" onClick={() => setActiveTab('feed')} />
          <TabButton active={activeTab === 'groups'} label="Builder Groups" icon="userPlus" onClick={() => setActiveTab('groups')} />
          <TabButton active={activeTab === 'qa'} label="Doubts & Q&A" icon="alertCircle" onClick={() => setActiveTab('qa')} />
        </div>
      </header>

      <div style={{ maxWidth: '1200px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="feed"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem' }}>
                <div>
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
                
                {/* Right Sidebar - Trends */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #f1f5f9' }}>
                       <h4 style={{ fontWeight: 900, marginBottom: '1.5rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Icon name="trendUp" size={18} color="#ef4444" /> TRENDING TOPICS
                       </h4>
                       {['#VentureFuel', '#BuilderOdyssey', '#PitchDeck2026', '#GlobalScaling'].map((topic, i) => (
                         <div key={i} style={{ padding: '12px 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none', fontWeight: 700, color: '#64748b', fontSize: '0.9rem', cursor: 'pointer' }}>
                            {topic}
                         </div>
                       ))}
                    </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'groups' && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="groups"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
            >
              <GroupCard title="Founders Circle" members="1,240" icon="shield" category="Leadership" />
              <GroupCard title="Design Guild" members="850" icon="pencil" category="UX/UI" />
              <GroupCard title="Growth Hackers" members="3,100" icon="trendUp" category="Marketing" />
              <GroupCard title="Code Pioneers" members="920" icon="box" category="Tech" />
            </motion.div>
          )}

          {activeTab === 'qa'}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .group-card-hover:hover {
          transform: translateY(-8px);
          border-color: rgba(239, 68, 68, 0.2);
          box-shadow: 0 30px 60px rgba(239, 68, 68, 0.08);
        }
      `}</style>
    </div>
  );
}
