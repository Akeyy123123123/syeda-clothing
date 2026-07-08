'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] loader-bg flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                stroke="url(#goldRing)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8f7530" />
                  <stop offset="50%" stopColor="#e4c887" />
                  <stop offset="100%" stopColor="#c9a24b" />
                </linearGradient>
              </defs>
              <text
                x="60"
                y="70"
                textAnchor="middle"
                fontFamily="Playfair Display, serif"
                fontSize="34"
                fill="#e4c887"
              >
                S
              </text>
            </motion.svg>

            <motion.p
              className="font-display tracking-[0.35em] text-xs sm:text-sm text-beige/80 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Syeda Clothing
            </motion.p>

            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] tracking-[0.3em] text-gold/70">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
