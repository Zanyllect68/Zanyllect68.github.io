'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function webglSupported(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function FallbackBlueprint() {
  const dots = [
    { left: '13%', top: '14%' },
    { left: '29%', top: '24%' },
    { left: '51%', top: '11%' },
    { left: '72%', top: '32%' },
    { left: '86%', top: '52%' },
    { left: '18%', top: '37%' },
    { left: '39%', top: '56%' },
    { left: '60%', top: '73%' },
    { left: '80%', top: '82%' },
    { left: '24%', top: '85%' },
    { left: '11%', top: '57%' },
    { left: '45%', top: '22%' },
    { left: '66%', top: '14%' },
    { left: '88%', top: '37%' },
    { left: '32%', top: '32%' },
    { left: '55%', top: '52%' },
    { left: '77%', top: '67%' },
    { left: '17%', top: '10%' },
    { left: '84%', top: '15%' },
    { left: '47%', top: '82%' },
  ]
  return (
    <div className="absolute inset-0 grid-bg">
      <div
        aria-hidden
        className="absolute left-[10%] top-[75%] h-[25%] w-[55%] border-2 border-foreground"
        style={{ transform: 'rotate(8deg)' }}
      />
      <div aria-hidden className="absolute left-[30%] top-[35%] h-[22%] w-[40%] border-2 border-foreground/40" />
      <div aria-hidden className="absolute left-[55%] top-[15%] h-[20%] w-[32%] border-2 border-foreground/40" />
      <div
        aria-hidden
        className="absolute inset-x-[15%] top-[68%] h-px bg-foreground"
        style={{
          transform: 'rotate(8deg)',
          backgroundImage:
            'repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 10px)',
        }}
      />
      <div
        aria-hidden
        className="absolute left-[48%] top-[45%] size-3 rotate-45 bg-accent"
      />
      <div
        aria-hidden
        className="absolute left-[70%] top-[25%] size-2.5 rotate-45 bg-accent"
      />
      <div
        aria-hidden
        className="absolute left-[27%] top-[60%] size-2.5 rotate-45 border-2 border-foreground"
      />
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute size-1.5 rounded-full bg-foreground/50"
          style={d}
        />
      ))}
    </div>
  )
}

