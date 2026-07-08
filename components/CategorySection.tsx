'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/lib/products';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cat-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-noir">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Curated For You</p>
          <h2 className="font-display text-3xl sm:text-5xl text-beige">Shop by Collection</h2>
          <div className="divider-gold w-24 mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="cat-card group relative rounded-2xl overflow-hidden aspect-[3/4] block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-display text-lg sm:text-xl text-beige group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-beige/60 text-[11px] sm:text-xs mt-1 hidden sm:block">{cat.tagline}</p>
                <span className="inline-block mt-2 text-[10px] tracking-widest uppercase text-gold/80 border-b border-gold/40 group-hover:border-gold">
                  Discover
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
