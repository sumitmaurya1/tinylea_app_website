'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Scroll-linked parallax layer. `speed` is the multiplier applied to scroll —
 * hero layers use 0.2–0.6 as per the design system. Inert under reduced motion.
 */
export function Parallax({
  children,
  speed = 0.3,
  className,
  rotate = 0,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  rotate?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 160, speed * -160])
  const y = useSpring(rawY, { stiffness: 90, damping: 26, mass: 0.4 })
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} style={{ y, rotate: rotate ? r : undefined }} className={className}>
      {children}
    </motion.div>
  )
}

/** Pointer/tilt tracker shared by the mascot and the floating hero objects. */
export function usePointerTilt(strength = 1) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 })
  const reduced = useReducedMotion()

  React.useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setTilt({ x: x * strength, y: y * strength })
    }
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      setTilt({
        x: Math.max(-1, Math.min(1, e.gamma / 45)) * strength,
        y: Math.max(-1, Math.min(1, (e.beta - 45) / 45)) * strength,
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('deviceorientation', onTilt, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [reduced, strength])

  return tilt
}