export function HeroScene({
  variant = 'interactive',
}: {
  variant?: 'interactive' | 'background'
}) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isBackground = variant === 'background'

    if (!webglSupported()) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointerFine = window.matchMedia('(pointer: fine)').matches

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 7

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const mouse = new THREE.Vector2(0, 0)
    const group = new THREE.Group()
    scene.add(group)

    // Drag state
    let dragging = false
    let lastX = 0
    let lastY = 0
    const velX = { v: 0 }
    const velY = { v: 0 }
    const autoY = { v: 0 }

    // Burst particles
    const burstCount = 120
    const burstPositions = new Float32Array(burstCount * 3)
    const burstVel = new Float32Array(burstCount * 3)
    const burstGeo = new THREE.BufferGeometry()
    burstGeo.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3))
    const burstMat = new THREE.PointsMaterial({
      color: 0xffd600,
      size: 0.06,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    })
    const burst = new THREE.Points(burstGeo, burstMat)
    burst.visible = false
    scene.add(burst)
    let burstLife = 0

    const particleCount = 900
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const yellow = new THREE.Color('#FFD600')
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      const c = Math.random() > 0.82 ? yellow : white
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    group.add(particles)

    const boxMat = new THREE.LineBasicMaterial({ color: 0xffd600, transparent: true, opacity: 0.28 })
    const boxGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1))
    const boxes: THREE.LineSegments[] = []
    const boxPositions = [
      [2.6, 1.4, -1.5],
      [-2.4, 1.8, -2],
      [2.2, -1.7, -2.5],
      [-2.8, -1.3, -0.5],
      [0.4, 2.3, -2.8],
      [3.1, -0.4, -3],
    ]
    for (const pos of boxPositions) {
      const box = new THREE.LineSegments(boxGeo, boxMat.clone())
      box.position.set(pos[0], pos[1], pos[2])
      const s = 0.7 + Math.random() * 0.9
      box.scale.set(s, s, s)
      group.add(box)
      boxes.push(box)
    }

    const sphereGeo = new THREE.SphereGeometry(1.6, 20, 20)
    const sphere = new THREE.LineSegments(
      sphereGeo,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 }),
    )
    sphere.position.set(0, 0, -2)
    group.add(sphere)

    const lineGeo = new THREE.BufferGeometry()
    const linePos = new Float32Array(2 * 3)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffd600, transparent: true, opacity: 0.12 })
    const line = new THREE.Line(lineGeo, lineMat)
    group.add(line)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w === 0 || h === 0) return
      renderer!.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    const ro = new ResizeObserver(() => resize())
    ro.observe(mount)

    const raf = { id: 0 }
    const timer = new THREE.Timer()

    const animate = () => {
      timer.update()
      const t = timer.getElapsed()

      // Auto-rotation + inertia from drag
      autoY.v = autoY.v * 0.999
      group.rotation.y += 0.003 + autoY.v
      velY.v *= 0.96
      velX.v *= 0.96
      group.rotation.x += velX.v
      group.rotation.x = THREE.MathUtils.clamp(group.rotation.x, -1.2, 1.2)

      // Burst animation
      if (burst.visible) {
        burstLife += 1
        burst.rotation.y = -group.rotation.y
        const bPos = burstGeo.getAttribute('position') as THREE.BufferAttribute
        const bArr = bPos.array as Float32Array
        for (let i = 0; i < burstCount; i++) {
          bArr[i * 3] += burstVel[i * 3]
          bArr[i * 3 + 1] += burstVel[i * 3 + 1]
          bArr[i * 3 + 2] += burstVel[i * 3 + 2]
        }
        burstMat.opacity = Math.max(0, 1 - burstLife / 60)
        bPos.needsUpdate = true
        if (burstLife > 60) {
          burst.visible = false
          burstMat.opacity = 0
          burstLife = 0
        }
      }

      particles.rotation.y = t * 0.03
      particles.rotation.x = Math.sin(t * 0.08) * 0.12
      sphere.rotation.y = t * 0.12
      sphere.rotation.x = t * 0.05
      boxes.forEach((box, i) => {
        box.rotation.x = t * 0.15 * (i % 2 === 0 ? 1 : -1)
        box.rotation.y = t * 0.2 * (i % 2 === 0 ? 1 : -1)
      })

      const pAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute
      const arr = pAttr.array as Float32Array
      const idxA = Math.floor(Math.random() * particleCount) * 3
      const idxB = Math.floor(Math.random() * particleCount) * 3
      const la = lineGeo.getAttribute('position') as THREE.BufferAttribute
      ;(la.array as Float32Array).set([
        arr[idxA],
        arr[idxA + 1],
        arr[idxA + 2],
        arr[idxB],
        arr[idxB + 1],
        arr[idxB + 2],
      ])
      la.needsUpdate = true
      line.material.opacity = 0.08 + Math.sin(t * 2) * 0.04

      if (!prefersReduced) {
        camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03
        camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.03
        camera.lookAt(0, 0, -1)
      }

      renderer!.render(scene, camera)
      raf.id = requestAnimationFrame(animate)
    }
    animate()

    const spawnBurst = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect()
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1
      const v = new THREE.Vector3(nx, ny, 0).unproject(camera).sub(camera.position).normalize()
      const origin = new THREE.Vector3().addVectors(camera.position, v.clone().multiplyScalar(4))
      const bPos = burstGeo.getAttribute('position') as THREE.BufferAttribute
      const bArr = bPos.array as Float32Array
      for (let i = 0; i < burstCount; i++) {
        bArr[i * 3] = origin.x + (Math.random() - 0.5) * 0.4
        bArr[i * 3 + 1] = origin.y + (Math.random() - 0.5) * 0.4
        bArr[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.4
        burstVel[i * 3] = (Math.random() - 0.5) * 0.12
        burstVel[i * 3 + 1] = (Math.random() - 0.5) * 0.12
        burstVel[i * 3 + 2] = (Math.random() - 0.5) * 0.12
      }
      bPos.needsUpdate = true
      burst.visible = true
      burstMat.opacity = 1
      burstLife = 0
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!pointerFine) return
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      mount.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      velY.v = dx * 0.004
      velX.v = dy * 0.004
      autoY.v += dx * 0.004
      group.rotation.y += dx * 0.01
      group.rotation.x += dy * 0.01
      group.rotation.x = THREE.MathUtils.clamp(group.rotation.x, -1.2, 1.2)
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      if (Math.abs(e.clientX - lastX) < 4 && Math.abs(e.clientY - lastY) < 4) {
        spawnBurst(e.clientX, e.clientY)
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    if (pointerFine && !prefersReduced) {
      if (!isBackground) {
        window.addEventListener('mousemove', onMove)
        mount.addEventListener('pointerdown', onPointerDown)
        mount.addEventListener('pointermove', onPointerMove)
        mount.addEventListener('pointerup', onPointerUp)
      }
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf.id)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      ro.disconnect()
      if (pointerFine && !prefersReduced && !isBackground) {
        mount.removeEventListener('pointerdown', onPointerDown)
        mount.removeEventListener('pointermove', onPointerMove)
        mount.removeEventListener('pointerup', onPointerUp)
      }
      particleGeo.dispose()
      particleMat.dispose()
      boxGeo.dispose()
      sphereGeo.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      burstGeo.dispose()
      burstMat.dispose()
      boxes.forEach((b) => (b.material as THREE.Material).dispose())
      renderer!.dispose()
      if (renderer!.domElement.parentNode === mount) mount.removeChild(renderer!.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={
        variant === 'background'
          ? 'pointer-events-none absolute inset-0'
          : 'absolute inset-0 cursor-grab active:cursor-grabbing'
      }
      aria-label={
        variant === 'background'
          ? 'Animación de fondo'
          : 'Escena 3D interactiva — arrastra para rotar, haz clic para liberar partículas'
      }
    >
      <FallbackBlueprint />
    </div>
  )
}
