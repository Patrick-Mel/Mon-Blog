import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal, Code, Palette, Zap, Layers } from 'lucide-react';
import { ArticleCard } from '../../components/blog/ArticleCard';
import { NewsletterForm } from '../../components/shared/NewsletterForm';
import { AdBanner } from '../../components/monetisation/AdBanner';
import { getFeaturedArticles, getArticles, getCategories, getMonetizationConfig } from '../../lib/services/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles();
  const { articles: latestArticles } = await getArticles({ limit: 6 });
  const categories = await getCategories();
  const monetisationConfig = await getMonetizationConfig();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 shadow-md backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Développeur Web & Designer UI/UX Full-Stack</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Ingénierie Logicielle <br className="hidden sm:inline" />
            & <span className="text-gradient">Design d'Exception</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Bienvenue sur mon espace de publication. J'explore l'architecture des applications modernes (Next.js, Supabase, Python, Réseaux) et la création d'interfaces graphiques marquantes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Explorer les Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-2xl glass hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-2"
            >
              <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span>Travailler avec moi</span>
            </Link>
          </div>

          {/* Tech Badges */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/60 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
              <Code className="w-4 h-4 text-blue-500" /> Next.js 15
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
              <Layers className="w-4 h-4 text-emerald-500" /> Supabase RLS
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
              <Terminal className="w-4 h-4 text-amber-500" /> Réseaux & Python
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300">
              <Zap className="w-4 h-4 text-pink-500" /> UI/UX & Photoshop
            </span>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">À la Une</h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Sélection des tutoriels et publications phares</p>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1"
            >
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ArticleCard article={featuredArticles[0]} featured={true} />
        </section>
      )}

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Parcourir par Domaine</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.couleur }}
                  />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded">
                    {cat.articles_count} articles
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.nom}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Native Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner type="in_article" enabled={monetisationConfig.pubs_actives.in_article} />
      </div>

      {/* Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Dernières Publications</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Articles récents sur le dev, le réseau et le design</p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1"
          >
            Voir tous les articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter Signup Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterForm variant="card" />
      </section>
    </div>
  );
}
