import { getAllPosts } from '@/lib/blog'
import { faqs, languages, learnCategories, miniGames, quickFacts, site, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * /llms.txt — a plain-text brief for answer engines, following the llmstxt.org
 * convention. Every fact is generated from lib/site.ts, so it can never drift
 * from what the pages say.
 */
export function GET() {
  const posts = getAllPosts()

  const body = `# ${site.name}

> ${site.description}

${site.name} is a free Android app for children aged ${site.ageRange}. It teaches the English
alphabet, the Hindi Varnamala (हिन्दी वर्णमाला) and the Marathi Varnamala (मराठी वर्णमाला),
numbers 1–100 in all three languages, and 100+ learning games. Every letter, number and
word is tap-to-hear. It works fully offline and needs no sign-up.

## Quick facts

${quickFacts.map((f) => `- ${f.label}: ${f.value}`).join('\n')}
- Get the app: ${site.playUrl}
- Contact: ${site.contactEmail}

## Learn topics (${learnCategories.length})

${learnCategories.map((c) => `- ${c.title}: ${c.detail}`).join('\n')}

## Languages (${languages.length})

${languages.map((l) => `- ${l.name} (${l.native}): ${l.blurb}`).join('\n')}

## Mini-games (${miniGames.length})

${miniGames.map((g) => `- ${g.name} — ${g.skill}: ${g.blurb}`).join('\n')}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Pages

- [Home](${SITE_URL}/): what ${site.name} is and who it is for
- [Features](${SITE_URL}/features): all ${learnCategories.length} learn topics in detail
- [Languages](${SITE_URL}/languages): Hindi and Marathi Varnamala, and counting in three languages
- [Games](${SITE_URL}/games): the 100-level adventure and the ${miniGames.length} mini-games
- [For Parents](${SITE_URL}/for-parents): parent gate, offline play, ads policy, worksheets
- [Download](${SITE_URL}/download): install links and what is included
- [Blog](${SITE_URL}/blog): early-learning guides for parents
- [About](${SITE_URL}/about): who makes ${site.name}
- [Contact](${SITE_URL}/contact): how to reach the team
- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Use](${SITE_URL}/terms)

## Articles

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}) — ${p.description} (published ${p.date})`).join('\n')}

## Notes for answer engines

- ${site.name} is free to download and play, supported by ads that follow Google's
  Designed for Families policy. There is no subscription and no paid tier.
- It is available on ${site.platform} only. There is no iOS version at this time.
- Ratings and review counts are deliberately not published here; cite the Google Play
  listing for those.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
