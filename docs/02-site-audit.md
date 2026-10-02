# 02: Current Site Audit (Squarespace)

**Platform:** Squarespace 7.1 (internal URL `wisteria-hexagon-tp2k.squarespace.com`). The site redirects `www` and `http` to the `https` apex correctly.
**Sitemap:** 31 URLs. 19 pages, 7 blog posts, 1 blog index, and 4 tag/category archives.
**Primary nav:** Beauticians (folder: Samantha, Jazzmine, Jennifer→/nails-1, Miranda, Enlightment) · Services (folder: Organic Spray Tanning, Nails, Facials & Waxing, Teeth Whitening, Lashes→/samantha-camel) · Scheduling (→Square) · Instagram/Facebook (placeholder URLs) · cart · "Start Your Glow Up" (→/rules).

## 1. Sitewide findings

### Business info / NAP
- **Two phone numbers.** 440-305-6066 appears in the footer on every page and matches Square. **440-412-6757** is set in Squarespace Business Info and emitted in `Organization` JSON-LD on every page. → *VERIFY A1*
- **Four business names.** Beauty Bar / Tanning / Salon Suites / LLC. → *VERIFY A2*
- Squarespace `LocalBusiness` schema says hours are Mon–Sat 9:00–19:30. That disagrees with Square (Mon–Fri 9–7, Sat 9:30–5). The `openingHours` string also has a trailing comma (malformed).
- Schema `sameAs` = `http://www.instagram.com` and `http://www.facebook.com`, which are placeholders, not the real profiles.
- The schema uses generic `LocalBusiness` with no `@id`, `geo`, `url`, `priceRange`, or subtype (`BeautySalon`/`DaySpa`/`TanningSalon`).
- Legacy **Avon Lake** targeting survives in one blog post and in `/facials-waxing`'s SEO title. Yelp still lists **449 Avon Belden Rd, Unit A-1, Avon Lake, OH 44012** as an active location.

