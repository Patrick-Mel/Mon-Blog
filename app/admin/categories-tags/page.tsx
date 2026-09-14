import React from 'react';
import { Tag as TagIcon, Layers, Plus } from 'lucide-react';
import { getCategories, getTags } from '../../../lib/services/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCategoriesTagsPage() {
  const categories = await getCategories();
  const tags = await getTags();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-amber-500 dark:text-amber-400" /> Gestion des Catégories & Tags
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">Organisez l'arborescence et le classement de vos articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories */}
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Catégories ({categories.length})</h3>
            <button className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {categories.map(cat => (
              <div key={cat.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.couleur }} />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{cat.nom}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">/categories/{cat.slug}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{cat.articles_count} articles</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tags Mots-clés ({tags.length})</h3>
            <button className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag.id}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <TagIcon className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                #{tag.nom}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
