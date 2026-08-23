import { ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { languages, stats } from '@/lib/site'

const CHIP_TONES = ['bg-[var(--sun)]', 'bg-[var(--blush)]', 'bg-[var(--mint)]']

/**
 * The lavender credential bar directly under the hero: who the app is for,
 * proof it is safe, and the four numbers that matter — all in one line on
 * desktop, stacked on mobile.
 */
export function TrustStrip() {
  return (
    <section className="pt-2" aria-label="Why parents trust TinyLearn">
      <div className="container">
        <Reveal>
          <div className="grid items-center gap-7 rounded-[32px] bg-[var(--tint)] px-6 py-7 sm:px-9 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
            {/* Language chip cluster */}
            <div className="flex items-center gap-4">
              <ul aria-hidden="true" className="flex items-center -space-x-3">
                {languages.map((l, i) => (
                  <li
                    key={l.key}
                    lang={l.locale}
                    className={`grid h-12 w-12 place-items-center rounded-full font-display text-lg font-bold text-[var(--ink)] ring-4 ring-[var(--tint)] ${CHIP_TONES[i % CHIP_TONES.length]}`}
                  >
                    {l.native.trim().charAt(0)}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-bold text-[var(--ink)]">
                3 languages
                <span className="block text-xs font-semibold text-[var(--ink-soft)]">
                  English · हिन्दी · मराठी
                </span>
              </p>
            </div>

            {/* Safety line */}
            <div className="flex items-start gap-3 lg:justify-center lg:text-left">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-[var(--brand)]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" strokeWidth={2.3} />
              </span>
              <p className="text-sm text-[var(--ink-soft)]">
                <span className="font-bold text-[var(--ink)]">Built for families</span> — parent gate
                on grown-up controls, works fully offline, no sign-up.
              </p>
            </div>

            {/* Numbers */}
            <ul className="flex flex-wrap items-center gap-2">
              {stats.slice(0, 3).map((s) => (
                <li
                  key={s.label}
                  className="rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-bold text-[var(--ink)]"
                >
                  {s.value}
                  {s.suffix} {s.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
