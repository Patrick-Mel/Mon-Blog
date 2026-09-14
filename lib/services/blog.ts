import { Article, Category, Comment, Tag, SearchFilters, AffiliateLink, MonetizationConfig, Author } from '../types';
import { MOCK_ARTICLES, MOCK_CATEGORIES, MOCK_TAGS, MOCK_COMMENTS, MOCK_AUTHOR, MOCK_AFFILIATE_LINKS, MOCK_MONETIZATION_CONFIG } from '../mock-data';
import { createClient as createBrowserClient } from '../supabase/client';

// Helper pour déterminer si Supabase est configuré avec de vraies clés
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder.supabase.co');
};

// Memory store fallback pour l'interactivité dynamique en local sans Supabase
let localArticlesStore = [...MOCK_ARTICLES];
let localCommentsStore = [...MOCK_COMMENTS];
let localNewsletterStore: string[] = ['user@example.com'];
let localAffiliateLinksStore = [...MOCK_AFFILIATE_LINKS];
let localMonetizationConfig = { ...MOCK_MONETIZATION_CONFIG };
let localAuthorStore = { ...MOCK_AUTHOR };

export async function getArticles(filters: SearchFilters = {}): Promise<{ articles: Article[]; total: number }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      let query = supabase
        .from('articles')
        .select('*, category:categories(*), auteur:auteurs(*)', { count: 'exact' })
        .eq('statut', 'publie')
        .order('published_at', { ascending: false });

      if (filters.categorySlug) {
        // Obtenir d'abord la catégorie
        const { data: cat } = await supabase.from('categories').select('id').eq('slug', filters.categorySlug).single();
        if (cat) {
          query = query.eq('category_id', cat.id);
        }
      }

      if (filters.query) {
        query = query.or(`titre.ilike.%${filters.query}%,extrait.ilike.%${filters.query}%`);
      }

      const limit = filters.limit || 6;
      const page = filters.page || 1;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, count, error } = await query;

      if (!error && data && data.length > 0) {
        return { articles: data as Article[], total: count || data.length };
      }
    } catch (e) {
      console.warn('Erreur Supabase getArticles, utilisation du fallback mock:', e);
    }
  }

  // Fallback Mock Data
  let filtered = [...localArticlesStore].filter(a => a.statut === 'publie');

  if (filters.categorySlug) {
    filtered = filtered.filter(a => a.category?.slug === filters.categorySlug);
  }

  if (filters.tagSlug) {
    filtered = filtered.filter(a => a.tags?.some(t => t.slug === filters.tagSlug));
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter(a => a.titre.toLowerCase().includes(q) || a.extrait.toLowerCase().includes(q));
  }

  const limit = filters.limit || 6;
  const page = filters.page || 1;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return { articles: paginated, total: filtered.length };
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const { articles } = await getArticles({ limit: 3 });
  const featured = articles.filter(a => a.mise_en_avant);
  return featured.length > 0 ? featured : articles.slice(0, 3);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*, category:categories(*), auteur:auteurs(*)')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return data as Article;
      }
    } catch (e) {
      console.warn('Erreur Supabase getArticleBySlug:', e);
    }
  }

  const found = localArticlesStore.find(a => a.slug === slug);
  return found || null;
}

export async function getRelatedArticles(currentSlug: string, categorySlug?: string): Promise<Article[]> {
  const { articles } = await getArticles({ categorySlug, limit: 4 });
  return articles.filter(a => a.slug !== currentSlug).slice(0, 3);
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Erreur Supabase getCategories:', e);
    }
  }
  return MOCK_CATEGORIES;
}

export async function getTags(): Promise<Tag[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.from('tags').select('*');
      if (!error && data && data.length > 0) {
        return data as Tag[];
      }
    } catch (e) {
      console.warn('Erreur Supabase getTags:', e);
    }
  }
  return MOCK_TAGS;
}

export async function getCommentsByArticleId(articleId: string): Promise<Comment[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('commentaires')
        .select('*')
        .eq('article_id', articleId)
        .eq('statut', 'approuve')
        .order('created_at', { ascending: true });

      if (!error && data) {
        // Imbriquer les réponses
        const map = new Map<string, Comment>();
        const rootComments: Comment[] = [];

        data.forEach((item: any) => {
          map.set(item.id, { ...item, replies: [] });
        });

        data.forEach((item: any) => {
          if (item.parent_id && map.has(item.parent_id)) {
            map.get(item.parent_id)!.replies!.push(map.get(item.id)!);
          } else {
            rootComments.push(map.get(item.id)!);
          }
        });

        return rootComments;
      }
    } catch (e) {
      console.warn('Erreur Supabase getCommentsByArticleId:', e);
    }
  }

  return localCommentsStore.filter(c => c.article_id === articleId && c.statut === 'approuve');
}

