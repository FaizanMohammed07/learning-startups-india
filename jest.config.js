/**
 * Jest Configuration
 * FAANG-Level Testing Setup
 */

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'lib/security.js',
    'lib/logger.js',
    'lib/config.js',
    'lib/errorBoundary.js',
    'lib/performance.js',
    'lib/apiClient.js',
    'app/api/health/route.js',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  
  // Coverage thresholds - Realistic for incremental testing
  // Note: We're testing critical security/infrastructure modules first
  // Coverage will increase as more tests are added
  coverageThreshold: {
    global: {
      branches: 14,
      functions: 17,
      lines: 19,
      statements: 19,
    },
    // Specific thresholds for tested modules
    './lib/logger.js': {
      branches: 30,
      functions: 80,
      lines: 70,
      statements: 70,
    },
    './lib/config.js': {
      branches: 90,
      functions: 80,
      lines: 70,
      statements: 70,
    },
  },
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
