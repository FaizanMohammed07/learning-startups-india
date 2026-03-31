const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const CURRENT_LEVEL =
  LOG_LEVELS[process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')] ||
  0;

function serializeError(error) {
  if (!error) return null;
  return {
    message: error.message,
    stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
    name: error.name,
    code: error.code,
  };
}

function buildLog(level, message, context = {}) {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    worker: process.env.pm_id || 'standalone',
    pid: process.pid,
    ...context,
  };
}

function write(entry) {
  if (LOG_LEVELS[entry.level] < CURRENT_LEVEL) return;
  const line = JSON.stringify(entry);
  if (entry.level === 'error') {
    console.error(line);
    return;
  }
  console.log(line);
}

const logger = {
  debug(message, context = {}) {
    write(buildLog('debug', message, context));
  },
  info(message, context = {}) {
    write(buildLog('info', message, context));
  },
  warn(message, context = {}) {
    write(buildLog('warn', message, context));
  },
  error(message, error = null, context = {}) {
    write(
      buildLog('error', message, {
        ...context,
        error: serializeError(error),
      })
    );
  },
};

module.exports = { logger };
