import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { languages, site } from '@/lib/site'
import { Logo } from './logo'
import { PlayBadge } from './play-badge'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Languages', href: '/languages' },
      { label: 'Games', href: '/games' },
      { label: 'For Parents', href: '/for-parents' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Download', href: '/download' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section pb-10 pt-0">
      <div className="container">
        <div className="relative rounded-[36px] bg-[var(--tint)] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-[var(--ink-soft)]">
                {site.tagline} — a free learning app for kids ages {site.ageRange}, in English, Hindi
                and Marathi.
              </p>
              <div className="mt-6">
                <PlayBadge width={172} />
              </div>
            </div>

            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-display text-base font-bold tracking-wide">{col.title}</h2>
                <ul className="mt-3 space-y-0.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-10 grid gap-6 border-t border-[var(--ink)]/10 pt-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-base font-bold tracking-wide">Learn in</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {languages.map((l) => (
                  <li key={l.key}>
                    <Link
                      href="/languages"
                      className="inline-flex items-center rounded-full border border-[var(--hairline)] px-3.5 py-2 text-xs text-[var(--ink-soft)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    >
                      <span lang={l.locale}>{l.native}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:text-right">
              <h2 className="font-display text-base font-bold tracking-wide">More from TinyLearn</h2>
              <a
                href={site.printablesUrl}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] underline underline-offset-4"
              >
                Free printable worksheets
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              {site.socials.length ? (
                <ul className="mt-4 flex flex-wrap gap-3 sm:justify-end">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener"
                        className="text-sm text-[var(--ink-soft)] hover:text-[var(--brand)]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <p className="mt-8 text-xs text-[var(--ink-soft)]">
            © {year} TinyLearn. Google Play and the Google Play logo are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
