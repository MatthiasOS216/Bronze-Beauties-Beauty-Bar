'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const BronzeDrop = dynamic(() => import('./BronzeDrop'), { ssr: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/**
 * Tier A (desktop-class devices with a real GPU) gets live WebGL. Phones,
 * tablets, reduced-motion, Save-Data and software-rendered browsers keep the
 * CSS-rendered bronze orb, so mobile never pays for the 3D bundle.
 */
function canRunWebGL(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) return false;
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|software/i.test(renderer);
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  // Mount the 3D only after the page has loaded and gone idle, so it can never
  // compete with the headline (our LCP element) for the main thread.
  useEffect(() => {
    if (!canRunWebGL()) return;
    let cancelled = false;
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      idle(() => !cancelled && setEnabled(true));
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
    };
  }, []);

  // Scroll hand-off: the object recedes and dims as the hero scrolls away.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      gsap.registerPlugin(ScrollTrigger);
      if (!stage.current) return;
      ctx = gsap.context(() => {
        gsap.to(stage.current, {
          yPercent: 18,
          scale: 0.86,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={stage} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
      {/* CSS bronze orb: the poster for every tier and the final state when WebGL is off. */}
      <div
        className="absolute left-[78%] top-[22%] aspect-square w-[min(62vw,560px)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 md:left-[70%] md:top-1/2 md:w-[min(44vw,560px)]"
        style={{ opacity: ready ? 0 : 1 }}
      >
        <div
          className="size-full rounded-full motion-safe:animate-[orb-drift_12s_ease-in-out_infinite]"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, #fff1d1 0%, #e8cf95 9%, #b07a3e 26%, #6e4422 52%, #2a1a10 74%, #120d0a 100%)',
            boxShadow: '0 0 120px 10px rgb(176 122 62 / 0.25), inset -30px -40px 80px rgb(0 0 0 / 0.55)',
          }}
        />
        <div
          className="absolute inset-[-18%] rounded-full opacity-70"
          style={{
            background:
              'radial-gradient(circle, rgb(232 207 149 / 0.9) 0 1px, transparent 1.5px) 0 0 / 38px 38px, radial-gradient(circle, rgb(232 207 149 / 0.6) 0 1px, transparent 1.5px) 19px 23px / 53px 53px',
            maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          }}
        />
      </div>

      {enabled && (
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms]"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <BronzeDrop onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
