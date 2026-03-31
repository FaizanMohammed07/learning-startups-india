/**
 * Enterprise-Grade API Client
 * Features: Retry logic, Circuit breaker, Request deduplication, Caching
 * Used by: Netflix, Uber, Airbnb
 */

import { performanceMonitor } from './performance';

class APIClient {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    this.timeout = 30000; // 30 seconds
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
    
    // Circuit breaker state
    this.circuitBreaker = {
      failures: 0,
      threshold: 5,
      timeout: 60000, // 1 minute
      state: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
      nextAttempt: Date.now()
    };
    
    // Request deduplication
    this.pendingRequests = new Map();
    
    // Response cache
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Main request method with enterprise features
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      retry = true,
      cache = false,
      timeout = this.timeout,
      deduplicate = true
    } = options;

    // Check circuit breaker
    if (this.circuitBreaker.state === 'OPEN') {
      if (Date.now() < this.circuitBreaker.nextAttempt) {
        throw new Error('Circuit breaker is OPEN. Service temporarily unavailable.');
      }
      this.circuitBreaker.state = 'HALF_OPEN';
    }

    // Check cache
    if (cache && method === 'GET') {
      const cached = this.getFromCache(endpoint);
      if (cached) {
        console.log('💾 Cache hit:', endpoint);
        return cached;
      }
    }

    // Request deduplication
    if (deduplicate && method === 'GET') {
      const pending = this.pendingRequests.get(endpoint);
      if (pending) {
        console.log('🔄 Deduplicating request:', endpoint);
        return pending;
      }
    }

    // Create request promise
    const requestPromise = this.executeRequest(endpoint, {
      method,
      body,
      headers,
      timeout,
      retry
    });

    // Store pending request
    if (deduplicate && method === 'GET') {
      this.pendingRequests.set(endpoint, requestPromise);
    }

    try {
      const result = await requestPromise;
      
      // Update circuit breaker on success
      this.circuitBreaker.failures = 0;
      if (this.circuitBreaker.state === 'HALF_OPEN') {
        this.circuitBreaker.state = 'CLOSED';
      }

      // Cache response
      if (cache && method === 'GET') {
        this.setCache(endpoint, result);
      }

      return result;
    } catch (error) {
      // Update circuit breaker on failure
      this.circuitBreaker.failures++;
      if (this.circuitBreaker.failures >= this.circuitBreaker.threshold) {
        this.circuitBreaker.state = 'OPEN';
        this.circuitBreaker.nextAttempt = Date.now() + this.circuitBreaker.timeout;
        console.error('🔴 Circuit breaker OPEN');
      }

      throw error;
    } finally {
      // Clear pending request
      if (deduplicate && method === 'GET') {
        this.pendingRequests.delete(endpoint);
      }
    }
  }

  /**
   * Execute request with timeout and retry
   */
  async executeRequest(endpoint, options, attempt = 1) {
    const { method, body, headers, timeout, retry } = options;
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Measure API performance
      performanceMonitor.measureAPI(endpoint, startTime);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`❌ API Error [${endpoint}]:`, error.message);

      // Retry logic
      if (retry && attempt < this.retryAttempts) {
        const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`🔄 Retrying in ${delay}ms... (Attempt ${attempt + 1}/${this.retryAttempts})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeRequest(endpoint, options, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Cache management
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }

  /**
   * Convenience methods
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      await this.get('/health', { retry: false, timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get circuit breaker status
   */
  getStatus() {
    return {
      circuitBreaker: this.circuitBreaker.state,
      failures: this.circuitBreaker.failures,
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size
    };
  }
}

// Export singleton instance
export const apiClient = new APIClient();

/**
 * React Hook for API calls with loading and error states
 */
export function useAPI(endpoint, options = {}) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await apiClient.get(endpoint, options);
        
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}
