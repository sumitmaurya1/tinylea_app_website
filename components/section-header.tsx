import { cn } from '@/lib/utils'
import { Dot } from './accents'
import { Reveal } from './motion/reveal'

/**
 * Section title with the reference's confetti punctuation: two small dots
 * floating off the top-right of the heading.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'center',
  id,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  align?: 'center' | 'left'
  id?: string
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <div>
          <p className="eyebrow">{eyebrow}</p>
        </div>
      ) : null}

      <div className={cn('relative inline-block', eyebrow && 'mt-3')}>
        <h2 id={id} className="text-3xl text-balance sm:text-4xl">
          {title}
        </h2>
        <span aria-hidden="true" className="absolute -right-7 -top-2 hidden sm:block">
          <Dot tone="sun" size={13} ring={false} />
          <Dot tone="brand" size={9} className="ml-3 mt-1.5" />
        </span>
      </div>

      {lede ? (
        <p
          className={cn(
            'mt-5 text-base text-[var(--ink-soft)] text-pretty',
            align === 'center' && 'mx-auto max-w-2xl',
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  )
}
