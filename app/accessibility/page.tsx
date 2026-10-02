import type { Metadata } from 'next';
import { business } from '@/content/business';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Our commitment to an accessible website for every visitor to Bronze Beauties Beauty Bar.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Accessibility', path: '/accessibility' }]} eyebrow="Accessibility" title="Accessibility statement" />
      <section className="chapter-light section-y">
        <div className="container-x prose-bb text-lg">
          <p>
            We want everyone to be able to learn about our services and book with ease. This website is built to meet the Web
            Content Accessibility Guidelines (WCAG) 2.2 at level AA. That includes keyboard navigation, visible focus states,
            descriptive image text, sufficient color contrast and support for reduced-motion settings.
          </p>
          <p>
            Booking happens on our artists’ booking providers (Square and GlossGenius), which maintain their own accessibility
            programs.
          </p>
          <p>
            If anything on this site is difficult to use, please tell us. Call or text {business.phone.display} or email{' '}
            <a href={`mailto:${business.email}`} className="link-underline">
              {business.email}
            </a>{' '}
            and we’ll help you book directly and fix the issue.
          </p>
        </div>
      </section>
    </>
  );
}
