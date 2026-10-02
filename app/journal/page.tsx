import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '@/content/journal';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/blocks';
import { ArrowUpRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Journal: Beauty Tips & Guides',
  description: 'Spray tan tips, skincare advice and beauty guides from the artists at Bronze Beauties Beauty Bar in Elyria, Ohio.',
  alternates: { canonical: '/journal' },
};

const guides = [
  {
    href: '/organic-spray-tanning/prep-and-aftercare',
    title: 'Spray Tan Prep & Aftercare: The Complete Guide',
    description: 'Everything to do before and after your spray tan for an even, longer-lasting glow.',
    tag: 'Guide',
  },
];

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function JournalPage() {
  const items = [
    ...guides,
    ...posts.map((p) => ({
      href: `/journal/${p.slug}`,
      title: p.title,
      description: p.description,
      tag: `Updated ${dateFmt.format(new Date(p.modified))}`,
    })),
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Journal', path: '/journal' }]}
        eyebrow="Journal"
        title={
          <>
            Notes on <em className="text-metal">glowing</em>
          </>
        }
        lede="Practical guides and honest advice from our artists."
      />
      <section className="chapter-light section-y">
        <div className="container-x">
          <ul className="border-t border-ink/15">
            {items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="group grid gap-3 border-b border-ink/15 py-10 md:grid-cols-[10rem_1fr_auto] md:items-center md:gap-10">
                  <span className="eyebrow">{it.tag}</span>
                  <span>
                    <span className="block font-display text-title font-medium transition-transform duration-500 group-hover:translate-x-2">
                      {it.title}
                    </span>
                    <span className="mt-2 block text-taupe-600">{it.description}</span>
                  </span>
                  <span className="hidden size-11 items-center justify-center rounded-full border border-ink/20 md:inline-flex">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
