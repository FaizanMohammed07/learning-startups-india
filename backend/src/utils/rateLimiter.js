/**
 * Rate Limiter
 * Prevents API abuse by limiting requests per time window
 * Industry standard: 100 requests per minute per user
 */

class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map(); // Map<key, Array<timestamp>>
    this.cleanupInterval = null;
    
    // Auto cleanup old entries every minute
    this.startCleanup();
  }
  
  /**
   * Check if request can be made
   * @param {string} key - Unique identifier (userId, IP, endpoint)
   * @returns {boolean} - Whether request is allowed
   */
  canMakeRequest(key) {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    // Remove requests outside the time window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    // Check if limit exceeded
    if (validRequests.length >= this.maxRequests) {
      const oldestRequest = validRequests[0];
      const resetTime = Math.ceil((this.windowMs - (now - oldestRequest)) / 1000);
      
      console.warn(`Rate limit exceeded for ${key}. Reset in ${resetTime}s`);
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
  
  /**
   * Get remaining requests for a key
   * @param {string} key - Unique identifier
   * @returns {number} - Number of remaining requests
   */
  getRemainingRequests(key) {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
  
  /**
   * Get time until reset
   * @param {string} key - Unique identifier
   * @returns {number} - Milliseconds until reset
   */
  getResetTime(key) {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    if (userRequests.length === 0) return 0;
    
    const oldestRequest = userRequests[0];
    return Math.max(0, this.windowMs - (now - oldestRequest));
  }
  
  /**
   * Reset rate limit for a key
   * @param {string} key - Unique identifier
   */
  reset(key) {
    this.requests.delete(key);
  }
  
  /**
   * Clear all rate limits
   */
  clearAll() {
    this.requests.clear();
  }
  
  /**
   * Start automatic cleanup of old entries
   */
  startCleanup() {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      
      for (const [key, timestamps] of this.requests.entries()) {
        const validRequests = timestamps.filter(
          timestamp => now - timestamp < this.windowMs
        );
        
        if (validRequests.length === 0) {
          this.requests.delete(key);
        } else {
          this.requests.set(key, validRequests);
        }
      }
    }, 60000); // Cleanup every minute
  }
  
  /**
   * Stop cleanup interval
   */
  stopCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

/**
 * Create a rate-limited function wrapper
 * @param {Function} fn - Function to rate limit
 * @param {Object} options - Rate limiter options
 * @returns {Function} - Rate-limited function
 */
function rateLimited(fn, options = {}) {
  const limiter = new RateLimiter(
    options.maxRequests || 100,
    options.windowMs || 60000
  );
  
  return async function(...args) {
    const key = options.keyFn ? options.keyFn(...args) : 'default';
    
    if (!limiter.canMakeRequest(key)) {
      const resetTime = Math.ceil(limiter.getResetTime(key) / 1000);
      throw new Error(
        `Rate limit exceeded. Please try again in ${resetTime} seconds.`
      );
    }
    
    return await fn(...args);
  };
}

/**
 * Global rate limiters for different operations
 */
const rateLimiters = {
  // API calls - 100 per minute
  api: new RateLimiter(100, 60000),
  
  // Authentication - 5 per minute (stricter)
  auth: new RateLimiter(5, 60000),
  
  // Enrollment - 10 per hour
  enrollment: new RateLimiter(10, 3600000),
  
  // Video progress updates - 60 per minute
  videoProgress: new RateLimiter(60, 60000),
  
  // Search - 30 per minute
  search: new RateLimiter(30, 60000)
};

module.exports = { RateLimiter, rateLimited, rateLimiters };
