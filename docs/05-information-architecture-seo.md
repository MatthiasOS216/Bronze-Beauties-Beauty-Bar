# 05: Information Architecture, Local SEO & Structured Data

## 1. New sitemap

```
/                                   Home: cinematic narrative + booking
/services                           Services hub (all categories, who does what, "from" prices)
  /organic-spray-tanning            KEEP URL. Service page (Samantha)
    /organic-spray-tanning/prep-and-aftercare   Definitive guide (consolidates 4 legacy URLs)
  /lashes                           Extensions, fills, Korean lash lift & tint (Samantha) · cluster lashes (Jazzmine)
  /facials                          Signature, On-the-Go, Gentleman's, Dermaplaning, Oxygen, Microderm, Hydroderm, Peptide (Samantha)
  /waxing                           KEEP URL. Full-body & facial waxing, brows (Jazzmine)
  /nails                            KEEP URL. Acrylic, Gel-X, builder gel, gel mani/pedi (Jennifer)
  /teeth-whitening                  KEEP URL (Samantha)
  /brows                            ONLY IF C2 confirms tint/lamination provider; else a section on /waxing
/artists                            Team overview
  /artists/samantha-camel
  /artists/jennifer-wiseman
  /artists/jazzmine-villegas
  /artists/miranda-rivera           ONLY IF B1 confirms
/book                               Service → Artist → hand-off (see 03)
/visit                              Location, hours, parking, Wolfey's plaza wayfinding, map, "formerly Avon Lake"
/about                              KEEP URL. Samantha's story, philosophy, the space
/policies                           Booking & cancellation (consolidates /rules ×3)
/journal                            Educational content (replaces /enlightment)
  /journal/spray-tan-vs-tanning-beds
/privacy, /accessibility            Trust/compliance
/404                                Branded, with booking + service links
```

**URL principles:** keep every legacy URL that still matches a live service (`/organic-spray-tanning`, `/teeth-whitening`, `/waxing`, `/nails`, `/about`) so their equity transfers without a redirect hop. Service pages stay **flat at root** because they are the money pages and their legacy URLs are already flat. Artists move under `/artists/` for clarity (301s). Blog moves to `/journal` (fixes the "enlightment" misspelling).

**Primary nav (desktop):** Services ▾ · Artists ▾ · Spray Tan Guide · Visit · [Book an Appointment]
**Mobile:** logo · [Book] · menu. A persistent bottom action bar after the hero shows **Book · Call · Directions**.

## 2. Page templates & on-page SEO contract

Every service page includes, in this order:
1. H1 with intent + place, written naturally ("Organic Spray Tanning in Elyria, Ohio"), plus a one-sentence promise.
2. Above-the-fold: "from" price, duration, provider avatar(s), primary CTA.
3. What it is / who it's for (short intro, original copy).
4. The experience: step-by-step process (numbered, scannable).
5. Menu: each bookable variation with "from" price and a deep-link CTA.
6. Prep & aftercare (summary + link to the full guide where one exists).
7. Provider block (portrait, credentials *as confirmed*, link to artist page).
8. Proof: portfolio grid (authentic work) + 1–2 reviews.
9. FAQ (real questions; content is visible on the page).
10. Related services (contextual internal links) + location strip (address, hours, map link) + final CTA.

Unique `<title>` (≤ 60 chars) and meta description (≤ 155) per page, generated from content data with manual override. Self-referencing canonical. OG/Twitter image auto-generated per page with `next/og` in brand styling.

## 3. Local SEO strategy

