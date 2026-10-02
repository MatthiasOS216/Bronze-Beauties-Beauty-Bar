import { expect, test } from '@playwright/test';
import { legacyRedirects } from '../content/redirects';

// Concrete examples for the wildcard rules.
const samples: Record<string, string> = {
  '/enlightment/category/:slug*': '/enlightment/category/Spray+Tanning',
  '/enlightment/tag/:slug*': '/enlightment/tag/spray+tan+101',
  '/enlightment/:slug*': '/enlightment/some-old-post',
};

test.describe('Legacy Squarespace redirects', () => {
  test.skip(({ isMobile }) => isMobile, 'Runs once.');

  for (const r of legacyRedirects) {
    const source = samples[r.source] ?? r.source;
    test(`${source} → ${r.destination}`, async ({ request }) => {
      const res = await request.get(source, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
      expect(new URL(res.headers()['location'], 'http://x').pathname).toBe(r.destination);
      // Single hop: the destination itself must be a 200.
      const dest = await request.get(r.destination, { maxRedirects: 0 });
      expect(dest.status()).toBe(200);
    });
  }
});
