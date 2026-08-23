import { Breadcrumbs } from './breadcrumbs'
import { GlassCard } from './glass-card'
import { Reveal } from './motion/reveal'
import { formatDate } from '@/lib/utils'

export function LegalPage({
  title,
  updated,
  intro,
  trail,
  children,
}: {
  title: string
  updated: string
  intro: string
  trail: { name: string; path: string }[]
  children: React.ReactNode
}) {
  return (
    <section className="section pt-6">
      <div className="container">
        <Breadcrumbs trail={trail} />
        <Reveal className="max-w-3xl">
          <h1 className="text-4xl text-balance sm:text-5xl">{title}</h1>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Last updated <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
          <p className="mt-6 text-lg text-[var(--ink-soft)] text-pretty">{intro}</p>
        </Reveal>

        <Reveal className="mt-12">
          <GlassCard solid className="px-6 py-10 sm:px-10 lg:px-14">
            <div className="article prose-measure">{children}</div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
