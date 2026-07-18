import { Link } from 'react-router-dom';
import { MapPin, Maximize2, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/data/properties';
import { formatPrice } from '@/data/properties';

export default function PropertyCard({ property }: { property: Property }) {
  const statusColor = property.statut === 'Disponible' ? 'bg-green-500' : property.statut === 'Réservé' ? 'bg-amber-500' : 'bg-red-500';

  return (
    <Link to={`/biens/${property.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.photos[0]}
            alt={property.nom}
            width={1152}
            height={896}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {property.siteApprouve && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] uppercase tracking-wider font-semibold rounded-full px-3">Site approuvé</Badge>
          )}
          <span className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ${statusColor}`}>
            {property.statut}
          </span>
          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-5 w-5 text-accent-foreground" />
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-lg line-clamp-1">{property.nom}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {property.ville}</span>
            <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" /> {property.superficie} m²</span>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-xl font-bold text-primary">{formatPrice(property.prix)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
