/**
 * Config Module Tests
 * FAANG-Level: Configuration testing
 */

import { config } from '@/lib/config'

describe('Config Module', () => {
  describe('api configuration', () => {
    it('should return API config', () => {
      expect(config.api).toHaveProperty('baseUrl')
      expect(config.api).toHaveProperty('timeout')
      expect(config.api).toHaveProperty('retryAttempts')
      expect(config.api).toHaveProperty('retryDelay')
    })

    it('should have valid timeout', () => {
      expect(typeof config.api.timeout).toBe('number')
      expect(config.api.timeout).toBeGreaterThan(0)
    })
  })

  describe('features configuration', () => {
    it('should return features config', () => {
      expect(config.features).toHaveProperty('enableAnalytics')
      expect(config.features).toHaveProperty('enableErrorTracking')
      expect(config.features).toHaveProperty('enablePerformanceMonitoring')
      expect(config.features).toHaveProperty('enableAuditLogging')
      expect(config.features).toHaveProperty('enableRateLimiting')
    })

    it('should have boolean feature flags', () => {
      expect(typeof config.features.enableAnalytics).toBe('boolean')
      expect(typeof config.features.enableErrorTracking).toBe('boolean')
    })
  })

  describe('security configuration', () => {
    it('should return security config', () => {
      expect(config.security).toHaveProperty('maxLoginAttempts')
      expect(config.security).toHaveProperty('sessionTimeout')
      expect(config.security).toHaveProperty('rateLimitWindow')
      expect(config.security).toHaveProperty('rateLimitMax')
    })

    it('should have valid security values', () => {
      expect(config.security.maxLoginAttempts).toBeGreaterThan(0)
      expect(config.security.sessionTimeout).toBeGreaterThan(0)
      expect(config.security.rateLimitMax).toBeGreaterThan(0)
    })
  })

  describe('cache configuration', () => {
    it('should return cache config', () => {
      expect(config.cache).toHaveProperty('ttl')
      expect(config.cache).toHaveProperty('maxSize')
      expect(config.cache).toHaveProperty('enableCache')
    })

    it('should have valid cache values', () => {
      expect(typeof config.cache.ttl).toBe('number')
      expect(typeof config.cache.maxSize).toBe('number')
      expect(typeof config.cache.enableCache).toBe('boolean')
    })
  })

  describe('performance configuration', () => {
    it('should return performance thresholds', () => {
      expect(config.performance).toHaveProperty('lcpThreshold')
      expect(config.performance).toHaveProperty('fidThreshold')
      expect(config.performance).toHaveProperty('clsThreshold')
    })

    it('should have valid thresholds', () => {
      expect(config.performance.lcpThreshold).toBeGreaterThan(0)
      expect(config.performance.fidThreshold).toBeGreaterThan(0)
      expect(config.performance.clsThreshold).toBeGreaterThan(0)
    })
  })

  describe('environment checks', () => {
    it('should identify environment', () => {
      expect(typeof config.isDevelopment).toBe('boolean')
      expect(typeof config.isProduction).toBe('boolean')
      expect(typeof config.isTest).toBe('boolean')
    })

    it('should have valid environment', () => {
      expect(['development', 'production', 'test']).toContain(config.env)
    })
  })

  describe('getAll', () => {
    it('should return all configuration', () => {
      const allConfig = config.getAll()
      
      expect(allConfig).toHaveProperty('env')
      expect(allConfig).toHaveProperty('api')
      expect(allConfig).toHaveProperty('features')
      expect(allConfig).toHaveProperty('security')
      expect(allConfig).toHaveProperty('cache')
      expect(allConfig).toHaveProperty('performance')
    })
  })
})
