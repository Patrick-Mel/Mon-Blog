import React from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Eye, Sparkles, Clock } from 'lucide-react';
import { getAllArticlesForAdmin } from '../../../lib/services/blog';

export default async function AdminArticlesListPage() {
  const articles = await getAllArticlesForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Gestion des Articles</h1>
          <p className="text-xs text-slate-400">Créer, modifier et programmer vos publications</p>
        </div>

        <Link
          href="/admin/articles/nouveau"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Créer un Article
        </Link>
      </div>

      <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Article</th>
                <th className="p-4 font-semibold">Catégorie</th>
                <th className="p-4 font-semibold">Statut</th>
                <th className="p-4 font-semibold">Vues</th>
                <th className="p-4 font-semibold">Sponsoring</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image_couverture}
                        alt={article.titre}
                        className="w-12 h-10 rounded-lg object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white max-w-sm truncate">{article.titre}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/blog/{article.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: `${article.category?.couleur}20`, color: article.category?.couleur }}
                    >
                      {article.category?.nom || 'Non catégorisé'}
                    </span>
                  </td>
                  <td className="p-4">
                    {article.statut === 'publie' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                        Publié
                      </span>
                    )}
                    {article.statut === 'brouillon' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold text-[10px]">
                        Brouillon
                      </span>
                    )}
                    {article.statut === 'archive' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold text-[10px]">
                        Archivé
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-slate-300">{article.vues_count}</td>
                  <td className="p-4">
                    {article.sponsorise ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center gap-1 w-fit">
                        <Sparkles className="w-3 h-3" /> {article.sponsor_nom || 'Oui'}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Non</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Voir l'article"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="p-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
