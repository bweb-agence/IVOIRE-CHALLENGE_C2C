/** Chemin de base de l'espace d'administration.
 *
 *  Volontairement configurable via `VITE_ADMIN_PATH` : le dépôt du site est
 *  public, on ne veut donc pas y laisser figée l'URL réelle de connexion. Le
 *  chemin secret est défini dans Vercel (et dans `.env.local` en local) ; à
 *  défaut, on retombe sur `/admin`. Toute URL qui ne correspond pas au chemin
 *  configuré aboutit à la page 404 normale du site — rien ne trahit l'admin.
 *
 *  À garder en tête : ceci relève de la DISCRÉTION, pas de la sécurité. La
 *  protection réelle des données reste Supabase Auth + la liste blanche
 *  `admins` + les policies RLS. Un chemin personnalisé évite surtout que des
 *  robots ou des curieux tombent sur `/admin` et que l'URL traîne dans le
 *  dépôt public — la valeur reste néanmoins présente dans le bundle livré.
 */
const brut = import.meta.env.VITE_ADMIN_PATH?.trim() || 'admin';

// On normalise (sans slash de début ni de fin) pour maîtriser la composition.
const base = brut.replace(/^\/+|\/+$/g, '');

/** Racine de l'admin, ex. « /gestion-2c-x7k2 ». */
export const ADMIN_BASE = `/${base}`;

/** Page de connexion, ex. « /gestion-2c-x7k2/login ». */
export const ADMIN_LOGIN = `${ADMIN_BASE}/login`;
