/**
 * Charts drawn in the garden plan's own grammar (dataviz method: one hue per
 * series, the focus in the darkest ocean, the rest in gum and stone; direct
 * labels; hover/focus tooltips; a table view for every chart).
 */

import { Plus } from "lucide-react"
import { useState, type ReactNode } from "react"
import { cn, fmt } from "@/lib/utils"

function Tip({ x, y, children }: { x: string; y: string; children: ReactNode }) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] bg-ocean px-3.5 py-2 text-sm whitespace-nowrap text-foam shadow-[0_10px_24px_-12px_rgba(7,29,44,0.6)]"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  )
}

export function TableView({ caption, head, rows, dark = false }: { caption: string; head: string[]; rows: (string | number)[][]; dark?: boolean }) {
  return (
    <details className={cn("group mt-6 text-sm", dark ? "text-gum" : "text-muted")}>
      <summary
        className={cn(
          "inline-flex cursor-pointer list-none items-center gap-2 border px-3.5 py-1.5 transition-colors",
          dark ? "border-wattle-light/40 hover:border-wattle-light hover:text-foam" : "border-stone hover:border-ocean hover:text-ocean-deep",
        )}
      >
        <Plus aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-45" strokeWidth={1.8} /> Jadval ko‘rinishi
      </summary>
      <table className="mt-4 w-full max-w-xl border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className={cn("border-b", dark ? "border-wattle-light/30" : "border-stone")}>
            {head.map((h) => (
              <th key={h} className={cn("py-2 pr-4 font-medium", dark ? "text-foam" : "text-ocean-deep")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={cn("border-b", dark ? "border-wattle-light/15" : "border-stone/60")}>
              {r.map((c, j) => (
                <td key={j} className={cn("tnum py-2 pr-4", j === 0 && (dark ? "text-foam" : "text-ocean-deep"))}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}

/* ── Exports as one bar split into shares ─────────────────────────── */

const BEDS = ["var(--color-ocean)", "var(--color-reef)", "var(--color-wattle)", "var(--color-steel)"]

export function ExportBar({ total, data }: { total: number; data: { label: string; value: number; note: string }[] }) {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className="relative" data-rev>
      <div className="flex h-20 w-full gap-[3px] border-y-4 border-double border-wattle py-1" role="img" aria-label="Eksport tarkibi, foiz">
        {data.map((d, i) => (
          <div
            key={d.label}
            tabIndex={0}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="hbar relative h-full outline-none"
            style={{ width: `${d.value}%`, background: BEDS[i], transitionDelay: `${i * 220}ms`, opacity: hover === null || hover === i ? 1 : 0.7 }}
          >
            <span className="absolute inset-0 grid place-items-center text-[clamp(1.1rem,2.2vw,2.1rem)] font-medium text-foam">{fmt(d.value, 1)}%</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (
          <div key={d.label} className="flex gap-3">
            <span aria-hidden="true" className="mt-1.5 size-3 shrink-0" style={{ background: BEDS[i] }} />
            <div>
              <p className="font-medium text-ocean-deep">{d.label}</p>
              <p className="note">{d.note}</p>
            </div>
          </div>
        ))}
      </div>
      {hover !== null && (
        <Tip x={`${data.slice(0, hover).reduce((s, d) => s + d.value, 0) + data[hover].value / 2}%`} y="0%">
          {data[hover].label}: ~{fmt((total * data[hover].value) / 100)} mlrd A$
        </Tip>
      )}
      <TableView
        caption="Tovar va xizmatlar eksporti tarkibi, 2025"
        head={["Tovar", "Ulush", "~mlrd A$"]}
        rows={data.map((d) => [d.label, `${fmt(d.value, 1)}%`, fmt((total * d.value) / 100)])}
      />
    </div>
  )
}

/* ── RBA cash rate through 2026: five steps up ─────────────────── */

export function RateChart({ data }: { data: { label: string; value: number }[] }) {
  const [hover, setHover] = useState<string | null>(null)
  const W = 900
  const base = 330
  const k = 60
  const colW = 110
  const gap = (W - data.length * colW) / (data.length + 1)
  return (
    <div className="relative" data-rev>
      <svg viewBox={`0 0 ${W} 400`} className="w-full overflow-visible" role="img" aria-label="RBA naqd stavkasi 2026-yilda, foiz">
        <line x1="0" x2={W} y1={base} y2={base} stroke="var(--color-wattle)" strokeWidth="1.5" />
        {/* inflation target band 2–3 % for orientation */}
        <rect x="0" width={W} y={base - 3 * k} height={k} fill="var(--color-reef)" fillOpacity="0.16" />
        {data.map((d, i) => {
          const x = gap + i * (colW + gap)
          const h = d.value * k
          const label = `${d.label}: ${fmt(d.value, 2)}%`
          const last = i === data.length - 1
          return (
            <g
              key={d.label}
              tabIndex={0}
              role="img"
              aria-label={label}
              onMouseEnter={() => setHover(label)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(label)}
              onBlur={() => setHover(null)}
              className="outline-none"
            >
              <rect className="bar" x={x} y={base - h} width={colW} height={h} fill={last ? "var(--color-ocean)" : "var(--color-ocean-mid)"} style={{ transitionDelay: `${i * 140}ms` }} />
              <text x={x + colW / 2} y={base - h - 14} textAnchor="middle" className="fill-ocean-deep text-[28px] font-medium">
                {fmt(d.value, 2)}%
              </text>
              <text x={x + colW / 2} y={base + 34} textAnchor="middle" className="fill-ocean-deep text-[26px]">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="note mt-2">Yashil yo‘lak — RBA inflyatsiya maqsadi (2–3%). 4,60% — 2011-yil noyabridan beri eng yuqori stavka.</p>
      {hover && (
        <Tip x="50%" y="0%">
          {hover}
        </Tip>
      )}
      <TableView caption="RBA naqd stavkasi, 2026" head={["Oy", "Stavka, %"]} rows={data.map((d) => [d.label, fmt(d.value, 2)])} />
    </div>
  )
}
