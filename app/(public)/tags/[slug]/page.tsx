import React from 'react';
import { ArticleCard } from '../../../../components/blog/ArticleCard';
import { getArticles } from '../../../../lib/services/blog';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const { articles, total } = await getArticles({ tagSlug: slug });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-4 inline-block">
          #{slug} ({total} articles)
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">Articles associés au tag</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
