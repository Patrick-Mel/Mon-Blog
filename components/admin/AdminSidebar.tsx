'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Tag,
  MessageSquare,
  DollarSign,
  User,
  LogOut,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when changing routes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

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
    <>
      {/* Top Mobile Bar (Visible on mobile/tablet < md) */}
      <header className="md:hidden sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logo.jpg"
            alt="My blog Logo"
            className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
          />
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">My blog</span>
            <span className="block text-[9px] text-amber-600 dark:text-amber-400 font-mono font-bold leading-none">Admin</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Navigation (Drawer on Mobile, Fixed Sidebar on Desktop) */}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-30 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Header Admin */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
              <img
                src="/logo.jpg"
                alt="My blog Logo"
                className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-md"
              />
              <div>
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">My blog</span>
                <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">Espace Admin</span>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="p-3 space-y-1">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : link.highlight ? 'text-amber-500' : ''}`} />
                  <span className="truncate">{link.label}</span>
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
    </>
  );
}
