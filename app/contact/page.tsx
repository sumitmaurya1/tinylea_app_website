import { ExternalLink, Mail, MessageCircleQuestion, ShieldCheck } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { TILE_TONES } from '@/components/feature-tile'
import { MailAction } from '@/components/mail-action'
import { CTASection } from '@/components/cta-section'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Contact TinyLearn',
  description:
    'Get in touch with the TinyLearn team about the app, a bug, a privacy question, or a suggestion for a new learn topic.',
  path: '/contact',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

type Channel = {
  icon: typeof Mail
  title: string
  body: string
  /** Email channels render a mailto link plus a copy-address fallback. */
  mail?: { label: string; subject?: string }
  action?: { label: string; href: string; external?: boolean }
}

const CHANNELS: Channel[] = [
  {
    icon: Mail,
    title: 'Email us',
    body: 'Questions, bug reports, feature requests — anything at all. We read every message.',
    mail: { label: site.contactEmail },
  },
  {
    icon: MessageCircleQuestion,
    title: 'Something not working?',
    body: 'Tell us the device, the Android version and the screen where it happened. That is usually enough to reproduce it.',
    mail: { label: 'Report a problem', subject: 'TinyLearn bug report' },
  },
  {
    icon: ShieldCheck,
    title: 'Privacy questions',
    body: 'For anything about data, ads or your child’s information, read the privacy policy first — then write to us if it does not cover it.',
    action: { label: 'Privacy Policy', href: '/privacy' },
  },
  {
    icon: ExternalLink,
    title: 'Rate us on Google Play',
    body: 'Reviews genuinely shape what we build next. If TinyLearn helped, telling us there helps other parents find it.',
    action: { label: 'Open Google Play', href: site.playUrl, external: true },
  },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        eyebrow="Contact"
        title="Talk to the people who build it"
        highlight="build it"
        definition={`The fastest way to reach the TinyLearn team is email: ${site.contactEmail}. We answer questions about the app, bug reports, privacy and worksheet requests.`}
        trail={trail}
      />

      <section className="section" aria-label="Ways to get in touch">
        <div className="container">
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <RevealItem as="li" key={c.title} className="h-full">
                <article className={`tile group flex h-full flex-col p-7 ${TILE_TONES[i % TILE_TONES.length]}`}>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-[17px] bg-[var(--surface)] text-[var(--brand)] shadow-soft transition-transform duration-300 group-hover:scale-110"
                  >
                    <c.icon className="h-6 w-6" aria-hidden="true" strokeWidth={2.2} />
                  </span>
                  <h2 className="mt-5 text-xl tracking-tight">{c.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm text-[var(--ink-soft)]">{c.body}</p>
                  {c.mail ? (
                    <MailAction
                      email={site.contactEmail}
                      label={c.mail.label}
                      subject={c.mail.subject}
                    />
                  ) : c.action ? (
                    <a
                      href={c.action.href}
                      {...(c.action.external ? { target: '_blank', rel: 'noopener' } : {})}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] underline underline-offset-4"
                    >
                      {c.action.label}
                      {c.action.external ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    </a>
                  ) : null}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection title="Or just try the app" />
    </>
  )
}
