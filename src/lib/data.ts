/* Barcha matn va raqamlar shu faylda. Taqdimotdan oldin shu yerda tahrirlang.
   "~" belgisi — yaxlitlangan yoki taxminiy qiymat. Valyuta: A$ — Avstraliya dollari, $ — AQSh dollari. */

/** Ismingiz va guruhingizni yozing — bo‘sh qolsa, ko‘rsatilmaydi. */
export const PRESENTER = {
  name: "Qodirova Ziyoda",
  group: "85-25 I guruh",
  university: "Farg‘ona davlat texnika universiteti",
  faculty: "Ishlab chiqarishda boshqaruv fakulteti",
  subject: "Iqtisodiy siyosat",
  course: "«Iqtisodiy siyosat» fanidan taqdimot",
}

export type SectionId = "muqova" | "kirish" | "davlat" | "tarix" | "eksport" | "tabiat" | "bosim" | "taqqoslash" | "kelajak" | "xulosa"

export const SECTIONS: { id: SectionId; label: string; gloss: string }[] = [
  { id: "muqova", label: "Muqova", gloss: "Title" },
  { id: "kirish", label: "Kirish", gloss: "Welcome" },
  { id: "davlat", label: "Davlat", gloss: "Country" },
  { id: "tarix", label: "Tarix", gloss: "History" },
  { id: "eksport", label: "Eksport", gloss: "Exports" },
  { id: "tabiat", label: "Tabiat", gloss: "Nature" },
  { id: "bosim", label: "Bosimlar", gloss: "Pressures" },
  { id: "taqqoslash", label: "Taqqoslash", gloss: "Compare" },
  { id: "kelajak", label: "Kelajak", gloss: "Outlook" },
  { id: "xulosa", label: "Xulosa", gloss: "Summary" },
]

export const HERO_READOUTS = [
  { label: "Maydoni", value: "7,69 mln km²", note: "dunyoda 6-o‘rin; O‘zbekistondan 17 marta katta" },
  { label: "Aholisi", value: "27,9 mln", note: "2026-yil mart, ABS" },
  { label: "Valyutasi", value: "A$ dollar", note: "1983-yildan erkin suzuvchi kurs" },
]

export const STATE_FACTS = [
  { value: "7,69 mln km²", label: "Maydoni — butun qit’a; O‘zbekistondan ~17 marta katta" },
  { value: "27,9 mln", label: "Aholisi (2026-yil mart); yillik o‘sish 1,4%, shundan 292 ming — sof migratsiya" },
  { value: "1901", label: "Federatsiya: oltita mustamlaka bitta Hamdo‘stlikka (Commonwealth) birlashdi" },
  { value: "#12", label: "Nominal YaIM bo‘yicha dunyoda (~2,1 trln $, XVF 2026-yil bahosi)" },
]

export const TWO_AUSTRALIAS = [
  {
    name: "Resurslar Avstraliyasi",
    gloss: "Pilbara · Queensland · G‘arbiy Avstraliya",
    text: "Temir rudasi, ko‘mir va suyultirilgan gaz (LNG) — qit’aning chekka, kam aholili hududlarida qazib olinadi va asosan Osiyoga kemalarda jo‘natiladi. Valyuta tushumining asosiy qismi shu yerdan.",
    figure: "~37% eksport",
    note: "temir rudasi + ko‘mir + gaz, 2025 (DFAT)",
  },
  {
    name: "Xizmatlar Avstraliyasi",
    gloss: "Sidney · Melburn · Brisben",
    text: "Moliya, ta’lim, sog‘liqni saqlash, savdo va qurilish. Ish o‘rinlari va YaIMning katta qismi (~70%) shaharlarda, sohil bo‘ylab joylashgan.",
    figure: "~70% YaIM",
    note: "xizmatlar sektori ulushi, taxminan (ABS)",
  },
]

