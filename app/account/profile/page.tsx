'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/account/login');
  }, [user, router]);

  if (!user) return null;

  const menu = [
    { label: 'My Orders', href: '/account/orders', icon: Package },
    { label: 'Wishlist', href: '/wishlist', icon: Heart },
    { label: 'Saved Addresses', href: '/account/profile', icon: MapPin },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="glass-card rounded-2xl p-8 flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
          <User className="text-gold" size={28} />
        </div>
        <div>
          <h1 className="font-display text-2xl text-beige capitalize">{user.name}</h1>
          <p className="text-beige/50 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {menu.map((m) => (
          <Link key={m.label} href={m.href} className="glass-card rounded-2xl p-6 text-center hover:border-gold/40 border border-transparent transition-colors">
            <m.icon className="mx-auto text-gold mb-3" size={22} />
            <p className="text-beige text-sm">{m.label}</p>
          </Link>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-display text-lg text-beige mb-4">Saved Addresses</h3>
        <p className="text-beige/50 text-sm mb-4">You have no saved addresses yet. Add one at checkout to save time next time.</p>
      </div>

      <button
        onClick={() => {
          logout();
          router.push('/');
        }}
        className="mt-8 flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm"
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  );
}
