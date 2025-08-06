/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    // domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },};

export default nextConfig;
