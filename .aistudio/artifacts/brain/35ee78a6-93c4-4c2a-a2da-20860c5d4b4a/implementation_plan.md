# PC Forge — Ultra Gaming PC & Hardware Storefront + Custom Builder

PC Forge platformasini kengaytirilgan kiber-animatsiyalar, interaktiv "Omad G'ildiragi" (Spin & Win) chegirma tizimi, bosqichma-bosqich maxsus kompyuter yig'ish (PC Builder / Konfigurator) moduli, tayyor gaming PC'lar, noutbuklar, kompyuter butlovchi qismlari hamda periferiya do'koni, savatcha va UZS/USD valyuta tizimi bilan boyitish arxitekturaviy rejasi.

## Foydalanuvchi Tanlovlari & Tasdiqlangan Qarorlar

> [!IMPORTANT]
> 1-bosqichda foydalanuvchi tomonidan tasdiqlangan tanlovlar quyidagicha belgilandi:

- **Kirishdagi chegirma tizimi**: Interaktiv "Omad G'ildiragi" (Lucky Spin Wheel) — foydalanuvchi g'ildirakni aylantirib 10% dan 25% gacha chegirma yoki bonus yutib oladi, promo kod avtomatik savatchaga tatbiq etiladi.
- **PC Konfiguratori (Kompyuter yig'ish)**: Bosqichma-bosqich qismlarni tanlash (Protsessor -> Videokarta -> Ona plata -> Tezkor xotira -> SSD -> Kuler -> Blok pitaniya -> Korpus), real vaqtda narx hisoblash, komponentlar mosligi va yig'ilgan shaxsiy kompyuterni bir marta bosishda savatchaga qo'shish.
- **Valyuta tizimi**: Sayt bo'ylab barcha tovarlar, konfigurator va savatcha uchun UZS (so'm) va USD ($) valyutalarini bir zumda almashtirish imkoniyati.

---

## 1. Umumiy Konsept & Imkoniyatlar

- **Asosiy maqsad**: Foydalanuvchilar o'zlarining orzuidagi kompyuterini mustaqil ravishda sifatli detallardan yig'ishi yoki tayyor kuchli gaming PC, yuqori unumdor noutbuklar, alohida butlovchi qismlar va geymerlik aksessuarlarini xarid qilishi mumkin bo'lgan zamonaviy, ultra-animatsiyali platforma yaratish.
- **Foydalanuvchi auditoriyasi**: Geymerlar, kibersportchilar, 3D vizualizatorlar, dasturchilar va kontent yaratuvchilar.
- **Kalit afzalliklar**:
  - Saytga kirishdagi yorqin interaktiv sovrinli aksiyalar.
  - O'z kompyuteringizni erkin yig'ish va bevosita savatchaga yuborish.
  - Tayyor noutbuklar va periferiya qurilmalari (monitorlar, klaviaturalar, sichqonchalar, quloqchinlar).
  - Yuqori sifatli vizual animatsiyalar (zarralar maydoni, 3D kartochkalar nishonlanishi, kursor neoni, magnit tugmalar).

---

## 2. Foydalanuvchi Tajribasi & Vizual Dizayn (UX/UI)

### Foydalanuvchi Yo'li (User Flow)
1. **Kirish / Xush Kelibsiz Aksiya**:
   - Foydalanuvchi saytga kirganda "Omad G'ildiragi" (Spin to Win) modal oynasi namoyon bo'ladi.
   - Foydalanuvchi g'ildirakni aylantiradi, yutuqli promo-kod (masalan: `FORGE2026`, `LUCKY15`) taqdim etiladi va bitta tugma bilan faollashtiriladi.
2. **Kengaytirilgan Navigatsiya**:
   - Logo, Asosiy toifalar (Tayyor PC'lar, Noutbuklar, PC Yig'ish / Builder, Qismlar, Aksessuarlar, Xizmatlar).
   - Valyuta almashuvi selektori (`UZS` / `USD`).
   - Jonli savatcha ko'rsatkichi (buyumlar soni va umumiy summa animatsiyasi).
3. **Ultra Kiber Hero & Jonli Zarrachalar (Particle Field)**:
   - Dinamik 3D elementlar, interaktiv fon zarrachalari, silliq harakatlar.
   - Tezkor o'tishlar: "PC Yig'ish" yoki "Tayyor PC Tanlash".
