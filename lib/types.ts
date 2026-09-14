export type ArticleStatus = 'brouillon' | 'publie' | 'archive';
export type CommentStatus = 'approuve' | 'en_attente' | 'rejete';
export type AuthorRole = 'admin' | 'editeur' | 'auteur';

export interface Author {
  id: string;
  user_id?: string;
  nom: string;
  slug: string;
  email: string;
  avatar_url: string;
  bio: string;
  titre_professionnel: string;
  reseaux_sociaux: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    portfolio?: string;
  };
  role: AuthorRole;
  created_at?: string;
}

export interface Category {
  id: string;
  nom: string;
  slug: string;
  description: string;
  couleur: string;
  articles_count?: number;
}

export interface Tag {
  id: string;
  nom: string;
  slug: string;
}

export interface Article {
  id: string;
  titre: string;
  slug: string;
  extrait: string;
  contenu: any; // HTML string, JSON or Markdown
  image_couverture: string;
  statut: ArticleStatus;
  mise_en_avant: boolean;
  temps_lecture_minutes: number;
  vues_count: number;
  likes_count: number;
  
  // Sponsoring & Monétisation
  sponsorise: boolean;
  sponsor_nom?: string;
  sponsor_lien?: string;
  
  // SEO
  seo_title?: string;
  seo_description?: string;
  
  category_id?: string;
  category?: Category;
  auteur_id?: string;
  auteur?: Author;
  tags?: Tag[];
  
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  article_id: string;
  parent_id?: string | null;
  auteur_nom: string;
  auteur_email: string;
  auteur_website?: string;
  contenu: string;
  statut: CommentStatus;
  likes_count: number;
  created_at: string;
  replies?: Comment[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  est_confirme: boolean;
  token_confirmation?: string;
  cree_le: string;
}

export interface Reaction {
  id: string;
  article_id?: string;
  commentaire_id?: string;
  session_id: string;
  type: 'like' | 'love' | 'clap';
}

export interface AffiliateLink {
  id: string;
  nom: string;
  url_cible: string;
  slug_court: string;
  clics_count: number;
  emplacement: string;
  created_at: string;
}

export interface MonetizationConfig {
  pubs_actives: {
    header: boolean;
    sidebar: boolean;
    in_article: boolean;
    bottom_article: boolean;
  };
  sponsoring_newsletter: {
    enabled: boolean;
    text: string;
    url: string;
  };
  services_disponibles: {
    dev_web: boolean;
    ui_ux_design: boolean;
    consulting: boolean;
  };
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  tagSlug?: string;
  page?: number;
  limit?: number;
}
