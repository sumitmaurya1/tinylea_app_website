import Image from 'next/image'
import { cn } from '@/lib/utils'

export type Screen = {
  /** Path under /public/screenshots. Sources are 285×640. */
  src: string
  alt: string
  title: string
}

/**
 * A real in-app screenshot in a device frame. The captures already include the
 * status bar and Dynamic Island, so the frame adds only the bezel — drawing our
 * own notch on top would double it up.
 *
 * The aspect ratio is fixed to the source (285/640), so nothing shifts while
 * the image loads.
 */
export function PhoneMockup({
  screen,
  className,
  priority,
  sizes = '(max-width: 640px) 62vw, (max-width: 1024px) 42vw, 260px',
}: {
  screen: Screen
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn('relative select-none', className)}>
      <div className="relative aspect-[285/640] w-full overflow-hidden rounded-[2.2rem] border-[7px] border-[var(--ink)] bg-[var(--surface)] shadow-[0_28px_60px_rgba(96,32,20,0.28)]">
        <Image
          src={screen.src}
          alt={screen.alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </div>
  )
}
