import { lashWork, nailWork, photos, portraits, type Photo } from './images';

// Prices mirror each artist's live booking page (snapshot October 2026).
// The booking page is always the source of truth; we show them as "from" prices.

export type ServiceSlug =
  | 'organic-spray-tanning'
  | 'lashes'
  | 'facials'
  | 'waxing'
  | 'nails'
  | 'teeth-whitening';

export type MenuItem = { name: string; price: number; note?: string; addOn?: boolean };
export type MenuGroup = { title?: string; provider: string; items: MenuItem[] };
export type Faq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  teaser: string;
  intro: string[];
  providers: string[];
  hero: Photo;
  gallery: Photo[];
  process: { title: string; body: string }[];
  menu: MenuGroup[];
  prep?: string[];
  aftercare?: string[];
  faqs: Faq[];
  related: ServiceSlug[];
};

export const services: Service[] = [
  {
    slug: 'organic-spray-tanning',
    name: 'Organic Spray Tanning',
    shortName: 'Spray Tan',
    eyebrow: 'The signature glow',
    h1: 'Organic spray tanning in Elyria, Ohio',
    metaTitle: 'Organic Spray Tan in Elyria, OH',
    metaDescription:
      'Custom airbrush spray tans with an organic, skin-loving solution. A natural glow, never orange. Book with Samantha at Bronze Beauties Beauty Bar in Elyria, Ohio.',
    lede: 'A custom airbrush tan with a natural, never-orange finish. It’s the service Bronze Beauties was built on.',
    teaser: 'Custom airbrush tans with a natural, never-orange finish.',
    intro: [
      'Bronze Beauties started in 2018 as a mobile spray-tan business, and the tan is still the heart of the studio. Every session is a custom airbrush application by Samantha, matched to your skin tone and the depth of glow you want, from a soft sun-kissed warmth to a deep vacation bronze.',
      'Our solution is made with natural and organic ingredients, hydrating moisturizers, botanical extracts, vitamins and antioxidants, so your skin is nourished while it develops. It’s a sunless glow with no UV exposure and no tanning bed.',
    ],
    providers: ['samantha-camel'],
    hero: photos.sprayTanSalon,
    gallery: [photos.sprayTanResults, photos.sprayTanEditorial],
    process: [
      { title: 'Prep at home', body: 'Shower, shave and exfoliate at least 4 hours before. Arrive with clean skin: no lotion, deodorant or makeup.' },
      { title: 'Choose your glow', body: 'We talk through the occasion, your skin tone and how deep you want to go, then customize the application.' },
      { title: 'Airbrush application', body: 'A quick, even airbrush session in a private room. Bring loose, dark clothing and flip-flops to change into.' },
      { title: 'Let it develop', body: 'Stay dry until your first rinse at least 4 hours later, and no more than 24 hours. Then follow the aftercare guide.' },
    ],
    menu: [
      {
        provider: 'samantha-camel',
        items: [
          { name: 'Custom spray tan', price: 60 },
          { name: 'Moisture Lock add-on', price: 5, addOn: true, note: 'Mixed into your solution to help prolong your tan.' },
          { name: 'Spray tan package: 4 tans', price: 140, note: 'Use within 60 days of purchase. Purchased in the studio.' },
        ],
      },
    ],
    prep: [
      'Shower, shave and exfoliate at least 4 hours before your appointment so your pores have time to close.',
      'Use an oil-free exfoliator. Oils create a barrier the solution can’t absorb through.',
      'Arrive with clean skin: no lotions, deodorant, perfume or makeup.',
      'Book waxing, nails, facials and massages before your tan. Wax at least 24 hours ahead.',
      'Bring loose, dark clothing and flip-flops. Skip denim, leggings and tight bras or underwear.',
    ],
    aftercare: [
      'Stay away from all moisture (showers, workouts, cleaning, lotions) until your first rinse.',
      'Take your first rinse at least 4 hours after your appointment, and no more than 24 hours after.',
      'Rinse with warm water, a gentle natural body wash and the palms of your hands. Pat dry, don’t rub.',
      'Keep your hair dry for 8 hours.',
      'Moisturize morning and night with an oil-free moisturizer.',
      'Skip swimming, long baths, steam rooms, saunas and anything that exfoliates until you’re ready to say goodbye.',
    ],
    faqs: [
      {
        q: 'Will my spray tan look orange?',
        a: 'No. Every tan is custom-mixed and applied by hand, and the solution is formulated for a natural bronze. Following the prep steps (clean, exfoliated, oil-free skin) is the biggest factor in an even result.',
      },
      {
        q: 'What should I wear to my spray tan?',
        a: 'Whatever you’re comfortable tanning in. Most clients tan without a bra; a strapless bra or bandeau works if you prefer. Afterward, change into loose, dark clothing and flip-flops: no denim, leggings, socks or tight straps until your first rinse.',
      },
      {
        q: 'When can I shower after my spray tan?',
        a: 'Wait at least 4 hours, and don’t go more than 24 hours. Use warm water and a gentle body wash, rinse with your palms, and pat dry. Some bronzer rinsing away is completely normal.',
      },
      {
        q: 'How far ahead should I tan before an event?',
        a: 'Book your tan after your other beauty services and give it time to develop and get your first rinse in before the big day. Not sure about timing? Call or text and Samantha will help you plan it.',
      },
      {
        q: 'Is spray tanning safer than a tanning bed?',
        a: 'Spray tanning doesn’t involve UV radiation, which is why dermatologists recommend sunless tanning over tanning beds. Keep wearing sunscreen outdoors, though: a spray tan doesn’t protect your skin from the sun.',
      },
    ],
    related: ['facials', 'lashes', 'teeth-whitening'],
  },
  {
    slug: 'lashes',
    name: 'Lashes',
    shortName: 'Lashes',
    eyebrow: 'Lashes that lift you up',
    h1: 'Lash extensions, lifts and clusters in Elyria',
    metaTitle: 'Lash Extensions & Lash Lifts in Elyria, OH',
    metaDescription:
      'Classic, hybrid and volume lash extensions, Korean lash lift & tint, and cluster lashes at Bronze Beauties Beauty Bar in Elyria, Ohio. Book with Samantha or Jazzmine.',
    lede: 'Classic, hybrid or volume extensions, a Korean lift and tint, or quick cluster lashes for a fresh-faced flutter.',
    teaser: 'Classic, hybrid and volume sets, lifts and clusters.',
    intro: [
      'Whether you want wake-up-ready extensions or a low-maintenance lift for your own lashes, there’s a lash service here for every routine. Samantha creates full classic, hybrid and volume extension sets and Korean lash lifts with tint. Jazzmine offers cluster lashes, a lighter-commitment option that lasts up to two weeks.',
      'Every set is mapped to your eye shape and the look you want, from natural and wispy to full and dramatic.',
    ],
    providers: ['samantha-camel', 'jazzmine-villegas'],
    hero: lashWork[0],
    gallery: lashWork,
    process: [
      { title: 'Arrive bare', body: 'Come with clean lashes and no eye makeup so the adhesive or lift solution bonds properly.' },
      { title: 'Map your look', body: 'We choose length, curl and fullness together based on your eye shape and everyday style.' },
      { title: 'Relax', body: 'You’ll lie back with your eyes closed while each lash is applied or lifted. Many clients fall asleep.' },
      { title: 'Maintain', body: 'Keep extensions full with fills every 2–3 weeks. A lash lift lasts about 5–8 weeks.' },
    ],
    menu: [
      {
        title: 'Lash extensions & lifts',
        provider: 'samantha-camel',
        items: [
          { name: 'Full set: classic, hybrid or volume', price: 120, note: 'Please arrive with no eye makeup.' },
          { name: '2-week lash fill', price: 75, note: 'Requires at least 50% of your lashes remaining.' },
          { name: '3-week lash fill', price: 80, note: 'Requires at least 50% of your lashes remaining.' },
          { name: 'Lash removal', price: 25, addOn: true },
          { name: 'Korean lash lift & tint', price: 65, note: 'A gentle, cysteamine-based lift from the root. Lasts 5–8 weeks.' },
        ],
      },
      {
        title: 'Cluster lashes',
        provider: 'jazzmine-villegas',
        items: [
          {
            name: 'Cluster lashes',
            price: 50,
            note: 'Semi-permanent clusters applied to your natural lashes, from natural to volume. Not extensions; lasts up to 2 weeks with care.',
          },
        ],
      },
    ],
    prep: [
      'Arrive with clean lashes and no mascara, liner or eye makeup.',
      'Skip caffeine right before if you tend to get fluttery eyes. You’ll be lying still with your eyes closed.',
      'Remove contact lenses before your appointment.',
    ],
    aftercare: [
      'Keep lashes dry for the first 24 hours.',
      'Avoid oil-based cleansers and makeup removers around the eyes.',
      'Brush extensions gently each morning with a clean spoolie.',
      'Don’t pull or pick. Let natural shedding happen and book fills on schedule.',
    ],
    faqs: [
      {
        q: 'What’s the difference between classic, hybrid and volume?',
        a: 'Classic places one extension on each natural lash for a clean, mascara-like look. Volume uses lightweight fans of several extensions per lash for maximum fullness. Hybrid mixes both for texture. Samantha will recommend a style based on your natural lashes.',
      },
      {
        q: 'What counts as a fill?',
        a: 'A fill refreshes your set by replacing grown-out extensions and filling empty spaces. You need at least 50% of your extensions remaining for it to count as a fill; otherwise it’s booked as a full set.',
      },
      {
        q: 'Are cluster lashes the same as extensions?',
        a: 'No. Clusters are small bundles applied to your natural lashes. They’re quicker to apply and last up to two weeks with proper care, which makes them great for events or trying out a fuller look.',
      },
      {
        q: 'How long does a Korean lash lift last?',
        a: 'Typically 5–8 weeks, as your natural lashes grow and shed. The tint deepens your own lashes so you can skip mascara.',
      },
    ],
    related: ['facials', 'waxing', 'organic-spray-tanning'],
  },
  {
    slug: 'facials',
    name: 'Facials & Skincare',
    shortName: 'Facials',
    eyebrow: 'Skin that glows naturally',
    h1: 'Facials and dermaplaning in Elyria, Ohio',
    metaTitle: 'Facials & Dermaplaning in Elyria, OH',
    metaDescription:
      'Signature, oxygen, peptide, microdermabrasion and hydrodermabrasion facials plus dermaplaning, customized to your skin. Book with Samantha at Bronze Beauties in Elyria.',
    lede: 'Results-driven facials built around your skin that day, from a quick lunch-break glow to a full hydrodermabrasion.',
    teaser: 'Facials, dermaplaning and clean skincare rituals.',
    intro: [
      'Every facial at Bronze Beauties starts with your skin: what it needs today, what you want it to do, and what’s been going on with it. Samantha combines clean, skin-friendly products with professional techniques such as enzymatic exfoliation, high frequency, LED, microdermabrasion and hydrodermabrasion, then finishes with hot towels and a relaxing massage.',
      'Short on time? The On-the-Go Facial packs a double cleanse, exfoliation and extractions into a quick visit. Want the full reset? Choose the Hydrodermabrasion or Peptide Tightening facial.',
    ],
    providers: ['samantha-camel'],
    hero: photos.facial,
    gallery: [],
    process: [
      { title: 'Skin consultation', body: 'A quick conversation about your concerns, routine and goals so the treatment fits your skin.' },
      { title: 'Cleanse & exfoliate', body: 'A double cleanse followed by enzymatic, mechanical or water-based exfoliation, depending on the facial.' },
      { title: 'Treat', body: 'Extractions, masks, serums and technology like high frequency or LED, tailored to what your skin needs.' },
      { title: 'Finish & protect', body: 'Moisturizer and SPF, with a scalp and shoulder massage to send you out relaxed.' },
    ],
    menu: [
      {
        provider: 'samantha-camel',
        items: [
          { name: 'On-the-Go Facial', price: 60, note: 'Double cleanse, exfoliation, extractions, hot towels, steam, serum, moisturizer and SPF.' },
          { name: 'Signature Facial', price: 75, note: 'Double cleanse, enzymatic exfoliation, hot towels, steam, high frequency and a scalp & shoulder massage.' },
          { name: 'Gentleman’s Facial', price: 80, note: 'Tailored to men’s skin, shaving irritation and environmental stress. Deep pore cleanse, exfoliation and custom mask.' },
          { name: 'Dermaplaning Facial', price: 80, note: 'Removes dead skin and peach fuzz with a sterile blade. Includes cleansing, extractions, LED and massage.' },
          { name: 'Oxygen Brightening Facial', price: 95, note: 'Oxygen, plant-derived stem cells, peptides and enzymatic botanicals to brighten. Add dermaplaning for $20.' },
          { name: 'Microdermabrasion Facial', price: 95, note: 'Exfoliates the outer layer of dead skin for a smoother, brighter, more even complexion.' },
          { name: 'Peptide Tightening Facial', price: 130, note: 'A firming peptide and antioxidant treatment. Includes dermaplaning if you’re a good candidate.' },
          { name: 'Hydrodermabrasion Facial', price: 150, note: 'Deep cleansing, gentle exfoliation and intense hydration with water-based technology. No downtime.' },
        ],
      },
    ],
    prep: [
      'Skip retinoids and exfoliating acids for 2–3 days before your facial.',
      'Come with a clean face if you can. If not, we’ll take care of it.',
      'Let us know about any new medications, sensitivities or recent treatments.',
    ],
    aftercare: [
      'Wear SPF daily, especially after dermaplaning, microdermabrasion or peels.',
      'Skip makeup for the rest of the day if you can, so your skin can breathe.',
      'Hold off on harsh exfoliants, saunas and intense workouts for 24 hours.',
    ],
    faqs: [
      {
        q: 'Which facial should I book?',
        a: 'For a first visit, the Signature Facial is a great all-rounder. Choose dermaplaning for smoothness and makeup that sits beautifully, Oxygen Brightening for dullness, Microdermabrasion for texture and uneven tone, and Hydrodermabrasion when you want the deepest clean and the most hydration. Not sure? Book the Signature and Samantha will guide you.',
      },
      {
        q: 'Is dermaplaning safe? Will my hair grow back thicker?',
        a: 'Dermaplaning is performed by hand with a sterile blade and removes dead skin and fine vellus hair (“peach fuzz”). The hair grows back the same; it doesn’t become thicker or darker.',
      },
      {
        q: 'Is there downtime?',
        a: 'Most facials have no downtime. You may look a little flushed for an hour or two after extractions or exfoliation. Wear SPF afterward.',
      },
      {
        q: 'Do you offer facials for men?',
        a: 'Yes. The Gentleman’s Facial is tailored to men’s skin, focusing on shaving irritation, congestion and environmental stress.',
      },
    ],
    related: ['lashes', 'waxing', 'organic-spray-tanning'],
  },
  {
    slug: 'waxing',
    name: 'Waxing',
    shortName: 'Waxing',
    eyebrow: 'Smooth, start to finish',
    h1: 'Brazilian, brow and full-body waxing in Elyria',
    metaTitle: 'Brazilian, Brow & Full-Body Waxing in Elyria, OH',
    metaDescription:
      'Brazilian, bikini, brow, facial and full-body waxing with Jazzmine at Bronze Beauties Beauty Bar in Elyria, Ohio. Comfortable, judgment-free and thorough.',
    lede: 'Brazilians, brows and everything in between, in a calm, private suite where you’ll never feel rushed or judged.',
    teaser: 'Brazilians, brows and full-body waxing.',
    intro: [
      'Jazzmine specializes in full-body waxing, from brow shaping and facial waxing to bikini and Brazilian services. Her suite is designed to feel comfortable and private, with time built in so nothing feels rushed.',
      'Waxing removes hair from the root, so you stay smooth far longer than with shaving, often 2 to 6 weeks. With regular appointments, regrowth tends to come in finer and softer and the experience gets more comfortable.',
    ],
    providers: ['jazzmine-villegas'],
    hero: portraits.jazzmine,
    gallery: [],
    process: [
      { title: 'Grow it out', body: 'Let hair grow to about ¼ inch (roughly 2–3 weeks after shaving) so the wax can grip it properly.' },
      { title: 'Quick consult', body: 'Tell Jazzmine the look you want: a full Brazilian, a landing strip, a clean bikini line or a brow shape.' },
      { title: 'Wax & tidy', body: 'Precise, efficient waxing, with trimming and tweezing to finish. Brazilians include extractions.' },
      { title: 'Soothe', body: 'Calming post-wax care. Some redness for a few minutes to a few hours is normal.' },
    ],
    menu: [
      {
        title: 'Bikini & Brazilian',
        provider: 'jazzmine-villegas',
        items: [
          { name: 'Brazilian wax: first visit', price: 45, note: 'Front, back and in-between, with extractions. A landing strip or triangle on request.' },
          { name: 'Brazilian wax: returning clients', price: 58 },
          { name: 'Full bikini', price: 50, note: 'Front with optional customization; no butt strip. Extractions included.' },
          { name: 'Bikini line', price: 43, note: 'Outside the underwear line, about 2–3 fingers wide.' },
          { name: 'Full butt', price: 28 },
          { name: 'Butt strip', price: 20 },
        ],
      },
      {
        title: 'Face & brows',
        provider: 'jazzmine-villegas',
        items: [
          { name: 'Eyebrows', price: 20, note: 'Consultation, shaping, waxing, trimming and tweezing.' },
          { name: 'Full face', price: 52, note: 'Brows, hairline, nose, sideburns, cheeks, upper and lower lip and chin.' },
          { name: 'Upper lip', price: 8 },
          { name: 'Chin', price: 10 },
          { name: 'Chin & neck', price: 15 },
          { name: 'Cheeks', price: 10 },
        ],
      },
      {
        title: 'Body',
        provider: 'jazzmine-villegas',
        items: [
          { name: 'Underarms', price: 22 },
          { name: 'Stomach', price: 35 },
          { name: 'Stomach strip', price: 12 },
          { name: 'Chest (full)', price: 35 },
          { name: 'Back: full', price: 65 },
          { name: 'Back: upper', price: 35 },
          { name: 'Back: lower', price: 30 },
          { name: 'Inner thigh', price: 20 },
          { name: 'Full leg', price: 85 },
          { name: 'Upper legs', price: 50 },
          { name: 'Lower legs', price: 40 },
        ],
      },
    ],
    prep: [
      'Let hair grow to about ¼ inch (2–3 weeks after shaving).',
      'Gently exfoliate 1–2 days before, not the day of.',
      'Skip lotions and oils on the area the day of your appointment.',
      'Planning a spray tan? Wax at least 24 hours before tanning.',
    ],
    aftercare: [
      'Avoid hot baths, saunas, tanning and intense workouts for 24 hours.',
      'Wear loose, breathable clothing after bikini and Brazilian services.',
      'Start gentle exfoliation a few days later to help prevent ingrown hairs.',
    ],
    faqs: [
      {
        q: 'Does waxing hurt?',
        a: 'Everyone’s tolerance is different, but it’s generally very well tolerated. Expect a quick sting or tingle for a few seconds as the wax is removed. It gets noticeably easier when you stay on a regular schedule, which is why we recommend keeping up with bikini and Brazilian appointments.',
      },
      {
        q: 'How long do results last?',
        a: 'Because hair is removed from the root, most clients stay smooth for 2 to 6 weeks, depending on the area and your hair growth cycle.',
      },
      {
        q: 'Will my hair grow back thicker?',
        a: 'No. Waxing tends to make regrowth finer and softer over time. Shaving blunts the hair at skin level, which is why stubble can feel coarse.',
      },
      {
        q: 'Is waxing better than shaving for ingrown hairs?',
        a: 'Usually, yes. Waxed hair grows back with a tapered tip that’s less likely to get trapped under the skin. Light exfoliation between appointments helps even more.',
      },
    ],
    related: ['lashes', 'facials', 'organic-spray-tanning'],
  },
  {
    slug: 'nails',
    name: 'Nails',
    shortName: 'Nails',
    eyebrow: 'Flawless basics, next-level art',
    h1: 'Acrylic, Gel-X and custom nail art in Elyria',
    metaTitle: 'Acrylic Nails, Gel-X & Nail Art in Elyria, OH',
    metaDescription:
      'Acrylic full sets and fills, Gel-X, builder gel and gel pedicures with custom nail art by Jennifer Wiseman of Nailed It By Jenny at Bronze Beauties in Elyria, Ohio.',
    lede: 'Clean solid sets or full custom art with gems, florals, chrome and hand-painted detail. Your nails are in the right hands.',
    teaser: 'Acrylics, Gel-X, builder gel and custom art.',
    intro: [
      'Jennifer Wiseman is a licensed nail technician who runs Nailed It By Jenny from her suite at Bronze Beauties. From a crisp solid-color set to a fully custom design with gems, charms, florals and line work, every set is built to last and made to be noticed.',
      'Every photo on this page is Jennifer’s own work.',
    ],
    providers: ['jennifer-wiseman'],
    hero: nailWork[0],
    gallery: nailWork,
    process: [
      { title: 'Pick your length & shape', body: 'Short, medium or long; square, coffin, almond and more. Bring inspiration photos if you have them.' },
      { title: 'Choose your design level', body: 'Solid color, minimal design or full design. Design level and length set your price.' },
      { title: 'Build & shape', body: 'Careful prep and a strong, balanced structure, whether it’s acrylic, Gel-X or builder gel.' },
      { title: 'Finish & maintain', body: 'Book a fill to keep your set fresh, or a soak-off when you’re ready for something new.' },
    ],
    menu: [
      {
        title: 'Acrylic full sets',
        provider: 'jennifer-wiseman',
        items: [
          { name: 'Short full set: solid color', price: 55 },
          { name: 'Short full set: minimal design', price: 65 },
          { name: 'Short full set: full design', price: 70 },
          { name: 'Medium full set: solid color', price: 60 },
          { name: 'Medium full set: minimal design', price: 65 },
          { name: 'Medium full set: full design', price: 75 },
          { name: 'Long full set: solid color', price: 70 },
          { name: 'Long full set: minimal design', price: 75 },
          { name: 'Long full set: full design', price: 80 },
        ],
      },
      {
        title: 'Fills, gel & extras',
        provider: 'jennifer-wiseman',
        items: [
          { name: 'Fill: solid color or minimal design', price: 50 },
          { name: 'Fill: full design', price: 60 },
          { name: 'Gel-X full set', price: 70 },
          { name: 'Builder gel manicure', price: 40 },
          { name: 'Gel manicure', price: 30 },
          { name: 'Men’s manicure', price: 30 },
          { name: 'Soak-off', price: 20, addOn: true },
        ],
      },
      {
        title: 'Pedicures & toes',
        provider: 'jennifer-wiseman',
        items: [
          { name: 'Gel pedicure', price: 50 },
          { name: 'Jelly mask pedicure', price: 60 },
          { name: 'Acrylic toes', price: 50 },
          { name: 'Toe polish change', price: 20, addOn: true },
        ],
      },
    ],
    aftercare: [
      'Use cuticle oil daily to keep the nail and surrounding skin healthy.',
      'Wear gloves for cleaning and dishes.',
      'Don’t pick or peel. Book a soak-off to protect your natural nails.',
      'Book fills about every 2–3 weeks to keep your set balanced.',
    ],
    faqs: [
      {
        q: 'Is there a deposit?',
        a: 'Yes. Jennifer asks for a $10 deposit when you book to secure your appointment, and it goes toward your service.',
      },
      {
        q: 'What’s the difference between acrylic, Gel-X and builder gel?',
        a: 'Acrylic is a durable sculpted enhancement, great for length and bold designs. Gel-X uses soft-gel tips for a lightweight full set. Builder gel adds strength over your natural nails for a natural-length manicure that lasts.',
      },
      {
        q: 'How do I choose between minimal and full design?',
        a: 'Minimal design covers simple accents such as a French tip, a few accent nails or light detail. Full design is for detailed art across the set: charms, florals, 3D work and hand-painted designs.',
      },
      {
        q: 'Should I do my nails before or after a spray tan?',
        a: 'Before. Book nails ahead of your spray tan so the tan isn’t disturbed and there’s no residue on fresh polish.',
      },
    ],
    related: ['organic-spray-tanning', 'lashes', 'waxing'],
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    shortName: 'Teeth Whitening',
    eyebrow: 'A brighter smile, one session',
    h1: 'Cosmetic teeth whitening in Elyria, Ohio',
    metaTitle: 'Teeth Whitening in Elyria, OH',
    metaDescription:
      'Cosmetic teeth whitening sessions with Samantha at Bronze Beauties Beauty Bar in Elyria, Ohio. A brighter smile in one comfortable visit.',
    lede: 'A comfortable, one-visit whitening session to brighten everyday staining from coffee, tea and wine.',
    teaser: 'A brighter smile in a single, comfortable session.',
    intro: [
      'Coffee, tea, wine and everyday life all leave their mark on your smile. A cosmetic whitening session with Samantha is a simple, comfortable way to brighten it, with visible results after one visit.',
      'Results vary from person to person because everyone’s teeth and habits are different. We’ll talk through what to expect at the start of your appointment.',
    ],
    providers: ['samantha-camel'],
    hero: photos.teeth2,
    gallery: [photos.teeth1, photos.teeth2],
    process: [
      { title: 'Consultation', body: 'A quick chat about your goals and any sensitivity, so the session is tailored to you.' },
      { title: 'Prep', body: 'Your teeth are prepped so the whitening gel can work evenly.' },
      { title: 'Whitening session', body: 'Sit back and relax while the whitening treatment works.' },
      { title: 'Rinse & reveal', body: 'Rinse and see your brighter smile, with tips to keep it that way.' },
    ],
    menu: [
      {
        provider: 'samantha-camel',
        items: [{ name: 'Teeth whitening session', price: 100, note: 'Price is per session. All sales are final.' }],
      },
    ],
    aftercare: [
      'For the first 24–48 hours, limit coffee, tea, red wine, dark sauces and smoking.',
      'Drink staining beverages through a straw when you can.',
      'Keep up with brushing, flossing and regular dental checkups.',
    ],
    faqs: [
      {
        q: 'How long do results last?',
        a: 'With good care, many clients enjoy a brighter smile for months. How long it lasts depends on your habits: coffee, tea, wine and smoking all bring stains back faster.',
      },
      {
        q: 'Does it hurt? Are there side effects?',
        a: 'Most clients feel no discomfort. Some experience slight, temporary sensitivity.',
      },
      {
        q: 'Can anyone get their teeth whitened?',
        a: 'Almost everyone can. Whitening works on natural enamel, not crowns, veneers or fillings. We’ll confirm you’re a good fit during your consultation. If you have dental concerns, check with your dentist first.',
      },
    ],
    related: ['organic-spray-tanning', 'facials', 'lashes'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const fromPrice = (s: Service) =>
  Math.min(...s.menu.flatMap((g) => g.items.filter((i) => !i.addOn).map((i) => i.price)));
