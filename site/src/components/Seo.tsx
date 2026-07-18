import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, OG_IMAGE, DEFAULT_DESCRIPTION } from '@/lib/seo';

interface SeoProps {
  title: string;
  description?: string;
  /** Chemin relatif de l'image (défaut : image de partage de marque). */
  image?: string;
  type?: 'website' | 'article' | 'product';
  /** Objet(s) JSON-LD à injecter pour cette page. */
  jsonLd?: object | object[];
}

/** Gère les balises <head> par page (title, meta, Open Graph, canonical, JSON-LD)
 *  sans dépendance externe. Google et les crawlers qui exécutent le JS les voient. */
export default function Seo({ title, description = DEFAULT_DESCRIPTION, image, type = 'website', jsonLd }: SeoProps) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const img = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : OG_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (key: 'name' | 'property', value: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'fr_FR');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD propre à la page (retiré au démontage pour éviter les doublons entre routes).
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const block of blocks) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-page-jsonld', '');
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
        scripts.push(s);
      }
    }
    return () => scripts.forEach(s => s.remove());
  }, [fullTitle, description, img, type, url, jsonLd]);

  return null;
}
