import { Article, Author, Category, Comment, Tag, AffiliateLink, MonetizationConfig } from './types';

export const MOCK_AUTHOR: Author = {
  id: 'author-1',
  nom: 'Alex Vance',
  slug: 'alex-vance',
  email: 'contact@alexvance.dev',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Développeur Full-Stack Senior & Designer UI/UX passionné par le Web créatif, la typographie, les réseaux informatiques et Next.js. J\'aide les entreprises à concevoir des applications ultra-performantes et sécurisées.',
  titre_professionnel: 'Full-Stack Developer & UI/UX Specialist',
  reseaux_sociaux: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://alexvance.dev'
  },
  role: 'admin',
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    nom: 'Développement Web',
    slug: 'developpement-web',
    description: 'Tutoriels avancés sur React, Next.js, TypeScript, Supabase et les architectures modernes.',
    couleur: '#3B82F6',
    articles_count: 5,
  },
  {
    id: 'cat-5',
    nom: 'Réseaux & Infrastructures',
    slug: 'reseaux-infrastructure',
    description: 'Architecture réseau TCP/IP, subnetting IP, VPN, Docker, Nginx et sécurisation cloud.',
    couleur: '#F59E0B',
    articles_count: 3,
  },
  {
    id: 'cat-2',
    nom: 'UI/UX & Design',
    slug: 'ui-ux-design',
    description: 'Conception d\'interfaces modernes, typographie web, Dark Mode et Design Systems.',
    couleur: '#EC4899',
    articles_count: 4,
  },
  {
    id: 'cat-3',
    nom: 'Python & Data',
    slug: 'python-data',
    description: 'Automatisation, Django, APIs RESTful et gestion efficace de bases de données SQL/MySQL.',
    couleur: '#10B981',
    articles_count: 3,
  },
  {
    id: 'cat-4',
    nom: 'Retours d\'Expérience',
    slug: 'retours-experience',
    description: 'Analyse de projets réels, optimisation de performances web et conseils freelance.',
    couleur: '#8B5CF6',
    articles_count: 3,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-1', nom: 'Next.js', slug: 'nextjs' },
  { id: 'tag-2', nom: 'TypeScript', slug: 'typescript' },
  { id: 'tag-3', nom: 'TailwindCSS', slug: 'tailwindcss' },
  { id: 'tag-4', nom: 'Supabase', slug: 'supabase' },
  { id: 'tag-5', nom: 'Framer Motion', slug: 'framer-motion' },
  { id: 'tag-6', nom: 'Photoshop', slug: 'photoshop' },
  { id: 'tag-7', nom: 'Django', slug: 'django' },
  { id: 'tag-8', nom: 'SEO & Performance', slug: 'seo-performance' },
  { id: 'tag-9', nom: 'Réseaux', slug: 'reseaux' },
  { id: 'tag-10', nom: 'TCP/IP', slug: 'tcp-ip' },
  { id: 'tag-11', nom: 'Docker & Infras', slug: 'docker-infras' },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-5',
    titre: 'Architecture Réseau & Subnetting IP : Du Modèle OSI à la Sécurisation des Conteneurs Docker',
    slug: 'architecture-reseau-subnetting-ip-modele-osi-docker',
    extrait: 'Guide complet des fondamentaux réseau pour développeurs : calcul de sous-réseaux (CIDR), isolation VLAN, Reverse Proxy Nginx et réseaux virtuels Docker.',
    contenu: `
      <h2>Pourquoi les développeurs web doivent maîtriser les Réseaux ?</h2>
      <p>Aujourd'hui, développer une application ne se limite plus à écrire du code frontend ou backend. Les architectures cloud (AWS, Supabase, Vercel, Docker) s'appuient à 100% sur des concepts réseaux essentiels : <strong>IP v4/v6, sous-réseaux, tables de routage, et enregistrements DNS</strong>.</p>
      
      <h3>1. Le modèle OSI et la pile TCP/IP</h3>
      <p>Comprendre le parcours d'une requête HTTP/HTTPS de la couche 7 (Application) jusqu'à la couche 1 (Physique) permet de diagnostiquer les pannes de connexion et d'optimiser la latence :</p>
      
      <ul>
        <li><strong>Couche 7 (Application) :</strong> HTTP, HTTPS, SSH, DNS</li>
        <li><strong>Couche 4 (Transport) :</strong> TCP (orienté connexion / handshake 3 voies) vs UDP (ultra-rapide pour streaming)</li>
        <li><strong>Couche 3 (Réseau) :</strong> Adressage IP et routage de paquets entre sous-réseaux</li>
      </ul>

      <h3>2. Calcul de sous-réseau (CIDR Subnetting)</h3>
      <p>Un bloc d'adresses CIDR comme <code>192.168.1.0/24</code> définit un masque de sous-réseau <code>255.255.255.0</code> autorisant jusqu'à 254 hôtes utilisables. En cloud computing, isoler votre base de données PostgreSQL Supabase dans un VPC privé avec un sous-réseau <code>/28</code> garantit une étanchéité totale.</p>

      <h3>3. Exemple de configuration d'un Reverse Proxy Nginx</h3>
      <pre><code class="language-nginx">server {
    listen 80;
    server_name api.alexvance.dev;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}</code></pre>

      <h3>Conclusion</h3>
      <p>La maîtrise de la couche réseau est l'élément qui différencie un développeur junior d'un architecte système senior capable de déployer des infrastructures résilientes et hautement disponibles.</p>
    `,
    image_couverture: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    statut: 'publie',
    mise_en_avant: true,
    temps_lecture_minutes: 9,
    vues_count: 1850,
    likes_count: 112,
    sponsorise: false,
    seo_title: 'Architecture Réseau & Subnetting IP - Le Guide Développeur',
    seo_description: 'Apprenez le modèle OSI, le routage IP, Nginx et la sécurisation des réseaux conteneurisés Docker.',
    category_id: 'cat-5',
    category: MOCK_CATEGORIES[1],
    auteur_id: 'author-1',
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[8], MOCK_TAGS[9], MOCK_TAGS[10]],
    published_at: '2026-09-12T14:00:00Z',
    created_at: '2026-09-11T09:00:00Z',
    updated_at: '2026-09-12T14:00:00Z',
  },
  {
    id: 'art-1',
    titre: 'Concevoir une architecture Next.js 15 & Supabase ultra-rapide avec RLS',
    slug: 'concevoir-architecture-nextjs-supabase-ultra-rapide-rls',
    extrait: 'Guide complet pour structurer une application SaaS ou un blog d\'élite avec le Server Component Rendering, la revalidation incrémentale et des politiques RLS imperméables.',
    contenu: `
      <h2>Pourquoi associer Next.js App Router et Supabase ?</h2>
      <p>L'alliance de <strong>Next.js (App Router)</strong> et <strong>Supabase</strong> représente aujourd'hui le summum du développement web moderne. Vous bénéficiez de la puissance du Server-Side Rendering (SSR) pour un SEO irréprochable, tout en déléguant la gestion d'authentification, de base de données PostgreSQL et de stockage d'images à une infrastructure Serverless d'exception.</p>
      
      <h3>1. La puissance des Row Level Security Policies</h3>
      <p>Au lieu d'écrire des contrôles d'accès complexes dans vos contrôleurs backend, PostgreSQL gère la sécurité au niveau de chaque ligne avec RLS (Row Level Security). Voici un exemple de politique de lecture publique pour les articles publiés :</p>
      
      <pre><code class="language-sql">CREATE POLICY "Lecture publique des articles" ON public.articles
  FOR SELECT USING (statut = 'publie' AND published_at <= NOW());</code></pre>

      <p>Grâce à cette règle simple, même si une requête malveillante tente de récupérer des données confidentielles depuis le client Supabase anonyme, la base de données ne renverra strictly que les enregistrements autorisés.</p>

      <h3>2. Optimisation des performances avec le Caching & ISR</h3>
      <p>Dans Next.js App Router, vous pouvez bénéficier de la Revalidation Incrémentale (ISR) en spécifiant un temps de revalidation sur vos requêtes Supabase :</p>

      <pre><code class="language-typescript">export async function getArticles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('statut', 'publie')
    .order('published_at', { ascending: false });
    
  return data || [];
}</code></pre>

      <h3>Conclusion</h3>
      <p>Cette approche permet d'obtenir un temps de réponse en dessous des 100ms avec un score Lighthouse frôlant les 100 points sur desktop comme sur mobile.</p>
    `,
    image_couverture: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    statut: 'publie',
    mise_en_avant: true,
    temps_lecture_minutes: 7,
    vues_count: 1420,
    likes_count: 89,
    sponsorise: true,
    sponsor_nom: 'Vercel Cloud Platform',
    sponsor_lien: 'https://vercel.com',
    seo_title: 'Architecture Next.js 15 & Supabase - Le Guide Ultime',
    seo_description: 'Découvrez comment créer un blog moderne et rapide avec Next.js App Router, Supabase RLS et Tailwind CSS.',
    category_id: 'cat-1',
    category: MOCK_CATEGORIES[0],
    auteur_id: 'author-1',
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[3]],
    published_at: '2026-09-10T10:00:00Z',
    created_at: '2026-09-09T14:30:00Z',
    updated_at: '2026-09-10T10:00:00Z',
  },
  {
    id: 'art-2',
    titre: 'Maîtriser la Typographie Web et les Dark Modes avec Tailwind CSS v4',
    slug: 'maitriser-typographie-web-dark-mode-tailwind-v4',
    extrait: 'Comment créer des palettes de couleurs harmonieuses en HSL/OKLCH, gérer des contrastes parfaits et animer la bascule de thème avec Framer Motion.',
    contenu: `
      <h2>L'importance capitale de l'Expérience Visuelle</h2>
      <p>Un excellent blog ne se contente pas d'un bon code : l'ergonomie visuelle est ce qui retient vos lecteurs. Associer une typographie serif élégante pour vos titres principaux (type Playfair ou Serif moderne) à une police sans-serif ultra-lisible (comme Inter ou Outfit) donne immédiatement un cachet professionnel.</p>

      <h3>Gérer les variables de couleurs en CSS moderne</h3>
      <p>Au lieu d'utiliser des couleurs brutes, nous définissons des tokens CSS avec le système HSL pour assurer une transition fluide entre le mode clair et le mode sombre.</p>

      <pre><code class="language-css">:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
}</code></pre>

      <p>L'utilisation d'animations discrètes lors du survol des cartes d'articles ou des boutons ajoute ce "facteur WOW" indispensable aux plateformes d'exception.</p>
    `,
    image_couverture: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    statut: 'publie',
    mise_en_avant: false,
    temps_lecture_minutes: 5,
    vues_count: 980,
    likes_count: 64,
    sponsorise: false,
    seo_title: 'Typographie Web & Dark Mode Tailwind - Astuces UI/UX',
    seo_description: 'Les meilleures pratiques pour concevoir un design system moderne avec Tailwind et du micro-animations Framer Motion.',
    category_id: 'cat-2',
    category: MOCK_CATEGORIES[2],
    auteur_id: 'author-1',
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[2], MOCK_TAGS[4], MOCK_TAGS[5]],
    published_at: '2026-09-08T09:15:00Z',
    created_at: '2026-09-07T16:20:00Z',
    updated_at: '2026-09-08T09:15:00Z',
  },
  {
    id: 'art-3',
    titre: 'Python & Django ORM : Techniques d\'optimisation de requêtes SQL pour grands volumes',
    slug: 'python-django-orm-techniques-optimisation-requetes-sql',
    extrait: 'Évitez le problème N+1 avec select_related et prefetch_related, mettez en place des index composites et maîtrisez la pagination intelligente.',
    contenu: `
      <h2>Le piège classique des requêtes N+1</h2>
      <p>Lorsque vous développez des applications backend avec Django, l'un des risques majeurs de dégradation des performances provient du chargement différé (lazy loading) des relations en base de données.</p>

      <h3>Utiliser select_related et prefetch_related</h3>
      <pre><code class="language-python"># À ÉVITER : produit N+1 requêtes SQL
articles = Article.objects.filter(statut='publie')
for article in articles:
    print(article.category.nom)

# BONNE PRATIQUE : 1 seule requête SQL JOIN
articles = Article.objects.filter(statut='publie').select_related('category').prefetch_related('tags')</code></pre>

      <p>Ces optimisations combinées à des index PostgreSQL sur le statut et les dates de création permettent de diviser par 10 le temps d'exécution de vos endpoints API.</p>
    `,
    image_couverture: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    statut: 'publie',
    mise_en_avant: false,
    temps_lecture_minutes: 8,
    vues_count: 730,
    likes_count: 42,
    sponsorise: false,
    seo_title: 'Optimiser l\'ORM Django & SQL - Tutoriel Python',
    seo_description: 'Apprenez à supprimer les requêtes N+1 et à accélérer vos projets Python avec Django et MySQL/PostgreSQL.',
    category_id: 'cat-3',
    category: MOCK_CATEGORIES[3],
    auteur_id: 'author-1',
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[6], MOCK_TAGS[1]],
    published_at: '2026-09-05T14:00:00Z',
    created_at: '2026-09-04T11:00:00Z',
    updated_at: '2026-09-05T14:00:00Z',
  },
  {
    id: 'art-4',
    titre: 'De Graphiste à Développeur Full-Stack : Comment le Design transforme la qualité du Code',
    slug: 'graphiste-a-developpeur-fullstack-comment-design-transforme-code',
    extrait: 'Retour d\'expérience d\'une double compétence : pourquoi comprendre la grille Photoshop et les contraintes UX fait de vous un ingénieur frontend d\'exception.',
    contenu: `
      <h2>La synergie entre la sensibilité graphique et la rigueur technique</h2>
      <p>Dans l'industrie du logiciel, le pont entre les designers UI et les développeurs frontend est souvent source de frictions. Avoir une double casquette de graphiste Photoshop et de développeur web permet d'anticiper les contraintes de responsive dès la conception du wireframe.</p>

      <h3>Les règles d'or pour un développeur créatif</h3>
      <ul>
        <li><strong>Comprendre le rythme vertical et l'espace blanc :</strong> la lisibilité dépend de la respiration visuelle.</li>
        <li><strong>Rendre chaque composant interactif vivant :</strong> un bouton doit réagir subtilement aux mouvements du curseur.</li>
        <li><strong>Ne jamais négliger l'accessibilité (WCAG AA) :</strong> un bon design est d'abord un design inclusif.</li>
      </ul>
    `,
    image_couverture: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    statut: 'publie',
    mise_en_avant: false,
    temps_lecture_minutes: 6,
    vues_count: 1150,
    likes_count: 95,
    sponsorise: false,
    seo_title: 'Du Design au Code Full-Stack - Retours d\'Expérience',
    seo_description: 'Découvrez comment combiner compétences visuelles en design et ingénierie logicielle pour des projets web hors normes.',
    category_id: 'cat-4',
    category: MOCK_CATEGORIES[4],
    auteur_id: 'author-1',
    auteur: MOCK_AUTHOR,
    tags: [MOCK_TAGS[5], MOCK_TAGS[2], MOCK_TAGS[4]],
    published_at: '2026-09-01T08:30:00Z',
    created_at: '2026-08-30T10:15:00Z',
    updated_at: '2026-09-01T08:30:00Z',
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comm-1',
    article_id: 'art-1',
    auteur_nom: 'Thomas Lin',
    auteur_email: 'thomas@dev.co',
    auteur_website: 'https://thomaslin.dev',
    contenu: 'Superbe article ! La partie sur la configuration des RLS Supabase avec Next.js App Router est extrêmement claire. Est-ce que tu recommandes d\'utiliser Supabase Auth UI ou un formulaire personnalisé ?',
    statut: 'approuve',
    likes_count: 12,
    created_at: '2026-09-11T14:20:00Z',
    replies: [
      {
        id: 'comm-1-1',
        article_id: 'art-1',
        parent_id: 'comm-1',
        auteur_nom: 'Alex Vance',
        auteur_email: 'contact@alexvance.dev',
        auteur_website: 'https://alexvance.dev',
        contenu: 'Merci Thomas ! Pour une application pro ou un espace admin dédié, je recommande vivement un formulaire personnalisé avec Supabase Browser Client pour garder un contrôle total sur le design Tailwind et les animations.',
        statut: 'approuve',
        likes_count: 8,
        created_at: '2026-09-11T15:05:00Z'
      }
    ]
  },
  {
    id: 'comm-2',
    article_id: 'art-1',
    auteur_nom: 'Sophie Bernard',
    auteur_email: 'sophie.design@studio.fr',
    auteur_website: '',
    contenu: 'La typographie et la mise en page de ton blog sont tout simplement bluffantes. Le temps de lecture et la table des matières dynamic rendent l\'expérience de lecture passionnante.',
    statut: 'approuve',
    likes_count: 5,
    created_at: '2026-09-12T09:40:00Z'
  }
];

