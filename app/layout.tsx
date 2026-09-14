import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'My blog — Tech, Web Dev & UI/UX Design',
    template: '%s | My blog',
  },
  description: 'My blog — Blog d\'un Développeur Full-Stack (Next.js, Python, Supabase, Réseaux) et Designer UI/UX. Tutoriels d\'élite, astuces design, retours d\'expérience et prestations.',
  keywords: ['Next.js', 'Supabase', 'Python', 'Django', 'Réseaux', 'TCP/IP', 'TailwindCSS', 'UI/UX Design', 'Photoshop', 'TypeScript', 'Web Development'],
  authors: [{ name: 'Alex Vance', url: 'https://alexvance.dev' }],
  icons: {
    icon: '/logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://alexvance.dev',
    siteName: 'My blog',
    title: 'My blog — Tech, Web Dev & UI/UX Design',
    description: 'Tutoriels d\'exception Next.js, Supabase, Réseaux, Python et Design UI/UX.',
    images: [{ url: '/logo.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My blog — Tech & UI/UX',
    description: 'Tutoriels d\'exception Next.js, Supabase, Réseaux, Python et Design UI/UX.',
    creator: '@alexvance_dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
