import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Gift, Check, ArrowRight } from 'lucide-react';
import { LUCKY_WHEEL_SLICES } from '../data/products';
import { DiscountOffer } from '../types';
import { playWheelTick, playWinSound, playCyberClick } from '../utils/sound';

interface PromoWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (discount: DiscountOffer) => void;
  appliedDiscount: DiscountOffer | null;
}

export default function PromoWheelModal({
  isOpen,
  onClose,
  onApplyDiscount,
  appliedDiscount
}: PromoWheelModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<DiscountOffer | null>(appliedDiscount);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const colors = [
    '#00d4ff', // cyan
    '#8b5cf6', // purple
    '#00f5a0', // neon emerald
    '#ec4899', // hot pink
    '#3b82f6', // electric blue
    '#f59e0b'  // amber gold
  ];

  // Draw wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 320;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);

    const center = size / 2;
    const radius = size / 2 - 8;
    const numSlices = LUCKY_WHEEL_SLICES.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.clearRect(0, 0, size, size);

    // Outer cyber ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00d4ff';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw slices
    LUCKY_WHEEL_SLICES.forEach((slice, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      // Inner divider line
      ctx.strokeStyle = '#05060a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text label inside slice
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#05060a';
      ctx.font = 'bold 13px "Outfit", sans-serif';
      ctx.fillText(slice.name, radius - 18, 5);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(center, center, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#05060a';
    ctx.fill();
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00d4ff';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Center icon text
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('FORGE', center, center);
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    playCyberClick();
    setIsSpinning(true);
    setWonPrize(null);

    // Pick a high-value slice (favoring 15% or 20% for delight!)
    const sliceIndex = Math.floor(Math.random() * LUCKY_WHEEL_SLICES.length);
    const sliceCount = LUCKY_WHEEL_SLICES.length;
    const sliceDeg = 360 / sliceCount;

    // Pointer is at the top (270 degrees in standard circle or 90 offset)
    const extraSpins = 6 * 360; // 6 full rotations
    // Target stop position so pointer lands inside sliceIndex
    const targetSliceCenter = (sliceIndex * sliceDeg) + (sliceDeg / 2);
    // Align with top pointer (270deg)
    const finalRotation = rotation + extraSpins + (360 - (targetSliceCenter % 360)) + 270;

    setRotation(finalRotation);

    // Tick audio interval
    let tickCount = 0;
    const maxTicks = 25;
    const tickInterval = setInterval(() => {
      tickCount++;
      playWheelTick();
      if (tickCount >= maxTicks) {
        clearInterval(tickInterval);
      }
    }, 120);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = LUCKY_WHEEL_SLICES[sliceIndex];
      setWonPrize(prize);
      playWinSound();
      triggerConfetti();
    }, 4200);
  };

  const triggerConfetti = () => {
    // Canvas confetti celebration burst
    const count = 60;
    const container = document.getElementById('wheel-confetti-root');
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = '50%';
      piece.style.top = '40%';
      piece.style.transform = `translate(-50%, -50%)`;
      piece.style.transition = `all ${0.8 + Math.random() * 0.8}s cubic-bezier(0.1, 0.8, 0.3, 1)`;
      container.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 160;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity + 40;

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${destX}px, ${destY}px) scale(${Math.random() * 1.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
        piece.style.opacity = '0';
      });

      setTimeout(() => piece.remove(), 2000);
    }
  };

  const handleApply = () => {
    if (wonPrize) {
      playCyberClick();
      onApplyDiscount(wonPrize);
      onClose();
    }
  };

  const copyCode = () => {
    if (wonPrize) {
      navigator.clipboard.writeText(wonPrize.code);
      setCopied(true);
      playCyberClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="wheel-confetti-root"
        className="relative w-full max-w-lg bg-[#0b0d14] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.25)] text-center overflow-hidden"
      >
        {/* Background glow radial */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playCyberClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Yopish"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
          <Gift size={13} />
          Xush kelibsiz aksiyasi
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-1">
          Omad G'ildiragi — Kiber Chegirma
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          G'ildirakni aylantiring va orzuingizdagi PC hamda noutbuklar uchun 25% gacha chegirmaga ega bo'ling!
        </p>

        {/* Wheel Box */}
        <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mb-6 flex items-center justify-center">
          {/* Top Pointer arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-cyan-400 drop-shadow-[0_0_10px_#00d4ff]" />

          {/* Canvas Wheel */}
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0.95, 0.35, 1)"
            style={{
              transform: `rotate(${rotation}deg)`
            }}
          />
        </div>

        {/* Controls & Win Area */}
        {wonPrize ? (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 mb-4 text-left animate-slideUp">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Sparkles size={14} className="text-emerald-400" />
                Tabriklaymiz! Siz yutdingiz
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {wonPrize.percent}% TEJALDI
              </span>
            </div>

            <div className="flex items-center justify-between bg-black/60 border border-slate-700/80 rounded-lg p-2.5 mb-2">
              <div>
                <div className="text-lg font-extrabold text-white font-['Outfit']">
                  {wonPrize.name}
                </div>
                <div className="text-xs text-slate-400">
                  Promo kod: <span className="text-cyan-400 font-mono font-bold tracking-wider">{wonPrize.code}</span>
                </div>
              </div>

              <button
                onClick={copyCode}
                className="px-3 py-1.5 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 border border-slate-700"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : null}
                {copied ? 'Nusxalandi' : 'Nusxalash'}
              </button>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              Savatchaga Qo'llash & Do'konga O'tish
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-base tracking-wider uppercase transition-all duration-300 font-['Outfit'] ${
              isSpinning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.7)] hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isSpinning ? 'G\'ildirak aylanmoqda...' : 'G\'ildirakni Aylantirish ⚡'}
          </button>
        )}

        <div className="mt-3 text-xs text-slate-500">
          Aksiya faqat bir martalik buyurtmalar uchun amal qiladi · Barcha tovarlarga kafolat beriladi
        </div>
      </div>
    </div>
  );
}
