import React from 'react';
import { BRANDS } from '../data/products';

export default function Marquee() {
  const repeatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full bg-[#07090f] border-y border-slate-800/80 py-5 overflow-hidden relative">
      {/* Side gradients for soft fade edge */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090f] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-10 text-xs sm:text-sm font-black font-mono tracking-widest text-slate-500 hover:text-cyan-400 uppercase select-none">
        {repeatedBrands.map((brand, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="hover:text-cyan-400 transition-colors duration-200 cursor-default">
              {brand}
            </span>
            <span className="text-cyan-500/40 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
