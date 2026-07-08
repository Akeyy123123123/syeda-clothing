'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Best Sellers</p>
            <h2 className="font-display text-3xl sm:text-5xl text-beige">Most Coveted Pieces</h2>
          </div>
          <Link
            href="/shop?filter=bestsellers"
            className="text-xs tracking-widest uppercase text-gold border-b border-gold/40 hover:border-gold pb-1 whitespace-nowrap"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
