'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { business } from '@/content/business';

type NavLink = { href: string; label: string };

export function MobileMenu({ nav, services, artists }: { nav: NavLink[]; services: NavLink[]; artists: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-bone/20 text-bone lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink text-bone backdrop:bg-ink/80"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <span className="font-display text-xl italic">Bronze Beauties</span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-bone/20"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x grid gap-10 pb-32 pt-6">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 font-display text-4xl" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow mb-3 text-champagne">Services</p>
              <ul className="grid gap-2 text-bone/80">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} onClick={() => setOpen(false)}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3 text-champagne">Artists</p>
              <ul className="grid gap-2 text-bone/80">
                {artists.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} onClick={() => setOpen(false)}>
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-3">
            <Link href="/book" className="btn btn-primary w-full" data-event="book_cta_click" data-cta-location="mobile_menu">
              Book an appointment
            </Link>
            <a href={`tel:${business.phone.tel}`} className="btn btn-ghost w-full" data-event="phone_click" data-cta-location="mobile_menu">
              Call {business.phone.display}
            </a>
          </div>
        </nav>
      </dialog>
    </>
  );
}
