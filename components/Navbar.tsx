'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/shop#categories' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-full transition-all duration-500 ${
            scrolled ? 'glass shadow-soft' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl sm:text-2xl tracking-wide text-gold-gradient">
              Syeda
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-[13px] tracking-wide font-body text-beige/80 hover:text-gold transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-beige/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <Search size={18} />
              </button>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative p-2.5 rounded-full text-beige/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <Heart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-noir text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account/login"
                aria-label="Account"
                className="hidden sm:inline-flex p-2.5 rounded-full text-beige/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <User size={18} />
              </Link>
              <button
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full text-beige/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-noir text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-full text-beige/80 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-noir/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5">
              <span className="font-display text-xl text-gold-gradient">Syeda</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-beige">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-beige hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/account/login"
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl text-beige hover:text-gold transition-colors"
              >
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
