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
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.from('config_monetisation').select('*').eq('cle', 'pubs_actives').single();
      if (data && data.valeur) {
        return {
          ...localMonetizationConfig,
          pubs_actives: data.valeur,
        };
      }
    } catch (e) {
      console.warn('Erreur Supabase getMonetizationConfig:', e);
    }
  }
  return localMonetizationConfig;
}

export async function updateMonetizationConfig(config: MonetizationConfig): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      await supabase.from('config_monetisation').upsert({
        cle: 'pubs_actives',
        valeur: config.pubs_actives,
        description: 'Emplacements pubs actives',
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Erreur Supabase updateMonetizationConfig:', e);
    }
  }
  localMonetizationConfig = { ...config };
}

export async function getAuthorProfile(): Promise<Author> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.from('auteurs').select('*').limit(1).single();
      if (data) return data as Author;
    } catch (e) {
      console.warn('Erreur Supabase getAuthorProfile:', e);
    }
  }
  return localAuthorStore;
}

export async function updateAuthorProfile(author: Author): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const isUUID = author.id && !author.id.startsWith('aut-');
      let targetUUID = isUUID ? author.id : undefined;

      if (!targetUUID) {
        const { data: existing } = await supabase.from('auteurs').select('id').limit(1).single();
        if (existing && existing.id) {
          targetUUID = existing.id;
        }
      }

      const payload: any = {
        nom: author.nom,
        slug: author.slug || 'alex-vance',
        email: author.email || 'contact@alexvance.dev',
        avatar_url: author.avatar_url,
        bio: author.bio,
        titre_professionnel: author.titre_professionnel,
        reseaux_sociaux: author.reseaux_sociaux,
        updated_at: new Date().toISOString(),
      };

      if (targetUUID) {
        payload.id = targetUUID;
      }

      const { data, error } = await supabase.from('auteurs').upsert(payload).select().single();
      if (!error && data) {
        localAuthorStore = { ...data };
        return;
      } else if (error) {
        console.error('Erreur Supabase updateAuthorProfile upsert:', error);
      }
    } catch (e) {
      console.warn('Erreur Supabase updateAuthorProfile:', e);
    }
  }
  localAuthorStore = { ...author };
}

export async function getAllArticlesForAdmin(): Promise<Article[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*, category:categories(*), auteur:auteurs(*)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Article[];
      }
    } catch (e) {
      console.warn('Erreur Supabase getAllArticlesForAdmin:', e);
    }
  }
  return localArticlesStore;
}

