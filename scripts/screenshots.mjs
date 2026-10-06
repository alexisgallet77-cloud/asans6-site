// Revue visuelle : captures pleine page de chaque page, à 4 largeurs, en thème clair et sombre.
// Relève aussi : erreurs console, requêtes en échec, débordement horizontal, nombre de h1.
// Usage : npm run build && npm run preview  (dans un autre terminal), puis
//         npm run shots -- [--base http://localhost:4321] [--pages /,/contact/] [--themes light,dark]
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const BASE = (args.base ?? 'http://localhost:4321').replace(/\/$/, '');
const PAGES = (args.pages ?? '/,/produits/,/produits/factually/,/produits/tixa/,/a-propos/,/contact/,/mentions-legales/,/confidentialite/,/page-inexistante/').split(',');
const THEMES = (args.themes ?? 'light,dark').split(',');
const WIDTHS = (args.widths ?? '375,768,1280,1920').split(',').map(Number);
const OUT = args.out ?? 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    await context.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {}
    }, theme);
    const page = await context.newPage();
    const log = [];
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && log.push(`console.${m.type()}: ${m.text()}`));
    page.on('pageerror', (e) => log.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => log.push(`requestfailed: ${r.url()}`));
    page.on('response', (r) => r.status() >= 400 && !r.url().includes('page-inexistante') && log.push(`HTTP ${r.status()}: ${r.url()}`));

    for (const path of PAGES) {
      log.length = 0;
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const info = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
      }));
      const name = `${OUT}/${theme}-${width}-${path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'accueil'}.png`;
      await page.screenshot({ path: name, fullPage: true });
      const issues = [...log];
      if (info.overflow > 0) issues.push(`débordement horizontal de ${info.overflow}px`);
      if (info.h1 !== 1) issues.push(`${info.h1} h1`);
      if (issues.length) problems.push(`${theme} ${width}px ${path}\n  - ${issues.join('\n  - ')}`);
    }
    await context.close();
  }
}
await browser.close();

console.log(problems.length ? `Problèmes :\n${problems.join('\n')}` : 'Aucun problème détecté.');
console.log(`Captures : ${OUT}/`);
