import React from 'react';
import { Wrench, ArrowUpRight, Gauge, Droplets, Check } from 'lucide-react';

const SERVICES = [
  {
    icon: <Wrench className="text-cyan-400" size={24} />,
    title: 'Individual PC Yig\'ish & Kabellash',
    desc: 'Har bir sim alohida estetik bilan yo\'naltiriladi, optimal havo oqimi va shovqinsiz ishlash kafolatlanadi.',
    points: ['Maxsus sleeve kabellar va RGB boshqaruvi', 'Termopastani yuqori aniqlikda surtish', 'BIOS va drayverlarni to\'liq yangilash']
  },
  {
    icon: <ArrowUpRight className="text-purple-400" size={24} />,
    title: 'PC Upgrade & Komponentlar Almashtirish',
    desc: 'Eski kompyuteringizni zamonaviy o\'yinlar talabiga moslab kuchaytiring va tezligini bir necha barobarga oshiring.',
    points: ['Videokarta va protsessor yangilash', 'SSD klonlash va ma\'lumotlarni saqlab qolish', 'Bepul tizim diagnostikasi']
  },
  {
    icon: <Gauge className="text-emerald-400" size={24} />,
    title: '48 Soatlik Stress-Test & Optimallashtirish',
    desc: 'Mijozga yetkazishdan oldin FurMark, Cinebench va AIDA64 orqali ekstremal termal sinovlar o\'tkaziladi.',
    points: ['Harorat va kuchlanish tahlili', 'Xotira (RAM) xatoliklarini tekshirish', 'Windows tizimini o\'yinlar uchun optimallashtirish']
  },
  {
    icon: <Droplets className="text-blue-400" size={24} />,
    title: 'Custom Liquid Cooling Sovutish',
    desc: 'Ekstremal kuch va past haroratni xohlovchilar uchun maxsus akril quvurli suyuqlik sovutish tizimlari.',
    points: ['Maxsus mis radiatorlar va bloklar', 'Antikorrozion shaffof suyuqliklar', 'Muntazam texnik xizmat ko\'rsatish']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#07090e] border-t border-slate-800/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-label">Professional Xizmatlar</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            Ekspert Muhandislarimiz <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Xizmat Ko'rsatadi</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Oddiy apparat do'konlaridan farqli ravishda, biz har bir tizimni san'at asari kabi yig'amiz va sinovdan o'tkazamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, i) => (
            <div
              key={i}
              className="tilt-box bg-[#0d1017] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,212,255,0.1)] group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
                {srv.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
