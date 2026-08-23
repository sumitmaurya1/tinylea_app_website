'use client'

import * as React from 'react'
import * as THREE from 'three'
import { Float, RoundedBox } from '@react-three/drei'

const INK = '#2A2320'

/**
 * Glyph faces are drawn to a 2D canvas rather than via drei's <Text>, which would
 * fetch a remote font and has no Devanagari coverage (we need अ and ३).
 */
function useGlyphTexture(glyph: string) {
  return React.useMemo(() => {
    if (typeof document === 'undefined') return null
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = '#2A2320'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `700 ${size * 0.62}px "Poppins", "Noto Sans Devanagari", system-ui, sans-serif`
    ctx.fillText(glyph, size / 2, size / 2 + size * 0.03)
    const tex = new THREE.CanvasTexture(canvas)
    tex.anisotropy = 4
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [glyph])
}

/** Ink-outlined duotone letter/number blocks orbiting the buddy. */
function Block({
  label,
  color,
  position,
  scale = 1,
  rotation = [0, 0, 0] as [number, number, number],
  speed = 1,
}: {
  label: string
  color: string
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  speed?: number
}) {
  const glyph = useGlyphTexture(label)

  React.useEffect(() => () => glyph?.dispose(), [glyph])

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.1} position={position}>
      <group scale={scale} rotation={rotation}>
        <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.16} smoothness={4} scale={1.05}>
          <meshStandardMaterial color={INK} side={THREE.BackSide} />
        </RoundedBox>
        <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.16} smoothness={4}>
          <meshStandardMaterial color={color} roughness={0.5} />
        </RoundedBox>
        {glyph ? (
          <mesh position={[0, 0, 0.442]}>
            <planeGeometry args={[0.62, 0.62]} />
            <meshBasicMaterial map={glyph} transparent depthWrite={false} />
          </mesh>
        ) : null}
      </group>
    </Float>
  )
}

function Star({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const geo = React.useMemo(() => {
    const shape = new THREE.Shape()
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 0.34 : 0.15
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
    }
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 })
    g.center()
    return g
  }, [])

  return (
    <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.4} position={position}>
      <mesh geometry={geo} scale={scale}>
        <meshStandardMaterial color="#FFD24A" roughness={0.3} metalness={0.12} />
      </mesh>
    </Float>
  )
}

function Heart({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const geo = React.useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0.12)
    s.bezierCurveTo(0, 0.3, -0.28, 0.36, -0.28, 0.12)
    s.bezierCurveTo(-0.28, -0.06, -0.1, -0.16, 0, -0.32)
    s.bezierCurveTo(0.1, -0.16, 0.28, -0.06, 0.28, 0.12)
    s.bezierCurveTo(0.28, 0.36, 0, 0.3, 0, 0.12)
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.11, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 })
    g.center()
    return g
  }, [])
  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={1.2} position={position}>
      <mesh geometry={geo} scale={scale}>
        <meshStandardMaterial color="#F9BFD6" roughness={0.45} />
      </mesh>
    </Float>
  )
}

export function FloatingBlocks() {
  return (
    <group>
      {/* letters + numerals in all three scripts */}
      <Block label="A" color="#FFD24A" position={[-2.5, 1.3, -0.6]} rotation={[0.2, -0.4, 0.1]} speed={1.1} />
      <Block label="1" color="#F9BFD6" position={[2.55, 1.05, -0.9]} rotation={[-0.2, 0.4, -0.15]} speed={0.9} scale={0.92} />
      <Block label="अ" color="#FDE9E6" position={[-2.75, -1.15, -0.4]} rotation={[0.1, 0.3, -0.12]} speed={1.25} scale={0.88} />
      <Block label="३" color="#FFF3D1" position={[2.35, -1.35, -0.5]} rotation={[-0.15, -0.3, 0.14]} speed={1.05} scale={0.82} />
      <Block label="B" color="#FDE9E6" position={[1.9, 2.1, -1.6]} rotation={[0.3, 0.2, 0.2]} speed={0.85} scale={0.66} />

      <Star position={[-1.55, 2.35, -0.2]} scale={0.95} />
      <Star position={[3.1, -0.15, -1.2]} scale={0.66} />
      <Heart position={[-3.25, 0.35, -1.1]} scale={0.85} />
      <Heart position={[1.35, -2.35, -0.9]} scale={0.6} />

      {/* geometric shapes */}
      <Float speed={1.15} rotationIntensity={0.8} floatIntensity={1.2} position={[-1.05, -2.4, -0.7]}>
        <mesh>
          <torusGeometry args={[0.26, 0.1, 14, 32]} />
          <meshStandardMaterial color="#E12E1E" roughness={0.45} />
        </mesh>
      </Float>
      <Float speed={0.95} rotationIntensity={1} floatIntensity={1.1} position={[3.35, 1.95, -1.8]}>
        <mesh>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#FFD24A" roughness={0.4} />
        </mesh>
      </Float>
    </group>
  )
}
