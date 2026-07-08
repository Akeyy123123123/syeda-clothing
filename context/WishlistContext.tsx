'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/lib/types';

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = 'syeda_wishlist_v1';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggleWishlist = (product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id: string) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
