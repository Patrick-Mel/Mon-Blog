import React from 'react';
import Link from 'next/link';
import { Eye, FileText, Users, DollarSign, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { getAdminStats } from '../../../lib/services/blog';

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tableau de Bord Admin</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">Vue globale des performances, lectures et revenus du blog</p>
        </div>

        <Link
          href="/admin/articles/nouveau"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nouvel Article
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Vues Totales</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stats.totalViews.toLocaleString('fr-FR')}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +18.4% ce mois
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Articles Publiés</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stats.totalArticles}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Tous statuts confondus</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Abonnés Newsletter</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stats.totalSubscribers}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Double Opt-In Actif</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Clics Affiliation</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stats.totalAffiliateClicks}</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">Tracking /go/[slug]</div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Articles */}
        <div className="lg:col-span-8 glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Articles les plus lus
            </h3>
            <Link href="/admin/articles" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              Gérer tous les articles
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <th className="pb-3 font-semibold">Titre</th>
                  <th className="pb-3 font-semibold">Catégorie</th>
                  <th className="pb-3 font-semibold">Vues</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {stats.topArticles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">{article.titre}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
                        {article.category?.nom}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-slate-700 dark:text-slate-300">{article.vues_count}</td>
                    <td className="py-3">
                      <Link href={`/admin/articles/${article.id}`} className="text-amber-600 dark:text-amber-400 hover:underline font-semibold">
                        Éditer
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Affiliate Links Clicks */}
        <div className="lg:col-span-4 glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-500" /> Suivi Affiliation
            </h3>
            <Link href="/admin/monetisation" className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold">
              Réglages
            </Link>
          </div>

          <div className="space-y-3">
            {stats.affiliateLinks.map(link => (
              <div key={link.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{link.nom}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">/go/{link.slug_court}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{link.clics_count} clics</div>
                  <div className="text-[10px] text-slate-500">{link.emplacement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
