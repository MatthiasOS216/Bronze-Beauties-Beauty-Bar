# 01: Owner Verification List

These are facts we will **not** guess or carry over. Each one has evidence attached. 🔴 = blocks launch (wrong answer damages NAP, bookings, or legal exposure). 🟠 = blocks the affected page. 🟢 = nice to confirm.

## A. Business identity / NAP

| # | Question | Evidence of conflict | Pri |
|---|----------|---------------------|-----|
| A1 | **Which phone number is the public business number?** | Footer and Square both say **440-305-6066**. Squarespace's Business Information panel says **440-412-6757**, and that number is emitted in the site's `Organization` JSON-LD, so it is the one Google reads as structured data. | 🔴 |
| A2 | **What is the official business name?** | "Bronze Beauties Beauty Bar" (site title, Square). "Bronze Beauties Tanning" (Squarespace legalName/location name). "Bronze Beauties Salon Suites" (current header logo). "BronzeBeautiesLLC" (Facebook URL). "Bronze Beauties" (Yelp). Google requires the GBP name to match real-world signage. | 🔴 |
| A3 | Is the business a full-service beauty bar, a **salon-suite rental** concept, or both? The header logo says "Salon Suites", and Jennifer and Jazzmine operate their own businesses on site. This changes how we describe the team (staff vs. independent artists) and the Schema.org model. | logo `bronze+beauties+updated+logo+temp.png` | 🔴 |
| A4 | **Confirm the address format and suite/unit number**, if any, at 1083 E. Broad St, Elyria, OH 44035. Is the exterior sign up now? (The /new-location page says it isn't.) Is "in the plaza with Wolfey's, across from Wolfey's main entrance" still the best wayfinding? | /new-location | 🔴 |
| A5 | **Business hours.** Three versions exist: Squarespace schema says Mon–Sat 9:00–7:30. Square booking says Mon–Fri 9:00–7:00, Sat 9:30–5:00, Sun closed. Jennifer's page says Mon–Fri 10–5, Sat 9–3. Are hours by appointment and per artist, with one "salon open" window? | crawl + Square snapshot | 🔴 |
| A6 | Is the Avon Lake location (449 Avon Belden Rd, Unit A-1, Avon Lake, OH 44012) **fully closed**? Yelp still lists it as an active business. Who controls that Yelp listing and the Google Business Profile? | Yelp result | 🔴 |
| A7 | Public email: keep **bronzebeautiestanning@gmail.com**, or move to a domain address (e.g. hello@bronzebeautiesbeautybar.com)? | crawl | 🟢 |
| A8 | Official social URLs. Instagram is **@bronzebeauties_beautybar**. Facebook is **facebook.com/BronzeBeautiesLLC** (per Square/search). Is there a TikTok? The current site's social icons point to bare `instagram.com` / `facebook.com` placeholders. | crawl | 🟠 |
| A9 | What is `bronze-beauties.square.site`? It is set as the website on the Square profile. Should it be retired or pointed at the new site? | Square snapshot | 🟢 |
| A10 | Does Samantha have Google Business Profile access, and is the GBP primary category "Beauty salon", "Tanning salon", or "Day spa"? | — | 🟠 |

## B. Team

| # | Question | Evidence | Pri |
|---|----------|----------|-----|
| B1 | **Is Miranda Rivera still at Bronze Beauties?** She is on /about and /miranda-rivera, and her "Book" button points to Samantha's Square. But she is **not a bookable staff member in Square**, and she is missing from the homepage artist section. The bios also disagree ("Licensed Esthetician: facials, waxing, lash lift" vs. "Brow Specialist"). | crawl + Square | 🔴 |
| B2 | Who is **Kaylee Kirk**? `/lash-rules` sends "Schedule Appt" to `kayleekirk.glossgenius.com`, which no longer exists. Is she a current lash artist? | crawl | 🟠 |
| B3 | Jennifer Wiseman's business name: "Nailed It By Jenny" (site) or "Nailedit.byjenny" (GlossGenius)? Correct booking URL: `jenniferwiseman1.glossgenius.com` (works) or `jenniferwiseman.glossgenius.com` (dead)? Her GlossGenius page lists phone numbers different from the salon's. Which, if any, should appear on our site? | GG snapshot | 🟠 |
| B4 | Jazzmine Villegas operates as **"Bare Beauti Avenue"** on GlossGenius. May we show that business name? Her title: "Wax Specialist", "Esthetician", or "Licensed Esthetician"? | GG snapshot | 🟠 |
| B5 | Written permission from **each independent artist** to show their name, portrait, bio, work photos, and booking link. We will not copy their prices or client data into Samantha's systems. | brief | 🔴 |
| B6 | Credentials we may state, per person (license type, year, school). Miranda's bio states "licensed July 30, 2021, Raphael's School of Beauty". Nothing is stated for others. We will publish only what is confirmed. | /about | 🟠 |
| B7 | Samantha's Square staff title is "Spray Tan Artist/Body Contouring Tech". Her site title is "Owner / Organic Beauty Specialist". Which title should we use? Are there certifications (spray tan solution brand training, lash certification, esthetics license)? | Square | 🟠 |
| B8 | Who is the massage provider behind the hidden homepage link to `massagebook.com/therapists/anatomy-med-massage`? That page now returns 404. | crawl | 🟢 |

## C. Services (only confirmed services get pages)

| # | Question | Pri |
|---|----------|-----|
| C1 | **Still offered?** Body contouring / laser lipo / cavitation / RF, non-surgical "BBL", wood therapy, post-op care/massage, tooth gems, lip blush, permanent makeup, makeup, locs, massage. Square has **categories** for these but **no bookable services**. Default plan: retire these pages with 301s. | 🔴 |
| C2 | Brows: who does brow tint and lamination now? Jazzmine lists brow wax only. Miranda (if gone) was the brow lamination artist. This decides whether `/brows` is a page or a section of waxing. | 🟠 |
| C3 | **Spray tan solution brand and ingredients.** We can only say "organic" if the solution is marketed as such by its maker. Which solution? Is the "Tan Extender" (mentioned in aftercare) a product you sell? | 🔴 |
| C4 | Teeth whitening: which system (LED / non-peroxide / carbamide)? The Square listing says "We guarantee your teeth will go down a few shades". We recommend dropping the guarantee wording (consumer-protection risk). | 🟠 |
| C5 | Should prices appear on the site? Recommendation: "from $X" on service pages, sourced from the booking platform and dated, with the booking platform as the source of truth. | 🟠 |
| C6 | Spray tan: mobile/on-location or bridal/event spray tans still offered? (The business started as mobile.) Package details (4 tans / $140 / 60 days) still current? | 🟢 |
| C7 | Gift cards: Square exposes a gift-card URL. Do you sell gift cards online? | 🟢 |

## D. Policies & content

| # | Question | Pri |
|---|----------|-----|
| D1 | Confirm the cancellation policy: 48-hour notice, $30 late-cancel fee, 100% no-show charge, no refunds, child-free salon. Does it apply to **all** artists, or only Samantha's clients? (Jennifer takes a $10 deposit, a different policy.) | 🔴 |
| D2 | Spray-tan prep/aftercare contradictions to resolve before we republish. Shower at **4 h** (service page) or **8 h** (blog)? Exfoliate **4 h** or **24 h** before? "No oils at all" yet "hemp and/or cocoa butter" recommended? Lubriderm described as "all natural". | 🔴 |
| D3 | May we display the two Google reviews on the current homepage (Micaela Clement, Amanda Ramsey) with first name + last initial? Are there more reviews you'd like featured? | 🟠 |
| D4 | Photography rights: were the boudoir/swimwear spray-tan photos (blog images) shot of **your clients with consent for marketing**? Or are they stock/third-party images? | 🔴 |
| D5 | How often will you change content yourself (artists, prices, specials, blog)? This drives the CMS choice (see 08). | 🟠 |
| D6 | Access we'll need before launch: domain registrar/DNS, Squarespace admin (for export + Search Console), Google Search Console, GA4 (or permission to create), Google Business Profile. | 🔴 |
