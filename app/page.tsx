import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { business } from '@/content/business';
import { lashWork, nailWork, photos } from '@/content/images';
import { reviews } from '@/content/reviews';
import { HeroVisual } from '@/components/three/HeroVisual';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { ArtistPlates, FinalCta, Gallery, ReviewBlock, SectionHeading, VisitStrip } from '@/components/sections/blocks';
import { BookLink } from '@/components/ui/BookLink';
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: { absolute: 'Bronze Beauties Beauty Bar | Spray Tans, Lashes & Facials in Elyria, OH' },
  alternates: { canonical: '/' },
};

const pillars = [
  {
    title: 'Clean, skin-first',
    body: 'Organic, skin-loving formulas and treatments chosen to leave your skin healthier than we found it.',
  },
  {
    title: 'Custom, every time',
    body: 'Your tan, your lashes, your facial: each one is tailored to your skin, your shape and your plans.',
  },
  {
    title: 'Every shade of glow',
    body: 'Bronze isn’t one color. We create natural, never-orange results for every skin tone.',
  },
];

const work = [nailWork[0], lashWork[0], photos.sprayTanSalon, nailWork[17], photos.facial, lashWork[2], nailWork[5], photos.teeth2];

export default function Home() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="chapter-dark grain relative flex min-h-[640px] items-center overflow-hidden pb-20 pt-32 md:min-h-[min(100svh,960px)] md:pb-28">
        <HeroVisual />
        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(180deg, rgb(14 11 9 / 0) 18%, rgb(14 11 9 / 0.72) 42%, rgb(14 11 9 / 0.55) 100%)' }}
          aria-hidden="true"
        />
        <div className="container-x relative z-10">
          <p className="eyebrow mb-6">
            <span className="mist-line" style={{ ['--d' as string]: '0ms' }}>
              Bronze Beauties Beauty Bar · Elyria, Ohio
            </span>
          </p>
          <h1 className="font-display text-display font-medium tracking-[-0.035em]">
            <span className="mist-line" style={{ ['--d' as string]: '120ms' }}>
              Glow Bold.
            </span>
            <span className="mist-line" style={{ ['--d' as string]: '320ms' }}>
              <em className="text-metal pr-[0.06em]">Bronze</em> Beautiful.
            </span>
          </h1>
          <p className="mist-line muted mt-7 max-w-xl text-lg md:text-xl" style={{ ['--d' as string]: '560ms' }}>
            Organic spray tans, lashes, skincare, waxing and nails by Northeast Ohio artists who make you feel as good as
            you look.
          </p>
          <div className="mist-line mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: '720ms' }}>
            <BookLink location="hero">Book an appointment</BookLink>
            <Link href="/services" className="btn btn-ghost">
              Explore services
            </Link>
          </div>
          <p className="mist-line mt-12 text-sm text-taupe-300" style={{ ['--d' as string]: '880ms' }}>
            {business.address.street} {business.address.city}, {business.address.region} ·{' '}
            <a href={`tel:${business.phone.tel}`} className="hover:text-champagne" data-event="phone_click" data-cta-location="hero">
              {business.phone.display}
            </a>
          </p>
        </div>
      </section>

      {/* 2 · Signature services */}
      <section className="chapter-light section-y" aria-labelledby="services-heading">
        <div className="container-x">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="What we do best"
              title={
                <span id="services-heading">
                  Signature <em>services</em>
                </span>
              }
              lede="Six ways to glow, each led by a specialist. Choose a service to see the full menu, prices and who performs it."
            />
            <Link href="/services" className="link-underline inline-flex items-center gap-2 font-semibold">
              All services <ArrowRight />
            </Link>
          </div>
          <ServiceIndex />
        </div>
      </section>

      {/* 3 · Philosophy + Artists */}
      <section className="chapter-dark grain section-y relative overflow-hidden" aria-labelledby="artists-heading">
        <div className="container-x">
          <p className="max-w-5xl font-display text-[clamp(2rem,5.2vw,4.75rem)] font-normal leading-[1.06] tracking-[-0.02em]" data-reveal>
            What began in {business.founded} as one woman and a mobile airbrush is now a beauty bar built on a simple idea:{' '}
            <em className="text-metal">when you glow, you show up differently.</em>
          </p>
          <ul className="mt-16 grid gap-10 border-t border-umber pt-10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title} data-reveal style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="muted mt-3">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-28 mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Meet the artists"
              title={
                <span id="artists-heading">
                  The artists behind <em>the glow</em>
                </span>
              }
              lede="Every artist at Bronze Beauties is a specialist in her lane. Choose who you’d like to see, then book directly with her."
            />
          </div>
          <ArtistPlates />
        </div>
      </section>

      {/* 4 · The work */}
      <section className="chapter-light section-y" aria-labelledby="work-heading">
        <div className="container-x">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="The work"
              title={
                <span id="work-heading">
                  Real clients. <em>Real results.</em>
                </span>
              }
              lede="Every photo here is work from our studio: sets, lashes, tans and smiles."
            />
            <a
              href={business.social.instagram}
              className="link-underline inline-flex items-center gap-2 font-semibold"
              data-event="social_click"
              data-network="instagram"
            >
              More on Instagram <ArrowUpRight />
            </a>
          </div>
          <Gallery photos={work} label="Recent work from Bronze Beauties" />
        </div>
      </section>

      {/* 5 · Social proof */}
      <section className="chapter-dark grain section-y" aria-label="Client review">
        <div className="container-x">
          {reviews.map((r) => (
            <ReviewBlock key={r.author} review={r} />
          ))}
          <p className="mt-10 text-center">
            <a href={business.googleReviews} className="link-underline inline-flex items-center gap-2 text-sm" data-event="reviews_click">
              Read more reviews on Google <ArrowUpRight />
            </a>
          </p>
        </div>
      </section>

      {/* 6 · Spray tan guide teaser */}
      <section className="chapter-light section-y" aria-labelledby="guide-heading">
        <div className="container-x grid items-center gap-14 md:grid-cols-12">
          <div className="relative md:col-span-5" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={photos.sprayTanEditorial.src}
                alt={photos.sprayTanEditorial.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="photo object-cover"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading
              eyebrow="Spray tan guide"
              title={
                <span id="guide-heading">
                  Your glow, <em>step by step</em>
                </span>
              }
              lede="The difference between a good tan and a great one happens before and after your appointment."
            />
            <ol className="mt-10 grid gap-6" data-reveal>
              {[
                ['Before', 'Shower, shave and exfoliate at least 4 hours ahead. Arrive with clean, product-free skin.'],
                ['During', 'Wear loose, dark clothing and flip-flops. Your custom airbrush session takes just minutes.'],
                ['After', 'First rinse after 4 hours, within 24. Moisturize with an oil-free lotion, morning and night.'],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-ink/15 pt-5">
                  <span className="font-display text-xl italic text-bronze-700">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/organic-spray-tanning/prep-and-aftercare" className="btn btn-dark">
                Read the full guide <ArrowRight />
              </Link>
              <BookLink service="organic-spray-tanning" location="home_guide" variant="ghost">
                Book a spray tan
              </BookLink>
            </div>
          </div>
        </div>
      </section>

      <VisitStrip />
      <FinalCta />
    </>
  );
}
