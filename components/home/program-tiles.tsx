import Link from 'next/link'
import { Sticker, ArrowDot } from '@/components/accents'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'

type Tile = {
  href: string
  title: string
  meta: string
  tone: string
  /** Letter/number cluster that fills the lower half of the block. */
  glyphs: { ch: string; lang?: string; cls: string }[]
  offset?: boolean
}

const TILES: Tile[] = [
  {
    href: '/features',
    title: 'Learn the basics',
    meta: '11 topics · tap-to-hear',
    tone: 'tile-tint',
    glyphs: [
      { ch: 'A', cls: 'bg-[var(--surface)] -rotate-6' },
      { ch: '12', cls: 'bg-[var(--sun)] rotate-3' },
      { ch: '△', cls: 'bg-[var(--blush)] rotate-12' },
    ],
  },
  {
    href: '/languages',
    title: 'Three languages',
    meta: 'English · हिन्दी · मराठी',
    tone: 'tile-sun',
    offset: true,
    glyphs: [
      { ch: 'अ', lang: 'hi', cls: 'bg-[var(--surface)] -rotate-6' },
      { ch: 'क', lang: 'mr', cls: 'bg-[var(--mint)] rotate-6' },
      { ch: '१', lang: 'hi', cls: 'bg-[var(--surface)] rotate-12' },
    ],
  },
  {
    href: '/games',
    title: '100 levels of play',
    meta: '8 mini-games · ages 2–8',
    tone: 'tile-brand',
    glyphs: [
      { ch: '★', cls: 'bg-[var(--sun)] -rotate-12' },
      { ch: '◆', cls: 'bg-[var(--surface)] rotate-6' },
      { ch: '➜', cls: 'bg-[var(--blush)] -rotate-3' },
    ],
  },
]

/**
 * The three colour blocks that carry the whole product: what kids learn,
 * which scripts, and the game loop. Each block is one link target.
 */
export function ProgramTiles() {
  return (
    <div className="relative">
      {/* Tilted stickers that straddle the first two blocks, like the reference. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1/3 top-0 z-20 hidden flex-col items-start gap-1.5 lg:flex"
      >
        <Sticker tone="blush" tilt={-4}>
          tap-to-hear
        </Sticker>
        <Sticker tilt={7} className="ml-10">
          no Wi-Fi needed
        </Sticker>
        <Sticker tone="mint" tilt={-3} className="ml-3">
          ages 2–8
        </Sticker>
      </div>

      <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((tile) => (
          <RevealItem as="li" key={tile.href}>
            {/* The stagger offset lives on this wrapper: RevealItem's transform is
                owned by framer-motion, and .tile's is owned by the hover lift. */}
            <div className={tile.offset ? 'h-full lg:translate-y-[6.75rem]' : 'h-full'}>
            <Link
              href={tile.href}
              className={`tile group flex h-full min-h-[19rem] flex-col justify-between p-7 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--focus)]/40 sm:min-h-[21rem] ${tile.tone}`}
            >
              <div>
                <h3 className="text-2xl leading-tight text-current">{tile.title}</h3>
                <p
                  className={
                    tile.tone === 'tile-brand'
                      ? 'mt-2 text-sm font-semibold text-white/90 dark:text-[#1d1512]/80'
                      : 'mt-2 text-sm font-semibold opacity-70'
                  }
                >
                  {tile.meta}
                </p>
              </div>

              <div className="flex items-end justify-between gap-4">
                <ArrowDot />
                <ul aria-hidden="true" className="flex items-center -space-x-2.5">
                  {tile.glyphs.map((g) => (
                    <li
                      key={g.ch}
                      lang={g.lang}
                      className={`grid h-16 w-16 place-items-center rounded-[22px] font-display text-2xl font-bold text-[var(--ink)] shadow-soft transition-transform duration-300 group-hover:-translate-y-1 ${g.cls}`}
                    >
                      {g.ch}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
