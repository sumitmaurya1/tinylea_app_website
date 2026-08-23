'use client'

import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, PerformanceMonitor } from '@react-three/drei'
import { Buddy } from './buddy'
import { FloatingBlocks } from './floating-blocks'

export default function Scene() {
  const pointer = React.useRef({ x: 0, y: 0 })
  const [dpr, setDpr] = React.useState(1.5)

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      pointer.current = {
        x: Math.max(-1, Math.min(1, e.gamma / 45)),
        y: Math.max(-1, Math.min(1, (e.beta - 45) / 45)),
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('deviceorientation', onTilt, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0.15, 6.4], fov: 42 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Pause rendering when off-screen; the hero is the only 3D on the page.
      frameloop="always"
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[3.5, 5, 4]} intensity={1.5} castShadow={false} />
      <directionalLight position={[-4, 1.5, -2]} intensity={0.5} color="#F0A291" />
      <pointLight position={[0, -2.5, 3]} intensity={0.5} color="#FFD24A" />

      <React.Suspense fallback={null}>
        <Buddy pointer={pointer} />
        <FloatingBlocks />
      </React.Suspense>

      <ContactShadows position={[0, -1.72, 0]} opacity={0.28} scale={9} blur={2.6} far={3} color="#2A2320" />
    </Canvas>
  )
}
