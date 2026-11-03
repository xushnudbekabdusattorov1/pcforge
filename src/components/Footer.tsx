import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function Footer({ onOpenWheel }: { onOpenWheel: () => void }) {
  return (
    <footer className="bg-[#020307] border-t border-slate-800/80 pt-16 pb-12 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={() => playCyberClick()}
              className="text-2xl font-black tracking-wider text-white font-['Outfit'] inline-flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff]" />
              <span>
                PC<span className="text-cyan-400">FORGE</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              O'zbekistondagi eng yetakchi geymerlik va professional kompyuterlar forji. Individual yig'ish, sertifikatlangan yangi komponentlar va 3 yillik to'liq kafolat.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-cyan-400 font-mono">
                <ShieldCheck size={14} /> 3 Yil Kafolat
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <Truck size={14} /> Bepul Yetkazish
              </span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Konfigurator
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#builder" className="hover:text-cyan-400 transition-colors">CPU & GPU Tanlash</a></li>
              <li><a href="#builder" className="hover:text-cyan-400 transition-colors">Quvvat Hisoblagichi</a></li>
              <li><a href="#builder" className="hover:text-cyan-400 transition-colors">Soket Moslik Tekshiruvi</a></li>
              <li><a href="#builder" className="hover:text-cyan-400 transition-colors">Shaxsiy Yig'ma Narxi</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Do'kon Katalogi
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#store" className="hover:text-cyan-400 transition-colors">Tayyor Gaming PC'lar</a></li>
              <li><a href="#store" className="hover:text-cyan-400 transition-colors">ASUS & Lenovo Noutbuklar</a></li>
              <li><a href="#store" className="hover:text-cyan-400 transition-colors">RTX 40-seriya Videokartalar</a></li>
              <li><a href="#store" className="hover:text-cyan-400 transition-colors">240Hz OLED Monitorlar</a></li>
            </ul>
          </div>

          {/* Special Actions */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-4">
              Aksiyalar & Yordam
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    playCyberClick();
                    onOpenWheel();
                  }}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-left font-semibold"
                >
                  🎁 Omad G'ildiragi (Chegirma)
                </button>
              </li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Stress-Test Xizmati</a></li>
              <li><a href="#why-us" className="hover:text-cyan-400 transition-colors">Kafolat Shartlari</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Qo'llab-Quvvatlash Xizmati</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} PC FORGE UZBEKISTAN. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>O'zbekistondagi geymerlar uchun tayyorlandi</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
