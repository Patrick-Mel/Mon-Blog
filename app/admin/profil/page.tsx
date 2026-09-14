'use client';

import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle2 } from 'lucide-react';
import { getAuthorProfile, updateAuthorProfile } from '../../../lib/services/blog';
import { Author } from '../../../lib/types';

export default function AdminProfilePage() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadAuthor() {
      const data = await getAuthorProfile();
      setAuthor(data);
    }
    loadAuthor();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;

    await updateAuthorProfile(author);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!author) return <div className="p-8 text-xs text-slate-400">Chargement du profil...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <User className="w-6 h-6 text-amber-400" /> Profil de l'Auteur
        </h1>
        <p className="text-xs text-slate-400">Modifier vos informations publiques présentées sur le blog</p>
      </div>

      <form onSubmit={handleSave} className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
          <img
            src={author.avatar_url}
            alt={author.nom}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
          />
          <div className="space-y-1 flex-1">
            <label className="block text-xs font-semibold text-slate-300">URL Avatar Image</label>
            <input
              type="text"
              value={author.avatar_url}
              onChange={e => setAuthor({ ...author, avatar_url: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nom complet</label>
            <input
              type="text"
              value={author.nom}
              onChange={e => setAuthor({ ...author, nom: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Titre Professionnel</label>
            <input
              type="text"
              value={author.titre_professionnel}
              onChange={e => setAuthor({ ...author, titre_professionnel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Biographie Publique</label>
          <textarea
            rows={4}
            value={author.bio}
            onChange={e => setAuthor({ ...author, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Réseaux Sociaux</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3 fill-current text-slate-300" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub</span>
              </label>
              <input
                type="text"
                value={author.reseaux_sociaux.github || ''}
                onChange={e =>
                  setAuthor({
                    ...author,
                    reseaux_sociaux: { ...author.reseaux_sociaux, github: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3 fill-current text-blue-400" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>Twitter / X</span>
              </label>
              <input
                type="text"
                value={author.reseaux_sociaux.twitter || ''}
                onChange={e =>
                  setAuthor({
                    ...author,
                    reseaux_sociaux: { ...author.reseaux_sociaux, twitter: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3 fill-current text-blue-500" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
                <span>LinkedIn</span>
              </label>
              <input
                type="text"
                value={author.reseaux_sociaux.linkedin || ''}
                onChange={e =>
                  setAuthor({
                    ...author,
                    reseaux_sociaux: { ...author.reseaux_sociaux, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Profil Mis à jour !' : 'Mettre à jour le profil'}</span>
        </button>
      </form>
    </div>
  );
}
