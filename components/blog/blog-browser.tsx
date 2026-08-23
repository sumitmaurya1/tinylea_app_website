'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { BlogCard } from './blog-card'
import { RevealGroup } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import type { Post } from '@/lib/blog'

/** Client-side tag filter + search over the pre-rendered post list. */
export function BlogBrowser({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [query, setQuery] = React.useState('')
  const [tag, setTag] = React.useState<string | null>(null)

  // Deep-link support: /blog?q=phonics
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) setQuery(q)
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      if (tag && !p.tags.includes(tag)) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [posts, query, tag])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="relative mx-auto w-full max-w-lg">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--ink-soft)]"
          />
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="glass h-14 w-full rounded-full pl-14 pr-12 text-base text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <ul className="flex flex-wrap justify-center gap-2" aria-label="Filter by topic">
          <li>
            <FilterChip active={tag === null} onClick={() => setTag(null)}>
              All
            </FilterChip>
          </li>
          {tags.map((t) => (
            <li key={t}>
              <FilterChip active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                {t}
              </FilterChip>
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="mt-8 text-center text-sm text-[var(--ink-soft)]">
        {filtered.length === posts.length
          ? `${posts.length} articles`
          : `${filtered.length} of ${posts.length} articles`}
      </p>

      {filtered.length ? (
        <RevealGroup as="ul" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </RevealGroup>
      ) : (
        <p className="mt-16 text-center text-base text-[var(--ink-soft)]">
          Nothing matched “{query}”. Try a different word, or{' '}
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setTag(null)
            }}
            className="text-[var(--brand)] underline underline-offset-4"
          >
            clear the filters
          </button>
          .
        </p>
      )}
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40',
        active
          ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
          : 'border-[var(--hairline)] bg-[var(--glass-bg)] text-[var(--ink-soft)] backdrop-blur hover:border-[var(--brand)] hover:text-[var(--brand)]',
      )}
    >
      {children}
    </button>
  )
}
