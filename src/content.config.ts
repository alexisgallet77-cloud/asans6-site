import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Produits : un fichier Markdown par produit dans src/content/products/.
 * Le nom du fichier devient l'URL : factually.md -> /produits/factually/
 * Modèle de page : src/pages/produits/[slug].astro (problème -> solution ->
 * fonctionnement -> bénéfices -> contact).
 */
const item = z.object({ title: z.string(), text: z.string() });

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    /** Ordre d'affichage (1 = produit phare). */
    order: z.number(),
    status: z.enum(['dev', 'soon', 'live']),
    /** Promesse courte, affichée sous le nom. */
    tagline: z.string(),
    /** Résumé de 1 à 2 phrases (accueil, liste des produits). */
    summary: z.string(),
    /** Meta description de la page produit (150-160 caractères). */
    seoDescription: z.string(),
    /** Lignes de la fiche technique (cartouche). */
    spec: z.array(z.object({ label: z.string(), value: z.string() })),
    problem: z.object({ title: z.string(), paragraphs: z.array(z.string()) }),
    solution: z.object({ title: z.string(), paragraphs: z.array(z.string()) }),
    steps: z.array(item).min(2),
    benefits: z.array(item).min(2),
    cta: z.object({ title: z.string(), text: z.string(), button: z.string() }),
  }),
});

export const collections = { products };
