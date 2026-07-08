'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-noir-radial overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">The Inner Circle</p>
        <h2 className="font-display text-3xl sm:text-4xl text-beige mb-4">
          Join the Syeda Clothing Newsletter
        </h2>
        <p className="text-beige/60 text-sm sm:text-base mb-8">
          Be the first to know about new collections, private sales, and exclusive styling edits.
        </p>

        {submitted ? (
          <p className="text-gold font-body">Thank you for subscribing &mdash; welcome to the inner circle.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/5 border border-white/15 focus:border-gold/60 outline-none rounded-full px-5 py-3.5 text-sm text-beige placeholder:text-beige/30 transition-colors"
            />
            <button type="submit" className="btn-gold rounded-full px-6 py-3.5 flex items-center justify-center gap-2 text-xs tracking-widest uppercase">
              Subscribe <Send size={14} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
