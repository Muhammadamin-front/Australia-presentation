"use client"

/**
 * SkyPlate — the hero's live plate.
 *
 * Translation of the "Tubes" cursor hero (Hero animate.md) into the Australian
 * world: the pointer still steers the scene. Here it is a slow wind across the
 * southern sky — the star layers drift against it at different depths, stars
 * near the pointer flare, and the five stars of the Southern Cross (the ones on
 * the national flag) are joined by survey lines. A click sends a shooting star
 * across the sky and drops a ripple on the harbour. Light glints drift on the
 * water below the Opera House.
 *
 * Sky and water positions are measured on the photograph (1920 × 960) and
 * mapped through the same object-fit: cover maths the <img> uses, so the stars
 * stay in the sky at any panel size.
 */

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const IMG_W = 1920
const IMG_H = 960
/** The sky ends above the arch of the bridge; the water starts below the quay. */
const SKY_BOTTOM = 420
const WATER_TOP = 735

/** The Southern Cross in photo pixels: Gamma, Alpha, Delta, Beta, Epsilon. */
const CROSS = [
  { x: 1180, y: 82, r: 3.4 },
  { x: 1186, y: 262, r: 3.8 },
  { x: 1090, y: 168, r: 3.4 },
  { x: 1282, y: 150, r: 3.4 },
  { x: 1246, y: 208, r: 2.2 },
]
const LINES: [number, number][] = [
  [0, 1],
  [2, 3],
]

interface Star {
  x: number
  y: number
  r: number
  depth: number
  phase: number
  speed: number
}
interface Shooter {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}
interface Ring {
  x: number
  y: number
  r: number
  a: number
}
interface Glint {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

const rnd = (seed: number) => {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function SkyPlate({
  src,
  alt,
  posX = 0.5,
  posY = 0.5,
  className,
  children,
}: {
  src: string
  alt: string
  posX?: number
  posY?: number
  className?: string
  children?: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const svg = svgRef.current
    if (!host || !canvas || !svg) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    let s = 1
    let ox = 0
    let oy = 0
    let raf = 0
    let visible = false
    let px = 0
    let py = 0
    let tx = 0
    let ty = 0
    let hover = false
    let mx = -9999
    let my = -9999
    const start = performance.now()
    const r = rnd(21)
    const stars: Star[] = Array.from({ length: 280 }, () => ({
      x: r() * IMG_W,
      y: r() * SKY_BOTTOM,
      r: 0.5 + Math.pow(r(), 3) * 1.7,
      depth: 0.2 + r() * 0.8,
      phase: r() * 6.28,
      speed: 0.6 + r() * 1.8,
    }))
    const glints: Glint[] = Array.from({ length: 90 }, () => ({
      x: r() * IMG_W,
      y: WATER_TOP + r() * (IMG_H - WATER_TOP),
      r: 0.8 + r() * 2.2,
      phase: r() * 6.28,
      speed: 0.8 + r() * 2.2,
    }))
    const shooters: Shooter[] = []
    const rings: Ring[] = []

    const map = (qx: number, qy: number) => ({ x: ox + qx * s, y: oy + qy * s })

    const layout = () => {
      const b = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, b.width)
      h = Math.max(1, b.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s = Math.max(w / IMG_W, h / IMG_H)
      ox = (w - IMG_W * s) * posX
      oy = (h - IMG_H * s) * posY
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
      LINES.forEach(([a, b2], i) => {
        const line = svg.querySelector<SVGLineElement>(`[data-line="${i}"]`)
        const p1 = map(CROSS[a].x, CROSS[a].y)
        const p2 = map(CROSS[b2].x, CROSS[b2].y)
        line?.setAttribute("x1", String(p1.x))
        line?.setAttribute("y1", String(p1.y))
        line?.setAttribute("x2", String(p2.x))
        line?.setAttribute("y2", String(p2.y))
      })
    }

    const star = (x: number, y: number, rad: number, a: number, warm = false) => {
      ctx.fillStyle = warm ? `rgba(255, 226, 150, ${a})` : `rgba(251, 247, 238, ${a})`
      ctx.beginPath()
      ctx.arc(x, y, rad, 0, Math.PI * 2)
      ctx.fill()
    }

    const frame = (now: number) => {
      raf = 0
      const t = (now - start) / 1000
      px += (tx - px) * 0.05
      py += (ty - py) * 0.05
      ctx.clearRect(0, 0, w, h)

      // Far and near star layers drift against the pointer.
      for (const st of stars) {
        const q = map(st.x, st.y)
        const x = q.x - px * 26 * st.depth
        const y = q.y - py * 12 * st.depth
        let a = 0.35 + 0.4 * Math.sin(t * st.speed + st.phase) * 0.5 + 0.3
        let rad = st.r * Math.max(0.7, s)
        if (hover) {
          const d = Math.hypot(x - mx, y - my)
          if (d < 130) {
            const k = 1 - d / 130
            rad += k * 2.2
            a = Math.min(1, a + k * 0.7)
          }
        }
        star(x, y, rad, Math.min(1, a))
      }

      // The Southern Cross: brighter, haloed, joined by survey lines (SVG).
      CROSS.forEach((c, i) => {
        const q = map(c.x, c.y)
        const x = q.x - px * 10
        const y = q.y - py * 5
        const pulse = 0.8 + 0.2 * Math.sin(t * 1.6 + i)
        const rad = c.r * Math.max(1, s) * 1.5
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 7)
        g.addColorStop(0, `rgba(255, 226, 150, ${0.45 * pulse})`)
        g.addColorStop(1, "rgba(255, 226, 150, 0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, rad * 7, 0, Math.PI * 2)
        ctx.fill()
        star(x, y, rad, 1, true)
      })

      // Harbour glints.
      for (const gl of glints) {
        const q = map(gl.x, gl.y)
        const x = q.x + Math.sin(t * 0.4 + gl.phase) * 8 * s + px * 14
        const a = Math.max(0, Math.sin(t * gl.speed + gl.phase)) * 0.65
        ctx.fillStyle = `rgba(255, 214, 140, ${a})`
        ctx.fillRect(x, q.y, gl.r * 4 * s, Math.max(1, gl.r * 0.45))
      }

      // Shooting stars.
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i]
        sh.x += sh.vx
        sh.y += sh.vy
        sh.life++
        const a = 1 - sh.life / 46
        if (a <= 0) {
          shooters.splice(i, 1)
          continue
        }
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 9, sh.y - sh.vy * 9)
        grad.addColorStop(0, `rgba(255, 240, 200, ${a})`)
        grad.addColorStop(1, "rgba(255, 240, 200, 0)")
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.vx * 9, sh.y - sh.vy * 9)
        ctx.stroke()
      }

