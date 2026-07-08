'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import QuickViewModal from './QuickViewModal';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();
  const wishlisted = isWishlisted(product.id);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 12 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const quickAdd = () => addToCart(product, product.sizes[2] || product.sizes[0], product.colors[0]);
  const buyNow = () => {
    quickAdd();
    router.push('/checkout');
  };

  return (
    <>
      <div className="tilt-wrap group">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
          className="relative rounded-2xl overflow-hidden glass-card transition-transform duration-300 ease-out will-change-transform"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Link href={`/product/${product.slug}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </Link>

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discountPct > 0 && (
                <span className="bg-gold text-noir text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  -{discountPct}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-noir/80 border border-gold/40 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  NEW
                </span>
              )}
              {!product.inStock && (
                <span className="bg-black/70 text-red-300 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  SOLD OUT
                </span>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-colors"
            >
              <Heart size={16} className={wishlisted ? 'fill-gold text-gold' : 'text-beige/80'} />
            </button>

            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex gap-2 bg-gradient-to-t from-black/80 to-transparent">
              <button
                onClick={() => setQuickViewOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-beige text-[11px] py-2.5 rounded-full transition-colors"
              >
                <Eye size={13} /> Quick View
              </button>
              <button
                disabled={!product.inStock}
                onClick={quickAdd}
                className="flex-1 btn-gold text-[11px] py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/70">{product.category}</p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-body text-sm text-beige mt-1 line-clamp-1 hover:text-gold transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-white/15'}
                />
              ))}
              <span className="text-[10px] text-beige/40 ml-1">({product.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gold font-semibold text-sm">{formatPKR(product.price)}</span>
              {product.oldPrice && (
                <span className="text-beige/40 text-xs line-through">{formatPKR(product.oldPrice)}</span>
              )}
            </div>
            <p className={`text-[10px] mt-1 ${product.inStock ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button
              disabled={!product.inStock}
              onClick={buyNow}
              className="mt-3 w-full btn-outline-gold text-[11px] py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}
