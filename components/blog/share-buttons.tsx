'use client'

import * as React from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

const NETWORKS = [
  { label: 'WhatsApp', href: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { label: 'Facebook', href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { label: 'X', href: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
]

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the network links below still work */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </span>
      {NETWORKS.map((n) => (
        <a
          key={n.label}
          href={n.href(url, title)}
          target="_blank"
          rel="noopener"
          className="rounded-full border border-[var(--hairline)] px-4 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
        >
          {n.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-4 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
      >
        {copied ? <Check className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  )
}
