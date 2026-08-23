'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { MascotSvg } from '@/components/three/mascot-svg'
import { Parallax } from '@/components/motion/parallax'
import { PlayGlyph } from '@/components/play-badge'
import { ScriptWord, Dot } from '@/components/accents'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'

const EASE = [0.22, 1, 0.36, 1] as const

/** Confetti punctuation — position, tone, size, ring/solid. Decorative only. */
const CONFETTI = [
  { pos: 'left-[6%] top-[18%]', tone: 'blush', size: 22, ring: true },
  { pos: 'left-[15%] top-[54%]', tone: 'sun', size: 12, ring: false },
  { pos: 'right-[7%] top-[13%]', tone: 'brand', size: 20, ring: true },
  { pos: 'right-[17%] top-[47%]', tone: 'sky', size: 13, ring: false },
  { pos: 'left-[30%] bottom-[12%]', tone: 'sun', size: 15, ring: true },
  { pos: 'right-[28%] bottom-[16%]', tone: 'mint', size: 11, ring: false },
] as const

/** Letter chips that fill the right-hand blob — the three scripts the app teaches. */
const CHIPS = [
  { ch: 'A', lang: 'en', cls: 'bg-[var(--sun)] -rotate-6' },
  { ch: 'अ', lang: 'hi', cls: 'bg-[var(--surface)] rotate-3' },
  { ch: '१', lang: 'mr', cls: 'bg-[var(--blush)] rotate-12' },
] as const

export function Hero() {
  const reduced = useReducedMotion()

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease: EASE, delay },
        }

  return (
    <section
      className="relative overflow-hidden pb-6 pt-8 sm:pt-12 lg:pb-14"
      aria-labelledby="hero-heading"
    >
      {/* confetti */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {CONFETTI.map((c) => (
          <Dot
            key={c.pos}
            tone={c.tone}
            size={c.size}
            ring={c.ring}
            className={`absolute ${c.pos} motion-safe:animate-twinkle`}
          />
        ))}
      </div>

      <div className="container relative">
        {/* ---------- Flanking blobs ---------- */}
        <Parallax
          speed={0.12}
          className="pointer-events-none absolute left-0 top-[42%] hidden w-[190px] -translate-y-1/2 lg:block xl:w-[220px]"
        >
          <div className="relative aspect-square rounded-full bg-[var(--tint)]">
            <div className="absolute inset-x-3 bottom-0 top-2 motion-safe:animate-bob">
              <MascotSvg animated={false} idSuffix="hero-lg" className="h-full w-full" title="" />
            </div>
            <span
              aria-hidden="true"
              className="absolute -right-1 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-[var(--surface)] font-display text-lg font-bold shadow-soft"
            >
              ABC
            </span>
          </div>
        </Parallax>

        <Parallax
          speed={0.2}
          className="pointer-events-none absolute right-0 top-[40%] hidden w-[190px] -translate-y-1/2 lg:block xl:w-[220px]"
        >
          <div className="relative grid aspect-square place-items-center rounded-full bg-[var(--mint-soft)]">
            <ul className="flex items-center -space-x-3">
              {CHIPS.map((c) => (
                <li
                  key={c.ch}
                  lang={c.lang}
                  className={`grid h-[3.75rem] w-[3.75rem] place-items-center rounded-[20px] font-display text-2xl font-bold text-[var(--ink)] shadow-soft motion-safe:animate-drift ${c.cls}`}
                >
                  {c.ch}
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="absolute -left-2 bottom-6 grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand)] font-display text-lg font-bold text-white shadow-soft"
            >
              123
            </span>
          </div>
        </Parallax>

        {/* ---------- Headline stack ---------- */}
        <div className="relative z-10 mx-auto max-w-[46rem] text-center">
          <motion.h1
            {...fade(0)}
            id="hero-heading"
            className="text-[2.6rem] leading-[1.05] text-balance sm:text-[3.4rem] lg:text-[4.1rem]"
          >
            Happy <ScriptWord tone="sun">learning</ScriptWord>
            <br />
            and <ScriptWord tone="brand">playtime</ScriptWord>
            <br />
            for every little one
          </motion.h1>

          <motion.p
            {...fade(0.1)}
            className="mx-auto mt-7 max-w-[34rem] text-base text-[var(--ink-soft)] text-pretty"
          >
            ABCs, 123s, colors, shapes and 100+ learning games — in English, Hindi and Marathi.
            Built for small hands and short attention spans, ages {site.ageRange}.
          </motion.p>

          <motion.div {...fade(0.18)} className="mt-9 flex flex-col items-center gap-4">
            <Button asChild size="xl">
              <a href={site.playUrl} target="_blank" rel="noopener">
                <PlayGlyph className="h-5 w-5" />
                Get it on Google Play
              </a>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link href="#learn">
                See what&rsquo;s inside
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            {...fade(0.26)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]"
          >
            <span>Free</span>
            <span aria-hidden="true" className="text-[var(--brand)]">&bull;</span>
            <span>Works offline</span>
            <span aria-hidden="true" className="text-[var(--brand)]">&bull;</span>
            <span>Made for families</span>
          </motion.p>
        </div>

        {/* ---------- Mobile blob row ---------- */}
        <div className="mt-10 flex items-center justify-center gap-4 lg:hidden">
          <div className="relative h-28 w-28 shrink-0 rounded-full bg-[var(--tint)]">
            <div className="absolute inset-x-2 bottom-0 top-1">
              <MascotSvg animated={false} idSuffix="hero-sm" className="h-full w-full" title="" />
            </div>
          </div>
          <ul aria-hidden="true" className="flex items-center -space-x-2">
            {CHIPS.map((c) => (
              <li
                key={c.ch}
                lang={c.lang}
                className={`grid h-14 w-14 place-items-center rounded-[18px] font-display text-xl font-bold text-[var(--ink)] shadow-soft ${c.cls}`}
              >
                {c.ch}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
