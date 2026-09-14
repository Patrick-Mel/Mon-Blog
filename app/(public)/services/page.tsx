'use client';

import React, { useState } from 'react';
import { Code, Palette, Zap, CheckCircle2, Send, Sparkles, ShieldCheck, Clock, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ServicesPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('dev_web');
  const [budget, setBudget] = useState('1000-3000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 800);
  };

  const services = [
    {
      id: 'dev_web',
      icon: Code,
      title: 'Développement Web Full-Stack',
      description: 'Conception de SaaS, blogs ou applications complexes haute performance.',
      techs: ['Next.js (App Router)', 'Supabase RLS', 'TypeScript', 'Tailwind CSS', 'Python / Django'],
      badge: 'Le plus demandé',
      color: '#2563EB',
    },
    {
      id: 'ui_ux',
      icon: Palette,
      title: 'UI/UX Design & Graphisme',
      description: 'Design systems sur-mesure, maquettes Figma & visuels Photoshop percutants.',
      techs: ['Photoshop CS/CC', 'Wireframing Figma', 'Design Tokens HSL', 'Micro-animations', 'Dark Mode'],
      badge: 'Créatif',
      color: '#DB2777',
    },
    {
      id: 'consulting',
      icon: Zap,
      title: 'Audit Code & Performance SEO',
      description: 'Optimisation du temps de chargement, révision d\'architecture et bonnes pratiques RLS.',
      techs: ['Lighthouse 100/100', 'Optimisation SQL', 'Security Audit RLS', 'Vercel Deployment'],
      badge: 'Expertise',
      color: '#059669',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Disponible pour nouveaux projets en Freelance / Consulting</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Donnons vie à votre <span className="text-gradient">Projet Web & Visual Design</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Combinez l'exigence technique d'un développeur full-stack senior à l'œil esthétique d'un designer UI/UX graphiste.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="glass rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 relative group shadow-xl"
            >
              {s.badge && (
                <div
                  className="absolute top-4 right-4 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border backdrop-blur-md"
                  style={{ backgroundColor: `${s.color}15`, color: s.color, borderColor: `${s.color}30` }}
                >
                  {s.badge}
                </div>
              )}

              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                  style={{ backgroundColor: `${s.color}15`, color: s.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {s.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {s.description}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider">Technologies :</div>
                  {s.techs.map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setServiceType(s.id);
                  const formEl = document.getElementById('devis-form');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-800 transition-all text-center"
              >
                Sélectionner ce service
              </button>
            </div>
          );
        })}
      </div>

      {/* Quote Request Form */}
      <div id="devis-form" className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">Demander un Devis ou réserver un appel</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Remplissez ce court formulaire. Je vous recontacte sous 24h avec une proposition personnalisée.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Demande envoyée avec succès !</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Merci {name}. Votre message a bien été transmis. Je vais étudier votre projet et revenir vers vous très rapidement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">Votre Nom ou Entreprise *</label>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">Adresse Email *</label>
                <input
                  type="email"
                  placeholder="votre.email@societe.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">Type de prestation</label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="dev_web">Développement Web (Next.js / Supabase / Python)</option>
                  <option value="ui_ux">UI/UX Design & Photoshop Graphisme</option>
                  <option value="consulting">Audit Code, SEO & Performance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">Budget approximatif</label>
                <select
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="<1000">&lt; 1 000 €</option>
                  <option value="1000-3000">1 000 € - 3 000 €</option>
                  <option value="3000-5000">3 000 € - 5 000 €</option>
                  <option value=">5000">&gt; 5 000 €</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 mb-2">Description du projet & Objectifs *</label>
              <textarea
                rows={4}
                placeholder="Décrivez brièvement les fonctionnalités souhaitées, les délais ou vos inspirations..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Transmission en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Envoyer la demande de devis
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Code Propre & RLS Strict</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Architecture maintenable et sécurisée.</p>
        </div>
        <div className="space-y-1">
          <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Respect des Délais</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Planning clair et livraisons régulières.</p>
        </div>
        <div className="space-y-1">
          <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Aesthetic & SEO Top 1%</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Lighthouse 90+ garanti sur toutes métriques.</p>
        </div>
      </div>
    </div>
  );
}