export const LADDER = [
  {
    year: "1788",
    title: "Birinchi flot",
    text: "Britaniya kemalari Sidney ko‘rfaziga keldi. Mustamlaka dastlab jazo koloniyasi edi; Aborigen va Torres bo‘g‘ozi xalqlari bu yerda 60 000 yildan ortiq yashab kelgan.",
  },
  {
    year: "1851",
    title: "Oltin shov-shuvi",
    text: "Yangi Janubiy Uels va Viktoriyada oltin topildi. Aholi o‘n yilda deyarli ikki baravar o‘sdi, Melburn dunyo boyliklari markaziga aylandi.",
  },
  {
    year: "1901",
    title: "Federatsiya",
    text: "Oltita mustamlaka bitta davlat — Avstraliya Hamdo‘stligiga birlashdi: yagona bojxona, yagona bozor, federal parlament.",
  },
  {
    year: "1983",
    title: "Dollar suzishga qo‘yildi",
    text: "Xoke–Kiting hukumati kursni bozorga topshirdi, banklarni ochdi, bojlarni pasaytirdi. Bu — zamonaviy Avstraliya iqtisodiyotining asosi.",
  },
  {
    year: "1991",
    title: "Oxirgi retsessiya",
    text: "1990–91-yildagi pasayishdan so‘ng iqtisodiyot deyarli 29 yil ketma-ket o‘sdi — rivojlangan davlatlar orasida rekord.",
  },
  {
    year: "2003",
    title: "Kon sanoati bumi",
    text: "Xitoyning temir rudasi va ko‘mirga talabi eksport narxlarini ko‘tardi. 2008-yilgi jahon inqirozida Avstraliya retsessiyadan qochib qoldi.",
  },
  {
    year: "2020",
    title: "COVID-19 retsessiyasi",
    text: "Chegaralar yopildi: sayyohlik va xalqaro talabalar tushumi qulab tushdi. 29 yillik o‘sish zanjiri uzildi, biroq tiklanish tez bo‘ldi.",
  },
  {
    year: "2026",
    title: "Inflyatsiya va stavkalar",
    text: "Energiya narxi va talab bosimi tufayli RBA yil davomida stavkani to‘rt marta oshirdi: 3,60% → 4,60% (2011-yildan beri eng yuqori).",
  },
]

/** Tovar va xizmatlar eksporti, 2025 (DFAT): umumiy ~664,6 mlrd A$ (temir rudasi 120,95 mlrd = 18,2%). */
export const EXPORTS_2025 = {
  total: 665,
  iron: 121,
  china: 195.6,
  split: [
    { label: "Temir rudasi", value: 18.2, note: "120,95 mlrd A$" },
    { label: "Ko‘mir", value: 9.6, note: "64,1 mlrd A$" },
    { label: "Tabiiy gaz (LNG)", value: 9.0, note: "59,7 mlrd A$" },
    { label: "Boshqa tovar va xizmatlar", value: 63.2, note: "ta’lim, sayyohlik, qishloq xo‘jaligi, oltin…" },
  ],
}

/** Pul qayerdan keladi — to‘rt «dvigatel». */
export const ENGINES = [
  {
    name: "Temir rudasi",
    gloss: "Pilbara, G‘arbiy Avstraliya",
    figure: "~121 mlrd A$",
    meaning: "2025-yil eksporti, 18,2%",
    text: "Eng yirik eksport mahsuloti. Pilbaradagi konlardan Port-Xedlend orqali asosan Xitoy po‘lat zavodlariga ketadi; narx tebransa, butun davlat byudjeti seziladi.",
  },
  {
    name: "Ko‘mir va LNG",
    gloss: "Queensland · Shimoli-g‘arbiy shelf",
    figure: "~124 mlrd A$",
    meaning: "ko‘mir 64,1 + gaz 59,7, 2025",
    text: "Yaponiya, Janubiy Koreya va Hindiston uchun energiya yetkazib beruvchi. Uzoq muddatli shartnomalar bor, lekin dunyo dekarbonizatsiyasi bu bozorni asta qisqartirishi mumkin.",
  },
  {
    name: "Xalqaro ta’lim",
    gloss: "Universitetlar · talabalar",
    figure: "55,0 mlrd A$",
    meaning: "2025, rekord; 5-eng yirik eksport",
    text: "Chet ellik talaba — «eksport»: u o‘qish va yashash uchun pul to‘laydi (o‘qish 24,4 + boshqa xarajat 30,4 mlrd A$). Faqat temir rudasi, ko‘mir, gaz va oltin ta’limdan oldinda.",
  },
  {
    name: "Pensiya fondi",
    gloss: "Superannuation",
    figure: "4,8 trln A$",
    meaning: "jami aktivlar, 2026-yil iyun",
    text: "Ish beruvchi har bir xodim uchun maosh ustidan majburiy 12% pensiya hisobiga o‘tkazadi. To‘plangan pul — dunyodagi eng yirik pensiya tizimlaridan biri va ichki investitsiya manbai.",
  },
]

