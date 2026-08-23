import { PageHero } from '@/components/page-hero'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogBrowser } from '@/components/blog/blog-browser'
import { CTASection } from '@/components/cta-section'
import { Reveal, RevealGroup } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'

import { breadcrumbSchema, buildMetadata, graph } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { getAllPosts, getAllTags } from '@/lib/blog'

export const metadata = buildMetadata({
  title: 'Blog — Early Learning Guides for Parents',
  description:
    'Practical, play-based guides for parents of 2–8 year olds: teaching the alphabet, counting to 100, Hindi and Marathi Varnamala, phonics, screen time and school readiness.',
  path: '/blog',
})

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
]

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const [featured, ...rest] = posts

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'The TinyLearn Blog',
    url: `${SITE_URL}/blog`,
    description:
      'Play-based early-learning guides for parents of children aged 2 to 8, covering the alphabet, numbers, Hindi and Marathi, phonics and school readiness.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  }

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), blogSchema)} />

      <PageHero
        eyebrow="Blog"
        title="Early learning, without the guesswork"
        highlight="without the guesswork"
        definition="Practical guides for parents of children aged 2–8 — how to teach the alphabet, count to 100, start the Hindi or Marathi Varnamala, begin phonics, and tell a good learning app from a bad one."
        trail={trail}
      />

      {featured ? (
        <section className="pb-4" aria-label="Featured article">
          <div className="container">
            <RevealGroup as="ul" className="grid">
              <BlogCard post={featured} featured />
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <section className="section pt-10" aria-labelledby="all-posts-heading">
        <div className="container">
          <h2 id="all-posts-heading" className="sr-only">
            All articles
          </h2>
          <Reveal>
            <BlogBrowser posts={rest.length ? rest : posts} tags={tags} />
          </Reveal>
        </div>
      </section>

      <CTASection title="Learn together in the app" />
    </>
  )
}
