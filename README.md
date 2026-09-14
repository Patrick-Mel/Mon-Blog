# 🚀 SOVA — Blog Technique & Vitrine Créative (Dev Full-Stack & UI/UX Designer)

> **SOVA** est une plateforme de blog ultra-moderne, performante et totalement opérationnelle, conçue pour les développeurs web et designers UI/UX souhaitant publier des articles d'exception, construire une réputation d'expert et monétiser leurs compétences.

![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_%26_RLS-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Fonctionnalités Principales

### 🌐 Vitrine Publique
- **Hero Section Impactante** : Design épuré avec dégradés dynamiques, badges de compétences et présentation créative.
- **Thème Adaptatif (Sombre & Clair)** : Bascule instantanée entre Dark Mode et Light Mode avec persistance localStorage et détection automatique du système.
- **Recherche en Temps Réel (`⌘K`)** : Moteur de recherche full-text avec debounce, suggestions et filtres instantanés.
- **Organisation par Domaines & Tags** :
  - `Développement Web` (Next.js, React, Supabase)
  - `Réseaux & Infrastructures` (TCP/IP, Subnetting CIDR, Nginx, Docker)
  - `UI/UX & Design` (Design Systems, Photoshop, Typographie)
  - `Python & Data` (Django ORM, APIs, SQL)
  - `Retours d'Expérience` (Ingénierie logicielle & Freelance)
- **Lecture d'Articles Optimisée** :
  - Barre de progression de lecture au défilement top.
  - Table des matières sticky auto-générée depuis les titres H2/H3.
  - Blocs de code avec coloration syntaxique.
  - Boutons de partage social (X/Twitter, LinkedIn, Copier le lien) et compteur de Likes.
  - Espace commentaires à fils de réponses imbriqués (threads).
- **Page Services / Devis (`/services`)** : Présentation des prestations (Dev Web, UI/UX Design, Audit SEO) avec formulaire interactif de demande de devis et animation confetti.
- **SEO & RSS Feeds** : Métadonnées OpenGraph/Twitter Cards, données structurées Schema.org, génération dynamique de `sitemap.xml` (`/api/sitemap`) et de flux `RSS` (`/api/rss`).

### 💰 Module de Monétisation Intégré
- **Publicités Natives (Display Ads)** : Emplacements configurables (Header top, Sidebar article, Milieu d'article, Fin d'article).
- **Feature Flags Admin** : Activation/désactivation en 1 clic de chaque pub ou service depuis le panneau admin sans modifier le code.
- **Contenus Sponsorisés** : Champ `sponsorise`, badge visuel clair et attribut automatique `rel="sponsored"`.
- **Liens d'Affiliation Trackés** : Redirection et comptage dynamique des clics via la route `/go/[slug]`.

### 🔐 Espace d'Administration Séparé (`/admin/*`)
- **Isolation Totale** : Aucun lien vers l'admin n'apparaît sur le site public pour préserver une vitrine 100% propre.
- **Tableau de Bord Analytics (`/admin/dashboard`)** : Vues totales, nombre d'articles, abonnés newsletter et classement des articles les plus lus.
- **Éditeur Riche Tiptap (`/admin/articles/nouveau`)** : Éditeur WYSIWYG & Markdown avec insertion d'images, catégories, tags, statut et options de sponsoring.
- **Modération des Commentaires (`/admin/commentaires`)** : Validation ou rejet en 1 clic.
- **Gestionnaire de Monétisation (`/admin/monetisation`)** : Contrôle des feature flags et suivi des clics d'affiliation.

---

## 🛠️ Stack Technique

- **Frontend** : [Next.js 15 (App Router)](https://nextjs.org), [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org)
- **Styling & Animations** : [Tailwind CSS v4](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **Backend & Base de données** : [Supabase](https://supabase.com) (PostgreSQL, Auth, Storage, Row Level Security)
- **Éditeur de texte riche** : [Tiptap](https://tiptap.dev) avec coloration syntaxique `lowlight`
- **Déploiement cible** : [Vercel](https://vercel.com)

---

## 🚀 Installation & Démarrage Local

### 1. Cloner le projet
```bash
git clone https://github.com/votre-compte/mon-blog.git
cd mon-blog
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine du projet en vous basant sur `.env.example` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-publique
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role-privee
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🗄️ Configuration de la Base de Données Supabase

1. Créez un projet sur [Supabase](https://supabase.com).
2. Rendez-vous dans le **SQL Editor** de Supabase.
3. Copiez le contenu du fichier [`supabase/schema.sql`](./supabase/schema.sql) et exécutez-le. Toutes les tables et règles de sécurité **RLS** seront créées.
4. Dans **Storage**, créez un bucket public nommé `blog-assets`.

---

## ☁️ Déploiement sur Vercel

1. Poussez votre projet sur **GitHub** :
   ```bash
   git add .
   git commit -m "feat: blog SOVA initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-compte/mon-blog.git
   git push -u origin main
   ```
2. Connectez-vous sur [Vercel](https://vercel.com) et cliquez sur **"Add New Project"**.
3. Sélectionnez votre dépôt `mon-blog`.
4. Renseignez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`).
5. Cliquez sur **Deploy** !

---

## 📄 Licence
Ce projet est sous licence MIT. Libre à vous de le réutiliser et de le personnaliser.
