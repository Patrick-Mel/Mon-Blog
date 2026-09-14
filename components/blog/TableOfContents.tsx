'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const elements = Array.from(tempDiv.querySelectorAll('h2, h3'));

    const items: TOCItem[] = elements.map((el, index) => {
      const text = el.textContent || `Section ${index + 1}`;
      const id = el.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return {
        id,
        text,
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });

    setHeadings(items);

    const articleBody = document.querySelector('.article-content-body');
    if (articleBody) {
      const domElements = articleBody.querySelectorAll('h2, h3');
      domElements.forEach((el, idx) => {
        if (items[idx]) {
          el.id = items[idx].id;
        }
      });
    }
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-slate-800/80 sticky top-24 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <List className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Table des matières</span>
      </div>

      <nav className="space-y-2 max-h-[70vh] overflow-y-auto">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(h.id);
              if (target) {
                window.scrollTo({
                  top: target.offsetTop - 100,
                  behavior: 'smooth',
                });
                setActiveId(h.id);
              }
            }}
            className={`block text-xs transition-all ${
              h.level === 3 ? 'pl-4' : 'pl-0 font-medium'
            } ${
              activeId === h.id
                ? 'text-blue-600 dark:text-blue-400 font-bold border-l-2 border-blue-500 pl-2'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
