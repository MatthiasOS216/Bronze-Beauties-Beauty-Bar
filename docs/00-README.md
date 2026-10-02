# Bronze Beauties Beauty Bar: Rebuild Discovery Package

Audit date: **2026-10-02**. Source: a live crawl of https://bronzebeautiesbeautybar.com (all 31 sitemap URLs plus legacy-path probes), Samantha's public Square booking page, Jennifer's and Jazzmine's public GlossGenius pages, and public web/Yelp results.

No production code has been written yet. These documents cover phases 1–8 of the brief. Building starts once the owner answers the verification items in `01-owner-verification.md` (the blocking ones are marked) and the plan is approved.

| # | Document | What it answers |
|---|----------|-----------------|
| 01 | `01-owner-verification.md` | Everything we must not guess, ranked by launch risk |
| 02 | `02-site-audit.md` | Page-by-page inventory with KEEP / IMPROVE / REWRITE / REMOVE / REDIRECT / VERIFY |
| 03 | `03-booking-architecture.md` | Who books where, broken paths today, and the new front-end flow |
| 04 | `04-asset-inventory.md` | Every image and logo, plus reuse and high-res status |
| 05 | `05-information-architecture-seo.md` | New sitemap, local SEO strategy, keyword targets, schema plan |
| 06 | `06-redirect-map.md` + `redirect-map.csv` | Every legacy URL mapped to its new destination |
| 07 | `07-creative-direction-design-system.md` | Concept, tokens, typography, motion, 3D language |
| 08 | `08-technical-architecture.md` | Stack, structure, content model, performance budgets, analytics |
| 09 | `09-implementation-plan.md` | Phased build, QA gates, launch and migration runbook |

`research/` holds the raw evidence: crawl JSON, booking-platform snapshots, logo files, and image contact sheets (`contact-sheet-index.txt` maps each thumbnail number to its source URL).

## Decisions applied in the build (October 2026)

The owner's representative confirmed the live site is current. The following were applied:

- **Miranda Rivera no longer works at Bronze Beauties.** She was removed from every page. `/miranda-rivera` 301s to `/artists`. Her legacy Google review quote was retired, because it describes her service.
- **Phone:** (440) 305-6066 (footer + Square). The stray 440-412-6757 in Squarespace's structured data is not carried over.
- **Name:** Bronze Beauties Beauty Bar. Logo: the gold "Beauty Bar" lockup and its BB monogram.
- **Hours:** taken from Samantha's live Square booking settings (Mon–Fri 9–7, Sat 9:30–5, Sun closed). Jennifer's own hours appear on her profile.
- **Team:** Samantha Camel (Square), Jennifer Wiseman / Nailed It By Jenny (GlossGenius), Jazzmine Villegas / Bare Beauti Avenue (GlossGenius).
- **Services:** spray tan, lashes, facials, waxing, nails and teeth whitening, i.e. what's in the live nav and bookable. Body contouring, BBL, tooth gems and post-op pages redirect to `/services`.
- **Spray-tan guidance:** the service page's version (4-hour prep, first rinse at 4–24 h, hair dry 8 h) is canonical. Conflicting blog numbers were dropped.

Items in `01-owner-verification.md` that the live site didn't settle (GBP/Yelp clean-up, Avon Lake citations, photo releases, vector logo) are launch-adjacent tasks, not build blockers.
