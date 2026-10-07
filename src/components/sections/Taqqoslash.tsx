import { useRef, useState } from "react"
import { Corners, Crux, CruxRule } from "@/components/Ornament"
import { SCALE_STOPS_AT, ScaleZoom } from "@/components/ui/scale-zoom"
import { WordRise } from "@/components/ui/word-rise"
import { COMPARE, COMPARE_LESSONS, SCALE_STOPS } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

function Country({ code, name, side }: { code: string; name: string; side: "au" | "uz" }) {
  return (
    <div className={cn("flex items-center gap-2 max-sm:flex-col sm:gap-4", side === "au" ? "sm:justify-end sm:text-right" : "max-sm:flex-col-reverse sm:justify-start")}>
      {side === "uz" && <img src={`/flags/${code}.svg`} alt="" width={48} height={48} className="size-12 rounded-full ring-1 ring-stone" />}
      <span className={cn("engr text-[clamp(1rem,2.3vw,2.1rem)]", side === "au" ? "text-ocean" : "text-uluru")}>{name}</span>
      {side === "au" && <img src={`/flags/${code}.svg`} alt="" width={48} height={48} className="size-12 rounded-full ring-1 ring-stone" />}
    </div>
  )
}

export function Taqqoslash() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [level, setLevel] = useState(0)

  return (
    <section id="taqqoslash" aria-label="Avstraliya va O‘zbekiston" className="raked">
      {/* One scale, three levels: from the continent to two cities */}
      <div ref={stageRef} data-stop data-stops={SCALE_STOPS_AT} className="stage h-[520svh]">
        <div className="stage__pin raked">
          <div className="wrap-page grid h-full gap-4 pt-16 pb-6 max-lg:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8 lg:pt-10 lg:pb-8">
            <div className="flex flex-col justify-center">
              <h2 className="section-title !text-[clamp(1.8rem,3.4vw,3.4rem)] text-ocean-deep">Bir masshtabda</h2>
              <p className="latin mt-2 text-[clamp(1.05rem,1.5vw,1.35rem)] text-muted">Avstraliya, O‘zbekiston, Sidney va Toshkent — bitta o‘lchovda</p>
              <ol className="mt-4 flex flex-col lg:mt-10">
                {SCALE_STOPS.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn(
                      "relative border-t border-stone py-4 transition-[opacity,padding] duration-700 last:border-b",
                      i === level ? "pl-5 opacity-100" : "opacity-40 max-lg:hidden",
                    )}
                  >
                    {i === level && <span aria-hidden="true" className={cn("absolute top-[1.55rem] left-0 size-2 rotate-45", i === 0 ? "bg-ocean" : "bg-uluru")} />}
                    <h3 className={cn("engr text-[1.45rem]", i === 0 ? "text-ocean" : "text-uluru")}>{s.title}</h3>
                    <p className="mt-1 text-[1.05rem] leading-relaxed text-text">{s.text}</p>
                  </li>
                ))}
              </ol>
              <p className="note mt-6 max-lg:hidden">Natural Earth. Teng maydonli (Lambert) proyeksiya; O‘zbekiston konturi maydonini saqlagan holda ko‘chirilgan.</p>
            </div>
            <div className="frame relative min-h-0 bg-foam/60 p-[9px] lg:min-h-[46svh]">
              <Corners />
              <ScaleZoom stageRef={stageRef} onLevel={setLevel} />
            </div>
          </div>
        </div>
      </div>

      {/* Two columns of one ledger: Australia on the left, Uzbekistan on the right, the topic on the axis */}
      <div data-stop className="slide py-12">
        <div className="wrap-page">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-wattle pb-5 md:gap-10">
            <Country code="au" name="Avstraliya" side="au" />
            <Crux className="h-6 w-10 text-wattle" />
            <Country code="uz" name="O‘zbekiston" side="uz" />
          </div>
          <table className="w-full border-collapse sm:table-fixed">
            <caption className="sr-only">Avstraliya va O‘zbekiston taqqoslanishi</caption>
            <thead className="sr-only">
              <tr>
                <th>Avstraliya</th>
                <th>Ko‘rsatkich</th>
                <th>O‘zbekiston</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r, i) => (
                <tr key={r.topic} className="border-b border-stone/70 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:py-2" data-rev style={delay(50 * i)}>
                  <td className="w-[38%] py-2.5 pr-2 text-right text-[clamp(1rem,1.3vw,1.2rem)] font-medium text-ocean max-sm:w-auto max-sm:py-1 sm:pr-4">{r.au}</td>
                  <th scope="row" className="relative w-[24%] px-1 py-2.5 text-center align-middle font-normal max-sm:order-first max-sm:col-span-2 max-sm:w-auto max-sm:py-1">
                    <span className="label block text-muted">{r.topic}</span>
                    {r.ratio && <span className="tnum mt-0.5 block text-[0.85rem] font-medium text-wattle">{r.ratio}</span>}
                  </th>
                  <td className="w-[38%] py-2.5 pl-2 text-[clamp(1rem,1.3vw,1.2rem)] font-medium text-uluru max-sm:w-auto max-sm:py-1 sm:pl-4">{r.uz}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note mt-6">
            Manbalar: ABS (aholi 2026-yil mart, YaIM o‘sishi 2025); XVF WEO (Avstraliya nominal YaIM, 2026 bahosi); O‘zbekiston Milliy statistika qo‘mitasi (YaIM 2025, aholi); Tourism Research Australia;
            O‘zbekiston Turizm qo‘mitasi (2025). Jon boshiga YaIM — YaIM ÷ aholi, taxminiy hisob; yillar har xil bo‘lgani uchun nisbatlar yaxlitlangan.
          </p>
        </div>
      </div>

      <div data-stop className="slide on-ocean py-20">
        <div className="wrap-page">
          <WordRise as="h2" className="section-title max-w-[20ch] text-foam" text="Taqqoslashdan saboq" />
          <CruxRule className="mt-8 max-w-md" tone="text-wattle-light" />
          {/* A ladder leading off the comparison: each lesson steps further along the survey line */}
          <ol className="relative mt-12 border-l border-wattle-light/40">
            {COMPARE_LESSONS.map((l, i) => (
              <li
                key={l.title}
                className="relative grid gap-x-10 gap-y-2 border-b border-wattle-light/20 py-7 pl-8 last:border-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
                style={{ marginLeft: `${i * 3}rem`, ...delay(140 * i) }}
                data-rev
              >
                <span aria-hidden="true" className="absolute top-9 -left-[5px] size-2.5 rotate-45 bg-wattle-light" />
                <h3 className="engr text-[clamp(1.3rem,2vw,1.75rem)] text-wattle-light">
                  <span className="mr-3 text-foam/60">0{i + 1}</span>
                  {l.title}
                </h3>
                <p className="max-w-[58ch] leading-relaxed text-foam/90">{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
