'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { MascotSvg } from './mascot-svg'

/**
 * The whole three.js bundle lives behind this dynamic import, so it never lands
 * in the initial payload and never blocks LCP. The SVG buddy renders first and
 * stays permanently on devices that shouldn't run WebGL.
 */
const Scene = dynamic(() => import('./scene'), { ssr: false, loading: () => null })

function canRun3D() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Low core count / low memory / coarse pointer on a small screen => keep the SVG.
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  if (cores <= 4 || mem <= 3) return false
  if (window.matchMedia('(max-width: 640px)').matches) return false
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  if (saveData) return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function MascotCanvas({ className }: { className?: string }) {
  const [enabled, setEnabled] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const host = React.useRef<HTMLDivElement>(null)

  // Decide after paint, so the SVG is always the first thing on screen.
  React.useEffect(() => {
    const id = window.setTimeout(() => setEnabled(canRun3D()), 120)
    return () => window.clearTimeout(id)
  }, [])

  // Only mount the canvas once the hero is actually in view.
  React.useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const show3D = enabled && visible

  return (
    <div ref={host} className={className}>
      {/* Reserved box — identical dimensions in both states, so CLS stays at 0. */}
      <div className="relative aspect-square w-full">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${show3D ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden={show3D}
        >
          <MascotSvg />
        </div>
        {show3D ? (
          <div className="absolute inset-0 transition-opacity duration-700">
            <Scene />
          </div>
        ) : null}
      </div>
    </div>
  )
}
