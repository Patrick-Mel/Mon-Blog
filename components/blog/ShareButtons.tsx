'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Heart } from 'lucide-react';
import { incrementArticleLikes } from '../../lib/services/blog';

interface ShareButtonsProps {
  articleId: string;
  title: string;
  initialLikes?: number;
}

export function ShareButtons({ articleId, title, initialLikes = 0 }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setHasLiked(true);
    const updated = await incrementArticleLikes(articleId);
    setLikes(updated || likes + 1);
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`À lire : "${title}" par @alexvance_dev`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="flex items-center gap-3 py-6 border-y border-slate-800 my-8">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
          hasLiked
            ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-pink-400 border border-slate-700'
        }`}
      >
        <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
        <span>{likes} J'aime</span>
      </button>

      <div className="h-4 w-px bg-slate-800 mx-1" />

      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Partager :
      </span>

      <button
        onClick={shareTwitter}
        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
      >
        X (Twitter)
      </button>

      <button
        onClick={shareLinkedIn}
        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-blue-700/20 hover:text-blue-400 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
      >
        LinkedIn
      </button>

      <button
        onClick={handleCopyLink}
        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all relative"
        title="Copier le lien"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
