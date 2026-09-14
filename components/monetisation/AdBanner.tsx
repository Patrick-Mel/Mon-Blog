'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  type: 'header' | 'sidebar' | 'in_article' | 'bottom_article';
  enabled?: boolean;
}

export function AdBanner({ type, enabled = true }: AdBannerProps) {
  if (!enabled) return null;

  if (type === 'header') {
    return (
      <div className="w-full bg-slate-100 dark:bg-gradient-to-r dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 border-b border-slate-200 dark:border-blue-500/20 py-2.5 px-4 text-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
        <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          Annonce
        </span>
        <span>Hébergez vos projets Next.js & Supabase sur un Cloud Haute Performance.</span>
        <a
          href="/go/vercel-pro"
          target="_blank"
          rel="sponsored"
          className="underline font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 inline-flex items-center gap-1"
        >
          Découvrir <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 shadow-xl relative overflow-hidden my-6">
        <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
          Publicité
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg shadow-blue-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">Booster votre SEO & DevOps</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          Déployez vos bases de données Supabase et votre frontend Next.js en 1 clic avec des performances d'élite.
        </p>
        <a
          href="/go/supabase-pro"
          target="_blank"
          rel="sponsored"
          className="block w-full text-center py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30"
        >
          Essai gratuit 14 jours
        </a>
      </div>
    );
  }

  if (type === 'in_article') {
    return (
      <div className="my-10 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="absolute top-3 right-3 text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase">
          Sponsorisé
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Besoin d'un Design System ou d'un Audit Code ?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
            Je vous accompagne dans la conception de vos applications web complexes (React, Next.js, Supabase, Tailwind, Python).
          </p>
        </div>
        <a
          href="/services"
          className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
        >
          Voir mes prestations
        </a>
      </div>
    );
  }

  // bottom_article
  return (
    <div className="mt-12 p-8 rounded-3xl bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950/60 dark:to-slate-900 border border-slate-200 dark:border-indigo-500/20 text-center relative shadow-lg">
      <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full mb-3 inline-block font-bold">
        Espace Partenaire
      </span>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Construisez votre marque avec une identité visuelle unique</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto mb-6">
        Graphisme Photoshop & Développement Frontend sur-mesure. Transformez vos visiteurs en clients fidèles.
      </p>
      <a
        href="/services"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:bg-blue-500 dark:hover:bg-slate-100 transition-all shadow-xl"
      >
        Réserver un appel découverte <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
