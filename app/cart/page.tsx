'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, BookmarkPlus, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    toggleSaveForLater,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const activeItems = items.filter((i) => !i.savedForLater);
  const savedItems = items.filter((i) => i.savedForLater);

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    setCouponMsg(result);
    if (result.success) setCouponInput('');
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">Your Shopping Bag</h1>

      {activeItems.length === 0 && savedItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-beige/50 mb-6">Your bag is currently empty.</p>
          <Link href="/shop" className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {activeItems.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-4 flex gap-4">
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="112px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="text-beige hover:text-gold text-sm sm:text-base">
                        {item.product.name}
                      </Link>
                      <p className="text-beige/40 text-xs mt-1">
                        Size: {item.size} &middot; Qty available
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-beige/40 hover:text-red-400 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gold font-semibold mt-2">{formatPKR(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center border border-white/15 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-beige/70 hover:text-gold">
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-beige/70 hover:text-gold">
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleSaveForLater(item.id)}
                      className="flex items-center gap-1.5 text-xs text-beige/50 hover:text-gold"
                    >
                      <BookmarkPlus size={14} /> Save for Later
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {savedItems.length > 0 && (
              <div className="pt-8">
                <h3 className="font-display text-xl text-beige mb-4">Saved for Later ({savedItems.length})</h3>
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="glass-card rounded-2xl p-4 flex gap-4 opacity-80">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1">
                        <p className="text-beige text-sm">{item.product.name}</p>
                        <p className="text-gold text-sm mt-1">{formatPKR(item.product.price)}</p>
                        <div className="flex gap-3 mt-2">
                          <button onClick={() => toggleSaveForLater(item.id)} className="text-xs text-gold underline underline-offset-4">
                            Move to Bag
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs text-beige/40 hover:text-red-400">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link href="/shop" className="inline-block mt-6 text-xs tracking-widest uppercase text-gold underline underline-offset-4">
              &larr; Continue Shopping
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-6 h-fit sticky top-28">
            <h3 className="font-display text-xl text-beige mb-5">Order Summary</h3>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 flex items-center gap-2 border border-white/15 rounded-full px-4">
                <Tag size={14} className="text-gold" />
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full bg-transparent outline-none py-2.5 text-sm text-beige placeholder:text-beige/30"
                />
              </div>
              <button onClick={handleApplyCoupon} className="btn-outline-gold px-4 rounded-full text-xs">
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mb-4 ${couponMsg.success ? 'text-emerald-400' : 'text-red-400'}`}>{couponMsg.message}</p>
            )}
            {coupon && (
              <div className="flex justify-between items-center text-xs text-gold mb-4">
                <span>Coupon &ldquo;{coupon}&rdquo; applied</span>
                <button onClick={removeCoupon} className="underline">Remove</button>
              </div>
            )}

            <div className="space-y-3 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between text-beige/70">
                <span>Subtotal</span>
                <span className="text-beige">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-beige/70">
                <span>Shipping</span>
                <span className="text-beige">{shipping === 0 ? 'Free' : formatPKR(shipping)}</span>
              </div>
              <div className="flex justify-between text-beige/70">
                <span>Tax</span>
                <span className="text-beige">{formatPKR(tax)}</span>
              </div>
            </div>

            <div className="divider-gold my-4" />
            <div className="flex justify-between text-lg mb-6">
              <span className="text-beige font-semibold">Total</span>
              <span className="text-gold font-semibold">{formatPKR(total)}</span>
            </div>

            <Link
              href="/checkout"
              className={`btn-gold w-full text-center block py-3.5 rounded-full text-xs tracking-widest uppercase ${
                activeItems.length === 0 ? 'pointer-events-none opacity-40' : ''
              }`}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
