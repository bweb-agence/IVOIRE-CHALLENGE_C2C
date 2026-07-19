/** Reconnaissance des différentes sources vidéo acceptées par le CMS. */

export type SourceVideo =
  | { type: 'youtube'; id: string; vignette: string; embed: string }
  | { type: 'vimeo'; id: string; vignette: null; embed: string }
  | { type: 'facebook'; embed: string; vignette: null }
  | { type: 'fichier'; url: string; vignette: null }
  | { type: 'inconnu'; url: string; vignette: null };

const YOUTUBE = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;
const FICHIER = /\.(mp4|webm|mov|m4v)(\?|$)/i;

export function analyserVideo(url: string): SourceVideo {
  const u = url.trim();

  const yt = u.match(YOUTUBE);
  if (yt) {
    const id = yt[1];
    return {
      type: 'youtube',
      id,
      // Vignette servie par YouTube, sans cookie.
      vignette: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      // Domaine « nocookie » : rien n'est déposé tant que le visiteur ne lance pas la lecture.
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    };
  }

  const vm = u.match(VIMEO);
  if (vm) {
    return { type: 'vimeo', id: vm[1], vignette: null, embed: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  }

  if (/facebook\.com|fb\.watch/.test(u)) {
    return {
      type: 'facebook',
      vignette: null,
      embed: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u)}&show_text=false`,
    };
  }

  if (FICHIER.test(u)) return { type: 'fichier', url: u, vignette: null };

  return { type: 'inconnu', url: u, vignette: null };
}

/** Une URL est-elle exploitable comme vidéo ? */
export function videoValide(url: string): boolean {
  return analyserVideo(url).type !== 'inconnu';
}

export const LIBELLES_SOURCE: Record<SourceVideo['type'], string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  facebook: 'Facebook',
  fichier: 'Fichier hébergé',
  inconnu: 'Lien non reconnu',
};
