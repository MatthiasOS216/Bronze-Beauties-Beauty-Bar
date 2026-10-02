# 07: Creative Direction & Design System

## 1. Concept: **"Golden Hour"**

Bronze Beauties' signature service is a *mist that turns into a glow*. The whole experience is built on that single idea: **light meeting skin**. A fine bronze mist catches warm light, settles, and resolves into the brand. Every section after the hero continues the metaphor quietly: warm raking light on photography, gold that behaves like metal (not like yellow), and dark, intimate surfaces that make skin tones glow.

- **Mood:** late-afternoon editorial beauty campaign shot on film; a dark lacquered suite with one warm key light.
- **Brand cues kept from the current identity:** the BB monogram in a diamond, black + gold, the high-contrast serif wordmark, the line "Glow Bold. Bronze Beautiful."
- **What changes:** gold stops being flat yellow (#F0C024) and becomes a *material* (bronze → champagne gradient with real specular response). Emoji headings, split-word H1s, and the pink flower-wall aesthetic are retired. Typography carries the luxury, not decoration.
- **Inclusive by default:** "bronze" is about every skin tone glowing. Imagery and grading are tested on deep, medium, and fair skin so that no tone looks ashy or orange.

## 2. Color tokens

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0E0B09` | Primary dark surface, body text on light |
| `espresso` | `#1C1511` | Raised dark surface, cards on ink |
| `umber` | `#3A2A20` | Borders/dividers on dark, image duotone shadow |
| `bronze-700` | `#6E4422` | Text links & small accents on light (7.4:1 on bone ✔) |
| `bronze-500` | `#8A5A2B` | Large text / icons on light (5.2:1 ✔) |
| `gold` | `#C0900C` | Logo-derived. **On dark only** for text (6.8:1 on ink ✔). Never as text on light (2.6:1 ✗) |
| `champagne` | `#D9B26A` | Primary CTA fill on dark (ink text on it 9.8:1 ✔), highlights |
| `gold-foil` | `#F0C024` | Reserved for the logo mark itself |
| `bone` | `#F6F1E9` | Primary light surface |
| `sand` | `#E9DCC8` | Secondary light surface / section bands |
| `taupe-600` | `#5C5149` | Secondary text on light (6.9:1 ✔) |
| `taupe-300` | `#B8ADA2` | Secondary text on dark (8.9:1 ✔) |
| `focus` | `#D9B26A` on dark / `#6E4422` on light | 2px outline + 2px offset, ≥ 3:1 against both adjacent colors |

The **metal gradient** (for buttons, rules, and 3D material reference) is `linear-gradient(115deg, #6E4422 0%, #B07A3E 35%, #E8CF95 52%, #B07A3E 68%, #5A3519 100%)`. It is used sparingly: CTA borders, the hero object, and hairline rules. It is never used as a background wash.

Pages alternate **dark chapters** (ink) and **light chapters** (bone) for rhythm. Dark is used for hero, artists, and final CTA. Light is used for services, guide, and policies (long-form reading is easier on bone).

## 3. Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Bodoni Moda** (variable, optical size 6–96; Google Fonts, OFL) | High-contrast Didone that echoes the logo wordmark. Used large (clamp 3.5–9rem), tight tracking (−0.02em), italic for emphasis words ("*Bronze* Beautiful"). |
| Text / UI | **Manrope** (variable; OFL) | Warm geometric grotesk, excellent at small sizes. 16–18px base, 1.6 line-height. |
| Eyebrows / labels | Manrope 600, uppercase, +0.16em tracking, 12–13px | |

Both are self-hosted via `next/font` with subsetting, `font-display: swap`, and metric-matched fallbacks (zero CLS). An upgrade path to a commercial pairing (e.g., *Canela* + *Neue Haas Unica*) is noted if budget allows; the tokens isolate the swap to one file.

**Type scale (fluid, 1.25 ratio @ mobile → 1.333 @ desktop):** `xs 0.8125` · `sm 0.875` · `base 1–1.125` · `lg 1.25` · `xl 1.5–1.75` · `2xl 2–2.5` · `3xl 2.5–3.5` · `display 3.5–9rem`.

## 4. Space, grid, shape

- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section padding is `clamp(64px, 12vw, 192px)`. Whitespace is a feature.
- **Grid:** 4 cols (mobile, 16px gutters, 20px margins) → 8 cols (tablet) → 12 cols (desktop, 24px gutters). Content max width is 1320px. Long-form measure is 68ch.
- **Editorial breaks:** asymmetric image/text pairs, full-bleed imagery, and oversized type that crosses image edges. No uniform card grids for primary content.
- **Radii:** 0 for photography and editorial blocks (luxury = crisp). 999px for pills/chips and the CTA. 12px for small UI (sheets, inputs).
- **Elevation:** almost none. Depth comes from light and layering, not drop shadows. One "lift" shadow for sheets: `0 24px 60px -20px rgb(14 11 9 / .45)`.
- **Surfaces:** subtle film grain (2–3% SVG noise) on dark chapters. No glassmorphism except one place: the mobile action bar (8px blur, 70% ink) for legibility over imagery.

## 5. Components (spec before build)

- **Button / Primary:** champagne fill, ink text, pill. Hover: metal-gradient sheen sweeps across (transform-only). Minimum 48px tall.
- **Button / Secondary:** 1px metal-gradient border, transparent background.
- **Text link:** bronze-700 with 1px underline offset 4px. On hover the underline animates thickness.
- **Booking sheet:** a full-height dialog on mobile and a right-side panel on desktop, with focus-trapped steps (see 03).
- **Service row:** large serif name · hairline · "from $X" · duration · provider avatars · arrow. Hovering a row on desktop reveals a portfolio image that follows the cursor.
- **Artist plate:** tall portrait (4:5) with bronze duotone at rest that resolves to full color on hover/focus or in view on mobile. Name in display serif, role, and specialties as chips.
- **Portfolio mosaic:** masonry with consistent grading. Clicking opens an accessible lightbox with alt text and service tag.
- **Review:** a large pull-quote in Bodoni italic, with attribution and source ("Google review").
- **NAP block / Location strip:** address, tap-to-call, directions, and today's hours (computed), with structured markup.
- **Forms:** none needed for v1 (booking is external). A contact link uses `mailto:` and `sms:`. If a form is added later, it gets visible labels, inline errors, and spam protection without CAPTCHA puzzles.
- **Mobile action bar:** Book · Call · Directions. It appears after the hero and hides while the booking sheet is open.

## 6. Image treatment

- One **grade** for all photography: warm white balance, lifted blacks to `umber`, and gentle highlight roll-off (applied once at ingest via a sharp pipeline/LUT, not CSS filters).
- **Bronze duotone** variant (umber → champagne) for inactive states and for low-res placeholders. It hides compression honestly instead of upscaling.
- Crops: portrait 4:5 for people; 3:4 / 1:1 for work; 21:9 full-bleed for environment (once the new space is photographed).
- Every image has meaningful alt text describing the *work* ("Almond-shape acrylic set with chrome French tips by Jennifer Wiseman"), not "image".

## 7. Motion language

- **Character:** slow in, soft settle, like light shifting. Easing `cubic-bezier(.22,1,.36,1)` (out-expo-ish). Durations: micro 160–240ms, UI 320–480ms, scenes 800–1400ms.
- **Signature moves:**
  1. **Mist reveal:** headlines resolve from blurred, slightly offset glyphs (mask + opacity + 8px translate, staggered by line).
  2. **Light sweep:** a specular band crosses gold elements once when they enter view.
  3. **Depth parallax:** image layers shift 4–8% on scroll. Never on text.
  4. **Chapter transitions:** dark↔light sections cross-fade background color tied to scroll position (GSAP ScrollTrigger, scrub).
- **Rules:** only `transform`, `opacity`, and `filter` on small elements. No scroll-jacking. No smooth-scroll library that hijacks native scrolling (Lenis is allowed only if INP/accessibility tests pass; default off). Nothing loops forever except the hero object, which pauses off-screen.
- **`prefers-reduced-motion: reduce`:** all reveals become instant, parallax and sweeps are disabled, the hero shows a still render, and video posters replace loops.

## 8. 3D language: "The Bronze Drop"

**Hero object:** a single, slowly turning liquid-metal form, a droplet/ribbon of molten bronze. It refracts and reflects a warm studio HDRI, and an envelope of fine golden mist particles (the spray-tan mist) drifts around it.
- **Cursor/tilt response:** the key light follows the pointer (desktop) or device tilt (mobile, permission-gated, off by default). The surface ripples subtly where the light hits.
- **Scroll:** as the user scrolls out of the hero, the particles condense into a thin gold rule that becomes the first section divider. The 3D hands off to the DOM, which ties the effect to the narrative.
- **Monogram option (needs owner approval + vector logo):** the BB monogram appears *reflected* in the metal surface rather than as an extruded 3D logo. This preserves the logo exactly and avoids "redesigning" it.
- **Tech:** React Three Fiber + drei; custom `MeshPhysicalMaterial` (metalness 1, roughness 0.18, clearcoat) or a lightweight custom shader; GPU-instanced particles (≤ 4k desktop, ≤ 1.2k capable mobile); compressed HDRI (≤ 200KB KTX2/RGBE at 512px); geometry generated procedurally, so no GLB download.
- **Tiering:**
  - *Tier A* (desktop/high-end mobile, WebGL2, no reduced-motion, `deviceMemory ≥ 4`, not Save-Data): live scene, loaded after LCP on idle.
  - *Tier B* (average phone / low GPU): a 6-second pre-rendered AV1/H.264 loop of the same scene (≈ 600KB), with a poster.
  - *Tier C* (reduced motion / Save-Data / no WebGL): a still AVIF render.
  - The **LCP element is always the headline text plus the poster image**, never the canvas, so the 3D can never hurt LCP.
- **Restraint:** 3D appears in the hero and once more at most (a smaller echo in the final booking CTA). Everywhere else, motion is DOM/CSS.

## 9. Homepage narrative (final structure)

1. **Hero (dark).** "Glow Bold. *Bronze* Beautiful." Sub-line: *Organic spray tans, lashes, skin & nails, Elyria, Ohio.* Primary CTA **Book an Appointment** + secondary **Explore Services**. The Bronze Drop sits behind. A verified review quote (no invented star ratings) plus a "1083 E. Broad St, Elyria" micro-line.
2. **Signature services (light).** An editorial list, not cards: Spray Tan · Lashes · Facials · Waxing · Nails · Teeth Whitening. Each row has "from" price + provider + cursor-follow image.
3. **The glow philosophy (dark).** A brand statement in giant serif: clean, skin-first, every tone. One pull-quote from Samantha.
4. **Meet the artists (dark).** Plates for the confirmed artists. Each plate goes straight to that artist's booking.
5. **The work (light).** Portfolio mosaic filterable by service, using authentic images only.
6. **Kind words (dark).** Reviews + "Read more on Google".
7. **Spray tan guide teaser (light).** "Your glow, step by step." A three-step preview linking to the guide (SEO hub, plus it builds trust).
8. **Visit (light → dark).** Address, wayfinding (Wolfey's plaza), hours, map on interaction, directions.
9. **Final CTA (dark).** A small echo of the Bronze Drop, with "Your glow is one appointment away."

The booking CTA is visible in the hero, the header (desktop), the action bar (mobile), and the final CTA. It is persistent but never a pop-up.
