'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, apiDelete } from '@/lib/api';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'info', target: 'all' });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await apiGet(`/api/v1/admin/notifications?page=${page}&limit=20`);
    if (data) {
      setNotifications(data.notifications || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSend = async () => {
    if (!form.title || !form.message) return;
    await apiPost('/api/v1/admin/notifications', form);
    setShowModal(false);
    setForm({ title: '', message: '', type: 'info', target: 'all' });
    load();
  };

  const handleDelete = async id => {
    if (!confirm('Delete this notification?')) return;
    await apiDelete(`/api/v1/admin/notifications/${id}`);
    load();
  };

  const typeColors = {
    info: 'badge-blue',
    warning: 'badge-yellow',
    success: 'badge-green',
    error: 'badge-red',
    announcement: 'badge-purple',
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
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Notifications</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Send Notification
        </button>
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
                <th>Message</th>
                <th>Type</th>
                <th>Target</th>
                <th>Sent By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(n => (
                <tr key={n._id}>
                  <td style={{ fontWeight: 600 }}>{n.title}</td>
                  <td
                    style={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#475569',
                    }}
                  >
                    {n.message}
                  </td>
                  <td>
                    <span className={`badge ${typeColors[n.type] || 'badge-gray'}`}>{n.type}</span>
                  </td>
                  <td>
                    <span className="badge badge-gray">{n.target}</span>
                  </td>
                  <td style={{ color: '#64748b' }}>{n.sentBy?.fullName || 'System'}</td>
                  <td style={{ fontSize: 12.5, color: '#94a3b8' }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(n._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                    No notifications sent yet
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
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Send Notification</h2>
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
                <label>Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="admin-form-group">
                  <label>Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Target</label>
                  <select
                    value={form.target}
                    onChange={e => setForm({ ...form, target: e.target.value })}
                  >
                    <option value="all">All Users</option>
                    <option value="users">Users Only</option>
                    <option value="mentors">Mentors</option>
                    <option value="investors">Investors</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
