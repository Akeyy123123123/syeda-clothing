'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSaveForLater: (id: string) => void;
  clearCart: () => void;
  coupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = 'syeda_cart_v1';

const VALID_COUPONS: Record<string, number> = {
  SYEDA10: 0.1,
  LUXURY15: 0.15,
  WELCOME5: 0.05,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
        setCoupon(parsed.coupon || null);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, coupon }));
  }, [items, coupon, hydrated]);

  const addToCart: CartContextType['addToCart'] = (product, size, color, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color && !i.savedForLater
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { id: `${product.id}-${size}-${color}-${Date.now()}`, product, quantity, size, color },
      ];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );

  const toggleSaveForLater = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, savedForLater: !i.savedForLater } : i)));

  const clearCart = () => setItems([]);

  const applyCoupon: CartContextType['applyCoupon'] = (code) => {
    const normalized = code.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      setCoupon(normalized);
      return { success: true, message: `Coupon applied \u2014 ${VALID_COUPONS[normalized] * 100}% off your order.` };
    }
    return { success: false, message: 'This coupon code is not valid.' };
  };

  const removeCoupon = () => setCoupon(null);

  const activeItems = items.filter((i) => !i.savedForLater);
  const subtotal = activeItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const discountRate = coupon ? VALID_COUPONS[coupon] || 0 : 0;
  const discount = Math.round(subtotal * discountRate);
  const shipping = activeItems.length === 0 ? 0 : subtotal > 15000 ? 0 : 350;
  const tax = Math.round((subtotal - discount) * 0.0);
  const total = subtotal - discount + shipping + tax;
  const itemCount = activeItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSaveForLater,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        itemCount,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
