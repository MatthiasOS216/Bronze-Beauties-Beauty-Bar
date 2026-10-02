import Link from 'next/link';
import type { Metadata } from 'next';
import { fromPrice, services } from '@/content/services';
import { getProvider } from '@/content/providers';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta, SectionHeading, VisitStrip } from '@/components/sections/blocks';
import { ServiceIndex } from '@/components/sections/ServiceIndex';
import { BookLink } from '@/components/ui/BookLink';

export const metadata: Metadata = {
  title: 'Beauty Services in Elyria, OH',
  description:
    'Organic spray tans, lash extensions and lifts, facials and dermaplaning, waxing, nails and teeth whitening at Bronze Beauties Beauty Bar in Elyria, Ohio. See menus, prices and artists.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Services', path: '/services' }]}
        eyebrow="Services"
        title={
          <>
            Everything you need <em className="text-metal">to glow</em>
          </>
        }
        lede="Spray tans, lashes, skin, waxing, nails and smiles, each led by a specialist under one roof in Elyria."
        actions={<BookLink location="services_hero" />}
      />

      <section className="chapter-light section-y" aria-labelledby="all-services">
        <div className="container-x">
          <h2 id="all-services" className="sr-only">
            All services
          </h2>
          <ServiceIndex />
        </div>
      </section>

      <section className="chapter-sand section-y" aria-labelledby="who-does-what">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who does what"
            title={
              <span id="who-does-what">
                Find the right <em>artist</em>
              </span>
            }
            lede="Each artist books through her own booking page. Pick a service below and we’ll send you to the right one."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">Services, starting prices and artists</caption>
              <thead>
                <tr className="border-b border-ink text-xs uppercase tracking-[0.14em] text-taupe-600">
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Service
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    From
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Artist
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    <span className="sr-only">Book</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.slug} className="border-b border-ink/15">
                    <th scope="row" className="py-5 pr-6 font-display text-xl font-medium">
                      <Link href={`/${s.slug}`} className="hover:text-bronze-700">
                        {s.name}
                      </Link>
                    </th>
                    <td className="py-5 pr-6 tabular-nums">${fromPrice(s)}</td>
                    <td className="py-5 pr-6">
                      {s.providers.map((p, i) => {
                        const a = getProvider(p)!;
                        return (
                          <span key={p}>
                            {i > 0 && ', '}
                            <Link href={`/artists/${a.slug}`} className="link-underline">
                              {a.name}
                            </Link>
                          </span>
                        );
                      })}
                    </td>
                    <td className="py-5 text-right">
                      <Link
                        href={`/book?service=${s.slug}`}
                        className="text-sm font-semibold text-bronze-700 hover:underline"
                        data-event="book_cta_click"
                        data-cta-location="services_table"
                        data-service={s.slug}
                      >
                        Book <span className="sr-only">{s.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <VisitStrip />
      <FinalCta />
    </>
  );
}
