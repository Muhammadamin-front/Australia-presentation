import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { CruxRule, Mark } from "@/components/Ornament"
import { SplashButton } from "@/components/ui/splash-button"
import { TextRoll } from "@/components/ui/text-roll"
import { WordRise } from "@/components/ui/word-rise"
import { CONCLUSIONS, PHOTO_CREDITS, PRESENTER, SOURCES } from "@/lib/data"
import { scrollToY } from "@/lib/scroll"
import { delay, pad2 } from "@/lib/utils"

/** Replays the letter roll every time the thank-you comes into view. */
function useEntryCount<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setCount((c) => c + 1), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, count }
}

/** shader.md's PulsingBorder + rotating text ring, re-cut as a wattle-gold halo around the Southern Cross. */
function CrossRing() {
  return (
    <div className="relative grid size-44 place-items-center">
      <PulsingBorder
        colors={["#f0b93a", "#a9740c", "#fbf7ee", "#2f8f9d"]}
        colorBack="#00000000"
        speed={1}
        roundness={1}
        thickness={0.06}
        softness={0.3}
        intensity={0.45}
        spots={4}
        spotSize={0.12}
        pulse={0.1}
        smoke={0.35}
        smokeSize={3}
        style={{ width: 104, height: 104, borderRadius: "50%" }}
        className="absolute"
      />
      <Mark className="relative size-16" light />
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full animate-[spin_32s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="cross-ring" d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0" />
        </defs>
        <text className="fill-wattle-light text-[6.6px] tracking-[0.28em] uppercase" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          <textPath href="#cross-ring">Commonwealth of Australia · 2026 · Thank you ·</textPath>
        </text>
      </svg>
    </div>
  )
}

export function Finale() {
  const thanks = useEntryCount<HTMLDivElement>()

  return (
    <>
      <section id="xulosa" aria-label="Xulosa" className="relative isolate overflow-hidden bg-ocean text-foam">
        <MeshGradient className="absolute inset-0 -z-10 h-full w-full" colors={["#071d2c", "#0d3148", "#17506d", "#3a2a1c"]} distortion={0.8} swirl={0.2} speed={0.2} />

        <div data-stop className="slide wrap-page py-20">
          <WordRise as="h2" className="section-title text-foam" text="Xulosa" />
          <CruxRule className="mt-8 max-w-md" tone="text-wattle-light" />
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {CONCLUSIONS.map((c, i) => (
              <li key={i} className="border-t border-wattle-light/40 pt-6" data-rev style={delay(140 * i)}>
                <span className="engr text-[1.8rem] text-wattle-light">{pad2(i + 1)}</span>
                <p className="mt-3 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-foam">{c}</p>
              </li>
            ))}
          </ol>
        </div>

        <div ref={thanks.ref} data-stop className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-24 text-center">
          <img src="/images/parliament.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
          <CrossRing />
          <h2 className="engr mt-10 text-[clamp(4rem,10vw,6.4rem)] leading-none text-foam">
            {thanks.count > 0 ? <TextRoll key={thanks.count}>Rahmat!</TextRoll> : "Rahmat!"}
          </h2>
          <p className="latin mt-5 text-[clamp(1.2rem,1.7vw,1.6rem)] text-wattle-light">Thank you for listening</p>
          <p className="lede mt-4 !text-foam/85">E’tiboringiz uchun rahmat. Savollaringiz bo‘lsa — marhamat.</p>
          {PRESENTER.name && (
            <p className="mt-2 text-foam">
              {PRESENTER.name}
              {PRESENTER.group && <span className="text-gum"> · {PRESENTER.group}</span>}
            </p>
          )}
          <SplashButton className="mt-12" label="Boshiga qaytish" hoverLabel="Yana bir bor" onClick={() => scrollToY(0)} />
        </div>
      </section>

      <section id="manbalar" data-stop aria-label="Manbalar" className="slide raked py-20">
        <div className="wrap-page grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <h2 className="engr text-[2rem] text-ocean-deep">Manbalar</h2>
            <p className="note mt-3 max-w-[32ch]">Barcha raqamlar ochiq manbalardan olingan. «~» — yaxlitlangan yoki taxminiy qiymat.</p>
          </div>
          <div>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {SOURCES.map((s) => (
                <li key={s} className="border-b border-stone py-3 text-[0.95rem] text-text">
                  {s}
                </li>
              ))}
            </ul>
            <h3 className="label mt-10 text-muted">Suratlar — Wikimedia Commons</h3>
            <ul className="mt-2 grid gap-x-10 sm:grid-cols-2">
              {PHOTO_CREDITS.map((s) => (
                <li key={s} className="border-b border-stone/60 py-2 text-[0.85rem] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="wrap-page note mt-14">Sayt React, GSAP, Lenis, WebGL shader va canvas yulduzlari bilan qurilgan · 2026</p>
      </section>
    </>
  )
}
