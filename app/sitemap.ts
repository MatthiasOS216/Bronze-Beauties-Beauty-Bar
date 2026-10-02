import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/business';
import { services } from '@/content/services';
import { providers } from '@/content/providers';
import { posts } from '@/content/journal';

const lastModified = new Date('2026-10-02');

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, images?: string[]): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified,
    priority,
    ...(images ? { images: images.map((i) => `${siteUrl}${i}`) } : {}),
  });

  return [
    page('/', 1),
    page('/services', 0.9),
    ...services.map((s) => page(`/${s.slug}`, 0.9, [s.hero.src.src])),
    page('/organic-spray-tanning/prep-and-aftercare', 0.8),
    page('/book', 0.8),
    page('/artists', 0.7),
    ...providers.map((p) => page(`/artists/${p.slug}`, 0.7, [p.portrait.src.src])),
    page('/visit', 0.8),
    page('/about', 0.6),
    page('/policies', 0.5),
    page('/journal', 0.5),
    ...posts.map((p) => ({ ...page(`/journal/${p.slug}`, 0.5), lastModified: new Date(p.modified) })),
    page('/privacy', 0.2),
    page('/accessibility', 0.2),
  ];
}
