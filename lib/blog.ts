import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { slugify } from './utils'

export type PostFrontmatter = {
  title: string
  description: string
  slug: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
}

export type Post = PostFrontmatter & {
  content: string
  readingMinutes: number
  headings: { depth: 2 | 3; text: string; id: string }[]
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/** Pull H2/H3 out of raw MDX for the sticky table of contents. */
function extractHeadings(source: string): Post['headings'] {
  const out: Post['headings'] = []
  let inFence = false
  for (const line of source.split('\n')) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const text = m[2].replace(/[*_`]/g, '')
    out.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) })
  }
  return out
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  return {
    ...fm,
    slug: fm.slug ?? slug,
    tags: fm.tags ?? [],
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    headings: extractHeadings(content),
  }
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPost)
    .filter((p): p is Post => Boolean(p))
    // Two posts published the same day would otherwise fall back to readdir
    // order, which is filesystem-dependent — the featured post could differ
    // between a local build and the server. Break the tie on slug.
    .sort((a, b) => +new Date(b.date) - +new Date(a.date) || a.slug.localeCompare(b.slug))
}

export function getAllTags(): string[] {
  const set = new Set<string>()
  for (const p of getAllPosts()) p.tags.forEach((t) => set.add(t))
  return [...set].sort()
}

/** Related = most shared tags, then most recent. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return all.slice(0, limit)
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || +new Date(b.p.date) - +new Date(a.p.date))
    .slice(0, limit)
    .map((x) => x.p)
}
