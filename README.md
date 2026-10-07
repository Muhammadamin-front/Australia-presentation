# Avstraliya iqtisodiyoti — taqdimot sayti

Iqtisodiyot fanidan PowerPoint o‘rniga ishlatiladigan veb-taqdimot. React + Vite + TypeScript + Tailwind CSS (shadcn tuzilmasi).
Vatikan taqdimoti bilan bir xil tuzilma va animatsiyalar, Avstraliya mavzusiga moslab qayta chizilgan.

## Ishga tushirish

```bash
npm install      # birinchi marta
npm run dev      # http://localhost:5173 manzilini brauzerda oching
```

Taqdimot kuni: Chrome’da oching, **F** — to‘liq ekran, **→ / ←** (yoki pult) — keyingi / oldingi qadam, **?** — yordam oynasi.
Manzil satridagi `#bo‘lim` taqdimotchi bilan yuradi: sahifa yangilansa, o‘sha bo‘limga qaytadi.
Internet kerak emas: suratlar, shriftlar, bayroqlar va xarita chegaralari loyiha ichida.

Oflayn zaxira:

```bash
npm run build && npm run preview   # http://localhost:4173
```

## Tahrirlash

- **Ismingiz / guruhingiz:** `src/lib/data.ts` → `PRESENTER`. Bo‘sh qoldirilsa, ko‘rsatilmaydi.
- **Barcha matn va raqamlar:** `src/lib/data.ts` (manbalar ro‘yxati ham shu yerda).
- **Nutq matni:** `NUTQ.md` — har bir bo‘lim uchun gapiriladigan matn va qachon → bosish kerakligi.

## Tuzilma

```
src/
  components/ui/            # promptlardan olingan komponentlar
    sky-plate.tsx           ← Hero animate.md: kursor «shamol», Janubiy Xoch yulduzlari, bosish — uchar yulduz + to‘lqin
    parallax-scrolling.tsx  ← parallax.md (GSAP + Lenis): Uluru
    card-flip.tsx           ← flip-card.md: to‘rt iqtisodiy «dvigatel»
    coverflow.tsx           ← prompt.md (3D coverflow): tabiat va resurslar
    flow-field.tsx          ← motion.md: «outback» uchqunlari
    aurora-background.tsx   ← prompt-background-light.md: hisoblangan topografik chiziqlar
    scale-zoom.tsx          ← Avstraliya → O‘zbekiston → Sidney va Toshkent, bitta masshtabda
    text-roll.tsx           ← 2-prompt.md · splash-button.tsx ← button.md
  components/sections/      # 9 ta bo‘lim
  lib/data.ts               # matnlar, raqamlar, manbalar
  lib/geo.ts                # xarita geometriyasi (Natural Earth, teng maydonli proyeksiya)
  lib/scroll.ts             # Lenis, pinned-stage progress, klaviatura navigatsiyasi, URL hash
```

Bo‘limlar: Kirish · Davlat · Tarix (1788 → 2026) · Eksport · Tabiat va sayyohlik · Iqtisodiy bosimlar · O‘zbekiston bilan taqqoslash · Kelajak · Xulosa (+ Manbalar).

## Litsenziyalar

- Suratlar: Wikimedia Commons — har birining muallifi va litsenziyasi «Manbalar» slaydida.
- Bayroqlar: [circle-flags](https://github.com/HatScripts/circle-flags) (MIT) — `public/flags/LICENSE.md`.
- Xaritalar: Natural Earth (jamoat mulki).
- Shriftlar: Fraunces, Figtree (SIL Open Font License).
- Komponentlar: kokonutui (MIT), 21st.dev / Osmo / paper-design / motion-primitives promptlari asosida.
# Australia-presentation
