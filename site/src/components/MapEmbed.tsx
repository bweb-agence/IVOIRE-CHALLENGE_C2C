/** Carte Google Maps intégrée sans clé API (embed par requête textuelle).
 *  `query` : lieu à afficher, ex. "Azaguié, Côte d'Ivoire". */
export default function MapEmbed({ query, className = '' }: { query: string; className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=fr&z=13&output=embed`;
  return (
    <iframe
      title={`Carte — ${query}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full border-0 ${className}`}
    />
  );
}
