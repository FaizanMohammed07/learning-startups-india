/**
 * Health Check API Tests
 * FAANG-Level: API endpoint testing
 */

import { GET } from '@/app/api/health/route';

describe('Health Check API', () => {
  // Set required environment variables for tests
  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:5000';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok' }),
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return healthy status', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('checks');
    expect(data.status).toBe('healthy');
  });

  it('should include database check', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.checks).toHaveProperty('database');
    expect(data.checks.database).toHaveProperty('status');
    expect(data.checks.database).toHaveProperty('responseTime');
  });

  it('should include environment check', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.checks).toHaveProperty('environment');
    expect(data.checks.environment).toHaveProperty('status');
  });

  it('should include response time', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('responseTime');
    expect(typeof data.responseTime).toBe('number');
    expect(data.responseTime).toBeGreaterThanOrEqual(0);
  });

  it('should include version', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('version');
    expect(typeof data.version).toBe('string');
  });

  it('should include environment', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('environment');
    expect(['development', 'production', 'test']).toContain(data.environment);
  });
});
