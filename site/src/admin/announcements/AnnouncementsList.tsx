import { useEffect, useState } from 'react';
import { Plus, Loader2, Megaphone, Trash2, Eye, EyeOff, Save, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, deleteMedias } from '@/lib/supabase';
import type { AnnouncementRow } from '@/lib/database.types';
import { toast } from 'sonner';
import PageHeader from '../PageHeader';
import PhotoUploader from '../PhotoUploader';

const vide = {
  titre: '',
  extrait: '',
  contenu: '',
  image: '',
  date_publication: new Date().toISOString().slice(0, 10),
  publie: false,
};
type Brouillon = typeof vide;

function slugify(v: string) {
  return v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

const dateCourte = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function AnnouncementsList() {
  const [rows, setRows] = useState<AnnouncementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [edite, setEdite] = useState<{ id: string | null; valeurs: Brouillon } | null>(null);

  const charger = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date_publication', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Impossible de charger les actualités.');
      return;
    }
    setRows((data ?? []) as AnnouncementRow[]);
  };

  useEffect(() => {
    charger();
  }, []);

  const enregistrer = async () => {
    if (!edite) return;
    const v = edite.valeurs;
    if (!v.titre.trim()) {
      toast.error('Le titre est obligatoire.');
      return;
    }
    const payload = {
      slug: slugify(v.titre),
      titre: v.titre.trim(),
      extrait: v.extrait.trim(),
      contenu: v.contenu.trim(),
      image: v.image || null,
      date_publication: new Date(v.date_publication).toISOString(),
      publie: v.publie,
    };
    const { error } = edite.id
      ? await supabase.from('announcements').update(payload).eq('id', edite.id)
      : await supabase.from('announcements').insert(payload);
    if (error) {
      toast.error(
        error.code === '23505'
          ? 'Une actualité porte déjà ce titre. Modifiez-le pour le rendre unique.'
          : "L'enregistrement a échoué."
      );
      return;
    }
    toast.success(edite.id ? 'Actualité modifiée.' : 'Actualité créée.');
    setEdite(null);
    charger();
  };

  const basculerPublication = async (row: AnnouncementRow) => {
    const next = !row.publie;
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: next } : r)));
    const { error } = await supabase.from('announcements').update({ publie: next }).eq('id', row.id);
    if (error) {
      setRows(rs => rs.map(r => (r.id === row.id ? { ...r, publie: !next } : r)));
      toast.error("La modification n'a pas pu être enregistrée.");
      return;
    }
    toast.success(next ? 'Actualité publiée sur le site.' : 'Actualité retirée (brouillon).');
  };

  const supprimer = async (row: AnnouncementRow) => {
    if (!confirm(`Supprimer définitivement « ${row.titre} » ?`)) return;
    const { error } = await supabase.from('announcements').delete().eq('id', row.id);
    if (error) {
      toast.error('La suppression a échoué.');
      return;
    }
    if (row.image) await deleteMedias([row.image]);
    setRows(rs => rs.filter(r => r.id !== row.id));
    toast.success('Actualité supprimée.');
  };

  const publiees = rows.filter(r => r.publie).length;

  return (
    <div>
      <PageHeader
        title="Actualités"
        subtitle={loading ? 'Chargement…' : `${rows.length} au total · ${publiees} publiée${publiees > 1 ? 's' : ''}`}
        action={
          !edite && (
            <Button onClick={() => setEdite({ id: null, valeurs: { ...vide } })}>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle actualité
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
          <Megaphone className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">Aucune actualité.</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Promotions, nouveaux lotissements, annonces de l'agence. La rubrique « Actualités » n'apparaît sur le site
            que lorsqu'au moins une actualité est publiée.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map(row => (
            <li key={row.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                {row.image ? (
                  <img src={row.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Megaphone className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-foreground">{row.titre}</p>
                  {!row.publie && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Brouillon
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{dateCourte(row.date_publication)}</p>
                {row.extrait && <p className="mt-1 truncate text-sm text-muted-foreground">{row.extrait}</p>}
              </div>

              <div className="flex flex-shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => basculerPublication(row)}
                  aria-label={row.publie ? 'Retirer du site' : 'Publier sur le site'}
                  title={row.publie ? 'Retirer du site' : 'Publier sur le site'}
                >
                  {row.publie ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Modifier ${row.titre}`}
                  onClick={() =>
                    setEdite({
                      id: row.id,
                      valeurs: {
                        titre: row.titre,
                        extrait: row.extrait,
                        contenu: row.contenu,
                        image: row.image ?? '',
                        date_publication: row.date_publication.slice(0, 10),
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
                  aria-label={`Supprimer ${row.titre}`}
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
        {nouveau ? 'Nouvelle actualité' : "Modifier l'actualité"}
      </h2>

      <div>
        <Label htmlFor="a-titre">Titre *</Label>
        <Input
          id="a-titre"
          value={valeurs.titre}
          onChange={e => set('titre', e.target.value)}
          placeholder="Nouveau lotissement à Bonoua"
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="a-extrait">Accroche</Label>
        <Input
          id="a-extrait"
          value={valeurs.extrait}
          onChange={e => set('extrait', e.target.value)}
          placeholder="Résumé d'une ligne, affiché dans la liste"
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="a-contenu">Contenu</Label>
        <Textarea
          id="a-contenu"
          rows={8}
          value={valeurs.contenu}
          onChange={e => set('contenu', e.target.value)}
          placeholder="Le texte complet de l'actualité. Les sauts de ligne sont conservés."
        />
      </div>

      <div className="mt-4">
        <Label>Image</Label>
        <PhotoUploader
          photos={valeurs.image ? [valeurs.image] : []}
          onChange={p => set('image', p[0] ?? '')}
          folder="actualites"
          single
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="a-date">Date de publication</Label>
          <Input
            id="a-date"
            type="date"
            value={valeurs.date_publication}
            onChange={e => set('date_publication', e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Une date future garde l'actualité invisible jusqu'au jour dit.
          </p>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={valeurs.publie}
              onChange={e => set('publie', e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            Publier sur le site
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
