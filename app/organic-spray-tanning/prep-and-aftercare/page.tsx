import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/blocks';
import { BookLink } from '@/components/ui/BookLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, faqSchema } from '@/lib/schema';

const path = '/organic-spray-tanning/prep-and-aftercare';
const title = 'Spray Tan Prep & Aftercare: The Complete Guide';
const description =
  'How to prepare for a spray tan, what to wear, when to shower and how to make your glow last. The complete prep and aftercare guide from Bronze Beauties in Elyria, Ohio.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: 'article' },
};

type QA = { q: string; a: string[] };
type Chapter = { id: string; title: string; items: QA[] };

const before: Chapter[] = [
  {
    id: 'before-clothing',
    title: 'What to wear',
    items: [
      {
        q: 'What should I wear to my spray tan?',
        a: [
          'Bring loose-fitting, dark clothes to change into right after your tan, plus flip-flops.',
          'Skip denim, leggings and tight bras or underwear. Anything snug can rub the solution before it develops.',
        ],
      },
      {
        q: 'Should I wear a bra?',
        a: ['Most people tan without one. If you prefer to wear one, choose a strapless bra or bandeau.'],
      },
    ],
  },
  {
    id: 'before-exfoliating',
    title: 'Exfoliating',
    items: [
      {
        q: 'Should I exfoliate before a spray tan?',
        a: [
          'Yes. Exfoliate at least 4 hours before your appointment so your pores have time to close, which helps prevent dots and discoloration.',
          'Exfoliating removes dead skin so the solution develops evenly and lasts longer.',
        ],
      },
      {
        q: 'What’s the best pre-tan exfoliator?',
        a: [
          'We don’t push a particular brand. Just choose one that’s oil-free and made with natural, gentle ingredients. Whether you use a mitt or a scrub depends on your skin.',
        ],
      },
    ],
  },
  {
    id: 'before-showering',
    title: 'Showering & shaving',
    items: [
      {
        q: 'When should I shower and shave?',
        a: [
          'Shower, shave and exfoliate at least 4 hours before your appointment.',
          'If you have to shower closer to your appointment, finish with a cool rinse to help close your pores.',
        ],
      },
    ],
  },
  {
    id: 'before-moisturizing',
    title: 'Skin & products',
    items: [
      {
        q: 'Should I moisturize before my tan?',
        a: ['No. Arrive with clean, bare skin: no lotions, oils, deodorant, perfume or makeup.'],
      },
    ],
  },
  {
    id: 'before-other',
    title: 'Other beauty services',
    items: [
      {
        q: 'When should I book waxing, nails and facials?',
        a: [
          'Finish all other beauty services first: nails, waxing, facials and massages.',
          'Wax at least 24 hours before your tan. Wax residue can stay on the skin and keep the solution from absorbing evenly.',
        ],
      },
    ],
  },
];

const after: Chapter[] = [
  {
    id: 'after-clothing',
    title: 'What to wear after',
    items: [
      {
        q: 'What should I wear after my spray tan?',
        a: [
          'Wear loose clothing until after your first rinse. A long T-shirt dress is ideal.',
          'No denim, bras or leggings, and no socks. Sandals or flip-flops are the best shoes.',
        ],
      },
    ],
  },
  {
    id: 'after-showering',
    title: 'Your first rinse',
    items: [
      {
        q: 'When can I shower after a spray tan?',
        a: [
          'Stay away from all moisture until your first rinse: no showers, workouts, cleaning, lotions or liquid foundation on the skin.',
          'Take your first rinse at least 4 hours after your tan, and no more than 24 hours after.',
        ],
      },
      {
        q: 'How should I wash after a spray tan?',
        a: [
          'Be gentle. Use warm water, a natural body wash and the palms of your hands to rinse away the surface bronzer. Some color in the water is normal.',
          'Avoid harsh scrubbing, hot water and bar soap. Pat yourself dry; don’t rub.',
        ],
      },
      {
        q: 'When can I wash my hair?',
        a: ['Keep your hair away from water for 8 hours so the solution can fully develop.'],
      },
    ],
  },
  {
    id: 'after-moisturizing',
    title: 'Moisturizing',
    items: [
      {
        q: 'What lotion should I use after a spray tan?',
        a: [
          'Moisturize morning and night with an oil-free moisturizer. Hydrated skin holds color longer and fades more evenly.',
          'From day 3 onward you can use a tan extender as your moisturizer. Ask us about the one we carry.',
        ],
      },
      {
        q: 'What should I avoid?',
        a: ['Choose lotions that are as natural as possible, with no mineral oil.'],
      },
    ],
  },
  {
    id: 'after-other',
    title: 'Making it last',
    items: [
      {
        q: 'What strips a spray tan?',
        a: [
          'Swimming, long showers, baths, steam rooms and saunas.',
          'Chlorine, products with exfoliating acids, massages, fashion tape, bandages, and anything else that sticks to or scrubs the skin.',
          'Skin-to-skin contact while the tan develops. We know it’s hard, but no leg crossing!',
        ],
      },
      {
        q: 'When can I exfoliate again?',
        a: [
          'Not until you’re ready to say goodbye to your tan. When you are, use an exfoliating mitt to create a smooth canvas for your next one.',
        ],
      },
    ],
  },
];

