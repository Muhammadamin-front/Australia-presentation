import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { CRUX, Corners, CruxRule, starPoints } from "@/components/Ornament"
import { PRESENTER } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { cn, delay, prefersReducedMotion } from "@/lib/utils"

/** The title sentence, split where its emphasis changes. */
const SEGMENTS: { text: string; className?: string }[] = [
  { text: `${PRESENTER.name}ning`, className: "font-medium text-foam" },
  { text: " " },
  { text: `«${PRESENTER.subject}»`, className: "text-wattle-light" },
  { text: " fanidan " },
  { text: "Avstraliya davlati", className: "text-foam" },
  { text: " uchun tayyorlagan animatsiyali taqdimoti" },
]
const TOTAL = SEGMENTS.reduce((n, s) => n + s.text.length, 0)
const START_MS = 1100
const CHAR_MS = 34

/**
 * Typewriter that restarts every time the cover comes back into view. Every
 * character is laid out from the first frame (untyped ones are transparent),
 * so the big type never reflows while it is being written.
 */
function useTypewriter<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setTyped(TOTAL)
      return
    }
    let timer = 0
    let tick = 0
    const run = () => {
      window.clearTimeout(timer)
      window.clearInterval(tick)
      setTyped(0)
      timer = window.setTimeout(() => {
        let n = 0
        tick = window.setInterval(() => {
          n += 1
          setTyped(n)
          if (n >= TOTAL) window.clearInterval(tick)
        }, CHAR_MS)
      }, START_MS)
    }
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && run(), { threshold: 0.6 })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      window.clearInterval(tick)
    }
  }, [])

  return { ref, typed, done: typed >= TOTAL }
}

/** A faint night sky: seeded pinpoints that twinkle out of step. */
function StarField() {
  const stars = useMemo(() => {
    let a = 41
    const r = () => ((a = (a * 1664525 + 1013904223) % 4294967296), a / 4294967296)
    return Array.from({ length: 70 }, () => ({ x: r() * 100, y: r() * 100, s: 1 + r() * 1.8, d: r() * 5, t: 2.5 + r() * 3 }))
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {stars.map((s, i) => (
        <span
          key={i}
          className="cover-twinkle absolute rounded-full bg-foam"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }}
        />
      ))}
    </div>
  )
}

/** The Southern Cross rising: each star lights in turn, then the cross is ruled between them. */
function SouthernCross({ className }: { className?: string }) {
  const [gamma, alpha, delta, beta] = CRUX
  return (
    <svg viewBox="0 0 40 25" aria-hidden="true" className={cn("overflow-visible", className)}>
      <path className="cover-draw" style={{ animationDelay: "1.6s" }} d={`M${gamma.x} ${gamma.y} L${alpha.x} ${alpha.y}`} stroke="var(--color-wattle-light)" strokeWidth="0.12" strokeOpacity="0.55" pathLength={1} />
      <path className="cover-draw" style={{ animationDelay: "2s" }} d={`M${delta.x} ${delta.y} L${beta.x} ${beta.y}`} stroke="var(--color-wattle-light)" strokeWidth="0.12" strokeOpacity="0.55" pathLength={1} />
      {CRUX.map((s, i) => (
        <polygon
          key={i}
          className="cover-star"
          style={{ animationDelay: `${0.3 + i * 0.25}s`, transformOrigin: `${s.x}px ${s.y}px` }}
          points={starPoints(s.n, s.x, s.y, s.R, s.R * 0.45)}
          fill="var(--color-wattle-light)"
        />
      ))}
    </svg>
  )
}

export function Cover() {
  const { ref, typed, done } = useTypewriter<HTMLElement>()
  let left = typed

  return (
    <section ref={ref} id="muqova" data-stop aria-label="Muqova" className="relative isolate h-svh min-h-[680px] overflow-hidden bg-ocean-deep text-gum max-md:h-auto max-md:min-h-svh">
      <StarField />
      <SouthernCross className="pointer-events-none absolute top-1/2 right-[6%] -z-10 h-[min(44vh,22vw)] -translate-y-1/2 max-lg:hidden" />

      <div className="relative m-[clamp(0.75rem,2vw,1.5rem)] flex h-[calc(100%-2*clamp(0.75rem,2vw,1.5rem))] flex-col border border-wattle/40 px-[clamp(1.25rem,4.5vw,4.5rem)] pt-12 pb-10">
        <Corners className="text-wattle-light/70" />

        <div className="text-center" data-rev>
          <p className="text-[clamp(1.05rem,1.8vw,1.7rem)] leading-tight font-semibold tracking-[0.14em] text-foam uppercase">{PRESENTER.university}</p>
          <p className="mt-2 text-[clamp(1rem,1.5vw,1.4rem)] text-gum">{PRESENTER.faculty}</p>
          <CruxRule className="mx-auto mt-5 max-w-[22rem]" tone="text-wattle-light" />
        </div>

        <div className="my-auto w-full py-10 lg:max-w-[66%]">
          <p className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.5rem)] text-gum" data-rev style={delay(250)}>
            <span aria-hidden="true" className="h-px w-10 bg-wattle-light" />
            {PRESENTER.group} talabasi
          </p>

          <h1 className="mt-5 text-[clamp(2.1rem,4.1vw,4.5rem)] leading-[1.08] font-light tracking-[-0.02em] text-gum" aria-label={SEGMENTS.map((s) => s.text).join("")}>
            <span aria-hidden="true">
              {SEGMENTS.map((s, i) => {
                const shown = Math.max(0, Math.min(s.text.length, left))
                // The caret sits in the one segment that is still being written.
                const caretHere = !done && left >= 0 && left < s.text.length
                left -= s.text.length
                return (
                  <span key={i} className={s.className}>
                    {s.text.slice(0, shown)}
                    {caretHere && <span className="cover-caret" />}
                    <span className="text-transparent">{s.text.slice(shown)}</span>
                  </span>
                )
              })}
              {done && <span className="cover-caret cover-caret--idle" />}
            </span>
          </h1>
        </div>

        <div className={cn("flex flex-wrap items-end justify-between gap-6 transition-opacity duration-1000", done ? "opacity-100" : "opacity-0")}>
          <p className="text-[clamp(1rem,1.4vw,1.3rem)] text-gum">Farg‘ona · 2026</p>
          <button
            type="button"
            onClick={() => scrollToId("kirish")}
            className="group inline-flex h-14 items-center gap-4 bg-wattle-light pr-3 pl-7 text-ocean-deep outline-1 outline-offset-4 outline-wattle-light transition-[outline-offset] duration-500 hover:outline-offset-[7px]"
          >
            <span className="label tracking-[0.18em]">Taqdimotni boshlash</span>
            <span className="grid size-9 place-items-center border border-ocean-deep/40">
              <ArrowDown className="size-4 motion-safe:animate-bounce" strokeWidth={1.6} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
