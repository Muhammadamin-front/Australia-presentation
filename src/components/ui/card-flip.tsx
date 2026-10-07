"use client"

/**
 * Card Flip (flip-card.md, kokonutui — MIT) turned into an engine card:
 * the front carries the export engine and its headline figure on sand,
 * the back its explanation on deep ocean. Flips on hover, on click (for a
 * presenter without hover) and on keyboard focus + Enter.
 */

import { Repeat2 } from "lucide-react"
import { useState } from "react"
import { Corners, CruxRule } from "@/components/Ornament"
import { cn } from "@/lib/utils"

export interface CardFlipProps {
  name: string
  gloss: string
  figure: string
  meaning: string
  text: string
  className?: string
}

export default function CardFlip({ name, gloss, figure, meaning, text, className }: CardFlipProps) {
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const flipped = hover || pinned

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`${name}: ${figure}, ${meaning}. ${text}`}
      className={cn("group relative h-[340px] w-full cursor-pointer text-left [perspective:2000px]", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setPinned((v) => !v)}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          "transition-[transform] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front — the engine, set like a map cartouche */}
        <div className="frame absolute inset-0 flex flex-col bg-sand p-6 [backface-visibility:hidden]">
          <Corners />
          <div className="flex items-start justify-between gap-3">
            <h3 className="engr text-[1.45rem] leading-tight text-ocean-deep">{name}</h3>
            <Repeat2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-wattle transition-transform duration-500 group-hover:-rotate-12" />
          </div>
          <span className="latin mt-1 text-[0.92rem] leading-snug text-muted">{gloss}</span>
          <div className="mt-auto">
            <CruxRule className="mb-4" />
            <p className="text-[clamp(1.6rem,2vw,2.15rem)] leading-none font-medium whitespace-nowrap text-ocean">{figure}</p>
            <p className="mt-2 text-text">{meaning}</p>
          </div>
        </div>

        {/* Back — the explanation, on ocean */}
        <div className="frame frame--light absolute inset-0 flex flex-col bg-ocean p-6 text-foam [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="engr text-[1.15rem] text-wattle-light">{name}</span>
          <span className="mt-2 text-xl font-medium">{figure}</span>
          <p className="mt-4 text-[1rem] leading-relaxed text-foam/90">{text}</p>
          <span className="latin mt-auto text-gum">{gloss}</span>
        </div>
      </div>
    </button>
  )
}
