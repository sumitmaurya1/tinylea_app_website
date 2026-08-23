import Link from 'next/link'
import { ArrowRight, Star, Lock, TrendingUp } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { FeatureTile, Panel } from '@/components/feature-tile'
import { GameCard } from '@/components/game-card'
import { LevelMapVisual } from '@/components/level-map-visual'
import { RewardShowcase } from '@/components/reward-showcase'
import { CTASection } from '@/components/cta-section'
import { PlayBadge } from '@/components/play-badge'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup } from '@/components/motion/reveal'
import { Parallax } from '@/components/motion/parallax'
import { JsonLd } from '@/components/json-ld'

import { screens } from '@/lib/screens'
import { breadcrumbSchema, buildMetadata, faqSchema, graph } from '@/lib/seo'
import { miniGames } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Games — 100 Levels, 8 Mini-Games for Kids',
  description:
    'TinyLearn has 100 game levels across 8 mini-games. Earn 2 stars to unlock the next level, with difficulty that scales as your child gets quicker.',
  path: '/games',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
]

const gameFaqs = [
  {
    q: 'How many games does TinyLearn have?',
    a: '100 game levels across 8 mini-games; each level unlocks the next when your child earns 2 stars.',
  },
  {
    q: 'How does level unlocking work?',
    a: 'Every level is scored out of three stars. Earning at least two stars unlocks the next level, so children move on once they have genuinely got it rather than after a single lucky attempt.',
  },
  {
    q: 'Do the games get harder?',
    a: 'Yes. Difficulty scales up across the 100 levels — more items on screen, less time, trickier choices — so the challenge keeps pace with your child instead of flattening out.',
  },
  {
    q: 'Can a child replay a level?',
    a: 'Yes. Any unlocked level can be replayed as often as your child likes, which is the usual way a one-star attempt turns into three.',
  },
]

const PILLARS = [
  { icon: Star, title: 'Two stars to move on', blurb: 'Levels are scored out of three. Two stars unlocks the next one — enough to prove it stuck, not so much that it stalls.' },
  { icon: TrendingUp, title: 'Difficulty that scales', blurb: 'More on screen, less time, closer choices. Level 60 should feel about as fair as level 6 did.' },
  { icon: Lock, title: 'One path, no menus', blurb: 'A single winding map from 1 to 100. Nothing to configure, nothing to get lost in.' },
]

export default function GamesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), faqSchema(gameFaqs))} />

      <PageHero
        eyebrow="Games"
        title="100 levels that grow with your child"
        highlight="grow"
        definition="TinyLearn has 100 game levels built from 8 mini-games. Each level is scored out of three stars, and earning at least 2 stars unlocks the next one. Difficulty scales up as your child gets faster."
        trail={trail}
        screen={screens[4]}
      >
        <PlayBadge width={190} />
      </PageHero>

      <section className="section" aria-labelledby="map-heading">
        <div className="container">
          <Reveal>
            <Panel>
              <p className="eyebrow">The adventure map</p>
              <h2 id="map-heading" className="mt-3 max-w-2xl text-3xl text-balance sm:text-4xl">
                One path, one hundred levels
              </h2>
              <p className="mt-5 max-w-2xl text-base text-[var(--ink-soft)] text-pretty">
                Your child follows a single winding route. Finish a level well, earn the stars,
                and the next node lights up. There is no menu to get lost in and nothing to buy
                your way past.
              </p>
              <Parallax speed={0.12} className="mt-10">
                <LevelMapVisual />
              </Parallax>
            </Panel>
          </Reveal>

          <RevealGroup as="ul" className="mt-6 grid gap-4 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FeatureTile key={p.title} icon={p.icon} title={p.title} blurb={p.blurb} index={i} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="minigames-heading">
        <div className="container">
          <SectionHeader
            id="minigames-heading"
            eyebrow="The line-up"
            title="Eight mini-games, one skill each"
            lede="Every game targets something specific — shapes, vocabulary, early math, sentence order — and reappears across the 100 levels at rising difficulty."
          />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {miniGames.map((g, i) => (
              <GameCard key={g.name} game={g} index={i} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="rewards-heading">
        <div className="container">
          <SectionHeader
            id="rewards-heading"
            eyebrow="Little wins, big smiles"
            title="What they get for finishing"
            lede="Stars, stickers, prizes, a daily spin-the-wheel gift and a streak — plus a “Star of the Day” card worth sending to grandparents."
          />
          <div className="mt-14">
            <RewardShowcase />
          </div>
          <Reveal className="mt-10 text-center" delay={0.1}>
            <Button asChild variant="secondary" size="lg">
              <Link href="/features">
                See what they learn first
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection title="Play the first level tonight" />
    </>
  )
}
