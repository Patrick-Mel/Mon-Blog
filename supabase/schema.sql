-- =============================================================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE - BLOG DÉVELOPPEUR & GRAPHISTE (SOVA)
-- =============================================================================

-- Extension pgcrypto pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. TABLE : auteurs (Profils d'auteurs liés aux utilisateurs Supabase Auth)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.auteurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nom VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  titre_professionnel VARCHAR(255) DEFAULT 'Développeur Full-Stack & Designer UI/UX',
  reseaux_sociaux JSONB DEFAULT '{"github": "https://github.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com"}'::jsonb,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'editeur', 'auteur')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. TABLE : categories
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  couleur VARCHAR(50) DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertion des catégories initiales
INSERT INTO public.categories (nom, slug, description, couleur) VALUES
('Développement Web', 'developpement-web', 'Tutoriels avancés React, Next.js, Supabase', '#3B82F6'),
('Réseaux & Infrastructures', 'reseaux-infrastructure', 'Architecture réseau TCP/IP, subnetting IP, VPN, Docker, Nginx', '#F59E0B'),
('UI/UX & Design', 'ui-ux-design', 'Design systems, typographie et Photoshop', '#EC4899'),
('Python & Data', 'python-data', 'Django, automatisation et bases de données', '#10B981'),
('Retours d''Expérience', 'retours-experience', 'Projets réels et conseils d''ingénierie', '#8B5CF6')
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. TABLE : tags
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. TABLE : articles
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  extrait TEXT NOT NULL,
  contenu JSONB NOT NULL, -- Format JSON Tiptap / Rich Content
  image_couverture TEXT,
  statut VARCHAR(20) DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'publie', 'archive')),
  mise_en_avant BOOLEAN DEFAULT FALSE,
  temps_lecture_minutes INT DEFAULT 5,
  vues_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  
  -- Sponsoring & Monétisation
  sponsorise BOOLEAN DEFAULT FALSE,
  sponsor_nom VARCHAR(255),
  sponsor_lien TEXT,
  
  -- SEO Metadata
  seo_title VARCHAR(255),
  seo_description TEXT,
  
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  auteur_id UUID REFERENCES public.auteurs(id) ON DELETE SET NULL,
  
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_statut ON public.articles(statut);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING gin(to_tsvector('french', titre || ' ' || extrait));

-- -----------------------------------------------------------------------------
-- 5. TABLE INTERMÉDIAIRE : article_tags
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- -----------------------------------------------------------------------------
-- 6. TABLE : commentaires (Modération & Réponses imbriquées)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commentaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.commentaires(id) ON DELETE CASCADE,
  auteur_nom VARCHAR(100) NOT NULL,
  auteur_email VARCHAR(255) NOT NULL,
  auteur_website TEXT,
  contenu TEXT NOT NULL,
  statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('approuve', 'en_attente', 'rejete')),
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_commentaires_article ON public.commentaires(article_id);
CREATE INDEX IF NOT EXISTS idx_commentaires_parent ON public.commentaires(parent_id);

-- -----------------------------------------------------------------------------
-- 7. TABLE : newsletter_abonnes (Double Opt-In)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_abonnes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  est_confirme BOOLEAN DEFAULT FALSE,
  token_confirmation VARCHAR(100),
  cree_le TIMESTAMPTZ DEFAULT NOW(),
  confirme_le TIMESTAMPTZ
);

-- -----------------------------------------------------------------------------
-- 8. TABLE : reactions (Likes / Applause)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  commentaire_id UUID REFERENCES public.commentaires(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,
  type VARCHAR(20) DEFAULT 'like',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_article_reaction UNIQUE(article_id, session_id),
  CONSTRAINT unique_comment_reaction UNIQUE(commentaire_id, session_id)
);

