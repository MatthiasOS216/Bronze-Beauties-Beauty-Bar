import type { StaticImageData } from 'next/image';

import logo from '@/images/logo-beauty-bar.png';
import logoMark from '@/images/logo-mark.png';
import samantha from '@/images/samantha-camel.jpg';
import jennifer from '@/images/jennifer-wiseman.jpg';
import jazzmine from '@/images/jazzmine-villegas.jpg';
import sprayTanSalon from '@/images/spray-tan-salon.jpg';
import sprayTanResults from '@/images/spray-tan-results.jpg';
import sprayTanEditorial from '@/images/spray-tan-editorial.jpg';
import lashes1 from '@/images/lashes-1.jpg';
import lashes2 from '@/images/lashes-2.jpg';
import lashes3 from '@/images/lashes-3.jpg';
import lashes4 from '@/images/lashes-4.jpg';
import lashes5 from '@/images/lashes-5.jpg';
import facial1 from '@/images/facial-1.jpg';
import teeth1 from '@/images/teeth-1.jpg';
import teeth2 from '@/images/teeth-2.jpg';
import nails01 from '@/images/nails-01.jpg';
import nails02 from '@/images/nails-02.jpg';
import nails03 from '@/images/nails-03.jpg';
import nails04 from '@/images/nails-04.jpg';
import nails05 from '@/images/nails-05.jpg';
import nails06 from '@/images/nails-06.jpg';
import nails07 from '@/images/nails-07.jpg';
import nails08 from '@/images/nails-08.jpg';
import nails09 from '@/images/nails-09.jpg';
import nails10 from '@/images/nails-10.jpg';
import nails11 from '@/images/nails-11.jpg';
import nails12 from '@/images/nails-12.jpg';
import nails13 from '@/images/nails-13.jpg';
import nails14 from '@/images/nails-14.jpg';
import nails15 from '@/images/nails-15.jpg';
import nails16 from '@/images/nails-16.jpg';
import nails17 from '@/images/nails-17.jpg';
import nails18 from '@/images/nails-18.jpg';

export type Photo = { src: StaticImageData; alt: string; tag?: string };

export const brand = {
  logo: { src: logo, alt: 'Bronze Beauties Beauty Bar logo' } satisfies Photo,
  mark: { src: logoMark, alt: 'Bronze Beauties monogram' } satisfies Photo,
};

export const portraits = {
  samantha: { src: samantha, alt: 'Samantha Camel, founder of Bronze Beauties Beauty Bar, in the studio' },
  jennifer: { src: jennifer, alt: 'Jennifer Wiseman, nail technician' },
  jazzmine: { src: jazzmine, alt: 'Jazzmine Villegas, esthetician and wax specialist, smiling' },
} satisfies Record<string, Photo>;

export const photos = {
  sprayTanSalon: {
    src: sprayTanSalon,
    alt: 'Client showing a fresh, even spray tan against the textured white wall at Bronze Beauties',
    tag: 'Spray tan',
  },
  sprayTanResults: {
    src: sprayTanResults,
    alt: 'Four clients side by side showing natural-looking spray tan results across different skin tones',
    tag: 'Spray tan',
  },
  sprayTanEditorial: {
    src: sprayTanEditorial,
    alt: 'Client with a deep, golden spray tan relaxing on a black sofa',
    tag: 'Spray tan',
  },
  facial: {
    src: facial1,
    alt: 'Client relaxing under a hydrating mask during a facial treatment',
    tag: 'Facials',
  },
  teeth1: { src: teeth1, alt: 'Close-up of a bright, even smile after a teeth whitening session', tag: 'Teeth whitening' },
  teeth2: { src: teeth2, alt: 'Close-up of whitened teeth after a whitening session', tag: 'Teeth whitening' },
} satisfies Record<string, Photo>;

export const lashWork: Photo[] = [
  { src: lashes1, alt: 'Full, wispy lash extension set on a client with light brown hair', tag: 'Lashes' },
  { src: lashes2, alt: 'Soft, natural lash extensions framing hazel eyes', tag: 'Lashes' },
  { src: lashes3, alt: 'Defined lash set with shaped brows in front of a rose flower wall', tag: 'Lashes' },
  { src: lashes4, alt: 'Fluffy lash extension set on a client with blonde hair', tag: 'Lashes' },
  { src: lashes5, alt: 'Client on the treatment bed after a lash and brow appointment', tag: 'Lashes' },
];

export const nailWork: Photo[] = [
  { src: nails01, alt: 'Square acrylic set in pink with 3D floral and pearl accents', tag: 'Nails' },
  { src: nails02, alt: 'Long square acrylics with a pink-to-white ombré French finish', tag: 'Nails' },
  { src: nails03, alt: 'Black square acrylics with silver glitter accent nails', tag: 'Nails' },
  { src: nails04, alt: 'Coffin acrylics in hot pink with black accents on a white fur rest', tag: 'Nails' },
  { src: nails05, alt: 'Clear coffin acrylics with encapsulated glitter and flowers', tag: 'Nails' },
  { src: nails06, alt: 'Nude coffin set with gold leaf and crystal detailing', tag: 'Nails' },
  { src: nails07, alt: 'Chocolate brown coffin nails with gold glitter accent', tag: 'Nails' },
  { src: nails08, alt: 'Nude set with brown animal-print French tips', tag: 'Nails' },
  { src: nails09, alt: 'Short red holiday nails with hand-painted details', tag: 'Nails' },
  { src: nails10, alt: 'Pink coffin acrylics with black French tips and heart details', tag: 'Nails' },
  { src: nails11, alt: 'Coral and pink marbled coffin acrylics', tag: 'Nails' },
  { src: nails12, alt: 'Nude coffin set with crystal clusters and fine line art', tag: 'Nails' },
  { src: nails13, alt: 'Nude square nails with red French tips and gem accents', tag: 'Nails' },
  { src: nails14, alt: 'Long nude square set with white French tips and silver charms', tag: 'Nails' },
  { src: nails15, alt: 'Clear nude nails with pink and purple swirl line art', tag: 'Nails' },
  { src: nails16, alt: 'Mixed set in periwinkle, cobalt and nude with gold flake accents', tag: 'Nails' },
  { src: nails17, alt: 'Pink and baby blue French-tip coffin nails', tag: 'Nails' },
  { src: nails18, alt: 'Long almond nails in neon green with white lettering on deep skin tone', tag: 'Nails' },
];
