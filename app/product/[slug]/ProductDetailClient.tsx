'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, Heart, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<'description' | 'shipping' | 'reviews'>('description');
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();

  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5">
            <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" sizes="50vw" priority />
            {discountPct > 0 && (
              <span className="absolute top-4 left-4 bg-gold text-noir text-xs font-bold px-3 py-1.5 rounded-full">
                -{discountPct}%
              </span>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 ${
                  activeImage === i ? 'border-gold' : 'border-white/10'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gold text-xs uppercase tracking-widest">{product.category}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-beige mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className={i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-white/15'} />
            ))}
            <span className="text-beige/50 text-sm">{product.rating} ({product.reviewsCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="text-gold font-semibold text-2xl">{formatPKR(product.price)}</span>
            {product.oldPrice && <span className="text-beige/40 line-through">{formatPKR(product.oldPrice)}</span>}
          </div>
          <p className={`text-xs mt-2 ${product.inStock ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
            {product.inStock ? '\u2713 In Stock \u2014 ready to ship' : 'Currently Out of Stock'}
          </p>

          <p className="text-beige/60 text-sm leading-relaxed mt-6">{product.description}</p>
          <p className="text-beige/40 text-xs mt-3">Fabric: {product.fabric}</p>

          <div className="mt-7">
            <p className="text-xs text-beige/50 uppercase tracking-widest mb-3">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-9 h-9 rounded-full border-2 ${color === c ? 'border-gold scale-110' : 'border-white/20'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-beige/50 uppercase tracking-widest mb-3">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2.5 rounded-lg border text-sm ${
                    size === s ? 'border-gold text-gold bg-gold/10' : 'border-white/15 text-beige/70'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border border-white/15 rounded-full">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-beige/70">
                -
              </button>
              <span className="w-8 text-center text-beige">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2.5 text-beige/70">
                +
              </button>
            </div>
            <button
              onClick={() => toggleWishlist(product)}
              className="p-3 rounded-full border border-white/15 hover:border-gold/50"
            >
              <Heart size={18} className={isWishlisted(product.id) ? 'fill-gold text-gold' : 'text-beige/70'} />
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              disabled={!product.inStock}
              onClick={() => addToCart(product, size, color, quantity)}
              className="flex-1 btn-gold py-3.5 rounded-full text-xs tracking-widest uppercase disabled:opacity-40"
            >
              Add to Cart
            </button>
            <button
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product, size, color, quantity);
                router.push('/checkout');
              }}
              className="flex-1 btn-outline-gold py-3.5 rounded-full text-xs tracking-widest uppercase disabled:opacity-40"
            >
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 text-center">
            <div className="glass-card rounded-xl p-4">
              <Truck className="mx-auto text-gold mb-2" size={18} />
              <p className="text-[11px] text-beige/60">Free delivery over Rs. 15,000</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <RotateCcw className="mx-auto text-gold mb-2" size={18} />
              <p className="text-[11px] text-beige/60">7-day easy returns</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <ShieldCheck className="mx-auto text-gold mb-2" size={18} />
              <p className="text-[11px] text-beige/60">100% authentic fabric</p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex gap-6 text-sm">
              {(['description', 'shipping', 'reviews'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`capitalize pb-2 border-b-2 transition-colors ${
                    tab === t ? 'border-gold text-gold' : 'border-transparent text-beige/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-4 text-beige/60 text-sm leading-relaxed">
              {tab === 'description' && <p>{product.description}</p>}
              {tab === 'shipping' && (
                <p>
                  Orders are processed within 1-2 business days and delivered within 3-7 business days across
                  Pakistan. Free shipping applies on orders above Rs. 15,000; otherwise a flat Rs. 350 fee applies.
                </p>
              )}
              {tab === 'reviews' && <p>{product.reviewsCount} verified customers rated this piece {product.rating} out of 5.</p>}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl sm:text-3xl text-beige mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
