import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  Star,
  Check,
  Eye,
  X,
  Filter,
  Monitor,
  Laptop,
  Cpu,
  Headphones,
  Sparkles
} from 'lucide-react';
import { STORE_PRODUCTS } from '../data/products';
import { Product, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/currency';
import { playCyberClick, playCartSound } from '../utils/sound';

interface StoreCatalogProps {
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

type TabType = 'all' | 'prebuilt' | 'laptop' | 'component' | 'peripheral';

export default function StoreCatalog({ currency, onAddToCart, onOpenCart }: StoreCatalogProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'Barcha Mahsulotlar', icon: <Sparkles size={16} /> },
    { key: 'prebuilt', label: 'Tayyor PC\'lar', icon: <Monitor size={16} /> },
    { key: 'laptop', label: 'Noutbuklar', icon: <Laptop size={16} /> },
    { key: 'component', label: 'Butlovchi Qismlar', icon: <Cpu size={16} /> },
    { key: 'peripheral', label: 'Periferiya & Jihozlar', icon: <Headphones size={16} /> }
  ];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((product) => {
      const matchesTab = activeTab === 'all' || product.category === activeTab;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.specs.some((s) => s.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [activeTab, searchQuery, sortBy]);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCartSound();

    const cartItem: CartItem = {
      cartId: `${product.id}-${Date.now()}`,
      id: product.id,
      name: product.name,
      category: product.category,
      priceUSD: product.priceUSD,
      image: product.image,
      quantity: 1,
      specs: product.specs
    };

    onAddToCart(cartItem);

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="store" className="py-24 bg-[#05060a] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-label">Rasmiy Mahsulotlar Katalogi</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
            Tayyor Gaming PC'lar, Noutbuklar va <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Premium Uskunalar</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Eng so'nggi avlod texnologiyalari bilan jihozlangan sertifikatlangan tizimlar va butlovchi qismlarni xarid qiling.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-[#0b0d14] border border-slate-800 rounded-2xl p-4 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    playCyberClick();
                    setActiveTab(tab.key);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Qidiruv (model, brend)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    playCyberClick();
                    setSortBy(e.target.value as any);
                  }}
                  className="bg-slate-900/80 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="featured">Tavsiya etilgan</option>
                  <option value="price-asc">Narx: Arzondan qimmatga</option>
                  <option value="price-desc">Narx: Qimmatdan arzonga</option>
                  <option value="rating">Reyting bo'yicha</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <Filter size={40} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">Hech narsa topilmadi</h3>
            <p className="text-xs text-slate-500">Boshqa kalit so'z yoki toifani tanlab ko'ring</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="tilt-box bg-[#0d1017] border border-slate-800/90 hover:border-cyan-500/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer group hover:shadow-[0_10px_30px_rgba(0,212,255,0.12)] relative overflow-hidden"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-950 flex items-center justify-center border border-slate-800/60 group-hover:border-slate-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
                        <Eye size={13} />
                        Batafsil
                      </span>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                        <Star size={12} className="fill-amber-400" />
                        <span className="font-bold font-mono">{product.rating}</span>
                        <span className="text-slate-500 font-sans">· {product.subCategory}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Specs bullets */}
                      <ul className="space-y-1 mb-4 text-xs text-slate-400">
                        {product.specs.slice(0, 3).map((spec, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Add to Cart Button */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-mono">Narxi</div>
                        <div className="text-base sm:text-lg font-black text-cyan-400 font-mono tabular-nums leading-tight">
                          {formatPrice(product.priceUSD, currency)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          isAdded
                            ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:scale-105 active:scale-95'
                        }`}
                        title="Savatchaga qo'shish"
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} />
                            <span className="hidden sm:inline">Qo'shildi</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">Xarid</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QUICK VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0d1017] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.25)] text-left overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                playCyberClick();
                setSelectedProduct(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Product Image */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                    {selectedProduct.brand}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400">{selectedProduct.subCategory}</span>
                  {selectedProduct.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-white font-['Outfit'] mb-2">
                  {selectedProduct.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 mb-4">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                    Texnik spetsifikatsiya:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedProduct.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div>
                    <div className="text-xs text-slate-500 font-mono">Narxi</div>
                    <div className="text-2xl font-black text-cyan-400 font-mono tabular-nums">
                      {formatPrice(selectedProduct.priceUSD, currency)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                      onOpenCart();
                    }}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart size={16} />
                    Savatchaga Qo'shish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
