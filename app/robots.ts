import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/business';

export default function robots(): MetadataRoute.Robots {
  // Preview deployments also send X-Robots-Tag: noindex (see next.config.ts).
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';
  return {
    rules: isProduction ? [{ userAgent: '*', allow: '/' }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
