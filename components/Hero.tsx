'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-letter',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.04, duration: 1.1, ease: 'power4.out', delay: 2.4 }
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  const title = 'SYEDA CLOTHING';

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-noir">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="uppercase tracking-[0.5em] text-[11px] sm:text-xs text-gold/80 mb-5 font-body"
        >
          Est. Pakistan &mdash; Couture Womenswear
        </motion.p>

        <div ref={titleRef} className="overflow-hidden">
          <h1 className="font-display font-semibold text-[13vw] sm:text-[8vw] lg:text-[6.5vw] leading-[0.95] text-gold-gradient flex flex-wrap justify-center">
            {title.split('').map((ch, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span className="hero-letter inline-block">{ch === ' ' ? '\u00A0' : ch}</span>
              </span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-5 font-body text-beige/80 tracking-[0.25em] text-xs sm:text-sm uppercase"
        >
          Luxury Women&rsquo;s Fashion
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/shop" className="btn-gold px-8 py-3.5 text-xs sm:text-sm rounded-full">
            Shop Now
          </Link>
          <Link
            href="/shop?filter=new"
            className="btn-outline-gold px-8 py-3.5 text-xs sm:text-sm rounded-full font-body tracking-wider"
          >
            New Collection
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 text-xs sm:text-sm rounded-full font-body tracking-wider text-beige/70 hover:text-gold transition-colors underline underline-offset-8 decoration-gold/30"
          >
            Explore
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/60"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
