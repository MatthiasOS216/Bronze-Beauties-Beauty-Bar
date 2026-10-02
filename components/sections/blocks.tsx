import Image from 'next/image';
import Link from 'next/link';
import { business, formatTime, fullAddress, hours } from '@/content/business';
import type { Photo } from '@/content/images';
import { providers, type Provider } from '@/content/providers';
import type { Faq, MenuGroup } from '@/content/services';
import type { Review } from '@/content/reviews';
import { BookLink } from '@/components/ui/BookLink';
import { ArrowUpRight, Plus } from '@/components/ui/icons';

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-headline font-medium tracking-[-0.02em]">{title}</h2>
      {lede && <p className="muted mt-5 max-w-2xl text-lg">{lede}</p>}
    </div>
  );
}

export function ArtistPlates({ list = providers, headingLevel = 'h3' }: { list?: Provider[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <li key={p.slug} className="group" data-reveal style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
          <Link href={`/artists/${p.slug}`} className="block">
            <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
              <Image
                src={p.portrait.src}
                alt={p.portrait.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="duotone object-cover transition-transform duration-[1.4s] ease-[var(--ease-glow)] group-hover:scale-[1.03]"
                placeholder="blur"
              />
            </div>
            <p className="eyebrow mt-6">{p.role}</p>
            <H className="mt-2 font-display text-3xl font-medium">{p.name}</H>
          </Link>
          <p className="muted mt-3 text-[0.97rem]">{p.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.firstName}'s specialties`}>
            {p.specialties.slice(0, 3).map((s) => (
              <li key={s} className="rounded-full border border-current/20 px-3 py-1 text-xs opacity-80">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BookLink artist={p.slug} location="artist_plate" variant="ghost" className="min-h-11 py-2 text-sm">
              Book with {p.firstName}
            </BookLink>
            <Link href={`/artists/${p.slug}`} className="link-underline text-sm">
              Full bio
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Gallery({ photos, label }: { photos: Photo[]; label: string }) {
  if (!photos.length) return null;
  // Short sets get an even editorial row; larger sets flow as a masonry wall.
  if (photos.length <= 3) {
    return (
      <ul className={`grid gap-3 md:gap-4 ${photos.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`} aria-label={label}>
        {photos.map((p, i) => (
          <li key={i} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
            <figure className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="photo object-cover transition-transform duration-700 hover:scale-[1.02]"
                placeholder="blur"
              />
            </figure>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4" aria-label={label}>
      {photos.map((p, i) => (
        <li key={i} className="mb-3 break-inside-avoid md:mb-4" data-reveal style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}>
          <figure className="overflow-hidden">
            <Image
              src={p.src}
              alt={p.alt}
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"
              className="photo h-auto w-full transition-transform duration-700 hover:scale-[1.02]"
              placeholder="blur"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs, headingLevel = 'h3' }: { faqs: Faq[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <div className="border-t border-current/15">
      {faqs.map((f) => (
        <details key={f.q} className="group border-b border-current/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <H className="font-display text-xl font-medium md:text-2xl">{f.q}</H>
            <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-current/25 transition-transform duration-300 group-open:rotate-45">
              <Plus />
            </span>
          </summary>
          <p className="muted -mt-1 max-w-3xl pb-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Menu({ groups, serviceSlug }: { groups: MenuGroup[]; serviceSlug: string }) {
  return (
    <div className="grid gap-14">
      {groups.map((g, gi) => {
        const p = providers.find((x) => x.slug === g.provider)!;
        return (
          <div key={gi} data-reveal>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-current pb-4">
              <div>
                {g.title && <h3 className="font-display text-2xl font-medium md:text-3xl">{g.title}</h3>}
                <p className="muted mt-1 text-sm">
                  with{' '}
                  <Link href={`/artists/${p.slug}`} className="link-underline">
                    {p.name}
                  </Link>
                  {p.businessName ? ` · ${p.businessName}` : ''}
                </p>
              </div>
              <BookLink service={serviceSlug} artist={p.slug} location="service_menu" variant="dark" className="min-h-11 py-2 text-sm">
                Book with {p.firstName}
              </BookLink>
            </div>
            <ul>
              {g.items.map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-current/10 py-4">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold tabular-nums">${item.price}</span>
                  {item.note && <span className="muted col-span-2 mt-1 max-w-2xl text-sm">{item.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <p className="muted text-xs">
        Prices reflect each artist’s booking page and may change. Your booking page always shows the current price.
      </p>
    </div>
  );
}

export function ReviewBlock({ review }: { review: Review }) {
  return (
    <figure className="mx-auto max-w-5xl text-center" data-reveal>
      <svg viewBox="0 0 48 36" className="mx-auto mb-8 h-9 w-12 text-champagne" aria-hidden="true" fill="currentColor">
        <path d="M0 36V22C0 9 7 1.5 19 0l2 5c-6.5 1.8-10 6-10.5 12H20v19H0Zm28 0V22C28 9 35 1.5 47 0l1 5c-6.5 1.8-10 6-10.5 12H48v19H28Z" />
      </svg>
      <blockquote className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-normal italic leading-[1.2]">
        {review.quote}
      </blockquote>
      <figcaption className="mt-8 text-sm">
        <span className="font-semibold">{review.author}</span>
        <span className="muted">
          {' '}
          · {review.service} · {review.source}
        </span>
      </figcaption>
    </figure>
  );
}

export function HoursTable() {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 tabular-nums">
      {hours.map((h) => (
        <div key={h.day} className="contents">
          <dt>{h.day}</dt>
          <dd className="muted">{h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : 'Closed'}</dd>
        </div>
      ))}
    </dl>
  );
}

export function VisitStrip() {
  return (
    <section className="chapter-sand section-y" aria-labelledby="visit-strip">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5" data-reveal>
          <p className="eyebrow mb-4">Visit the studio</p>
          <h2 id="visit-strip" className="font-display text-headline font-medium tracking-[-0.02em]">
            1083 E. Broad St.
            <br />
            <em>Elyria, Ohio</em>
          </h2>
          <p className="muted mt-6 max-w-md">{business.wayfinding}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={business.maps.google} className="btn btn-dark" data-event="directions_click" data-cta-location="visit_strip">
              Get directions <ArrowUpRight />
            </a>
            <a href={`tel:${business.phone.tel}`} className="btn btn-ghost" data-event="phone_click" data-cta-location="visit_strip">
              {business.phone.display}
            </a>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal>
          <h3 className="eyebrow mb-5">Studio hours</h3>
          <HoursTable />
          <p className="muted mt-6 text-sm">
            All services are by appointment. Each artist sets her own schedule, so her booking page shows real availability.
          </p>
          <p className="sr-only">{fullAddress}</p>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ service, artist, title }: { service?: string; artist?: string; title?: React.ReactNode }) {
  return (
    <section className="chapter-dark grain relative overflow-hidden section-y text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(176 122 62 / 0.5), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative" data-reveal>
        <p className="eyebrow mb-6">Your glow is one appointment away</p>
        <h2 className="mx-auto max-w-4xl font-display text-display font-medium tracking-[-0.03em]">
          {title ?? (
            <>
              Ready to <em className="text-metal">glow</em>?
            </>
          )}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <BookLink service={service} artist={artist} location="final_cta" />
          <a href={`tel:${business.phone.tel}`} className="btn btn-ghost" data-event="phone_click" data-cta-location="final_cta">
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
