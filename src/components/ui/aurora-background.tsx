"use client"

/**
 * AuroraBackground (prompt-background-light.md), re-cut for the Australian world.
 * The aurora's mechanism is kept — a wide texture drifting slowly behind the
 * content on the `aurora` keyframes, faded out by a radial mask — but the
 * texture is a computed topographic contour map (lib/contour.ts) in ocean
 * blue on dune sand instead of blurred colour bands.
 */

import { useMemo, type ReactNode } from "react"
import { contourTile } from "@/lib/contour"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  seed?: number
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, seed = 11, ...props }: AuroraBackgroundProps) => {
  const tile = useMemo(() => contourTile(seed), [seed])
  return (
    <div className={cn("raked relative isolate text-ocean-deep", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-[length:520px_320px] bg-repeat motion-safe:animate-aurora",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_80%_15%,black_15%,transparent_75%)]",
          )}
          style={{ backgroundImage: tile }}
        />
      </div>
      {children}
    </div>
  )
}
