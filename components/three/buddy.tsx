'use client'

import * as React from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'

const INK = '#2A2320'
const TEAL = '#E12E1E'
const CORAL = '#F9BFD6'
const YELLOW = '#FFD24A'

/** Five-point star, extruded — the buddy's antenna topper. */
function useStarGeometry() {
  return React.useMemo(() => {
    const shape = new THREE.Shape()
    const outer = 0.32
    const inner = 0.14
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outer : inner
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
    }
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      bevelSegments: 2,
    })
    geo.center()
    return geo
  }, [])
}

/** Backface-rendered shell — the 3D equivalent of the app's thick ink outline. */
function InkShell({ scale = 1.045, children }: { scale?: number; children: React.ReactNode }) {
  return (
    <group scale={scale}>
      <group>{children}</group>
    </group>
  )
}

function Eye({ x, blink }: { x: number; blink: React.RefObject<number> }) {
  const lid = React.useRef<THREE.Group>(null)
  useFrame(() => {
    if (lid.current) lid.current.scale.y = blink.current ?? 1
  })
  return (
    <group position={[x, 0.28, 0.72]}>
      <group ref={lid}>
        <mesh>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>
        {/* pupil */}
        <mesh position={[x > 0 ? 0.05 : 0.05, -0.03, 0.2]}>
          <sphereGeometry args={[0.115, 24, 24]} />
          <meshStandardMaterial color={INK} roughness={0.35} />
        </mesh>
        {/* glint */}
        <mesh position={[-0.07, 0.09, 0.24]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

export function Buddy({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const root = React.useRef<THREE.Group>(null)
  const head = React.useRef<THREE.Group>(null)
  const star = React.useRef<THREE.Mesh>(null)
  const arm = React.useRef<THREE.Group>(null)
  const blink = React.useRef(1)
  const starGeo = useStarGeometry()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = pointer.current ?? { x: 0, y: 0 }

    // idle bob
    if (root.current) {
      root.current.position.y = Math.sin(t * 1.35) * 0.075 - 0.1
      root.current.rotation.z = Math.sin(t * 0.9) * 0.022
    }

    // follow the cursor / device tilt, damped
    if (head.current) {
      head.current.rotation.y += (p.x * 0.34 - head.current.rotation.y) * Math.min(1, delta * 4)
      head.current.rotation.x += (p.y * 0.2 - head.current.rotation.x) * Math.min(1, delta * 4)
    }

    // spinning star
    if (star.current) star.current.rotation.y = t * 1.5

    // wave — a burst every ~5s, resting the rest of the time
    if (arm.current) {
      const cycle = t % 5
      arm.current.rotation.z = cycle < 1.7 ? -0.5 + Math.sin(cycle * 9) * 0.55 : -0.15
    }

    // blink — a quick squash on a slow cycle
    const bc = t % 5.5
    blink.current = bc > 5.3 && bc < 5.42 ? 0.08 : 1
  })

  return (
    <group ref={root} scale={1.06}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.25}>
        <group ref={head}>
          {/* body — squircle */}
          <InkShell>
            <RoundedBox args={[1.9, 1.72, 1.32]} radius={0.52} smoothness={6}>
              <meshStandardMaterial color={INK} side={THREE.BackSide} />
            </RoundedBox>
          </InkShell>
          <RoundedBox args={[1.9, 1.72, 1.32]} radius={0.52} smoothness={6}>
            <meshStandardMaterial color={TEAL} roughness={0.42} metalness={0.02} />
          </RoundedBox>

          {/* cheeks */}
          {[-0.62, 0.62].map((x) => (
            <mesh key={x} position={[x, -0.12, 0.63]} scale={[1, 0.62, 0.35]}>
              <sphereGeometry args={[0.19, 20, 20]} />
              <meshStandardMaterial color={CORAL} roughness={0.6} />
            </mesh>
          ))}

          <Eye x={-0.38} blink={blink} />
          <Eye x={0.38} blink={blink} />

          {/* smile */}
          <mesh position={[0, -0.32, 0.66]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.28, 0.045, 12, 40, Math.PI]} />
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>

          {/* antenna */}
          <mesh position={[0, 1.06, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.6, 12]} />
            <meshStandardMaterial color={INK} />
          </mesh>
          <mesh ref={star} geometry={starGeo} position={[0, 1.58, 0]}>
            <meshStandardMaterial color={YELLOW} roughness={0.3} metalness={0.15} />
          </mesh>
        </group>

        {/* left arm */}
        <group position={[-0.98, -0.1, 0.15]} rotation={[0, 0, 0.35]}>
          <mesh>
            <capsuleGeometry args={[0.11, 0.4, 6, 14]} />
            <meshStandardMaterial color={TEAL} roughness={0.45} />
          </mesh>
        </group>

        {/* right arm — waving */}
        <group ref={arm} position={[0.98, -0.05, 0.15]}>
          <mesh position={[0.12, 0.22, 0]}>
            <capsuleGeometry args={[0.11, 0.42, 6, 14]} />
            <meshStandardMaterial color={TEAL} roughness={0.45} />
          </mesh>
        </group>

        {/* feet */}
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} position={[x, -1.0, 0.24]} scale={[1.25, 0.6, 1]}>
            <sphereGeometry args={[0.26, 20, 20]} />
            <meshStandardMaterial color={TEAL} roughness={0.5} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}
