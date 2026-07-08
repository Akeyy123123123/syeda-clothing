'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { products } from '@/lib/products';

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-noir/97 backdrop-blur-xl"
        >
          <div className="max-w-3xl mx-auto pt-24 px-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl text-gold-gradient">Search</span>
              <button onClick={onClose} className="p-2 text-beige/70 hover:text-gold">
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center gap-4 border-b border-gold/30 pb-4">
              <Search className="text-gold" size={22} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for lawn suits, abayas, formals..."
                className="w-full bg-transparent outline-none font-display text-xl sm:text-2xl text-beige placeholder:text-beige/30"
              />
            </div>

            <div className="mt-8 space-y-2 max-h-[55vh] overflow-y-auto no-scrollbar">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <p className="text-beige text-sm">{p.name}</p>
                    <p className="text-gold text-xs mt-0.5">Rs. {p.price.toLocaleString('en-PK')}</p>
                  </div>
                </Link>
              ))}
              {query && results.length === 0 && (
                <p className="text-beige/40 text-sm text-center mt-10">No results for &ldquo;{query}&rdquo;</p>
              )}
              {!query && (
                <div className="mt-6">
                  <p className="text-beige/40 text-xs uppercase tracking-widest mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Lawn Collection', 'Eid Collection', 'Abayas', 'Party Wear', 'Formals'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-4 py-2 rounded-full border border-white/10 text-xs text-beige/70 hover:border-gold/50 hover:text-gold transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {query && results.length > 0 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="mt-6 inline-block text-xs tracking-widest uppercase text-gold underline underline-offset-4"
              >
                View all results
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
