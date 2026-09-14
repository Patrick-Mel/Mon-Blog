'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CornerDownRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Comment } from '../../lib/types';
import { addComment } from '../../lib/services/blog';

interface CommentSectionProps {
  articleId: string;
  initialComments: Comment[];
}

export function CommentSection({ articleId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [authorNom, setAuthorNom] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [contenu, setContenu] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent, parentId?: string | null) => {
    e.preventDefault();
    if (!contenu.trim() || !authorNom.trim() || !authorEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await addComment({
        article_id: articleId,
        parent_id: parentId || null,
        auteur_nom: authorNom,
        auteur_email: authorEmail,
        contenu,
      });

      if (res.success) {
        setSuccessMessage(res.message);
        setContenu('');
        setReplyToId(null);

        const newComm: Comment = {
          id: `comm-${Date.now()}`,
          article_id: articleId,
          parent_id: parentId || null,
          auteur_nom: authorNom,
          auteur_email: authorEmail,
          contenu,
          statut: 'approuve',
          likes_count: 0,
          created_at: new Date().toISOString(),
        };

        if (parentId) {
          setComments(prev =>
            prev.map(c => {
              if (c.id === parentId) {
                return { ...c, replies: [...(c.replies || []), newComm] };
              }
              return c;
            })
          );
        } else {
          setComments(prev => [...prev, newComm]);
        }

        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const formattedDate = new Date(comment.created_at).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return (
      <div
        key={comment.id}
        className={`p-5 rounded-2xl border transition-all ${
          isReply
            ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 ml-6 sm:ml-10 mt-3'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md mb-4'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {comment.auteur_nom.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {comment.auteur_nom}
                {comment.auteur_nom.includes('Alex Vance') && (
                  <span className="text-[10px] bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono">
                    Auteur
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{formattedDate}</div>
            </div>
          </div>

          {!isReply && (
            <button
              onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 font-semibold flex items-center gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5" /> Répondre
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{comment.contenu}</p>

        {/* Inline Reply Form */}
        {replyToId === comment.id && (
          <form onSubmit={e => handleSubmit(e, comment.id)} className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Répondre à {comment.auteur_nom} :</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Votre nom"
                value={authorNom}
                onChange={e => setAuthorNom(e.target.value)}
                required
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500"
              />
              <input
                type="email"
                placeholder="Votre email"
                value={authorEmail}
                onChange={e => setAuthorEmail(e.target.value)}
                required
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Écrivez votre réponse..."
              value={contenu}
              onChange={e => setContenu(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer la réponse'}
              </button>
              <button
                type="button"
                onClick={() => setReplyToId(null)}
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 text-xs"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
      </div>
    );
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span>Commentaires & Échanges ({comments.length})</span>
      </h3>

      {/* Main Comment Form */}
      <form onSubmit={e => handleSubmit(e, null)} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">Laisser un commentaire</h4>

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Votre nom ou pseudonyme *"
            value={authorNom}
            onChange={e => setAuthorNom(e.target.value)}
            required
            className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Votre email (ne sera pas publié) *"
            value={authorEmail}
            onChange={e => setAuthorEmail(e.target.value)}
            required
            className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <textarea
          rows={3}
          placeholder="Partagez votre avis, une question ou une remarque technique..."
          value={contenu}
          onChange={e => setContenu(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span>Publier le commentaire</span>
        </button>
      </form>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs">
          Soyez le premier à commenter cet article !
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(c => renderComment(c))}
        </div>
      )}
    </div>
  );
}