4. **Bosqichma-bosqich PC Konfiguratori (Interactive PC Builder)**:
   - 8 bosqichli tanlov (CPU -> GPU -> Motherboard -> RAM -> Storage -> PSU -> Cooling -> Case).
   - Har bir qism uchun vizual rasm, texnik xususiyatlar, narx.
   - Jonli kompyuter holati konsoli (umumiy quvvat, sarflangan budjet, qismlar ro'yxati).
   - "Savatchaga Qo'shish" tugmasi orqali to'liq yig'ilgan kompyuterni yagona maxsus mahsulot sifatida savatchaga kiritish.
5. **Katalog (Tayyor PC'lar, Noutbuklar va Aksessuarlar)**:
   - Toifalar bo'yicha saralash (All, Prebuilt PCs, Laptops, Components, Peripherals).
   - Har bir tovar kartasida 3D tilt effekti, yorqin neon ramka, texnik spetsifikatsiya va "Savatchaga qo'shish" amali.
6. **Interaktiv Savatcha & Buyurtma Oynasi (Drawer)**:
   - Tanlangan tayyor tovarlar va shaxsiy yig'ilgan PC'lar alohida ko'rsatiladi.
   - Miqdorni o'zgartirish, o'chirish.
   - Promo-kod kiritish va g'ildirakdan yutilgan chegirma avtomatik hisoblanishi.
   - Tezkor buyurtma berish formasi (Ism, telefon, manzil, yetkazib berish usuli).

### Vizual Uslub & Ranglar Palitrasi
- **Fon**: Deep Charcoal & Void Black (`#090A0F`, `#0E1117`).
- **Sirtlar**: Qora shisha effekti (`backdrop-blur-md`, `bg-slate-900/80`, nozik `border-slate-800`).
- **Urg'u Ranglari (Cyber Accents)**:
  - Electric Emerald / Cyber Green (`#00F5A0`, `#00D084`) va Neon Cyan (`#00D2FF`).
  - Ultra Violet / Hyper Magenta (`#7928CA`, `#FF0080`) g'ildirak va maxsus chegirmalar uchun.
- **Tipografiya**:
  - Display: `Plus Jakarta Sans` / `Outfit` (kuchli, zamonaviy, texnologik).
  - Raqamlar va narxlar: `tabular-nums font-mono` vertikal chiroyli tartib uchun.
- **Animatsiyalar**:
  - Kursor perimetri bo'ylab neon nur (cursor spotlight).
  - Kartalar ustiga borganda silliq 3D tilt burchakli burilish.
  - G'ildirakning fizikaga asoslangan aylanish animatsiyasi va konfetti/uchqun effekti.
  - Savatchaga tovar tushganda silliq pulse va badge ko'tarilishi.

---

## 3. Asosiy Mahsulot Qarorlari & Yondashuvlar

- **Qaror 1: PC Konfiguratorining tuzilishi**:
  - *Yondashuv*: Bosqichma-bosqich o'tish (Step wizard) va xohlagan vaqtda istalgan qismga qaytish imkoniyati.
  - *Sabab*: Yangi boshlovchilar chalkashib ketmaydi, professional foydalanuvchilar esa bir zumda o'zlari istagan qismlarni tanlab, to'liq narxni ko'rishadi.
- **Qaror 2: Valyuta konvertatsiyasi**:
  - *Yondashuv*: 1 USD = 12,850 UZS standarti asosida har bir element narxini bir zumda dinamik qayta formatlash.
  - *Sabab*: O'zbekiston bozoridagi xaridorlar odatda kompyuter qismlarini ham dollar, ham so'mda baholashga o'rgangan.
- **Qaror 3: Omad G'ildiragi (Welcome Promo Wheel)**:
  - *Yondashuv*: Birinchi tashrifda chiquvchi va istalgan vaqtda yuqori menyudagi "Aksiya" tugmasi orqali qayta ochish mumkin bo'lgan sovrinli oyna.
  - *Sabab*: Foydalanuvchini jalb qiladi, xarid qilishga qiziqish uyg'otadi va saytga yangicha o'yinchoq (gamified) atmosfera bag'ishlaydi.

---

## 4. Texnik Arxitektura & Komponentlar Diagrammasi

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│  (Valyuta holati, Savatcha boshqaruvi, Chegirma holati, Toastlar)     │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
    ┌───────────────┴───────────────┐  ┌─────────────┴─────────────────┐
    │     Navigatsiya & Modallar    │  │       Asosiy Ko'rinish        │
    │  - Navbar (Valyuta/Cart count)│  │  - Hero (Neon & Zarrachalar)  │
    │  - PromoWheelModal (G'ildirak)│  │  - Marquee (Brendlar)         │
    │  - CartDrawer (Savatcha)      │  │  - Services & WhyUs           │
    │  - CheckoutModal (Buyurtma)   │  │  - Testimonials & Footer      │
    └───────────────────────────────┘  └─────────────┬─────────────────┘
                                                     │
                    ┌────────────────────────────────┴───────────────────┐
                    │                                                    │
        ┌───────────┴──────────────┐                 ┌───────────────────┴──────────────┐
        │  PCBuilder.tsx           │                 │  StoreCatalog.tsx                │
        │  (O'z PC'ingni yig'ish): │                 │  (Tayyor tovarlar do'koni):      │
        │  - 8 ta qism selektori   │                 │  - Tayyor PC'lar (Prebuilts)     │
        │  - Texnik ko'rsatkichlar │                 │  - Noutbuklar (Laptops)          │
        │  - Narx & quvvat hisobi  │                 │  - Alohida qismlar (Components)  │
        │  - "Savatchaga qo'shish" │                 │  - Aksessuarlar (Peripherals)    │
        └──────────────────────────┘                 └──────────────────────────────────┘
```

### Holat Boshqaruvi (State Strategy):
- `cart`: `[{ id, name, category, priceUSD, priceUZS, image, specs, quantity, isCustomPC, customParts }]`
- `currency`: `'USD' | 'UZS'` (barcha narxlar formatlovchi yagona yordamchi funksiya orqali o'tkaziladi)
- `discount`: `{ code: string, percent: number, active: boolean }`
- `activeTab`: `'all' | 'builds' | 'laptops' | 'components' | 'peripherals'`
- `customBuild`: `{ cpu, gpu, motherboard, ram, ssd, psu, cooling, pcCase }`
- `isWheelOpen`: Yangi tashrif buyuruvchilar uchun avtomatik, keyin yopilganda qayta ochish imkoniyati bilan.

---

## 5. Rejani Amalga Oshirish Bosqichlari (Execution Sequence)

1. **Ma'lumotlar bazasi va turlar (`src/data/catalog.ts`)**:
   - Tayyor PC'lar (Starter, Pro, Ultra, Extreme).
   - Noutbuklar (ASUS ROG, Lenovo Legion, MSI Raider, Razer Blade, MacBook Pro).
   - Alohida qismlar (Intel/AMD protsessorlar, RTX 40-seriya videokartalar, DDR5 RAM, NVMe SSD, Kulerlar, Blok pitaniyalar, Korpuslar).
   - Periferiya (240Hz OLED monitorlar, mexanik klaviaturalar, simsiz sichqonchalar, professional minigarnituralar).
2. **Kengaytirilgan Animatsiyalar & Vizual Hooklar (`src/hooks/useFX.ts`, `ParticleField.tsx`)**:
   - Yangi silliq Canvas zarrachalar maydoni, interaktiv kursor nuri, 3D tilt kartalari, magnit tugmalar va lazer chiziqlari.
3. **Omad G'ildiragi (Lucky Promo Wheel Modal)**:
   - Aylantirish fizikasi, tovushli/vizual effektlar, promo-kod berish va savatchaga bog'lash.
4. **Bosqichma-bosqich PC Konfiguratori (`src/components/PCBuilder.tsx`)**:
   - Har bir kategoriya bo'yicha qismlarni tanlash, real vaqtda quvvat (W) va narxni hisoblash, to'liq yig'ilgan shaxsiy kompyuterni savatchaga qo'shish.
5. **Kengaytirilgan Magazin Katalogi (`src/components/StoreCatalog.tsx`)**:
   - Tayyor PC'lar, Noutbuklar va qurilmalarni toifalar bo'yicha ko'rish, filtrlash va xarid qilish.
6. **Savatcha, Valyuta Almashuvi & Buyurtma Oynasi (`CartDrawer.tsx`, `CheckoutModal.tsx`)**:
   - UZS / USD ko'rsatish, chegirma kuponini qo'llash, yetkazib berish bilan buyurtmani rasmiylashtirish.
7. **Kompilyatsiya va Test**:
   - To'liq TypeScript va Vite orqali tekshirish, barcha interaktiv funksiyalarning benuqson ishlashini ta'minlash.
