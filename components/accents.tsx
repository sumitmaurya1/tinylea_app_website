import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ *
 * The hand-drawn accent kit: script words, felt-tip highlights, tilted
 * sticker tags, confetti dots and the circular arrow affordance.
 * ------------------------------------------------------------------ */

export type AccentTone = 'brand' | 'sun' | 'mint' | 'blush' | 'sky' | 'ink'

const TONE_TEXT: Record<AccentTone, string> = {
  // Display-size only, so the vivid icon red is safe here (>=3:1 large text).
  brand: 'text-[var(--brand-bright)]',
  sun: 'text-[#B07E00] dark:text-[var(--sun)]',
  mint: 'text-[#2E8F5F] dark:text-[var(--mint)]',
  blush: 'text-[#C4507F] dark:text-[var(--blush)]',
  sky: 'text-[#1D7FAE] dark:text-[var(--sky)]',
  ink: 'text-[var(--ink)]',
}

const TONE_FILL: Record<AccentTone, string> = {
  brand: 'var(--brand-bright)',
  sun: 'var(--sun)',
  mint: 'var(--mint)',
  blush: 'var(--blush)',
  sky: 'var(--sky)',
  ink: 'var(--ink)',
}

/**
 * A cursive word inside a headline, with a hand-drawn underline swoosh —
 * the signature move of the reference layout.
 */
export function ScriptWord({
  children,
  tone = 'brand',
  underline = true,
  className,
}: {
  children: React.ReactNode
  tone?: AccentTone
  underline?: boolean
  className?: string
}) {
  return (
    <span className={cn('relative inline-block whitespace-nowrap', TONE_TEXT[tone], className)}>
      <span className="script relative z-10 text-[1.12em]">{children}</span>
      {underline ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 14"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -bottom-[0.06em] h-[0.22em] w-full overflow-visible"
        >
          <path
            d="M3 9.4C34 4.2 70 2.4 104 3.2c31 .7 62 3.4 93 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={260}
            strokeDasharray={260}
            className="motion-safe:animate-draw-line"
          />
        </svg>
      ) : null}
    </span>
  )
}

/** Felt-tip highlighter swipe behind a phrase. */
export function Marker({
  children,
  tone = 'sun',
  tilt = -1.4,
  className,
}: {
  children: React.ReactNode
  tone?: AccentTone
  tilt?: number
  className?: string
}) {
  return (
    <span
      className={cn('marker', className)}
      style={
        {
          '--marker': TONE_FILL[tone],
          '--marker-tilt': `${tilt}deg`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  )
}

/** Tilted pill label that sits over a colour block. */
export function Sticker({
  children,
  tone,
  tilt = -6,
  className,
}: {
  children: React.ReactNode
  tone?: AccentTone
  tilt?: number
  className?: string
}) {
  return (
    <span
      className={cn('sticker', className)}
      style={
        {
          transform: `rotate(${tilt}deg)`,
          ...(tone ? { background: TONE_FILL[tone], color: tone === 'brand' ? '#fff' : '#2a2320' } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  )
}

/** Small ringed confetti dot. Purely decorative. */
export function Dot({
  tone = 'brand',
  size = 14,
  ring = true,
  className,
  style,
}: {
  tone?: AccentTone
  size?: number
  ring?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('block shrink-0 rounded-full', className)}
      style={{
        width: size,
        height: size,
        ...(ring
          ? { border: `${Math.max(3, size / 4)}px solid ${TONE_FILL[tone]}` }
          : { background: TONE_FILL[tone] }),
        ...style,
      }}
    />
  )
}

/** Circular arrow button in the corner of a tile. Decorative when the whole tile is the link. */
export function ArrowDot({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('arrow-dot', className)}>
      <ArrowUpRight className="h-6 w-6" strokeWidth={2.4} />
    </span>
  )
}
