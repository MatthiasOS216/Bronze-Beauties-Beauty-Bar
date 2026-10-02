'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Desktop-only flourish: a photo follows the cursor while hovering a row that
 * has data-preview. Uses transforms only, and is skipped for touch and reduced motion.
 */
export function HoverPreview({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current;
    const pic = img.current;
    if (!el || !pic) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    let x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      raf = 0,
      active = false;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      pic.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -60%) rotate(${(tx - x) * 0.03}deg)`;
      raf = active ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>('[data-preview]');
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (row) {
        const src = row.dataset.preview!;
        if (pic.dataset.src !== src) {
          pic.dataset.src = src;
          pic.src = `/_next/image?url=${encodeURIComponent(src)}&w=640&q=70`;
        }
        pic.style.opacity = '1';
        if (!active) {
          active = true;
          x = tx;
          y = ty;
          raf = requestAnimationFrame(loop);
        }
      } else {
        pic.style.opacity = '0';
      }
    };
    const onLeave = () => {
      pic.style.opacity = '0';
      active = false;
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      {children}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-64 w-52 object-cover opacity-0 shadow-[0_24px_60px_-20px_rgb(14_11_9/0.45)] transition-opacity duration-300 md:block"
      />
    </div>
  );
}
