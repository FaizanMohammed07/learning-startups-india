'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';
import Link from 'next/link';

// ── MOCK DATA ──
const ASSIGNMENTS = [
  { 
    id: 'a1', 
    title: 'Market Resereach & Validation', 
    course: 'Startup Fundamentals', 
    status: 'Pending', 
    dueDate: '2025-04-15', 
    marks: 100, 
    attachment: 'Instructions_MR.pdf',
    description: 'Conduct a thorough market research for your startup idea. Identify your target audience, competitors, and potential market size.',
    instructions: '1. Identify 5 direct competitors.\n2. Summarize key findings from 10 customer interviews.\n3. Create a SWOT analysis for your venture.'
  },
  { 
    id: 'a2', 
    title: 'Financial Model Projections', 
    course: 'Modern Finance', 
    status: 'Submitted', 
    dueDate: '2025-04-10', 
    marks: 50, 
    submittedDate: '2025-04-09',
    description: 'Build a 3-year financial projection including P&L, Cash Flow, and Balance Sheet.',
    instructions: 'Download the provided Excel template and fill in the assumptions based on your growth strategy.'
  },
  { 
    id: 'a3', 
    title: 'User Interface Audit', 
    course: 'Product Design', 
    status: 'Graded', 
    dueDate: '2025-04-05', 
    marks: 100, 
    score: 85,
    feedback: 'Excellent work on the accessibility audit. Your suggestions for the checkout flow are very practical. Watch out for color contrast ratios in the primary button.',
    description: 'Perform a full UI audit of an existing SaaS product using Nielsen\'s heuristics.',
    instructions: 'Select one SaaS product and provide screenshots of at least 5 heuristics violations with proposed fixes.'
  },
  { 
    id: 'a4', 
    title: 'Term Sheet Analysis', 
    course: 'Venture Capital', 
    status: 'Late', 
    dueDate: '2025-03-28', 
    marks: 75, 
    description: 'Review the provided Series A term sheet and identify red flags for founders.',
    instructions: 'Focus on liquidation preference, anti-dilution clauses, and board composition.'
  }
];

const DEADLINES = [
  { title: 'Market Research', date: 'Tomorrow', color: '#F97316' },
  { title: 'Pitch Deck V1', date: 'In 3 days', color: '#F97316' },
];

