// Audit du site compilé (dist/) puis tests d'interaction dans un navigateur.
// Usage : npm run build && npm run preview (autre terminal), puis npm run audit
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const DIST = 'dist';
const BASE = process.env.AUDIT_BASE ?? 'http://localhost:4321';
const errors = [];
const warn = (m) => errors.push(m);

const htmlFiles = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

const titles = new Map();
const descriptions = new Map();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const page = file.replace(/\\/g, '/');

  // Structure et SEO
  if (!/<html lang="fr"/.test(html)) warn(`${page} : attribut lang manquant`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) warn(`${page} : ${h1} h1`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) warn(`${page} : title manquant`);
  if (!desc) warn(`${page} : meta description manquante`);
  else if (desc.length < 70 || desc.length > 170) warn(`${page} : meta description de ${desc.length} caractères`);
  if (titles.has(title)) warn(`${page} : title identique à ${titles.get(title)}`);
  if (descriptions.has(desc)) warn(`${page} : description identique à ${descriptions.get(desc)}`);
  titles.set(title, page);
  descriptions.set(desc, page);
  if (!/property="og:image"/.test(html)) warn(`${page} : og:image manquante`);

  // Images : attribut alt obligatoire (vide autorisé pour les images décoratives)
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt(=|\s|\/?>)/.test(img)) warn(`${page} : image sans alt : ${img.slice(0, 80)}`);
    if (!/\swidth="/.test(img) || !/\sheight="/.test(img)) warn(`${page} : image sans dimensions`);
  }

  // Liens internes
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const [path] = href.split(/[?#]/);
    const target = join(DIST, path, path.endsWith('/') ? 'index.html' : '');
    if (!existsSync(target)) warn(`${page} : lien cassé ${href}`);
  }

  // Typographie française (texte visible uniquement)
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'");
  const straight = text.match(/\p{L}'\p{L}/gu);
  if (straight) warn(`${page} : apostrophes droites : ${[...new Set(straight)].join(', ')}`);
  const badSpace = text.match(/\S {1,}[;!?:»]|« \S/g);
  if (badSpace) warn(`${page} : espace sécable avant ponctuation : ${[...new Set(badSpace)].slice(0, 5).join(' | ')}`);
  if (/lorem ipsum/i.test(text)) warn(`${page} : lorem ipsum`);
}

for (const f of ['robots.txt', 'sitemap-index.xml', '404.html', 'favicon-32.png', 'og-default.png']) {
  if (!existsSync(join(DIST, f))) warn(`fichier manquant : ${f}`);
}

// --- Tests d'interaction ---------------------------------------------------
const browser = await chromium.launch();

// Clavier : lien d'évitement, focus visible, navigation au Tab
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/`);
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (skip !== 'Aller au contenu') warn(`clavier : le premier Tab ne cible pas le lien d'évitement (${skip})`);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return 'body';
      const s = getComputedStyle(el);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 ? 'ok' : `${el.tagName} sans contour`;
    });
    if (outline !== 'ok') warn(`clavier : focus non visible (${outline}) au Tab n°${i + 2}`);
  }
  // Bascule de thème
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.click('[data-theme-toggle]');
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  if (before === after) warn('thème : la bascule ne change pas le thème');
  await page.reload();
  const persisted = await page.evaluate(() => document.documentElement.dataset.theme);
  if (persisted !== after) warn('thème : le choix n’est pas mémorisé');
  await page.close();
}

// Menu mobile : ouverture au clavier, Échap, retour du focus
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(`${BASE}/`);
  const btn = page.locator('[data-menu-toggle]');
  await btn.focus();
  await page.keyboard.press('Enter');
  if ((await btn.getAttribute('aria-expanded')) !== 'true') warn('menu mobile : ne s’ouvre pas');
  if (!(await page.locator('#mobile-menu').isVisible())) warn('menu mobile : panneau invisible');
  const focused = await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null);
  if (!focused) warn('menu mobile : le focus n’entre pas dans le menu');
  await page.keyboard.press('Escape');
  if ((await btn.getAttribute('aria-expanded')) !== 'false') warn('menu mobile : Échap ne ferme pas');
  const back = await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle'));
  if (!back) warn('menu mobile : le focus ne revient pas sur le bouton');
  await page.close();
}

// Formulaire : validation native, pré-sélection de l'objet, message tant que non configuré
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/contact/?sujet=factually`);
  if ((await page.inputValue('#sujet')) !== 'factually') warn('formulaire : objet non pré-sélectionné');
  await page.click('button[type=submit]');
  const invalid = await page.evaluate(() => !document.querySelector('form')?.checkValidity());
  if (!invalid) warn('formulaire : envoi possible avec des champs vides');
  await page.fill('#nom', 'Test');
  await page.fill('#email', 'test@example.com');
  await page.fill('#message', 'Message de test suffisamment long.');
  await page.check('#consentement');
  await page.click('button[type=submit]');
  const configured = await page.getAttribute('form', 'data-configured');
  if (configured === 'false' && !(await page.locator('.form-status').isVisible()))
    warn('formulaire : pas de message alors que le service n’est pas configuré');
  await page.close();
}

await browser.close();

console.log(`${htmlFiles.length} pages auditées.`);
console.log(errors.length ? `\n${errors.length} problème(s) :\n- ${errors.join('\n- ')}` : 'Aucun problème.');
process.exitCode = errors.length ? 1 : 0;
