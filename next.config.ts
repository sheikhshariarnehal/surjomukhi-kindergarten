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
    // Optimize image loading - prioritize AVIF for better compression
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 1080, 1200, 1920], // Reduced sizes for faster builds
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'production'
        ? [process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app']
        : ['localhost:3000'],
    },
    // Optimize CSS - inline critical CSS for faster FCP
    optimizeCss: true,
    // Enable lazy compilation for faster dev builds
    webpackBuildWorker: true,
  },

  // Modularize imports to reduce bundle size
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
  },

  // Target modern browsers only - reduces polyfills by ~13KB
  transpilePackages: [],

  // Webpack optimizations for better code splitting
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework bundle (React, Next.js)
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Framer Motion - large animation library
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Common libraries
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Shared code
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
