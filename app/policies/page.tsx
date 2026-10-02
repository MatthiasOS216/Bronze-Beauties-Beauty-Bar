import type { Metadata } from 'next';
import { business } from '@/content/business';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/blocks';

export const metadata: Metadata = {
  title: 'Booking & Cancellation Policies',
  description:
    'Booking, cancellation, no-show, refund and child-free policies at Bronze Beauties Beauty Bar in Elyria, Ohio. Please read before booking.',
  alternates: { canonical: '/policies' },
};

const policies = [
  {
    title: 'Cancelling or rescheduling',
    points: [
      'Please give at least 48 hours’ notice to cancel or reschedule.',
      'Cancellations with less than 48 hours’ notice are charged a $30 late-cancellation fee. This covers the time your artist set aside for you.',
    ],
  },
  {
    title: 'No-shows',
    points: [
      'Missing an appointment without letting us know is charged 100% of the booked service.',
      'If the card on file can’t be charged, full payment is required before your next booking.',
    ],
  },
  {
    title: 'Repeated cancellations',
    points: ['Frequent last-minute cancellations are charged the standard fees. We aren’t able to waive them.'],
  },
  {
    title: 'Refunds',
    points: [
      'Services are non-refundable.',
      'If something isn’t right, tell us. For significant issues we’ll offer an alternative service of equal value.',
    ],
  },
  {
    title: 'A calm, child-free studio',
    points: [
      'To keep the studio relaxing for every client, please don’t bring children to your appointment.',
      'Childcare fell through? Let us know and we’ll gladly help you reschedule.',
      'Minors receiving services need a parent or guardian’s supervision and consent.',
    ],
  },
  {
    title: 'Independent artists',
    points: [
      'Jennifer (Nailed It By Jenny) and Jazzmine (Bare Beauti Avenue) book through their own booking pages, which may include a deposit or their own terms. Jennifer asks for a $10 deposit that goes toward your service.',
      'Your booking confirmation always shows the terms that apply to your appointment.',
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Policies', path: '/policies' }]}
        eyebrow="Before you book"
        title={
          <>
            Booking <em className="text-metal">policies</em>
          </>
        }
        lede="These policies protect your appointment time and keep the studio fair and relaxing for everyone. Thank you for helping us create a wonderful experience."
      />
      <section className="chapter-light section-y">
        <div className="container-x">
          <ol className="grid gap-px bg-ink/10 md:grid-cols-2">
            {policies.map((p, i) => (
              <li key={p.title} className="bg-bone p-8 md:p-10" data-reveal>
                <span className="font-display text-lg italic text-bronze-700">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 font-display text-3xl font-medium">{p.title}</h2>
                <ul className="mt-5 grid gap-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-taupe-600">
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-taupe-600">
            Questions about a policy? Call or text{' '}
            <a href={`tel:${business.phone.tel}`} className="link-underline" data-event="phone_click" data-cta-location="policies">
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
