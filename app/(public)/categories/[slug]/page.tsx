import React from 'react';
import { notFound } from 'next/navigation';
import { ArticleCard } from '../../../../components/blog/ArticleCard';
import { getArticles, getCategories } from '../../../../lib/services/blog';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const { articles, total } = await getArticles({ categorySlug: slug });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <span
          className="text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 inline-block"
          style={{ backgroundColor: `${category.couleur}20`, color: category.couleur }}
        >
          Catégorie ({total} articles)
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">{category.nom}</h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
