import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdBanner } from '../../components/monetisation/AdBanner';
import { getMonetizationConfig } from '../../lib/services/blog';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const monetisationConfig = await getMonetizationConfig();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      <div>
        <AdBanner type="header" enabled={monetisationConfig.pubs_actives.header} />
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
