import { useEffect, useState } from 'react';
import { Plus, Loader2, Quote, Trash2, Eye, EyeOff, Save, X, Star, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import type { TestimonialRow } from '@/lib/database.types';
import { toast } from 'sonner';
import PageHeader from '../PageHeader';

const vide = { nom: '', ville: '', citation: '', note: 5, ordre: 0, publie: false };
type Brouillon = typeof vide;

export default function TestimonialsList() {
  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [edite, setEdite] = useState<{ id: string | null; valeurs: Brouillon } | null>(null);

  const charger = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('ordre')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Impossible de charger les témoignages.');
      return;
    }
    setRows((data ?? []) as TestimonialRow[]);
  };

  useEffect(() => {
    charger();
  }, []);

  const enregistrer = async () => {
    if (!edite) return;
    const v = edite.valeurs;
    if (!v.nom.trim() || !v.citation.trim()) {
      toast.error('Le nom et le témoignage sont obligatoires.');
      return;
    }
    const payload = {
      nom: v.nom.trim(),
      ville: v.ville.trim(),
      citation: v.citation.trim(),
      note: v.note,
      ordre: v.ordre,
      publie: v.publie,
    };
    const { error } = edite.id
      ? await supabase.from('testimonials').update(payload).eq('id', edite.id)
      : await supabase.from('testimonials').insert(payload);
    if (error) {
      toast.error("L'enregistrement a échoué.");
      return;
    }
    toast.success(edite.id ? 'Témoignage modifié.' : 'Témoignage ajouté.');
    setEdite(null);
    charger();
  };

  const basculerPublication = async (row: TestimonialRow) => {
    const next = !row.publie;
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: next } : r)));
    const { error } = await supabase.from('testimonials').update({ publie: next }).eq('id', row.id);
    if (error) {
      setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: !next } : r)));
      toast.error("La modification n'a pas pu être enregistrée.");
      return;
    }
    toast.success(next ? "Témoignage affiché sur l'accueil." : 'Témoignage retiré du site.');
  };

  const supprimer = async (row: TestimonialRow) => {
    if (!confirm(`Supprimer le témoignage de « ${row.nom} » ?`)) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', row.id);
    if (error) {
      toast.error('La suppression a échoué.');
      return;
    }
    setRows(rs => rs.filter(r => r.id !== row.id));
    toast.success('Témoignage supprimé.');
  };

  const publies = rows.filter(r => r.publie).length;

  return (
    <div>
      <PageHeader
        title="Témoignages"
        subtitle={loading ? 'Chargement…' : `${rows.length} au total · ${publies} affiché${publies > 1 ? 's' : ''} sur l'accueil`}
        action={
          !edite && (
            <Button onClick={() => setEdite({ id: null, valeurs: { ...vide } })}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un témoignage
            </Button>
          )
        }
      />

      {edite && (
        <Editeur
          valeurs={edite.valeurs}
          nouveau={!edite.id}
          onChange={v => setEdite({ ...edite, valeurs: v })}
          onSave={enregistrer}
          onCancel={() => setEdite(null)}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : rows.length === 0 && !edite ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Quote className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">Aucun témoignage enregistré.</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Tant qu'aucun témoignage n'est publié, la page d'accueil affiche les avis provisoires livrés avec le site.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map(row => (
            <li key={row.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground">{row.nom}</p>
                    {row.ville && <span className="text-sm text-muted-foreground">· {row.ville}</span>}
                    {!row.publie && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Brouillon
                      </span>
                    )}
                  </div>
                  <Etoiles note={row.note} />
                  <p className="mt-2 text-sm text-muted-foreground">« {row.citation} »</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => basculerPublication(row)}
                    aria-label={row.publie ? 'Retirer du site' : 'Afficher sur le site'}
                    title={row.publie ? 'Retirer du site' : 'Afficher sur le site'}
                  >
                    {row.publie ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Modifier le témoignage de ${row.nom}`}
                    onClick={() =>
                      setEdite({
                        id: row.id,
                        valeurs: {
                          nom: row.nom,
                          ville: row.ville,
                          citation: row.citation,
                          note: row.note,
                          ordre: row.ordre,
                          publie: row.publie,
                        },
                      })
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => supprimer(row)}
                    aria-label={`Supprimer le témoignage de ${row.nom}`}
                    className="text-muted-foreground hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Etoiles({ note }: { note: number }) {
  return (
    <div className="mt-1 flex gap-0.5" role="img" aria-label={`Note : ${note} étoiles sur 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${i < note ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

function Editeur({
  valeurs,
  nouveau,
  onChange,
  onSave,
  onCancel,
}: {
  valeurs: Brouillon;
  nouveau: boolean;
  onChange: (v: Brouillon) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = <K extends keyof Brouillon>(k: K, v: Brouillon[K]) => onChange({ ...valeurs, [k]: v });

  return (
    <section className="mb-6 rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        {nouveau ? 'Nouveau témoignage' : 'Modifier le témoignage'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="t-nom">Nom du client *</Label>
          <Input id="t-nom" value={valeurs.nom} onChange={e => set('nom', e.target.value)} placeholder="Kouamé A." />
        </div>
        <div>
          <Label htmlFor="t-ville">Ville</Label>
          <Input id="t-ville" value={valeurs.ville} onChange={e => set('ville', e.target.value)} placeholder="Abidjan" />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="t-citation">Témoignage *</Label>
        <Textarea
          id="t-citation"
          rows={3}
          value={valeurs.citation}
          onChange={e => set('citation', e.target.value)}
          placeholder="Ce que le client a dit de son expérience…"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="t-note">Note</Label>
          <Select value={String(valeurs.note)} onValueChange={v => set('note', Number(v))}>
            <SelectTrigger id="t-note" aria-label="Note">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map(n => (
                <SelectItem key={n} value={String(n)}>
                  {n} étoile{n > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="t-ordre">Ordre d'affichage</Label>
          <Input
            id="t-ordre"
            type="number"
            value={valeurs.ordre}
            onChange={e => set('ordre', Number(e.target.value))}
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={valeurs.publie}
              onChange={e => set('publie', e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            Afficher sur l'accueil
          </label>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" /> Annuler
        </Button>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" /> Enregistrer
        </Button>
      </div>
    </section>
  );
}
