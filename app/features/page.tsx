import Link from 'next/link'
import { ArrowRight, Volume2 } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { Panel } from '@/components/feature-tile'
import { CATEGORY_ICONS } from '@/lib/icons'
import { PhoneMockup } from '@/components/phone-mockup'
import { CTASection } from '@/components/cta-section'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'
import { PlayBadge } from '@/components/play-badge'

import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { learnCategories, miniGames } from '@/lib/site'
import { screens } from '@/lib/screens'

const TILE_TONES = ['tile-tint', 'tile-sun', 'tile-mint', 'tile-blush'] as const

export const metadata = buildMetadata({
  title: 'Features — 11 Learn Topics for Ages 2–8',
  description:
    'Explore all 11 TinyLearn topics: alphabet, Hindi & Marathi Varnamala, numbers 1–100, colors, shapes, phonics, animals, fruits, opposites and Story Mode.',
  path: '/features',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
]

/** Extra teaching detail per category — expands the one-line facts from the app. */
const DETAIL: Record<string, string> = {
  alphabet:
    'Every letter from A to Z on its own card. Tap it to hear the letter name, the sound it makes and an example word your child already knows.',
  'hindi-varnamala':
    'The full हिन्दी वर्णमाला, one अक्षर at a time. Tap to hear each letter pronounced clearly — useful whether Hindi is spoken at home or brand new.',
  'marathi-varnamala':
    'The मराठी वर्णमाला with the same tap-to-hear treatment, so Marathi-speaking families can start their child on their own script early.',
  numbers:
    'Count from 1 to 100 in English, हिंदी and मराठी. Kids see the numeral, hear the number name, and can switch language without leaving the screen.',
  colors:
    'Colors anchored to things a toddler can point at — the Sky is blue, the Grass is green, the Sun is yellow — so the word sticks to something real.',
  shapes:
    'Circle, square, triangle and more, drawn in the app’s thick-outline style so the silhouette is unmistakable at a glance.',
  phonics:
    'Letter sounds rather than letter names — the step that turns “I know my ABCs” into actually sounding out a first word.',
  animals: 'Animals paired with their real sounds. Half vocabulary lesson, half the best part of the app.',
  fruits: 'Everyday fruit vocabulary with clear illustrations and audio for each one.',
  opposites: 'Opposites taught as pairs — big/small, hot/cold, up/down — because that is how the idea makes sense.',
  'story-mode': 'Short guided stories that put the letters, numbers and words back together into something worth listening to.',
}

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Features"
        title="Eleven topics, one very small learner"
        highlight="very small"
        definition="TinyLearn teaches 11 learn topics for kids ages 2–8: the English alphabet, the Hindi and Marathi Varnamala, numbers 1–100, colors, shapes, phonics, animals, fruits, opposites and Story Mode. Every lesson is tap-to-hear."
        trail={trail}
        screen={screens[0]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PlayBadge width={190} />
          <Button asChild variant="secondary" size="lg">
            <Link href="/games">
              See the games
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="topics-heading">
        <div className="container">
          <SectionHeader
            id="topics-heading"
            eyebrow="Learn topics"
            title="All 11, in detail"
            lede="Each topic is a self-contained screen — no menus to navigate, no reading required to get started."
          />

          <RevealGroup as="ul" className="mt-14 grid gap-4 lg:grid-cols-2">
            {learnCategories.map((raw, i) => {
              // Only some entries carry a Devanagari name; widen the union once here.
              const c = raw as typeof raw & { native?: string }
              const Icon = CATEGORY_ICONS[c.slug]
              return (
                <RevealItem as="li" key={c.slug} className="h-full">
                  <article
                    className={`tile flex h-full gap-5 p-6 sm:p-7 ${TILE_TONES[i % TILE_TONES.length]}`}
                  >
                    <span
                      aria-hidden="true"
                      lang={c.native ? 'hi' : undefined}
                      className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-[24px] bg-[var(--surface)] font-display text-2xl font-bold text-[var(--ink)] shadow-soft"
                    >
                      {Icon ? <Icon className="h-8 w-8 text-[var(--brand)]" strokeWidth={2.2} /> : c.icon}
                    </span>
                    <div>
                      <h3 className="text-xl leading-snug">
                        {c.title}
                        {c.native ? (
                          <span lang="hi" className="ml-2 font-sans text-base font-semibold text-[var(--ink-soft)]">
                            {c.native}
                          </span>
                        ) : null}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand)]">
                        {c.detail}
                      </p>
                      <p className="mt-3 text-sm text-[var(--ink-soft)]">{DETAIL[c.slug]}</p>
                    </div>
                  </article>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="tap-heading">
        <div className="container">
          <Reveal>
            <Panel>
              <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="eyebrow">
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                    Tap to hear
                  </p>
                  <h2 id="tap-heading" className="mt-3 text-3xl text-balance sm:text-4xl">
                    Sound is how pre-readers learn
                  </h2>
                  <p className="mt-5 text-base text-[var(--ink-soft)] text-pretty">
                    A child who cannot read yet can still learn from a screen — as long as the screen
                    talks back. Every letter, number and word in TinyLearn plays audio on tap, in the
                    language you have selected, so learning never depends on a grown-up sitting alongside.
                  </p>
                  <ul className="mt-7 space-y-3 text-sm text-[var(--ink-soft)]">
                    {[
                      'Letter names and letter sounds, kept separate',
                      'Number names in English, हिंदी and मराठी',
                      'Example words that anchor each letter to something familiar',
                      'Real animal sounds, not synthesised ones',
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mx-auto w-56 sm:w-64">
                  <PhoneMockup screen={screens[0]} />
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="practice-heading">
        <div className="container">
          <SectionHeader
            id="practice-heading"
            eyebrow="Then practise it"
            title="Lessons on one side, games on the other"
            lede={`What your child learns in the topics comes back as ${miniGames.length} mini-games across 100 levels — so the alphabet is not just watched, it is used.`}
          />
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild size="lg">
              <Link href="/games">
                Explore the 100-level adventure
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
