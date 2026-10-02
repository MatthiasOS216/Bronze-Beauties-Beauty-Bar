import Link from 'next/link';
import { business, formatTime, hours } from '@/content/business';
import { services } from '@/content/services';
import { providers } from '@/content/providers';
import { Facebook, Instagram } from '@/components/ui/icons';

export function Footer() {
  return (
    <footer className="chapter-dark grain border-t border-umber">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <p className="font-display text-4xl leading-none md:text-5xl">
            Glow Bold.
            <br />
            <em className="text-metal">Bronze</em> Beautiful.
          </p>
          <p className="muted mt-6 max-w-sm text-[0.95rem]">
            Organic spray tans, lashes, skincare, waxing, nails and teeth whitening in Elyria, Ohio, serving Lorain
            County since {business.founded}.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={business.social.instagram}
              className="inline-flex size-11 items-center justify-center rounded-full border border-bone/20 hover:border-champagne"
              aria-label="Bronze Beauties on Instagram"
              data-event="social_click"
              data-network="instagram"
            >
              <Instagram />
            </a>
            <a
              href={business.social.facebook}
              className="inline-flex size-11 items-center justify-center rounded-full border border-bone/20 hover:border-champagne"
              aria-label="Bronze Beauties on Facebook"
              data-event="social_click"
              data-network="facebook"
            >
              <Facebook />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow mb-4">Visit</h2>
          <address className="not-italic leading-relaxed">
            {business.name}
            <br />
            {business.address.street}
            <br />
            {business.address.city}, {business.address.region} {business.address.postalCode}
          </address>
          <p className="mt-4 grid gap-1">
            <a href={`tel:${business.phone.tel}`} className="link-underline w-fit" data-event="phone_click" data-cta-location="footer">
              {business.phone.display}
            </a>
            <a href={`mailto:${business.email}`} className="link-underline w-fit break-all">
              {business.email}
            </a>
            <a href={business.maps.google} className="link-underline w-fit" data-event="directions_click" data-cta-location="footer">
              Get directions
            </a>
          </p>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow mb-4">Hours</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.92rem] tabular-nums">
            {hours.map((h) => (
              <div key={h.day} className="contents">
                <dt className="muted">{h.day.slice(0, 3)}</dt>
                <dd>{h.open && h.close ? `${formatTime(h.open)}–${formatTime(h.close)}` : 'Closed'}</dd>
              </div>
            ))}
          </dl>
          <p className="muted mt-3 text-xs">By appointment. Artist hours vary.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-3">
          <div>
            <h2 className="eyebrow mb-4">Services</h2>
            <ul className="grid gap-2 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-champagne">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Studio</h2>
            <ul className="grid gap-2 text-[0.95rem]">
              {providers.map((p) => (
                <li key={p.slug}>
                  <Link href={`/artists/${p.slug}`} className="hover:text-champagne">
                    {p.firstName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/policies" className="hover:text-champagne">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-champagne">
                  Journal
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="metal-rule opacity-60" />
      <div className="container-x flex flex-col gap-3 py-8 text-xs text-taupe-300 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <p className="flex gap-6">
          <Link href="/privacy" className="hover:text-bone">
            Privacy
          </Link>
          <Link href="/accessibility" className="hover:text-bone">
            Accessibility
          </Link>
          <Link href="/policies" className="hover:text-bone">
            Booking policies
          </Link>
        </p>
      </div>
    </footer>
  );
}
