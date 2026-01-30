/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frsqsleusagftubikiwh.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
