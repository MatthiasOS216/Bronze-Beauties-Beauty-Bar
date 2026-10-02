// Single source of truth for name, address, phone and hours.
// Every page, the footer and the JSON-LD read from here so NAP never drifts.

export const siteUrl = 'https://bronzebeautiesbeautybar.com';

export const business = {
  name: 'Bronze Beauties Beauty Bar',
  shortName: 'Bronze Beauties',
  tagline: 'Glow Bold. Bronze Beautiful.',
  founded: 2018,
  phone: { display: '(440) 305-6066', tel: '+14403056066' },
  email: 'bronzebeautiestanning@gmail.com',
  address: {
    street: '1083 E. Broad St.',
    city: 'Elyria',
    region: 'OH',
    postalCode: '44035',
    country: 'US',
  },
  wayfinding:
    'We’re in the plaza with Wolfey’s, directly across from Wolfey’s main entrance. Easy parking and walk-in access right out front.',
  geo: { lat: 41.3636627, lng: -82.0763981 },
  serviceArea: 'Elyria, Lorain County and Northeast Ohio',
  social: {
    instagram: 'https://www.instagram.com/bronzebeauties_beautybar/',
    facebook: 'https://www.facebook.com/BronzeBeautiesLLC',
  },
  googleReviews: 'https://g.co/kgs/udsDPkQ',
  maps: {
    google:
      'https://www.google.com/maps/dir/?api=1&destination=Bronze+Beauties+Beauty+Bar%2C+1083+E+Broad+St%2C+Elyria%2C+OH+44035',
    apple:
      'https://maps.apple.com/?daddr=1083+E+Broad+St,+Elyria,+OH+44035&q=Bronze+Beauties+Beauty+Bar',
  },
} as const;

// Salon hours as published on the Square booking page. Individual artists
// set their own schedules inside their booking apps.
export type DayHours = { day: string; schemaDay: string; open?: string; close?: string };

export const hours: DayHours[] = [
  { day: 'Monday', schemaDay: 'Monday', open: '09:00', close: '19:00' },
  { day: 'Tuesday', schemaDay: 'Tuesday', open: '09:00', close: '19:00' },
  { day: 'Wednesday', schemaDay: 'Wednesday', open: '09:00', close: '19:00' },
  { day: 'Thursday', schemaDay: 'Thursday', open: '09:00', close: '19:00' },
  { day: 'Friday', schemaDay: 'Friday', open: '09:00', close: '19:00' },
  { day: 'Saturday', schemaDay: 'Saturday', open: '09:30', close: '17:00' },
  { day: 'Sunday', schemaDay: 'Sunday' },
];

export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;
