'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function GroupsPage() {
  const [activeNav, setActiveNav] = useState('Explore Groups');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState(new Set([2]));
  const [activeTab, setActiveTab] = useState('Posts');

  const categories = ['All', 'Tech', 'Design', 'Business', 'AI', 'Beginner'];

  const groups = [
    {
      id: 1,
      name: 'AI Innovators India',
      avatar: 'AI',
      privacy: 'Public',
      description: 'Discussing the latest in Generative AI, LLMs, and building AI-first startups in the Indian ecosystem.',
      tags: ['AI', 'Tech', 'Future'],
      members: '1.2k',
      activeNow: 120,
      activity: '45 posts/week',
      banner: 'linear-gradient(135deg, #FBE4D8 0%, #F7D9C6 100%)',
      about: 'Welcome to the largest group for AI innovators. We share research, tool stack advice, and collaborate on open-source AI projects.',
      rules: ['No spam', 'Stay helpful', 'Respect privacy'],
      memberList: [
        { name: 'Aryan Sharma', role: 'Admin', avatar: 'AS' },
        { name: 'Priya Verma', role: 'Member', avatar: 'PV' }
      ]
    },
    {
      id: 2,
      name: 'UI/UX Design Systems',
      avatar: 'UI',
      privacy: 'Public',
      description: 'Mastering Figma design systems and advanced prototyping for premium startup interfaces.',
      tags: ['Design', 'UI/UX', 'Figma'],
      members: '850',
      activeNow: 45,
      activity: '28 posts/week',
      banner: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      about: 'A dedicated space for designers to push the boundaries of UI/UX in digital products.',
      rules: ['Share your work', 'Provide constructive feedback only'],
      memberList: [
        { name: 'Rahul Gupta', role: 'Admin', avatar: 'RG' }
      ]
    },
    {
      id: 3,
      name: 'FinTech Founders Hub',
      avatar: 'FT',
      privacy: 'Private',
      description: 'A private group for founders in the fintech space to discuss regulations and growth.',
      tags: ['Business', 'FinTech', 'Legal'],
      members: '320',
      activeNow: 12,
      activity: '15 posts/week',
      banner: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
      about: 'Confidential space for high-level fintech founders.',
      rules: ['NDA required', 'Strict confidentiality'],
      memberList: [
        { name: 'Neha Kapoor', role: 'Admin', avatar: 'NK' }
      ]
    }
  ];

  const sidebarNav = [
    { label: 'Explore Groups', icon: 'compass' },
    { label: 'My Groups', icon: 'users' },
    { label: 'Trending Groups', icon: 'trendUp' },
    { label: 'Course Groups', icon: 'book' },
  ];

  const toggleJoin = (id) => {
    setJoinedGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-8">
        <div className="max-w-[1280px] mx-auto">
          <button 
            onClick={() => setSelectedGroup(null)}
            className="flex items-center gap-2 text-[#6B7280] font-semibold mb-6 hover:text-[#F97316] transition-colors"
          >
            <Icon name="arrowLeft" size={20} /> Back to groups
          </button>

          <div className="bg-white rounded-[24px] overflow-hidden border border-[#E5E7EB] shadow-sm mb-6">
             <div className="h-48 md:h-64" style={{ background: selectedGroup.banner }}></div>
             <div className="px-8 pb-4 relative">
                <div className="absolute -top-12 left-8">
                   <div className="w-24 h-24 rounded-[24px] bg-white p-1 shadow-md">
                      <div className="w-full h-full rounded-[20px] bg-[#F97316] text-white flex items-center justify-center font-black text-2xl">
                         {selectedGroup.avatar}
                      </div>
                   </div>
                </div>
                <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-black text-[#111827] tracking-tight">{selectedGroup.name}</h1>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${selectedGroup.privacy === 'Public' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                           {selectedGroup.privacy}
                        </span>
                      </div>
                      <p className="text-[#6B7280] font-bold mt-1">{selectedGroup.members} members • {selectedGroup.activeNow} online</p>
                   </div>
                   <button 
                    onClick={() => toggleJoin(selectedGroup.id)}
                    className={`px-8 py-3 rounded-[12px] font-black transition-all ${joinedGroups.has(selectedGroup.id) ? 'bg-[#F3F4F6] text-[#111827]' : 'bg-[#F97316] text-white shadow-lg'}`}
                   >
                     {joinedGroups.has(selectedGroup.id) ? 'Leave Group' : 'Join Group'}
                   </button>
                </div>
             </div>
             
             {/* Tabs */}
             <div className="flex px-8 border-t border-[#F3F4F6] mt-4">
                {['Posts', 'Members', 'About'].map(tab => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === tab ? 'border-[#F97316] text-[#F97316]' : 'border-transparent text-[#6B7280]'}`}
                   >
                      {tab}
                   </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
             <div>
                {activeTab === 'Posts' && (
                   <div className="space-y-4">
                      {/* Interaction placeholder */}
                      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-4 flex gap-4 items-center">
                         <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#F97316] flex items-center justify-center font-bold">U</div>
                         <input placeholder="Share something with the group..." className="flex-1 bg-[#F9FAFB] border-none outline-none p-3 rounded-[10px] font-medium" />
                      </div>
                      <p className="text-center py-10 text-[#9CA3AF] font-bold">No posts in this group yet. Be the first!</p>
                   </div>
                )}
                {activeTab === 'Members' && (
                   <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 space-y-4">
                      <h3 className="font-black text-[#111827] mb-4">Group Members</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedGroup.memberList.map(m => (
                           <div key={m.name} className="flex items-center gap-3 p-3 border border-[#F3F4F6] rounded-[12px]">
                              <div className="w-10 h-10 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold">{m.avatar}</div>
                              <div>
                                 <div className="font-bold text-[#111827]">{m.name}</div>
                                 <div className="text-xs font-black text-[#F97316]">{m.role}</div>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                )}
                {activeTab === 'About' && (
                   <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-8 space-y-8">
                     <div>
                        <h3 className="font-black text-[#111827] mb-2 uppercase text-xs tracking-widest text-[#9CA3AF]">DESCRIPTION</h3>
                        <p className="text-[#374151] font-medium leading-relaxed">{selectedGroup.about}</p>
                     </div>
                     <div>
                        <h3 className="font-black text-[#111827] mb-4 uppercase text-xs tracking-widest text-[#9CA3AF]">GROUP RULES</h3>
                        <div className="space-y-3">
                           {selectedGroup.rules.map((rule, i) => (
                              <div key={i} className="flex gap-3 items-start">
                                 <div className="w-5 h-5 rounded-full bg-[#FFF7ED] text-[#F97316] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">{i+1}</div>
                                 <p className="text-sm font-bold text-[#4B5563]">{rule}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                   </div>
                )}
             </div>
             <div className="space-y-6">
                <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
                   <h4 className="font-black text-sm text-[#111827] mb-4 tracking-tight uppercase">GROUP STATS</h4>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold">
                         <span className="text-[#6B7280]">Total Members</span>
                         <span className="text-[#111827]">{selectedGroup.members}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold">
                         <span className="text-[#6B7280]">Active Now</span>
                         <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                           <span className="text-[#111827]">{selectedGroup.activeNow}</span>
                         </div>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold">
                         <span className="text-[#6B7280]">Weekly Activity</span>
                         <span className="text-[#111827]">{selectedGroup.activity}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr_320px] gap-6 items-start">
        
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block sticky top-8 space-y-1">
          {sidebarNav.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] font-bold transition-all duration-200 ${
                activeNav === item.label 
                ? 'bg-[#F97316] text-white shadow-md' 
                : 'text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="text-[0.95rem]">{item.label}</span>
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
            <button 
              onClick={() => setShowModal(true)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] font-bold text-[#F97316] hover:bg-[#FFF7ED]"
            >
              <Icon name="plus" size={18} />
              <span className="text-[0.95rem]">Create Group</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="space-y-6">
           {/* Top Bar */}
           <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Icon name="search" size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search groups, skills, or topics..." 
                    className="w-full pl-12 pr-4 py-3 rounded-[12px] border border-[#E5E7EB] outline-none transition-all focus:ring-2 focus:ring-[#F97316] text-[#111827] font-medium"
                  />
                </div>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-[#F97316] text-white px-6 py-3 rounded-[12px] font-black shadow-[0px_8px_20px_rgba(249,115,22,0.15)] hover:translate-y-[-1px] transition-all"
                >
                  Create Group
                </button>
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap gap-2">
                 {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-black transition-all ${activeCategory === cat ? 'bg-[#F97316] text-white' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'}`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>

           {/* Group Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.map(group => (
                 <div 
                   key={group.id} 
                   onClick={() => setSelectedGroup(group)}
                   className="group bg-white rounded-[20px] border border-[#E5E7EB] p-5 cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.08)]"
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-14 h-14 rounded-[16px] bg-[#F97316] text-white flex items-center justify-center font-black text-xl">
                          {group.avatar}
                       </div>
                       <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${group.privacy === 'Public' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                          {group.privacy}
                       </span>
                    </div>
                    
                    <h3 className="text-lg font-black text-[#111827] mb-2 group-hover:text-[#F97316] transition-colors">{group.name}</h3>
                    <p className="text-sm text-[#6B7280] font-bold line-clamp-2 mb-4 leading-relaxed">{group.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                       {group.tags.map(tag => (
                          <span key={tag} className="bg-[#FFF7ED] text-[#F97316] px-3 py-1 rounded-full text-[10px] font-black">{tag}</span>
                       ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-black text-[#9CA3AF] mb-6">
                       <span className="flex items-center gap-1.5"><Icon name="users" size={14} /> {group.members}</span>
                       <span className="flex items-center gap-1.5 text-[#10B981]"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> {group.activeNow}</span>
                       <span className="flex items-center gap-1.5"><Icon name="trendUp" size={14} /> {group.activity}</span>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleJoin(group.id); }}
                      className={`w-full py-3 rounded-[12px] font-black transition-all ${joinedGroups.has(group.id) ? 'bg-[#F3F4F6] text-[#111827]' : 'bg-[#F97316] text-white shadow-md'}`}
                    >
                       {joinedGroups.has(group.id) ? 'View Group' : 'Join Group'}
                    </button>
                 </div>
              ))}
           </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block space-y-6">
           <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm">
             <h4 className="font-black text-xs text-[#111827] mb-4 tracking-tight uppercase">TRENDING GROUPS</h4>
             <div className="space-y-4">
               {groups.slice(0, 2).map(g => (
                  <div key={g.name} className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-8 h-8 rounded-[8px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center font-black text-xs">{g.avatar}</div>
                     <div className="flex-1">
                        <div className="text-xs font-black text-[#111827] group-hover:text-[#F97316]">{g.name}</div>
                        <div className="text-[10px] font-bold text-[#9CA3AF]">{g.members} members</div>
                     </div>
                  </div>
               ))}
             </div>
           </div>

           <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 shadow-sm">
             <h4 className="font-black text-xs text-[#111827] mb-4 tracking-tight uppercase">RECENT ACTIVITY</h4>
             <div className="space-y-3">
               <div className="text-[11px] font-bold text-[#6B7280]">
                 <span className="text-[#111827] font-black">Rahul G.</span> joined <span className="text-[#F97316] font-black">AI Innovators</span>
               </div>
               <div className="text-[11px] font-bold text-[#6B7280]">
                 New resource shared in <span className="text-[#111827] font-black">UI Design Systems</span>
               </div>
             </div>
           </div>
        </aside>
      </div>

      {/* CREATE GROUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0F172A44] backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-[520px] rounded-[24px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-black text-[#111827] tracking-tight">Create Community</h3>
               <button onClick={() => setShowModal(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827]">
                 <Icon name="x" size={20} />
               </button>
            </div>
            <div className="space-y-5">
               <div>
                  <label className="block text-xs font-black text-[#4B5563] mb-2 uppercase tracking-widest">GROUP NAME</label>
                  <input placeholder="e.g. Next.js Builders" className="w-full px-4 py-3 rounded-[12px] border border-[#E5E7EB] outline-none font-bold focus:ring-2 focus:ring-[#F97316]" />
               </div>
               <div>
                  <label className="block text-xs font-black text-[#4B5563] mb-2 uppercase tracking-widest">DESCRIPTION</label>
                  <textarea rows={3} placeholder="What is this community about?" className="w-full px-4 py-3 rounded-[12px] border border-[#E5E7EB] outline-none font-bold resize-none focus:ring-2 focus:ring-[#F97316]" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-[#4B5563] mb-2 uppercase tracking-widest">CATEGORY</label>
                    <select className="w-full px-4 py-3 rounded-[12px] border border-[#E5E7EB] bg-white font-bold outline-none cursor-pointer">
                       {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-[#4B5563] mb-2 uppercase tracking-widest">PRIVACY</label>
                    <select className="w-full px-4 py-3 rounded-[12px] border border-[#E5E7EB] bg-white font-bold outline-none cursor-pointer">
                       <option>Public</option>
                       <option>Private</option>
                    </select>
                  </div>
               </div>
               <button className="w-full bg-[#F97316] text-white py-4 rounded-[16px] font-black text-lg shadow-[0px_8px_25px_rgba(249,115,22,0.25)] hover:translate-y-[-1px] transition-all">
                  Launch Group
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
