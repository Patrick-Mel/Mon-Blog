'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Article } from '../../lib/types';
import { getArticles } from '../../lib/services/blog';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      const res = await getArticles({ query, limit: 5 });
      setResults(res.articles);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un article, un tutoriel, une techno (Next.js, Réseaux, Python)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-base font-medium"
          />
          {isLoading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() && results.length === 0 && !isLoading && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              Aucun résultat trouvé pour « <span className="text-slate-900 dark:text-slate-200 font-semibold">{query}</span> »
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
                Résultats de recherche ({results.length})
              </div>
              {results.map(article => (
                <div
                  key={article.id}
                  onClick={() => {
                    router.push(`/blog/${article.slug}`);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${article.category?.couleur}20`, color: article.category?.couleur }}
                      >
                        {article.category?.nom}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">{article.temps_lecture_minutes} min de lecture</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.titre}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="py-6 px-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-300 block mb-2">Recherches populaires :</span>
              <div className="flex flex-wrap gap-2">
                {['Next.js 15', 'Réseaux & Subnetting', 'Supabase RLS', 'Tailwind v4', 'Django ORM'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