      // Ripples on the harbour.
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i]
        rg.r += 1.5
        rg.a *= 0.965
        if (rg.a < 0.02) {
          rings.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(240, 185, 58, ${rg.a})`
        ctx.lineWidth = 1.3
        ctx.beginPath()
        ctx.ellipse(rg.x, rg.y, rg.r, rg.r * 0.32, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (visible) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const b = host.getBoundingClientRect()
      mx = e.clientX - b.left
      my = e.clientY - b.top
      hover = true
      tx = (mx / b.width - 0.5) * 2
      ty = (my / b.height - 0.5) * 2
    }
    const onLeave = () => {
      hover = false
      tx = 0
      ty = 0
    }
    const onDown = (e: PointerEvent) => {
      const b = host.getBoundingClientRect()
      const x = e.clientX - b.left
      const y = e.clientY - b.top
      const sp = Math.max(6, 10 * Math.sqrt(s))
      shooters.push({ x: x + 220 * s, y: y - 100 * s, vx: -sp * 0.9, vy: sp * 0.42, life: 0 })
      rings.push({ x, y: Math.max(y, map(0, WATER_TOP).y + 20), r: 4, a: 0.9 })
    }

    const ro = new ResizeObserver(layout)
    ro.observe(host)
    layout()
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting && !reduce
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(host)
    if (reduce) frame(performance.now())
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("pointerdown", onDown)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
    }
  }, [posX, posY])

  const line = { stroke: "var(--color-wattle-light)", strokeWidth: 1.2, strokeOpacity: 0.8, strokeDasharray: "1", pathLength: 1 }
  return (
    <div ref={hostRef} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={IMG_W}
        height={IMG_H}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: `${posX * 100}% ${posY * 100}%` }}
      />
      {/* Survey lines joining the Cross: they draw themselves a moment after load */}
      <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {LINES.map((_, i) => (
          <line
            key={i}
            data-line={i}
            {...line}
            pathLength={1}
            style={{ strokeDashoffset: drawn ? 0 : 1, transition: `stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1) ${i * 400}ms` }}
          />
        ))}
      </svg>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full cursor-crosshair" />
      {children}
    </div>
  )
}
