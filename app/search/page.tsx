'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-xl mx-auto text-center mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Search</p>
        <h1 className="font-display text-4xl text-beige mb-8">Find Your Piece</h1>
        <div className="flex items-center gap-3 border border-white/15 rounded-full px-5 py-3 focus-within:border-gold/50">
          <SearchIcon size={18} className="text-gold" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category, or fabric..."
            className="w-full bg-transparent outline-none text-sm text-beige placeholder:text-beige/30"
          />
        </div>
      </div>

      {query && (
        <p className="text-beige/50 text-sm mb-6 text-center">
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {query && results.length === 0 && (
        <p className="text-center text-beige/40 mt-16">No pieces found. Try a different search term.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-beige/50">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
