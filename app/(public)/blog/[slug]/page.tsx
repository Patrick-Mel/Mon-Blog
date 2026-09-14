import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Eye, Calendar, Sparkles, ArrowLeft, Tag as TagIcon } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, getCommentsByArticleId, getMonetizationConfig, incrementArticleViews } from '../../../../lib/services/blog';
import { ReadingProgressBar } from '../../../../components/blog/ReadingProgressBar';
import { TableOfContents } from '../../../../components/blog/TableOfContents';
import { ShareButtons } from '../../../../components/blog/ShareButtons';
import { CommentSection } from '../../../../components/blog/CommentSection';
import { AdBanner } from '../../../../components/monetisation/AdBanner';
import { ArticleCard } from '../../../../components/blog/ArticleCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seo_title || article.titre,
    description: article.seo_description || article.extrait,
    openGraph: {
      title: article.titre,
      description: article.extrait,
      images: [{ url: article.image_couverture }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  await incrementArticleViews(article.id);

  const comments = await getCommentsByArticleId(article.id);
  const relatedArticles = await getRelatedArticles(article.slug, article.category?.slug);
  const monetisationConfig = await getMonetizationConfig();

  const formattedDate = new Date(article.published_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <ReadingProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: `${article.category?.couleur}20`, color: article.category?.couleur }}
            >
              {article.category?.nom || 'Article'}
            </span>

            {article.sponsorise && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Sponsorisé par {article.sponsor_nom || 'Partenaire'}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {article.titre}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-xl leading-relaxed">
            {article.extrait}
          </p>

          {/* Author & Meta bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              {article.auteur?.avatar_url && (
                <img
                  src={article.auteur.avatar_url}
                  alt={article.auteur.nom}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-md shrink-0"
                />
              )}
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{article.auteur?.nom}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{article.auteur?.titre_professionnel}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" /> {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" /> {article.temps_lecture_minutes} min de lecture
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0" /> {article.vues_count} vues
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[500px]">
          <img
            src={article.image_couverture}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Article Main Body */}
          <main className="lg:col-span-8 space-y-8">
            <div
              className="article-content-body prose-custom text-slate-800 dark:text-slate-200"
              dangerouslySetInnerHTML={{ __html: article.contenu }}
            />

            {/* In-Article Native Ad */}
            <AdBanner type="in_article" enabled={monetisationConfig.pubs_actives.in_article} />

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <TagIcon className="w-3.5 h-3.5" /> Tags :
                </span>
                {article.tags.map(tag => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors"
                  >
                    #{tag.nom}
                  </Link>
                ))}
              </div>
            )}

            {/* Social Share & Likes */}
            <ShareButtons articleId={article.id} title={article.titre} initialLikes={article.likes_count} />

            {/* Bottom Ad Banner */}
            <AdBanner type="bottom_article" enabled={monetisationConfig.pubs_actives.bottom_article} />

            {/* Comments Thread */}
            <CommentSection articleId={article.id} initialComments={comments} />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents */}
            <TableOfContents content={article.contenu} />

            {/* Sidebar Native Ad Spot */}
            <AdBanner type="sidebar" enabled={monetisationConfig.pubs_actives.sidebar} />
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Articles Similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
