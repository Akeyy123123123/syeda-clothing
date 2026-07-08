'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/lib/products';

export default function Reviews() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Testimonials</p>
          <h2 className="font-display text-3xl sm:text-5xl text-beige">Loved by Women Everywhere</h2>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              <Quote className="text-gold/25 absolute top-5 right-5" size={30} />
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold/30">
                  <Image src={r.avatar} alt={r.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <p className="text-beige text-sm font-semibold">{r.name}</p>
                  <p className="text-beige/40 text-[11px]">{r.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} className={idx < r.rating ? 'fill-gold text-gold' : 'text-white/15'} />
                ))}
              </div>
              <p className="text-beige/70 text-sm leading-relaxed">{r.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
