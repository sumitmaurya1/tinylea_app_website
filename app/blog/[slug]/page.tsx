import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { ArrowLeft, Clock } from 'lucide-react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { GlassCard } from '@/components/glass-card'
import { BlogCard } from '@/components/blog/blog-card'
import { TableOfContents } from '@/components/blog/toc'
import { ShareButtons } from '@/components/blog/share-buttons'
import { CTASection } from '@/components/cta-section'
import { PlayBadge } from '@/components/play-badge'
import { Reveal, RevealGroup } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { blogPostingSchema, breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { SITE_URL, site } from '@/lib/site'
import { formatDate } from '@/lib/utils'
import { getAllPosts, getPost, getPostSlugs, getRelatedPosts } from '@/lib/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return buildMetadata({ title: 'Not found', description: '', path: `/blog/${slug}`, noIndex: true })

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
  })
}

/** MDX components — styled to match the site rather than raw HTML defaults. */
const mdxComponents = {
  Callout: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <aside className="not-prose my-8 rounded-[22px] border-l-4 border-[var(--brand)] bg-[var(--brand-soft)]/50 px-6 py-5">
      {title ? <p className="font-display text-lg text-[var(--ink)]">{title}</p> : null}
      <div className="mt-2 text-base text-[var(--ink-soft)] [&>p]:m-0">{children}</div>
    </aside>
  ),
  AppCTA: ({ children }: { children?: React.ReactNode }) => (
    <aside className="not-prose my-10 flex flex-col items-start gap-5 rounded-[26px] border border-[var(--hairline)] bg-[var(--glass-solid)] px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
      {/* A div, not a p: MDX already wraps the children in a paragraph, and a
          nested <p> is invalid HTML that the parser rewrites — which broke
          hydration on every post. */}
      <div className="max-w-md text-base text-[var(--ink-soft)] [&>p]:m-0">
        {children ?? `Practise all of this in the app — ${site.name} is free on Google Play.`}
      </div>
      <PlayBadge width={168} />
    </aside>
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={String(props.src)}
      alt={props.alt ?? ''}
      width={1200}
      height={675}
      className="my-8 h-auto w-full rounded-[22px]"
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? ''
    const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL)
    if (external) return <a {...props} target="_blank" rel="noopener" />
    return <Link href={href} {...props} />
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug)
  const url = `${SITE_URL}/blog/${post.slug}`
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), blogPostingSchema(post))} />

      <article className="section pt-6">
        <div className="container">
          <Breadcrumbs trail={trail} />

          <Reveal className="mx-auto max-w-3xl text-center">
            <ul className="flex flex-wrap justify-center gap-2">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    href="/blog"
                    className="inline-flex rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>

            <h1 className="mt-6 text-3xl text-balance sm:text-4xl">{post.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--ink-soft)] text-pretty">
              {post.description}
            </p>

            <p className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[var(--ink-soft)]">
              <span>{post.author}</span>
              <span aria-hidden="true" className="text-[var(--brand)]">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true" className="text-[var(--brand)]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
            <Reveal>
              <GlassCard solid className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                <div className="article mx-auto max-w-[70ch]">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeSlug],
                      },
                    }}
                  />
                </div>

                <hr className="my-12 border-[var(--hairline)]" />

                <div className="flex flex-wrap items-center justify-between gap-6">
                  <ShareButtons url={url} title={post.title} />
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    All articles
                  </Link>
                </div>
              </GlassCard>
            </Reveal>

            <aside>
              <TableOfContents headings={post.headings} />
            </aside>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="section pt-0" aria-labelledby="related-heading">
          <div className="container">
            <h2 id="related-heading" className="text-3xl text-balance">
              Keep reading
            </h2>
            <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  )
}

/** Warm the module graph at build time so every post is prerendered. */
export const revalidate = false
void getAllPosts
