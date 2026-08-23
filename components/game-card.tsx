import { GAME_ICONS } from '@/lib/icons'
import { RevealItem } from './motion/reveal'
import { cn } from '@/lib/utils'

const TILE_TONES = ['tile-tint', 'tile-mint', 'tile-sun', 'tile-blush'] as const

export function GameCard({
  game,
  index,
}: {
  game: { name: string; skill: string; blurb: string }
  index: number
}) {
  const Icon = GAME_ICONS[index % GAME_ICONS.length]

  return (
    <RevealItem as="li" className="h-full">
      <article className={cn('tile group flex h-full flex-col p-6', TILE_TONES[index % TILE_TONES.length])}>
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-[19px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:-rotate-6"
          >
            <Icon className="h-7 w-7" strokeWidth={2.2} />
          </span>
          <span className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--ink)]">
            {game.skill}
          </span>
        </div>
        <h3 className="mt-5 text-xl leading-snug">{game.name}</h3>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">{game.blurb}</p>
      </article>
    </RevealItem>
  )
}
