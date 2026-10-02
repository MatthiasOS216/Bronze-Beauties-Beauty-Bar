# 08: Technical Architecture

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (current stable, App Router) + React + TypeScript (strict)** | Static generation for every page, React Server Components (minimal client JS), first-class metadata/sitemap/OG APIs, Vercel-native |
| Styling | **Tailwind CSS v4** with design tokens as CSS variables (`@theme`) | Tokens from 07 live in one file and are shared by CSS, TS, and 3D materials |
| Motion | **Motion** (React UI micro-interactions) + **GSAP** with ScrollTrigger (scroll choreography) | GSAP and all its plugins are free for commercial use. Both are code-split into the components that use them |
| 3D | **three + @react-three/fiber + @react-three/drei**, dynamically imported, client-only, tier-gated | Only the hero (and the optional CTA echo) ships 3D |
| Images | `next/image` (AVIF/WebP, responsive `sizes`, blur placeholders) + a **sharp ingest script** (grade, crop presets, duotone variants, EXIF strip) | |
| Fonts | `next/font/google` self-hosted: Bodoni Moda + Manrope, subset latin | |
| Content | Typed content layer in `content/` (TS/MDX), validated with **zod** at build | CMS-ready (see below) |
| Analytics | **GA4** via `@next/third-parties` (loaded after interaction/idle) + **Vercel Speed Insights** (real-user CWV) | |
| Hosting | **Vercel** (preview deploy per PR, production on custom domain) | |
| QA | ESLint, Prettier, `tsc`, **Vitest** (content, schema, redirects), **Playwright** (flows, visual snapshots, Chromium/WebKit/Firefox), **axe-core**, **Lighthouse CI** budgets in GitHub Actions | |

## Repository layout

```
bronze-beauties-web/
  app/
    (site)/layout.tsx              header, footer, action bar, sitewide JSON-LD
    (site)/page.tsx                home
    (site)/services/page.tsx
    (site)/[service]/page.tsx      generateStaticParams from content/services
    (site)/organic-spray-tanning/prep-and-aftercare/page.tsx
    (site)/artists/[slug]/page.tsx
    (site)/book/page.tsx
    (site)/visit|about|policies|journal/...
    sitemap.ts  robots.ts  not-found.tsx  opengraph-image.tsx
  components/
    ui/          Button, Link, Chip, Sheet, Accordion (accessible primitives)
    sections/    Hero, ServiceList, ArtistPlates, Portfolio, Reviews, VisitStrip, FinalCta
    booking/     BookingSheet, ProviderPicker, HandoffCard
    three/       BronzeDrop (lazy), MistParticles, tier detection
    seo/         JsonLd, Breadcrumbs
  content/
    business.ts      single NAP/hours/social source (fields carry `verified` flags)
    providers.ts     see 03
    services/*.mdx   copy + frontmatter (offerings, FAQs, related)
    reviews.ts  journal/*.mdx  redirects.ts (generated from redirect-map.csv)
  lib/   analytics.ts (typed events), schema.ts (JSON-LD builders), hours.ts
  scripts/ ingest-images.ts, check-links.ts, check-redirects.ts
  public/  icons, posters, hero loop, hdr
  tests/  unit/ e2e/
```

## Content & CMS recommendation

- **v1: content-as-code.** Every frequently-changing item (artists, services, offerings/prices, FAQs, reviews, portfolio, hours, journal) is structured data, not hard-coded JSX. Edits are a one-file change, and validation catches mistakes (e.g., a provider with no booking URL fails the build).
- **When Samantha needs to self-edit** (answer D5): add **Sanity** (hosted Studio, generous free tier, excellent image pipeline/hotspots, visual editing on preview). The content schemas map 1:1 to the zod types above, so migration is a data import, not a rewrite. If edits are rare (≤ monthly) and she prefers no extra account, **Keystatic** (git-backed, free) is the lighter alternative.
- Prices are **never** the website's source of truth. Each offering stores `priceCheckedAt`, and a monthly reminder (or a Square Catalog API sync for Samantha only, with her authorization) keeps them honest.

## Rendering & performance

