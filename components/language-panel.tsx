import { RevealItem } from './motion/reveal'
import { cn } from '@/lib/utils'

const SAMPLES: Record<string, string[]> = {
  english: ['A', 'B', 'C', 'D', 'E'],
  hindi: ['अ', 'आ', 'इ', 'ई', 'उ'],
  marathi: ['क', 'ख', 'ग', 'घ', 'ङ'],
}

const NUMBERS: Record<string, string[]> = {
  english: ['1', '2', '3'],
  hindi: ['१', '२', '३'],
  marathi: ['१', '२', '३'],
}

const TONES: Record<string, string> = {
  english: 'tile-tint',
  hindi: 'tile-sun',
  marathi: 'tile-mint',
}

export function LanguagePanel({
  language,
}: {
  language: { key: string; name: string; native: string; locale: string; blurb: string }
}) {
  const letters = SAMPLES[language.key] ?? []
  const numbers = NUMBERS[language.key] ?? []

  return (
    <RevealItem as="li" className="h-full">
      <article className={cn('tile group flex h-full flex-col p-7', TONES[language.key] ?? 'tile-tint')}>
        <p className="eyebrow">
          {language.locale === 'en' ? 'English' : language.locale === 'hi' ? 'Hindi' : 'Marathi'}
        </p>
        <h3 className="mt-3 text-2xl leading-snug">{language.name}</h3>
        <p lang={language.locale} className="mt-1 font-display text-xl font-bold text-[var(--brand)]">
          {language.native}
        </p>
        <p className="mt-4 flex-1 text-sm text-[var(--ink-soft)]">{language.blurb}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Sample letters in ${language.name}`}>
          {letters.map((ch, i) => (
            <li
              key={ch + i}
              lang={language.locale}
              className="grid h-12 w-12 place-items-center rounded-[16px] bg-[var(--surface)] font-display text-lg font-bold text-[var(--ink)] shadow-soft transition-transform duration-300 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              {ch}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
          Numbers 1–100 · <span lang={language.locale}>{numbers.join(' ')}</span> …
        </p>
      </article>
    </RevealItem>
  )
}
