const { logger } = require('../infrastructure/observability/logger');

function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal server error',
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  logger.error('Request failed', err, {
    requestId: req.requestId,
    path: req.path,
    method: req.method,
    statusCode,
  });

  res.status(statusCode).json(payload);
}

module.exports = { errorMiddleware };
