import Image from 'next/image';
import type { Metadata } from 'next';
import { business } from '@/content/business';
import { photos, portraits } from '@/content/images';
import { getProvider } from '@/content/providers';
import { PageHero } from '@/components/sections/PageHero';
import { ArtistPlates, FinalCta, SectionHeading, VisitStrip } from '@/components/sections/blocks';
import { BookLink } from '@/components/ui/BookLink';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Founded in 2018 by Samantha Camel as a mobile spray-tan service, Bronze Beauties Beauty Bar is now a full-service beauty studio in Elyria, Ohio.',
  alternates: { canonical: '/about' },
};

const timeline = [
  { year: '2018', text: 'Samantha launches Bronze Beauties as a mobile organic spray-tan service.' },
  { year: 'Growing', text: 'Demand grows, and so does the menu: lashes, facials, teeth whitening and more.' },
  { year: 'Today', text: 'A full beauty bar in Elyria, home to independent nail and waxing artists alongside Samantha.' },
];

export default function AboutPage() {
  const samantha = getProvider('samantha-camel')!;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', path: '/about' }]}
        eyebrow={`Since ${business.founded}`}
        title={
          <>
            Beauty that starts <em className="text-metal">with how you feel</em>
          </>
        }
        lede="Bronze Beauties began with one airbrush and a simple belief: when you feel beautiful, it shows in everything you do."
        image={portraits.samantha}
      />

      <section className="chapter-light section-y" aria-labelledby="story-heading">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Our story"
              title={
                <span id="story-heading">
                  From mobile tans <em>to a beauty bar</em>
                </span>
              }
            />
          </div>
          <div className="prose-bb text-lg md:col-span-7 md:col-start-6" data-reveal>
            {samantha.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="container-x mt-20">
          <ol className="grid gap-px bg-ink/10 md:grid-cols-3">
            {timeline.map((t) => (
              <li key={t.year} className="bg-bone p-8" data-reveal>
                <span className="font-display text-4xl italic text-bronze-700">{t.year}</span>
                <p className="mt-3 text-taupe-600">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chapter-dark grain section-y overflow-hidden" aria-labelledby="philosophy-heading">
        <div className="container-x grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionHeading
              eyebrow="Philosophy"
              title={
                <span id="philosophy-heading">
                  Clean products. <em className="text-metal">Real results.</em>
                </span>
              }
            />
            <div className="prose-bb muted mt-8 text-lg" data-reveal>
              <p>
                Every service here is about bringing beauty and self-care together. That means organic, skin-loving formulas
                where they matter most, and techniques chosen for results, not trends.
              </p>
              <p>
                It also means time. Appointments are never rushed, questions are always welcome, and every treatment is
                customized to you.
              </p>
            </div>
            <div className="mt-10">
              <BookLink location="about_philosophy" />
            </div>
          </div>
          <div className="relative md:col-span-5 md:col-start-8" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={photos.sprayTanSalon.src}
                alt={photos.sprayTanSalon.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="photo object-cover"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="chapter-dark section-y border-t border-umber" aria-labelledby="team-heading">
        <div className="container-x">
          <SectionHeading
            className="mb-14"
            eyebrow="The studio"
            title={
              <span id="team-heading">
                Meet the <em>artists</em>
              </span>
            }
          />
          <ArtistPlates />
        </div>
      </section>

      <VisitStrip />
      <FinalCta />
    </>
  );
}
