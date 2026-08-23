import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/** The TinyLearn app icon — the one brand mark, used everywhere. */
export function Logo({ className, href = '/' }: { className?: string; href?: string | null }) {
  const inner = (
    <span className={cn('group/logo inline-flex items-center gap-2.5', className)}>
      <Image
        src="/brand/tinylearn-icon.png"
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        priority
        className="h-11 w-11 shrink-0 rounded-[14px] shadow-[0_8px_20px_rgba(96,32,20,0.24)] transition-transform duration-300 group-hover/logo:-rotate-6"
      />
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight">
        <span className="wordmark-tiny">Tiny</span>
        <span className="wordmark-learn">Learn</span>
      </span>
    </span>
  )

  if (!href) return inner

  return (
    <Link
      href={href}
      className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
      aria-label="TinyLearn — home"
    >
      {inner}
    </Link>
  )
}