**Budgets (enforced in Lighthouse CI on mobile emulation, plus field data via Speed Insights):**

| Metric | Budget |
|---|---|
| LCP (p75, mobile) | ≤ 2.0 s (hard fail 2.5 s) |
| INP (p75) | ≤ 150 ms (hard fail 200 ms) |
| CLS | ≤ 0.03 (hard fail 0.1) |
| Initial JS (gz), excluding 3D chunk | ≤ 110 KB on home, ≤ 80 KB on content pages |
| 3D chunk (gz), deferred | ≤ 230 KB (three + r3f + scene), loaded after `load` + idle, Tier A only |
| Hero poster (AVIF) | ≤ 90 KB mobile / ≤ 160 KB desktop |
| Fonts | 2 families, ≤ 4 files, ≤ 120 KB total |
| Lighthouse (mobile) | Performance ≥ 95 · Accessibility 100 · Best Practices 100 · SEO 100 |

Techniques: SSG for every route; RSC by default with `"use client"` only for interactive islands; `dynamic(() => import('…/BronzeDrop'), { ssr: false })` behind tier detection + IntersectionObserver; `fetchpriority="high"` on the hero poster; lazy-loading below the fold; map iframe only on click (a static map image before that); GA4 loaded post-interaction; no client-side data fetching on first paint; the canvas pauses when off-screen or the tab is hidden; DPR capped at 1.75 for WebGL.

**WebGL fallback chain:** detect `prefers-reduced-motion`, `navigator.connection.saveData`, `deviceMemory`, `hardwareConcurrency`, and WebGL2 support (plus a 1-frame GPU timing probe). On context loss, swap to the video/still poster without layout shift (same aspect box).

## SEO implementation

- `generateMetadata` per route from content: title template `%s | Bronze Beauties Beauty Bar`, description, canonical (absolute, apex, no trailing slash), OG/Twitter (dynamic `opengraph-image` per page).
- `app/sitemap.ts` (pages + images), `app/robots.ts` (disallow preview deployments via `X-Robots-Tag: noindex` on non-production hosts; production allows all).
- JSON-LD builders in `lib/schema.ts` drop any field marked `verified: false`.
- Redirects generated from `redirect-map.csv` at build, plus a test that asserts every legacy URL.
- Semantic HTML: one H1 per page, landmark regions, ordered heading levels (lint rule + test).
- Branded 404 with booking and services links, returning a real 404 status.

## Analytics event schema (GA4)

| Event | Params | Fired when |
|---|---|---|
| `book_cta_click` | `cta_location` (hero/header/actionbar/service/artist/final), `service`, `provider?` | any Book CTA |
| `booking_step` | `step` (service/provider/handoff), `service`, `provider?` | sheet progresses |
| `provider_select` | `provider`, `service` | artist chosen |
| `booking_handoff` | `provider`, `platform` (square/glossgenius), `service`, `page_type` | outbound to booking (**key event**) |
| `phone_click` / `sms_click` | `cta_location` | tel:/sms: |
| `directions_click` | `provider` (google/apple), `cta_location` | |
| `social_click` | `network` | |
| `guide_engagement` | `section` | guide sections reach 50% visibility |

`booking_handoff`, `phone_click`, and `directions_click` are marked as **key events (conversions)**. Search Console is verified via a DNS TXT record (survives the platform change) and linked to GA4.

## Accessibility (WCAG 2.2 AA)

Skip link; visible 2px focus rings (07 tokens); every interactive element ≥ 24×24 (target 48); full keyboard operation of the nav, booking sheet (focus trap + `Esc` + return focus), lightbox, and accordions; `aria-live` step announcements in booking; reduced-motion honoring; no text in images; captions/`aria-hidden` for decorative video; contrast pairs locked to the verified token table; `lang="en-US"`; automated axe in CI plus a manual VoiceOver (iOS/macOS) and NVDA pass before launch.

## Security & privacy

No PII collected. Strict CSP (self + GA + Vercel insights + booking domains for links only), `Referrer-Policy: strict-origin-when-cross-origin`, HSTS on the production domain, `rel="noopener"` on outbound links. A privacy page discloses GA4 usage.
