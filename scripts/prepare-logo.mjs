// Génère les variantes du logo à partir de assets/logoAsans6.png (fond blanc).
// - détoure le fond blanc (alpha calculé par « démélange » avec le blanc) ;
// - sépare le pictogramme et le mot « Asans6 » pour composer un logo horizontal ;
// - produit une version claire (couleurs d'origine) et une version sombre (bleu roi -> blanc cassé) ;
// - produit favicon, apple-touch-icon et image Open Graph.
// Usage : npm run logo
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'assets/logoAsans6.png';
const OUT = 'src/assets/brand';
const PUB = 'public';
mkdirSync(OUT, { recursive: true });

// Couleurs relevées sur le logo d'origine.
const ROYAL = [1, 68, 159]; // #01449F
const BRIGHT = [4, 118, 242]; // #0476F2
// Couleurs de la variante sombre (alignées sur les tokens du thème sombre).
const ROYAL_ON_DARK = [230, 237, 248]; // #E6EDF8
const BRIGHT_ON_DARK = [74, 150, 255]; // #4A96FF

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

function render(variant) {
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0, j = 0; i < W * H * 3; i += 3, j += 4) {
    const [r, g] = [data[i], data[i + 1]];
    // Le rouge vaut ~0 sur les deux bleus et 255 sur le blanc : bon estimateur d'opacité.
    const a = Math.max(0, Math.min(1, (255 - r) / 250));
    if (a < 0.02) continue;
    // Couleur « démélangée » du blanc pour classer bleu roi / bleu vif.
    const gu = (g - 255 * (1 - a)) / a;
    const isBright = gu > 92;
    const col = variant === 'dark' ? (isBright ? BRIGHT_ON_DARK : ROYAL_ON_DARK) : isBright ? BRIGHT : ROYAL;
    out[j] = col[0];
    out[j + 1] = col[1];
    out[j + 2] = col[2];
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } });
}

// Zones mesurées sur l'original (852 × 852).
const MARK = { left: 165, top: 118, width: 527, height: 416 };
const WORD = { left: 13, top: 534, width: 824, height: 177 };
const FULL = { left: 13, top: 118, width: 824, height: 593 };

for (const variant of ['light', 'dark']) {
  const buf = await render(variant).png().toBuffer();
  await sharp(buf).extract(MARK).png().toFile(`${OUT}/mark-${variant}.png`);
  await sharp(buf).extract(WORD).png().toFile(`${OUT}/word-${variant}.png`);
  await sharp(buf).extract(FULL).png().toFile(`${OUT}/logo-${variant}.png`);
}

// Favicons : pictogramme bleu roi centré sur fond blanc (lisible sur onglets clairs et sombres).
const lightBuf = await render('light').png().toBuffer();
const mark = await sharp(lightBuf).extract(MARK).png().toBuffer();
async function icon(size, pad, file) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: m, gravity: 'center' }])
    .png()
    .toFile(file);
}
await icon(32, 0.04, `${PUB}/favicon-32.png`);
await icon(180, 0.14, `${PUB}/apple-touch-icon.png`);
await icon(512, 0.14, `${PUB}/icon-512.png`);

// Image Open Graph 1200 × 630 : logo sombre sur fond nuit.
const darkFull = await sharp(await render('dark').png().toBuffer()).extract(FULL).resize({ height: 380 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#08111F' } })
  .composite([{ input: darkFull, gravity: 'center' }])
  .png()
  .toFile(`${PUB}/og-default.png`);

console.log('Logo : variantes générées dans', OUT, 'et', PUB);
