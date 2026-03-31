'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function getWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  } catch {
    return [];
  }
}

function removeFromWishlist(courseId) {
  const list = getWishlist().filter(c => c._id !== courseId);
  localStorage.setItem('wishlist', JSON.stringify(list));
  return list;
}

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  function handleRemove(id) {
    setItems(removeFromWishlist(id));
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Wishlist</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Your wishlist is empty.</p>
          <Link
            href="/dashboard/explore"
            style={{ color: '#3b82f6', fontWeight: 500, textDecoration: 'none' }}
          >
            Browse courses →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(course => (
            <div
              key={course._id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1rem 1.25rem',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ fontWeight: 600, marginBottom: 2 }}>{course.title}</h3>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1f2937' }}>
                  {course.price > 0 ? `₹${course.price}` : 'Free'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link
                  href={`/courses/${course.slug || course._id}`}
                  style={{
                    fontSize: '0.8rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(course._id)}
                  style={{
                    fontSize: '0.8rem',
                    color: '#ef4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