const SidebarItem = ({ label, active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
      active ? 'bg-[#F97316] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon && <Icon name={icon} size={18} color={active ? '#fff' : '#9CA3AF'} />}
    {label}
  </button>
);

const AssignmentCard = ({ assignment, onClick }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return { bg: 'bg-blue-50', text: 'text-blue-600' };
      case 'Graded': return { bg: 'bg-green-50', text: 'text-green-600' };
      case 'Late': return { bg: 'bg-red-50', text: 'text-red-600' };
      default: return { bg: 'bg-orange-50', text: 'text-[#F97316]' };
    }
  };

  const statusStyle = getStatusColor(assignment.status);

  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm cursor-pointer transition-all duration-200"
      onClick={() => onClick(assignment)}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase">{assignment.course}</span>
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusStyle.bg} ${statusStyle.text}`}>
          {assignment.status}
        </span>
      </div>

      <h3 className="text-lg font-bold text-[#111827] mb-2">{assignment.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{assignment.description}</p>

      <div className="flex items-center gap-4 border-t border-gray-50 pt-4 mb-4">
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400 font-semibold">
          <Icon name="clock" size={14} /> Due {assignment.dueDate}
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400 font-semibold">
          <Icon name="target" size={14} /> {assignment.marks} Marks
        </div>
      </div>

      <button className="w-full py-3 bg-[#F97316] text-white rounded-xl text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all">
        {assignment.status === 'Submitted' || assignment.status === 'Graded' ? 'View Details' : 'Submit Assignment'}
      </button>
    </motion.div>
  );
};

export default function AssignmentsPage() {
  const [view, setView] = useState('list');
  const [activeTab, setActiveTab] = useState('All Assignments');
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filteredTasks = useMemo(() => {
    return ASSIGNMENTS.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      if (activeTab === 'Pending') return matchSearch && a.status === 'Pending';
      if (activeTab === 'Submitted') return matchSearch && a.status === 'Submitted';
      if (activeTab === 'Graded') return matchSearch && a.status === 'Graded';
      if (activeTab === 'Late Submissions') return matchSearch && a.status === 'Late';
      return matchSearch;
    });
  }, [search, activeTab]);

  if (view === 'detail' && selectedTask) {
    return (
      <div className="max-w-[1280px] mx-auto min-h-screen bg-[#F9FAFB] p-8 font-inter">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-8 hover:text-[#F97316] transition-colors">
          <Icon name="chevronLeft" size={18} /> BACK TO LIST
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-black text-[#111827] mb-2">{selectedTask.title}</h1>
                  <p className="text-[#F97316] font-bold text-sm tracking-wide">{selectedTask.course}</p>
                </div>
                <div className="bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100 text-center">
                  <div className="text-xs font-bold text-orange-400 uppercase mb-1">Total Marks</div>
                  <div className="text-2xl font-black text-[#F97316]">{selectedTask.marks}</div>
                </div>
              </div>

              <div className="space-y-6 text-[#4B5563]">
                <section>
                  <h3 className="text-lg font-bold text-[#111827] mb-3">Instructions</h3>
                  <div className="prose prose-sm max-w-none text-gray-500 leading-relaxed whitespace-pre-line">
                    {selectedTask.instructions || selectedTask.description}
                  </div>
                </section>

                {selectedTask.attachment && (
                  <section>
                    <h3 className="text-lg font-bold text-[#111827] mb-3">Attachments</h3>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 w-fit cursor-pointer hover:bg-gray-100 transition-colors">
                      <Icon name="fileText" size={20} color="#F97316" />
                      <span className="text-sm font-bold text-gray-700">{selectedTask.attachment}</span>
                      <Icon name="download" size={16} color="#9CA3AF" />
                    </div>
                  </section>
                )}
              </div>
            </div>

            {selectedTask.status === 'Graded' && (
              <div className="bg-green-50 border border-green-100 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Icon name="check" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900">Grading Complete</h3>
                    <p className="text-sm text-green-700 font-medium">Evaluation by Prof. Robert Johnson</p>
                  </div>
                  <div className="ml-auto text-center">
                    <span className="text-3xl font-black text-green-600">{selectedTask.score}</span>
                    <span className="text-sm font-bold text-green-400 ml-1">/ {selectedTask.marks}</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-green-200">
                  <h4 className="text-xs font-black text-green-400 uppercase mb-2">Instructor Feedback</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedTask.feedback}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#111827] mb-6">Submission</h3>
              
              {selectedTask.status === 'Pending' || selectedTask.status === 'Late' ? (
                <div className="space-y-6">
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isUploading ? 'border-[#F97316] bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsUploading(true); }}
                    onDragLeave={() => setIsUploading(false)}
                    onClick={() => setIsUploading(!isUploading)}
                  >
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="upload" size={28} color="#F97316" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Click or drag file to upload</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase">PDF, ZIP, or DOC (Max 20MB)</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Submission Note</label>
                    <textarea 
                      placeholder="Add a comment to your instructor..."
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#F97316] outline-none text-sm min-h-[100px] transition-all"
                    />
                  </div>

                  <button className="w-full py-4 bg-[#F97316] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-100 hover:brightness-105 active:scale-95 transition-all">
                    SUBMIT NOW
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="fileText" size={18} color="#10B981" />
                      <span className="text-sm font-bold text-gray-700">Submission_Final_v1.pdf</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase">Submitted on {selectedTask.submittedDate || 'recently'}</p>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl font-bold text-sm hover:border-orange-300 hover:text-orange-500 transition-all">
                    RESUBMIT
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#FFF7ED] rounded-3xl p-8 border border-[#FFEDD5]">
              <h4 className="text-xs font-black text-orange-400 uppercase mb-4 tracking-widest">Deadlines</h4>
              <div className="flex items-center gap-4 text-orange-700">
                <Icon name="clock" size={22} />
                <div>
                  <div className="text-sm font-black">{selectedTask.dueDate}</div>
                  <div className="text-[10px] font-bold uppercase opacity-80">Hard Deadline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto min-h-screen bg-[#F9FAFB] p-10 font-inter">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#111827] mb-1">Assignments</h1>
          <p className="text-[#6B7280] font-semibold text-lg">Track and complete your tasks</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input 
              type="text" 
              placeholder="Search assignments..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#E5E7EB] bg-white outline-none focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm" 
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="search" size={18} />
            </div>
          </div>
          <button className="px-6 py-3.5 bg-[#F97316] text-white rounded-2xl font-black shadow-lg shadow-orange-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Icon name="plus" size={20} /> Create Assignment
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr,320px] gap-8">
        <aside className="space-y-2">
          {['All Assignments', 'Pending', 'Submitted', 'Graded', 'Late Submissions'].map(tab => (
            <SidebarItem 
              key={tab} 
              label={tab} 
              active={activeTab === tab} 
              onClick={() => setActiveTab(tab)} 
              icon={tab === 'All Assignments' ? 'books' : tab === 'Pending' ? 'clock' : tab === 'Submitted' ? 'fileText' : tab === 'Graded' ? 'award' : 'target'}
            />
          ))}
        </aside>

        <main>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <AnimatePresence>
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <AssignmentCard 
                    key={task.id} 
                    assignment={task} 
                    onClick={(t) => {
                      setSelectedTask(t);
                      setView('detail');
                    }} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <Icon name="pencil" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">No assignments found</h3>
                  <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <aside className="space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-sm">
            <h4 className="text-sm font-black text-[#111827] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F97316] rounded-full"></span> Upcoming Deadlines
            </h4>
            <div className="space-y-4">
              {DEADLINES.map((d, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-gray-700 group-hover:text-[#F97316] transition-colors">{d.title}</span>
                    <span className="text-[10px] font-black text-orange-400 uppercase">{d.date}</span>
                  </div>
                  <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} className="h-full bg-[#F97316]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111827] rounded-3xl p-8 overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-white text-lg font-black mb-2 leading-tight">Pro Mastery Tip</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">Early submissions are rated 15% higher by industry reviewers.</p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10">
              <Icon name="zap" size={120} color="#fff" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
