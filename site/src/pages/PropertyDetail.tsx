import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Maximize2, FileText, CreditCard, Navigation, MessageCircle, Info, Loader2 } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Seo from '@/components/Seo';
import Gallery from '@/components/Gallery';
import MapEmbed from '@/components/MapEmbed';
import PropertyCard from '@/components/PropertyCard';
import { formatPrice, FRAIS_DOSSIER } from '@/data/properties';
import { useProperties, findProperty } from '@/lib/useProperties';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties, loading } = useProperties();
  const property = findProperty(properties, id);

  // Ne pas annoncer « introuvable » tant que les biens n'ont pas fini de charger.
  if (loading) {
    return (
      <div className="pt-32 flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Chargement du bien…</span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 container mx-auto px-4 py-16 text-center">
        <Seo title="Bien introuvable" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Bien non trouvé</h1>
        <Button asChild variant="outline" className="rounded-full"><Link to="/biens"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link></Button>
      </div>
    );
  }

  const statusColor = property.statut === 'Disponible' ? 'bg-green-500' : property.statut === 'Réservé' ? 'bg-amber-500' : 'bg-red-500';

  const availability =
    property.statut === 'Disponible' ? 'https://schema.org/InStock'
    : property.statut === 'Réservé' ? 'https://schema.org/PreOrder'
    : 'https://schema.org/SoldOut';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.nom,
    description: property.description,
    image: `${SITE_URL}${property.photos[0]}`,
    category: property.type,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      price: property.prix,
      priceCurrency: 'XOF',
      availability,
      url: `${SITE_URL}/biens/${property.id}`,
      seller: { '@type': 'RealEstateAgent', name: SITE_NAME },
    },
  };

  // Les frais de dossier s'appliquent au paiement échelonné (transparence, cf. copywriting).
  const paiementEchelonne = /échelonn/i.test(property.modalitesPaiement);

  // Biens similaires : même ville en priorité, puis même type, sinon d'autres biens.
  const similaires = properties
    .filter(p => p.id !== property.id)
    .sort((a, b) => {
      const score = (p: typeof property) => (p.ville === property.ville ? 2 : 0) + (p.type === property.type ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 3);

  return (
    <div>
      <Seo
        title={`${property.nom} — ${formatPrice(property.prix)}`}
        description={`${property.type} de ${property.superficie} m² à ${property.ville}, ${property.quartier}. ${property.statutJuridique}. ${property.modalitesPaiement}. ${formatPrice(property.prix)}.`}
        image={property.photos[0]}
        type="product"
        jsonLd={productJsonLd}
      />
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={property.photos[0]} alt={property.nom} width={1152} height={896} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white w-fit mb-4 -ml-2 hover:bg-white/10">
            <Link to="/biens"><ArrowLeft className="mr-2 h-4 w-4" /> Retour aux biens</Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {property.siteApprouve && (
              <Badge className="bg-accent text-accent-foreground text-[10px] uppercase tracking-wider rounded-full">✓ Site approuvé</Badge>
            )}
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ${statusColor}`}>{property.statut}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">{property.nom}</h1>
          <p className="mt-2 text-white/60 flex items-center gap-2"><MapPin className="h-4 w-4" /> {property.ville}, {property.quartier}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price + key info */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-3xl font-bold text-primary mb-6">{formatPrice(property.prix)}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <InfoItem icon={FileText} label="Type" value={property.type} />
                <InfoItem icon={Maximize2} label="Superficie" value={`${property.superficie} m²`} />
                <InfoItem icon={FileText} label="Statut juridique" value={property.statutJuridique} />
                <InfoItem icon={Navigation} label="Repère" value={property.distanceRepere} />
                <InfoItem icon={CreditCard} label="Paiement" value={property.modalitesPaiement} />
              </div>

              {/* Transparence : frais de dossier (paiement échelonné) */}
              {paiementEchelonne && (
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-warning-bg/70 border border-warning/20 p-4">
                  <Info className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Frais de dossier : {formatPrice(FRAIS_DOSSIER)}</span> — non
                    remboursables, à régler à l'ouverture du dossier en cas de paiement échelonné.
                  </p>
                </div>
              )}
            </div>

            {/* Galerie (si plusieurs photos) */}
            <Gallery photos={property.photos} alt={property.nom} />

            {/* Description */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">Description</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Localisation */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">Localisation</h2>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {property.ville}, {property.quartier} — {property.distanceRepere}
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                <MapEmbed query={`${property.quartier}, ${property.ville}, Côte d'Ivoire`} className="h-64" />
              </div>
            </div>
          </div>

          {/* Right - Contact */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-8 sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-1">Ce bien vous intéresse ?</h2>
              <p className="text-sm text-muted-foreground mb-6">Remplissez le formulaire ou contactez-nous directement.</p>
              <ContactForm defaultMessage={`Je souhaite plus d'informations sur : ${property.nom}`} />
              <div className="mt-5 text-center">
                <a
                  href={`https://wa.me/2250704085000?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par : ${property.nom}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> Contacter sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Biens similaires */}
        {similaires.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">À découvrir aussi</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Biens similaires</h2>
              </div>
              <Button asChild variant="outline" className="rounded-full w-fit hidden sm:inline-flex">
                <Link to="/biens">Tous nos biens</Link>
              </Button>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similaires.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
