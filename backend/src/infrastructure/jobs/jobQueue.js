const { logger } = require('../observability/logger');

class InMemoryJobQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.handlers = new Map();
  }

  register(jobName, handler) {
    this.handlers.set(jobName, handler);
  }

  enqueue(jobName, payload, options = {}) {
    this.queue.push({
      jobName,
      payload,
      attempts: 0,
      maxAttempts: options.maxAttempts || 3,
      delayMs: options.delayMs || 0,
    });
    this.process();
  }

  async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      const handler = this.handlers.get(job.jobName);

      if (!handler) {
        logger.warn('Job handler not found', { jobName: job.jobName });
        continue;
      }

      try {
        if (job.delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, job.delayMs));
        }
        await handler(job.payload);
      } catch (error) {
        job.attempts += 1;
        if (job.attempts < job.maxAttempts) {
          this.queue.push(job);
        } else {
          logger.error('Job failed after retries', error, {
            jobName: job.jobName,
            attempts: job.attempts,
          });
        }
      }
    }

    this.processing = false;
  }
}

const jobQueue = new InMemoryJobQueue();

module.exports = { jobQueue };
