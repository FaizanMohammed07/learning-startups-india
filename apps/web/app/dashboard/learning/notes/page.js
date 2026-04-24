'use client';

import { useState, useEffect } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch('/api/v1/learning/notes');
        const json = await res.json();
        if (json.success) setNotes(json.data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(n => n.content.toLowerCase().includes(searchTerm.toLowerCase()));

  const deleteNote = async (id) => {
    if (!confirm('Archive this startup insight?')) return;
    try {
      const res = await fetch(`/api/v1/learning/notes/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      alert('Failed to archive insight.');
    }
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', padding: '2.5rem 3.5rem 5rem', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#111' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .da { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) both; }
        
        .search-container { position:relative; margin-bottom:48px; }
        .search-input { width:100%; padding:22px 24px 22px 64px; border-radius:20px; border:2px solid #f3f4f6; background:#fff; outline:none; font-size:1.1rem; font-weight:500; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .search-input:focus { border-color:#C5975B; box-shadow:0 12px 40px rgba(197,151,91,0.1); transform: translateY(-2px); }
        .search-icon { position:absolute; left:26px; top:50%; transform:translateY(-50%); color:#C5975B; }
        
        .note-card { background:#fff; border-radius:28px; padding:36px; border:1px solid rgba(0,0,0,0.05); box-shadow:0 10px 30px rgba(0,0,0,0.02); transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position:relative; margin-bottom:28px; }
        .note-card:hover { transform:translateX(10px); border-color:rgba(122,31,43,0.1); box-shadow:0 20px 50px rgba(0,0,0,0.04); }
        
        .timestamp-badge { background:rgba(122,31,43,0.08); color:#7A1F2B; padding:6px 14px; border-radius:10px; font-size:0.75rem; font-weight:900; font-family:'Inter', sans-serif; letter-spacing: 0.05em; }
        .insight-tag { color:#C5975B; font-size:0.7rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; }
        
        .delete-btn { background:none; border:none; color:#e5e7eb; cursor:pointer; padding:10px; border-radius:12px; transition:all 0.3s; }
        .delete-btn:hover { color:#ef4444; background: #fee2e2; }
        .accent-bar { width:40px; height:4px; background:#C5975B; border-radius:2px; margin-bottom:20px; }
      `}} />

      <header style={{ marginBottom: '4rem' }}>
        <div className="da da1 accent-bar" />
        <h1 className="da da1" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', marginBottom: '12px' }}>Insight Repository</h1>
        <p className="da da1" style={{ fontSize: '1.2rem', color: '#666', fontWeight: 500, maxWidth: '600px', lineHeight: 1.6 }}>Your curated collection of timestamped strategic breakthroughs and high-signal observations.</p>
      </header>

      <div className="da da2 search-container">
        <svg className="search-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          className="search-input"
          type="text" 
          placeholder="Query your intellectual property assets..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gap: '24px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 160, background: '#fafafa', borderRadius: 28 }} className="animate-pulse" />
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div style={{ display: 'grid' }}>
          {filteredNotes.map((note, idx) => (
            <div key={note._id} className={`da da${idx+3} note-card`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="timestamp-badge">
                    {Math.floor(note.timestamp / 60)}:{(note.timestamp % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="insight-tag">Strategic Intellectual Asset</span>
                </div>
                <button 
                  onClick={() => deleteNote(note._id)}
                  className="delete-btn"
                  title="Archive Insight"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p style={{ fontSize: '1.2rem', color: '#333', lineHeight: 1.7, margin: 0, fontWeight: 500, letterSpacing: '-0.01em' }}>
                {note.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '6rem 0', background:'#fdfdfd', borderRadius:28, border:'2px dashed #f0f0f0' }}>
           <p style={{ color: '#aaa', fontSize: '1.1rem', fontWeight:600 }}>No matching insights found in repository.</p>
        </div>
      )}
    </div>
  );
}

