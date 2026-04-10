'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'Seed Funding Strategy - Q4 Playbook', type: 'Video', source: 'Series A Workshop', date: '2 days ago' },
    { id: 2, title: 'Market Size & TAM Calculation', type: 'Class', source: 'Live Session #24', date: 'Yesterday' },
    { id: 3, title: 'Legal Checklist for Startups', type: 'Note', source: 'Compliance Module', date: 'Oct 8, 2026' },
    { id: 4, title: 'Product-Market Fit Interview Framework', type: 'Video', source: 'Masterclass: YC Style', date: '3 days ago' },
    { id: 5, title: 'Cap Table Template (XLS)', type: 'Note', source: 'Finance Resources', date: 'Oct 5, 2026' },
    { id: 6, title: 'Building a Pitch Deck That Converts', type: 'Video', source: 'Fundraising Essentials', date: '5 days ago' },
    { id: 7, title: 'Pricing Strategy for SaaS Products', type: 'Class', source: 'Live Session #31', date: 'Oct 3, 2026' },
    { id: 8, title: 'Startup Financial Model - Revenue Forecasting', type: 'Note', source: 'Finance Deep Dive', date: 'Sep 28, 2026' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', class: '' });
  const [editingId, setEditingId] = useState(null);
  const editorRef = useRef(null);
  const isLoaded = useRef(false);

  const defaultNotes = [
    { id: 1, title: 'Fundraising Metrics to Track', content: '<b>CAC</b> must be less than LTV / 3.<br>Important: Always track churn rate monthly.<br>Benchmark: Series A companies should aim for <b>3:1 LTV/CAC ratio</b>.', class: 'Investor Pitch Masterclass', date: 'Apr 8, 2025' },
    { id: 2, title: 'Python List Comprehensions', content: 'Syntax: <code>[expression for item in iterable if condition]</code><br>Makes code cleaner and faster.<br>Example: <code>squares = [x**2 for x in range(10)]</code>', class: 'Python for Startups', date: 'Apr 2, 2025' },
    { id: 3, title: 'Unit Economics Breakdown', content: '<b>Key formulas:</b><ul><li>ARPU = Total Revenue / Total Users</li><li>Gross Margin = (Revenue - COGS) / Revenue</li><li>Payback Period = CAC / (ARPU × Gross Margin)</li></ul>Goal: Payback under 12 months.', class: 'Startup Fundamentals', date: 'Mar 28, 2025' },
    { id: 4, title: 'Go-To-Market Strategy Framework', content: '<b>5 Steps to GTM:</b><ul><li>Define your ICP (Ideal Customer Profile)</li><li>Map the buyer journey</li><li>Choose acquisition channels</li><li>Set pricing & packaging</li><li>Build feedback loops</li></ul>Always start with <b>one channel</b> and double down.', class: 'Growth Hacking 101', date: 'Mar 22, 2025' },
    { id: 5, title: 'SQL Joins Cheat Sheet', content: '<b>Types of Joins:</b><ul><li><b>INNER JOIN</b> — matching rows only</li><li><b>LEFT JOIN</b> — all from left + matches</li><li><b>RIGHT JOIN</b> — all from right + matches</li><li><b>FULL OUTER</b> — everything</li></ul>Use aliases for cleaner queries.', class: 'Data Analytics', date: 'Mar 15, 2025' },
    { id: 6, title: 'Investor Meeting Prep Notes', content: 'Key points to cover:<ul><li>Problem → Market Pain</li><li>Solution → Demo / Screenshots</li><li>Traction → MRR, Growth %, Users</li><li>Team → Why us?</li><li>Ask → How much and what for</li></ul><b>Practice the 2-minute pitch.</b>', class: 'Fundraising 101', date: 'Mar 10, 2025' },
  ];

  // Load notes from localStorage or use defaults
  useEffect(() => {
    const savedNotes = localStorage.getItem('startup_india_notes_v5');
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        setNotes(parsed.length > 0 ? parsed : defaultNotes);
      } catch { setNotes(defaultNotes); }
    } else {
      setNotes(defaultNotes);
    }
    isLoaded.current = true;
  }, []);

  // Save notes only after initial load
  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem('startup_india_notes_v5', JSON.stringify(notes));
    }
  }, [notes]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setCurrentNote(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  const handleSaveNote = () => {
    const content = editorRef.current ? editorRef.current.innerHTML : currentNote.content;
    if (!currentNote.title || !content || content === '<br>') return;
    
    const noteData = { 
      ...currentNote, 
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    };

    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...noteData, id: editingId } : n));
    } else {
      setNotes([{ ...noteData, id: Date.now() }, ...notes]);
    }
    
    setShowForm(false);
    setCurrentNote({ title: '', content: '', class: '' });
    setEditingId(null);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setEditingId(note.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentNote({ title: '', content: '', class: '' });
    setEditingId(null);
  };

  return (
    <div className="platform-page" style={{ padding: '2rem 4rem 4rem', background: '#fff', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>Personal Space</h1>
        <p style={{ fontSize: '1rem', color: '#666', margin: 0 }}>Your private hub for notes, insights, and saved classes.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #eee', marginBottom: '2rem', paddingBottom: '2px' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button 
            onClick={() => setActiveTab('notes')}
            style={{ 
              padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.1rem', fontWeight: activeTab === 'notes' ? 800 : 600,
              color: activeTab === 'notes' ? '#111' : '#666',
              borderBottom: activeTab === 'notes' ? '3px solid #e92222' : '3px solid transparent',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            <Icon name="fileText" size={18} color={activeTab === 'notes' ? '#111' : '#666'} /> My Notes
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            style={{ 
              padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.1rem', fontWeight: activeTab === 'bookmarks' ? 800 : 600,
              color: activeTab === 'bookmarks' ? '#111' : '#666',
              borderBottom: activeTab === 'bookmarks' ? '3px solid #e92222' : '3px solid transparent',
              display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            <Icon name="bookmark" size={18} color={activeTab === 'bookmarks' ? '#111' : '#666'} /> Saved Bookmarks
          </button>
        </div>

        {activeTab === 'notes' && (
          <button 
            onClick={() => { setEditingId(null); setCurrentNote({ title: '', content: '', class: '' }); setShowForm(!showForm); }}
            style={{ 
              background: '#000', color: '#fff', padding: '12px 24px', borderRadius: '12px', 
              fontWeight: 800, fontSize: '0.9rem', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            <Icon name="plus" size={16} color="#fff" /> New Note
          </button>
        )}
      </div>

      <div>
        <AnimatePresence mode="wait">
          {activeTab === 'notes' ? (
            <motion.div 
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Inline Note Form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden', marginBottom: '2rem' }}
                  >
                    <div style={{ background: '#f9f9f9', borderRadius: '20px', padding: '2.5rem', border: '1px solid #eee' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <button onClick={handleCancel} style={{ border: '1px solid #eee', background: '#fff', width: 38, height: 38, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Back">
                          <Icon name="chevronLeft" size={18} color="#111" />
                        </button>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111' }}>
                          {editingId ? 'Edit Note' : 'Create a New Note'}
                        </h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#999', marginBottom: '8px' }}>TITLE</label>
                          <input 
                            type="text" 
                            value={currentNote.title}
                            onChange={e => setCurrentNote({...currentNote, title: e.target.value})}
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #eee', background: '#fff', fontSize: '1rem', fontWeight: 600 }}
                            placeholder="e.g. Fundraising Strategy"
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#999', marginBottom: '8px' }}>CONTENT</label>
                          <div style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fff', overflow: 'hidden' }}>
                            <div style={{ padding: '10px 16px', borderBottom: '1px solid #eee', display: 'flex', gap: '8px' }}>
                              <button onMouseDown={e => { e.preventDefault(); execCommand('bold'); }} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontWeight: 800 }}>B</button>
                              <button onMouseDown={e => { e.preventDefault(); execCommand('italic'); }} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontStyle: 'italic', fontWeight: 800 }}>I</button>
                              <button onMouseDown={e => { e.preventDefault(); execCommand('insertUnorderedList'); }} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontWeight: 800 }}>•</button>
                            </div>
                            <div 
                              ref={editorRef}
                              contentEditable
                              onInput={() => setCurrentNote(prev => ({ ...prev, content: editorRef.current.innerHTML }))}
                              style={{ minHeight: '150px', padding: '16px', outline: 'none', fontSize: '1rem', fontWeight: 500, color: '#111', lineHeight: 1.6 }}
                              dangerouslySetInnerHTML={{ __html: currentNote.content }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#999', marginBottom: '8px' }}>ASSOCIATED CLASS (OPTIONAL)</label>
                          <input 
                            type="text" 
                            value={currentNote.class}
                            onChange={e => setCurrentNote({...currentNote, class: e.target.value})}
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #eee', background: '#fff', fontSize: '1rem', fontWeight: 600 }}
                            placeholder="e.g. Finance 101"
                          />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button 
                            onClick={handleCancel}
                            style={{ padding: '14px 28px', borderRadius: '12px', border: '1px solid #eee', background: '#fff', color: '#666', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleSaveNote}
                            style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: '#e92222', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}
                          >
                            {editingId ? 'Save Changes' : 'Save Note'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notes Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
                {notes.map((note) => (
                  <div key={note.id} style={{ position: 'relative', background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(note)} style={{ border: '1px solid #f0f0f0', background: '#fff', width: 34, height: 34, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit"><Icon name="pencil" size={14} color="#333" /></button>
                      <button onClick={() => handleDelete(note.id)} style={{ border: '1px solid #fff5f5', background: '#fff5f5', width: 34, height: 34, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete"><Icon name="trash" size={14} color="#e92222" /></button>
                    </div>

                    <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 800, color: '#111', paddingRight: '5rem' }}>{note.title}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', background: '#f9f9f9', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, width: 'fit-content', marginBottom: '1rem' }}>
                       <Icon name="heart" size={12} color="#e92222" stroke={2.5} /> {note.class || 'General Notes'}
                    </div>

                    <div 
                      className="note-preview-content"
                      style={{ margin: '0 0 1.2rem', fontSize: '0.9rem', color: '#444', lineHeight: 1.6, fontWeight: 500, flex: 1, overflow: 'hidden', maxHeight: '120px', maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />

                    <div style={{ paddingTop: '1rem', borderTop: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: 600 }}>{note.date}</span>
                        <button onClick={() => handleEdit(note)} style={{ background: 'none', border: 'none', color: '#e92222', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                           Read full note <Icon name="arrowRight" size={14} color="#e92222" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>

              {notes.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No notes yet. Click "+ New Note" to get started!</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="bookmarks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {bookmarks.map((b) => (
                  <div key={b.id} style={{ padding: '1.5rem 2rem', borderRadius: '16px', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                       <div style={{ 
                         width: 44, height: 44, borderRadius: '12px', 
                         background: b.type === 'Video' ? '#fff5f5' : b.type === 'Class' ? '#f0f7ff' : '#f9f9f9',
                         display: 'flex', alignItems: 'center', justifyContent: 'center' 
                       }}>
                          <Icon 
                             name={b.type === 'Video' ? 'recorded' : b.type === 'Class' ? 'live' : 'fileText'} 
                             size={20} 
                             color={b.type === 'Video' ? '#e92222' : b.type === 'Class' ? '#3b82f6' : '#666'} 
                          />
                       </div>
                       <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#111' }}>{b.title}</h4>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#999' }}>{b.source} • Saved {b.date}</span>
                       </div>
                    </div>
                    <button style={{ background: '#fff', border: '1px solid #eee', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 800, color: '#111', cursor: 'pointer' }}>
                       Open
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .note-preview-content ul, .note-preview-content ol { margin: 6px 0; padding-left: 18px; }
        .note-preview-content code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 20px; }
        [contenteditable]:empty:before { content: "Start writing your note..."; color: #ccc; pointer-events: none; }
      `}</style>
    </div>
  );
}
