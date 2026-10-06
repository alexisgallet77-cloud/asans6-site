/**
 * Textes d'interface partagés (navigation, pied de page, formulaire).
 * Pour ajouter l'anglais : ajouter `en` dans astro.config.mjs (i18n.locales),
 * compléter l'objet `en` ci-dessous et créer les pages sous src/pages/en/.
 */
export const languages = { fr: 'Français' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

export const ui = {
  fr: {
    'skip': 'Aller au contenu',
    'nav.label': 'Navigation principale',
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer le menu',
    'theme.toLight': 'Passer au thème clair',
    'theme.toDark': 'Passer au thème sombre',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    'footer.sheet': 'Feuille',
    'footer.revision': 'Rév.',
    'cta.contact': 'Nous écrire',
    'status.dev': 'En développement',
    'status.soon': 'À venir',
    'status.live': 'Disponible',
    'todo': 'À FOURNIR',
  },
} as const;

export function useTranslations(lang: Lang = defaultLang) {
  return (key: keyof (typeof ui)[typeof defaultLang]) => ui[lang][key] ?? ui[defaultLang][key];
}
