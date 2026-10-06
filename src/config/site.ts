/**
 * Informations de la société, centralisées ici.
 * Toute valeur `null` s'affiche sur le site comme un emplacement « [À FOURNIR] ».
 * Liste complète des contenus à fournir : voir DECISIONS.md.
 */
export const site = {
  name: 'Asans6',
  legalForm: 'SAS',
  tagline: 'Société d’ingénierie logicielle',
  description:
    'Asans6 est une société fondée par trois ingénieurs. Elle conçoit et développe ses propres logiciels, dont Factually, un outil de vérification des faits assisté par IA.',
  locale: 'fr_FR',
  /** Révision affichée dans le cartouche du pied de page (AAAA.MM). */
  revision: '2026.10',

  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    linkedin: null as string | null,
  },

  /**
   * Formulaire de contact : URL d'envoi d'un service de formulaires statique
   * (ex. Formspree : https://formspree.io/f/xxxxxxx). Voir README.
   */
  formEndpoint: null as string | null,

  legal: {
    companyName: 'Asans6',
    capital: null as string | null,
    rcs: null as string | null,
    siren: null as string | null,
    vat: null as string | null,
    headOffice: null as string | null,
    publicationDirector: null as string | null,
    host: {
      name: 'GitHub, Inc. (service GitHub Pages)',
      address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
      website: 'https://github.com',
    },
  },
} as const;
