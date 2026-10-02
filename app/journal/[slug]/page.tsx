import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPost, posts } from '@/content/journal';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/blocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema } from '@/lib/schema';
import { ArrowUpRight } from '@/components/ui/icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/journal/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/journal/${p.slug}`,
      type: 'article',
      publishedTime: p.published,
      modifiedTime: p.modified,
    },
  };
}

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default async function PostPage({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const path = `/journal/${p.slug}`;
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Journal', path: '/journal' },
          { name: p.title, path },
        ]}
        eyebrow={`Updated ${dateFmt.format(new Date(p.modified))} · ${p.readingMinutes} min read`}
        title={p.title}
        lede={p.description}
      />
      <article className="chapter-light section-y">
        <div className="container-x">
          <div className="prose-bb mx-auto text-lg">
            {p.sections.map((s, i) => (
              <section key={i} className="mb-10">
                {s.heading && <h2 className="mb-4 font-display text-3xl font-medium">{s.heading}</h2>}
                {s.paragraphs.map((para) => (
                  <p key={para.slice(0, 30)}>{para}</p>
                ))}
              </section>
            ))}
            <p>
              <Link href="/organic-spray-tanning/prep-and-aftercare" className="link-underline font-semibold">
                Read the complete spray tan prep & aftercare guide
              </Link>
            </p>
            {p.sources && (
              <aside className="mt-14 border-t border-ink/15 pt-8 text-base" aria-labelledby="sources">
                <h2 id="sources" className="eyebrow mb-4">
                  Sources
                </h2>
                <ul className="grid gap-2">
                  {p.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} className="link-underline inline-flex items-center gap-1" rel="noopener">
                        {s.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </article>
      <FinalCta service="organic-spray-tanning" artist="samantha-camel" />
      <JsonLd data={articleSchema({ title: p.title, description: p.description, path, published: p.published, modified: p.modified })} />
    </>
  );
}
