'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
const allColors = [
  { hex: '#0a0a0a', name: 'Black' },
  { hex: '#c9a24b', name: 'Gold' },
  { hex: '#e8e1d3', name: 'Beige' },
  { hex: '#7a1f2b', name: 'Maroon' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter');

  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(20000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (arr: string[], val: string, setFn: (v: string[]) => void) =>
    setFn(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (filterParam === 'new') list = list.filter((p) => p.isNew);
    if (filterParam === 'bestsellers') list = list.filter((p) => p.reviewsCount > 100);
    list = list.filter((p) => p.price <= priceRange);
    if (selectedSizes.length) list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length) list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c)));
    if (inStockOnly) list = list.filter((p) => p.inStock);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [category, priceRange, selectedSizes, selectedColors, inStockOnly, sort, filterParam]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Category</h4>
        <div className="space-y-2">
          {['All', ...categories.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block text-sm w-full text-left transition-colors ${
                category === c ? 'text-gold' : 'text-beige/60 hover:text-beige'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Price</h4>
        <input
          type="range"
          min={2000}
          max={20000}
          step={500}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <p className="text-beige/60 text-xs mt-2">Up to Rs. {priceRange.toLocaleString('en-PK')}</p>
      </div>

      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggle(selectedSizes, s, setSelectedSizes)}
              className={`px-3 py-1.5 rounded-lg border text-xs ${
                selectedSizes.includes(s) ? 'border-gold text-gold bg-gold/10' : 'border-white/15 text-beige/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => (
            <button
              key={c.hex}
              onClick={() => toggle(selectedColors, c.hex, setSelectedColors)}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColors.includes(c.hex) ? 'border-gold scale-110' : 'border-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Brand</h4>
        <label className="flex items-center gap-2 text-sm text-beige/60">
          <input type="checkbox" checked readOnly className="accent-gold" /> Syeda Clothing
        </label>
      </div>

      <div>
        <h4 className="text-beige text-sm font-semibold uppercase tracking-widest mb-3">Availability</h4>
        <label className="flex items-center gap-2 text-sm text-beige/60">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-gold"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">The Collection</p>
        <h1 className="font-display text-4xl sm:text-5xl text-beige">Shop All</h1>
      </div>

      <div className="flex justify-between items-center mb-8 gap-4">
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 text-sm text-beige/70 border border-white/15 rounded-full px-4 py-2"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <p className="text-beige/50 text-sm hidden lg:block">{filtered.length} products</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white/5 border border-white/15 rounded-full px-4 py-2 text-sm text-beige outline-none"
        >
          <option value="featured">Sort: Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <AnimatePresence>
          {filtersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFiltersOpen(false)}
                className="fixed inset-0 z-50 bg-black/70 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.4 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-noir-soft p-6 overflow-y-auto lg:hidden"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="font-display text-lg text-beige">Filters</span>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X size={20} className="text-beige" />
                  </button>
                </div>
                {FilterPanel}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-beige/50">No products match your filters. This is an invitation to try a different combination.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-beige/50">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
