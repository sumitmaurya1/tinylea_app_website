import type { Metadata, Viewport } from 'next'
import { Baloo_2, Caveat, Nunito } from 'next/font/google'
import './globals.css'

import { GlassNavbar } from '@/components/glass-navbar'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { JsonLd } from '@/components/json-ld'
import { themeInitScript } from '@/components/theme'
import { graph, organizationSchema, softwareApplicationSchema, websiteSchema } from '@/lib/seo'
import { SITE_URL, site } from '@/lib/site'

const display = Baloo_2({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
})

const body = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
})

/** The cursive accent used for the highlighted words in headlines. */
const script = Caveat({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TinyLearn — Kids Learning Games: ABC, 123, Hindi & Marathi',
    template: '%s | TinyLearn',
  },
  description: site.description,
  applicationName: site.name,
  category: 'education',
  keywords: [
    'kids learning app',
    'learning games for kids',
    'alphabet app for toddlers',
    'Hindi Varnamala for kids',
    'Marathi Varnamala for kids',
    'preschool learning app',
    'numbers 1 to 100 for kids',
    'phonics app for kids',
    'free educational app Android',
  ],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0A291' },
    { media: '(prefers-color-scheme: dark)', color: '#150E0C' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${script.variable}`}>
      <head>
        {/* Stamps the theme class before first paint — no flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <JsonLd data={graph(organizationSchema(), websiteSchema(), softwareApplicationSchema())} />
        <SmoothScroll />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Everything lives on one rounded white card floating on the lavender board. */}
        <div className="shell">
          <GlassNavbar />

          <main id="main">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
