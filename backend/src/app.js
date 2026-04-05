const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const env = require('./config/env');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { registerRoutes } = require('./routes');
const { metricsMiddleware, getMetricsSnapshot } = require('./infrastructure/observability/metrics');
const { redisRateLimit } = require('./middlewares/rateLimit.middleware');
const { getCacheStats, isRedisReady } = require('./infrastructure/cache/redis');
const mongoose = require('mongoose');

const app = express();

// ─── SECURITY HARDENING ──────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow cross-origin resources (S3 videos)
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  })
);

// Prevent parameter pollution
app.use((req, res, next) => {
  if (req.query) {
    for (const key of Object.keys(req.query)) {
      if (Array.isArray(req.query[key])) {
        req.query[key] = req.query[key][req.query[key].length - 1];
      }
    }
  }
  next();
});

// app.use(
//   cors({
//     origin: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : '*',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
//     maxAge: 86400,
//   })
// );

const allowedOrigins = [
  'https://learning-startups-india.vercel.app',
  'https://www.innovationandentrepreneurshipcouncil.org',
  'https://innovationandentrepreneurshipcouncil.org',
  'http://localhost:3000',
  // local dev (optional)
];

console.log('mohammed sufiyan');

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman / mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    maxAge: 86400,
  })
);

app.disable('x-powered-by');
app.set('trust proxy', env.NODE_ENV === 'production' ? 1 : false);

app.use(cookieParser());
app.use((req, res, next) => {
  req.requestId = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.removeHeader('X-Powered-By');
  next();
});
app.use('/api/v1/payments/webhook', express.raw({ type: 'application/json' }));
app.use('/api/v1/payments/razorpay/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(metricsMiddleware);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Redis-backed rate limiter (100 req/min per IP, graceful fallback to in-memory above)
app.use(redisRateLimit({ windowSeconds: 60, max: 500, prefix: 'rl:global' }));

app.get('/health', (req, res) => {
  const mongoState = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  const mongoStatus =
    ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoState] || 'unknown';

  res.json({
    status: mongoState === 1 ? 'ok' : 'degraded',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    worker: process.env.pm_id || 'standalone',
    pid: process.pid,
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB',
      heap: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
    },
    mongo: mongoStatus,
    redis: isRedisReady() ? 'connected' : 'disconnected',
    cache: getCacheStats(),
  });
});

app.get('/metrics', (req, res) => {
  res.json({ success: true, data: getMetricsSnapshot() });
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts, please try again later' },
});

// Apply ONLY to sensitive routes
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/signup', authLimiter);
app.use('/api/v1/auth/forgot-password', authLimiter);

// Stricter rate limiting on auth endpoints to prevent brute-force attacks
// app.use(
//   '/api/v1/auth',
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 20,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: { success: false, message: 'Too many attempts, please try again later' },
//   })
// );

registerRoutes(app);
app.use(errorMiddleware);

module.exports = { app };
