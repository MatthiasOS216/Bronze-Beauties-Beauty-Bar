import type { Metadata } from 'next';
import { business } from '@/content/business';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How the Bronze Beauties Beauty Bar website handles your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Privacy', path: '/privacy' }]} eyebrow="Legal" title="Privacy policy" />
      <section className="chapter-light section-y">
        <div className="container-x prose-bb text-lg">
          <p>
            This website doesn’t ask you to create an account, and it doesn’t collect payment or booking details. When you
            book, you’re taken to your artist’s booking provider (Square or GlossGenius). That provider handles your
            appointment, contact details and any payment under its own privacy policy.
          </p>
          <h2 className="mt-10 font-display text-3xl">Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors use the site, such as which pages are viewed and which
            buttons are clicked, so we can improve it. Google Analytics uses cookies and collects information such as your
            approximate location, device and browser. We don’t use it to identify you personally. You can opt out with
            Google’s browser add-on or your browser’s privacy settings.
          </p>
          <h2 className="mt-10 font-display text-3xl">Contact</h2>
          <p>
            Questions about privacy? Email{' '}
            <a href={`mailto:${business.email}`} className="link-underline">
              {business.email}
            </a>{' '}
            or call {business.phone.display}.
          </p>
          <p className="text-sm text-taupe-600">Last updated October 2026.</p>
        </div>
      </section>
    </>
  );
}
