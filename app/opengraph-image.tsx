import { ImageResponse } from 'next/og'
import { OgFrame, OG_SIZE, OG_CONTENT_TYPE, loadDisplayFont } from '@/lib/og'

// Required by output: 'export' — the image is generated at build time.
export const dynamic = 'force-static'
export const alt = 'TinyLearn — Kids Learning Games: ABC, 123, Hindi & Marathi'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  const font = await loadDisplayFont()
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Play · Learn · Grow"
        title="Where little minds love to learn"
        footnote="100+ levels · 11 topics · 3 languages"
      />
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Display', data: font, style: 'normal', weight: 700 }] : undefined,
    },
  )
}
