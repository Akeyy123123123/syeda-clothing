'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery, EasyPaisa, JazzCash, Bank Transfer, Visa, and Mastercard.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are processed within 1-2 business days and delivered within 3-7 business days across Pakistan.',
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes, unworn items with tags attached can be returned within 7 days of delivery. See our Return Policy for details.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'International shipping is available on request \u2014 please contact us at syedasidra2003@gmail.com.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you can view its status anytime from My Orders in your account.',
  },
  {
    q: 'Are your fabrics authentic?',
    a: 'Yes, every piece is made from premium, verified fabric sourced directly from trusted Pakistani mills.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display text-4xl text-beige mb-10 text-center">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={item.q} className="glass-card rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-beige text-sm sm:text-base">{item.q}</span>
              <ChevronDown
                size={18}
                className={`text-gold transition-transform shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && <p className="px-6 pb-5 text-beige/60 text-sm leading-relaxed">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
