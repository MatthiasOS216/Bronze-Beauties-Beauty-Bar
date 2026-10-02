import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/content/images';
import { services } from '@/content/services';
import { providers } from '@/content/providers';
import { MobileMenu } from './MobileMenu';

export const primaryNav = [
  { href: '/services', label: 'Services' },
  { href: '/artists', label: 'Artists' },
  { href: '/organic-spray-tanning/prep-and-aftercare', label: 'Spray Tan Guide' },
  { href: '/visit', label: 'Visit' },
  { href: '/about', label: 'About' },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-x flex h-20 items-center justify-between gap-6 md:h-24">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Bronze Beauties Beauty Bar, home">
          <Image src={brand.mark.src} alt="" priority className="size-11 md:size-12" sizes="48px" />
          <span className="hidden leading-none sm:block" aria-hidden="true">
            <span className="block font-display text-[1.35rem] tracking-[0.02em] text-bone">Bronze Beauties</span>
            <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-champagne">Beauty Bar</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.92rem] font-medium text-bone/85">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-champagne">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="btn btn-primary min-h-11 px-5 text-sm"
            data-event="book_cta_click"
            data-cta-location="header"
          >
            Book now
          </Link>
          <MobileMenu
            nav={primaryNav}
            services={services.map((s) => ({ href: `/${s.slug}`, label: s.shortName }))}
            artists={providers.map((p) => ({ href: `/artists/${p.slug}`, label: p.name }))}
          />
        </div>
      </div>
    </header>
  );
}
