'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { getAllCommentsForAdmin, updateCommentStatus } from '../../../lib/services/blog';
import { Comment } from '../../../lib/types';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'tous' | 'en_attente' | 'approuve' | 'rejete'>('tous');

  useEffect(() => {
    async function loadComments() {
      const data = await getAllCommentsForAdmin();
      setComments(data);
    }
    loadComments();
  }, []);

  const handleAction = async (id: string, status: 'approuve' | 'rejete') => {
    await updateCommentStatus(id, status);
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, statut: status } : c))
    );
  };

  const filteredComments = comments.filter(c => {
    if (filter === 'tous') return true;
    return c.statut === filter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-500 dark:text-amber-400" /> Modération des Commentaires
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">Approuver, rejeter ou supprimer les contributions des lecteurs</p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2">
        {(['tous', 'en_attente', 'approuve', 'rejete'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider ${
              filter === f
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800'
            }`}
          >
            {f === 'tous' ? 'Tous' : f === 'en_attente' ? 'En Attente' : f === 'approuve' ? 'Approuvés' : 'Rejetés'}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="glass p-8 rounded-2xl text-center text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
            Aucun commentaire à afficher.
          </div>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    {comment.auteur_nom.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{comment.auteur_nom}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{comment.auteur_email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {comment.statut === 'approuve' && (
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      Approuvé
                    </span>
                  )}
                  {comment.statut === 'en_attente' && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                      En attente
                    </span>
                  )}
                  {comment.statut === 'rejete' && (
                    <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-[10px]">
                      Rejeté
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                "{comment.contenu}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Publié le {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(comment.id, 'approuve')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approuver
                  </button>
                  <button
                    onClick={() => handleAction(comment.id, 'rejete')}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
