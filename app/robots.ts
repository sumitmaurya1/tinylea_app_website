import type { MetadataRoute } from 'next'

// Required by output: 'export' — emitted as a file at build time.
export const dynamic = 'force-static'
import { SITE_URL } from '@/lib/site'

/**
 * AI crawlers are allowed on purpose: the site is marketing copy plus a
 * factual FAQ, and being quotable by answer engines is the point. Flip an
 * agent to `disallow: '/'` if that ever changes.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
