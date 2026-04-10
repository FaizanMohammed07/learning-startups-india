'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function DiscussionsPage() {
  const [filter, setFilter] = useState('Trending');
  const [showModal, setShowModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const discussions = [
    {
      id: 1,
      user: { name: 'Aryan Sharma', badge: 'Top Contributor', avatar: 'AS' },
      time: '2 hours ago',
      title: 'How to optimize Next.js images for faster load times?',
      preview: 'I am struggling with LCP on my landing page. I have tried next/image but the results are still not ideal for mobile users...',
      tags: ['Next.js', 'Performance', 'UI/UX'],
      upvotes: 42,
      replies: 12,
      views: 890,
      content: 'Full content of the question here. This discusses performance optimization strategies in depth, including image sizing, loaders, and blurred placeholder techniques.',
      answers: [
        { author: 'Rahul Gupta', content: 'You should try using the priority property for above-the-fold images. Also, ensure your sizes attribute is correctly defined.', upvotes: 15, isBest: true },
        { author: 'Sarah J.', content: 'Check if you are using large unoptimized images in your public folder instead of next/image.', upvotes: 4, isBest: false }
      ]
    },
    {
      id: 2,
      user: { name: 'Priya Verma', badge: null, avatar: 'PV' },
      time: '5 hours ago',
      title: 'What is the best way to handle global state in a startup project?',
      preview: 'Should I go with Redux Toolkit or just use React Context? Considering we need to scale fast and maybe add features like persist...',
      tags: ['React', 'State Management'],
      upvotes: 28,
      replies: 8,
      views: 450,
      content: 'Detailed discussion about Redux vs Context vs Zustand for early-stage startups.',
      answers: []
    }
  ];

  const contributors = [
    { name: 'Aryan Sharma', score: 1240, avatar: 'AS' },
    { name: 'Rahul Gupta', score: 980, avatar: 'RG' },
    { name: 'Neha Kapoor', score: 850, avatar: 'NK' }
  ];

  const trendingTopics = ['Next.js', 'Startups', 'SaaS', 'TailwindCSS', 'TypeScript'];

  if (selectedDiscussion) {
    return (
      <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button 
            onClick={() => setSelectedDiscussion(null)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', 
              color: '#6B7280', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1.5rem' 
            }}
          >
            <Icon name="arrowLeft" size={20} /> Back to discussions
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
            {/* Thread detail */}
            <div>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {selectedDiscussion.user.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{selectedDiscussion.user.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Asked {selectedDiscussion.time}</div>
                  </div>
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem', lineHeight: 1.2 }}>{selectedDiscussion.title}</h1>
                <div style={{ fontSize: '1.1rem', color: '#374151', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {selectedDiscussion.content}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontWeight: 700 }}>
                      <Icon name="arrowUp" size={20} /> {selectedDiscussion.upvotes}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontWeight: 700 }}>
                      <Icon name="messageSquare" size={20} /> {selectedDiscussion.replies} Answers
                   </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '2rem 0 1rem' }}>Answers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedDiscussion.answers.map((ans, idx) => (
                  <div key={idx} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E5E7EB', position: 'relative' }}>
                    {ans.isBest && (
                      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon name="checkCircle" size={12} color="#059669" /> Best Answer
                      </div>
                    )}
                    <div style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{ans.author}</div>
                    <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.5, margin: '0 0 1rem' }}>{ans.content}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontWeight: 700 }}>
                      <Icon name="arrowUp" size={18} /> {ans.upvotes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Sidebar info? (Keep same sidebar or different) */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Header Section */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
               <Icon name="search" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search discussions, topics, or courses..." 
              style={{ width: '100%', padding: '14px 16px 14px 50px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', fontSize: '1rem' }}
              onFocus={(e) => e.target.style.borderColor = '#F97316'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            style={{ 
              background: '#F97316', color: 'white', border: 'none', padding: '14px 24px', 
              borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
             <Icon name="plus" size={20} /> Ask Question
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          {['Trending', 'Latest', 'Unanswered', 'By Course'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '10px 20px', borderRadius: '24px', fontSize: '0.9rem', fontWeight: 700, border: 'none',
                cursor: 'pointer', transition: 'all 0.2s',
                background: filter === tab ? '#F97316' : '#F3F4F6',
                color: filter === tab ? 'white' : '#374151'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
          
          {/* Main Feed Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {discussions.map(post => (
              <div 
                key={post.id} 
                onClick={() => setSelectedDiscussion(post)}
                style={{ 
                  background: 'white', borderRadius: '14px', padding: '1.5rem', 
                  border: '1px solid #E5E7EB', cursor: 'pointer', transition: 'transform 0.2s' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                    {post.user.avatar}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>{post.user.name}</div>
                  {post.user.badge && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F97316', background: '#FFF7ED', padding: '2px 8px', borderRadius: '12px' }}>
                      {post.user.badge}
                    </span>
                  )}
                  <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>• {post.time}</span>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{post.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#6B7280', margin: '0 0 1rem', lineHeight: 1.5 }}>{post.preview}</p>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderTop: '1px solid #F3F4F6', paddingTop: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '0.85rem', fontWeight: 750 }}>
                      <Icon name="arrowUp" size={16} /> {post.upvotes}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '0.85rem', fontWeight: 750 }}>
                      <Icon name="messageSquare" size={16} /> {post.replies} Replies
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '0.85rem', fontWeight: 750 }}>
                      <Icon name="eye" size={16} /> {post.views} Views
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar Section */}
          <div>
            {/* Trending Topics */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 800, color: '#111827' }}>Trending Topics</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {trendingTopics.map(tag => (
                  <span key={tag} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '6px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 800, color: '#111827' }}>Top Contributors</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {contributors.map(user => (
                  <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F3F4F6', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {user.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 750, color: '#111827' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Score: {user.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 800, color: '#111827' }}>Related Courses</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Mastering Next.js', 'UI/UX Design Systems'].map(course => (
                  <div key={course} style={{ padding: '12px', border: '1px solid #F3F4F6', borderRadius: '10px', background: '#F9FAFB', fontSize: '0.9rem', fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', width: '500px', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Ask a Question</h3>
               <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                 <Icon name="x" size={24} />
               </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Title</label>
                <input type="text" placeholder="Be specific about your question" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Description</label>
                <textarea rows={4} placeholder="Include details for better answers..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none', resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Tags</label>
                <input type="text" placeholder="e.g. Next.js, React" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none' }} />
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: '#F97316', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', marginTop: '1rem' }}
              >
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
