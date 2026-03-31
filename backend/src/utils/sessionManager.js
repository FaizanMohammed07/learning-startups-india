/**
 * Server-Side Session Manager
 * Tracks active sessions via in-memory store with configurable timeout.
 */

class SessionManager {
  constructor(options = {}) {
    this.sessionTimeout = options.sessionTimeout || 30 * 60 * 1000; // 30 minutes
    this.sessions = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000);
  }

  touch(sessionId) {
    this.sessions.set(sessionId, Date.now());
  }

  isActive(sessionId) {
    const lastActivity = this.sessions.get(sessionId);
    if (!lastActivity) return false;
    if (Date.now() - lastActivity > this.sessionTimeout) {
      this.sessions.delete(sessionId);
      return false;
    }
    return true;
  }

  remove(sessionId) {
    this.sessions.delete(sessionId);
  }

  cleanup() {
    const now = Date.now();
    for (const [id, ts] of this.sessions.entries()) {
      if (now - ts > this.sessionTimeout) {
        this.sessions.delete(id);
      }
    }
  }

  stop() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  get activeCount() {
    return this.sessions.size;
  }
}

module.exports = { SessionManager };
