/**
 * Environment Configuration
 * FAANG-Level: Centralized config management
 * 
 * Features:
 * - Environment-specific configs
 * - Type-safe config access
 * - Secret management
 * - Validation
 */

class Config {
  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.validateConfig();
  }

  // API Configuration
  get api() {
    return {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      retryAttempts: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
      retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || '1000')
    };
  }

  // Backend Configuration
  get backend() {
    return {
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
      internalApiUrl: process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
    };
  }

  // Feature Flags
  get features() {
    return {
      enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
      enableErrorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
      enablePerformanceMonitoring: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE === 'true',
      enableAuditLogging: process.env.NEXT_PUBLIC_ENABLE_AUDIT_LOGGING !== 'false', // Default true
      enableRateLimiting: process.env.NEXT_PUBLIC_ENABLE_RATE_LIMITING !== 'false', // Default true
      maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'
    };
  }

  // Security Configuration
  get security() {
    return {
      maxLoginAttempts: parseInt(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS || '5'),
      sessionTimeout: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600000'), // 1 hour
      csrfEnabled: process.env.NEXT_PUBLIC_CSRF_ENABLED !== 'false',
      rateLimitWindow: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW || '60000'), // 1 minute
      rateLimitMax: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_MAX || '100')
    };
  }

  // Cache Configuration
  get cache() {
    return {
      ttl: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'), // 5 minutes
      maxSize: parseInt(process.env.NEXT_PUBLIC_CACHE_MAX_SIZE || '1000'),
      enableCache: process.env.NEXT_PUBLIC_ENABLE_CACHE !== 'false'
    };
  }

  // Monitoring Configuration
  get monitoring() {
    return {
      sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      datadogApiKey: process.env.NEXT_PUBLIC_DATADOG_API_KEY,
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
      enableRUM: process.env.NEXT_PUBLIC_ENABLE_RUM === 'true'
    };
  }

  // Performance Thresholds
  get performance() {
    return {
      lcpThreshold: parseInt(process.env.NEXT_PUBLIC_LCP_THRESHOLD || '2500'), // 2.5s
      fidThreshold: parseInt(process.env.NEXT_PUBLIC_FID_THRESHOLD || '100'), // 100ms
      clsThreshold: parseFloat(process.env.NEXT_PUBLIC_CLS_THRESHOLD || '0.1'),
      apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000')
    };
  }

  // Environment Checks
  get isDevelopment() {
    return this.env === 'development';
  }

  get isProduction() {
    return this.env === 'production';
  }

  get isTest() {
    return this.env === 'test';
  }

  // Validation
  validateConfig() {
    const required = [
      'NEXT_PUBLIC_API_BASE_URL'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0 && this.isProduction) {
      console.error('❌ Missing required environment variables:', missing);
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    if (missing.length > 0 && this.isDevelopment) {
      console.warn('⚠️ Missing environment variables:', missing);
    }
  }

  // Get all config (for debugging)
  getAll() {
    return {
      env: this.env,
      api: this.api,
      features: this.features,
      security: this.security,
      cache: this.cache,
      performance: this.performance,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction
    };
  }

  // Log config (safe - no secrets)
  logConfig() {
    console.log('⚙️ Configuration:', {
      environment: this.env,
      features: this.features,
      api: {
        baseUrl: this.api.baseUrl,
        timeout: this.api.timeout
      },
      cache: this.cache,
      performance: this.performance
    });
  }
}

// Export singleton instance
export const config = new Config();

// Export for use in components
export default config;
