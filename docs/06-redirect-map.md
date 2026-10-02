# 06: Redirect Map

All redirects are **permanent (308/301)**, single-hop, and implemented in `next.config` `redirects()` (or edge middleware if the list grows). Query strings are preserved. Trailing-slash and case variants normalize to the lowercase, no-trailing-slash canonical. The machine-readable source is `redirect-map.csv`; it is also the input to the post-launch redirect test (every row is asserted: status, `Location`, and a 200 at the destination).

| Legacy URL | Action | Destination | Reason |
|---|---|---|---|
| `/` | KEEP | `/` | |
| `/home` | 301 | `/` | duplicate |
| `/about` | KEEP | `/about` | rewritten |
| `/organic-spray-tanning` | KEEP | `/organic-spray-tanning` | top equity page |
| `/teeth-whitening` | KEEP | `/teeth-whitening` | |
| `/waxing` | KEEP | `/waxing` | |
| `/nails` | KEEP | `/nails` | now the real nails page |
| `/nails-1` | 301 | `/nails` | consolidate |
| `/facials-waxing` | 301 | `/facials` | split; facials is the dominant intent |
| `/samantha-camel` | 301 | `/artists/samantha-camel` | |
| `/jazzmine` | 301 | `/artists/jazzmine-villegas` | |
| `/miranda-rivera` | 301 | `/artists/miranda-rivera` **if B1 = active**, else `/artists` | VERIFY |
| `/beauticians` | 301 | `/artists` | old folder |
| `/services-1` | 301 | `/services` | old folder |
| `/rules` | 301 | `/policies` | consolidate |
| `/nail-rules` | 301 | `/policies` | consolidate |
| `/lash-rules` | 301 | `/policies` | consolidate |
| `/new-location` | 301 | `/visit` | |
| `/tooth-gems` | 301 | `/services` | VERIFY C1; retire by default |
| `/body-contouring` | 301 | `/services` | VERIFY C1; retire by default |
| `/noninvasive-brazilian-butt-lifts` | 301 | `/services` | retired (legal risk) |
| `/post-op-care` | 301 | `/services` | empty page |
| `/cart` | 301 | `/` | commerce stub |
| `/enlightment` | 301 | `/journal` | rename |
| `/enlightment/get-your-best-glow-up-at-bronze-beauties-the-best-spray-tanning-in-avon-lake-ohio-` | 301 | `/visit` | Avon Lake → Elyria story |
| `/enlightment/30-tips-to-keep-your-spray-tan-looking-fresh-and-flawless` | 301 | `/organic-spray-tanning/prep-and-aftercare` | consolidate |
| `/enlightment/spraytanattiretips` | 301 | `/organic-spray-tanning/prep-and-aftercare` | consolidate (fragment links are added in-page, but redirects cannot carry fragments reliably) |
| `/enlightment/exfoliating` | 301 | `/organic-spray-tanning/prep-and-aftercare` | consolidate |
| `/enlightment/spraytansvstanningbeds` | 301 | `/journal/spray-tan-vs-tanning-beds` | rewrite |
| `/enlightment/laserlipo` | 301 | `/services` | retired (or 410 if owner prefers de-indexing) |
| `/enlightment/bronzebeautyfullyloaded` | 301 | `/services` | retired |
| `/enlightment/category/:slug*` | 301 | `/journal` | thin archive |
| `/enlightment/tag/:slug*` | 301 | `/journal` | thin archive |
| `/enlightment/:slug*` (catch-all) | 301 | `/journal` | anything unlisted |
| `/s/*`, `/static/*`, `/config*` | 410 | — | Squarespace system paths |

**Before cutover, re-check:** pull Search Console "Pages" + "Links" reports. Any legacy URL with impressions or backlinks not in this table gets added. Squarespace image URLs (`images.squarespace-cdn.com`) are not on our domain, so image search equity can't be redirected. New images get descriptive filenames and alt text, and the image sitemap is resubmitted.
