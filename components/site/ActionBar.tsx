import Link from 'next/link';
import { business } from '@/content/business';
import { Calendar, Phone, Pin } from '@/components/ui/icons';

// Persistent mobile conversion bar: Book · Call · Directions.
export function ActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-[1fr_1fr_1.4fr] text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
        <li>
          <a
            href={`tel:${business.phone.tel}`}
            className="flex h-16 flex-col items-center justify-center gap-1 text-bone/90"
            data-event="phone_click"
            data-cta-location="action_bar"
          >
            <Phone />
            Call
          </a>
        </li>
        <li>
          <a
            href={business.maps.google}
            className="flex h-16 flex-col items-center justify-center gap-1 text-bone/90"
            data-event="directions_click"
            data-cta-location="action_bar"
          >
            <Pin />
            Directions
          </a>
        </li>
        <li className="p-2">
          <Link
            href="/book"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-champagne text-ink"
            data-event="book_cta_click"
            data-cta-location="action_bar"
          >
            <Calendar />
            Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}
