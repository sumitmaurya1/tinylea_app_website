import { ExternalLink, FileDown, Lock, ShieldCheck, WifiOff } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { Panel, TILE_TONES } from '@/components/feature-tile'
import { FAQAccordion } from '@/components/faq-accordion'
import { QuickFacts } from '@/components/quick-facts'
import { CTASection } from '@/components/cta-section'
import { PlayBadge } from '@/components/play-badge'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { screens } from '@/lib/screens'
import { breadcrumbSchema, buildMetadata, faqSchema, graph } from '@/lib/seo'
import { faqs, site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'For Parents — Safety, Parent Gate & Offline Use',
  description:
    'How TinyLearn keeps things safe: a Parent Zone behind a parent gate, offline play, kid-safe ads under Google’s Families policy, and free printable worksheets.',
  path: '/for-parents',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'For Parents', path: '/for-parents' },
]

const PILLARS = [
  {
    icon: Lock,
    title: 'Parent Zone behind a parent gate',
    body: 'Anything a child should not reach on their own — settings, external links, the grown-up side of the app — sits inside the Parent Zone. Getting in means solving a short math challenge, the standard gate a preschooler cannot pass by tapping randomly.',
  },
  {
    icon: WifiOff,
    title: 'Works offline',
    body: 'Lessons and games run with no connection at all. Load it once and it works on a flight, in a car, at a grandparent’s house with bad signal — anywhere you would rather not be troubleshooting Wi-Fi with a restless four-year-old.',
  },
  {
    icon: ShieldCheck,
    title: 'Free, with kid-safe ads',
    body: 'TinyLearn is free to download and play. It is supported by ads that follow Google’s Families ad policy and the Designed for Families requirements, and every ad carries a visible “Ad” badge so it is never mistaken for part of the game.',
  },
  {
    icon: FileDown,
    title: 'Printable worksheets',
    body: 'Not everything should happen on a screen. Free printable PDF worksheets — ABC, numbers, shapes and more — are available at tinylearnprintables.com to take the same lessons onto paper.',
  },
]

const parentFaqs = [
  ...faqs,
  {
    q: 'What is a parent gate?',
    a: 'A parent gate is a short challenge only an adult can solve — in TinyLearn, a small math problem. It sits in front of the Parent Zone so a young child cannot reach settings or leave the app on their own.',
  },
  {
    q: 'Does TinyLearn have in-app purchases?',
    a: 'TinyLearn is free to download and free to play. It is supported by ads that follow Google’s Families ad policy rather than by charging for content.',
  },
  {
    q: 'Where can I get TinyLearn worksheets?',
    a: 'Free printable PDF worksheets covering the alphabet, numbers, shapes and more are available at tinylearnprintables.com. They pair with the same topics your child sees in the app.',
  },
]

export default function ForParentsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(parentFaqs))} />

      <PageHero
        eyebrow="For parents"
        title="What you are actually handing over"
        highlight="actually"
        definition="TinyLearn is a free Android app for kids ages 2–8. A Parent Zone sits behind a parent gate, the app works fully offline, and every ad follows Google’s Designed for Families requirements."
        trail={trail}
        screen={screens[6]}
      >
        <PlayBadge width={190} />
      </PageHero>

      <section className="section" aria-labelledby="pillars-heading">
        <div className="container">
          <SectionHeader
            id="pillars-heading"
            eyebrow="The short version"
            title="Four things worth knowing before you install"
          />
          <RevealGroup as="ul" className="mt-14 grid gap-4 lg:grid-cols-2">
            {PILLARS.map((p, i) => (
              <RevealItem as="li" key={p.title} className="h-full">
                <article className={`tile group flex h-full flex-col p-7 ${TILE_TONES[i % TILE_TONES.length]}`}>
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 place-items-center rounded-[19px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:scale-110"
                  >
                    <p.icon className="h-7 w-7" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-xl leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{p.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="printables-heading">
        <div className="container">
          <Reveal>
            <Panel className="text-center">
              <p className="eyebrow">Off the screen</p>
              <h2 id="printables-heading" className="mx-auto mt-3 max-w-2xl text-3xl text-balance sm:text-4xl">
                Free printable worksheets
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-[var(--ink-soft)] text-pretty">
                Tracing sheets, counting pages, shape hunts and colouring — PDFs you can print and
                hand over with a crayon, covering the same topics your child sees in the app.
              </p>
              <div className="mt-9">
                <Button asChild size="lg">
                  <a href={site.printablesUrl} target="_blank" rel="noopener">
                    Browse the worksheets
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="facts-heading">
        <div className="container">
          <SectionHeader id="facts-heading" eyebrow="Quick facts" title="TinyLearn at a glance" />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <QuickFacts id="parent-quick-facts" />
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="parent-faq-heading">
        <div className="container">
          <SectionHeader
            id="parent-faq-heading"
            eyebrow="Questions"
            title="Parent questions, answered"
          />
          <Reveal className="mt-12">
            <FAQAccordion items={parentFaqs} />
          </Reveal>
        </div>
      </section>

      <CTASection title="Hand it over with confidence" />
    </>
  )
}