### Keyword targets (intent-mapped)
No keyword-volume tool was available inside this sandbox. Targets below are prioritized by **commercial intent × service fit × local competition observed in SERPs/Yelp**. The first task after Search Console access is to validate and re-weight them with real impression data (GSC) plus a volume tool (e.g., Google Keyword Planner via the owner's Ads account).

| Page | Primary | Secondary / long-tail |
|---|---|---|
| `/` | beauty bar Elyria Ohio | spray tan lashes facials Elyria · beauty salon Elyria OH · Lorain County beauty bar |
| `/organic-spray-tanning` | spray tan Elyria | organic spray tan Elyria OH · spray tan near Elyria · bridal / prom spray tan Lorain County · airbrush tan Elyria |
| `/organic-spray-tanning/prep-and-aftercare` | how to prepare for a spray tan | what to wear to a spray tan · when can I shower after a spray tan · spray tan aftercare (informational, non-local; earns links and featured snippets) |
| `/lashes` | lash extensions Elyria | lash lift and tint Elyria · lash fill Elyria · volume / hybrid lashes Lorain County · cluster lashes Elyria |
| `/facials` | facials Elyria OH | esthetician Elyria · dermaplaning Elyria · hydrodermabrasion facial Elyria · microdermabrasion Elyria · men's facial Elyria |
| `/waxing` | waxing Elyria | Brazilian wax Elyria · full body waxing Elyria · eyebrow wax Elyria |
| `/nails` | nail salon Elyria OH | Gel-X Elyria · acrylic nails Elyria · builder gel manicure Elyria · gel pedicure Elyria |
| `/teeth-whitening` | teeth whitening Elyria | cosmetic teeth whitening near Elyria · teeth whitening Lorain County |
| `/visit` | Bronze Beauties Elyria (brand) | Bronze Beauties Avon Lake (legacy brand query → explains the move) |

Competitive read (Yelp/SERP, Oct 2026): Elyria-proper spray-tan and lash results are dominated by **aggregators** (Yelp, StyleSeat, Fresha) and by single-service studios in Avon, Lorain, and Sheffield Lake (e.g., Tan with Kare, Glowfully You, Lashtown Cleveland, Pretty Girl Aesthetics). Few **Elyria-located, multi-service, well-structured websites** compete. A fast site with real local signals and dedicated service pages has a realistic path to the local pack and organic top 3 for the service + "Elyria" set.

### Local relevance (built in, not stuffed)
- One canonical NAP block, rendered from a single data source on every page and identical to GBP.
- `/visit` is genuinely useful: plaza wayfinding (Wolfey's), parking, accessibility notes, hours by artist, embedded map loaded on interaction, "Get directions" deep links (Google/Apple), nearby-area travel times (Avon, Avon Lake, North Ridgeville, Lorain, Amherst, Oberlin, Grafton, Sheffield). **No per-city doorway pages.**
- **Avon Lake migration:** `/visit` includes a short, honest "Previously in Avon Lake, now in Elyria (since 2025)" note *(date to verify)*. The old Avon Lake post 301s to `/visit`. Off-site: update or close the Yelp Avon Lake listing, update Facebook, Square, and every directory citation to the Elyria NAP (see the checklist in 09).
- Service-area statement in the footer and GBP: Lorain County / Northeast Ohio.
- Earn local links and mentions: Elyria/Lorain County chamber, bridal/prom vendor lists, Wolfey's plaza neighbors, and local pageant/event partnerships.

## 4. Structured data plan (JSON-LD, generated from the same content data as the UI)

| Type | Where | Notes |
|---|---|---|
| `BeautySalon` (with `@id` `https://bronzebeautiesbeautybar.com/#business`) | sitewide (in layout) | name, url, logo, image, telephone (**after A1**), email, `address` (PostalAddress), `geo` (41.3636627, −82.0763981), `openingHoursSpecification` (**after A5**), `sameAs` (real IG/FB), `priceRange` ("$$"), `areaServed` (Lorain County), `hasOfferCatalog` → services. Add `TanningSalon` as an additional `@type` if the GBP category supports it. |
| `WebSite` | home | name, url, publisher → `#business` |
| `Service` | each service page | `serviceType`, `provider` → `#business` (or the `Person`), `areaServed`, `offers` (`Offer` with `price` + `priceCurrency`, **only from verified platform prices**, with `priceValidUntil` omitted rather than invented) |
| `Person` | artist pages | name, jobTitle (confirmed), `worksFor` → `#business` for staff. For independents, `worksFor` = their own `Organization` (e.g., "Nailedit.byjenny") with `location` → `#business`. Accurate either way. |
| `BreadcrumbList` | all non-home pages | |
| `FAQPage` | service pages + guide | Valid markup with visible content. Note: since 2023 Google shows FAQ rich results only for authoritative gov/health sites, so this is for semantics and AI/answer engines, not SERP stars. |
| `Article` / `BlogPosting` | journal posts | real author (a team member, not "Matt"), dates |
| `HowTo` | not used | Deprecated in Google rich results; the guide uses semantic headings/lists instead |
| `Review` / `AggregateRating` | **not used** | Google ignores self-serving review markup for LocalBusiness/Organization. Showing reviews visibly + linking to Google is the correct approach. Never fabricate. |

Validation gates: Schema Markup Validator + Rich Results Test on every template in staging; schema unit tests assert no field is emitted from an unverified source (fields with `verified: false` in content data are dropped at build).
