'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) router.push('/account/profile');
    else setError(result.message);
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h1 className="font-display text-3xl text-beige text-center mb-2">Welcome Back</h1>
        <p className="text-beige/50 text-sm text-center mb-8">Sign in to your Syeda Clothing account</p>

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
          <div>
            <label className="text-xs text-beige/50 uppercase tracking-widest mb-2 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-gold/50 outline-none rounded-lg px-4 py-3 text-sm text-beige"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex justify-end">
            <Link href="/account/forgot-password" className="text-xs text-gold underline underline-offset-4">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn-gold w-full py-3.5 rounded-full text-xs tracking-widest uppercase">
            Sign In
          </button>
        </form>

        <p className="text-center text-beige/50 text-sm mt-6">
          Don&rsquo;t have an account?{' '}
          <Link href="/account/register" className="text-gold underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
