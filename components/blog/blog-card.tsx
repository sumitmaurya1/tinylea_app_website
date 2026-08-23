import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { RevealItem } from '@/components/motion/reveal'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/blog'

export function BlogCard({
  post,
  featured,
}: {
  post: Post
  featured?: boolean
}) {
  // The featured card is a direct child of the page h1; the grid cards sit
  // under the "All articles" h2. Using h3 for both skipped a level.
  const Heading = featured ? 'h2' : 'h3'
  return (
    <RevealItem as="li" className="h-full">
      <GlassCard
        as="article"
        interactive
        className={`group relative flex h-full flex-col ${featured ? 'lg:flex-row' : ''}`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-[var(--brand-soft)] ${
            featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[46%]' : 'aspect-[16/9]'
          }`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes={featured ? '(max-width: 1024px) 100vw, 46vw' : '(max-width: 640px) 100vw, 33vw'}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <CoverFallback seed={post.slug} />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]"
              >
                {t}
              </span>
            ))}
          </div>

          <Heading className={`mt-4 tracking-tight ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            <Link
              href={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:rounded-glass focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-inset focus-visible:after:ring-[var(--focus)]/40"
            >
              {post.title}
            </Link>
          </Heading>

          <p className="mt-3 flex-1 text-sm text-[var(--ink-soft)]">{post.description}</p>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-soft)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" className="text-[var(--brand)]">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
          </p>
        </div>
      </GlassCard>
    </RevealItem>
  )
}

/** Deterministic on-brand cover when a post has no coverImage set. */
function CoverFallback({ seed }: { seed: string }) {
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0)
  const palettes = [
    { bg: 'var(--brand-soft)', a: 'var(--brand)', b: 'var(--sun)' },
    { bg: 'var(--blush-soft)', a: 'var(--blush)', b: 'var(--brand)' },
    { bg: 'var(--sun-soft)', a: 'var(--sun)', b: 'var(--blush)' },
  ]
  const p = palettes[hash % palettes.length]
  const glyphs = ['A', 'अ', '1', '★', '△', '♥', 'क', '७']

  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: p.bg }} aria-hidden="true">
      <div className="grid grid-cols-4 gap-2 opacity-90">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="grid h-10 w-10 place-items-center rounded-[13px] font-display text-base font-bold text-[var(--ink)] shadow-soft transition-transform duration-500 group-hover:-translate-y-0.5"
            style={{
              background: i % 3 === 0 ? p.a : i % 3 === 1 ? p.b : 'var(--surface)',
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {glyphs[(hash + i) % glyphs.length]}
          </span>
        ))}
      </div>
    </div>
  )
}