export const PILLARS = [
  {
    title: "Erkin suzuvchi dollar",
    text: "Kursni markaziy bank emas, bozor belgilaydi. Xom ashyo narxi tushsa, dollar arzonlashadi va eksport raqobatbardosh bo‘lib qoladi — iqtisodiyotning o‘z «amortizatori».",
  },
  {
    title: "AAA reyting",
    text: "Avstraliya uchala yirik agentlikdan eng yuqori kredit reytingiga ega bo‘lgan to‘qqiz davlatdan biri. Sof qarz 2026-27 byudjetida YaIMning 19,9% i (~617 mlrd A$) deb baholangan.",
  },
  {
    title: "Mustaqil markaziy bank",
    text: "Avstraliya Zaxira banki (RBA) inflyatsiyani 2–3% oralig‘ida ushlashga majbur. Maqsaddan chiqilganda stavka oshiriladi — 2026-yilda aynan shunday bo‘ldi.",
  },
]

export const WONDER_ITEMS = [
  {
    img: "/images/dusk.jpg",
    title: "Sidney opera teatri",
    sub: "Harbour Bridge bilan, Sidney",
    desc: "Eng mashhur belgi: Sidney ko‘rfazi yil bo‘yi millionlab sayyohni jalb qiladi.",
  },
  {
    img: "/images/reef.jpg",
    title: "Buyuk to‘siq rifi",
    sub: "Queensland, YuNESKO merosi",
    desc: "Dunyodagi eng katta marjon tizmasi — sho‘ng‘in va suv sayohatlari ko‘plab ish o‘rni yaratadi.",
  },
  {
    img: "/images/uluru.jpg",
    title: "Uluru",
    sub: "Markaziy Avstraliya",
    desc: "Anangu xalqi uchun muqaddas qoya. Hozir tashrif faqat ularning qoidalariga rioya qilgan holda.",
  },
  {
    img: "/images/apostles.jpg",
    title: "O‘n ikki havoriy",
    sub: "Buyuk okean yo‘li, Viktoriya",
    desc: "Okeandan chiqib turgan ohaktosh ustunlar — mashhur avtosayohat marshruti.",
  },
  {
    img: "/images/mine.jpg",
    title: "Yandi temir rudasi koni",
    sub: "Pilbara, G‘arbiy Avstraliya",
    desc: "Ochiq usulda qazib olinadigan konlar — Avstraliya eksportining asosiy manbai.",
  },
  {
    img: "/images/port.jpg",
    title: "Port-Xedlend",
    sub: "Dunyodagi eng yirik ruda porti",
    desc: "Temir rudasi poezdlarda keladi, ulkan kemalarga yuklanadi va Osiyoga jo‘natiladi.",
  },
  {
    img: "/images/wheat.jpg",
    title: "Bug‘doy dalalari",
    sub: "G‘arbiy Avstraliya",
    desc: "Qishloq xo‘jaligi eksportining tayanchi: bug‘doy, jun, mol go‘shti.",
  },
]

/** RBA naqd stavkasi (cash rate), 2026-yil, %. */
export const RATES = [
  { label: "Yan", value: 3.6 },
  { label: "Fev", value: 3.85 },
  { label: "Mar", value: 4.1 },
  { label: "May", value: 4.35 },
  { label: "Sen", value: 4.6 },
]

