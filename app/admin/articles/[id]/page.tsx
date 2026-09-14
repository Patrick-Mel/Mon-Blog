import React from 'react';
import { notFound } from 'next/navigation';
import { ArticleEditor } from '../../../../components/editor/ArticleEditor';
import { getAllArticlesForAdmin, getCategories } from '../../../../lib/services/blog';

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const articles = await getAllArticlesForAdmin();
  const article = articles.find(a => a.id === id);
  const categories = await getCategories();

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Modifier l'Article</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">Éditeur riche Tiptap — ID: {article.id}</p>
      </div>

      <ArticleEditor initialArticle={article} categories={categories} />
    </div>
  );
}
