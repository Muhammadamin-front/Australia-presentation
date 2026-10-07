import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { scrollToY, step } from "@/lib/scroll"

const KEYS: [string, string][] = [
  ["→  ↓  PageDown  Probel", "Keyingi qadam"],
  ["←  ↑  PageUp", "Oldingi qadam"],
  ["Home / End", "Boshi / oxiri"],
  ["F", "To‘liq ekran"],
  ["?", "Shu oynani ochish / yopish"],
]

const TOUCH: [string, string][] = [
  ["Kirish", "Sichqonchani suring — yulduzlar shamolga ergashadi; osmonni bosing — uchar yulduz va to‘lqin"],
  ["Eksport", "Kartalarni bosing — orqasida tushuntirish"],
  ["Tabiat", "Chetdagi suratni bosing yoki strelkalar bilan almashtiring"],
  ["Taqqoslash", "→ bosilganda xarita Avstraliyadan Sidney va Toshkentgacha yaqinlashadi"],
]

/** Keyboard (and presentation clicker) navigation between stops. */
export function Presenter() {
  const [help, setHelp] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          if (t.closest("button") && e.key === " ") return
          e.preventDefault()
          step(1)
          break
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          step(-1)
          break
        case "Home":
          e.preventDefault()
          scrollToY(0)
          break
        case "End":
          e.preventDefault()
          scrollToY(document.documentElement.scrollHeight)
          break
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen?.()
          break
        case "?":
          setHelp((v) => !v)
          break
        case "Escape":
          setHelp(false)
          break
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (!help) return null
  return (
    <div role="dialog" aria-label="Klaviatura yordami" className="frame fixed right-6 bottom-6 z-50 w-[360px] bg-foam p-6 shadow-[0_18px_40px_-18px_rgba(7,29,44,0.45)]">
      <div className="flex items-center justify-between">
        <h2 className="engr text-lg tracking-[0.08em] text-ocean-deep">Taqdimotni boshqarish</h2>
        <button type="button" onClick={() => setHelp(false)} aria-label="Yopish" className="grid size-8 place-items-center text-muted hover:bg-sand hover:text-ocean-deep">
          <X className="size-4" />
        </button>
      </div>
      <dl className="mt-4 divide-y divide-stone">
        {KEYS.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-sm text-ocean-deep">{k}</dt>
            <dd className="text-sm text-muted">{v}</dd>
          </div>
        ))}
      </dl>
      <h3 className="label mt-6 text-muted">Jonli effektlar</h3>
      <dl className="mt-2 divide-y divide-stone">
        {TOUCH.map(([k, v]) => (
          <div key={k} className="py-2.5">
            <dt className="text-sm text-ocean-deep">{k}</dt>
            <dd className="text-sm text-muted">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="note mt-4">Klikker (pult) ham ishlaydi — u PageDown/PageUp yuboradi.</p>
    </div>
  )
}
