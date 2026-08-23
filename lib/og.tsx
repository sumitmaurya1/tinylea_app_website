import fs from 'node:fs'
import path from 'node:path'
import { site } from './site'

/**
 * The app icon, inlined once as a data URI. ImageResponse cannot read from
 * /public, so the bytes have to travel with the markup. Read lazily and cached;
 * if it is missing the frame simply renders without the mark.
 */
let iconDataUri: string | null | undefined
function appIcon(): string | null {
  if (iconDataUri === undefined) {
    try {
      const file = path.join(process.cwd(), 'public', 'brand', 'tinylearn-icon.png')
      iconDataUri = `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`
    } catch {
      iconDataUri = null
    }
  }
  return iconDataUri
}

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * Baloo 2 for the OG headline — the same display face the site uses. Fetched
 * once at build time; if the fetch fails the ImageResponse falls back to its
 * built-in font rather than failing the build.
 */
export async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700&display=swap', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TinyLearnOG/1.0)' },
    }).then((r) => r.text())
    const url = /src:\s*url\((https:[^)]+\.(?:ttf|otf))\)/.exec(css)?.[1]
    if (!url) return null
    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

type OgInput = {
  title: string
  eyebrow?: string
  footnote?: string
}

/** Shared branded OG layout: mint→lavender gradient, glass panel, buddy, wordmark. */
export function OgFrame({ title, eyebrow, footnote }: OgInput) {
  const icon = appIcon()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        background: 'linear-gradient(135deg, #F4F1FF 0%, #FFFFFF 45%, #FDF6FF 100%)',
        fontFamily: 'Display, sans-serif',
        position: 'relative',
      }}
    >
      {/* decorative blobs */}
      <div style={{ position: 'absolute', top: -120, right: -80, width: 420, height: 420, borderRadius: 999, background: 'rgba(225,46,30,0.16)', display: 'flex' }} />
      <div style={{ position: 'absolute', bottom: -140, left: -60, width: 380, height: 380, borderRadius: 999, background: 'rgba(249,191,214,0.28)', display: 'flex' }} />

      {/* header: wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} width={72} height={72} alt="" style={{ borderRadius: 20 }} />
        ) : null}
        <div style={{ display: 'flex', fontSize: 42, letterSpacing: -0.5 }}>
          <span style={{ color: '#2A2320' }}>Tiny</span>
          <span style={{ color: '#E12E1E' }}>Learn</span>
        </div>
      </div>

      {/* body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#FDEEE9',
          borderRadius: 36,
          padding: '44px 48px',
          boxShadow: '0 24px 60px rgba(120,40,25,0.12)',
          maxWidth: 940,
        }}
      >
        {eyebrow ? (
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 3, color: '#E12E1E', textTransform: 'uppercase', marginBottom: 18 }}>
            {eyebrow}
          </div>
        ) : null}
        <div style={{ display: 'flex', fontSize: title.length > 62 ? 58 : 72, lineHeight: 1.06, color: '#2A2320' }}>
          {title}
        </div>
      </div>

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: '#6A5E58' }}>
        <div style={{ display: 'flex' }}>{footnote ?? 'Free · Ages 2–8 · English · हिन्दी · मराठी'}</div>
        <div style={{ display: 'flex', color: '#E12E1E' }}>{site.url.replace(/^https?:\/\//, '')}</div>
      </div>
    </div>
  )
}
