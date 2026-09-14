'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subscribeNewsletter } from '../../lib/services/blog';

interface NewsletterFormProps {
  variant?: 'card' | 'compact' | 'footer';
}

export function NewsletterForm({ variant = 'card' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        setEmail('');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setStatus('error');
        setMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setStatus('error');
      setMessage('Impossible d\'enregistrer votre inscription.');
    }
  };

  if (variant === 'footer') {
    return (
      <div className="w-full">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Restez informé des derniers tutoriels</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Recevez nos astuces exclusives Dev (Next.js/Python) & Graphic Design directement dans votre boîte mail.
        </p>

        {status === 'success' ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 glass border border-blue-500/20 shadow-2xl my-12 bg-gradient-to-br from-slate-100 via-indigo-50/50 to-slate-100 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
          Rejoignez le <span className="text-gradient">Club privé des Développeurs & Designers</span>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Pas de spam. Uniquement 1 email mensuel récapitulant les meilleures pépites code, composants UI réutilisables et secrets d'optimisation Supabase.
        </p>

        {status === 'success' ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Saisissez votre adresse email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Inscription...
                </>
              ) : (
                'S\'abonner gratuitement'
              )}
            </button>
          </form>
        )}

        <div className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
          Double Opt-In respectueux du RGPD. Désabonnement en 1 clic à tout moment.
        </div>
      </div>
    </div>
  );
}
