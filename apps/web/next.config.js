/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
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
};

module.exports = nextConfig;
