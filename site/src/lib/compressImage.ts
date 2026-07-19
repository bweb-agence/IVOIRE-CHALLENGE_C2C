/** Compression des photos dans le navigateur, avant l'envoi.
 *
 *  Une photo prise au téléphone pèse souvent 3 à 6 Mo pour 4000 px de large,
 *  alors que le site n'en affiche jamais plus de ~1200 px. On redimensionne et
 *  on convertit en WebP : l'envoi depuis un mobile est bien plus rapide, et
 *  les visiteurs en données mobiles téléchargent beaucoup moins. */

const LARGEUR_MAX = 1920;
const QUALITE = 0.82;

/** Compresse une image. En cas d'échec (format exotique, navigateur ancien),
 *  renvoie le fichier d'origine plutôt que de bloquer l'utilisateur. */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  // Les SVG et GIF animés ne se compressent pas de cette manière.
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file;

  try {
    // `imageOrientation: 'from-image'` applique l'orientation EXIF : sans cela
    // les photos prises en portrait ressortent couchées.
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

    const ratio = Math.min(1, LARGEUR_MAX / Math.max(bitmap.width, bitmap.height));
    const largeur = Math.round(bitmap.width * ratio);
    const hauteur = Math.round(bitmap.height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = largeur;
    canvas.height = hauteur;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, largeur, hauteur);
    bitmap.close();

    const blob = await new Promise<Blob | null>(resolve =>
      canvas.toBlob(resolve, 'image/webp', QUALITE)
    );
    if (!blob) return file;

    // Si la « compression » alourdit le fichier (image déjà optimisée), on garde l'original.
    if (blob.size >= file.size) return file;

    const nom = file.name.replace(/\.[^.]+$/, '') + '.webp';
    return new File([blob], nom, { type: 'image/webp', lastModified: Date.now() });
  } catch {
    return file;
  }
}

export const formatTaille = (octets: number): string =>
  octets >= 1024 * 1024 ? `${(octets / 1024 / 1024).toFixed(1)} Mo` : `${Math.round(octets / 1024)} Ko`;
