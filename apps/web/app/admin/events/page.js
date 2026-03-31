'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'webinar',
    date: '',
    venue: 'Online',
    meetingLink: '',
    maxAttendees: 100,
    status: 'upcoming',
  });

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 20 });
    if (statusFilter) params.set('status', statusFilter);
    const { data } = await apiGet(`/api/v1/admin/events?${params}`);
    if (data) {
      setEvents(data.events || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    }
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditEvent(null);
    setForm({
      title: '',
      description: '',
      type: 'webinar',
      date: '',
      venue: 'Online',
      meetingLink: '',
      maxAttendees: 100,
      status: 'upcoming',
    });
    setShowModal(true);
  };

  const openEdit = ev => {
    setEditEvent(ev);
    setForm({
      title: ev.title,
      description: ev.description || '',
      type: ev.type,
      date: ev.date ? new Date(ev.date).toISOString().slice(0, 16) : '',
      venue: ev.venue || 'Online',
      meetingLink: ev.meetingLink || '',
      maxAttendees: ev.maxAttendees || 100,
      status: ev.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.date) return;
    if (editEvent) {
      await apiPatch(`/api/v1/admin/events/${editEvent._id}`, form);
    } else {
      await apiPost('/api/v1/admin/events', form);
    }
    setShowModal(false);
    load();
  };

  const handleDelete = async id => {
    if (!confirm('Delete this event?')) return;
    await apiDelete(`/api/v1/admin/events/${id}`);
    load();
  };

  return (
    <div className="admin-page">
      <div
        className="admin-topbar"
        style={{
          margin: '-28px -28px 24px',
          padding: '18px 28px',
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Events & Webinars</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + New Event
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          style={{
            padding: '8px 14px',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            fontSize: 13,
            outline: 'none',
          }}
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner" />
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Registrations</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev._id}>
                  <td style={{ fontWeight: 600 }}>{ev.title}</td>
                  <td>
                    <span className="badge badge-purple">{ev.type}</span>
                  </td>
                  <td style={{ fontSize: 12.5 }}>{new Date(ev.date).toLocaleString()}</td>
                  <td style={{ color: '#64748b' }}>{ev.venue}</td>
                  <td>
                    {(ev.registrations || []).length}
                    {ev.maxAttendees ? `/${ev.maxAttendees}` : ''}
                  </td>
                  <td>
                    <span
                      className={`badge ${ev.status === 'upcoming' ? 'badge-blue' : ev.status === 'live' ? 'badge-green' : ev.status === 'completed' ? 'badge-gray' : 'badge-red'}`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(ev)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(ev._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                    No events yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {pages > 1 && (
            <div className="admin-pagination">
              <span>
                Page {page} of {pages}
              </span>
              <div className="pagination-btns">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  Previous
                </button>
                <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editEvent ? 'Edit Event' : 'New Event'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="admin-form-group">
                  <label>Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="webinar">Webinar</option>
                    <option value="workshop">Workshop</option>
                    <option value="meetup">Meetup</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Date & Time</label>
                  <input
                    type="datetime-local"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="admin-form-group">
                  <label>Venue</label>
                  <input
                    value={form.venue}
                    onChange={e => setForm({ ...form, venue: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Max Attendees</label>
                  <input
                    type="number"
                    value={form.maxAttendees}
                    onChange={e => setForm({ ...form, maxAttendees: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Meeting Link</label>
                <input
                  value={form.meetingLink}
                  onChange={e => setForm({ ...form, meetingLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editEvent ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
