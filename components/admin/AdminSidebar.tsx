'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Tag, MessageSquare, DollarSign, User, LogOut, Globe } from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
    { href: '/admin/categories-tags', label: 'Catégories & Tags', icon: Tag },
    { href: '/admin/commentaires', label: 'Modération Commentaires', icon: MessageSquare },
    { href: '/admin/monetisation', label: 'Revenus & Monétisation', icon: DollarSign, highlight: true },
    { href: '/admin/profil', label: 'Profil Auteur', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 transition-colors">
      <div>
        {/* Header Admin */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="My blog Logo"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-md"
            />
            <div>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">My blog</span>
              <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">Espace Admin</span>
            </div>
          </Link>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1">
          {links.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : link.highlight ? 'text-amber-500' : ''}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Thème Admin</span>
          <ThemeToggle />
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-800"
        >
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Voir le blog public</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
