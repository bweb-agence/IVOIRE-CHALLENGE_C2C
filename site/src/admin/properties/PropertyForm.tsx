import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import type { PropertyRow, PropertyStatut, PropertyTransaction, PropertyType } from '@/lib/database.types';
import { toast } from 'sonner';
import PhotoUploader from '../PhotoUploader';
import VideoInput from '../VideoInput';
import PageHeader from '../PageHeader';

const empty = {
  nom: '',
  type: 'Terrain' as PropertyType,
  transaction: 'Achat' as PropertyTransaction,
  ville: '',
  quartier: '',
  superficie: '',
  prix: '',
  description: '',
  statut: 'Disponible' as PropertyStatut,
  statut_juridique: '',
  distance_repere: '',
  modalites_paiement: '',
  site_approuve: true,
  a_la_une: false,
  publie: false,
  photos: [] as string[],
  videos: [] as string[],
};

/** Identifiant lisible dans l'URL du site public, dérivé du nom. */
function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export default function PropertyForm() {
  const { id } = useParams();
  const isNew = !id || id === 'nouveau';
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isNew) return;
    supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) {
          toast.error('Ce bien est introuvable.');
          navigate('/admin', { replace: true });
          return;
        }
        const r = data as PropertyRow;
        setForm({
          nom: r.nom,
          type: r.type,
          transaction: r.transaction,
          ville: r.ville,
          quartier: r.quartier,
          superficie: String(r.superficie),
          prix: String(r.prix),
          description: r.description,
          statut: r.statut,
          statut_juridique: r.statut_juridique,
          distance_repere: r.distance_repere,
          modalites_paiement: r.modalites_paiement,
          site_approuve: r.site_approuve,
          a_la_une: r.a_la_une,
          publie: r.publie,
          photos: r.photos ?? [],
          videos: r.videos ?? [],
        });
      });
  }, [id, isNew, navigate]);

  const set = <K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = 'Donnez un nom au bien.';
    if (!form.ville.trim()) e.ville = 'Indiquez la ville.';
    if (!form.superficie || Number(form.superficie) <= 0) e.superficie = 'Indiquez une superficie supérieure à 0.';
    if (form.prix === '' || Number(form.prix) < 0) e.prix = 'Indiquez un prix en FCFA.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Certains champs doivent être corrigés.');
      return;
    }
    setSaving(true);

    const payload = {
      slug: slugify(form.nom),
      nom: form.nom.trim(),
      type: form.type,
      transaction: form.transaction,
      ville: form.ville.trim(),
      quartier: form.quartier.trim(),
      superficie: Number(form.superficie),
      prix: Number(form.prix),
      description: form.description.trim(),
      statut: form.statut,
      statut_juridique: form.statut_juridique.trim(),
      distance_repere: form.distance_repere.trim(),
      modalites_paiement: form.modalites_paiement.trim(),
      site_approuve: form.site_approuve,
      a_la_une: form.a_la_une,
      publie: form.publie,
      photos: form.photos,
      videos: form.videos,
    };

    const { error } = isNew
      ? await supabase.from('properties').insert(payload)
      : await supabase.from('properties').update(payload).eq('id', id);

    setSaving(false);

    if (error) {
      const message =
        error.code === '23505'
          ? 'Un bien porte déjà ce nom. Modifiez le nom pour le rendre unique.'
          : "L'enregistrement a échoué. Vérifiez votre connexion et réessayez.";
      toast.error(message);
      return;
    }

    toast.success(isNew ? 'Bien créé.' : 'Modifications enregistrées.');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4 text-muted-foreground">
        <Link to="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux biens
        </Link>
      </Button>

      <PageHeader
        title={isNew ? 'Nouveau bien' : 'Modifier le bien'}
        subtitle={isNew ? 'Il apparaîtra sur le site une fois publié.' : form.nom}
      />

      <div className="space-y-6">
        <Section title="Informations principales">
          <Field label="Nom du bien" htmlFor="nom" error={errors.nom} required>
            <Input
              id="nom"
              value={form.nom}
              onChange={e => set('nom', e.target.value)}
              placeholder="Terrain résidentiel Azaguié"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type de bien" htmlFor="type">
              <Select value={form.type} onValueChange={v => set('type', v as PropertyType)}>
                <SelectTrigger id="type" aria-label="Type de bien">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Terrain">Terrain</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Transaction" htmlFor="transaction">
              <Select value={form.transaction} onValueChange={v => set('transaction', v as PropertyTransaction)}>
                <SelectTrigger id="transaction" aria-label="Transaction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Achat">Achat</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Ville" htmlFor="ville" error={errors.ville} required>
              <Input id="ville" value={form.ville} onChange={e => set('ville', e.target.value)} placeholder="Abidjan" />
            </Field>

            <Field label="Quartier" htmlFor="quartier">
              <Input
                id="quartier"
                value={form.quartier}
                onChange={e => set('quartier', e.target.value)}
                placeholder="Angré"
              />
            </Field>

            <Field label="Superficie (m²)" htmlFor="superficie" error={errors.superficie} required>
              <Input
                id="superficie"
                type="number"
                inputMode="numeric"
                value={form.superficie}
                onChange={e => set('superficie', e.target.value)}
                placeholder="500"
              />
            </Field>

            <Field
              label="Prix (FCFA)"
              htmlFor="prix"
              error={errors.prix}
              required
              hint={form.prix ? new Intl.NumberFormat('fr-FR').format(Number(form.prix)) + ' FCFA' : undefined}
            >
              <Input
                id="prix"
                type="number"
                inputMode="numeric"
                value={form.prix}
                onChange={e => set('prix', e.target.value)}
                placeholder="3500000"
              />
            </Field>
          </div>

          <Field label="Description" htmlFor="description">
            <Textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Décrivez le bien, son environnement, ses atouts…"
            />
          </Field>
        </Section>

        <Section title="Photos" description="La première photo sert de vignette sur le site.">
          <PhotoUploader photos={form.photos} onChange={p => set('photos', p)} folder="biens" />
        </Section>

        <Section
          title="Vidéos"
          description="Visite du terrain, drone, présentation. Un lien est préférable à un fichier."
        >
          <VideoInput videos={form.videos} onChange={v => set('videos', v)} folder="biens-videos" />
        </Section>

        <Section title="Détails et conditions">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Disponibilité" htmlFor="statut">
              <Select value={form.statut} onValueChange={v => set('statut', v as PropertyStatut)}>
                <SelectTrigger id="statut" aria-label="Disponibilité">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Réservé">Réservé</SelectItem>
                  <SelectItem value="Vendu">Vendu</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Statut juridique" htmlFor="statut_juridique">
              <Input
                id="statut_juridique"
                value={form.statut_juridique}
                onChange={e => set('statut_juridique', e.target.value)}
                placeholder="ACD, titre foncier…"
              />
            </Field>

            <Field label="Point de repère" htmlFor="distance_repere">
              <Input
                id="distance_repere"
                value={form.distance_repere}
                onChange={e => set('distance_repere', e.target.value)}
                placeholder="À 35 min du CHU d'Angré"
              />
            </Field>

            <Field label="Modalités de paiement" htmlFor="modalites_paiement">
              <Input
                id="modalites_paiement"
                value={form.modalites_paiement}
                onChange={e => set('modalites_paiement', e.target.value)}
                placeholder="Comptant ou échelonné sur 12 mois"
              />
            </Field>
          </div>
          <p className="text-xs text-muted-foreground">
            Si les modalités mentionnent un paiement « échelonné », les frais de dossier de 150 000 FCFA sont
            automatiquement affichés sur la fiche du bien.
          </p>
        </Section>

        <Section title="Mise en ligne">
          <Checkbox
            id="publie"
            checked={form.publie}
            onChange={v => set('publie', v)}
            label="Publier sur le site"
            hint="Décochez pour garder le bien en brouillon, invisible des visiteurs."
          />
          <Checkbox
            id="a_la_une"
            checked={form.a_la_une}
            onChange={v => set('a_la_une', v)}
            label="Mettre à la une"
            hint="Le bien apparaît dans la sélection de la page d'accueil."
          />
          <Checkbox
            id="site_approuve"
            checked={form.site_approuve}
            onChange={v => set('site_approuve', v)}
            label="Site approuvé"
            hint="Affiche le badge « Site approuvé » sur la fiche."
          />
        </Section>
      </div>

      <div className="sticky bottom-0 mt-8 flex justify-end gap-3 border-t border-border bg-muted/30 py-4 backdrop-blur">
        <Button asChild variant="ghost" type="button">
          <Link to="/admin">Annuler</Link>
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isNew ? 'Créer le bien' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- primitives */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h2>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-error">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 flex items-center gap-1.5 text-xs text-error">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  id,
  checked,
  onChange,
  label,
  hint,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 flex-shrink-0 rounded border-input accent-primary"
      />
      <div>
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