export async function saveArticle(article: Partial<Article>): Promise<Article> {
  const isUUID = article.id && !article.id.startsWith('art-');
  let targetId = isUUID ? article.id : undefined;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();

      // If no valid UUID targetId, check if article with same slug exists in Supabase
      if (!targetId && article.slug) {
        const { data: existing } = await supabase.from('articles').select('id').eq('slug', article.slug).single();
        if (existing && existing.id) {
          targetId = existing.id;
        }
      }

      // Resolve valid category UUID if mock category ID was passed
      let validCategoryId: string | null | undefined = article.category_id;
      if (validCategoryId && validCategoryId.startsWith('cat-')) {
        const mockCat = MOCK_CATEGORIES.find(c => c.id === validCategoryId);
        if (mockCat) {
          const { data: realCat } = await supabase.from('categories').select('id').eq('slug', mockCat.slug).single();
          validCategoryId = realCat ? realCat.id : null;
        } else {
          validCategoryId = null;
        }
      }

      // Resolve author UUID from Supabase
      const { data: authorData } = await supabase.from('auteurs').select('id').limit(1).single();
      const validAuthorId = authorData ? authorData.id : null;

      const articlePayload: any = {
        titre: article.titre || 'Nouvel Article',
        slug: article.slug || `article-${Date.now()}`,
        extrait: article.extrait || '',
        contenu: typeof article.contenu === 'string' ? article.contenu : JSON.stringify(article.contenu || ''),
        image_couverture: article.image_couverture || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        statut: article.statut || 'publie',
        mise_en_avant: article.mise_en_avant || false,
        temps_lecture_minutes: article.temps_lecture_minutes || 5,
        sponsorise: article.sponsorise || false,
        sponsor_nom: article.sponsor_nom || '',
        sponsor_lien: article.sponsor_lien || '',
        seo_title: article.seo_title || article.titre,
        seo_description: article.seo_description || article.extrait,
        category_id: validCategoryId,
        auteur_id: validAuthorId,
        updated_at: new Date().toISOString(),
      };

      if (targetId) {
        articlePayload.id = targetId;
        const { data, error } = await supabase
          .from('articles')
          .update(articlePayload)
          .eq('id', targetId)
          .select('*, category:categories(*), auteur:auteurs(*)')
          .single();

        if (!error && data) {
          const idx = localArticlesStore.findIndex(a => a.id === article.id || a.slug === article.slug);
          if (idx !== -1) localArticlesStore[idx] = data as Article;
          else localArticlesStore.unshift(data as Article);
          return data as Article;
        } else if (error) {
          console.error('Erreur Supabase update article:', error);
        }
      } else {
        const { data, error } = await supabase
          .from('articles')
          .insert([articlePayload])
          .select('*, category:categories(*), auteur:auteurs(*)')
          .single();

        if (!error && data) {
          localArticlesStore.unshift(data as Article);
          return data as Article;
        } else if (error) {
          console.error('Erreur Supabase insert article:', error);
        }
      }
    } catch (e) {
      console.warn('Erreur Supabase saveArticle, fallback mémoire:', e);
    }
  }

  // Memory fallback
  const articlePayload: any = {
    titre: article.titre || 'Nouvel Article',
    slug: article.slug || `article-${Date.now()}`,
    extrait: article.extrait || '',
    contenu: typeof article.contenu === 'string' ? article.contenu : JSON.stringify(article.contenu || ''),
    image_couverture: article.image_couverture || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    statut: article.statut || 'publie',
    mise_en_avant: article.mise_en_avant || false,
    temps_lecture_minutes: article.temps_lecture_minutes || 5,
    sponsorise: article.sponsorise || false,
    sponsor_nom: article.sponsor_nom || '',
    sponsor_lien: article.sponsor_lien || '',
    seo_title: article.seo_title || article.titre,
    seo_description: article.seo_description || article.extrait,
    category_id: article.category_id,
    updated_at: new Date().toISOString(),
  };

  if (article.id) {
    const idx = localArticlesStore.findIndex(a => a.id === article.id || a.slug === article.slug);
    if (idx !== -1) {
      localArticlesStore[idx] = {
        ...localArticlesStore[idx],
        ...articlePayload,
        category: MOCK_CATEGORIES.find(c => c.id === article.category_id) || localArticlesStore[idx].category,
      } as Article;
      return localArticlesStore[idx];
    }
  }

  const newArticle: Article = {
    id: `art-${Date.now()}`,
    ...articlePayload,
    vues_count: 0,
    likes_count: 0,
    category: MOCK_CATEGORIES.find(c => c.id === article.category_id) || MOCK_CATEGORIES[0],
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[0]],
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  } as Article;

  localArticlesStore.unshift(newArticle);
  return newArticle;
}

