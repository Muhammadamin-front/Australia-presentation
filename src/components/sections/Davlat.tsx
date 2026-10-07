import { Corners, CruxRule } from "@/components/Ornament"
import { ParallaxComponent } from "@/components/ui/parallax-scrolling"
import { WordRise } from "@/components/ui/word-rise"
import { STATE_FACTS, TWO_AUSTRALIAS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Davlat() {
  return (
    <section id="davlat" aria-label="Davlat" className="raked">
      <div data-stop>
        <ParallaxComponent
          image="/images/uluru.jpg"
          width={1920}
          height={1280}
          position="50% 60%"
          alt="Uluru qoyasi quyosh botishida, Markaziy Avstraliya"
          title={
            <span className="flex flex-col items-center max-md:bg-foam/85 max-md:px-4 max-md:py-3">
              <span className="engr text-[clamp(2.4rem,6.4vw,5.8rem)] text-ocean-deep">Commonwealth of Australia</span>
              <span className="mt-3 text-[clamp(1.05rem,1.6vw,1.45rem)] font-medium text-ocean-deep">Bitta davlat — bitta qit’a: maydoni O‘zbekistondan 17 marta katta</span>
            </span>
          }
        />
      </div>

      <div data-stop className="slide wrap-page grid gap-x-20 gap-y-14 py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <WordRise as="h2" className="section-title text-ocean-deep" text="Katta yer, oz aholi" />
          <p className="lede mt-8" data-rev style={delay(120)}>
            Avstraliyaning aholisi O‘zbekistondan oz, ammo maydoni deyarli 17 baravar katta. Aholining aksari sohil bo‘yidagi shaharlarda yashaydi, ichki cho‘l — «outback» esa ma’danlar o‘lkasi.
          </p>
          <p className="mt-10 max-w-[30ch] text-[clamp(1.45rem,2.3vw,2.1rem)] leading-snug text-ocean-deep" data-rev style={delay(240)}>
            Iqtisodiyoti ikki ustunga tayanadi: yer ostidagi boylik va yuqori sifatli xizmatlar.
          </p>
        </div>

        <dl className="self-end border-t border-wattle">
          {STATE_FACTS.map((f, i) => (
            <div key={f.label} className="grid items-baseline gap-2 border-b border-stone py-5 sm:grid-cols-[minmax(9.5rem,auto)_1fr] sm:gap-6" data-rev style={delay(80 * i)}>
              <dt className="engr text-[clamp(1.6rem,2.4vw,2.2rem)] text-ocean">{f.value}</dt>
              <dd className="text-text">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Two Australias: the mining frontier and the service coast */}
      <div data-stop className="slide bg-sand-2 py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-ocean-deep" text="Ikki xil Avstraliya" />
            <p className="lede" data-rev style={delay(120)}>
              Iqtisodni tushunish uchun ikkisini ajratish kerak: biri — chekkadagi konlar va portlar, ikkinchisi — sohildagi katta shaharlar.
            </p>
          </div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2 md:gap-14">
            <span aria-hidden="true" className="axis-rule absolute inset-y-6 left-1/2 hidden w-px bg-wattle md:block" />
            {TWO_AUSTRALIAS.map((v, i) => (
              <article key={v.name} className="frame relative bg-sand p-8 md:p-10" data-rev style={delay(140 * i)}>
                <Corners />
                <h3 className="engr text-[clamp(1.4rem,2vw,1.9rem)] text-ocean-deep">{v.name}</h3>
                <p className="latin mt-1 text-muted">{v.gloss}</p>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-text">{v.text}</p>
                <CruxRule className="mt-7 mb-4" />
                <p className="text-[clamp(2rem,3vw,2.8rem)] leading-none font-medium text-ocean">{v.figure}</p>
                <p className="note mt-2">{v.note}</p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
