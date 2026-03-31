/**
 * Security Module Tests
 * FAANG-Level: Comprehensive security testing
 */

import {
  sanitizeInput,
  validateEmail,
  validatePasswordStrength,
  securityMonitor,
  rateLimiter,
} from '@/lib/security'

describe('Security Module', () => {
  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('</script>')
    })

    it('should remove javascript: protocol', () => {
      const input = 'javascript:alert("xss")'
      const result = sanitizeInput(input)
      expect(result).not.toContain('javascript:')
    })

    it('should remove event handlers', () => {
      const input = '<div onclick="alert()">Click</div>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('onclick=')
    })

    it('should handle normal text', () => {
      const input = 'Hello World'
      const result = sanitizeInput(input)
      expect(result).toBe('Hello World')
    })

    it('should trim whitespace', () => {
      const input = '  test  '
      const result = sanitizeInput(input)
      expect(result).toBe('test')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('test @example.com')).toBe(false)
    })
  })

  describe('validatePasswordStrength', () => {
    it('should validate strong password', () => {
      const result = validatePasswordStrength('Test@123')
      expect(result.isValid).toBe(true)
      expect(result.strength).toBe('strong')
    })

    it('should reject weak password', () => {
      const result = validatePasswordStrength('test')
      expect(result.isValid).toBe(false)
      expect(result.strength).toBe('weak')
    })

    it('should check password length', () => {
      const result = validatePasswordStrength('Test@12')
      expect(result.feedback.length).toBe(false)
    })

    it('should check for uppercase', () => {
      const result = validatePasswordStrength('test@123')
      expect(result.feedback.uppercase).toBe(false)
    })

    it('should check for numbers', () => {
      const result = validatePasswordStrength('Test@abc')
      expect(result.feedback.numbers).toBe(false)
    })

    it('should check for special characters', () => {
      const result = validatePasswordStrength('Test1234')
      expect(result.feedback.special).toBe(false)
    })
  })

  describe('securityMonitor', () => {
    it('should detect XSS attempts', () => {
      expect(securityMonitor.detectXSS('<script>alert()</script>')).toBe(true)
      expect(securityMonitor.detectXSS('javascript:void(0)')).toBe(true)
      expect(securityMonitor.detectXSS('<iframe src="evil"></iframe>')).toBe(true)
      expect(securityMonitor.detectXSS('normal text')).toBe(false)
    })

    it('should detect SQL injection attempts', () => {
      expect(securityMonitor.detectSQLInjection("' OR '1'='1")).toBe(true)
      expect(securityMonitor.detectSQLInjection('SELECT * FROM users')).toBe(true)
      expect(securityMonitor.detectSQLInjection('DROP TABLE users')).toBe(true)
      expect(securityMonitor.detectSQLInjection('normal text')).toBe(false)
    })
  })

  describe('rateLimiter', () => {
    beforeEach(() => {
      rateLimiter.reset('test-user')
    })

    it('should allow requests within limit', () => {
      expect(rateLimiter.isAllowed('test-user')).toBe(true)
      expect(rateLimiter.isAllowed('test-user')).toBe(true)
    })

    it('should block requests exceeding limit', () => {
      // Create rate limiter with low limit for testing
      const testLimiter = new (rateLimiter.constructor)(5, 60000)
      
      // Make 5 requests (should all pass)
      for (let i = 0; i < 5; i++) {
        expect(testLimiter.isAllowed('test-user')).toBe(true)
      }
      
      // 6th request should fail
      expect(testLimiter.isAllowed('test-user')).toBe(false)
    })

    it('should reset user limit', () => {
      rateLimiter.isAllowed('test-user')
      rateLimiter.reset('test-user')
      expect(rateLimiter.isAllowed('test-user')).toBe(true)
    })
  })
})
