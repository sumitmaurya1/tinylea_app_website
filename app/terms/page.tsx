/**
 * DRAFT — REVIEW BEFORE LAUNCH. Not reviewed by counsel; check against your
 * jurisdiction and your Play Store listing. See README "Placeholders".
 */
import { LegalPage } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply when you use the TinyLearn app and this website.',
  path: '/terms',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Terms of Use', path: '/terms' },
]

const UPDATED = '2026-08-22'

export default function TermsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <LegalPage
        title="Terms of Use"
        updated={UPDATED}
        intro="These terms apply when you use the TinyLearn app or this website. They are written to be read, not to be skipped."
        trail={trail}
      >
        <h2 id="acceptance">Using TinyLearn</h2>
        <p>
          By downloading or using TinyLearn you agree to these terms. TinyLearn is intended for
          children aged {site.ageRange} used under the supervision of a parent or guardian. If you
          are the parent or guardian, you accept these terms on your child’s behalf.
        </p>

        <h2 id="licence">Your licence</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable licence to use
          TinyLearn for private, non-commercial family use. You may not copy, decompile, reverse
          engineer, resell or redistribute the app or its content.
        </p>

        <h2 id="cost">Cost and advertising</h2>
        <p>
          TinyLearn is free to download and free to play. It is supported by advertising served
          under Google’s Families ad policy. We do not guarantee that the app will remain
          advertising-supported indefinitely, but any change would be reflected on the Google Play
          listing before it takes effect.
        </p>

        <h2 id="content">Content and accuracy</h2>
        <p>
          The learning content — including the English alphabet, the Hindi and Marathi Varnamala,
          numbers, phonics and vocabulary — is provided for educational purposes. It is a
          supplement to, not a replacement for, teaching and school.
        </p>

        <h2 id="availability">Availability</h2>
        <p>
          We aim to keep TinyLearn working on supported Android devices, but we do not promise
          uninterrupted availability. Features may be added, changed or removed as the app develops.
        </p>

        <h2 id="third-party">Third-party services</h2>
        <p>
          TinyLearn is distributed through Google Play and shows ads through Google’s
          family-compliant ad services. Your use of those services is also governed by their terms.
          The printable worksheets at {site.printablesUrl.replace(/^https?:\/\//, '')} are provided
          for personal and classroom use, and may not be resold.
        </p>

        <h2 id="liability">Liability</h2>
        <p>
          TinyLearn is provided “as is”. To the fullest extent permitted by law, we exclude implied
          warranties and are not liable for indirect or consequential loss arising from use of the
          app. Nothing in these terms limits liability that cannot lawfully be limited.
        </p>

        <h2 id="changes">Changes to these terms</h2>
        <p>
          We may update these terms. The date at the top of this page shows when they last changed;
          continuing to use TinyLearn after a change means you accept the updated terms.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </LegalPage>
    </>
  )
}
