'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const shots = Array.from({ length: 6 }).map((_, i) =>
  `https://placehold.co/500x500/171512/c9a24b?text=%40syedaclothing&font=playfair-display`
);

export default function InstagramGallery() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-noir-soft">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Follow the Story</p>
        <h2 className="font-display text-3xl sm:text-5xl text-beige flex items-center justify-center gap-3">
          <Instagram className="text-gold" size={32} /> @syedaclothing
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {shots.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            <Image src={src} alt="Instagram post" fill className="object-cover" sizes="(max-width: 768px) 33vw, 16vw" />
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
