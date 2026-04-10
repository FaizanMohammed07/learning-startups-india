'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/Icon';
import VideoPlayer from '@/components/VideoPlayer';

// Mock database fetch
const getRecordingDetails = (id) => {
  return {
    id,
    title: 'Investor Pitch Masterclass — Full Recording',
    description: `In this comprehensive masterclass, Rahul Mehta breaks down the anatomy of a winning pitch deck. You\'ll learn how to structure your narrative, what key metrics investors actually care about, and how to deliver your pitch with confidence. We cover real-world examples of both successful and failed pitches to extract actionable insights.`,
    host: 'Rahul Mehta',
    hostTitle: 'Managing Partner at Alpha Ventures',
    date: 'Apr 6, 2025',
    duration: '1h 32m',
    views: 1284,
    tag: 'Fundraising',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', // demo safe url
    resources: [
      { name: 'Lecture Slides (PDF)', size: '4.2 MB', ext: 'pdf' },
      { name: 'Pitch Deck Template', size: '1.1 MB', ext: 'pptx' },
      { name: 'Financial Model Base', size: '840 KB', ext: 'xlsx' }
    ]
  };
};

export default function RecordedPlayerPage() {
  const params = useParams();
  const id = params?.id || 'r1';
  const data = getRecordingDetails(id);

  const [activeTab, setActiveTab] = useState('overview'); // overview, comments
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'Amit K.', text: 'The part about TAM calculation was incredibly helpful. Thanks Rahul!', time: '2 days ago', likes: 14 },
    { id: 2, user: 'Sneha P.', text: 'Could we get a follow-up session on term sheets?', time: '1 day ago', likes: 8 },
    { id: 3, user: 'Vikram S.', text: 'Great content, but the audio was a bit low during the Q&A.', time: '5 hours ago', likes: 2 },
  ]);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentsList([{ id: Date.now(), user: 'You', text: comment, time: 'Just now', likes: 0 }, ...commentsList]);
    setComment('');
  };

  return (
    <div className="platform-page" style={{ padding: 0, overflowX: 'hidden' }}>
      
      {/* Top Banner Context */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/recorded" style={{ color: 'var(--slate-500)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
             Back to Library
          </Link>
          <span style={{ color: 'var(--slate-300)' }}>/</span>
          <span style={{ color: 'var(--brand-black)', fontSize: '0.85rem', fontWeight: 700 }}>{data.title}</span>
      </div>

      <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
         
         {/* Main Left Column */}
         <div style={{ flex: 1, minWidth: 0 }}>
            
            {/* Video Player Wrapper */}
            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
               {/* Note: VideoPlayer from existing components expects standard props */}
               <VideoPlayer 
                  videoUrl={data.videoUrl} 
                  videoId={data.id} 
                  userId="USR-TEST-123" 
                  onProgressUpdate={() => {}} 
               />
            </div>

            {/* Video Meta Info */}
            <div style={{ marginTop: '24px' }}>
               <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ background: 'var(--brand-red)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>{data.tag}</span>
               </div>
               
               <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--brand-black)', marginBottom: '12px', lineHeight: 1.2 }}>
                 {data.title}
               </h1>

               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <Icon name="play" size={14} /> {data.views.toLocaleString()} views
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <Icon name="calendar" size={14} /> {data.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <Icon name="clock" size={14} /> {data.duration}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{ background: '#fff', border: '1px solid var(--slate-200)', color: 'var(--slate-600)', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                        Save
                      </button>
                      <button style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Mark Watched
                      </button>
                  </div>
               </div>
            </div>

            {/* Tabs content below meta */}
            <div style={{ marginTop: '24px' }}>
               <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--slate-200)', marginBottom: '24px' }}>
                  <button onClick={() => setActiveTab('overview')} style={{ padding: '0 0 12px 0', background: 'transparent', border: 'none', borderBottom: activeTab === 'overview' ? '3px solid var(--brand-red)' : '3px solid transparent', color: activeTab === 'overview' ? 'var(--brand-black)' : 'var(--slate-500)', fontWeight: activeTab === 'overview' ? 800 : 600, fontSize: '1rem', cursor: 'pointer' }}>
                     Overview
                  </button>
                  <button onClick={() => setActiveTab('comments')} style={{ padding: '0 0 12px 0', background: 'transparent', border: 'none', borderBottom: activeTab === 'comments' ? '3px solid var(--brand-red)' : '3px solid transparent', color: activeTab === 'comments' ? 'var(--brand-black)' : 'var(--slate-500)', fontWeight: activeTab === 'comments' ? 800 : 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     Discussion <span style={{ background: 'var(--slate-100)', color: 'var(--slate-600)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem' }}>{commentsList.length}</span>
                  </button>
               </div>

               {activeTab === 'overview' ? (
                 <div className="tab-overview">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: 'var(--brand-black)' }}>About this masterclass</h3>
                    <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, fontSize: '0.95rem' }}>{data.description}</p>
                 </div>
               ) : (
                 <div className="tab-comments">
                    {/* Add Comment */}
                    <form onSubmit={handlePostComment} style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                       <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--slate-500)', flexShrink: 0 }}>U</div>
                       <div style={{ flex: 1 }}>
                          <input 
                             type="text" 
                             placeholder="Add a public comment or question..."
                             value={comment}
                             onChange={e => setComment(e.target.value)}
                             style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--slate-300)', padding: '8px 0', fontSize: '0.95rem', outline: 'none', background: 'transparent' }}
                             onFocus={(e) => e.target.style.borderBottomColor = 'var(--brand-red)'}
                             onBlur={(e) => e.target.style.borderBottomColor = 'var(--slate-300)'}
                          />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                            <button type="submit" disabled={!comment.trim()} style={{ background: comment.trim() ? 'var(--brand-black)' : 'var(--slate-200)', color: comment.trim() ? '#fff' : 'var(--slate-400)', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', cursor: comment.trim() ? 'pointer' : 'default' }}>
                               Comment
                            </button>
                          </div>
                       </div>
                    </form>

                    {/* Comments List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                       {commentsList.map(c => (
                          <div key={c.id} style={{ display: 'flex', gap: '16px' }}>
                             <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>{c.user[0]}</div>
                             <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                   <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-black)' }}>{c.user}</span>
                                   <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem' }}>{c.time}</span>
                                </div>
                                <p style={{ color: 'var(--slate-700)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>{c.text}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                                   <button style={{ background: 'transparent', border: 'none', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                      {c.likes > 0 && c.likes}
                                   </button>
                                   <button style={{ background: 'transparent', border: 'none', color: 'var(--slate-400)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Reply</button>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
         </div>

         {/* Right Sidebar (Instructor & Downloads) */}
         <div style={{ width: '380px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Instructor Card */}
            <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid var(--slate-100)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: 'var(--brand-black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="user" size={16} /> Hosted by
               </h3>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'url(https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200) center/cover' }}></div>
                  <div>
                     <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-black)' }}>{data.host}</div>
                     <div style={{ color: 'var(--slate-500)', fontSize: '0.85rem', lineHeight: 1.3, marginTop: '4px' }}>{data.hostTitle}</div>
                  </div>
               </div>
            </div>

            {/* Resources/Downloads Card */}
            <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid var(--slate-100)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: 'var(--brand-black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  Resources & Links
               </h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data.resources.map((res, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--slate-50)', borderRadius: '10px', border: '1px solid var(--slate-100)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#fff'} onMouseLeave={e => e.currentTarget.style.background = 'var(--slate-50)'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                           <div style={{ width: 36, height: 36, background: '#fee2e2', color: 'var(--brand-red)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase' }}>
                              {res.ext}
                           </div>
                           <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)' }}>{res.name}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginTop: '2px' }}>{res.size}</div>
                           </div>
                        </div>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--brand-black)', cursor: 'pointer' }}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button>
                     </div>
                  ))}
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}
