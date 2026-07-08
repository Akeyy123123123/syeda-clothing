'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, isCartOpen, setCartOpen, subtotal, itemCount } = useCart();
  const activeItems = items.filter((i) => !i.savedForLater);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full sm:w-[420px] bg-noir-soft border-l border-gold/15 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h3 className="font-display text-xl text-beige">Your Bag ({itemCount})</h3>
              <button onClick={() => setCartOpen(false)} className="p-2 text-beige/70 hover:text-gold">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {activeItems.length === 0 && (
                <p className="text-beige/50 text-sm text-center mt-16">Your bag is empty.</p>
              )}
              {activeItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-beige truncate">{item.product.name}</p>
                    <p className="text-xs text-beige/50 mt-0.5">
                      {item.size} &middot; {item.color === '#0a0a0a' ? 'Black' : item.color === '#c9a24b' ? 'Gold' : item.color === '#e8e1d3' ? 'Beige' : 'Maroon'}
                    </p>
                    <p className="text-gold text-sm mt-1">{formatPKR(item.product.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/15 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-beige/70 hover:text-gold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-beige/70 hover:text-gold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-beige/40 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeItems.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                <div className="flex justify-between text-sm text-beige/70">
                  <span>Subtotal</span>
                  <span className="text-beige">{formatPKR(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-gold w-full text-center block py-3.5 rounded-full text-xs tracking-widest uppercase"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="btn-outline-gold w-full text-center block py-3.5 rounded-full text-xs tracking-widest uppercase"
                >
                  View Bag
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-xs text-beige/50 hover:text-gold underline underline-offset-4"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
