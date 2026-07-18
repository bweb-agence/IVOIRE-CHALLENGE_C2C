import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, ArrowUpDown } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import Seo from '@/components/Seo';
import { properties, villes, budgetRanges, priceInRange } from '@/data/properties';

const HERO_IMG = '/images/terrain-angre.webp';
const ITEMS_PER_PAGE = 9;

export default function Properties() {
  // Les filtres vivent dans l'URL : recherche partageable (WhatsApp) et bouton retour fiable.
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || '';
  const transaction = searchParams.get('transaction') || '';
  const ville = searchParams.get('ville') || '';
  const budget = searchParams.get('budget') || '';
  const tri = searchParams.get('tri') || '';
  const page = Number(searchParams.get('page')) || 1;

  /** Met à jour les paramètres d'URL ; toute modif de filtre remet à la page 1. */
  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    if (!('page' in patch)) next.delete('page');
    setSearchParams(next);
  };

  const results = useMemo(() => {
    const list = properties.filter(p => {
      if (type && p.type !== type) return false;
      if (transaction && p.transaction !== transaction) return false;
      if (ville && p.ville !== ville) return false;
      if (!priceInRange(p.prix, budget)) return false;
      return true;
    });
    if (tri === 'prix-asc') list.sort((a, b) => a.prix - b.prix);
    else if (tri === 'prix-desc') list.sort((a, b) => b.prix - a.prix);
    return list;
  }, [type, transaction, ville, budget, tri]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginated = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const hasFilters = type || transaction || ville || budget;
  const clearFilters = () => setSearchParams(new URLSearchParams());

  return (
    <div>
      <Seo
        title="Nos biens disponibles — terrains & maisons à Abidjan"
        description="Terrains documentés (ACD / titre foncier) et maisons vérifiés à Abidjan, Azaguié, Bingerville, Grand-Bassam. Achat comptant ou paiement échelonné jusqu'à 12 mois."
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={HERO_IMG} width={1152} height={896} className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Nos biens</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Nos biens disponibles</h1>
          <p className="mt-3 text-white/70 max-w-lg">Terrains et maisons vérifiés, prêts à l'achat ou à la construction.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Select value={transaction} onValueChange={v => update({ transaction: v })}>
              <SelectTrigger aria-label="Achat ou location" className="h-11 rounded-xl"><SelectValue placeholder="Achat / Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Achat">Achat</SelectItem>
                <SelectItem value="Location">Location</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={v => update({ type: v })}>
              <SelectTrigger aria-label="Type de bien" className="h-11 rounded-xl"><SelectValue placeholder="Type de bien" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Terrain">Terrain</SelectItem>
                <SelectItem value="Maison">Maison</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ville} onValueChange={v => update({ ville: v })}>
              <SelectTrigger aria-label="Ville" className="h-11 rounded-xl"><SelectValue placeholder="Ville" /></SelectTrigger>
              <SelectContent>
                {villes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={budget} onValueChange={v => update({ budget: v })}>
              <SelectTrigger aria-label="Budget" className="h-11 rounded-xl"><SelectValue placeholder="Budget" /></SelectTrigger>
              <SelectContent>
                {budgetRanges.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={tri} onValueChange={v => update({ tri: v })}>
              <SelectTrigger aria-label="Trier les résultats" className="h-11 rounded-xl">
                <ArrowUpDown className="h-4 w-4 mr-1 opacity-60" />
                <SelectValue placeholder="Trier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prix-asc">Prix croissant</SelectItem>
                <SelectItem value="prix-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compteur + reset */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{results.length}</span>{' '}
            {results.length > 1 ? 'biens trouvés' : 'bien trouvé'}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-full text-muted-foreground">
              <X className="mr-2 h-4 w-4" /> Effacer les filtres
            </Button>
          )}
        </div>

        {/* Results */}
        {paginated.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-full"
                    onClick={() => { update({ page: String(i + 1) }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-foreground font-medium">Aucun bien ne correspond à votre recherche.</p>
            <p className="text-sm text-muted-foreground mt-2">Contactez-nous, nous avons peut-être une opportunité qui n'est pas encore en ligne.</p>
            <Button asChild className="mt-6 rounded-full" variant="outline">
              <a href="https://wa.me/2250704085000" target="_blank" rel="noopener noreferrer">Nous contacter</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
