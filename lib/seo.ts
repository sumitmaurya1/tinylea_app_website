import type { Metadata } from 'next'
import { SITE_URL, site } from './site'

type MetaInput = {
  title: string
  description: string
  path: string
  /** Override the auto-generated OG image (e.g. a blog cover). */
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
  noIndex?: boolean
}

/** hreflang scaffolding — EN ships first, hi/mr slots are reserved. */
function languageAlternates(path: string) {
  const clean = path === '/' ? '' : path
  return {
    'en-US': `${SITE_URL}${clean || '/'}`,
    'en-IN': `${SITE_URL}${clean || '/'}`,
    'x-default': `${SITE_URL}${clean || '/'}`,
  }
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  authors,
  noIndex,
}: MetaInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const ogImage = image ?? `${url || SITE_URL}/opengraph-image`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url || SITE_URL,
      languages: languageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
        },
    openGraph: {
      type,
      url: url || SITE_URL,
      siteName: site.name,
      title,
      description,
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/* ------------------------------------------------------------------ */
/*  JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export const orgId = `${SITE_URL}/#organization`
export const websiteId = `${SITE_URL}/#website`
export const appId = `${SITE_URL}/#app`

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    email: site.contactEmail,
    description: site.description,
    // PLACEHOLDER: add real social profile URLs to site.socials to populate sameAs.
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    publisher: { '@id': orgId },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function softwareApplicationSchema() {
  return {
    '@type': 'SoftwareApplication',
    '@id': appId,
    name: site.name,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Education',
    operatingSystem: 'Android',
    url: SITE_URL,
    installUrl: site.playUrl,
    downloadUrl: site.playUrl,
    description: site.description,
    inLanguage: ['en', 'hi', 'mr'],
    author: { '@id': orgId },
    publisher: { '@id': orgId },
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: site.ageMin,
      suggestedMaxAge: site.ageMax,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: site.playUrl,
    },
    featureList: [
      'English alphabet A–Z with tap-to-hear',
      'Hindi Varnamala (हिन्दी वर्णमाला)',
      'Marathi Varnamala (मराठी वर्णमाला)',
      'Numbers 1–100 in English, Hindi and Marathi',
      'Colors, shapes, phonics, animals, fruits, opposites',
      'Story Mode',
      '100 game levels across 8 mini-games',
      'Stars, stickers, prizes, daily gift and day streaks',
      'Parent Zone behind a parent gate',
      'Works offline',
    ],
    // NOTE: aggregateRating is intentionally omitted — add it only when real
    // Play Store rating + review counts are available. Never fabricate.
  }
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path === '/' ? '' : t.path}`,
    })),
  }
}

export function blogPostingSchema(post: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  coverImage?: string
  tags?: string[]
}) {
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@id': orgId },
    image: [post.coverImage ? `${SITE_URL}${post.coverImage}` : `${url}/opengraph-image`],
    inLanguage: 'en',
    keywords: post.tags?.join(', '),
    isPartOf: { '@id': websiteId },
  }
}

export function howToSchema(input: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

/** Wrap any set of nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
