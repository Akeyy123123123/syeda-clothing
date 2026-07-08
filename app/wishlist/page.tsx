'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-beige/50 mb-6">You haven&rsquo;t saved anything yet.</p>
          <Link href="/shop" className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
