import { portraits, type Photo } from './images';
import type { ServiceSlug } from './services';

export type BookingPlatform = 'square' | 'glossgenius';

export type Provider = {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  relationship: 'owner' | 'independent';
  businessName?: string;
  portrait: Photo;
  specialties: string[];
  services: ServiceSlug[];
  summary: string;
  bio: string[];
  booking: { platform: BookingPlatform; url: string; note?: string };
  hoursNote?: string;
};

export const platformLabel: Record<BookingPlatform, string> = {
  square: 'Square',
  glossgenius: 'GlossGenius',
};

const utm = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=bronzebeautiesbeautybar.com&utm_medium=referral&utm_campaign=booking`;

export const providers: Provider[] = [
  {
    slug: 'samantha-camel',
    name: 'Samantha Camel',
    firstName: 'Samantha',
    role: 'Founder & Organic Beauty Specialist',
    relationship: 'owner',
    portrait: portraits.samantha,
    specialties: ['Organic spray tans', 'Lash extensions', 'Facials & skincare', 'Teeth whitening'],
    services: ['organic-spray-tanning', 'lashes', 'facials', 'teeth-whitening'],
    summary:
      'Samantha founded Bronze Beauties in 2018 as a mobile spray-tan service. Today she leads the studio, specializing in organic spray tans, clean skincare, brightening treatments and lash extensions.',
    bio: [
      'Samantha started Bronze Beauties in 2018 as a mobile spray-tanning business, driving her airbrush to clients across Lorain County. Word spread, the client list grew, and the business grew with it into the full-service beauty bar it is today.',
      'Before beauty became her full-time work, she was a group exercise instructor and a dental assistant, and she competed in pageants when she was younger. Those years taught her how much the way you feel about yourself shows up in everything you do. That idea still shapes every appointment.',
      'Her approach is simple: clean, skin-friendly products paired with results-driven technique. Whether it’s a custom spray tan, a full set of lashes or a facial built around your skin that day, she wants you to leave confident, glowing and cared for.',
      'When she’s not in the studio, Samantha is at home with her husband and their five children.',
    ],
    booking: {
      platform: 'square',
      url: utm('https://book.squareup.com/appointments/qznx4p3eq8ojug/location/02X0F92GYE8N1/services'),
      note: 'Appointments are limited, so book early to secure your spot.',
    },
  },
  {
    slug: 'jennifer-wiseman',
    name: 'Jennifer Wiseman',
    firstName: 'Jennifer',
    role: 'Licensed Nail Technician',
    relationship: 'independent',
    businessName: 'Nailed It By Jenny',
    portrait: portraits.jennifer,
    specialties: ['Acrylic full sets & fills', 'Gel-X', 'Builder gel', 'Custom nail art', 'Gel pedicures'],
    services: ['nails'],
    summary:
      'Flawless basics meet next-level artistry. Whether you keep it simple or go all out with custom designs, gems and florals, your nails are in the right hands.',
    bio: [
      'Jennifer is a licensed nail technician and the owner of Nailed It By Jenny, which she runs from her suite inside Bronze Beauties.',
      'Her work ranges from clean solid-color sets to fully custom designs: hand-painted line work, chrome, gems, florals and seasonal sets. Her portfolio below is all her own work.',
      'Jennifer books through her own booking page and asks for a $10 deposit when you book, which goes toward your service.',
    ],
    booking: {
      platform: 'glossgenius',
      url: utm('https://jenniferwiseman1.glossgenius.com/services'),
      note: 'A $10 deposit secures your appointment and goes toward your service.',
    },
    hoursNote: 'Monday–Friday 10am–5pm · Saturday 9am–3pm · Sunday closed',
  },
  {
    slug: 'jazzmine-villegas',
    name: 'Jazzmine Villegas',
    firstName: 'Jazzmine',
    role: 'Esthetician & Wax Specialist',
    relationship: 'independent',
    businessName: 'Bare Beauti Avenue',
    portrait: portraits.jazzmine,
    specialties: ['Brazilian & bikini waxing', 'Full-body waxing', 'Facial & brow waxing', 'Cluster lashes'],
    services: ['waxing', 'lashes'],
    summary:
      'Jazzmine is an esthetician specializing in full-body waxing and lash clusters. From Brazilians to brows, she makes sure you leave every session looking and feeling your best.',
    bio: [
      'Hi friends, I’m Jazzmine, an esthetician specializing in full-body waxing and lash clusters. From Brazilians to facial waxing to full-body services, I love all things beauty. My goal is to make sure you leave each session looking and feeling your best.',
      'My suite is a comfortable, relaxed space where you’ll never feel rushed or judged. Before going solo I worked at a waxing chain, where I built my experience and technique.',
      'I’m accepting new clients and I can’t wait to meet you.',
    ],
    booking: {
      platform: 'glossgenius',
      url: utm('https://jazzminevillegas.glossgenius.com/'),
    },
  },
];

export const getProvider = (slug: string) => providers.find((p) => p.slug === slug);
