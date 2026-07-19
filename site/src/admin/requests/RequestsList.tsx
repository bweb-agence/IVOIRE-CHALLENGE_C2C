import { useEffect, useMemo, useState } from 'react';
import { Inbox, Loader2, Phone, MessageCircle, Mail, Building2, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import type { ContactRequestRow, RequestStatut } from '@/lib/database.types';
import { toast } from 'sonner';
import PageHeader from '../PageHeader';

/** Demande enrichie du nom du bien concerné (jointure). */
type Row = ContactRequestRow & { properties: { nom: string; slug: string } | null };

const STATUTS: { value: RequestStatut; label: string; classe: string }[] = [
  { value: 'nouveau', label: 'Nouveau', classe: 'bg-info-bg text-info' },
  { value: 'en_cours', label: 'En cours', classe: 'bg-warning-bg text-warning' },
  { value: 'traite', label: 'Traité', classe: 'bg-success-bg text-success' },
  { value: 'archive', label: 'Archivé', classe: 'bg-muted text-muted-foreground' },
];

const libelle = (s: RequestStatut) => STATUTS.find(x => x.value === s)?.label ?? s;
const classe = (s: RequestStatut) => STATUTS.find(x => x.value === s)?.classe ?? '';

/** Numéro au format international pour les liens tel: et WhatsApp.
 *  En Côte d'Ivoire les numéros font 10 chiffres et le 0 initial fait partie
 *  du numéro : 07 88 99 00 11 → 225 0788990011 (le 0 ne se retire pas). */
export function normaliserTelephone(tel: string): string {
  const chiffres = tel.replace(/\D/g, '');
  if (chiffres.startsWith('225')) return chiffres;
  return '225' + chiffres;
}

function dateCourte(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RequestsList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState<RequestStatut | 'tous'>('tous');

  useEffect(() => {
    supabase
      .from('contact_requests')
      .select('*, properties(nom, slug)')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          toast.error('Impossible de charger les demandes.');
          return;
        }
        setRows((data ?? []) as Row[]);
      });
  }, []);

  const filtered = useMemo(
    () => (filtre === 'tous' ? rows : rows.filter(r => r.statut === filtre)),
    [rows, filtre]
  );

  const nouvelles = rows.filter(r => r.statut === 'nouveau').length;

  const changerStatut = async (row: Row, statut: RequestStatut) => {
    const avant = row.statut;
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, statut } : r)));
    const { error } = await supabase.from('contact_requests').update({ statut }).eq('id', row.id);
    if (error) {
      setRows(rs => rs.map(r => (r.id === row.id ? { ...r, statut: avant } : r)));
      toast.error("Le statut n'a pas pu être modifié.");
      return;
    }
    toast.success(`Demande marquée « ${libelle(statut)} ».`);
  };

  const enregistrerNote = async (row: Row, note: string) => {
    const { error } = await supabase
      .from('contact_requests')
      .update({ note_interne: note || null })
      .eq('id', row.id);
    if (error) {
      toast.error("La note n'a pas pu être enregistrée.");
      return;
    }
    setRows(rs => rs.map(r => (r.id === row.id ? { ...r, note_interne: note || null } : r)));
    toast.success('Note enregistrée.');
  };

  const supprimer = async (row: Row) => {
    if (!confirm(`Supprimer définitivement la demande de « ${row.nom} » ?`)) return;
    const { error } = await supabase.from('contact_requests').delete().eq('id', row.id);
    if (error) {
      toast.error('La suppression a échoué.');
      return;
    }
    setRows(rs => rs.filter(r => r.id !== row.id));
    toast.success('Demande supprimée.');
  };

  return (
    <div>
      <PageHeader
        title="Demandes"
        subtitle={
          loading
            ? 'Chargement…'
            : `${rows.length} demande${rows.length > 1 ? 's' : ''}${nouvelles ? ` · ${nouvelles} non traitée${nouvelles > 1 ? 's' : ''}` : ''}`
        }
        action={
          <Select value={filtre} onValueChange={v => setFiltre(v as RequestStatut | 'tous')}>
            <SelectTrigger aria-label="Filtrer par statut" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Toutes</SelectItem>
              {STATUTS.map(s => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Inbox className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">
            {rows.length === 0 ? 'Aucune demande pour le moment.' : 'Aucune demande avec ce statut.'}
          </p>
          {rows.length === 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              Les messages envoyés depuis le formulaire du site apparaîtront ici.
            </p>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map(row => (
            <RequestCard
              key={row.id}
              row={row}
              onStatut={changerStatut}
              onNote={enregistrerNote}
              onDelete={supprimer}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function RequestCard({
  row,
  onStatut,
  onNote,
  onDelete,
}: {
  row: Row;
  onStatut: (r: Row, s: RequestStatut) => void;
  onNote: (r: Row, note: string) => void;
  onDelete: (r: Row) => void;
}) {
  const [note, setNote] = useState(row.note_interne ?? '');
  const tel = normaliserTelephone(row.telephone);
  const noteModifiee = note !== (row.note_interne ?? '');

  return (
    <li className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-foreground">{row.nom}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${classe(row.statut)}`}>
              {libelle(row.statut)}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{dateCourte(row.created_at)}</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={row.statut} onValueChange={v => onStatut(row, v as RequestStatut)}>
            <SelectTrigger aria-label={`Statut de la demande de ${row.nom}`} className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUTS.map(s => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row)}
            aria-label={`Supprimer la demande de ${row.nom}`}
            className="text-muted-foreground hover:text-error"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {row.properties && (
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 flex-shrink-0 text-primary" />
          Intéressé par <span className="font-medium text-foreground">{row.properties.nom}</span>
        </p>
      )}

      {row.message && (
        <p className="mt-3 whitespace-pre-line rounded-lg bg-muted/60 p-3 text-sm text-foreground">{row.message}</p>
      )}

      {row.type_projet && (
        <p className="mt-2 text-sm text-muted-foreground">
          Type de projet : <span className="font-medium text-foreground">{row.type_projet}</span>
        </p>
      )}

      {/* Contacter en un geste */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <a href={`tel:+${tel}`}>
            <Phone className="mr-2 h-4 w-4" /> {row.telephone}
          </a>
        </Button>
        <Button asChild size="sm" className="bg-[#25D366] text-white hover:bg-[#20bd5a]">
          <a href={`https://wa.me/${tel}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
          </a>
        </Button>
        {row.email && (
          <Button asChild variant="outline" size="sm">
            <a href={`mailto:${row.email}`}>
              <Mail className="mr-2 h-4 w-4" /> {row.email}
            </a>
          </Button>
        )}
      </div>

      {/* Note interne — jamais visible du client */}
      <div className="mt-4">
        <label htmlFor={`note-${row.id}`} className="text-xs font-medium text-muted-foreground">
          Note interne (visible uniquement par l'équipe)
        </label>
        <Textarea
          id={`note-${row.id}`}
          rows={2}
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Rappeler lundi, a visité le site…"
          className="mt-1"
        />
        {noteModifiee && (
          <Button size="sm" variant="outline" className="mt-2" onClick={() => onNote(row, note.trim())}>
            <Save className="mr-2 h-4 w-4" /> Enregistrer la note
          </Button>
        )}
      </div>
    </li>
  );
}
