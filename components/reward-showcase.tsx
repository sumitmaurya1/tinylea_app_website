import { Gift, Flame, Sparkles, Star, Sticker, Trophy } from 'lucide-react'
import { rewards } from '@/lib/site'
import { RevealGroup, RevealItem } from './motion/reveal'
import { cn } from '@/lib/utils'

const ICONS = [Star, Sticker, Trophy, Gift, Flame, Sparkles]
const TILE_TONES = ['tile-sun', 'tile-blush', 'tile-tint', 'tile-mint', 'tile-sky', 'tile-tint'] as const

export function RewardShowcase() {
  return (
    <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rewards.map((r, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <RevealItem as="li" key={r.title} className="h-full">
            <article className={cn('tile group flex h-full items-start gap-4 p-6', TILE_TONES[i % TILE_TONES.length])}>
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:scale-110"
              >
                <Icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-lg leading-snug">{r.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{r.blurb}</p>
              </div>
            </article>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
