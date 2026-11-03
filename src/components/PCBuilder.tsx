import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Tv,
  Layers,
  Zap,
  HardDrive,
  Fan,
  BatteryCharging,
  Box,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BUILDER_COMPONENTS } from '../data/products';
import { ComponentOption, CustomBuildSelection, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/currency';
import { playCyberClick, playCartSound } from '../utils/sound';

interface PCBuilderProps {
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

type CategoryKey = keyof CustomBuildSelection;

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'cpu', label: 'Protsessor (CPU)', icon: <Cpu size={18} />, desc: 'Tizimning hisoblash markazi' },
  { key: 'gpu', label: 'Videokarta (GPU)', icon: <Tv size={18} />, desc: 'Ultra grafikalar va FPS quvvati' },
  { key: 'motherboard', label: 'Ona Plata', icon: <Layers size={18} />, desc: 'Barcha qismlarni bog\'lovchi poydevor' },
  { key: 'ram', label: 'Tezkor Xotira (RAM)', icon: <Zap size={18} />, desc: 'DDR5 yuqori chastotali modullar' },
  { key: 'storage', label: 'SSD Drayver', icon: <HardDrive size={18} />, desc: 'O\'ta tezkor PCIe 4.0/5.0 drayver' },
  { key: 'cooler', label: 'Sovutish Tizimi', icon: <Fan size={18} />, desc: 'Suyuqlikli yoki havoli kuchli sovitkich' },
  { key: 'psu', label: 'Blok Pitaniya (PSU)', icon: <BatteryCharging size={18} />, desc: 'Barqaror tok ta\'minoti' },
  { key: 'case', label: 'Kompyuter Korpusi', icon: <Box size={18} />, desc: 'Shisha panelli kiber korpus' }
];

