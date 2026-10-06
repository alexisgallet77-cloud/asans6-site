/**
 * Construit un lien interne en tenant compte du chemin de base (GitHub Pages sans
 * domaine personnalisé) et de la barre oblique finale imposée par la config.
 *   href('/produits/factually') -> '/produits/factually/' ou '/depot/produits/factually/'
 */
export function href(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const [pathname, hash] = path.split('#');
  const clean = `/${(pathname ?? '').replace(/^\/|\/$/g, '')}`;
  const withSlash = clean === '/' ? '/' : `${clean}/`;
  return `${base}${withSlash}${hash ? `#${hash}` : ''}`;
}

/** Chemin courant sans le chemin de base, pour marquer le lien actif. */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}
