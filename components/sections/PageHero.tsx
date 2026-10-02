import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { Breadcrumbs, type Crumb } from '@/components/seo/Breadcrumbs';

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  image?: Photo;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="chapter-dark grain relative overflow-hidden pt-28 md:pt-36">
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(176 122 62 / 0.45), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-12 pb-16 md:grid-cols-12 md:items-end md:pb-24">
        <div className={image ? 'md:col-span-7' : 'md:col-span-10'}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="font-display text-headline font-medium tracking-[-0.02em]">{title}</h1>
          {lede && <p className="muted mt-6 max-w-2xl text-lg md:text-xl">{lede}</p>}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {image && (
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="photo object-cover"
                placeholder="blur"
              />
            </div>
            <div className="metal-rule absolute -bottom-4 left-6 right-[-1.5rem]" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
