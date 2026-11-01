import { useEffect, useState } from "react"
import { BookOpen, Flag, History, Landmark, Mountain, Pickaxe, Scale, Sprout, Star as StarIcon, TrendingUp, type LucideIcon } from "lucide-react"
import { PRESENTER, SECTIONS, type SectionId } from "@/lib/data"
import { onScrollY, scrollToId, syncHash } from "@/lib/scroll"
import { cn, pad2 } from "@/lib/utils"
import { Mark, Star } from "./Ornament"

const ICONS: Record<SectionId, LucideIcon> = {
  muqova: BookOpen,
  kirish: StarIcon,
  davlat: Landmark,
  tarix: History,
  eksport: Pickaxe,
  tabiat: Mountain,
  bosim: TrendingUp,
  taqqoslash: Scale,
  kelajak: Sprout,
  xulosa: Flag,
}

function useActiveSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  useEffect(
    () =>
      onScrollY((y) => {
        const probe = y + window.innerHeight * 0.45
        let idx = 0
        SECTIONS.forEach((s, i) => {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top + y <= probe) idx = i
        })
        setActive(idx)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? y / max : 0)
      }),
    [],
  )
  useEffect(() => {
    if (window.scrollY > 4) syncHash(SECTIONS[active].id)
  }, [active])
  return { active, progress }
}

export function Rail() {
  const { active, progress } = useActiveSection()
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col bg-ocean text-foam lg:flex">
        <a
          href="#muqova"
          onClick={(e) => (e.preventDefault(), scrollToId("muqova"))}
          className="mx-4 mt-4 flex flex-col items-center gap-1.5 border-b border-wattle-light/30 px-2 pt-1 pb-4"
        >
          <Mark className="size-14" light />
          <span className="engr text-[1.25rem] text-foam">Avstraliya</span>
          <span className="latin -mt-1 text-sm text-gum">Commonwealth of Australia</span>
        </a>

        {/* The survey line: one wattle line runs through every stop; stops already passed have their star lit. */}
        <nav aria-label="Bo‘limlar" className="relative mx-4 flex-1 overflow-y-auto py-4">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-wattle-light/30" />
          <ul className="relative flex flex-col gap-0.5">
            {SECTIONS.map((s, i) => {
              const Icon = ICONS[s.id]
              const on = i === active
              const awake = i < active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(s.id)
                    }}
                    className={cn(
                      "group flex items-center gap-3 py-[3px] pr-2 pl-1.5 transition-colors duration-300",
                      on ? "text-wattle-light" : "text-foam/75 hover:text-foam",
                    )}
                  >
                    <span
                      className={cn(
                        "relative mt-1.5 grid size-8 shrink-0 place-items-center rounded-full border outline-1 -outline-offset-[5px] transition-[background-color,border-color,color,outline-color] duration-500",
                        on
                          ? "border-wattle-light bg-wattle-light text-ocean-deep outline-ocean-deep/40"
                          : awake
                            ? "border-wattle-light/70 bg-ocean-mid text-wattle-light outline-wattle-light/40"
                            : "border-wattle-light/35 bg-ocean text-gum outline-wattle-light/15 group-hover:border-wattle-light/70",
                      )}
                    >
                      <Icon className="size-[15px]" strokeWidth={1.6} />
                      {/* The star above each stop: dark before the presenter arrives, lit once passed, twinkling at the current stop */}
                      <Star
                        className={cn(
                          "absolute -top-3 left-1/2 h-3.5 w-3.5 origin-center -translate-x-1/2 text-wattle-light transition-[transform,opacity] duration-700",
                          on ? "rail-star scale-100 opacity-100" : awake ? "scale-75 opacity-70" : "scale-0 opacity-0",
                        )}
                      />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="label !tracking-[0.12em]">{s.label}</span>
                      <span className={cn("latin text-[0.78rem]", on ? "text-wattle-light/80" : "text-gum/80")}>{s.gloss}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mx-4 border-t border-wattle-light/30 py-4">
          <div className="flex items-baseline justify-between">
            <span className="label text-gum">Bo‘lim</span>
            <span className="engr text-[1rem] text-wattle-light">
              {pad2(active + 1)} <span className="text-gum">/ {pad2(SECTIONS.length)}</span>
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-wattle-light/25">
            <div className="h-px bg-wattle-light transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
          {PRESENTER.name && <p className="mt-4 text-sm text-foam">{PRESENTER.name}</p>}
          {PRESENTER.group && <p className="text-xs text-gum">{PRESENTER.group}</p>}
          <p className="mt-3 text-[0.78rem] leading-snug text-gum">
            <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> qadam · <kbd className="font-sans">F</kbd> to‘liq ekran · <kbd className="font-sans">?</kbd> yordam
          </p>
        </div>
      </aside>

      {/* Narrow screens: a slim ocean bar instead of the rail */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 bg-ocean px-4 text-foam lg:hidden">
        <Mark className="size-7" light />
        <span className="label">{SECTIONS[active].label}</span>
        <span className="engr ml-auto text-sm text-wattle-light">
          {pad2(active + 1)} / {pad2(SECTIONS.length)}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-px bg-wattle-light" style={{ width: `${progress * 100}%` }} />
      </header>
    </>
  )
}
