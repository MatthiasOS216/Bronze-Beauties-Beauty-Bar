import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { business } from '@/content/business';
import { getProvider, platformLabel, providers, type Provider } from '@/content/providers';
import { fromPrice, getService, services, type Service } from '@/content/services';
import { bookHref } from '@/components/ui/BookLink';
import { ArrowLeft, ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book your spray tan, lashes, facial, waxing, nails or teeth whitening at Bronze Beauties Beauty Bar in Elyria, Ohio. Choose a service and artist, then pick your time.',
  alternates: { canonical: '/book' },
};

type Step = 'service' | 'artist' | 'handoff';

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

/** What a given artist does within a service (e.g. lashes: extensions vs. clusters). */
function offeringSummary(service: Service, provider: Provider) {
  const groups = service.menu.filter((g) => g.provider === provider.slug);
  const items = groups.flatMap((g) => g.items);
  const label = groups.map((g) => g.title).filter(Boolean).join(' · ') || service.name;
  const main = items.filter((i) => !i.addOn);
  return { label, from: Math.min(...(main.length ? main : items).map((i) => i.price)), count: items.length };
}

export default async function BookPage({ searchParams }: PageProps<'/book'>) {
  const sp = await searchParams;
  const service = getService(first(sp.service) ?? '');
  const requestedArtist = getProvider(first(sp.artist) ?? '');
  // Ignore an artist who doesn't perform the chosen service.
  const artist = requestedArtist && (!service || requestedArtist.services.includes(service.slug)) ? requestedArtist : undefined;
  const candidates = service ? service.providers.map((p) => getProvider(p)!) : [];
  const chosen = artist ?? (candidates.length === 1 ? candidates[0] : undefined);

  const step: Step = chosen ? 'handoff' : service ? 'artist' : 'service';
  const stepIndex = { service: 1, artist: 2, handoff: 3 }[step];

  return (
    <section className="chapter-dark grain min-h-[80vh] pb-24 pt-28 md:pt-36">
      <div className="container-x">
        <p className="eyebrow mb-4">Book an appointment</p>
        <ol className="mb-10 flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Booking steps">
          {['Choose a service', 'Choose your artist', 'Pick your time'].map((label, i) => (
            <li
              key={label}
              className={i + 1 === stepIndex ? 'font-semibold text-champagne' : i + 1 < stepIndex ? 'text-bone/70' : 'text-taupe-300/70'}
              aria-current={i + 1 === stepIndex ? 'step' : undefined}
            >
              <span className="tabular-nums">{i + 1}.</span> {label}
            </li>
          ))}
        </ol>

        {step === 'service' && (
          <>
            <h1 className="font-display text-headline font-medium tracking-[-0.02em]">
              What are you <em className="text-metal">booking?</em>
            </h1>
            <ul className="mt-12 grid gap-px bg-umber sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug} className="bg-ink">
                  <Link
                    href={bookHref({ service: s.slug })}
                    className="group grid h-full grid-cols-[4.5rem_1fr] items-center gap-5 p-6 transition-colors hover:bg-espresso"
                    data-event="booking_step"
                    data-step="service"
                    data-service={s.slug}
                  >
                    <span className="relative aspect-square overflow-hidden">
                      <Image src={s.hero.src} alt="" fill sizes="72px" className="duotone object-cover" />
                    </span>
                    <span>
                      <span className="block font-display text-2xl">{s.shortName}</span>
                      <span className="muted block text-sm tabular-nums">from ${fromPrice(s)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mb-5 mt-16">Or book with a specific artist</h2>
            <ul className="flex flex-wrap gap-3">
              {providers.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={bookHref({ artist: p.slug })}
                    className="btn btn-ghost min-h-11 py-2 text-sm"
                    data-event="provider_select"
                    data-provider={p.slug}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 'artist' && service && (
          <>
            <Link href="/book" className="mb-6 inline-flex items-center gap-2 text-sm text-taupe-300 hover:text-bone">
              <ArrowLeft /> All services
            </Link>
            <h1 className="font-display text-headline font-medium tracking-[-0.02em]">
              Who would you like for <em className="text-metal">{service.shortName.toLowerCase()}?</em>
            </h1>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {candidates.map((p) => {
                const o = offeringSummary(service, p);
                return (
                  <li key={p.slug}>
                    <Link
                      href={bookHref({ service: service.slug, artist: p.slug })}
                      className="group grid grid-cols-[7rem_1fr] gap-6 border border-umber p-5 transition-colors hover:border-champagne/60 hover:bg-espresso md:grid-cols-[9rem_1fr]"
                      data-event="provider_select"
                      data-provider={p.slug}
                      data-service={service.slug}
                    >
                      <span className="relative aspect-[4/5] overflow-hidden">
                        <Image src={p.portrait.src} alt="" fill sizes="144px" className="object-cover" />
                      </span>
                      <span className="flex flex-col justify-center">
                        <span className="block font-display text-3xl">{p.name}</span>
                        <span className="mt-1 block text-sm text-champagne">{o.label}</span>
                        <span className="muted mt-3 block text-sm tabular-nums">
                          {o.count} {o.count === 1 ? 'service' : 'services'} · from ${o.from}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {step === 'handoff' && chosen && (
          <Handoff provider={chosen} service={service} />
        )}
      </div>
    </section>
  );
}

function Handoff({ provider: p, service }: { provider: Provider; service?: Service }) {
  const platform = platformLabel[p.booking.platform];
  const back = service && service.providers.length > 1 ? bookHref({ service: service.slug }) : '/book';
  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="md:col-span-7">
        <Link href={back} className="mb-6 inline-flex items-center gap-2 text-sm text-taupe-300 hover:text-bone">
          <ArrowLeft /> Back
        </Link>
        <h1 className="font-display text-headline font-medium tracking-[-0.02em]">
          Book with <em className="text-metal">{p.firstName}</em>
        </h1>
        <p className="muted mt-6 max-w-xl text-lg">
          {service ? `${service.name} with ${p.name}. ` : ''}
          {p.firstName} manages her schedule on {platform}
          {p.businessName ? ` as ${p.businessName}` : ''}. You’ll choose your exact service and time there, and get your
          confirmation straight from {p.firstName}.
        </p>

        <a
          href={p.booking.url}
          className="btn btn-primary mt-10 w-full text-base sm:w-auto"
          data-event="booking_handoff"
          data-provider={p.slug}
          data-platform={p.booking.platform}
          data-service={service?.slug ?? 'any'}
        >
          Continue to {p.firstName}’s booking page <ArrowUpRight />
        </a>
        <p className="mt-3 text-xs text-taupe-300">Opens {platform} booking for {p.name}.</p>
      </div>

      <aside className="border-t border-umber pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0" aria-label="Before you book">
        <div className="mb-8 grid grid-cols-[4.5rem_1fr] items-center gap-4">
          <span className="relative aspect-square overflow-hidden rounded-full">
            <Image src={p.portrait.src} alt={p.portrait.alt} fill sizes="72px" className="object-cover" />
          </span>
          <span>
            <span className="block font-display text-xl">{p.name}</span>
            <span className="text-sm text-taupe-300">{p.role}</span>
          </span>
        </div>
        <h2 className="eyebrow mb-4">Good to know</h2>
        <ul className="grid gap-3 text-[0.97rem]">
          {p.booking.note && <li>{p.booking.note}</li>}
          <li>Please give at least 48 hours’ notice to cancel or reschedule. Late cancellations are charged $30.</li>
          <li>No-shows are charged the full service price.</li>
          <li>We’re an adults-only, child-free studio.</li>
        </ul>
        <p className="mt-5 text-sm">
          <Link href="/policies" className="link-underline">
            Read the full booking policies
          </Link>
        </p>
        <p className="muted mt-8 text-sm">
          Questions first? Call or text{' '}
          <a href={`tel:${business.phone.tel}`} className="link-underline text-bone" data-event="phone_click" data-cta-location="book_handoff">
            {business.phone.display}
          </a>
          .
        </p>
      </aside>
    </div>
  );
}
