import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { properties, villes } from '@/data/properties';

const HERO_IMG = '/images/terrain-angre.webp';
const ITEMS_PER_PAGE = 9;

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get('type') || '');
  const [transaction, setTransaction] = useState('');
  const [ville, setVille] = useState(searchParams.get('ville') || '');
  const [budget, setBudget] = useState(searchParams.get('budget') || '');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (type && p.type !== type) return false;
      if (transaction && p.transaction !== transaction) return false;
      if (ville && p.ville !== ville) return false;
      if (budget && p.prix > Number(budget)) return false;
      return true;
    });
  }, [type, transaction, ville, budget]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => { setType(''); setTransaction(''); setVille(''); setBudget(''); setPage(1); };
  const hasFilters = type || transaction || ville || budget;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={HERO_IMG} width={1152} height={896} className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-12 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Nos biens</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Nos biens disponibles</h1>
          <p className="mt-3 text-white/60 max-w-lg">Terrains et maisons vérifiés, prêts à l'achat ou à la construction.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Select value={transaction} onValueChange={v => { setTransaction(v); setPage(1); }}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Achat / Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Achat">Achat</SelectItem>
                <SelectItem value="Location">Location</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={v => { setType(v); setPage(1); }}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Type de bien" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Terrain">Terrain</SelectItem>
                <SelectItem value="Maison">Maison</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ville} onValueChange={v => { setVille(v); setPage(1); }}>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Ville" /></SelectTrigger>
              <SelectContent>
                {villes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Budget max (FCFA)" value={budget} onChange={e => { setBudget(e.target.value); setPage(1); }} className="h-11 rounded-xl" />
            {hasFilters && (
              <Button variant="ghost" onClick={clearFilters} className="h-11 rounded-xl"><X className="mr-2 h-4 w-4" /> Effacer</Button>
            )}
          </div>
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
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
            <p className="text-muted-foreground font-medium">Aucun bien ne correspond à votre recherche.</p>
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
