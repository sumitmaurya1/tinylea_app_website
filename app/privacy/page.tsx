import { LegalPage } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'

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

const UPDATED = '2026-05-09'

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <LegalPage
        title="Privacy Policy for TinyLearn"
        updated={UPDATED}
        dateLabel="Effective date:"
        intro="Publisher: Ronit Labs"
        trail={trail}
      >
        <div className="rounded-md border border-[var(--border)] border-l-4 p-4">
          <strong>TinyLearn is designed for children.</strong> We follow the
          Children's Online Privacy Protection Act (COPPA), Google Play's
          Families Policy, and applicable parts of the GDPR (including
          protections for minors). We do not knowingly collect personal
          information from children.
        </div>

        <h2 id="who-we-are">1. Who we are</h2>
        <p>
          TinyLearn ("the App") is a free educational mobile application
          published by Ronit Labs ("we", "us"). You can reach us at{' '}
          <a href="mailto:ronitlabs@gmail.com">ronitlabs@gmail.com</a>{' '}
          for any privacy-related question.
        </p>

        <h2 id="information-we-collect">2. Information we collect</h2>
        <p>
          The App itself does <strong>not</strong> ask for, collect, or transmit
          any personal information such as a name, address, email, phone number,
          photo, or location.
        </p>
        <h3>2.1 Information stored only on the device</h3>
        <ul>
          <li>Learning progress (stars earned, streak, daily-challenge state)</li>
          <li>Unlocked content and reward chests</li>
          <li>App settings (sound on/off, etc.)</li>
        </ul>
        <p>
          This data is stored locally using the device's standard storage and is
          never transmitted to our servers. Uninstalling the App removes it.
        </p>

        <h3>2.2 Information collected by Google AdMob</h3>
        <p>
          The App displays ads served by Google AdMob. To deliver age-appropriate
          ads, AdMob may collect:
        </p>
        <ul>
          <li>Advertising ID (Android) / IDFA (iOS) &mdash; in a limited form</li>
          <li>Device information (model, OS version, language)</li>
          <li>Approximate (non-precise) location, derived from IP address</li>
          <li>Crash and diagnostic data</li>
        </ul>
        <p>
          Because TinyLearn is a child-directed app, we configure AdMob with
          <code>tagForChildDirectedTreatment = true</code> and request
          <strong>non-personalized ads only</strong>. Ad content is restricted
          to a "G" maximum content rating. This means ads are not based on a
          user's interests or behaviour profile.
        </p>
        <p>
          Google's policy and how it handles this data is described here:{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">
            How Google uses information from sites or apps that use our services
          </a>.
        </p>

        <h2 id="information-we-do-not-collect">3. Information we do not collect</h2>
        <ul>
          <li>No accounts, no sign-up, no login</li>
          <li>No analytics SDK that profiles individual users</li>
          <li>No microphone or camera access</li>
          <li>No precise GPS location</li>
          <li>No contacts, photos, or files from the device</li>
        </ul>

        <h2 id="permissions-the-app-requests">4. Permissions the App requests</h2>
        <ul>
          <li><strong>Internet</strong> &mdash; required only to load ads from Google AdMob.</li>
        </ul>

        <h2 id="children-s-privacy-coppa-amp-gdpr-k">5. Children's privacy (COPPA &amp; GDPR-K)</h2>
        <p>
          The App is intended for young children. We do not knowingly collect
          personal information from any user, including children under 13 (US)
          or under 16 (EU). If you believe your child has somehow provided
          personal information through the App, please contact us at{' '}
          <a href="mailto:ronitlabs@gmail.com">ronitlabs@gmail.com</a>{' '}
          and we will promptly delete it.
        </p>

        <h2 id="third-party-services">6. Third-party services</h2>
        <p>The App relies on the following third-party services:</p>
        <ul>
          <li>
            <strong>Google AdMob</strong> &mdash; advertising.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>
          </li>
          <li>
            <strong>Google Play Services</strong> &mdash; required by AdMob.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>
          </li>
        </ul>

        <h2 id="data-retention-amp-deletion">7. Data retention &amp; deletion</h2>
        <p>
          Local app data lives on the device until you clear the app's data or
          uninstall it. We don't store any user data on our servers, so there
          is nothing for us to delete on our side.
        </p>

        <h2 id="security">8. Security</h2>
        <p>
          Because no personal data leaves the device, the risk of a data breach
          involving our App is minimal. Ad-related data is handled by Google's
          systems, which use industry-standard security practices.
        </p>

        <h2 id="international-users">9. International users</h2>
        <p>
          The App is available worldwide. By using the App, you understand that
          ad-related data may be processed by Google in the United States or
          other jurisdictions where Google operates.
        </p>

        <h2 id="changes-to-this-policy">10. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The "Effective
          date" at the top will reflect the latest revision. Material changes
          will be reflected in an updated Play Store listing.
        </p>

        <h2 id="contact">11. Contact</h2>
        <p>
          Questions, requests, or concerns?
          <br />
          Email: <a href="mailto:ronitlabs@gmail.com">ronitlabs@gmail.com</a>
        </p>

        <footer>
          &copy; 2026 Ronit Labs. TinyLearn is a trademark of Ronit Labs.
        </footer>
      </LegalPage>
    </>
  )
}
