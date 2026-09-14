'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, CheckCircle2, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
}

export function ImageUploader({ value, onChange, label = 'Image de couverture', description = 'Téléchargez une image depuis votre appareil (PNG, JPG, WEBP) ou collez un lien Web.' }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      onChange(result);
      setUrlInput(result);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>
          {description && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3 inline mr-1" /> Importer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              activeTab === 'url'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3 inline mr-1" /> URL Web
          </button>
        </div>
      </div>

      {/* Image Preview if available */}
      {value && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 max-h-48 group shadow-md">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-amber-400 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" /> Changer l'image
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setUrlInput('');
              }}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-red-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Supprimer
            </button>
          </div>
        </div>
      )}

      {/* Input controls based on active tab */}
      {activeTab === 'upload' ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500/80 rounded-2xl p-6 text-center cursor-pointer transition-all bg-white dark:bg-slate-950/50"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
            className="hidden"
          />
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {isUploading ? 'Chargement en cours...' : 'Cliquez ou glissez une image ici'}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">PNG, JPG, WEBP jusqu'à 5 Mo</p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors"
          >
            Valider URL
          </button>
        </div>
      )}
    </div>
  );
}
