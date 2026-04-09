'use client';
import Icon from '@/components/Icon';
import Link from 'next/link';

export default function NotesPage() {
  return (
    <div className="platform-page">
      <header className="platform-page-header">
        <div>
          <h1 className="platform-page-title">Notes & Bookmarks</h1>
          <p className="platform-page-subtitle">Capture insights and save important moments from your learning journey.</p>
        </div>
      </header>
      
      <div className="platform-empty">
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', background: 'var(--red-50)', 
          margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icon name="bookmark" size={40} color="var(--brand-red)" />
        </div>
        <h2>Your notebook is empty</h2>
        <p>You haven't saved any notes or bookmarks yet. Start learning to capture your first insight!</p>
        <Link href="/courses" className="btn-brand">
          Browse Courses <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
}
