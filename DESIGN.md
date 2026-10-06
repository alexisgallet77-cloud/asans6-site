# DESIGN — Asans6

## 1. Concept

**« Le bureau d’études » : un site qui se lit comme un dossier d’ingénierie bien tenu — on montre la méthode et les compétences, pas des promesses.**

Asans6 est une société d’ingénieurs qui fabrique ses propres logiciels, dont un outil de vérification des faits. Le site doit donc donner les mêmes garanties que ses produits : précision, traçabilité, sobriété. Pas de slogan qui « révolutionne » : des phrases vérifiables, une mise en page qui se lit comme un document technique soigné.

## 2. Références

| Site | Ce que j’en retiens |
| --- | --- |
| **Oxide Computer Company** (oxide.computer) | Une entreprise d’ingénieurs qui assume un ton sérieux et technique ; typographie forte, densité d’information élevée sans fouillis, couleur rare. |
| **Teenage Engineering** (teenage.engineering) | Les étiquettes techniques en chasse fixe, les fiches produit en tableaux de spécifications, la rigueur de la grille. |
| **Les Décodeurs — Le Monde** (lemonde.fr/les-decodeurs) | La rigueur éditoriale du fact-checking : hiérarchie nette, filets fins, sources citées, aucun effet gratuit. |

## 3. Palette

Construite autour des deux bleus du logo, en version claire et sombre. Le thème suit la préférence du système et peut être forcé par un bouton (choix mémorisé dans le navigateur).

| Rôle | Token | Clair | Sombre | Usage |
| --- | --- | --- | --- | --- |
| Fond | `--bg` | `#F4F5F7` | `#07101D` | Fond de page (papier froid / nuit) |
| Surface | `--surface` | `#FFFFFF` | `#0D1828` | Cartouches, champs de formulaire |
| Encre | `--ink` | `#0A1628` | `#E6EDF8` | Texte principal, titres |
| Encre secondaire | `--muted` | `#4B5568` | `#9AA7BB` | Textes secondaires, étiquettes |
| Marque | `--brand` | `#01449F` | `#7FB0FF` | Liens, boutons, bandeau d’appel — bleu roi du logo |
| Accent | `--accent` | `#0476F2` | `#4A96FF` | Le « 6 » du logo. **Parcimonie** : repères graphiques, gros chiffres ≥ 24 px |
| Filets | `--line` | `#D3D8E0` | `#1F2D43` | Bordures, séparateurs (non porteurs d’information) |

Contrastes vérifiés (WCAG 2.1) : encre 16,6:1 / 16,2:1 · secondaire 6,9:1 / 7,8:1 · marque 8,3:1 / 8,7:1 · blanc sur bleu roi 9,0:1. L’accent clair (3,95:1) n’est **jamais** utilisé pour du texte courant.

## 4. Typographie

- **Titres — Schibsted Grotesk** (variable, 500–800). Grotesque dessinée pour un groupe de presse : du caractère (terminaisons nettes, « a » et « g » affirmés) et un ancrage éditorial cohérent avec le fact-checking.
- **Texte — IBM Plex Sans** (400, 500, 600). Conçue par et pour une entreprise d’ingénierie ; excellente lisibilité en paragraphe.
- **Étiquettes techniques — IBM Plex Mono** (400, 500). Réservée aux cartouches et aux statuts produit. Jamais pour du texte long.

Échelle (fluide, `clamp()`) :

| Niveau | Taille | Graisse / interlignage |
| --- | --- | --- |
| Display (h1) | 2,6 → 5,25 rem | 700, 1,02, approche −0,03 em |
| h2 | 1,9 → 3 rem | 650, 1,08 |
| h3 | 1,25 → 1,5 rem | 600, 1,25 |
| Chapeau | 1,15 → 1,35 rem | 400, 1,5 |
| Texte | 1,0625 rem | 400, 1,65 — mesure max. 68 ch |
| Étiquette | 0,75 rem mono | 500, capitales, +0,08 em |

## 5. Grille et rythme

- Conteneur max. 76 rem (1216 px), gouttières latérales 1 rem (mobile) → 2,5 rem (desktop).
- Grille 12 colonnes : sur grand écran, titre de section à gauche (5 col.) et texte à droite (6 col.) ; sur mobile, tout s’empile.
- Espacements sur une base de 4 px ; rythme vertical des sections : 4 rem (mobile) → 8 rem (desktop).
- Rayons : 2 px (champs, boutons) — pas de gros arrondis. Aucune ombre portée : la profondeur vient des filets.
- Mises en page volontairement différentes d’une section à l’autre : index de produits en lignes, tableau de compétences, bandeau d’appel pleine largeur, prose en colonne.

## 6. Élément signature : le cartouche

Sur un plan technique, le **cartouche** est le bloc encadré qui identifie le document. Il sert ici à présenter les informations factuelles : fiche société sur l’accueil, fiche technique de chaque produit, coordonnées sur la page Contact. Le reste du site reste volontairement sobre : titres forts, texte, filets fins.

## 7. Composants de base

- **Boutons** : plein (bleu roi, texte blanc) et secondaire (filet). Hauteur 48 px, rayon 2 px, flèche qui glisse de 3 px au survol, 200 ms.
- **Liens** : soulignement fin décalé, qui s’épaissit au survol.
- **Focus** : contour 2 px couleur marque, décalé de 3 px, sur tous les éléments interactifs.
- **Étiquettes de statut** : mono, filet, point de couleur (en développement / à venir).
- **Formulaire** : champs sur surface, filet 1 px, libellés toujours visibles, messages d’aide sous le champ.
- **Emplacement `[À FOURNIR]`** : encadré pointillé visible, pour les contenus manquants — aucune preuve sociale inventée.

## 8. Mouvement

Transitions de 150–250 ms sur survols et focus, ouverture du menu mobile. Aucune animation au défilement. Tout est neutralisé sous `prefers-reduced-motion: reduce`.
