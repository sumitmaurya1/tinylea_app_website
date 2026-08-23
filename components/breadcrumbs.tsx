import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--ink-soft)]">
        {trail.map((t, i) => {
          const last = i === trail.length - 1
          return (
            <li key={t.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-[var(--ink)]">
                  {t.name}
                </span>
              ) : (
                <>
                  <Link href={t.path} className="inline-block py-1 transition-colors hover:text-[var(--brand)]">
                    {t.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
