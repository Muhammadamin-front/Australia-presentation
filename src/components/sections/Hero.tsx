import { ArrowDown } from "lucide-react"
import { Crux, CruxRule, Mark } from "@/components/Ornament"
import { SkyPlate } from "@/components/ui/sky-plate"
import { HERO_READOUTS, PRESENTER } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { delay, wordIndex } from "@/lib/utils"

export function Hero() {
  return (
    <section id="kirish" data-stop aria-label="Kirish" className="relative min-h-[680px] bg-ocean-deep text-foam lg:h-svh">
      {/* Sydney Harbour at dusk under the Southern Cross: the pointer is a wind across the sky, a click sends a shooting star */}
      <SkyPlate
        src="/images/dusk.jpg"
        alt="Sidney opera teatri va Harbour Bridge qorong‘i tushayotgan paytda"
        className="absolute inset-0"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,29,44,0.55)_0%,rgba(7,29,44,0)_38%,rgba(7,29,44,0)_58%,rgba(7,29,44,0.88)_100%)]" />

      <div className="pointer-events-none relative z-10 flex h-full min-h-[680px] flex-col px-[clamp(1.25rem,4.5vw,4.5rem)] pt-20 pb-8 lg:pt-10">
        <CruxRule className="max-w-[26rem] text-wattle-light" />

        <h1 className="mt-8" data-words="">
          <span className="engr block text-[clamp(3.4rem,8vw,7.2rem)] text-foam">
            <span className="w" style={wordIndex(0)}>
              Avstraliya
            </span>
          </span>
          <span className="engr mt-1 block text-[clamp(1.6rem,3.2vw,2.9rem)] font-normal text-wattle-light">
            <span className="w" style={wordIndex(2)}>
              iqtisodiyoti
            </span>
          </span>
        </h1>

        <div className="mt-auto grid items-end gap-8 pt-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="max-w-[44ch] border-l-2 border-wattle-light bg-ocean-deep/80 px-5 py-4 text-[clamp(1.1rem,1.45vw,1.4rem)] leading-normal text-foam backdrop-blur-sm" data-rev style={delay(260)}>
              Temir rudasi, ko‘mir va xalqaro talabalar bilan boyigan qit’a-davlat — 30 yilga yaqin retsessiyasiz yashagan iqtisodiyot va u O‘zbekiston bilan qanday taqqoslanadi.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-5" data-rev style={delay(420)}>
              <button
                type="button"
                onClick={() => scrollToId("davlat")}
                className="group inline-flex h-14 items-center gap-4 bg-wattle-light pr-3 pl-7 text-ocean-deep outline-1 outline-offset-4 outline-wattle-light transition-[outline-offset,background-color] duration-500 hover:bg-foam hover:outline-offset-[7px] active:scale-[0.98]"
              >
                <span className="label tracking-[0.18em]">Taqdimotni boshlash</span>
                <span className="grid size-9 place-items-center border border-ocean-deep/40 transition-transform duration-500 group-hover:translate-y-0.5">
                  <ArrowDown className="size-4" strokeWidth={1.8} />
                </span>
              </button>
              <a
                href="#manbalar"
                onClick={(e) => (e.preventDefault(), scrollToId("manbalar"))}
                className="inline-flex h-14 items-center border border-foam/50 px-7 text-foam transition-colors duration-300 hover:border-foam hover:bg-foam/10"
              >
                <span className="label tracking-[0.18em]">Manbalar</span>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-foam/80" data-rev style={delay(600)}>
              <Mark className="size-8" light />
              <p className="text-sm">
                {PRESENTER.course} · 2026 · <span className="text-foam">{PRESENTER.name}</span>, {PRESENTER.group}
              </p>
            </div>
          </div>

          <dl className="frame frame--light pointer-events-auto hidden w-[17rem] bg-ocean-deep/80 p-5 backdrop-blur-sm sm:block" data-rev style={delay(700)}>
            <dt className="engr flex items-center gap-2 text-[1.15rem] text-foam">
              <Crux className="h-3 w-5 text-wattle-light" /> Davlat pasporti
            </dt>
            <div className="mt-2">
              {HERO_READOUTS.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-3 border-b border-foam/15 py-2 last:border-0">
                  <dt className="text-sm text-gum">{r.label}</dt>
                  <dd className="text-right">
                    <span className="text-lg font-medium text-foam">{r.value}</span>
                    <span className="block text-[0.72rem] leading-tight text-gum">{r.note}</span>
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
