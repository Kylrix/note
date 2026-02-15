import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  compress: true,
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'lucide-react',
      'lodash-es',
      'date-fns',
      'framer-motion',
      'react-markdown',
    ],
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/app', // Default to the app subdomain
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'app.kylrixnote.space',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/',
  //       destination: '/login', // Route auth subdomain to login page
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'auth.kylrixnote.space',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/',
  //       destination: '/send', // Handle send subdomain
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'send.kylrixnote.space',
  //         },
  //       ],
  //     },
  //     // Add more subdomain rewrites as needed
  //   ];
  // },
};

export default nextConfig;
