'use client';

import React from 'react';
import Link from 'next/link';
import { Rss } from 'lucide-react';
import { NewsletterForm } from '../shared/NewsletterForm';

export function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                S
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                SOVA<span className="text-blue-600 dark:text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              Blog technique & vitrine créative d'un Développeur Web Full-Stack et Graphiste UI/UX. Tutoriels Next.js, Supabase, Réseaux, Python et Design System.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
              </a>
              <a
                href="/api/rss"
                target="_blank"
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-500 hover:border-amber-400 transition-all shadow-sm"
                title="Flux RSS XML"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Articles & Tutoriels
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-emerald-600 dark:text-emerald-400">
                  Services & Devis
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  À propos du créateur
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Catégories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Catégories</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/developpement-web" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link href="/categories/ui-ux-design" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  UI/UX & Design
                </Link>
              </li>
              <li>
                <Link href="/categories/reseaux-infrastructure" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
                  Réseaux & Infras
                </Link>
              </li>
              <li>
                <Link href="/categories/python-data" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Python & Data
                </Link>
              </li>
              <li>
                <Link href="/categories/retours-experience" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Retours d'Expérience
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter compacte */}
          <div className="lg:col-span-1">
            <NewsletterForm variant="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} SOVA Blog (Alex Vance). Tous droits réservés. Développé avec Next.js & Supabase.
          </div>
          <div className="flex items-center gap-4">
            <a href="/api/rss" className="hover:text-slate-900 dark:hover:text-slate-200">
              Flux RSS
            </a>
            <a href="/api/sitemap" className="hover:text-slate-900 dark:hover:text-slate-200">
              Sitemap.xml
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
