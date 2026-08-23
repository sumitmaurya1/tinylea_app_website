import Link from 'next/link'
import { ArrowRight, ShieldCheck, Star, WifiOff, FileDown } from 'lucide-react'

import { Hero } from '@/components/home/hero'
import { TrustStrip } from '@/components/home/trust-strip'
import { ProgramTiles } from '@/components/home/program-tiles'
import { SectionHeader } from '@/components/section-header'
import { BentoGrid } from '@/components/bento-grid'
import { LanguagePanel } from '@/components/language-panel'
import { GameCard } from '@/components/game-card'
import { LevelMapVisual } from '@/components/level-map-visual'
import { RewardShowcase } from '@/components/reward-showcase'
import { PhoneMockup } from '@/components/phone-mockup'
import { FAQAccordion } from '@/components/faq-accordion'
import { QuickFacts } from '@/components/quick-facts'
import { CTASection } from '@/components/cta-section'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'
import { JsonLd } from '@/components/json-ld'

import { buildMetadata, faqSchema, graph } from '@/lib/seo'
import { faqs, languages, learnCategories, miniGames, parentTrust, site } from '@/lib/site'
import { featuredScreens } from '@/lib/screens'

export const metadata = buildMetadata({
  title: 'TinyLearn — Kids Learning Games: ABC, 123, Hindi & Marathi',
  description:
    'TinyLearn is a free Android app for kids ages 2–8: alphabet, numbers 1–100, colors, shapes, phonics and 100+ learning games in English, Hindi and Marathi.',
  path: '/',
})

