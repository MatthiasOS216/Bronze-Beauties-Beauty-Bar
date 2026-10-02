import type { Metadata } from 'next';
import { business, fullAddress } from '@/content/business';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta, HoursTable, SectionHeading } from '@/components/sections/blocks';
import { ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Visit Us in Elyria, OH: Hours & Directions',
  description:
    'Bronze Beauties Beauty Bar is at 1083 E. Broad St., Elyria, OH 44035, in the plaza with Wolfey’s. Hours, parking, directions and how to find us. Formerly in Avon Lake.',
  alternates: { canonical: '/visit' },
};

const nearby = ['Elyria', 'North Ridgeville', 'Lorain', 'Avon', 'Avon Lake', 'Amherst', 'Sheffield', 'Oberlin', 'Grafton', 'LaGrange'];

export default function VisitPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Visit', path: '/visit' }]}
        eyebrow="Visit the studio"
        title={
          <>
            Find us in <em className="text-metal">Elyria</em>
          </>
        }
        lede={business.wayfinding}
        actions={
          <>
            <a href={business.maps.google} className="btn btn-primary" data-event="directions_click" data-provider="google" data-cta-location="visit_hero">
              Google Maps <ArrowUpRight />
            </a>
            <a href={business.maps.apple} className="btn btn-ghost" data-event="directions_click" data-provider="apple" data-cta-location="visit_hero">
              Apple Maps <ArrowUpRight />
            </a>
          </>
        }
      />

      <section className="chapter-light section-y">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal>
            <h2 className="eyebrow mb-4">Address</h2>
            <address className="font-display text-4xl not-italic leading-tight">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>
            <dl className="mt-10 grid gap-6">
              <div>
                <dt className="eyebrow mb-1">Call or text</dt>
                <dd>
                  <a href={`tel:${business.phone.tel}`} className="link-underline text-xl" data-event="phone_click" data-cta-location="visit">
                    {business.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Email</dt>
                <dd>
                  <a href={`mailto:${business.email}`} className="link-underline break-all">
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Parking</dt>
                <dd className="text-taupe-600">Easy plaza parking right out front, with walk-in access.</dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-6 md:col-start-7" data-reveal>
            <h2 className="eyebrow mb-5">Studio hours</h2>
            <HoursTable />
            <p className="mt-6 text-sm text-taupe-600">
              All services are by appointment. Each artist sets her own schedule, so her booking page shows live availability.
            </p>
            <div className="mt-10 grid gap-3 border border-ink/15 p-6">
              <p className="font-display text-2xl">Look for the plaza with Wolfey’s</p>
              <p className="text-taupe-600">
                We’re directly across from Wolfey’s main entrance. If you need help finding us, call or text and we’ll guide you in.
              </p>
              <a
                href={business.maps.google}
                className="link-underline mt-2 inline-flex w-fit items-center gap-2 font-semibold"
                data-event="directions_click"
                data-cta-location="visit_card"
                aria-label={`Open directions to ${fullAddress} in Google Maps`}
              >
                Open directions <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter-sand section-y" aria-labelledby="moved-heading">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionHeading
              eyebrow="Formerly in Avon Lake"
              title={
                <span id="moved-heading">
                  We’ve <em>moved</em>
                </span>
              }
            />
          </div>
          <div className="prose-bb md:col-span-6" data-reveal>
            <p>
              If you knew us from our Avon Lake studio on Avon Belden Road, welcome back. Bronze Beauties is now at 1083 E. Broad
              St. in Elyria. Same glow, new home, with easy parking right out front.
            </p>
            <p>
              We’re an easy drive from across Lorain County, including {nearby.slice(1, -1).join(', ')} and{' '}
              {nearby[nearby.length - 1]}.
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
