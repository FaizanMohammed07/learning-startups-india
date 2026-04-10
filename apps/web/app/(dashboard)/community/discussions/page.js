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
    <div className="flex bg-white overflow-hidden" style={{ height: 'calc(100vh - 4.5rem)', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── 1. SIDEBAR (COMMUNITIES) ── */}
      <aside style={{ width: 280, background: '#f9fafb', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Communities</h2>
        </header>

        <div style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }} className="hide-scrollbar">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', border: 'none', background: !filterByYourPosts ? '#fff' : 'transparent', color: !filterByYourPosts ? '#ef4444' : '#64748b', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', fontWeight: 950, boxShadow: !filterByYourPosts ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}>
                    <Icon name="globe" size={16} color={!filterByYourPosts ? '#ef4444' : '#94a3b8'} stroke={3} />
                    Global Feed
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', border: 'none', background: 'transparent', color: '#64748b', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', fontWeight: 700 }} className="hover-bg">
                    <Icon name="rocket" size={16} color="#94a3b8" stroke={2.5} />
                    Venture Capital
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', border: 'none', background: 'transparent', color: '#64748b', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', fontWeight: 700 }} className="hover-bg">
                    <Icon name="tool" size={16} color="#94a3b8" stroke={2.5} />
                    Tech Stack
                </button>
            </div>
        </div>
      </aside>

      {/* ── 2. MAIN FEED ── */}
      <main style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
        
        {/* FEED HEADER */}
        <header style={{ padding: '1.25rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 950, color: '#0f172a' }}>Global Discussion</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 750 }}>Connecting the top 1% of upcoming founders.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
                onClick={() => setFilterByYourPosts(!filterByYourPosts)}
                style={{ 
                    padding: '8px 18px', borderRadius: '12px', border: filterByYourPosts ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0', 
                    background: filterByYourPosts ? '#fef2f2' : 'transparent', color: filterByYourPosts ? '#ef4444' : '#64748b', 
                    fontSize: '0.7rem', fontWeight: 950, cursor: 'pointer', transition: 'all 0.2s' 
                }}
            >
                {filterByYourPosts ? 'VIEWING YOUR POSTS' : 'YOUR POSTS'}
            </button>
            <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '12px', fontWeight: 950, fontSize: '0.75rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)', cursor: 'pointer' }}>CREATE POST</button>
          </div>
        </header>

        {/* POSTS AREA */}
        <div style={{ flex: 1, padding: '1.5rem 2.5rem', overflowY: 'auto' }} className="custom-scrollbar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredPosts.map(post => (
              <div key={post.id} style={{ background: '#fff', borderRadius: '24px', padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '1.25rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '14px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: '1rem' }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 950, color: '#0f172a' }}>{post.user}</h4>
                      <span style={{ fontSize: '0.65rem', color: '#cbd5e1', fontWeight: 800 }}>{post.time}</span>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 950, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '2px' }}>{post.category}</div>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, fontWeight: 700, margin: '0 0 1.5rem' }}>{post.content}</p>
                
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #f8fafc', paddingTop: '1.25rem' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer' }} className="hover-red">
                    <Icon name="heart" size={16} /> {post.likes}
                  </button>
                  <button 
                    onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', color: activePostId === post.id ? '#ef4444' : '#94a3b8', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer' }} 
                    className="hover-red"
                  >
                    <Icon name="messageSquare" size={16} /> {post.replies.length}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 950, cursor: 'pointer', marginLeft: 'auto' }} className="hover-red">
                    <Icon name="share" size={16} />
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '2.75rem', borderLeft: '2px solid #fef2f2' }}>
                        {post.replies.map(r => (
                          <div key={r.id} style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ width: 28, height: 28, borderRadius: '8px', background: '#f8fafc', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 950, border: '1px solid #f1f5f9' }}>{r.avatar}</div>
                            <div style={{ flex: 1, background: '#f8fafc', padding: '10px 14px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#0f172a' }}>{r.user}</span>
                                <span style={{ fontSize: '0.6rem', color: '#cbd5e1', fontWeight: 800 }}>{r.time}</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, fontWeight: 700 }}>{r.content}</p>
                            </div>
                          </div>
                        ))}
                        
                        {/* REPLY INPUT */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                          <div style={{ width: 28, height: 28, borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 950 }}>ME</div>
                          <div style={{ flex: 1, position: 'relative' }}>
                            <input 
                              type="text" 
                              placeholder="Add a reply..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddReply(post.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '12px', border: '1.5px solid #f1f5f9', background: '#fff', fontSize: '0.78rem', fontWeight: 750, color: '#0f172a', outline: 'none' }} 
                            />
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
        <footer style={{ padding: '1rem 2.5rem', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="plus" size={16} color="#94a3b8" />
            </div>
            <input 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreatePost(); }}
                placeholder="Share your thoughts with the community..." 
                style={{ flex: 1, background: 'transparent', border: 'none', padding: '0 10px', fontSize: '0.78rem', fontWeight: 750, color: '#0f172a', outline: 'none' }} 
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="smile" size={18} color="#94a3b8" pointer />
              <div 
                onClick={handleCreatePost}
                style={{ width: 32, height: 32, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}
              >
                <Icon name="send" size={14} color="#fff" stroke={2.5} />
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .hover-bg:hover { background: rgba(239, 68, 68, 0.05) !important; }
        .hover-red:hover { color: #ef4444 !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
