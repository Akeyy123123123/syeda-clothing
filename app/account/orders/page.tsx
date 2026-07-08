'use client';

import { products } from '@/lib/products';

const mockOrders = [
  { id: 'SC-482913', date: 'July 2, 2026', status: 'Delivered', total: 12800, items: [products[0], products[4]] },
  { id: 'SC-471029', date: 'June 20, 2026', status: 'Shipped', total: 8600, items: [products[7]] },
  { id: 'SC-459817', date: 'May 30, 2026', status: 'Processing', total: 15400, items: [products[2], products[9]] },
];

const statusColor: Record<string, string> = {
  Delivered: 'text-emerald-400',
  Shipped: 'text-gold',
  Processing: 'text-beige/60',
};

export default function OrdersPage() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">My Orders</h1>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <p className="text-beige font-semibold">#{order.id}</p>
                <p className="text-beige/40 text-xs">{order.date}</p>
              </div>
              <span className={`text-sm font-medium ${statusColor[order.status]}`}>{order.status}</span>
            </div>
            <div className="flex gap-2 mb-4">
              {order.items.map((p) => (
                <span key={p.id} className="text-xs text-beige/60 bg-white/5 rounded-full px-3 py-1.5">
                  {p.name}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-3">
              <span className="text-beige/50 text-sm">Total</span>
              <span className="text-gold font-semibold">Rs. {order.total.toLocaleString('en-PK')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