export default function PCBuilder({ currency, onAddToCart, onOpenCart }: PCBuilderProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('cpu');
  const [build, setBuild] = useState<CustomBuildSelection>({
    cpu: BUILDER_COMPONENTS.cpu[1], // Ryzen 7 7800X3D default
    gpu: BUILDER_COMPONENTS.gpu[1], // RTX 4070 Super default
    motherboard: BUILDER_COMPONENTS.motherboard[0], // MSI B650 default
    ram: BUILDER_COMPONENTS.ram[1], // 32GB default
    storage: BUILDER_COMPONENTS.storage[1], // 2TB Samsung default
    cooler: BUILDER_COMPONENTS.cooler[1], // 360mm AIO default
    psu: BUILDER_COMPONENTS.psu[1], // 850W default
    case: BUILDER_COMPONENTS.case[1] // NZXT H9 default
  });

  const [addedSuccess, setAddedSuccess] = useState(false);

  // Select component
  const handleSelect = (category: CategoryKey, option: ComponentOption) => {
    playCyberClick();
    setBuild((prev) => ({
      ...prev,
      [category]: option
    }));
  };

  // Reset build
  const handleReset = () => {
    playCyberClick();
    setBuild({
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      cooler: null,
      psu: null,
      case: null
    });
  };

  // Quick preset: Esports Pro
  const applyPresetEsports = () => {
    playCyberClick();
    setBuild({
      cpu: BUILDER_COMPONENTS.cpu[1],
      gpu: BUILDER_COMPONENTS.gpu[1],
      motherboard: BUILDER_COMPONENTS.motherboard[0],
      ram: BUILDER_COMPONENTS.ram[1],
      storage: BUILDER_COMPONENTS.storage[1],
      cooler: BUILDER_COMPONENTS.cooler[1],
      psu: BUILDER_COMPONENTS.psu[1],
      case: BUILDER_COMPONENTS.case[1]
    });
  };

  // Quick preset: Beast 4090 Extreme
  const applyPresetBeast = () => {
    playCyberClick();
    setBuild({
      cpu: BUILDER_COMPONENTS.cpu[3],
      gpu: BUILDER_COMPONENTS.gpu[3],
      motherboard: BUILDER_COMPONENTS.motherboard[1],
      ram: BUILDER_COMPONENTS.ram[2],
      storage: BUILDER_COMPONENTS.storage[2],
      cooler: BUILDER_COMPONENTS.cooler[2],
      psu: BUILDER_COMPONENTS.psu[2],
      case: BUILDER_COMPONENTS.case[2]
    });
  };

  // Metrics
  const { totalPriceUSD, totalWattage, isCompatible, compatibilityIssues, selectedCount } = useMemo(() => {
    let price = 0;
    let watts = 0;
    let count = 0;
    const issues: string[] = [];

    (Object.keys(build) as CategoryKey[]).forEach((key) => {
      const item = build[key];
      if (item) {
        price += item.priceUSD;
        count++;
        // If it's a consuming component
        if (key !== 'psu' && key !== 'case') {
          watts += item.wattage;
        }
      }
    });

    // Check Socket compatibility
    if (build.cpu && build.motherboard) {
      if (build.cpu.socket && build.motherboard.socket && build.cpu.socket !== build.motherboard.socket) {
        issues.push(`Soket nomuvofiqligi: CPU (${build.cpu.socket}) va Ona Plata (${build.motherboard.socket})`);
      }
    }

    // Check PSU Capacity
    if (build.psu) {
      const requiredWatts = watts * 1.25; // 25% safety overhead
      if (build.psu.wattage < requiredWatts) {
        issues.push(`Blok pitaniya quvvati yetarli emas: Tavsiya etiladi min ${Math.round(requiredWatts)}W (Tanlangan: ${build.psu.wattage}W)`);
      }
    }

    return {
      totalPriceUSD: price,
      totalWattage: watts,
      isCompatible: issues.length === 0,
      compatibilityIssues: issues,
      selectedCount: count
    };
  }, [build]);

  // Add customized build to cart
  const handleAddBuildToCart = () => {
    playCartSound();
    const partsSummary: { [key: string]: string } = {};
    const specsList: string[] = [];

    CATEGORIES.forEach(({ key, label }) => {
      const part = build[key];
      if (part) {
        partsSummary[label] = part.name;
        specsList.push(`${part.name} (${part.specs})`);
      }
    });

    const customCartItem: CartItem = {
      cartId: 'custom-build-' + Date.now(),
      id: 'custom-pc-forge',
      name: `PC Forge Maxsus Yig'ma (${build.cpu?.name || 'Custom CPU'} + ${build.gpu?.name || 'Custom GPU'})`,
      category: 'prebuilt',
      priceUSD: totalPriceUSD,
      image: build.case?.image || 'https://images.unsplash.com/photo-1587202374404-00657ed4d00e?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      isCustomBuild: true,
      customDetails: {
        totalWattage,
        parts: partsSummary
      },
      specs: specsList
    };

    onAddToCart(customCartItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const currentOptions = BUILDER_COMPONENTS[activeCategory] || [];

  return (
    <section id="builder" className="py-24 bg-[#07090e] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            INTERAKTIV KONFIGURATOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            O'zingizning Orzuingizdagi <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">PC'ni Yig'ing</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Qismlarni erkin tanlang, real vaqtda moslik va umumiy narxni hisoblang hamda tayyor shaxsiy yig'mangizni to'g'ridan-to'g'ri savatchaga qo'shing.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="text-xs font-mono text-slate-400">Tezkor presetlar:</span>
            <button
              onClick={applyPresetEsports}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              🎮 Esports Pro ($1,900)
            </button>
            <button
              onClick={applyPresetBeast}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-400 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              👑 4K Beast Titan ($4,900)
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-rose-500/60 text-xs text-slate-400 hover:text-rose-400 transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={12} />
              Tozalash
            </button>
          </div>
        </div>

        {/* Builder Layout: Category Tabs, Component List, Live Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Category Navigation (3 cols) */}
          <div className="lg:col-span-3 bg-[#0d1017] border border-slate-800 rounded-2xl p-3 sm:p-4 space-y-1.5 sticky top-24">
            <div className="px-3 py-2 text-xs font-mono uppercase text-slate-400 border-b border-slate-800/80 mb-2 flex items-center justify-between">
              <span>Yig'ish Bosqichlari</span>
              <span className="text-cyan-400 font-bold">{selectedCount}/8</span>
            </div>

            {CATEGORIES.map((cat) => {
              const selectedItem = build[cat.key];
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    playCyberClick();
                    setActiveCategory(cat.key);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                      : 'bg-slate-900/40 border border-transparent hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : selectedItem
                          ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{cat.label}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                        {selectedItem ? selectedItem.name : 'Tanlanmagan'}
                      </div>
                    </div>
                  </div>

                  {selectedItem ? (
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* MIDDLE: Component Selection Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0d1017] border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {CATEGORIES.find((c) => c.key === activeCategory)?.label}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {CATEGORIES.find((c) => c.key === activeCategory)?.desc}
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800">
                  {currentOptions.length} ta variant
                </span>
              </div>

              {/* Component Options List */}
              <div className="space-y-3">
                {currentOptions.map((option) => {
                  const isSelected = build[activeCategory]?.id === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelect(activeCategory, option)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                          loading="lazy"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              {option.brand}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                option.tier === 'Extreme'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                  : option.tier === 'Pro'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              {option.tier}
                            </span>
                            {option.wattage > 0 && activeCategory !== 'psu' && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                {option.wattage}W
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {option.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {option.specs}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                        <div className="text-base font-mono font-extrabold text-cyan-400 tabular-nums">
                          {formatPrice(option.priceUSD, currency)}
                        </div>
                        <button
                          type="button"
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950'
                          }`}
                        >
                          {isSelected ? 'Tanlangan ✓' : 'Tanlash'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Chassis Assembly & Cart Summary Console (4 cols) */}
          <div className="lg:col-span-4 bg-[#0d1017] border border-cyan-500/25 rounded-2xl p-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] sticky top-24">
            {/* Chassis Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d4ff]" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                  Jonli PC Arxitekturasi
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {selectedCount}/8 Qism
              </span>
            </div>

            {/* Visual Chassis Blueprint Preview */}
            <div className="relative w-full h-44 rounded-xl bg-gradient-to-b from-slate-950 to-[#090b10] border border-slate-800 flex items-center justify-center p-4 mb-4 overflow-hidden">
              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(rgba(0,212,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Holographic Chassis graphic representation */}
              <div className="relative z-10 w-full max-w-[240px] h-36 border-2 border-cyan-500/40 rounded-lg p-2.5 flex flex-col justify-between bg-black/40 backdrop-blur-sm shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                {/* Top: AIO / Cooler representation */}
                <div className={`h-4 rounded border text-[9px] font-mono flex items-center justify-center transition-colors ${
                  build.cooler ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-dashed border-slate-700 text-slate-600'
                }`}>
                  {build.cooler ? `AIO: ${build.cooler.brand}` : '360mm Cooler Slot'}
                </div>

                {/* Middle: Motherboard with CPU, RAM, GPU */}
                <div className="flex-1 my-1.5 border border-slate-800 rounded p-1.5 flex gap-1.5 bg-slate-950/60">
                  {/* Left: CPU & RAM */}
                  <div className="flex-1 flex flex-col gap-1 justify-center">
                    <div className={`h-6 rounded border text-[8px] font-mono flex items-center justify-center transition-colors ${
                      build.cpu ? 'border-violet-400 bg-violet-500/25 text-violet-200' : 'border-dashed border-slate-700 text-slate-600'
                    }`}>
                      {build.cpu ? build.cpu.name.replace('AMD ', '').replace('Intel ', '') : 'CPU'}
                    </div>
                    <div className={`h-4 rounded border text-[8px] font-mono flex items-center justify-center transition-colors ${
                      build.ram ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300' : 'border-dashed border-slate-700 text-slate-600'
                    }`}>
                      {build.ram ? 'DDR5 32GB' : 'RAM'}
                    </div>
                  </div>

                  {/* Right: GPU slot */}
                  <div className={`w-20 rounded border text-[9px] font-mono flex items-center justify-center transition-colors ${
                    build.gpu ? 'border-cyan-400 bg-cyan-500/30 text-cyan-200 font-bold' : 'border-dashed border-slate-700 text-slate-600'
                  }`}>
                    {build.gpu ? build.gpu.name.replace('GeForce ', '') : 'GPU Slot'}
                  </div>
                </div>

                {/* Bottom: PSU & Storage */}
                <div className="flex gap-1.5">
                  <div className={`flex-1 h-5 rounded border text-[8px] font-mono flex items-center justify-center transition-colors ${
                    build.psu ? 'border-amber-400 bg-amber-500/20 text-amber-300' : 'border-dashed border-slate-700 text-slate-600'
                  }`}>
                    {build.psu ? `${build.psu.wattage}W PSU` : 'PSU'}
                  </div>
                  <div className={`flex-1 h-5 rounded border text-[8px] font-mono flex items-center justify-center transition-colors ${
                    build.storage ? 'border-blue-400 bg-blue-500/20 text-blue-300' : 'border-dashed border-slate-700 text-slate-600'
                  }`}>
                    {build.storage ? 'NVMe M.2' : 'SSD'}
                  </div>
                </div>
              </div>
            </div>

            {/* Wattage & Compatibility Meter */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Hisoblangan quvvat:</span>
                <span className="text-cyan-400 font-bold font-mono tabular-nums">{totalWattage} Watt</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    totalWattage > 650 ? 'bg-amber-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${Math.min((totalWattage / 850) * 100, 100)}%` }}
                />
              </div>

              {/* Compatibility Status */}
              <div className="pt-1 flex items-center gap-2 text-xs">
                {isCompatible ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                    <ShieldCheck size={14} />
                    <span>Barcha qismlar 100% mos keladi</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-400 font-mono">
                    <AlertTriangle size={14} />
                    <span>{compatibilityIssues[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Total */}
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-3.5 mb-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Jami Hisoblangan Narx:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tabular-nums">
                {formatPrice(totalPriceUSD, currency)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <span>+ Bepul professional yig'ish & 3 yillik kafolat</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleAddBuildToCart}
                disabled={selectedCount < 4}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 font-['Outfit'] ${
                  addedSuccess
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : selectedCount < 4
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 shadow-[0_0_25px_rgba(0,212,255,0.35)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] active:scale-[0.98]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    Savatchaga Qo'shildi!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    PC'ni Savatchaga Qo'shish
                  </>
                )}
              </button>

              {addedSuccess && (
                <button
                  onClick={() => {
                    playCyberClick();
                    onOpenCart();
                  }}
                  className="w-full py-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline text-center"
                >
                  Savatchani ko'rish →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