export const PRESSURES = [
  {
    figure: "10 / 13",
    date: "2022–2025",
    title: "Unumdorlik",
    text: "Aholi jon boshiga YaIM so‘nggi 13 chorakning 10 tasida kamaygan (2025-yil III chorakkacha): yalpi o‘sish aholi soni ko‘payishi hisobiga, boylik emas.",
  },
  {
    figure: "29,4%",
    date: "2025",
    title: "Xitoyga qaramlik",
    text: "Eksportning deyarli uchdan biri Xitoyga ketadi; Xitoyga eksportning ~80% i — temir rudasi, LNG va ko‘mir. Bitta xaridorga yaqinlik — katta xavf.",
  },
  {
    figure: "4,60%",
    date: "2026-yil sentabr",
    title: "Stavka va ishsizlik",
    text: "RBA stavkani to‘rtinchi marta oshirdi (2011-yil noyabridan beri eng yuqori); ishsizlik avgustda 4,6% ga chiqdi — 2021-yil oxiridan beri eng yuqori daraja.",
  },
]

/** Taqqoslash bo‘limi. */
export const SCALE_STOPS = [
  {
    title: "Avstraliya",
    text: "7 692 024 km² — O‘zbekistondan ~17 marta katta; bitta qit’a.",
  },
  {
    title: "O‘zbekiston",
    text: "448 969 km² — xuddi shu masshtabda Avstraliya markaziga qo‘yildi; Toshkent (435 km²) ichida.",
  },
  {
    title: "Sidney va Toshkent",
    text: "Katta Sidney 12 368 km² — Toshkentdan ~28 marta katta. Ikkala doira shahar maydoniga teng.",
  },
]

export type CompareRow = { topic: string; au: string; uz: string; ratio?: string }

export const COMPARE: CompareRow[] = [
  { topic: "Maydoni", au: "7 692 024 km²", uz: "448 969 km²", ratio: "×17" },
  { topic: "Aholisi", au: "27,9 mln (2026)", uz: "~39 mln", ratio: "O‘zb. ×1,4" },
  { topic: "Iqtisodiyot hajmi", au: "YaIM ~2,1 trln $ (2026, XVF)", uz: "YaIM ~147 mlrd $ (2025)", ratio: "×14" },
  { topic: "Jon boshiga YaIM", au: "~75 ming $ (hisob-kitob)", uz: "~3,8 ming $ (hisob-kitob)", ratio: "×~20" },
  { topic: "Iqtisodiy o‘sish", au: "2,6% (2025, dekabr)", uz: "7,7% (2025)" },
  { topic: "Asosiy eksport", au: "Temir rudasi, ko‘mir, LNG, ta’lim", uz: "Oltin, mis, gaz, to‘qimachilik" },
  { topic: "Valyuta", au: "A$, erkin suzuvchi kurs (1983)", uz: "So‘m, Markaziy bank" },
  { topic: "Daromad solig‘i", au: "0–45%, progressiv", uz: "12%, yagona" },
  { topic: "Sayyohlar", au: "11,2 mln (2025-iyun gacha 12 oy)", uz: "11,7 mln xorijiy (2025)" },
]

export const COMPARE_LESSONS = [
  {
    title: "Resurs daromadini jamg‘arma qiling",
    text: "Avstraliya kon boomidan so‘ng ham majburiy pensiya tizimi orqali 4,8 trln A$ ichki kapital yig‘di. O‘zbekiston uchun oltin, gaz va mis daromadini barqaror jamg‘arma va investitsiya fondlariga aylantirish shu yo‘ldir.",
  },
  {
    title: "Bitta xaridorga bog‘lanib qolmang",
    text: "Avstraliya eksportining 29,4% i — Xitoy. 2020-yilda Pekin ba’zi tovarlarga cheklov qo‘ydi va bu xavf amalda ko‘rindi. O‘zbekiston ham bozorlarni kengaytirgani ma’qul.",
  },
  {
    title: "Ta’lim ham eksport",
    text: "Chet ellik talabalar yiliga 55 mlrd A$ keltiradi — bu temir rudasidan keyin eng barqaror manbalardan. O‘zbekiston universitetlari va filiallari ham xalqaro talabalarni jalb qilishi mumkin.",
  },
]

