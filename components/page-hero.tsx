import { Breadcrumbs } from './breadcrumbs'
import { Dot, ScriptWord, type AccentTone } from './accents'
import { PhoneMockup, type Screen } from './phone-mockup'
import { Reveal } from './motion/reveal'
import { Parallax } from './motion/parallax'
import { cn } from '@/lib/utils'

/**
 * Inner-page hero. `definition` is the one-sentence, extractable answer that
 * leads the page — the block answer engines are most likely to quote.
 *
 * `highlight` picks one phrase out of `title` and sets it in the cursive
 * accent, the same move the home hero makes. It must appear in `title`
 * verbatim; if it doesn't, the title renders plain.
 *
 * Pass `screen` to stand an app mockup beside the copy. `screenSide` puts it
 * right (default) or left; on small screens it always stacks under the copy,
 * so the headline still leads.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  highlightTone = 'brand',
  definition,
  trail,
  screen,
  screenSide = 'right',
  children,
}: {
  eyebrow: string
  title: string
  highlight?: string
  highlightTone?: AccentTone
  definition: React.ReactNode
  trail: { name: string; path: string }[]
  screen?: Screen
  screenSide?: 'left' | 'right'
  children?: React.ReactNode
}) {
  const at = highlight ? title.indexOf(highlight) : -1
  const heading =
    at >= 0 && highlight ? (
      <>
        {title.slice(0, at)}
        <ScriptWord tone={highlightTone}>{highlight}</ScriptWord>
        {title.slice(at + highlight.length)}
      </>
    ) : (
      title
    )

  return (
    <section className="relative overflow-hidden pb-4 pt-10 sm:pt-14" aria-labelledby="page-heading">
      <Parallax speed={0.12} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-[var(--brand)]/10 blur-3xl" />
        <div className="absolute right-[-6%] top-[10%] h-64 w-64 rounded-full bg-[var(--blush)]/22 blur-3xl" />
      </Parallax>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        <Dot tone="sun" size={16} className="absolute right-[10%] top-[24%]" />
        <Dot tone="brand" size={11} ring={false} className="absolute right-[21%] top-[62%]" />
        <Dot tone="blush" size={19} className="absolute right-[4%] top-[68%]" />
      </div>

      <div className="container">
        <Breadcrumbs trail={trail} />

        <div
          className={cn(
            'gap-10 lg:grid lg:items-center lg:gap-16',
            screen &&
              (screenSide === 'left'
                ? 'lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]'
                : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)]'),
          )}
        >
          {screen ? (
            <Reveal
              className={cn(
                'mx-auto mt-12 w-52 sm:w-60 lg:mx-0 lg:mt-0 lg:w-full',
                // Copy leads on mobile whichever side the mockup takes on desktop.
                screenSide === 'left' ? 'order-last lg:order-first' : 'order-last',
              )}
              delay={0.08}
            >
              <Parallax speed={0.1}>
                <PhoneMockup screen={screen} sizes="(max-width: 1024px) 60vw, 260px" priority />
              </Parallax>
            </Reveal>
          ) : null}

          <Reveal className={cn(!screen && 'max-w-3xl')}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="page-heading" className="mt-4 text-4xl text-balance sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-6 text-lg text-[var(--ink-soft)] text-pretty">{definition}</p>
            {children ? <div className="mt-9">{children}</div> : null}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
