import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ArtistPlates, FinalCta, VisitStrip } from '@/components/sections/blocks';

export const metadata: Metadata = {
  title: 'Meet the Artists',
  description:
    'Meet the artists at Bronze Beauties Beauty Bar in Elyria: Samantha Camel (spray tans, lashes, facials, teeth whitening), Jennifer Wiseman (nails) and Jazzmine Villegas (waxing, cluster lashes).',
  alternates: { canonical: '/artists' },
};

export default function ArtistsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Artists', path: '/artists' }]}
        eyebrow="The artists"
        title={
          <>
            Specialists, <em className="text-metal">each in her lane</em>
          </>
        }
        lede="Every artist at Bronze Beauties brings her own specialty. Choose who you’d like to glow with, then book directly with her."
      />
      <section className="chapter-dark section-y pt-8 md:pt-12" aria-label="Artists">
        <div className="container-x">
          <ArtistPlates headingLevel="h2" />
        </div>
      </section>
      <VisitStrip />
      <FinalCta />
    </>
  );
}
