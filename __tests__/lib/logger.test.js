/**
 * Logger Module Tests
 * FAANG-Level: Structured logging testing
 */

import { logger } from '@/lib/logger'

describe('Logger Module', () => {
  let consoleLogSpy
  let consoleWarnSpy
  let consoleErrorSpy

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  describe('debug', () => {
    it('should log debug messages', () => {
      logger.debug('Debug message', { foo: 'bar' })
      expect(consoleLogSpy).toHaveBeenCalledWith('🔍', 'Debug message', { foo: 'bar' })
    })
  })

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Info message', { foo: 'bar' })
      expect(consoleLogSpy).toHaveBeenCalledWith('ℹ️', 'Info message', { foo: 'bar' })
    })
  })

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Warning message', { foo: 'bar' })
      expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️', 'Warning message', { foo: 'bar' })
    })
  })

  describe('error', () => {
    it('should log error messages', () => {
      const error = new Error('Test error')
      logger.error('Error message', error, { foo: 'bar' })
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌', 'Error message', error, { foo: 'bar' })
    })

    it('should handle null error', () => {
      logger.error('Error message', null, { foo: 'bar' })
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('apiCall', () => {
    it('should log API calls', () => {
      logger.apiCall('GET', '/api/users', 250, 200)
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'ℹ️',
        'API Call',
        expect.objectContaining({
          type: 'api_call',
          method: 'GET',
          url: '/api/users',
          duration: 250,
          status: 200,
        })
      )
    })
  })

  describe('userAction', () => {
    it('should log user actions', () => {
      logger.userAction('login', 'user123', { email: 'test@example.com' })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'ℹ️',
        'User Action',
        expect.objectContaining({
          type: 'user_action',
          action: 'login',
          userId: 'user123',
          email: 'test@example.com',
        })
      )
    })
  })

  describe('performance', () => {
    it('should log performance metrics', () => {
      logger.performance('lcp', 1800, { rating: 'good' })
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'ℹ️',
        'Performance Metric',
        expect.objectContaining({
          type: 'performance',
          metric: 'lcp',
          value: 1800,
          rating: 'good',
        })
      )
    })
  })

  describe('security', () => {
    it('should log security events with warn severity', () => {
      logger.security('login_failed', 'warn', { email: 'test@example.com' })
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '⚠️',
        'Security Event',
        expect.objectContaining({
          type: 'security',
          event: 'login_failed',
          email: 'test@example.com',
        })
      )
    })

    it('should log security events with error severity', () => {
      logger.security('xss_attempt', 'error', { input: '<script>' })
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '❌',
        'Security Event',
        expect.objectContaining({
          type: 'security',
          event: 'xss_attempt',
          input: '<script>',
        }),
        {}
      )
    })
  })

  describe('formatLog', () => {
    it('should format log with all required fields', () => {
      const formatted = logger.formatLog('info', 'Test message', { foo: 'bar' })
      
      expect(formatted).toHaveProperty('timestamp')
      expect(formatted).toHaveProperty('level', 'INFO')
      expect(formatted).toHaveProperty('correlationId')
      expect(formatted).toHaveProperty('message', 'Test message')
      expect(formatted).toHaveProperty('meta', { foo: 'bar' })
      expect(formatted).toHaveProperty('environment')
    })
  })

  describe('correlation ID', () => {
    it('should generate unique correlation IDs', () => {
      const id1 = logger.generateCorrelationId()
      const id2 = logger.generateCorrelationId()
      
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })

    it('should allow setting correlation ID', () => {
      const customId = 'custom-correlation-id'
      logger.setCorrelationId(customId)
      
      const formatted = logger.formatLog('info', 'Test')
      expect(formatted.correlationId).toBe(customId)
    })
  })
})
