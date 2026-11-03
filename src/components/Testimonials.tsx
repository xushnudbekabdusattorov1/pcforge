import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Bekzod Rahimov',
    role: 'Twitch & YouTube Streamer',
    game: 'CS2 & Warzone 240FPS',
    text: 'Pro Streamer yig\'masini oldim. 1440p o\'yin vaqtida OBS da birorta kadr ham tushmaydi. Harorat 65 darajadan oshmaydi. Kabellash san\'at darajasida!',
    rating: 5
  },
  {
    name: 'Dilnoza Karimova',
    role: '3D Vizualizator & Architect',
    game: 'Blender, 3ds Max & Unreal 5',
    text: 'Oldin 4 soat kutgan og\'ir 3D renderlarim RTX 4090 tizimida endi 25 daqiqada tayyor bo\'lyapti. Konsultatsiya va yetkazib berish juda tez bo\'ldi.',
    rating: 5
  },
  {
    name: 'Shaxzod Tursunov',
    role: 'Cyber-esports Player',
    game: 'Valorant & Apex Legends',
    text: 'O\'zim konfigurator orqali Ryzen 7 7800X3D va 240Hz monitor bilan yig\'dim. Toshkentga 2 soat ichida yetkazib, joyida tekshirib berishdi. 10/10!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#07090e] border-t border-slate-800/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-label">Mijozlarimiz Fikrlari</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            Haqiqiy Geymerlar <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Bahosi</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Bizdan tizim xarid qilgan strimerlar, kibersportchilar va vizualizatorlarning xolis tajribasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-[#0b0d14] border border-slate-800 rounded-2xl p-6 relative hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-cyan-500/20 mb-3" />
                <div className="flex gap-1 mb-3 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-white text-sm font-['Outfit']">{rev.name}</div>
                <div className="text-xs text-cyan-400">{rev.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{rev.game}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
