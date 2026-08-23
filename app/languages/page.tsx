import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { Panel } from '@/components/feature-tile'
import { LanguagePanel } from '@/components/language-panel'
import { PhoneMockup } from '@/components/phone-mockup'
import { FAQAccordion } from '@/components/faq-accordion'
import { CTASection } from '@/components/cta-section'
import { PlayBadge } from '@/components/play-badge'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { breadcrumbSchema, buildMetadata, faqSchema, graph, howToSchema } from '@/lib/seo'
import { languages } from '@/lib/site'
import { screens } from '@/lib/screens'

export const metadata = buildMetadata({
  title: 'Learn Hindi & Marathi for Kids — Varnamala App',
  description:
    'TinyLearn teaches the Hindi Varnamala and Marathi Varnamala with tap-to-hear letters, plus counting 1–100 in English, Hindi and Marathi. Free on Android.',
  path: '/languages',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Languages', path: '/languages' },
]

const STEP_TONES = ['tile-tint', 'tile-sun', 'tile-mint', 'tile-blush', 'tile-sky'] as const

const langFaqs = [
  {
    q: 'Does TinyLearn teach the Hindi Varnamala?',
    a: 'Yes. TinyLearn has a dedicated Hindi Varnamala section covering the Hindi alphabet. Each letter is tap-to-hear, so your child hears how the अक्षर is actually pronounced rather than guessing from the written form.',
  },
  {
    q: 'Does TinyLearn teach Marathi?',
    a: 'Yes. TinyLearn includes the Marathi Varnamala with tap-to-hear letters, so Marathi-speaking families can start their child on their own script alongside English.',
  },
  {
    q: 'Can my child count to 100 in Hindi and Marathi?',
    a: 'Yes. The Numbers topic covers 1 to 100 in English, Hindi and Marathi. Your child sees the numeral and hears the number name spoken in whichever language you have selected.',
  },
  {
    q: 'Is TinyLearn good for kids who do not speak Hindi at home?',
    a: 'Yes. Because every letter is tap-to-hear and paired with a picture, a child with no Hindi at home can still learn the Varnamala. Nothing in the lesson assumes prior knowledge of the language.',
  },
]

const howTo = howToSchema({
  name: 'How to teach your child the Hindi Varnamala with TinyLearn',
  description:
    'A short routine for introducing the Hindi alphabet to a child aged 2–8 using the TinyLearn app.',
  steps: [
    { name: 'Install TinyLearn', text: 'Download TinyLearn free from Google Play on any Android phone or tablet.' },
    { name: 'Open Hindi Varnamala', text: 'From the learn screen, choose the Hindi Varnamala topic to see the Hindi alphabet laid out one letter per card.' },
    { name: 'Tap to hear each letter', text: 'Tap a letter so your child hears it pronounced. Repeat it aloud together — say it, then let them say it back.' },
    { name: 'Do five letters a day', text: 'Stay with the same five letters for a few days rather than racing through the whole alphabet.' },
    { name: 'Practise in the games', text: 'Move to the mini-games so your child uses the letters they just learned instead of only watching them.' },
  ],
})

export default function LanguagesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(langFaqs), howTo)} />

      <PageHero
        eyebrow="Languages"
        title="Learn in English, Hindi & Marathi"
        highlight="Hindi & Marathi"
        definition="TinyLearn teaches the Hindi Varnamala (हिन्दी वर्णमाला) and the Marathi Varnamala (मराठी वर्णमाला) alongside the English alphabet, and counts numbers 1–100 in all three languages. Every letter and number is tap-to-hear."
        trail={trail}
        screen={screens[1]}
      >
        <PlayBadge width={190} />
      </PageHero>

      <section className="section" aria-labelledby="three-heading">
        <div className="container">
          <SectionHeader
            id="three-heading"
            eyebrow="Three scripts"
            title="One app, three alphabets"
            lede="Switch language without leaving the lesson. The layout, the audio and the games all follow."
          />
          <RevealGroup as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
            {languages.map((l) => (
              <LanguagePanel key={l.key} language={l} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="why-heading">
        <div className="container">
          <Reveal>
            <Panel>
              <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="prose-measure">
                  <p className="eyebrow">Why it matters</p>
                  <h2 id="why-heading" className="mt-3 text-3xl text-balance sm:text-4xl">
                    A second script is easiest before six
                  </h2>
                  <p className="mt-5 text-base text-[var(--ink-soft)] text-pretty">
                    Plenty of Indian families speak Hindi or Marathi at home but hand their child an
                    English-only learning app, because that is mostly what exists. The result is a
                    five-year-old who can read “CAT” but not “कमल”.
                  </p>
                  <p className="mt-4 text-base text-[var(--ink-soft)] text-pretty">
                    TinyLearn treats all three scripts as first-class. The Varnamala is not a bonus
                    tab — it is a full topic with its own audio, its own cards and its own place in
                    the games. Learning both at once is normal for a young child; it only feels hard
                    to adults.
                  </p>
                  <ul className="mt-7 space-y-3 text-sm text-[var(--ink-soft)]">
                    {[
                      'Hindi and Marathi letters get the same tap-to-hear treatment as English',
                      'Numbers 1–100 spoken in all three languages',
                      'No reading required to navigate — a pre-reader can drive it alone',
                      'Works offline, so learning does not stop when the signal does',
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mx-auto w-56 sm:w-64">
                  <PhoneMockup screen={screens[1]} />
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="howto-heading">
        <div className="container">
          <SectionHeader
            id="howto-heading"
            eyebrow="How to start"
            title="Teaching the Varnamala, step by step"
            lede="A five-step routine that works for a two-year-old and still works at seven."
          />
          <RevealGroup as="ol" className="mx-auto mt-14 grid max-w-4xl gap-4">
            {howTo.step.map((s, i) => (
              <RevealItem as="li" key={s.name}>
                <article className={`tile flex items-start gap-5 p-6 ${STEP_TONES[i % STEP_TONES.length]}`}>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--surface)] font-display text-base font-bold text-[var(--ink)] shadow-soft"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug">{s.name}</h3>
                    <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{s.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="lang-faq-heading">
        <div className="container">
          <SectionHeader
            id="lang-faq-heading"
            eyebrow="Questions"
            title="Hindi & Marathi, answered"
          />
          <Reveal className="mt-12">
            <FAQAccordion items={langFaqs} />
          </Reveal>
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild variant="secondary" size="lg">
              <Link href="/blog/learn-hindi-for-kids-varnamala-guide">
                Read the parent’s guide to the Hindi Varnamala
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Start the Varnamala today"
        lede="Free on Google Play, works offline, and ready in English, Hindi and Marathi."
      />
    </>
  )
}
