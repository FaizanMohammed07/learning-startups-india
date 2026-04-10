'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function DiscussionsPage() {
  const [activeTab, setActiveTab] = useState('Discussions');
  const [activeCourse, setActiveCourse] = useState('Startup Fundamentals');

  const tabs = ['Overview', 'Tasks', 'Discussions', 'Members', 'Files'];
  const courses = ['Startup Fundamentals', 'UI/UX Design Masterclass', 'Scaling SaaS 101', 'Growth Hub'];

  const discussions = [
    {
      id: 1,
      user: { name: 'Aryan Sharma', avatar: 'AS' },
      time: '2 hours ago',
      text: 'I\'ve been looking into our local storage strategy for the user dashboard. Should we be encrypting the key-value pairs before storing or just relying on the session timeout? Here is the link to the [proposed security doc](https://google.com).',
      reactions: [
        { emoji: '👍', count: 5 },
        { emoji: '🔥', count: 3 }
      ],
      replies: ['RG', 'PV', 'NK'],
      lastReply: '1 day ago'
    },
    {
      id: 2,
      user: { name: 'Rahul Gupta', avatar: 'RG' },
      time: '5 hours ago',
      text: 'Has anyone finished the module on "Cap Table Management"? I have a specific question about convertible notes vs SAFEs.',
      reactions: [
        { emoji: '👍', count: 8 }
      ],
      replies: ['NK'],
      lastReply: '3 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      
      {/* ── TOP HEADER (WORKSPACE STYLE) ── */}
      <header className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#111827] leading-tight">Discussions</h1>
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mt-0.5">Collaborate and share ideas</p>
        </div>
        <button className="bg-[#F97316] text-white px-5 py-2.5 rounded-[10px] font-bold text-sm shadow-sm transition-all hover:bg-[#EA580C]">
          + Create New
        </button>
      </header>

      {/* ── TOP NAVIGATION TABS ── */}
      <nav className="bg-white border-b border-[#E5E7EB] px-8 flex gap-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-sm font-bold transition-all border-b-2 relative ${
              activeTab === tab 
              ? 'border-[#F97316] text-[#111827]' 
              : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* ── MAIN CONTENT (3-SECTION LAYOUT) ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (MY COURSES) */}
        <aside className="w-[260px] bg-white border-r border-[#E5E7EB] flex flex-col p-6 sticky top-0 h-full overflow-y-auto">
          <h3 className="text-xs font-black text-[#9CA3AF] uppercase tracking-widest mb-4">MY COURSES</h3>
          <div className="space-y-1">
            {courses.map(course => (
              <button
                key={course}
                onClick={() => setActiveCourse(course)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left transition-all ${
                  activeCourse === course 
                  ? 'bg-[#FFF7ED] text-[#F97316] font-bold' 
                  : 'text-[#4B5563] font-semibold hover:bg-[#F9FAFB]'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${activeCourse === course ? 'bg-[#F97316]' : 'bg-[#E5E7EB]'}`} />
                <span className="text-[0.9rem] truncate">{course}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-2 px-3 py-2 text-[#6B7280] font-bold text-xs hover:text-[#111827] transition-colors">
            <Icon name="plus" size={14} /> Create New
          </button>
        </aside>

        {/* CENTER DISCUSSION THREAD */}
        <main className="flex-1 flex flex-col relative bg-white overflow-y-auto">
          <div className="p-8 space-y-12 mb-32">
            {discussions.map(disc => (
              <div key={disc.id} className="flex gap-5 group">
                {/* Profile Image */}
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#F97316] flex items-center justify-center font-black text-sm border border-[#E5E7EB] flex-shrink-0">
                  {disc.user.avatar}
                </div>

                {/* Discussion content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-[#111827] text-[1.rem]">{disc.user.name}</span>
                    <span className="text-xs font-bold text-[#9CA3AF]">{disc.time}</span>
                  </div>
                  
                  <p className="text-[#374151] font-medium leading-relaxed text-[1.05rem] mb-4">
                    {/* Render text with basic link styling simulation if needed */}
                    {disc.text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                       const match = part.match(/\[(.*?)\]\((.*?)\)/);
                       if (match) return <a key={i} href={match[2]} className="text-[#2563EB] underline hover:text-[#1D4ED8] transition-colors">{match[1]}</a>;
                       return part;
                    })}
                  </p>

                  <div className="flex items-center gap-4">
                     {/* Reactions */}
                     <div className="flex items-center gap-2">
                        {disc.reactions.map((r, ri) => (
                           <div key={ri} className="bg-[#F3F4F6] px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-[#E5E7EB] transition-all border border-[#F1F5F9]">
                              <span className="text-sm">{r.emoji}</span>
                              <span className="text-xs font-black text-[#4B5563]">{r.count}</span>
                           </div>
                        ))}
                        <button className="bg-[#F3F4F6] w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] border border-[#F1F5F9] transition-all">
                           <Icon name="plus" size={14} />
                        </button>
                     </div>

                     {/* Replies Preview */}
                     <div className="flex items-center gap-3 px-4 border-l border-[#F3F4F6]">
                        <div className="flex -space-x-3">
                           {disc.replies.map((rep, ri) => (
                              <div key={ri} className="w-6 h-6 rounded-full bg-white border-2 border-white overflow-hidden">
                                 <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center text-[10px] font-black text-[#6B7280]">
                                    {rep}
                                 </div>
                              </div>
                           ))}
                        </div>
                        <span className="text-xs font-bold text-[#9CA3AF]">last reply {disc.lastReply}</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COMMENT INPUT BOX (STICKY BOTTOM) */}
          <div className="absolute bottom-6 left-8 right-8 bg-white border border-[#E5E7EB] rounded-[16px] shadow-lg p-3 flex items-start gap-4 focus-within:ring-2 focus-within:ring-[#F9731633] transition-all">
             <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF] font-bold text-sm flex-shrink-0">
                U
             </div>
             <div className="flex-1 flex flex-col gap-2">
                <textarea 
                  rows={2} 
                  placeholder="Write a comment..." 
                  className="w-full bg-transparent border-none outline-none font-medium text-[#111827] resize-none"
                />
                <div className="flex justify-between items-center pt-2 border-t border-[#F9FAFB]">
                   <div className="flex gap-2">
                      <button className="p-2 rounded-lg text-[#9CA3AF] hover:bg-[#F9FAFB] hover:text-[#F97316] transition-all">
                         <Icon name="link" size={16} />
                      </button>
                      <button className="p-2 rounded-lg text-[#9CA3AF] hover:bg-[#F9FAFB] hover:text-[#F97316] transition-all">
                         <Icon name="heart" size={16} />
                      </button>
                      <button className="p-2 rounded-lg text-[#9CA3AF] hover:bg-[#F9FAFB] hover:text-[#F97316] transition-all">
                         <Icon name="paperclip" size={16} />
                      </button>
                   </div>
                   <div className="flex gap-3">
                      <button className="px-4 py-2 font-black text-xs text-[#6B7280] hover:text-[#111827] transition-all">
                         Discard
                      </button>
                      <button className="px-6 py-2 bg-[#F97316] text-white rounded-[10px] font-black text-xs shadow-md transition-all hover:translate-y-[-1px]">
                         Submit
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </main>

        {/* RIGHT (MINIMAL AVATARS / INFO) */}
        <aside className="w-[80px] bg-white border-l border-[#E5E7EB] hidden xl:flex flex-col items-center py-8 gap-4">
           {['AS', 'RG', 'PV', 'NK', 'DV'].map(av => (
              <div key={av} className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-xs font-black text-[#6B7280] cursor-pointer hover:border-[#F97316] transition-all">
                {av}
              </div>
           ))}
           <div className="w-8 h-[1px] bg-[#F3F4F6] my-2" />
           <button className="w-10 h-10 rounded-full border border-dashed border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#F97316] transition-all">
              <Icon name="plus" size={16} />
           </button>
        </aside>
      </div>
    </div>
  );
}
