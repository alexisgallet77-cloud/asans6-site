import { defineMiddleware } from 'astro:middleware';

/**
 * Typographie française appliquée à toutes les pages : espace insécable avant : ; ! ? »,
 * après «, et apostrophe ’. On écrit donc les textes normalement.
 * Le contenu des balises script, style et textarea n'est pas modifié.
 */
const TOKENS = /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<textarea\b[\s\S]*?<\/textarea>|<[^>]+>)/i;
const READABLE_ATTR = /(\s(?:alt|title|content|aria-label|placeholder)=")([^"]*)(")/gi;

function french(text: string) {
  return text
    .replace(/(\p{L})(?:'|&#39;)(?=\p{L})/gu, '$1’')
    .replace(/[ \t ]+([;!?])/g, ' $1')
    .replace(/[ \t]+:(?=\s|$)/g, ' :')
    .replace(/[ \t]+»/g, ' »')
    .replace(/«[ \t]+/g, '« ');
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = (await response.text())
    .split(TOKENS)
    .map((part) => {
      if (!part.startsWith('<')) return french(part);
      if (/^<(script|style|textarea)\b/i.test(part)) return part;
      return part.replace(READABLE_ATTR, (_, a: string, v: string, b: string) => a + french(v) + b);
    })
    .join('');
  return new Response(html, response);
});
