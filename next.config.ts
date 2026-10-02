import type { NextConfig } from 'next';
import { legacyRedirects } from './content/redirects';

const securityHeaders = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 2000],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    const headers = [{ source: '/:path*', headers: securityHeaders }];
    // Keep Vercel preview deployments out of search indexes.
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
      headers.push({ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] });
    }
    return headers;
  },
};

export default nextConfig;
