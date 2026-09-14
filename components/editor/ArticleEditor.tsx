'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Bold, Italic, Code, Heading1, Heading2, List, Link as LinkIcon, Image as ImageIcon, Save, ArrowLeft, Sparkles, CheckCircle2, Eye } from 'lucide-react';
import { Article, Category } from '../../lib/types';
import { saveArticle } from '../../lib/services/blog';

const lowlight = createLowlight(common);

interface ArticleEditorProps {
  initialArticle?: Partial<Article>;
  categories: Category[];
}

export function ArticleEditor({ initialArticle, categories }: ArticleEditorProps) {
  const router = useRouter();

  const [titre, setTitre] = useState(initialArticle?.titre || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [extrait, setExtrait] = useState(initialArticle?.extrait || '');
  const [imageCouverture, setImageCouverture] = useState(
    initialArticle?.image_couverture || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
  );
  const [categoryId, setCategoryId] = useState(initialArticle?.category_id || categories[0]?.id || '');
  const [statut, setStatut] = useState<'brouillon' | 'publie' | 'archive'>(initialArticle?.statut || 'brouillon');
  const [sponsorise, setSponsorise] = useState(initialArticle?.sponsorise || false);
  const [sponsorNom, setSponsorNom] = useState(initialArticle?.sponsor_nom || '');
  const [sponsorLien, setSponsorLien] = useState(initialArticle?.sponsor_lien || '');
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(initialArticle?.seo_description || '');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: initialArticle?.contenu || '<h2>Votre introduction ici...</h2><p>Rédigez le contenu riche de votre article de blog avec du texte, des blocs de code et des images.</p>',
    editorProps: {
      attributes: {
        class: 'prose-custom min-h-[300px] focus:outline-none p-4 text-slate-200',
      },
    },
  });

  const handleTitreChange = (val: string) => {
    setTitre(val);
    if (!initialArticle?.id) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSave = async () => {
    if (!titre || !editor) return;

    setIsSaving(true);
    const contentHtml = editor.getHTML();

    await saveArticle({
      id: initialArticle?.id,
      titre,
      slug,
      extrait,
      contenu: contentHtml,
      image_couverture: imageCouverture,
      category_id: categoryId,
      statut,
      sponsorise,
      sponsor_nom: sponsorNom,
      sponsor_lien: sponsorLien,
      seo_title: seoTitle || titre,
      seo_description: seoDescription || extrait,
    });

    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      router.push('/admin/articles');
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/admin/articles')}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Annuler et retourner
        </button>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Enregistré !
            </span>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Enregistrement...' : 'Enregistrer Article'}
          </button>
        </div>
      </div>

      {/* Main Settings */}
      <div className="glass rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Informations Générales</h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Titre de l'article *</label>
          <input
            type="text"
            placeholder="Ex: Guide Ultime Next.js 15 & Supabase RLS"
            value={titre}
            onChange={e => handleTitreChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-base font-bold text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Slug URL</label>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Extrait (Chapeau de l'article)</label>
          <textarea
            rows={2}
            placeholder="Un court résumé accrocheur de 2 phrases..."
            value={extrait}
            onChange={e => setExtrait(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL Image de couverture</label>
            <input
              type="text"
              value={imageCouverture}
              onChange={e => setImageCouverture(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Statut de Publication</label>
            <select
              value={statut}
              onChange={e => setStatut(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            >
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publié</option>
              <option value="archive">Archivé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sponsoring Settings */}
      <div className="glass rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Monétisation & Sponsoring Article
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sponsorise}
              onChange={e => setSponsorise(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500"
            />
            <span className="text-xs font-bold text-amber-400">Article Sponsorisé</span>
          </label>
        </div>

        {sponsorise && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nom du Sponsor / Partenaire</label>
              <input
                type="text"
                placeholder="Ex: Vercel Cloud Platform"
                value={sponsorNom}
                onChange={e => setSponsorNom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Lien Cible du Sponsor (rel="sponsored")</label>
              <input
                type="text"
                placeholder="https://vercel.com"
                value={sponsorLien}
                onChange={e => setSponsorLien(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rich Editor Tiptap Toolbar & Canvas */}
      <div className="glass rounded-2xl border border-slate-800 overflow-hidden space-y-0">
        {/* Toolbar */}
        {editor && (
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center gap-1 text-slate-300">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('bold') ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Gras"
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('italic') ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Italique"
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Titre H2"
            >
              <Heading1 className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('heading', { level: 3 }) ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Titre H3"
            >
              <Heading2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('codeBlock') ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Bloc de Code Syntaxique"
            >
              <Code className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('bulletList') ? 'bg-amber-500/20 text-amber-400' : ''}`}
              title="Liste à puces"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const url = window.prompt('URL de l\'image :');
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              className="p-2 rounded-lg hover:bg-slate-800"
              title="Insérer Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tiptap Canvas */}
        <div className="bg-slate-950">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
