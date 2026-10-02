import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fromPrice, getService, services } from '@/content/services';
import { getProvider, providers } from '@/content/providers';
import { reviews } from '@/content/reviews';
import { PageHero } from '@/components/sections/PageHero';
import { FaqList, FinalCta, Gallery, Menu, ReviewBlock, SectionHeading, VisitStrip } from '@/components/sections/blocks';
import { BookLink } from '@/components/ui/BookLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, serviceSchema } from '@/lib/schema';
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[service]'>): Promise<Metadata> {
  const { service: slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<'/[service]'>) {
  const { service: slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const team = s.providers.map((p) => getProvider(p)!);
  const singleArtist = team.length === 1 ? team[0].slug : undefined;
  const review = reviews.find((r) => s.slug === 'organic-spray-tanning' && r.service.toLowerCase().includes('spray'));
  const showGuideLink = s.slug === 'organic-spray-tanning';

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: s.name, path: `/${s.slug}` },
        ]}
        eyebrow={s.eyebrow}
        title={s.h1}
        lede={s.lede}
        image={s.hero}
        actions={
          <>
            <BookLink service={s.slug} artist={singleArtist} location="service_hero">
              Book {s.shortName.toLowerCase()}
            </BookLink>
            <a href="#menu" className="btn btn-ghost">
              Menu & prices
            </a>
          </>
        }
      >
        <p className="mt-8 text-sm text-taupe-300">
          From <span className="font-semibold text-bone tabular-nums">${fromPrice(s)}</span> · with{' '}
          {team.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && ' & '}
              <Link href={`/artists/${p.slug}`} className="link-underline">
                {p.name}
              </Link>
            </span>
          ))}
        </p>
      </PageHero>

      {/* Intro */}
      <section className="chapter-light section-y">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="prose-bb text-lg md:col-span-7" data-reveal>
            {s.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {showGuideLink && (
              <p>
                <Link href="/organic-spray-tanning/prep-and-aftercare" className="link-underline font-semibold">
                  Read the complete prep & aftercare guide
                </Link>
              </p>
            )}
          </div>
          <aside className="md:col-span-4 md:col-start-9" aria-label="Your artist">
            <ul className="grid gap-6">
              {team.map((p) => (
                <li key={p.slug} className="grid grid-cols-[5rem_1fr] items-center gap-5 border-t border-ink/15 pt-6" data-reveal>
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <Image src={p.portrait.src} alt={p.portrait.alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-xl">{p.name}</p>
                    <p className="text-sm text-taupe-600">{p.role}</p>
                    <Link href={`/artists/${p.slug}`} className="link-underline mt-1 inline-block text-sm">
                      Meet {p.firstName}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Process */}
      <section className="chapter-dark grain section-y" aria-labelledby="process-heading">
        <div className="container-x">
          <SectionHeading
            eyebrow="The experience"
            title={
              <span id="process-heading">
                What to <em>expect</em>
              </span>
            }
          />
          <ol className="mt-14 grid gap-px overflow-hidden bg-umber md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((step, i) => (
              <li key={step.title} className="bg-ink p-8" data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                <span className="font-display text-5xl italic text-champagne" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="muted mt-2 text-[0.97rem]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="chapter-light section-y scroll-mt-8" aria-labelledby="menu-heading">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Menu & prices"
              title={
                <span id="menu-heading">
                  {s.shortName} <em>menu</em>
                </span>
              }
              lede="Choose your service, then finish booking on your artist’s booking page."
            />
          </div>
          <div className="lg:col-span-8">
            <Menu groups={s.menu} serviceSlug={s.slug} />
          </div>
        </div>
      </section>

      {/* Prep & aftercare */}
      {(s.prep || s.aftercare) && (
        <section className="chapter-sand section-y" aria-labelledby="care-heading">
          <div className="container-x">
            <SectionHeading
              eyebrow="Before & after"
              title={
                <span id="care-heading">
                  Prep & <em>aftercare</em>
                </span>
              }
            />
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              {s.prep && (
                <div data-reveal>
                  <h3 className="mb-5 font-display text-2xl">Before your appointment</h3>
                  <ul className="grid gap-3">
                    {s.prep.map((t) => (
                      <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-3">
                        <span className="mt-3 h-px w-4 bg-bronze-700" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {s.aftercare && (
                <div data-reveal>
                  <h3 className="mb-5 font-display text-2xl">Aftercare</h3>
                  <ul className="grid gap-3">
                    {s.aftercare.map((t) => (
                      <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-3">
                        <span className="mt-3 h-px w-4 bg-bronze-700" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {showGuideLink && (
              <Link href="/organic-spray-tanning/prep-and-aftercare" className="btn btn-dark mt-12">
                The complete spray tan guide <ArrowRight />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Portfolio */}
      {s.gallery.length > 0 && (
        <section className="chapter-light section-y" aria-labelledby="gallery-heading">
          <div className="container-x">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Portfolio"
                title={
                  <span id="gallery-heading">
                    Recent <em>work</em>
                  </span>
                }
              />
            </div>
            <Gallery photos={s.gallery} label={`${s.name} portfolio`} />
          </div>
        </section>
      )}

      {review && (
        <section className="chapter-dark grain section-y" aria-label="Client review">
          <div className="container-x">
            <ReviewBlock review={review} />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="chapter-light section-y" aria-labelledby="faq-heading">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              title={
                <span id="faq-heading">
                  {s.shortName} <em>FAQ</em>
                </span>
              }
            />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={s.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="chapter-dark section-y border-t border-umber" aria-labelledby="related-heading">
        <div className="container-x">
          <p id="related-heading" className="eyebrow mb-8">
            Pairs beautifully with
          </p>
          <ul className="grid gap-px bg-umber md:grid-cols-3">
            {s.related.map((slug) => {
              const r = getService(slug)!;
              return (
                <li key={slug} className="bg-ink">
                  <Link href={`/${r.slug}`} className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors hover:bg-espresso">
                    <span>
                      <span className="block font-display text-3xl">{r.name}</span>
                      <span className="muted mt-2 block text-[0.97rem]">{r.teaser}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-champagne">
                      From ${fromPrice(r)} <ArrowUpRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <VisitStrip />
      <FinalCta service={s.slug} artist={singleArtist} />

      <JsonLd data={[serviceSchema(s, providers), faqSchema(s.faqs)]} />
    </>
  );
}
