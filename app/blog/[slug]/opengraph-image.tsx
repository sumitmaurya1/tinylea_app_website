import { ImageResponse } from 'next/og'
import { OgFrame, OG_SIZE, OG_CONTENT_TYPE, loadDisplayFont } from '@/lib/og'
import { getPost, getPostSlugs } from '@/lib/blog'

export const alt = 'TinyLearn blog article'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const font = await loadDisplayFont()

  return new ImageResponse(
    (
      <OgFrame
        eyebrow="TinyLearn Blog"
        title={post?.title ?? 'The TinyLearn Blog'}
        footnote={post ? `${post.readingMinutes} min read · ${post.tags.slice(0, 2).join(' · ')}` : undefined}
      />
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Display', data: font, style: 'normal', weight: 700 }] : undefined,
    },
  )
}
