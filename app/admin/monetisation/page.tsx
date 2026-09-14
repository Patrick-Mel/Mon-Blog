'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, CheckCircle2, Save, ToggleLeft, ToggleRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { getMonetizationConfig, updateMonetizationConfig, getAdminStats } from '../../../lib/services/blog';
import { MonetizationConfig } from '../../../lib/types';

export default function AdminMonetizationPage() {
  const router = useRouter();
  const [config, setConfig] = useState<MonetizationConfig | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      const cfg = await getMonetizationConfig();
      const st = await getAdminStats();
      setConfig(cfg);
      setStats(st);
    }
    loadData();
  }, []);

  const handleToggleAd = (spot: keyof MonetizationConfig['pubs_actives']) => {
    if (!config) return;
    setConfig({
      ...config,
      pubs_actives: {
        ...config.pubs_actives,
        [spot]: !config.pubs_actives[spot],
      },
    });
  };

  const handleToggleService = (serviceKey: keyof MonetizationConfig['services_disponibles']) => {
    if (!config) return;
    setConfig({
      ...config,
      services_disponibles: {
        ...config.services_disponibles,
        [serviceKey]: !config.services_disponibles[serviceKey],
      },
    });
  };

  const handleSave = async () => {
    if (!config) return;
    await updateMonetizationConfig(config);
    setIsSaved(true);
    router.refresh();
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!config || !stats) {
    return <div className="p-8 text-slate-400 text-xs">Chargement de la configuration de monétisation...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-amber-500 dark:text-amber-400 shrink-0" /> Monétisation & Feature Flags
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Activez ou désactivez en 1 clic chaque emplacement publicitaire, sponsoring et prestation.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Modifications Enregistrées !' : 'Sauvegarder Réglages'}</span>
        </button>
      </div>

      {/* Revenue Statistics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Clics Liens d'Affiliation</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.totalAffiliateClicks} clics</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Trackés via route /go/[slug]</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Emplacements Pubs Actifs</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {Object.values(config.pubs_actives).filter(Boolean).length} / 4
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Contrôlés sans toucher au code</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Abonnés Newsletter</div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{stats.totalSubscribers} abonnés</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Potentiel Sponsoring Email</div>
        </div>
      </div>

      {/* Feature Flags: Native Ads Toggles */}
      <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Emplacements Publicitaires Négociés (Native Display Ads)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Bannière En-tête (Header Ad)</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Affiche la barre de notification tout en haut du site</div>
            </div>
            <button
              onClick={() => handleToggleAd('header')}
              className="text-amber-500 hover:scale-105 transition-transform"
            >
              {config.pubs_actives.header ? <ToggleRight className="w-8 h-8 text-amber-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Bannière Sidebar Article</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Widget d'annonce dans la barre latérale des articles</div>
            </div>
            <button
              onClick={() => handleToggleAd('sidebar')}
              className="text-amber-500 hover:scale-105 transition-transform"
            >
              {config.pubs_actives.sidebar ? <ToggleRight className="w-8 h-8 text-amber-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Bannière Au milieu de l'article</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Insérée entre les paragraphes principaux</div>
            </div>
            <button
              onClick={() => handleToggleAd('in_article')}
              className="text-amber-500 hover:scale-105 transition-transform"
            >
              {config.pubs_actives.in_article ? <ToggleRight className="w-8 h-8 text-amber-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Bannière Fin d'article</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Appel à l'action partenaire en bas de page</div>
            </div>
            <button
              onClick={() => handleToggleAd('bottom_article')}
              className="text-amber-500 hover:scale-105 transition-transform"
            >
              {config.pubs_actives.bottom_article ? <ToggleRight className="w-8 h-8 text-amber-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Services Disponibles Toggles */}
      <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Disponibilité des Prestations Freelance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Développement Web</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">SaaS & Applications Next.js</div>
            </div>
            <button onClick={() => handleToggleService('dev_web')}>
              {config.services_disponibles.dev_web ? <ToggleRight className="w-8 h-8 text-emerald-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">UI/UX & Photoshop</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">Design System & Graphisme</div>
            </div>
            <button onClick={() => handleToggleService('ui_ux_design')}>
              {config.services_disponibles.ui_ux_design ? <ToggleRight className="w-8 h-8 text-emerald-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Audit & Consulting</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">Performance & SEO</div>
            </div>
            <button onClick={() => handleToggleService('consulting')}>
              {config.services_disponibles.consulting ? <ToggleRight className="w-8 h-8 text-emerald-500" /> : <ToggleLeft className="w-8 h-8 text-slate-400 dark:text-slate-600" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
