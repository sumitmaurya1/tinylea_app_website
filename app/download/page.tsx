import { Check, Smartphone } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { Panel } from '@/components/feature-tile'
import { PhoneMockup } from '@/components/phone-mockup'
import { QuickFacts } from '@/components/quick-facts'
import { CTASection } from '@/components/cta-section'
import { PlayBadge } from '@/components/play-badge'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { breadcrumbSchema, buildMetadata, graph, softwareApplicationSchema } from '@/lib/seo'
import { learnCategories, miniGames, site } from '@/lib/site'
import { featuredScreens, screens } from '@/lib/screens'

export const metadata = buildMetadata({
  title: 'Download TinyLearn Free on Google Play',
  description:
    'Download TinyLearn free for Android: 11 learn topics, 100 game levels, English, Hindi and Marathi, works offline, kid-safe ads.',
  path: '/download',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Download', path: '/download' },
]

const INSIDE = [
  `${learnCategories.length} learn topics — alphabet, Varnamala, numbers, colors, shapes, phonics and more`,
  'Numbers 1–100 in English, हिंदी and मराठी',
  `100 game levels across ${miniGames.length} mini-games`,
  'Stars, stickers, prizes, a daily gift and day streaks',
  '“Star of the Day” shareable progress card',
  'Parent Zone protected by a parent gate',
  'Full offline play',
  'Free, with kid-safe ads under Google’s Families policy',
]

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), softwareApplicationSchema())} />

      <PageHero
        eyebrow="Download"
        title="Get TinyLearn free on Google Play"
        highlight="free"
        highlightTone="sun"
        definition={`TinyLearn is free to download for Android on Google Play. It works offline, is designed for kids ages ${site.ageRange}, and teaches in English, Hindi and Marathi.`}
        trail={trail}
      >
        <div className="flex flex-wrap items-center gap-5">
          <PlayBadge width={210} />
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Android · {site.packageName}
          </p>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="inside-heading">
        <div className="container">
          <Reveal>
            <Panel>
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="eyebrow">What’s inside</p>
                  <h2 id="inside-heading" className="mt-3 text-3xl text-balance sm:text-4xl">
                    Everything, in one free download
                  </h2>
                  <ul className="mt-8 space-y-3.5">
                    {INSIDE.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" aria-hidden="true" strokeWidth={2.6} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mx-auto w-56 sm:w-64">
                  <PhoneMockup screen={screens[3]} />
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="screens-heading">
        <div className="container">
          <SectionHeader
            id="screens-heading"
            eyebrow="Screens"
            title="A look inside before you install"
          />
          <RevealGroup as="ul" className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {featuredScreens.map((s) => (
              <RevealItem as="li" key={s.title} className="w-[62%] shrink-0 snap-center sm:w-[42%] lg:w-full">
                <PhoneMockup screen={s} />
                <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  {s.title}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="facts-heading">
        <div className="container">
          <SectionHeader id="facts-heading" eyebrow="Quick facts" title="The details" />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <QuickFacts id="download-quick-facts" />
          </Reveal>
        </div>
      </section>

      <CTASection title="Install TinyLearn" lede="Free on Google Play. No account needed to start." />
    </>
  )
}
