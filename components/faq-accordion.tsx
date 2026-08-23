'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { slugify } from '@/lib/utils'

/**
 * Each answer is a 40–60 word block sitting directly under an H3, so answer
 * engines can lift it whole. The same array feeds FAQPage JSON-LD.
 */
export function FAQAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => (
        <Accordion.Item
          key={item.q}
          value={item.q}
          className="overflow-hidden rounded-[24px] border border-[var(--hairline)] bg-[var(--surface)] transition-colors data-[state=open]:border-transparent data-[state=open]:bg-[var(--tint)]"
        >
          <h3 className="font-sans">
            <Accordion.Trigger
              id={slugify(item.q)}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold leading-snug transition-colors hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--focus)]/40 sm:px-7"
            >
              {item.q}
              <Plus
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[var(--brand)] transition-transform duration-300 group-data-[state=open]:rotate-45"
              />
            </Accordion.Trigger>
          </h3>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-6 pb-6 text-base leading-relaxed text-[var(--ink-soft)] sm:px-7">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
