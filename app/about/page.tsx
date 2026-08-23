import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { Panel, TILE_TONES } from '@/components/feature-tile'
import { MascotSvg } from '@/components/three/mascot-svg'
import { CTASection } from '@/components/cta-section'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'About TinyLearn — Our Mission & the Buddy',
  description:
    'Why TinyLearn exists: a free, offline-friendly learning app for kids ages 2–8 that treats Hindi and Marathi as first-class alongside English.',
  path: '/about',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const PRINCIPLES = [
  { title: 'A pre-reader should be able to drive it alone', body: 'Nothing important is hidden behind text. Big targets, thick outlines, one idea per screen, audio on every tap.' },
  { title: 'Three languages, not one plus two extras', body: 'The Hindi and Marathi Varnamala get the same cards, the same audio and the same place in the games as the English alphabet.' },
  { title: 'Free should mean free', body: 'No paywall in front of the alphabet. The app is supported by ads that follow Google’s Families policy, and every ad is badged.' },
  { title: 'Learning should survive a bad signal', body: 'Everything works offline. A car ride is one of the best times a child has to learn, and it is usually the worst time for Wi-Fi.' },
  { title: 'Progress should be visible', body: 'Stars, stickers and a streak — small, honest signals that a child is getting somewhere, without loot boxes or pressure to spend.' },
  { title: 'Screens are not the whole answer', body: 'The printable worksheets exist because a crayon and a sheet of paper still teach things a tablet cannot.' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="About"
        title="Play · Learn · Grow"
        highlight="Learn"
        highlightTone="sun"
        definition="TinyLearn is a free Android learning app for children aged 2 to 8, built around one idea: a child who cannot read yet should still be able to learn on their own — in English, Hindi or Marathi."
        trail={trail}
      />

      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <Reveal>
            <Panel>
              <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="prose-measure">
                  <p className="eyebrow">The story</p>
                  <h2 id="story-heading" className="mt-3 text-3xl text-balance sm:text-4xl">
                    Built for the kids the app stores kept missing
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)] text-pretty">
                    There is no shortage of ABC apps. There is a real shortage of ones that also
                    teach the हिन्दी वर्णमाला properly, count to a hundred in मराठी, and still work
                    when the signal drops on the way to a grandparent’s house.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] text-pretty">
                    TinyLearn started from that gap. The result is eleven learn topics, a hundred
                    game levels, and a deliberate choice to keep the whole thing free — because the
                    alphabet is a strange thing to put behind a paywall.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] text-pretty">
                    The look comes from the same place: soft lavender blocks, flat pastel fills and
                    big rounded shapes, sized so a two-year-old’s thumb lands where they meant it to.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-[280px]">
                  <MascotSvg />
                  <p className="mt-6 text-center text-sm text-[var(--ink-soft)]">
                    <strong className="text-[var(--ink)]">The TinyLearn buddy</strong> — the star on
                    the antenna spins a little faster every time your child gets one right.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="principles-heading">
        <div className="container">
          <SectionHeader
            id="principles-heading"
            eyebrow="How we build it"
            title="Six rules we do not bend"
          />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <RevealItem as="li" key={p.title} className="h-full">
                <article className={`tile flex h-full flex-col p-7 ${TILE_TONES[i % TILE_TONES.length]}`}>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] font-display text-base font-bold text-[var(--brand)] shadow-soft"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2.5 text-sm text-[var(--ink-soft)]">{p.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 text-center" delay={0.1}>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection title={`Try ${site.name} with your child`} />
    </>
  )
}
