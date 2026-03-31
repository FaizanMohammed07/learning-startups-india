// Enterprise-Grade Data Cache
// Simple, Clean, Production-Ready

class DataCache {
  constructor() {
    this.cache = new Map();
    this.expiryTimes = new Map();
  }

  // Set data with expiry time (in milliseconds)
  set(key, data, ttl = 300000) { // Default 5 minutes
    this.cache.set(key, data);
    this.expiryTimes.set(key, Date.now() + ttl);
  }

  // Get data if not expired
  get(key) {
    const expiryTime = this.expiryTimes.get(key);
    
    // Check if expired
    if (!expiryTime || Date.now() > expiryTime) {
      this.cache.delete(key);
      this.expiryTimes.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  // Clear specific key
  delete(key) {
    this.cache.delete(key);
    this.expiryTimes.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.expiryTimes.clear();
  }

  // Get cache size
  size() {
    return this.cache.size;
  }

  // Clear all cache for a specific user
  clearUserCache(userId) {
    const keysToDelete = [];
    for (const key of this.cache.keys()) {
      if (key.includes(userId)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.delete(key));
    console.log(`🗑️ Cleared ${keysToDelete.length} cache entries for user ${userId}`);
  }

  // Clear all cache matching a pattern
  clearPattern(pattern) {
    const keysToDelete = [];
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.delete(key));
    console.log(`🗑️ Cleared ${keysToDelete.length} cache entries matching "${pattern}"`);
  }
}

// Export singleton instance
const dataCache = new DataCache();

module.exports = { dataCache };

module.exports = { dataCache };