export const MOCK_AFFILIATE_LINKS: AffiliateLink[] = [
  {
    id: 'aff-1',
    nom: 'Hébergement Vercel Pro',
    url_cible: 'https://vercel.com/pricing',
    slug_court: 'vercel-pro',
    clics_count: 142,
    emplacement: 'in_article',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'aff-2',
    nom: 'Supabase Pro Database',
    url_cible: 'https://supabase.com/pricing',
    slug_court: 'supabase-pro',
    clics_count: 98,
    emplacement: 'sidebar',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'aff-3',
    nom: 'Adobe Creative Cloud',
    url_cible: 'https://adobe.com/creativecloud',
    slug_court: 'adobe-cc',
    clics_count: 67,
    emplacement: 'footer',
    created_at: '2026-09-01T00:00:00Z'
  }
];

export const MOCK_MONETIZATION_CONFIG: MonetizationConfig = {
  pubs_actives: {
    header: true,
    sidebar: true,
    in_article: true,
    bottom_article: true
  },
  sponsoring_newsletter: {
    enabled: true,
    text: 'Sponsorisé par Vercel - La plateforme cloud préférée des développeurs frontend.',
    url: 'https://vercel.com'
  },
  services_disponibles: {
    dev_web: true,
    ui_ux_design: true,
    consulting: true
  }
};
