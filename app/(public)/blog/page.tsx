import React from 'react';
import Link from 'next/link';
import { Tag as TagIcon } from 'lucide-react';
import { ArticleCard } from '../../../components/blog/ArticleCard';
import { getArticles, getCategories, getTags } from '../../../lib/services/blog';

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const categorySlug = params.cat || '';
  const tagSlug = params.tag || '';
  const currentPage = parseInt(params.page || '1', 10);
  const limit = 6;

  const { articles, total } = await getArticles({
    query,
    categorySlug,
    tagSlug,
    page: currentPage,
    limit,
  });

  const categories = await getCategories();
  const tags = await getTags();
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Toutes les <span className="text-gradient">Publications</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Explorez l'ensemble de mes tutoriels, retours d'expérience et guides pratiques sur le développement full-stack, les réseaux et le design d'interface.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !categorySlug
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Tous ({total})
          </Link>

          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/blog?cat=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                categorySlug === cat.slug
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.nom}
            </Link>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1">
            <TagIcon className="w-3.5 h-3.5" /> Tags :
          </span>
          {tags.map(t => (
            <Link
              key={t.id}
              href={`/blog?tag=${t.slug}`}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                tagSlug === t.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              #{t.nom}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
          <p className="text-base font-semibold mb-2">Aucun article ne correspond à votre recherche.</p>
          <Link href="/blog" className="text-xs text-blue-600 dark:text-blue-400 underline">
            Réinitialiser les filtres
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <Link
                key={pageNum}
                href={`/blog?page=${pageNum}${categorySlug ? `&cat=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
