import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Output configuration for cPanel
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // ESLint configuration for production builds
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ['src/app/(frontend)', 'src/components/frontend', 'src/lib', 'src/types'],
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },

  // TypeScript configuration for production builds
  typescript: {
    // Allow production builds to complete even if there are TypeScript errors
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pqrcyfcfzvoqtulssxdi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photos.google.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
