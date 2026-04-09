'use client';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

const MOCK_MODE = true; // 🚧 MOCK MODE: Set to true for frontend development without backend

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
}

let _refreshing = null;

async function tryRefresh() {
  if (MOCK_MODE) return true; // Mock: always successfully refresh
  if (_refreshing) return _refreshing;
  _refreshing = (async () => {
    try {
      const rt = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
      if (!rt) return false;
      const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt }),
        credentials: 'include',
      });
      const json = await res.json();
      if (res.ok && json.data?.session?.access_token) {
        localStorage.setItem('access_token', json.data.session.access_token);
        if (json.data.session.refresh_token) {
          localStorage.setItem('refresh_token', json.data.session.refresh_token);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      _refreshing = null;
    }
  })();
  return _refreshing;
}

export async function apiFetch(path, options = {}) {
  // ─── MOCK INTERCEPTOR ───────────────────────────────────────────
  if (MOCK_MODE) {
    if (path.includes('/auth/login') || path.includes('/auth/signup')) {
      const body = options.body ? JSON.parse(options.body) : {};
      return { 
        data: { 
          user: { id: 'mock-123', email: body.email || 'jaswanth@example.com', full_name: body.fullName || 'Jaswanth Reddy' },
          session: { access_token: 'mock-token', refresh_token: 'mock-refresh' }
        }, 
        error: null 
      };
    }
    
    if (path.includes('/auth/me')) {
      return { 
        data: { user: { id: 'mock-123', email: 'jaswanth@example.com', full_name: 'Jaswanth Reddy' } }, 
        error: null 
      };
    }

    if (path.includes('/auth/logout')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      return { data: { success: true }, error: null };
    }

    const MOCK_COURSES = [
      { _id: 'c1', title: 'Seed Stage Preparation', courseTitle: 'Seed Stage Preparation', category: 'Finance', description: 'Master financial modeling and unit economics for your early stage startup.', level: 'Intermediate', price: 499, thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800' },
      { _id: 'c2', title: 'Pitch Deck Workshop', courseTitle: 'Pitch Deck Workshop', category: 'Strategy', description: 'Learn the storytelling techniques that win over top-tier investors.', level: 'Advanced', price: 0, thumbnailUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800' },
      { _id: 'c3', title: 'Legal Foundations', courseTitle: 'Legal Foundations', category: 'Legal', description: 'Essential IP protection and contract frameworks for founders.', level: 'Beginner', price: 999, thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800' },
      { _id: 'c4', title: 'Market Research 101', courseTitle: 'Market Research 101', category: 'Research', description: 'Deep dive into competitor analysis and market validation.', level: 'Beginner', price: 0, thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' },
      { _id: 'c5', title: 'Go-to-Market Strategy', courseTitle: 'Go-to-Market Strategy', category: 'Marketing', description: 'Launch your product with a foolproof GTM plan and user acquisition.', level: 'Intermediate', price: 1499, thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800' },
      { _id: 'c6', title: 'Scaling Engineering', courseTitle: 'Scaling Engineering', category: 'Product', description: 'Building and managing high-performing remote engineering teams.', level: 'Advanced', price: 2999, thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800' },
    ];

    if (path.includes('/api/v1/courses')) {
      return { data: MOCK_COURSES, error: null };
    }

    if (path.includes('/api/v1/enrollments')) {
      return { data: [MOCK_COURSES[0], MOCK_COURSES[1], MOCK_COURSES[3]], error: null };
    }
    
    if (path.includes('/api/v1/activity')) {
      return { data: [
        { id: 1, type: 'course_progress', title: 'Seed Stage Prep', detail: 'Module 4 completed', date: '2026-04-08' },
        { id: 2, type: 'streak', title: 'Daily Streak', detail: '3 days reached!', date: '2026-04-07' },
      ], error: null };
    }

    if (path.includes('/api/v1/certificates')) {
      return { data: [{ id: 'cert1', courseName: 'Entrepreneurial Fundamentals', date: 'March 2026', idCode: 'ST-102938' }], error: null };
    }
  }

  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  } catch (err) {
    return { data: null, error: { message: 'Network error — server may be down', status: 0 } };
  }

  // Auto-refresh on 401 and retry once
  if (res.status === 401 && !options._retried) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      const newToken = getToken();
      const retryHeaders = {
        ...headers,
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      };
      try {
        res = await fetch(`${API_BASE}${path}`, {
          ...options,
          _retried: true,
          headers: retryHeaders,
          credentials: 'include',
        });
      } catch (err) {
        return { data: null, error: { message: 'Network error — server may be down', status: 0 } };
      }
    } else {
      // Refresh failed, user is definitely logged out. Clear tokens.
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  } else if (res.status === 401) {
    // If it's still 401 after retry or _retried was already true
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  try {
    const json = await res.json();
    if (!res.ok) {
      return {
        data: null,
        error: { message: json.message || json.error || 'Request failed', status: res.status },
      };
    }
    return { data: json.data !== undefined ? json.data : json, error: null };
  } catch (err) {
    return { data: null, error: { message: 'Invalid response from server', status: res.status } };
  }
}

export async function apiGet(path) {
  return apiFetch(path);
}

export async function apiPost(path, body) {
  return apiFetch(path, { method: 'POST', body: JSON.stringify(body) });
}

export async function apiPatch(path, body) {
  return apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) });
}

export async function apiDelete(path) {
  return apiFetch(path, { method: 'DELETE' });
}
