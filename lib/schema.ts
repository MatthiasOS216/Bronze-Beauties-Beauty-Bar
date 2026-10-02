import { business, hours, siteUrl } from '@/content/business';
import type { Provider } from '@/content/providers';
import type { Faq, Service } from '@/content/services';

const BUSINESS_ID = `${siteUrl}/#business`;

type Json = Record<string, unknown>;

export function businessSchema(): Json {
  const openDays = hours.filter((h) => h.open && h.close);
  return {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'TanningSalon'],
    '@id': BUSINESS_ID,
    name: business.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: business.phone.tel,
    email: business.email,
    priceRange: '$$',
    foundingDate: String(business.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.maps.google,
    areaServed: [
      { '@type': 'City', name: 'Elyria' },
      { '@type': 'AdministrativeArea', name: 'Lorain County, Ohio' },
    ],
    openingHoursSpecification: openDays.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.schemaDay}`,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [business.social.instagram, business.social.facebook],
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: business.name,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function serviceSchema(service: Service, providerList: Provider[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${siteUrl}/${service.slug}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Elyria, Ohio' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} menu`,
      itemListElement: service.menu.flatMap((group) =>
        group.items.map((item) => ({
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'USD',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            provider: { '@type': 'Person', name: providerList.find((p) => p.slug === group.provider)?.name },
          },
        })),
      ),
    },
  };
}

export function personSchema(p: Provider): Json {
  const worksFor =
    p.relationship === 'owner'
      ? { '@id': BUSINESS_ID }
      : {
          '@type': 'Organization',
          name: p.businessName ?? p.name,
          url: p.booking.url.split('?')[0],
          location: { '@id': BUSINESS_ID },
        };
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/artists/${p.slug}#person`,
    name: p.name,
    jobTitle: p.role,
    url: `${siteUrl}/artists/${p.slug}`,
    image: `${siteUrl}${p.portrait.src.src}`,
    knowsAbout: p.specialties,
    worksFor,
    workLocation: { '@id': BUSINESS_ID },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; published: string; modified: string }): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    url: `${siteUrl}${a.path}`,
    datePublished: a.published,
    dateModified: a.modified,
    author: { '@type': 'Organization', name: business.name, url: siteUrl },
    publisher: { '@id': BUSINESS_ID },
    image: `${siteUrl}/opengraph-image`,
  };
}
