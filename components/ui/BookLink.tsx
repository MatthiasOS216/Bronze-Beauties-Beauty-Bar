import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from './icons';

/** Every "Book" CTA routes through /book so the client always lands on the right artist's booking page. */
export function bookHref(opts: { service?: string; artist?: string } = {}) {
  const q = new URLSearchParams();
  if (opts.service) q.set('service', opts.service);
  if (opts.artist) q.set('artist', opts.artist);
  const s = q.toString();
  return s ? `/book?${s}` : '/book';
}

export function BookLink({
  service,
  artist,
  location,
  variant = 'primary',
  children = 'Book an appointment',
  className = '',
}: {
  service?: string;
  artist?: string;
  location: string;
  variant?: 'primary' | 'ghost' | 'dark';
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={bookHref({ service, artist })}
      className={`btn btn-${variant} ${className}`}
      data-event="book_cta_click"
      data-cta-location={location}
      data-service={service}
      data-provider={artist}
    >
      {children}
      <ArrowRight />
    </Link>
  );
}