const TRUST_ICONS = [ShieldCheck, WifiOff, Star, FileDown]
const TRUST_TONES = ['tile-tint', 'tile-mint', 'tile-sun', 'tile-blush'] as const

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(faqSchema(faqs))} />

      {/* ---------------- A. Hero ---------------- */}
      <Hero />

      {/* ---------------- B. Trust strip ---------------- */}
      <TrustStrip />

      {/* ---------------- B2. The three programmes ---------------- */}
      <section className="section pb-0" aria-labelledby="programs-heading">
        <div className="container">
          <SectionHeader
            id="programs-heading"
            eyebrow="What's inside"
            title="programmes"
            lede="Three ways to play, one app — pick where your child starts."
          />
          <div className="mt-14 lg:mb-28">
            <ProgramTiles />
          </div>
        </div>
      </section>

      {/* ---------------- C. Learn the basics ---------------- */}
      <section id="learn" className="section" aria-labelledby="learn-heading">
        <div className="container">
          <SectionHeader
            id="learn-heading"
            eyebrow="Learn the basics"
            title="Everything a little learner starts with"
            lede="Eleven bite-sized topics, each built for small hands and short attention spans. Every letter, number and word is tap-to-hear, so kids learn how it actually sounds."
          />
          <BentoGrid items={learnCategories.slice(0, 10)} href="/features" className="mt-14" />
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild variant="secondary" size="lg">
              <Link href="/features">
                See all 11 learn topics
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- D. Languages spotlight ---------------- */}
      <section className="section pt-0" aria-labelledby="languages-heading">
        <div className="container">
          <SectionHeader
            id="languages-heading"
            eyebrow="The TinyLearn difference"
            title="Learn in 3 languages"
            lede="Most learning apps stop at English. TinyLearn teaches the Hindi Varnamala and the Marathi Varnamala alongside the English alphabet — and counts 1 to 100 in all three."
          />
          <RevealGroup as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
            {languages.map((l) => (
              <LanguagePanel key={l.key} language={l} />
            ))}
          </RevealGroup>
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild size="lg">
              <Link href="/languages">
                Explore Hindi &amp; Marathi learning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- E. Games showcase ---------------- */}
      <section className="section pt-0" aria-labelledby="games-heading">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-[var(--tint)] px-6 py-12 sm:px-10 lg:px-14">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
                <div>
                  <p className="eyebrow">The adventure</p>
                  <h2 id="games-heading" className="mt-3 text-3xl text-balance sm:text-4xl">
                    100 levels that grow with your child
                  </h2>
                  <p className="mt-5 text-base text-[var(--ink-soft)] text-pretty">
                    Earn 2 stars to unlock the next level. Difficulty scales up as your child gets
                    quicker, so level 60 feels as fair as level 6.
                  </p>
                  <div className="mt-8">
                    <Button asChild variant="outline" size="lg">
                      <Link href="/games">
                        See the 8 mini-games
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <Parallax speed={0.14}>
                  <LevelMapVisual />
                </Parallax>
              </div>
            </div>
          </Reveal>

          <RevealGroup as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {miniGames.map((g, i) => (
              <GameCard key={g.name} game={g} index={i} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- F. Rewards ---------------- */}
      <section className="section pt-0" aria-labelledby="rewards-heading">
        <div className="container">
          <SectionHeader
            id="rewards-heading"
            eyebrow="Little wins, big smiles"
            title="Motivation that keeps them coming back"
            lede="Stars for effort, stickers to collect, a daily spin-the-wheel gift and a streak that rewards showing up — plus a shareable “Star of the Day” card parents can send to grandparents."
          />
          <div className="mt-14">
            <RewardShowcase />
          </div>
        </div>
      </section>

      {/* ---------------- G. For parents ---------------- */}
      <section className="section pt-0" aria-labelledby="parents-heading">
        <div className="container">
          <SectionHeader
            id="parents-heading"
            eyebrow="For parents"
            title="Built to be handed over without worry"
            lede="TinyLearn keeps grown-up controls behind a parent gate, runs without a connection, and follows Google’s Designed for Families requirements for every ad it shows."
          />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2">
            {parentTrust.map((t, i) => {
              const Icon = TRUST_ICONS[i % TRUST_ICONS.length]
              return (
                <RevealItem as="li" key={t.title} className="h-full">
                  <article
                    className={`tile group flex h-full items-start gap-4 p-6 sm:p-7 ${TRUST_TONES[i % TRUST_TONES.length]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:scale-110"
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="text-lg leading-snug">{t.title}</h3>
                      <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{t.blurb}</p>
                    </div>
                  </article>
                </RevealItem>
              )
            })}
          </RevealGroup>
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild variant="secondary" size="lg">
              <Link href="/for-parents">
                Read the parent guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- H. Screenshots ---------------- */}
      <section className="section pt-0" aria-labelledby="screens-heading">
        <div className="container">
          <SectionHeader
            id="screens-heading"
            eyebrow="Inside the app"
            title="Big, friendly, and made to be tapped"
            lede="Chunky targets, thick outlines and one idea per screen — designed so a two-year-old can find their way without help."
          />
          <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {featuredScreens.map((screen, i) => (
              <Parallax
                key={screen.title}
                speed={i % 2 === 0 ? 0.16 : 0.28}
                className="w-[62%] shrink-0 snap-center sm:w-[42%] lg:w-full"
              >
                <PhoneMockup screen={screen} />
                <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  {screen.title}
                </p>
              </Parallax>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Quick facts (AEO) ---------------- */}
      <section className="section pt-0" aria-labelledby="facts-heading">
        <div className="container">
          <SectionHeader
            id="facts-heading"
            eyebrow="Quick facts"
            title="TinyLearn at a glance"
            lede="The short, factual version — handy for parents comparing apps, and for assistants answering questions about TinyLearn."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <QuickFacts />
          </Reveal>
        </div>
      </section>

      {/* ---------------- I. FAQ ---------------- */}
      <section id="faq" className="section pt-0" aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeader
            id="faq-heading"
            eyebrow="Questions"
            title="Frequently asked questions"
            lede={`Everything parents ask before installing ${site.name}.`}
          />
          <Reveal className="mt-12">
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- J. Final CTA ---------------- */}
      <CTASection />
    </>
  )
}
