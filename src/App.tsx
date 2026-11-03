import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import PCBuilder from './components/PCBuilder';
import StoreCatalog from './components/StoreCatalog';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PromoWheelModal from './components/PromoWheelModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

import { Currency, CartItem, DiscountOffer } from './types';
import useReveal from './hooks/useReveal';
import useFX from './hooks/useFX';
import { playCartSound } from './utils/sound';

export default function App() {
  useReveal();
  useFX();

  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pcforge_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState<DiscountOffer | null>(() => {
    try {
      const saved = localStorage.getItem('pcforge_discount');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pcforge_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync discount to localStorage
  useEffect(() => {
    try {
      if (appliedDiscount) {
        localStorage.setItem('pcforge_discount', JSON.stringify(appliedDiscount));
      } else {
        localStorage.removeItem('pcforge_discount');
      }
    } catch {}
  }, [appliedDiscount]);

  // Open wheel automatically for new users after loader finishes
  const handleLoaderDone = () => {
    const hasSeenWheel = sessionStorage.getItem('pcforge_wheel_seen');
    if (!hasSeenWheel) {
      setTimeout(() => {
        setIsWheelOpen(true);
        sessionStorage.setItem('pcforge_wheel_seen', 'true');
      }, 700);
    }
  };

  // Toggle currency between USD and UZS
  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'UZS' : 'USD'));
  };

  // Add item to cart
  const handleAddToCart = (item: CartItem) => {
    playCartSound();
    setCart((prev) => {
      // If custom build, always add as unique item
      if (item.isCustomBuild) {
        return [...prev, item];
      }
      // Check if product exists already
      const index = prev.findIndex((p) => p.id === item.id && !p.isCustomBuild);
      if (index > -1) {
        const next = [...prev];
        next[index] = { ...next[index], quantity: next[index].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });

    setToastMessage(`"${item.name}" savatchaga qo'shildi!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update item quantity
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove item
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Apply discount offer
  const handleApplyDiscount = (discount: DiscountOffer | null) => {
    setAppliedDiscount(discount);
    if (discount) {
      setToastMessage(`🎁 "${discount.code}" chegirma kodi faollashtirildi (-${discount.percent}%)!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // On order success
  const handleOrderSuccess = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 font-['Plus_Jakarta_Sans'] antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Bootloader */}
      <Loader onDone={handleLoaderDone} />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" />

      {/* Cyber Cursor Glow */}
      <div className="cursor-glow" />

      {/* Interactive Background Particle Field */}
      <ParticleField />

      {/* Main Navigation */}
      <Navbar
        currency={currency}
        onToggleCurrency={toggleCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWheel={() => setIsWheelOpen(true)}
        hasDiscount={!!appliedDiscount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-400 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(0,212,255,0.35)] animate-slideUp flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <Hero onOpenWheel={() => setIsWheelOpen(true)} />

      {/* Hardware Partners Marquee */}
      <Marquee />

      {/* Flagship Feature: PC Builder (Konfigurator) */}
      <PCBuilder
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Multi-category Store Catalog: Prebuilts, Laptops, Components, Peripherals */}
      <StoreCatalog
        currency={currency}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Engineering Services */}
      <Services />

      {/* Why Choose Us */}
      <WhyUs />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Consultation & Showroom Contact */}
      <Contact />

      {/* Footer */}
      <Footer onOpenWheel={() => setIsWheelOpen(true)} />

      {/* Lucky Wheel Discount Modal */}
      <PromoWheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        onApplyDiscount={handleApplyDiscount}
        appliedDiscount={appliedDiscount}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedDiscount={appliedDiscount}
        onApplyDiscount={handleApplyDiscount}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        appliedDiscount={appliedDiscount}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
