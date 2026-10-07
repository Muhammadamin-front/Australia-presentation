import { cn } from "@/lib/utils"

/** Points of an n-pointed star polygon, centred on (cx, cy). */
function starPoints(n: number, cx: number, cy: number, R: number, r: number) {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n - Math.PI / 2
    const rad = i % 2 === 0 ? R : r
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(2)},${(cy + Math.sin(a) * rad).toFixed(2)}`)
  }
  return pts.join(" ")
}

/** The Southern Cross as on the national flag: Alpha, Beta, Gamma, Delta (7 points) and little Epsilon (5). */
const CRUX = [
  { x: 20, y: 3.5, n: 7, R: 3.1 }, // Gamma (top)
  { x: 20, y: 21, n: 7, R: 3.5 }, // Alpha (bottom)
  { x: 10.5, y: 12.5, n: 7, R: 3.2 }, // Delta (left)
  { x: 30, y: 10, n: 7, R: 3.2 }, // Beta (right)
  { x: 26.5, y: 15.5, n: 5, R: 1.7 }, // Epsilon
]

/** The constellation as a small ornament: five stars, the way they sit on the flag. */
export function Crux({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 25" aria-hidden="true" className={cn("shrink-0", className)} fill="currentColor">
      {CRUX.map((s, i) => (
        <polygon key={i} points={starPoints(s.n, s.x, s.y, s.R, s.R * 0.45)} />
      ))}
    </svg>
  )
}

/** A survey rule that grows from its centre constellation outward (axial reveal). */
export function CruxRule({ className, tone = "text-wattle" }: { className?: string; tone?: string }) {
  return (
    <div className={cn("flex items-center gap-3", tone, className)} aria-hidden="true" data-rev>
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
      <Crux className="h-4 w-7" />
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
    </div>
  )
}

/** Four survey crop marks that finish a .frame, as on a cadastral map sheet. */
export function Corners({ className }: { className?: string }) {
  const corner = (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square">
      <path d="M2 16 V2 H16" />
      <path d="M7 7 m-2 0 h4 M7 5 v4" strokeWidth="1" />
    </svg>
  )
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-[3px] text-wattle", className)}>
      <span className="absolute top-0 left-0">{corner}</span>
      <span className="absolute top-0 right-0 rotate-90">{corner}</span>
      <span className="absolute right-0 bottom-0 rotate-180">{corner}</span>
      <span className="absolute bottom-0 left-0 -rotate-90">{corner}</span>
    </div>
  )
}

/** One lone star (the Commonwealth Star's seven points) — used as the rail's twinkle and list diamonds. */
export function Star({ className, points = 7 }: { className?: string; points?: number }) {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true" className={cn("shrink-0", className)} fill="currentColor">
      <polygon points={starPoints(points, 0, 0, 9, 4.4)} />
    </svg>
  )
}

/** The mark: the Southern Cross on a deep-water roundel. */
export function Mark({ className, light = false }: { className?: string; light?: boolean }) {
  const fg = light ? "var(--color-wattle-light)" : "var(--color-wattle)"
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="32" cy="32" r="29" fill="none" stroke={fg} strokeWidth="1.4" opacity="0.7" />
      <circle cx="32" cy="32" r="25" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
      <g transform="translate(9 14) scale(1.15)" fill={fg}>
        {CRUX.map((s, i) => (
          <polygon key={i} points={starPoints(s.n, s.x, s.y, s.R, s.R * 0.45)} />
        ))}
      </g>
      <path d="M12 52 q5 -3 10 0 t10 0 t10 0 t10 0" fill="none" stroke={fg} strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}
