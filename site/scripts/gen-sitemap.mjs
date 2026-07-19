// Génère public/sitemap.xml à partir des pages statiques + des biens du catalogue.
// Exécuté automatiquement avant chaque build (voir "prebuild" dans package.json).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://ivoire2c.com';
const today = new Date().toISOString().slice(0, 10);

// Pages fixes (priorité indicative)
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/biens', priority: '0.9', changefreq: 'daily' },
  { path: '/a-propos', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/mentions-legales', priority: '0.2', changefreq: 'yearly' },
  { path: '/confidentialite', priority: '0.2', changefreq: 'yearly' },
];

// Biens : slugs dérivés des noms, alignés sur ceux enregistrés en base.
// Note : les biens créés depuis l'administration ne sont pas connus au build ;
// pour un sitemap exhaustif il faudra le générer depuis Supabase (à faire quand
// le catalogue sera majoritairement géré via le CMS).
const slugify = s =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();

const data = readFileSync(resolve(root, 'src/data/properties.ts'), 'utf8');
const ids = [...data.matchAll(/nom:\s*'((?:[^'\\]|\\.)*)'/g)]
  .map(m => slugify(m[1].replace(/\\'/g, "'")));

const urls = [
  ...staticPages.map(p => ({ loc: BASE + p.path, priority: p.priority, changefreq: p.changefreq })),
  ...ids.map(id => ({ loc: `${BASE}/biens/${id}`, priority: '0.8', changefreq: 'weekly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml généré — ${urls.length} URLs (${ids.length} biens)`);
