'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { Article } from '../../lib/types';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (featured) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative rounded-3xl overflow-hidden glass border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
          <img
            src={article.image_couverture}
            alt={article.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
          {article.sponsorise && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Sponsorisé par {article.sponsor_nom || 'Partenaire'}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white/90 dark:bg-slate-900/90">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: `${article.category?.couleur}20`, color: article.category?.couleur }}
              >
                {article.category?.nom || 'Article'}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.temps_lecture_minutes} min
              </span>
            </div>

            <Link href={`/blog/${article.slug}`}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-3">
                {article.titre}
              </h2>
            </Link>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
              {article.extrait}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {article.auteur?.avatar_url && (
                <img
                  src={article.auteur.avatar_url}
                  alt={article.auteur.nom}
                  className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
              )}
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{article.auteur?.nom}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{formattedDate}</div>
              </div>
            </div>

            <Link
              href={`/blog/${article.slug}`}
              className="w-10 h-10 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"
            >
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden glass border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between h-full transition-all duration-300"
    >
      <div>
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image_couverture}
            alt={article.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md text-white"
              style={{ backgroundColor: `${article.category?.couleur}e0` }}
            >
              {article.category?.nom || 'Article'}
            </span>
          </div>

          {article.sponsorise && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] uppercase shadow-md">
              Sponsor
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.temps_lecture_minutes} min
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {article.vues_count} vues
            </span>
          </div>

          <Link href={`/blog/${article.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
              {article.titre}
            </h3>
          </Link>

          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
            {article.extrait}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-4">
        <div className="text-[11px] text-slate-500 dark:text-slate-400">{formattedDate}</div>
        <Link
          href={`/blog/${article.slug}`}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Lire l'article <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
