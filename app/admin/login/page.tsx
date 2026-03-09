'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <svg viewBox="0 0 60 60" className="w-16 h-16 mx-auto">
              <path
                d="M15 10 L15 50 L25 50 L25 35 L35 50 L45 50 L45 10 L35 10 L35 25 L25 10 Z"
                fill="none"
                stroke="#C6A56A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-white font-sans text-2xl tracking-[0.3em] uppercase font-light">
            Neoprime
          </h1>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-luxury-dark border border-white/10 p-8">
          <h2 className="text-white font-sans text-xl uppercase tracking-wide mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-luxury-black border border-white/20 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="admin@neoprimehotels.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-luxury-black border border-white/20 text-white pl-12 pr-12 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold-dark text-luxury-black font-sans uppercase tracking-widest py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="text-center mt-6">
          <a href="/" className="text-text-muted hover:text-gold transition-colors text-sm font-serif">
            ← Back to website
          </a>
        </p>
      </motion.div>
    </div>
  );
}
