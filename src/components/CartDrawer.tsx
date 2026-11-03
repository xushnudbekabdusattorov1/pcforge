import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { CartItem, Currency, DiscountOffer } from '../types';
import { formatPrice } from '../utils/currency';
import { playCyberClick, playCartSound } from '../utils/sound';
import { LUCKY_WHEEL_SLICES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  appliedDiscount: DiscountOffer | null;
  onApplyDiscount: (discount: DiscountOffer | null) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  appliedDiscount,
  onApplyDiscount,
  onProceedToCheckout
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Subtotal in USD
  const subtotalUSD = cart.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);

  // Discount calculation
  const discountAmountUSD = appliedDiscount ? (subtotalUSD * appliedDiscount.percent) / 100 : 0;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberClick();
    const clean = promoInput.trim().toUpperCase();

    const matched = LUCKY_WHEEL_SLICES.find((s) => s.code.toUpperCase() === clean);
    if (matched) {
      onApplyDiscount(matched);
      setPromoSuccess(`"${matched.code}" kodi qabul qilindi (-${matched.percent}%)!`);
      setPromoError('');
      setPromoInput('');
      playCartSound();
    } else {
      setPromoError('Noto\'g\'ri promo kod. Omad g\'ildiragini aylantirib ko\'ring!');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0d14] border-l border-cyan-500/30 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0e121b]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-['Outfit']">
                Savatcha ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Yopish"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-base font-semibold text-slate-400 mb-2">Savatchangiz bo'sh</p>
                <p className="text-xs text-slate-500 mb-6">
                  Do'kondan tovarlar tanlang yoki o'zingiz maxsus kompyuter yig'ing.
                </p>
                <button
                  onClick={() => {
                    playCyberClick();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                >
                  Xaridni Boshlash →
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2 relative group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-white font-['Outfit'] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => {
                            playCyberClick();
                            onRemoveItem(item.cartId);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* If custom build, show parts breakdown */}
                      {item.isCustomBuild && item.customDetails ? (
                        <div className="my-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/60 rounded px-2 py-1">
                          <div className="flex items-center gap-1 font-bold">
                            <Cpu size={12} />
                            Maxsus Yig'ma ({item.customDetails.totalWattage}W quvvat)
                          </div>
                          <div className="text-slate-400 text-[10px] truncate mt-0.5">
                            {Object.values(item.customDetails.parts).slice(0, 3).join(', ')}...
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 capitalize">
                          Toifa: {item.category}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                        <div className="text-sm font-black text-cyan-400 font-mono tabular-nums">
                          {formatPrice(item.priceUSD * item.quantity, currency)}
                        </div>

                        {/* Quantity Controls */}
                        {!item.isCustomBuild ? (
                          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
                            <button
                              onClick={() => {
                                playCyberClick();
                                onUpdateQuantity(item.cartId, -1);
                              }}
                              className="p-1 hover:text-white text-slate-400"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-mono font-bold text-white px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                playCyberClick();
                                onUpdateQuantity(item.cartId, 1);
                              }}
                              className="p-1 hover:text-white text-slate-400"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            Dona: 1
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Box */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#0c0f17] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo kod (masalan: CYBER20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    Qo'llash
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400">{promoSuccess}</p>}
              </form>

              {/* Applied Discount Badge */}
              {appliedDiscount && (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Check size={14} />
                    <span>Faol Chegirma: {appliedDiscount.name} (-{appliedDiscount.percent}%)</span>
                  </div>
                  <button
                    onClick={() => {
                      playCyberClick();
                      onApplyDiscount(null);
                    }}
                    className="text-slate-400 hover:text-rose-400 font-mono text-[11px]"
                  >
                    Bekor qilish
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Oraliq summa:</span>
                  <span className="text-slate-200 tabular-nums">{formatPrice(subtotalUSD, currency)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Yutilgan chegirma ({appliedDiscount.percent}%):</span>
                    <span className="tabular-nums">-{formatPrice(discountAmountUSD, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="text-cyan-400">Bepul (0 so'm)</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span className="font-['Outfit']">Jami to'lov:</span>
                  <span className="text-cyan-400 tabular-nums">{formatPrice(totalUSD, currency)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  playCyberClick();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-extrabold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 font-['Outfit'] active:scale-[0.98]"
              >
                <span>Buyurtmani Rasmiylashtirish</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>3 yillik rasmiy kafolat · Toshkent bo'ylab 2 soatda yetkazish</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
