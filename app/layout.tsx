import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Manrope } from 'next/font/google';
import './globals.css';

import { business, siteUrl } from '@/content/business';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ActionBar } from '@/components/site/ActionBar';
import { Analytics } from '@/components/site/Analytics';
import { RevealObserver } from '@/components/site/RevealObserver';
import { JsonLd } from '@/components/seo/JsonLd';
import { businessSchema, websiteSchema } from '@/lib/schema';

const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Spray Tans, Lashes & Facials in Elyria, OH`,
    template: `%s | ${business.shortName}`,
  },
  description:
    'Organic spray tans, lash extensions, facials, waxing, nails and teeth whitening at Bronze Beauties Beauty Bar, 1083 E. Broad St. in Elyria, Ohio. Book your glow online.',
  applicationName: business.name,
  openGraph: {
    type: 'website',
    siteName: business.name,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0e0b09',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-US" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
