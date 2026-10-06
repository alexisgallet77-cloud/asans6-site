# Site vitrine Asans6

Site statique construit avec [Astro](https://astro.build) 5, TypeScript et Tailwind CSS 4.
Intention graphique et design system : [DESIGN.md](DESIGN.md). Choix faits et contenus à fournir : [DECISIONS.md](DECISIONS.md).

## Lancer le site

Prérequis : **Node.js 20.3 ou plus récent** (Node 22 recommandé, voir DECISIONS.md).

```bash
npm install
npm run dev        # http://localhost:4321, rechargement à chaud
npm run build      # vérification TypeScript (astro check) + génération dans dist/
npm run preview    # sert dist/ sur http://localhost:4321
```

Contrôles (avec `npm run preview` lancé dans un autre terminal) :

```bash
npm run audit      # liens, SEO, alt, typographie, clavier, menu mobile, formulaire
npm run shots      # captures 375/768/1280/1920 px, clair et sombre, dans screenshots/
```

Les deux scripts utilisent Playwright ; la première fois : `npx playwright install chromium`.
Sous Git Bash (Windows), préfixer par `MSYS_NO_PATHCONV=1` si vous passez des chemins en argument (`--pages /`).

## Arborescence

```
src/
  config/site.ts          ← coordonnées, mentions légales, URL du formulaire
  content/products/*.md   ← un fichier par produit
  pages/                  ← une page = un fichier (URL = chemin)
  components/             ← en-tête, pied de page, cartouche, boutons…
  layouts/                ← gabarits (Base, LegalPage)
  styles/global.css       ← design tokens (couleurs clair/sombre, typo, espacements)
  i18n/ui.ts              ← textes d'interface partagés
  middleware.ts           ← typographie française automatique
assets/logoAsans6.png     ← logo d'origine
scripts/                  ← logo, captures, audit
```

## Modifier les textes

- **Coordonnées, informations légales, formulaire** : `src/config/site.ts`. Une valeur `null` s'affiche « [À FOURNIR] » sur le site ; remplacez-la par une chaîne.
- **Produits** : `src/content/products/<produit>.md` (en-tête YAML : accroche, problème, solution, étapes, bénéfices, appel à l'action).
- **Pages** : directement dans `src/pages/*.astro` (le texte est dans le HTML).
- **Fondateurs** : tableau `founders` en haut de `src/pages/a-propos.astro`.

La typographie française (espaces insécables avant `: ; ! ?`, guillemets, apostrophe ’) est appliquée automatiquement au rendu : écrivez avec des espaces et apostrophes normales.

## Ajouter un produit

1. Copier `src/content/products/tixa.md` vers `src/content/products/mon-produit.md`.
2. Remplir les champs (le schéma est dans `src/content.config.ts` ; `npm run build` signale tout champ manquant).
   `status` : `dev` (en développement), `soon` (à venir) ou `live` (disponible). `order` fixe l'ordre d'affichage.
3. C'est tout : la page `/produits/mon-produit/`, l'accueil, la liste des produits et le sitemap sont mis à jour.
4. Ajouter l'option correspondante dans la liste `subjects` de `src/pages/contact.astro` si besoin, et mettre à jour le nombre de feuilles (« 0X / 08 ») dans les pages.

## Formulaire de contact

Le formulaire est statique. Pour recevoir les messages :

1. Créer un formulaire sur [Formspree](https://formspree.io) (ou un service équivalent acceptant un POST HTML).
2. Copier l'URL fournie (`https://formspree.io/f/xxxxxxx`) dans `formEndpoint` de `src/config/site.ts`.
3. Mettre à jour la section « Destinataires » de la politique de confidentialité avec le nom du service.

Tant que `formEndpoint` vaut `null`, l'envoi affiche un message explicatif au lieu d'échouer.
Le champ caché `_gotcha` sert de piège à robots (convention Formspree).

## Logo

Les variantes (clair/sombre, pictogramme, mot, favicons, image Open Graph) sont générées depuis `assets/logoAsans6.png` :

```bash
npm run logo
```

Si vous obtenez une version vectorielle (SVG) du logo, elle pourra remplacer ces images.

## Déployer sur GitHub Pages

1. Créer un dépôt GitHub et y pousser le code (branche `main`).
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui construit et publie le site.
   L'URL et le chemin de base (`/nom-du-depot/`) sont détectés automatiquement.
4. **Domaine personnalisé** (recommandé) : Settings → Pages → Custom domain, puis configurer le DNS chez le registrar
   ([documentation GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
   Le site est alors servi à la racine et `robots.txt` est à sa place.

Ailleurs (Netlify, Vercel, OVH) : commande `npm run build`, dossier publié `dist/`, variables d'environnement
`SITE_URL` (ex. `https://www.asans6.fr`) et `BASE_PATH` (`/`). Sur un hébergement FTP (OVH mutualisé), envoyer le contenu de `dist/`.

## Ajouter l'anglais plus tard

1. `astro.config.mjs` : ajouter `'en'` dans `i18n.locales`.
2. `src/i18n/ui.ts` : compléter un objet `en`.
3. Créer les pages traduites sous `src/pages/en/` et un dossier `src/content/products/en/` (adapter le chargeur).
4. Ajouter un sélecteur de langue dans `Header.astro` et les balises `hreflang` dans `Base.astro`.
