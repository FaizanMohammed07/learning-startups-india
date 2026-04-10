'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { AnimatePresence, motion } from 'framer-motion';

const ActiveHandIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M21,12.5C21,11.1 19.9,10 18.5,10C18.3,10 18.2,10 18,10.1V7.5C18,6.1 16.9,5 15.5,5C15.3,5 15.2,5 15,5.1C14.7,3.9 13.7,3 12.5,3C11.3,3 10.3,3.9 10,5.1C9.8,5 9.7,5 9.5,5C8.1,5 7,6.1 7,7.5V15.1L5.3,14C4.6,13.7 3.8,13.8 3.3,14.3L2,15.5L7.8,21.8C8.5,22.5 9.5,23 10.5,23H15.5C18.5,23 21,20.5 21,17.5V12.5Z" />
  </svg>
);

export default function LiveRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.id || 'unknown';

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'participants'
  
  // Toggles for UI elements based on user feedback
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isControlBarOpen, setIsControlBarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Rahul Mehta', text: 'Welcome everyone! We will start in 2 minutes.', isHost: true },
    { id: 2, sender: 'Sarah J.', text: 'Hi Rahul, excited for this session.', isHost: false },
    { id: 3, sender: 'Amit Kumar', text: 'Can you hear me?', isHost: false },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [floaterEmojis, setFloaterEmojis] = useState([]);

  // Lock body scroll and check fullscreen status
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'You', text: chatInput, isHost: false }]);
    setChatInput('');
  };

  const handleLeave = () => {
    const confirmLeave = window.confirm('Are you sure you want to leave the live class?');
    if (confirmLeave) {
      if (document.fullscreenElement) document.exitFullscreen();
      router.push('/live');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const sendEmoji = (emoji) => {
    const newEmoji = { id: Date.now(), emoji, x: Math.random() * 60 + 20 }; // random horiz position
    setFloaterEmojis([...floaterEmojis, newEmoji]);
    setTimeout(() => {
      setFloaterEmojis((prev) => prev.filter(e => e.id !== newEmoji.id));
    }, 2000);
    setShowEmojis(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#f8fafc', color: '#0f172a', fontFamily: 'var(--font-inter)' }}>
      
      {/* Floater Emojis Layer */}
      <div style={{ position: 'fixed', bottom: 100, right: isSidebarOpen ? 360 : 20, width: '100px', height: '400px', pointerEvents: 'none', zIndex: 9999 }}>
         <AnimatePresence>
           {floaterEmojis.map(e => (
              <motion.div 
                 key={e.id}
                 initial={{ opacity: 1, y: 0, x: `${e.x}px` }}
                 animate={{ opacity: 0, y: -200 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 style={{ position: 'absolute', bottom: 0, fontSize: '32px' }}
              >
                 {e.emoji}
              </motion.div>
           ))}
         </AnimatePresence>
      </div>

      {/* Top Header (Hidden in strict Fullscreen unless you hover, but let's keep it clean or toggleable) */}
      {!isFullscreen && (
        <div style={{ height: '60px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', background: '#ffffff', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => { if(document.fullscreenElement) document.exitFullscreen(); router.push('/live'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '13px', padding: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back
            </button>
            <div style={{ width: 1, height: 20, background: '#e2e8f0' }}></div>
            <div style={{ background: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }}></span> LIVE
            </div>
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Class Room: {roomId}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>01:24:05</span>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ background: isSidebarOpen ? '#ef4444' : '#f1f5f9', color: isSidebarOpen ? '#fff' : '#475569', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              {isSidebarOpen ? 'Hide Chat' : 'Show Chat'}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* Video Area */}
        <div 
          onClick={() => setIsControlBarOpen(!isControlBarOpen)}
          style={{ flex: 1, position: 'relative', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isFullscreen ? '0' : '24px', cursor: 'pointer' }}
        >
          
          {/* Main Video Screen mockup */}
          <div style={{ width: '100%', height: '100%', maxWidth: isFullscreen ? '100%' : '1200px', maxHeight: isFullscreen ? '100%' : '700px', background: '#000 url(https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200) center/cover no-repeat', borderRadius: isFullscreen ? '0' : '16px', overflow: 'hidden', border: isFullscreen ? 'none' : '1px solid #cbd5e1', position: 'relative', boxShadow: isFullscreen ? 'none' : '0 12px 30px rgba(0,0,0,0.06)' }}>
             <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, color: '#0f172a', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
               Rahul Mehta (Host)
             </div>
             {/* PIP for self layout */}
             <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', bottom: '16px', right: '16px', width: '200px', height: '120px', background: '#ffffff', borderRadius: '10px', border: '2px solid #fff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                {isHandRaised && (
                  <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#eab308', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 10 }}>
                    <ActiveHandIcon size={16} color="#fff" />
                  </div>
                )}
                {isVideoOff ? (
                  <div style={{ width: 56, height: 56, background: '#e2e8f0', color: '#64748b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>U</div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400) center/cover no-repeat' }}></div>
                )}
                {isMuted && (
                  <div style={{ position: 'absolute', bottom: '6px', right: '6px', background: '#ef4444', padding: '4px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                  </div>
                )}
             </div>

             {/* Video Controls Hover Area */}
             <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: '8px' }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                  style={{ background: 'rgba(255,255,255,0.9)', color: '#0f172a', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>
             </div>

          </div>

        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
               initial={{ width: 0, opacity: 0 }}
               animate={{ width: '340px', opacity: 1 }}
               exit={{ width: 0, opacity: 0 }}
               style={{ background: '#ffffff', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', boxShadow: '-1px 0 10px rgba(0,0,0,0.02)' }}
            >
              
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', width: '340px' }}>
                <button 
                  onClick={() => setActiveTab('chat')}
                  style={{ flex: 1, padding: '16px 0', background: 'transparent', border: 'none', borderBottom: activeTab === 'chat' ? '2px solid #ef4444' : '2px solid transparent', color: activeTab === 'chat' ? '#0f172a' : '#64748b', fontWeight: activeTab === 'chat' ? 700 : 600, cursor: 'pointer', fontSize: '14px', transition: 'color 0.2s' }}
                >
                  Live Chat
                </button>
                <button 
                  onClick={() => setActiveTab('participants')}
                  style={{ flex: 1, padding: '16px 0', background: 'transparent', border: 'none', borderBottom: activeTab === 'participants' ? '2px solid #ef4444' : '2px solid transparent', color: activeTab === 'participants' ? '#0f172a' : '#64748b', fontWeight: activeTab === 'participants' ? 700 : 600, cursor: 'pointer', fontSize: '14px', transition: 'color 0.2s' }}
                >
                  Participants (24)
                </button>
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', width: '340px' }}>
                {activeTab === 'chat' ? (
                  <>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {messages.map(msg => (
                        <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender==='You' ? 'flex-end' : 'flex-start' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'flex', gap: '6px', alignItems: 'center', fontWeight: 600 }}>
                            {msg.sender} {msg.isHost && <span style={{ background: '#3b82f6', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Host</span>}
                          </span>
                          <div style={{ background: msg.sender==='You' ? '#ef4444' : '#f1f5f9', color: msg.sender==='You' ? '#fff' : '#0f172a', padding: '10px 14px', borderRadius: '12px', fontSize: '14px', maxWidth: '85%', lineHeight: '1.4', fontWeight: 500 }}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} style={{ marginTop: 'auto', display: 'flex', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', color: '#0f172a', outline: 'none', fontSize: '14px', fontWeight: 500 }}
                      />
                      <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', width: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     {/* Participants */}
                     {['Rahul Mehta (Host)', 'You', 'Sarah J.', 'Amit Kumar', 'Neha Gupta'].map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderRadius: '8px', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                             <div style={{ width: 36, height: 36, background: i===0?'#eff6ff':'#f1f5f9', color: i===0?'#3b82f6':'#475569', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                               {p[0]}
                             </div>
                             <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{p}</span>
                             {p === 'You' && isHandRaised && <span style={{ display: 'flex', alignItems: 'center' }} title="Hand Raised"><ActiveHandIcon size={14} color="#eab308" /></span>}
                           </div>
                           <div style={{ display: 'flex', gap: '8px' }}>
                             {i !== 0 && i !== 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12"></path></svg>}
                             {i === 1 && isMuted && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12"></path></svg>}
                           </div>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>



      </div>

      {/* Control Bar */}
      <AnimatePresence>
        {isControlBarOpen && (
          <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: '80px', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', boxShadow: '0 -10px 30px rgba(0,0,0,0.03)', position: 'relative', zIndex: 60 }}
          >
            


            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                style={{ width: 44, height: 44, borderRadius: '50%', background: isMuted ? '#ef4444' : '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: isMuted ? '0 4px 10px rgba(239, 68, 68, 0.3)' : 'none' }}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                )}
              </button>

              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                style={{ width: 44, height: 44, borderRadius: '50%', background: isVideoOff ? '#ef4444' : '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: isVideoOff ? '0 4px 10px rgba(239, 68, 68, 0.3)' : 'none' }}
                title={isVideoOff ? "Start Video" : "Stop Video"}
              >
                {isVideoOff ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                )}
              </button>

              <button 
                onClick={() => {
                   if (!isHandRaised) sendEmoji(<ActiveHandIcon size={32} color="#eab308" />);
                   setIsHandRaised(!isHandRaised);
                }}
                style={{ width: 44, height: 44, borderRadius: '50%', background: isHandRaised ? '#eab308' : '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: isHandRaised ? '0 4px 10px rgba(234, 179, 8, 0.3)' : 'none' }}
                title={isHandRaised ? "Lower Hand" : "Raise Hand"}
              >
                 <ActiveHandIcon size={20} color={isHandRaised ? "#fff" : "#475569"} />
              </button>

              {/* Emoji Reactions Button */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowEmojis(!showEmojis)}
                  style={{ width: 44, height: 44, borderRadius: '50%', background: showEmojis ? '#e2e8f0' : '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                  title="React"
                >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </button>

                <AnimatePresence>
                  {showEmojis && (
                    <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '12px', borderRadius: '24px', display: 'flex', gap: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', zIndex: 100 }}
                    >
                      {['👍', '❤️', '😂', '🎉', '🔥'].map(em => (
                         <button key={em} onClick={() => sendEmoji(em)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '4px', transition: 'transform 0.1s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                            {em}
                         </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ width: 1, height: 32, background: '#e2e8f0', margin: '0 8px' }}></div>
              
              <button 
                onClick={handleLeave}
                style={{ padding: '0 24px', height: 44, borderRadius: '24px', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
              >
                Leave
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
