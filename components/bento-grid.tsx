import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORY_ICONS } from '@/lib/icons'
import { RevealGroup, RevealItem } from './motion/reveal'
import { cn } from '@/lib/utils'

export type BentoItem = {
  slug: string
  title: string
  native?: string
  detail: string
  icon: string
}

/** Colour blocks cycle so no two neighbours share a tint. */
const TILE_TONES = ['tile-tint', 'tile-sun', 'tile-mint', 'tile-blush', 'tile-sky'] as const

/**
 * Asymmetric bento: the first and fourth cards run wide on desktop, the rest
 * tile. `href` turns the whole card into one link target (single tab stop).
 */
export function BentoGrid({
  items,
  href,
  className,
}: {
  items: readonly BentoItem[]
  href?: string
  className?: string
}) {
  return (
    <RevealGroup as="ul" className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {items.map((item, i) => {
        const wide = i === 0 || i === 3
        const Icon = CATEGORY_ICONS[item.slug]

        const badge = (
          <span
            aria-hidden="true"
            className={cn(
              'grid shrink-0 place-items-center rounded-[20px] bg-[var(--surface)] font-display font-bold leading-none text-[var(--ink)] shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105',
              wide ? 'h-[4.5rem] w-[4.5rem] text-2xl' : 'h-16 w-16 text-xl',
            )}
            lang={item.native ? 'hi' : undefined}
          >
            {Icon ? (
              <Icon className={wide ? 'h-8 w-8' : 'h-7 w-7'} strokeWidth={2.2} />
            ) : (
              item.icon
            )}
          </span>
        )

        return (
          <RevealItem as="li" key={item.slug} className={cn(wide && 'sm:col-span-2')}>
            <div
              className={cn(
                'tile group relative flex h-full flex-col p-6 sm:p-7',
                TILE_TONES[i % TILE_TONES.length],
                wide && 'sm:flex-row sm:items-center sm:gap-6',
              )}
            >
              {href ? (
                <Link
                  href={href}
                  className="absolute inset-0 z-10 rounded-tile focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--focus)]/40"
                >
                  <span className="sr-only">{item.title}</span>
                </Link>
              ) : null}

              {badge}

              <div className={cn(!wide && 'mt-5')}>
                <h3 className="text-xl leading-snug">
                  {item.title}
                  {item.native ? (
                    <span
                      lang="hi"
                      className="ml-2 font-sans text-base font-semibold text-[var(--ink-soft)]"
                    >
                      {item.native}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.detail}</p>
              </div>

              {href ? (
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute right-5 top-5 h-5 w-5 text-[var(--ink)] opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                />
              ) : null}
            </div>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
