/**
 * Typographie française appliquée au HTML rendu (via src/middleware.ts) :
 * - espace fine insécable avant ; ! ? et espace insécable avant : et », après « ;
 * - apostrophe typographique (’) entre deux lettres.
 * Le contenu des balises script, style, pre, code et textarea n'est pas modifié ;
 * dans les balises, seuls les attributs lisibles par l'utilisateur sont traités.
 */
const NBSP = ' ';
const NNBSP = ' ';

const SKIP_BLOCK = /^<(script|style|pre|code|textarea)\b/i;
const TOKENS =
  /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<textarea\b[\s\S]*?<\/textarea>|<!--[\s\S]*?-->|<[^>]+>)/i;
const READABLE_ATTR = /(\s(?:alt|title|content|aria-label|placeholder)=")([^"]*)(")/gi;

export function frenchText(text: string): string {
  return text
    .replace(/(\p{L})(?:'|&#39;|&#x27;)(?=\p{L})/gu, '$1’')
    .replace(/[ \t ]+([;!?])/g, `${NNBSP}$1`)
    .replace(/[ \t]+(:)(?=\s|$|<)/g, `${NBSP}$1`)
    .replace(/[ \t]+»/g, `${NBSP}»`)
    .replace(/«[ \t]+/g, `«${NBSP}`);
}

export function frenchHtml(html: string): string {
  return html
    .split(TOKENS)
    .map((part) => {
      if (!part) return part;
      if (part.startsWith('<')) {
        if (SKIP_BLOCK.test(part) || part.startsWith('<!--')) return part;
        return part.replace(READABLE_ATTR, (_, a: string, v: string, b: string) => a + frenchText(v) + b);
      }
      return frenchText(part);
    })
    .join('');
}