### Technical SEO
- 13 of 31 pages have **no meta description**.
- H1s are broken by the template's split-word style: "Na / ils.", "Body-ody Contouring.", "Beauty Nails.". The homepage has a correct H1 ("Glow Bold. Bronze Beautiful."), but /about, /samantha-camel, /jazzmine, /miranda-rivera, /rules and /new-location have **no H1**. /nails-1 has **17 empty H2s**.
- Nearly all images have **empty alt text**.
- A decorative link to `http://squarespace.com` (template leftover) sits on every service page's title block. It is an outbound link with zero value.
- `/home` duplicates `/`. The canonical points to the root (fine), but it is still in the sitemap.
- Thin tag/category archives (47 words each) are indexed.
- The blog path is `/enlightment` (misspelled "enlightenment") and the posts are authored by "Matt", whose avatar is a man in a city at night (not a team member).
- Homepage HTML weighs **421 KB** before images, which is heavy for the content.
- Some image filenames reveal sources: `Arm-Waxing-Buffalo-NY-Blink-Beauty-Ar.png` (another salon's site), `thrive-emsculpt-hero.jpg` (a vendor/clinic), `hiemt-light-1000x.jpg` (machine product shot). These raise copyright and authenticity risks.

### Content quality / risk
- **/teeth-whitening shows leftover AI instructions on the live page:** *"Feel free to tweak it to fit the vibe of Bronze Beauties Beauty Bar. This should give your clients all they need to know…"* Fix immediately, even before the rebuild.
- /organic-spray-tanning contains template residue: "close those pores**ion text goes here**". It also links to a "FAQ page" and a "Contact page" that both 404.
- /noninvasive-brazilian-butt-lifts describes **"injectable dermal fillers"**. Injectables are a medical procedure in Ohio (physician/nurse scope). It also uses a borrowed "proprietary device" paragraph. **High legal risk; do not migrate.**
- /body-contouring and the laser-lipo post promise "**permanent fat reduction**", "no scarring", and "melt away fat cells". These are unsubstantiated device claims. Do not migrate unless the service is confirmed and the claims are reworded and supported.
- Blog posts read as generic, unedited AI copy (hashtags in body, "Hey Glow-Getters!", claims like "best in Northeast Ohio").
- The tanning-bed post cites "74% more likely to develop melanoma" with no source. If kept, it must cite the IARC/AAD data accurately.
- Spray-tan guidance **contradicts itself** across pages (shower 4 h vs 8 h; exfoliate 4 h vs 24 h; "no oils" vs "cocoa butter"). → *VERIFY D2*
- The policy page is triplicated (/rules, /nail-rules, /lash-rules) with identical text and different booking buttons.
- Copy errors: Jazzmine's page says "**Miranda** books by appointment only". The meta description says "**lib** blush". Samantha's bio says "Bronze **Beauty** Bar".

### Conversion paths (today)
| CTA | Path | Status |
|-----|------|--------|
| Home "Book With Samantha" | → /new-location (interstitial) → Square | ✅ works, but adds a click |
| Home "Book Brows / Lashes / Skin Care" | → /new-location → Square | ⚠️ Brows are not bookable in Square |
| Home "Book With Jennifer" | → `jenniferwiseman1.glossgenius.com/services` | ✅ |
| /nails-1 "Book Now" | → /nail-rules → **`jenniferwiseman.glossgenius.com`** | ❌ **BROKEN.** Redirects to glossgenius.com marketing site |
| /lash-rules "Schedule Appt" | → **`kayleekirk.glossgenius.com`** | ❌ **BROKEN** |
| /waxing, /tooth-gems, /bbl "Book Now" | → stale Google "Reserve with Google" URL with a 2021 session token | ❌ unreliable |
| Home hidden image link | → massagebook.com/…/anatomy-med-massage | ❌ 404 |
| /miranda-rivera "Book" | → Samantha's Square (Miranda not bookable there) | ❌ dead end |
| Service pages "Book Now" | → /rules → Square | ⚠️ policy gate adds a click |
| Phone | footer text only; not a `tel:` link | ⚠️ |
| Directions | none (no map, no directions link) | ❌ |

## 2. Page-by-page disposition

Legend: **KEEP** (keep URL and substance) · **IMPROVE** · **REWRITE** · **REMOVE** · **REDIRECT** · **VERIFY** (owner must confirm)

| Current URL | Content summary | Words | Verdict | Notes / new home |
|---|---|---|---|---|
| `/` | Hero "Glow Bold. Bronze Beautiful.", artist cards (Samantha, Jennifer, Jazzmine), 3 service teasers, 2 Google reviews, IG | 392 | **KEEP URL · REWRITE** | Keep the headline; it's genuinely good. Rebuild the narrative (see 05/07). Keep both reviews (VERIFY D3). |
| `/home` | duplicate of `/` | — | **REDIRECT** → `/` | |
| `/about` | Title "Testimonials" but contains Samantha + Miranda bios | 374 | **KEEP URL · REWRITE** | Samantha's origin story (est. 2018, mobile spray tan → full service, former group-fitness instructor & dental assistant) is the strongest brand content on the site. Keep the facts and rewrite the voice. |
| `/organic-spray-tanning` | Prep + aftercare FAQ (≈886 words) + 2 infographic PNGs | 886 | **KEEP URL · IMPROVE** | The most valuable SEO page. Split into service page + linked Prep & Aftercare guide; fix contradictions (VERIFY D2/C3). |
| `/teeth-whitening` | Process, FAQs, **AI residue** | 237 | **KEEP URL · REWRITE** | Remove guarantee language (VERIFY C4). |
| `/waxing` | Generic waxing benefits / pain FAQ, stale Google booking link | 259 | **KEEP URL · REWRITE** | Re-author around Jazzmine (GlossGenius) once confirmed. |
| `/facials-waxing` | Miranda photo + "Read Bio", 14 words, title mentions Avon Lake | 14 | **REDIRECT** → `/facials` | Facials are now Samantha's (Square: 7 facial services). |
| `/nails-1` | Jennifer, hours, 16-image nail gallery | 54 | **REDIRECT** → `/nails` | The gallery images are the best authentic portfolio on the site. |
| `/nails` | empty template stub ("Beauty Nails.") | 2 | **KEEP URL · REWRITE** | Becomes the real nails page (Jennifer). |
| `/tooth-gems` | Swarovski tooth gem description, stock images | 82 | **VERIFY C1** → default **REDIRECT** `/services` | |
| `/body-contouring` | RF / laser lipo / cavitation claims, vendor images | 124 | **VERIFY C1** → default **REDIRECT** `/services` | Do not migrate claims. |
| `/noninvasive-brazilian-butt-lifts` | Injectable filler copy | 161 | **REMOVE** → **REDIRECT** `/services` | Legal risk. |
| `/post-op-care` | empty | 0 | **REDIRECT** → `/services` | |
| `/samantha-camel` | Bio, specialties, Square link | 83 | **REDIRECT** → `/artists/samantha-camel` | |
| `/jazzmine` | Bio (first-person), GG link | 114 | **REDIRECT** → `/artists/jazzmine-villegas` | Fix the "Miranda" copy bug. |
| `/miranda-rivera` | Brow specialist bio | 97 | **VERIFY B1** → `/artists/miranda-rivera` **or** `/artists` | |
| `/rules`, `/nail-rules`, `/lash-rules` | identical policy pages | 273 | **CONSOLIDATE** → `/policies` | Rewrite in a calm, premium tone with no emoji headings. Keep the substance (VERIFY D1). |
| `/new-location` | "We've moved" + wayfinding (Wolfey's plaza) | 84 | **REDIRECT** → `/visit` | The wayfinding detail is valuable; keep it. |
| `/enlightment` | blog index | — | **REDIRECT** → `/journal` | |
| `/enlightment/get-your-best-glow-up…avon-lake-ohio-` | Avon Lake spray-tan promo | 601 | **REDIRECT** → `/visit` | `/visit` carries the "previously in Avon Lake, now in Elyria" message. |
| `/enlightment/30-tips-…` | 30 aftercare tips | 749 | **CONSOLIDATE** → `/organic-spray-tanning/prep-and-aftercare` | |
| `/enlightment/spraytanattiretips` | What to wear | 478 | **CONSOLIDATE** → same guide `#what-to-wear` | |
| `/enlightment/exfoliating` | Exfoliation before tan | 499 | **CONSOLIDATE** → same guide `#exfoliating` | |
| `/enlightment/spraytansvstanningbeds` | Spray tan vs tanning beds | 472 | **KEEP · REWRITE** → `/journal/spray-tan-vs-tanning-beds` | Add cited sources. |
| `/enlightment/laserlipo` | Laser lipo claims | 457 | **REMOVE** → **REDIRECT** `/services` (or 410 if no service) | |
| `/enlightment/bronzebeautyfullyloaded` | Generic "one-stop salon" post | 665 | **REMOVE** → **REDIRECT** `/services` | |
| `/enlightment/category/*`, `/enlightment/tag/*` (3) | thin archives | 47 | **REDIRECT** → `/journal` | |
| `/beauticians`, `/services-1` | Squarespace folder auto-302s | — | **REDIRECT** → `/artists`, `/services` | |
| `/cart` | empty commerce cart | — | **REDIRECT** → `/` | |

## 3. Content worth preserving (verbatim facts, new voice)

- **Brand line:** "Glow Bold. Bronze Beautiful." (homepage H1). Keep it as the brand tagline.
- **Origin:** founded 2018 as a mobile spray-tanning business. Samantha is a former group exercise instructor and dental assistant, did pageants earlier in life, and is a mother of five.
- **Service philosophy:** "clean, natural beauty", "without compromising your skin's health", "holistic products with results-driven techniques".
- **Spray tan prep/aftercare:** the full Q&A structure (clothing, exfoliating, showering, moisturizing, other tips) maps cleanly to FAQ + HowTo-style content.
- **Wayfinding:** "in the plaza with Wolfey's, directly across from Wolfey's main entrance; easy parking and walk-in access".
- **Policies:** 48-hour notice, $30 late cancel, no-show charge, card-failure rule, no refunds / equal-value alternative, adults-only salon.
- **Reviews:** two named Google reviews (facial by Miranda; spray tan by Samantha), plus the Google review link `g.co/kgs/udsDPkQ`.
- **Live service menus** (source of truth = booking platforms; snapshots in `research/`):
  - *Samantha / Square:* Spray tan $60, 4-tan package $140 (60-day), Moisture Lock add-on $5. Lash full set (classic/hybrid/volume) $120, 2-wk fill $75, 3-wk fill $80, removal $25, Korean lash lift & tint $65 (sale). Facials: On-the-Go $60, Signature $75, Gentleman's $80, Dermaplaning $80, Oxygen Brightening $95, Microdermabrasion $95, Peptide Tightening $130, Hydrodermabrasion $150. Teeth whitening $100/session.
  - *Jennifer / GlossGenius ("Nailedit.byjenny"):* acrylic full sets $55–80, fills $50–60, Gel-X $70, builder gel $40, gel mani $30, gel pedi $50, jelly-mask pedi $60, acrylic toes $50, men's mani $30. $10 deposit.
  - *Jazzmine / GlossGenius ("Bare Beauti Avenue"):* cluster lashes $50 (explicitly *not* extensions), Brazilian $45 new / $58, bikini $43–50, brows $20, full face $52, full body waxing menu ($8–85).

## 4. Baseline metrics to capture before cutover (needs owner access)
- Google Search Console: 16-month export of queries, pages, and backlinks (→ confirms which legacy URLs carry equity).
- GA / Squarespace Analytics: top landing pages and referrers.
- PageSpeed Insights (mobile) for `/`, `/organic-spray-tanning`, `/nails-1`. Lighthouse could not be run from this sandbox's browser (TLS interception), so this baseline will be captured on the staging deploy and via PSI.
- GBP Insights: calls, direction requests, website clicks.
