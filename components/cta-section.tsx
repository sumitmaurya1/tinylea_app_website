import { Check } from 'lucide-react'
import { MascotSvg } from './three/mascot-svg'
import { PlayBadge } from './play-badge'
import { Marker, Dot } from './accents'
import { Reveal } from './motion/reveal'
import { site } from '@/lib/site'

const POINTS = [
  'Free to download — no subscription',
  'Every lesson works with no connection',
  'English, Hindi and Marathi in one app',
]

export function CTASection({
  title = 'Start your child’s learning adventure',
  lede = 'Free to download, works offline, and ready in English, Hindi and Marathi.',
}: {
  title?: string
  lede?: string
}) {
  return (
    <section className="section pt-0" aria-labelledby="cta-heading">
      <div className="container">
        <Reveal>
          <div className="relative rounded-[36px] bg-[var(--tint)] px-6 pb-10 pt-16 sm:px-10 sm:pb-12 sm:pt-20 lg:px-14">
            {/* mascot peeking over the top edge, like the kid in the reference */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-14 left-1/2 hidden w-32 -translate-x-1/2 sm:block lg:left-[22%]"
            >
              <MascotSvg animated={false} title="" idSuffix="cta" className="h-full w-full" />
            </div>

            <Dot tone="sun" size={18} className="absolute right-[8%] top-[14%]" />
            <Dot tone="brand" size={12} ring={false} className="absolute left-[6%] bottom-[16%]" />

            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              {/* Marker-highlighted headline stack */}
              <div>
                <h2 id="cta-heading" className="sr-only">
                  {title}
                </h2>
                <p
                  aria-hidden="true"
                  className="flex flex-col items-start gap-3 font-display text-[1.9rem] font-bold leading-[1.25] sm:text-[2.4rem]"
                >
                  <Marker tone="sky" tilt={-2}>
                    grab TinyLearn
                  </Marker>
                  <Marker tone="blush" tilt={1.6} className="ml-3">
                    totally free
                  </Marker>
                  <Marker tone="sun" tilt={-1.2} className="ml-1">
                    and start today!
                  </Marker>
                </p>
                <p className="mt-6 max-w-md text-base text-[var(--ink-soft)] text-pretty">{lede}</p>
              </div>

              {/* Download card */}
              <div className="rounded-[28px] bg-[var(--surface)] p-7 shadow-glass sm:p-8">
                <p className="eyebrow">{site.tagline}</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug">
                  Ready in about a minute
                </p>
                <ul className="mt-5 space-y-3">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-[var(--ink-soft)]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--mint-soft)] text-[#2E8F5F] dark:text-[var(--mint)]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <PlayBadge width={196} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
