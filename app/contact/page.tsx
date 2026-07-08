'use client';

import { useState } from 'react';
import { Mail, Clock, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-14">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Get in Touch</p>
        <h1 className="font-display text-4xl sm:text-5xl text-beige">Contact Syeda Clothing</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-display text-xl text-beige mb-5">Send a Message</h3>
          {sent ? (
            <p className="text-gold text-sm">Thank you &mdash; your message has been received. We&rsquo;ll be in touch soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
                />
              </div>
              <div>
                <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
                />
              </div>
              <div>
                <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
                />
              </div>
              <button type="submit" className="btn-gold w-full py-3.5 rounded-full text-xs tracking-widest uppercase">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-8 space-y-5">
            <div className="flex items-start gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-beige text-sm font-semibold">Email</p>
                <a href="mailto:syedasidra2003@gmail.com" className="text-beige/60 text-sm hover:text-gold">
                  syedasidra2003@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-beige text-sm font-semibold">Business Hours</p>
                <p className="text-beige/60 text-sm">Mon &ndash; Sat: 10:00 AM &ndash; 8:00 PM PKT</p>
                <p className="text-beige/60 text-sm">Sunday: Closed</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-beige text-sm font-semibold">Studio</p>
                <p className="text-beige/60 text-sm">Lahore, Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-beige/70 hover:text-gold hover:border-gold/50 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden aspect-video flex items-center justify-center bg-white/5">
            <div className="text-center text-beige/40 text-sm">
              <MapPin className="mx-auto mb-2 text-gold/50" size={28} />
              Google Map placeholder &mdash; embed your studio location here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