export const FUTURE = [
  {
    title: "Kritik minerallar va yangi energiya",
    text: "Litiy, nodir yer elementlari, mis va nikel — batareya va quyosh energiyasi uchun xom ashyo. Avstraliya jahon litiy ishlab chiqarishida yetakchilardan biri; 2025-yilda ~1,2 mlrd A$ lik kritik minerallar strategik zaxirasi e’lon qilingan.",
  },
  {
    title: "Energiya o‘tishi va narx",
    text: "2050-yilgacha net-zero maqsadi bor, biroq 2026-yilgi Yaqin Sharq nizosi energiya narxini oshirdi va inflyatsiyaga bosim berdi (RBA bayonoti).",
  },
  {
    title: "Unumdorlik islohoti",
    text: "Unumdorlik o‘sishi yarim asr oldingiga nisbatan sekin; uy-joy qurilishi, ruxsatnomalar va soliq tizimini soddalashtirish asosiy talab.",
  },
  {
    title: "Aholi va migratsiya",
    text: "Yiliga +1,4%: 292 ming — sof migratsiya. Ish kuchi va talab o‘sadi, lekin uy-joy va infratuzilmaga bosim ham ortadi.",
  },
]

export const CONCLUSIONS = [
  "Avstraliya — resurslar va xizmatlar iqtisodiyoti: temir rudasi, ko‘mir, gaz hamda ta’lim eksporti ~665 mlrd A$ valyuta keltiradi.",
  "Erkin kurs, AAA reyting va 4,8 trln A$ pensiya fondlari uni barqaror qildi; biroq unumdorlik, uy narxi va Xitoyga qaramlik — asosiy xavflar.",
  "O‘zbekiston uchun saboq: resurs daromadini jamg‘armaga aylantirish, bozorlarni ko‘paytirish va ta’limni ham eksport mahsuloti sifatida ko‘rish.",
]

export const SOURCES = [
  "ABS (Avstraliya Statistika byurosi) — Milliy hisoblar, 2025-yil dekabr choragi; aholi, 2026-yil mart",
  "DFAT — Australia’s goods and services exports and imports, 2025",
  "Department of Education — Education export income, calendar year 2025",
  "Tourism Research Australia — Visitor Economy Facts and Figures (2025-yil iyun, 12 oy)",
  "APRA — Superannuation statistics (2026-yil iyun)",
  "Reserve Bank of Australia — naqd stavka va inflyatsiya bo‘yicha qarorlar, 2026",
  "Federal byudjeti 2026–27 (Treasury): net qarz, defitsit; S&P — AAA reytingi",
  "Cotality (CoreLogic) — Home Value Index, 2026-yil may",
  "XVF (IMF) World Economic Outlook — nominal YaIM, 2026",
  "O‘zbekiston Milliy statistika qo‘mitasi — YaIM 2025, aholi; Turizm qo‘mitasi — 2025-yil xorijiy sayyohlar",
  "Xaritalar: Natural Earth (ochiq ma’lumot); doiralar — shahar maydonlari (ABS, Toshkent hokimligi)",
]

/** Suratlar — Wikimedia Commons; har biri o‘z litsenziyasi bilan. */
export const PHOTO_CREDITS = [
  "Sidney opera teatri va Harbour Bridge — Benh LIEU SONG, CC BY-SA 4.0",
  "Uluru — Dietmar Rabich, CC BY-SA 4.0; O‘n ikki havoriy — Dietmar Rabich, CC BY-SA 4.0",
  "Buyuk to‘siq rifi — Ank Kumar, CC BY-SA 4.0",
  "Yandi koni, bug‘doy dalalari — Calistemon, CC BY-SA 4.0",
  "Port-Xedlend — Bahnfrend, CC BY-SA 3.0; Karijini — Gypsy Denise, CC BY-SA 4.0",
  "Parlament uyi, Kanberra — Thennicke, CC BY-SA 4.0",
]
