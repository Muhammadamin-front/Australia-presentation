import { CruxRule } from "@/components/Ornament"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { WordRise } from "@/components/ui/word-rise"
import { FUTURE } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

export function Kelajak() {
  return (
    <section id="kelajak" aria-label="Kelajak">
      <AuroraBackground>
        <div data-stop className="slide wrap-page py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-ocean-deep" text="Qayerga qarab?" />
            <p className="lede" data-rev style={delay(120)}>
              Ko‘mir va gaz asri asta tugaydi. Kelajak — yangi energiya uchun minerallar, unumdorlikni oshirish va o‘sayotgan aholiga uy-joy.
            </p>
          </div>
          <CruxRule className="mt-6 max-w-lg" />

          <ul className="mt-6 grid gap-x-10 md:grid-cols-3">
            {FUTURE.map((f, i) => (
              <li key={f.title} className={cn("border-t border-wattle/70 py-6", i === 0 && "md:col-span-3")} data-rev style={delay(90 * i)}>
                {i === 0 ? (
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                    <div>
                      <h3 className="engr text-[clamp(1.7rem,2.7vw,2.5rem)] leading-tight text-ocean-deep">{f.title}</h3>
                      <p className="mt-3 max-w-[70ch] text-[1.1rem] leading-relaxed text-text">{f.text}</p>
                    </div>
                    <div className="frame p-[7px]">
                      <img src="/images/karijini.jpg" alt="Karijini milliy bog‘i, Pilbara: temirga boy qizil qatlamli jarlik" loading="lazy" className="aspect-[16/9] max-h-[28svh] w-full object-cover" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="engr text-[1.5rem] leading-tight text-ocean-deep">{f.title}</h3>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-text">{f.text}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className="note mt-4">Manbalar: Federal hukumat — kritik minerallar strategik zaxirasi (2025); RBA (2026-yil sentabr); ABS aholi (2026-yil mart).</p>
        </div>
      </AuroraBackground>
    </section>
  )
}
