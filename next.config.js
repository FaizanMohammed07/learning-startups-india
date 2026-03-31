/** @type {import('next').NextConfig} */
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
  // Optimize for production
  swcMinify: true,
  reactStrictMode: true,
  // Better for Netlify deployment
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Enable compression
  compress: true,
  // Experimental optimizations
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
