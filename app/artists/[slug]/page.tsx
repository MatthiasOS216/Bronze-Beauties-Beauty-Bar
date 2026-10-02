import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProvider, platformLabel, providers } from '@/content/providers';
import { fromPrice, getService } from '@/content/services';
import { nailWork, photos, type Photo } from '@/content/images';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta, Gallery, SectionHeading } from '@/components/sections/blocks';
import { BookLink } from '@/components/ui/BookLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { personSchema } from '@/lib/schema';
import { ArrowUpRight } from '@/components/ui/icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

// Portfolio shown on each profile: only work attributable to that artist.
const portfolio: Record<string, Photo[]> = {
  'samantha-camel': [photos.sprayTanSalon, photos.sprayTanResults, photos.facial, photos.sprayTanEditorial, photos.teeth2, photos.teeth1],
  'jennifer-wiseman': nailWork,
  'jazzmine-villegas': [],
};

export async function generateMetadata({ params }: PageProps<'/artists/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = getProvider(slug);
  if (!p) return {};
  const title = `${p.name}, ${p.role}`;
  const description = `${p.summary} Book with ${p.firstName} at Bronze Beauties Beauty Bar in Elyria, Ohio.`;
  return {
    title,
    description,
    alternates: { canonical: `/artists/${p.slug}` },
    openGraph: { title, description, url: `/artists/${p.slug}`, type: 'profile' },
  };
}

export default async function ArtistPage({ params }: PageProps<'/artists/[slug]'>) {
  const { slug } = await params;
  const p = getProvider(slug);
  if (!p) notFound();
  const work = portfolio[p.slug] ?? [];

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Artists', path: '/artists' },
          { name: p.name, path: `/artists/${p.slug}` },
        ]}
        eyebrow={p.role}
        title={p.name}
        lede={p.summary}
        image={p.portrait}
        actions={
          <BookLink artist={p.slug} location="artist_hero">
            Book with {p.firstName}
          </BookLink>
        }
      >
        <p className="mt-6 text-sm text-taupe-300">
          {p.businessName ? `${p.businessName} · ` : ''}Books on {platformLabel[p.booking.platform]}
          {p.booking.note ? ` · ${p.booking.note}` : ''}
        </p>
      </PageHero>

      <section className="chapter-light section-y" aria-labelledby="bio-heading">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 id="bio-heading" className="eyebrow mb-6">
              About {p.firstName}
            </h2>
            <div className="prose-bb text-lg" data-reveal>
              {p.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
          <aside className="md:col-span-4 md:col-start-9" aria-label="Specialties and services">
            <h2 className="eyebrow mb-4">Specialties</h2>
            <ul className="flex flex-wrap gap-2">
              {p.specialties.map((s) => (
                <li key={s} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mb-4 mt-10">Services</h2>
            <ul className="border-t border-ink/15">
              {p.services.map((slug) => {
                const s = getService(slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/${s.slug}`} className="flex items-center justify-between gap-4 border-b border-ink/15 py-4 hover:text-bronze-700">
                      <span className="font-display text-xl">{s.name}</span>
                      <span className="inline-flex items-center gap-2 text-sm tabular-nums text-taupe-600">
                        from ${fromPrice(s)} <ArrowUpRight />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {p.hoursNote && (
              <>
                <h2 className="eyebrow mb-3 mt-10">{p.firstName}’s hours</h2>
                <p className="text-taupe-600">{p.hoursNote}</p>
              </>
            )}
          </aside>
        </div>
      </section>

      {work.length > 0 && (
        <section className="chapter-sand section-y" aria-labelledby="portfolio-heading">
          <div className="container-x">
            <SectionHeading
              className="mb-12"
              eyebrow="Portfolio"
              title={
                <span id="portfolio-heading">
                  {p.firstName}’s <em>work</em>
                </span>
              }
            />
            <Gallery photos={work} label={`${p.name} portfolio`} />
          </div>
        </section>
      )}

      <FinalCta
        artist={p.slug}
        title={
          <>
            Book with <em className="text-metal">{p.firstName}</em>
          </>
        }
      />
      <JsonLd data={personSchema(p)} />
    </>
  );
}
