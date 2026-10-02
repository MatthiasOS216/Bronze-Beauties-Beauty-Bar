// Legacy Squarespace URLs → new routes. Every row is asserted by tests/redirects.spec.ts.
export type LegacyRedirect = { source: string; destination: string };

export const legacyRedirects: LegacyRedirect[] = [
  { source: '/home', destination: '/' },
  { source: '/nails-1', destination: '/nails' },
  { source: '/facials-waxing', destination: '/facials' },
  { source: '/samantha-camel', destination: '/artists/samantha-camel' },
  { source: '/jazzmine', destination: '/artists/jazzmine-villegas' },
  { source: '/miranda-rivera', destination: '/artists' },
  { source: '/beauticians', destination: '/artists' },
  { source: '/services-1', destination: '/services' },
  { source: '/rules', destination: '/policies' },
  { source: '/nail-rules', destination: '/policies' },
  { source: '/lash-rules', destination: '/policies' },
  { source: '/new-location', destination: '/visit' },
  { source: '/tooth-gems', destination: '/services' },
  { source: '/body-contouring', destination: '/services' },
  { source: '/noninvasive-brazilian-butt-lifts', destination: '/services' },
  { source: '/post-op-care', destination: '/services' },
  { source: '/cart', destination: '/' },
  { source: '/enlightment', destination: '/journal' },
  {
    source: '/enlightment/get-your-best-glow-up-at-bronze-beauties-the-best-spray-tanning-in-avon-lake-ohio-',
    destination: '/visit',
  },
  {
    source: '/enlightment/30-tips-to-keep-your-spray-tan-looking-fresh-and-flawless',
    destination: '/organic-spray-tanning/prep-and-aftercare',
  },
  { source: '/enlightment/spraytanattiretips', destination: '/organic-spray-tanning/prep-and-aftercare' },
  { source: '/enlightment/exfoliating', destination: '/organic-spray-tanning/prep-and-aftercare' },
  { source: '/enlightment/spraytansvstanningbeds', destination: '/journal/spray-tan-vs-tanning-beds' },
  { source: '/enlightment/laserlipo', destination: '/services' },
  { source: '/enlightment/bronzebeautyfullyloaded', destination: '/services' },
  { source: '/enlightment/category/:slug*', destination: '/journal' },
  { source: '/enlightment/tag/:slug*', destination: '/journal' },
  { source: '/enlightment/:slug*', destination: '/journal' },
];
