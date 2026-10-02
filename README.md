# Bronze Beauties Beauty Bar: website

Custom Next.js site for **Bronze Beauties Beauty Bar**, 1083 E. Broad St., Elyria, OH 44035. It replaces the Squarespace site at bronzebeautiesbeautybar.com.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4**: design tokens live in `app/globals.css` (`@theme`)
- **three / @react-three/fiber / drei**: the hero "Bronze Drop" (desktop GPUs only, loaded after the page is idle)
- **GSAP ScrollTrigger**: the hero scroll hand-off
- **Playwright + axe-core**: end-to-end, SEO, redirect and accessibility tests

## Editing content

Frequently changing content is data, not markup:

| What | File |
|---|---|
| Name, phone, email, address, hours, socials | `content/business.ts` |
| Artists (bio, specialties, booking link) | `content/providers.ts` |
| Services (copy, menu & prices, FAQs, prep/aftercare) | `content/services.ts` |
| Photos and alt text | `content/images.ts` (files in `images/`) |
| Reviews | `content/reviews.ts` |
| Journal posts | `content/journal.ts` |
| Legacy URL redirects | `content/redirects.ts` |

**Prices** mirror each artist's booking page (Square for Samantha, GlossGenius for Jennifer and Jazzmine). The booking page is always the source of truth.

**Adding or removing an artist:** edit `content/providers.ts` and each service's `providers` / `menu` in `content/services.ts`. If the artist had a page, add a redirect for it in `content/redirects.ts`.

**New photos:** drop originals into `assets-src/` as `<name>.orig`, run `npm run images`, then reference them in `content/images.ts`.

## Booking architecture

The site never stores client data or takes payments. Every "Book" button goes to `/book`, which walks the visitor through *service → artist → hand-off* and links out to that artist's own booking page (with UTM tags). Each independent artist keeps her own platform, clients and payments.

## Development

```bash
npm install
npm run dev            # http://localhost:3000
npm run lint && npm run typecheck
npm run build && npm run test:e2e   # builds, starts, runs Playwright (desktop + mobile)
```

If Playwright browsers aren't installed locally: `npx playwright install chromium`.

## Analytics

Set `NEXT_PUBLIC_GA_ID` (GA4 measurement ID) in Vercel. GA loads after the page is idle. Tracked events: `book_cta_click`, `booking_step`, `provider_select`, `booking_handoff` (mark as a key event), `phone_click`, `directions_click`, `social_click`, `reviews_click`.

## Deploying (Vercel)

1. Import this repository in Vercel (framework: Next.js; no other settings needed).
2. Add `NEXT_PUBLIC_GA_ID` if you have one.
3. Preview deployments are automatically `noindex`.
4. **Domain cutover** (only after owner approval): see `docs/09-implementation-plan.md`, Phase 5. Lower the DNS TTL first, keep email (MX) records untouched, then point the apex and `www` to Vercel. All legacy Squarespace URLs 301 to their new homes (`content/redirects.ts`, covered by `tests/redirects.spec.ts`).

## Docs

`docs/` contains the discovery audit, owner-verification list, asset inventory, SEO/IA plan, redirect map, design system and launch runbook.
