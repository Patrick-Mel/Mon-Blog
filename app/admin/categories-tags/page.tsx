'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tag as TagIcon, Layers, Plus, X } from 'lucide-react';
import { getCategories, getTags, saveCategory, saveTag } from '../../../lib/services/blog';
import { Category, Tag } from '../../../lib/types';

export default function AdminCategoriesTagsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showCatModal, setShowCatModal] = useState(false);
  const [catNom, setCatNom] = useState('');
  const [catCouleur, setCatCouleur] = useState('#3B82F6');
  const [catDesc, setCatDesc] = useState('');

  const [showTagModal, setShowTagModal] = useState(false);
  const [tagNom, setTagNom] = useState('');

  useEffect(() => {
    async function loadData() {
      const c = await getCategories();
      const t = await getTags();
      setCategories(c);
      setTags(t);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNom) return;

    const newCat = await saveCategory({
      nom: catNom,
      couleur: catCouleur,
      description: catDesc,
    });

    setCategories(prev => [...prev.filter(c => c.slug !== newCat.slug), newCat]);
    setCatNom('');
    setCatDesc('');
    setShowCatModal(false);
    router.refresh();
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagNom) return;

    const newTag = await saveTag({
      nom: tagNom,
    });

    setTags(prev => [...prev.filter(t => t.slug !== newTag.slug), newTag]);
    setTagNom('');
    setShowTagModal(false);
    router.refresh();
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-400">Chargement des catégories et tags...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-amber-500 dark:text-amber-400 shrink-0" /> Gestion des Catégories & Tags
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">Organisez l'arborescence et le classement de vos articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories Box */}
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Catégories ({categories.length})</h3>
            <button
              onClick={() => setShowCatModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          {showCatModal && (
            <form onSubmit={handleAddCategory} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Nouvelle Catégorie</span>
                <button type="button" onClick={() => setShowCatModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Nom de la catégorie *</label>
                <input
                  type="text"
                  placeholder="Ex: Intelligence Artificielle"
                  value={catNom}
                  onChange={e => setCatNom(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Couleur</label>
                  <input
                    type="color"
                    value={catCouleur}
                    onChange={e => setCatCouleur(e.target.value)}
                    className="w-full h-9 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Courte description"
                    value={catDesc}
                    onChange={e => setCatDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Créer la catégorie
              </button>
            </form>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {categories.map(cat => (
              <div key={cat.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.couleur }} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{cat.nom}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">/categories/{cat.slug}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono shrink-0 ml-2">{cat.articles_count || 0} articles</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Box */}
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tags Mots-clés ({tags.length})</h3>
            <button
              onClick={() => setShowTagModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          {showTagModal && (
            <form onSubmit={handleAddTag} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Nouveau Tag</span>
                <button type="button" onClick={() => setShowTagModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Nom du Tag *</label>
                <input
                  type="text"
                  placeholder="Ex: docker, tailwind"
                  value={tagNom}
                  onChange={e => setTagNom(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Créer le tag
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto pr-1">
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
