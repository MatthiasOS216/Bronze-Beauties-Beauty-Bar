// Explicit route list (tests can't import content modules that import images).
// Kept in sync by the sitemap test, which fails if a sitemap URL is missing here.
export const routes = [
  '/',
  '/services',
  '/organic-spray-tanning',
  '/lashes',
  '/facials',
  '/waxing',
  '/nails',
  '/teeth-whitening',
  '/organic-spray-tanning/prep-and-aftercare',
  '/artists',
  '/artists/samantha-camel',
  '/artists/jennifer-wiseman',
  '/artists/jazzmine-villegas',
  '/book',
  '/visit',
  '/about',
  '/policies',
  '/journal',
  '/journal/spray-tan-vs-tanning-beds',
  '/privacy',
  '/accessibility',
];

export const serviceSlugs = ['organic-spray-tanning', 'lashes', 'facials', 'waxing', 'nails', 'teeth-whitening'];

export const bookingTargets = [
  { slug: 'samantha-camel', firstName: 'Samantha', host: 'book.squareup.com' },
  { slug: 'jennifer-wiseman', firstName: 'Jennifer', host: 'jenniferwiseman1.glossgenius.com' },
  { slug: 'jazzmine-villegas', firstName: 'Jazzmine', host: 'jazzminevillegas.glossgenius.com' },
];
