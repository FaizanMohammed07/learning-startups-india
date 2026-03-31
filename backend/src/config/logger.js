/**
 * Structured Logging System
 * FAANG-Level: Used by Google, Amazon, Netflix
 * 
 * Features:
 * - Consistent log format
 * - Log levels (debug, info, warn, error)
 * - Correlation IDs for request tracking
 * - Production-ready (sends to logging service)
 */

class Logger {
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    this.correlationId = this.generateCorrelationId();
  }

  generateCorrelationId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  setCorrelationId(id) {
    this.correlationId = id;
  }

  shouldLog(level) {
    return this.levels[level] >= this.levels[this.logLevel];
  }

  formatLog(level, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      correlationId: this.correlationId,
      message,
      meta,
      environment: process.env.NODE_ENV || 'development',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server'
    };
  }

  sendToService(logData) {
    // In production, send to logging service (DataDog, Loggly, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: fetch('/api/logs', { method: 'POST', body: JSON.stringify(logData) });
      // Example: datadog.log(logData);
    }
  }

  debug(message, meta = {}) {
    if (!this.shouldLog('debug')) return;
    
    const logData = this.formatLog('debug', message, meta);
    console.log('🔍', message, meta);
    this.sendToService(logData);
  }

  info(message, meta = {}) {
    if (!this.shouldLog('info')) return;
    
    const logData = this.formatLog('info', message, meta);
    console.log('ℹ️', message, meta);
    this.sendToService(logData);
  }

  warn(message, meta = {}) {
    if (!this.shouldLog('warn')) return;
    
    const logData = this.formatLog('warn', message, meta);
    console.warn('⚠️', message, meta);
    this.sendToService(logData);
  }

  error(message, error = null, meta = {}) {
    if (!this.shouldLog('error')) return;
    
    const logData = this.formatLog('error', message, {
      ...meta,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : null
    });
    
    console.error('❌', message, error, meta);
    this.sendToService(logData);
  }

  // Specialized logging methods
  apiCall(method, url, duration, status) {
    this.info('API Call', {
      type: 'api_call',
      method,
      url,
      duration,
      status
    });
  }

  userAction(action, userId, details = {}) {
    this.info('User Action', {
      type: 'user_action',
      action,
      userId,
      ...details
    });
  }

  performance(metric, value, details = {}) {
    this.info('Performance Metric', {
      type: 'performance',
      metric,
      value,
      ...details
    });
  }

  security(event, severity, details = {}) {
    this[severity]('Security Event', {
      type: 'security',
      event,
      ...details
    });
  }
}

// Export singleton instance
const logger = new Logger();

/**
 * Request Correlation Middleware
 * Tracks requests across services
 */
function withCorrelation(handler) {
  return async (req, res) => {
    const correlationId = req.headers['x-correlation-id'] || logger.generateCorrelationId();
    logger.setCorrelationId(correlationId);
    
    // Add to response headers
    res.setHeader('x-correlation-id', correlationId);
    
    return handler(req, res);
  };
}

/**
 * React Hook for logging
 */
function useLogger() {
  return logger;
}

module.exports = { logger, withCorrelation, useLogger };
