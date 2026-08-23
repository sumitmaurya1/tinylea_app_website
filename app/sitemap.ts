import type { MetadataRoute } from 'next'

// Required by output: 'export' — emitted as a file at build time.
export const dynamic = 'force-static'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

/** Static routes, most important first. Legal pages are indexed but low value. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/features', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/languages', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/games', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/for-parents', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/download', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [
    ...ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...posts,
  ]
}
