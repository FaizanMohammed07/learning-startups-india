'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function GroupsPage() {
  const [view, setView] = useState('chat'); // 'chat' or 'expert-directory'
  const [activeChannel, setActiveChannel] = useState('marketing-growth');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
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
    { id: 'main-floor', label: 'main-floor', icon: 'hash' },
    { id: 'Elite Founders', label: 'elite-founders', icon: 'star' },
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
    <div className="flex bg-white overflow-hidden" style={{ height: 'calc(100vh - 4.5rem)', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── 1. TRIBE CHANNELS SIDEBAR ── */}
      <aside style={{ width: 280, background: '#f9fafb', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Tribe Channels</h2>
        </header>

        <div style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }} className="hide-scrollbar">
            
            {/* EXPLORE GROUPS BUTTON (TOP) */}
            <div style={{ marginBottom: '2rem' }}>
                <button 
                    onClick={() => setView('expert-directory')}
                    style={{ 
                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', 
                        border: 'none', background: view === 'expert-directory' ? '#0f172a' : '#ef4444',
                        color: '#fff', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s',
                        fontSize: '0.85rem', fontWeight: 950,
                        boxShadow: '0 8px 20px rgba(239, 68, 68, 0.2)'
                    }}
                >
                    <Icon name="search" size={16} color="#fff" stroke={3} />
                    EXPLORE TRIBES
                </button>
            </div>

            {/* EXPERT GROUPS SECTION (PROMINENT AT TOP) */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.12em', padding: '0 1rem', marginBottom: '1.25rem' }}>EXPERT GROUPS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {expertGroups.map(group => (
                        <button 
                            key={group.id}
                            onClick={() => {
                                setView('expert-directory');
                                setHasJoined(joinedGroupIds.includes(group.id));
                                setIsRightPanelOpen(false);
                            }}
                            style={{ 
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', 
                                border: 'none', background: (view === 'expert-directory' && !joinedGroupIds.includes(group.id)) ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                                fontSize: '0.8rem', fontWeight: 700, color: (view === 'expert-directory' && !joinedGroupIds.includes(group.id)) ? '#ef4444' : '#64748b'
                            }}
                            className="hover-bg"
                        >
                            <div style={{ width: 24, height: 24, borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 950 }}>{group.avatar}</div>
                            {group.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* YOUR GROUPS SECTION */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.12em', padding: '0 1rem', marginBottom: '1.25rem' }}>YOUR GROUPS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {joinedTribes.map(ch => (
                        <button 
                            key={ch.id}
                            onClick={() => {
                                setView('chat');
                                setActiveChannel(ch.id);
                                setHasJoined(true);
                            }}
                            style={{ 
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', 
                                border: 'none', background: (view === 'chat' && activeChannel === ch.id) ? '#fff' : 'transparent',
                                borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s',
                                fontSize: '0.8rem', fontWeight: (view === 'chat' && activeChannel === ch.id) ? 900 : 700,
                                color: (view === 'chat' && activeChannel === ch.id) ? '#ef4444' : '#64748b',
                                boxShadow: (view === 'chat' && activeChannel === ch.id) ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                            }}
                        >
                            <Icon name={ch.icon} size={14} color={(view === 'chat' && activeChannel === ch.id) ? '#ef4444' : '#94a3b8'} stroke={2.5} />
                            {ch.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </aside>

      {/* ── 2. MAIN AREA ── */}
      <main style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
        
        {view === 'chat' ? (
            <>
                {/* CHAT HEADER */}
                <header 
                    onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                    style={{ padding: '0.85rem 2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    className="hover-header"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: '0.9rem' }}>{activeChannel.charAt(0).toUpperCase()}</div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>{activeChannel}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', color: '#94a3b8', fontWeight: 850, marginTop: '2px' }}>
                                <span style={{ color: '#ef4444' }}>Host: Marcus Thorne</span>
                                <span>• 24 members</span>
                                <span style={{ color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', opacity: 0.8 }}>view all members</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* FEED AREA */}
                <div style={{ flex: 1, padding: '1.25rem 2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="custom-scrollbar">
                    {messages.map((m) => (
                        <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'me' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                {m.type === 'other' && (
                                    <div style={{ width: 24, height: 24, borderRadius: '6px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 950 }}>{m.avatar}</div>
                                )}
                                <span style={{ fontSize: '0.7rem', fontWeight: 950, color: m.type === 'me' ? '#ef4444' : '#0f172a' }}>{m.user}</span>
                                <span style={{ fontSize: '0.6rem', color: '#cbd5e1', fontWeight: 700 }}>{m.time}</span>
                            </div>
                            
                            <div style={{ 
                                maxWidth: '75%', padding: '0.85rem 1rem', borderRadius: '16px',
                                background: m.type === 'me' ? '#ef4444' : '#f8fafc',
                                color: m.type === 'me' ? '#fff' : '#475569',
                                fontWeight: 650, fontSize: '0.78rem', lineHeight: 1.5,
                                borderBottomRightRadius: m.type === 'me' ? '4px' : '16px',
                                borderBottomLeftRadius: m.type === 'other' ? '4px' : '16px',
                                boxShadow: m.type === 'me' ? '0 6px 20px rgba(239, 68, 68, 0.1)' : 'none',
                                border: m.type === 'other' ? '1px solid #f1f5f9' : 'none'
                            }}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* INPUT AREA */}
                <footer style={{ padding: '1rem 2.5rem', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Icon name="plus" size={16} color="#94a3b8" />
                        </div>
                        <input 
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                            placeholder={`Message #${activeChannel}`} 
                            style={{ flex: 1, background: 'transparent', border: 'none', padding: '0 10px', fontSize: '0.78rem', fontWeight: 750, color: '#0f172a', outline: 'none' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Icon name="smile" size={18} color="#94a3b8" pointer />
                            <div 
                                onClick={handleSendMessage}
                                style={{ width: 32, height: 32, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}
                            >
                                <Icon name="send" size={14} color="#fff" stroke={2.5} />
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        ) : (
            /* POPULAR TRIBES DISCOVERY VIEW */
            <div style={{ flex: 1, padding: '2.5rem 4rem', overflowY: 'auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>Popular Tribes</h2>
                    <p style={{ color: '#94a3b8', fontWeight: 750, marginTop: '6px', fontSize: '0.8rem' }}>Collaborate with the top 1% of founders and mentors.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {expertGroups.map(group => (
                        <div key={group.id} style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 950, marginBottom: '14px' }}>{group.avatar}</div>
                            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 950, color: '#0f172a' }}>{group.name}</h3>
                            <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '8px 0 14px', lineHeight: 1.5, fontWeight: 700 }}>{group.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8' }}>{group.members} Members</span>
                                <button 
                                    onClick={() => handleJoinGroup(group.id)}
                                    style={{ background: joinedGroupIds.includes(group.id) ? '#f1f5f9' : '#fef2f2', color: joinedGroupIds.includes(group.id) ? '#cbd5e1' : '#ef4444', border: 'none', padding: '6px 16px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 950, cursor: joinedGroupIds.includes(group.id) ? 'default' : 'pointer' }}
                                >
                                    {joinedGroupIds.includes(group.id) ? 'Already Joined' : 'Join Tribe'}
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
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            style={{ background: '#f9fafb', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
          >
            <div style={{ minWidth: 320, padding: '2rem 1.75rem', overflowY: 'auto' }} className="hide-scrollbar">
                
                {/* ABOUT BOX */}
                <div style={{ background: '#fff', borderRadius: '20px', padding: '1.25rem', border: '1px solid #f1f5f9', marginBottom: '1.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 950, color: '#0f172a', marginBottom: '10px' }}>About {activeChannel}</h4>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.55, fontWeight: 700 }}>
                        A premium environment for strategic high-level discussions among verified founders.
                    </p>
                </div>

                {/* FOUNDERS LIST */}
                <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 950, color: '#94a3b8', letterSpacing: '0.12em', padding: '0 0.25rem', marginBottom: '1.25rem' }}>FOUNDERS HERE</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {founders.map(f => (
                            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '10px', background: f.isHost ? '#fef2f2' : (f.status === 'online' ? '#f0fdf4' : '#f1f5f9'), color: f.isHost ? '#ef4444' : (f.status === 'online' ? '#10b981' : '#94a3b8'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 950, position: 'relative' }}>
                                    {f.avatar}
                                    {f.status === 'online' && !f.isHost && <div style={{ position: 'absolute', right: -1, bottom: -1, width: 8, height: 8, borderRadius: '50%', background: '#10b981', border: '2px solid #f9fafb' }} />}
                                    {f.isHost && <div style={{ position: 'absolute', right: -3, top: -3, width: 12, height: 12, background: '#ef4444', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="star" size={6} color="#fff" /></div>}
                                </div>
                                <div>
                                    <h5 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 950, color: '#0f172a' }}>{f.name}</h5>
                                    <p style={{ margin: 0, fontSize: '0.6rem', color: '#94a3b8', fontWeight: 800 }}>{f.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hover-bg:hover { background: rgba(239, 68, 68, 0.05) !important; }
        .hover-header:hover { background: #fafafa; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
