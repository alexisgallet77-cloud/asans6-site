import { defineMiddleware } from 'astro:middleware';
import { frenchHtml } from './lib/typography';

/** Applique la typographie française à toutes les pages HTML (dev et build statique). */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const type = response.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) return response;
  const html = await response.text();
  return new Response(frenchHtml(html), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
