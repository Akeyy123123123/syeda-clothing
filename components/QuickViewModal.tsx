'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

export default function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[96] inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-3xl w-full mx-auto bg-noir-soft border border-gold/20 rounded-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center"
            >
              <X size={16} className="text-beige" />
            </button>
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[3/4] sm:aspect-auto">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-widest text-gold/70">{product.category}</p>
                <h2 className="font-display text-2xl text-beige mt-2">{product.name}</h2>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-white/15'} />
                  ))}
                  <span className="text-xs text-beige/40 ml-1">({product.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-gold font-semibold text-xl">{formatPKR(product.price)}</span>
                  {product.oldPrice && <span className="text-beige/40 line-through text-sm">{formatPKR(product.oldPrice)}</span>}
                </div>
                <p className="text-beige/60 text-sm mt-4 leading-relaxed line-clamp-3">{product.description}</p>

                <div className="mt-5">
                  <p className="text-xs text-beige/50 uppercase tracking-widest mb-2">Color</p>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          color === c ? 'border-gold scale-110' : 'border-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs text-beige/50 uppercase tracking-widest mb-2">Size</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-3.5 py-2 rounded-lg border text-xs transition-colors ${
                          size === s ? 'border-gold text-gold bg-gold/10' : 'border-white/15 text-beige/70'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-7">
                  <button
                    disabled={!product.inStock}
                    onClick={() => {
                      addToCart(product, size, color);
                      onClose();
                    }}
                    className="flex-1 btn-gold py-3 rounded-full text-xs tracking-widest uppercase disabled:opacity-40"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex-1 btn-outline-gold py-3 rounded-full text-xs tracking-widest uppercase text-center"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
