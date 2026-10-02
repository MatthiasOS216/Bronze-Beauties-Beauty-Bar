import Link from 'next/link';
import { fromPrice, services } from '@/content/services';
import { getProvider } from '@/content/providers';
import { ArrowUpRight } from '@/components/ui/icons';
import { HoverPreview } from './HoverPreview';

/** Editorial service list. On desktop, hovering a row floats a photo of real work beside the cursor. */
export function ServiceIndex({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <HoverPreview>
      <ul className="border-t border-ink/15">
        {services.map((s, i) => (
          <li key={s.slug} data-reveal style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
            <Link
              href={`/${s.slug}`}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-ink/15 py-7 transition-colors hover:bg-ink/[0.03] md:grid-cols-[3.5rem_1fr_auto_auto] md:py-9"
              data-preview={s.hero.src.src}
              data-preview-alt={s.hero.alt}
            >
              <span className="hidden font-display text-lg italic text-bronze-700 md:block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <H className="font-display text-title font-medium tracking-[-0.01em] transition-transform duration-500 ease-[var(--ease-glow)] group-hover:translate-x-2">
                  {s.name}
                </H>
                <span className="mt-1 block text-[0.95rem] text-taupe-600">{s.teaser}</span>
              </span>
              <span className="hidden text-right text-sm text-taupe-600 md:block">
                <span className="block font-semibold text-ink tabular-nums">from ${fromPrice(s)}</span>
                with {s.providers.map((p) => getProvider(p)?.firstName).join(' & ')}
              </span>
              <span className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-bronze-700 group-hover:bg-bronze-700 group-hover:text-bone">
                <ArrowUpRight />
              </span>
              <span className="col-span-2 text-sm text-taupe-600 md:hidden">
                from <span className="font-semibold text-ink">${fromPrice(s)}</span> · with{' '}
                {s.providers.map((p) => getProvider(p)?.firstName).join(' & ')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </HoverPreview>
  );
}
