import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { playCyberClick, playWinSound } from '../utils/sound';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('+998 ');
  const [formMsg, setFormMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPhone.trim().length < 9) return;
    playCyberClick();
    setSent(true);
    playWinSound();
    setTimeout(() => {
      setFormName('');
      setFormPhone('+998 ');
      setFormMsg('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-[#05060a] border-t border-slate-800/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-label">Biz Bilan Bog'laning</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            Ekspertlarimiz Sizga <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Yordam Beradi</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Qaysi qismlar sizning byudjetingizga mos kelishini bilmoqchimisiz? Biz bilan bog'laning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Details */}
          <div className="bg-[#0b0e17] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-4">
              Markaziy Showroom & Servis Markazi
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-800">
                <MapPin className="text-cyan-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-bold text-white mb-0.5">Manzil</div>
                  <div className="text-slate-400">Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi 108A</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-800">
                <Phone className="text-purple-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-bold text-white mb-0.5">Telefon raqam</div>
                  <div className="text-slate-400 font-mono">+998 (71) 200-44-88 / +998 (90) 012-34-56</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-800">
                <Mail className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-bold text-white mb-0.5">Elektron pochta</div>
                  <div className="text-slate-400 font-mono">support@pcforge.uz</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="text-cyan-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-bold text-white mb-0.5">Ish vaqti</div>
                  <div className="text-slate-400">Har kuni 09:00 dan 21:00 gacha (Damsiz)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
              Bepul Konsultatsiya Olish
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Raqamingizni qoldiring, muhandisimiz 10 daqiqa ichida qo'ng'iroq qilib, eng mos komponentlarni tanlab beradi.
            </p>

            {sent ? (
              <div className="p-6 text-center bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-2">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">So'rovingiz Qabul Qilindi!</h4>
                <p className="text-xs text-slate-400">Tez orada mutaxassisimiz siz bilan bog'lanadi.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 text-xs text-cyan-400 underline font-mono"
                >
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Jamshid"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefon Raqamingiz *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Qanday PC kerak yoki savolingiz
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masalan: 1,500$ byudjetga CS2 va montaj uchun kuchli kompyuter..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,212,255,0.35)] flex items-center justify-center gap-2 font-['Outfit']"
                >
                  <Send size={15} />
                  <span>Xabarni Yuborish</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
