'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function GroupsPage() {
  const [view, setView] = useState('chat'); // 'chat' or 'expert-directory'
  const [activeChannel, setActiveChannel] = useState('marketing-growth');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasJoined, setHasJoined] = useState(true);
  const [messageText, setMessageText] = useState('');

  const [expertGroups, setExpertGroups] = useState([
    { id: 'Elite Founders', name: 'Elite Founders Circle', avatar: 'EF', members: '42', description: 'Curated group for Series A+ founders and veteran mentors.', host: 'Deepak S.' },
    { id: 'Venture Capital', name: 'Venture Capital Insider', avatar: 'VC', members: '150', description: 'Direct access to institutional investors and deal-flow discussions.', host: 'Sarah J.' },
    { id: 'Product Growth', name: 'Product Growth Masters', avatar: 'PG', members: '88', description: 'Deep dives into PLG, retention hacks, and scaling systems.', host: 'Alex K.' },
  ]);

  const [joinedGroupIds, setJoinedGroupIds] = useState(['marketing-growth', 'fundraising-qa', 'main-floor']);

  const yourTribesList = useMemo(() => [
    { id: 'marketing-growth', label: 'marketing-growth', icon: 'megaphone' },
    { id: 'fundraising-qa', label: 'fundraising-qa', icon: 'rocket' },
    { id: 'main-floor', label: 'main-floor', icon: 'grid' },
    { id: 'Elite Founders', label: 'elite-founders', icon: 'shield' },
    { id: 'Venture Capital', label: 'vc-insider', icon: 'briefcase' },
    { id: 'Product Growth', label: 'growth-masters', icon: 'trendingUp' },
  ], []);

  const joinedTribes = useMemo(() => yourTribesList.filter(t => joinedGroupIds.includes(t.id)), [joinedGroupIds, yourTribesList]);

  const [messages, setMessages] = useState([
    { id: 1, user: 'John Dorsey', time: '10:42 AM', content: "Has anyone tried the new LinkedIn collaborative articles for growth? We're seeing some interesting organic reach numbers but I'm curious about the conversion quality.", type: 'other', avatar: 'JD' },
    { id: 2, user: 'Sarah K.', time: '10:45 AM', content: "I've seen the same! It feels like LinkedIn is prioritizing those heavily in the algorithm right now. We managed to get a 'Top Voice' badge in a week by being consistent there.", type: 'other', avatar: 'SK' },
    { id: 3, user: 'You', time: '10:48 AM', content: "That's huge Sarah! We should definitely look into that for the 'Venture Flow' launch. @John, do you have any specific metrics on the conversion side yet? Even just soft leads?", type: 'me', avatar: 'ME' },
  ]);

  const founders = [
    { name: 'Marcus Thorne', role: 'Group Host', status: 'online', avatar: 'MT', isHost: true },
    { name: 'Lila Vance', role: 'Growth Strategist', status: 'online', avatar: 'LV' },
    { name: 'Erik Jenson', role: 'Solo Founder', status: 'offline', avatar: 'EJ' },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: messageText,
      type: 'me',
      avatar: 'ME'
    };
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleJoinGroup = (groupId) => {
    if (!joinedGroupIds.includes(groupId)) {
      setJoinedGroupIds([...joinedGroupIds, groupId]);
    }
    setActiveChannel(groupId);
    setView('chat');
    setHasJoined(true);
    setIsRightPanelOpen(true);
  };

  return (
    <div className="platform-page tribes-page">
      
      {/* ── 1. TRIBE CHANNELS SIDEBAR ── */}
      <aside className={`tribes-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <header className="sidebar-header">
            <h2 className="sidebar-title">COMMUNITY TRIBES</h2>
        </header>

        <div className="sidebar-content custom-scrollbar">
            
            {/* EXPLORE GROUPS BUTTON (TOP) */}
            <div className="explore-btn-box">
                <button 
                    onClick={() => { setView('expert-directory'); setIsSidebarOpen(false); }}
                    className={`explore-nav-btn ${view === 'expert-directory' ? 'active' : ''}`}
                >
                    <Icon name="search" size={18} color="#fff" stroke={3} />
                    <span>EXPLORE TRIBES</span>
                </button>
            </div>

            {/* MY TRADES SECTION (PRIMARY) */}
            <div className="sidebar-section">
                <div className="section-label">MY TRADES</div>
                <div className="channel-stack">
                    {joinedTribes.map(ch => (
                        <button 
                            key={ch.id}
                            onClick={() => {
                                setView('chat');
                                setActiveChannel(ch.id);
                                setHasJoined(true);
                                setIsSidebarOpen(false);
                            }}
                            className={`channel-btn ${view === 'chat' && activeChannel === ch.id ? 'active' : ''}`}
                        >
                            <div className="channel-avatar">
                                <Icon name={ch.icon || 'messageSquare'} size={14} />
                            </div>
                            <div className="channel-label-group">
                                <span className="channel-label">{ch.label}</span>
                                <span className="channel-mem-count">24 members</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </aside>

      {/* ── 2. MAIN AREA ── */}
      <main className="tribes-main">
        
        {view === 'chat' ? (
            <>
                {/* CHAT HEADER */}
                <header className="chat-header">
                    <div className="chat-header-left">
                        <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
                            <Icon name="menu" size={24} color="#0f172a" stroke={3} />
                        </button>
                        <div className="header-channel-box">
                            <div className="channel-icon-pill">{activeChannel.charAt(0).toUpperCase()}</div>
                            <div 
                                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                                className="channel-info"
                            >
                                <h3 className="channel-name">#{activeChannel}</h3>
                                <div className="channel-meta">
                                    <span className="host-name">Marcus Thorne</span>
                                    <span className="meta-sep">/</span>
                                    <span>24 high-performers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* FEED AREA */}
                <div className="chat-feed custom-scrollbar">
                    {messages.map((m) => (
                        <div key={m.id} className={`message-row ${m.type === 'me' ? 'me' : 'other'}`}>
                            <div className="message-header">
                                {m.type === 'other' && (
                                    <div className="message-avatar">{m.avatar}</div>
                                )}
                                <span className="message-user">{m.user}</span>
                                <span className="message-time">{m.time}</span>
                            </div>
                            
                            <div className="message-bubble">
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {/* Spacer for sticky footer */}
                    <div style={{ height: '20px' }} />
                </div>

                {/* INPUT AREA */}
                <footer className="chat-footer">
                    <div className="input-pill">
                        <div className="plus-btn">
                            <Icon name="plus" size={20} color="#94a3b8" stroke={2.5} />
                        </div>
                        <input 
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                            placeholder={`Message #${activeChannel}...`} 
                            className="chat-input"
                        />
                        <div className="input-actions">
                            <Icon name="smile" size={20} color="#94a3b8" pointer />
                            <div 
                                onClick={handleSendMessage}
                                className="send-momentum-btn"
                            >
                                <Icon name="send" size={16} color="#fff" stroke={3} />
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        ) : (
            /* POPULAR TRIBES DISCOVERY VIEW */
            <div className="explore-container">
                <header className="explore-header">
                     <button className="mobile-explore-back" onClick={() => setIsSidebarOpen(true)}>
                        <Icon name="arrowLeft" size={24} color="#0f172a" stroke={2.5} />
                     </button>
                     <div className="explore-text">
                        <h2 className="explore-title">Curated Tribes</h2>
                        <p className="explore-subtitle">Collaborate with the top 1% of specialized founders.</p>
                     </div>
                </header>
                
                <div className="explore-grid custom-scrollbar">
                    {expertGroups.map(group => (
                        <div key={group.id} className="explore-card">
                            <div className="card-gradient-top">
                                <div className="card-avatar-box">{group.avatar}</div>
                                <div className="card-members-badge">{group.members} Members</div>
                            </div>
                            <div className="card-body">
                                <h3 className="card-name">{group.name}</h3>
                                <p className="card-desc">{group.description}</p>
                                <button 
                                    onClick={() => handleJoinGroup(group.id)}
                                    className={`join-tribe-btn ${joinedGroupIds.includes(group.id) ? 'joined' : ''}`}
                                >
                                    {joinedGroupIds.includes(group.id) ? 'VIEW CHANNEL' : 'JOIN TRIBE'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>

      {/* ── 3. DYNAMIC CONTEXT PANEL ── */}
      <AnimatePresence>
        {isRightPanelOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="context-panel"
          >
            <div className="panel-inner custom-scrollbar">
                <div className="context-box">
                    <h4 className="context-label">ABOUT THIS TRIBE</h4>
                    <p className="context-text">
                        A high-fidelity environment engineered for strategic high-level discussions among verified industry pioneers.
                    </p>
                </div>

                <div className="membership-box">
                    <div className="context-label">VERIFIED BUILDERS</div>
                    <div className="founders-stack">
                        {founders.map(f => (
                            <div key={f.name} className="founder-item">
                                <div className={`founder-avatar ${f.isHost ? 'is-host' : f.status}`}>
                                    {f.avatar}
                                    {f.status === 'online' && !f.isHost && <div className="status-dot-green" />}
                                    {f.isHost && <div className="host-badge"><Icon name="star" size={8} color="#fff" stroke={3} /></div>}
                                </div>
                                <div className="founder-meta">
                                    <h5 className="founder-name">{f.name}</h5>
                                    <p className="founder-role">{f.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button 
                  onClick={() => setIsRightPanelOpen(false)}
                  className="close-panel-btn"
                >
                    CLOSE PANEL
                </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .tribes-page { display: flex; background: #fff; overflow: hidden; height: calc(100vh - 4.5rem); font-family: 'Poppins', sans-serif; }
        
        .tribes-sidebar { width: 300px; background: #fcfdfe; border-right: 1.5px solid #f1f5f9; display: flex; flex-direction: column; height: 100%; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; }
        .sidebar-header { padding: 2.5rem 2rem; border-bottom: 1px solid #f8fafc; }
        .sidebar-title { font-size: 0.85rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: 0.1em; }
        .sidebar-content { flex: 1; padding: 2rem 1.25rem; overflow-y: auto; }
        
        .explore-btn-box { margin-bottom: 2.5rem; }
        .explore-nav-btn { width: 100%; display: flex; align-items: center; gap: 14px; padding: 16px 20px; border: none; background: #ef4444; color: #fff; border-radius: 18px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem; font-weight: 950; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2); }
        .explore-nav-btn.active { background: #0f172a; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2); }
        .explore-nav-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(239, 68, 68, 0.3); }

        .sidebar-section { margin-bottom: 3rem; }
        .section-label { font-size: 0.7rem; font-weight: 950; color: #94a3b8; letter-spacing: 0.15em; padding: 0 1.25rem; margin-bottom: 1.5rem; }
        .channel-stack { display: flex; flex-direction: column; gap: 6px; }
        .channel-btn { display: flex; align-items: center; gap: 14px; padding: 12px 18px; border: none; background: transparent; border-radius: 16px; cursor: pointer; transition: all 0.2s; color: #64748b; }
        .channel-btn:hover { background: #fef2f2; color: #ef4444; }
        .channel-btn.active { background: #fff; color: #ef4444; box-shadow: 0 10px 25px rgba(0,0,0,0.04); border: 1.5px solid #fef2f2; }
        .channel-avatar { width: 32px; height: 32px; border-radius: 10px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 950; border: 1.5px solid #f1f5f9; flex-shrink: 0; }
        .channel-label-group { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
        .channel-label { font-size: 0.9rem; font-weight: 850; letter-spacing: -0.01em; }
        .channel-mem-count { font-size: 0.65rem; color: #94a3b8; font-weight: 700; }
        
        .tribes-main { flex: 1; background: #fff; display: flex; flex-direction: column; min-width: 0; }
        .chat-header { padding: 1rem 2.5rem; border-bottom: 1.5px solid #f8fafc; background: #fff; display: flex; align-items: center; z-index: 10; }
        .chat-header-left { display: flex; align-items: center; gap: 20px; width: 100%; }
        .mobile-menu-btn { display: none; background: transparent; border: none; cursor: pointer; padding: 8px; border-radius: 12px; transition: background 0.2s; }
        .mobile-menu-btn:hover { background: #f8fafc; }
        .header-channel-box { display: flex; align-items: center; gap: 16px; cursor: pointer; }
        .channel-icon-pill { width: 44px; height: 44px; border-radius: 14px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 1.2rem; border: 1.5px solid #f1f5f9; }
        .channel-name { margin: 0; font-size: 1.15rem; font-weight: 950; color: #0f172a; letter-spacing: -0.02em; }
        .channel-meta { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; color: #94a3b8; font-weight: 850; margin-top: 4px; }
        .host-name { color: #ef4444; }
        .meta-sep { opacity: 0.3; }

        .chat-feed { flex: 1; padding: 2.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 2rem; background: #fff; }
        .message-row { display: flex; flex-direction: column; max-width: 85%; }
        .message-row.me { align-self: flex-end; align-items: flex-end; }
        .message-row.other { align-self: flex-start; align-items: flex-start; }
        .message-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .message-avatar { width: 28px; height: 28px; border-radius: 8px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 950; border: 1.5px solid #f1f5f9; }
        .message-user { font-size: 0.85rem; font-weight: 950; color: #0f172a; }
        .message-row.me .message-user { color: #ef4444; }
        .message-time { font-size: 0.7rem; color: #cbd5e1; font-weight: 800; }
        .message-bubble { padding: 1.25rem 1.75rem; border-radius: 28px; font-size: 1rem; font-weight: 650; line-height: 1.6; }
        .message-row.me .message-bubble { background: #0f172a; color: #fff; border-bottom-right-radius: 6px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12); }
        .message-row.other .message-bubble { background: #f8fafc; color: #334155; border-bottom-left-radius: 6px; border: 1.5px solid #f1f5f9; }

        .chat-footer { padding: 1.5rem 2.5rem; border-top: 1.5px solid #f8fafc; background: #fff; z-index: 100; }
        .input-pill { background: #f8fafc; border-radius: 32px; padding: 8px 12px; display: flex; align-items: center; border: 1.5px solid #f1f5f9; max-width: 1000px; margin: 0 auto; transition: all 0.3s; }
        .input-pill:focus-within { background: #fff; border-color: #ef4444; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.08); }
        .plus-btn { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; border-radius: 50%; }
        .plus-btn:hover { background: #f1f5f9; }
        .chat-input { flex: 1; background: transparent; border: none; padding: 0 20px; font-size: 1rem; font-weight: 750; color: #0f172a; outline: none; }
        .input-actions { display: flex; align-items: center; gap: 14px; }
        .send-momentum-btn { width: 44px; height: 44px; border-radius: 16px; background: #ef4444; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25); transition: all 0.2s; }
        .send-momentum-btn:hover { transform: scale(1.05); background: #0f172a; }

        .explore-container { flex: 1; padding: 3rem; overflow-y: auto; background: #fcfdfe; display: flex; flex-direction: column; }
        .explore-header { margin-bottom: 3rem; display: flex; align-items: center; gap: 24px; }
        .mobile-explore-back { display: none; background: transparent; border: none; cursor: pointer; padding: 8px; border-radius: 12px; transition: background 0.2s; }
        .explore-title { font-size: 2.5rem; font-weight: 950; color: #0f172a; margin: 0; letter-spacing: -0.04em; }
        .explore-subtitle { color: #94a3b8; font-weight: 750; font-size: 1.1rem; margin-top: 8px; }
        
        .explore-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 2rem; }
        .explore-card { background: #fff; border-radius: 40px; border: 1.5px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.015); overflow: hidden; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .explore-card:hover { transform: translateY(-10px); border-color: #ef4444; box-shadow: 0 30px 60px rgba(239, 68, 68, 0.08); }
        .card-gradient-top { height: 120px; background: linear-gradient(135deg, #fef2f2 0%, #fff 100%); padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .card-avatar-box { width: 56px; height: 56px; border-radius: 18px; background: #fff; color: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 1.4rem; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.1); border: 1.5px solid #fef2f2; }
        .card-members-badge { font-size: 0.75rem; font-weight: 950; color: #94a3b8; background: #fff; padding: 8px 14px; border-radius: 12px; border: 1.5px solid #f1f5f9; }
        .card-body { padding: 2.5rem 2rem; text-align: left; }
        .card-name { font-size: 1.3rem; font-weight: 950; color: #0f172a; margin: 0 0 12px; letter-spacing: -0.01em; }
        .card-desc { font-size: 0.95rem; color: #64748b; margin-bottom: 2.5rem; line-height: 1.6; font-weight: 650; min-height: 48px; }
        .join-tribe-btn { width: 100%; background: #0f172a; color: #fff; border: none; padding: 18px; border-radius: 20px; font-size: 0.9rem; font-weight: 950; cursor: pointer; transition: all 0.3s; }
        .join-tribe-btn.joined { background: #f1f5f9; color: #cbd5e1; cursor: default; }
        .explore-card:hover .join-tribe-btn:not(.joined) { background: #ef4444; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.25); }

        .context-panel { background: #fcfdfe; display: flex; flex-direction: column; height: 100%; border-left: 1.5px solid #f1f5f9; box-shadow: -10px 0 40px rgba(0,0,0,0.02); }
        .panel-inner { min-width: 340px; padding: 3rem 2rem; overflow-y: auto; }
        .context-label { font-size: 0.7rem; font-weight: 950; color: #94a3b8; letter-spacing: 0.15em; margin-bottom: 1.75rem; }
        .context-box { background: #fff; border-radius: 28px; padding: 2rem; border: 1.5px solid #f1f5f9; margin-bottom: 2.5rem; }
        .context-text { font-size: 0.95rem; color: #475569; line-height: 1.7; font-weight: 650; margin: 0; }
        .membership-box { margin-bottom: 3rem; }
        .founders-stack { display: flex; flex-direction: column; gap: 1.5rem; }
        .founder-item { display: flex; align-items: center; gap: 16px; }
        .founder-avatar { width: 44px; height: 44px; border-radius: 14px; background: #f1f5f9; color: #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 950; position: relative; border: 1.5px solid #fff; }
        .founder-avatar.online { background: #f0fdf4; color: #10b981; }
        .founder-avatar.is-host { background: #fef2f2; color: #ef4444; }
        .status-dot-green { position: absolute; right: -2px; bottom: -2px; width: 12px; height: 12px; border-radius: 50%; background: #10b981; border: 3px solid #fcfdfe; }
        .host-badge { position: absolute; right: -6px; top: -6px; width: 22px; height: 22px; background: #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 3px solid #fcfdfe; }
        .founder-meta { flex: 1; }
        .founder-name { margin: 0; font-size: 0.95rem; font-weight: 950; color: #0f172a; }
        .founder-role { margin: 2px 0 0; font-size: 0.75rem; color: #94a3b8; font-weight: 800; }
        .close-panel-btn { width: 100%; padding: 16px; border-radius: 16px; border: 1.5px solid #f1f5f9; background: #fff; color: #64748b; font-weight: 950; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; }
        .close-panel-btn:hover { background: #fef2f2; color: #ef4444; border-color: #fef2f2; }

        @media (max-width: 1050px) {
           .tribes-sidebar { position: fixed; left: 0; top: 0; bottom: 0; transform: translateX(-100%); width: 300px; z-index: 1001; box-shadow: 20px 0 80px rgba(0,0,0,0.15); }
           .tribes-sidebar.open { transform: translateX(0); }
           .mobile-menu-btn, .mobile-explore-back { display: flex; }
           .explore-container { padding: 5rem 1.5rem 6rem; }
           .explore-grid { grid-template-columns: 1fr; }
           .chat-header { padding: 5.5rem 1rem 1rem; position: sticky; top: 0; z-index: 200; background: #fff; border-bottom: 1.5px solid #f1f5f9; }
           .chat-footer { padding: 1rem; position: sticky; bottom: 0; border-top: 1.5px solid #f1f5f9; }
           .input-pill { padding: 6px 10px; }
           .chat-input { padding: 0 12px; font-size: 0.95rem; }
           .explore-title { font-size: 2rem; }
           .context-panel { display: none; }
           .chat-feed { padding: 1.5rem; }
           .message-bubble { font-size: 0.9rem; padding: 1rem 1.25rem; }
           .chat-footer { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