-- -----------------------------------------------------------------------------
-- 9. TABLE : liens_affiliation (Tracking de clics)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.liens_affiliation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  url_cible TEXT NOT NULL,
  slug_court VARCHAR(100) UNIQUE NOT NULL,
  clics_count INT DEFAULT 0,
  emplacement VARCHAR(100) DEFAULT 'article',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. TABLE : config_monetisation (Feature Flags)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.config_monetisation (
  cle VARCHAR(100) PRIMARY KEY,
  valeur JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertion des réglages par défaut
INSERT INTO public.config_monetisation (cle, valeur, description) VALUES
('pubs_actives', '{"header": true, "sidebar": true, "in_article": true, "bottom_article": true}'::jsonb, 'Activation globale des emplacements pub'),
('sponsoring_newsletter', '{"enabled": true, "text": "Sponsorisé par Vercel", "url": "https://vercel.com"}'::jsonb, 'Bloc sponsor pour newsletter'),
('services_disponibles', '{"dev_web": true, "ui_ux_design": true, "consulting": true}'::jsonb, 'Disponibilité des prestations')
ON CONFLICT (cle) DO NOTHING;

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auteurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commentaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_abonnes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liens_affiliation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.config_monetisation ENABLE ROW LEVEL SECURITY;

-- Drop existants au besoin
DROP POLICY IF EXISTS "Lecture publique des articles publies" ON public.articles;
DROP POLICY IF EXISTS "Admin full access articles" ON public.articles;
DROP POLICY IF EXISTS "Lecture publique categories" ON public.categories;
DROP POLICY IF EXISTS "Admin full access categories" ON public.categories;
DROP POLICY IF EXISTS "Lecture publique tags" ON public.tags;
DROP POLICY IF EXISTS "Admin full access tags" ON public.tags;
DROP POLICY IF EXISTS "Lecture publique article_tags" ON public.article_tags;
DROP POLICY IF EXISTS "Admin full access article_tags" ON public.article_tags;
DROP POLICY IF EXISTS "Lecture publique auteurs" ON public.auteurs;
DROP POLICY IF EXISTS "Admin full access auteurs" ON public.auteurs;
DROP POLICY IF EXISTS "Lecture publique commentaires approuves" ON public.commentaires;
DROP POLICY IF EXISTS "Insertion publique commentaires" ON public.commentaires;
DROP POLICY IF EXISTS "Admin full access commentaires" ON public.commentaires;
DROP POLICY IF EXISTS "Insertion abonnes newsletter" ON public.newsletter_abonnes;
DROP POLICY IF EXISTS "Admin full access newsletter" ON public.newsletter_abonnes;
DROP POLICY IF EXISTS "Insertion reactions" ON public.reactions;
DROP POLICY IF EXISTS "Lecture reactions" ON public.reactions;
DROP POLICY IF EXISTS "Lecture liens affiliation" ON public.liens_affiliation;
DROP POLICY IF EXISTS "Admin full access liens affiliation" ON public.liens_affiliation;
DROP POLICY IF EXISTS "Lecture config monetisation" ON public.config_monetisation;
DROP POLICY IF EXISTS "Admin full access config monetisation" ON public.config_monetisation;

-- Articles
DROP POLICY IF EXISTS "Public full access articles" ON public.articles;
CREATE POLICY "Public full access articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

-- Categories & Tags
DROP POLICY IF EXISTS "Public full access categories" ON public.categories;
CREATE POLICY "Public full access categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access tags" ON public.tags;
CREATE POLICY "Public full access tags" ON public.tags FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access article_tags" ON public.article_tags;
CREATE POLICY "Public full access article_tags" ON public.article_tags FOR ALL USING (true) WITH CHECK (true);

-- Auteurs
DROP POLICY IF EXISTS "Public full access auteurs" ON public.auteurs;
CREATE POLICY "Public full access auteurs" ON public.auteurs FOR ALL USING (true) WITH CHECK (true);

-- Commentaires
DROP POLICY IF EXISTS "Public full access commentaires" ON public.commentaires;
CREATE POLICY "Public full access commentaires" ON public.commentaires FOR ALL USING (true) WITH CHECK (true);

-- Newsletter
DROP POLICY IF EXISTS "Public full access newsletter" ON public.newsletter_abonnes;
CREATE POLICY "Public full access newsletter" ON public.newsletter_abonnes FOR ALL USING (true) WITH CHECK (true);

-- Reactions & Affiliation
DROP POLICY IF EXISTS "Insertion reactions" ON public.reactions;
CREATE POLICY "Insertion reactions" ON public.reactions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lecture reactions" ON public.reactions;
CREATE POLICY "Lecture reactions" ON public.reactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public full access liens affiliation" ON public.liens_affiliation;
CREATE POLICY "Public full access liens affiliation" ON public.liens_affiliation FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public full access config monetisation" ON public.config_monetisation;
CREATE POLICY "Public full access config monetisation" ON public.config_monetisation FOR ALL USING (true) WITH CHECK (true);
