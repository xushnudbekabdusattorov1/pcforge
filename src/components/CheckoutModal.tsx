import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CalendarCheck,
  Package
} from 'lucide-react';
import { CartItem, Currency, DiscountOffer } from '../types';
import { formatPrice } from '../utils/currency';
import { playCyberClick, playWinSound } from '../utils/sound';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  appliedDiscount: DiscountOffer | null;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  appliedDiscount,
  onOrderSuccess
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [city, setCity] = useState('Toshkent shahri');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'installment'>('cash');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotalUSD = cart.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const discountAmountUSD = appliedDiscount ? (subtotalUSD * appliedDiscount.percent) / 100 : 0;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 9) {
      alert('Iltimos, ismingiz va telefon raqamingizni to\'liq kiriting.');
      return;
    }

    setIsSubmitting(true);
    playCyberClick();

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = `PF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      playWinSound();
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,212,255,0.2)] text-left max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playCyberClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {orderNumber ? (
          /* Order Confirmation Screen */
          <div className="text-center py-6 space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/60 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-black text-white font-['Outfit']">
              Buyurtmangiz Qabul Qilindi!
            </h3>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-w-sm mx-auto text-left space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Buyurtma raqami:</span>
                <span className="text-cyan-400 font-mono font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Mijoz:</span>
                <span className="text-white font-semibold">{name}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Telefon:</span>
                <span className="text-white font-mono">{phone}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Yetkazish manzili:</span>
                <span className="text-white">{city}, {address || 'Markaziy ofis'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Jami summa:</span>
                <span className="text-cyan-400 font-mono tabular-nums">{formatPrice(totalUSD, currency)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Operatorimiz 15 daqiqa ichida buyurtmangizni tasdiqlash va yetkazib berish vaqtini kelishish uchun siz bilan bog'lanadi.
            </p>

            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-transform hover:scale-105"
            >
              Do'konga Qaytish
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-mono uppercase tracking-widest font-bold">
              <Package size={14} />
              Tezkor Buyurtma
            </div>
            <h3 className="text-2xl font-black text-white font-['Outfit'] mb-1">
              Buyurtmani Rasmiylashtirish
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Ma'lumotlaringizni to'ldiring. Yetkazib berish butun O'zbekiston bo'ylab mutlaqo bepul!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ism va Familiya *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor Aliyev"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefon Raqam *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shahar / Hudud
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Toshkent shahri">Toshkent shahri</option>
                    <option value="Samarqand">Samarqand viloyati</option>
                    <option value="Buxoro">Buxoro viloyati</option>
                    <option value="Farg'ona">Farg'ona viloyati</option>
                    <option value="Andijon">Andijon viloyati</option>
                    <option value="Namangan">Namangan viloyati</option>
                    <option value="Qashqadaryo">Qashqadaryo viloyati</option>
                    <option value="Xorazm">Xorazm viloyati</option>
                    <option value="Boshqa hudud">Boshqa viloyat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Yetkazish Manzili (Ko'cha, uy)
                  </label>
                  <input
                    type="text"
                    placeholder="Chilonzor 9-mavze, 12-uy"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  To'lov Usuli
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playCyberClick();
                      setPaymentMethod('cash');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Banknote size={18} className="mx-auto mb-1 text-cyan-400" />
                    <div className="text-xs font-bold">Qabulda Naqd</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCyberClick();
                      setPaymentMethod('card');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard size={18} className="mx-auto mb-1 text-purple-400" />
                    <div className="text-xs font-bold">Uzcard / Humo</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCyberClick();
                      setPaymentMethod('installment');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'installment'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CalendarCheck size={18} className="mx-auto mb-1 text-emerald-400" />
                    <div className="text-xs font-bold">0% Nasiya</div>
                  </button>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Jami mahsulotlar ({cart.length} ta):</span>
                  <span>{formatPrice(subtotalUSD, currency)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Yutilgan chegirma ({appliedDiscount.code}):</span>
                    <span>-{formatPrice(discountAmountUSD, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Kuryerlik xizmati:</span>
                  <span className="text-cyan-400 font-bold">0 so'm (Bepul)</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>To'lanadigan summa:</span>
                  <span className="text-cyan-400 tabular-nums">{formatPrice(totalUSD, currency)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-extrabold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 font-['Outfit'] active:scale-[0.98]"
              >
                {isSubmitting ? 'Rasmiylashtirilmoqda...' : 'Buyurtmani Tasdiqlash ⚡'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>3 yillik rasmiy kafolat sertifikati kiritiladi</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
