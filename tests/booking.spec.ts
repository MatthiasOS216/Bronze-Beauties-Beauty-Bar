import { expect, test } from '@playwright/test';
import { bookingTargets, serviceSlugs } from './routes';

test.describe('Booking flow', () => {
  test('service with one artist goes straight to that artist’s booking page', async ({ page }) => {
    await page.goto('/book?service=nails');
    const cta = page.getByRole('link', { name: /Continue to Jennifer’s booking page/ });
    await expect(cta).toHaveAttribute('href', /jenniferwiseman1\.glossgenius\.com\/services/);
  });

  test('lashes asks which artist, then hands off correctly', async ({ page }) => {
    await page.goto('/book');
    await page.getByRole('link', { name: /Lashes/ }).first().click();
    await expect(page.locator('h1')).toContainText('lashes');
    await page.getByRole('link', { name: /Jazzmine Villegas/ }).click();
    await expect(page.getByRole('link', { name: /Continue to Jazzmine’s booking page/ })).toHaveAttribute(
      'href',
      /jazzminevillegas\.glossgenius\.com/,
    );
  });

  test('every artist hands off to her own platform', async ({ page }) => {
    for (const p of bookingTargets) {
      await page.goto(`/book?artist=${p.slug}`);
      const href = await page.getByRole('link', { name: new RegExp(`Continue to ${p.firstName}`) }).getAttribute('href');
      expect(new URL(href!).host).toBe(p.host);
      expect(href).toContain('utm_source=bronzebeautiesbeautybar.com');
    }
  });

  test('an artist who doesn’t offer the service is ignored', async ({ page }) => {
    await page.goto('/book?service=nails&artist=jazzmine-villegas');
    await expect(page.getByRole('link', { name: /Continue to Jennifer/ })).toBeVisible();
  });

  test('every service page Book CTA reaches a provider', async ({ page }) => {
    for (const slug of serviceSlugs) {
      await page.goto(`/${slug}`);
      await page.locator('[data-cta-location="service_hero"]').click();
      await expect(page).toHaveURL(new RegExp(`/book\\?service=${slug}`));
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});

test.describe('Mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Mobile only.');

  test('action bar and menu work', async ({ page }) => {
    await page.goto('/');
    const bar = page.getByRole('navigation', { name: 'Quick actions' });
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+14403056066');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: 'Visit', exact: true }).click();
    await expect(page).toHaveURL(/\/visit$/);
  });

  test('lash menu button opens its eye, then closes it again', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await expect(trigger.locator('svg.lash-icon')).toHaveAttribute('data-open', 'false');
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await expect(dialog).toBeVisible();
    const close = dialog.getByRole('button', { name: 'Close menu' });
    await expect(close.locator('svg.lash-icon')).toHaveAttribute('data-open', 'true');
    await close.click();
    await expect(dialog).toBeHidden();
    await expect(trigger.locator('svg.lash-icon')).toHaveAttribute('data-open', 'false');
  });

  test('no horizontal overflow', async ({ page }) => {
    for (const path of ['/', '/organic-spray-tanning', '/nails', '/book', '/visit', '/services']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
