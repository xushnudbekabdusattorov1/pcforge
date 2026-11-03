import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, Flame, Cpu, Zap } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function Hero({ onOpenWheel }: { onOpenWheel: () => void }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#05060a]">
      {/* Background Neon Rings */}
      <div className="rings">
        <i />
        <i />
        <i />
      </div>

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #00d4ff 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 text-center">
        {/* Top Chip / Promo Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono tracking-wider mb-6 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d4ff]" />
          <span>YANGI AVLOD RTX 40-SERIYA & AMD 7000 TIZIMLARI</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6 font-['Outfit']">
          Cheksiz Quvvatga Ega <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]">
            O'z Gaming PC'ingizni
          </span>{' '}
          Yig'ing
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          O'zingizning shaxsiy kompyuteringizni bosqichma-bosqich yig'ing yoki sinovdan o'tgan tayyor kuchli gaming PC va noutbuklarni kafolat bilan xarid qiling.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#builder"
            onClick={() => playCyberClick()}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.65)] hover:scale-105 active:scale-95 flex items-center gap-2.5 font-['Outfit']"
          >
            <Wrench size={18} />
            <span>O'z PC'ingni Yig'ish</span>
          </a>

          <a
            href="#store"
            onClick={() => playCyberClick()}
            className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white font-bold text-sm sm:text-base tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-['Outfit']"
          >
            <span>Tayyor PC & Noutbuklar</span>
            <ArrowRight size={18} />
          </a>

          <button
            onClick={() => {
              playCyberClick();
              onOpenWheel();
            }}
            className="px-6 py-4 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 hover:text-white font-bold text-sm sm:text-base tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)]"
          >
            <Flame size={18} className="text-pink-400" />
            <span>Chegirma Yutish (Wheel)</span>
          </button>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tabular-nums mb-1">
              3,400+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Muvaffaqiyatli Yig'ilgan PC
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tabular-nums mb-1">
              3 Yil
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              To'liq Rasmiy Kafolat
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums mb-1">
              48 Soat
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Stress-Test & Tekshiruv
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono tabular-nums mb-1">
              0 So'm
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              O'zbekiston Bo'ylab Yetkazish
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
