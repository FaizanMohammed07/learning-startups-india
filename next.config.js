/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24,
  },
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  webpack: (config, { isServer }) => {
    config.cache = {
      type: 'filesystem',
      cacheDirectory: path.resolve('.next/cache'),
      buildDependencies: {
        config: [__filename],
      },
    };
    return config;
  },
  experimental: {
    optimizeCss: false,
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
