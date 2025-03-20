/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.istockphoto.com',
      'img.clerk.com',
      'images.clerk.dev',
      'istockphoto.com',
      'clerk.com',
      'clerk.dev'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      }
    ],
    unoptimized: true
  }
};

module.exports = nextConfig; 