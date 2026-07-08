'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h1 className="font-display text-3xl text-beige text-center mb-2">Reset Password</h1>
        <p className="text-beige/50 text-sm text-center mb-8">
          Enter your email and we&rsquo;ll send you a link to reset your password.
        </p>

        {sent ? (
          <p className="text-gold text-sm text-center">
            If an account exists for {email}, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
              />
            </div>
            <button type="submit" className="btn-gold w-full py-3.5 rounded-full text-xs tracking-widest uppercase">
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-beige/50 text-sm mt-6">
          <Link href="/account/login" className="text-gold underline underline-offset-4">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
