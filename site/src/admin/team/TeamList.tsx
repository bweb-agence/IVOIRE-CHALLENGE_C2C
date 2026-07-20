import { useEffect, useState } from 'react';
import { Plus, Loader2, Users, Trash2, Eye, EyeOff, Save, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase, deleteMedias } from '@/lib/supabase';
import type { TeamMemberRow } from '@/lib/database.types';
import { toast } from 'sonner';
import PageHeader from '../PageHeader';
import PhotoUploader from '../PhotoUploader';

const vide = { nom: '', fonction: '', initiales: '', photo: '', ordre: 0, publie: false };
type Brouillon = typeof vide;

/** Initiales par défaut (« Awa Traoré » → « AT ») si l'utilisateur n'en saisit pas. */
function initialesDe(nom: string): string {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(m => m[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TeamList() {
  const [rows, setRows] = useState<TeamMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [edite, setEdite] = useState<{ id: string | null; valeurs: Brouillon } | null>(null);

  const charger = async () => {
    const { data, error } = await supabase.from('team_members').select('*').order('ordre');
    setLoading(false);
    if (error) {
      toast.error("Impossible de charger l'équipe.");
      return;
    }
    setRows((data ?? []) as TeamMemberRow[]);
  };

  useEffect(() => {
    charger();
  }, []);

  const enregistrer = async () => {
    if (!edite) return;
    const v = edite.valeurs;
    if (!v.nom.trim()) {
      toast.error('Le nom est obligatoire.');
      return;
    }
    const payload = {
      nom: v.nom.trim(),
      fonction: v.fonction.trim(),
      initiales: v.initiales.trim() || initialesDe(v.nom.trim()),
      photo: v.photo || null,
      ordre: v.ordre,
      publie: v.publie,
    };
    const { error } = edite.id
      ? await supabase.from('team_members').update(payload).eq('id', edite.id)
      : await supabase.from('team_members').insert(payload);
    if (error) {
      toast.error("L'enregistrement a échoué.");
      return;
    }
    toast.success(edite.id ? 'Membre modifié.' : 'Membre ajouté.');
    setEdite(null);
    charger();
  };

  const basculerPublication = async (row: TeamMemberRow) => {
    const next = !row.publie;
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: next } : r)));
    const { error } = await supabase.from('team_members').update({ publie: next }).eq('id', row.id);
    if (error) {
      setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: !next } : r)));
      toast.error("La modification n'a pas pu être enregistrée.");
      return;
    }
    toast.success(next ? 'Membre affiché sur la page À propos.' : 'Membre retiré du site.');
  };

  const supprimer = async (row: TeamMemberRow) => {
    if (!confirm(`Retirer « ${row.nom} » de l'équipe ?`)) return;
    const { error } = await supabase.from('team_members').delete().eq('id', row.id);
    if (error) {
      toast.error('La suppression a échoué.');
      return;
    }
    if (row.photo) await deleteMedias([row.photo]);
    setRows(rs => rs.filter(r => r.id !== row.id));
    toast.success('Membre retiré.');
  };

  const publies = rows.filter(r => r.publie).length;

  return (
    <div>
      <PageHeader
        title="Équipe"
        subtitle={loading ? 'Chargement…' : `${rows.length} membre${rows.length > 1 ? 's' : ''} · ${publies} affiché${publies > 1 ? 's' : ''}`}
        action={
          !edite && (
            <Button onClick={() => setEdite({ id: null, valeurs: { ...vide } })}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un membre
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
          <Users className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">Aucun membre enregistré.</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Tant qu'aucun membre n'est publié, la page À propos affiche les profils provisoires livrés avec le site.
          </p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows.map(row => (
            <li key={row.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                {row.photo ? (
                  <img src={row.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-bold text-primary">{row.initiales || initialesDe(row.nom)}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-foreground">{row.nom}</p>
                  {!row.publie && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Masqué
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">{row.fonction}</p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => basculerPublication(row)}
                  aria-label={row.publie ? 'Masquer du site' : 'Afficher sur le site'}
                  title={row.publie ? 'Masquer du site' : 'Afficher sur le site'}
                >
                  {row.publie ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Modifier ${row.nom}`}
                  onClick={() =>
                    setEdite({
                      id: row.id,
                      valeurs: {
                        nom: row.nom,
                        fonction: row.fonction,
                        initiales: row.initiales,
                        photo: row.photo ?? '',
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
                  aria-label={`Retirer ${row.nom}`}
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
        {nouveau ? 'Nouveau membre' : 'Modifier le membre'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="m-nom">Nom *</Label>
          <Input id="m-nom" value={valeurs.nom} onChange={e => set('nom', e.target.value)} placeholder="Awa Traoré" />
        </div>
        <div>
          <Label htmlFor="m-fonction">Fonction</Label>
          <Input
            id="m-fonction"
            value={valeurs.fonction}
            onChange={e => set('fonction', e.target.value)}
            placeholder="Responsable commerciale"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label>Photo</Label>
        <p className="mb-2 text-xs text-muted-foreground">
          Sans photo, les initiales s'affichent dans un cercle — comme aujourd'hui sur le site.
        </p>
        <PhotoUploader
          photos={valeurs.photo ? [valeurs.photo] : []}
          onChange={p => set('photo', p[0] ?? '')}
          folder="equipe"
          single
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="m-initiales">Initiales</Label>
          <Input
            id="m-initiales"
            value={valeurs.initiales}
            onChange={e => set('initiales', e.target.value)}
            placeholder={initialesDe(valeurs.nom) || 'AT'}
            maxLength={3}
          />
        </div>
        <div>
          <Label htmlFor="m-ordre">Ordre d'affichage</Label>
          <Input id="m-ordre" type="number" value={valeurs.ordre} onChange={e => set('ordre', Number(e.target.value))} />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={valeurs.publie}
              onChange={e => set('publie', e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            Afficher sur le site
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
