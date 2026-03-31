const os = require('os');

// ─── RESPONSE TIME HISTOGRAM ──────────────────────────────────
// Keep last N response times for percentile calculation
const MAX_SAMPLES = 1000;
let responseTimes = [];

function recordResponseTime(ms) {
  responseTimes.push(ms);
  if (responseTimes.length > MAX_SAMPLES) {
    responseTimes = responseTimes.slice(-MAX_SAMPLES);
  }
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

function getLatencyStats() {
  if (responseTimes.length === 0) {
    return { p50: 0, p95: 0, p99: 0, avg: 0, count: 0 };
  }
  const sorted = [...responseTimes].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  return {
    p50: Math.round(percentile(sorted, 50)),
    p95: Math.round(percentile(sorted, 95)),
    p99: Math.round(percentile(sorted, 99)),
    avg: Math.round(sum / sorted.length),
    count: sorted.length,
  };
}

// ─── CORE METRICS ─────────────────────────────────────────────
const metrics = {
  requestsTotal: 0,
  requestsByRoute: {},
  requestsByStatus: {},
  errorsTotal: 0,
  startedAt: new Date().toISOString(),
};

function recordRequest(routeKey, statusCode) {
  metrics.requestsTotal += 1;
  metrics.requestsByRoute[routeKey] = (metrics.requestsByRoute[routeKey] || 0) + 1;

  const statusGroup = `${Math.floor(statusCode / 100)}xx`;
  metrics.requestsByStatus[statusGroup] = (metrics.requestsByStatus[statusGroup] || 0) + 1;
}

function recordError() {
  metrics.errorsTotal += 1;
}

// ─── MIDDLEWARE ────────────────────────────────────────────────
function metricsMiddleware(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    recordResponseTime(durationMs);

    const routeKey = `${req.method} ${req.route ? req.route.path : req.path}`;
    recordRequest(routeKey, res.statusCode);
    if (res.statusCode >= 500) {
      recordError();
    }
  });
  next();
}

// ─── SNAPSHOT ─────────────────────────────────────────────────
function getMetricsSnapshot() {
  const mem = process.memoryUsage();
  const cpus = os.cpus();
  const loadAvg = os.loadavg();

  return {
    requests: {
      total: metrics.requestsTotal,
      byStatus: metrics.requestsByStatus,
      errors: metrics.errorsTotal,
      errorRate:
        metrics.requestsTotal > 0
          ? ((metrics.errorsTotal / metrics.requestsTotal) * 100).toFixed(2) + '%'
          : '0%',
    },
    latency: getLatencyStats(),
    system: {
      uptime: Math.round(process.uptime()),
      startedAt: metrics.startedAt,
      memory: {
        rss: Math.round(mem.rss / 1024 / 1024) + 'MB',
        heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + 'MB',
        external: Math.round(mem.external / 1024 / 1024) + 'MB',
      },
      cpu: {
        cores: cpus.length,
        loadAvg: {
          '1m': loadAvg[0].toFixed(2),
          '5m': loadAvg[1].toFixed(2),
          '15m': loadAvg[2].toFixed(2),
        },
      },
      worker: process.env.pm_id || 'standalone',
      pid: process.pid,
    },
    topRoutes: Object.entries(metrics.requestsByRoute)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {}),
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  metricsMiddleware,
  getMetricsSnapshot,
};
