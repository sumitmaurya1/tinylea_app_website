import { Lock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The 100-level adventure, abstracted: a winding path of level nodes where the
 * earned stars gate what comes next. Decorative — the copy beside it carries
 * the meaning, so the whole SVG is aria-hidden.
 */
const NODES = [
  { n: 1, stars: 3 },
  { n: 2, stars: 3 },
  { n: 3, stars: 2 },
  { n: 4, stars: 2 },
  { n: 5, stars: 1 },
  { n: 6, stars: 0 },
  { n: 7, stars: 0 },
]

export function LevelMapVisual({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)} aria-hidden="true">
      <svg viewBox="0 0 640 220" className="w-full">
        <path
          d="M40 170 C120 60, 200 250, 300 130 S470 40, 600 120"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.18"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="2 26"
        />
      </svg>

      <ol className="absolute inset-0 flex items-center justify-between px-2 sm:px-6">
        {NODES.map((node, i) => {
          const unlocked = node.stars > 0 || i === 0
          const offsets = ['translate-y-6', '-translate-y-8', 'translate-y-10', '-translate-y-4', 'translate-y-6', '-translate-y-10', 'translate-y-2']
          return (
            <li key={node.n} className={cn('flex flex-col items-center gap-2', offsets[i])}>
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-full font-display text-base font-bold shadow-soft sm:h-14 sm:w-14 sm:text-lg',
                  unlocked ? 'bg-[var(--sun)] text-[#2a2320]' : 'bg-[var(--surface)] text-[var(--ink-soft)]',
                )}
              >
                {unlocked ? node.n : <Lock className="h-5 w-5" />}
              </span>
              <span className="flex gap-0.5">
                {[0, 1, 2].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      'h-3.5 w-3.5',
                      s < node.stars ? 'fill-[var(--sun)] text-[var(--ink)]' : 'fill-transparent text-[var(--ink-soft)]/40',
                    )}
                    strokeWidth={2.2}
                  />
                ))}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
