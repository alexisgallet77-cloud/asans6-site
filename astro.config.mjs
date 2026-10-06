// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// URL publique et chemin de base, surchargeables au déploiement (voir README).
// - Domaine personnalisé : SITE_URL=https://www.asans6.fr, BASE_PATH=/
// - GitHub Pages sans domaine : SITE_URL=https://<compte>.github.io, BASE_PATH=/<depot>
const SITE_URL = process.env.SITE_URL || 'https://www.asans6.fr';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