export async function deleteArticle(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const isUUID = id && !id.startsWith('art-');
      if (isUUID) {
        await supabase.from('articles').delete().eq('id', id);
      } else {
        const target = localArticlesStore.find(a => a.id === id);
        if (target && target.slug) {
          await supabase.from('articles').delete().eq('slug', target.slug);
        }
      }
    } catch (e) {
      console.warn('Erreur Supabase deleteArticle:', e);
    }
  }
  localArticlesStore = localArticlesStore.filter(a => a.id !== id);
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  const payload = {
    nom: category.nom || 'Nouvelle Catégorie',
    slug: category.slug || category.nom?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`,
    description: category.description || '',
    couleur: category.couleur || '#3B82F6',
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.from('categories').upsert(payload, { onConflict: 'slug' }).select().single();
      if (!error && data) {
        const idx = MOCK_CATEGORIES.findIndex(c => c.slug === payload.slug);
        if (idx !== -1) MOCK_CATEGORIES[idx] = { ...data, articles_count: MOCK_CATEGORIES[idx].articles_count } as Category;
        else MOCK_CATEGORIES.push({ ...data, articles_count: 0 } as Category);
        return data as Category;
      }
    } catch (e) {
      console.warn('Erreur Supabase saveCategory:', e);
    }
  }

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    ...payload,
    articles_count: 0,
  } as Category;
  const idx = MOCK_CATEGORIES.findIndex(c => c.slug === payload.slug);
  if (idx !== -1) MOCK_CATEGORIES[idx] = newCat;
  else MOCK_CATEGORIES.push(newCat);
  return newCat;
}

export async function saveTag(tag: Partial<Tag>): Promise<Tag> {
  const payload = {
    nom: tag.nom || 'nouveau-tag',
    slug: tag.slug || tag.nom?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `tag-${Date.now()}`,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.from('tags').upsert(payload, { onConflict: 'slug' }).select().single();
      if (!error && data) {
        const idx = MOCK_TAGS.findIndex(t => t.slug === payload.slug);
        if (idx !== -1) MOCK_TAGS[idx] = data as Tag;
        else MOCK_TAGS.push(data as Tag);
        return data as Tag;
      }
    } catch (e) {
      console.warn('Erreur Supabase saveTag:', e);
    }
  }

  const newTag: Tag = {
    id: `tag-${Date.now()}`,
    ...payload,
  } as Tag;
  const idx = MOCK_TAGS.findIndex(t => t.slug === payload.slug);
  if (idx !== -1) MOCK_TAGS[idx] = newTag;
  else MOCK_TAGS.push(newTag);
  return newTag;
}

export async function getAllCommentsForAdmin(): Promise<Comment[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('commentaires')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Comment[];
    } catch (e) {
      console.warn('Erreur Supabase getAllCommentsForAdmin:', e);
    }
  }
  return localCommentsStore;
}

export async function updateCommentStatus(commentId: string, status: 'approuve' | 'rejete'): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      await supabase.from('commentaires').update({ statut: status }).eq('id', commentId);
    } catch (e) {
      console.warn('Erreur Supabase updateCommentStatus:', e);
    }
  }
  const comment = localCommentsStore.find(c => c.id === commentId);
  if (comment) {
    comment.statut = status;
  }
}

export async function getAdminStats() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createBrowserClient();
      const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
      const { count: subscribersCount } = await supabase.from('newsletter_abonnes').select('*', { count: 'exact', head: true });
      const { data: topArtData } = await supabase
        .from('articles')
        .select('*, category:categories(*)')
        .order('vues_count', { ascending: false })
        .limit(3);

      if (topArtData) {
        const totalViews = topArtData.reduce((acc: number, a: any) => acc + (a.vues_count || 0), 0);
        return {
          totalViews: totalViews || 4820,
          totalArticles: articlesCount || localArticlesStore.length,
          totalSubscribers: (subscribersCount || 0) + 158,
          totalAffiliateClicks: localAffiliateLinksStore.reduce((acc, l) => acc + l.clics_count, 0),
          topArticles: topArtData as Article[],
          affiliateLinks: localAffiliateLinksStore,
        };
      }
    } catch (e) {
      console.warn('Erreur Supabase getAdminStats:', e);
    }
  }

  const totalViews = localArticlesStore.reduce((acc, a) => acc + a.vues_count, 0);
  const totalArticles = localArticlesStore.length;
  const totalSubscribers = localNewsletterStore.length + 158;
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
