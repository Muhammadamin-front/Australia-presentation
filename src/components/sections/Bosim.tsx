import { useEffect, useRef } from "react"
import { RateChart } from "@/components/charts"
import { CruxRule } from "@/components/Ornament"
import FlowField from "@/components/ui/flow-field"
import { WordRise } from "@/components/ui/word-rise"
import { PRESSURES, RATES } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { delay } from "@/lib/utils"

export function Bosim() {
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => (stageRef.current ? registerStage(stageRef.current) : undefined), [])

  return (
    <section id="bosim" aria-label="Iqtisodiy bosimlar">
      <div data-stop>
        <FlowField theme="outback" density="medium" className="h-svh min-h-[560px]">
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-[62%] w-[min(940px,94%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(7,29,44,0.92)_40%,rgba(7,29,44,0.6)_70%,transparent)]" />
            <WordRise as="h2" className="section-title text-foam" text="Iqtisodiy bosimlar" />
            <CruxRule className="mt-8 w-[min(420px,80%)]" tone="text-wattle-light" />
            <p className="lede mt-6 max-w-[46ch] !text-foam/85" data-rev style={delay(160)}>
              Qimmat uy-joy, yuqori foiz stavkasi, sekinlashgan unumdorlik va bitta yirik xaridorga bog‘liqlik.
            </p>
          </div>
        </FlowField>
      </div>

      {/* Whiteout (scroll-web.md): the price is buried in dune sand from the bottom up */}
      <div ref={stageRef} data-stop data-stops="0.04" className="stage h-[240svh]">
        <div className="stage__pin raked grid place-items-center">
          <div className="wrap-page text-center">
            <h2 className="whiteout engr mx-auto text-[clamp(2.6rem,10vw,8.6rem)] leading-[0.95] text-ocean-deep" aria-label="Uy narxi 942 ming Avstraliya dollari">
              <span className="block">Uy narxi</span>
              <span className="block text-uluru">942 000 A$</span>
            </h2>
            <p className="whiteout-caption mx-auto mt-10 max-w-[48ch] text-[clamp(1.1rem,1.4vw,1.3rem)] text-text">
              2026-yil may: mamlakat bo‘yicha o‘rtacha (mediana) uy-joy qiymati, bir yilda +8,8%. Sidneyda — 1,28 mln A$. Yosh oilalar uchun uy sotib olish tobora qiyinlashmoqda.
            </p>
          </div>
        </div>
      </div>

      <div data-stop className="slide bg-sand-2 py-20">
        <div className="wrap-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h3 className="section-title text-ocean-deep" data-rev>
              Stavka yuqoriga
            </h3>
            <p className="lede mt-6" data-rev style={delay(120)}>
              Inflyatsiya (trimmed mean 3,6%) maqsaddan baland qoldi. Zaxira banki 2026-yilda stavkani to‘rt marta oshirdi: kredit qimmatlashdi, uy narxi va iste’mol sekinlashishi kutilmoqda.
            </p>
          </div>
          <figure>
            <RateChart data={RATES} />
            <figcaption className="note mt-3">RBA naqd stavkasi, % · Reserve Bank of Australia qarorlari, 2026-yil</figcaption>
          </figure>
        </div>
      </div>

      <div data-stop className="slide raked py-20">
        <div className="wrap-page">
          <h3 className="section-title text-ocean-deep" data-rev>
            Uch xavf
          </h3>
          {/* A ledger of dated entries: date, entry, then the figure carried in the right margin */}
          <ol className="mt-10 border-t border-wattle">
            {PRESSURES.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-stone py-6 md:grid-cols-[8.5rem_minmax(0,1fr)_auto] md:items-baseline"
                data-rev
                style={delay(110 * i)}
              >
                <span className="tnum text-sm text-muted">{p.date}</span>
                <div>
                  <h4 className="engr text-[1.4rem] text-ocean-deep">{p.title}</h4>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-text">{p.text}</p>
                </div>
                <span className="text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none font-medium whitespace-nowrap text-ocean md:text-right">{p.figure}</span>
              </li>
            ))}
          </ol>
          <p className="note mt-8">Manbalar: ABS milliy hisoblari (2025); DFAT (2025); RBA (2026-yil sentabr); ABS ishchi kuchi (2026-yil avgust); Cotality (2026-yil may).</p>
        </div>
      </div>
    </section>
  )
}
