import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // ESLint configuration for production builds
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ['src/app', 'src/components', 'src/lib', 'src/types'],
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
    // Optimize image loading - prefer AVIF for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for better caching
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // All quality values used throughout the app
    // Hero: 50, 55, 60, 70 | Other components: 75, 85, 90, 100
    qualities: [50, 55, 60, 70, 75, 85, 90, 100],
    // Cache images for 1 year (immutable assets)
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Modern browser targeting to reduce bundle size
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'production'
        ? [process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app']
        : ['localhost:3000'],
    },
  },

  // Modern JavaScript output (removes polyfills for modern browsers)
  // This reduces vendor chunk size significantly
  transpilePackages: [],
};

export default nextConfig;
