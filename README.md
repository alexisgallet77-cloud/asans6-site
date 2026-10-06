# Site vitrine Asans6

Site statique : [Astro](https://astro.build) 5 + Tailwind CSS 4.
Intention graphique : [DESIGN.md](DESIGN.md). Choix faits et contenus à fournir : [DECISIONS.md](DECISIONS.md).

## Lancer le site

Prérequis : Node.js 20.3 ou plus récent (22 recommandé).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # vérification TypeScript + génération dans dist/
npm run preview   # sert dist/
```

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Coordonnées, informations légales, URL du formulaire | `src/config/site.ts` (une valeur `null` s'affiche « [À FOURNIR] ») |
| Produits | `src/data/products.ts` |
| Textes des pages | `src/pages/*.astro` |
| Fondateurs | tableau `founders` en haut de `src/pages/a-propos.astro` |
| Couleurs, polices, espacements | `src/styles/global.css` |
| Référencement Google (actuellement désactivé) | `indexable` dans `src/config/site.ts` : passer à `true` au lancement |

Écrivez les textes normalement : les espaces insécables avant `: ; ! ?` et l'apostrophe ’ sont ajoutées automatiquement (`src/middleware.ts`).

## Ajouter un produit

Dans `src/data/products.ts`, copier un bloc produit et le remplir (`slug` = adresse de la page, `/produits/<slug>/`).
La page produit, l'accueil, la liste des produits et le sitemap se mettent à jour seuls.
Ajouter si besoin l'objet correspondant dans la liste `subjects` de `src/pages/contact.astro`.

## Formulaire de contact

1. Créer un formulaire sur [Formspree](https://formspree.io) (ou un service équivalent).
2. Copier l'URL fournie dans `formEndpoint` de `src/config/site.ts`.
3. Indiquer le nom du service dans la politique de confidentialité (section « Destinataires »).

Tant que `formEndpoint` vaut `null`, l'envoi affiche un message explicatif.

## Déployer sur GitHub Pages

1. Pousser le code sur la branche `main` d'un dépôt GitHub.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push publie le site (`.github/workflows/deploy.yml`). L'adresse `compte.github.io/depot/` comme un domaine personnalisé sont gérés automatiquement.

Ailleurs (Netlify, Vercel, OVH) : commande `npm run build`, dossier `dist/`, variables `SITE_URL` (ex. `https://www.asans6.fr`) et `BASE_PATH` (`/`).

## Ajouter l'anglais plus tard

Ajouter `'en'` dans `i18n.locales` (`astro.config.mjs`), créer les pages traduites sous `src/pages/en/`, puis un sélecteur de langue dans `src/components/Header.astro`.
