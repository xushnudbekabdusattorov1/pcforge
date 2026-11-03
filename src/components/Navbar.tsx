import React, { useState, useEffect } from 'react';
import { ShoppingCart, Volume2, VolumeX, Gift, Menu, X } from 'lucide-react';
import { Currency } from '../types';
import { isSoundEnabled, setSoundEnabled, playCyberClick } from '../utils/sound';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWheel: () => void;
  hasDiscount: boolean;
}

export default function Navbar({
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  onOpenWheel,
  hasDiscount
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playCyberClick();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05060a]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.7)]'
          : 'bg-transparent border-b border-slate-800/40'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={() => playCyberClick()}
          className="text-xl sm:text-2xl font-black tracking-wider text-white whitespace-nowrap shrink-0 font-['Outfit'] group flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff] group-hover:scale-125 transition-transform" />
          <span>
            PC<span className="text-cyan-400">FORGE</span>
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-semibold text-slate-300">
          <a
            href="#builder"
            onClick={() => playCyberClick()}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            PC Yig'ish
          </a>
          <a
            href="#store"
            onClick={() => playCyberClick()}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Do'kon & Noutbuklar
          </a>
          <a
            href="#services"
            onClick={() => playCyberClick()}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Xizmatlar
          </a>
          <a
            href="#why-us"
            onClick={() => playCyberClick()}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Afzalliklar
          </a>
          <a
            href="#contact"
            onClick={() => playCyberClick()}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Aloqa
          </a>
        </nav>

        {/* Zone 3: Interactive controls & Cart Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Currency Toggle */}
          <button
            onClick={() => {
              playCyberClick();
              onToggleCurrency();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-all flex items-center gap-1 shadow-sm"
            title="Valyutani almashtirish (USD / UZS)"
          >
            <span className={currency === 'UZS' ? 'text-cyan-400 font-extrabold' : 'text-slate-400'}>
              UZS
            </span>
            <span className="text-slate-600">/</span>
            <span className={currency === 'USD' ? 'text-cyan-400 font-extrabold' : 'text-slate-400'}>
              USD
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
            title={soundOn ? 'Tovushni o\'chirish' : 'Tovushni yoqish'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Lucky Wheel Promo trigger */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenWheel();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              hasDiscount
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600 hover:to-pink-600 text-purple-300 hover:text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.25)] animate-pulse'
            }`}
            title="Omad G'ildiragi chegirmasini ochish"
          >
            <Gift size={14} />
            <span className="hidden sm:inline">{hasDiscount ? 'Chegirma faol' : 'Sovg\'a Yutish'}</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenCart();
            }}
            className="relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,212,255,0.35)] flex items-center gap-2 hover:scale-105 active:scale-95"
            title="Savatcha"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Savatcha</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-slate-950 text-cyan-300 font-mono text-[11px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-slate-800 px-6 py-4 space-y-3">
          <a
            href="#builder"
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1"
          >
            PC Yig'ish (Konfigurator)
          </a>
          <a
            href="#store"
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1"
          >
            Do'kon & Noutbuklar
          </a>
          <a
            href="#services"
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1"
          >
            Xizmatlar
          </a>
          <a
            href="#why-us"
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1"
          >
            Afzalliklar
          </a>
          <a
            href="#contact"
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1"
          >
            Aloqa
          </a>
        </div>
      )}
    </header>
  );
}
