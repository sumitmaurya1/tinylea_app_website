/**
 * DRAFT — REVIEW BEFORE LAUNCH.
 * This policy describes TinyLearn as specified (offline play, kid-safe ads under
 * Google's Families policy, parent gate). It has not been reviewed by counsel and
 * must be checked against your actual SDKs, ad network and data flows, plus the
 * COPPA / GDPR-K / DPDP obligations that apply to you. See README "Placeholders".
 */
import { LegalPage } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How TinyLearn handles data for children ages 2–8: what we collect, what we do not, how ads work, and how to contact us.',
  path: '/privacy',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy' },
]

const UPDATED = '2026-08-22'

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <LegalPage
        title="Privacy Policy"
        updated={UPDATED}
        intro="TinyLearn is used by children. This policy explains, in plain language, what the app collects, what it does not, and how advertising works inside it."
        trail={trail}
      >
        <h2 id="who-we-are">Who this policy covers</h2>
        <p>
          This policy applies to the TinyLearn Android application (package{' '}
          <code>{site.packageName}</code>) and to this website. TinyLearn is designed for children
          aged {site.ageRange} and participates in Google Play’s Designed for Families programme.
        </p>

        <h2 id="what-we-collect">What we collect</h2>
        <p>
          TinyLearn does not ask your child to create an account, and it does not ask for a name,
          email address, phone number, photograph or location. Learning progress — stars, unlocked
          levels, stickers and streaks — is stored locally on the device so the app can work
          offline.
        </p>
        <p>
          If you choose to add your child’s name to a “Star of the Day” progress card, that name is
          stored on the device only, so the card can be rendered. It is not transmitted to us.
        </p>

        <h2 id="advertising">Advertising</h2>
        <p>
          TinyLearn is free and is supported by advertising. Ads shown in the app are served under
          Google’s Families ad policy and the Designed for Families requirements, which restrict ad
          formats and content for child-directed apps. Ads are labelled with an “Ad” badge so they
          are distinguishable from the app itself.
        </p>
        <p>
          Because TinyLearn is treated as child-directed, ad requests are made without
          personalisation and without the use of advertising identifiers for interest-based
          targeting.
        </p>

        <h2 id="parent-gate">The parent gate</h2>
        <p>
          Areas of the app intended for adults — the Parent Zone, external links and any store
          links — sit behind a parent gate: a short math challenge a young child is unlikely to
          solve. This is there to stop a child leaving the app or changing settings unintentionally.
        </p>

        <h2 id="offline">Offline use</h2>
        <p>
          The lessons and games work with no network connection. When the device is offline, no data
          leaves it at all.
        </p>

        <h2 id="third-parties">Third parties</h2>
        <p>
          Distribution is through Google Play, and advertising is served through Google’s
          family-compliant ad services. Their handling of data is governed by their own policies.
          The printable worksheets site, {site.printablesUrl.replace(/^https?:\/\//, '')}, is
          operated by us and is intended for parents rather than children.
        </p>

        <h2 id="childrens-privacy">Children’s privacy</h2>
        <p>
          We do not knowingly collect personal information from children. If you believe a child has
          provided personal information to us, contact{' '}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we will delete it.
        </p>

        <h2 id="your-choices">Your choices</h2>
        <ul>
          <li>Uninstalling the app removes the locally stored progress data with it.</li>
          <li>Device-level settings let you limit ad tracking across all apps.</li>
          <li>You can write to us at any time to ask what, if anything, we hold.</li>
        </ul>

        <h2 id="changes">Changes to this policy</h2>
        <p>
          If this policy changes materially, we will update the date at the top of this page and, where
          appropriate, note the change inside the app.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          Questions about privacy: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </LegalPage>
    </>
  )
}
