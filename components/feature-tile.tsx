import type { LucideIcon } from 'lucide-react'
import { RevealItem } from './motion/reveal'
import { cn } from '@/lib/utils'

/** Pastel rotation so neighbouring tiles never share a tint. */
export const TILE_TONES = ['tile-tint', 'tile-mint', 'tile-sun', 'tile-blush', 'tile-sky'] as const

/**
 * The recurring "icon + title + blurb" block. One component so every page
 * gets the same colour-block treatment instead of a white card.
 */
export function FeatureTile({
  icon: Icon,
  title,
  blurb,
  index = 0,
  tone,
  className,
}: {
  icon: LucideIcon
  title: React.ReactNode
  blurb: React.ReactNode
  index?: number
  tone?: string
  className?: string
}) {
  return (
    <RevealItem as="li" className="h-full">
      <article
        className={cn(
          'tile group flex h-full items-start gap-4 p-6 sm:p-7',
          tone ?? TILE_TONES[index % TILE_TONES.length],
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:scale-110"
        >
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div>
          <h3 className="text-lg leading-snug">{title}</h3>
          <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{blurb}</p>
        </div>
      </article>
    </RevealItem>
  )
}

/**
 * The large tinted feature block used for section-width content — the
 * lavender panels in the reference layout.
 */
export function Panel({
  children,
  tone = 'bg-[var(--tint)]',
  className,
}: {
  children: React.ReactNode
  tone?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[36px] px-6 py-12 sm:px-10 lg:px-14',
        tone,
        className,
      )}
    >
      {children}
    </div>
  )
}
