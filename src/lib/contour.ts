/**
 * Computed topographic contours: nested, slightly wobbling rings laid out from
 * a seed, the way a survey map draws a hill. Returned as an SVG data URL so it
 * can tile as a background (the drifting aurora layer) at any size.
 */

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function contourTile(seed = 7, color = "#17506d", opacity = 0.2, w = 520, h = 320) {
  const r = rng(seed)
  const hills = [
    { cx: w * 0.28, cy: h * 0.38, rings: 7, step: 15 },
    { cx: w * 0.74, cy: h * 0.64, rings: 6, step: 14 },
  ]
  const paths: string[] = []
  for (const hill of hills) {
    const wob = Array.from({ length: 4 }, () => ({ a: 0.05 + r() * 0.07, f: 2 + Math.floor(r() * 3), p: r() * 6.28 }))
    for (let k = 1; k <= hill.rings; k++) {
      const rad = k * hill.step
      const pts: string[] = []
      for (let i = 0; i <= 48; i++) {
        const t = (i / 48) * Math.PI * 2
        let m = 1
        for (const q of wob) m += q.a * Math.sin(q.f * t + q.p + k * 0.2)
        pts.push(`${(hill.cx + Math.cos(t) * rad * 1.5 * m).toFixed(1)} ${(hill.cy + Math.sin(t) * rad * m).toFixed(1)}`)
      }
      paths.push(`<path d="M${pts.join("L")}Z" stroke-opacity="${(opacity * (1 - k / (hill.rings + 3))).toFixed(3)}"/>`)
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill="none" stroke="${color}" stroke-width="1.3" stroke-linejoin="round">${paths.join("")}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}
