export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  published: string;
  modified: string;
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[];
  sources?: { label: string; url: string }[];
};

export const posts: JournalPost[] = [
  {
    slug: 'spray-tan-vs-tanning-beds',
    title: 'Spray Tan vs. Tanning Beds: Why We Choose a Sunless Glow',
    description:
      'What the research says about tanning beds, how a spray tan compares, and how to get a natural bronze glow without UV exposure.',
    published: '2023-01-10',
    modified: '2026-10-02',
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          'For years, a tanning bed was the default way to get a year-round glow in Northeast Ohio. Today we know a lot more about what UV exposure does to skin, and it’s a big part of why Bronze Beauties started as a spray-tan business.',
        ],
      },
      {
        heading: 'What tanning beds do to your skin',
        paragraphs: [
          'Tanning beds work by exposing your skin to ultraviolet (UV) radiation. The World Health Organization’s International Agency for Research on Cancer and the U.S. Department of Health and Human Services both classify UV radiation, from the sun and from artificial sources like tanning beds and sun lamps, as a known carcinogen.',
          'According to the American Academy of Dermatology, using tanning beds before age 20 can increase your chances of developing melanoma by 47%, and women younger than 30 are six times more likely to develop melanoma if they tan indoors.',
          'UV exposure also breaks down collagen and elastin, which shows up over time as wrinkles, sagging and sun spots.',
        ],
      },
      {
        heading: 'How a spray tan is different',
        paragraphs: [
          'A spray tan involves no UV at all. The tanning solution reacts with the very top layer of your skin to create a temporary bronze color that fades naturally as your skin renews itself.',
          'At Bronze Beauties, every tan is custom-applied by hand with an airbrush, using a solution made with natural and organic ingredients, hydrating moisturizers and botanicals. That means you can choose your depth, avoid streaks and orange tones, and skip the sun damage.',
        ],
      },
      {
        heading: 'A few honest notes',
        paragraphs: [
          'A spray tan is cosmetic color, not sun protection. Unless a product contains sunscreen and is labeled with an SPF, it doesn’t protect you from sunburn, so keep wearing sunscreen outdoors.',
          'The FDA advises keeping tanning solutions away from the eyes, lips and the inside of the nose, so keep your eyes and mouth closed during application. You’re always welcome to ask us what’s in the solution.',
        ],
      },
      {
        heading: 'Getting the best results',
        paragraphs: [
          'The secret to a tan that looks natural and lasts is in the prep and aftercare: exfoliate and shower at least 4 hours before, arrive with clean skin, and take your first rinse between 4 and 24 hours after. Our full guide walks through every step.',
        ],
      },
    ],
    sources: [
      { label: 'American Academy of Dermatology: Indoor tanning statistics', url: 'https://www.aad.org/media/stats-indoor-tanning' },
      { label: 'U.S. FDA: Sunless tanners & bronzers', url: 'https://www.fda.gov/cosmetics/cosmetic-products/sunless-tanners-bronzers' },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
