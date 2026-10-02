# 09: Implementation Plan

The Squarespace site stays live and untouched until the final cutover step. DNS changes happen once, at the end, during a low-traffic window.

## Phase 0: Decisions & access (owner)
- Answer the 🔴 items in `01-owner-verification.md`. Minimum to start building: A2/A3 (name/model), B1/B5 (team + consent), C1 (services), D2 (spray-tan guidance).
- Provide vector logo files, GBP/Search Console/registrar access, and any original photos.
- **Quick wins on the live Squarespace site (recommended now, 30 minutes, no redesign):** delete the AI-residue paragraph on /teeth-whitening; fix the broken Nails "Book Now" link on /nail-rules (use `jenniferwiseman1`); fix or remove the dead Kaylee Kirk link on /lash-rules; set the correct phone in Squarespace Business Info; replace the placeholder Instagram/Facebook URLs.

## Phase 1: Foundation (week 1)
- New repo `bronze-beauties-web`, Next.js + TS + Tailwind v4, CI (lint/type/test/Lighthouse/axe), Vercel project with preview deploys (noindex).
- Design tokens, fonts, base primitives (Button, Link, Sheet, Accordion), layout shell (header, footer, mobile action bar).
- Content layer + zod schemas; seed `business.ts`, `providers.ts`, and services from the verified snapshots.
- **Deliverable:** a "design system" route (`/_system`, noindex) showing every token/component, for owner sign-off on look and feel.

## Phase 2: Core pages (weeks 2–3)
- Home narrative (static version first, with the poster in place of 3D).
- Service template + 6 service pages; prep & aftercare guide; services hub.
- Artist template + profiles; `/book` flow; `/visit`, `/about`, `/policies`, `/journal` + the 1 rewritten post; 404.
- All copy rewritten (original, specific, owner-reviewed). Image ingest pipeline with grade/duotone.
- JSON-LD, metadata, sitemap, robots, redirects + tests.

## Phase 3: Immersive layer (week 4)
- Bronze Drop scene (R3F), mist particles, light-follow, scroll hand-off.
- Tier detection, video/still fallbacks (rendered from the same scene), reduced-motion paths.
- GSAP chapter transitions, mist-reveal typography, light sweeps.
- Performance tuning against budgets on real devices (mid-range Android + older iPhone).

## Phase 4: QA & validation (week 5)
Checklist gate; nothing ships with an unchecked box:
- [ ] Cross-browser: Safari (macOS + iOS), Chrome (desktop + Android), Firefox, Edge
- [ ] Responsive: 360, 390, 768, 1024, 1280, 1440, 1920 widths; landscape phone
- [ ] Lighthouse mobile ≥ 95/100/100/100 on every template; CWV budgets met in lab
- [ ] axe: 0 violations; manual keyboard + VoiceOver + NVDA pass
- [ ] Rich Results Test + Schema Markup Validator: every template valid, no unverified fields
- [ ] Metadata uniqueness test (titles/descriptions), canonical test, heading-order test
- [ ] Link checker: 0 broken internal/external links; **every booking URL returns 200 and lands on the right provider**
- [ ] Redirect test: every row in `redirect-map.csv` → single hop → 200
- [ ] 404 page returns status 404
- [ ] Reduced-motion, Save-Data, WebGL-disabled, and context-loss fallbacks verified
- [ ] NAP identical across site, schema, GBP, Square, GlossGenius, Facebook
- [ ] Analytics events verified in GA4 DebugView
- [ ] Owner content review + written sign-off; independent artists approve their own profiles

## Phase 5: Launch (cutover day)
1. Lower DNS TTL to 300s **48 hours before**.
2. Export the Squarespace site (XML backup) and full-page screenshots for the record. Keep the Squarespace subscription active for 30 days as a rollback path.
3. Add the domain in Vercel and verify; TLS issued.
4. Switch the apex `A`/`ALIAS` and `www` `CNAME` to Vercel (keep MX/TXT/email records **unchanged**; verify email still flows).
5. Confirm `www → apex` and `http → https` redirects; crawl production with the redirect test + link checker.
6. Search Console: verify (DNS TXT), submit the new sitemap, inspect key URLs, and request indexing for the home + service pages.
7. Update the Square profile website URL, both GlossGenius profiles' website link (with artists' consent), GBP website + appointment URL (`/book`), Facebook/Instagram bio links.

**Rollback:** re-point DNS to Squarespace (TTL is 300s). No data migration exists, so rollback is lossless.

## Phase 6: Post-launch (weeks 6–10)
- Daily for week 1, then weekly: GSC coverage/404s, redirect hits, CWV field data, GA4 key events.
- **Citation cleanup:** Yelp (close/update the Avon Lake listing), Facebook, Apple Business Connect, Bing Places, plus major directories (Yellow Pages, Foursquare, Nextdoor, StyleSeat, Fresha). All are updated to the confirmed Elyria NAP.
- GBP: services list mirrors site pages; add photos of the new space; enable messaging; weekly posts.
- Review generation: a post-appointment Google review link (QR at checkout) for each artist.
- Content cadence: one genuinely useful journal piece per month (bridal glow timeline, lash-care guide, etc.).
- 30/60/90-day report: rankings for target set, local-pack visibility, booking hand-offs by provider.

## Risks
| Risk | Mitigation |
|---|---|
| NAP conflicts unresolved at launch | Launch is gated on A1–A6; schema drops unverified fields |
| Low-res photography undermines "premium" | Duotone/grain treatment + brand shoot (highest-ROI spend) |
| 3D harms mobile performance | Tiered delivery; LCP never depends on WebGL; CI budgets |
| Independent artist leaves/changes platform | `active` flag + booking URL in data; profile 301s automatically |
| Ranking dip after migration | 1:1 redirect coverage, unchanged money-page URLs, fast re-crawl via GSC |
| Regulated-claim exposure (body contouring, BBL, whitening guarantees) | Pages retired; claims language reviewed before publish |
