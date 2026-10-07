import { ExportBar } from "@/components/charts"
import { Crux } from "@/components/Ornament"
import CardFlip from "@/components/ui/card-flip"
import { CountNumber } from "@/components/ui/count-number"
import { WordRise } from "@/components/ui/word-rise"
import { ENGINES, EXPORTS_2025, PILLARS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Eksport() {
  return (
    <section id="eksport" aria-label="Eksport" className="raked">
      <div data-stop className="slide wrap-page py-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr]">
          <WordRise as="h2" className="section-title text-ocean-deep" text="Pul qayerdan keladi?" />
          <p className="lede lg:justify-self-end" data-rev style={delay(120)}>
            2025-yilda Avstraliya ~665 mlrd A$ lik tovar va xizmat sotdi. Uchta qazilma — temir rudasi, ko‘mir va gaz — eksportning qariyb 37% ini beradi.
          </p>
        </div>

        <dl className="mt-10 grid gap-px border-y border-wattle bg-stone sm:grid-cols-3">
          {[
            { v: EXPORTS_2025.total, d: 0, s: " mlrd A$", p: "~", l: "Tovar va xizmatlar eksporti, 2025" },
            { v: EXPORTS_2025.iron, d: 0, s: " mlrd A$", p: "~", l: "Faqat temir rudasi (18,2%)" },
            { v: EXPORTS_2025.china, d: 1, s: " mlrd A$", l: "Xitoyga eksport — 29,4% (eng yirik xaridor)" },
          ].map((f, i) => (
            <div key={f.l} className="bg-sand py-6 sm:px-7 sm:first:pl-0" data-rev style={delay(90 * i)}>
              <dd className="text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none font-medium text-ocean">
                <CountNumber value={f.v} decimals={f.d} prefix={f.p} suffix={f.s} />
              </dd>
              <dt className="mt-3 text-text">{f.l}</dt>
            </div>
          ))}
        </dl>

        <figure className="mt-10">
          <ExportBar total={EXPORTS_2025.total} data={EXPORTS_2025.split} />
          <figcaption className="note mt-3">Eksport tarkibi (jami ~{EXPORTS_2025.total} mlrd A$) · DFAT, “Australia’s goods and services exports and imports”, 2025</figcaption>
        </figure>
      </div>

      <div data-stop className="slide bg-sand-2 py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-ocean-deep" text="To‘rt dvigatel" />
            <p className="lede" data-rev style={delay(120)}>
              Iqtisodiyotni to‘rtta manba harakatga keltiradi: ikkitasi — qazilma boyliklar, ikkitasi — ta’lim va jamg‘arma.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ENGINES.map((c, i) => (
              <div key={c.name} data-rev style={delay(90 * i)}>
                <CardFlip {...c} />
              </div>
            ))}
          </div>
          <p className="note mt-8">Manbalar: DFAT 2025; Department of Education (2025); APRA (2026-yil iyun).</p>
        </div>
      </div>

      <div data-stop className="slide on-ocean py-20">
        <div className="wrap-page">
          <WordRise as="h2" className="section-title max-w-[18ch] text-foam" text="Barqarorlik ustunlari" />
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {PILLARS.map((t, i) => (
              <div key={t.title} data-rev style={delay(120 * i)}>
                <div className="flex items-center gap-3 text-wattle-light">
                  <Crux className="h-5 w-8" />
                  <span className="axis-rule h-px flex-1 bg-wattle-light/50" style={delay(200 + 120 * i)} />
                </div>
                <h3 className="engr mt-5 text-[1.55rem] text-wattle-light">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-foam/90">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
