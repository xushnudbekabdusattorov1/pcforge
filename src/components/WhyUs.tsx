import React from 'react';
import { ShieldCheck, Cpu, Headphones, Truck } from 'lucide-react';

const WHY_ITEMS = [
  {
    icon: <Cpu className="text-cyan-400" size={28} />,
    title: '100% Asl Komponentlar',
    desc: 'Biz faqat rasmiy distribyutorlar (ASUS, MSI, NVIDIA, Intel, AMD, Corsair) dan to\'g\'ridan-to\'g\'ri sertifikatlangan yangi qismlarni ishlatamiz.'
  },
  {
    icon: <ShieldCheck className="text-purple-400" size={28} />,
    title: '3 Yillik Rasmiy Kafolat',
    desc: 'Har bir kompyuter uchun rasmiy muhrlangan kafolat taloni beriladi. Ehtiyot qismlar va servis to\'liq bepul amalga oshiriladi.'
  },
  {
    icon: <Truck className="text-emerald-400" size={28} />,
    title: 'Xavfsiz Qattiq Quti Yetkazish',
    desc: 'Kompyuter ichiga maxsus ko\'pik (Instapak) to\'ldiriladi, videokarta va og\'ir kulerlar tashish vaqtida silkinmasligi uchun to\'liq himoyalanadi.'
  },
  {
    icon: <Headphones className="text-blue-400" size={28} />,
    title: '24/7 Geymerlar Qo\'llab-Quvvatlashi',
    desc: 'Dasturiy ta\'minot, drayverlar, o\'yinlardagi FPS yoki har qanday savol bo\'yicha mutaxassislarimiz doimiy aloqada.'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-[#05060a] border-t border-slate-800/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-label">Nega Aynan PC Forge?</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            Geymerlar va Professionallar <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Ishonchi</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sifat, xavfsizlik va eng yuqori unumdorlik — bizning har bir yig'ilayotgan tizimimiz asosi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="bg-[#0b0e17] border border-slate-800/90 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-5 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
