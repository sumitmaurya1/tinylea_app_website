import Image from 'next/image'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Official "Get it on Google Play" badge.
 * The asset in /public/google-play-badge.png is Google's own generic English
 * badge (646x250, includes the required clear space). Swap it for a localized
 * badge from https://play.google.com/intl/en_us/badges/ if you ship other locales.
 * Google's brand rules: do not recolor, rotate, or add effects to the badge.
 */
export function PlayBadge({
  className,
  width = 200,
  label = 'Get TinyLearn on Google Play',
}: {
  className?: string
  width?: number
  label?: string
}) {
  const height = Math.round((width / 646) * 250)
  return (
    <a
      href={site.playUrl}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className={cn(
        'inline-block rounded-[14px] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40',
        className,
      )}
    >
      <Image
        src="/google-play-badge.png"
        alt="Get it on Google Play"
        width={width}
        height={height}
        priority
        unoptimized
        /* No width class: `w-full` stretches to the container and `w-auto`
           falls back to the 646px intrinsic width — both ignore `width`.
           Leaving it unset lets the width attribute size the badge. */
        className="h-auto max-w-full select-none"
      />
    </a>
  )
}

/** Inline Google Play glyph for buttons that use our own styling. */
export function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5 fill-current', className)}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  )
}
