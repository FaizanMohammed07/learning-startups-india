'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscussionsPage() {
  const [activePostId, setActivePostId] = useState(null);

  const initialPosts = [
    {
      id: 1,
      user: 'Faizan Mohammed',
      time: '2h ago',
      content: "Looking for recommendations for a solid boilerplate for a Next.js + Stripe SaaS. Any favorites that aren't too bloated?",
      category: 'Tech Stack',
      likes: 24,
      replies: [
        { id: 101, user: 'Arjun R.', time: '1h ago', content: 'Check out ShipFast or T3 Stack. Both are lean and specific.', avatar: 'AR' }
      ],
      avatar: 'FM'
    },
    {
      id: 2,
      user: 'Sarah Chen',
      time: '5h ago',
      content: 'Just closed our first angel check! 🎈 The key was focusing on the problem intensity rather than the feature set during the pitch.',
      category: 'Fundraising',
      likes: 142,
      replies: [],
      avatar: 'SC'
    }
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [filterByYourPosts, setFilterByYourPosts] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      user: 'You',
      time: 'Just now',
      content: newPostText,
      category: 'Global',
      likes: 0,
      replies: [],
      avatar: 'ME'
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleAddReply = (postId, text) => {
    if (!text.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, { id: Date.now(), user: 'You', time: 'Just now', content: text, avatar: 'ME' }]
        };
      }
      return p;
    }));
  };

  const filteredPosts = useMemo(() => {
    if (filterByYourPosts) {
      return posts.filter(p => p.user === 'You');
    }
    return posts;
  }, [posts, filterByYourPosts]);

  return (
    <div className="platform-page discussions-page">
      
      {/* ── 1. SIDEBAR (COMMUNITIES) ── */}
      <aside className="communities-sidebar">
        <header className="sidebar-header">
            <h2 className="sidebar-title">Global Channels</h2>
        </header>

        <div className="sidebar-content custom-scrollbar">
            <div className="community-categories">
                <button className={`category-btn ${!filterByYourPosts ? 'active' : ''}`}>
                    <Icon name="globe" size={18} color={!filterByYourPosts ? '#ef4444' : '#94a3b8'} stroke={3} />
                    <span className="category-label">Main Feed</span>
                </button>
                <button className="category-btn secondary">
                    <Icon name="rocket" size={18} color="#94a3b8" stroke={2.5} />
                    <span className="category-label">Venture Capital</span>
                </button>
                <button className="category-btn secondary">
                    <Icon name="tool" size={18} color="#94a3b8" stroke={2.5} />
                    <span className="category-label">Tech Stack</span>
                </button>
                <button className="category-btn secondary">
                    <Icon name="trendingUp" size={18} color="#94a3b8" stroke={2.5} />
                    <span className="category-label">Growth Hacks</span>
                </button>
            </div>
        </div>
      </aside>

      {/* ── 2. MAIN FEED ── */}
      <main className="discussions-main">
        
        {/* FEED HEADER */}
        <header className="feed-header">
          <div className="feed-header-left">
            <h3 className="feed-title">Global Feed</h3>
            <p className="feed-subtitle">Networking with the top founders.</p>
          </div>
          <div className="feed-actions">
            <button 
                onClick={() => setFilterByYourPosts(!filterByYourPosts)}
                className={`filter-posts-btn ${filterByYourPosts ? 'active' : ''}`}
            >
                {filterByYourPosts ? 'ALL POSTS' : 'MY POSTS'}
            </button>
            <button className="create-post-mobile-trigger">
                <Icon name="edit" size={18} color="#fff" stroke={3} />
            </button>
          </div>
        </header>

        {/* POSTS AREA */}
        <div className="posts-container custom-scrollbar">
          <div className="posts-stack">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-user-info">
                  <div className="post-avatar">{post.avatar}</div>
                  <div className="post-meta">
                    <div className="user-header">
                      <h4 className="user-name">{post.user}</h4>
                      <span className="post-tick">{post.time}</span>
                    </div>
                    <div className="post-category">{post.category}</div>
                  </div>
                </div>
                
                <p className="post-body">{post.content}</p>
                
                <div className="post-actions">
                  <button className="action-btn">
                    <Icon name="heart" size={18} stroke={post.likes > 0 ? 3 : 2} color={post.likes > 0 ? '#ef4444' : '#94a3b8'} /> 
                    <span className={`action-val ${post.likes > 0 ? 'red' : ''}`}>{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
                    className={`action-btn ${activePostId === post.id ? 'active' : ''}`}
                  >
                    <Icon name="messageSquare" size={18} stroke={2.5} /> 
                    <span className="action-val">{post.replies.length}</span>
                  </button>
                  <button className="action-btn-share">
                    <Icon name="share2" size={18} stroke={2.5} />
                  </button>
                </div>

                {/* REPLIES SECTION */}
                <AnimatePresence>
                  {activePostId === post.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden', marginTop: '1.5rem' }}
                    >
                      <div className="replies-wrapper">
                        {post.replies.map(r => (
                          <div key={r.id} className="reply-item">
                            <div className="reply-avatar">{r.avatar}</div>
                            <div className="reply-bubble">
                              <div className="reply-header">
                                <span className="reply-user">{r.user}</span>
                                <span className="reply-time">{r.time}</span>
                              </div>
                              <p className="reply-text">{r.content}</p>
                            </div>
                          </div>
                        ))}
                        
                        {/* REPLY INPUT */}
                        <div className="reply-input-row">
                          <div className="reply-me-avatar">ME</div>
                          <div className="reply-input-box">
                            <input 
                              type="text" 
                              placeholder="Add a reply..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddReply(post.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              className="reply-field"
                            />
                            <div className="reply-send-icon">
                                <Icon name="send" size={12} color="#ef4444" stroke={3} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* NEW POST INPUT AREA */}
        <footer className="footer-input">
          <div className="input-pill">
            <div className="plus-icon">
              <Icon name="plus" size={20} color="#94a3b8" stroke={2.5} />
            </div>
            <input 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreatePost(); }}
                placeholder="Share your thoughts with the community..." 
                className="main-input"
            />
            <div className="input-actions">
              <Icon name="smile" size={20} color="#94a3b8" pointer />
              <div 
                onClick={handleCreatePost}
                className="send-btn"
              >
                <Icon name="send" size={16} color="#fff" stroke={3} />
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .discussions-page { display: flex; background: #fff; overflow: hidden; height: calc(100vh - 4.5rem); font-family: 'Poppins', sans-serif; }
        
        .communities-sidebar { width: 300px; background: #fcfdfe; border-right: 1.5px solid #f1f5f9; display: flex; flex-direction: column; height: 100%; transition: all 0.3s; }
        .sidebar-header { padding: 2.5rem 2rem; border-bottom: 1px solid #f8fafc; }
        .sidebar-title { font-size: 1.4rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.03em; }
        .sidebar-content { flex: 1; padding: 2rem 1rem; overflow-y: auto; }
        .community-categories { display: flex; flex-direction: column; gap: 8px; }
        .category-btn { display: flex; align-items: center; gap: 14px; padding: 14px 20px; border: none; background: transparent; color: #64748b; border-radius: 20px; cursor: pointer; transition: all 0.25s; font-size: 0.95rem; font-weight: 950; text-align: left; }
        .category-btn.active { background: #fff; color: #ef4444; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1.5px solid #fef2f2; }
        .category-btn.secondary { font-weight: 750; color: #94a3b8; }
        .category-btn:hover { background: #fef2f2; color: #ef4444; }

        .discussions-main { flex: 1; background: #fff; display: flex; flex-direction: column; min-width: 0; }
        .feed-header { padding: 1.5rem 3rem; border-bottom: 1.5px solid #f8fafc; display: flex; justify-content: space-between; align-items: center; background: #fff; }
        .feed-title { margin: 0; font-size: 1.5rem; font-weight: 950; color: #0f172a; letter-spacing: -0.02em; }
        .feed-subtitle { margin: 2px 0 0; font-size: 0.85rem; color: #94a3b8; font-weight: 750; }
        
        .feed-actions { display: flex; gap: 16px; align-items: center; }
        .filter-posts-btn { padding: 10px 20px; border-radius: 14px; border: 1.5px solid #f1f5f9; background: #fff; color: #64748b; font-size: 0.8rem; font-weight: 950; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .filter-posts-btn.active { border-color: #ef4444; background: #fef2f2; color: #ef4444; }
        .create-post-mobile-trigger { display: none; background: #ef4444; border: none; width: 44px; height: 44px; border-radius: 14px; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25); }

        .posts-container { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; background: #fff; }
        .posts-stack { display: flex; flex-direction: column; gap: 2rem; max-width: 900px; margin: 0 auto; }
        .post-card { background: #fff; border-radius: 36px; padding: 2.5rem; border: 1.5px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.01); }
        .post-user-info { display: flex; gap: 20px; margin-bottom: 1.75rem; }
        .post-avatar { width: 52px; height: 52px; border-radius: 18px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 1.25rem; border: 1.5px solid #f1f5f9; }
        .user-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .user-name { margin: 0; font-size: 1.15rem; font-weight: 950; color: #0f172a; }
        .post-tick { font-size: 0.8rem; color: #cbd5e1; font-weight: 800; }
        .post-category { font-size: 0.75rem; color: #ef4444; font-weight: 950; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
        .post-body { font-size: 1.05rem; color: #334155; line-height: 1.7; font-weight: 650; margin: 0 0 2rem; }
        
        .post-actions { display: flex; gap: 3rem; border-top: 1.5px solid #f8fafc; padding-top: 2rem; align-items: center; }
        .action-btn { display: flex; align-items: center; gap: 10px; border: none; background: transparent; color: #94a3b8; font-size: 0.95rem; font-weight: 950; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover { color: #ef4444; }
        .action-val.red { color: #ef4444; }
        .action-btn-share { margin-left: auto; background: transparent; border: none; cursor: pointer; color: #94a3b8; transition: transform 0.2s; }
        .action-btn-share:hover { color: #ef4444; transform: scale(1.1); }

        .replies-wrapper { display: flex; flex-direction: column; gap: 1.25rem; padding-left: 3rem; border-left: 3px solid #fef2f2; margin-top: 0.5rem; }
        .reply-item { display: flex; gap: 16px; align-items: flex-start; }
        .reply-avatar { width: 32px; height: 32px; border-radius: 10px; background: #f8fafc; color: #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 950; border: 1.5px solid #f1f5f9; flex-shrink: 0; }
        .reply-bubble { flex: 1; background: #f8fafc; padding: 14px 18px; border-radius: 20px; border: 1.5px solid #f1f5f9; }
        .reply-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .reply-user { font-size: 0.85rem; font-weight: 950; color: #0f172a; }
        .reply-time { font-size: 0.7rem; color: #cbd5e1; font-weight: 800; }
        .reply-text { margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.6; font-weight: 700; }
        
        .reply-input-row { display: flex; gap: 16px; align-items: center; margin-top: 0.5rem; }
        .reply-me-avatar { width: 32px; height: 32px; border-radius: 10px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 950; flex-shrink: 0; }
        .reply-input-box { flex: 1; position: relative; }
        .reply-field { width: 100%; padding: 12px 44px 12px 18px; border-radius: 16px; border: 1.5px solid #f1f5f9; background: #fff; font-size: 0.85rem; font-weight: 750; color: #0f172a; outline: none; transition: border-color 0.2s; }
        .reply-field:focus { border-color: #ef4444; }
        .reply-send-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); }

        .footer-input { padding: 1.5rem 3rem; border-top: 1.5px solid #f8fafc; background: #fff; }
        .input-pill { background: #f8fafc; border-radius: 28px; padding: 8px 12px; display: flex; align-items: center; border: 1.5px solid #f1f5f9; max-width: 900px; margin: 0 auto; transition: all 0.3s; }
        .input-pill:focus-within { background: #fff; border-color: #ef4444; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.08); }
        .plus-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
        .plus-icon:hover { background: #f1f5f9; }
        .main-input { flex: 1; background: transparent; border: none; padding: 0 20px; font-size: 1rem; font-weight: 750; color: #0f172a; outline: none; }
        .input-actions { display: flex; align-items: center; gap: 14px; }
        .send-btn { width: 44px; height: 44px; border-radius: 16px; background: #ef4444; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25); transition: all 0.2s; }
        .send-btn:hover { transform: scale(1.05); background: #0f172a; }

        @media (max-width: 960px) {
          .communities-sidebar { display: none; }
          .discussions-page { flex-direction: column; overflow-y: auto; }
          .discussions-main { flex: none; width: 100%; height: auto; min-height: 100%; }
          .feed-header { padding: 5.5rem 1rem 1.5rem; position: sticky; top: 0; z-index: 200; background: #fff; border-bottom: 1.5px solid #f1f5f9; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
          .feed-title { font-size: 1.25rem; }
          .create-post-mobile-trigger { display: flex; }
          .posts-container { padding: 1.5rem; }
          .post-card { padding: 1.75rem; border-radius: 28px; }
          .post-body { font-size: 0.95rem; }
          .post-actions { gap: 1.5rem; justify-content: space-between; }
          .replies-wrapper { padding-left: 1.5rem; }
          .footer-input { padding: 1.5rem; position: sticky; bottom: 0; box-shadow: 0 -10px 30px rgba(0,0,0,0.03); }
          .input-pill { border-radius: 20px; }
          .main-input { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}
