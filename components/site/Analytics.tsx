'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function loadGa() {
  if (!GA_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function track(event: string, params: Record<string, string | undefined> = {}) {
  window.gtag?.('event', event, params);
  if (process.env.NODE_ENV !== 'production') console.debug('[analytics]', event, params);
}

/**
 * Loads GA4 after the page is idle (never blocks rendering) and turns any
 * element with data-event="…" into a tracked interaction. data-* attributes
 * become event params (data-cta-location → cta_location).
 */
export function Analytics() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const handle = idle(() => loadGa());

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-event]');
      if (!el) return;
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k === 'event' || v === undefined) continue;
        params[k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = v;
      }
      track(el.dataset.event!, params);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      if (window.cancelIdleCallback && typeof handle === 'number') window.cancelIdleCallback(handle);
    };
  }, []);
  return null;
}
