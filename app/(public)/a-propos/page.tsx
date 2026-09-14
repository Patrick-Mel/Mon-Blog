import React from 'react';
import Link from 'next/link';
import { Mail, ExternalLink, Code, Layers, Palette, Terminal, Award } from 'lucide-react';
import { getAuthorProfile } from '../../../lib/services/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const author = await getAuthorProfile();

  const skills = [
    { name: 'HTML5 / CSS3 / JavaScript (ES6+)', level: '98%', category: 'Web Fundamentals' },
    { name: 'React 19 / Next.js (App Router)', level: '95%', category: 'Frontend Frameworks' },
    { name: 'TypeScript & Tailwind CSS v4', level: '95%', category: 'Styling & Types' },
    { name: 'Python / Django / FastAPI', level: '90%', category: 'Backend Systems' },
    { name: 'Supabase & PostgreSQL (RLS)', level: '92%', category: 'Database & Cloud' },
    { name: 'Adobe Photoshop UI/UX', level: '92%', category: 'Design & Visual' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Profile */}
      <div className="glass rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 text-center">
          <div className="relative inline-block">
            <img
              src={author.avatar_url}
              alt={author.nom}
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl object-cover border-2 border-blue-500/30 shadow-2xl mx-auto"
            />
            <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            {author.titre_professionnel}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">{author.nom}</h1>

          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {author.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <a
              href={author.reseaux_sociaux.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-slate-700 dark:text-slate-300" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
            <a
              href={author.reseaux_sociaux.twitter}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-blue-500 dark:text-blue-400" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span>Twitter / X</span>
            </a>
            <a
              href={author.reseaux_sociaux.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-white flex items-center gap-2 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-blue-600 dark:text-blue-500" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
              <span>LinkedIn</span>
            </a>
            <Link
              href="/services"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">Stack Technique & Compétences</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Les outils et technologies utilisés au quotidien</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skills.map(skill => (
            <div key={skill.name} className="glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{skill.level}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  style={{ width: skill.level }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
