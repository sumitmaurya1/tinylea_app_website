'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Post } from '@/lib/blog'

/** Sticky desktop table of contents with scroll-spy. */
export function TableOfContents({ headings }: { headings: Post['headings'] }) {
  const [active, setActive] = React.useState<string>(headings[0]?.id ?? '')

  React.useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav aria-label="On this page" className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto lg:block">
      <p className="eyebrow">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-[var(--hairline)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors',
                h.depth === 3 && 'pl-7',
                active === h.id
                  ? 'border-[var(--brand)] font-medium text-[var(--brand)]'
                  : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
