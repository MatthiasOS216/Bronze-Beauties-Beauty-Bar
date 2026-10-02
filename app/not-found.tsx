import Link from 'next/link';
import { services } from '@/content/services';
import { BookLink } from '@/components/ui/BookLink';

export default function NotFound() {
  return (
    <section className="chapter-dark grain flex min-h-[80vh] items-center pb-20 pt-32">
      <div className="container-x">
        <p className="eyebrow mb-5">Page not found</p>
        <h1 className="font-display text-display font-medium tracking-[-0.03em]">
          This glow has <em className="text-metal">faded.</em>
        </h1>
        <p className="muted mt-6 max-w-xl text-lg">
          The page you’re looking for has moved or no longer exists. Here’s where to find what you need:
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <BookLink location="404" />
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-bone/80">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="link-underline">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
