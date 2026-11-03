import React, { useEffect, useState } from 'react';
import { playCyberClick } from '../utils/sound';

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [percent, setPercent] = useState(0);
  const [line, setLine] = useState('SYSTEM BOOTING...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const lines = [
      'INITIALIZING NEURAL FORGE...',
      'CHECKING HARDWARE BUS & BUS PROTOCOLS...',
      'CALIBRATING THERMAL SENSORS & RGB...',
      'OPTIMIZING GRAPHICS OVERCLOCKING...',
      'CONNECTING QUANTUM STOREFRONT...',
      'FORGE SYSTEM READY'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setLine('FORGE SYSTEM ONLINE');
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          playCyberClick();
          if (onDone) onDone();
        }, 350);
      } else {
        setPercent(current);
        const lineIdx = Math.min(Math.floor((current / 100) * lines.length), lines.length - 1);
        setLine(lines[lineIdx]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onDone]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#05060a] transition-all duration-700 ${
        percent === 100 ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="w-[90%] max-w-md p-6 text-center">
        {/* Glowing Logo */}
        <div className="inline-block mb-6 relative">
          <span className="text-4xl md:text-5xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent font-['Outfit']">
            PC FORGE
          </span>
          <div className="text-[11px] font-mono text-cyan-400 tracking-[0.3em] uppercase mt-1">
            CYBERNETIC RIG ARCHITECTURE
          </div>
        </div>

        {/* Status Line */}
        <div className="font-mono text-xs text-slate-400 mb-3 h-5 flex items-center justify-center">
          <span>{line}</span>
          <span className="inline-block w-2 h-3 ml-1 bg-cyan-400 animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-400 rounded-full transition-all duration-100 shadow-[0_0_12px_#00d4ff]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="flex justify-between items-center mt-2 font-mono text-xs text-slate-500">
          <span>v2.4.0 PRO</span>
          <span className="text-cyan-400 font-bold tabular-nums">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
