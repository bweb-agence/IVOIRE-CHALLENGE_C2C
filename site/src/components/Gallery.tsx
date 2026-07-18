import { useState } from 'react';

/** Galerie photo : image principale + bande de miniatures.
 *  Ne s'affiche que s'il y a au moins 2 photos (sinon la photo unique est déjà dans le hero). */
export default function Gallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  if (photos.length < 2) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="overflow-hidden rounded-xl">
        <img
          src={photos[active]}
          alt={`${alt} — photo ${active + 1}`}
          width={1152}
          height={896}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Voir la photo ${i + 1}`}
            aria-current={i === active}
            className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
              i === active ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={src} alt="" width={80} height={64} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
