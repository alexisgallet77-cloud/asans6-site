# DECISIONS

Choix faits sans validation explicite, et contenus à fournir. Dernière mise à jour : octobre 2026.

## Contenus à fournir `[À FOURNIR]`

Tous apparaissent sur le site dans un cadre pointillé. Ils se renseignent dans `src/config/site.ts`, sauf mention contraire.

| Contenu | Où il apparaît | Où le renseigner |
| --- | --- | --- |
| E-mail de contact | Pied de page, Contact, mentions, confidentialité | `contact.email` |
| Téléphone (facultatif) | Contact | `contact.phone` |
| Adresse | Contact | `contact.address` |
| LinkedIn (facultatif) | Contact | `contact.linkedin` |
| URL du service de formulaire | Contact | `formEndpoint` |
| Capital social, RCS + ville, SIREN, TVA intracommunautaire | Mentions légales | `legal.*` |
| Adresse du siège social | Mentions légales, confidentialité | `legal.headOffice` |
| Directeur de la publication | Mentions légales | `legal.publicationDirector` |
| Téléphone de l'hébergeur (exigé par la LCEN) | Mentions légales | `src/pages/mentions-legales.astro` |
| Nom du service de formulaire et garanties de transfert hors UE | Confidentialité | `src/pages/confidentialite.astro` |
| Les trois fondateurs : nom, rôle, parcours, photo | À propos | `founders` dans `src/pages/a-propos.astro` |
| Date et contexte de création, origine du nom Asans6 | À propos | `src/pages/a-propos.astro` |
| Nom de domaine définitif | URL canoniques, sitemap, Open Graph | `SITE_URL` (déploiement) ou `astro.config.mjs` |
| Logo vectoriel (SVG) | Partout | remplacer les PNG de `src/assets/brand/` |

Aucune preuve sociale n'a été inventée : pas de chiffres, de logos clients, de témoignages ni de récompenses.

## Contenus rédigés à valider

- **Descriptions de Factually et de Tixa** (`src/data/products.ts`) : rédigées à partir du brief. Le fonctionnement en 4 étapes, la fiche technique et les bénéfices décrivent une intention de produit. Ils sont à confronter à ce que les produits feront réellement.
- **Tixa = application mobile** : déduit du brief (« appli taxi »).
- **Statuts** : Factually « En développement », Tixa « À venir ».
- **Compétences** (accueil § 03) et **principes** (À propos § 03) : formulés comme des pratiques de l'équipe (tests, revue de code, RGPD…). Retirez ce qui ne correspond pas à votre réalité.
- **Mentions légales et politique de confidentialité** : la structure suit la LCEN (art. 6) et le RGPD. Durée de conservation des messages : 3 ans après le dernier contact, selon la recommandation de la CNIL. **Une relecture par un juriste reste recommandée.**

## Choix techniques

| Choix | Raison |
| --- | --- |
| **Astro 5.18** et non Astro 7 | Astro 6 et 7 exigent Node ≥ 22.12 ; la machine a Node 20.11. Je n'ai pas modifié l'installation système. |
| `vite@6` en dépendance directe | `@tailwindcss/vite` installait Vite 8, qui exige Node ≥ 20.12. On aligne sur la version de Vite utilisée par Astro 5. |
| Override `@astrojs/language-server@2.16.7` | La version 2.17 utilise `require()` sur un module ESM, ce que Node 20.11 ne sait pas faire (`astro check` plantait). |
| Override `sharp` 0.35.5 | Corrige une faille de libvips signalée par `npm audit` dans la version embarquée par Astro. |
| Tailwind CSS 4 + tokens en variables CSS | Thèmes clair et sombre sans dupliquer les classes ; toutes les couleurs sont définies une seule fois dans `global.css`. |
| Aucune librairie d'animation | Les rares transitions (survols, menu) sont en CSS, et neutralisées par `prefers-reduced-motion`. |
| Polices `@fontsource` (sous-ensemble latin) | Auto-hébergées, `font-display: swap`, seules les graisses utilisées sont chargées. |
| Middleware de typographie française | Garantit les espaces insécables et les apostrophes ’ sur tout le site, y compris les textes ajoutés plus tard. |
| Thème : système par défaut + bouton | Choix mémorisé en `localStorage` (pas de cookie, pas de bandeau requis). |
| Formulaire prêt pour Formspree | GitHub Pages n'exécute pas de code serveur ; Netlify Forms n'y fonctionne pas. |
| `trailingSlash: 'always'` | Correspond au fonctionnement de GitHub Pages (`/page/` → `page/index.html`). |
| Chemin de base configurable (`BASE_PATH`) | Le site fonctionne sur `compte.github.io/depot/` comme sur un domaine personnalisé. |
| Domaine provisoire `https://www.asans6.fr` | À confirmer ; utilisé par défaut hors GitHub Actions. |

### Dépendances

| Paquet | Rôle |
| --- | --- |
| `astro` | Générateur de site statique |
| `@astrojs/sitemap` | `sitemap-index.xml` |
| `tailwindcss`, `@tailwindcss/vite` | Styles utilitaires et tokens |
| `@fontsource-variable/schibsted-grotesk`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono` | Polices auto-hébergées |
| `@astrojs/check`, `typescript` *(dev)* | Vérification de types (`astro check`) |
| `vite` *(dev)* | Aligne la version de Vite (voir ci-dessus) |

## Outils demandés mais indisponibles

- **Plugin `frontend-design`** : `/plugin` n'est pas disponible dans cet environnement. Les principes du brief (section 4) ont été appliqués et documentés dans DESIGN.md.
- **Context7 (MCP)** : non connecté. Les API ont été vérifiées sur les versions installées (types, `package.json`, `astro check`).
- **Playwright (MCP)** : non connecté. J'ai utilisé Playwright de façon temporaire pour les captures (4 largeurs, clair et sombre) et un audit (liens, SEO, accessibilité, clavier) ; il a été retiré du projet ensuite.

## Points de vigilance

- **Au lancement**, passer `indexable` à `true` dans `src/config/site.ts` : le site est pour l’instant marqué `noindex` pour que les moteurs de recherche ne référencent pas une version incomplète.

- **Mettre Node à jour (22 LTS)** puis migrer vers Astro 7. `npm audit` signale encore deux alertes, corrigées seulement dans Astro ≥ 7.2.8 :
  - la première concerne la protection d'accès par chemin côté serveur, que ce site statique n'utilise pas ;
  - la seconde concerne le serveur de développement esbuild sous Windows, en local uniquement.

  Le site publié n'est pas exposé. Le workflow GitHub Actions utilise déjà Node 22.
- La variable d'environnement `NODE_TLS_REJECT_UNAUTHORIZED=0` est définie sur la machine. Elle désactive la vérification des certificats HTTPS pour tous les programmes Node. Si ce n'est pas volontaire, il faut la supprimer.
