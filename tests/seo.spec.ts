import { expect, test } from '@playwright/test';
import { routes } from './routes';
import { business } from '../content/business';

test.describe('SEO & semantics', () => {
  test.skip(({ isMobile }) => isMobile, 'Markup checks run once, on desktop.');

  test('every page has one H1, unique title/description and a self canonical', async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const path of routes) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator('h1'), `${path} h1 count`).toHaveCount(1);

      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(title.length, `${path} title length`).toBeLessThanOrEqual(75);
      expect(description, `${path} description`).toBeTruthy();
      expect(titles.has(title), `${path} duplicate title "${title}"`).toBe(false);
      expect(descriptions.has(description!), `${path} duplicate description`).toBe(false);
      titles.add(title);
      descriptions.add(description!);
      expect(canonical, `${path} canonical`).toBe(`https://bronzebeautiesbeautybar.com${path === '/' ? '' : path}`);

      // Every JSON-LD block must parse.
      for (const block of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(block), `${path} JSON-LD`).not.toThrow();
      }
      // Images need alt attributes (empty only for decorative ones).
      const missingAlt = await page.locator('img:not([alt])').count();
      expect(missingAlt, `${path} images without alt`).toBe(0);
    }
  });

  test('sitewide business schema matches the published NAP', async ({ page }) => {
    await page.goto('/');
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b));
    const biz = blocks.find((b) => Array.isArray(b['@type']) && b['@type'].includes('BeautySalon'));
    expect(biz.telephone).toBe(business.phone.tel);
    expect(biz.address.streetAddress).toBe(business.address.street);
    expect(biz.address.postalCode).toBe('44035');
    expect(biz.sameAs).toEqual([business.social.instagram, business.social.facebook]);
    await expect(page.locator('footer')).toContainText(business.phone.display);
  });

  test('sitemap and robots are served', async ({ request }) => {
    const sm = await request.get('/sitemap.xml');
    expect(sm.status()).toBe(200);
    const xml = await sm.text();
    const inSitemap = [...xml.matchAll(/<loc>https:\/\/bronzebeautiesbeautybar\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
    expect([...inSitemap].sort()).toEqual([...routes].sort());
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap: https://bronzebeautiesbeautybar.com/sitemap.xml');
  });

  test('unknown pages return a real 404', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('faded');
  });

  test('Miranda no longer appears anywhere', async ({ page }) => {
    for (const path of routes) {
      await page.goto(path);
      expect(await page.content(), path).not.toContain('Miranda');
    }
  });
});
