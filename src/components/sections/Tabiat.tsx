import { CountNumber } from "@/components/ui/count-number"
import { CoverFlow } from "@/components/ui/coverflow"
import { WordRise } from "@/components/ui/word-rise"
import { WONDER_ITEMS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Tabiat() {
  return (
    <section id="tabiat" aria-label="Tabiat va sayyohlik" className="bg-ocean-deep text-foam">
      <div data-stop className="slide wrap-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <WordRise as="h2" className="section-title text-foam !text-[clamp(2.1rem,3.8vw,3.6rem)]" text="Yer — eng katta boylik" />
          <p className="lede !text-foam/85" data-rev style={delay(120)}>
            Bir xil yer ikki xil daromad beradi: ostidan — ruda va gaz, ustidan — sayyohlar ko‘rgani keladigan rif, qoya va sohillar.
          </p>
        </div>
        <div className="mt-7" data-rev style={delay(200)}>
          <CoverFlow items={WONDER_ITEMS} className="frame frame--light" />
        </div>
      </div>

      <div data-stop className="slide wrap-page py-20">
        {/* Tourism's economics set as the sum it is */}
        <div className="grid items-end gap-x-6 gap-y-8 md:grid-cols-[auto_auto_auto_auto_auto]" role="group" aria-label="Xalqaro sayyohlik daromadi hisobi">
          {[
            { v: <CountNumber value={11.2} decimals={1} suffix=" mln" />, l: "xorijiy tashrif (12 oy, 2025-iyun)" },
            { op: "×" },
            { v: <CountNumber value={3350} prefix="~" suffix=" A$" />, l: "bir tashrifchining o‘rtacha sarfi" },
            { op: "≈" },
            { v: <CountNumber value={37.5} decimals={1} suffix=" mlrd A$" />, l: "xalqaro sayyohlik sarfi", focus: true },
          ].map((t, i) =>
            "op" in t ? (
              <span key={i} aria-hidden="true" className="engr pb-9 text-[clamp(2rem,3vw,3rem)] text-foam/50 max-md:hidden">
                {t.op}
              </span>
            ) : (
              <div key={i} data-rev style={delay(140 * i)} className={t.focus ? "border-b-2 border-wattle-light pb-3" : "pb-3"}>
                <p className={`engr leading-none whitespace-nowrap ${t.focus ? "text-[clamp(2.8rem,4.6vw,4.4rem)] text-wattle-light" : "text-[clamp(2.2rem,3.4vw,3.3rem)] text-foam"}`}>{t.v}</p>
                <p className="mt-3 text-gum">{t.l}</p>
              </div>
            ),
          )}
        </div>
        <p className="mt-14 max-w-[62ch] border-t border-wattle-light/30 pt-8 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-foam" data-rev>
          Bunga yana chet ellik talabalar qo‘shiladi: ular o‘qish va yashash uchun yiliga{" "}
          <span className="font-medium text-wattle-light">55 mlrd A$</span> sarflaydi — ta’lim temir rudasi, ko‘mir, gaz va oltindan keyin beshinchi eksport.
        </p>
        <p className="mt-6 text-[0.85rem] text-gum">Manbalar: Tourism Research Australia (2025-yil iyun, 12 oy); Department of Education (2025). O‘rtacha sarf — 37,5 mlrd ÷ 11,2 mln, hisob-kitob.</p>
      </div>
    </section>
  )
}
