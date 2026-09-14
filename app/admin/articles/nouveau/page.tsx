import React from 'react';
import { ArticleEditor } from '../../../../components/editor/ArticleEditor';
import { getCategories } from '../../../../lib/services/blog';

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Rédiger un Nouvel Article</h1>
        <p className="text-xs text-slate-400">Éditeur riche WYSIWYG & Markdown avec coloration syntaxique</p>
      </div>

      <ArticleEditor categories={categories} />
    </div>
  );
}
