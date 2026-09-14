import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { getArticles } from '../../../lib/services/blog';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { articles } = await getArticles({ limit: 50 });

  const feed = new Feed({
    title: 'SOVA — Blog Tech, Web Dev & UI/UX Design',
    description: 'Tutoriels et retours d\'expérience Next.js, Supabase, Python et Design UI/UX par Alex Vance.',
    id: siteUrl,
    link: siteUrl,
    language: 'fr',
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `Tous droits réservés ${new Date().getFullYear()}, Alex Vance`,
    author: {
      name: 'Alex Vance',
      email: 'contact@alexvance.dev',
      link: siteUrl,
    },
  });

  articles.forEach(article => {
    feed.addItem({
      title: article.titre,
      id: `${siteUrl}/blog/${article.slug}`,
      link: `${siteUrl}/blog/${article.slug}`,
      description: article.extrait,
      content: typeof article.contenu === 'string' ? article.contenu : JSON.stringify(article.contenu),
      author: [
        {
          name: article.auteur?.nom || 'Alex Vance',
          email: article.auteur?.email || 'contact@alexvance.dev',
          link: siteUrl,
        },
      ],
      date: new Date(article.published_at),
      image: article.image_couverture,
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
