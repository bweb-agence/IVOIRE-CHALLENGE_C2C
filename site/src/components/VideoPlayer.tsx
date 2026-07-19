import { useState } from 'react';
import { Play } from 'lucide-react';
import { analyserVideo } from '@/lib/video';

/** Lecteur vidéo « à la demande ».
 *
 *  Tant que le visiteur ne clique pas, seule une vignette légère est chargée :
 *  ni lecteur YouTube, ni cookie, ni vidéo téléchargée. C'est décisif pour des
 *  visiteurs en données mobiles — un lecteur embarqué pèse plusieurs centaines
 *  de kilo-octets avant même la première image. */
export default function VideoPlayer({
  url,
  titre = 'Vidéo',
  affiche,
  className = '',
}: {
  url: string;
  titre?: string;
  /** Image de couverture ; à défaut on utilise celle de YouTube, sinon un fond sobre. */
  affiche?: string;
  className?: string;
}) {
  const [actif, setActif] = useState(false);
  const source = analyserVideo(url);

  if (source.type === 'inconnu') return null;

  const vignette = affiche ?? source.vignette ?? null;

  // Fichier hébergé : le lecteur natif suffit, avec preload="none" pour ne rien
  // télécharger avant que le visiteur ne le demande.
  if (source.type === 'fichier') {
    return (
      <video
        controls
        preload="none"
        poster={vignette ?? undefined}
        className={`w-full rounded-xl bg-black ${className}`}
      >
        <source src={source.url} />
        Votre navigateur ne peut pas lire cette vidéo.{' '}
        <a href={source.url} className="underline">
          Télécharger la vidéo
        </a>
      </video>
    );
  }

  if (actif) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-xl bg-black ${className}`}>
        <iframe
          src={source.embed}
          title={titre}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActif(true)}
      aria-label={`Lire la vidéo : ${titre}`}
      className={`group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-ink ${className}`}
    >
      {vignette && (
        <img
          src={vignette}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
        />
      )}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg transition-transform group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 fill-accent-foreground text-accent-foreground" />
      </span>
      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
        Lire la vidéo
      </span>
    </button>
  );
}
