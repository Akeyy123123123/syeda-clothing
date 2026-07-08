'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Wallet, Landmark, Smartphone, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const formatPKR = (n: number) => `Rs. ${n.toLocaleString('en-PK')}`;

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', icon: Wallet },
  { id: 'easypaisa', label: 'EasyPaisa', icon: Smartphone },
  { id: 'jazzcash', label: 'JazzCash', icon: Smartphone },
  { id: 'bank', label: 'Bank Transfer', icon: Landmark },
  { id: 'visa', label: 'Visa', icon: CreditCard },
  { id: 'mastercard', label: 'Mastercard', icon: CreditCard },
];

const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Islamabad Capital Territory'];

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, tax, total, clearCart } = useCart();
  const activeItems = items.filter((i) => !i.savedForLater);
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    province: 'Punjab',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
  });
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeItems.length === 0) return;
    setPlacing(true);
    setTimeout(() => {
      setOrderNumber(`SC-${Math.floor(100000 + Math.random() * 900000)}`);
      setPlaced(true);
      setPlacing(false);
      clearCart();
    }, 1400);
  };

  if (placed) {
    return (
      <div className="pt-40 pb-24 px-4 text-center min-h-screen">
        <CheckCircle2 className="mx-auto text-gold mb-6" size={64} />
        <h1 className="font-display text-3xl sm:text-4xl text-beige mb-4">Thank You for Your Order</h1>
        <p className="text-beige/60 max-w-md mx-auto mb-2">
          Your order <span className="text-gold">#{orderNumber}</span> has been placed successfully.
        </p>
        <p className="text-beige/50 max-w-md mx-auto mb-8 text-sm">
          A confirmation has been sent, and our team will contact you shortly to confirm delivery details.
        </p>
        <button onClick={() => router.push('/shop')} className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">Checkout</h1>

      {activeItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-beige/50 mb-6">Your bag is empty &mdash; add something beautiful before checking out.</p>
          <button onClick={() => router.push('/shop')} className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase">
            Shop Now
          </button>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl text-beige mb-5">Shipping Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={form.fullName} onChange={(v) => handleChange('fullName', v)} required />
                <Input label="Email" type="email" value={form.email} onChange={(v) => handleChange('email', v)} required />
                <Input label="Phone Number" value={form.phone} onChange={(v) => handleChange('phone', v)} required />
                <Input label="Country" value={form.country} onChange={(v) => handleChange('country', v)} required />
                <div>
                  <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Province</label>
                  <select
                    value={form.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
                  >
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <Input label="City" value={form.city} onChange={(v) => handleChange('city', v)} required />
                <Input label="Address" value={form.address} onChange={(v) => handleChange('address', v)} required className="sm:col-span-2" />
                <Input label="Postal Code" value={form.postalCode} onChange={(v) => handleChange('postalCode', v)} />
              </div>
              <div className="mt-4">
                <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Order Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                  placeholder="Delivery instructions, gift notes, etc."
                  className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige placeholder:text-beige/30"
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl text-beige mb-5">Payment Method</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {paymentMethods.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 text-sm transition-colors ${
                      payment === m.id ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 text-beige/70'
                    }`}
                  >
                    <m.icon size={18} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 h-fit sticky top-28">
            <h3 className="font-display text-xl text-beige mb-5">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar mb-4">
              {activeItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-beige text-xs truncate">{item.product.name}</p>
                    <p className="text-beige/40 text-[11px]">{item.size} &times; {item.quantity}</p>
                  </div>
                  <p className="text-gold text-xs">{formatPKR(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-beige/70"><span>Subtotal</span><span className="text-beige">{formatPKR(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-400"><span>Discount</span><span>-{formatPKR(discount)}</span></div>}
              <div className="flex justify-between text-beige/70"><span>Shipping</span><span className="text-beige">{shipping === 0 ? 'Free' : formatPKR(shipping)}</span></div>
              <div className="flex justify-between text-beige/70"><span>Tax</span><span className="text-beige">{formatPKR(tax)}</span></div>
            </div>
            <div className="divider-gold my-4" />
            <div className="flex justify-between text-lg mb-6">
              <span className="text-beige font-semibold">Total</span>
              <span className="text-gold font-semibold">{formatPKR(total)}</span>
            </div>
            <button
              type="submit"
              disabled={placing}
              className="btn-gold w-full py-3.5 rounded-full text-xs tracking-widest uppercase disabled:opacity-60"
            >
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
      />
    </div>
  );
}