function ChapterBlock({ c }: { c: Chapter }) {
  return (
    <section id={c.id} className="scroll-mt-28 border-t border-ink/15 py-10" aria-labelledby={`${c.id}-h`}>
      <h3 id={`${c.id}-h`} className="font-display text-3xl font-medium">
        {c.title}
      </h3>
      <div className="mt-6 grid gap-8">
        {c.items.map((qa) => (
          <div key={qa.q}>
            <h4 className="text-lg font-semibold">{qa.q}</h4>
            <ul className="mt-3 grid gap-2 text-taupe-600">
              {qa.a.map((t) => (
                <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  <span className="mt-3 h-px w-4 bg-bronze-700" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function GuidePage() {
  const all = [...before, ...after];
  const faqs = all.flatMap((c) => c.items.map((i) => ({ q: i.q, a: i.a.join(' ') })));
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Organic Spray Tanning', path: '/organic-spray-tanning' },
          { name: 'Prep & Aftercare', path },
        ]}
        eyebrow="The spray tan guide"
        title={
          <>
            Spray tan prep <em className="text-metal">& aftercare</em>
          </>
        }
        lede="Follow these steps and your tan will look better and last longer. Bookmark this page before your appointment."
        actions={<BookLink service="organic-spray-tanning" artist="samantha-camel" location="guide_hero">Book a spray tan</BookLink>}
      />

      <section className="chapter-light section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="Guide contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">In this guide</p>
              <p className="mb-2 font-semibold">Before your tan</p>
              <ul className="mb-6 grid gap-1 text-taupe-600">
                {before.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="hover:text-bronze-700">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mb-2 font-semibold">After your tan</p>
              <ul className="grid gap-1 text-taupe-600">
                {after.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="hover:text-bronze-700">
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="mb-14 grid gap-px bg-ink/10 sm:grid-cols-3">
              {[
                ['4 hrs', 'Shower, shave and exfoliate at least this long before'],
                ['4–24 hrs', 'Window for your first rinse after'],
                ['8 hrs', 'Keep your hair dry'],
              ].map(([k, v]) => (
                <div key={k} className="bg-bone p-6">
                  <p className="font-display text-4xl text-bronze-700">{k}</p>
                  <p className="mt-2 text-sm text-taupe-600">{v}</p>
                </div>
              ))}
            </div>

            <h2 className="eyebrow mb-2">Before your tan</h2>
            {before.map((c) => (
              <ChapterBlock key={c.id} c={c} />
            ))}
            <h2 className="eyebrow mb-2 mt-16">After your tan</h2>
            {after.map((c) => (
              <ChapterBlock key={c.id} c={c} />
            ))}

            <div className="mt-14 border-t border-ink/15 pt-10">
              <p className="text-lg">
                Still have a question?{' '}
                <Link href="/visit" className="link-underline">
                  Call or text the studio
                </Link>{' '}
                and Samantha will help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta service="organic-spray-tanning" artist="samantha-camel" />
      <JsonLd
        data={[
          articleSchema({ title, description, path, published: '2023-01-17', modified: '2026-10-02' }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
