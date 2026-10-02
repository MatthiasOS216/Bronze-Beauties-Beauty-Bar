# 03: Booking Architecture

## Current infrastructure (verified 2026-10-02)

| Provider | Business entity | Platform | Public booking URL | Status |
|---|---|---|---|---|
| Samantha Camel (owner) | Bronze Beauties Beauty Bar | **Square Appointments** (location `02X0F92GYE8N1`) | `https://book.squareup.com/appointments/qznx4p3eq8ojug/location/02X0F92GYE8N1/services` | ✅ Only staff member: Samantha |
| Jennifer Wiseman | Nailedit.byjenny (independent) | **GlossGenius** | `https://jenniferwiseman1.glossgenius.com/services` | ✅ (the `jenniferwiseman.` slug is dead) |
| Jazzmine Villegas | Bare Beauti Avenue (independent) | **GlossGenius** | `https://jazzminevillegas.glossgenius.com/` | ✅ |
| Miranda Rivera | ? | linked to Samantha's Square | — | ❌ not bookable → VERIFY B1 |
| Kaylee Kirk | ? | GlossGenius | `kayleekirk.glossgenius.com` | ❌ dead → VERIFY B2 |

Both GlossGenius businesses list **1083 E Broad St, Elyria** as their address, which confirms co-location. Each has its own phone numbers, deposit rules, and client database.

## Principles
1. **The website stores no client PII and processes no payments.** Booking, deposits, intake, and client records stay entirely inside each provider's own platform. Nothing about this rebuild merges Square and GlossGenius data.
2. **One front door, many back rooms.** Clients experience *Service → Artist (if more than one) → Book*. The platform switch happens only at the final click, with a transparent label ("Books on Jennifer's GlossGenius page").
3. **Booking destinations live in data, not markup.** Each provider record holds `bookingPlatform`, `bookingUrl`, and optional per-service deep links. If an artist changes platform or leaves, one record changes and every CTA updates.
4. **Independent artists are presented as independent.** Profile copy will say e.g. "Jennifer runs *Nailedit.byjenny* from her suite at Bronze Beauties", which is accurate and legally clean.

## Data model (draft)

```ts
type BookingPlatform = 'square' | 'glossgenius' | 'other';

interface Provider {
  slug: string;                 // 'jennifer-wiseman'
  name: string;
  role: string;                 // confirmed title only
  businessName?: string;        // 'Nailedit.byjenny' (independent)
  relationship: 'owner' | 'staff' | 'independent';
  booking: { platform: BookingPlatform; url: string; depositNote?: string };
  serviceCategories: ServiceCategorySlug[];
  active: boolean;              // false → profile 301s to /artists, CTAs disappear
}

interface ServiceOffering {      // one row per provider × service
  category: ServiceCategorySlug; // 'lashes'
  providerSlug: string;
  name: string;                  // 'Classic, hybrid or volume full set'
  fromPrice?: number;            // display only, "from"; platform is source of truth
  bookingUrl?: string;           // deep link if the platform supports it
  priceCheckedAt: string;        // ISO date, shown in CMS, not to users
}
```

## Front-end flow

```
Any "Book" CTA  ──►  /book  (or an in-page sheet on mobile)
   Step 1  What are you booking?   [Spray Tan] [Lashes] [Facials] [Waxing] [Nails] [Teeth Whitening]
   Step 2  Who would you like?     only shown when >1 active provider offers the category
           e.g. Lashes → Samantha (extensions, lift & tint) · Jazzmine (cluster lashes, not extensions)
   Step 3  Confirm + hand-off      "You'll finish booking on Square / GlossGenius"
           • policy summary (48h notice, deposit if applicable) with link to /policies
           • [Continue to booking ↗] opens provider URL (same tab on mobile, new tab on desktop)
```

- On a service page, the CTA pre-selects step 1. On an artist page, it pre-selects the artist, so the click goes **straight** to the provider (zero intermediate steps).
- The `/book` route is server-rendered and works without JavaScript: each choice is a real link (`/book?service=lashes`), then progressively enhanced into an animated sheet.
- **Policy gate removed.** Today's mandatory /rules interstitial costs a click. The new flow shows a three-line policy summary inside step 3, with the full page linked.
- **Outbound links** get `utm_source=bronzebeautiesbeautybar.com&utm_medium=referral&utm_campaign=booking&utm_content=<cta-location>`. GA4 also fires a `booking_handoff` event. Neither platform needs integration for this.

## Future options (only with explicit authorization)
- Square Appointments API: live availability for Samantha's services (requires her Square OAuth and adds a server dependency, so not in v1).
- A "next available" badge per provider is possible from Square only. GlossGenius has no public API, so we will **not** scrape it.
