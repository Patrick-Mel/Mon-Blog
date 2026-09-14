import { NextResponse } from 'next/server';
import { getArticles, getCategories } from '../../../lib/services/blog';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { articles } = await getArticles({ limit: 100 });
  const categories = await getCategories();

  const staticPages = ['', '/blog', '/services', '/a-propos'];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      page => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${categories
    .map(
      cat => `
    <url>
      <loc>${siteUrl}/categories/${cat.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
  ${articles
    .map(
      art => `
    <url>
      <loc>${siteUrl}/blog/${art.slug}</loc>
      <lastmod>${new Date(art.updated_at || art.published_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
