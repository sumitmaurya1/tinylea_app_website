'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme'
import { Button } from './ui/button'
import { PlayGlyph } from './play-badge'

export function GlassNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on route change and lock the body while it's open.
  React.useEffect(() => setOpen(false), [pathname])
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,box-shadow,backdrop-filter] duration-300',
          scrolled
            ? 'bg-[var(--surface)]/85 shadow-[0_10px_30px_rgba(120,40,25,0.09)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="container">
          <nav
            aria-label="Main"
            className="flex items-center justify-between gap-4 py-4 lg:py-5"
          >
            <Logo />

            {/* Link row — the current page wears an outlined pill, exactly like the ref. */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-[color,border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus)]/40',
                      isActive(link.href)
                        ? 'border-[var(--ink)]/25 text-[var(--ink)]'
                        : 'border-transparent text-[var(--ink-soft)] hover:border-[var(--ink)]/15 hover:text-[var(--ink)]',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle className="hidden sm:grid" />
              <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
                <a href={site.playUrl} target="_blank" rel="noopener">
                  <PlayGlyph className="h-4 w-4" />
                  <span className="hidden md:inline">Get the app</span>
                  <span className="md:hidden">Get app</span>
                </a>
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-[var(--tint)] text-[var(--ink)] transition-colors hover:bg-[var(--tint-deep)] lg:hidden"
              >
                {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className="container lg:hidden">
        <div
          id="mobile-nav"
          hidden={!open}
          className="mb-2 overflow-hidden rounded-[28px] bg-[var(--surface)] p-3 shadow-glass"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-base font-semibold transition-colors',
                    isActive(link.href)
                      ? 'bg-[var(--tint)] text-[var(--ink)]'
                      : 'text-[var(--ink-soft)] hover:bg-[var(--tint)] hover:text-[var(--ink)]',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/download"
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--tint)] hover:text-[var(--ink)]"
              >
                Download
              </Link>
            </li>
          </ul>
          <div className="mt-2 flex items-center gap-2 px-1 pb-1">
            <ThemeToggle />
            <Button asChild className="flex-1">
              <a href={site.playUrl} target="_blank" rel="noopener">
                <PlayGlyph className="h-4 w-4" />
                Get it on Google Play
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
