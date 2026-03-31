'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getEventById } from '@/lib/eventsData';
import '../../../styles/event-details.css';

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInterested, setIsInterested] = useState(false);
  const [interestedCount, setInterestedCount] = useState(166);

  // Get event data based on ID
  const event = getEventById(params.id);

  // If event not found, show error
  if (!event) {
    return (
      <div className="event-details-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1 style={{ fontSize: '24px', color: '#1f2937', marginBottom: '16px' }}>
              Event Not Found
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              The event you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/events')}
              style={{
                padding: '12px 24px',
                background: '#e63946',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + event.images.length) % event.images.length);
  };

  const handleInterested = () => {
    setIsInterested(!isInterested);
    setInterestedCount(prev => (isInterested ? prev - 1 : prev + 1));
  };

  return (
    <div className="event-details-page">
      {/* Header with Back Button */}
      <div className="event-details-header">
        <div className="container">
          <button onClick={() => router.back()} className="back-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Events
          </button>
        </div>
      </div>

      <div className="container">
        <div className="event-details-grid">
          {/* Left Column - Main Content */}
          <div className="event-main-content">
            {/* Title and Share */}
            <div className="event-title-section">
              <h1 className="event-title">{event.title}</h1>
              <button className="share-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>

            {/* Image Carousel */}
            <div className="event-image-carousel">
              <div className="carousel-container">
                <Image
                  src={event.images[currentImageIndex]}
                  alt={event.title}
                  className="carousel-image"
                  width={800}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <button className="carousel-btn prev-btn" onClick={prevImage}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="carousel-btn next-btn" onClick={nextImage}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="carousel-indicators">
                  {event.images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Category Tags */}
            <div className="event-tags">
              {event.tags.map((tag, index) => (
                <span key={index} className="event-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Interested Button */}
            <div className="interested-section">
              <button
                className={`interested-btn ${isInterested ? 'active' : ''}`}
                onClick={handleInterested}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isInterested ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                {interestedCount} are interested
              </button>
              <button
                className={`im-interested-btn ${isInterested ? 'active' : ''}`}
                onClick={handleInterested}
              >
                {isInterested ? "You're Interested" : "I'm Interested"}
              </button>
            </div>

            {/* About The Event */}
            <section className="event-section">
              <h2 className="section-title">About The Event</h2>
              <div className="event-description">
                {event.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* You Should Know */}
            <section className="event-section">
              <h2 className="section-title">You Should Know</h2>
              <div className="highlights-box">
                <div className="highlights-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <ul className="highlights-list">
                  {event.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Artists */}
            <section className="event-section">
              <h2 className="section-title">Artists</h2>
              <div className="artists-grid">
                {event.artists.map((artist, index) => (
                  <div key={index} className="artist-card">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      className="artist-image"
                      width={120}
                      height={120}
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="artist-info">
                      <h3 className="artist-name">{artist.name}</h3>
                      <p className="artist-role">{artist.role}</p>
                      {artist.bio && <p className="artist-bio">{artist.bio}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="event-sidebar">
            <div className="booking-card">
              <div className="booking-details">
                <div className="detail-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{event.date}</span>
                </div>

                <div className="detail-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{event.duration || event.time}</span>
                </div>

                <div className="detail-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Age Limit - {event.ageLimit}</span>
                </div>

                <div className="detail-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{event.language}</span>
                </div>

                <div className="detail-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{event.genre}</span>
                </div>

                <div className="detail-item location-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span>{event.location}</span>
                    <a
                      href={event.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location-link"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="booking-status">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Bookings are filling fast for Hyderabad</span>
              </div>

              <div className="booking-price">
                <span className="price-amount">{event.priceLabel}</span>
                <span className="price-status">{event.status}</span>
              </div>

              <button className="book-now-btn-large">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
