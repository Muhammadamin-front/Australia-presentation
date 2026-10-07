"use client"

/**
 * One-scale descent: Australia → Uzbekistan → Sydney beside Tashkent, all drawn
 * in the same equal-area kilometre space (lib/geo.ts). The pinned stage's
 * progress drives the SVG viewBox on a logarithmic zoom, written straight to
 * the DOM so the scrub never re-renders React. A cartographic scale bar
 * re-labels itself as the view descends three orders of magnitude.
 */

import { useEffect, useRef, useState } from "react"
import { AU_BOX, AU_PATH, SYDNEY, SYDNEY_R, TASHKENT, TASHKENT_R, UZ_BOX, UZ_PATH, UZ_TASHKENT } from "@/lib/geo"
import { registerStage } from "@/lib/scroll"
import { clamp, cn } from "@/lib/utils"

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const C0 = { x: AU_BOX.x + AU_BOX.w / 2, y: AU_BOX.y + AU_BOX.h / 2 }
const W0 = AU_BOX.w * 1.12
const C1 = { x: UZ_BOX.x + UZ_BOX.w / 2, y: UZ_BOX.y + UZ_BOX.h / 2 }
const W1 = UZ_BOX.w * 1.3
const C2 = { x: (SYDNEY.x + TASHKENT.x) / 2, y: (SYDNEY.y + TASHKENT.y) / 2 }
const W2 = SYDNEY_R * 2 * 3.1

type V = { x: number; y: number; w: number }

/** Zoom from one view to another: width on a log scale, centre eased with it so the focus stays under the eye. */
function fly(a: V, b: V, t: number): V {
  const w = Math.exp(lerp(Math.log(a.w), Math.log(b.w), t))
  const k = Math.abs(a.w - b.w) < 1e-6 ? t : (1 - w / a.w) / (1 - b.w / a.w)
  return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), w }
}

const V0: V = { ...C0, w: W0 }
const V1: V = { ...C1, w: W1 }
const V2: V = { ...C2, w: W2 }

/** Progress → view. Holds at each level so the presenter can talk. */
function view(p: number): V {
  const a = ease(clamp((p - 0.16) / 0.3))
  const b = ease(clamp((p - 0.6) / 0.3))
  return b > 0 ? fly(V1, V2, b) : fly(V0, V1, a)
}

function niceKm(km: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(km)))
  const n = km / pow
  const step = n >= 5 ? 5 : n >= 2 ? 2 : 1
  return step * pow
}

export const SCALE_STOPS_AT = "0.08,0.5,0.95"

export function ScaleZoom({ stageRef, onLevel }: { stageRef: React.RefObject<HTMLElement | null>; onLevel?: (i: number) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const barLabel = useRef<HTMLSpanElement>(null)
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const stage = stageRef.current
    const svg = svgRef.current
    if (!stage || !svg) return
    let lastLevel = -1
    const apply = (p: number) => {
      const v = view(p)
      const r = svg.getBoundingClientRect()
      const aspect = r.height / Math.max(1, r.width)
      const h = v.w * aspect
      svg.setAttribute("viewBox", `${v.x - v.w / 2} ${v.y - h / 2} ${v.w} ${h}`)
      // Scale bar: about 140 px of screen, rounded to a cartographer's length.
      const kmPerPx = v.w / Math.max(1, r.width)
      const km = niceKm(kmPerPx * 140)
      if (barRef.current) barRef.current.style.width = `${km / kmPerPx}px`
      if (barLabel.current) barLabel.current.textContent = km >= 1 ? `${km.toLocaleString("ru-RU")} km` : `${Math.round(km * 1000)} m`
      const lv = p < 0.33 ? 0 : p < 0.75 ? 1 : 2
      if (lv !== lastLevel) {
        lastLevel = lv
        setLevel(lv)
        onLevel?.(lv)
      }
    }
    const off = registerStage(stage, apply)
    const ro = new ResizeObserver(() => apply(Number(stage.style.getPropertyValue("--p")) || 0))
    ro.observe(svg)
    return () => {
      off()
      ro.disconnect()
    }
  }, [stageRef, onLevel])

  return (
    <div className="relative h-full w-full">
      <svg ref={svgRef} role="img" aria-label="Avstraliya, O‘zbekiston, Sidney va Toshkent bir xil masshtabda" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <path d={AU_PATH} fill="rgba(23,80,109,0.10)" stroke="var(--color-ocean-mid)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <path d={UZ_PATH} fill="rgba(178,58,26,0.16)" stroke="var(--color-uluru)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <circle
          cx={UZ_TASHKENT.x}
          cy={UZ_TASHKENT.y}
          r={UZ_BOX.w / 150}
          fill="var(--color-uluru)"
          className={cn("transition-opacity duration-500", level === 1 ? "opacity-100" : "opacity-0")}
        />
        <circle
          cx={SYDNEY.x}
          cy={SYDNEY.y}
          r={SYDNEY_R}
          fill="rgba(13,49,72,0.22)"
          stroke="var(--color-ocean)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          className={cn("transition-opacity duration-700", level >= 1 ? "opacity-100" : "opacity-0")}
        />
        <circle
          cx={TASHKENT.x}
          cy={TASHKENT.y}
          r={TASHKENT_R}
          fill="var(--color-uluru)"
          stroke="var(--color-wattle)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          className={cn("transition-opacity duration-700", level >= 1 ? "opacity-100" : "opacity-0")}
        />
        <text x={SYDNEY.x} y={SYDNEY.y - SYDNEY_R - 8} textAnchor="middle" className={cn("fill-ocean-deep text-[14px] font-medium transition-opacity duration-700", level === 2 ? "opacity-100" : "opacity-0")} style={{ fontSize: SYDNEY_R * 0.24 }}>
          Sidney
        </text>
        <text x={TASHKENT.x} y={TASHKENT.y - TASHKENT_R - 6} textAnchor="middle" className={cn("fill-uluru font-medium transition-opacity duration-700", level === 2 ? "opacity-100" : "opacity-0")} style={{ fontSize: SYDNEY_R * 0.24 }}>
          Toshkent
        </text>
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-1.5 text-ocean-deep">
        <span ref={barLabel} className="tnum text-sm font-medium">
          1 000 km
        </span>
        <div ref={barRef} className="h-2 border-x border-b border-ocean-deep" style={{ width: 140 }} />
      </div>
    </div>
  )
}