export async function addComment(comment: Partial<Comment>): Promise<{ success: boolean; message: string }> {
  const newComment: Comment = {
    id: `comm-${Date.now()}`,
    article_id: comment.article_id || 'art-1',
    parent_id: comment.parent_id || null,
    auteur_nom: comment.auteur_nom || 'Anonyme',
    auteur_email: comment.auteur_email || 'anon@blog.com',
    auteur_website: comment.auteur_website || '',
    contenu: comment.contenu || '',
    statut: 'approuve', // Auto-approuvé en dev local pour test instantané
    likes_count: 0,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.from('commentaires').insert([{
        article_id: newComment.article_id,
        parent_id: newComment.parent_id,
        auteur_nom: newComment.auteur_nom,
        auteur_email: newComment.auteur_email,
        auteur_website: newComment.auteur_website,
        contenu: newComment.contenu,
        statut: 'en_attente',
      }]);

      if (!error) {
        return { success: true, message: 'Votre commentaire a été soumis et est en cours de modération.' };
      }
    } catch (e) {
      console.warn('Erreur Supabase addComment:', e);
    }
  }

  if (newComment.parent_id) {
    const parent = localCommentsStore.find(c => c.id === newComment.parent_id);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(newComment);
    } else {
      localCommentsStore.push(newComment);
    }
  } else {
    localCommentsStore.push(newComment);
  }

  return { success: true, message: 'Commentaire publié avec succès !' };
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.from('newsletter_abonnes').insert([{
        email,
        est_confirme: true, // Ou token confirmation
      }]);

      if (!error) {
        return { success: true, message: 'Inscription réussie ! Merci d\'avoir rejoint la newsletter.' };
      }
    } catch (e) {
      console.warn('Erreur Supabase subscribeNewsletter:', e);
    }
  }

  if (!localNewsletterStore.includes(email)) {
    localNewsletterStore.push(email);
  }
  return { success: true, message: 'Inscription validée ! Vous recevrez nos prochains articles.' };
}

export async function incrementArticleViews(articleId: string): Promise<void> {
  const article = localArticlesStore.find(a => a.id === articleId);
  if (article) {
    article.vues_count += 1;
  }
}

export async function incrementArticleLikes(articleId: string): Promise<number> {
  const article = localArticlesStore.find(a => a.id === articleId);
  if (article) {
    article.likes_count += 1;
    return article.likes_count;
  }
  return 0;
}

export async function trackAffiliateClick(slug: string): Promise<string> {
  const link = localAffiliateLinksStore.find(l => l.slug_court === slug);
  if (link) {
    link.clics_count += 1;
    return link.url_cible;
  }
  return 'https://alexvance.dev';
}

export async function getMonetizationConfig(): Promise<MonetizationConfig> {
  return localMonetizationConfig;
}

export async function updateMonetizationConfig(config: MonetizationConfig): Promise<void> {
  localMonetizationConfig = { ...config };
}

export async function getAuthorProfile(): Promise<Author> {
  return localAuthorStore;
}

export async function updateAuthorProfile(author: Author): Promise<void> {
  localAuthorStore = { ...author };
}

export async function getAllArticlesForAdmin(): Promise<Article[]> {
  return localArticlesStore;
}

export async function saveArticle(article: Partial<Article>): Promise<Article> {
  if (article.id) {
    const idx = localArticlesStore.findIndex(a => a.id === article.id);
    if (idx !== -1) {
      localArticlesStore[idx] = {
        ...localArticlesStore[idx],
        ...article,
        updated_at: new Date().toISOString(),
      };
      return localArticlesStore[idx];
    }
  }

  const newArticle: Article = {
    id: `art-${Date.now()}`,
    titre: article.titre || 'Nouvel Article',
    slug: article.slug || `article-${Date.now()}`,
    extrait: article.extrait || '',
    contenu: article.contenu || '',
    image_couverture: article.image_couverture || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    statut: article.statut || 'brouillon',
    mise_en_avant: article.mise_en_avant || false,
    temps_lecture_minutes: article.temps_lecture_minutes || 5,
    vues_count: 0,
    likes_count: 0,
    sponsorise: article.sponsorise || false,
    sponsor_nom: article.sponsor_nom || '',
    sponsor_lien: article.sponsor_lien || '',
    seo_title: article.seo_title || article.titre,
    seo_description: article.seo_description || article.extrait,
    category_id: article.category_id || 'cat-1',
    category: MOCK_CATEGORIES.find(c => c.id === article.category_id) || MOCK_CATEGORIES[0],
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[0]],
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  localArticlesStore.unshift(newArticle);
  return newArticle;
}

export async function deleteArticle(id: string): Promise<void> {
  localArticlesStore = localArticlesStore.filter(a => a.id !== id);
}

export async function getAllCommentsForAdmin(): Promise<Comment[]> {
  return localCommentsStore;
}

export async function updateCommentStatus(commentId: string, status: 'approuve' | 'rejete'): Promise<void> {
  const comment = localCommentsStore.find(c => c.id === commentId);
  if (comment) {
    comment.statut = status;
  }
}

export async function getAdminStats() {
  const totalViews = localArticlesStore.reduce((acc, a) => acc + a.vues_count, 0);
  const totalArticles = localArticlesStore.length;
  const totalSubscribers = localNewsletterStore.length + 158; // Base abonnés fictifs
  const totalAffiliateClicks = localAffiliateLinksStore.reduce((acc, l) => acc + l.clics_count, 0);

  return {
    totalViews,
    totalArticles,
    totalSubscribers,
    totalAffiliateClicks,
    topArticles: [...localArticlesStore].sort((a, b) => b.vues_count - a.vues_count).slice(0, 3),
    affiliateLinks: localAffiliateLinksStore,
  };
}
