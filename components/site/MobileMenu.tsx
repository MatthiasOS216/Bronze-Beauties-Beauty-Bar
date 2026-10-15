'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { business } from '@/content/business';
import { LashIcon } from './LashIcon';

// How long the eye takes to open (or blink shut) before the menu appears (or leaves).
const EYE_MS = 380;
// First-visit hint: appears shortly after load, fades on its own, and never returns once the menu has been opened.
const HINT_KEY = 'bb-lash-hint-seen';
const HINT_DELAY_MS = 1200;
const HINT_SHOW_MS = 7000;

type NavLink = { href: string; label: string };

export function MobileMenu({ nav, services, artists }: { nav: NavLink[]; services: NavLink[]; artists: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const after = useCallback((fn: () => void) => {
    window.clearTimeout(timer.current);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) fn();
    else timer.current = window.setTimeout(fn, EYE_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(HINT_KEY)) return;
    } catch {
      // Storage blocked (private mode): still show the hint, just don't remember it.
    }
    const show = window.setTimeout(() => setHint(true), HINT_DELAY_MS);
    const hide = window.setTimeout(() => setHint(false), HINT_DELAY_MS + HINT_SHOW_MS);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Tap: the eye opens, then the menu appears.
  const openMenu = () => {
    setHint(false);
    try {
      window.localStorage.setItem(HINT_KEY, '1');
    } catch {}
    setEyeOpen(true);
    after(() => setOpen(true));
  };
  // Tap again: the eye blinks shut, then the menu leaves.
  const closeMenu = () => {
    setEyeOpen(false);
    after(() => setOpen(false));
  };
  // Following a link or pressing Escape closes right away.
  const closeNow = () => {
    window.clearTimeout(timer.current);
    setEyeOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <div className="relative lg:hidden">
        <button
          type="button"
          className="lash-trigger inline-flex size-11 items-center justify-center rounded-full border border-bone/20 text-champagne"
          data-hint={hint ? 'true' : 'false'}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={openMenu}
        >
          <LashIcon open={eyeOpen} className="size-8" />
        </button>
        <p className="lash-hint" data-show={hint ? 'true' : 'false'} aria-hidden="true">
          Tap the eye for the menu
        </p>
      </div>

      <dialog
        ref={dialogRef}
        onClose={closeNow}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink text-bone backdrop:bg-ink/80"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <span className="font-display text-xl italic">Bronze Beauties</span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-bone/20 text-champagne"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <LashIcon open={eyeOpen} className="size-8" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x grid gap-10 pb-32 pt-6">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 font-display text-4xl" onClick={closeNow}>
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
                    <Link href={s.href} onClick={closeNow}>
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
                    <Link href={a.href} onClick={closeNow}>
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
