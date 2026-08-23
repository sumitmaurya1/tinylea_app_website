'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * A mailto link with a copy fallback.
 *
 * `mailto:` silently does nothing when the browser has no mail client
 * registered — common on desktop, where most people use webmail. The copy
 * button means the address is always reachable, whatever the setup.
 */
export function MailAction({
  email,
  label,
  subject,
}: {
  email: string
  label: string
  subject?: string
}) {
  const [copied, setCopied] = React.useState(false)
  // A ref, not an id: the same address renders in more than one card, and
  // duplicate ids are invalid and would always resolve to the first one.
  const linkRef = React.useRef<HTMLAnchorElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). Fall back to
      // selecting the address so the user can copy it by hand.
      const node = linkRef.current
      if (node) {
        const range = document.createRange()
        range.selectNodeContents(node)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
      <a
        ref={linkRef}
        href={href}
        className="text-sm font-semibold text-[var(--brand)] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
      >
        {label}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-[2.25rem] cursor-pointer items-center gap-1.5 rounded-full bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--ink-soft)] shadow-soft transition-colors hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[var(--brand)]" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
      </button>
    </div>
  )
}
