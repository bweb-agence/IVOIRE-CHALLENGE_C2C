import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase, deleteMedias } from '@/lib/supabase';
import type { PropertyRow } from '@/lib/database.types';
import { toast } from 'sonner';
import PageHeader from '../PageHeader';

const formatPrice = (p: number) => new Intl.NumberFormat('fr-FR').format(p) + ' FCFA';

export default function PropertiesList() {
  const [rows, setRows] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('ordre', { ascending: false })
      .order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Impossible de charger les biens.');
      return;
    }
    setRows((data ?? []) as PropertyRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r =>
      [r.nom, r.ville, r.quartier, r.type, r.statut].some(v => v.toLowerCase().includes(q))
    );
  }, [rows, query]);

  const togglePublish = async (row: PropertyRow) => {
    const next = !row.publie;
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: next } : r)));
    const { error } = await supabase.from('properties').update({ publie: next }).eq('id', row.id);
    if (error) {
      setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: !next } : r)));
      toast.error("La modification n'a pas pu être enregistrée.");
      return;
    }
    toast.success(next ? 'Bien publié sur le site.' : 'Bien retiré du site (brouillon).');
  };

  const remove = async (row: PropertyRow) => {
    if (!confirm(`Supprimer définitivement « ${row.nom} » ? Cette action est irréversible.`)) return;
    const { error } = await supabase.from('properties').delete().eq('id', row.id);
    if (error) {
      toast.error("La suppression a échoué.");
      return;
    }
    // Libère les photos du stockage pour ne pas laisser de fichiers orphelins.
    await deleteMedias(row.photos ?? []);
    setRows(rs => rs.filter(r => r.id !== row.id));
    toast.success('Bien supprimé.');
  };

  return (
    <div>
      <PageHeader
        title="Biens"
        subtitle={loading ? 'Chargement…' : `${rows.length} bien${rows.length > 1 ? 's' : ''} au total`}
        action={
          <Button asChild>
            <Link to="/admin/biens/nouveau">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un bien
            </Link>
          </Button>
        }
      />

      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un bien, une ville…"
          aria-label="Rechercher un bien"
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState hasQuery={Boolean(query)} />
      ) : (
        <ul className="space-y-3">
          {filtered.map(row => (
            <li
              key={row.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 sm:p-4"
            >
              <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                {row.photos[0] ? (
                  <img src={row.photos[0]} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-foreground">{row.nom}</p>
                  {!row.publie && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Brouillon
                    </span>
                  )}
                  <StatutBadge statut={row.statut} />
                </div>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {row.type} · {row.ville}
                  {row.quartier && `, ${row.quartier}`} · {row.superficie} m²
                </p>
                <p className="mt-0.5 text-sm font-semibold text-primary">{formatPrice(row.prix)}</p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePublish(row)}
                  aria-label={row.publie ? 'Retirer du site' : 'Publier sur le site'}
                  title={row.publie ? 'Retirer du site' : 'Publier sur le site'}
                >
                  {row.publie ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="sm" asChild aria-label={`Modifier ${row.nom}`}>
                  <Link to={`/admin/biens/${row.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(row)}
                  aria-label={`Supprimer ${row.nom}`}
                  className="text-muted-foreground hover:text-error"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatutBadge({ statut }: { statut: PropertyRow['statut'] }) {
  const styles =
    statut === 'Disponible'
      ? 'bg-success-bg text-success'
      : statut === 'Réservé'
        ? 'bg-warning-bg text-warning'
        : 'bg-error-bg text-error';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles}`}>
      {statut}
    </span>
  );
}

function EmptyState({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <Building2 className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
      {hasQuery ? (
        <p className="text-muted-foreground">Aucun bien ne correspond à cette recherche.</p>
      ) : (
        <>
          <p className="font-medium text-foreground">Aucun bien pour le moment.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajoutez votre premier bien pour qu'il apparaisse sur le site.
          </p>
          <Button asChild className="mt-6">
            <Link to="/admin/biens/nouveau">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un bien
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
